---
name: SUPERFAST Shop
description: A streetwear store built as a garment tag, with a drenched runtime-switchable field colour, die-cut paper tags, and one price-gun sticker ink.
colors:
  field: "#ff4d00"
  on-field: "#0b0b0b"
  paper: "#f7f4ec"
  ink: "#0b0b0b"
  sticker: "#d7ff3a"
  on-sticker: "#0b0b0b"
  muted: "#5b564c"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 15vw, 8.5rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "3rem"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Azeret Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  cell: "4px"
  sticker: "6px"
  control: "6px"
  pill: "9999px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  sticker:
    backgroundColor: "{colors.sticker}"
    textColor: "{colors.on-sticker}"
    rounded: "{rounded.sticker}"
    padding: "12px 20px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-line:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-field:
    textColor: "{colors.on-field}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  woven-label:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "4.8px 9.6px"
  size-cell:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.cell}"
    height: "44px"
    width: "44px"
  size-cell-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  text-field:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
---

# Design System: SUPERFAST Shop

## Overview

**Creative North Star: "The Hang Tag"**

The shop is a garment tag. The whole page is a drenched field of one loud colour, and everything you read or press sits on it as a physical retail object: a die-cut paper swing tag with a punched hole and string, a price-gun sticker, a black woven label, a stamped size cell, a barcode, a dashed stitch rule. Cards, panels, forms and empty states are all tags; photographs are not the container for the interface.

Density is quick and phone-first: heavy condensed uppercase display type for names and prices, a plain grotesk for reading, a mono face for small stamped labels. There are no gradients and no offset block shadows. The only depth is the soft drop shadow that lifts a tag off the field, and a small tilt on stickers.

The field colour is the one runtime variable. The user can switch palettes in Settings and the entire shop recolours; paper, ink and the tag material never change.

**Key Characteristics:**
- One drenched field colour behind every page, with off-white paper tags and ink-black print on top.
- One accent ink, the acid-yellow price-gun sticker, reserved for the primary action and price flags.
- Condensed 900-weight uppercase display type; tabular numerals for money.
- Die-cut clipped corners, punched hole, string; woven labels, stamped cells, barcodes and stitch rules as dividers.
- Flat colour only: no gradients, no hard offset shadows.

## Colors

A saturated field, a warm off-white paper, true-ish black ink, and one electric yellow-green sticker. The palette is held as six CSS variables and recoloured at runtime.

### Primary
- **Signal Orange Field** (`field`): the page background (html, body, scrollbar track, mobile theme-color). Default palette "Signal". Never used for body copy; text on it uses `on-field`.
- **Acid Price-Gun Sticker** (`sticker`): the sticker button, tape separators, and selection highlight text. The single accent ink; paired always with `on-sticker`.

### Neutral
- **Tag Paper** (`paper`): tag and card surfaces, and text on ink blocks.
- **Print Ink** (`ink`): text on paper, borders, outlines, focus ring, woven labels, tape, selection background, scrollbar thumb.
- **Field Ink** (`on-field`): text and outlines directly on the field. Black in Signal, white or paper in dark-field palettes.
- **Sticker Ink** (`on-sticker`): text on the sticker, always ink black.
- **Dye Brown Muted** (`muted`): secondary text on paper and input placeholders; 6.9:1 on paper. It is fixed and does not change with the palette.

### Runtime palette mechanism
`client/src/lib/theme.js` exports `PALETTES`, each defining `field`, `onField`, `sticker`, `onSticker`. `applyTheme()` writes `--field`, `--on-field`, `--sticker`, `--on-sticker` onto `document.documentElement`, sets `data-motion` and `data-texture`, and updates the theme-color meta. `--paper`, `--ink` and `--muted` are constants from `index.css`. Tailwind exposes them as `field`, `on-field`, `paper`, `ink`, `sticker`, `on-sticker`, `muted` utilities through `@theme inline`, so components always reference a role, never a hex.

