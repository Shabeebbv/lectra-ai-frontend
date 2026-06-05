import { Link } from "react-router-dom"

function Sidebar() {

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r">

      <div className="p-6">

        <h1 className="text-3xl font-bold text-indigo-600">
          Lectra AI
        </h1>

        <p className="text-sm text-slate-500">
          Intelligent Workspace
        </p>

      </div>

      <nav className="px-4 space-y-2">

        <Link
          to="/dashboard"
          className="block px-4 py-3 rounded-xl bg-indigo-100 text-indigo-700"
        >
          Home
        </Link>

        <button className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100">
          Lectures
        </button>

        <button className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100">
          AI Notes
        </button>

        <button className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100">
          Summaries
        </button>

        <button className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100">
          Semantic Search
        </button>

        <button className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100">
          AI Tutor
        </button>

        <button className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100">
          Flashcards
        </button>

      </nav>

    </aside>
  )
}

export default Sidebar