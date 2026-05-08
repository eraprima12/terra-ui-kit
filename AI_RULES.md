# Glassmorphism Enterprise UI Kit — Detailed Components

# DataTable

## Design Style

Enterprise-grade adaptive glass table with:

- translucent layered surfaces
- sticky controls
- clean density
- soft hover states
- blur overlays
- responsive mobile transformation

---

# Desktop DataTable

## Structure

```txt id="mmb6k7"
┌─────────────────────────────────────┐
│ Toolbar                             │
│ Search | Filters | Export | Actions │
├─────────────────────────────────────┤
│ Sticky Header                       │
├─────────────────────────────────────┤
│ Scrollable Body                     │
├─────────────────────────────────────┤
│ Pagination Footer                   │
└─────────────────────────────────────┘
```

---

# DataTable Features

## Core Features

- Sorting
- Filtering
- Search
- Pagination
- Multi Select
- Bulk Action
- Export CSV/XLSX/PDF
- Sticky Header
- Sticky Columns
- Inline Edit
- Expandable Row
- Virtual Scroll
- Infinite Scroll

---

# DataTable Visual Rules

## Table Surface

```css id="um7gyq"
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

---

## Header Style

Headers must:

- remain sticky
- have stronger opacity
- slightly stronger blur
- subtle bottom border

---

## Row Hover

On hover:

- increase brightness
- increase opacity
- soft glow transition

Avoid:

- harsh background change

---

## Row Selection

Selected rows:

- use primary tint overlay
- show left accent indicator
- preserve readability

---

# DataTable States

## Loading

Use:

- skeleton rows
- shimmer animation

Never:

- blank white screen

---

## Empty State

Show:

- illustration
- clear messaging
- primary CTA

---

## Error State

Show:

- retry button
- soft danger surface
- concise explanation

---

# Mobile Adaptive DataTable

# IMPORTANT

Never use horizontal scrolling tables on mobile.

Transform into:

## Card Layout

```txt id="i2nnqg"
┌─────────────────┐
│ Customer Name   │
│ Order #20392    │
│ Status: Active  │
│ Amount: $1200   │
│ [Actions]       │
└─────────────────┘
```

---

## Mobile Features

- expandable cards
- swipe actions
- sticky FAB filters
- bottom sheet sorting
- collapsible metadata

---

# DataTable Toolbar

## Components

- Search Input
- Filter Button
- Date Range
- Export Button
- View Toggle
- Bulk Actions
- Density Selector

---

# Button System

# Variants

## Primary Button

Main CTA.

```css id="y9mrr9"
glass + primary tint
```

Use for:

- Save
- Submit
- Confirm

---

## Secondary Button

Lower emphasis.

---

## Ghost Button

Transparent surface.

Use for:

- toolbar actions
- inline actions

---

## Outline Button

Border only.

---

## Glass Button

Pure translucent button.

```css id="vzd2kg"
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(12px);
```

---

## Danger Button

For destructive actions.

Must:

- require confirmation
- use softer reds
- avoid aggressive colors

---

## FAB

Floating action button.

Mobile only:

- create
- add
- quick action

---

# Button States

## States

- Default
- Hover
- Active
- Focus
- Disabled
- Loading

---

## Loading Button

Use:

- inline spinner
- preserved width
- disabled interaction

---

# Icon Button

Use for:

- edit
- delete
- share
- menu

Must:

- have tooltip
- minimum touch target
- ripple/hover animation

---

# Toast System

# Types

- Success
- Error
- Warning
- Info
- Loading
- Promise

---

# Toast Position

## Desktop

Top-right floating stack.

## Mobile

Bottom-center.

---

# Toast Visual Style

```css id="5tsc5u"
background: rgba(20, 20, 20, 0.45);
backdrop-filter: blur(18px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

---

# Toast Features

- auto dismiss
- swipe dismiss
- action button
- queue stacking
- progress timer

---

# Promise Toast

```txt id="4f7svq"
Loading...
✓ Success
✕ Failed
```

---

# Popup / Modal System

# Modal Variants

## Dialog

Centered confirmation popup.

---

## Drawer

Slide from:

- left
- right

Used for:

- filters
- details
- settings

---

## Bottom Sheet

Mobile-first popup.

Use for:

- actions
- filters
- forms

---

## Fullscreen Modal

Complex workflows.

---

# Modal Visual Rules

Use:

- stronger blur
- stronger overlay
- elevated surface
- smooth scale animation

---

# Confirmation Popup

Must:

- clearly explain action
- highlight destructive actions
- have safe cancel button

---

# Context Menu

Use for:

- row actions
- table actions
- quick tools

Style:

- floating glass panel
- compact density

---

# Dropdown Menu

Must support:

- keyboard navigation
- icons
- separators
- nested menus

---

# Tooltip

Glass floating tooltip.

Must:

- appear quickly
- disappear softly
- avoid blocking UI

---

# Notification Center

## Features

- unread badge
- grouped notifications
- realtime updates
- action buttons

---

# Command Palette

```txt id="kr09x8"
⌘K
```

Supports:

- navigation
- actions
- search
- quick commands

---

# Form Components

## Inputs

- TextField
- Password
- Select
- MultiSelect
- DatePicker
- SearchField

---

# Input Visual Rules

```css id="aqom4l"
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.06);
```

---

# Loading System

## Components

- Spinner
- Skeleton
- Linear Progress
- Circular Progress

---

# Skeleton Rules

Must:

- mimic real layout
- animate subtly
- avoid flashy shimmer

---

# Sidebar

## Desktop

Floating glass sidebar.

---

## Mobile

Collapsible drawer or bottom nav.

---

# Dashboard Widgets

## Components

- KPI Cards
- Charts
- Activity Feed
- Calendar
- Tasks
- Recent Transactions

---

# Charts

Glass charts must:

- prioritize readability
- reduce excessive gradients
- maintain contrast

---

# Animations

## Use

- fade
- blur
- scale
- slide

---

## Avoid

- bounce
- elastic
- flashy transitions

---

# Accessibility

Must support:

- keyboard navigation
- screen readers
- reduced motion
- focus indicators
- touch targets

---

# AI Rules

```md id="i8u87h"
Use adaptive enterprise glassmorphism.

Desktop:

- floating glass surfaces
- translucent overlays
- sticky datatable controls

Mobile:

- transform tables into cards
- use bottom sheets
- use FABs for primary actions

Never use:

- hardcoded colors
- overly transparent surfaces
- unreadable blur
- horizontal scrolling tables on mobile

All components must support:

- dark mode
- responsive behavior
- semantic tokens
- accessibility
- loading states
- empty states
- error states
```
