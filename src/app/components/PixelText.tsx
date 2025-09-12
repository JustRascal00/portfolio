"use client";

import React from "react";

type PixelTextProps = {
  text: string;
  pixelSize?: number; // size of each square in px
  gapSize?: number; // gap between squares in px
  className?: string;
};

// 5x7 pixel font (uppercase A-Z and space) using '1' as filled, '.' as empty
const FONT_5x7: Record<string, string[]> = {
  " ": [".....",".....",".....",".....",".....",".....","....."],
  A: [
    ".###.",
    "#...#",
    "#...#",
    "#####",
    "#...#",
    "#...#",
    "#...#",
  ],
  E: [
    "#####",
    "#....",
    "####.",
    "#....",
    "#....",
    "#....",
    "#####",
  ],
  H: [
    "#...#",
    "#...#",
    "#...#",
    "#####",
    "#...#",
    "#...#",
    "#...#",
  ],
  I: [
    "#####",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "#####",
  ],
  K: [
    "#..#.",
    "#.#..",
    "##...",
    "#....",
    "##...",
    "#.#..",
    "#..#.",
  ],
  L: [
    "#....",
    "#....",
    "#....",
    "#....",
    "#....",
    "#....",
    "#####",
  ],
  M: [
    "#...#",
    "##.##",
    "#.#.#",
    "#.#.#",
    "#...#",
    "#...#",
    "#...#",
  ],
  O: [
    ".###.",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".###.",
  ],
  R: [
    "####.",
    "#...#",
    "#...#",
    "####.",
    "#.#..",
    "#..#.",
    "#...#",
  ],
  S: [
    ".###.",
    "#....",
    "#....",
    ".###.",
    "....#",
    "....#",
    "###..",
  ],
  U: [
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".###.",
  ],
  V: [
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".#.#.",
    "..#..",
  ],
};

function getGlyphRows(char: string): string[] {
  const key = char.toUpperCase();
  return FONT_5x7[key] ?? FONT_5x7[" "];
}

export default function PixelText({ text, pixelSize = 10, gapSize = 2, className }: PixelTextProps) {
  const words = text.split("\n");

  return (
    <div className={className} style={{ lineHeight: 0 }}>
      {words.map((line, lineIdx) => {
        // Compose the line row-by-row by concatenating glyph rows with a column of spacing
        const glyphs = Array.from(line).map((ch) => getGlyphRows(ch));
        const rows: string[] = Array.from({ length: 7 }, (_, r) =>
          glyphs
            .map((g) => g[r])
            .join(".") // 1 column spacing
        );
        return (
          <div key={lineIdx} className={lineIdx > 0 ? "mt-3" : undefined}>
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} style={{ display: "flex", gap: gapSize }}>
                {Array.from(row).map((cell, cellIdx) => (
                  <span
                    key={cellIdx}
                    style={{
                      width: pixelSize,
                      height: pixelSize,
                      display: "inline-block",
                      backgroundColor: cell === "#" ? "#b6ffd3" : "transparent",
                      boxShadow: cell === "#" ? "0 0 6px rgba(52, 243, 126, 0.6)" : undefined,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}


