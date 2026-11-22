# CS4032 Assignment 02 — CampusBite Islamabad

**Course:** CS4032 Web Programming  
**Campus:** FAST-NUCES Islamabad  
**Semester:** Fall 2026  
**Assignment:** 02 — Business Website Development Using React

---

## 1. Student and Project Details

| Field | Detail |
|---|---|
| Student name | To be entered before submission |
| Roll number | To be entered before submission |
| Section | To be entered before submission |
| Business | CampusBite Islamabad |
| Repository | https://github.com/Talha-3921/CampusBite-A2 |
| Deployment | https://talha-3921.github.io/CampusBite-A2/ |
| Final application commit | `b53e22c50eae9db9f07b93b35d13727ba92a04b8` |

## 2. Business Profile

**Identity.** CampusBite Islamabad is a fictional campus meal service for students and young professionals.

**Offering.** The application provides 12 selectable meals and bundles, with prices in Pakistani rupees.

**Audience.** University students and young professionals around NUST, COMSATS, FAST, Wah Cantt, and nearby hostels.

**Operating area.** Delivery is intended for G-10, F-10, H-8, I-8, and Wah Cantt main areas. Collection is also available.

**Main customer task.** Browse freely, search and narrow the menu, open item details, change quantities, build a cart, complete checkout, and receive a clear confirmation.

**Business goal.** Reduce browsing friction and enable a complete simulated order without a location gate or forced order-start step.

### Menu

| # | Item | Price |
|---:|---|---:|
| 1 | Classic Chicken Wrap | Rs. 450 |
| 2 | Spicy Beef Bowl | Rs. 520 |
| 3 | Veggie Protein Bowl | Rs. 480 |
| 4 | Chicken Shawarma Plate | Rs. 550 |
| 5 | Egg & Cheese Breakfast Wrap | Rs. 380 |
| 6 | Grilled Paneer Salad | Rs. 420 |
| 7 | Mini Burger Combo | Rs. 490 |
| 8 | Weekly Student Bundle (5 meals) | Rs. 2,100 |
| 9 | Protein Smoothie | Rs. 320 |
| 10 | Loaded Fries | Rs. 350 |
| 11 | Chicken Tikka Rice Bowl | Rs. 510 |
| 12 | Falafel Wrap | Rs. 430 |

## 3. Operating Rules

### Rule 1 — Availability

- **Exact condition:** No single item may have a quantity above 8 in the order.
- **Communication:** The details quantity selector includes a message; the cart disables increases at 8 and displays “Maximum 8 of this item reached.”
- **When met:** Quantities from 1 to 8 remain selectable.
- **When broken:** The interface prevents a ninth unit; direct or restored data is clamped to 8.
- **Boundary case:** Quantity 8 is accepted and marked at the limit; quantity 9 is rejected or prevented.

### Rule 2 — Eligibility

- **Exact condition:** Vegetarian and non-vegetarian choices cannot be mixed inside a Weekly Student Bundle. A bundle selection has one dietary style, and incompatible regular cart items block completion.
- **Communication:** Bundle details show a vegetarian/non-vegetarian selection and the cart shows the bundle style.
- **When met:** A vegetarian bundle is compatible with vegetarian items; a non-vegetarian bundle is compatible with non-vegetarian items.
- **When broken:** A specific conflict alert is shown and checkout is blocked until the conflict is corrected.
- **Boundary case:** A bundle alone is valid. Adding an item of the opposite dietary style invalidates the cart until one choice is removed or changed.

### Rule 3 — Pricing and fulfilment

- **Exact condition:** Delivery requires a subtotal of at least Rs. 800. Collection has no minimum.
- **Communication:** Checkout shows the remaining delivery amount or confirms when the minimum is reached.
- **When met:** Collection always proceeds when the form is valid. Delivery proceeds only once the Rs. 800 minimum is reached.
- **When broken:** The form shows a specific remaining-amount message and blocks placement until the requirement is satisfied or collection is selected.
- **Boundary case:** Rs. 800 is accepted for delivery with Rs. 0 remaining; Rs. 799 leaves Rs. 1 remaining.

## 4. Reference-Site Investigation

### Problem 1 — Full menu locked behind location selection

- **Reference:** Subway, https://www.subway.com/en-us/locator
- **Affected task:** Browse and compare menu items before choosing a location.
- **Observed:** The reference flow asks for location information before exposing the useful menu. The supplied screenshot shows that a user cannot freely browse the full menu until the locator step is completed.
- **Business consequence:** Students may abandon if they only want to compare prices or dietary options.
- **CampusBite response:** `/` renders the complete HTML menu immediately. No location, store, or “start order” gate appears.
- **Evidence:** `issue 1 Menu locked behind location selection.png`

### Problem 2 — Forced order start before viewing the menu

