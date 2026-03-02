import { jsPDF } from "jspdf";

type DownloadLetterPdfParams = {
  title: string;
  letter: string;
};

export function downloadLetterPdf({ title, letter }: DownloadLetterPdfParams) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const marginX = 48;
  let cursorY = 70;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(title, marginX, cursorY);

  cursorY += 34;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const lines = doc.splitTextToSize(letter, 500);
  doc.text(lines, marginX, cursorY);

  doc.save("carta-de-amor.pdf");
}
