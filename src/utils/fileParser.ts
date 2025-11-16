import { pdfjs } from 'react-pdf';

export const parseTextFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text || text.trim().length === 0) {
        reject(new Error('Text file is empty'));
        return;
      }
      resolve(text);
    };
    reader.onerror = () => reject(new Error('Failed to read text file'));
    reader.readAsText(file);
  });
};

export const parsePDFFile = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';

    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item: any) => {
          // Handle both string items and text items
          if ('str' in item) {
            return item.str;
          }
          return '';
        })
        .join(' ');

      fullText += pageText + '\n\n';
    }

    const cleanedText = fullText.trim();

    if (cleanedText.length === 0) {
      throw new Error('PDF file contains no readable text');
    }

    return cleanedText;
  } catch (error) {
    console.error('PDF parsing error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
    throw new Error('Failed to parse PDF file');
  }
};

export const parseFile = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error('No file provided');
  }

  const fileType = file.name.split('.').pop()?.toLowerCase();

  switch (fileType) {
    case 'txt':
      return parseTextFile(file);
    case 'pdf':
      return parsePDFFile(file);
    default:
      throw new Error(`Unsupported file type: ${fileType}. Please use TXT or PDF files.`);
  }
};

export const getSupportedFormats = (): string[] => {
  return ['txt', 'pdf'];
};
