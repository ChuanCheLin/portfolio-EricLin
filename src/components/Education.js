import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ type, time, place, info }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl">{type}&nbsp;</h3>
        <span className="capitalize font-medium text-dark/75">
          {time} | {place}
        </span>
        <p className="font-medium w-full">{info}</p>
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
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center">Education</h2>
      <div ref={ref} className="w-[75%] mx-auto relative">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4">
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
            info={
              <>
                <p>
                  Awards: Dean's List Award for Top 5% of Students/Best Paper
                  Award in 2020/2021 Conference on Biomechatronics and
                  Agricultural Machinery Engineering
                </p>
                <p>
                  Scholarship: 2022 CTCI Foundation Science and Technology
                  Scholarship (≈5000 USD)
                </p>
                <p>
                  Relevant Coursework: Practical Data Structures and Algorithms,
                  Machine Learning, Engineering Mathematics, Computer
                  Programming Language
                </p>
              </>
            }
          />
        </ul>
      </div>
    </div>
  );
};

export default Education;
