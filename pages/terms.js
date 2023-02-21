import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
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
      data-id="6b5744dc-6eca-4077-b513-4879b5dbc1fb"
      data-type="iframe"
      className="mt-6"
    ></div>
    <Footer />
    </div>
    </>
  );
}