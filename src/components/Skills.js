import React from "react";
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
  return (
    <>
      <h2 className="font-bold text-8xl mt-64 w-full text-center md:text-6xl xs:text-4xl md:mt-32 sm:mt-16">
        Skills
      </h2>
      <div className="flex flex-col">
        <div
          className="w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark
          lg:h-[80vh] sm:h-[60vh] xs:h-[50vh] 
          lg:bg-circularLightLg lg:dark:bg-circularDarkLg
          md:bg-circularLightMd md:dark:bg-circularDarkMd
          sm:bg-circularLightSm sm:dark:bg-circularDarkSm
        "
        >
          <motion.div
            className="flex items-center justify-center rounded-full 
        font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer
        dark:text-dark dark:bg-light
        lg:p-6 md:p-4 xs:text-xs xs:p-2
        "
            whileHover={{ scale: 1.05 }}
          >
            Web
          </motion.div>
          <Skill name="NextJS" x="10vw" y="6vw" />
          <Skill name="JavaScript" x="0vw" y="26vw" />
          <Skill name="ReactJS" x="22vw" y="16vw" />

          <Skill name="ExpressJS" x="-8vw" y="10vw" />
          <Skill name="MongoDB" x="-20vw" y="20vw" />
          <Skill name="MySQL" x="-22vw" y="3vw" />

          <Skill name="Tailwind CSS" x="-7vw" y="-12vw" />
          <Skill name="HTML" x="0vw" y="-24vw" />
          <Skill name="CSS" x="-20vw" y="-18vw" />

          <Skill name="Django" x="14vw" y="-8vw" />
          <Skill name="Heroku" x="20vw" y="-20vw" />
        </div>
        <div
          className="w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark
          lg:h-[80vh] sm:h-[60vh] xs:h-[50vh] 
          lg:bg-circularLightLg lg:dark:bg-circularDarkLg
          md:bg-circularLightMd md:dark:bg-circularDarkMd
          sm:bg-circularLightSm sm:dark:bg-circularDarkSm
        "
        >
          <motion.div
            className="flex items-center justify-center rounded-full 
        font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer
        dark:text-dark dark:bg-light
        lg:p-6 md:p-4 xs:text-xs xs:p-2
        "
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
      </div>
    </>
  );
};

export default Skills;
