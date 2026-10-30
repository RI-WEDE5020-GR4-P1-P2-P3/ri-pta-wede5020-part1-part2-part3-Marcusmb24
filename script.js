// --- GLOBAL DOM LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const answer = item.querySelector('p');
        if(answer) answer.style.display = 'none'; 
        
        item.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            document.querySelectorAll('.faq-item p').forEach(p => p.style.display = 'none');
            document.querySelectorAll('.faq-item').forEach(i => {
                i.style.borderColor = 'var(--border)';
                i.classList.remove('open'); 
            });
            
            if (!isOpen) {
                answer.style.display = 'block';
                item.style.borderColor = 'var(--accent)';
                item.classList.add('open'); 
            }
        });
    });

    // 2. Contact Form Validation & AJAX Simulation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const errorBox = document.getElementById('form-error');
            const successBox = document.getElementById('form-success');

            if(name === "" || email === "" || message === "") {
                errorBox.style.display = 'block';
                errorBox.textContent = "Please fill in all required fields.";
                successBox.style.display = 'none';
                return;
            }

            if(!email.includes('@')) {
                errorBox.style.display = 'block';
                errorBox.textContent = "Please enter a valid email address.";
                successBox.style.display = 'none';
                return;
            }

            errorBox.style.display = 'none';
            const submitBtn = contactForm.querySelector('button');
            submitBtn.textContent = "Sending Data...";
            submitBtn.disabled = true;

            setTimeout(() => {
                successBox.style.display = 'block';
                successBox.textContent = "Thank you, " + name + "! Your message has been sent via AJAX.";
                contactForm.reset();
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // 3. Enquiry Form Logic (Cost Calculator)
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const service = document.getElementById('service-type').value;
            const qty = parseInt(document.getElementById('quantity').value);
            
            let basePrice = 0;
            if(service === 'retail') basePrice = 2500;
            if(service === 'bulk') basePrice = 1800; 
            if(service === 'sponsor') basePrice = 0; 
            
            const total = basePrice * qty;
            const resultBox = document.getElementById('enquiry-result');
            
            resultBox.style.display = 'block';
            if(service === 'sponsor') {
                resultBox.innerHTML = `<strong>Sponsorship Enquiry Received:</strong> Our team will review your request for ${qty} item(s) and contact you shortly.`;
            } else {
                resultBox.innerHTML = `<strong>Enquiry Processed:</strong> Estimated cost for ${qty} item(s) is <strong>R ${total.toLocaleString('en-ZA')}</strong>. Our team will contact you to confirm availability.`;
            }
            enquiryForm.reset();
        });
    }

    // 4. Load Data from LocalStorage
    if (localStorage.getItem('kicksVaultCart')) {
        cart = JSON.parse(localStorage.getItem('kicksVaultCart'));
    }
    if (localStorage.getItem('kicksVaultWishlist')) {
        wishlist = JSON.parse(localStorage.getItem('kicksVaultWishlist'));
    }

    // 5. Page Specific Loading
    if(document.getElementById('product-grid')) {
        renderProducts();
        updateCart(); 
        updateWishlist();
    } else if (document.getElementById('product-image')) {
        loadProductDetails();
        updateCart();
        updateWishlist();
    } else if (document.getElementById('checkout-form')) {
        loadCheckout();
    } else {
        updateCart();
        updateWishlist();
    }
});

// --- PRODUCT & CART LOGIC ---
const products = [
    { id: 1, name: "Nike Air Force 1 '07", category: "airforce", price: 2199, image: "images/af1.jpg" },
    { id: 2, name: "Air Jordan 1 High OG", category: "jordan", price: 3499, image: "images/jordan1-high.jpg" },
    { id: 3, name: "Air Jordan 1 Mid", category: "jordan", price: 2699, image: "images/jordan1-mid.jpg" },
    { id: 4, name: "Air Jordan 1 Retro", category: "jordan", price: 3299, image: "images/jordan1-retro.jpg" },
    { id: 5, name: "Air Jordan 4 Retro", category: "jordan", price: 3899, image: "images/jordan4-retro.jpg" },
    { id: 6, name: "Jordan 4 Class", category: "jordan", price: 4199, image: "images/class.jpg" }, 
    { id: 7, name: "Jordan 4 'White Thunder'", category: "jordan", price: 4299, image: "images/thunder.jpg" },
    { id: 8, name: "Nike Shox TL", category: "shox", price: 2899, image: "images/nike-shox-tl.jpg" }
];

let currentCategory = 'all';
let selectedSizes = {};
let cart = [];
let wishlist = [];

