import React, { useState, useEffect } from "react";

const MirrorMazeGame = () => {
  const [puzzle, setPuzzle] = useState(null);

  useEffect(() => {
    const fetchPuzzle = async () => {
      const response = await fetch(
        "http://127.0.0.1:5000/generate_puzzle?height=5&width=5"
      );
      const data = await response.json();
      setPuzzle(data);
    };

    fetchPuzzle();
  }, []);

  if (!puzzle) return <div>Loading puzzle...</div>;

  // Function to display the puzzle (simplified)
  // Function to display the puzzle (simplified)
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
                  let content;
                  switch (cell) {
                    case 0: // Empty
                      content = " ";
                      break;
                    case 1: // Mirror "/"
                      content = "/";
                      break;
                    case 2: // Mirror "\"
                      content = "\\";
                      break;
                    default:
                      content = "?"; // Unexpected value
                  }

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

  // Function to display the solution (simplified)
  const displaySolution = () => {
    // Implement based on how you want to display it
  };

  return (
    <div>
      {displayPuzzle()}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button onClick={displaySolution}>Show Solution</button>
      </div>
    </div>
  );
};

export default MirrorMazeGame;
