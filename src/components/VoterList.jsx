import React, { useState } from "react"
import { VoterLIst1 } from "../voterList" // Make sure this matches your actual data

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
        <h1 className="text-2xl font-semibold">Voter List Portal</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Voter List</h2>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by any field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded shadow-sm"
            />
            <div className="text-gray-700 font-medium text-lg">
              Results:{" "}
              <span className="text-blue-600">{filteredVoters.length}</span>
            </div>
          </div>

          {/* Voter Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Serial No</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Guardian's Name</th>
                  <th className="border px-4 py-2">Old Ward No / House No</th>
                  <th className="border px-4 py-2">House Name</th>
                  <th className="border px-4 py-2">Gender</th>
                  <th className="border px-4 py-2">Age</th>
                  <th className="border px-4 py-2">ID Card No</th>
                </tr>
              </thead>
              <tbody>
                {currentVoters.length > 0 ? (
                  currentVoters.map((voter, idx) => (
                    <tr key={idx}>
                      <td className="border px-4 py-2">{voter.serialNo}</td>
                      <td className="border px-4 py-2">{voter.name}</td>
                      <td className="border px-4 py-2">{voter.guardianName}</td>
                      <td className="border px-4 py-2">
                        {voter.oldWardHouseNo}
                      </td>
                      <td className="border px-4 py-2">{voter.houseName}</td>
                      <td className="border px-4 py-2">{voter.gender}</td>
                      <td className="border px-4 py-2">{voter.age}</td>
                      <td className="border px-4 py-2">{voter.idCardNo}</td>
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
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">
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
