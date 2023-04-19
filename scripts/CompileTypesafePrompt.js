module.exports = function({ types: t }) {
    return {
      pre(file) {
        this.shouldAddVariable = file.opts.filename.endsWith('.Prompt.ts');
      },
      visitor: {
        Program(path) {
          if (!this.shouldAddVariable) return;
          const fileContents = path.getSource();
          const extraVariable = t.variableDeclaration('const', [
            t.variableDeclarator(
              t.identifier('prompt'),
              t.stringLiteral("helo world")
            ),
          ]);
          path.unshiftContainer('body', extraVariable);
        },
      },
    };
  };