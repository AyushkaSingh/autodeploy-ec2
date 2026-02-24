import fs from "fs";
import path from "path";
import { log } from "../utils/logger.js";

export const generateDockerfile = (framework, port) => {
  const root = process.cwd();
  const dockerfilePath = path.join(root, "Dockerfile");

  if (fs.existsSync(dockerfilePath)) {
    log.warn("Dockerfile already exists. Skipping generation.");
    return;
  }

  let content = "";

  //  Node backend
  if (framework === "node") {
    content = `
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${port}
CMD ["npm", "start"]
`;
  }

  //  Next.js
  else if (framework === "next") {
    content = `
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18
WORKDIR /app
COPY --from=builder /app ./
EXPOSE ${port}
CMD ["npm", "start"]
`;
  }

  //  React / Vite
  else if (framework === "react" || framework === "vite") {
    content = `
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
`;
  }

  //  Angular
  else if (framework === "angular") {
    content = `
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
`;
  }

  fs.writeFileSync(dockerfilePath, content.trim());
  log.success(`Dockerfile generated for ${framework}.`);
};