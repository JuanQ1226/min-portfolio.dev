import React from "react";

export default function AboutMe() {
  return (
    <section className="p-6 lg:p-10 m-auto items-center flex flex-col gap-8">
      <div className="max-w-3xl flex flex-col gap-1">
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
    </section>
  );
}
