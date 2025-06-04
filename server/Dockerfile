FROM oven/bun:1.2.3

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "index.js"]