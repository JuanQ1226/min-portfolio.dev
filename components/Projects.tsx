"use client";
import { Divider, Image, Link } from "@nextui-org/react";
import Tilt from "react-parallax-tilt";

import React from "react";

export default function Projects() {
  return (
    <section className="p-4 lg:p-6 m-auto items-center flex flex-col gap-8">
      <div className="max-w-3xl xl:max-w-4xl flex flex-col flex-grow gap-1">
        <div className="text-2xl font-semibold italic">
          My Projects<span className="text-primary">.</span>
        </div>

        <div className="md:grid md:grid-cols-2 flex flex-col pt-2  items-center gap-5">
          <Tilt tiltReverse tiltMaxAngleX={15} tiltMaxAngleY={15}>
            <Image
              alt="zorzal Image"
              height={400}
              width={400}
              src={"./zorzal.png"}
              className="shadow-md shadow-gray-500 hover:scale-105 transform transition duration-300 ease-in-out"
            />
          </Tilt>
          <div>
            <h2 className="text-lg font-semibold">Zorzal</h2>
            <div className="text-sm">
              Zorzal is a B2B construction materials marketplace that connects
              contractors with suppliers, reducing industry fragmentation and
              streamlining procurement. Enables contractors to generate RFQs,
              negotiate with suppliers in real time, and complete payments
              through the platform, reducing manual workflows and ensuring
              transaction security. Built on a modern cloud-native architecture
              leveraging AWS Amplify Gen 2, Auth0 authentication, DynamoDB, and
              Braintree payment integration, with a roadmap toward microservices
              and Kubernetes scalability. Currently participating in the Fase I
              Intensive incubator program, receiving mentorship and support to
              accelerate product development, validate the business model, and
              prepare for market launch.
            </div>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="md:grid md:grid-cols-2 flex flex-col items-center gap-5">
          <div>
            <Link
              showAnchorIcon
              isExternal
              color="foreground"
              href="https://maze-generator-and-solver.vercel.app/"
              className="text-lg font-semibold"
            >
              Maze Generator and Solver
            </Link>
            <div className="text-sm">
              A web app implemented using the web framework astro. The web app
              generates a random maze using a DFS algorithm. The user can select
              the dimensions of the maze and then he can click a button to find
              the shortest path from the top-left corner to the bottom-right
              corner. The path is found by using the BFS algorithm. This project
              helped me learn more about dfs, bfs and graphs in general. It also
              helped me in learning a new way to display graphics to the user
              using HTML components.
            </div>
          </div>
          <Tilt tiltReverse tiltMaxAngleX={15} tiltMaxAngleY={15}>
            <Image
              className="hover:scale-105 shadow-md shadow-gray-500 transform transition duration-300 ease-in-out"
              alt="maze_generator Image"
              height={400}
              width={400}
              src={"./maze_generator.png"}
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
}
