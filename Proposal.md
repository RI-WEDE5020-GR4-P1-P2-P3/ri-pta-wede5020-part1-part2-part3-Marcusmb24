# WEBSITE PROJECT PROPOSAL: KICKSVAULT E-COMMERCE PLATFORM

## 1. PROJECT OVERVIEW & PROPOSALS EVALUATION

To ensure the optimal solution for online retail, two distinct website proposals were evaluated:

* **Proposal 1: Interactive Brand Gallery / Sneaker Catalog**
  * *Scope:* A showcase site detailing sneaker releases, specs, and dynamic gallery views.
  * *Target Audience:* Sneaker collectors and brand enthusiasts seeking release details.
  * *Limitations:* Lacks e-commerce capabilities, cart persistence, and customer service workflows.

* **Proposal 2: Integrated E-Commerce Sneaker Storefront (APPROVED & SELECTED)**
  * *Scope:* A full-featured online retail store offering instant catalog searching, dynamic category filtering, shoe size selection, real-time cart calculations, responsive drawer overlays, and customer support pages.
  * *Target Audience:* Sneaker shoppers across South Africa seeking premium, authentic footwear with swift delivery.
  * *Justification:* Proposal 2 provides a complete, transactional user experience with higher technical complexity and functional utility.

---

## 2. PROPOSED WEBSITE FEATURES & FUNCTIONALITY

1. **Dynamic Catalog Search & Filtering:**
   * *User Action:* User inputs keywords into the search field or clicks category filter chips (`All`, `Jordan`, `Air Force`, `Shox`).
   * *System Output:* Real-time DOM manipulation filters and renders matching product cards without full page reloads.

2. **Interactive Cart Drawer & Persistent State:**
   * *User Action:* User selects a shoe size, clicks "Add to Cart", or modifies item quantities in the side drawer.
   * *System Output:* State updates instantly, total price updates, and items persist across browser sessions using `localStorage`.

3. **Multi-Page Informational Architecture:**
   * *User Action:* User navigates via header links to `about.html`, `founder.html`, `blog.html`, `support.html`, and `contact.html`.
   * *System Output:* Consistent global header/footer navigation with responsive structural layout across all devices.

---

## 3. DESIGN AESTHETIC & SYSTEM SPECIFICATIONS

* **Color Palette:**
  * Primary Dark: `#111111` (Headers, main text, hero elements)
  * Secondary Neutral: `#FFFFFF` / `#F8F9FA` (Backgrounds, card surfaces)
  * Accent Highlight: `#FF5500` (Call-to-action buttons, active states, tags)
  * Border / Subtle Neutral: `#E5E5E5` (Dividers, container borders)

* **Typography:**
  * Primary Font Family: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  * Scale: Headings (`2rem` - `2.5rem`, Bold 700), Body Text (`1rem`, Regular 400), Captions/Badges (`0.85rem`, Medium 500).

* **UI Layout Style:**
  * Clean, grid-based card layout using CSS Grid and Flexbox with smooth hover elevation effects and standardized touch targets.

---

## 4. TECHNICAL REQUIREMENTS & STACK SPECIFICATIONS

* **Markup Language:** HTML5 (Semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* **Styling Language:** CSS3 (External stylesheet `style.css`, Flexbox, CSS Grid, CSS Variables, `@media` queries).
* **Scripting Language:** Vanilla JavaScript ES6+ (DOM Events, `localStorage` API).
* **Version Control & Hosting:** Git, GitHub Repository, and GitHub Pages hosting.
* **Target Environment:** Standard modern web browsers (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge) across Desktop (1920x1080) and Mobile (375x812) viewports.

---

## 5. PROJECT TIMELINE (GANTT BREAKDOWN)

| Phase | Tasks & Deliverables | Duration | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1: Research & Planning** | Requirements gathering, evaluating Proposal 1 vs Proposal 2, drafting wireframes. | Week 1 | Complete |
| **Phase 2: HTML Structural Layout** | Authoring semantic HTML5 files (`index`, `about`, `blog`, `contact`, `founder`, `support`). | Week 2 | Complete |
| **Phase 3: CSS Modular Styling** | Building unified `style.css`, grid layout system, responsive media queries. | Week 3 | Complete |
| **Phase 4: JS Logic & Interactivity** | Implementing dynamic catalog filter, cart calculations, `localStorage` persistence. | Week 4 | Complete |
| **Phase 5: Testing & QA** | Cross-browser compatibility checks, mobile responsiveness tests, bug fixes. | Week 5 | Complete |
| **Phase 6: Deployment & Docs** | Pushing commits to GitHub, deploying GitHub Pages, writing `README.md` and `CHANGELOG.md`. | Week 6 | Complete |

---

## 6. PROJECT BUDGET ALLOCATION

| Cost Item | Description | Estimated Cost (ZAR) | Actual Cost (ZAR) |
| :--- | :--- | :--- | :--- |
| **Domain Registration** | Custom `.co.za` domain allocation | R 150.00 | R 0.00 (GitHub Subdomain) |
| **Web Hosting & SSL** | Cloud hosting with automated SSL encryption | R 1,200.00 / yr | R 0.00 (GitHub Pages Free Tier) |
| **Development IDE & Tools** | VS Code, Git CLI, Chrome Developer Tools | R 0.00 | R 0.00 (Open Source) |
| **Design & Prototyping** | Wireframing and asset optimization tools | R 300.00 | R 0.00 (Open Source / Free Tier) |
| **Maintenance & Testing** | QA testing on test mobile devices | R 500.00 | R 0.00 (In-House) |
| **TOTAL PROJECT COST** | | **R 2,150.00** | **R 0.00** |

---

## 7. REFERENCES (HARVARD STYLE)

* MDN Web Docs, 2026. *HTML: HyperText Markup Language*. Available at: <https://developer.mozilla.org/en-US/docs/Web/HTML> [Accessed 16 September 2026].
* MDN Web Docs, 2026. *CSS: Cascading Style Sheets*. Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS> [Accessed 16 September 2026].
* MDN Web Docs, 2026. *Window.localStorage*. Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage> [Accessed 16 September 2026].
* W3C, 2023. *Web Content Accessibility Guidelines (WCAG) 2.1*. W3C Recommendation. Available at: <https://www.w3.org/TR/WCAG21/> [Accessed 16 September 2026].