import User from "../models/User.js";

/* ================= GET USER ================= */

export const getUsers =
  async (req, res) => {
    try {
      const users =
        await User.find({
          role: {
            $ne: "admin",
          },
        }).select(
          "-password"
        );

      res.json(users);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ================= HAPUS USER ================= */

export const hapusUser =
  async (req, res) => {
    try {
      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };