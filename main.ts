// excuse-almost-works-20261125 — writes the one-line excuse to $MAKEFUN_OUTPUT_DIR/entry.txt
// The line: a gamer texts the boss to skip work on GTA 6 launch week.
// It reads like a hurried text: a boring, believable workplace detail, no setup, no signature.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const line =
  "Lift's out and IT's quick fix became a full-day outage, so I'm stuck working from home today.";

// The gate: one line, at most 20 words. Enforce it at runtime so a
// future edit can never silently break the entry.
const words = line.trim().split(/\s+/).length;
if (line.includes("\n") || words > 20) {
  throw new Error(`entry violates the gate: ${words} words`);
}

// Output contract: write ONLY to $MAKEFUN_OUTPUT_DIR (the grader's /output).
// Never write into the script's own directory — it is read-only (/bot) in the grader.
// Only mkdirSync + writeFileSync into the output dir; never rmSync it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
