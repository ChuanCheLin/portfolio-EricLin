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
      if (!selectedCell || !puzzle) return;

      const { rowIndex, cellIndex } = selectedCell;
      const key = event.key.toUpperCase();
      const monsters = ["G", "V", "Z"]; // Define the valid monster types

      // Ensure we only update the puzzle for valid monster keys or backspace
      if (monsters.includes(key) || event.key === "Backspace") {
        setPuzzle((currentPuzzle) => {
          // Create a deep copy of the current puzzle to maintain immutability
          const newPuzzle = JSON.parse(JSON.stringify(currentPuzzle));

          if (event.key === "Backspace") {
            // Erase the monster from the cell
            newPuzzle.grid[rowIndex][cellIndex] = 0; // Assuming 0 represents an empty cell
          } else {
            // Place the monster in the cell
            newPuzzle.grid[rowIndex][cellIndex] = key;
          }

          return newPuzzle;
        });
      }
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
    // Check for solution overlay first if the user choose to see the solution
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
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack children vertically
        justifyContent: "center", // Center children vertically in the container
        alignItems: "center", // Center children horizontally
        minHeight: "100vh", // Ensure the container can expand to at least the height of the viewport
      }}
    >
      {/* Display the game rules */}
      <div style={{ fontSize: "16px" }}>
        {/* Game Rules Title */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <strong>Game Rules:</strong>
        </div>

        {/* Game Rules Text */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          Fill in all grid squares without mirrors with either a ghost, a
          vampire, or a zombie. Edge numbers indicate the total monsters visible
          from that vantage point along a row or column. Zombies are always
          visible. Ghosts can only be seen if reflected in a mirror. Vampires
          appear only when there are no mirrors reflecting them.
        </div>

        {/* How to Play Title */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <strong>How to Play:</strong>
        </div>

        {/* How to Play Text */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          To assign a monster to a square, first click on the desired square to
          highlight it. Then, press one of the following keys on your keyboard
          to place a specific monster: 'G' for a Ghost, 'V' for a Vampire, or
          'Z' for a Zombie. To remove a monster from a square, click on the
          square containing the monster and hit the Backspace key to erase it.
        </div>
      </div>

      {/* Puzzle display (already centered horizontally) */}
      {displayPuzzle()}

      <div style={{ marginTop: "20px" }}>
        {" "}
        {/* Button to toggle solution visibility */}
        <button
          onClick={toggleSolutionVisibility}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Toggle Solution
        </button>
      </div>
    </div>
  );
};

export default MirrorMazeGame;
