import React, { useState, useEffect } from "react";

const gridSize = 10;
const words = ["CAT", "DOG", "BIRD", "FISH"];

const directions = {
  HORIZONTAL: { x: 1, y: 0 },
  VERTICAL: { x: 0, y: 1 },
  DIAGONAL: { x: 1, y: 1 },
};

const canPlaceWord = (grid, word, startX, startY, direction) => {
  let x = startX;
  let y = startY;

  for (let i = 0; i < word.length; i++) {
    if (
      x < 0 ||
      y < 0 ||
      x >= gridSize ||
      y >= gridSize ||
      (grid[y][x] !== "-" && grid[y][x] !== word[i])
    ) {
      return false;
    }
    x += direction.x;
    y += direction.y;
  }

  return true;
};

const placeWord = (grid, word, startX, startY, direction) => {
  let x = startX;
  let y = startY;

  for (let i = 0; i < word.length; i++) {
    grid[y][x] = word[i];
    x += direction.x;
    y += direction.y;
  }
};

const placeWordsInGrid = (grid, words) => {
  words.forEach((word) => {
    let placed = false;
    while (!placed) {
      const directionValues = Object.values(directions);
      const direction =
        directionValues[Math.floor(Math.random() * directionValues.length)];
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(grid, word, col, row, direction)) {
        placeWord(grid, word, col, row, direction);
        placed = true;
      }
    }
  });

  return grid;
};

const createEmptyGrid = (size) => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "-")
  );
};

const fillGridWithRandomLetters = (grid) => {
  return grid.map((row) =>
    row.map((cell) =>
      cell === "-"
        ? String.fromCharCode(65 + Math.floor(Math.random() * 26))
        : cell
    )
  );
};

const WordSearchGame = () => {
  const [grid, setGrid] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);

  const handleCellClick = (rowIndex, cellIndex) => {
    const newSelectedLetters = [...selectedLetters, grid[rowIndex][cellIndex]];
    setSelectedLetters(newSelectedLetters);
    // You might want to add logic to manage the selection of cells here
  };

  const clearSelection = () => {
    setSelectedLetters([]);
    // Reset any other relevant state
  };

  useEffect(() => {
    let newGrid = createEmptyGrid(gridSize);
    newGrid = placeWordsInGrid(newGrid, words);
    newGrid = fillGridWithRandomLetters(newGrid);
    setGrid(newGrid);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Word Search Game</h2>
      <div className="grid grid-cols-10 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <button
              key={`${rowIndex}-${cellIndex}`}
              className={`border border-gray-300 text-lg p-2 ${
                selectedLetters.some(
                  (cell) => cell.x === cellIndex && cell.y === rowIndex
                )
                  ? "bg-blue-200"
                  : "bg-white"
              } hover:bg-blue-100`}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            >
              {cell}
            </button>
          ))
        )}
      </div>
      <div className="mt-4 text-lg">
        Selected:{" "}
        <span className="font-medium">{selectedLetters.join("")}</span>
      </div>
      <button
        onClick={clearSelection}
        className="mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 hover:shadow-md transition duration-200"
      >
        Clear Selection
      </button>
    </div>
  );
};

export default WordSearchGame;
