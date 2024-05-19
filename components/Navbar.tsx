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
} from "@nextui-org/react";

export default function NavBar() {
  const [screenWidth, setWidth] = useState(window.innerWidth);
  function handleResize(width: number) {
    setWidth(width);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => handleResize(window.innerWidth));
    }
  });
  if (screenWidth < 768) {
    return (
      <Navbar>
        <NavbarBrand>
          <h2 className="font-sans italic font-bold text-xl">
            Hi I&apos;m <span className="text-blue-700">Juan Quintana!</span>
          </h2>
        </NavbarBrand>

        <NavbarMenuToggle />
        <NavbarMenu>
          <NavbarMenuItem>About</NavbarMenuItem>
          <NavbarMenuItem>Projects</NavbarMenuItem>
          <NavbarMenuItem>Contact</NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    );
  } else {
    return (
      <Navbar className="">
        <NavbarBrand>
          <h2 className="font-sans italic font-bold text-xl">
            Hi I&apos;m <span className="text-blue-700">Juan Quintana!</span>
          </h2>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>
            <NavbarMenuItem>About</NavbarMenuItem>
          </NavbarItem>
          <NavbarItem>
            <NavbarMenuItem>Projects</NavbarMenuItem>
          </NavbarItem>
          <NavbarItem>
            <NavbarMenuItem>Contact</NavbarMenuItem>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent>
          <NavbarItem>
            <NavbarItem>
              <Button>My Resume</Button>
            </NavbarItem>
          </NavbarItem>
          <NavbarItem>
            <NavbarItem>
              <Button as={Link}>MyResume</Button>
            </NavbarItem>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
}
