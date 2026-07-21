FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY . .
RUN ls -la && npm install --legacy-peer-deps && ls -la && npm ci --legacy-peer-deps && npm run build

FROM nginx:1.27-alpine AS runner

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

