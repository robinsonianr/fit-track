# fit-track — Style Reference

> paper check-in with an instrument beneath

**Theme:** light

FitTrack reads like a quiet check-in that reveals a precision instrument underneath — a daily workspace where adherence is what the user sees first and depth is what they discover. The interface is built on AeonikPro's geometric neutrality for the app's voice, and JetBrains Mono for every measurement the app shows — the typographic split is how the system expresses its two voices. Surfaces sit on a warm paper canvas (#FAFAF8), text holds in a near-black charcoal with a barely-perceptible cool tint, and tonal hierarchy comes from vellum-to-ash surface shifts rather than shadow stacks. A single deliberate indigo (#5B5BD6) punctuates interactive moments — buttons, focus rings, the active state of a routine — while saffron (#EAB308) appears only when something is earned: a personal record, a closed week, a milestone reached. Cards have softened corners, borders sit at hairline weight (#D4D6D2) where they exist at all, and chrome is minimal — the navigation is a top bar without ornament, the primary CTA sits where the eye lands, and the rest is data given room to breathe. The whole system reads as warm, deliberate, and engineered — calm to glance at, precise to commit to.

## Tokens — Colors

| Name           | Value     | Token                    | Role                                                                                                                                                                                                       |
|----------------|-----------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Paper Canvas   | `#FAFAF8` | `--color-paper-canvas`   | Page background, default surface — warm off-white that reads as paper rather than screen;                                                                                                                  |
| Vellum Surface | `#F2F1ED` | `--color-vellum-surface` | Elevated card backgrounds, modal surfaces, dashboard panels lifted off the canvas — a half-step deeper than Paper Canvas, warm enough to feel continuous with the page                                     |
| Ash Inset      | `#E8E7E2` | `--color-ash-inset`      | Nested surfaces within cards, table row alternation, subtle surface differentiation — used when a third tonal level is needed without breaking the warm-neutral hierarchy                                  |
| Charcoal Ink   | `#0F1411` | `--color-charcoal-ink`   | Primary text, headings, navigation labels, dominant borders, primary action fills — near-black with a barely-perceptible cool-green tint that distinguishes it from pure #000                              |
| Smoke Ink      | `#3F4441` | `--color-smoke-ink`      | Secondary text, body emphasis, subdued labels — a warm dark gray for hierarchy without contrast loss against Charcoal Ink                                                                                  |
| Pewter Mute    | `#6B6F6A` | `--color-pewter-mute`    | Tertiary text, de-emphasized metadata, placeholder copy, inactive states — the quietest readable text tone in the system                                                                                   |
| Linen Border   | `#D4D6D2` | `--color-linen-border`   | Hairline borders, dividers, section separators — barely visible 1px structural lines; the default border tone across cards and dividers                                                                    |
| Pewter Border  | `#B4B6B2` | `--color-pewter-border`  | Emphasized borders, hover-state outlines, focus-adjacent structures — used when a stronger structural line is needed without escalating to ink                                                             |
| Indigo Signal  | `#5B5BD6` | `--color-indigo-signal`  | Primary accent — interactive elements, active states, focus rings, primary action fills; the single cool chromatic gesture that signals interactivity across an otherwise warm neutral system              |
| Indigo Press   | `#4747C2` | `--color-indigo-press`   | Hover and pressed states for primary actions — a darker, slightly more saturated indigo reserved for interaction feedback                                                                                  |
| Indigo Wash    | `#EEEEFB` | `--color-indigo-wash`    | Pale indigo backgrounds for accent-adjacent surfaces — selected rows, hover washes on interactive cards, focus-state backgrounds where full Indigo Signal would overwhelm                                  |
| Indigo Veil    | `#C7C7F2` | `--color-indigo-veil`    | Mid-tone indigo for de-emphasized accent uses — disabled primary buttons, secondary accent borders, the in-between state between Wash and Signal                                                           |
| Saffron Mark   | `#EAB308` | `--color-saffron-mark`   | Celebration accent — PR moments, milestone surfaces, completion states, chart annotations marking achievements; reserved for rare moments of forward momentum, never for ordinary interactions             |
| Saffron Press  | `#CA8A04` | `--color-saffron-press`  | Darker saffron for hover or active states on celebration surfaces — used only when celebration content is interactive (rare)                                                                               |
| Saffron Wash   | `#FEF9C3` | `--color-saffron-wash`   | Pale saffron backgrounds for celebration-adjacent surfaces — milestone-modal backgrounds, PR-row highlights, softer celebration moments where full Saffron Mark would shout                                |
| Moss Success   | `#4F7A3E` | `--color-moss-success`   | Semantic success — completed states that aren't celebrations (workout marked done, save confirmed, sync complete); the quieter cousin of Saffron Mark, used for routine completion rather than achievement |
| Rust Warning   | `#C2410C` | `--color-rust-warning`   | Semantic warning — overload signals, deload prompts, recovery alerts; deliberately differentiated from Saffron Mark to prevent celebration/warning confusion                                               |
| Brick Danger   | `#991B1B` | `--color-brick-danger`   | Semantic danger — destructive actions, injury flags, irreversible warnings; used sparingly and only where the consequence justifies the visual weight                                                      |

## Tokens — Typography

### AeonikPro — Primary typeface across all UI · `--font-aeonikpro`

- **Substitute:** Inter, Satoshi, General Sans, system-ui, sans-serif
- **Weights:** 400, 500
- **Sizes:** 16, 18, 21, 24, 32, 36, 72, 101
- **Line height:** 1.0 at hero (72-101px), 1.1 at headings (32-36px), 1.25 at card titles (24px), 1.5 at body (16-18px), 1.4 at small UI (14px)
- **Letter spacing:** -0.025em at 72-101px, -0.012em at 32-36px, -0.006em at 24px, normal at 18-21px, +0.010em at 16px body, +0.020em at 14px small UI
- **OpenType features:** `"dlig" on, "ss02" on, "ss08" on`
- **Role:** Primary typeface across all UI surfaces — body (16-18px/400), navigation (16px/500), card titles (24-32px/500), section headings (36px/500), hero display (72-101px/400-500). Carries the *companion voice* of the app. The geometric proportions and `ss02`, `ss08` stylistic alternates give the system its engineering-precise voice — ss08 enables a more open 'a' and 'e', ss02 a distinctive 'g'. Every surface where the app is *talking to the user* — greeting, labels, prose, navigation, buttons — renders in AeonikPro.

### JetBrains Mono — Numerical and data-display typeface · `--font-mono`

- **Substitute:** "SF Mono", "Cascadia Mono", "Roboto Mono", "Menlo", "Consolas", monospace
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 16, 24, 32, 48, 56, 72, 101
- **Line height:** 1.0 at hero (56-101px), 1.1 at large readout (32-48px), 1.2 at medium (24px), 1.4 at table cells (14-16px), 1.5 at small data labels (12px)
- **Letter spacing:** -0.015em at 56-101px, -0.008em at 32-48px, normal at 16-24px, +0.005em at 12-14px
- **OpenType features:** `"calt" off, "liga" off, "tnum" on, "zero" on, "ss01" on, "ss02" on, "ss19" on, "ss20" on`
- **Role:** Reserved for *measurement and data display* — the tool voice of the app. Every surface where the app is *showing the user a number that measures their training* renders in JetBrains Mono. Used at: hero metric readouts (DuotoneCard adherence count, Volume Lifted), workout timers, set/rep entries, weight displays, 1RM estimates, table cells containing numerical data, chart axis labels, PR celebrations, percentage breakdowns, date/time stamps. Never used for prose, navigation, or labels — those are AeonikPro's territory. The strict role separation is how the typography expresses the companion-vs-tool architecture: if the user is reading words, it's AeonikPro; if the user is reading a measurement, it's JetBrains Mono.

### Type Scale (AeonikPro — companion voice)

| Role       | Size  | Line Height | Letter Spacing | Token               |
|------------|-------|-------------|----------------|---------------------|
| label      | 12px  | 1.5         | +0.020em       | `--text-label`      |
| small      | 14px  | 1.4         | +0.020em       | `--text-small`      |
| body       | 16px  | 1.5         | +0.010em       | `--text-body`       |
| body-lg    | 18px  | 1.5         | 0              | `--text-body-lg`    |
| card-title | 24px  | 1.25        | -0.006em       | `--text-card-title` |
| subheading | 32px  | 1.1         | -0.012em       | `--text-subheading` |
| heading    | 36px  | 1.1         | -0.012em       | `--text-heading`    |
| hero       | 72px  | 1.0         | -0.025em       | `--text-hero`       |
| display    | 101px | 1.0         | -0.025em       | `--text-display`    |

### Mono Scale (JetBrains Mono — tool voice)

| Role        | Size  | Line Height | Letter Spacing | Token                    |
|-------------|-------|-------------|----------------|--------------------------|
| data-label  | 12px  | 1.5         | +0.005em       | `--text-mono-label`      |
| table       | 14px  | 1.4         | +0.005em       | `--text-mono-table`      |
| data-body   | 16px  | 1.5         | 0              | `--text-mono-body`       |
| data-medium | 24px  | 1.2         | 0              | `--text-mono-medium`     |
| data-large  | 32px  | 1.1         | -0.008em       | `--text-mono-large`      |
| data-xl     | 48px  | 1.1         | -0.008em       | `--text-mono-xl`         |
| readout     | 56px  | 1.0         | -0.015em       | `--text-mono-readout`    |
| readout-lg  | 72px  | 1.0         | -0.015em       | `--text-mono-readout-lg` |
| readout-xl  | 101px | 1.0         | -0.015em       | `--text-mono-readout-xl` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** moderately tight (daily-use application context)

### Spacing Scale

| Name | Value | Token          |
|------|-------|----------------|
| 4    | 4px   | `--spacing-4`  |
| 8    | 8px   | `--spacing-8`  |
| 12   | 12px  | `--spacing-12` |
| 16   | 16px  | `--spacing-16` |
| 24   | 24px  | `--spacing-24` |
| 32   | 32px  | `--spacing-32` |
| 48   | 48px  | `--spacing-48` |
| 64   | 64px  | `--spacing-64` |
| 96   | 96px  | `--spacing-96` |

### Border Radius

| Element    | Value  | Token                 |
|------------|--------|-----------------------|
| badges     | 4px    | `--radius-badges`     |
| inputs     | 8px    | `--radius-inputs`     |
| buttons    | 8px    | `--radius-buttons`    |
| cards      | 12px   | `--radius-cards`      |
| modals     | 16px   | `--radius-modals`     |
| hero-cards | 20px   | `--radius-hero-cards` |
| pills      | 9999px | `--radius-pills`      |
| avatar     | 9999px | `--radius-avatar`     |

## Layout

| Property                  | Value  |
|---------------------------|--------|
| Page max-width            | 1360px |
| Section gap               | 48px   |
| Card padding              | 24px   |
| Element gap               | 16px   |
| Page padding (horizontal) | 40px   |

## Components

### TopBar
**Role:** Primary application chrome

Fixed top bar on Paper Canvas. Height 72px. Horizontal padding 40px. Three regions: left holds the wordmark (AeonikPro 18px weight 500 Charcoal Ink, optional icon mark); center holds the pill navigation (Dashboard / Workouts / History / Profile in AeonikPro 16px weight 500, active state with Indigo Wash background and Indigo Signal text, 9999px pills); right holds search input, primary "Start workout" button, and avatar with dropdown. Hairline Linen Border below the bar separates it from the page content. No background fill — sits directly on the Paper Canvas.

### Pill Navigation Item
**Role:** Top-level navigation — inactive state

AeonikPro 16px weight 500 Smoke Ink on transparent background. 9999px border-radius (full pill). Padding 8px horizontal, 6px vertical. Active state: Indigo Wash (#EEEEFB) background fill, Indigo Signal text. Hover state: Vellum Surface background. The nav items collectively read as a single rounded capsule cluster, not a row of independent buttons.

### Primary Action Button
**Role:** Primary CTA — "Start workout," "Save," "Log a set"

AeonikPro weight 500 at 16px with letter-spacing +0.010em. Paper Canvas (#FAFAF8) text on Indigo Signal (#5B5BD6) background. 8px border-radius. Horizontal padding 20px, vertical padding 10px. Hover state: Indigo Press (#4747C2) background. No border, no shadow — the indigo carries the visual weight against the warm canvas.

### Secondary Action Button
**Role:** Secondary CTA — "Cancel," "View all," "See more"

AeonikPro weight 500 at 16px with letter-spacing +0.010em. Charcoal Ink text on transparent background with 1px Linen Border (#D4D6D2) border. 8px border-radius. Same padding rhythm as primary. Hover state: Vellum Surface (#F2F1ED) background fill. Used alongside the primary button when an action has a secondary path.

### Ghost Button
**Role:** Tertiary action — inline links, dismissive controls, low-priority actions

AeonikPro weight 500 at 16px. Indigo Signal text on transparent background. No border, no fill. Hover state: Indigo Wash (#EEEEFB) background. Used when an action exists but is subordinate to both primary and secondary CTAs.

### Badge
**Role:** Inline metadata — muscle groups, workout type, exercise category

Small pill with 4px border-radius (badges radius). Paper Canvas or Vellum Surface background. 1px Linen Border. Padding 6px horizontal, 2px vertical. Text in AeonikPro 12px weight 500, Smoke Ink, with letter-spacing +0.020em. Variants: "muscle" badges have transparent fill; "type" badges (Strength, Cardio, Recovery) have soft-tone fills using Indigo Wash or Saffron Wash for category distinction. Maximum two badges per content row to preserve calm.

### MetricCard
**Role:** Dashboard stat tile — workouts this week, calories burned, active minutes, supporting metrics

Vellum Surface (#F2F1ED) background with 12px border-radius. Padding 24px. Eyebrow label in AeonikPro 12px weight 500 Pewter Mute, uppercase tracking +0.020em. Primary value in JetBrains Mono 32-48px weight 500 Charcoal Ink, tabular figures, slashed zero. Trend delta (e.g. "+8%") in AeonikPro 14px weight 500, Moss Success for positive, Pewter Mute for neutral, Rust Warning for declining. Optional sparkline below value in Charcoal Ink at 1.5px stroke weight. No border — the Vellum Surface tonal shift carries the elevation.

### DuotoneCard (Hero Surface)
**Role:** The signature hero component — weekly adherence

Vellum Surface (#F2F1ED) background with 20px border-radius (hero-cards radius). Padding 32px. Contains: eyebrow label ("THIS WEEK") in AeonikPro 12px weight 500 Pewter Mute; the Adherence Hero Number (JetBrains Mono 56px weight 500, tabular figures, slashed zero, Indigo Signal in progress / Saffron Mark when complete); a horizontal progress fill bar below the number in Indigo Signal or Saffron Mark depending on completion state; a 7-day calendar grid (completed days filled with Indigo or Saffron, today outlined in Charcoal Ink, future days at Ash Inset); a quiet secondary line ("Tuesday is usually Pull Day 2") in AeonikPro 14px Smoke Ink at the bottom. Hairline Linen Border at 1px optional — used only when the card sits within a denser layout that needs the structural definition.

### Chart (Line / Area)
**Role:** Longitudinal data visualization — volume over time, weight per exercise, weekly trends

Paper Canvas or Vellum Surface card background, 12px border-radius. Line strokes in Charcoal Ink at 1.5px weight. Area fills (when used) in Indigo Wash at 60-80% opacity for primary series; Pewter Border at 40% opacity for secondary. Axis labels in JetBrains Mono 12px weight 400 Pewter Mute, tabular figures. Gridlines in Linen Border at 1px, sparse — every 4th tick at most. PR annotations as small Saffron Mark dots (4px diameter) at the relevant data point. No animations on initial load; chart renders in final state.

## Do's and Don'ts

### Do

- Use AeonikPro for everything the app *says* (labels, prose, navigation, buttons, titles) and JetBrains Mono for everything the app *shows as a measurement* (numbers, set counts, weights, timers, dates) — the typographic split is the system's most important rule
- Reserve Indigo Signal (#5B5BD6) for interactive elements only — buttons, focus rings, active states, primary actions — and never for purely decorative emphasis
- Reserve Saffron Mark (#EAB308) for moments the user has *earned* — PRs, milestones, weekly goals completed — and use it less than 5% of the time the user is in the app
- Build elevation through tonal surface shifts (Paper Canvas → Vellum Surface → Ash Inset) rather than shadow stacks — the system is border-driven and tone-driven, not shadow-driven
- Apply soft-but-disciplined corner radii: 8px on buttons and inputs, 12px on cards, 16px on modals, 20px on hero cards, full pill (9999px) only on navigation items and avatars
- Use hairline Linen Border (#D4D6D2) at 1px for structural definition — section dividers, table row separators, modal header rules — and only when the tonal hierarchy alone doesn't carry the structure
- Enable tabular figures and slashed zero on all JetBrains Mono numerical displays via `font-variant-numeric: tabular-nums slashed-zero` — numbers should never shift width during animations or updates
- Let the session timer stay reactive: nothing auto-starts, nothing auto-advances, nothing pre-empts the user's pace
- Keep the entry-state of every screen *quiet* — no celebratory animations on dashboard load, no count-ups on first paint, no badge nags on the TopBar; motion is reserved for interactions the user initiated

### Don't

- Don't use AeonikPro for measurements or JetBrains Mono for prose — the two-voice rule is structural; violating it collapses the architectural distinction between companion and tool layers
- Don't promote Saffron Mark to a primary action color — it loses its celebratory weight the moment it appears on a button or interactive surface
- Don't use Indigo Signal on celebration surfaces or Saffron Mark on interactive surfaces — the chromatic discipline is part of the design language
- Don't introduce drop shadows beyond `0 1px 2px rgba(15, 20, 17, 0.04)` for cards that absolutely need separation, and prefer no shadow at all — the system's elevation is tonal, not lit
- Don't use sharp corners (0-2px radius) anywhere — the softened-but-disciplined corner language is non-negotiable
- Don't add streak nags, "don't break the chain" UI, or compliance-pressure copy anywhere — the user is here because they want to be, not because the app guilted them
- Don't auto-progress weights, auto-fill suggested sets, or pre-select recommended workouts — the app suggests, never prescribes; the user is the author of every session
- Don't add social features, leaderboards, kudos, or comparison metrics — the product serves the individual user, not their relationship to other users
- Don't use celebratory animations on entry — celebration is for moments the user has earned, not for opening the app
- Don't use stock photography, illustrations, or decorative imagery — the system's visual language is typographic, chromatic, and tonal; imagery only enters as anatomical diagrams in the exercise-detail layer
- Don't introduce new chromatic accents beyond the locked palette — the indigo/saffron/semantic-color discipline is part of the identity
- Don't break the surface hierarchy: page content lives on Paper Canvas, cards live on Vellum Surface, nested elements on Ash Inset, hero-celebration surfaces use Saffron Wash. Mixing surfaces breaks the tonal logic
- Don't right-align body paragraphs or center body text — body content is always left-aligned; centering is reserved for hero headlines and quantitative readouts where symmetry serves the data

## Elevation

The system is **elevation-minimal by design**. Tonal surface shifts carry the hierarchy that shadows would in a typical system. Use the following only when tonal differentiation alone is insufficient (rare):

- **Cards on dense backgrounds:** `0 1px 2px rgba(15, 20, 17, 0.04)` — barely-visible separation only
- **Modal sheets:** No shadow on the modal itself; the dimmed scrim behind it (Charcoal Ink at 30% opacity) provides the layering signal
- **Floating elements (dropdowns, tooltips):** `0 2px 8px rgba(15, 20, 17, 0.06), 0 1px 2px rgba(15, 20, 17, 0.04)` — used only on transient floating UI that must clearly leave the document flow

The default is *no shadow*. Shadows are an exception that requires justification, not a default that requires opting out of.

## Surfaces

- **Paper Canvas** (`#FAFAF8`) — Page background, default surface; the dominant tone across the entire interface
- **Vellum Surface** (`#F2F1ED`) — Card and dashboard panel backgrounds; the elevated surface for most components
- **Ash Inset** (`#E8E7E2`) — Nested surfaces inside cards, alternating table rows, deeper tonal moments
- **Indigo Wash** (`#EEEEFB`) — Selected-row and active-state backgrounds for interactive surfaces
- **Saffron Wash** (`#FEF9C3`) — Celebration-adjacent surfaces — PR rows, milestone backgrounds, achievement contexts

## Imagery

The visual language is **typographic and tonal**, not photographic. There is no stock photography, no lifestyle imagery, no decorative illustration. The only image content in the system is:

- **Anatomical diagrams** on per-exercise detail pages — minimal line illustrations showing which muscle groups are engaged by an exercise. Stroke weight 1.5px, color Charcoal Ink, with muscle highlights in Indigo Wash or a tonal accent. Static, not animated.
- **Data visualizations** as the primary visual content — charts, sparklines, calendar grids, progress fills. The data *is* the imagery.

Icons are minimal, monoline, and monochromatic. Stroke weight 1.5px in Charcoal Ink or Smoke Ink. Icons use Lucide's icon set or equivalent geometric line library. Saffron Mark and Indigo Signal never fill icons — chromatic accent is reserved for surfaces, not glyphs. The system avoids emoji entirely.