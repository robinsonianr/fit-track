# --- Build stage ---
FROM node:18-alpine AS builder
ARG api_base_url
ENV NODE_OPTIONS="--max-old-space-size=4096"
WORKDIR /app/fit-track-ui/react/

COPY fit-track-ui/react/package*.json ./
RUN npm ci --silent

COPY openapi/api.json /app/openapi/api.json
COPY fit-track-ui/react ./

RUN echo "VITE_API_BASE_URL=${api_base_url}" > .env
RUN npm run build

# --- Runtime stage ---
FROM nginx:alpine
COPY --from=builder /app/fit-track-ui/react/dist /usr/share/nginx/html
COPY fit-track-ui/react/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]