"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MapsViewStakeholder from "@/components/MapsViewStakeholder";
import PowerInterest from "@/components/PowerInterest";
import Sociogram from "@/components/Sociogram";
import KomunikasiStrategis from "@/components/KomunikasiStrategis";
import DescriptionIcon from "@mui/icons-material/Description";

export default function AnalisisStakeholderPage() {
  const [activeTab, setActiveTab] = useState("Power-Interest");
  const [isEditable, setIsEditable] = useState(false);

  const [project, setProject] = useState({
    nama: "Cahaya Literasi",
    alamat: "Jl. Kenanga No. 45 blok B.",
    kelurahan: "Ramaju",
    kecamatan: "Karta",
    kategori: "Sosial",
    stakeholder: ["Pemerintah", "Masyarakat"],
    mulai: "2025-10-12",
    berakhir: "2025-12-12",
  });

  const stakeholderOptions = [
    "Pemerintah",
    "Masyarakat",
    "Media Massa",
    "Organisasi Masyarakat",
  ];

  const kategoriOptions = [
    "Sosial",
    "Teknologi",
    "Pendidikan",
  ];

  const [dataPemerintah, setDataPemerintah] = useState([
    { nama: "Lurah", power: 4, interest: 5, color: "red" },
    { nama: "Dinas PUPR", power: 3, interest: 2, color: "yellow" },
    { nama: "Kantor Tanah", power: 1, interest: 2, color: "green" },
  ]);

  const [dataMasyarakat, setDataMasyarakat] = useState([
    { nama: "Kades Cilegon", power: 4, interest: 5, color: "red" },
    { nama: "Warga Baru", power: 3, interest: 2, color: "yellow" },
    { nama: "Warga Kh. Ishak", power: 1, interest: 2, color: "green" },
  ]);

  const [dataSociogram, setDataSociogram] = useState([
    { nama: "Walikota", left: "50%", top: "20%" },
    { nama: "Kantor Tanah", left: "25%", top: "70%" },
    { nama: "Dinas PUPR", left: "75%", top: "70%" },
  ]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleCheckboxChange = (value) => {
    const updated = project.stakeholder.includes(value)
      ? project.stakeholder.filter((item) => item !== value)
      : [...project.stakeholder, value];
    setProject({ ...project, stakeholder: updated });
  };

  const renderTabContent = () => {
    if (activeTab === "Power-Interest") {
      return (
        <>
          <PowerInterest
            title="Pemerintah"
            data={dataPemerintah}
            onDataChange={setDataPemerintah}
            isEditable={isEditable}
          />
          <PowerInterest
            title="Masyarakat"
            data={dataMasyarakat}
            onDataChange={setDataMasyarakat}
            isEditable={isEditable}
          />
        </>
      );
    } else if (activeTab === "Sociogram") {
      return (
        <Sociogram
          data={dataSociogram}
          onDataChange={setDataSociogram}
          isEditable={isEditable}
        />
      );
    } else if (activeTab === "Komunikasi Strategis") {
      return <KomunikasiStrategis isEditable={isEditable} />;
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

          {/* === FORM PROYEK === */}
          <div className="space-y-4 mx-4">
            {/* Header Button */}
            <div className="flex justify-between items-center">
              <div></div>
              <div className="flex gap-2">
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                  onClick={() => setIsEditable(!isEditable)}
                >
                  {isEditable ? "Simpan" : "Ubah Data"}
                </button>
                <button
                  className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                  onClick={() => alert("Fitur export PDF sedang dikembangkan")}
                >
                  <DescriptionIcon sx={{ fontSize: 20 }} />
                  Cetak sebagai PDF
                </button>
              </div>
            </div>

            {/* Input Text + Dropdown */}
            {["nama", "alamat", "kelurahan", "kecamatan", "kategori"].map(
              (field) => (
                <div key={field} className="flex items-center">
                  <label className="w-1/4 capitalize">
                    {field === "nama"
                      ? "Nama Proyek"
                      : field === "alamat"
                      ? "Alamat Proyek"
                      : field === "kategori"
                      ? "Kategori Proyek"
                      : field.charAt(0).toUpperCase() + field.slice(1) + " Proyek"}
                  </label>

                  {field === "kategori" ? (
                    <select
                      disabled={!isEditable}
                      value={project.kategori}
                      onChange={(e) =>
                        setProject({ ...project, kategori: e.target.value })
                      }
                      className={`border w-full p-2 rounded ${
                        isEditable ? "bg-white" : "bg-gray-100"
                      }`}
                    >
                      {kategoriOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      readOnly={!isEditable}
                      value={project[field]}
                      onChange={(e) =>
                        setProject({ ...project, [field]: e.target.value })
                      }
                      className={`border w-full p-2 rounded ${
                        isEditable ? "bg-white" : "bg-gray-100"
                      }`}
                    />
                  )}
                </div>
              )
            )}

            {/* Checkbox Stakeholder */}
            <div className="flex items-start">
              <label className="w-60">Stakeholder Terlibat</label>
              <div className="flex flex-wrap gap-6">
                {stakeholderOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      disabled={!isEditable}
                      checked={project.stakeholder.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-5 h-5"
                    />
                    <span className="text-base">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Input Date */}
            {["mulai", "berakhir"].map((field) => (
              <div key={field} className="flex items-center">
                <label className="w-1/4">
                  {field === "mulai" ? "Mulai Proyek" : "Berakhir Proyek"}
                </label>
                <input
                  type="date"
                  readOnly={!isEditable}
                  value={project[field]}
                  onChange={(e) =>
                    setProject({ ...project, [field]: e.target.value })
                  }
                  className={`border w-full p-2 rounded ${
                    isEditable ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* === GARIS PEMBATAS === */}
          <div className="border-t-2 border-black my-6 mx-4"></div>

          {/* === SECTION 2 === */}
          <div className="space-y-4">
            <div>
              <MapsViewStakeholder/>
            </div>

            {/* Tab Switch */}
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
                        className={`px-4 py-2 font-semibold transition ${
                          isActive
                            ? "bg-black text-white"
                            : "bg-gray-200 text-black"
                        } ${isFirst ? "rounded-tl-lg" : ""} ${
                          isLast ? "rounded-tr-lg" : ""
                        }`}
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

            <div className="mx-4">{renderTabContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
