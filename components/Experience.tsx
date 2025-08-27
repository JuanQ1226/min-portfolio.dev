"use client";

import React from "react";
import Tilt from "react-parallax-tilt";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Experience } from "@/assets/data/experience";
import { Skills } from "@/assets/data/skills";
import {
  faPython,
  faJava,
  faJs,
  faHtml5,
  faCss3,
  faReact,
  faGoogle,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCode } from "@fortawesome/free-solid-svg-icons";
import Autoplay from "embla-carousel-autoplay";
const icons: any = {
  python: faPython,
  cplusplus: "",
  java: faJava,
  javascript: faJs,
  html: faHtml5,
  css: faCss3,
  react: faReact,
  nextjs: "",
  sql: faDatabase,
  googlecloud: faGoogle,
  azure: faMicrosoft,
  dsa: faCode,
};

export default function Experiences() {
  /* Experience and Skill Section Functional Component */
  return (
    <section className="p-4 lg:p-6 m-auto items-center flex flex-col gap-8">
      <div className="max-w-3xl xl:max-w-4xl flex flex-col">
        <div className="text-2xl font-semibold italic mb-4">
          Experience & Skills<span className="text-primary">.</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex-row flex flex-wrap">
            {Skills.map((skill, index) => (
              <Tilt
                key={index}
                className="w-fit"
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
              >
                <Chip
                  variant="faded"
                  size="md"
                  className="m-1 shadow-md border-blue-600 hover:border-blue-400 hover:scale-110 transition-all ease-in-out"
                  startContent={
                    <FontAwesomeIcon
                      icon={icons[skill.icon]}
                      className="items-center text-xs text-primary"
                    />
                  }
                >
                  <h4 className="text-foreground font-semibold">
                    {skill.skill}
                  </h4>
                </Chip>
              </Tilt>
            ))}
          </div>
          <Divider />
          <div className="flex flex-col items-center ">
            <p className="mb-4 self-start font-semibold">
              I&apos;ve had the chance to apply and develop my skills in the
              following roles:
            </p>
            <Accordion>
              {Experience.map((exp, index) => (
                <AccordionItem
                  key={index}
                  title={
                    <p>
                      <b className="font-semibold">{exp.title}</b>
                      {" @ "} {exp.company}
                    </p>
                  }
                >
                  <Card key={index} className="shadow-none border">
                    <CardBody>
                      <p className="text-sm">{exp.description}</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <p className="text-tiny">{exp.date}</p>
                    </CardFooter>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
