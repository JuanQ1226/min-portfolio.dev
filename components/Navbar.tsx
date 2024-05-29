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
      <NavbarBrand className="gap-2" as={Link} href={"/"}>
        <Image
          src={"Juan-logo.png"}
          alt="Logo"
          width={50}
          height={50}
          className="bg-blend-lighten"
        />
        <h2 className="font-sans italic font-semibold text-xl text-blue-600">
          Juanqunintana.dev
        </h2>{" "}
      </NavbarBrand>
    </Navbar>
  );
}
