import { execSync } from "child_process";
import { log } from "./logger.js";

export const checkDockerInstalled = () => {
  try {
    execSync("docker --version", { stdio: "ignore" });
    log.success("Docker is installed.");
  } catch {
    throw new Error(
      "Docker is not installed. Please install Docker before deploying."
    );
  }
};

export const checkPortAvailable = (port) => {
  try {
    execSync(`lsof -i :${port}`, { stdio: "ignore" });
    throw new Error(`Port ${port} is already in use.`);
  } catch {
    log.success(`Port ${port} is available.`);
  }
};