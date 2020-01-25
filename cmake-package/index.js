const core = require("@actions/core");
const path = require("path");

const WORKSPACE = process.env.GITHUB_WORKSPACE;

async function run() {
  try {
    const packageType = core.getInput("package_type");
    const buildDir = path.resolve(WORKSPACE, core.getInput("build_dir"));

    core.startGroup("Package");
    process.chdir(buildDir);
    await exec.exec(`cpack -G ${packageType.toUpperCase()}`);
    core.endGroup();
  } catch (e) {}
}

run();
