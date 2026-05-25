import { useEffect, useRef } from "react";

// Lightweight canvas-based audio visualizer. When given an HTMLAudioElement,
// it draws an animated waveform synced to the audio frequency data.
export function AudioVisualizer({
  audio,
  playing,
  coverUrl,
}: {
  audio: HTMLAudioElement | null;
  playing: boolean;
  coverUrl?: string | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audio || !playing) return;
    let cancelled = false;

    const setup = async () => {
      try {
        if (!ctxRef.current) {
          const AC = (window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
          const ctx = new AC();
          ctxRef.current = ctx;
          const src = ctx.createMediaElementSource(audio);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 256;
          src.connect(analyser);
          analyser.connect(ctx.destination);
          analyserRef.current = analyser;
        }
        if (ctxRef.current.state === "suspended") await ctxRef.current.resume();

        const canvas = canvasRef.current;
        const analyser = analyserRef.current;
        if (!canvas || !analyser || cancelled) return;

        const data = new Uint8Array(analyser.frequencyBinCount);
        const c = canvas.getContext("2d");
        if (!c) return;

        const draw = () => {
          if (cancelled) return;
          rafRef.current = requestAnimationFrame(draw);
          const w = canvas.width;
          const h = canvas.height;
          analyser.getByteFrequencyData(data);
          c.clearRect(0, 0, w, h);

          const bars = 64;
          const step = Math.floor(data.length / bars);
          const bw = w / bars;
          const grad = c.createLinearGradient(0, 0, 0, h);
          grad.addColorStop(0, "rgba(240, 215, 140, 0.95)");
          grad.addColorStop(1, "rgba(201, 168, 76, 0.4)");
          c.fillStyle = grad;

          for (let i = 0; i < bars; i++) {
            const v = data[i * step] / 255;
            const bh = Math.max(2, v * h * 0.85);
            const x = i * bw + 1;
            const y = (h - bh) / 2;
            c.fillRect(x, y, bw - 2, bh);
          }
        };
        draw();
      } catch (e) {
        console.warn("Visualizer error", e);
      }
    };
    setup();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [audio, playing]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {coverUrl && (
        <>
          <img
            src={coverUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-50 scale-110"
          />
          <img
            src={coverUrl}
            alt=""
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl object-cover shadow-2xl ring-1 ring-gold/30"
          />
        </>
      )}
      {!coverUrl && <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-black" />}
      <canvas
        ref={canvasRef}
        width={400}
        height={120}
        className="absolute inset-x-0 bottom-32 mx-auto h-28 w-[90%] max-w-md"
      />
    </div>
  );
}