import express from "express";

import multer from "multer";

import {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
} from "../controllers/bookController.js";

const router =
  express.Router();

/* ================= STORAGE ================= */

const storage =
  multer.diskStorage({
    destination:
      function (
        req,
        file,
        cb
      ) {
        cb(
          null,
          "uploads/"
        );
      },

    filename:
      function (
        req,
        file,
        cb
      ) {
        cb(
          null,
          Date.now() +
            "-" +
            file.originalname
        );
      },
  });

const upload =
  multer({
    storage,
  });

/* ================= ROUTES ================= */

router.get(
  "/",
  getBooks
);

/* ================= CREATE ================= */

router.post(
  "/",
  upload.single(
    "image"
  ),
  createBook
);

/* ================= DELETE ================= */

router.delete(
  "/:id",
  deleteBook
);

/* ================= UPDATE ================= */

router.put(
  "/:id",
  upload.single(
    "image"
  ),
  updateBook
);

export default router;