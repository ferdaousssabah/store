// ==============================
// SABAH STORE - JAVASCRIPT
// ==============================

// 1. صورة احتياطية: كتظهر إلا ما تحمّلاتش الصورة الأصلية
const fallbackImage =
"data:image/svg+xml;charset=UTF-8," +
encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
<rect width="100%" height="100%" fill="#102b47"/>
<text x="50%" y="48%" fill="#08baff" font-size="30"
text-anchor="middle" font-family="Arial">SABAH STORE</text>
<text x="50%" y="60%" fill="white" font-size="18"
text-anchor="middle" font-family="Arial">Product Image</text>
</svg>
`);

// 2. معلومات المنتجات
const products = [
    {
        id: 1,
        name: "Pro Gaming Laptop",
        category: "PC & Laptops",
        price: 8499,
        oldPrice: 9999,
        discount: "-15%",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=85",
        description: "A modern laptop for gaming, studying and professional work.",
        specs: ["Powerful processor", "Fast SSD storage", "Full HD display", "Portable design"]
    },
    {
        id: 2,
        name: "RGB Gaming Desktop PC",
        category: "Gaming PCs",
        price: 11999,
        oldPrice: 14999,
        discount: "-20%",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=85",
        description: "A gaming desktop setup with a modern RGB design.",
        specs: ["Gaming desktop case", "Performance graphics", "Cooling system", "RGB lighting"]
    },
    {
        id: 3,
        name: "Full HD Gaming Monitor",
        category: "Monitors",
        price: 2299,
        oldPrice: 2999,
        discount: "-25%",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=85",
        description: "A monitor for gaming, entertainment and everyday work.",
        specs: ["Full HD screen", "Slim design", "Clear display", "Modern appearance"]
    },
    {
        id: 4,
        name: "RGB Mechanical Keyboard",
        category: "Gaming Accessories",
        price: 499,
        oldPrice: 599,
        discount: "-15%",
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=85",
        description: "A stylish keyboard for gaming and comfortable typing.",
        specs: ["RGB lighting", "Mechanical style", "Comfortable keys", "Gaming design"]
    },
    {
        id: 5,
        name: "Wireless Gaming Mouse",
        category: "Gaming Accessories",
        price: 249,
        oldPrice: 329,
        discount: "-24%",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=85",
        description: "A comfortable mouse for gaming and daily computer use.",
        specs: ["Wireless connection", "Ergonomic shape", "Comfortable grip", "Modern design"]
    },
    {
        id: 6,
        name: "Professional Office Laptop",
        category: "PC & Laptops",
        price: 5299,
        oldPrice: 5999,
        discount: "-12%",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=85",
        description: "A laptop designed for office tasks, studying and productivity.",
        specs: ["Professional design", "Portable size", "SSD storage", "Suitable for daily work"]
    },
    {
        id: 7,
        name: "Gaming Headset",
        category: "Gaming Accessories",
        price: 399,
        oldPrice: 499,
        discount: "-20%",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=85",
        description: "A headset for gaming, music and online communication.",
        specs: ["Comfortable ear cushions", "Clear audio", "Gaming style", "Suitable for daily use"]
    },
    {
        id: 8,
        name: "Ultra Slim Laptop",
        category: "PC & Laptops",
        price: 6999,
        oldPrice: 7999,
        discount: "-12%",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=85",
        description: "A slim laptop for studying, work and everyday activities.",
        specs: ["Slim design", "Portable computer", "Full HD display", "Daily productivity"]
    }
];

// 3. العناصر
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const cartDrawer = document.getElementById("cartDrawer");
const backdrop = document.getElementById("backdrop");
const toast = document.getElementById("toast");

let cart = [];

// 4. إصلاح الصور تلقائياً
function fixImages(container) {
    container.querySelectorAll("img").forEach(function(img) {
        img.addEventListener("error", function() {
            this.onerror = null;
            this.src = fallbackImage;
        }, { once: true });
    });
}

// 5. رسالة صغيرة
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 2200);
}

// 6. عرض المنتجات
function displayProducts(list = products) {
    productGrid.innerHTML = "";

    document.getElementById("emptyMessage").hidden = list.length !== 0;

    list.forEach(function(product) {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-photo" data-details="${product.id}">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="discount">${product.discount}</span>
            </div>

            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="stars">★★★★★</div>

                <div class="product-price">
                    ${product.price.toLocaleString("en-US")} DH
                    <span class="old-price">
                        ${product.oldPrice.toLocaleString("en-US")} DH
                    </span>
                </div>

                <div class="product-buttons">
                    <button class="add-button" data-add="${product.id}">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>

                    <button class="details-button" data-details="${product.id}">
                        <i class="fa-solid fa-circle-info"></i> View Details
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });

    fixImages(productGrid);
}

// 7. تفاصيل المنتج
function openProductDetails(id) {
    const product = products.find(function(item) {
        return item.id === Number(id);
    });

    if (!product) return;

    modalContent.innerHTML = `
        <div class="modal-layout">
            <img class="modal-image" src="${product.image}" alt="${product.name}">

            <div class="modal-details">
                <span class="modal-category">${product.category}</span>
                <h2>${product.name}</h2>
                <div class="stars">★★★★★</div>

                <p class="modal-description">${product.description}</p>

                <h3>Product Specifications</h3>
                <ul class="modal-specs">
                    ${product.specs.map(function(spec) {
                        return `<li>${spec}</li>`;
                    }).join("")}
                </ul>

                <div class="modal-price">
                    ${product.price.toLocaleString("en-US")} DH
                    <span class="modal-old-price">
                        ${product.oldPrice.toLocaleString("en-US")} DH
                    </span>
                </div>

                <button class="modal-add-button" data-add="${product.id}">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;

    productModal.classList.add("show");
    fixImages(modalContent);
}

