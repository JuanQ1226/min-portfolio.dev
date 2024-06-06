"use client";
import { Divider, Image, Link } from "@nextui-org/react";
import Tilt from "react-parallax-tilt";

import React from "react";

export default function Projects() {
  return (
    <section className="p-4 lg:p-6 m-auto items-center flex flex-col gap-8">
      <div className="max-w-3xl flex flex-col flex-grow gap-1">
        <div className="text-2xl font-semibold italic">
          My Projects<span className="text-primary">.</span>
        </div>

        <div className="md:grid md:grid-cols-2 flex flex-col pt-2 md:pt-0 items-center gap-5">
          <Tilt tiltReverse tiltMaxAngleX={15} tiltMaxAngleY={15}>
            <Image
              alt="maze_generator Image"
              height={400}
              width={400}
              src={"./briq.png"}
              className="shadow-md shadow-gray-500 hover:scale-105 transform transition duration-300 ease-in-out"
            />
          </Tilt>
          <div>
            <h2 className="text-lg font-semibold">
              Briq (E-commerce for construction materials in PR).
            </h2>
            <div className="text-sm">
              This is a product I&apos;m currently designing and developing with
              Stackz. This platform will allow construction material providers
              in PR to have a centralized portal to post their products. This
              will allow contractors to easily view and purchase the products
              that providers have available. The platform is a web app
              implemented in Next.js, Postgresql and uses Vercel for data
              storage and hosting services.
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
