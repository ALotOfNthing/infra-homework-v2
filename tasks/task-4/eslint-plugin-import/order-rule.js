export default {
  meta: {
    type: "layout",
    docs: {
      description: "Enforce that imports have certain order.",
    },
    fixable: "whitespace",
    schema: [],
  },
  create(context) {
    return {
      Program: (programNode) => {
        const importsNodes = programNode.body.filter(
          (node) => node.type === "ImportDeclaration"
        );

        const importGroups = importsNodes.reduce(
          (acc, node) => {
            if (!node.source.value.startsWith(".")) {
              acc.external.push(node);
            }

            if (node.source.value.startsWith("./")) {
              acc.local.push(node);
            }

            if (node.source.value.includes("../")) {
              acc.deep.push(node);
            }

            return acc;
          },
          {
            external: [],
            local: [],
            deep: [],
          }
        );

        importGroups.external.sort((a, b) =>
          a.source.value.localeCompare(b.source.value, "en", { sensitivity: "base" })
        );
        importGroups.local.sort((a, b) =>
          a.source.value.localeCompare(b.source.value, "en", { sensitivity: "base" })
        );
        importGroups.deep.sort((a, b) =>
          a.source.value.localeCompare(b.source.value, "en", { sensitivity: "base" })
        );

        const flatImports = [
          ...importGroups.external,
          ...importGroups.local,
          ...importGroups.deep,
        ];

        flatImports.forEach((importNode, index) => {
          const oldImport = importsNodes[index];

          if (oldImport.source.value !== importNode.source.value) {
            context.report({
              message: "Imports are not sorted by groups",
              node: oldImport,
              fix: (fixer) => {
                const sourceCode = context.getSourceCode();
                const nodeText = sourceCode.getText(importNode);
                
                return fixer.replaceText(oldImport, nodeText);
            },
            });
          }
        });
      },
    };
  },
};
