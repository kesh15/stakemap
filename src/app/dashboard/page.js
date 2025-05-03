import MapsView from '@/components/MapsView';
import StakeholderStats from '@/components/StakeholderStats';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <MapsView />
      <StakeholderStats />
    </div>
  );
}
