import { useState, useCallback, useEffect } from 'react';
import { ArrowRight, User } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = useCallback(() => {
    if (password === '123') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }, [password, onLogin]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleLogin();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleLogin]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/Image/Background.jpg') center/cover no-repeat`,
      }}
    >
      <div className="flex flex-col items-center" style={{ width: 320 }}>
        {/* User Icon (instead of profile photo) */}
        <div
          className="flex items-center justify-center rounded-full mb-4"
          style={{
            width: 128,
            height: 128,
            border: '3px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.1)',
          }}
        >
          <User size={64} color="white" />
        </div>

        {/* Username */}
        <h1
          className="mb-6 font-light"
          style={{
            fontSize: 28,
            color: 'white',
            fontFamily: '"Segoe UI", sans-serif',
          }}
        >
          Zheng Bo
        </h1>

        {/* Password Input */}
        <div className="w-full relative">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter Password"
            className="w-full text-white placeholder-white/60 outline-none"
            style={{
              height: 36,
              padding: '0 40px 0 12px',
              background: 'rgba(0,0,0,0.4)',
              border: error
                ? '1px solid #ff4444'
                : '1px solid rgba(255,255,255,0.2)',
              fontSize: 14,
              fontFamily: '"Segoe UI", sans-serif',
            }}
          />
          <button
            onClick={handleLogin}
            className="absolute flex items-center justify-center transition-colors"
            style={{
              top: 4,
              right: 4,
              width: 28,
              height: 28,
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
            }}
            aria-label="Login"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-2" style={{ fontSize: 13, color: '#ff6666' }}>
            Incorrect password. Try again.
          </p>
        )}

        {/* Hint */}
        <p className="mt-2" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
          Password hint: 123
        </p>
      </div>
    </div>
  );
}
