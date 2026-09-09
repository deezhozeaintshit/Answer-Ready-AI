import { BusinessProfile, AgencyClient, CompetitorComparisonItem } from '../types';

export const SAMPLE_PROFILES: Record<string, BusinessProfile> = {
  'peakflow-plumbing': {
    id: 'peakflow-plumbing',
    slug: 'peakflow-plumbing',
    updatedAt: '2026-09-08',
    completenessScore: 78,
    identity: {
      businessName: 'PeakFlow Plumbing & Heating',
      legalName: 'PeakFlow Mechanical LLC',
      brandName: 'PeakFlow',
      industry: 'Home Services & Construction',
      category: 'Plumber',
      description: 'PeakFlow Plumbing & Heating is a family-owned mechanical contractor serving Carroll, Lake View, and the greater Central Iowa region. Specializing in 24/7 residential emergency plumbing, heat pump installation, water heater repair, and drain jetting with upfront, flat-rate pricing and licensed master plumbers.',
      shortAiDescription: 'Licensed 24/7 emergency residential & commercial plumber and heating specialist serving Carroll and Central Iowa with upfront transparent pricing.',
      tagline: 'Fast, honest plumbing when seconds count.',
      foundedYear: '2014',
      locations: ['Carroll, IA', 'Lake View, IA', 'Denison, IA'],
      serviceAreas: ['Carroll County', 'Sac County', 'Crawford County', 'Greene County', 'Audubon County']
    },
    contact: {
      phone: '(712) 555-0194',
      emergencyPhone: '(712) 555-0199',
      email: 'service@peakflowplumbing.com',
      website: 'https://www.peakflowplumbing.com',
      address: {
        street: '418 N Adams St',
        city: 'Carroll',
        state: 'IA',
        zip: '51401',
        country: 'USA'
      },
      hours: [
        { day: 'Monday - Friday', hours: '7:00 AM - 6:00 PM' },
        { day: 'Saturday', hours: '8:00 AM - 2:00 PM' },
        { day: 'Sunday', hours: 'Emergency Dispatch Only' },
        { day: '24/7 Emergency Line', hours: 'Always Open (Live Dispatcher)', isOpen247: true, isEmergencyOnly: true }
      ],
      appointmentUrl: 'https://www.peakflowplumbing.com/book',
      socialProfiles: [
        { platform: 'Google', url: 'https://maps.google.com/?cid=peakflow-plumbing' },
        { platform: 'Facebook', url: 'https://facebook.com/peakflowplumbing' },
        { platform: 'Yelp', url: 'https://yelp.com/biz/peakflow-plumbing-carroll' }
      ]
    },
    services: [
      {
        id: 'srv-1',
        name: '24/7 Emergency Plumbing & Burst Pipe Repair',
        description: 'Rapid dispatch emergency response for ruptured water lines, severe sewage backups, and frozen pipes with average 45-minute response in Carroll.',
        pricing: 'Standard dispatch: $89 diagnostic fee waived with repair. Upfront flat-rate quote before work starts.',
        serviceAreas: ['Carroll', 'Lake View', 'Denison', 'Glidden', 'Manning'],
        targetCustomer: 'Residential homeowners and small retail property managers facing urgent water leaks or floods.',
        problemsSolved: ['Flooded basements', 'Frozen/burst PEX and copper pipes', 'Failed sump pumps', 'Main sewer line blockages'],
        isVerified: true
      },
      {
        id: 'srv-2',
        name: 'Tankless & Traditional Water Heater Installation',
        description: 'Complete replacement and scheduled maintenance of high-efficiency gas/electric tankless units (Navien, Rinnai) and standard 40-50 gallon tank heaters.',
        pricing: 'Standard tank replacement from $1,450 installed; Tankless conversions starting at $2,800 with 10-year warranty.',
        serviceAreas: ['Carroll County', 'Sac County'],
        targetCustomer: 'Homeowners experiencing cold water, rusty output, or energy-inefficient outdated water heaters.',
        problemsSolved: ['No hot water', 'Leaking water heater tanks', 'High utility bills', 'Hard water scale buildup'],
        isVerified: true
      },
      {
        id: 'srv-3',
        name: 'Hydro-Jetting & Video Camera Drain Inspection',
        description: 'High-pressure 4,000 PSI hydro-jetting to clear heavy tree root intrusions, grease clogs, and mineral deposits, verified with color HD camera scoping.',
        pricing: 'Camera inspection: $149; Full line hydro-jetting: $395 - $550 depending on run length.',
        serviceAreas: ['Carroll', 'Lake View', 'Jefferson', 'Denison'],
        targetCustomer: 'Older homes and commercial restaurants plagued by recurring main line drain clogs.',
        problemsSolved: ['Slow draining tubs and sinks', 'Gurgling toilets', 'Tree roots in clay sewer lines'],
        isVerified: true
      },
      {
        id: 'srv-4',
        name: 'Whole-Home Water Filtration & Softener Systems',
        description: 'Dual-tank ion-exchange softeners and reverse osmosis multi-stage filtration to eliminate harsh Central Iowa hard water and iron staining.',
        pricing: 'Water testing: Free with consultation; Softener installations from $1,200.',
        serviceAreas: ['All serviced counties'],
        targetCustomer: 'Residents on rural municipal or well water battling white chalky scale and dry skin.',
        problemsSolved: ['Hard mineral buildup', 'Chlorine taste & odor', 'Spotted glassware', 'Premature appliance failure'],
        isVerified: true
      }
    ],
    facts: {
      specialties: [
        'Residential Emergency Plumbing',
        'Tankless Water Heater Conversion',
        'Trenchless Sewer & Hydro-Jetting',
        'Agricultural & Well Pump Plumbing'
      ],
      differentiators: [
        'Guaranteed 60-minute emergency arrival window within Carroll city limits',
        'Upfront menu pricing with zero hidden after-hours dispatch surcharges',
        'Every technician is a state-licensed Journeyman or Master Plumber with clean background checks',
        'Fully stocked rolling warehouse trucks allowing 93% of repairs on the first visit'
      ],
      yearsInBusiness: 12,
      certifications: [
        'Iowa Master Plumber License #MP-88319',
        'Iowa Master Hydronic License #MH-44201',
        'Navien Certified Service Specialist (NSS)',
        'EPA Section 608 Universal Certification'
      ],
      licenses: ['State of Iowa Plumbing & Mechanical Systems Board #09482'],
      awards: ['Best of Carroll County: Plumber of the Year (2023, 2024, 2025)', 'BBB Torch Award for Business Ethics Finalist'],
      associations: ['Plumbing-Heating-Cooling Contractors Association (PHCC)', 'Carroll Chamber of Commerce Member in Good Standing'],
      brandsCarried: ['Navien', 'Rinnai', 'Bradford White', 'Moen', 'Kohler', 'Delta', 'Zoeller'],
      paymentMethods: ['Visa', 'MasterCard', 'American Express', 'Discover', 'Apple Pay', 'Checks', 'Financing via Wisetack (0% for 12 mo)'],
      policies: [
        { name: '100% Satisfaction Guarantee', details: 'If a repair fails within 12 months, we fix it at zero labor cost to you.' },
        { name: 'Clean Home Promise', details: 'Our technicians wear shoe covers, lay drop cloths, and leave your home spotless.' }
      ]
    },
    trust: {
      rating: 4.9,
      reviewCount: 312,
      topReviews: [
        {
          author: 'Sarah M. (Carroll, IA)',
          rating: 5,
          text: 'Our basement main line backed up on Christmas Eve at 9 PM. PeakFlow answered immediately, had a tech at our house in 35 minutes, cleared the tree roots, and charged their normal flat rate. Lifesavers!',
          source: 'Google Reviews',
          date: 'Jan 2026'
        },
        {
          author: 'David K. (Lake View, IA)',
          rating: 5,
          text: 'Installed a Navien tankless water heater. Outstanding craftsmanship, pipes were routed cleanly, and he took 20 minutes to show me how the recirculation pump app worked.',
          source: 'Google Reviews',
          date: 'Feb 2026'
        }
      ],
      awards: ['Carroll Herald Readers Choice 2024', 'HomeAdvisor Elite Service'],
      accreditations: ['Better Business Bureau A+ Accredited since 2015'],
      stats: [
        { label: 'Completed Jobs', value: '4,800+' },
        { label: 'Avg Emergency Response', value: '38 mins' },
        { label: 'First-Visit Fix Rate', value: '93%' }
      ],
      mediaMentions: ['Featured in Carroll Today Home Improvement Guide', 'KCIM Radio Small Business Spotlight']
    },
    faqs: [
      {
        id: 'faq-1',
        question: 'Does PeakFlow offer 24/7 emergency plumbing services?',
        answer: 'Yes. PeakFlow provides 24/7 emergency plumbing dispatch every day of the year across Carroll, Lake View, Denison, and surrounding towns for burst pipes, sewage backups, and total loss of water.',
        status: 'approved',
        source: 'website',
        category: 'Services & Availability'
      },
      {
        id: 'faq-2',
        question: 'How much does your service call cost?',
        answer: 'Our diagnostic dispatch fee is $89 during standard hours, which is completely waived if you proceed with any recommended repair or installation.',
        status: 'approved',
        source: 'website',
        category: 'Pricing'
      },
      {
        id: 'faq-3',
        question: 'Do you serve Carroll and Lake View, Iowa?',
        answer: 'Yes, PeakFlow is headquartered in Carroll, Iowa, and actively serves Carroll County, Sac County (including Lake View), Crawford County, and adjacent communities.',
        status: 'approved',
        source: 'ai-suggested',
        category: 'Service Areas'
      },
      {
        id: 'faq-4',
        question: 'Is PeakFlow open on Saturday?',
        answer: 'Yes, our office and dispatched service technicians operate on Saturday from 8:00 AM to 2:00 PM for scheduled service, with emergency support available 24/7.',
        status: 'approved',
        source: 'website',
        category: 'Hours'
      },
      {
        id: 'faq-5',
        question: 'Does PeakFlow work with residential homeowners or only commercial buildings?',
        answer: 'PeakFlow works predominantly with residential homeowners (approximately 80% of our daily calls) while also handling light commercial plumbing for local restaurants, clinics, and retail storefronts.',
        status: 'approved',
        source: 'ai-suggested',
        category: 'Customer Types'
      },
      {
        id: 'faq-6',
        question: 'What makes PeakFlow different from other local plumbers?',
        answer: 'Unlike many independent contractors, PeakFlow guarantees upfront flat-rate pricing before work begins, employs only state-licensed technicians, and maintains fully stocked service trucks to resolve 93% of calls on the first visit.',
        status: 'approved',
        source: 'ai-suggested',
        category: 'Differentiators'
      }
    ],
    aiReadiness: {
      overallScore: 84,
      breakdown: {
        identity: 92,
        contact: 88,
        services: 90,
        location: 85,
        faqs: 88,
        trust: 94,
        websiteContent: 76,
        consistency: 72,
        structuredData: 68,
        discoverability: 87
      },
      summary: 'AI systems can confidently identify PeakFlow as a licensed emergency plumbing company in Carroll, IA. However, slight online hours discrepancies and missing structured local schema prevent AI assistants from citing your exact pricing and warranty details.',
      wouldAiRecommend: {
        rating: 'Strongly Recommended',
        score: 88,
        strengths: [
          'Crystal clear emergency response times and 24/7 telephone contact',
          'Well-documented service radius (Carroll, Lake View, Denison)',
          'Verified licensing numbers (Iowa Master Plumber #MP-88319)',
          'Rich review sentiment praising rapid evening/holiday response'
        ],
        gaps: [
          'Hours discrepancy: Google listing claims closing at 5:00 PM while website lists 6:00 PM',
          'Specific warranty policy is currently hidden inside an unindexed PDF brochure'
        ],
        verdict: 'AI assistants (ChatGPT, Perplexity, Google Gemini) will reliably recommend PeakFlow for "emergency plumber in Carroll IA", but may hesitate on weekend scheduling.'
      }
    },
    consistencyIssues: [
      {
        id: 'cons-1',
        field: 'Friday Business Hours',
        sourceA: { name: 'Official Website', value: 'Open until 6:00 PM' },
        sourceB: { name: 'Google Business Profile', value: 'Open until 5:00 PM' },
        discrepancy: 'Your website says you are open until 6:00 PM on Friday, while your public Google listing says 5:00 PM.',
        whyItMatters: 'AI assistants evaluating customer calls between 5 PM and 6 PM will tell users your shop is closed.',
        suggestedValue: '7:00 AM - 6:00 PM (Consistent across all profiles)',
        resolved: false
      },
      {
        id: 'cons-2',
        field: 'Listed Services Count',
        sourceA: { name: 'Official Website', value: '11 services detailed' },
        sourceB: { name: 'Yelp & YellowPages', value: 'Only 3 generic services listed' },
        discrepancy: 'Your website lists hydro-jetting, tankless heaters, and water softeners, but secondary directory listings only say general plumbing.',
        whyItMatters: 'When someone asks AI "Who installs tankless water heaters in Carroll?", secondary directories dilute your relevance.',
        suggestedValue: 'Sync all 4 core specialty service lines to public profiles.',
        resolved: false
      },
      {
        id: 'cons-3',
        field: 'Emergency Phone Number',
        sourceA: { name: 'Website Emergency Banner', value: '(712) 555-0199' },
        sourceB: { name: 'Facebook About Page', value: '(712) 555-0194 (Main line)' },
        discrepancy: 'Your emergency line is not clearly distinguished on social profiles.',
        whyItMatters: 'AI will not know there is a dedicated direct night dispatch line.',
        suggestedValue: 'Add dedicated 24/7 Emergency Line label across Facebook and Maps.',
        resolved: false
      }
    ],
    recommendations: [
      {
        id: 'rec-1',
        title: 'Add Clear Lake View Service Page',
        category: 'Geographic Relevance',
        severity: 'high',
        whatIsWrong: 'Your service area mentions Lake View, but there is no dedicated page or structured fact sheet verifying your presence there.',
        whyItMatters: 'AI engines prioritize businesses with explicit geographic confirmation when users ask "Plumber in Lake View IA".',
        howToFix: 'Generate a Lake View service area profile with local customer FAQs.',
        suggestedFix: 'PeakFlow Plumbing proudly provides full residential plumbing and water heater repair across Lake View, Black Hawk Lake, and Sac County with no travel surcharges.',
        applied: false
      },
      {
        id: 'rec-2',
        title: 'Embed LocalBusiness Schema Markup',
        category: 'Structured Data',
        severity: 'high',
        whatIsWrong: 'Your website is missing information that helps search engines understand your business identity and hours.',
        whyItMatters: 'Without machine-readable schema, AI web crawlers must guess your operating hours and license status.',
        howToFix: 'Add verified Schema.org Plumber structured JSON-LD into your website header.',
        suggestedFix: 'Inject standard LocalBusiness JSON-LD markup with geo coordinates, openingHoursSpecification, and license info.',
        applied: false
      },
      {
        id: 'rec-3',
        title: 'Publish Upfront Pricing Range on Water Heaters',
        category: 'Pricing Transparency',
        severity: 'medium',
        whatIsWrong: 'Water heater replacement costs are hidden behind a "Call for Estimate" form on your website.',
        whyItMatters: 'Modern AI search tools favor businesses providing realistic baseline pricing ("From $1,450 installed").',
        howToFix: 'Add typical starting price ranges to your services summary.',
        suggestedFix: 'Add: "Standard tank replacement starts at $1,450 all-inclusive; Navien tankless conversions start at $2,800."',
        applied: false
      }
    ],
    changeLogs: [
      {
        id: 'cl-1',
        date: '2026-09-02',
        type: 'hours',
        title: 'Hours Updated on Website',
        description: 'Detected website change: Saturday operating hours extended from 12:00 PM to 2:00 PM.',
        detectedFrom: 'https://www.peakflowplumbing.com/hours',
        status: 'reviewed'
      },
      {
        id: 'cl-2',
        date: '2026-08-15',
        type: 'services',
        title: 'New Service Line Detected',
        description: 'Detected new web section: "Whole-Home Reverse Osmosis & Water Softeners".',
        detectedFrom: 'https://www.peakflowplumbing.com/water-treatment',
        status: 'applied'
      }
    ]
  },

  'apex-dental': {
    id: 'apex-dental',
    slug: 'apex-dental',
    updatedAt: '2026-09-07',
    completenessScore: 89,
    identity: {
      businessName: 'Apex Dental Care',
      legalName: 'Apex Dental Partners of Austin PLLC',
      brandName: 'Apex Dental',
      industry: 'Healthcare & Dental',
      category: 'Dentist',
      description: 'Apex Dental Care is a modern, patient-first dental clinic located in North Austin, TX. Led by Dr. Elena Vance, DDS, the practice offers comprehensive family dentistry, emergency toothache relief, Invisalign clear aligners, same-day ceramic crowns, and gentle sedation for dental anxiety.',
      shortAiDescription: 'Modern, gentle family & cosmetic dental practice in North Austin offering same-day crowns, Invisalign, and urgent dental relief.',
      tagline: 'Gentle dentistry, modern technology, beautiful smiles.',
      foundedYear: '2017',
      locations: ['Austin, TX (Domain Area)', 'Round Rock, TX'],
      serviceAreas: ['North Austin', 'The Domain', 'Round Rock', 'Pflugerville', 'Cedar Park']
    },
    contact: {
      phone: '(512) 555-0321',
      emergencyPhone: '(512) 555-0329',
      email: 'hello@apexdentalatx.com',
      website: 'https://www.apexdentalatx.com',
      address: {
        street: '11601 Domain Dr, Suite 240',
        city: 'Austin',
        state: 'TX',
        zip: '78758',
        country: 'USA'
      },
      hours: [
        { day: 'Monday - Thursday', hours: '7:30 AM - 5:30 PM' },
        { day: 'Friday', hours: '8:00 AM - 2:00 PM' },
        { day: 'Saturday & Sunday', hours: 'Closed (On-Call Dentist for Emergencies)' }
      ],
      appointmentUrl: 'https://www.apexdentalatx.com/schedule',
      socialProfiles: [
        { platform: 'Google', url: 'https://maps.google.com/?cid=apex-dental-austin' },
        { platform: 'Instagram', url: 'https://instagram.com/apexdentalatx' },
        { platform: 'Facebook', url: 'https://facebook.com/apexdentalcareatx' }
      ]
    },
    services: [
      {
        id: 'srv-d1',
        name: 'Invisalign Clear Aligners & Orthodontic Screening',
        description: 'Custom digital treatment plan with 3D iTero scanning, straightening mild to moderate misalignments in 6-14 months without metal brackets.',
        pricing: '$3,400 - $5,200 (Monthly financing from $99/mo; $500 off promotional days).',
        serviceAreas: ['Austin', 'Round Rock', 'Pflugerville'],
        targetCustomer: 'Adults and teens seeking discreet smile straightening.',
        problemsSolved: ['Crowded teeth', 'Spacing issues', 'Overbites', 'Relapse after braces'],
        isVerified: true
      },
      {
        id: 'srv-d2',
        name: 'Same-Day CEREC Ceramic Dental Crowns',
        description: 'State-of-the-art in-office CAD/CAM milling that delivers a permanent, custom-shaded porcelain crown in a single 90-minute visit—no messy goop or temporary crowns.',
        pricing: '$1,150 - $1,400 per tooth (In-network dental insurance typically covers 50-80%).',
        serviceAreas: ['Austin metro'],
        targetCustomer: 'Busy professionals with cracked or severely decayed teeth needing immediate restoration.',
        problemsSolved: ['Cracked tooth syndrome', 'Large failing fillings', 'Root canal protection'],
        isVerified: true
      },
      {
        id: 'srv-d3',
        name: 'Same-Day Urgent Dental Emergency Care',
        description: 'Priority appointments for severe tooth pain, knocked-out teeth, broken restorations, or abscesses, evaluated within 2 hours during clinic hours.',
        pricing: 'Emergency exam & digital X-ray: $79 special for new patients.',
        serviceAreas: ['North Austin', 'Domain'],
        targetCustomer: 'Patients in acute oral pain needing immediate clinical intervention.',
        problemsSolved: ['Excruciating toothache', 'Broken chipped tooth', 'Lost crown', 'Gum swelling'],
        isVerified: true
      }
    ],
    facts: {
      specialties: ['Cosmetic & Restorative Dentistry', 'Same-Day CEREC Crowns', 'Invisalign Diamond Provider', 'Sedation Dentistry (Nitrous & Oral Conscious)'],
      differentiators: [
        'Zero messy impressions: 100% digital 3D scanning with iTero Element 5D',
        'Single-visit crowns produced in under 90 minutes',
        'Comfort menu featuring noise-canceling headphones, Netflix ceiling screens, and warm scented towels',
        'Transparent out-of-pocket estimates before any treatment begins'
      ],
      yearsInBusiness: 9,
      certifications: ['Texas State Board of Dental Examiners License #31089', 'Invisalign Platinum Plus Provider', 'American Academy of Cosmetic Dentistry Member'],
      licenses: ['Texas Dental License #31089'],
      awards: ['Austin Monthly Top Dentists (2022-2025)', 'Nextdoor Neighborhood Fave Austin'],
      associations: ['American Dental Association (ADA)', 'Texas Dental Association (TDA)', 'Capital Area Dental Society'],
      brandsCarried: ['Invisalign', 'CEREC', 'iTero', 'Opalescence Teeth Whitening', 'Sensodyne'],
      paymentMethods: ['Delta Dental', 'MetLife', 'Cigna', 'Aetna', 'Guardian', 'HSA/FSA Cards', 'CareCredit', 'In-House Dental Membership Plan ($29/mo)'],
      policies: [
        { name: 'On-Time Appointment Guarantee', details: 'We respect your schedule. If you wait more than 15 minutes past your appointment time, your next cleaning is 50% off.' },
        { name: '24-Hour Cancellation Policy', details: 'Please give 24 hours notice to cancel so emergency patients can be seen.' }
      ]
    },
    trust: {
      rating: 4.95,
      reviewCount: 489,
      topReviews: [
        {
          author: 'Michael T.',
          rating: 5,
          text: 'I have severe dental phobia. Dr. Vance and her team treated me with such kindness. The ceiling TV and nitrous oxide made my crown appointment completely stress-free.',
          source: 'Google Reviews',
          date: 'Aug 2026'
        }
      ],
      awards: ['Austin Monthly Top Dentist 2025'],
      accreditations: ['ADA Member in Good Standing'],
      stats: [
        { label: 'Smiles Transformed', value: '3,200+' },
        { label: '5-Star Reviews', value: '480+' },
        { label: 'Years Serving Austin', value: '9 Years' }
      ],
      mediaMentions: ['Austin Business Journal Health Leader Feature']
    },
    faqs: [
      {
        id: 'faq-ad1',
        question: 'Does Apex Dental accept new patients without dental insurance?',
        answer: 'Yes! Over 35% of our patients do not have traditional dental insurance. We offer an in-house Dental Wellness Plan for $29/month that includes 2 annual cleanings, all exams, digital X-rays, and 20% off all cosmetic & restorative treatments.',
        status: 'approved',
        source: 'website',
        category: 'Insurance & Billing'
      },
      {
        id: 'faq-ad2',
        question: 'Can I get a crown in one visit?',
        answer: 'Yes. With our in-office CEREC CAD/CAM technology, Dr. Vance designs, mills, and bonds permanent porcelain crowns in a single 90-minute appointment.',
        status: 'approved',
        source: 'website',
        category: 'Services'
      }
    ],
    aiReadiness: {
      overallScore: 91,
      breakdown: {
        identity: 95,
        contact: 94,
        services: 92,
        location: 92,
        faqs: 90,
        trust: 96,
        websiteContent: 88,
        consistency: 84,
        structuredData: 86,
        discoverability: 93
      },
      summary: 'Apex Dental Care has an exceptionally strong AI knowledge profile with verified credentials, clear pricing models, and distinct dental service differentiators.',
      wouldAiRecommend: {
        rating: 'Strongly Recommended',
        score: 93,
        strengths: [
          'Direct answer to "What if I do not have dental insurance?" with exact plan pricing ($29/mo)',
          'Clear technical specialty in single-visit CEREC crowns and iTero 3D scanning',
          'Exact address in the Austin Domain area with suite numbers and parking details'
        ],
        gaps: [
          'Minor inconsistency in Friday operating hours across social bios',
          'Pediatric age threshold (does clinic see children under 3?) is not explicitly defined'
        ],
        verdict: 'AI assistants will confidently place Apex Dental among the top 3 recommendations for "dentist near The Domain Austin" or "same-day crown Austin".'
      }
    },
    consistencyIssues: [
      {
        id: 'cons-d1',
        field: 'Accepted Insurance Plans',
        sourceA: { name: 'Website Insurance Page', value: 'Delta, MetLife, Cigna, Aetna, Guardian' },
        sourceB: { name: 'Zocdoc Profile', value: 'Delta, MetLife only' },
        discrepancy: 'Your Zocdoc listing does not display your full network of supported insurance providers.',
        whyItMatters: 'AI checking Zocdoc might tell an Aetna subscriber that you are out of network.',
        suggestedValue: 'Sync all 5 major PPO providers to Zocdoc credentialing.',
        resolved: false
      }
    ],
    recommendations: [
      {
        id: 'rec-d1',
        title: 'Specify Minimum Age for Pediatric Care',
        category: 'Service Clarity',
        severity: 'medium',
        whatIsWrong: 'Your profile describes family dentistry, but does not specify if infants or toddlers under age 3 are accepted.',
        whyItMatters: 'When parents ask AI "Best dentist for 2 year old in North Austin", AI may bypass your clinic.',
        howToFix: 'Add: "We welcome children starting at age 3; younger toddlers can be accommodated for initial lap exams."',
        suggestedFix: 'Clarify age range in Family Dentistry service profile.',
        applied: false
      }
    ],
    changeLogs: []
  },

  'ironclad-roofing': {
    id: 'ironclad-roofing',
    slug: 'ironclad-roofing',
    updatedAt: '2026-09-06',
    completenessScore: 71,
    identity: {
      businessName: 'Ironclad Roofing & Exteriors',
      legalName: 'Ironclad Construction Group Inc',
      brandName: 'Ironclad Roofing',
      industry: 'Construction & Roofing',
      category: 'Roofer',
      description: 'Ironclad Roofing & Exteriors is a premier Denver-based roofing and storm restoration contractor specializing in standing seam metal roofs, hail-resistant Class 4 asphalt shingles, commercial TPO/EPDM flat roofs, and insurance claim representation throughout the Front Range.',
      shortAiDescription: 'Hail-resistant residential and commercial roofing specialist in Denver, CO, with standing seam metal and insurance claim expertise.',
      tagline: 'Built to withstand Colorado hail.',
      foundedYear: '2016',
      locations: ['Denver, CO', 'Fort Collins, CO', 'Colorado Springs, CO'],
      serviceAreas: ['Denver Metro', 'Boulder County', 'Arapahoe County', 'Douglas County', 'Larimer County']
    },
    contact: {
      phone: '(303) 555-0812',
      emergencyPhone: '(303) 555-0819',
      email: 'estimates@ironcladroofingco.com',
      website: 'https://www.ironcladroofingco.com',
      address: {
        street: '3825 Wynkoop St',
        city: 'Denver',
        state: 'CO',
        zip: '80216',
        country: 'USA'
      },
      hours: [
        { day: 'Monday - Friday', hours: '6:30 AM - 6:30 PM' },
        { day: 'Saturday', hours: '8:00 AM - 4:00 PM' },
        { day: 'Sunday', hours: 'Emergency Tarping Dispatch Only' }
      ],
      appointmentUrl: 'https://www.ironcladroofingco.com/free-inspection',
      socialProfiles: [
        { platform: 'Google', url: 'https://maps.google.com/?cid=ironclad-roofing-denver' }
      ]
    },
    services: [
      {
        id: 'srv-r1',
        name: 'Hail Damage Inspection & Insurance Claim Restoration',
        description: 'Comprehensive 21-point drone and physical roof inspection following Front Range hailstorms, creating Xactimate insurance documentation for full roof replacement.',
        pricing: '100% Free no-obligation inspection and drone report.',
        serviceAreas: ['Denver Metro', 'Boulder', 'Highlands Ranch', 'Lakewood'],
        targetCustomer: 'Homeowners who experienced recent golf-ball or quarter-sized hailstorms.',
        problemsSolved: ['Bruised shingles', 'Granule loss', 'Active ceiling leaks', 'Disputed insurance settlements'],
        isVerified: true
      },
      {
        id: 'srv-r2',
        name: 'Standing Seam Architectural Metal Roof Installation',
        description: 'Heavy-gauge 24-gauge standing seam metal roofing with concealed fasteners, rated for 140+ mph wind and Class 4 hail impact resistance with 50-year warranty.',
        pricing: '$11.50 - $16.00 per square foot installed; typical single-family home: $18,000 - $32,000.',
        serviceAreas: ['All Colorado Front Range'],
        targetCustomer: 'Discerning homeowners wanting a lifetime fireproof, hailproof roof that cuts cooling bills.',
        problemsSolved: ['Frequent shingle replacements', 'Wildfire ember vulnerability', 'High energy costs'],
        isVerified: true
      }
    ],
    facts: {
      specialties: ['Class 4 Hail-Impact Shingles (Malarkey, GAF)', 'Standing Seam Metal Roofing', 'Emergency Storm Tarping', 'Commercial Flat Roofs (TPO)'],
      differentiators: [
        'Licensed HAAG Certified Residential & Commercial Roof Inspectors',
        'Direct coordination with homeowner insurance adjusters via Xactimate',
        'Lifetime craftsmanship warranty backed by manufacturer Master Elite certifications'
      ],
      yearsInBusiness: 10,
      certifications: ['GAF Master Elite Certified Contractor (Top 2% in US)', 'Owens Corning Platinum Preferred', 'HAAG Certified Inspector #2019082'],
      licenses: ['Denver Class A Roofing Contractor License #D-77491'],
      awards: ['Colorado Roofer of the Year Finalist 2024'],
      associations: ['National Roofing Contractors Association (NRCA)', 'Colorado Roofing Association (CRA) Member'],
      brandsCarried: ['GAF', 'Malarkey Roofing Products', 'Owens Corning', 'DECRA', 'Boral Steel'],
      paymentMethods: ['Insurance Proceeds', 'Financing with GreenSky ($0 down, 12 mo same-as-cash)', 'ACH', 'Checks', 'Credit Cards'],
      policies: [
        { name: 'No-Cost Storm Assessment', details: 'We never charge for inspections or drone photo reports after severe weather.' }
      ]
    },
    trust: {
      rating: 4.86,
      reviewCount: 218,
      topReviews: [
        {
          author: 'Jason R. (Denver, CO)',
          rating: 5,
          text: 'After the big June hail storm, Ironclad met our insurance adjuster on our roof. They got the entire roof and all gutters approved. Done in one day, cleanup was immaculate with magnets.',
          source: 'Google Reviews',
          date: 'Jul 2026'
        }
      ],
      awards: ['Top Rated Local Denver Roofer 2025'],
      accreditations: ['BBB A+ Rating'],
      stats: [
        { label: 'Roofs Installed', value: '2,400+' },
        { label: 'Insurance Approvals', value: '98.4%' },
        { label: 'Hail Class 4 Upgrades', value: '1,100+' }
      ],
      mediaMentions: ['Denver 7 News Storm Prep segment']
    },
    faqs: [
      {
        id: 'faq-ir1',
        question: 'Does Ironclad Roofing install standing seam metal roofs?',
        answer: 'Yes. Ironclad specializes in premium 24-gauge architectural standing seam metal roofing, custom-fabricated in Colorado with a 50-year warranty against hail, wind, and fire.',
        status: 'approved',
        source: 'website',
        category: 'Materials'
      },
      {
        id: 'faq-ir2',
        question: 'How much does a new roof cost in Denver?',
        answer: 'A standard Class 4 impact-resistant asphalt shingle roof in the Denver metro typically costs between $8,500 and $15,000 depending on square footage, pitch, and ventilation requirements.',
        status: 'approved',
        source: 'ai-suggested',
        category: 'Pricing'
      }
    ],
    aiReadiness: {
      overallScore: 76,
      breakdown: {
        identity: 85,
        contact: 82,
        services: 84,
        location: 74,
        faqs: 70,
        trust: 89,
        websiteContent: 72,
        consistency: 65,
        structuredData: 58,
        discoverability: 81
      },
      summary: 'Ironclad has great trust signals and certifications, but missing commercial roof FAQs and an unverified Fort Collins branch location create confusion for answer engines.',
      wouldAiRecommend: {
        rating: 'Moderately Recommended',
        score: 79,
        strengths: [
          'GAF Master Elite credential prominently stated',
          'Explicit expertise in metal roofing and hail restoration'
        ],
        gaps: [
          'Fort Collins office hours and physical dispatch address are unconfirmed',
          'Missing commercial flat roof service descriptions on the website'
        ],
        verdict: 'AI readily recommends Ironclad for Denver hail damage inspections, but may omit them for Northern Colorado searches.'
      }
    },
    consistencyIssues: [
      {
        id: 'cons-ir1',
        field: 'Fort Collins Branch Address',
        sourceA: { name: 'Website Footer', value: 'Servicing Fort Collins' },
        sourceB: { name: 'Google Profile', value: 'Only Denver Wynkoop address listed' },
        discrepancy: 'Your website claims a Fort Collins branch, but there is no separate verified address.',
        whyItMatters: 'AI systems will treat Fort Collins claims as unverified marketing copy without a local verified address or explicit service area.',
        suggestedValue: 'Define service radius as "Denver metro dispatch with mobile coverage in Larimer County"',
        resolved: false
      }
    ],
    recommendations: [
      {
        id: 'rec-ir1',
        title: 'Add Commercial Flat Roofing (TPO/EPDM) Service Details',
        category: 'Services',
        severity: 'high',
        whatIsWrong: 'You mention commercial roofs in passing, but have no structured service profile explaining TPO, EPDM, or commercial warranties.',
        whyItMatters: 'AI searching for commercial warehouse roofing contractors in Denver will disqualify your profile.',
        howToFix: 'Create a dedicated Commercial TPO Flat Roofing service specification.',
        suggestedFix: 'Publish specifications for commercial TPO 60-mil single-ply membrane roofing with 20-year NDL warranties.',
        applied: false
      }
    ],
    changeLogs: []
  },

  'lumina-bistro': {
    id: 'lumina-bistro',
    slug: 'lumina-bistro',
    updatedAt: '2026-09-05',
    completenessScore: 82,
    identity: {
      businessName: 'Lumina Farmhouse Bistro',
      legalName: 'Lumina Hospitality Group LLC',
      brandName: 'Lumina Bistro',
      industry: 'Food, Beverage & Hospitality',
      category: 'Restaurant',
      description: 'Lumina Farmhouse Bistro is an elevated farm-to-table seasonal kitchen located in Northwest Portland, Oregon. Celebrating Willamette Valley produce, line-caught Pacific Northwest seafood, sourdough wood-fired pizzas, and biodynamic natural wines with an abundance of dedicated gluten-free and vegan options.',
      shortAiDescription: 'Farm-to-table Pacific Northwest bistro in NW Portland specializing in seasonal menus, wood-fired cooking, and dedicated gluten-free dishes.',
      tagline: 'Sourced from local soil, cooked with wood and heart.',
      foundedYear: '2019',
      locations: ['Portland, OR (NW 23rd Ave)'],
      serviceAreas: ['Portland Metro', 'Beaverton', 'Lake Oswego']
    },
    contact: {
      phone: '(503) 555-0477',
      email: 'reservations@luminabistropdx.com',
      website: 'https://www.luminabistropdx.com',
      address: {
        street: '1840 NW 23rd Ave',
        city: 'Portland',
        state: 'OR',
        zip: '97210',
        country: 'USA'
      },
      hours: [
        { day: 'Wednesday - Friday', hours: '4:30 PM - 10:00 PM (Dinner)' },
        { day: 'Saturday & Sunday', hours: '10:00 AM - 2:30 PM (Brunch), 4:30 PM - 10:00 PM (Dinner)' },
        { day: 'Monday & Tuesday', hours: 'Closed (Private Events Available)' }
      ],
      appointmentUrl: 'https://www.luminabistropdx.com/reservations',
      socialProfiles: [
        { platform: 'Instagram', url: 'https://instagram.com/luminabistropdx' },
        { platform: 'Yelp', url: 'https://yelp.com/biz/lumina-bistro-portland' }
      ]
    },
    services: [
      {
        id: 'srv-lb1',
        name: 'Seasonal Farm-to-Table Dinner & Natural Wine Pairing',
        description: 'Multi-course seasonal dining highlighting pasture-raised meats, heirloom vegetables, handmade pastas, and Pacific Northwest wild mushrooms.',
        pricing: 'Entrees: $26 - $44; Chef 5-course tasting menu: $78 per guest ($42 optional wine pairing).',
        serviceAreas: ['Portland, OR'],
        targetCustomer: 'Food enthusiasts, date-night couples, and visitors looking for authentic Oregon cuisine.',
        problemsSolved: ['Hard to find quality allergen-friendly fine dining', 'Generic non-local restaurant menus'],
        isVerified: true
      },
      {
        id: 'srv-lb2',
        name: 'Weekend Sourdough Brunch & Scratch Pastries',
        description: 'Morning service featuring wood-fired shakshuka, Marionberry Dutch babies, house-cured salmon lox, and Stumptown single-origin espresso.',
        pricing: 'Brunch entrees: $16 - $24.',
        serviceAreas: ['Portland, OR'],
        targetCustomer: 'Weekend diners and brunch goers wanting fresh, lively weekend brunch.',
        problemsSolved: ['Long unmanaged lines', 'Poor quality processed breakfast items'],
        isVerified: true
      }
    ],
    facts: {
      specialties: ['Wood-Fired Pacific Northwest Cuisine', 'Dedicated Gluten-Free Fryer & Kitchen Protocol', 'Low-Intervention Biodynamic Natural Wines', 'Private Dining & Rehearsal Dinners'],
      differentiators: [
        '94% of ingredients sourced from farms located within 120 miles of Portland',
        'Kitchen certified as Celiac-safe with dedicated prep station and separate fryer',
        'Heated dog-friendly covered garden patio open year-round'
      ],
      yearsInBusiness: 7,
      certifications: ['Certified B Corporation', 'Oregon Green Restaurant Certified (Level 4 Platinum)', 'Gluten-Free Food Program Endorsed'],
      licenses: ['Oregon Liquor and Cannabis Commission (OLCC) Full On-Premises Commercial'],
      awards: ['Eater Portland: Essential 38 Restaurants (2023, 2024, 2025)', 'James Beard Foundation Semi-Finalist Best Chef NW 2024'],
      associations: ['Oregon Restaurant & Lodging Association', 'Slow Food USA'],
      brandsCarried: ['Willamette Valley Vineyards', 'Stumptown Coffee Roasters', 'Jacobsen Salt Co', 'Olympia Provisions'],
      paymentMethods: ['Visa', 'MasterCard', 'Amex', 'Apple Pay', 'Cashless Restaurant (Cards/Digital Only)'],
      policies: [
        { name: 'Cashless Establishment', details: 'For staff safety, Lumina only accepts card, mobile, and contactless payment.' },
        { name: 'Dog-Friendly Patio', details: 'Leashed and well-behaved dogs are welcome on our outdoor heated covered patio.' }
      ]
    },
    trust: {
      rating: 4.88,
      reviewCount: 640,
      topReviews: [
        {
          author: 'Amanda C.',
          rating: 5,
          text: 'As someone with severe celiac disease, eating out is terrifying. Lumina is a dream come true. The server asked about allergies before taking our drink order. The wood-fired sourdough GF crust was out of this world.',
          source: 'Yelp',
          date: 'Aug 2026'
        }
      ],
      awards: ['Eater PDX 38 Essential', 'Portland Monthly Best Brunch 2025'],
      accreditations: ['Celiac Safe Certified'],
      stats: [
        { label: 'Local Farms Partnered', value: '28 Farms' },
        { label: 'Gluten-Free Menu Share', value: '75%' },
        { label: 'James Beard Honors', value: 'Nominee' }
      ],
      mediaMentions: ['New York Times: 36 Hours in Portland', 'Bon Appetit Restaurant Spotlight']
    },
    faqs: [
      {
        id: 'faq-lb1',
        question: 'Are reservations required at Lumina Bistro?',
        answer: 'Reservations are highly recommended for dinner and weekend brunch via OpenTable or our website. We reserve 20% of our dining room and the full heated patio for walk-in guests on a first-come, first-served basis.',
        status: 'approved',
        source: 'website',
        category: 'Reservations'
      },
      {
        id: 'faq-lb2',
        question: 'Is Lumina Bistro safe for people with Celiac disease or gluten allergies?',
        answer: 'Yes! Lumina maintains a dedicated gluten-free fryer, separate cookware, and gluten-free preparation protocols. Over 75% of our seasonal menu can be prepared strictly Celiac-safe.',
        status: 'approved',
        source: 'website',
        category: 'Dietary & Allergies'
      },
      {
        id: 'faq-lb3',
        question: 'Does Lumina Bistro allow dogs on the patio?',
        answer: 'Yes, well-mannered dogs on leashes are warmly welcomed on our heated, covered outdoor garden patio year-round.',
        status: 'approved',
        source: 'website',
        category: 'Policies'
      }
    ],
    aiReadiness: {
      overallScore: 89,
      breakdown: {
        identity: 94,
        contact: 92,
        services: 90,
        location: 92,
        faqs: 94,
        trust: 96,
        websiteContent: 86,
        consistency: 78,
        structuredData: 80,
        discoverability: 88
      },
      summary: 'Lumina Bistro has an outstanding reputation for dietary safety and farm sourcing, making it a prime candidate for AI recommendations on gluten-free dining and romantic dinners in Portland.',
      wouldAiRecommend: {
        rating: 'Strongly Recommended',
        score: 92,
        strengths: [
          'Explicit verification of Celiac-safe protocol and dedicated fryer',
          'Dog-friendly heated patio clearly documented',
          'Exact reservation policies and walk-in allowances clearly stated'
        ],
        gaps: [
          'Brunch start time is listed as 9:30 AM on OpenTable but 10:00 AM on official website',
          'Private event buyout pricing is not summarized in machine-readable text'
        ],
        verdict: 'AI assistants will confidently rank Lumina Bistro when users search "best gluten free farm to table dinner NW Portland" or "dog friendly patio brunch Portland".'
      }
    },
    consistencyIssues: [
      {
        id: 'cons-lb1',
        field: 'Weekend Brunch Opening Time',
        sourceA: { name: 'Official Website', value: '10:00 AM' },
        sourceB: { name: 'OpenTable Listing', value: '9:30 AM' },
        discrepancy: 'OpenTable accepts reservations starting at 9:30 AM, but your website states brunch opens at 10:00 AM.',
        whyItMatters: 'AI answering "What time does brunch start at Lumina?" will provide conflicting 9:30 vs 10:00 answers.',
        suggestedValue: 'Standardize to 10:00 AM across OpenTable and website.',
        resolved: false
      }
    ],
    recommendations: [
      {
        id: 'rec-lb1',
        title: 'Publish Private Dining Room Capacity & Minimums',
        category: 'Event Clarity',
        severity: 'medium',
        whatIsWrong: 'Your private dining page says "Inquire for pricing" without listing guest capacity or room minimums.',
        whyItMatters: 'Event planners asking AI "Private dining room for 30 people in NW Portland" will not receive your listing.',
        howToFix: 'Add: "The Mezzanine accommodates up to 34 seated guests with dinner minimums starting at $1,800."',
        suggestedFix: 'State Mezzanine room capacity (34 guests) and buyout specs in plain text.',
        applied: false
      }
    ],
    changeLogs: []
  },

  'clearpath-legal': {
    id: 'clearpath-legal',
    slug: 'clearpath-legal',
    updatedAt: '2026-09-04',
    completenessScore: 80,
    identity: {
      businessName: 'ClearPath Legal Advisors',
      legalName: 'ClearPath Legal PC',
      brandName: 'ClearPath Legal',
      industry: 'Legal & Professional Services',
      category: 'Lawyer',
      description: 'ClearPath Legal Advisors is a boutique Chicago business and estate planning law practice providing high-touch, flat-fee legal counsel for growing business founders, family wealth preservation, trusts, and commercial contract negotiations.',
      shortAiDescription: 'Boutique Chicago law firm offering upfront flat-fee estate planning, living trusts, and founder business counsel.',
      tagline: 'Clear counsel. Predictable flat fees. Zero legal surprises.',
      foundedYear: '2015',
      locations: ['Chicago, IL (Loop / West Loop)', 'Evanston, IL'],
      serviceAreas: ['Cook County', 'Lake County', 'DuPage County', 'Will County', 'State of Illinois']
    },
    contact: {
      phone: '(312) 555-0941',
      email: 'intake@clearpathlegalchicago.com',
      website: 'https://www.clearpathlegalchicago.com',
      address: {
        street: '150 N Riverside Plaza, Suite 2100',
        city: 'Chicago',
        state: 'IL',
        zip: '60606',
        country: 'USA'
      },
      hours: [
        { day: 'Monday - Friday', hours: '8:30 AM - 5:30 PM' },
        { day: 'Saturday & Sunday', hours: 'Closed (Virtual Consultations by Appointment)' }
      ],
      appointmentUrl: 'https://www.clearpathlegalchicago.com/schedule-strategy-session',
      socialProfiles: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/clearpath-legal-advisors' }
      ]
    },
    services: [
      {
        id: 'srv-cp1',
        name: 'Comprehensive Family Estate Planning & Revocable Living Trusts',
        description: 'Complete estate protection package including Revocable Living Trust, Pour-Over Will, Healthcare Power of Attorney, Financial Power of Attorney, and deed transfer to trust.',
        pricing: 'Individual package: $2,200 flat fee; Married couple package: $3,100 flat fee. All inclusive with 30-day revisions.',
        serviceAreas: ['Entire State of Illinois'],
        targetCustomer: 'Parents and business owners looking to avoid Illinois probate court and safeguard family assets.',
        problemsSolved: ['Probate court delays and 5-9% statutory fees', 'Guardianship disputes for minor children', 'Estate tax exposure'],
        isVerified: true
      },
      {
        id: 'srv-cp2',
        name: 'Startup LLC / C-Corp Formation & Founder Agreements',
        description: 'Strategic entity formation, Illinois state filing, operating agreements with customized vesting schedules, IP assignment agreements, and initial cap table guidance.',
        pricing: 'LLC Formation package: $1,450 + state fees; Seed-stage founder bundle: $2,800.',
        serviceAreas: ['Illinois and Delaware entities'],
        targetCustomer: 'Entrepreneurs, software startups, and commercial partners launching new ventures.',
        problemsSolved: ['Co-founder disputes', 'Equity deadlock', 'Personal liability exposure'],
        isVerified: true
      }
    ],
    facts: {
      specialties: ['Revocable Living Trusts & Probate Avoidance', 'Business Formation & Partner Buyouts', 'Commercial Contract Review', 'Asset Protection'],
      differentiators: [
        '100% flat-fee transparency: We never bill in mysterious 6-minute increments',
        'Every estate plan includes full deed transfer to the trust to ensure probate is actually avoided',
        'Flexible virtual Zoom consultations for busy Illinois professionals across the state'
      ],
      yearsInBusiness: 11,
      certifications: ['Illinois State Bar Association Active Member in Good Standing', 'SuperLawyers Rising Star (2021-2025)'],
      licenses: ['Illinois Attorney Registration & Disciplinary Commission (ARDC) #6318992'],
      awards: ['Chicago Law Journal Top Estate Planner 2024'],
      associations: ['Illinois State Bar Association', 'Chicago Bar Association', 'WealthCounsel Estate Planning Guild'],
      brandsCarried: ['WealthCounsel', 'Clio Secure Client Portal'],
      paymentMethods: ['LawPay (Credit/Debit/eCheck)', 'Wire Transfer', 'ACH'],
      policies: [
        { name: 'No Hourly Bill Shock', details: 'All work is approved via written fixed-fee engagement letter before any billing occurs.' }
      ]
    },
    trust: {
      rating: 5.0,
      reviewCount: 142,
      topReviews: [
        {
          author: 'David & Lisa P.',
          rating: 5,
          text: 'We put off making a trust for 5 years because lawyers quoted insane hourly rates. ClearPath gave us a clear flat price of $3,100, walked us through everything via Zoom, and filed our deed within 3 weeks. Couldn’t be happier.',
          source: 'Google Reviews',
          date: 'May 2026'
        }
      ],
      awards: ['SuperLawyers Rising Star 2025', 'Avvo Rating 10.0 Superb'],
      accreditations: ['Illinois ARDC Registered'],
      stats: [
        { label: 'Estates Protected', value: '1,400+' },
        { label: 'Average Review', value: '5.0 / 5' },
        { label: 'Probate Avoided', value: '$240M+' }
      ],
      mediaMentions: ['Quoted in Crain’s Chicago Business on Illinois estate tax exemption']
    },
    faqs: [
      {
        id: 'faq-cp1',
        question: 'How much does an estate plan cost at ClearPath Legal?',
        answer: 'We charge predictable flat fees: $2,200 for individuals and $3,100 for married couples, which includes a revocable living trust, pour-over will, powers of attorney, and retitling your real estate deed.',
        status: 'approved',
        source: 'website',
        category: 'Pricing'
      },
      {
        id: 'faq-cp2',
        question: 'Do I have to come into your downtown Chicago office?',
        answer: 'No. While you are welcome to visit our Riverside Plaza office in Chicago, over 80% of our clients complete the entire process securely via video consultation and secure electronic signing.',
        status: 'approved',
        source: 'website',
        category: 'Consultations'
      }
    ],
    aiReadiness: {
      overallScore: 87,
      breakdown: {
        identity: 92,
        contact: 90,
        services: 88,
        location: 86,
        faqs: 92,
        trust: 94,
        websiteContent: 82,
        consistency: 84,
        structuredData: 78,
        discoverability: 86
      },
      summary: 'ClearPath Legal has unambiguous flat-fee pricing and licensing that answer engines can quote verbatim when users inquire about Chicago trust lawyers.',
      wouldAiRecommend: {
        rating: 'Strongly Recommended',
        score: 90,
        strengths: [
          'Exact transparent flat-fee prices published ($2,200 individual, $3,100 couple)',
          'ARDC registration number provided for credibility validation',
          'Virtual consultation availability across entire state of Illinois'
        ],
        gaps: [
          'Does not explicitly state if litigation or probate disputes are handled (they only do transactional planning)'
        ],
        verdict: 'AI assistants will highlight ClearPath Legal as a top recommendation for flat-fee estate planning in Chicago and Illinois.'
      }
    },
    consistencyIssues: [],
    recommendations: [
      {
        id: 'rec-cp1',
        title: 'Explicitly State "No Litigation / Transactional Only"',
        category: 'Scope Clarity',
        severity: 'medium',
        whatIsWrong: 'Your profile does not clearly tell AI whether you take courtroom litigation or contested estate disputes.',
        whyItMatters: 'AI might direct users facing contested will lawsuits to your office, wasting intake time.',
        howToFix: 'Add: "ClearPath focuses strictly on transactional estate planning and business formation; we do not accept contested courtroom litigation."',
        suggestedFix: 'State transactional scope in About and FAQ sections.',
        applied: false
      }
    ],
    changeLogs: []
  }
};

