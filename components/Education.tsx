import { Divider } from "@nextui-org/react";
import React from "react";

export default function Education() {
  return (
    <section className="p-6 lg:p-10 m-auto items-center flex flex-col gap-8">
      <div className="max-w-3xl flex flex-col gap-1">
        <div>
          <div className="text-2xl font-semibold italic">
            My Education<span className="text-primary">.</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold">
          Computer Science and Engineering
        </h3>
        <h4 className="text-sm font-semibold">
          University of Puertor Rico, Mayaguez
        </h4>
        <p className="text-tiny italic">August 2021-2026(exp.)</p>
        <div>
          <ul className="pl-2 list-disc list-inside">
            <li>Honor Student.</li>
            <li>
              Relevant Coursework: Data Structures, Introduction to Software
              Engineering, Algorithm Design and Analysis, Advanced Programming,
              Calculus 1,2 and 3.
            </li>
            <li>Google Tech Exchange Alumni</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
