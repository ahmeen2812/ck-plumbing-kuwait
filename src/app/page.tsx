"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Statistics } from "@/components/sections/Statistics";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1E2933]">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Statistics />
        <Services />
        <Contact />
      </main>
    </div>
  );
}