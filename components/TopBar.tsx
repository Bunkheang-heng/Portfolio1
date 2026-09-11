"use client";

import { site } from "@/lib/site";

type TopBarProps = {
  onToggleNav: () => void;
};

export function TopBar({ onToggleNav }: TopBarProps) {
  return (
    <div className="nav-top pt-30 pb-30">
      <div className="container">
        <div className="row">
          <div className="col-md-4 valign">
            <a href="#home" className="logo">
              <p>{site.shortName}</p>
            </a>
          </div>
          <div className="col-md-4 valign">
            <div className="social text-center full-width">
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
          <div className="col-md-4 valign">
            <div className="full-width info">
              <div className="d-flex justify-content-end">
                <a href={`mailto:${site.email}`}>
                  <span className="sub-title fz-12">{site.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-butn" onClick={onToggleNav} role="button" tabIndex={0} aria-label="Open menu">
          <span className="pe-7s-menu"></span>
        </div>
      </div>
    </div>
  );
}
