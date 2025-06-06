import React, { useState, useEffect } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import "../styles/navbar.css";

// Komponen untuk Home
function HomeLink({ setActiveSection }) {
  return (
    <Link
      to="home"
      smooth={true}
      duration={500}
      spy={true}
      activeClass="active"
      className="nav-link"
      onSetActive={() => setActiveSection("home")}
    >
      Home
    </Link>
  );
}

// Komponen untuk Dashboard
function DashboardLink({ setActiveSection }) {
  return (
    <Link
      to="dashboard"
      smooth={true}
      duration={500}
      spy={true}
      activeClass="active"
      className="nav-link"
      onSetActive={() => setActiveSection("dashboard")}
    >
      Dashboard
    </Link>
  );
}

// Komponen untuk About
function AboutLink({ setActiveSection }) {
  return (
    <Link
      to="about"
      smooth={true}
      duration={500}
      spy={true}
      activeClass="active"
      className="nav-link"
      onSetActive={() => setActiveSection("about")}
    >
      About
    </Link>
  );
}

// Komponen untuk FAQ
function FAQLink({ setActiveSection }) {
  return (
    <Link
      to="faq"
      smooth={true}
      duration={500}
      spy={true}
      activeClass="active"
      className="nav-link"
      onSetActive={() => setActiveSection("faq")}
    >
      FAQ
    </Link>
  );
}

function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Mengatur status menu hamburger

  useEffect(() => {
    scrollSpy.update();

    Events.scrollEvent.register("end", () => {
      scrollSpy.update();
    });

    return () => {
      Events.scrollEvent.remove("end");
    };
  }, []);

  // Fungsi untuk toggle menu hamburger
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar animate__animated animate__fadeInDown">
      <div className="logo">
        <img src="/assets/Logo.png" alt="Logo" />
        <span className="nav-eddy">Eddy Station</span>
      </div>

      {/* Menu Hamburger untuk perangkat mobile */}
      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navbar Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <HomeLink setActiveSection={setActiveSection} />
        <DashboardLink setActiveSection={setActiveSection} />
        <AboutLink setActiveSection={setActiveSection} />
        <FAQLink setActiveSection={setActiveSection} />
      </div>
    </nav>
  );
}

export default Navbar;