- **Reference:** Subway online ordering, https://order.subway.com/
- **Affected task:** View the menu, open item information, and compare options.
- **Observed:** A forced order-start or fulfilment path appears before the user can freely interact with menu information.
- **Business consequence:** Passive comparison and repeat visits become slower, creating friction and possible abandonment.
- **CampusBite response:** Users browse, filter, sort, open details, and add items to the cart without deliberately starting a formal order.
- **Evidence:** `issue 2 Forced to start a fake order just to see the menu.png`

### Problem 3 — Mobile menu supplied as a PDF

- **Reference:** Gateway Bar and Grill PDF menu, https://gatewaybarandgrill.com/Documents/GWmenu.pdf
- **Affected task:** Read and compare menu items on a phone.
- **Observed:** A PDF requires download or zoom and scroll, making quick reading and filtering difficult on a small screen.
- **Business consequence:** Mobile users may miss details or leave because checking an item is slower than it should be.
- **CampusBite response:** Native HTML cards provide readable content, search, diet filtering, sorting, and responsive reflow.
- **Evidence:** `issue 3 PDF menus that require download + zoom-scroll on mobile.png`

## 5. Frontend Decisions

### Decision 1 — Always-visible menu

- **Problem:** The full menu is hidden behind location selection.
- **Decision:** `/` always displays the complete searchable menu.
- **Alternative:** Show a location picker before the menu.
- **Reason:** Freely browse and compare options matches the student customer task.
- **Tradeoff:** Live, store-specific availability is not shown in the first view.
- **Code location:** `src/pages/Browse.jsx`, `src/data/menu.js`
- **Evidence:** Desktop and 390 px screenshots show menu cards immediately with no location prompt.

### Decision 2 — No forced order path

- **Problem:** Viewing menu items requires an order-start step.
- **Decision:** Details and cart interactions are independent of checkout.
- **Alternative:** Require fulfilment selection before any menu interaction.
- **Reason:** Removing friction supports comparison and reduces abandonment.
- **Tradeoff:** Cart, filters, and order state must remain separate and consistent.
- **Code location:** `src/App.jsx`, `src/context/CartContext.jsx`, `src/pages/Browse.jsx`
- **Evidence:** Item details and cart routes are usable without a start-order screen.

### Decision 3 — HTML menu instead of PDF

- **Problem:** Mobile users must download and zoom a PDF.
- **Decision:** Render searchable, filterable HTML cards.
- **Alternative:** Offer a PDF as the primary or additional format.
- **Reason:** Native HTML is faster to read, search, and reflow on phones.
- **Tradeoff:** A PDF is not directly preserved for print-ready use.
- **Code location:** `src/pages/Browse.jsx`, `src/components/MenuCard.jsx`, `src/data/menu.js`
- **Evidence:** 390 px screenshot shows readable cards and controls without zoom.

## 6. Implemented Application

### Routes

| Route | Purpose |
|---|---|
| `/` | Search, filter, sort, and browse the menu |
| `/item/:id` | Parameterized item details and add-to-cart action |
| `/cart` | Quantity controls, removal, conflict feedback, and subtotal |
| `/checkout` | Controlled form, validation, fulfilment, and delivery minimum |
| `/confirmation` | Clear final order summary |

### Journey Screenshots

**Browse at 1280 px.** The screenshot shows the complete menu immediately, not behind a location or order gate. Search, diet filter, and sort controls provide meaningful task narrowing.

**Browse at 390 px.** The menu and controls reflow into a single-column mobile journey, with no intentional page-wide horizontal overflow.

**Item details.** The parameterized route shows price, category, dietary style, description, quantity selector, and the eight-unit limit message.

**Cart.** Shared state shows quantities, removal, subtotal, and the 8-unit maximum. Bundle eligibility feedback is displayed before checkout.

**Checkout.** The controlled form collects name, phone, fulfilment, and conditional delivery address. The summary shows items, subtotal, and the remaining delivery amount.

## 7. React and JavaScript Implementation

- Meaningful function components and modules are used for pages, cards, context, utilities, data, and styles.
- `react-router-dom` provides navigation and parameterized item routes.
- Props pass menu and display data to cards and page-level components.
- Cart callbacks add, update, and remove records through shared context.
- `useState` controls search, sort, quantity, forms, and UI status.
- Functional updates prevent lost quantities and are used where state depends on previous state.
- Arrays are updated immutably by map/filter/spread operations.
- Menu records use stable IDs as list keys.
- `useMemo` derives visible menu items and the cart subtotal.
- `useEffect` persists cart data to localStorage and supports menu loading lifecycle cleanup.
- `loadMenu` uses an asynchronous mock delay and Promise rejection handling.
- Local storage restores the last usable cart; invalid entries and over-limit quantities are guarded.
- The operating rules are isolated in `src/utils/cartRules.js` and used by React and the test.

