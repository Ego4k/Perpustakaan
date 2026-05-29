import mongoose from "mongoose";

const transactionSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema
            .Types.ObjectId,

        ref: "User",
      },

      nama: {
        type: String,

        required: true,
      },

      buku: {
        type: String,

        required: true,
      },

      kelas: {
        type: String,

        default: "-",
      },

      jumlah: {
        type: Number,

        required: true,
      },

      tanggalPinjam: {
        type: Date,

        default: Date.now,
      },

      tanggalKembali: {
        type: Date,
      },

      status: {
        type: String,

        default:
          "Dipinjam",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Transaction",
  transactionSchema
);