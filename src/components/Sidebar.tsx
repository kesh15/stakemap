"use client";

import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import MapIcon from "@mui/icons-material/Map";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Sidebar() {
  const [isStakeholderOpen, setIsStakeholderOpen] = useState(false);

  const toggleStakeholderMenu = () => {
    setIsStakeholderOpen(!isStakeholderOpen);
  };

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-16">Stakemap</h2>
      <ul>
        <li className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-700 px-2 py-2 rounded">
          {/* <img src="/icons/Menu.png" className="w-8 h-8"></img> */}
          <HomeIcon sx={{ fontSize: 28 }} />
          <a href="/dashboard">Dashboard</a>
        </li>
        {/* Daftar Stakeholder dengan submenu */}
        <li className="mb-2">
          <div
            className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-700 px-2 py-2 rounded"
            onClick={toggleStakeholderMenu}
          >
            <PeopleIcon sx={{ fontSize: 24 }} />
            <span>Daftar Stakeholder</span>
            <ExpandMoreIcon
              sx={{
                fontSize: 20,
                transform: isStakeholderOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          {/* Submenu */}
          {isStakeholderOpen && (
            <ul className="ml-8 mt-2 space-y-2">
              <li>
                <a
                  href="/stakeholder/pemerintah"
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Pemerintah
                </a>
              </li>
              {/* <li>
                <a 
                  href="/stakeholder/masyarakat" 
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Masyarakat Terdampak
                </a>
              </li>
              <li>
                <a 
                  href="/stakeholder/media" 
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Media Massa
                </a>
              </li>
              <li>
                <a 
                  href="/stakeholder/organisasi" 
                  className="block hover:bg-gray-700 px-2 py-1 rounded"
                >
                  Organisasi Masyarakat
                </a>
              </li> */}
            </ul>
          )}
        </li>
        <li className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-700 px-2 py-2 rounded">
          <RecentActorsIcon sx={{ fontSize: 28 }} />
          <a href="/proyek">Daftar Proyek</a>
        </li>
        <li className="flex items-center gap-x-2 cursor-pointer hover:bg-gray-700 px-2 py-2 rounded">
          <MapIcon sx={{ fontSize: 28 }} />
          <a href="/wilayah">Pemetaan Wilayah</a>
        </li>
      </ul>
    </aside>
  );
}
