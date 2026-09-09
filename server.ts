import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization of Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiConfigured: !!process.env.GEMINI_API_KEY });
});

// Helper to fetch website text preview safely
async function fetchWebsiteTextPreview(url: string): Promise<string> {
  try {
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(formattedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 AnswerReadyBot/1.0",
      },
    });
    clearTimeout(timeout);
    if (!response.ok) {
      return `(Note: HTTP ${response.status} when fetching website)`;
    }
    const html = await response.text();
    // Strip HTML tags and collapse whitespace for compact context
    const cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 15000);
    return cleanText;
  } catch (err: any) {
    return `(Could not directly fetch page: ${err.message || "timeout or network barrier"})`;
  }
}

// 2. Scan Website & Extract Initial Business Knowledge Profile
app.post("/api/scan-website", async (req, res) => {
  try {
    const { websiteUrl, businessName, businessCategory, location, enteredInfo } = req.body;
    const ai = getGemini();

    let websiteContent = "";
    if (websiteUrl) {
      websiteContent = await fetchWebsiteTextPreview(websiteUrl);
    }

    if (ai) {
      const prompt = `
You are AnswerReady AI, an expert system that extracts structured business facts to create an AI Knowledge Profile so AI assistants (ChatGPT, Google Gemini, Perplexity, Apple Intelligence) can accurately understand, trust, and recommend this business.

Business Name: ${businessName || "Unknown"}
Website URL: ${websiteUrl || "Not provided"}
Category / Industry: ${businessCategory || "General Business"}
Location / Service Area: ${location || "Not specified"}
User Provided Notes: ${JSON.stringify(enteredInfo || {})}

Website Content Extract:
"""
${websiteContent.slice(0, 8000)}
"""

CRITICAL INSTRUCTIONS:
1. Do NOT use confusing SEO jargon. Use plain English.
2. Never invent facts. If something is unknown, mark it clearly or use realistic inferred standards with a note to verify.
3. Calculate an AI Readiness Score (0-100) and scores for categories: identity, contact, services, location, faqs, trust, websiteContent, consistency, structuredData, discoverability.
4. Extract structured Identity, Contact, Services (with pricing estimates or notes), Business Facts (specialties, differentiators, licenses), Trust signals, and 5-6 practical customer FAQs.
5. Identify top 3 Plain-English Recommendations (What is wrong, Why it matters, How to fix it, Suggested fix).
6. Check for potential consistency issues between public listings and the website.

Return strictly a JSON object with this shape:
{
  "businessName": string,
  "legalName": string,
  "tagline": string,
  "industry": string,
  "category": string,
  "description": string,
  "shortAiDescription": string,
  "locations": string[],
  "serviceAreas": string[],
  "phone": string,
  "email": string,
  "address": { "street": string, "city": string, "state": string, "zip": string, "country": string },
  "hours": [ { "day": string, "hours": string } ],
  "services": [
    {
      "name": string,
      "description": string,
      "pricing": string,
      "serviceAreas": string[],
      "targetCustomer": string,
      "problemsSolved": string[]
    }
  ],
  "facts": {
    "specialties": string[],
    "differentiators": string[],
    "yearsInBusiness": number or string,
    "certifications": string[],
    "licenses": string[],
    "awards": string[],
    "paymentMethods": string[],
    "policies": [ { "name": string, "details": string } ]
  },
  "trust": {
    "rating": number,
    "reviewCount": number,
    "stats": [ { "label": string, "value": string } ]
  },
  "faqs": [
    {
      "question": string,
      "answer": string,
      "category": string
    }
  ],
  "aiReadiness": {
    "overallScore": number,
    "breakdown": {
      "identity": number,
      "contact": number,
      "services": number,
      "location": number,
      "faqs": number,
      "trust": number,
      "websiteContent": number,
      "consistency": number,
      "structuredData": number,
      "discoverability": number
    },
    "summary": string,
    "wouldAiRecommend": {
      "rating": "Strongly Recommended" | "Moderately Recommended" | "Needs Clarification" | "Hard for AI to Recommend",
      "score": number,
      "strengths": string[],
      "gaps": string[],
      "verdict": string
    }
  },
  "recommendations": [
    {
      "title": string,
      "category": string,
      "severity": "high" | "medium" | "low",
      "whatIsWrong": string,
      "whyItMatters": string,
      "howToFix": string,
      "suggestedFix": string
    }
  ],
  "consistencyIssues": [
    {
      "field": string,
      "sourceA": { "name": string, "value": string },
      "sourceB": { "name": string, "value": string },
      "discrepancy": string,
      "whyItMatters": string,
      "suggestedValue": string
    }
  ]
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);
      return res.json({ success: true, data: parsed, aiPowered: true });
    }

    // Heuristic Fallback if Gemini key is not set
    const defaultName = businessName || "Your Business";
    const defaultCategory = businessCategory || "Local Business";
    const slug = defaultName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const fallbackData = {
      businessName: defaultName,
      legalName: `${defaultName} LLC`,
      tagline: `Your trusted ${defaultCategory} specialist.`,
      industry: "Local Services",
      category: defaultCategory,
      description: `${defaultName} provides high-quality ${defaultCategory.toLowerCase()} services in ${location || "the local area"}. Dedicated to transparent communication, prompt response, and reliable customer satisfaction.`,
      shortAiDescription: `Licensed ${defaultCategory.toLowerCase()} providing dependable service in ${location || "local region"}.`,
      locations: [location || "Primary Location"],
      serviceAreas: [location || "Metro Area"],
      phone: enteredInfo?.phone || "(555) 123-4567",
      email: enteredInfo?.email || `contact@${slug}.com`,
      address: {
        street: enteredInfo?.street || "100 Main Street",
        city: location?.split(",")[0]?.trim() || "Local City",
        state: location?.split(",")[1]?.trim() || "ST",
        zip: "12345",
        country: "USA",
      },
      hours: [
        { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
        { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
        { day: "Sunday", hours: "Closed" },
      ],
      services: [
        {
          name: `Core ${defaultCategory} Service`,
          description: `Comprehensive evaluation, diagnostic, and resolution for ${defaultCategory.toLowerCase()} requirements.`,
          pricing: "Upfront transparent pricing with written quote before work begins.",
          serviceAreas: [location || "Local Metro"],
          targetCustomer: "Residential and commercial clients seeking reliable workmanship.",
          problemsSolved: ["Immediate issue diagnosis", "Safe compliance", "Preventative maintenance"],
        },
        {
          name: `Emergency & Priority Service`,
          description: `Rapid dispatch for urgent problems requiring same-day or priority intervention.`,
          pricing: "Standard diagnostic fee applied toward repair.",
          serviceAreas: [location || "Local Metro"],
          targetCustomer: "Homeowners and managers in urgent need.",
          problemsSolved: ["Emergency response", "Downtime prevention"],
        },
      ],
      facts: {
        specialties: [`Customized ${defaultCategory}`, "Fast turnaround", "Guaranteed workmanship"],
        differentiators: ["Direct owner oversight", "Clear flat-rate pricing", "100% satisfaction guarantee"],
        yearsInBusiness: 8,
        certifications: ["State Licensed & Bonded", "Industry Certified"],
        licenses: ["Active State License #09812"],
        awards: ["Top Local Service Provider"],
        paymentMethods: ["Visa", "MasterCard", "Debit", "Check", "ACH"],
        policies: [
          { name: "Satisfaction Guarantee", details: "All labor backed by 1-year warranty." },
        ],
      },
      trust: {
        rating: 4.8,
        reviewCount: 94,
        stats: [
          { label: "Completed Projects", value: "1,200+" },
          { label: "Years in Business", value: "8+" },
          { label: "Client Satisfaction", value: "98%" },
        ],
      },
      faqs: [
        {
          question: `Do you offer emergency or weekend service?`,
          answer: `Yes, we offer weekend hours on Saturday and priority response for urgent needs throughout ${location || "our service area"}.`,
          category: "Hours & Availability",
        },
        {
          question: `How much do your services typically cost?`,
          answer: `We provide clear, upfront estimates before any work begins, with zero hidden dispatch surcharges.`,
          category: "Pricing",
        },
        {
          question: `What specific areas do you serve?`,
          answer: `We actively serve ${location || "the local surrounding region"} and surrounding communities.`,
          category: "Service Areas",
        },
      ],
      aiReadiness: {
        overallScore: 68,
        breakdown: {
          identity: 78,
          contact: 80,
          services: 70,
          location: 65,
          faqs: 60,
          trust: 72,
          websiteContent: 62,
          consistency: 64,
          structuredData: 55,
          discoverability: 74,
        },
        summary: `Your business has a good foundation, but AI search engines are missing specific pricing parameters, structured FAQ markup, and confirmed service boundaries.`,
        wouldAiRecommend: {
          rating: "Moderately Recommended",
          score: 71,
          strengths: ["Clear core business category", "Verified direct phone line"],
          gaps: [
            "Exact pricing ranges are not published on your website",
            "Missing structured FAQ data prevents AI answer boxes from quoting your answers",
          ],
          verdict: `AI will recognize your business, but may favor competitors with clearly published pricing and structured FAQ schema.`,
        },
      },
      recommendations: [
        {
          title: "Add Upfront Starting Price Ranges",
          category: "Pricing Transparency",
          severity: "high",
          whatIsWrong: "Your website currently instructs users to 'Call for Quote' with no baseline numbers.",
          whyItMatters: "Answer engines like ChatGPT and Perplexity favor businesses that provide honest price expectations.",
          howToFix: "Publish starting price ranges for your 2-3 most common services.",
          suggestedFix: `Add: 'Standard service calls start at $89 diagnostic fee, waived when you proceed with service.'`,
        },
        {
          title: "Clarify Specific Service Cities & Towns",
          category: "Geographic Clarity",
          severity: "medium",
          whatIsWrong: "Your location lists only one broad area rather than specific neighboring towns.",
          whyItMatters: "When someone asks 'Who does this near [Nearby Town]?', AI cannot verify if you travel there.",
          howToFix: "List your top 5-8 served towns explicitly on your profile.",
          suggestedFix: `Add explicit list of counties and key zip codes served.`,
        },
        {
          title: "Publish Common Customer FAQs",
          category: "AI Answer Readiness",
          severity: "high",
          whatIsWrong: "AI models cannot find verified answers to 'Are you open Saturday?' or 'Do you do residential?'.",
          whyItMatters: "AI assistants will say 'Information not available' or guess based on outdated directories.",
          howToFix: "Approve and publish your AnswerReady AI FAQ knowledge base.",
          suggestedFix: `Publish the 5 AI-verified FAQs to your website and public profile.`,
        },
      ],
      consistencyIssues: [
        {
          field: "Operating Hours",
          sourceA: { name: "Official Website", value: "Monday-Friday 8am-5pm" },
          sourceB: { name: "Online Directory", value: "Hours unlisted or conflicting" },
          discrepancy: "Your website lists weekday hours but public directories show inconsistent times.",
          whyItMatters: "AI may report your business as closed when a customer inquires on Saturday morning.",
          suggestedValue: "Monday-Friday 8am-5pm, Saturday 9am-1pm",
        },
      ],
    };

    res.json({ success: true, data: fallbackData, aiPowered: false });
  } catch (err: any) {
    console.error("Error in /api/scan-website:", err);
    res.status(500).json({ error: err.message || "Failed to scan website" });
  }
});

// 3. Ask AI About My Business (Testing realism & missing facts)
app.post("/api/ask-ai", async (req, res) => {
  try {
    const { question, profile } = req.body;
    const ai = getGemini();

    if (!question || !profile) {
      return res.status(400).json({ error: "question and profile are required" });
    }

    if (ai) {
      const prompt = `
You are an AI Assistant (like ChatGPT, Perplexity, or Google Gemini) answering a customer inquiry about a business.
You MUST answer strictly using the provided verified Business Knowledge Profile.
Never invent or assume facts not supported by the verified knowledge base.

BUSINESS KNOWLEDGE PROFILE:
"""
Business Name: ${profile.identity?.businessName}
Tagline: ${profile.identity?.tagline}
Category: ${profile.identity?.category}
Description: ${profile.identity?.description}
Phone: ${profile.contact?.phone}
Email: ${profile.contact?.email}
Address: ${profile.contact?.address?.street}, ${profile.contact?.address?.city}, ${profile.contact?.address?.state} ${profile.contact?.address?.zip}
Service Areas: ${profile.identity?.serviceAreas?.join(", ")}
Hours: ${JSON.stringify(profile.contact?.hours)}
Services: ${JSON.stringify(profile.services)}
Facts & Specialties: ${JSON.stringify(profile.facts)}
Trust & Ratings: ${JSON.stringify(profile.trust)}
Approved FAQs: ${JSON.stringify(profile.faqs?.filter((f: any) => f.status === "approved"))}
"""

CUSTOMER QUESTION: "${question}"

EVALUATION RULES:
1. Generate the exact factual answer you would give a customer.
2. Rate your Confidence Level (0-100%).
3. If the verified knowledge base lacks critical details needed to answer completely (e.g. specific town, exact warranty, exact weekend emergency rates, specific brand), explicitly point out what information is missing.
4. Suggest what the business owner should add to their AnswerReady AI profile to turn this into a 100% confident recommendation.

Return strictly JSON:
{
  "answer": string,
  "confidenceScore": number,
  "canAnswerConfidently": boolean,
  "verifiedSourcesUsed": string[],
  "missingInformation": string | null,
  "actionableFix": string | null
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ success: true, result: parsed, aiPowered: true });
    }

    // Heuristic fallback if Gemini not configured
    const qLower = question.toLowerCase();
    const name = profile.identity?.businessName || "This business";
    let answer = "";
    let missingInfo: string | null = null;
    let actionableFix: string | null = null;
    let confidence = 85;
    let sources = ["Verified Knowledge Profile"];

    if (qLower.includes("emergency") || qLower.includes("24/7") || qLower.includes("open now")) {
      const emergencyHour = profile.contact?.hours?.find((h: any) => h.isOpen247 || h.isEmergencyOnly);
      if (emergencyHour) {
        answer = `Yes, ${name} provides emergency response. Their schedule specifies: ${emergencyHour.hours}. You can reach them at ${profile.contact?.emergencyPhone || profile.contact?.phone}.`;
        sources.push("Hours & Emergency Line");
        confidence = 95;
      } else {
        answer = `${name} operates during standard business hours (${profile.contact?.hours?.[0]?.hours || "regular hours"}).`;
        missingInfo = "It is not clear whether after-hours emergency dispatch is supported.";
        actionableFix = "Add your emergency policy and after-hours phone number to your Contact section.";
        confidence = 65;
      }
    } else if (qLower.includes("cost") || qLower.includes("price") || qLower.includes("how much") || qLower.includes("charge")) {
      const hasPricing = profile.services?.some((s: any) => s.pricing && s.pricing.length > 5);
      if (hasPricing) {
        const sampleService = profile.services[0];
        answer = `${name} publishes transparent pricing. For example, ${sampleService.name}: ${sampleService.pricing}. They provide upfront quotes before work begins.`;
        sources.push(`Services Catalog (${sampleService.name})`);
        confidence = 92;
      } else {
        answer = `${name} provides custom estimates upon contact. Exact starting prices are not published in their public profile.`;
        missingInfo = "No baseline pricing or diagnostic fee ranges are documented.";
        actionableFix = "Add starting price estimates (e.g., 'Diagnostic fee $89, waived with repair') to your Services.";
        confidence = 60;
      }
    } else if (qLower.includes("serve") || qLower.includes("travel to") || qLower.includes("near me") || qLower.includes("location") || qLower.includes("area")) {
      const areas = profile.identity?.serviceAreas || [];
      answer = `${name} is based in ${profile.contact?.address?.city}, ${profile.contact?.address?.state}. Their primary confirmed service areas include: ${areas.join(", ")}.`;
      sources.push("Service Areas & Address");
      confidence = 90;
    } else {
      answer = `Based on verified business records, ${name} specializes in ${profile.facts?.specialties?.join(", ") || profile.identity?.category}. They have been in business for ${profile.facts?.yearsInBusiness || "several"} years and hold a ${profile.trust?.rating || "top"} star rating.`;
      confidence = 88;
    }

    res.json({
      success: true,
      result: {
        answer,
        confidenceScore: confidence,
        canAnswerConfidently: confidence >= 80,
        verifiedSourcesUsed: sources,
        missingInformation: missingInfo,
        actionableFix: actionableFix,
      },
      aiPowered: false,
    });
  } catch (err: any) {
    console.error("Error in /api/ask-ai:", err);
    res.status(500).json({ error: err.message || "Failed to process query" });
  }
});

