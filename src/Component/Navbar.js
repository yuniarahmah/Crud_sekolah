import React, { useState, useEffect } from "react";
import Logo from "../asset/logo.png"; // Importing the logo image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserTie,
  faChartSimple,
  faPeopleRoof,
  faPaste
} from "@fortawesome/free-solid-svg-icons";

function Navbarcom() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Lakukan logika autentikasi di sini, seperti memanggil API login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Lakukan logika logout di sini, seperti membersihkan sesi atau memanggil API logout
  };

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (
        isOpen &&
        !e.target.closest("#sidebar") &&
        !e.target.closest(".btn-toggle")
      ) {
        closeSidebar();
      }
    };

    window.addEventListener("click", closeOnOutsideClick);

    return () => {
      window.removeEventListener("click", closeOnOutsideClick);
    };
  }, [isOpen]);

  const backgroundColor = isOpen ? "#008DDA" : "";

  return (
    <>
      <nav
        style={{ position: "fixed", top: "5px", width: "100%", zIndex: 1000 }}
      >
        <div style={{ backgroundColor }}>
          {/* Navbar */}
          <div id="viewport" className={isOpen ? "open" : ""}>
            <div
              id="sidebar"
              style={{
                overflow: "hidden",
                position: "fixed",
                top: 0,
                left: isOpen ? 0 : "-250px",
              }}
            >
              <header
                style={{ paddingTop: "8px", paddingBottom: "8px" }}
                className="px-4"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={Logo}
                    alt="Logo"
                    width="70px"
                    height="60px"
                    className="mr-3"
                  />
                  <p
                    className="m-0"
                    style={{ color: "white", fontSize: "15px" }}
                  >
                    Data Sekolah
                  </p>
                </div>
              </header>
              <ul className="nav flex-column">
                {/* Sidebar items */}
                {/* <li className="nav-item">
                  <a href="/dashboard" className="nav-link">
                    <FontAwesomeIcon icon={faChartSimple} /> Dashboard
                  </a>
                </li> */}
                <li className="nav-item">
                  <a href="/guru" className="nav-link">
                    <FontAwesomeIcon icon={faUserTie} /> Guru
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/siswa" className="nav-link">
                    <FontAwesomeIcon icon={faUser} /> Murid
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/kelas" className="nav-link">
                    <FontAwesomeIcon icon={faPeopleRoof} /> Kelas
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/mapel" className="nav-link">
                    <FontAwesomeIcon icon={faPaste} /> Mapel
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link">
                    {isLoggedIn ? "Logout" : "Login"}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div
            id="content"
            style={{
              marginLeft: isOpen ? "250px" : "0",
              paddingTop: "60px",
              position: "relative",
              top: "0",
              transition: "top 0.5s ease",
              zIndex: "0", // Added CSS
            }}
          >
            <nav
              style={{
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                width: "100%",
                position: "fixed",
                top: 0,
                height: "9%",
                zIndex: "1", // Added CSS
              }}
              className="navbar navbar-default"
            >
              {!isOpen && (
                <div
                  className={`logo-navbar d-flex align-items-center${
                    isOpen ? " hidden" : ""
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={Logo}
                    alt="Logo"
                    width={"70px"}
                    height={"50px"}
                    className="mr-3"
                  />
                  <p
                    className="m-0"
                    style={{ color: "white", fontSize: "15px" }}
                  >
                    Data Sekolah
                  </p>
                </div>
              )}
              <div className="navbar-links">
                {!isOpen && (
                  <>
                    {/* <a href="/dashboard" className="space">
                      Dashboard
                    </a> */}
                    <a href="/guru" className="space">
                      Guru
                    </a>
                    <a href="/siswa" className="space">
                      Murid
                    </a>
                    <a href="/kelas" className="space">
                      Kelas
                    </a>
                    <a href="/mapel" className="space">
                      Mapel
                    </a>
                    {/* <a
                    href="/login"
                    className="space"
                    onClick={isLoggedIn ? handleLogout : handleLogin}
                  >
                    {isLoggedIn ? "Logout" : "Login"}
                  </a> */}
                  </>
                )}
              </div>
              <button
                className="btn-toggle"
                onClick={toggleSidebar}
                aria-expanded={isOpen}
              >
                {isOpen ? "☰" : "≡"}
              </button>
            </nav>
            <div className="container-fluid" style={{ marginTop: "10px" }}>
              {/* Your content goes here */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbarcom;
