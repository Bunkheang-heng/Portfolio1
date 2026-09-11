"use client";

type SiteNavProps = {
  open: boolean;
  onNavigate: () => void;
};

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav({ open, onNavigate }: SiteNavProps) {
  return (
    <nav className={`navbar${open ? " active" : ""}`}>
      <div className="row justify-content-end rest">
        <div className="col-lg-8 rest">
          <ul className="navbar-nav main-bg d-flex justify-content-end">
            {links.map((link) => (
              <li className="nav-item" key={link.href}>
                <a href={link.href} onClick={onNavigate}>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