// 4. Generate AI Fix for a specific issue
app.post("/api/generate-fix", async (req, res) => {
  try {
    const { issue, profile } = req.body;
    const ai = getGemini();

    if (ai) {
      const prompt = `
You are AnswerReady AI. A business owner has an information gap or inconsistency that hurts how AI assistants understand their business.

Issue Title: "${issue.title}"
Category: "${issue.category}"
What is wrong: "${issue.whatIsWrong}"
Why it matters: "${issue.whyItMatters}"

Business Name: ${profile.identity?.businessName}
Category: ${profile.identity?.category}
Locations: ${profile.identity?.serviceAreas?.join(", ")}

Generate an immediate, professional, factually grounded fix that the business owner can approve with 1-click.
Return strictly JSON:
{
  "suggestedContent": string,
  "plainEnglishExplanation": string,
  "affectedField": string
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ success: true, fix: parsed, aiPowered: true });
    }

    res.json({
      success: true,
      fix: {
        suggestedContent: issue.suggestedFix || "Verified factual standard text for this section.",
        plainEnglishExplanation: "Updated with clear, plain English phrasing optimized for AI assistant retrieval.",
        affectedField: issue.category || "General",
      },
      aiPowered: false,
    });
  } catch (err: any) {
    console.error("Error in /api/generate-fix:", err);
    res.status(500).json({ error: err.message || "Failed to generate fix" });
  }
});

// 5. Content Generator (FAQ, Service description, Location page, Google Bio)
app.post("/api/generate-content", async (req, res) => {
  try {
    const { contentType, profile, customTopic } = req.body;
    const ai = getGemini();

    if (ai) {
      const prompt = `
You are AnswerReady AI Content Generator.
Generate high-value, factually grounded marketing & structured content for:
Business Name: ${profile.identity?.businessName}
Category: ${profile.identity?.category}
City/State: ${profile.contact?.address?.city}, ${profile.contact?.address?.state}
Specialties: ${profile.facts?.specialties?.join(", ")}
Differentiators: ${profile.facts?.differentiators?.join(", ")}

Requested Content Type: "${contentType}"
Custom Topic or Focus: "${customTopic || "Standard core content"}"

Rules:
1. Stay 100% factually grounded in the verified business profile.
2. Never invent certifications, fake reviews, or nonexistent policies.
3. Optimize for natural readability, clear answers, and AI discovery.
4. Format with clean headings or bullet points where appropriate.

Return strictly JSON:
{
  "title": string,
  "content": string,
  "recommendedPlacement": string
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ success: true, result: parsed, aiPowered: true });
    }

    const bName = profile.identity?.businessName || "Our Business";
    const loc = profile.contact?.address?.city || "your area";

    res.json({
      success: true,
      result: {
        title: `${contentType} for ${bName}`,
        content: `At ${bName}, we proudly deliver premier ${profile.identity?.category?.toLowerCase() || "services"} throughout ${loc} and surrounding communities. Backed by licensed expertise, upfront flat-rate pricing, and prompt response times, our mission is to ensure clear, reliable results every time you call.\n\nKey Highlights:\n- Upfront transparent estimates with no surprise fees\n- State-licensed and fully insured professionals\n- Fast scheduling and emergency support available\n\nContact us today at ${profile.contact?.phone || "(555) 123-4567"} to schedule an appointment.`,
        recommendedPlacement: "Your website homepage, Google Business Profile description, or social bio.",
      },
      aiPowered: false,
    });
  } catch (err: any) {
    console.error("Error in /api/generate-content:", err);
    res.status(500).json({ error: err.message || "Failed to generate content" });
  }
});

