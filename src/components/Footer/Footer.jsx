import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index.js";
function Footer() {
  return (
    <section className="overflow-hidden w-full text-center py-2 h-fit bg-gray-400 border border-t-2 border-t-black">
      <p className="md:text-sm text-xs font-normal">
        &copy; Copyright 2024 All Rights Reserved by Mohd Faziel.
      </p>
    </section>
  );
}

export default Footer;
