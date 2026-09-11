import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container" style={{ padding: "160px 0", textAlign: "center" }}>
      <h1 className="mb-30">
        Page <span className="main-color">not found</span>
      </h1>
      <p className="mb-40">The page you are looking for does not exist.</p>
      <div className="butn-presv">
        <Link href="/" className="butn butn-md butn-bord radius-5 skew">
          <span>Back Home</span>
        </Link>
      </div>
    </main>
  );
}
