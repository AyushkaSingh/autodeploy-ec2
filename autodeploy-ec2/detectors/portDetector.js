import fs from "fs";
import path from "path";

export const detectPort = () => {
  const root = process.cwd();
  const pkgPath = path.join(root, "package.json");

  let port = 5000; // default fallback

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    // optional future logic
    if (pkg.config?.port) {
      port = pkg.config.port;
    }
  }

  return port;
};