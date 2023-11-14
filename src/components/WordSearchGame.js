import React, { useState, useEffect } from "react";
import wordPool from "./wordPool";

const gridSize = 10;

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
  const [foundCells, setFoundCells] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const generateNewGrid = () => {
    const selectedWords = selectRandomWords(wordPool, 10); // Choose how many words you want to place
    setCurrentWords(selectedWords);
    let newGrid = createEmptyGrid(gridSize);
    newGrid = placeWordsInGrid(newGrid, selectedWords);
    newGrid = fillGridWithRandomLetters(newGrid);
    setGrid(newGrid);
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

    const selectedWord = selectedLetters.join("");

    if (
      currentWords.includes(selectedWord) &&
      !foundWords.includes(selectedWord)
    ) {
      setFoundWords([...foundWords, selectedWord]);
      setFoundCells([...foundCells, ...dragSelection]);
      setSuccessMessage(`${selectedWord} Found!`);
      setTimeout(() => setSuccessMessage(""), 2000);
      successSound.play();
    }

    setSelectedLetters([]);
    setDragSelection([]);
  };

  // Start the game (and the timer)
  const startGame = () => {
    setIsGameActive(true);
    setTimeElapsed(0);
    setFoundWords([]);
    setFoundCells([]);
    generateNewGrid();
  };

  // End the game (and stop the timer)
  const endGame = () => {
    setIsGameActive(false);
    // Other game end logic...
  };

  useEffect(() => {
    setIsGameActive(true);
    // Word Grid
    generateNewGrid();

    // Audio
    const audio = new Audio("/sounds/CorrectAnswerSoundEffect.mp3");
    // audio.oncanplaythrough = () => console.log("Audio loaded");
    // audio.onerror = () => console.log("Error loading audio");
    setSuccessSound(audio);
  }, []);

  useEffect(() => {
    let timer;

    if (isGameActive) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000); // Update the time every second
    }

    return () => clearInterval(timer); // Clear timer on cleanup
  }, [isGameActive]);

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
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Word Search Game
      </h2>
      <div className="flex flex-row items-start justify-center gap-10 w-full">
        {/* Scoreboard */}
        <div className="flex-grow-0 dark:text-white">
          <h3 className="text-lg font-semibold mb-2">Scoreboard</h3>
          <div>Words Found: {foundWords.length}</div>
          <div>Time Elapsed: {timeElapsed} seconds</div>
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            New Game
          </button>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-10 gap-1 flex-grow">
          {grid.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <button
                key={`${rowIndex}-${cellIndex}`}
                className={`border border-gray-300 p-2 ${
                  foundCells.some(
                    (foundCell) =>
                      foundCell.x === cellIndex && foundCell.y === rowIndex
                  )
                    ? "bg-green-200" // Different color for cells in found words
                    : dragSelection.some(
                        (selectedCell) =>
                          selectedCell.x === cellIndex &&
                          selectedCell.y === rowIndex
                      )
                    ? "bg-blue-200" // Highlight color for cells in drag selection
                    : "bg-white"
                }`}
                onMouseDown={() => handleMouseDown(rowIndex, cellIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                onMouseUp={handleMouseUp}
              >
                {cell}
              </button>
            ))
          )}
        </div>
        {/* Target Words */}
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white flex-grow-0">
            Target Words
          </h3>
          {successMessage && <div style={popupStyle}>{successMessage}</div>}
          <ul>
            {currentWords.map((word) => (
              <li
                key={word}
                className={
                  foundWords.includes(word)
                    ? "text-green-500"
                    : "text-black dark:text-white"
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
