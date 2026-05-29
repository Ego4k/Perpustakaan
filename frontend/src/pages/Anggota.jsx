import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminLayout from "../layout/AdminLayout";

import "../styles/admin.css";

const Anggota = () => {
  const [users, setUsers] =
    useState([]);

  /* ================= GET USERS ================= */

  const getUsers =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/users"
          );

        setUsers(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    getUsers();
  }, []);

  /* ================= HAPUS ================= */

  const hapusUser =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/users/${id}`
        );

        getUsers();
      } catch (error) {
        console.log(
          error
        );
      }
    };

  return (
    <AdminLayout>
      {/* ================= HEADER ================= */}

      <div className="page-header">
        <h1>
          Data Siswa
        </h1>

        <p>
          Daftar siswa yang
          terdaftar sebagai
          anggota perpustakaan.
        </p>
      </div>

      {/* ================= TABLE ================= */}

      <div className="table-container">
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>No</th>

              <th>Nama</th>

              <th>
                NIS 
              </th>

              <th>Role</th>

              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.length >
            0 ? (
              users.map(
                (
                  user,
                  index
                ) => (
                  <tr
                    key={
                      user._id
                    }
                  >
                    {/* ================= NO ================= */}

                    <td>
                      {index +
                        1}
                    </td>

                    {/* ================= NAMA ================= */}

                    <td>
                      {
                        user.nama
                      }
                    </td>

                    {/* ================= NOMOR INDUK ================= */}

                    <td>
                      {user.nomorInduk ||
                        "-"}
                    </td>

                    {/* ================= ROLE ================= */}

                    <td>
                      <span
                        className={
                          user.role ===
                          "admin"
                            ? "status-kembali"
                            : "status-pinjam"
                        }
                      >
                        {
                          user.role
                        }
                      </span>
                    </td>

                    {/* ================= HAPUS ================= */}

                    <td>
                      <button
                        className="hapus-btn"
                        onClick={() =>
                          hapusUser(
                            user._id
                          )
                        }
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign:
                      "center",

                    padding:
                      "20px",

                    color:
                      "#64748b",
                  }}
                >
                  Belum ada data
                  anggota
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Anggota;