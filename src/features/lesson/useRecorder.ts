import { useEffect, useRef, useState } from 'react';

/** Minimal microphone recorder (MediaRecorder). Works in Safari ≥ 14.5 and all modern browsers. */
export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const rec = useRef<MediaRecorder | null>(null);
  const supported = typeof window !== 'undefined' && 'MediaRecorder' in window && !!navigator.mediaDevices?.getUserMedia;

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url);
  }, [url]);

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const r = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      r.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      r.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        setUrl(URL.createObjectURL(new Blob(chunks, { type: r.mimeType })));
        setRecording(false);
      };
      rec.current = r;
      r.start();
      setRecording(true);
    } catch {
      setError('Kein Mikrofonzugriff. Bitte in den Einstellungen erlauben.');
    }
  };
  const stop = () => rec.current?.state === 'recording' && rec.current.stop();
  const playBack = () => url && new Audio(url).play();
  const reset = () => setUrl(null);
  return { supported, recording, url, error, start, stop, playBack, reset };
}
