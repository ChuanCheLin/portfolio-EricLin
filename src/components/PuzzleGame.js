import React, { useState, useEffect } from "react";

const PuzzlePiece = ({ id, x, y, onDragStart, isCorrect }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      style={{
        width: "100px",
        height: "100px",
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: isCorrect ? "#90EE90" : "#999",
        border: isCorrect ? "2px solid green" : "1px dashed #333",
        cursor: "grab",
      }}
    />
  );
};

const PuzzleGame = () => {
  const [pieces, setPieces] = useState([]);
  const gridSize = 3;
  const pieceSize = 100; // Assuming each piece is 100x100 pixels
  const puzzleSize = gridSize * pieceSize;

  useEffect(() => {
    const initialPieces = Array.from({ length: gridSize * gridSize }).map(
      (_, index) => ({
        id: index,
        x: Math.random() * (puzzleSize - pieceSize),
        y: Math.random() * (puzzleSize - pieceSize),
        correctX: (index % gridSize) * pieceSize,
        correctY: Math.floor(index / gridSize) * pieceSize,
        isCorrect: false,
      })
    );

    setPieces(initialPieces);
  }, [gridSize, pieceSize, puzzleSize]);

  const handleDragStart = (e, id) => {
    const offsetX = e.clientX - e.target.getBoundingClientRect().left;
    const offsetY = e.clientY - e.target.getBoundingClientRect().top;

    e.dataTransfer.setData("application/reactflow", id); // Use a custom MIME type.
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("offsetX", offsetX);
    e.dataTransfer.setData("offsetY", offsetY);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("application/reactflow");
    const offsetX = Number(e.dataTransfer.getData("offsetX"));
    const offsetY = Number(e.dataTransfer.getData("offsetY"));
    const puzzleRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - puzzleRect.left - offsetX;
    const y = e.clientY - puzzleRect.top - offsetY;

    setPieces((currentPieces) =>
      currentPieces.map((piece) => {
        if (piece.id.toString() === id) {
          const isCorrect =
            Math.abs(x - piece.correctX) < 10 &&
            Math.abs(y - piece.correctY) < 10;

          return {
            ...piece,
            x: isCorrect ? piece.correctX : x,
            y: isCorrect ? piece.correctY : y,
            isCorrect,
          };
        }
        return piece;
      })
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkSolved = () => pieces.every((piece) => piece.isCorrect);

  return (
    <div
      style={{
        width: `${puzzleSize}px`,
        height: `${puzzleSize}px`,
        position: "relative",
        border: "1px solid black",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {pieces.map((piece) => (
        <PuzzlePiece
          key={piece.id}
          id={piece.id}
          x={piece.x}
          y={piece.y}
          isCorrect={piece.isCorrect}
          onDragStart={handleDragStart}
        />
      ))}
      {checkSolved() && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "green",
            fontSize: "24px",
            zIndex: 1000,
          }}
        >
          Puzzle Solved!
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
