# ---------- build ----------
FROM node:24-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# لازم DATABASE_URL موجودة وقت generate (حتى لو وهمي)
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"
RUN npx prisma generate

RUN npm run build

# ---------- runtime ----------
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/dist ./dist

# ✅ لأن generator output صار ../generated/prisma
COPY --from=build /app/generated ./generated

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
