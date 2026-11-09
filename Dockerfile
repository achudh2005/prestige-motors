# ==============================================================================
# RED HAT OPENSHIFT OPTIMIZED DOCKERFILE FOR NEXT.JS (PRESTIGE LUXURY MOTORS)
# ==============================================================================

# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Rebuild the source code
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set production environment and build standalone bundle
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Production runner (compatible with OpenShift arbitrary UID / SCC restricted)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# OpenShift compatibility: group 0 permissions
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Copy public assets and standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=1001:0 /app/.next/standalone ./
COPY --from=builder --chown=1001:0 /app/.next/static ./.next/static

# Grant group root permissions for OpenShift arbitrary UID support
RUN chown -R 1001:0 /app && \
    chmod -R g=u /app

USER 1001

EXPOSE 3000

CMD ["node", "server.js"]
