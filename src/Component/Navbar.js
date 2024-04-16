import React, { useState, useEffect } from "react";
import Logo from "../asset/logo.png"; // Importing the logo image
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserTie,
  faChartSimple,
  faPeopleRoof,
  faPaste,
} from "@fortawesome/free-solid-svg-icons";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

function Navbarcom() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  // const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const toggleSidebar = () => setIsOpen(!isOpen);

  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan keluar dari aplikasi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        window.location.href = "/";
        Swal.fire("Logged out!", "Anda telah berhasil keluar.", "success");
      }
    });
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

    return () => window.removeEventListener("click", closeOnOutsideClick);
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        style={{ position: "fixed", top: "5px", width: "100%", zIndex: 1000 }}
      >
        <div style={{ backgroundColor: isOpen ? "#008DDA" : "" }}>
          <div id="viewport" className={isOpen ? "open" : ""}>
            <div
              id="sidebar"
              style={{
                overflow: "hidden",
                position: "fixed",
                top: 0,
                left: isOpen ? 0 : "-250px",
                transition: "left 0.5s ease",
              }}
            >
              <header
                className="px-4"
                style={{ paddingTop: "8px", paddingBottom: "8px" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={Logo}
                    alt="Logo"
                    width="70"
                    height="60"
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
                <li
                  className={`nav-item ${isActive("/siswa") ? "active" : ""}`}
                >
                  <a
                    href="/siswa"
                    className={`nav-link ${isActive("/siswa") ? "active" : ""}`}
                  >
                    <FontAwesomeIcon icon={faUser} /> Murid
                  </a>
                </li>

                <li className={`nav-item ${isActive("/guru") ? "active" : ""}`}>
                  <a
                    href="/guru"
                    className={`nav-link ${isActive("/guru") ? "active" : ""}`}
                  >
                    <FontAwesomeIcon icon={faUserTie} /> Guru
                  </a>
                </li>
                <li
                  className={`nav-item ${isActive("/kelas") ? "active" : ""}`}
                >
                  <a
                    href="/kelas"
                    className={`nav-link ${isActive("/kelas") ? "active" : ""}`}
                  >
                    <FontAwesomeIcon icon={faPeopleRoof} /> Kelas
                  </a>
                </li>
                <li
                  className={`nav-item ${isActive("/mapel") ? "active" : ""}`}
                >
                  <a
                    href="/mapel"
                    className={`nav-link ${isActive("/mapel") ? "active" : ""}`}
                  >
                    <FontAwesomeIcon icon={faPaste} /> Mapel
                  </a>
                </li>
                {isLoggedIn ? (
                  <li className="nav-item">
                    <a
                      onClick={handleLogout}
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </a>
                  </li>
                ) : (
                  <li
                    className={`nav-item ${isActive("/login") ? "active" : ""}`}
                  >
                    <a href="/login" className="nav-link">
                      Login
                    </a>
                  </li>
                )}
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
                    <a
                      href="/siswa"
                      className={`space ${
                        location.pathname === "/siswa" ? "active" : ""
                      }`}
                    >
                      Murid
                    </a>
                    <a
                      href="/guru"
                      className={`space ${
                        location.pathname === "/guru" ? "active" : ""
                      }`}
                    >
                      Guru
                    </a>
                    <a
                      href="/kelas"
                      className={`space ${
                        location.pathname === "/kelas" ? "active" : ""
                      }`}
                    >
                      Kelas
                    </a>
                    <a
                      href="/mapel"
                      className={`space ${
                        location.pathname === "/mapel" ? "active" : ""
                      }`}
                    >
                      Mapel
                    </a>
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
