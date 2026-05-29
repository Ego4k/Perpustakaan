import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "../styles/auth.css";

const Register = () => {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      nama: "",
      nomorInduk: "",
      password: "",
      role: "siswa",
    });

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

  /* ================= REGISTER ================= */

  const handleRegister =
    async (e) => {
      e.preventDefault();

      try {
        await axios.post(
          "http://localhost:5000/api/auth/register",
          form
        );

        alert(
          "Register berhasil"
        );

        navigate("/");
      } catch (error) {
        alert(
          error.response
            ?.data
            ?.message ||
            "Register gagal"
        );
      }
    };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>
          Register
        </h1>

        <p>
          Daftarkan akun
          anggota
          perpustakaan
        </p>

        {/* ================= FORM ================= */}

        <form
          className="auth-form"
          onSubmit={
            handleRegister
          }
        >
          {/* ================= NAMA ================= */}

          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            onChange={
              handleChange
            }
            required
          />

          {/* ================= ROLE ================= */}

          <select
            name="role"
            value={form.role}
            onChange={
              handleChange
            }
          >
            <option value="siswa">
              Siswa
            </option>

            <option value="admin">
              Admin 
            </option>
          </select>

          {/* ================= NOMOR INDUK ================= */}

          <input
            type="text"
            name="nomorInduk"
            placeholder={
              form.role ===
              "admin"
                ? "NIP"
                : "NIS"
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
            placeholder="Password"
            onChange={
              handleChange
            }
            required
          />

          {/* ================= BUTTON ================= */}

          <button type="submit">
            Register
          </button>
        </form>

        {/* ================= FOOTER ================= */}

        <div className="auth-footer">
          Sudah punya akun?

          <Link to="/">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;