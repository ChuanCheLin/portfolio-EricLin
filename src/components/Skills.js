import React from "react";
import { motion } from "framer-motion";

const Skill = ({ name, x, y }) => {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full 
        font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer
        absolute dark:text-dark dark:bg-light"
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
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center">Skills</h2>
      <div className="flex flex-row">
        <div className="w-[50%] h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark">
          <motion.div
            className="flex items-center justify-center rounded-full 
        font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer
        dark:text-dark dark:bg-light
        "
            whileHover={{ scale: 1.05 }}
          >
            Web Developer
          </motion.div>
          <Skill name="NextJS" x="8vw" y="6vw" />
          <Skill name="JavaScript" x="0vw" y="20vw" />
          <Skill name="ReactJS" x="16vw" y="12vw" />

          <Skill name="ExpressJS" x="-8vw" y="8vw" />
          <Skill name="MongoDB" x="-15vw" y="16vw" />
          <Skill name="MySQL" x="-16vw" y="2vw" />

          <Skill name="Tailwind CSS" x="-5vw" y="-10vw" />
          <Skill name="HTML" x="0vw" y="-20vw" />
          <Skill name="CSS" x="-16vw" y="-15vw" />

          <Skill name="Django" x="10vw" y="-6vw" />
          <Skill name="Heroku" x="15vw" y="-12vw" />
        </div>
        <div className="w-[50%] h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark">
          <motion.div
            className="flex items-center justify-center rounded-full 
        font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer
        dark:text-dark dark:bg-light
        "
            whileHover={{ scale: 1.05 }}
          >
            AI Engineer
          </motion.div>
          <Skill name="Python3" x="8vw" y="6vw" />
          <Skill name="Image Processing" x="0vw" y="20vw" />
          <Skill name="PyTorch" x="16vw" y="12vw" />

          <Skill name="LangChain" x="-8vw" y="8vw" />
          <Skill name="OpenCV" x="-15vw" y="16vw" />
          <Skill name="Pinecone" x="-16vw" y="2vw" />

          <Skill name="Shell Scripting" x="-5vw" y="-10vw" />
          <Skill name="Natural Language Processing" x="0vw" y="-20vw" />
          <Skill name="Git" x="-16vw" y="-15vw" />

          <Skill name="Linux" x="10vw" y="-6vw" />
          <Skill name="Docker" x="15vw" y="-12vw" />
        </div>
      </div>
    </>
  );
};

export default Skills;
