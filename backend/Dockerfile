FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

# Run migrations and start dev server
CMD npx prisma migrate deploy && npm run dev
