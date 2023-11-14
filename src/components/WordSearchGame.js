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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragSelection, setDragSelection] = useState([]);

  const clearSelection = () => {
    setSelectedLetters([]);
    // Reset any other relevant state
  };

  const handleMouseDown = (rowIndex, cellIndex) => {
    setDragStart({ x: cellIndex, y: rowIndex });
    setIsDragging(true);
    setSelectedLetters([grid[rowIndex][cellIndex]]);
  };

  const handleMouseEnter = (rowIndex, cellIndex) => {
    if (!isDragging || !dragStart) return;

    const path = [];
    const newSelectedLetters = [];
    const newDragSelection = [];
    const xDiff = cellIndex - dragStart.x;
    const yDiff = rowIndex - dragStart.y;

    if (dragStart.y === rowIndex) {
      // Horizontal selection
      for (
        let i = Math.min(dragStart.x, cellIndex);
        i <= Math.max(dragStart.x, cellIndex);
        i++
      ) {
        path.push({ x: i, y: rowIndex });
      }
    } else if (dragStart.x === cellIndex) {
      // Vertical selection
      for (
        let i = Math.min(dragStart.y, rowIndex);
        i <= Math.max(dragStart.y, rowIndex);
        i++
      ) {
        path.push({ x: cellIndex, y: i });
      }
    } else if (Math.abs(xDiff) === Math.abs(yDiff)) {
      // Diagonal selection
      const xStep = xDiff > 0 ? 1 : -1;
      const yStep = yDiff > 0 ? 1 : -1;
      let x = dragStart.x;
      let y = dragStart.y;
      for (let i = 0; i <= Math.abs(xDiff); i++) {
        path.push({ x: x, y: y });
        x += xStep;
        y += yStep;
      }
    }

    path.forEach(({ x, y }) => {
      newDragSelection.push({ x, y });
      newSelectedLetters.push(grid[y][x]);
    });

    setDragSelection(newDragSelection);
    setSelectedLetters(newSelectedLetters);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
    setDragSelection([]);
    // Add logic here to check if the selected letters form a word
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
              onMouseDown={() => handleMouseDown(rowIndex, cellIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
              onMouseUp={handleMouseUp}
              className={`border border-gray-300 p-2 ${
                dragSelection.some(
                  (selectedCell) =>
                    selectedCell.x === cellIndex && selectedCell.y === rowIndex
                )
                  ? "bg-blue-200" // Highlight color for cells in drag selection
                  : "bg-white"
              }`}
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
