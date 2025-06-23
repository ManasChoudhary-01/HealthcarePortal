import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF = async (elementRef, filename = "Prescription.pdf") => {
  const canvas = await html2canvas(elementRef.current,{
    scale: 2,
    useCORS: true,
  });
  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
};
