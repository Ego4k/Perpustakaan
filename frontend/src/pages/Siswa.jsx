import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import SiswaLayout from "../layout/SiswaLayout";

import "../styles/admin.css";

import sekolahImage from "../assets/images/perpus.jpg";

const Siswa = () => {

  /* ================= STATE ================= */

  const [books, setBooks] =
    useState([]);

  /* ================= USER ================= */

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

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

  const kategoriBuku =
    [
      ...new Set(
        books.map(
          (book) =>
            book.kategori
        )
      ),
    ].length;

  return (

    <SiswaLayout>

      <div className="siswa-page">

        {/* ================= HERO ================= */}

        <div className="siswa-hero">

          <div>

            <h1>
              Halo, 
              {user?.nama}
            </h1>

            <p>
              Selamat datang di
              perpustakaan digital
              sekolah.
            </p>

          </div>

        </div>

        {/* ================= BANNER ================= */}

        <div className="dashboard-banner">

          <div>

            <h2>
              Perpustakaan
              Digital 
            </h2>

            <p>
              Temukan buku
              favoritmu,
              pinjam buku
              sekolah,
              dan lihat
              riwayat
              peminjaman
              dengan mudah.
            </p>

          </div>

        </div>

        {/* ================= FEATURE ================= */}

        <div className="feature-grid">

          {/* ================= CARI ================= */}

          <div className="feature-card">

            <h3>
              🔎 Cari Buku
            </h3>

            <p>
              Temukan buku
              favorit dengan
              fitur pencarian
              cepat.
            </p>

          </div>

          {/* ================= PINJAM ================= */}

          <div className="feature-card">

            <h3>
              📖 Pinjam Buku
            </h3>

            <p>
              Pinjam buku
              langsung melalui
              dashboard siswa.
            </p>

          </div>

          {/* ================= RIWAYAT ================= */}

          <div className="feature-card">

            <h3>
              🕘 Riwayat
            </h3>

            <p>
              Lihat riwayat
              peminjaman dan
              pengembalian
              buku.
            </p>

          </div>

        </div>

        {/* ================= STATS ================= */}

        <div className="siswa-stats">

          {/* ================= TOTAL ================= */}

          <div className="stat-card">

            <h2>
              {totalBuku}
            </h2>

            <p>
              Total Buku
            </p>

          </div>

          {/* ================= KATEGORI ================= */}

          <div className="stat-card">

            <h2>
              {kategoriBuku}
            </h2>

            <p>
              Kategori Buku
            </p>

          </div>

          {/* ================= SEKOLAH ================= */}

          <div className="stat-card">

            <h2>
              Digital Library
            </h2>

            <p>
              SMA Negeri 1
              Prafi
            </p>

          </div>

        </div>

        {/* ================= INFO ================= */}

        <div className="info-card">

          {/* ================= LEFT ================= */}

          <div className="info-text">

            <h2>
              📚 Informasi
              Perpustakaan
            </h2>

            <p className="info-desc">

              Perpustakaan
              digital membantu
              siswa mencari
              buku, meminjam
              buku, dan
              mengembalikan
              buku dengan
              lebih cepat
              dan mudah.

            </p>

            {/* ================= LIST ================= */}

            <div className="info-list">

              <div className="info-item">

                Buku pelajaran
                dan buku umum
                tersedia.

              </div>

              <div className="info-item">

                Peminjaman buku
                lebih cepat dan
                praktis.

              </div>

              <div className="info-item">

                Riwayat
                peminjaman dapat
                dipantau langsung.

              </div>

            </div>

            {/* ================= QUOTE ================= */}

            <div className="info-quote">

              Membaca adalah
              jendela ilmu untuk
              masa depan yang
              lebih baik.

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="info-image-wrapper">

            <img
              src={sekolahImage}
              alt="Sekolah"
              className="info-image"
            />

          </div>

        </div>

      </div>

    </SiswaLayout>
  );
};

export default Siswa;