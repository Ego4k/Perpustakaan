import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminLayout from "../layout/AdminLayout";

import "../styles/admin.css";

/* ================= IMAGE ================= */

import sekolah from "../assets/images/perpus.jpg";

const Dashboard = () => {
  const [books, setBooks] =
    useState([]);

  /* ================= GET BOOK ================= */

  const getBooks =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/books"
          );

        setBooks(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    getBooks();
  }, []);

  /* ================= TOTAL ================= */

  const totalBuku =
    books.length;

  const totalKategori =
    [
      ...new Set(
        books.map(
          (b) =>
            b?.kategori
        )
      ),
    ].length;

  const totalStok =
    books.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item.stok
        ),
      0
    );

  return (
    <AdminLayout>
      {/* ================= HEADER ================= */}

      <div className="page-header">
        <h1>
          Dashboard
          Admin
        </h1>

        <p>
          Sistem Informasi
          Perpustakaan
          SMA Negeri 1
          Prafi
        </p>
      </div>

      {/* ================= CARD ================= */}

      <div className="dashboard-cards">
        {/* ================= TOTAL BUKU ================= */}

        <div className="dashboard-card">
          <h2>
            {totalBuku}
          </h2>

          <p>
            Total Buku
          </p>
        </div>

        {/* ================= TOTAL KATEGORI ================= */}

        <div className="dashboard-card">
          <h2>
            {
              totalKategori
            }
          </h2>

          <p>
            Total
            Kategori
          </p>
        </div>

        {/* ================= TOTAL STOK ================= */}

        <div className="dashboard-card">
          <h2>
            {totalStok}
          </h2>

          <p>
            Total Stok
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="dashboard-content">
        {/* ================= LEFT ================= */}

        <div className="dashboard-left">
          <div className="info-card">
            <h2>
              Tentang
              Sistem Informasi
              Perpustakaan SMA
              Negeri 1 Prafi.
            </h2>

            <p>
              Perpustakaan digital
              SMA Negeri 1 Prafi
              membantu pengelolaan buku,
              peminjaman, dan laporan
              perpustakaan secara cepat,
              modern, dan efisien.
            </p>

            <img
              src={
                sekolah
              }
              alt="Sekolah"
              className="dashboard-image"
            />
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="dashboard-right">
          
          {/* ================= FITUR ================= */}

          <div className="mini-card">
            <h3>
              Fitur
              Admin
            </h3>

            <ul>
              <li>
                Kelola
                Buku
              </li>

              <li>
                Kelola
                Anggota
              </li>

              <li>
                Riwayat
                Peminjaman
              </li>

              <li>
                Export
                PDF &
                Excel
              </li>

              <li>
                Edit
                Stok Buku
              </li>
            </ul>
          </div>

          {/* ================= INFORMASI ================= */}

          <div className="mini-card">
            <h3>
              Informasi
            </h3>

            <p>
              Dashboard
              admin
              digunakan
              untuk
              memantau
              data buku,
              anggota,
              peminjaman,
              pengembalian,
              serta laporan
              perpustakaan
              sekolah
              secara
              realtime.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;