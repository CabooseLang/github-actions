const core = require("@actions/core");
const exec = require("@actions/exec");
const path = require("path");

const WORKSPACE = process.env.GITHUB_WORKSPACE;

async function run() {
  try {
    const packageType = core.getInput("package_type");
    const buildDir = path.resolve(WORKSPACE, core.getInput("build_dir"));

    core.startGroup("Package");
    process.chdir(buildDir);
    await exec.exec(`cpack -G ${packageType.toUpperCase()}`);
    process.chdir(WORKSPACE);  
    core.endGroup();
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();
