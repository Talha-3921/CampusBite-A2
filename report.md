# CS4032 Assignment 02 Report

## Project

**Business:** CampusBite Islamabad  
**Audience:** University students and young professionals in Islamabad and Wah Cantt  
**Primary task:** Browse the menu, search and filter items, view details, build a cart, and complete a simulated checkout.

## Evidence and Problem Analysis

The assignment identified three user-facing problems:

1. The Subway menu is locked behind location selection, preventing users from browsing or comparing options first.
2. Some restaurant flows force users through a fake order or setup step before showing the menu.
3. Gateway Grill's PDF menu is difficult to use on mobile because it requires download, zoom, and scrolling.

The original screenshots supplied with this assignment document these issues:

- `issue 1 Menu locked behind location selection.png`
- `issue 2 Forced to start a fake order just to see the menu.png`
- `issue 3 PDF menus that require download + zoom-scroll on mobile.png`

## Locked Business Decisions

### 1. Always-visible menu

CampusBite will show the complete HTML menu immediately on the browse page. No location, store, or start-order gate will be required.

### 2. No forced order path

Users may browse, search, filter, open item details, and add items to the cart without completing a formal order. Checkout begins only when the user explicitly chooses it.

### 3. HTML menu instead of PDF

The menu is implemented as responsive HTML cards. It is searchable, filterable, sortable, and usable on mobile without downloads or PDF zooming.

These decisions are also recorded verbatim in `DECISIONS.md`.

## Menu

The application will use exactly these 12 items:

| Item | Price |
|---|---:|
| Classic Chicken Wrap | Rs. 450 |
| Spicy Beef Bowl | Rs. 520 |
| Veggie Protein Bowl | Rs. 480 |
| Chicken Shawarma Plate | Rs. 550 |
| Egg & Cheese Breakfast Wrap | Rs. 380 |
| Grilled Paneer Salad | Rs. 420 |
| Mini Burger Combo | Rs. 490 |
| Weekly Student Bundle (5 meals) | Rs. 2,100 |
| Protein Smoothie | Rs. 320 |
| Loaded Fries | Rs. 350 |
| Chicken Tikka Rice Bowl | Rs. 510 |
| Falafel Wrap | Rs. 430 |

## Operating Rules

### Availability

A maximum of 8 units of any single menu item may be added to one order. Quantity controls will be capped at 8 and display a clear limit message.

### Bundle eligibility

Vegetarian and non-vegetarian items will not be mixed inside a Weekly Student Bundle. The bundle will enforce one dietary style consistently.

### Pricing

Delivery will require a minimum subtotal of Rs. 800. Collection will have no minimum. The checkout interface will show the remaining delivery amount when applicable.

## Technical Implementation

- React with Vite
- React Router for browse, details, cart, checkout, and confirmation routes
- Plain CSS for responsive layouts
- Local JavaScript or JSON menu data
- Async mock loader for loading, error, retry, and empty states
- React context plus localStorage for cart persistence
- Controlled checkout form and explicit validation messages
- Automated Node tests for the maximum quantity rule

## Accessibility and Responsiveness

The completed interface includes semantic landmarks, associated form labels, visible keyboard focus states, readable mobile layouts at 390 px, and usable controls for pointer and keyboard users.

## Verification Checklist

- [x] Full menu visible immediately
- [x] No location gate
- [x] No forced start-order step
- [x] Pure HTML menu
- [x] Search, filter, and sort work
- [x] Item details and invalid-ID state work
- [x] Cart persists in localStorage
- [x] Quantity is capped at 8
- [x] Bundle dietary styles cannot mix
- [x] Delivery minimum is enforced at Rs. 800
- [x] Collection has no minimum
- [x] Checkout and confirmation flows work
- [x] 390 px mobile layout is readable
- [x] Automated maximum-quantity test passes

## How to Run

```powershell
npm install
npm run dev
```

For a production build:

```powershell
npm run build
npm run preview
```
