import User from "../models/User.js";

import bcrypt from "bcryptjs";

/* ================= REGISTER ================= */

export const register =
  async (req, res) => {
    try {
      const {
        nama,
        nomorInduk,
        password,
        role,
      } = req.body;

      /* ================= CEK USER ================= */

      const userExists =
        await User.findOne({
          nomorInduk,
        });

      if (userExists) {
        return res
          .status(400)
          .json({
            message:
              "Nomor induk sudah digunakan",
          });
      }

      /* ================= HASH ================= */

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      /* ================= CREATE USER ================= */

      const user =
        await User.create({
          nama,
          nomorInduk,
          password:
            hashedPassword,
          role,
        });

      res.status(201).json({
        message:
          "Register berhasil",

        user,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ================= LOGIN ================= */

export const login =
  async (req, res) => {
    try {
      const {
        nomorInduk,
        password,
      } = req.body;

      /* ================= FIND USER ================= */

      const user =
        await User.findOne({
          nomorInduk,
        });

      if (!user) {
        return res
          .status(400)
          .json({
            message:
              "Nomor induk tidak ditemukan",
          });
      }

      /* ================= CHECK PASSWORD ================= */

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            message:
              "Password salah",
          });
      }

      /* ================= SUCCESS ================= */

      res.json({
        _id: user._id,

        nama: user.nama,

        nomorInduk:
          user.nomorInduk,

        role: user.role,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };