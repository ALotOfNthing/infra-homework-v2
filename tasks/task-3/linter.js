import fs from "node:fs";
import { parse } from "acorn";
import { walk } from "zimmerframe";

const state = {
  asyncFunctionDeclarations: new Set(),
};

export function check(filePath) {
  const errors = [];

  const fileContent = fs.readFileSync(filePath, "utf8");

  const ast = parse(fileContent, {
    ecmaVersion: "latest",
    allowAwaitOutsideFunction: true,
  });

  walk(ast, state, {
    FunctionDeclaration(node, { state }) {
      if (node.async) {
        state.asyncFunctionDeclarations.add(node.id.name);
      }
    },
    IfStatement(node, { state }) {
      if (
        node.test.type === "CallExpression" &&
        state.asyncFunctionDeclarations.has(node.test.callee.name)
      ) {
        errors.push({
          start: node.test.start,
          end: node.test.end,
        });
      }
    },
  });

  return errors;
}
