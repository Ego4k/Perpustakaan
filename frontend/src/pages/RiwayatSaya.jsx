import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import SiswaLayout from "../layout/SiswaLayout";

import "../styles/admin.css";

const RiwayatSaya = () => {

  const [riwayat, setRiwayat] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* ================= FORMAT WAKTU ================= */

  const formatWaktu = (
    tanggal
  ) => {

    if (!tanggal)
      return "-";

    return new Date(
      tanggal
    ).toLocaleString(
      "id-ID",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  /* ================= GET RIWAYAT ================= */

  const getRiwayat =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/transaksi"
          );

        const dataSaya =
          res.data.filter(
            (item) =>
              item.userId ===
              user._id
          );

        setRiwayat(
          dataSaya
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  useEffect(() => {

    getRiwayat();

  }, []);

  /* ================= KEMBALIKAN ================= */

  const kembalikanBuku =
    async (id) => {

      try {

        await axios.put(
          `http://localhost:5000/api/transaksi/kembalikan/${id}`
        );

        alert(
          "Buku berhasil dikembalikan"
        );

        getRiwayat();

      } catch (error) {

        console.log(
          error
        );
      }
    };

  return (

    <SiswaLayout>

      <div className="page-header">

        <h1>
          Riwayat Saya
        </h1>

        <p>
          Riwayat peminjaman
          dan pengembalian buku.
        </p>

      </div>

      <div className="table-container">

        <table className="riwayat-table">

          <thead>

            <tr>

              <th>No</th>

              <th>Buku</th>

              <th>Kelas</th>

              <th>Jumlah</th>

              <th>
                Waktu
                Pinjam
              </th>

              <th>
                Waktu
                Kembali
              </th>

              <th>Status</th>

              <th>Aksi</th>

            </tr>

          </thead>

          <tbody>

            {riwayat.length > 0 ? (

              riwayat.map(
                (
                  item,
                  index
                ) => (

                  <tr
                    key={
                      item._id
                    }
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.buku}
                    </td>

                    <td>
                      {item.kelas}
                    </td>

                    <td>
                      {item.jumlah}
                    </td>

                    <td>
                      {formatWaktu(
                        item.tanggalPinjam
                      )}
                    </td>

                    <td>

                      {item.status ===
                      "Dikembalikan"
                        ? formatWaktu(
                            item.tanggalKembali
                          )
                        : "-"}

                    </td>

                    <td>

                      <span
                        className={
                          item.status ===
                          "Dipinjam"
                            ? "status-pinjam"
                            : "status-kembali"
                        }
                      >

                        {item.status}

                      </span>

                    </td>

                    <td>

                      {item.status ===
                      "Dipinjam" ? (

                        <button
                          className="edit-btn"
                          onClick={() =>
                            kembalikanBuku(
                              item._id
                            )
                          }
                        >
                          Kembalikan
                        </button>

                      ) : (

                        <span
                          style={{
                            color:
                              "#64748b",
                            fontWeight:
                              "600",
                          }}
                        >
                          Selesai
                        </span>

                      )}

                    </td>

                  </tr>
                )
              )

            ) : (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "20px",
                  }}
                >
                  Belum ada
                  riwayat
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </SiswaLayout>
  );
};

export default RiwayatSaya;