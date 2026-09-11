import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="pb-30 pt-30">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <p className="fz-13">
                © {new Date().getFullYear()} <span className="main-color">{site.shortName.split(" ")[0]}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
