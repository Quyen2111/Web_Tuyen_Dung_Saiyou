
import { useState, useEffect } from "react"
import { Search, ChevronDown, Edit2, Trash2, Filter } from "lucide-react"
import EditJobForm from "../components/EditJobForm"
import DeleteConfirmation from "../components/DeleteConfirmation"
import { Link } from "react-router-dom"


const ManagerPostJob = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("All Industry")
  const [totalEntries, setTotalEntries] = useState(0)
  const itemsPerPage = 5

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentJob, setCurrentJob] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://6811d48d3ac96f7119a5c04f.mockapi.io/TuyenDung/jobDatas")

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setJobs(data)
      setTotalEntries(data.length)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "it":
        return "bg-green-100 text-green-600"
      case "accounting":
        return "bg-yellow-100 text-yellow-600"
      case "sales":
        return "bg-red-100 text-red-600"
      case "business":
        return "bg-blue-100 text-blue-600"
      case "engineering":
        return "bg-pink-100 text-pink-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const handleEdit = (job) => {
    setCurrentJob(job)
    setShowEditModal(true)
  }

  const handleDelete = (job) => {
    setCurrentJob(job)
    setShowDeleteModal(true)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const handleJobUpdate = (updatedJob) => {
    // Update the jobs array with the updated job
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)))
    // Close the modal
    setShowEditModal(false)
    setCurrentJob(null)
  }

  const handleDeleteConfirm = async () => {
    if (!currentJob) return

    try {
      setIsSubmitting(true)
      const response = await fetch(`https://6811d48d3ac96f7119a5c04f.mockapi.io/TuyenDung/jobDatas/${currentJob.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // Remove the deleted job from the jobs array
      setJobs(jobs.filter((job) => job.id !== currentJob.id))

      // Close the modal
      setShowDeleteModal(false)
      setCurrentJob(null)
      setIsSubmitting(false)
    } catch (err) {
      console.error("Error deleting job:", err)
      setIsSubmitting(false)
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  // Filter jobs based on status and search query
  const filteredJobs = jobs.filter((job) => {
    // Filter by industry if not "All Industry"
    const matchesIndustry = statusFilter === "All Industry" || job.industry === statusFilter

    // Filter by search query (case insensitive)
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesIndustry && matchesSearch
  })

  // Calculate pagination
  const indexOfLastJob = currentPage * itemsPerPage
  const indexOfFirstJob = indexOfLastJob - itemsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)

  // Format date to match the design
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "short", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50">
          Error loading jobs: {error}. Please try again later.
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Manage Job Postings</h1>
        <Link 
             to="/employer/post-job" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                 >
                    <span className="mr-1">+</span> Post New Job
        </Link>

      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
               <option>All Industry</option>
              <option>it</option>
              <option>accounting</option>
              <option>sales</option>
              <option>other</option>
              <option>business</option>
              <option>engineering</option>

            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <button className="p-2 border border-gray-200 rounded-md">
            <Filter className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-2 border border-gray-200 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left text-sm font-medium text-gray-500 pl-4">Job Title</th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">Posted Date</th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">Industry</th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 pl-4">
                    <div>
                      <div className="font-medium text-gray-800">{job.title}</div>
                      <div className="text-sm text-gray-500">
                        {job.form} • {job.location}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{formatDate(job.date)}</td>
                  <td className="py-4">
                    <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      {job.quantity}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(job.industry)}`}>
                      {job.industry}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(job)} className="text-blue-500 hover:text-blue-700">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(job)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No jobs found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 text-sm">
        <div className="text-gray-500">
          Showing {indexOfFirstJob + 1} to {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length}{" "}
          entries
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-200 rounded-md disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(Math.min(totalPages, 5))].map((_, index) => {
            const pageNumber = index + 1
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === pageNumber ? "bg-blue-500 text-white" : "border border-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            )
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border border-gray-200 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditJobForm job={currentJob} onClose={() => setShowEditModal(false)} onUpdate={handleJobUpdate} />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmation
          job={currentJob}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteConfirm}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}

export default ManagerPostJob
