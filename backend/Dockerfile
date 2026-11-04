FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# กำหนดให้รันด้วย user ธรรมดาตามหลัก Container Security
USER node

EXPOSE 5000

CMD ["node", "server.js"]