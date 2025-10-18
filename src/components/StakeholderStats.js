import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";

export default function StakeholderStats() {
  const data = {
    Pemerintah: 10,
    Masyarakat: 10,
    OrganisasiMasyarakat: 10,
    Kesehatan: 10,
    Keagamaan: 10,
    MediaMassa: 10,
  };

  const labelMapping = {
    Pemerintah: "Stakeholder Pemerintah",
    Masyarakat: "Stakeholder Masyarakat",
    OrganisasiMasyarakat: "Stakeholder Organisasi Masyarakat",
    Kesehatan: "Stakeholder Kesehatan",
    Keagamaan: "Stakeholder Keagamaan",
    MediaMassa: "Stakeholder Media Massa",
  };

  const unitMapping = {
    Pemerintah: "Stakeholder",
    Masyarakat: "Stakeholder",
    OrganisasiMasyarakat: "Stakeholder",
    Kesehatan: "Stakeholder",
    Keagamaan: "Stakeholder",
    MediaMassa: "Stakeholder",
  };

  const iconMapping = {
    Pemerintah: <PersonIcon style={{ fontSize: 36, color: "white" }} />,
    Masyarakat: <PersonIcon style={{ fontSize: 36, color: "white" }} />,
    OrganisasiMasyarakat: <PersonIcon style={{ fontSize: 36, color: "white" }} />,
    Kesehatan: <PersonIcon style={{ fontSize: 36, color: "white" }} />,
    Keagamaan: <PersonIcon style={{ fontSize: 36, color: "white" }} />,
    MediaMassa: <PersonIcon style={{ fontSize: 36, color: "white" }} />,
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className="flex items-center gap-4 bg-gray-600 text-white p-6.5 rounded-lg shadow"
        >
          <div className="flex-shrink-0">{iconMapping[key]}</div>
          <div>
            <h3 className="text-sm font-medium">{labelMapping[key]}</h3>
            <p className="text-xl font-semibold">
              {value} {unitMapping[key]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
