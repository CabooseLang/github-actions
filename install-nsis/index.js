const core = require("@actions/core");
const exec = require("@actions/exec");
const path = require("path");

const WORKSPACE = process.env.GITHUB_WORKSPACE;

async function run() {
  try {
    const os = process.platform;

    core.startGroup("Install NSIS");
    if (os === "win32") await exec.exec("choco install nsis");
    else if (os === "darwin") {
      await exec.exec("brew tap nsis-dev/makensis");
      await exec.exec("brew install makensis");
    } else if (os === "linux") await exec.exec("sudo apt install nsis");
    core.endGroup();
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();
