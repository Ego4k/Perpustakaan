import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/images/logo.png";

const SidebarSiswa = () => {
  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      {/* ================= TOP ================= */}

      <div className="sidebar-top">
        {/* ================= HEADER ================= */}

        <div className="sidebar-header">
          <img
            src={logo}
            alt="logo"
            className="sidebar-logo"
          />

          <h2>
            Perpustakaan
          </h2>

          <p>
            SMA Negeri 1 Prafi
          </p>
        </div>

        {/* ================= MENU ================= */}

        <div className="sidebar-menu">
          <Link to="/siswa">
            Dashboard
          </Link>

          <Link to="/daftar-buku">
            Daftar Buku
          </Link>

          <Link to="/riwayat-saya">
            Riwayat Saya
          </Link>
        </div>
      </div>

      {/* ================= LOGOUT ================= */}

      <div className="logout-wrapper">
        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarSiswa;