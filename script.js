// PRODUCT DATABASE
const products = [
    {
        id: 1,
        name: "Air Jordan 1 High OG",
        brand: "Jordan",
        price: 2499.00,
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Nike Dunk Low Retro",
        brand: "Nike",
        price: 1899.00,
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Yeezy Boost 350 V2",
        brand: "Yeezy",
        price: 3299.00,
        size: "UK 10",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Air Jordan 4 Retro",
        brand: "Jordan",
        price: 3499.00,
        size: "UK 7",
        image: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=600&q=80"
    }
];

let cart = [];

// RENDER PRODUCTS
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `<p style="color: var(--text-grey);">No sneakers match your filters.</p>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <span class="product-brand">${product.brand} | Size: ${product.size}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">R${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// CART LOGIC
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cartCount').textContent = cart.length;
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');

    if (cart.length === 0) {
        container.innerHTML = `<p style="color: var(--text-grey);">Your cart is currently empty.</p>`;
        totalEl.textContent = `Total: R0.00`;
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small style="color: var(--text-grey);">R${item.price.toFixed(2)}</small>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color: var(--accent-red); cursor:pointer;">Remove</button>
        `;
        container.appendChild(div);
    });

    totalEl.textContent = `Total: R${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// FILTER & SEARCH HANDLERS
function filterProducts() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const brandVal = document.getElementById('brandFilter').value;
    const sizeVal = document.getElementById('sizeFilter').value;

    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchVal) || p.brand.toLowerCase().includes(searchVal);
        const matchesBrand = brandVal === 'all' || p.brand === brandVal;
        const matchesSize = sizeVal === 'all' || p.size === sizeVal;
        return matchesSearch && matchesBrand && matchesSize;
    });

    renderProducts(filtered);
}

document.getElementById('searchInput').addEventListener('input', filterProducts);
document.getElementById('brandFilter').addEventListener('change', filterProducts);
document.getElementById('sizeFilter').addEventListener('change', filterProducts);

// MODAL TOGGLES
const modal = document.getElementById('cartModal');
document.getElementById('openCart').onclick = () => modal.classList.add('active');
document.getElementById('closeCart').onclick = () => modal.classList.remove('active');

// INITIAL LOAD
renderProducts(products);