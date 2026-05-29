import Transaction from "../models/Transaction.js";

import Book from "../models/Book.js";

/* ================= PINJAM BUKU ================= */

export const pinjamBuku =
  async (req, res) => {

    try {

      const {
        userId,
        nama,
        buku,
        jumlah,
      } = req.body;

      /* ================= CARI BUKU ================= */

      const dataBuku =
        await Book.findOne({
          judul: buku,
        });

      if (!dataBuku) {

        return res
          .status(404)
          .json({
            message:
              "Buku tidak ditemukan",
          });
      }

      /* ================= VALIDASI STOK ================= */

      if (
        dataBuku.stok <
        jumlah
      ) {

        return res
          .status(400)
          .json({
            message:
              "Stok buku tidak cukup",
          });
      }

      /* ================= KURANGI STOK ================= */

      dataBuku.stok -=
        jumlah;

      await dataBuku.save();

      /* ================= SIMPAN TRANSAKSI ================= */

      const transaksi =
        await Transaction.create({

          userId,

          nama,

          buku,

          kelas:
            dataBuku.kelas || "-",

          jumlah,

          tanggalPinjam:
            new Date(),

          status:
            "Dipinjam",
        });

      res.status(201).json(
        transaksi
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ================= GET RIWAYAT ================= */

export const getRiwayat =
  async (req, res) => {

    try {

      const data =
        await Transaction.find().sort(
          {
            createdAt: -1,
          }
        );

      res.json(data);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ================= HAPUS RIWAYAT ================= */

export const hapusRiwayat =
  async (req, res) => {

    try {

      await Transaction.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Riwayat berhasil dihapus",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ================= KEMBALIKAN BUKU ================= */

export const kembalikanBuku =
  async (req, res) => {

    try {

      /* ================= CARI TRANSAKSI ================= */

      const transaksi =
        await Transaction.findById(
          req.params.id
        );

      if (!transaksi) {

        return res
          .status(404)
          .json({
            message:
              "Transaksi tidak ditemukan",
          });
      }

      /* ================= CEK STATUS ================= */

      if (
        transaksi.status ===
        "Dikembalikan"
      ) {

        return res
          .status(400)
          .json({
            message:
              "Buku sudah dikembalikan",
          });
      }

      /* ================= CARI BUKU ================= */

      const buku =
        await Book.findOne({
          judul:
            transaksi.buku,
        });

      if (buku) {

        buku.stok +=
          transaksi.jumlah;

        await buku.save();
      }

      /* ================= UPDATE STATUS ================= */

      transaksi.status =
        "Dikembalikan";

      transaksi.tanggalKembali =
        new Date();

      await transaksi.save();

      res.json({
        message:
          "Buku berhasil dikembalikan",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };