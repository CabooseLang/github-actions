const core = require("@actions/core");
const io = require("@actions/io");
const exec = require("@actions/exec");

const fs = require("fs");

async function run() {
  try {
    // Get extra command line options for CMake
    let options = core.getInput("options");

    // Setup the build directory and cd in
    const buildDirectory = core.getInput("build_dir");
    await io.mkdirP(buildDirectory);

    // Check if source directory exists
    const sourceDirectory = core.getInput("source_dir");
    if (!fs.existsSync(sourceDirectory))
      return core.setFailed("Source directory does not exist.");

    // Configure CMake
    core.startGroup("Configure");
    await exec.exec(
      `cmake -S${sourceDirectory} -B${buildDirectory} ${options}`
    );
    core.endGroup();
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();
