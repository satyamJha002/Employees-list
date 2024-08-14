import React, { useState } from "react";

const EmployeeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 0) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/employee/search?q=${e.target.value}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for an employee..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />

      {results.length > 0 && (
        <ul className="mt-4 bg-white shadow-md rounded-lg">
          {results.map((employee) => (
            <li key={employee._id} className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">{employee.f_Name}</h3>
              <p>ID: {employee.f_Id}</p>
              <p>Email: {employee.f_Email}</p>
              <p>Designation: {employee.f_Designation}</p>
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && searchTerm !== "" && (
        <p className="mt-4 text-center text-gray-500">No employees found</p>
      )}
    </div>
  );
};

export default EmployeeSearch;