Palettes in the build: Signal Orange (default, `#ff4d00`), Acid Yellow, Drop Red, Cobalt Blue, Cyber Lime, Hyper Violet, Bubble Pink, Concrete, Raw Canvas, Ink Black, plus Custom: a user hex whose `on-field` is chosen by luminance (threshold 0.28; ink if light, white if dark) and whose sticker is Signal on light fields and Acid on dark ones.

### Named Rules
**The Role-Not-Hex Rule.** Components consume `field`, `paper`, `ink`, `sticker` and their `on-` partners. A hard-coded hex in a component breaks every palette except the default.

**The One Sticker Rule.** The sticker colour marks the primary action or a price flag, one or two per view. Its rarity is what makes it read as a price-gun label.

**The Pair Rule.** Any new field or sticker colour ships with its readable partner (`on-field`, `on-sticker`) chosen by luminance; custom fields get this automatically via `readableOn`.

## Typography

**Display Font:** Big Shoulders Display (with Arial Narrow, sans-serif)
**Body Font:** Archivo (with system-ui, sans-serif)
**Label/Mono Font:** Azeret Mono (with ui-monospace, monospace)

All three are self-hosted variable woff2 files (latin and latin-ext subsets, weight 100 to 900, `font-display: swap`) from `client/src/assets/fonts`.

**Character:** A condensed, shouting garment-label headline over a plain, legible grotesk, with a typewriter-stamp mono for sizes and codes. Display is loud and body is quiet.

### Hierarchy
- **Display** (900, `clamp(3.25rem, 15vw, 8.5rem)` hero, other heroes `clamp(2.75rem, 7vw, 5.5rem)` and `clamp(3rem, 8vw, 6rem)`, line-height 0.92): the hang-tag shop name and page heroes.
- **Headline** (900, 3rem to 6rem, 0.92): section and page titles (`text-5xl` to `text-6xl` in the build).
- **Title** (900, 2.25rem, 0.92): tag titles, empty-state titles.
- **Body** (Archivo 400, 1rem, normal): reading text; `text-wrap: pretty`; `max-w-prose` where long.
- **Label** (Azeret Mono 600, 0.7rem to 0.75rem, 0.05em to 0.08em tracking, uppercase): form labels, woven labels, size cells, barcode captions.

Every `h1`, `h2`, `h3` and `.font-display` is automatically 900 weight, uppercase, 0.92 line-height, -0.01em tracking, balanced wrap.

### Named Rules
**The Tabular Price Rule.** Prices and counts use the `.num` utility (tabular numerals) so digits align in tags and carts.

**The Three Voices Rule.** Display for names and prices, Archivo for sentences, Azeret Mono for stamped metadata. Do not set sentences in display or mono.

## Layout

Phone-first. Pages sit in a centred container, mostly `max-w-7xl`, with `max-w-md` and `max-w-3xl` for narrow tag forms and empty states. Breakpoint variants are Tailwind's (`sm:` is the dominant step, `lg:` for the multi-column layouts). The field fills the full bleed; tags are the contained objects. The home hero is one oversized tag at left-centre (near full width on mobile, about 60% on desktop) with a search input on the string above and category tags along the bottom edge.

Spacing is Tailwind's 4px scale; the observed rhythm is `gap-1.5` for stamped cell runs, `gap-2` and `gap-4` for related groups, `gap-8` between major blocks, and `py-3` button and field padding. Horizontal overflow is clipped on `html` and `body`.

## Elevation & Depth

Depth is flat colour layering plus one soft lift. A tag floats on the field by a diffuse drop shadow; nothing else has a shadow.

### Shadow Vocabulary
- **Tag lift** (`filter: drop-shadow(0 10px 14px rgb(0 0 0 / 0.22))`): applied on `.tag-wrap`, which surrounds every tag, because the tag's `clip-path` would clip a `box-shadow`.

### Named Rules
**The Wrapper Rule.** A tag is always `Tag` (wrapper plus clipped surface). Never apply `box-shadow` to a clipped element.

