"use client";

import { useState } from "react";
import { BackgroundLines } from "@/components/BackgroundLines";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteNav } from "@/components/SiteNav";
import { Skills } from "@/components/Skills";
import { TopBar } from "@/components/TopBar";
import { AskMe } from "@/components/AskMe";

export function PortfolioApp() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <BackgroundLines />

      <div className="contact-fixed-butn">
        <div className="butn-presv">
          <a href="#contact" className="butn butn-sm bg-white skew">
            <span className="text-dark">Contact Us</span>
          </a>
        </div>
      </div>

      <TopBar onToggleNav={() => setNavOpen((open) => !open)} />

      <main className="container">
        <Intro />
        <SiteNav open={navOpen} onNavigate={() => setNavOpen(false)} />
        <section className="in-box">
          <Skills />
          <Certificates />
          <Contact />
        </section>
      </main>

      <Footer />
      <AskMe />
    </>
  );
}
