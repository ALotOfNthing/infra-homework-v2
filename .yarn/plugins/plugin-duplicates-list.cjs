module.exports = {
  name: `plugin-duplicates-list`,
  factory: (require) => {
    const { BaseCommand } = require(`@yarnpkg/cli`);
    const { Configuration, Project, structUtils } = require("@yarnpkg/core");

    class DuplicatesCommand extends BaseCommand {
      static paths = [[`duplicates`]];

      async execute() {
        this.context.stdout.write(`This is my very own plugin 😎\n`);
      }
    }

    return {
      commands: [
        DuplicatesCommand,
      ],
    };
  },
};
