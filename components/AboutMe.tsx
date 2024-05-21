import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";

const Experience = [
  {
    title: "Technical Lead",
    company: "Stackz LLC",
    date: "March 2022 - Present",
    description:
      "Stackz is a company that I co-founded, we are a small team of five students with the objective of imp    `roving bussiness processes for small companies in Puerto Rico using the latest tecnologies. I am currently working as a Technical Lead at Stackz LLC. My responsibilities include leading a team of developers, managing projects and ensuring that the team meets its goals and deadlines.",
  },
];

export default function AboutMe() {
  return (
    <section className="p-6 lg:p-10 m-auto items-center flex flex-col gap-8 ">
      <div className="max-w-xl flex flex-col gap-1">
        <div>
          <div className="text-2xl font-semibold italic">
            A Bit About Myself<span className="text-primary">.</span>
          </div>
        </div>
        <div>
          <p className="">
            I am a Computer Science student with a passion for tech, learning
            and working with others. I think that tech is a great way to help
            people and make the world a better place. I am always looking for
            new opportunities to learn and grow.
          </p>
        </div>
      </div>
      <div className="max-w-xl flex flex-col gap-1">
        <div>
          <div className="text-2xl font-semibold italic">
            Experience & Skills<span className="text-primary">.</span>
          </div>

          <div className="flex flex-col gap-2">
            <p>
              I have the experience of working with:{" "}
              <b className="">
                Python, JavaScript, C++, Java, HTML, CSS, SQL, Google Cloud,
                Azure and Data Structures & Algorithms.
              </b>
            </p>
            <Divider />
            <div className="flex flex-col items-center ">
              <p className="mb-2 self-start">
                I've had the chance to apply my skills in the following roles:
              </p>
              {Experience.map((exp) => (
                <Card key={exp.title} className="max-w-lg shadow-none border">
                  <CardHeader>
                    <h4>{exp.title}</h4>
                    <p>{exp.company}</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p className="text-sm">{exp.description}</p>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <p className="text-tiny">{exp.date}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
