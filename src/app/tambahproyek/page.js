import FormProyek from "@/components/FormProyek";
import Sidebar from "@/components/Sidebar";

export default function TambahProyekPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 ml-60 overflow-auto bg-white">
        <FormProyek />
      </main>
    </div>
  );
}
