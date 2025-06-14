import { useNavigate } from "react-router-dom";
import PrescriptionForm from "../../components/PrescriptionForm/Form";

export default function Prescription() {
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    navigate("/submitted", { state: { data } });
  };

  return (
    <div>
      <PrescriptionForm onSubmitData={handleFormSubmit} />
    </div>
  );
}
