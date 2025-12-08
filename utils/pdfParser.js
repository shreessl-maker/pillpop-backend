import fs from "fs";
import pdfParse from "pdf-parse";

export const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } catch (err) {
    console.error("PDF Parsing Error:", err);
    throw new Error("Unable to extract text from PDF");
  }
};
