import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import SiswaLayout from "../layout/SiswaLayout";

import "../styles/admin.css";

const DaftarBuku = () => {
  const [books, setBooks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [jumlah, setJumlah] =
    useState({});

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* ================= VALIDASI LOGIN ================= */

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, []);

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
          Number(
            jumlah[
            book._id
            ]
          ) || 1;

        /* ================= VALIDASI ================= */

        if (
          total > book.stok
        ) {
          return alert(
            "Jumlah melebihi stok buku"
          );
        }

        if (total < 1) {
          return alert(
            "Jumlah tidak valid"
          );
        }

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

        getBooks();
      } catch (error) {
        console.log(
          error
        );

        alert(
          error.response
            ?.data
            ?.message ||
          "Gagal meminjam buku"
        );
      }
    };

  /* ================= FILTER ================= */

  const filteredBooks =
    books.filter(
      (book) =>
        book.judul
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        book.penulis
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        book.penerbit
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        book.kategori
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        book.tahun
          .toString()
          .includes(search)
    );

  /* ================= GROUPING ================= */

  const bukuUmum =
    filteredBooks.filter(
      (book) =>
        book.kategori ===
        "Umum"
    );

  const buku10 =
    filteredBooks.filter(
      (book) =>
        book.kelas ===
        "10"
    );

  const buku11 =
    filteredBooks.filter(
      (book) =>
        book.kelas ===
        "11"
    );

  const buku12 =
    filteredBooks.filter(
      (book) =>
        book.kelas ===
        "12"
    );

  /* ================= RENDER BOOK ================= */

  const renderBook =
    (book) => (
      <div
        className="book-card"
        key={book._id}
      >
        {/* ================= IMAGE ================= */}

        <img
          src={`http://localhost:5000/uploads/${book.gambar}`}
          alt={book.judul}
          className="book-image"
        />

        {/* ================= CONTENT ================= */}

        <div className="book-content">
          <h2>
            {book.judul}
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
            {book.kelas ||
              "-"}
          </p>

          <p>
            <b>
              Stok:
            </b>{" "}
            {book.stok.toLocaleString()}
          </p>

          {/* ================= STOK HABIS ================= */}

          {book.stok <=
            0 ? (
            <button
              className="stok-habis-btn"
              disabled
              type="button"
            >
              Stok Habis
            </button>
          ) : (
            <>
              {/* ================= INPUT ================= */}

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
                    e
                      .target
                      .value
                  )
                }
                className="jumlah-input"
              />

              {/* ================= BUTTON ================= */}

              <button
                type="button"
                className="pinjam-btn"
                onClick={() =>
                  pinjamBuku(
                    book
                  )
                }
              >
                Pinjam Buku
              </button>
            </>
          )}
        </div>
      </div>
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

      {/* ================= SEARCH ================= */}

      <div className="search-container">
        <input
          type="text"
          placeholder="Cari judul, penulis, penerbit, kategori..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="search-input"
        />
      </div>

      {/* ================= EMPTY ================= */}

      {filteredBooks.length ===
        0 ? (
        <p className="empty-text">
          Buku tidak ditemukan
        </p>
      ) : (
        <>
          {/* ================= BUKU UMUM ================= */}

          {bukuUmum.length >
            0 && (
              <>
                <h2 className="section-title">
                  Buku Umum
                </h2>

                <div className="book-grid">
                  {bukuUmum.map(
                    renderBook
                  )}
                </div>
              </>
            )}

          {/* ================= KELAS 10 ================= */}

          {buku10.length >
            0 && (
              <>
                <h2 className="section-title">
                  Buku Kelas 10
                </h2>

                <div className="book-grid">
                  {buku10.map(
                    renderBook
                  )}
                </div>
              </>
            )}

          {/* ================= KELAS 11 ================= */}

          {buku11.length >
            0 && (
              <>
                <h2 className="section-title">
                  Buku Kelas 11
                </h2>

                <div className="book-grid">
                  {buku11.map(
                    renderBook
                  )}
                </div>
              </>
            )}

          {/* ================= KELAS 12 ================= */}

          {buku12.length >
            0 && (
              <>
                <h2 className="section-title">
                  Buku Kelas 12
                </h2>

                <div className="book-grid">
                  {buku12.map(
                    renderBook
                  )}
                </div>
              </>
            )}
        </>
      )}
    </SiswaLayout>
  );
};

export default DaftarBuku;