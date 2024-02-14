import React, { useState, useEffect } from "react";

const MirrorMazeGame = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null); // { rowIndex: null, cellIndex: null }

  const toggleSolutionVisibility = () => setShowSolution(!showSolution); // Toggles the solution visibility

  useEffect(() => {
    const fetchPuzzle = async (attempts = 5) => {
      // Set the number of attempts here
      try {
        const response = await fetch(
          "https://vercel-serverless-python-xi.vercel.app/api/generate_puzzle.py"
          // "http://localhost:3001/api/generate_puzzle.py" // dev
        );
        if (!response.ok) throw new Error("Server responded with an error"); // Check if response is ok (status in the range 200-299)
        const data = await response.json();
        setPuzzle(data);
      } catch (error) {
        console.error("Fetch error:", error.message);
        if (attempts > 1) {
          console.log(`Retrying... Attempts left: ${attempts - 1}`);
          setTimeout(() => fetchPuzzle(attempts - 1), 2000); // Wait 2 seconds before retrying
        }
      }
    };

    fetchPuzzle();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!selectedCell) return;

      const { rowIndex, cellIndex } = selectedCell;
      const newPuzzle = { ...puzzle }; // Make a shallow copy of the puzzle state
      const monsters = { G: "Ghost", V: "Vampire", Z: "Zombie" };

      if (event.key.toUpperCase() in monsters) {
        // Place monster
        newPuzzle.grid[rowIndex][cellIndex] = event.key.toUpperCase();
      } else if (event.key === "Backspace") {
        // Erase monster
        newPuzzle.grid[rowIndex][cellIndex] = 0; // Assuming 0 represents an empty cell
      }

      setPuzzle(newPuzzle);
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedCell, puzzle]);

  if (!puzzle) {
    return (
      <div className="text-center">
        <div>Loading puzzle...</div>
        {/* Tailwind CSS Spinner */}
        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin my-2"></div>
      </div>
    );
  }

  const handleCellClick = (rowIndex, cellIndex) => {
    setSelectedCell({ rowIndex, cellIndex });
  };

  const getCellContent = (cell, rowIndex, cellIndex) => {
    // Check for solution overlay first if visible and available
    if (showSolution && puzzle.solution) {
      const solutionSymbol = puzzle.solution[rowIndex][cellIndex];
      switch (solutionSymbol) {
        case "Z":
          return (
            <img
              src="/images/games/MirrorMaze/zombie.png"
              alt="Zombie"
              style={{ maxWidth: "90%", height: "auto" }}
            />
          );
        case "V":
          return (
            <img
              src="/images/games/MirrorMaze/vampire.png"
              alt="Vampire"
              style={{ maxWidth: "90%", height: "auto" }}
            />
          );
        case "G":
          return (
            <img
              src="/images/games/MirrorMaze/ghost.png"
              alt="Ghost"
              style={{ maxWidth: "90%", height: "auto" }}
            />
          );
        default:
          // Handle other solution symbols or leave as is for non-solution cells
          break;
      }
    }

    // Logic for displaying cell content based on the current cell value
    switch (cell) {
      case "Z":
        return (
          <img
            src="/images/games/MirrorMaze/zombie.png"
            alt="Zombie"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      case "V":
        return (
          <img
            src="/images/games/MirrorMaze/vampire.png"
            alt="Vampire"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      case "G":
        return (
          <img
            src="/images/games/MirrorMaze/ghost.png"
            alt="Ghost"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      case 1:
        return (
          <img
            src="/images/games/MirrorMaze/left_slash.png"
            alt="Mirror"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      case 2:
        return (
          <img
            src="/images/games/MirrorMaze/right_slash.png"
            alt="Mirror"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      case 0:
        return " "; // Empty cell
      default:
        return "?"; // Handle unexpected values or add logic for other cell types
    }
  };

  // Function to display the puzzle
  const displayPuzzle = () => {
    if (!puzzle || !puzzle.grid) return <div>No puzzle to display</div>;

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Monster counts */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "5px",
          }}
        >
          {Object.entries(puzzle.monster_nums).map(
            ([monster, count], index) => (
              <div
                key={index}
                style={{ margin: "0 10px", textAlign: "center" }}
              >
                {/* Render your monster icon here, based on the monster type */}
                <img
                  src={
                    monster === "Z"
                      ? "/images/games/MirrorMaze/zombie.png"
                      : monster === "V"
                      ? "/images/games/MirrorMaze/vampire.png"
                      : monster === "G"
                      ? "/images/games/MirrorMaze/ghost.png"
                      : undefined // Fallback for an unexpected monster type
                  }
                  alt={monster}
                  style={{ maxWidth: "50px", height: "auto" }} // Adjust size as needed
                />
                <div>{count}</div>
              </div>
            )
          )}
        </div>

        {/* Top border numbers */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {puzzle.border_nums.top.map((num, index) => (
            <div key={index} style={{ width: "50px", textAlign: "center" }}>
              {num}
            </div>
          ))}
        </div>

        <div style={{ display: "flex" }}>
          {/* Border numbers (left of the grid) */}
          <div
            style={{
              marginRight: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {puzzle.border_nums.left.map((num, index) => (
              <div
                key={index}
                style={{
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {num}
              </div>
            ))}
          </div>

          {/* The grid itself */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {puzzle.grid.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: "flex" }}>
                {row.map((cell, cellIndex) => {
                  let content = getCellContent(cell, rowIndex, cellIndex); // Get cell content, including overlaying solution if applicable

                  return (
                    <div
                      key={cellIndex}
                      onClick={() => handleCellClick(rowIndex, cellIndex)}
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "1px solid black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
                        cursor: "pointer",
                        backgroundColor:
                          selectedCell &&
                          selectedCell.rowIndex === rowIndex &&
                          selectedCell.cellIndex === cellIndex
                            ? "#add8e6"
                            : "transparent", // Highlight selected cell
                      }}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Border numbers (right of the grid) */}
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {puzzle.border_nums.right.map((num, index) => (
              <div
                key={index}
                style={{
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Border numbers (bottom of the grid) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          {puzzle.border_nums.bottom.map((num, index) => (
            <div key={index} style={{ width: "50px", textAlign: "center" }}>
              {num}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {displayPuzzle()}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        {/* Button to toggle solution visibility */}
        <button onClick={toggleSolutionVisibility}>Toggle Solution</button>
      </div>
    </div>
  );
};

export default MirrorMazeGame;
