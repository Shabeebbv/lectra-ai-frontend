import DashboardLayout from "../../layouts/DashboardLayout"

function Dashboard() {

  return (
    <DashboardLayout>

      <div className="text-center mt-12">

        <h1 className="text-5xl font-bold mb-4">
          Good Morning 👋
        </h1>

        <p className="text-slate-600 text-lg">
          Transform lecture videos into searchable knowledge.
        </p>

      </div>

      <div className="max-w-4xl mx-auto mt-12">

        <div className="bg-white border-2 border-dashed rounded-3xl p-16 text-center">

          <h2 className="text-3xl font-semibold mb-4">
            Upload Lecture
          </h2>

          <p className="text-slate-500 mb-6">
            Drag and drop video or audio files.
          </p>

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
            Browse Files
          </button>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Dashboard