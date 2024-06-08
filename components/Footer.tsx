import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="w-full h-6 bg-white block"
      >
        <polygon className="fill-[#e0e5eb]" points="0 10 0 0 100 10" />
      </svg>
      <div className="bg-[#e0e5eb] w-screen bottom-0 left-0 pb-1">
        <div className="flex flex-row gap-4  container mx-auto py-4">
          <div>
            <div className="text-lg font-semibold italic mb-4">Contact Me.</div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <a
                  href="mailto:juan.quintana5@upr.edu"
                  className="text-primary hover:underline"
                >
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </a>
                <a
                  href="https://www.linkedin.com/in/juan-quintana-06468724b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold italic mb-4">
              View My Projects.
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/JuanQ1226"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="text-tiny text-center text-[#6c757d]">
          Made with ❤️ using Next.js, Three.js,{" "}
          <a
            className="hover:underline"
            href="https://github.com/mkosir/react-parallax-tilt"
          >
            react-parallax-tilt
          </a>{" "}
          and NextUI
        </div>
        <div className=" text-tiny text-center text-[#6c757d]">
          © 2021 Juan Quintana. All rights reserved.
        </div>
      </div>
    </>
  );
}
