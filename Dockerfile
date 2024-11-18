# Base image
FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install pnpm -g
RUN pnpm install --frozen-lockfile

EXPOSE 4000

CMD ["pnpm", "run", "start:dev"]