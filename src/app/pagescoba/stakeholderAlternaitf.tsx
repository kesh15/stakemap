// page alternatif aja

"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MapsView from "@/components/MapsView";

export default function AnalisisStakeholderPage() {
  const [activeTab, setActiveTab] = useState("Power-Interest");

  const project = {
    nama: "Cahaya Literasi",
    alamat: "Jl. Kenanga No. 45 blok B.",
    kelurahan: "Kelurahan Ramaju",
    kecamatan: "Kecamatan Purwakarta",
    kategori: "Sosial",
    stakeholder: "Kantor Tanah, Lurah, Dinas PUPR",
    mulai: "12-10-2024",
    berakhir: "12-12-2024",
  };

  const dataPemerintah = [
    { nama: "Lurah", power: 4.0, interest: 5.0, color: "red" },
    { nama: "Dinas PUPR", power: 3.0, interest: 2.5, color: "yellow" },
    { nama: "Kantor Tanah", power: 3.0, interest: 3.0, color: "green" },
  ];

  const dataMasyarakat = [
    { nama: "Kepala Desa Cilegon", power: 4.0, interest: 5.0, color: "red" },
    { nama: "Warga Kota Baru", power: 3.0, interest: 2.5, color: "yellow" },
    { nama: "Warga Kh. Ishak", power: 3.0, interest: 3.0, color: "green" },
  ];

  const handleTabChange = (tab) => setActiveTab(tab);

  const renderStakeholderTable = (data) => (
    <table className="w-full text-left border-collapse mb-4">
      <thead>
        <tr className="bg-gray-300">
          <th className="p-2">Nama Stakeholder</th>
          <th className="p-2">Nilai Power</th>
          <th className="p-2">Nilai Interest</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="border-b">
            <td className="p-2">{item.nama}</td>
            <td className="p-2">{item.power}</td>
            <td className="p-2">{item.interest}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderQuadrant = (data) => (
    <div className="grid grid-cols-2 grid-rows-2 border w-60 h-60 relative">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="absolute"
          style={{
            left: `${item.interest * 10}%`,
            top: `${(5 - item.power) * 10}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              item.color === "red"
                ? "bg-red-500"
                : item.color === "yellow"
                ? "bg-yellow-400"
                : "bg-green-500"
            }`}
            title={item.nama}
          ></span>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === "Power-Interest") {
      return (
        <div className="space-y-8">
          <h2 className="text-lg font-semibold mb-2">Pemerintah</h2>
          {renderStakeholderTable(dataPemerintah)}
          {renderQuadrant(dataPemerintah)}

          <h2 className="text-lg font-semibold mt-6 mb-2">Masyarakat</h2>
          {renderStakeholderTable(dataMasyarakat)}
          {renderQuadrant(dataMasyarakat)}
        </div>
      );
    } else if (activeTab === "Sociogram") {
      return (
        <div className="border bg-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">Pemerintah</h2>
          <div className="relative w-full h-64 bg-white border">
            {/* Dummy Sociogram */}
            <div className="absolute left-1/2 top-4 transform -translate-x-1/2">
              <div className="flex flex-col items-center">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                  L
                </div>
                <span>Lurah</span>
              </div>
            </div>
            <div className="absolute left-1/4 top-36 transform -translate-x-1/2">
              <div className="flex flex-col items-center">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                  K
                </div>
                <span>Kantor Tanah</span>
              </div>
            </div>
            <div className="absolute right-1/4 top-36 transform translate-x-1/2">
              <div className="flex flex-col items-center">
                <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                  D
                </div>
                <span>Dinas PUPR</span>
              </div>
            </div>
            {/* Garis koneksi */}
            <svg className="absolute top-0 left-0 w-full h-full">
              <line x1="50%" y1="20%" x2="25%" y2="70%" stroke="black" />
              <line x1="50%" y1="20%" x2="75%" y2="70%" stroke="black" />
            </svg>
          </div>
        </div>
      );
    } else if (activeTab === "Komunikasi Strategis") {
      return (
        <div className="p-6 bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Strategi Komunikasi</h2>
          <p>
            [Isi strategi komunikasi spesifik per stakeholder bisa kamu render
            di sini]
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 ml-64 bg-white overflow-auto text-black">
        <div className="max-w-screen-xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Analisis Stakeholder Mapping</h1>

          {/* DATA PROYEK */}
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl text-white">
                Analisis Stakeholder Mapping
              </h1>

              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => {
                    // Placeholder navigasi ke halaman ubah data
                    alert("Navigasi ke halaman ubah data proyek");
                  }}
                >
                  Ubah Data
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  onClick={() => {
                    // Placeholder untuk export PDF
                    alert("Fitur export PDF sedang dikembangkan");
                  }}
                >
                  Cetak sebagai PDF
                </button>
              </div>
            </div>

            {Object.entries(project).map(([label, value], idx) => (
              <div key={idx} className="flex items-center">
                <label className="w-1/4 capitalize">
                  {label.replace(/_/g, " ")}
                </label>
                <input
                  type="text"
                  readOnly
                  value={value}
                  className="border w-full p-2 rounded bg-gray-100"
                />
              </div>
            ))}
          </div>

          {/* ===== Garis Pembatas Section ===== */}
          <div className="border-t border-gray-400 my-6"></div>

          {/* MAP */}
          <div className="mt-4">
            <MapsView />
          </div>

          {/* TAB SWITCH HEADER */}
          <div className="flex items-center justify-between bg-gray-300 rounded-t-lg px-4 py-2">
            {/* Tab List */}
            <div className="flex space-x-2">
              {["Power-Interest", "Sociogram", "Komunikasi Strategis"].map(
                (tab, index) => {
                  const isActive = activeTab === tab;
                  const isFirst = index === 0;
                  const isLast = index === 2;

                  return (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`
                      px-4 py-2 font-semibold transition
                      ${
                        isActive
                          ? "bg-black text-white"
                          : "bg-gray-200 text-black"
                      }
                      ${isFirst ? "rounded-tl-lg" : ""}
                      ${isLast ? "rounded-tr-lg" : ""}
                    `}
                    >
                      {tab}
                    </button>
                  );
                }
              )}
            </div>

            {/* Ubah Data Button */}
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              onClick={() => setIsEditable(!isEditable)}
            >
              Ubah Data
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="mt-4">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
}
