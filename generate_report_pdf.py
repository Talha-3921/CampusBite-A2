from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parent
PDF_PATH = ROOT / "CS4032_Assignment_02_CampusBite_Report.pdf"

font_regular = Path(r"C:\Windows\Fonts\arial.ttf")
font_bold = Path(r"C:\Windows\Fonts\arialbd.ttf")
if font_regular.exists() and font_bold.exists():
    pdfmetrics.registerFont(TTFont("Arial", str(font_regular)))
    pdfmetrics.registerFont(TTFont("Arial-Bold", str(font_bold)))
    BASE_FONT = "Arial"
    BOLD_FONT = "Arial-Bold"
else:
    BASE_FONT = "Helvetica"
    BOLD_FONT = "Helvetica-Bold"

NAVY = colors.HexColor("#173F35")
GREEN = colors.HexColor("#6B7D24")
ORANGE = colors.HexColor("#B54A2F")
LIGHT = colors.HexColor("#F3F6EE")
MID = colors.HexColor("#DDE3D7")
TEXT = colors.HexColor("#26332E")
GRAY = colors.HexColor("#68716C")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="CoverTitle",
    parent=styles["Title"],
    fontName=BOLD_FONT,
    fontSize=25,
    leading=30,
    alignment=TA_CENTER,
    textColor=NAVY,
    spaceAfter=12,
))
styles.add(ParagraphStyle(
    name="CoverSubtitle",
    parent=styles["Normal"],
    fontName=BASE_FONT,
    fontSize=11,
    leading=17,
    alignment=TA_CENTER,
    textColor=GRAY,
))
styles.add(ParagraphStyle(
    name="SectionTitle",
    parent=styles["Heading1"],
    fontName=BOLD_FONT,
    fontSize=16,
    leading=20,
    textColor=NAVY,
    spaceBefore=6,
    spaceAfter=9,
))
styles.add(ParagraphStyle(
    name="SubTitle",
    parent=styles["Heading2"],
    fontName=BOLD_FONT,
    fontSize=11,
    leading=14,
    textColor=GREEN,
    spaceBefore=7,
    spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="Body",
    parent=styles["BodyText"],
    fontName=BASE_FONT,
    fontSize=8.7,
    leading=12.5,
    textColor=TEXT,
    spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="Small",
    parent=styles["BodyText"],
    fontName=BASE_FONT,
    fontSize=7.2,
    leading=9.5,
    textColor=TEXT,
))
styles.add(ParagraphStyle(
    name="Caption",
    parent=styles["BodyText"],
    fontName=BASE_FONT,
    fontSize=7.5,
    leading=10,
    textColor=GRAY,
    alignment=TA_LEFT,
    spaceBefore=4,
    spaceAfter=8,
))
styles.add(ParagraphStyle(
    name="Callout",
    parent=styles["BodyText"],
    fontName=BOLD_FONT,
    fontSize=9,
    leading=12,
    textColor=NAVY,
))


def P(text, style="Body"):
    return Paragraph(text, styles[style])


def table(data, widths, header=True, font_size=7.2):
    converted = []
    for row_index, row in enumerate(data):
        converted.append([
            P(str(cell), "Small") if not isinstance(cell, (Image, Paragraph)) else cell
            for cell in row
        ])
    result = Table(converted, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, MID),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]
    if header:
        commands += [
            ("BACKGROUND", (0, 0), (-1, 0), NAVY),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), BOLD_FONT),
        ]
    result.setStyle(TableStyle(commands))
    return result


def fit_image(path, max_width, max_height):
    source = PILImage.open(path)
    width, height = source.size
    ratio = min(max_width / width, max_height / height)
    return Image(str(path), width=width * ratio, height=height * ratio)


def header_footer(canvas, document):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 12 * mm, width, 12 * mm, fill=1, stroke=0)
    canvas.setFont(BOLD_FONT, 8)
    canvas.setFillColor(colors.white)
    canvas.drawString(18 * mm, height - 8 * mm, "CS4032 Assignment 02")
    canvas.drawRightString(width - 18 * mm, height - 8 * mm, "CampusBite Islamabad")
    canvas.setStrokeColor(MID)
    canvas.line(18 * mm, 13 * mm, width - 18 * mm, 13 * mm)
    canvas.setFont(BASE_FONT, 7)
    canvas.setFillColor(GRAY)
    canvas.drawString(18 * mm, 8 * mm, "FAST-NUCES Islamabad | Fall 2026")
    canvas.drawRightString(width - 18 * mm, 8 * mm, f"Page {document.page}")
    canvas.restoreState()


