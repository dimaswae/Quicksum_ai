import { useState, useRef, useCallback } from 'react';
import api from '../services/api';

const LOADING_STAGES = [
  { message: 'Menganalisis konten Anda...', minDuration: 0 },
  { message: 'Mengekstrak ide-ide kunci...', minDuration: 2000 },
  { message: 'Menyusun ringkasan...', minDuration: 4000 },
  { message: 'Menyiapkan hasil...', minDuration: 6000 },
];

const DEMO_SUMMARY = `Menjaga lingkungan kini menjadi kebutuhan mendesak akibat perubahan iklim global. Kita bisa memulai perubahan besar dari langkah kecil yang konsisten.Kurangi plastik sekali pakai, pilah sampah, dan belilah produk lokal. Gunakan transportasi umum atau berjalan kaki untuk mengurangi emisi. Adaptasi ini butuh proses, namun setiap aksi nyata sangat berarti bagi bumi.`;

export default function useSummarize() {
  const [result, setResult] = useState(DEMO_SUMMARY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const stageTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  const clearStageTimer = useCallback(() => {
    if (stageTimerRef.current) {
      stageTimerRef.current.forEach(clearTimeout);
      stageTimerRef.current = null;
    }
  }, []);

  const startStagedMessages = useCallback(() => {
    clearStageTimer();
    startTimeRef.current = Date.now();
    const timers = [];

    LOADING_STAGES.forEach((stage, i) => {
      if (i === 0) {
        setLoadingMessage(stage.message);
      } else {
        const timer = setTimeout(() => {
          setLoadingMessage(stage.message);
        }, stage.minDuration);
        timers.push(timer);
      }
    });

    stageTimerRef.current = timers;
  }, [clearStageTimer]);

  async function summarize(text, length) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    startStagedMessages();

    try {
      const response = await api.post('/api/summarize', { text, length });
      setResult(response.data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      clearStageTimer();
      setLoadingMessage('');
      setIsLoading(false);
    }
  }

  function reset() {
    clearStageTimer();
    setResult(null);
    setIsLoading(false);
    setError(null);
    setLoadingMessage('');
  }

  return { result, isLoading, error, loadingMessage, summarize, reset };
}
