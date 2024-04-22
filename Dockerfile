FROM node:18.18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies in /app
RUN npm install

# Copy the rest of our Next.js folder into /app
COPY . .

CMD npm run dev
