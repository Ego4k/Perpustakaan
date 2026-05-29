import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import SiswaLayout from "../layout/SiswaLayout";

import "../styles/admin.css";

const PinjamBuku = () => {
  const [books, setBooks] =
    useState([]);

  const [jumlah, setJumlah] =
    useState({});

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* ================= GET BOOKS ================= */

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

  /* ================= HANDLE JUMLAH ================= */

  const handleJumlah = (
    id,
    value
  ) => {
    setJumlah({
      ...jumlah,
      [id]: value,
    });
  };

  /* ================= PINJAM ================= */

  const pinjamBuku =
    async (book) => {
      try {
        const total =
          jumlah[
            book._id
          ] || 1;

        await axios.post(
          "http://localhost:5000/api/transaksi",
          {
            userId:
              user._id,

            nama:
              user.nama,

            buku:
              book.judul,

            jumlah:
              total,
          }
        );

        alert(
          `Berhasil meminjam ${total} buku`
        );
      } catch (error) {
        console.log(
          error
        );

        alert(
          "Gagal meminjam buku"
        );
      }
    };

  /* ================= FILTER ================= */

  const bukuUmum =
    books.filter(
      (buku) =>
        buku.kelas === "-" ||
        buku.kelas === "Umum"
    );

  return (
    <SiswaLayout>
      {/* ================= HEADER ================= */}

      <div className="page-header">
        <h1>
          Daftar Buku
        </h1>

        <p>
          Cari dan pinjam
          buku perpustakaan.
        </p>
      </div>

      {/* ================= BUKU UMUM ================= */}

      <div className="kategori-section">
        <h2 className="kategori-title">
          Buku Umum
        </h2>

        <div className="book-grid">
          {bukuUmum.map(
            (book) => (
              <div
                className="book-card"
                key={
                  book._id
                }
              >
                {/* ================= IMAGE ================= */}

                <img
                  src={
                    book.gambar
                  }
                  alt={
                    book.judul
                  }
                  className="book-image"
                />

                {/* ================= CONTENT ================= */}

                <div className="book-content">

                  {/* ================= INFO ================= */}

                  <div className="book-info">

                    <h2>
                      {
                        book.judul
                      }
                    </h2>

                    <p>
                      <b>
                        Penulis:
                      </b>{" "}
                      {
                        book.penulis
                      }
                    </p>

                    <p>
                      <b>
                        Penerbit:
                      </b>{" "}
                      {
                        book.penerbit
                      }
                    </p>

                    <p>
                      <b>
                        Tahun Terbit:
                      </b>{" "}
                      {
                        book.tahun
                      }
                    </p>

                    <p>
                      <b>
                        Kategori:
                      </b>{" "}
                      {
                        book.kategori
                      }
                    </p>

                    <p>
                      <b>
                        Kelas:
                      </b>{" "}
                      {
                        book.kelas
                      }
                    </p>

                    <p>
                      <b>
                        Stok:
                      </b>{" "}
                      {
                        book.stok
                      }
                    </p>

                  </div>

                  {/* ================= ACTION ================= */}

                  <div className="book-action">

                    <input
                      type="number"
                      min="1"
                      max={
                        book.stok
                      }
                      value={
                        jumlah[
                          book
                            ._id
                        ] || 1
                      }
                      onChange={(
                        e
                      ) =>
                        handleJumlah(
                          book._id,
                          e.target
                            .value
                        )
                      }
                      className="jumlah-input"
                    />

                    <button
                      className="pinjam-btn"
                      onClick={() =>
                        pinjamBuku(
                          book
                        )
                      }
                    >
                      Pinjam Buku
                    </button>

                  </div>

                </div>
              </div>
            )
          )}
        </div>
      </div>
    </SiswaLayout>
  );
};

export default PinjamBuku;