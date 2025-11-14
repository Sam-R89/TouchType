# TouchType - Typing & Reading Practice Web App

A modern web application designed to help improve touch typing speed and reading comprehension. Import your own text, PDF, or EPUB files and practice typing while tracking your performance in real-time.

## Features

- **Multiple File Format Support**: Import files in TXT, PDF, and EPUB formats
- **Real-Time Typing Feedback**: Character-by-character comparison with color-coded feedback
  - Green for correct characters
  - Red for incorrect characters
  - Highlighted current position
- **Performance Metrics**:
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Time elapsed
  - Progress tracking
- **Modern UI**: Beautiful gradient design with responsive layout
- **Progress Tracking**: Visual progress bar showing completion percentage

## Screenshots

The app features:
- A clean file upload interface
- Real-time typing area with color-coded feedback
- Statistics dashboard showing WPM, accuracy, time, and progress
- Responsive design that works on desktop and mobile devices

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, which you can deploy to any static hosting service.

To preview the production build locally:

```bash
npm run preview
```

## Usage

1. **Upload a File**: Click the upload area and select a TXT, PDF, or EPUB file
2. **Start Typing**: Begin typing in the text area below the displayed text
3. **Track Progress**: Watch your WPM, accuracy, and progress update in real-time
4. **Reset or Change**: Use the buttons to reset your progress or load a different file

## How It Works

### WPM Calculation
Words Per Minute (WPM) is calculated as:
```
WPM = (Number of words typed / Time elapsed in minutes)
```

### Accuracy Calculation
Accuracy is calculated as:
```
Accuracy = (Correct characters / Total characters typed) × 100
```

### File Parsing
- **TXT files**: Read directly using FileReader API
- **PDF files**: Parsed using pdf.js library to extract text content
- **EPUB files**: Parsed using epub.js library to extract text from all sections

## Technologies Used

- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **pdf.js**: PDF file parsing
- **epub.js**: EPUB file parsing
- **CSS3**: Modern styling with gradients and animations

## Project Structure

```
TouchType/
├── src/
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── utils/
│       └── fileParser.ts    # File parsing utilities
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## Tips for Best Results

1. **Choose appropriate texts**: Start with easier texts and gradually increase difficulty
2. **Focus on accuracy first**: Speed will naturally improve with practice
3. **Take breaks**: Practice in 15-20 minute sessions for best results
4. **Track progress**: Use different texts to see how your WPM improves over time

## Future Enhancements

Possible future features:
- Save typing history and track progress over time
- Difficulty levels and curated text collections
- Timed challenges and speed goals
- Keyboard heat map showing which keys are most problematic
- Support for more file formats (DOCX, RTF, etc.)
- Dark mode support
- Multiplayer typing races

## License

This project is open source and available for personal and educational use.

## Contributing

Feel free to fork this project and submit pull requests with improvements or bug fixes.

## Support

If you encounter any issues or have questions, please open an issue in the repository.
