import express from "express";

import {
  pinjamBuku,
  getRiwayat,
  hapusRiwayat,
  kembalikanBuku,
} from "../controllers/transactionController.js";

const router =
  express.Router();

router.post(
  "/",
  pinjamBuku
);

router.get(
  "/",
  getRiwayat
);

router.delete(
  "/:id",
  hapusRiwayat
);

router.put(
  "/kembalikan/:id",
  kembalikanBuku
)

export default router;