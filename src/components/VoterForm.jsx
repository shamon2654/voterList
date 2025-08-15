import { useState } from "react"

const initialState = {
  serialNo: "",
  name: "",
  guardianName: "",
  oldWardHouseNo: "",
  houseName: "",
  gender: "",
  age: "",
  idCardNo: "",
}

const VoterForm = ({ onSubmit }) => {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "serialNo" && !/^\d*$/.test(value)) return
    if (name === "age" && !/^\d{0,3}$/.test(value)) return
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const e = {}
    if (!form.serialNo) e.serialNo = "Serial No is required"
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.guardianName.trim())
      e.guardianName = "Guardian's Name is required"
    if (!form.oldWardHouseNo.trim())
      e.oldWardHouseNo = "Old Ward No / House No is required"
    if (!form.houseName.trim()) e.houseName = "House Name is required"
    if (!form.gender) e.gender = "Gender is required"
    if (!form.age) e.age = "Age is required"
    if (form.age && (Number(form.age) < 0 || Number(form.age) > 130))
      e.age = "Age must be between 0 and 130"
    if (!form.idCardNo.trim()) e.idCardNo = "ID Card No is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const payload = {
      serialNo: Number(form.serialNo),
      name: form.name.trim(),
      guardianName: form.guardianName.trim(),
      oldWardHouseNo: form.oldWardHouseNo.trim(),
      houseName: form.houseName.trim(),
      gender: form.gender,
      age: Number(form.age),
      idCardNo: form.idCardNo.trim(),
    }
    onSubmit?.(payload)
    setForm(initialState)
    setErrors({})
  }

  const handleReset = () => {
    setForm(initialState)
    setErrors({})
  }

  const FieldError = ({ name }) =>
    errors[name] ? (
      <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
    ) : null

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl bg-white p-6 rounded-lg shadow-md"
    >
      {/* Serial No */}
      <div>
        <label htmlFor="serialNo" className="block font-semibold mb-1">
          Serial No
        </label>
        <input
          id="serialNo"
          name="serialNo"
          type="text"
          inputMode="numeric"
          placeholder="e.g., 1"
          value={form.serialNo}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <FieldError name="serialNo" />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-semibold mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <FieldError name="name" />
      </div>

      {/* Guardian's Name */}
      <div>
        <label htmlFor="guardianName" className="block font-semibold mb-1">
          Guardian's Name
        </label>
        <input
          id="guardianName"
          name="guardianName"
          type="text"
          placeholder="Father/Mother/Guardian"
          value={form.guardianName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <FieldError name="guardianName" />
      </div>

      {/* Old Ward No / House No */}
      <div>
        <label htmlFor="oldWardHouseNo" className="block font-semibold mb-1">
          Old Ward No / House No
        </label>
        <input
          id="oldWardHouseNo"
          name="oldWardHouseNo"
          type="text"
          placeholder="e.g., Ward 12 / H.No 45A"
          value={form.oldWardHouseNo}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <FieldError name="oldWardHouseNo" />
      </div>

      {/* House Name */}
      <div>
        <label htmlFor="houseName" className="block font-semibold mb-1">
          House Name
        </label>
        <input
          id="houseName"
          name="houseName"
          type="text"
          placeholder="e.g., Green Villa"
          value={form.houseName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <FieldError name="houseName" />
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" className="block font-semibold mb-1">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        <FieldError name="gender" />
      </div>

      {/* Age */}
      <div>
        <label htmlFor="age" className="block font-semibold mb-1">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="text"
          inputMode="numeric"
          placeholder="e.g., 35"
          value={form.age}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <FieldError name="age" />
      </div>

      {/* ID Card No */}
      <div>
        <label htmlFor="idCardNo" className="block font-semibold mb-1">
          ID Card No.
        </label>
        <input
          id="idCardNo"
          name="idCardNo"
          type="text"
          placeholder="e.g., ABC1234567"
          value={form.idCardNo}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <FieldError name="idCardNo" />
      </div>

      {/* Buttons */}
      <div className="sm:col-span-2 lg:col-span-3 flex gap-4 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export default VoterForm
