import React, { useState } from "react";
import TransitionEffect from "@/components/TransitionEffect";
import WordSearchGame from "@/components/WordSearchGame";
import Head from "next/head";

const Games = () => {
  const [currentGame, setCurrentGame] = useState(null);

  const renderGame = () => {
    switch (currentGame) {
      case "wordSearch":
        return <WordSearchGame />;
      // Add cases for other games as you implement them
      default:
        return (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl font-semibold">Select a game to play!</div>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Games | Chuan-Che Lin</title>
        <meta
          name="description"
          content="Explore the interactive games developed by Chuan-Che Lin."
        />
      </Head>
      <TransitionEffect />
      <main className="relative flex flex-col items-center justify-between w-full min-h-screen p-8 text-dark dark:text-light">
        {/* Game area */}
        <div className="flex-grow">{renderGame()}</div>

        {/* Game selection and exit buttons */}
        <div className="w-full flex justify-between items-end px-4 pb-4">
          {/* Game selection buttons at the bottom */}
          <div className="space-x-4">
            <button
              onClick={() => setCurrentGame("wordSearch")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Word Search Game
            </button>
            {/* More buttons for additional games */}
          </div>

          {/* Exit game button at the bottom right */}
          {currentGame && (
            <button
              onClick={() => setCurrentGame(null)} // Allow the user to exit the current game
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Exit Game
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Games;
