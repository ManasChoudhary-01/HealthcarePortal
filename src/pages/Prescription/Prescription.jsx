import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PrescriptionForm from "../../components/PrescriptionForm/Form";
import Template from "../../components/PrescriptionTemplate/Template";
import { downloadPDF } from "../../utils/pdfgenerator";

export default function Prescription() {
  const [submittedData, setSubmittedData] = useState(null);
  const prescriptionRef = useRef();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
    navigate("/submitted", { state: { data } });
  };

  return (
    <div>
      <PrescriptionForm onSubmitData={handleFormSubmit} />
    </div>
  );
}
