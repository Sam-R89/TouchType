import * as pdfjsLib from 'pdfjs-dist';
import ePub from 'epubjs';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const parseTextFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    reader.onerror = () => reject(new Error('Failed to read text file'));
    reader.readAsText(file);
  });
};

export const parsePDFFile = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    throw new Error('Failed to parse PDF file');
  }
};

export const parseEPUBFile = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const book = ePub(arrayBuffer);
    await book.ready;

    let fullText = '';
    const spine = await book.loaded.spine;

    for (const item of spine.items) {
      try {
        await book.spine.get(item.href).then(async (section: any) => {
          const text = await section.load(book.load.bind(book));
          const doc = new DOMParser().parseFromString(text, 'text/html');
          const textContent = doc.body.textContent || '';
          fullText += textContent + '\n\n';
        });
      } catch (err) {
        console.error('Error reading section:', err);
      }
    }

    return fullText.trim();
  } catch (error) {
    throw new Error('Failed to parse EPUB file');
  }
};

export const parseFile = async (file: File): Promise<string> => {
  const fileType = file.name.split('.').pop()?.toLowerCase();

  switch (fileType) {
    case 'txt':
      return parseTextFile(file);
    case 'pdf':
      return parsePDFFile(file);
    case 'epub':
      return parseEPUBFile(file);
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
};
