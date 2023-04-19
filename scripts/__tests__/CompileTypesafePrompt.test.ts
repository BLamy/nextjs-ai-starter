const path = require('path');
const { default: pluginTester } = require('babel-plugin-tester');
const plugin = require('../CompileTypesafePrompt');

pluginTester({
  plugin,
  pluginName: 'CompileTypesafePrompt',
  title: 'Inject the entire compiled prompt into the Prompt.ts file',
  tests: [
    {
      title: 'Should add extra variable to Prompt.ts',
      fixture: path.join(__dirname, '../../src/ai/prompts/NumberGenerator.Prompt.ts'),
      outputFixture: path.join(__dirname, '../__fixtures__/NumberGenerator.Prompt-expected.ts'),
    },
    {
      title: 'Should not add extra variable to other files',
      code: `console.log('Hello, world!');`,
      output: `console.log("Hello, world!");`,
    },
  ],
});
