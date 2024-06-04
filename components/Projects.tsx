import React from "react";

export default function Projects() {
  return (
    <section className="p-6 lg:p-10 m-auto items-center flex flex-col gap-8">
      <div className="max-w-3xl flex flex-col flex-grow gap-1">
        <div className="text-2xl font-semibold italic">
          My Projects<span className="text-primary">.</span>
        </div>
        <h3 className="text-lg font-semibold">Project 1</h3>
      </div>
    </section>
  );
}
