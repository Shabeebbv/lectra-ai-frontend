import { useAnalytics } from "../hooks/useAnalytics";
import TimeSeriesChart from "../components/analytics/TimeSeriesChart";
import BreakdownDonut from "../components/analytics/BreakdownDonut";

const RANGE_OPTIONS = [
  { label: "7 days", value: 7 },
  { label: "30 days", value: 30 },
  { label: "90 days", value: 90 },
];

export default function Analytics() {
  const { data, loading, days, setDays } = useAnalytics();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#111c2d]">Analytics</h1>
          <p className="mt-1 text-sm text-[#727785]">Platform trends and engagement</p>
        </div>

        <div className="flex gap-1 bg-white border border-[#c2c6d6] rounded-lg p-1">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDays(opt.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                days === opt.value
                  ? "bg-[#0058be] text-white"
                  : "text-[#424754] hover:bg-[#f0f3ff]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading || !data ? (
        <div className="py-24 text-center text-sm text-[#727785]">Loading analytics…</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TimeSeriesChart title="New User Signups" data={data.user_signups} color="#0058be" />
          <TimeSeriesChart title="Lecture Uploads" data={data.lecture_uploads} color="#0891b2" />
          <TimeSeriesChart title="AI Tutor Questions" data={data.tutor_usage} color="#7c3aed" />
          <BreakdownDonut title="Lecture Status Breakdown" data={data.lecture_status_breakdown} labelKey="status" />
          <BreakdownDonut title="User Role Breakdown" data={data.role_breakdown} labelKey="role" />
        </div>
      )}
    </div>
  );
}