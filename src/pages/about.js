import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import profilePic from "../../public/images/profile/developer-pic-2.jpg";
import Image from "next/image";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};

const about = () => {
  return (
    <>
      <Head>
        <title>Chuan-Che Lin | About Page</title>
        <meta name="description" content="any description" />
      </Head>
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Passion Fuels Purpose!" className="mb-16" />
          <div className="grid w-full grid-cols-8 gap-16">
            <div className="col-span-3 flex flex-col items-start justify-start">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                Autobiography
              </h2>
              <p className="font-medium">
                Chuan-Che Lin, an M.S. candidate in Information Management at
                the University of Illinois Urbana-Champaign, specializes in
                using machine learning techniques to tackle real-world
                challenges.
              </p>
              <p className="font-medium my-4">
                He currently works as a Natural Language Processing Engineering
                Intern to develop the pipeline for conversational AI for outfit
                recommendation. His past works includes developing an
                identification model for tea diseases and establishing a website
                and instant-message bot for real-time identification services.
                To optimize efficiency, he focused his bachelor's thesis on
                few-shot learning to avoid redundant data collection and
                labeling.
              </p>
              <p className="font-medium">
                Chuan-Che's expertise also extends to automating routine
                procedures using Python and shell scripts. With a solid academic
                foundation and experience in developing machine learning models
                and web/mobile applications in Linux environments, Chuan-Che Lin
                is ready to set off his journey as a software engineer and
                contribute to a software engineering team as an intern.
              </p>
            </div>
            <div
              className="col-span-3 relative h-max rounded-2xl 
              border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light"
            >
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={profilePic}
                alt="EricLin"
                className="w-full h-auto rounded-2xl"
                priority
                sizes="(maxwidth: 768px) 100vw,
              (maxwidth: 12000px) 50vw,
              33vw
              "
              />
            </div>
            <div className="col-span-2 flex flex-col items-end justify-between">
              <div className="flex flex-col items-end justify-center">
                <span className="inline-block text-7xl font-bold">
                  <AnimatedNumbers value={50} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75">
                  staisfied clients
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="inline-block text-7xl font-bold">
                  <AnimatedNumbers value={50} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75">
                  staisfied clients
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center">
                <span className="inline-block text-7xl font-bold">
                  <AnimatedNumbers value={50} />+
                </span>
                <h2 className="text-xl font-medium capitalize text-dark/75 dark:text-light/75">
                  staisfied clients
                </h2>
              </div>
            </div>
          </div>

          <Skills />
          <Experience />
          <Education />
        </Layout>
      </main>
    </>
  );
};

export default about;
