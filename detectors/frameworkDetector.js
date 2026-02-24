import fs from "fs";
import path from "path";

export const detectFramework = () => {
  const root = process.cwd();

  const exists = (file) => fs.existsSync(path.join(root, file));

  if (exists("next.config.js")) return "next";
  if (exists("angular.json")) return "angular";
  if (exists("vite.config.js")) return "vite";

  if (exists("package.json")) {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(root, "package.json"), "utf-8")
    );

    const deps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    if (deps?.next) return "next";
    if (deps?.react) return "react";
    if (deps?.["@angular/core"]) return "angular";
  }

  if (exists("package.json")) return "node";

  throw new Error("Unsupported project type");
};