// 6. Cross-reference Consistency Scan
app.post("/api/analyze-consistency", async (req, res) => {
  try {
    const { profile } = req.body;
    const ai = getGemini();

    if (ai) {
      const prompt = `
You are AnswerReady AI Consistency Engine.
Evaluate the following business profile data and identify realistic, high-impact discrepancies that commonly occur between a business's website and public directories (Google Maps, Yelp, Facebook, Apple Maps, YellowPages).

Business Name: ${profile.identity?.businessName}
Hours: ${JSON.stringify(profile.contact?.hours)}
Phone: ${profile.contact?.phone}
Address: ${JSON.stringify(profile.contact?.address)}
Services: ${profile.services?.map((s: any) => s.name).join(", ")}

Generate 2-3 realistic, high-impact consistency issues with plain-English descriptions of what is conflicting and why AI assistants get confused.
Return strictly JSON array of:
[
  {
    "field": string,
    "sourceA": { "name": string, "value": string },
    "sourceB": { "name": string, "value": string },
    "discrepancy": string,
    "whyItMatters": string,
    "suggestedValue": string
  }
]
`;
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const parsed = JSON.parse(response.text || "[]");
      return res.json({ success: true, issues: parsed });
    }

    res.json({
      success: true,
      issues: profile.consistencyIssues || [],
    });
  } catch (err: any) {
    console.error("Error in /api/analyze-consistency:", err);
    res.status(500).json({ error: err.message || "Failed to analyze consistency" });
  }
});

// Start server and mount Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AnswerReady AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
