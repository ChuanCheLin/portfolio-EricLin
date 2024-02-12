import React, { useState, useEffect } from "react";
import wordPool from "./wordPool";
import { useRef } from "react";

const gridSize = 10;
const targetNum = 8;

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
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [incorrectSound, setIncorrectSound] = useState();
  const gridRef = useRef(null);
  const isDarkMode = document.body.classList.contains("dark");

  const generateNewGrid = () => {
    const selectedWords = selectRandomWords(wordPool, targetNum); // Choose how many words you want to place
    setCurrentWords(selectedWords);
    let newGrid = createEmptyGrid(gridSize);
    newGrid = placeWordsInGrid(newGrid, selectedWords);
    newGrid = fillGridWithRandomLetters(newGrid);
    setGrid(newGrid);
  };

  const getCellFromTouch = (touch) => {
    const gridBounds = gridRef.current.getBoundingClientRect();
    const touchX = touch.clientX - gridBounds.left; // Relative X coordinate
    const touchY = touch.clientY - gridBounds.top; // Relative Y coordinate

    const cellSize = gridBounds.width / gridSize; // Assuming square cells
    const colIndex = Math.floor(touchX / cellSize);
    const rowIndex = Math.floor(touchY / cellSize);

    return { colIndex, rowIndex };
  };

  const handleTouchDown = (event) => {
    if (event.touches) {
      event.preventDefault();
      const { colIndex, rowIndex } = getCellFromTouch(event.touches[0]);
      handleMouseDown(rowIndex, colIndex);
    }
  };

  const handleTouchEnter = (event) => {
    if (event.touches) {
      event.preventDefault();
      const { colIndex, rowIndex } = getCellFromTouch(event.touches[0]);
      handleMouseEnter(rowIndex, colIndex);
    }
  };

  const handleMouseDown = (rowIndex, cellIndex) => {
    if (
      rowIndex < 0 ||
      rowIndex >= grid.length ||
      cellIndex < 0 ||
      cellIndex >= grid[rowIndex].length
    ) {
      // Indices are out of bounds
      return;
    }
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
      if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
        newDragSelection.push({ x, y });
        newSelectedLetters.push(grid[y][x]);
      }
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

      const newFoundWords = [...foundWords, selectedWord];
      setFoundWords(newFoundWords);

      if (newFoundWords.length === currentWords.length) {
        setIsGameCompleted(true);
        setIsGameActive(false); // Stop the timer
      }
    } else {
      // Play the incorrect sound
      incorrectSound.play();
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
    setIsGameCompleted(false);
  };

  const CongratulatoryPopup = () => {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl border border-gray-300">
        <h3 className="text-xl font-bold text-center text-blue-600 mb-4">
          Congratulations!
        </h3>
        <p className="text-lg text-gray-700">You found all the words.</p>
        <p className="text-md text-gray-600">
          Total Time: {timeElapsed} seconds
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setIsGameCompleted(false)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Close
          </button>
          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          >
            New Game
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setIsGameActive(true);
    // Word Grid
    generateNewGrid();

    // Audio
    const successAudio = new Audio("/sounds/CorrectAnswerSoundEffect.mp3");
    const incorrectAudio = new Audio("/sounds/IncorrectSoundEffect.mp3");
    // audio.oncanplaythrough = () => console.log("Audio loaded");
    // audio.onerror = () => console.log("Error loading audio");
    setSuccessSound(successAudio);
    setIncorrectSound(incorrectAudio);
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
    backgroundColor: isDarkMode ? "#1b1b1b" : "white", // Adjust colors for dark mode
    color: isDarkMode ? "white" : "black", // Text color for dark mode
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    display: successMessage ? "block" : "none",
    zIndex: 1000,
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {isGameCompleted && <CongratulatoryPopup />}
      <h2 className="text-2xl sm:text-lg font-bold mb-4 dark:text-white">
        Word Search Game
      </h2>
      <div className="flex flex-row items-start justify-center gap-10 w-full">
        {/* Scoreboard */}
        <div className="flex-grow-0 dark:text-white min-w-[200px]">
          <h3 className="text-lg sm:text-sm font-semibold mb-2">Scoreboard</h3>
          <div className="sm:text-xs">Words Found: {foundWords.length}</div>
          <div className="sm:text-xs">Time Elapsed: {timeElapsed} seconds</div>
          <button
            onClick={startGame}
            className="sm:text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-1 sm:px-4 rounded focus:outline-none focus:shadow-outline"
          >
            New Game
          </button>
        </div>

        {/* Game Grid */}
        <div ref={gridRef} className="grid grid-cols-10 gap-1">
          {grid.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <button
                key={`${rowIndex}-${cellIndex}`}
                className={`border border-gray-300 p-2 sm:p-0 text-lg sm:text-xs dark:text-black ${
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
                onTouchStart={(e) => handleTouchDown(e)}
                onTouchMove={(e) => handleTouchEnter(e)}
                onTouchEnd={handleMouseUp}
              >
                {cell}
              </button>
            ))
          )}
        </div>
        {/* Target Words */}
        <div>
          <h3 className="text-lg sm:text-xs font-semibold mb-2 dark:text-white flex-grow-0">
            Target Words
          </h3>
          {successMessage && <div style={popupStyle}>{successMessage}</div>}
          <ul>
            {currentWords.map((word) => (
              <li
                key={word}
                className={
                  foundWords.includes(word)
                    ? "text-green-500 sm:text-xs"
                    : "text-black dark:text-white sm:text-xs"
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
