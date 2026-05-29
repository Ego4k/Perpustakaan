import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import * as XLSX from "xlsx";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import AdminLayout from "../layout/AdminLayout";

import "../styles/admin.css";

import logo from "../assets/images/logo.png";

const Riwayat = () => {

  const [riwayat, setRiwayat] =
    useState([]);

  const [books, setBooks] =
    useState([]);

  const [bulan, setBulan] =
    useState(
      new Date().getMonth() + 1
    );

  const [tahun, setTahun] =
    useState(
      new Date().getFullYear()
    );

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  /* ================= NAMA BULAN ================= */

  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

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

        setRiwayat(
          res.data
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  /* ================= GET BOOK ================= */

  const getBooks =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/books"
          );

        setBooks(
          res.data
        );

      } catch (error) {

        console.log(
          error
        );
      }
    };

  useEffect(() => {

    getRiwayat();

    getBooks();

  }, []);

  /* ================= FILTER ================= */

  const filteredRiwayat =
    riwayat.filter(
      (item) => {

        const tanggal =
          new Date(
            item.tanggalPinjam
          );

        return (

          tanggal.getMonth() + 1 ===
          Number(bulan)

          &&

          tanggal.getFullYear() ===
          Number(tahun)

        );
      }
    );

  /* ================= TOTAL ================= */

  const totalDipinjam =
    filteredRiwayat.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item.jumlah
        ),
      0
    );

  /* ================= EXPORT EXCEL ================= */

  const exportExcel =
    () => {

      const data =
        filteredRiwayat.map(
          (
            item,
            index
          ) => ({

            No:
              index + 1,

            Nama:
              item.nama,

            Buku:
              item.buku,

            Kelas:
              item.kelas,

            Jumlah:
              item.jumlah,

            Status:
              item.status,

            "Waktu Pinjam":
              formatWaktu(
                item.tanggalPinjam
              ),

            "Waktu Kembali":
              item.tanggalKembali
                ? formatWaktu(
                    item.tanggalKembali
                  )
                : "-",
          })
        );

      const worksheet =
        XLSX.utils.json_to_sheet(
          data
        );

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Laporan"
      );

      XLSX.writeFile(
        workbook,
        `Laporan-${bulan}-${tahun}.xlsx`
      );
    };

  /* ================= EXPORT PDF ================= */

  const exportPDF =
    () => {

      const doc =
        new jsPDF();

      /* ================= LOGO ================= */

      doc.addImage(
        logo,
        "PNG",
        14,
        10,
        20,
        20
      );

      /* ================= HEADER ================= */

      doc.setFontSize(
        16
      );

      doc.text(
        "LAPORAN PERPUSTAKAAN",
        40,
        18
      );

      doc.setFontSize(
        11
      );

      doc.text(
        "SMA Negeri 1 Prafi",
        40,
        26
      );

      /* ================= PERIODE ================= */

      const awalBulan =
        `01 ${namaBulan[bulan - 1]} ${tahun}`;

      const akhirBulan =
        new Date(
          tahun,
          bulan,
          0
        ).getDate();

      doc.text(
        `Periode : ${awalBulan} - ${akhirBulan} ${namaBulan[bulan - 1]} ${tahun}`,
        40,
        32
      );

      doc.line(
        14,
        38,
        195,
        38
      );

      /* ================= TABLE ================= */

      autoTable(doc, {

        startY: 45,

        head: [[
          "No",
          "Nama",
          "Buku",
          "Kelas",
          "Jumlah",
          "Waktu Pinjam",
          "Waktu Kembali",
          "Status",
        ]],

        body:
          filteredRiwayat.map(
            (
              item,
              index
            ) => [

              index + 1,

              item.nama,

              item.buku,

              item.kelas,

              item.jumlah,

              formatWaktu(
                item.tanggalPinjam
              ),

              item.tanggalKembali
                ? formatWaktu(
                    item.tanggalKembali
                  )
                : "-",

              item.status,
            ]
          ),

        styles: {
          fontSize: 8,
        },

        headStyles: {
          fillColor: [
            37,
            99,
            235,
          ],
        },
      });

      /* ================= FOOTER ================= */

      const finalY =
        doc.lastAutoTable.finalY + 20;

      /* ================= TOTAL ================= */

      doc.setFontSize(10);

      doc.text(
        `Total Peminjaman : ${totalDipinjam}`,
        14,
        finalY
      );

      /* ================= TTD ADMIN ================= */

      const pageWidth =
        doc.internal.pageSize.width;

      const rightX =
        pageWidth - 70;

      doc.text(
        "Mengetahui,",
        rightX,
        finalY
      );

      doc.text(
        "Admin Perpustakaan",
        rightX,
        finalY + 8
      );

      /* ================= NAMA ADMIN ================= */

      doc.text(
        `${user?.nama || "Admin"}`,
        rightX,
        finalY + 35
      );

      /* ================= GARIS ================= */

      doc.line(
        rightX,
        finalY + 37,
        rightX + 50,
        finalY + 37
      );

      /* ================= NIP ================= */

      doc.text(
        `NIP : ${user?.nomorInduk || "-"}`,
        rightX,
        finalY + 45
      );

      /* ================= SAVE ================= */

      doc.save(
        `Laporan-${bulan}-${tahun}.pdf`
      );
    };

  /* ================= GENERATE TAHUN ================= */

  const currentYear =
    new Date().getFullYear();

  const tahunOptions =
    [];

  for (
    let i = currentYear - 0;
    i <= currentYear + 5;
    i++
  ) {

    tahunOptions.push(i);
  }

  return (

    <AdminLayout>

      {/* ================= HEADER ================= */}

      <div className="page-header">

        <h1>
          Riwayat
          Peminjaman
        </h1>

        <p>
          Data peminjaman
          siswa.
        </p>

      </div>

      {/* ================= FILTER ================= */}

      <div className="filter-laporan">

        {/* ================= BULAN ================= */}

        <select
          value={bulan}
          onChange={(e) =>
            setBulan(
              e.target.value
            )
          }
        >

          {namaBulan.map(
            (
              nama,
              index
            ) => (

              <option
                key={index}
                value={index + 1}
              >
                {nama}
              </option>
            )
          )}

        </select>

        {/* ================= TAHUN ================= */}

        <select
          value={tahun}
          onChange={(e) =>
            setTahun(
              e.target.value
            )
          }
        >

          {tahunOptions.map(
            (year) => (

              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            )
          )}

        </select>

      </div>

      {/* ================= EXPORT ================= */}

      <div className="export-container">

        <div className="export-buttons">

          <button
            className="export-btn excel-btn"
            onClick={
              exportExcel
            }
          >
            Export Excel
          </button>

          <button
            className="export-btn pdf-btn"
            onClick={
              exportPDF
            }
          >
            Export PDF
          </button>

        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="table-container">

        <table className="riwayat-table">

          <thead>

            <tr>

              <th>No</th>

              <th>Nama</th>

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

            </tr>

          </thead>

          <tbody>

            {filteredRiwayat.length > 0 ? (

              filteredRiwayat.map(
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
                      {item.nama}
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
                      "Dipinjam"
                        ? "-"
                        : formatWaktu(
                            item.tanggalKembali
                          )}

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

                  </tr>
                )
              )

            ) : (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "30px",
                  }}
                >
                  Tidak ada data
                </td>

              </tr>

            )}

          </tbody>

        </table>

        {/* ================= TOTAL ================= */}

        <div className="total-riwayat">

          <h3>
            Total Buku Dipinjam :
            <span>
              {" "}
              {totalDipinjam}
            </span>
          </h3>

        </div>

      </div>

    </AdminLayout>
  );
};

export default Riwayat;