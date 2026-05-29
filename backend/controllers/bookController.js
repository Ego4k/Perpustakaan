import Book from "../models/Book.js";

/* ================= GET ================= */

export const getBooks =
  async (req, res) => {
    try {
      const books =
        await Book.find();

      res.json(books);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ================= CREATE ================= */

export const createBook =
  async (req, res) => {
    try {
      const {
        judul,
        penulis,
        penerbit,
        tahun,
        kategori,
        kelas,
        stok,
      } = req.body;

      /* ================= GAMBAR ================= */

      const gambar =
        req.file
          ? req.file.filename
          : "";

      /* ================= CREATE ================= */

      const book =
        await Book.create({
          judul,
          penulis,
          penerbit,
          tahun,
          kategori,
          kelas,
          stok,
          gambar,
        });

      res.status(201).json(
        book
      );
    } catch (error) {
      console.log(
        error
      );

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ================= DELETE ================= */

export const deleteBook =
  async (req, res) => {
    try {
      await Book.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Buku berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ================= UPDATE ================= */

export const updateBook =
  async (req, res) => {
    try {
      const data = {
        judul:
          req.body.judul,

        penulis:
          req.body.penulis,

        penerbit:
          req.body.penerbit,

        tahun:
          req.body.tahun,

        kategori:
          req.body.kategori,

        kelas:
          req.body.kelas,

        stok:
          req.body.stok,
      };

      /* ================= GAMBAR ================= */

      if (req.file) {
        data.gambar =
          req.file.filename;
      }

      const updatedBook =
        await Book.findByIdAndUpdate(
          req.params.id,
          data,
          {
            new: true,
          }
        );

      res.json(
        updatedBook
      );
    } catch (error) {
      console.log(
        error
      );

      res.status(500).json({
        message:
          error.message,
      });
    }
  };