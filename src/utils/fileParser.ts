import { pdfjs } from 'react-pdf';

// Helper function to find the start of Chapter 1 in text
const findChapterOne = (text: string): number => {
  // Common chapter 1 patterns
  const patterns = [
    /\bchapter\s+1\b/i,
    /\bchapter\s+one\b/i,
    /\bchapter\s+i\b/i,
    /\b1\.\s+/m, // Numbered chapter like "1. "
    /^chapter\s+1/im,
    /^1\s+/m,
  ];

  let earliestMatch = -1;

  for (const pattern of patterns) {
    const match = text.search(pattern);
    if (match !== -1 && (earliestMatch === -1 || match < earliestMatch)) {
      earliestMatch = match;
    }
  }

  return earliestMatch;
};

// Helper function to extract text from Chapter 1 onwards
const extractFromChapterOne = (text: string): string => {
  const chapterIndex = findChapterOne(text);

  if (chapterIndex !== -1) {
    // Found Chapter 1, extract from there
    return text.substring(chapterIndex);
  }

  // No Chapter 1 found, return full text
  return text;
};

export const parseTextFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text || text.trim().length === 0) {
        reject(new Error('Text file is empty'));
        return;
      }

      // Extract from Chapter 1 onwards
      const processedText = extractFromChapterOne(text);
      resolve(processedText);
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

    // Extract from Chapter 1 onwards
    const processedText = extractFromChapterOne(cleanedText);

    return processedText;
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
