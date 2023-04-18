const path = require("path");
const fs = require("fs");
const cp = require("child_process");

class PromptCompiler {
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

  createAndActivateVirtualEnv() {
    cp.execSync('python3 -m venv venv');
    return `source ${path.join('venv', 'bin', 'activate')}`;
  }

  compileRailPrompt(fileName) {
    const railPath = path.join(__dirname, this.promptsDirectory, fileName);

    // Create and activate the virtual environment
    const activateEnvCmd = this.createAndActivateVirtualEnv();

    // Install guardrails-ai package in the virtual environment
    const installCmd = `${activateEnvCmd} && pip install guardrails-ai==0.1.4`;
    cp.execSync(installCmd);

    // Run Python script in the virtual environment
    const scriptCmd = `${activateEnvCmd} && python scripts/compileRailFile.py ${railPath}`;
    const compiledFile = cp.execSync(scriptCmd).toString();

    return JSON.stringify(compiledFile.replace(
        'ONLY return a valid JSON object (no other text is necessary). The JSON MUST conform to the XML format, including any types and format requests e.g. requests for lists, objects and specific types. Be correct and concise.', 
        `ONLY return a valid JSON object (no other text is necessary), where the key of the field in JSON is the \`name\` attribute of the corresponding XML, and the value is of the type specified by the corresponding XML's tag. The JSON MUST conform to the XML format, including any types and format requests e.g. requests for lists, objects and specific types. Be correct and concise.
Here are examples of simple (XML, JSON) pairs that show the expected behavior:
- \`<string name='foo' format='two-words lower-case' />\` => \`{'foo': 'example one'}\`
- \`<list name='bar'><string format='upper-case' /></list>\` => \`{"bar": ['STRING ONE', 'STRING TWO', etc.]}\`
- \`<object name='baz'><string name="foo" format="capitalize two-words" /><integer name="index" format="1-indexed" /></object>\` => \`{'baz': {'foo': 'Some String', 'index': 1}}\`
</prompt>
`));
  }

  compileTypescriptPrompt(fileName) {
    const file = this.readPrompt(fileName);
    const hasPrompt = file.includes("type Prompt =");
    const hasOutput = file.includes("type Output =");
    const hasInput = file.includes("type Input =");
    const hasErrors = file.includes("type Errors =");
    const hasTools = file.includes("type Tools =");

    if (!hasPrompt || !hasInput || !hasOutput) {
      throw new Error(
        "Prompt file must have at least Prompt, Input & Output types"
      );
    }
    let numTypes = 4;
    if (hasTools) {
      numTypes++;
    }
    // Replace require statements with the contents of the file inline
    const stringifiedRequireRegex = new RegExp("\\$\\{JSON.stringify\\(require\\(\[\"'`]([^\"'`]*)[\"'`]\\)\\)\\}", "g");
    const stringifiedRequireStatements = file.matchAll(stringifiedRequireRegex); // ? 
    const resolvedPrompt = [...stringifiedRequireStatements].reduce((acc, match) => {
      let filePath = match[1];
      if (match[1].startsWith("@/")) {
        filePath = `${match[1].replace("@/", "../../")}.ts`;
      }
      const fileContents = this.readPrompt(filePath)
        .replace('export default ', '')
        .replace(' as const;', '');
      const minifiedFileContents = JSON.stringify(JSON.parse(fileContents));
      return acc.replace(match[0], minifiedFileContents);
    }, file.replace("import { z } from 'zod';", ''));

    // This is garbage code, will replace with content/source webpack plugin
    const requireRegex = new RegExp("require\\(\[\"'`]([^\"'`]*)[\"'`]\\);?", "g");
    const requireStatements = resolvedPrompt.matchAll(requireRegex); // ? 
    const finalPrompt = [...requireStatements].reduce((acc, match) => {
      let filePath = match[1];
      if (match[1].startsWith("@/")) {
        filePath = `${match[1].replace("@/", "../../")}`;
      }
      let fileContents = this.readPrompt(filePath)
        .replace('export default ', '')
        .replace(' as const;', '')
        .replace(new RegExp("// ?", "g"), "");

      if (filePath.endsWith("Examples.json")) {
        const examples = require(match[1].replace("@/", "../src/")).reduce((acc, example) => {
          return `${acc}
${example.role.toUpperCase()}: ${example.content}`;
        }, "");
        fileContents = `
### Examples${examples}

### Typescript`
      }
      return acc.replace(match[0], fileContents);
    }, resolvedPrompt);
    console.log(finalPrompt) // ?
    return JSON.stringify(finalPrompt);
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
        return extensions.includes("Prompt");
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
          [`process.env.${fileName.split(".")[0]}Prompt`]:
            this.compileTypescriptPrompt(fileName),
        }),
        {}
      );

    return { ...staticPrompts, ...railPrompts, ...typescriptPrompts };
  }
}

new PromptCompiler().build();

module.exports = PromptCompiler;
