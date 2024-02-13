import React, { useState, useEffect } from "react";

const MirrorMazeGame = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

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

  if (!puzzle) {
    return (
      <div className="text-center">
        <div>Loading puzzle...</div>
        {/* Tailwind CSS Spinner */}
        <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin my-2"></div>
      </div>
    );
  }
  const getCellContent = (cell, rowIndex, cellIndex) => {
    // Check for solution overlay first if visible and available
    if (showSolution && puzzle.solution) {
      const solutionSymbol = puzzle.solution[rowIndex][cellIndex];
      if (["G", "V", "Z"].includes(solutionSymbol)) {
        return solutionSymbol;
      }
    }

    // Fallback to default content based on the puzzle grid if no solution symbol is to be overlayed
    switch (cell) {
      case 0:
        return " ";
      case 1:
        return "/";
      case 2:
        return "\\";
      default:
        return "?"; // Unexpected value, but you might want to handle it differently
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
              <div key={index} style={{ margin: "0 10px" }}>
                {/* Render your monster icon here, based on the monster type */}
                {monster}: {count}
              </div>
            )
          )}
        </div>

        {/* Top border numbers */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          {puzzle.border_nums.top.map((num, index) => (
            <div key={index} style={{ width: "30px", textAlign: "center" }}>
              {num}
            </div>
          ))}
        </div>

        <div style={{ display: "flex" }}>
          {/* Border numbers (left of the grid) */}
          <div style={{ marginRight: "5px" }}>
            {puzzle.border_nums.left.map((num, index) => (
              <div key={index} style={{ height: "30px", textAlign: "center" }}>
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
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid black",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px",
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
          <div style={{ marginLeft: "5px" }}>
            {puzzle.border_nums.right.map((num, index) => (
              <div key={index} style={{ height: "30px", textAlign: "center" }}>
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
            <div key={index} style={{ width: "30px", textAlign: "center" }}>
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
