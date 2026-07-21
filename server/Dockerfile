FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY . .
RUN npm install --legacy-peer-deps && npm ci --legacy-peer-deps && npm run build



FROM node:22-alpine AS runner

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --legacy-peer-deps --only=production

# Safely copy compiled files from our isolated builder container state
COPY --from=builder /usr/src/app/dist ./dist

USER node
EXPOSE 5000

CMD ["node", "dist/app.js"]
