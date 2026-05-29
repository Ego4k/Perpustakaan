import {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "../styles/auth.css";

/* ================= LOGO ================= */

import logo from "../assets/images/logo.png";

const Login = () => {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      nomorInduk: "",
      password: "",
    });

  /* ================= RESET SESSION ================= */

  useEffect(() => {

    localStorage.removeItem(
      "user"
    );

  }, []);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e
  ) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  /* ================= HANDLE LOGIN ================= */

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/login",
            form
          );

        console.log(
          "LOGIN DATA:",
          res.data
        );

        /* ================= CLEAR OLD SESSION ================= */

        localStorage.clear();

        /* ================= SAVE USER ================= */

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data
          )
        );

        alert(
          "Login berhasil"
        );

        /* ================= REDIRECT ================= */

        if (
          res.data.role ===
          "admin"
        ) {

          window.location.href =
            "/dashboard";

        } else if (
          res.data.role ===
          "siswa"
        ) {

          window.location.href =
            "/siswa";

        } else {

          window.location.href =
            "/";
        }

      } catch (error) {

        console.log(
          error
        );

        alert(
          error.response
            ?.data
            ?.message ||
            "Login gagal"
        );
      }
    };

  return (

    <div className="auth-container">

      <div className="auth-card">

        {/* ================= LOGO ================= */}

        <img
          src={logo}
          alt="Logo"
          className="auth-logo"
        />

        {/* ================= TITLE ================= */}

        <h1>
          Login
        </h1>

        <p className="auth-subtitle">
          Silakan login
          untuk masuk ke
          sistem perpustakaan
        </p>

        {/* ================= FORM ================= */}

        <form
          onSubmit={
            handleLogin
          }
        >

          {/* ================= NOMOR INDUK ================= */}

          <input
            type="text"
            name="nomorInduk"
            placeholder="Masukkan NIS / NIP"
            value={
              form.nomorInduk
            }
            onChange={
              handleChange
            }
            required
          />

          {/* ================= PASSWORD ================= */}

          <input
            type="password"
            name="password"
            placeholder="Masukkan Password"
            value={
              form.password
            }
            onChange={
              handleChange
            }
            required
          />

          {/* ================= BUTTON ================= */}

          <button type="submit">
            Login
          </button>

        </form>

        {/* ================= FOOTER ================= */}

        <div className="auth-footer">

          Belum punya akun?

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;