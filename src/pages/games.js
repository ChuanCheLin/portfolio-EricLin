import React, { useState } from "react";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import WordSearchGame from "@/components/WordSearchGame";
import Head from "next/head";

const games = () => {
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
      <Layout>
        <main className="flex flex-col items-center justify-center w-full min-h-screen p-8 text-dark dark:text-light">
          <div className="flex justify-center space-x-4 mb-2">
            <button
              onClick={() => setCurrentGame("wordSearch")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Word Search Game
            </button>
            {/* Add more buttons for additional games with similar styling */}
          </div>
          {renderGame()}
        </main>
      </Layout>
    </>
  );
};

export default games;
