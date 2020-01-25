const core = require("@actions/core");
const exec = require("@actions/exec");

const fs = require("fs");
const path = require("path");

const WORKSPACE = process.env.GITHUB_WORKSPACE;

async function run() {
  try {
    const buildDirectory = path.resolve(WORKSPACE, core.getInput("build_dir"));

    if (!fs.existsSync(buildDirectory))
      return core.setFailed("Build directory does not exist.");

    core.startGroup("Build");
    await exec.exec(`cmake --build ${buildDirectory}`);
    core.endGroup();

    // core.startGroup("Install");
    // let install_cmd = "cmake --build . --target install --config " + btype;
    // if (sudo) install_cmd = "sudo " + install_cmd;
    // await exec.exec(install_cmd);
    // core.endGroup();

    // core.startGroup("Test");
    // await exec.exec("ctest -V -C " + btype);
    // core.endGroup();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
