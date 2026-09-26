import { writeFileSync } from "fs";
import { fiveLetterWords } from "./words";

const WildcardCounts: Record<string, number> = {};

for (const word of fiveLetterWords) {
    for (let i = 0; i < 5; i++) {
        const arr = word.split("");
        arr[i] = "*";
        const res = arr.join("");

        WildcardCounts[res] = (WildcardCounts[res] || 0) + 1;
    }
}

const output =
    `export const WildcardCounts = ${JSON.stringify(WildcardCounts, null, 2)};\n`;

writeFileSync("./lib/WordCounts.ts", output);