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

  if (screenWidth < 1000) {
    return (
      <Navbar>
        <NavbarBrand className="gap-1">
          <Image
            src={"Juan-logo.png"}
            alt="Logo"
            width={40}
            height={40}
            className="mix-blend-multiply"
          />
          <h2 className="font-sans italic font-semibold text-xl">
            Hi I&apos;m <span className="text-blue-700">Juan Quintana!</span>
          </h2>
        </NavbarBrand>
        <NavbarMenuToggle />
        <NavbarMenu>
          <NavbarMenuItem>
            <Button color="default" className="bg-transparent" variant="flat">
              About Myself
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button color="default" className="bg-transparent" variant="flat">
              Experience
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button color="default" className="bg-transparent" variant="flat">
              Projects
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button color="default" className="bg-transparent" variant="flat">
              Education
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button color="default" className="bg-transparent" variant="flat">
              Contact Me
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    );
  } else {
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
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Button color="default" className="bg-transparent" variant="flat">
              About Myself
            </Button>
          </NavbarItem>
          <NavbarItem isActive>
            <Button color="default" className="bg-transparent" variant="flat">
              Experience
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="default" className="bg-transparent" variant="flat">
              Projects
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="default" className="bg-transparent" variant="flat">
              Education
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="default" className="bg-transparent" variant="flat">
              Contact Me
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
}
