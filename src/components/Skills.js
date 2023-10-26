import React, { useState } from "react";
import { motion } from "framer-motion";

const Skill = ({ name, x, y }) => {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full 
        font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer
        absolute dark:text-dark dark:bg-light
        lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3
        xs:bg-transparent xs:dark:bg-transparent xs:text-dark xs:dark:text-light xs:font-bold"
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
    >
      {name}
    </motion.div>
  );
};

const Skills = () => {
  const [showWebSection, setShowWebSection] = useState(true);
  const [showAISection, setShowAISection] = useState(false);

  const toggleWebSection = () => {
    setShowWebSection(true);
    setShowAISection(false);
  };

  const toggleAISection = () => {
    setShowWebSection(false);
    setShowAISection(true);
  };

  return (
    <>
      <h2 className="font-bold text-8xl mt-24 w-full text-center md:text-6xl xs:text-4xl md:mt-16 sm:mt-8">
        Skills
      </h2>

      <div className="text-center mt-8 flex justify-center">
        <button
          onClick={toggleWebSection}
          className="flex items-center bg-dark text-light p-2.5 px-6
                  rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
                  border-2 border-solid border-transparent hover:border-dark
                  dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
                  hover:dark:border-light md:p-2 md:px-4 md:text-base mx-4"
        >
          Web
        </button>
        <button
          onClick={toggleAISection}
          className="flex items-center bg-dark text-light p-2.5 px-6
                  rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
                  border-2 border-solid border-transparent hover:border-dark
                  dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
                  hover:dark:border-light md:p-2 md:px-4 md:text-base mx-4"
        >
          AI
        </button>
      </div>

      <div
        className={`w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark mt-12 ${
          showWebSection ? "" : "hidden"
        }`}
      >
        <motion.div
          className="flex items-center justify-center rounded-full 
        font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer
        dark:text-dark dark:bg-light
        lg:p-6 md:p-5 xs:text-xs xs:p-4"
          whileHover={{ scale: 1.05 }}
        >
          Web
        </motion.div>
        <Skill name="NextJS" x="-25vw" y="2vw" />
        <Skill name="JavaScript" x="-5vw" y="-10vw" />
        <Skill name="ReactJS" x="20vw" y="6vw" />

        <Skill name="ExpressJS" x="0vw" y="12vw" />
        <Skill name="MongoDB" x="-20vw" y="-15vw" />
        <Skill name="MySQL" x="15vw" y="-12vw" />

        <Skill name="Tailwind CSS" x="32vw" y="-5vw" />
        <Skill name="HTML" x="0vw" y="-20vw" />
        <Skill name="CSS" x="-25vw" y="18vw" />

        <Skill name="Django" x="18vw" y="18yvw" />
        <Skill name="Heroku" x="20vw" y="-20vw" />
      </div>
      <div
        className={`w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark mt-12 ${
          showAISection ? "" : "hidden"
        } `}
      >
        <motion.div
          className="flex items-center justify-center rounded-full 
        font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer
        dark:text-dark dark:bg-light
        lg:p-6 md:p-5 xs:text-xs xs:p-4"
          whileHover={{ scale: 1.05 }}
        >
          AI
        </motion.div>
        <Skill name="Python3" x="10vw" y="6vw" />
        <Skill name="Image Processing" x="0vw" y="26vw" />
        <Skill name="PyTorch" x="22vw" y="16vw" />

        <Skill name="LangChain" x="-8vw" y="10vw" />
        <Skill name="OpenCV" x="-20vw" y="20vw" />
        <Skill name="Pinecone" x="-22vw" y="3vw" />

        <Skill name="Shell Scripting" x="-7vw" y="-12vw" />
        <Skill name="NLP" x="0vw" y="-24vw" />
        <Skill name="Git" x="-20vw" y="-18vw" />

        <Skill name="Linux" x="14vw" y="-8vw" />
        <Skill name="Docker" x="20vw" y="-20vw" />
      </div>
    </>
  );
};

export default Skills;
