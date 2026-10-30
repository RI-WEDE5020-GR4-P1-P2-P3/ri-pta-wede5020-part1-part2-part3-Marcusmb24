# KicksVault — E-Commerce Web Application

A responsive e-commerce web platform for **KicksVault Retailers**, specializing in premium basketball sneakers and streetwear across South Africa.

---

## 📌 Project Overview
KicksVault provides an interactive storefront built with semantic HTML5, modern CSS3 styling, and modular JavaScript. Features include dynamic product filtering, a persistent cart system (using LocalStorage), AJAX form submissions, and comprehensive On-Page SEO optimization.

---

## 📂 Site Structure & Pages
* **`index.html`** — Main storefront with product catalog, search, category filters, and slide-out cart.
* **`about.html`** — Brand mission, authenticity guarantees, and delivery services.
* **`founder.html`** — Background on the founder and brand origin.
* **`blog.html`** — Articles covering sneaker performance and care guides.
* **`support.html`** — Customer service FAQ (featuring an interactive JS Accordion with detailed policies).
* **`enquiry.html`** — Dynamic form for calculating bulk/retail order costs.
* **`contact.html`** — AJAX contact form and embedded Google Maps location.
* **`product.html`** — Dynamic Product Details Page (PDP) generated via URL parameters.
* **`checkout.html`** — Secure checkout form with live order summary.
* **`success.html`** — Order confirmation landing page.

---

## 🚀 Key Features (Part 3 Implementation)
* **Interactive UI:** JavaScript-powered FAQ accordions, slide-out cart, and wishlist drawer.
* **Persistent Cart & Wishlist:** Uses `localStorage` so users don't lose their items on page refresh.
* **AJAX Form Submission:** Contact form validates client-side and simulates asynchronous data transfer without refreshing the page.
* **Dynamic Cost Calculator:** Enquiry form dynamically calculates estimated costs based on service type and quantity.
* **Dynamic PDP:** Clicking a product opens a dedicated page loading data via URL parameters.
* **SEO Optimisation:** Implementation of meta descriptions, keyword tags, image `alt` attributes, `robots.txt`, and `sitemap.xml`.
* **Responsive Design:** Mobile-first layout using modern CSS Grid and Flexbox media queries.

---

## 📱 Responsive Design Evidence

As per the feedback from Part 2, the mobile responsiveness has been completely overhauled to fix navigation overlapping and layout issues. 

### 1. Desktop View (1920x1080)
![Desktop View](screenshots/desktop.png)
*The desktop view features a full multi-column CSS grid layout with the navigation bar aligned horizontally.*

### 2. Tablet View (768x1024)
![Tablet View](screenshots/tablet.png)
*The tablet view adjusts to a 2-column grid and scales padding using relative `rem` units.*

### 3. Mobile View (375x812)
![Mobile View](screenshots/mobile.png)
*The mobile view is fixed to stack into a single-column layout. The navigation bar now wraps text properly without overlapping, and touch targets are optimized.*

---

## 🛠️ Local Setup & Deployment
1. **Clone the repository:**
   ```bash
   git clone https://github.com/RI-WEDE5020-GR4-P1-P2-P3/ri-pta-wede5020-part1-part2-part3-Marcusmb24.git