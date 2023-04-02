import * as ts from "typescript";

function compile(fileNames, options) {
  let program = ts.createProgram(fileNames, options);
  let emitResult = program.emit();

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
        if (diagnostic.start) {
        let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
        let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        }
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
}

compile("./src/ai/prompts/NFLScores.Prompt.ts", {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ES2022,
  maxNodeModuleJSDepth: 10,
});