## 8. Verification and Edge Cases

| Case | Action | Expected result | Observed result |
|---|---|---|---|
| Missing/invalid saved cart entry | Load with stale or malformed data | Keep valid records, recover safely | Invalid IDs are filtered and malformed JSON falls back to an empty array |
| Invalid item URL | Open `/item/not-a-real-item` | Useful not-found state and menu link | Helpful feedback and “Return to menu” action |
| Empty cart | Open `/cart` or `/checkout` | Explain empty state and provide next action | Empty-state guidance and Browse Menu link |
| No search matches | Search for unavailable text | Distinguish from loading/error and explain next step | “No items found” guidance |
| Loading failure | Use “Demo load failure” | Show clear error and Retry action | Error state appears |
| Loading retry | Select “Try again” | Restore menu successfully | Menu reload and retry restore 12 items |
| Quantity at limit | Increase an item to 8 | Allow 8 and show limit message | 8 accepted; increase disabled |
| Quantity over limit | Attempt 9 or restore saved 9 | Prevent invalid quantity | Quantity clamped or increase unavailable |
| Mixed bundle choices | Bundle style opposite to regular item | Conflict alert and blocked checkout | Conflict prevents continuation |
| Delivery below minimum | Choose delivery at Rs. 799 | Show Rs. 1 remaining and prevent completion | Remaining amount and specific validation appear |
| Delivery at boundary | Choose delivery at Rs. 800 | Allow valid delivery | Rs. 0 remaining and “minimum reached” |
| Collection | Choose collection at any subtotal | No delivery minimum | Collection accepted subject to valid form |
| Invalid checkout input | Submit blank or malformed fields | Keep valid fields and show specific errors | Name, phone, address, and fulfilment feedback appear |
| 390 px layout | Open each main route at 390 px | Usable controls with no unintended horizontal overflow | Responsive single-column layouts |
| 1280 px layout | Open desktop journey | Clear hierarchy and reachable actions | Three-column or two-column layouts as appropriate |

## 9. Automated Business-Rule Test

The availability rule was selected for automated testing. The tested function is `getQuantityWithinLimit(quantity)` in `src/utils/cartRules.js`. It is also used by the cart implementation.

Test command:

```powershell
npm test
```

The test file is `test/cartRules.test.js`. It uses `node:test` and `node:assert/strict` and includes:

- Ordinary valid quantity: `3` returns `true`.
- Exact limit: `8` returns `true`.
- Over-limit quantity: `9` returns `false`.

**Result:** 3 tests passed, 0 failed.

## 10. GitHub and Development Progress

The public repository is:

https://github.com/Talha-3921/CampusBite-A2

The development history includes meaningful commits for setup, menu data, browse features, routing, details, cart state and rules, checkout, and final polish/testing.

The final application commit recorded in this report is:

`b53e22c50eae9db9f07b93b35d13727ba92a04b8`

## 11. Deployment

**Deployment status:** Live at https://talha-3921.github.io/CampusBite-A2/.

The deployed application must open without sign-in, load its assets, serve the main journey, and support direct refresh on nested routes.

## 12. Limitations

- Orders are fictional and do not process real payment or dispatch real meals.
- Student name, roll number, and section are not supplied and must be completed before submission.
- The PDF menu evidence URL is a public gateway menu reference; the supplied screenshot remains the direct evidence for the assignment issue.
- The bundle rule represents one dietary style for the whole bundle rather than individual meal selections for each of the five bundle meals.

## 13. Concept Map

| React concept | File | Component/function |
|---|---|---|
| Routing and parameters | `src/App.jsx`, `src/pages/Details.jsx` | `App`, `useParams` |
| Local menu data | `src/data/menu.js` | `menuItems`, `loadMenu` |
| Search/filter/sort | `src/pages/Browse.jsx` | `Browse`, `visibleItems` |
| Reusable menu display | `src/components/MenuCard.jsx` | `MenuCard` |
| Shared cart state | `src/context/CartContext.jsx` | `CartProvider` |
| Cart access hook | `src/context/useCart.js` | `useCart` |
| Persistence | `src/context/CartContext.jsx` | `loadCart`, `useEffect` |
| Quantity and eligibility rules | `src/utils/cartRules.js` | `getQuantityWithinLimit`, `getBundleConflict` |
| Delivery pricing rule | `src/utils/cartRules.js` | `getDeliveryRemaining` |
| Controlled checkout | `src/pages/Checkout.jsx` | `Checkout`, `validate`, `submitOrder` |
| Confirmation | `src/pages/Confirmation.jsx` | `Confirmation` |
| Automated test | `test/cartRules.test.js` | `node:test` cases |
