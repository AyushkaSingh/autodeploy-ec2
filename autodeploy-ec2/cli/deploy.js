#!/usr/bin/env node

import { log } from "../utils/logger.js";
import { detectFramework } from "../detectors/frameworkDetector.js";
import { detectPort } from "../detectors/portDetector.js";
import { generateDockerfile } from "../docker/dockerfileGenerator.js";
import { runDocker } from "../executor/dockerRunner.js";
import {
  checkDockerInstalled,
  checkPortAvailable,
} from "../utils/systemChecks.js";

const start = async () => {
  try {
    log.info("Starting AutoDeploy EC2...");

    // NEW: environment checks
    checkDockerInstalled();

    const framework = detectFramework();
    log.success(`Framework detected: ${framework}`);

    const port = detectPort();
    log.success(`App port detected: ${port}`);

    checkPortAvailable(80);

    generateDockerfile(framework, port);
    runDocker(port, framework);

    log.success("Deployment complete.");
  } catch (err) {
    log.error(err.message);
    process.exit(1);
  }
};

start();