"use client";

import { useMemo, useState } from "react";
import { projectCategories, projects } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Projects() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");

  const visible = useMemo(
    () =>
      category === "All" ? projects : projects.filter((project) => project.categories.includes(category)),
    [category],
  );

  return (
    <div className="sec-box projects section-padding bord-thin-bottom" id="projects">
      <Reveal className="sec-head mb-50" animation="fadeInUp">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h3>Selected work</h3>
            <p className="mt-15">
              Eight shipped projects from GitHub. Course homework, forks, empty repos, and one-off experiments stayed off this list.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="cert-filters mb-40">
        {projectCategories.map((item) => (
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
        {visible.map((project, index) => (
          <div className="col-md-6" key={project.repo}>
            <Reveal className="project-card mb-30" delay={`${(index % 4) * 0.06}s`}>
              <article>
                <div className="project-card-top">
                  <span className="project-year">{project.year}</span>
                  <div className="project-cats">
                    {project.categories.map((tag) => (
                      <span className="cert-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h6 className="mb-10">
                  <span className="main-color">{project.title}</span>
                </h6>
                <p className="project-summary">{project.summary}</p>
                <p className="project-stack">{project.stack.join(" / ")}</p>
                <div className="project-links">
                  <a href={project.repo} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live site
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
