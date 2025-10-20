"use client";

export default function ModalHapus({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded p-6 w-[400px]">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <span className="text-red-600 text-2xl">🗑️</span>
          </div>
          <h2 className="text-lg font-semibold mb-2">Penghapusan Data</h2>
          <p className="text-sm text-center mb-6">
            Apakah Anda yakin ingin menghapus data ini?
          </p>

          <div className="flex justify-end gap-3 w-full">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
