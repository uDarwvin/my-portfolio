const addBtns = document.querySelectorAll('[data-add-to-cart]');
const cartItems = document.getElementById('cart-items');
const emptyCart = document.getElementById('empty-cart');
const cartTotal = document.getElementById('cart-total');

let cart = [];

addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.card');
        if (card) {
            addToCart(card);
        }
    });
});

function formatPrice(num) {
    return num.toLocaleString('fa-IR') + ' تومان';
}

function addToCart(card) {
    const id    = String(card.dataset.id);
    const title = card.dataset.title;
    const price = Number(card.dataset.price);
    const image = card.dataset.image;

    const existing = cart.find((item) => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, title, price, image, qty: 1 });
    }

    renderCart();
    updateCartCount();
}

function renderCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartTotal.textContent = '۰ تومان';
        return;
    }

    emptyCart.style.display = 'none';
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.qty;
        const row = document.createElement('div');
        row.className = 'd-flex align-items-center justify-content-between mb-3 border-bottom pb-2';
        row.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <img src="${item.image}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;">
                <div>
                    <div class="text-white">${item.title}</div>
                    <small class="text-secondary">${formatPrice(item.price)} × ${item.qty}</small>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" data-remove="${item.id}">
                <i class="fa fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(row);
    });

    cartTotal.textContent = formatPrice(total);

    // remove items
    cartItems.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = String(btn.dataset.remove);
            cart = cart.filter(item => item.id !== id);
            renderCart();
            updateCartCount();
        });
    });
}

// badge
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const btn = document.querySelector('[data-bs-target="#exampleModal"]');
    if (!btn) return;

    let badge = btn.querySelector('.cart-badge');
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.style.cssText = `
            background:#fff; color:#026AD1; border-radius:50%;
            padding:2px 7px; font-size:0.75rem; margin-right:5px;
        `;
        btn.appendChild(badge);
    }
    badge.textContent = count > 0 ? count.toLocaleString('fa-IR') : '';
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
