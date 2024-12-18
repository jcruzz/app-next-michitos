"use client";

import { Navbar } from "flowbite-react";
import Link from "next/link";
import ThemeToggleButton, { useTheme } from "../theme/ToggleTheme";
import Image from "next/image";

const HeaderUnAuth: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-[#0A101D] transition duration-200 border-gray-200 shadow-md dark:border-b dark:border-gray-600 sticky top-0 z-50">
      <Navbar
        fluid
        rounded
        className="container mx-auto bg-transparent dark:bg-transparent py-0"
      >
        <Navbar.Brand>
          <Image
            src={isDarkMode ? "/images/White.png" : "/images/Dark.png"}
            alt="BDP"
            width={200}
            height={100}
            priority
            className="py-3"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <ThemeToggleButton />
          {/* <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} href="#">
            About
          </Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default HeaderUnAuth;
