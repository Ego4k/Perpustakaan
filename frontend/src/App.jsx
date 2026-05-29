import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ================= PAGES ================= */

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import KelolaBuku from "./pages/KelolaBuku";

import Riwayat from "./pages/Riwayat";

import Siswa from "./pages/Siswa";

import DaftarBuku from "./pages/DaftarBuku";

import RiwayatSaya from "./pages/RiwayatSaya";

import Anggota from "./pages/Anggota";

function App() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= AUTH ================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/dashboard"
          element={
            user?.role ===
            "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/kelola-buku"
          element={
            user?.role ===
            "admin" ? (
              <KelolaBuku />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/riwayat"
          element={
            user?.role ===
            "admin" ? (
              <Riwayat />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/anggota"
          element={
            user?.role ===
            "admin" ? (
              <Anggota />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ================= SISWA ================= */}

        <Route
          path="/siswa"
          element={
            user?.role ===
            "siswa" ? (
              <Siswa />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/daftar-buku"
          element={
            user?.role ===
            "siswa" ? (
              <DaftarBuku />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/riwayat-saya"
          element={
            user?.role ===
            "siswa" ? (
              <RiwayatSaya />
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;