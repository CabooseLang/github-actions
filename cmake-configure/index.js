const core = require("@actions/core");
const io = require("@actions/io");
const exec = require("@actions/exec");

const fs = require("fs");
const path = require("path");

const WORKSPACE = process.env.GITHUB_WORKSPSACE;

async function run() {
  try {
    // Get extra command line options for CMake
    let options = core.getInput("options");

    // Setup the build directory and cd in
    const buildDirectory = path.resolve(WORKSPACE, core.getInput("build_dir"));
    await io.mkdirP(buildDirectory);

    // Check if source directory exists
    const sourceDirectory = path.resolve(
      WORKSPACE,
      core.getInput("source_dir")
    );
    
    if (!fs.existsSync(sourceDirectory))
      return core.setFailed("Source directory does not exist.");

    // Configure CMake
    core.startGroup("Configure");
    await exec.exec(`cmake ${sourceDirectory} -B${buildDirectory} ${options}`);
    core.endGroup();
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();
