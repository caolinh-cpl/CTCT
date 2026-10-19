# CAT CHAOS

A six-second vertical reel opener featuring five illustrated cats in a playful cartoon brawl. Built with Remotion, React, TypeScript and local SVG artwork.

## Finished outputs

- [MP4 video](cat-chaos/deliverables/cat-chaos.mp4)
- [Preview image](cat-chaos/deliverables/preview.png)
- [Composition source](cat-chaos/src/Root.tsx)

Video: 1080 × 1920 (9:16), 30 fps, 180 frames / 6 seconds, H.264 MP4. Silent, ready for music or sound effects in a reel editor.

## Develop

Requires Node.js 22 or newer and npm.

```bash
cd cat-chaos
npm ci
npm start
```

Select `CatChaos` in Remotion Studio. Use the existing checkout; no additional Git worktree is needed.

## Validate and export

```bash
cd cat-chaos
npm run check
npx remotion render src/index.ts CatChaos deliverables/cat-chaos.mp4
npx remotion still src/index.ts CatChaos deliverables/preview.png --frame=85
```

If Chromium is installed locally, add `--browser-executable=/usr/bin/chromium` to render/still commands. This was the browser used to validate and export in the cloud environment. Otherwise Remotion downloads its supported Chrome Headless Shell on first use.

## Animation timing

- 0–1.35 s: five different cats spring into frame beneath the title.
- 1.35–4.15 s: circling cats, swiping paws, dust puffs and alternating MEOW!/POW! lettering.
- 4.15–6 s: cats settle into a lineup and THE PAW-BRAWL BEGINS appears.

No API keys, external media, or runtime services are required. Dependencies are pinned in the npm lockfile. Generated dependencies and caches are excluded from Git; finished deliverables are included.
