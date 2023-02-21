import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.termly.io/embed-policy.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
    <div className="px-6 pt-6 lg:px-8">
    <Navbar />
    <div
      name="termly-embed"
      data-id="d6fda1db-edea-44ea-bfce-690f067310e3"
      data-type="iframe"
      className="mt-6"
    ></div>
    <Footer />
    </div>
    </>
  );
}