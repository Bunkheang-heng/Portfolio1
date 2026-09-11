import Image from "next/image";
import { skills } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Skills() {
  return (
    <div className="sec-box skills section-padding bord-thin-bottom" id="about">
      <div className="row">
        <div className="col-lg-4">
          <Reveal className="sec-head md-mb80">
            <h3>
              <span>Skills</span>
            </h3>
          </Reveal>
        </div>
        <div className="col-lg-8">
          <div className="skill-list">
            {skills.map((skill, index) => (
              <Reveal className="skill-chip" delay={`${(index % 6) * 0.05}s`} key={skill.name}>
                <span className="skill-icon">
                  {skill.icon ? (
                    <Image src={skill.icon} alt="" width={22} height={22} unoptimized />
                  ) : (
                    <span className="skill-mark" aria-hidden="true">
                      {skill.mark}
                    </span>
                  )}
                </span>
                <h6>{skill.name}</h6>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
