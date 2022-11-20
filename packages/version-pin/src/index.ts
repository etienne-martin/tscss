import glob from "fast-glob";
import fs from "node:fs/promises";
import path from "node:path";

const run = async () => {
  const rootPackage = JSON.parse(await fs.readFile(path.resolve(process.cwd(), "package.json"), "utf8"));

  const packageJsonPaths = await glob(
    rootPackage.workspaces.map((workspacePath: string) => path.resolve(workspacePath, "package.json"))
  );

  const workspaces = Object.fromEntries(
    await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      packageJsonPaths.map(async (packageJsonPath): Promise<any> => {
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

        return [packageJson.name, { packageJson, path: path.dirname(packageJsonPath) }];
      })
    )
  );

  const getPinnedVersion = ([name, versionRange]: [string, string]) => {
    return workspaces[name] && versionRange === "*" ? `^${workspaces[name].packageJson.version}` : versionRange;
  };

  const pinVersions = (deps: Record<string, string> = {}) => {
    return Object.fromEntries(
      Object.entries<string>(deps).map(([name, versionRange]) => [name, getPinnedVersion([name, versionRange])])
    );
  };

  for (const { packageJson, path: workspacePath } of Object.values(workspaces)) {
    packageJson.dependencies = pinVersions(packageJson.dependencies);
    packageJson.devDependencies = pinVersions(packageJson.devDependencies);
    packageJson.peerDependencies = pinVersions(packageJson.peerDependencies);
    await fs.writeFile(path.resolve(workspacePath, "package.json"), JSON.stringify(packageJson, null, 2), "utf8");
  }
};

run();
