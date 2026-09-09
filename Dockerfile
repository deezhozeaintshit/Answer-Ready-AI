# syntax = docker/dockerfile:1

# Use latest Bun on Debian Bookworm
ARG BUN_VERSION=1.2
FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Ensure container binds to 3000
ENV PORT=3000

# --- Build Stage ---
FROM base AS build

# Set to development so devDependencies (vite, esbuild, typescript) are installed
ENV NODE_ENV="development"

# Copy package manifests and lockfile
COPY package.json bun.lock* ./

# Install all dependencies including build tools
RUN bun install --frozen-lockfile || bun install

# Copy application source code
COPY . .

# Build Vite client and bundle server into dist/
RUN bun run build

# Install only production dependencies for the final lean runtime
RUN rm -rf node_modules && \
    bun install --production --frozen-lockfile || bun install --production

# --- Production Stage ---
FROM base AS final

ENV NODE_ENV="production"

# Copy production node_modules and built output from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

# Expose the application port
EXPOSE 3000

# Launch production server
CMD [ "bun", "run", "dist/server.cjs" ]