story = []

# Cover
story.append(Spacer(1, 34 * mm))
story.append(P("CS4032 — Assignment 02", "CoverSubtitle"))
story.append(Spacer(1, 8 * mm))
story.append(P("CampusBite Islamabad", "CoverTitle"))
story.append(P("Business Website Development Using React", "CoverSubtitle"))
story.append(Spacer(1, 14 * mm))
cover_data = [
    ["Course", "Web Programming — CS4032"],
    ["Campus", "FAST-NUCES Islamabad"],
    ["Semester", "Fall 2026"],
    ["Business", "CampusBite Islamabad"],
    ["Repository", "github.com/Talha-3921/CampusBite-A2"],
    ["Final application commit", "b53e22c50eae9db9f07b93b35d13727ba92a04b8"],
]
cover_table = table(
    [["Field", "Detail"]] + cover_data,
    [42 * mm, 118 * mm],
)
story.append(cover_table)
story.append(Spacer(1, 12 * mm))
story.append(P(
    "<b>Student:</b> [Full name — enter before submission] &nbsp;&nbsp; "
    "<b>Roll number:</b> [Enter before submission] &nbsp;&nbsp; "
    "<b>Section:</b> [Enter before submission]",
    "CoverSubtitle",
))
story.append(Spacer(1, 7 * mm))
story.append(P(
    "<b>Deployment link:</b> [Add public URL before submission]",
    "CoverSubtitle",
))
story.append(PageBreak())

# 1 Student and project details
story.append(P("1. Student and Project Details", "SectionTitle"))
story.append(table([
    ["Field", "Detail"],
    ["Student name", "To be entered before submission"],
    ["Roll number", "To be entered before submission"],
    ["Section", "To be entered before submission"],
    ["Business name", "CampusBite Islamabad"],
    ["Course", "CS4032 Web Programming"],
    ["Repository", "https://github.com/Talha-3921/CampusBite-A2"],
    ["Deployment", "Pending deployment — add the public URL before submission"],
    ["Final application commit", "b53e22c50eae9db9f07b93b35d13727ba92a04b8"],
], [45 * mm, 115 * mm]))

# 2 Business profile
story.append(P("2. Business Profile", "SectionTitle"))
story.append(P(
    "<b>Identity.</b> CampusBite Islamabad is a fictional campus meal service for students and young professionals."
))
story.append(P(
    "<b>Offering.</b> The application provides 12 selectable meals and bundles, with prices in Pakistani rupees."
))
story.append(P(
    "<b>Audience.</b> University students and young professionals around NUST, COMSATS, FAST, Wah Cantt, and nearby hostels."
))
story.append(P(
    "<b>Operating area.</b> Delivery is available conceptually in G-10, F-10, H-8, I-8, and Wah Cantt main areas. Collection is also available."
))
story.append(P(
    "<b>Main customer task.</b> Browse freely, search and narrow the menu, open item details, change quantities, build a cart, complete checkout, and receive a clear confirmation."
))
story.append(P(
    "<b>Business goal.</b> Reduce browsing friction and enable a complete simulated order without a location gate or forced order-start step."
))

menu_rows = [
    ["#", "Menu item", "Price"],
    ["1", "Classic Chicken Wrap", "Rs. 450"],
    ["2", "Spicy Beef Bowl", "Rs. 520"],
    ["3", "Veggie Protein Bowl", "Rs. 480"],
    ["4", "Chicken Shawarma Plate", "Rs. 550"],
    ["5", "Egg & Cheese Breakfast Wrap", "Rs. 380"],
    ["6", "Grilled Paneer Salad", "Rs. 420"],
    ["7", "Mini Burger Combo", "Rs. 490"],
    ["8", "Weekly Student Bundle (5 meals)", "Rs. 2,100"],
    ["9", "Protein Smoothie", "Rs. 320"],
    ["10", "Loaded Fries", "Rs. 350"],
    ["11", "Chicken Tikka Rice Bowl", "Rs. 510"],
    ["12", "Falafel Wrap", "Rs. 430"],
]
story.append(P("Complete menu data", "SubTitle"))
story.append(table(menu_rows, [12 * mm, 115 * mm, 33 * mm]))

# 3 Rules
story.append(PageBreak())
story.append(P("3. Operating Rules", "SectionTitle"))

