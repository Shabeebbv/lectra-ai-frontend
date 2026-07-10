import { useState, useRef, useEffect } from "react";

const ROLES = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
];

export default function RoleDropdown({ currentRole, disabled, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (disabled) {
    return (
      <span className="text-xs text-slate-400 cursor-not-allowed" title="Cannot change this user's role">
        Locked
      </span>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-xs text-slate-500 hover:text-slate-800 underline decoration-dotted underline-offset-2"
      >
        Change role
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-36 rounded-lg border border-slate-200 bg-white shadow-lg">
          {ROLES.filter((r) => r.value !== currentRole).map((r) => (
            <button
              key={r.value}
              onClick={() => {
                onChange(r.value);
                setOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg"
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}