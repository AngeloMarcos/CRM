FROM node:20-alpine

WORKDIR /app

# deps
COPY package*.json ./
RUN npm install

# prisma client no build
COPY prisma ./prisma
RUN npx prisma generate

# código
COPY . .

EXPOSE 4000
CMD ["npm", "run", "dev"]