story.append(P("Rule 1 — Availability / quantity limit", "SubTitle"))
story.append(table([
    ["Element", "Implementation"],
    ["Exact condition", "No single item may have quantity above 8 in the order."],
    ["Where communicated", "Details quantity selector and cart controls/messages."],
    ["When met", "Quantities from 1 to 8 remain selectable."],
    ["When broken", "The UI prevents a ninth unit and restored/direct data is guarded."],
    ["Boundary", "Quantity 8 is accepted and marked at the limit; quantity 9 is rejected."],
], [42 * mm, 118 * mm]))

story.append(P("Rule 2 — Eligibility / bundle compatibility", "SubTitle"))
story.append(table([
    ["Element", "Implementation"],
    ["Exact condition", "A Weekly Student Bundle has one dietary style; incompatible regular items cannot remain with it."],
    ["Where communicated", "Bundle details and cart bundle-style label."],
    ["When met", "A vegetarian bundle with vegetarian items or a non-vegetarian bundle with non-vegetarian items remains valid."],
    ["When broken", "A specific conflict alert appears and checkout is blocked."],
    ["Boundary", "A bundle alone is valid; adding an opposite dietary item invalidates the combination until corrected."],
], [42 * mm, 118 * mm]))

story.append(P("Rule 3 — Pricing / fulfilment", "SubTitle"))
story.append(table([
    ["Element", "Implementation"],
    ["Exact condition", "Delivery requires subtotal >= Rs. 800; collection has no minimum."],
    ["Where communicated", "Checkout summary and fulfilment-specific validation."],
    ["When met", "Delivery proceeds at Rs. 800 or more; collection proceeds at any cart value with valid details."],
    ["When broken", "Checkout shows remaining amount and blocks placement until enough is added or collection is selected."],
    ["Boundary", "Rs. 800 is accepted with Rs. 0 remaining; Rs. 799 leaves Rs. 1 remaining."],
], [42 * mm, 118 * mm]))

# 4 Investigation
story.append(PageBreak())
story.append(P("4. Reference-Site Investigation", "SectionTitle"))

investigation = [
    (
        "Problem 1 — Menu locked behind location selection",
        "Subway | https://www.subway.com/en-us/locator",
        "The supplied screenshot shows a location/locator flow that hides the full menu until location information is selected.",
        "A user who only wants to browse or compare prices must complete a step unrelated to comparison. The possible consequence is abandonment.",
        "CampusBite renders the full HTML menu at `/` with no location or start-order gate.",
        ROOT / "issue 1 Menu locked behind location selection.png",
    ),
    (
        "Problem 2 — Forced order start",
        "Subway online ordering | https://order.subway.com/",
        "The supplied screenshot shows a forced order-start/fulfilment path before useful menu interaction.",
        "The passive browsing task becomes slower and may interrupt repeat comparison visits.",
        "Browsing, details, search, filters, and sorting remain independent of checkout; cart and order begin only when the user acts.",
        ROOT / "issue 2 Forced to start a fake order just to see the menu.png",
    ),
    (
        "Problem 3 — PDF menu on mobile",
        "Gateway Bar and Grill PDF | https://gatewaybarandgrill.com/Documents/GWmenu.pdf",
        "The supplied screenshot illustrates that the PDF requires download and zoom/scroll on a phone.",
        "Students may miss information or leave because quick mobile comparison is difficult.",
        "CampusBite uses responsive HTML cards with native text, search, filtering, sorting, and readable 390 px layout.",
        ROOT / "issue 3 PDF menus that require download + zoom-scroll on mobile.png",
    ),
]

for title, reference, observed, consequence, response, image_path in investigation:
    story.append(P(title, "SubTitle"))
    story.append(P(f"<b>Reference and URL:</b> {reference}", "Body"))
    story.append(P(f"<b>Observed behavior:</b> {observed}", "Body"))
    story.append(P(f"<b>Possible business consequence:</b> {consequence}", "Body"))
    story.append(P(f"<b>How CampusBite addresses it:</b> {response}", "Body"))
    if image_path.exists():
        story.append(fit_image(image_path, 150 * mm, 82 * mm))
        story.append(P("Figure: Supplied reference-site evidence.", "Caption"))
    story.append(Spacer(1, 3 * mm))

# 5 Decisions
story.append(PageBreak())
story.append(P("5. Frontend Decisions", "SectionTitle"))

