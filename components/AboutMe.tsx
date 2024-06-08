import React from "react";

export default function AboutMe() {
  return (
    <section className="p-4 lg:p-6 m-auto items-center flex flex-col gap-8">
      <div className="max-w-3xl flex xl:max-w-4xl flex-col gap-1">
        <div>
          <div className="text-2xl font-semibold italic">
            A Bit About Myself<span className="text-primary">.</span>
          </div>
        </div>
        <div>
          <p className="">
            I&apos;m a dedicated and passionate computer science student with a
            passion for developing software that impacts the life of others.
            I&apos;m someone who is always looking to learn new things and
            improve my skills. I also enjoy working with others and
            collaborating on projects. I&apos;m always looking for new
            opportunities to grow and develop my skills.
          </p>
        </div>
      </div>
    </section>
  );
}
