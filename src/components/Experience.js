import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize"
          >
            @{company}
          </a>{" "}
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="mt-36 md:mt-16 sm:mt-8">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light
          md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Software Engineer"
            company="Bosmos LLC"
            companyLink="https://www.bizapedia.com/ga/bosmos-llc.html"
            time="Sept. 2023 – Present"
            address="Atlanta, GA (Remote)"
            work="Developed a leaderboard for designers to compete for rewards using NextJS, ExpressJS, and MySQL."
          />
          <Details
            position="Natural Language Processing (NLP) Engineering Intern"
            company="Raven Digital Corporation"
            companyLink="https://www.bizapedia.com/ca/raven-digital-corporation.html"
            time="Sept. 2023 – Present"
            address="Los Angeles, CA (Remote)"
            work="Developed the pipeline for conversational AI to generate outfit suggestions using LangChain and Pinecone."
          />
          <Details
            position="Research Project Lead"
            company="National Taiwan University"
            companyLink="https://www.ntu.edu.tw/english/"
            time="July 2021 – Jan. 2023"
            address="Taipei, Taiwan"
            work="In this capacity, I proficiently utilized few-shot object detection methodologies to efficiently broaden novel class expansion. 
            Concurrently, I assumed a leadership role, directing a team of three individuals in the process of containerizing the system to enhance its long-term maintainability. Furthermore, I provided mentorship and conducted training programs for new lab members, imparting knowledge and expertise in the domain of object detection.
            "
          />
          <Details
            position="Undergraduate Research Assistant"
            company="National Taiwan University"
            companyLink="https://www.ntu.edu.tw/english/"
            time="July 2020 – July 2021"
            address="Taipei, Taiwan"
            work=" I successfully engineered an identification model using Faster R-CNN, yielding a notable mean average precision of 76.6%. Additionally, I implemented and managed an instant-message bot that served over 100 users in real-time identification services. Furthermore, I developed an anomaly detection model as a crucial initial step, achieving a remarkable F1-score of 96.2%."
          />
          <Details
            position="Teaching Assistant"
            company="National Taiwan University"
            companyLink="https://www.ntu.edu.tw/english/"
            time="Oct. 2022 – Dec. 2022"
            address="Taipei, Taiwan"
            work="Delivered image processing and machine learning courses for international graduate students.
            "
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
