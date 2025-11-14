import { useState, useEffect, useRef } from 'react';
import './App.css';
import { parseFile } from './utils/fileParser';

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
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
    setFileName(file.name);

    try {
      const content = await parseFile(file);
      setText(content);
      resetTyping();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file');
      setText('');
      setFileName('');
    }
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

  const calculateStats = (input: string) => {
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
  };

  const resetTyping = () => {
    setUserInput('');
    setIsTyping(false);
    setStartTime(null);
    setStats({
      wpm: 0,
      accuracy: 100,
      timeElapsed: 0,
      charactersTyped: 0,
    });
  };

  const renderText = () => {
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
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = text ? (userInput.length / text.length) * 100 : 0;

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
        <div className="file-upload">
          <label htmlFor="file-input" className="file-upload-label">
            <div className="file-upload-icon">📁</div>
            <div className="file-upload-text">Click to upload a file</div>
            <div className="file-upload-hint">Supports TXT, PDF, and EPUB formats</div>
          </label>
          <input
            id="file-input"
            type="file"
            accept=".txt,.pdf,.epub"
            onChange={handleFileUpload}
          />
        </div>
      ) : (
        <>
          <div className="file-info">
            <span className="file-name">📄 {fileName}</span>
            <button className="btn btn-secondary" onClick={() => {
              setText('');
              setFileName('');
              resetTyping();
            }}>
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
              {renderText()}
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
              <button className="btn btn-primary" onClick={() => {
                setText('');
                setFileName('');
                resetTyping();
              }}>
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