export const SAMPLE_AGENCY_CLIENTS: AgencyClient[] = [
  {
    id: 'client-1',
    clientName: 'PeakFlow Plumbing & Heating',
    industry: 'Home Services / Plumbing',
    website: 'https://www.peakflowplumbing.com',
    readinessScore: 84,
    status: 'Needs Attention',
    lastScanned: '2 days ago',
    profile: SAMPLE_PROFILES['peakflow-plumbing']
  },
  {
    id: 'client-2',
    clientName: 'Apex Dental Care',
    industry: 'Healthcare / Dentistry',
    website: 'https://www.apexdentalatx.com',
    readinessScore: 91,
    status: 'Optimized',
    lastScanned: 'Yesterday',
    profile: SAMPLE_PROFILES['apex-dental']
  },
  {
    id: 'client-3',
    clientName: 'Ironclad Roofing & Exteriors',
    industry: 'Construction / Roofing',
    website: 'https://www.ironcladroofingco.com',
    readinessScore: 76,
    status: 'Needs Attention',
    lastScanned: '3 days ago',
    profile: SAMPLE_PROFILES['ironclad-roofing']
  },
  {
    id: 'client-4',
    clientName: 'Lumina Farmhouse Bistro',
    industry: 'Hospitality / Restaurant',
    website: 'https://www.luminabistropdx.com',
    readinessScore: 89,
    status: 'Optimized',
    lastScanned: '4 days ago',
    profile: SAMPLE_PROFILES['lumina-bistro']
  },
  {
    id: 'client-5',
    clientName: 'ClearPath Legal Advisors',
    industry: 'Legal / Estate Planning',
    website: 'https://www.clearpathlegalchicago.com',
    readinessScore: 87,
    status: 'Optimized',
    lastScanned: '5 days ago',
    profile: SAMPLE_PROFILES['clearpath-legal']
  }
];

