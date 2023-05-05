"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = exports.colorLog = exports.assistant = exports.user = exports.system = exports.dedent = exports.exportDefaultFunctionRegex = exports.exportDefaultRegex = exports.tsxCodeBlockRegex = void 0;
const child_process_1 = require("child_process");
exports.tsxCodeBlockRegex = /```(?:tsx)?(.*)```/s;
exports.exportDefaultRegex = /export\s+default\s+([\w]+)/s;
exports.exportDefaultFunctionRegex = /export\s+default\s+function\s+([\w]+)/s;
function dedent(templ, ...values) {
    let strings = Array.from(typeof templ === "string" ? [templ] : templ);
    // 1. Remove trailing whitespace.
    strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, "");
    // 2. Find all line breaks to determine the highest common indentation level.
    const indentLengths = strings.reduce((arr, str) => {
        const matches = str.match(/\n([\t ]+|(?!\s).)/g);
        if (matches) {
            return arr.concat(matches.map((match) => { var _a, _b; return (_b = (_a = match.match(/[\t ]/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0; }));
        }
        return arr;
    }, []);
    // 3. Remove the common indentation from all strings.
    if (indentLengths.length) {
        const pattern = new RegExp(`\n[\t ]{${Math.min(...indentLengths)}}`, "g");
        strings = strings.map((str) => str.replace(pattern, "\n"));
    }
    // 4. Remove leading whitespace.
    strings[0] = strings[0].replace(/^\r?\n/, "");
    // 5. Perform interpolation.
    let string = strings[0];
    values.forEach((value, i) => {
        // 5.1 Read current indentation level
        const endentations = string.match(/(?:^|\n)( *)$/);
        const endentation = endentations ? endentations[1] : "";
        let indentedValue = value;
        // 5.2 Add indentation to values with multiline strings
        if (typeof value === "string" && value.includes("\n")) {
            indentedValue = String(value)
                .split("\n")
                .map((str, i) => {
                return i === 0 ? str : `${endentation}${str}`;
            })
                .join("\n");
        }
        string += indentedValue + strings[i + 1];
    });
    return string;
}
exports.dedent = dedent;
function system(literals, ...placeholders) {
    return {
        role: "system",
        content: dedent(literals, ...placeholders),
    };
}
exports.system = system;
function user(literals, ...placeholders) {
    return {
        role: "user",
        content: dedent(literals, ...placeholders),
    };
}
exports.user = user;
function assistant(literals, ...placeholders) {
    return {
        role: "assistant",
        content: dedent(literals, ...placeholders),
    };
}
exports.assistant = assistant;
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    gray: "\x1b[90m",
};
function colorLog(color, text) {
    console.log(color + text + colors.reset);
}
exports.colorLog = colorLog;
function runCommand(command) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Error executing command: ${error.message}`));
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            resolve(stdout);
        });
    });
}
exports.runCommand = runCommand;
