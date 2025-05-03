import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import MapIcon from '@mui/icons-material/Map';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold mb-16">Stakemap</h2>
      <ul>
        <li className="mb-3 flex items-center gap-x-2">
          {/* <img src="/icons/Menu.png" className="w-8 h-8"></img> */}
          <HomeIcon sx={{ fontSize: 28 }}/>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className="mb-3 flex items-center gap-x-2">
            <PeopleIcon sx={{ fontSize: 28 }}/>
            <a href="/dashboard">Stakeholder</a>
        </li>
        <li className="mb-3 flex items-center gap-x-2">
            <RecentActorsIcon sx={{ fontSize: 28 }}/>
            <a href="/dashboard">Daftar Proyek</a>
        </li>
        <li className="mb-3 flex items-center gap-x-2">
          <MapIcon sx={{ fontSize: 28 }}/>
          <a href="/dashboard">Pemetaan Wilayah</a>
        </li>
      </ul>
    </aside>
  );
}
