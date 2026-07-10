const ROLE_STYLES = {
  super_admin: "bg-violet-50 text-violet-700 ring-violet-600/20",
  admin: "bg-blue-50 text-blue-700 ring-blue-600/20",
  user: "bg-slate-50 text-slate-600 ring-slate-500/20",
};

const ROLE_LABELS = {
  super_admin: "Super Admin",
  admin: "Admin",
  user: "User",
};

export default function RoleBadge({ role }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${ROLE_STYLES[role]}`}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}