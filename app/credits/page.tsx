"use client";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function Credits() {
  return (
    <>
      <Navbar />
      <div className="mt-12 space-y-12 mb-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-semibold">Credits</h1>
          <p className="text-center justify-center">
            <a
              href="https://lyrist.vercel.app/"
              target="_blank"
              className="text-accent"
            >
              lyrist
            </a>{" "}
            -{" "}
            <a
              href="https://github.com/asrvd/lyrist"
              target="_blank"
              className="text-accent"
            >
              source
            </a>{" "}
            ~ (lyrics api)
          </p>
        </div>
        <div>
          <a className="text-accent" href="/">
            Go Back
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
