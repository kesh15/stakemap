"use client";

export default function PowerInterest({ title, data, onDataChange, isEditable }) {
  const handleInputChange = (index, field, value) => {
    let newValue = parseFloat(value);

    // Validasi khusus untuk power dan interest
    if (field === "power" || field === "interest") {
      if (isNaN(newValue)) newValue = 0;
      newValue = Math.max(0, Math.min(5, newValue));
      newValue = Math.round(newValue * 2) / 2; // Bulatkan ke 0.5
    }

    const updatedData = [...data];
    updatedData[index][field] =
      field === "power" || field === "interest" ? newValue : value;
    onDataChange(updatedData);
  };

  const handleAddStakeholder = () => {
    const updatedData = [
      ...data,
      { nama: "", power: 0, interest: 0, color: "green" },
    ];
    onDataChange(updatedData);
  };

  const handleDeleteStakeholder = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    onDataChange(updatedData);
  };

  const renderQuadrant = () => (
    <div className="relative w-72 h-72 border bg-white">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black"></div>
      <div className="absolute left-1/2 top-0 w-0.5 h-full bg-black"></div>

      {data.map((item, idx) => {
        const left = Math.min(item.interest * 15, 95);
        const top = Math.min((5 - item.power) * 15, 95);

        return (
          <div
            key={idx}
            className="absolute flex items-center space-x-1"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, 50%)",
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
            ></span>
            <span className="text-xs">{item.nama}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex space-x-6 bg-gray-100 p-4 rounded">
        <table className="w-1/2 border text-sm">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Power</th>
              <th>Interest</th>
              {isEditable && <th>Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-t text-center">
                <td>{idx + 1}</td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.nama}
                      onChange={(e) =>
                        handleInputChange(idx, "nama", e.target.value)
                      }
                      className="w-full border rounded p-1"
                    />
                  ) : (
                    item.nama
                  )}
                </td>
                <td>
                  {isEditable ? (
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="5"
                      value={item.power}
                      onChange={(e) =>
                        handleInputChange(idx, "power", e.target.value)
                      }
                      className="w-full border rounded p-1"
                    />
                  ) : (
                    item.power
                  )}
                </td>
                <td>
                  {isEditable ? (
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="5"
                      value={item.interest}
                      onChange={(e) =>
                        handleInputChange(idx, "interest", e.target.value)
                      }
                      className="w-full border rounded p-1"
                    />
                  ) : (
                    item.interest
                  )}
                </td>
                {isEditable && (
                  <td>
                    <button
                      onClick={() => handleDeleteStakeholder(idx)}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-1/2 flex items-center justify-center">{renderQuadrant()}</div>
      </div>

      {isEditable && (
        <button
          onClick={handleAddStakeholder}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Tambah Stakeholder Baru
        </button>
      )}
    </div>
  );
}
