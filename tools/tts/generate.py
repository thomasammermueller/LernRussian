#!/usr/bin/env python3
"""
Generates the app's audio files with Piper TTS (MIT, runs offline).

  pip install piper-tts                       # once
  npx vite-node tools/tts/collect.ts          # collect texts
  python3 tools/tts/generate.py --voices DIR  # DIR contains ru_RU-irina-medium.onnx, ru_RU-dmitri-medium.onnx

Voices: https://huggingface.co/rhasspy/piper-voices/tree/main/ru/ru_RU
Output: public/audio/<key>.m4a (AAC, mono) + src/content/audioManifest.json.
Existing files are kept, files no longer referenced are removed.
"""
import argparse, json, subprocess, sys, tempfile, wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TEXTS = ROOT / 'tools/tts/texts.json'
OUT = ROOT / 'public/audio'
MANIFEST = ROOT / 'src/content/audioManifest.json'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--voices', required=True, help='directory with Piper .onnx voices')
    ap.add_argument('--force', action='store_true', help='regenerate all files')
    args = ap.parse_args()

    from piper import PiperVoice, SynthesisConfig

    entries = json.loads(TEXTS.read_text())
    OUT.mkdir(parents=True, exist_ok=True)
    voices = {}
    # Slightly slower than default – this is for learners.
    cfg = SynthesisConfig(length_scale=1.12, noise_scale=0.6, noise_w_scale=0.7)
    made = 0
    for i, e in enumerate(entries):
        target = OUT / f"{e['key']}.m4a"
        if target.exists() and not args.force:
            continue
        v = e['voice']
        if v not in voices:
            voices[v] = PiperVoice.load(str(Path(args.voices) / f'ru_RU-{v}-medium.onnx'))
        with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
            with wave.open(tmp.name, 'wb') as wf:
                voices[v].synthesize_wav(e['tts'], wf, syn_config=cfg)
            subprocess.run(
                ['ffmpeg', '-loglevel', 'error', '-y', '-i', tmp.name,
                 '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,apad=pad_dur=0.15,loudnorm=I=-18:TP=-2',
                 '-ac', '1', '-ar', '22050', '-c:a', 'aac', '-b:a', '48k', '-movflags', '+faststart', str(target)],
                check=True)
        made += 1
        if made % 50 == 0:
            print(f'  {made} generated ({i + 1}/{len(entries)})', flush=True)

    keys = {e['key'] for e in entries}
    removed = 0
    for f in OUT.glob('*.m4a'):
        if f.stem not in keys:
            f.unlink()
            removed += 1
    present = sorted(f.stem for f in OUT.glob('*.m4a'))
    MANIFEST.write_text(json.dumps(present, indent=0) + '\n')
    size = sum(f.stat().st_size for f in OUT.glob('*.m4a')) / 1e6
    print(f'{made} generated, {removed} removed, {len(present)} files, {size:.1f} MB')


if __name__ == '__main__':
    sys.exit(main())
