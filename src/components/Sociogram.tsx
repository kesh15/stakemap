"use client";

export default function Sociogram({ data, onDataChange, isEditable }) {
  const handlePositionChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    onDataChange(updatedData);
  };

  return (
    <div className="border bg-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Sociogram</h2>

      <div className="relative w-full h-64 bg-white border">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="absolute flex flex-col items-center"
            style={{
              left: item.left,
              top: item.top,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
              {item.nama.charAt(0)}
            </div>
            <span className="text-xs">{item.nama}</span>
          </div>
        ))}

        {/* Contoh Garis Dummy */}
        <svg className="absolute top-0 left-0 w-full h-full">
          <line x1="50%" y1="20%" x2="25%" y2="70%" stroke="black" />
          <line x1="50%" y1="20%" x2="75%" y2="70%" stroke="black" />
        </svg>
      </div>

      {isEditable && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Edit Posisi Stakeholder:</h3>
          {data.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item.nama}
                onChange={(e) => handlePositionChange(idx, "nama", e.target.value)}
                className="border w-1/4 p-1"
              />
              <input
                type="text"
                value={item.left}
                onChange={(e) => handlePositionChange(idx, "left", e.target.value)}
                className="border w-1/4 p-1"
                placeholder="Left (ex: 50%)"
              />
              <input
                type="text"
                value={item.top}
                onChange={(e) => handlePositionChange(idx, "top", e.target.value)}
                className="border w-1/4 p-1"
                placeholder="Top (ex: 20%)"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
