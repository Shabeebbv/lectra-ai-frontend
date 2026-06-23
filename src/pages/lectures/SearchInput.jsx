import { Search } from "lucide-react"

function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full sm:w-72">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727785]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c2c6d6] rounded-xl text-sm outline-none
                   focus:ring-2 focus:ring-[#0058be]/30 focus:border-[#0058be] transition-all"
      />
    </div>
  )
}

export default SearchInput