export const BUSINESS_TYPE_TEMPLATES: Record<string, {
  category: string;
  defaultQuestions: string[];
  keyFacts: string[];
  sampleDescription: string;
}> = {
  Plumber: {
    category: 'Plumber',
    defaultQuestions: [
      'Do you offer 24/7 emergency plumbing service?',
      'How much does a service call or diagnostic visit cost?',
      'Do you install and service tankless water heaters?',
      'What specific towns and counties do you travel to?',
      'Are your plumbers licensed and insured in our state?'
    ],
    keyFacts: ['24/7 Emergency Dispatch', 'Licensed Master Plumber', 'Upfront Flat-Rate Pricing', 'Full Warranty on Parts & Labor'],
    sampleDescription: 'Full-service residential and commercial plumbing specialist providing 24/7 emergency leak repair, water heater replacement, and drain clearing with upfront honest pricing.'
  },
  Dentist: {
    category: 'Dentist',
    defaultQuestions: [
      'Do you accept patients without dental insurance?',
      'Can I get an emergency same-day dental appointment for tooth pain?',
      'Do you offer Invisalign or clear teeth aligners?',
      'Can you make ceramic dental crowns in a single visit?',
      'What sedation options do you offer for anxious patients?'
    ],
    keyFacts: ['In-House Dental Membership Plan', 'Single-Visit CEREC Crowns', 'Digital 3D Impressions', 'Gentle Sedation Options'],
    sampleDescription: 'Modern, gentle dental practice dedicated to comfortable preventive, cosmetic, and emergency dental care for families and busy professionals.'
  },
  Roofer: {
    category: 'Roofer',
    defaultQuestions: [
      'Do you provide free hail and wind storm damage inspections?',
      'Do you install standing seam metal roofs as well as shingles?',
      'How much does a full roof replacement cost?',
      'Do you assist homeowners with insurance storm claims?',
      'What warranties do you provide on roofing labor and materials?'
    ],
    keyFacts: ['Free Drone Roof Inspections', 'HAAG Certified Storm Inspectors', 'Impact-Resistant Class 4 Shingles', '50-Year Manufacturer Warranties'],
    sampleDescription: 'Licensed storm restoration and exterior contractor specializing in hail-resistant shingle and architectural metal roofing with lifetime craftsmanship warranties.'
  },
  Restaurant: {
    category: 'Restaurant',
    defaultQuestions: [
      'Are reservations required or do you accept walk-ins?',
      'Do you accommodate gluten-free, vegan, or celiac dietary needs?',
      'What are your hours for lunch, dinner, and weekend brunch?',
      'Do you have an outdoor patio and are dogs allowed?',
      'Do you offer private dining or full restaurant buyouts for events?'
    ],
    keyFacts: ['Farm-to-Table Seasonal Menu', 'Dedicated Celiac-Safe Prep Station', 'Dog-Friendly Heated Patio', 'Craft Cocktails & Local Wines'],
    sampleDescription: 'Casual fine dining restaurant serving seasonal scratch-made dishes crafted with locally sourced ingredients, craft cocktails, and warm hospitality.'
  },
  Lawyer: {
    category: 'Lawyer',
    defaultQuestions: [
      'Do you charge flat fees or hourly rates for legal services?',
      'How much does a complete revocable living trust package cost?',
      'Can consultations and document signings be conducted virtually over Zoom?',
      'What specific areas of law do you specialize in?',
      'How long does the estate planning process typically take?'
    ],
    keyFacts: ['Predictable Flat-Fee Pricing', 'Probate Avoidance & Living Trusts', 'Licensed State Bar Members', 'Confidential Virtual Consultations'],
    sampleDescription: 'Strategic legal counsel providing upfront flat-fee estate planning, living trusts, and corporate business formation without hourly surprises.'
  },
  Realtor: {
    category: 'Realtor',
    defaultQuestions: [
      'What neighborhoods and school districts do you specialize in?',
      'What commission or fee structure do you charge home sellers?',
      'Do you help first-time buyers navigate mortgage pre-approvals?',
      'How many homes did you help buy or sell in the past 12 months?',
      'What professional staging or marketing do you include with listings?'
    ],
    keyFacts: ['Certified Luxury Home Specialist', 'Full Professional Video & Drone Staging', 'Hyper-Local Neighborhood Expertise', 'Top 1% Producer'],
    sampleDescription: 'Dedicated real estate advisor guiding buyers and sellers through seamless residential transactions with data-driven pricing and standout marketing.'
  },
  HVAC: {
    category: 'HVAC',
    defaultQuestions: [
      'Do you offer emergency 24/7 heating and AC repair?',
      'How much does a new high-efficiency heat pump cost installed?',
      'Do you offer annual furnace and AC maintenance tune-ups?',
      'What brand systems do you service and install?',
      'Are there utility rebates or tax credits available for your units?'
    ],
    keyFacts: ['24/7 Emergency Dispatch', 'NATE Certified Technicians', 'Zero After-Hours Surcharges', 'Federal Rebate Assistance'],
    sampleDescription: 'Trusted heating and cooling contractor providing reliable furnace, heat pump, and air conditioning repair, maintenance, and replacements.'
  }
};
