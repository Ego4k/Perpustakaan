import mongoose from "mongoose";

const bookSchema =
  new mongoose.Schema(
    {
      judul: {
        type: String,
        required: true,
      },

      penulis: {
        type: String,
        required: true,
      },

      penerbit: {
        type: String,
        required: true,
      },

      tahun: {
        type: Number,
        required: true,
      },

      kategori: {
        type: String,
        required: true,
      },

      kelas: {
        type: String,
        default: "",
      },

      stok: {
        type: Number,
        required: true,
      },

      gambar: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Book",
  bookSchema
);