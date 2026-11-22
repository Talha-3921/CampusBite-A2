# Frontend Decisions

## Decision 1 – Always-visible menu (fixes location gate)

**Problem**
On Subway (order.subway.com/en-us/locator) the full menu is locked behind location selection. Users who only want to browse or compare options cannot see anything until they pick a store.

**Decision**
The entire menu is freely browsable on the home/browse page with no location, store, or "start order" gate.

**Alternative**
Show a location picker first and only then reveal the menu (like Subway).

**Reason**
Students often want to check prices and options before deciding whether to order. Removing the gate reduces bounce and matches the main customer task of free browsing.

**Tradeoff**
We lose the ability to show real-time store-specific availability at the very first glance. Availability is still shown on the details page and cart.

**Code location**
`src/pages/Browse.jsx` + `src/data/menu.js`

**Evidence**
Screenshot of Browse page showing full searchable menu immediately on load. No location prompt appears.

---

## Decision 2 – No forced order path to view menu

**Problem**
Many restaurant sites (including Subway flow and common local sites) force users to "start an order" or enter details before they can see the full menu.

**Decision**
Users can browse, search, filter, open details, and even add items to cart without ever starting a formal order. The order only begins when they deliberately go to Checkout.

**Alternative**
Require users to click "Start Order" or select a fulfilment method before any menu items are interactive.

**Reason**
Students frequently compare options across multiple places. Forcing an order path creates friction and causes abandonment. Keeping browsing completely free supports the comparison task.

**Tradeoff**
Slightly more complex state management because cart and filters must work independently of the order flow.

**Code location**
`src/App.jsx` (routes), `src/context/CartContext.jsx`, `src/pages/Browse.jsx`

**Evidence**
User can open any item details and add to cart without any "Start Order" step. Screenshot of cart with items while still on Browse/Details routes.

---

## Decision 3 – HTML menu instead of PDF (mobile-friendly)

**Problem**
Many independent restaurants (example: Gateway Grill Lunch Menu PDF) only offer PDF menus. On mobile these require download + zoom/scroll, which is painful when the user is hungry.

**Decision**
All menu content is rendered as responsive HTML cards with search, filter, and sort. No PDF is used anywhere.

**Alternative**
Provide both an HTML version and a downloadable PDF.

**Reason**
Students almost always check menus on phones. Native HTML is readable, searchable, and accessible without extra steps, directly fixing the mobile friction.

**Tradeoff**
We lose the "print-ready" PDF that some users still expect. A simple "Print this page" browser action can still be used if needed.

**Code location**
`src/pages/Browse.jsx`, `src/components/MenuCard.jsx`, `src/data/menu.js`

**Evidence**
Screenshot of the menu on a 390 px viewport showing readable cards, filters, and prices with no zoom required.
