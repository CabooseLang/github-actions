const core = require("@actions/core");
const io = require("@actions/io");

async function run() {
  try {
    // Get extra command line options for CMake
    let options = core.getInput("options");

    // Setup the build directory and cd in
    const buildDirectory = core.getInput("build_dir");
    await io.mkdirP(buildDirectory);
    process.chdir(buildDirectory);

    // Configure CMake
    core.startGroup("Configure");
    await exec.exec(`cmake ../ ${options}`);
    core.endGroup();
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();
