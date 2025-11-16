import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { pdfjs } from 'react-pdf';
import './App.css';
import { parseFile } from './utils/fileParser';

// Configure PDF.js worker - using local worker file from public directory
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// Demo text for initial screen
const DEMO_TEXT = `Welcome to TouchType! This is a typing practice application designed to help you improve your typing speed and reading comprehension.

Start typing this text to see how it works. As you type, you'll see green text for correct characters and red for incorrect ones. Your words per minute (WPM) and accuracy will be calculated in real-time.

You can upload your own TXT or PDF files to practice with content you enjoy. Whether you're learning to touch type or just want to improve your speed, TouchType provides immediate feedback to help you track your progress.

Ready to get started? Just click "Try Demo" below to practice with this text, or upload your own file to begin!`;

interface Stats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  charactersTyped: number;
}

function App() {
  const [text, setText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState<Stats>({
    wpm: 0,
    accuracy: 100,
    timeElapsed: 0,
    charactersTyped: 0,
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTyping && startTime) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setStats(prev => ({ ...prev, timeElapsed: elapsed }));
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isTyping, startTime]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setIsLoading(true);
    setFileName(file.name);

    try {
      const content = await parseFile(file);
      setText(content);
      resetTyping();
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file');
      setText('');
      setFileName('');
      setIsLoading(false);
    }

    // Reset file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDemoClick = () => {
    setText(DEMO_TEXT);
    setFileName('Demo Text');
    resetTyping();
    setError('');
  };

  const handleChangeFile = () => {
    setText('');
    setFileName('');
    resetTyping();
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      setStartTime(Date.now());
    }

    setUserInput(value);
    calculateStats(value);
  };

  const calculateStats = useCallback((input: string) => {
    const charactersTyped = input.length;

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) {
        correctChars++;
      }
    }
    const accuracy = charactersTyped > 0 ? (correctChars / charactersTyped) * 100 : 100;

    // Calculate WPM
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
    const wordsTyped = input.trim().split(/\s+/).length;
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

    setStats({
      wpm,
      accuracy: Math.round(accuracy * 10) / 10,
      timeElapsed: timeElapsed * 60,
      charactersTyped,
    });

    // Check if completed
    if (input === text) {
      setIsTyping(false);
    }
  }, [text, startTime]);

  const resetTyping = useCallback(() => {
    setUserInput('');
    setIsTyping(false);
    setStartTime(null);
    setStats({
      wpm: 0,
      accuracy: 100,
      timeElapsed: 0,
      charactersTyped: 0,
    });
  }, []);

  // Memoize the rendered text to avoid recreating thousands of elements on every render
  const renderedText = useMemo(() => {
    if (!text) return null;

    return text.split('').map((char, index) => {
      let className = 'char';

      if (index < userInput.length) {
        className += userInput[index] === char ? ' correct' : ' incorrect';
      } else if (index === userInput.length) {
        className += ' current';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  }, [text, userInput]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = useMemo(
    () => (text ? (userInput.length / text.length) * 100 : 0),
    [text, userInput.length]
  );

  return (
    <div className="app">
      <header className="header">
        <h1>TouchType</h1>
        <p>Improve your typing speed and reading comprehension</p>
      </header>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {!text ? (
        <>
          <div className="demo-section">
            <h2>Quick Start</h2>
            <p>Try the demo or upload your own file to begin practicing</p>
            <button className="btn btn-primary btn-large" onClick={handleDemoClick}>
              ✨ Try Demo
            </button>
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="file-upload" onClick={() => fileInputRef.current?.click()}>
            <div className="file-upload-icon">📁</div>
            <div className="file-upload-text">
              {isLoading ? 'Loading file...' : 'Click to upload your own file'}
            </div>
            <div className="file-upload-hint">Supports TXT and PDF formats</div>
          </div>
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            accept=".txt,.pdf"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </>
      ) : (
        <>
          <div className="file-info">
            <span className="file-name">📄 {fileName}</span>
            <button className="btn btn-secondary" onClick={handleChangeFile}>
              Change File
            </button>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="stats">
            <div className="stat-card">
              <div className="stat-label">Words Per Minute</div>
              <div className="stat-value">
                {stats.wpm}
                <span className="stat-unit"> WPM</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Accuracy</div>
              <div className="stat-value">
                {stats.accuracy}
                <span className="stat-unit">%</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Time Elapsed</div>
              <div className="stat-value">
                {formatTime(stats.timeElapsed)}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Progress</div>
              <div className="stat-value">
                {Math.round(progress)}
                <span className="stat-unit">%</span>
              </div>
            </div>
          </div>

          <div className="typing-area">
            <div className="text-display">
              {renderedText}
            </div>
            <textarea
              ref={inputRef}
              className="input-area"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Start typing here..."
              rows={4}
              autoFocus
            />
          </div>

          <div className="controls">
            <button className="btn btn-primary" onClick={resetTyping}>
              Reset
            </button>
            {userInput === text && text && (
              <button className="btn btn-primary" onClick={handleChangeFile}>
                Practice Again
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