decisions = [
    (
        "Decision 1 — Always-visible menu",
        "Problem: Menu locked behind location selection.",
        "Chosen behavior: The complete menu appears on `/` immediately.",
        "Alternative: Show a location picker and reveal the menu afterwards.",
        "Reason: It supports price and option comparison before commitment.",
        "Tradeoff: Real-time store-specific availability is not visible at first glance.",
        "Code: `src/pages/Browse.jsx`, `src/data/menu.js`.",
    ),
    (
        "Decision 2 — No forced order path",
        "Problem: A start-order step precedes menu browsing.",
        "Chosen behavior: Details and cart remain independent of checkout.",
        "Alternative: Require fulfilment selection before menu interaction.",
        "Reason: It reduces friction for repeat comparison and browsing.",
        "Tradeoff: Cart, filters, and order state require consistent shared handling.",
        "Code: `src/App.jsx`, `src/context/CartContext.jsx`, `src/pages/Browse.jsx`.",
    ),
    (
        "Decision 3 — HTML menu instead of PDF",
        "Problem: A PDF is difficult to use on a small mobile screen.",
        "Chosen behavior: Render responsive HTML cards with search, diet filter, and sort.",
        "Alternative: Use a PDF, optionally in addition to HTML.",
        "Reason: Native HTML is faster to read and supports accessibility.",
        "Tradeoff: There is no print-ready PDF in the primary menu experience.",
        "Code: `src/pages/Browse.jsx`, `src/components/MenuCard.jsx`, `src/data/menu.js`.",
    ),
]

for title, *parts in decisions:
    story.append(P(title, "SubTitle"))
    for part in parts:
        story.append(P(part, "Body"))

# 6 Implemented application
story.append(PageBreak())
story.append(P("6. Implemented Application", "SectionTitle"))
story.append(table([
    ["Route", "Purpose"],
    ["/", "Search, filter, sort, and browse the menu"],
    ["/item/:id", "Parameterized item details and add-to-cart"],
    ["/cart", "Quantity controls, removal, conflict feedback, and subtotal"],
    ["/checkout", "Controlled form, validation, fulfilment, and delivery minimum"],
    ["/confirmation", "Clear final order summary"],
], [42 * mm, 118 * mm]))

story.append(P("React and JavaScript implementation", "SubTitle"))
story.append(P("Components and modules separate pages, cards, context, local data, utility rules, and styles."))
story.append(P("React state controls search, filters, sorting, quantities, forms, loading, errors, and confirmation."))
story.append(P("The cart uses a provider and a custom hook. Local storage restores useful data and the derived subtotal is calculated from current cart entries."))
story.append(P("Arrays are updated immutably with map, filter, and spread syntax. Menu records use stable IDs as React keys."))
story.append(P("Promises and async mock loading show loading, failure, retry, and empty states."))
story.append(P("One rule module is reused by React and the automated test, keeping the interface and test tied to the same implementation."))

app_screens = [
    ("Browse — 1280 px", ROOT / "report-assets" / "browse-desktop.png",
     "The full menu is visible immediately. Search, diet filter, sort, and cards support free comparison."),
    ("Browse — 390 px", ROOT / "report-assets" / "browse-mobile.png",
     "The mobile layout reflows controls and cards without a PDF, location gate, or start-order step."),
    ("Item details", ROOT / "report-assets" / "details-desktop.png",
     "The parameterized route displays price, dietary style, description, quantity, and the eight-unit limit."),
    ("Cart", ROOT / "report-assets" / "cart-desktop.png",
     "The cart route shows the shared-state empty state or can display persistent selections in a browser session."),
    ("Checkout", ROOT / "report-assets" / "checkout-desktop.png",
     "The form and summary support a controlled main journey; collection or delivery changes the shown fields."),
]

story.append(PageBreak())
story.append(P("Implemented Journey Screenshots", "SectionTitle"))
for title, image_path, annotation in app_screens:
    story.append(P(title, "SubTitle"))
    if image_path.exists():
        story.append(fit_image(image_path, 150 * mm, 92 * mm))
    story.append(P(annotation, "Caption"))

# 7 Verification
story.append(PageBreak())
story.append(P("7. Verification and Edge Cases", "SectionTitle"))
verification_rows = [
    ["Case", "Action", "Expected", "Observed"],
    ["Invalid saved data", "Load stale or malformed localStorage", "Recover safely", "Invalid IDs are filtered; malformed JSON becomes empty"],
    ["Invalid item URL", "Open `/item/not-a-real-item`", "Useful feedback", "Not-found state and menu link"],
    ["Empty cart", "Open cart or checkout", "Explain and offer next action", "Empty-state guidance"],
    ["No search matches", "Enter an unmatched term", "No-results state", "Clear guidance shown"],
    ["Loading failure", "Select “Demo load failure”", "Error and retry", "Error state appears"],
    ["Retry", "Select “Try again”", "Restore menu", "12 menu records return"],
    ["Quantity 8", "Increase to exact limit", "Accept 8", "Increase disabled, limit message shown"],
    ["Quantity 9", "Attempt over limit", "Prevent 9", "Clamped or disabled"],
    ["Bundle conflict", "Mix opposite dietary styles", "Block checkout", "Specific conflict alert"],
    ["Delivery Rs. 799", "Choose delivery below minimum", "Show Rs. 1 remaining", "Validation and remaining amount"],
    ["Delivery Rs. 800", "Choose delivery at limit", "Allow completion", "Minimum reached state"],
    ["Collection", "Choose collection", "No delivery minimum", "Collection summary without minimum"],
    ["Invalid form", "Submit empty/malformed fields", "Specific feedback", "Errors shown; valid input preserved"],
]
story.append(table(verification_rows, [34 * mm, 39 * mm, 42 * mm, 45 * mm]))

