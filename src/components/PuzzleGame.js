import React, { useState, useEffect } from "react";

const PuzzlePiece = ({ id, x, y, onDragStart, isCorrect, backgroundImage }) => {
  const draggable = !isCorrect; // Only allow dragging if the piece is not in its correct position

  return (
    <div
      draggable={draggable}
      onDragStart={draggable ? (e) => onDragStart(e, id) : undefined}
      style={{
        width: "100px",
        height: "100px",
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        border: isCorrect ? "2px solid green" : "1px dashed #333",
        cursor: isCorrect ? "default" : "grab",
      }}
    />
  );
};

const PuzzleGame = () => {
  const [pieces, setPieces] = useState([]);
  const gridSize = 3;
  const pieceSize = 100; // Assuming each piece is 100x100 pixels
  const puzzleSize = gridSize * pieceSize;
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageSrc = "/images/games/Puzzle/default.jpg";

  useEffect(() => {
    // Load the image and then create puzzle pieces based on the loaded image
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setImageLoaded(true);
      createPuzzlePieces(img);
    };
  }, [imageSrc]);

  const createPuzzlePieces = (img) => {
    const canvasSize = img.width / gridSize; // Adjust if the image is not square
    const pieces = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const canvas = document.createElement("canvas");
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          x * canvasSize, // Start clipping x
          y * canvasSize, // Start clipping y
          canvasSize, // Clipping width
          canvasSize, // Clipping height
          0,
          0, // Canvas x and y
          canvasSize, // Canvas width
          canvasSize // Canvas height
        );
        const imageURL = canvas.toDataURL();
        pieces.push({
          id: y * gridSize + x,
          imageURL,
          correctX: x * pieceSize,
          correctY: y * pieceSize,
          x: Math.random() * (puzzleSize - pieceSize),
          y: Math.random() * (puzzleSize - pieceSize),
          isCorrect: false,
        });
      }
    }
    setPieces(pieces);
  };

  const handleDragStart = (e, id) => {
    const piece = pieces.find((p) => p.id === id);
    if (piece.isCorrect) {
      e.preventDefault();
      return;
    }

    const offsetX = e.clientX - e.target.getBoundingClientRect().left;
    const offsetY = e.clientY - e.target.getBoundingClientRect().top;

    e.dataTransfer.setData("application/reactflow", id.toString());
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("offsetX", offsetX.toString());
    e.dataTransfer.setData("offsetY", offsetY.toString());
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
          const xDiff = Math.abs(x - piece.correctX);
          const yDiff = Math.abs(y - piece.correctY);
          const isCorrect = xDiff < 10 && yDiff < 10; // Adjust tolerance as needed
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

  if (!imageLoaded) {
    return <div>Loading image...</div>;
  }

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
          backgroundImage={piece.imageURL}
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
