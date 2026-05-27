// Client-side audio + cover image → webm video using canvas + MediaRecorder.
// Renders a centered cover with a reactive frequency visualizer for the
// duration of the audio track and returns a webm Blob.
export async function audioToVideo(audioFile: File, coverFile: File): Promise<Blob> {
  if (typeof MediaRecorder === "undefined") {
    throw new Error("Your browser does not support video conversion. Try Chrome or Edge.");
  }

  const coverUrl = URL.createObjectURL(coverFile);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("Could not load cover image"));
    i.src = coverUrl;
  });

  const W = 720, H = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");

  const arrayBuf = await audioFile.arrayBuffer();
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ac = new AC();
  const decoded = await ac.decodeAudioData(arrayBuf.slice(0));
  const duration = decoded.duration;

  const source = ac.createBufferSource();
  source.buffer = decoded;
  const dest = ac.createMediaStreamDestination();
  const analyser = ac.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  analyser.connect(dest);

  const videoStream = canvas.captureStream(30);
  const tracks = [...videoStream.getVideoTracks(), ...dest.stream.getAudioTracks()];
  const stream = new MediaStream(tracks);

  const mime = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"]
    .find((m) => MediaRecorder.isTypeSupported(m)) ?? "video/webm";
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 2_500_000 });
  const chunks: Blob[] = [];
  rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  const done = new Promise<Blob>((resolve) => { rec.onstop = () => resolve(new Blob(chunks, { type: "video/webm" })); });

  const data = new Uint8Array(analyser.frequencyBinCount);
  let raf = 0;
  const start = performance.now();

  const draw = () => {
    raf = requestAnimationFrame(draw);
    const t = (performance.now() - start) / 1000;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    // blurred background
    ctx.save();
    ctx.filter = "blur(40px)";
    const bgScale = 1.2;
    ctx.drawImage(img, -W * 0.1, -H * 0.1, W * bgScale, H * bgScale);
    ctx.restore();
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, W, H);
    // centered cover with subtle pulse
    analyser.getByteFrequencyData(data);
    const pulse = 1 + Math.sin(t * 1.5) * 0.01;
    const size = 520 * pulse;
    const x = (W - size) / 2;
    const y = (H - size) / 2 - 100;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 40;
    ctx.beginPath();
    const r = 24;
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + size, y, x + size, y + size, r);
    ctx.arcTo(x + size, y + size, x, y + size, r);
    ctx.arcTo(x, y + size, x, y, r);
    ctx.arcTo(x, y, x + size, y, r);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, size, size);
    ctx.restore();
    // visualizer bars
    const bars = 48;
    const usable = W * 0.86;
    const bw = usable / bars;
    const startX = (W - usable) / 2;
    const baseY = H - 240;
    for (let i = 0; i < bars; i++) {
      const v = data[Math.floor((i * data.length) / bars)] / 255;
      const bh = Math.max(4, v * 240);
      ctx.fillStyle = `rgba(240,215,140,${0.5 + v * 0.5})`;
      ctx.fillRect(startX + i * bw + 2, baseY - bh / 2, bw - 4, bh);
    }
  };

  draw();
  rec.start(250);
  source.start();

  await new Promise((r) => setTimeout(r, Math.ceil(duration * 1000) + 300));

  try { source.stop(); } catch { /* noop */ }
  rec.stop();
  const blob = await done;
  cancelAnimationFrame(raf);
  try { await ac.close(); } catch { /* noop */ }
  URL.revokeObjectURL(coverUrl);
  return blob;
}

export function b64ToFile(b64: string, filename: string, mime = "image/png"): File {
  const bin = atob(b64);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  return new File([bytes], filename, { type: mime });
}

