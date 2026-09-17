"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat".split(" ");

function randWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function makeSentence(minWords = 6, maxWords = 14) {
  const count = minWords + Math.floor(Math.random() * (maxWords - minWords));
  const words = Array.from({ length: count }, randWord);
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function makeParagraph(sentences = 5) {
  return Array.from({ length: sentences }, () => makeSentence()).join(" ");
}

export default function LoremIpsumGenerator() {
  const [mode, setMode] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const generate = () => {
    if (mode === "words") {
      setOutput(Array.from({ length: count }, randWord).join(" "));
    } else if (mode === "sentences") {
      setOutput(Array.from({ length: count }, () => makeSentence()).join(" "));
    } else {
      setOutput(Array.from({ length: count }, () => makeParagraph()).join("\n\n"));
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Generate</span>
          <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)} className="rounded-lg border border-gray-300 px-3 py-2">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Count</span>
          <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))} className="w-20 rounded-lg border border-gray-300 px-3 py-2" />
        </label>
        <button onClick={generate} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Generate</button>
        <button onClick={() => { navigator.clipboard.writeText(output); analytics.copyClicked("lorem-ipsum-generator"); }} disabled={!output} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50">Copy</button>
      </div>
      {output && <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm">{output}</pre>}
    </div>
  );
}
