import User from "../models/User.js";
import Book from "../models/Book.js";
import Borrow from "../models/Borrow.js";

export const getDashboard = async (
  req,
  res
) => {
  try {

    const totalBooks =
      await Book.countDocuments();

    const totalUsers =
      await User.countDocuments({
        role: "siswa",
      });

    const borrowedBooks =
      await Borrow.countDocuments({
        status: "Dipinjam",
      });

    const history = await Borrow.find()
      .populate("user")
      .populate("book")
      .sort({
        createdAt: -1,
      });

    const users = await User.find({
      role: "siswa",
    });

    res.json({
      totalBooks,
      totalUsers,
      borrowedBooks,
      history,
      users,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};