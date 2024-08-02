const SelectSize = ({ size, handleSizeChange }) => {
  const sizes = [5, 10, 20, 100]
  return (
    <div className="p-4 bg-indigo-200 rounded-lg shadow-md">
      <label
        htmlFor="select-size"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Choose page size:
      </label>
      <select
        name="select-size"
        id="select-size"
        value={size}
        onChange={handleSizeChange}
        className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base leading-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectSize
