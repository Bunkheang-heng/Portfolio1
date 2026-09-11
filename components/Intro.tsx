import Image from "next/image";
import { site } from "@/lib/site";

export function Intro() {
  return (
    <section className="intro-profile md-mb50" id="home">
      <div className="row rest">
        <div className="col-lg-4 box-img main-bg">
          <div className="cont valign">
            <div className="full-width">
              <div className="img">
                <Image
                  src="/imgs/header/photo_6131719883180849914_y.jpg"
                  alt={site.name}
                  width={480}
                  height={600}
                  priority
                  sizes="(max-width: 991px) 100vw, 360px"
                />
                <span className="icon">
                  <Image src="/imgs/header/icon1.png" alt="" width={40} height={40} />
                </span>
                <span className="icon">
                  <Image src="/imgs/header/icon2.png" alt="" width={40} height={40} />
                </span>
                <span className="icon">
                  <Image src="/imgs/header/icon4.png" alt="" width={40} height={40} />
                </span>
              </div>
              <div className="info text-center mt-30">
                <h5>{site.name}</h5>
                <p className="fz-13 text-u">{site.availability}</p>
              </div>
              <div className="social text-center mt-20">
                <a href={site.social.telegram} target="_blank" rel="noreferrer">
                  <i className="fab fa-telegram"></i>
                </a>
                <a href={site.social.github} target="_blank" rel="noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href={site.social.linkedin} target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 content main-bg">
          <h1>
            Hello, I’m <span className="main-color">{site.name}</span>,{" "}
            <span className="bord">
              {site.role}
              <i></i>
            </span>{" "}
            Based in {site.location}.
          </h1>
          <div className="stauts mt-80">
            <div className="d-flex align-items-center">
              <div className="butn-presv">
                <a href={site.cv} className="butn butn-md butn-bord radius-5 skew" download>
                  <span>Download C.V</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