// 8. إغلاق نافذة التفاصيل
document.getElementById("closeModal").addEventListener("click", function() {
    productModal.classList.remove("show");
});

productModal.addEventListener("click", function(event) {
    if (event.target === productModal) {
        productModal.classList.remove("show");
    }
});

// 9. إضافة منتج للسلة
function addToCart(id) {
    const product = products.find(function(item) {
        return item.id === Number(id);
    });

    if (!product) return;

    const existing = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showToast(product.name + " added to cart");
}

// 10. أزرار المنتجات
document.addEventListener("click", function(event) {
    const addButton = event.target.closest("[data-add]");
    const detailsButton = event.target.closest("[data-details]");

    if (addButton) {
        addToCart(addButton.dataset.add);
    }

    if (detailsButton) {
        openProductDetails(detailsButton.dataset.details);
    }
});

// 11. تحديث السلة
function updateCart() {
    const count = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    document.getElementById("cartCount").textContent = count;

    const total = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    document.getElementById("cartTotal").textContent =
        total.toLocaleString("en-US") + " DH";

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
        return;
    }

    cartItems.innerHTML = cart.map(function(product) {
        return `
            <div class="cart-line">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h4>${product.name}</h4>
                    <p>${product.quantity} × ${product.price} DH</p>
                </div>
                <button class="remove-button" data-remove="${product.id}" aria-label="Remove">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    }).join("");

    fixImages(cartItems);
}

// 12. حذف منتج من السلة
document.getElementById("cartItems").addEventListener("click", function(event) {
    const button = event.target.closest("[data-remove]");
    if (!button) return;

    const id = Number(button.dataset.remove);
    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    updateCart();
    showToast("Product removed");
});

// 13. فتح وإغلاق السلة
function openCart() {
    cartDrawer.classList.add("show");
    backdrop.classList.add("show");
}

function closeCart() {
    cartDrawer.classList.remove("show");
    backdrop.classList.remove("show");
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

// 14. البحث والتصنيفات
function filterProducts() {
    const search = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;

    const filtered = products.filter(function(product) {
        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    filterProducts();
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// 15. الضغط على تصنيف
document.querySelectorAll(".category-card").forEach(function(button) {
    button.addEventListener("click", function() {
        categoryFilter.value = button.dataset.category;
        filterProducts();
        document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });
});

// 16. الطلب عبر WhatsApp
document.getElementById("checkout").addEventListener("click", function() {
    if (cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    const details = cart.map(function(item) {
        return item.name + " x" + item.quantity +
            " = " + (item.price * item.quantity) + " DH";
    }).join("\n");

    const total = cart.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    const message = "Hello SABAH STORE! My order:\n\n" +
        details + "\n\nTotal: " + total + " DH";

    const url = "https://wa.me/212779488721?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");
});

// 17. Contact Form
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    const subject = "Message from " + name;
    const body = "Name: " + name + "\nEmail: " + email +
        "\n\nMessage:\n" + message;

    window.location.href =
        "mailto:FerdaoussSABAH7@gmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" +
        encodeURIComponent(body);
});

// 18. القائمة في الهاتف
document.getElementById("menuToggle").addEventListener("click", function() {
    document.getElementById("navigation").classList.toggle("show");
});

document.querySelectorAll(".navigation a").forEach(function(link) {
    link.addEventListener("click", function() {
        document.getElementById("navigation").classList.remove("show");
    });
});

// 19. السنة الحالية
document.getElementById("year").textContent = new Date().getFullYear();

// 20. تشغيل الموقع
displayProducts();
updateCart();
fixImages(document);