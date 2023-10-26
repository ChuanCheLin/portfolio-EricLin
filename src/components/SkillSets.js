// components/SkillSets.js
import React, { useState, useEffect } from "react";

const SkillProgressBar = ({ skill, level, color = "teal" }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < level) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [progress, level]);

  // Generate dynamic color class based on the 'color' prop
  const colorClass = `text-${color}-600`;
  const bgLevelClass =
    progress >= level ? `bg-${color}-500` : `bg-${color}-300`;

  return (
    <div className="my-1">
      <h2 className="text-lg font-semibold md:text-base sm:text-sm">{skill}</h2>
      <div className="relative pt-1 flex flex-row items-center">
        <div className="flex items-center justify-between">
          <div className="text-left w-[10%]">
            <span
              className={`text-xs font-semibold inline-block ${colorClass} dark:text-light`}
            >
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 w-[90%] mx-1">
          <div
            style={{ width: `${progress}%` }}
            className={`${bgLevelClass} shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center`}
          />
        </div>
      </div>
    </div>
  );
};

const SkillSets = () => (
  <div className="container mx-auto p-4 flex-row">
    <h2 className="font-bold text-8xl mt-24 w-full text-center md:text-6xl xs:text-4xl md:mt-16 sm:mt-8">
      Skills
    </h2>
    <h3 className="font-bold text-4xl my-8 w-full text-center md:text-2xl xs:text-xl md:my-4 sm:my-2">
      Programming Languages
    </h3>
    <div className="grid grid-cols-12 gap-24 gap-y-4 xl:gap-x-16 lg:gap-x-8 md:gap-y-12 sm:gap-y-6 sm:gap-x-0">
      <div className="col-span-6">
        <SkillProgressBar skill="Python" level={95} color="blue" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="Java" level={80} color="teal" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="JavaScript" level={80} color="yellow" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="Shell Script" level={75} color="green" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="SQL" level={70} color="purple" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="HTML" level={60} color="red" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="CSS" level={60} color="indigo" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="C++" level={60} color="pink" />
      </div>
    </div>
    <h3 className="font-bold text-4xl my-8 w-full text-center md:text-2xl xs:text-xl md:my-4 sm:my-2">
      Tools and Frameworks
    </h3>
    <div className="grid grid-cols-12 gap-24 gap-y-4 xl:gap-x-16 lg:gap-x-8 md:gap-y-12 sm:gap-y-6 sm:gap-x-0">
      <div className="col-span-6">
        <SkillProgressBar skill="Git" level={80} color="green" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="PyTorch" level={80} color="yellow" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="OpenCV" level={70} color="teal" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="Docker" level={70} color="blue" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="Postman" level={60} color="orange" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="LangChain" level={60} color="red" />
      </div>
    </div>
    <h3 className="font-bold text-4xl my-8 w-full text-center md:text-2xl xs:text-xl md:my-4 sm:my-2">
      Web Development
    </h3>
    <div className="grid grid-cols-12 gap-24 gap-y-4 xl:gap-x-16 lg:gap-x-8 md:gap-y-12 sm:gap-y-6 sm:gap-x-0">
      <div className="col-span-6">
        <SkillProgressBar skill="NextJS" level={80} color="yellow" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="ExpressJS" level={80} color="teal" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="ReactJS" level={80} color="orange" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="Tailwind CSS" level={75} color="green" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="Django" level={70} color="blue" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="Heroku" level={60} color="red" />
      </div>
    </div>
    <h3 className="font-bold text-4xl my-8 w-full text-center md:text-2xl xs:text-xl md:my-4 sm:my-2">
      Database
    </h3>
    <div className="grid grid-cols-12 gap-24 gap-y-4 xl:gap-x-16 lg:gap-x-8 md:gap-y-12 sm:gap-y-6 sm:gap-x-0">
      <div className="col-span-6">
        <SkillProgressBar skill="MySQL" level={80} color="indigo" />
      </div>
      <div className="col-span-6">
        <SkillProgressBar skill="MongoDB" level={60} color="pink" />
      </div>
    </div>
  </div>
);

export default SkillSets;