**The No-Block-Shadow Rule.** The system has no offset block shadows and no gradients. Hover feedback is a colour swap or a 2px lift, not a shadow.

## Shapes

Silhouettes come from retail hardware. Tags have clipped top corners (18px cut, `--cut`) and square bottom corners, with an optional 8px punched hole at 50% / 24px and a 2px ink string rising 54px above. Stickers are 6px rounded and tilted (`--tilt`, default -2deg). Controls are 6px (`rounded-md`); stamped size cells are 4px; a few circular chips use full radius. Borders are 2px ink. Dividers are the dashed stitch rule (2px dashed, 55% opacity), barcodes, care-symbol icons, or the scrolling black tape.

## Components

### Buttons
- **Shape:** 6px rounded, `px-5 py-3`, bold, `transition-all 200ms`, `active:translate-y-px`, 50% opacity when disabled; a busy state swaps the label to "Working...".
- **Sticker (primary action):** acid sticker, tilted, display type at `text-xl`, lifts 2px on hover.
- **Ink:** black woven-label button, paper text, hovers to 85% ink. The default variant.
- **Line:** 2px ink outline on paper; hover fills with ink.
- **Field:** 2px `on-field` outline for use directly on the field colour; hover fills with `on-field`.
- **Focus:** global 3px ink outline with 3px offset on `:focus-visible`.

### Tags / Containers
The `Tag` surface is used for every card, panel and form. Paper background, ink text, clipped corners, optional hole and string, soft lift via its wrapper. Empty states are tags too (`EmptyTag`): a row of ghost size cells, a display title, one line of muted copy, one action.

### Size run
Stamped mono cells, 44px square at default and 28px at small, 4px radius, 2px ink border. Selected is filled ink with paper text; sold-out is a dashed, faded, struck-through ghost cell that stays drawn and is disabled. Rendered as a `radiogroup`.

### Woven label
Small black block with paper mono uppercase text and a faint horizontal weave stripe; used for categories, status and metadata.

### Inputs / Fields
- **Style:** 2px ink border, 6px radius, `bg-white/60`, `px-3.5 py-3`; label above in mono uppercase; hint in muted `text-sm`.
- **Focus:** background goes to solid white plus the global ink focus ring.
- **Placeholder:** muted at full opacity.

### Tape and Barcode
Tape is a looping black band of display words separated by sticker-colour slashes (38s linear loop, hidden from assistive tech, stopped under reduced motion). Barcode is a decorative deterministic bar set with a mono caption; not scannable.

### Motion
Ease is `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo). Page recolour transitions over 0.3s. Tags enter with a 0.7s drop-in from -28px with a slight rotation; hung tags may sway on a 6s ease-in-out swing. Settings has a motion toggle (`data-motion="reduced"` collapses all animation and transition durations) and `prefers-reduced-motion` stops tape and swing. An optional multiply print-grain overlay on the field (9% opacity) is toggled by `data-texture`.

## Do's and Don'ts

### Do:
- **Do** build every new surface as a Tag on the field: paper, ink text, clipped corners, wrapper drop shadow.
- **Do** make the one primary action per view a Sticker button.
- **Do** reference colour roles (`bg-field`, `text-on-field`, `bg-paper`, `text-ink`, `bg-sticker`) so all palettes and Custom work.
- **Do** keep secondary text on paper at `muted` (6.9:1) and use `on-field` for anything directly on the field.
- **Do** show sold-out and empty states as ghost cells that stay drawn.
- **Do** respect `data-motion="reduced"` and `prefers-reduced-motion` for any new animation.

### Don't:
- **Don't** use gradients or offset block shadows.
- **Don't** hard-code hex values in components; the palette changes at runtime.
- **Don't** set body text on the field in `ink` or `muted`; light-field and dark-field palettes need `on-field`.
- **Don't** make photo cards the container for interface; imagery sits inside a tag, never replaces it.
- **Don't** set sentences in the display or mono face.
- **Don't** put a `box-shadow` on a clipped tag; shadow the wrapper with `drop-shadow`.
