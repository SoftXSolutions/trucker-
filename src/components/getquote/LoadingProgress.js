import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

const LoadingProgress = ({ start = 75, end = 100, durationMs = 1800, onDone }) => {
  const [pct, setPct] = useState(start);

  useEffect(() => {
    const steps = Math.max(1, Math.floor(durationMs / 60));
    const delta = (end - start) / steps;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setPct((p) => {
        const next = p + delta;
        return next >= end ? end : next;
      });
      if (i >= steps) {
        clearInterval(id);
        setTimeout(() => onDone && onDone(), 400);
      }
    }, 60);
    return () => clearInterval(id);
  }, [start, end, durationMs, onDone]);

  return (
    <div className="py-10">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow">🚚</div>
        </div>
        <div className="text-center text-gray-800 font-semibold">Retrieving matching movers…</div>
        <div className="text-center text-gray-500 text-sm mb-6">Analyzing your details to show the best options</div>
        <ProgressBar percent={Math.round(pct)} label="" />
      </div>
    </div>
  );
};

export default LoadingProgress;
