import Kuadran from "@/components/Kuadran";
import MapsView from "@/components/MapsView";
import StakeholderStats from "@/components/StakeholderStats";

export default function DashboardPage() {
  return (
    <div className="grid h-max w-full grid-cols-12 gap-0">
      <div className="col-span-12">
        <MapsView className="col-span-12" />
      </div>
      <div className="col-span-6">
        <StakeholderStats />
      </div>
      <div className="col-span-6">
        <Kuadran />
      </div>
    </div>
  );
}
