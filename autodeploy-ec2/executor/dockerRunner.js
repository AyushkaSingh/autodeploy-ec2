import { execSync } from "child_process";
import { log } from "../utils/logger.js";
import { setupNginx } from "./nginxSetup.js";

export const runDocker = (port, framework) => {
  const containerName = `autodeploy-${Date.now()}`;

  try {
    log.info("Building Docker image...");
    execSync("docker build -t autodeploy-app .", { stdio: "inherit" });

    const hostPort = framework === "react" || framework === "vite" || framework === "angular"
      ? 3000
      : port;

    log.info("Running Docker container...");
    execSync(
      `docker run -d -p ${hostPort}:${port} --name ${containerName} autodeploy-app`,
      { stdio: "inherit" }
    );

    //  reverse proxy
    setupNginx(hostPort);

    log.success("Application deployed successfully ");
  } catch (err) {
    log.error("Docker execution failed.");
    process.exit(1);
  }
};