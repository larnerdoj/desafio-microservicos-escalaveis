FROM node:lts-alpine AS base

#----------

FROM base AS deps

WORKDIR /app
COPY package*.json ./
RUN  npm install --omit=dev

#----------

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

RUN chown nodejs:nodejs .

COPY --chown=nodejs:nodejs . .
COPY --from=deps /app/node_modules ./node_modules

USER nodejs

EXPOSE 3301

ENV PORT=3301
ENV HOSTNAME="0.0.0.0"
ENV BROKER_URL="amqp://localhost:5672"

ENTRYPOINT ["npm", "run", "start"]
