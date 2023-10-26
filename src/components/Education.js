import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ type, time, place, info }) => {
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
          {type}&nbsp;
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 md:text-sm">
          {time} | {place}
        </span>
        <p className="font-medium w-full md:text-sm">{info}</p>
      </motion.div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="mt-36 md:mt-16 sm:mt-8">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Education
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light
          md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            type="Master of Science in Information Management"
            time="Aug. 2023 – Present"
            place="University of Illinois Urbana-Champaign (UIUC)"
            info=""
          />
          <Details
            type="Bachelor of Science in Biomechatronics Engineering"
            time="Sept. 2018 – June 2022"
            place="National Taiwan University (NTU)"
            info="Awards: Dean's List Award for Top 5% of Students/Best Paper
                  Award in 2020/2021 Conference on Biomechatronics and
                  Agricultural Machinery Engineering

                  Scholarship: 2022 CTCI Foundation Science and Technology
                  Scholarship (≈5000 USD)

                  Relevant Coursework: Practical Data Structures and Algorithms,
                  Machine Learning, Engineering Mathematics, Computer
                  Programming Language
                  "
          />
        </ul>
      </div>
    </div>
  );
};

export default Education;
