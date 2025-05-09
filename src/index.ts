#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";

const program = new Command();
const dataPath = path.join(__dirname, "..", "shortcuts.json");

type Shortcut = {
  shortcut: string;
  description: string;
};

function loadShortcuts(): Shortcut[] {
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

function saveShortcuts(shortcuts: Shortcut[]) {
  fs.writeFileSync(dataPath, JSON.stringify(shortcuts, null, 2), "utf8");
}

program
  .name("vimshortcuts")
  .description("CLI to manage and view saved Vim shortcuts")
  .version("1.0.0");

program
  .command("list")
  .description("List all saved Vim shortcuts")
  .action(() => {
    const shortcuts = loadShortcuts();
    console.log(chalk.green.bold("Vim Shortcuts:\n"));
    shortcuts.forEach((s, i) => {
      console.log(chalk.cyan(`${i + 1}. ${s.shortcut}`), "-", s.description);
    });
  });

program
  .command("add <shortcut> <description>")
  .description("Add a new Vim shortcut")
  .action((shortcut, description) => {
    const shortcuts = loadShortcuts();
    shortcuts.push({ shortcut, description });
    saveShortcuts(shortcuts);
    console.log(chalk.green("Shortcut added!"));
  });

program.parse();
