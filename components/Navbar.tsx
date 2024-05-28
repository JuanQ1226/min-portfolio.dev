"use client";
import React, { use } from "react";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
  Image,
} from "@nextui-org/react";
import { get } from "http";

export default function NavBar() {
  function getWidth() {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    } else {
      return 1080;
    }
  }

  const [screenWidth, setWidth] = useState(767);

  function handleResize(width: number) {
    setWidth(width);
  }

  useEffect(() => {
    window.addEventListener("resize", () => handleResize(getWidth()));
    handleResize(getWidth());
  });

  return (
    <Navbar>
      <NavbarBrand className="gap-2">
        <Image
          src={"Juan-logo.png"}
          alt="Logo"
          width={50}
          height={50}
          className="bg-blend-lighten"
        />
        <h2 className="font-sans italic font-semibold text-xl">
          Hi I&apos;m <span className="text-blue-700">Juan Quintana!</span>
        </h2>{" "}
      </NavbarBrand>
    </Navbar>
  );
}
