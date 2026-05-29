import express from "express";

import {
  getUsers,
  hapusUser,
} from "../controllers/userController.js";

const router =
  express.Router();

/* ================= GET ================= */

router.get(
  "/",
  getUsers
);

/* ================= DELETE ================= */

router.delete(
  "/:id",
  hapusUser
);

export default router;