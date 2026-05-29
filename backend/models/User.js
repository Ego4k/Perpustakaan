import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      nama: {
        type: String,
        required: true,
      },

      nomorInduk: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,

        enum: [
          "admin",
          "siswa",
        ],

        default:
          "siswa",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "User",
  userSchema
);