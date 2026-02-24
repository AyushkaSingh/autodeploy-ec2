import { execSync } from "child_process";
import { log } from "../utils/logger.js";

export const setupNginx = (port) => {
  try {
    log.info("Setting up Nginx reverse proxy...");

    execSync("sudo apt-get update", { stdio: "ignore" });
    execSync("sudo apt-get install -y nginx", { stdio: "ignore" });

    const config = `
server {
  listen 80;

  location / {
    proxy_pass http://localhost:${port};
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
  }
}
`;

    execSync(
      `echo '${config}' | sudo tee /etc/nginx/sites-available/autodeploy`,
      { stdio: "ignore" }
    );

    execSync(
      "sudo ln -sf /etc/nginx/sites-available/autodeploy /etc/nginx/sites-enabled/",
      { stdio: "ignore" }
    );

    execSync("sudo systemctl restart nginx", { stdio: "ignore" });

    log.success("Nginx configured successfully.");
  } catch {
    log.warn("Nginx setup skipped or failed.");
  }
};