// --- UI RENDER FUNCTIONS ---
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return; 
    const searchTerm = document.getElementById('search-input') ? document.getElementById('search-input').value.toLowerCase() : '';
    const sortValue = document.getElementById('sort-select') ? document.getElementById('sort-select').value : 'default';
    grid.innerHTML = '';

    let filtered = products.filter(p => {
        const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    if (sortValue === 'low-high') filtered.sort((a, b) => a.price - b.price);
    else if (sortValue === 'high-low') filtered.sort((a, b) => b.price - a.price);

    filtered.forEach(product => {
        if (!selectedSizes[product.id]) selectedSizes[product.id] = 'UK 7';
        const isWishlisted = wishlist.some(item => item.id === product.id);
        const heartColor = isWishlisted ? 'var(--accent)' : 'var(--text-muted)';
        const heartType = isWishlisted ? '♥' : '♡';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrapper" style="position: relative;">
                <button onclick="toggleWishlistItem(${product.id})" style="position: absolute; top: 10px; right: 10px; background: #222; border: 1px solid #444; font-size: 1.2rem; color: ${heartColor}; cursor: pointer; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; z-index: 10;">${heartType}</button>
                <img src="${product.image}" alt="${product.name}" onclick="window.location.href='product.html?id=${product.id}'" style="cursor: pointer;">
            </div>
            <div class="card-content">
                <div>
                    <h3>${product.name}</h3>
                    <div class="price">R ${product.price.toLocaleString('en-ZA')}.00</div>
                    <div style="display:flex; gap:5px; margin-bottom:10px;">
                        ${['UK 6', 'UK 7', 'UK 8', 'UK 9'].map(size => `
                            <button class="size-btn ${selectedSizes[product.id] === size ? 'selected' : ''}" onclick="selectSize(${product.id}, '${size}')">${size}</button>
                        `).join('')}
                    </div>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add To Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function selectSize(id, size) { selectedSizes[id] = size; renderProducts(); }
function setCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
}
function filterProducts() { renderProducts(); }

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `✅ ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

// --- PRODUCT DETAILS PAGE ---
function loadProductDetails() {
    const productId = parseInt(new URLSearchParams(window.location.search).get('id'));
    const product = products.find(p => p.id === productId);
    if (!product) { document.getElementById('product-name').textContent = "Product Not Found"; return; }

    document.title = product.name + " | KicksVault";
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `R ${product.price.toLocaleString('en-ZA')}.00`;

    document.getElementById('size-container').innerHTML = ['UK 6', 'UK 7', 'UK 8', 'UK 9'].map(size => `
        <button class="size-btn" id="btn-${size.replace(' ', '')}" onclick="selectPDPsize('${size}')">${size}</button>
    `).join('');

    selectPDPsize('UK 7'); 
    document.getElementById('add-to-cart-btn').onclick = function() { addToCart(product.id); };
}

function selectPDPsize(size) {
    document.querySelectorAll('#size-container .size-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('btn-' + size.replace(' ', '')).classList.add('selected');
    selectedSizes[parseInt(new URLSearchParams(window.location.search).get('id'))] = size;
}

// --- GALLERY LIGHTBOX ---
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = 'flex';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// --- CART FUNCTIONS ---
function addToCart(id) {
    const p = products.find(x => x.id === id);
    const size = selectedSizes[id] || 'UK 7'; 
    const existingItem = cart.find(item => item.id === id && item.size === size);
    if (existingItem) existingItem.qty += 1; 
    else cart.push({ ...p, size: size, qty: 1 }); 
    saveCart(); updateCart(); showToast(`${p.name} added to cart!`); 
}
function addToCartFromWishlist(id) { addToCart(id); toggleWishlist(); }
function changeQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) cart.splice(index, 1); 
    saveCart(); updateCart();
}
function removeFromCart(index) { cart.splice(index, 1); saveCart(); updateCart(); }
function clearCart() { if(confirm("Clear cart?")) { cart = []; saveCart(); updateCart(); } }
function saveCart() { localStorage.setItem('kicksVaultCart', JSON.stringify(cart)); }

function updateCart() {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    if(document.getElementById('cart-count')) document.getElementById('cart-count').textContent = totalItems;
    
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); text-align: center; margin-top: 20px;">Your cart is empty.</p>`;
    } else {
        container.innerHTML = cart.map((i, index) => `
            <div style="padding:10px; border-bottom:1px solid #333; display: flex; justify-content: space-between; align-items: center;">
                <div><strong>${i.name}</strong><br><span style="font-size: 0.85rem; color: var(--text-muted);">${i.size} - R${i.price}</span></div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="changeQty(${index}, -1)" style="background: #333; color: #fff; border: none; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">-</button>
                    <span>${i.qty}</span>
                    <button onclick="changeQty(${index}, 1)" style="background: #333; color: #fff; border: none; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">+</button>
                    <button onclick="removeFromCart(${index})" style="background: none; color: red; border: none; cursor: pointer; font-size: 1.2rem; margin-left: 5px;">🗑️</button>
                </div>
            </div>
        `).join('');
    }
    
    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    if(document.getElementById('cart-subtotal')) document.getElementById('cart-subtotal').textContent = `R ${subtotal.toLocaleString('en-ZA')}.00`;

    let shippingCost = parseInt(document.getElementById('shipping-region') ? document.getElementById('shipping-region').value : 0);
    const finalTotal = subtotal + shippingCost;
    if(document.getElementById('cart-total-price')) document.getElementById('cart-total-price').textContent = `R ${finalTotal.toLocaleString('en-ZA')}.00`;

    const vatEl = document.getElementById('cart-vat');
    if (vatEl) {
        const vatAmount = finalTotal - (finalTotal / 1.15);
        vatEl.textContent = `Includes 15% VAT: R ${vatAmount.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
}

function toggleCart(force) {
    const s = document.getElementById('cart-sidebar');
    const o = document.getElementById('cart-overlay');
    if (!s || !o) return;
    if (force || !s.classList.contains('open')) { s.classList.add('open'); o.style.display = 'block'; } 
    else { s.classList.remove('open'); o.style.display = 'none'; }
}

// --- WISHLIST FUNCTIONS ---
function toggleWishlistItem(id) {
    const index = wishlist.findIndex(item => item.id === id);
    if (index > -1) wishlist.splice(index, 1); 
    else wishlist.push(products.find(x => x.id === id)); 
    saveWishlist(); updateWishlist();
    if (document.getElementById('product-grid')) renderProducts(); 
}
function saveWishlist() { localStorage.setItem('kicksVaultWishlist', JSON.stringify(wishlist)); }
function updateWishlist() {
    if(document.getElementById('wishlist-count')) document.getElementById('wishlist-count').textContent = wishlist.length;
    const container = document.getElementById('wishlist-items');
    if (!container) return;
    if (wishlist.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); text-align: center; margin-top: 20px;">Your wishlist is empty.</p>`;
    } else {
        container.innerHTML = wishlist.map(i => `
            <div style="padding:10px; border-bottom:1px solid #333; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div style="flex: 1 1 100%;"><strong>${i.name}</strong> <br><span style="color:var(--accent);">R${i.price}</span></div>
                <div style="display: flex; gap: 10px; width: 100%;">
                    <button onclick="addToCartFromWishlist(${i.id})" style="background: var(--accent); color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-weight: bold; flex: 1;">Add to Cart</button>
                    <button onclick="toggleWishlistItem(${i.id})" style="background: transparent; border: 1px solid red; color: red; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Remove</button>
                </div>
            </div>
        `).join('');
    }
}
function toggleWishlist(force) {
    const s = document.getElementById('wishlist-sidebar');
    const o = document.getElementById('wishlist-overlay');
    if (!s || !o) return;
    if (force || !s.classList.contains('open')) { s.classList.add('open'); o.style.display = 'block'; } 
    else { s.classList.remove('open'); o.style.display = 'none'; }
}

// --- SIZE GUIDE MODAL ---
function openSizeGuide() {
    document.getElementById('size-guide-modal').style.display = 'block';
    document.getElementById('size-guide-overlay').style.display = 'block';
}
function closeSizeGuide() {
    document.getElementById('size-guide-modal').style.display = 'none';
    document.getElementById('size-guide-overlay').style.display = 'none';
}

// --- CHECKOUT PAGE LOGIC ---
function loadCheckout() {
    const container = document.getElementById('checkout-items');
    
    if (cart.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted);">Your cart is empty. <a href="index.html" style="color:var(--accent);">Return to store</a></p>`;
        document.getElementById('checkout-form').querySelector('button').disabled = true;
        return;
    }

    container.innerHTML = cart.map(i => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem;">
            <span>${i.qty}x ${i.name} (${i.size})</span>
            <span>R ${(i.price * i.qty).toLocaleString('en-ZA')}</span>
        </div>
    `).join('');

    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const shipping = 150; // Flat rate for checkout
    const total = subtotal + shipping;

    document.getElementById('checkout-subtotal').textContent = `R ${subtotal.toLocaleString('en-ZA')}.00`;
    document.getElementById('checkout-shipping').textContent = `R ${shipping.toLocaleString('en-ZA')}.00`;
    document.getElementById('checkout-total').textContent = `R ${total.toLocaleString('en-ZA')}.00`;
    document.getElementById('checkout-btn-total').textContent = total.toLocaleString('en-ZA');

    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        btn.textContent = "Processing Payment...";
        btn.disabled = true;

        setTimeout(() => {
            localStorage.removeItem('kicksVaultCart');
            window.location.href = 'success.html';
        }, 2000);
    });
}