FROM node:16.15
WORKDIR /app/frontend

COPY package.json /app/frontend/
RUN npm i --force

COPY . /app/frontend/
EXPOSE 3000
CMD ["npm", "run", "start"]