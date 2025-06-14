import React, { useRef, useState } from "react";
import PrescriptionForm from "./components/PrescriptionForm/Form";
import Template from "./components/PrescriptionTemplate/Template";
import { downloadPDF } from "./utils/pdfgenerator";

function App() {
  // const [patientData, setPatientData] = useState(null);
  // const prescriptionRef = useRef();
  const [submittedData, setSubmittedData] = useState(null);
  const prescriptionRef = useRef();

  return (
    <div className="App">
      <PrescriptionForm onSubmitData={setSubmittedData} />
      {submittedData && (
        <>
          <Template ref={prescriptionRef} data={submittedData} />
          <button onClick={() => downloadPDF(prescriptionRef)}>Download PDF</button>
        </>
      )}
    </div>
  );
}

export default App;
