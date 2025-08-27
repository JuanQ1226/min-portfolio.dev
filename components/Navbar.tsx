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
import { ThemeSwitch } from "./ThemeSwitch";
import { get } from "http";
import { useTheme } from "next-themes";

export default function NavBar() {
  function getWidth() {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    } else {
      return 1080;
    }
  }

  const [screenWidth, setWidth] = useState(767);
  const { theme, setTheme, systemTheme } = useTheme();
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
          className={`bg-blend-lighten ${
            theme === "dark" ? "invert" : ""
          } rounded-full`}
        />
        <h2 className="text-xl font-mono text-blue-600">juanqunintana.dev</h2>{" "}
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
