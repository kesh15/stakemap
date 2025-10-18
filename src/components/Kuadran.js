export default function Kuadran() {
  const data = {
    keepSatisfied: 5,
    manageClosely: 8,
    monitor: 12,
    keepInformed: 7,
  };

  const labelMapping = {
    keepSatisfied: "Keep Satisfied",
    manageClosely: "Manage Closely",
    monitor: "Monitor",
    keepInformed: "Keep Informed",
  };

  return (
    <div className="h-92 grid grid-cols-2 gap-4 p-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="bg-gray-600 shadow p-4 rounded">
          <h3 className="font-semibold capitalize">
            {labelMapping[key] || key}
          </h3>
          <p className="text-xl">{value}</p>
        </div>
      ))}
    </div>
  );
}
