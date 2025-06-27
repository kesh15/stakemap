"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MapsView from "@/components/MapsView";
import KomunikasiStrategis from "@/components/KomunikasiStrategis";
import DescriptionIcon from "@mui/icons-material/Description";

export default function AnalisisStakeholderPage() {
  const [activeTab, setActiveTab] = useState("Power-Interest");
  const [isEditable, setIsEditable] = useState(false);

  const project = {
    nama: "Cahaya Literasi",
    alamat: "Jl. Kenanga No. 45 blok B.",
    kelurahan: "Ramaju",
    kecamatan: "Karta",
    kategori: "Sosial",
    stakeholder: "Walikota",
    mulai: "12-10-2025",
    berakhir: "12-12-2025",
  };

  const dataPemerintah = [
    { nama: "Lurah", power: 4.0, interest: 5.0, color: "red" },
    { nama: "Dinas PUPR", power: 3.0, interest: 2.0, color: "yellow" },
    { nama: "Kantor Tanah", power: 1.0, interest: 2.0, color: "green" },
  ];

  const dataMasyarakat = [
    { nama: "Kades Cilegon", power: 4.0, interest: 5.0, color: "red" },
    { nama: "Warga Baru", power: 3.0, interest: 2.0, color: "yellow" },
    { nama: "Warga Kh. Ishak", power: 1.0, interest: 2.0, color: "green" },
  ];

  const handleTabChange = (tab) => setActiveTab(tab);

  const renderStakeholderTable = (data) => (
    <table className="mt-6 w-full border border-gray-700 text-sm">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th className="p-2">No</th>
          <th className="p-2">Nama Stakeholder</th>
          <th className="p-2">Power</th>
          <th className="p-2">Interest</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="text-center border-t">
            <td className="p-2">{idx + 1}</td>
            <td className="p-2">{item.nama}</td>
            <td className="p-2">{item.power}</td>
            <td className="p-2">{item.interest}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderPowerInterestSection = (title, data) => (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="flex space-x-6 bg-gray-100 p-4 rounded">
        {/* Table */}
        <div className="w-1/2">{renderStakeholderTable(data)}</div>

        {/* Quadrant Chart */}
        <div className="w-1/2 flex items-center justify-center">
          {renderQuadrant(data)}
        </div>
      </div>
    </div>
  );

  const renderQuadrant = (data) => (
    <div className="relative w-72 h-72 border bg-white">
      {/* Garis Sumbu */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black"></div>
      <div className="absolute left-1/2 top-0 w-0.5 h-full bg-black"></div>

      {/* Titik-titik stakeholder dengan nama */}
      {data.map((item, idx) => (
        <div
          key={idx}
          className="absolute flex items-center space-x-1"
          style={{
            left: `${item.interest * 15}%`, // Interest → horizontal (X)
            top: `${(5 - item.power) * 15}%`, // Power → vertical (Y)
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            className={`inline-block w-4 h-4 rounded-full ${
              item.color === "red"
                ? "bg-red-500"
                : item.color === "yellow"
                ? "bg-yellow-400"
                : "bg-green-500"
            }`}
            title={item.nama}
          ></span>
          <span className="text-xs">{item.nama}</span>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === "Power-Interest") {
      return (
        <div className="space-y-8">
          {renderPowerInterestSection("Pemerintah", dataPemerintah)}
          {renderPowerInterestSection("Masyarakat", dataMasyarakat)}
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
                <span>Walikota</span>
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
        <div className="mt-4">
          <KomunikasiStrategis />
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 ml-64 bg-white overflow-auto text-black">
        <div className="max-w-screen-xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold mx-4">
            Analisis Stakeholder Mapping
          </h1>

          {/* DATA PROYEK */}
          <div className="space-y-3 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl text-white">
                Analisis Stakeholder Mapping
              </h1>

              <div className="flex gap-2">
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                  onClick={() => setIsEditable(!isEditable)}
                >
                  {isEditable ? "Simpan" : "Ubah Data"}
                </button>
                <button
                  className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                  onClick={() => {
                    alert("Fitur export PDF sedang dikembangkan");
                  }}
                >
                  <DescriptionIcon sx={{ fontSize: 20 }} />
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
                  readOnly={!isEditable}
                  defaultValue={value}
                  className={`border w-full p-2 rounded ${
                    isEditable ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* ==== Garis Pembatas ==== */}
          <div className="border-t-2 border-black-800 my-6 mx-4"></div>

          {/* ==== Section 2: Analisis ==== */}
          <div className="space-y-4">
            {/* MAP */}
            <div>
              <MapsView />
            </div>

            {/* TAB SWITCH */}
            <div className="flex items-center justify-between bg-gray-300 rounded-t-lg px-4 py-2 mx-4">
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

              <button
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                onClick={() => setIsEditable(!isEditable)}
              >
                {isEditable ? "Simpan" : "Ubah Data"}
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="mx-4">{renderTabContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
