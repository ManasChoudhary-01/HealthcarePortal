import React, { forwardRef } from "react";

const Prescription = forwardRef(({ data }, ref) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div ref={ref} className="prescription p-6 border border-black max-w-md">
      <h2>🏥 ABC Hospital</h2>
      <p><strong>Date:</strong> {currentDate}</p>
      <hr />
      <p><strong>Patient Name:</strong> {data.patientName}</p>
      <p><strong>Age:</strong> {data.patientAge}</p>
      <p><strong>Sex:</strong> {data.gender}</p>
      <p><strong>Problem:</strong> {data.symptoms}</p>
      <hr />
      <p>© ABC Hospital | This is a system-generated prescription</p>
    </div>
  );
});

export default Prescription;