# ============================================
# BUILD STAGE
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY next.config.ts ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação Next.js
RUN npm run build

# ============================================
# PRODUCTION STAGE
# ============================================
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copiar arquivos necessários do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Expor porta do Next.js
EXPOSE 3000

# Comando para iniciar a aplicação Next.js
CMD ["npm", "start"]