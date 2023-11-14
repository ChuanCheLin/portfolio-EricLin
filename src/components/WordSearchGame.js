import React, { useState, useEffect } from "react";

const gridSize = 10;
const wordPool = [
  "CAT",
  "DOG",
  "BIRD",
  "FISH",
  "ELEPHANT",
  "GIRAFFE",
  "KANGAROO",
  "MONKEY",
  "APPLE",
  "BANANA",
  "CHERRY",
  "DATE",
  "HAPPY",
  "JOLLY",
  "BRIGHT",
  "SMART",
  "COMPUTER",
  "KEYBOARD",
  "MONITOR",
  "PRINTER",
];

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

const selectRandomWords = (wordPool, numberOfWords) => {
  const shuffled = [...wordPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfWords);
};

const WordSearchGame = () => {
  const [grid, setGrid] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragSelection, setDragSelection] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [successSound, setSuccessSound] = useState();
  const [currentWords, setCurrentWords] = useState([]);

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

    const selectedWord = selectedLetters.join("");

    if (
      currentWords.includes(selectedWord) &&
      !foundWords.includes(selectedWord)
    ) {
      setFoundWords([...foundWords, selectedWord]);
      setSuccessMessage(`${selectedWord} Found!`);
      setTimeout(() => setSuccessMessage(""), 2000);
      successSound.play();
    }
  };

  useEffect(() => {
    const words = selectRandomWords(wordPool, 10);
    setCurrentWords(words);
    let newGrid = createEmptyGrid(gridSize);
    newGrid = placeWordsInGrid(newGrid, words);
    newGrid = fillGridWithRandomLetters(newGrid);
    setGrid(newGrid);
    const audio = new Audio("/sounds/CorrectAnswerSoundEffect.mp3");
    // audio.oncanplaythrough = () => console.log("Audio loaded");
    // audio.onerror = () => console.log("Error loading audio");
    setSuccessSound(audio);
  }, []);

  const popupStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    display: successMessage ? "block" : "none",
    zIndex: 1000, // Ensure it's above other elements
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Word Search Game</h2>
      <div className="flex flex-row items-start justify-center gap-10">
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
                      selectedCell.x === cellIndex &&
                      selectedCell.y === rowIndex
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
        <div>
          <h3>Target Words</h3>
          {successMessage && <div style={popupStyle}>{successMessage}</div>}
          <ul>
            {currentWords.map((word) => (
              <li
                key={word}
                className={
                  foundWords.includes(word) ? "text-green-500" : "text-black"
                }
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WordSearchGame;
