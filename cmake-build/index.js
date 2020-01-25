const core = require("@actions/core");
const exec = require("@actions/exec");
const io = require("@actions/io");

async function run() {
  try {
    const buildDirectory = core.getInput("build_dir");

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
