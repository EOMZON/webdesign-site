# Webdesign Site

Static style-to-site atlas for `webdesign.zondev.top`.

## Purpose

- aggregate external real-world website references, not Zon's current sites
- help non-designers using AI move from "I want this feeling" to an actual site direction
- separate `visual family` choices from `information / interaction` structure
- keep a neutral black/white shell so the atlas can hold many directions
- give both humans and agents reusable prompt DNA, borrow / avoid notes, and scenario mapping

## Build

```bash
cd /Users/zon/Desktop/CreationOS/webdesign-site
npm run build
```

Output goes to `dist/`.

## Export skills

```bash
npm run export:skills
```

This command syncs generated style skills into the sibling repo at `../design-skills`.

Important:

- it writes into another repository
- it refreshes `styles/` based on the current atlas catalog
- it should be run intentionally after checking the current style set, not as an invisible side effect
