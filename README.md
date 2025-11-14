# TouchType - Typing & Reading Practice Web App

A modern, actively-maintained web application designed to help improve touch typing speed and reading comprehension. Built with the latest 2025 stable frameworks and libraries.

## Features

- **🎯 Interactive Demo**: Try it immediately with built-in demo text - no file upload needed!
- **📁 Multiple File Format Support**: Import your own files in TXT and PDF formats
- **✨ Real-Time Typing Feedback**: Character-by-character comparison with color-coded feedback
  - Green for correct characters
  - Red for incorrect characters
  - Highlighted current position
- **📊 Performance Metrics**:
  - Words Per Minute (WPM)
  - Accuracy percentage
  - Time elapsed
  - Progress tracking
- **🎨 Modern UI**: Beautiful gradient design with responsive layout
- **📈 Progress Tracking**: Visual progress bar showing completion percentage
- **⚡ Optimized Performance**: Handles large texts (10,000+ characters) smoothly

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

### Quick Start (Demo)
1. Click **"Try Demo"** on the home screen
2. Start typing immediately to see how the app works
3. Watch your WPM and accuracy update in real-time

### Upload Your Own File
1. Click **"Click to upload your own file"** or the upload area
2. Select a TXT or PDF file from your computer
3. Start typing the displayed text
4. Track your progress with real-time statistics
5. Use **"Reset"** to start over or **"Change File"** to load a different file

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
- **PDF files**: Parsed using react-pdf library (v10.2.0) to extract text content from all pages

## Technologies Used (All 2025 Stable & Actively Maintained)

- **React 18.3.1**: Latest stable version of React (actively maintained)
- **TypeScript 5.7.2**: Latest stable TypeScript with newest features
- **Vite 6.0.3**: Latest stable fast build tool and dev server
- **react-pdf 10.2.0**: Actively maintained PDF viewer/parser for React (last updated: Jan 2025)
- **CSS3**: Modern styling with gradients and animations

### Why These Libraries?

All dependencies were carefully selected in January 2025 to ensure:
- ✅ Active maintenance and regular updates
- ✅ Strong community support
- ✅ Production-ready stability
- ✅ Modern React compatibility
- ✅ TypeScript support

## Performance Optimizations

This application has been optimized for handling large texts efficiently:

- **useMemo** for rendering text - prevents recreating thousands of DOM elements on every keystroke
- **useCallback** for event handlers - reduces unnecessary re-renders
- **Memoized calculations** - WPM and progress calculations are cached
- **Efficient rendering** - Only re-renders when necessary, not on every state change

These optimizations ensure smooth performance even with texts containing 10,000+ characters.

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

## Important Notes

### Supported File Formats
This application currently supports **TXT** and **PDF** files only. EPUB support was intentionally removed because:
- The epubjs library (previously used) has not been updated since 2020
- No actively maintained EPUB libraries exist for browser-based parsing in 2025
- TXT and PDF formats cover the vast majority of typing practice use cases

If you need to practice with EPUB files, consider converting them to PDF first using free tools like Calibre.

### Performance
The app is optimized to handle large texts (10,000+ characters) efficiently through React memoization patterns. However, extremely large files (100,000+ characters) may still cause some performance degradation due to the character-by-character rendering approach.

## Tips for Best Results

1. **Choose appropriate texts**: Start with easier texts and gradually increase difficulty
2. **Focus on accuracy first**: Speed will naturally improve with practice
3. **Take breaks**: Practice in 15-20 minute sessions for best results
4. **Track progress**: Use different texts to see how your WPM improves over time
5. **File size**: For best performance, use texts under 50,000 characters

## Future Enhancements

Possible future features:
- Save typing history and track progress over time
- Difficulty levels and curated text collections
- Timed challenges and speed goals
- Keyboard heat map showing which keys are most problematic
- Dark mode support
- Multiplayer typing races
- More practice modes (e.g., code typing, speed bursts)
- Mobile app version

## License

This project is open source and available for personal and educational use.

## Contributing

Feel free to fork this project and submit pull requests with improvements or bug fixes.

## Support

If you encounter any issues or have questions, please open an issue in the repository.
