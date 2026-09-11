"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { certificateCategories, certificates } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

function isPdf(path: string) {
  return path.toLowerCase().endsWith(".pdf");
}

export function Certificates() {
  const [category, setCategory] = useState<(typeof certificateCategories)[number]>("All");
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const visible = useMemo(
    () => (category === "All" ? certificates : certificates.filter((cert) => cert.category === category)),
    [category],
  );

  const active = certificates.find((cert) => cert.file === activeFile) ?? null;

  useEffect(() => {
    if (!activeFile) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveFile(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeFile]);

  return (
    <div className="sec-box certificates section-padding bord-thin-bottom" id="certificates">
      <Reveal className="sec-head mb-50" animation="fadeInUp">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h3>Certificates</h3>
            <p className="mt-15">
              Training and competition work across cloud, cybersecurity, AI, and product delivery.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="cert-filters mb-40">
        {certificateCategories.map((item) => (
          <button
            key={item}
            type="button"
            className={`cert-filter${category === item ? " is-active" : ""}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="row">
        {visible.map((cert) => (
          <div className="col-md-6 col-lg-4" key={cert.file}>
            <article className="cert-card mb-30">
              <button type="button" className="cert-card-media" onClick={() => setActiveFile(cert.file)}>
                <Image src={encodeURI(cert.thumb)} alt={cert.title} width={720} height={500} unoptimized />
              </button>
              <div className="cert-card-body">
                <h6 className="mb-10">
                  <span className="main-color">{cert.title}</span>
                </h6>
                <p className="fz-13 mb-15 opacity-7">{cert.issuer}</p>
                <p className="cert-desc">{cert.description}</p>
                <div className="mt-20">
                  <button type="button" className="cert-link" onClick={() => setActiveFile(cert.file)}>
                    View certificate
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {active ? (
        <div className="cert-modal" onClick={() => setActiveFile(null)} role="presentation">
          <div
            className="cert-modal-panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="cert-modal-head">
              <div>
                <h6 className="main-color mb-5">{active.title}</h6>
                <p className="fz-13 opacity-7">
                  {active.category} / {active.issuer} / {active.date}
                </p>
              </div>
              <button type="button" className="cert-modal-close" onClick={() => setActiveFile(null)}>
                Close
              </button>
            </div>
            <div className="cert-modal-preview">
              {isPdf(active.file) ? (
                <iframe src={active.file} title={active.title} />
              ) : (
                <Image src={encodeURI(active.file)} alt={active.title} width={1400} height={1000} unoptimized />
              )}
            </div>
            <div className="cert-modal-foot">
              <p>{active.description}</p>
              <a href={active.file} target="_blank" rel="noreferrer" className="cert-link">
                Open original file
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
