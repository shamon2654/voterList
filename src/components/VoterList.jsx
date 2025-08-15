import React, { useState } from "react"
import { VoterLIst1 } from "../voterList" // Ensure this is your actual data

const VoterList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  // Filtered data based on search
  const filteredVoters = VoterLIst1.filter((voter) =>
    [
      voter.serialNo,
      voter.name,
      voter.guardianName,
      voter.oldWardHouseNo,
      voter.houseName,
      voter.gender,
      voter.age,
      voter.idCardNo,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredVoters.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentVoters = filteredVoters.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center md:text-left">
          Voter List Portal
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6 bg-gray-100">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Voter List</h2>

          {/* Search Input */}
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search by any field..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                ></path>
              </svg>
            </div>
            <div className="text-gray-700 font-medium text-lg">
              Results:{" "}
              <span className="text-blue-600">{filteredVoters.length}</span>
            </div>
          </div>

          {/* Voter Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 md:text-base">
              <thead>
                <tr className="bg-gray-200 text-xs md:text-sm">
                  <th className="border px-2 py-1 md:px-4 md:py-2">S.No</th>
                  <th className="border px-2 py-1 md:px-4 md:py-2">Name</th>
                  <th className="border px-2 py-1 md:px-4 md:py-2">Guardian</th>
                  <th className="border px-2 py-1 md:px-4 md:py-2">
                    Ward / House No
                  </th>
                  <th className="border px-2 py-1 md:px-4 md:py-2">
                    House Name
                  </th>
                  <th className="border px-2 py-1 md:px-4 md:py-2">Gender</th>
                  <th className="border px-2 py-1 md:px-4 md:py-2">Age</th>
                  <th className="border px-2 py-1 md:px-4 md:py-2">ID Card</th>
                </tr>
              </thead>
              <tbody>
                {currentVoters.length > 0 ? (
                  currentVoters.map((voter, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      <td className="border px-2 py-1 md:px-4 md:py-2">
                        {voter.serialNo}
                      </td>
                      <td className="border px-2 py-1 md:px-4 md:py-2">
                        {voter.name}
                      </td>
                      <td className="border px-2 py-1 md:px-4 md:py-2">
                        {voter.guardianName}
                      </td>
                      <td className="border px-2 py-1 md:px-4 md:py-2">
                        {voter.oldWardHouseNo}
                      </td>
                      <td className="border px-2 py-1 md:px-4 md:py-2">
                        {voter.houseName}
                      </td>
                      <td className="border px-2 py-1 md:px-4 md:py-2">
                        {voter.gender}
                      </td>
                      <td className="border px-2 py-1 md:px-4 md:py-2">
                        {voter.age}
                      </td>
                      <td className="border px-2 py-1 md:px-4 md:py-2">
                        {voter.idCardNo}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 md:gap-0">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm md:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Election Commission</p>
      </footer>
    </div>
  )
}

export default VoterList
