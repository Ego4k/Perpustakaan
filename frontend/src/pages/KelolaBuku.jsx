import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminLayout from "../layout/AdminLayout";

import "../styles/admin.css";

const KelolaBuku = () => {

  /* ================= STATE ================= */

  const [books, setBooks] =
    useState([]);

  const [gambar, setGambar] =
    useState(null);

  const [editId, setEditId] =
    useState(null);

  /* ================= FORM TAMBAH ================= */

  const [form, setForm] =
    useState({
      judul: "",
      penulis: "",
      penerbit: "",
      tahun: "",
      kategori: "",
      kelas: "",
      stok: "",
    });

  /* ================= FORM EDIT ================= */

  const [editForm, setEditForm] =
    useState({
      judul: "",
      penulis: "",
      penerbit: "",
      tahun: "",
      kategori: "",
      kelas: "",
      stok: "",
    });

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

  /* ================= HANDLE INPUT ================= */

  const handleChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;

      if (
        name === "kategori" &&
        value === "Umum"
      ) {

        setForm({
          ...form,
          kategori: value,
          kelas: "-",
        });

        return;
      }

      setForm({
        ...form,
        [name]: value,
      });
    };

  /* ================= HANDLE GAMBAR ================= */

  const handleImage =
    (e) => {

      setGambar(
        e.target.files[0]
      );
    };

  /* ================= TAMBAH BUKU ================= */

  const tambahBuku =
    async (e) => {

      e.preventDefault();

      try {

        const formData =
          new FormData();

        formData.append(
          "judul",
          form.judul
        );

        formData.append(
          "penulis",
          form.penulis
        );

        formData.append(
          "penerbit",
          form.penerbit
        );

        formData.append(
          "tahun",
          form.tahun
        );

        formData.append(
          "kategori",
          form.kategori
        );

        formData.append(
          "kelas",
          form.kelas
        );

        formData.append(
          "stok",
          form.stok
        );

        formData.append(
          "image",
          gambar
        );

        await axios.post(
          "http://localhost:5000/api/books",
          formData
        );

        alert(
          "Buku berhasil ditambahkan"
        );

        getBooks();

        setForm({
          judul: "",
          penulis: "",
          penerbit: "",
          tahun: "",
          kategori: "",
          kelas: "",
          stok: "",
        });

        setGambar(null);

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Gagal menambahkan buku"
        );
      }
    };

  /* ================= HAPUS BUKU ================= */

  const hapusBuku =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/books/${id}`
        );

        getBooks();

      } catch (error) {

        console.log(
          error
        );
      }
    };

  /* ================= EDIT ================= */

  const handleEdit =
    (book) => {

      setEditId(
        book._id
      );

      setEditForm({
        judul:
          book.judul,

        penulis:
          book.penulis,

        penerbit:
          book.penerbit,

        tahun:
          book.tahun,

        kategori:
          book.kategori,

        kelas:
          book.kelas || "",

        stok:
          book.stok,
      });
    };

  /* ================= UPDATE ================= */

  const handleUpdate =
    async (id) => {

      try {

        const formData =
          new FormData();

        formData.append(
          "judul",
          editForm.judul
        );

        formData.append(
          "penulis",
          editForm.penulis
        );

        formData.append(
          "penerbit",
          editForm.penerbit
        );

        formData.append(
          "tahun",
          editForm.tahun
        );

        formData.append(
          "kategori",
          editForm.kategori
        );

        formData.append(
          "kelas",
          editForm.kelas
        );

        formData.append(
          "stok",
          editForm.stok
        );

        /* ================= UPDATE IMAGE ================= */

        if (gambar) {

          formData.append(
            "image",
            gambar
          );
        }

        await axios.put(
          `http://localhost:5000/api/books/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Buku berhasil diperbarui"
        );

        setEditId(null);

        setGambar(null);

        getBooks();

      } catch (error) {

        console.log(
          error
        );

        alert(
          "Gagal update buku"
        );
      }
    };

  return (

    <AdminLayout>

      {/* ================= HEADER ================= */}

      <div className="page-header">

        <h1>
          Kelola Buku
        </h1>

        <p>
          Tambah dan kelola
          buku perpustakaan.
        </p>

      </div>

      {/* ================= FORM ================= */}

      <form
        className="form-container"
        onSubmit={
          tambahBuku
        }
      >

        <input
          type="text"
          name="judul"
          placeholder="Judul Buku"
          value={
            form.judul
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="text"
          name="penulis"
          placeholder="Penulis"
          value={
            form.penulis
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="text"
          name="penerbit"
          placeholder="Penerbit"
          value={
            form.penerbit
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="number"
          name="tahun"
          placeholder="Tahun Terbit"
          value={
            form.tahun
          }
          onChange={
            handleChange
          }
          required
        />

        {/* ================= KATEGORI ================= */}

        <select
          name="kategori"
          value={
            form.kategori
          }
          onChange={
            handleChange
          }
          required
        >

          <option value="">
            Pilih Kategori
          </option>

          <option value="Umum">
            Umum
          </option>

          <option value="Pelajaran">
            Pelajaran
          </option>

        </select>

        {/* ================= KELAS ================= */}

        <select
          name="kelas"
          value={
            form.kelas
          }
          onChange={
            handleChange
          }
          disabled={
            form.kategori ===
            "Umum"
          }
        >

          <option value="">
            -
          </option>

          <option value="10">
            10
          </option>

          <option value="11">
            11
          </option>

          <option value="12">
            12
          </option>

        </select>

        {/* ================= STOK ================= */}

        <input
          type="number"
          name="stok"
          placeholder="Stok"
          value={
            form.stok
          }
          onChange={
            handleChange
          }
          required
        />

        {/* ================= GAMBAR ================= */}

        <input
          type="file"
          onChange={
            handleImage
          }
          required
        />

        {/* ================= BUTTON ================= */}

        <button type="submit">
          Tambah Buku
        </button>

      </form>

      {/* ================= GRID ================= */}

      <div className="book-grid">

        {books.map((book) => (

          <div
            className="book-card"
            key={book._id}
          >

            {/* ================= IMAGE ================= */}

            <img
              src={`http://localhost:5000/uploads/${book.gambar}`}
              alt={
                book.judul
              }
              className="book-image"
            />

            {/* ================= CONTENT ================= */}

            <div className="book-content">

              {/* ================= JUDUL ================= */}

              {editId ===
              book._id ? (

                <input
                  type="text"
                  value={
                    editForm.judul
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      judul:
                        e.target.value,
                    })
                  }
                />

              ) : (

                <h2>
                  {book.judul}
                </h2>

              )}

              {/* ================= PENULIS ================= */}

              {editId ===
              book._id ? (

                <input
                  type="text"
                  value={
                    editForm.penulis
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      penulis:
                        e.target.value,
                    })
                  }
                />

              ) : (

                <p>
                  <b>
                    Penulis:
                  </b>{" "}
                  {book.penulis}
                </p>

              )}

              {/* ================= PENERBIT ================= */}

              {editId ===
              book._id ? (

                <input
                  type="text"
                  value={
                    editForm.penerbit
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      penerbit:
                        e.target.value,
                    })
                  }
                />

              ) : (

                <p>
                  <b>
                    Penerbit:
                  </b>{" "}
                  {book.penerbit}
                </p>

              )}

              {/* ================= TAHUN ================= */}

              {editId ===
              book._id ? (

                <input
                  type="number"
                  value={
                    editForm.tahun
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      tahun:
                        e.target.value,
                    })
                  }
                />

              ) : (

                <p>
                  <b>
                    Tahun Terbit:
                  </b>{" "}
                  {book.tahun}
                </p>

              )}

              {/* ================= KATEGORI ================= */}

              {editId ===
              book._id ? (

                <select
                  value={
                    editForm.kategori
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      kategori:
                        e.target.value,
                    })
                  }
                >

                  <option value="Umum">
                    Umum
                  </option>

                  <option value="Pelajaran">
                    Pelajaran
                  </option>

                </select>

              ) : (

                <p>
                  <b>
                    Kategori:
                  </b>{" "}
                  {book.kategori}
                </p>

              )}

              {/* ================= KELAS ================= */}

              {editId ===
              book._id ? (

                <select
                  value={
                    editForm.kelas
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      kelas:
                        e.target.value,
                    })
                  }
                >

                  <option value="">
                    -
                  </option>

                  <option value="10">
                    10
                  </option>

                  <option value="11">
                    11
                  </option>

                  <option value="12">
                    12
                  </option>

                </select>

              ) : (

                <p>
                  <b>
                    Kelas:
                  </b>{" "}
                  {book.kelas ||
                    "-"}
                </p>

              )}

              {/* ================= STOK ================= */}

              {editId ===
              book._id ? (

                <input
                  type="number"
                  value={
                    editForm.stok
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      stok:
                        e.target.value,
                    })
                  }
                />

              ) : (

                <p>
                  <b>
                    Stok:
                  </b>{" "}
                  {book.stok}
                </p>

              )}

              {/* ================= EDIT GAMBAR ================= */}

              {editId ===
              book._id && (

                <input
                  type="file"
                  accept="image/*"
                  className="edit-image-input"
                  onChange={(e) =>
                    setGambar(
                      e.target.files[0]
                    )
                  }
                />

              )}

              {/* ================= BUTTON ================= */}

              <div className="book-actions">

                {editId ===
                book._id ? (

                  <button
                    type="button"
                    className="save-btn"
                    onClick={() =>
                      handleUpdate(
                        book._id
                      )
                    }
                  >
                    Simpan
                  </button>

                ) : (

                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(
                        book
                      )
                    }
                  >
                    Edit
                  </button>

                )}

                {editId ===
                book._id ? (

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => {

                      setEditId(
                        null
                      );

                      setGambar(
                        null
                      );
                    }}
                  >
                    Batal
                  </button>

                ) : (

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      hapusBuku(
                        book._id
                      )
                    }
                  >
                    Hapus
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </AdminLayout>
  );
};

export default KelolaBuku;