// Render an audio + multiple scene images into a Ken Burns-style music video
// with crossfades and a subtle beat-reactive bloom. Returns a webm Blob.
export async function audioToMusicVideo(
  audioFile: File,
  sceneImages: HTMLImageElement[],
): Promise<Blob> {
  if (typeof MediaRecorder === "undefined") {
    throw new Error("Your browser does not support video conversion. Try Chrome or Edge.");
  }
  if (sceneImages.length === 0) throw new Error("No scenes to render");

  const W = 720, H = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");

  const arrayBuf = await audioFile.arrayBuffer();
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ac = new AC();
  const decoded = await ac.decodeAudioData(arrayBuf.slice(0));
  const duration = decoded.duration;

  const source = ac.createBufferSource();
  source.buffer = decoded;
  const dest = ac.createMediaStreamDestination();
  const analyser = ac.createAnalyser();
  analyser.fftSize = 512;
  source.connect(analyser);
  analyser.connect(dest);

  const videoStream = canvas.captureStream(30);
  const stream = new MediaStream([...videoStream.getVideoTracks(), ...dest.stream.getAudioTracks()]);

  const mime = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"]
    .find((m) => MediaRecorder.isTypeSupported(m)) ?? "video/webm";
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 3_500_000 });
  const chunks: Blob[] = [];
  rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  const done = new Promise<Blob>((resolve) => { rec.onstop = () => resolve(new Blob(chunks, { type: "video/webm" })); });

  const sceneDuration = duration / sceneImages.length;
  const fadeDuration = Math.min(0.9, sceneDuration * 0.35);
  const data = new Uint8Array(analyser.frequencyBinCount);

  let raf = 0;
  const start = performance.now();

  // draw one scene with Ken Burns zoom/pan covering the full canvas
  const drawScene = (img: HTMLImageElement, progress: number, alpha: number) => {
    const zoomStart = 1.05;
    const zoomEnd = 1.22;
    const zoom = zoomStart + (zoomEnd - zoomStart) * progress;
    // cover-fit
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(W / iw, H / ih) * zoom;
    const dw = iw * scale, dh = ih * scale;
    // gentle pan
    const panX = (W - dw) / 2 + Math.sin(progress * Math.PI) * 30;
    const panY = (H - dh) / 2 - 40 + progress * 60;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, panX, panY, dw, dh);
    ctx.restore();
  };

  const draw = () => {
    raf = requestAnimationFrame(draw);
    const t = (performance.now() - start) / 1000;
    analyser.getByteFrequencyData(data);
    // bass average for reactive bloom
    let bass = 0;
    for (let i = 0; i < 16; i++) bass += data[i];
    bass = bass / (16 * 255);

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);

    const idx = Math.min(sceneImages.length - 1, Math.floor(t / sceneDuration));
    const localT = t - idx * sceneDuration;
    const progress = Math.min(1, localT / sceneDuration);

    drawScene(sceneImages[idx], progress, 1);

    // crossfade to next scene near the tail of this one
    if (idx < sceneImages.length - 1 && localT > sceneDuration - fadeDuration) {
      const fadeT = (localT - (sceneDuration - fadeDuration)) / fadeDuration;
      drawScene(sceneImages[idx + 1], 0, fadeT);
    }

    // beat-reactive vignette + bloom
    const grd = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.7);
    grd.addColorStop(0, "rgba(0,0,0,0)");
    grd.addColorStop(1, `rgba(0,0,0,${0.55 - bass * 0.25})`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    if (bass > 0.55) {
      ctx.fillStyle = `rgba(240,215,140,${(bass - 0.55) * 0.25})`;
      ctx.fillRect(0, 0, W, H);
    }

    // film grain — light, cheap
    const grain = ctx.createImageData(W, 16);
    for (let i = 0; i < grain.data.length; i += 4) {
      const v = (Math.random() * 30) | 0;
      grain.data[i] = grain.data[i + 1] = grain.data[i + 2] = v;
      grain.data[i + 3] = 14;
    }
    for (let y = 0; y < H; y += 16) ctx.putImageData(grain, 0, y);
  };

  draw();
  rec.start(250);
  source.start();

  await new Promise((r) => setTimeout(r, Math.ceil(duration * 1000) + 300));

  try { source.stop(); } catch { /* noop */ }
  rec.stop();
  const blob = await done;
  cancelAnimationFrame(raf);
  try { await ac.close(); } catch { /* noop */ }
  return blob;
}

export function loadImageFromB64(b64: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load generated image"));
    img.src = `data:image/png;base64,${b64}`;
  });
}