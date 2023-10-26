import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import Image from "next/image";
import { GithubIcon } from "@/components/Icons";
import teaIdentification from "../../public/images/projects/teaDiseaseIdentificationAPP.png";
import raven from "../../public/images/projects/raven.png";
import puzzleGame from "../../public/images/projects/puzzleGame.png";
import AnimeFaceGeneration from "../../public/images/projects/AnimeFaceGeneration.png";
import LunarLander from "../../public/images/projects/LunarLander.png";
import DLtoolkit from "../../public/images/projects/deepLearningToolkit.png";
import { motion } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";

const FramerImage = motion(Image);

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
  return (
    <article
      className="w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl 
    border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light
    lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
    >
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light
      xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]"
      />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(maxwidth: 768px) 100vw,
              (maxwidth: 12000px) 50vw,
              50vw
              "
        />
      </Link>

      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light lg:text-2xl sm:text-xl">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold
            dark:bg-light dark:text-dark
            sm:px-4 sm:text-base"
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ type, title, img, link, github }) => {
  return (
    <article
      className="w-full flex flex-col items-center justify-center rounded-2xl 
    border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4
    "
    >
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light
      md:w-[101%] md:h-[101%] xs:h-[102%] xs:rounded-[1.5rem]"
      />
      <Link
        href={link}
        target="_blank"
        className="w-full cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(maxwidth: 768px) 100vw,
                      (maxwidth: 12000px) 50vw,
                      50vw
                      "
        />
      </Link>

      <div className="w-full flex flex-col items-start justify-between mt-4">
        <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl sm:text-xl">
            {title}
          </h2>
        </Link>
        <div className="w-full mt-2 flex items-center justify-between">
          <Link
            href={link}
            target="_blank"
            className="text-lg font-semibold underline md:text-base"
          >
            Visit
          </Link>
          <Link href={github} target="_blank" className="w-8 md:w-6">
            <GithubIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};

const projects = () => {
  return (
    <>
      <Head>
        <title>Chuan-Che Lin | Projects Page</title>
        <meta name="description" content="any description" />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="From Vision to Function."
            className="mb-16 lg:!text-5xl sm:!text-4xl xs:!text-2xl sm:mb-8"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                title="Implementation of Few-Shot Object Detection Methods on Tea Diseases Identification"
                img={teaIdentification}
                summary="Applying few-shot object detection (FSOD) methods generalize the flexibility of the model to incorporate novel-added classes. 
                The results showed that the suggested FSOD method FSCE could efficiently expand the class number for identification without significantly sacrificing performance. 
                It provides a feasible framework for novel class expansion with a lower cost of labor and time."
                link="Implementation of Few-Shot Object Detection Methods on Tea Diseases Identification.pdf"
                github="https://github.com/ChuanCheLin/FSCE_tea-diseases/tree/master"
                type="Featured Project"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Raven - Your AI Stylist"
                img={raven}
                summary="Raven is an AI outfit generator that empowers people to find what to wear and where to buy across different brands and retailers in the easiest and fastest way. 
                To create this innovative platform, we utilized Next.js and Express to build the frontend and backend of the project. 
                Moreover, I am responsible for the development of the pipeline for conversational AI integration using LangChain. 
                This pipeline allows Raven to generate personalized outfit suggestions, making the fashion discovery process even more seamless and enjoyable for users."
                link="https://www.ravenstyle.info/"
                github="https://github.com/RavenStyle/raven-frontend"
                type="Featured Project"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Deep Learning Toolkit"
                img={DLtoolkit}
                link="https://github.com/ChuanCheLin/DeepLearning_toolkit"
                github="https://github.com/ChuanCheLin/DeepLearning_toolkit"
                type="Project"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="A Puzzle Game for Everyone"
                img={puzzleGame}
                link="https://github.com/ChuanCheLin/puzzle_game"
                github="https://github.com/ChuanCheLin/puzzle_game"
                type="Project"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Lunar Lander (Reinforcement Learning)"
                img={LunarLander}
                link="https://github.com/ChuanCheLin/LunarLander_RL"
                github="https://github.com/ChuanCheLin/LunarLander_RL"
                type="Project"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Anime Face Generation (Generative Adversarial Network)"
                img={AnimeFaceGeneration}
                link="https://github.com/ChuanCheLin/AnimeFaceGeneration"
                github="https://github.com/ChuanCheLin/AnimeFaceGeneration"
                type="Project"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default projects;
