export default function StakeholderStats() {
    const data = {
        keepSatisfied: 5,
        manageClosely:8,
        monitor: 12,
        keepInformed: 7,
    };

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="bg-white shadow p-4 rounded"> 
                    <h3 className="font-semibold capitalize">{key}</h3>
                    <p className="text-xl">{value}</p>
                </div>
            ))}
        </div>
    );
}