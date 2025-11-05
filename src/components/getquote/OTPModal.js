import { useEffect, useRef, useState } from 'react';

const DigitBox = ({ value, onChange, onBackspace, autoFocus, inputRef }) => {
  const localRef = useRef(null);
  const ref = inputRef || localRef;
  useEffect(() => { if (autoFocus && ref.current) ref.current.focus(); }, [autoFocus, ref]);
  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => {
        const v = e.target.value.replace(/\D/g, '').slice(0, 1);
        onChange(v);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Backspace' && !value) onBackspace();
      }}
      inputMode="numeric"
      className="w-10 h-12 md:w-12 md:h-14 border rounded-lg text-center text-lg md:text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 border-gray-300"
    />
  );
};

const OTPModal = ({ isOpen, phone, onClose, onVerify, length = 6, hintCode }) => {
  const [digits, setDigits] = useState(Array(length).fill(''));
  const boxes = useRef([]);

  useEffect(() => {
    if (!isOpen) setDigits(Array(length).fill(''));
  }, [isOpen, length]);

  if (!isOpen) return null;

  const setDigit = (idx, v) => {
    setDigits((d) => {
      const nd = [...d];
      nd[idx] = v;
      return nd;
    });
    if (v && boxes.current[idx + 1]) boxes.current[idx + 1].focus();
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!paste) return;
    const arr = Array(length).fill('');
    for (let i = 0; i < paste.length; i++) arr[i] = paste[i];
    setDigits(arr);
  };

  const code = digits.join('');
  const canVerify = code.length === length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-[92%] max-w-md rounded-2xl shadow-2xl border border-yellow-200 p-6 md:p-8">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
        <div className="flex items-center justify-center mb-3">
          <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow">📞</div>
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800 mb-1">Verify Your Phone Number</h3>
        <p className="text-center text-gray-600 text-sm mb-1">We've sent a 6 digit code to <span className="font-semibold">{phone || 'your phone'}</span></p>
        {hintCode && (
          <p className="text-center text-xs text-gray-500 mb-4">For demo purposes, your OTP is <span className="font-mono tracking-widest">{hintCode}</span></p>
        )}

        <div className="flex items-center justify-center gap-2 md:gap-3 mb-6" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <DigitBox
              key={i}
              value={d}
              autoFocus={i === 0}
              onChange={(v) => setDigit(i, v)}
              onBackspace={() => {
                if (i > 0 && boxes.current[i - 1]) boxes.current[i - 1].focus();
                setDigits((arr) => {
                  const na = [...arr];
                  na[Math.max(0, i - 1)] = '';
                  return na;
                });
              }}
              inputRef={(el) => (boxes.current[i] = el)}
            />
          ))}
        </div>

        <button
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg py-2.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canVerify}
          onClick={() => canVerify && onVerify(code)}
        >
          Verify & Continue
        </button>

        <div className="text-center text-sm text-gray-500 mt-3">
          Didn't receive code? <button className="text-orange-600 font-semibold">Resend OTP</button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
