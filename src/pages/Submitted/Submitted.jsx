import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import Template from "../../components/PrescriptionTemplate/Template";
import { downloadPDF } from "../../utils/pdfgenerator";

export default function Submitted() {
  const location = useLocation();
  const prescriptionRef = useRef();
  const submittedData = location.state?.data;

  if (!submittedData) {
    return <p>No data submitted.</p>;
  }

  return (
    <div className="submitted">
      <p>Successfully submitted the form.</p>
      <Template ref={prescriptionRef} data={submittedData} />
      <button onClick={() => downloadPDF(prescriptionRef)}>
        Download PDF
      </button>
    </div>
  );
}