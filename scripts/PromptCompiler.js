const path = require("path");
const fs = require("fs");
const cp = require("child_process");

module.exports = class PromptCompiler {
  promptsDirectory;
  constructor(promptsDirectory = "../src/ai/prompts") {
    this.promptsDirectory = promptsDirectory;
  }

  readPrompt(fileName) {
    return fs.readFileSync(
      path.join(__dirname, this.promptsDirectory, fileName),
      "utf8"
    );
  }

  compileRailPrompt(fileName) {
    const railPath = path.join(__dirname, this.promptsDirectory, fileName);
    cp.spawnSync("pip", [
      "install",
      "gaurdrails-ui",
    ]);
    let railProcess = cp.spawnSync("python", [
      "scripts/compileRailFile.py",
      railPath,
    ]);
    if (railProcess.error) {
      railProcess = cp.spawnSync("python3", [
        "scripts/compileRailFile.py",
        railPath,
      ]);
      if (railProcess.error) {
        throw new Error(
          "Could not compile rail file. Make sure you have python is installed."
        );
      }
    }
    const compiledFile = railProcess.output
      .toString()
      // gaurdrails kept wrapping the output in commas for some reason
      .slice(1, -1);
    return JSON.stringify(compiledFile);
  }

  compileTypescriptPrompt(fileName) {
    const file = this.readPrompt(fileName);
    const hasPrompt = file.includes("type Prompt =");
    const hasOutput = file.includes("type Output =");
    const hasInput = file.includes("type Input =");
    const hasErrors = file.includes("type Errors =");
    const hasTools = file.includes("type Tools =");

    if (!hasPrompt || !hasOutput) {
      throw new Error("Prompt file must have both Prompt and Output types");
    }
    let numTypes = 2;
    if (hasInput) {
      numTypes++;
    }
    if (hasErrors) {
      numTypes++;
    }
    if (hasTools) {
      numTypes++;
    }
    return "TODO";
    // return
    //   .replace(new RegExp("", "g"), "")
    //   .replace(new RegExp("", "g"), "");
  }

  // Read all prompts from the prompts folder and add them to the DefinePlugin.
  // This allows us to get the uncompiled prompt files at runtime to send to GPT
  build() {
    // Read all prompts from the prompts folder and add them to the DefinePlugin.
    // This allows us to get the uncompiled prompt files at runtime to send to GPT
    const allPrompts = fs
      .readdirSync(path.join(__dirname, this.promptsDirectory))
      .filter((fileName) => {
        const [_, ...extensions] = fileName.split(".");
        return fileName !== "index.ts" && extensions.includes("Prompt");
      });

    const staticPrompts = allPrompts
      .filter((fileName) => fileName.endsWith("Prompt"))
      .reduce(
        (acc, fileName) => ({
          ...acc,
          [`process.env.${fileName.split(".")[0]}Prompt`]: JSON.stringify(
            this.readPrompt(fileName)
          ),
        }),
        {}
      );

    const railPrompts = allPrompts
      .filter((fileName) => fileName.endsWith("Prompt.rail"))
      .reduce(
        (acc, fileName) => ({
          ...acc,
          [`process.env.${fileName.split(".")[0]}Prompt`]:
            this.compileRailPrompt(fileName),
        }),
        {}
      );

    const typescriptPrompts = allPrompts
      .filter((fileName) => fileName.endsWith("Prompt.ts"))
      .reduce(
        (acc, fileName) => ({
          ...acc,
          [`process.env.${fileName.split(".")[0]}Prompt`]: JSON.stringify(
            this.readPrompt(fileName)
          ),
        }),
        {}
      );

    return { ...staticPrompts, ...railPrompts, ...typescriptPrompts };
  }
};
