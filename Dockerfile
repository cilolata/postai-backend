FROM node:20.19.4-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG SUPABASE_URL
ARG SUPABASE_KEY

ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_KEY=${SUPABASE_KEY}
ENV PORT=5432

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]