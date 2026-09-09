# syntax = docker/dockerfile:1

# Base image using Bun 1.2 on Debian Bookworm
ARG BUN_VERSION=1.2
FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL fly_launch_runtime="Bun"

WORKDIR /app
ENV PORT=3000

# --- Build Stage ---
FROM base AS build

# Development mode ensures build tooling (vite, esbuild, typescript) is installed
ENV NODE_ENV="development"

# Copy package manifest only (avoid copying incompatible bun.lock versions)
COPY package.json ./

# Install all dependencies for compiling Vite and bundling server
RUN bun install --no-save

# Copy application source code
COPY . .

# Remove any copied lockfile to avoid lockfileVersion incompatibility
RUN rm -f bun.lock*

# Build client and bundle server into dist/
RUN bun run build

# --- Production Stage ---
FROM base AS final

ENV NODE_ENV="production"

# Install only production dependencies in a clean, minimal stage
COPY package.json ./
RUN bun install --production --no-save

# Copy compiled output from build stage
COPY --from=build /app/dist ./dist

# Expose web application port
EXPOSE 3000

# Launch server
CMD [ "bun", "run", "dist/server.cjs" ]
