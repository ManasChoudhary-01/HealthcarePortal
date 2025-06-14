// utils/pdfGenerator.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF = async (elementRef, filename = "prescription.pdf") => {
  const canvas = await html2canvas(elementRef.current);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
};