story.append(P("Automated business-rule test", "SubTitle"))
story.append(P(
    "<b>Function:</b> `getQuantityWithinLimit(quantity)` in `src/utils/cartRules.js`."
))
story.append(P("<b>Command:</b> `npm test`"))
story.append(P("<b>Cases:</b> ordinary valid quantity 3 → true; exact limit 8 → true; over-limit quantity 9 → false."))
story.append(P("<b>Test file:</b> `test/cartRules.test.js`, using `node:test` and `node:assert/strict`."))
story.append(P("<b>Result:</b> 3 tests passed, 0 failed.", "Callout"))

story.append(P("Responsive and accessibility verification", "SubTitle"))
story.append(P(
    "Core interactions were designed for 390 px and 1280 px layouts. Semantic headings, associated labels, native buttons and links, visible focus styles, alternative text for meaningful imagery, text-based status, and keyboard-compatible controls are included."
))

# 8 GitHub and deployment
story.append(PageBreak())
story.append(P("8. GitHub and Deployment", "SectionTitle"))
story.append(P("<b>Public repository:</b> https://github.com/Talha-3921/CampusBite-A2"))
story.append(P(
    "<b>Final application commit:</b> `b53e22c50eae9db9f07b93b35d13727ba92a04b8`"
))
story.append(P(
    "Development history includes setup and business data, browse features, routing and details, cart/shared state and rules, checkout/confirmation, and final polish/test/documentation milestones."
))
story.append(P("<b>Deployment status:</b> Pending. Add the public URL before submission and verify assets, direct route refresh, and the same submitted final commit.", "Callout"))

# 9 Limitations
story.append(P("9. Limitations", "SectionTitle"))
story.append(P("• Orders are fictional and do not process real payment or dispatch real food."))
story.append(P("• Student name, roll number, and section are not supplied and must be completed before submission."))
story.append(P("• A public deployment URL is not supplied and must be added before submission."))
story.append(P("• The bundle rule represents one dietary style for the whole bundle rather than five separate item selections."))
story.append(P("• The Gateway PDF URL is a public reference example; the supplied screenshot remains the assignment evidence."))

# 10 Concept map
story.append(P("10. React Concept Map", "SectionTitle"))
story.append(table([
    ["Concept", "File", "Component/function"],
    ["Routing and parameter", "src/App.jsx, src/pages/Details.jsx", "App, useParams"],
    ["Local menu data", "src/data/menu.js", "menuItems, loadMenu"],
    ["Search/filter/sort", "src/pages/Browse.jsx", "Browse, visibleItems"],
    ["Reusable card", "src/components/MenuCard.jsx", "MenuCard"],
    ["Shared cart", "src/context/CartContext.jsx", "CartProvider"],
    ["Cart hook", "src/context/useCart.js", "useCart"],
    ["Persistence", "src/context/CartContext.jsx", "loadCart, useEffect"],
    ["Quantity and bundle rules", "src/utils/cartRules.js", "getQuantityWithinLimit, getBundleConflict"],
    ["Delivery rule", "src/utils/cartRules.js", "getDeliveryRemaining"],
    ["Controlled form", "src/pages/Checkout.jsx", "Checkout, validate, submitOrder"],
    ["Confirmation", "src/pages/Confirmation.jsx", "Confirmation"],
    ["Automated test", "test/cartRules.test.js", "node:test cases"],
], [48 * mm, 58 * mm, 54 * mm]))


doc = SimpleDocTemplate(
    str(PDF_PATH),
    pagesize=A4,
    rightMargin=18 * mm,
    leftMargin=18 * mm,
    topMargin=18 * mm,
    bottomMargin=18 * mm,
    title="CS4032 Assignment 02 - CampusBite Islamabad",
    author="Talha-3921",
    subject="CampusBite Islamabad Assignment Report",
)

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(PDF_PATH)
