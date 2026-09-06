/**
 * House of Madhu Das Gupta — Shop / Cart / Checkout
 * localStorage key: mdg_cart
 */
(function () {
  "use strict";

  var CART_KEY = "mdg_cart";
  var WA_NUMBER = "919892027604";

  function getCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      var data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function cartCount(cart) {
    return (cart || getCart()).reduce(function (sum, item) {
      return sum + (Number(item.qty) || 0);
    }, 0);
  }

  function cartTotal(cart) {
    return (cart || getCart()).reduce(function (sum, item) {
      return sum + (Number(item.price) || 0) * (Number(item.qty) || 0);
    }, 0);
  }

  function updateCartBadge() {
    var count = cartCount();
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.textContent = String(count);
      el.style.display = count > 0 ? "" : "";
      el.setAttribute("data-count", String(count));
    });
  }

  function addToCart(product, opts) {
    opts = opts || {};
    var size = opts.size || "M";
    var qty = Math.max(1, parseInt(opts.qty, 10) || 1);
    var cart = getCart();
    var existing = cart.find(function (i) {
      return i.id === product.id && i.size === size;
    });
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        collection: product.collection,
        size: size,
        qty: qty
      });
    }
    saveCart(cart);
    return cart;
  }

  function updateQty(id, size, qty) {
    var cart = getCart();
    var item = cart.find(function (i) {
      return i.id === id && i.size === size;
    });
    if (!item) return;
    qty = parseInt(qty, 10);
    if (isNaN(qty) || qty < 1) {
      cart = cart.filter(function (i) {
        return !(i.id === id && i.size === size);
      });
    } else {
      item.qty = qty;
    }
    saveCart(cart);
  }

  function removeFromCart(id, size) {
    var cart = getCart().filter(function (i) {
      return !(i.id === id && i.size === size);
    });
    saveCart(cart);
  }

  function clearCart() {
    saveCart([]);
  }

  function productCardHTML(p) {
    var price = window.MDG_formatPrice ? MDG_formatPrice(p.price) : "₹" + p.price;
    return (
      '<a class="product-card" href="product.html?id=' +
      encodeURIComponent(p.id) +
      '">' +
      '<div class="product-card-img"><img src="' +
      p.image +
      '" alt="' +
      escapeHtml(p.name) +
      '" loading="lazy"></div>' +
      '<div class="product-card-body">' +
      '<div class="product-card-collection">' +
      escapeHtml(p.collection) +
      "</div>" +
      "<h3>" +
      escapeHtml(p.name) +
      "</h3>" +
      '<div class="product-card-price">' +
      price +
      "</div>" +
      '<span class="product-card-cta">View Details</span>' +
      "</div></a>"
    );
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderProductGrids() {
    if (!window.MDG_PRODUCTS) return;

    document.querySelectorAll("[data-collection]").forEach(function (el) {
      var name = el.getAttribute("data-collection");
      var list = MDG_getByCollection(name);
      if (!list.length) {
        el.innerHTML =
          '<p class="shop-empty">New pieces arriving soon. <a href="https://wa.me/' +
          WA_NUMBER +
          '" target="_blank">Enquire on WhatsApp</a></p>';
        return;
      }
      el.innerHTML = list.map(productCardHTML).join("");
    });

    var allGrid = document.getElementById("product-grid");
    if (allGrid && !allGrid.getAttribute("data-collection")) {
      allGrid.innerHTML = MDG_PRODUCTS.map(productCardHTML).join("");
    }
  }

  function qs(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function renderPDP() {
    var root = document.getElementById("pdp-root");
    if (!root || !window.MDG_getProduct) return;

    var product = MDG_getProduct(qs("id") || qs("slug"));
    if (!product) {
      root.innerHTML =
        '<div class="shop-empty-state"><h2>Product not found</h2><p>Please browse our collections.</p>' +
        '<a class="gold-btn" href="collections.html">View Collections</a></div>';
      return;
    }

    document.title = product.name + " | House of Madhu Das Gupta";

    var price = MDG_formatPrice(product.price);
    var thumbs = [product.image];
    // Tasteful reuse of related collection imagery when only one photo exists
    if (product.collection === "Bridal") thumbs.push("cocktail.JPG");
    else if (product.collection === "Couture") thumbs.push("evening.jpg", "cocktail.JPG");
    else if (product.collection === "Evening") thumbs.push("cocktail.JPG");
    else if (product.collection === "Sherwani") thumbs.push("Sherwani.jpg");
    else if (product.collection === "Resort") thumbs.push("resort.JPG");
    // unique thumbs
    thumbs = thumbs.filter(function (v, i, a) {
      return a.indexOf(v) === i;
    });

    root.innerHTML =
      '<div class="pdp-gallery">' +
      '<img id="pdp-main-img" class="pdp-main-img" src="' +
      product.image +
      '" alt="' +
      escapeHtml(product.name) +
      '">' +
      '<div class="pdp-thumbs">' +
      thumbs
        .map(function (src, i) {
          return (
            '<button type="button" class="pdp-thumb' +
            (i === 0 ? " active" : "") +
            '" data-src="' +
            src +
            '"><img src="' +
            src +
            '" alt=""></button>'
          );
        })
        .join("") +
      "</div></div>" +
      '<div class="pdp-info">' +
      '<div class="section-mini">' +
      escapeHtml(product.collection).toUpperCase() +
      "</div>" +
      "<h1>" +
      escapeHtml(product.name) +
      "</h1>" +
      '<div class="pdp-price">' +
      price +
      "</div>" +
      "<p>" +
      escapeHtml(product.description) +
      "</p>" +
      '<div class="pdp-meta">' +
      "<p><strong>Fabric:</strong> " +
      escapeHtml(product.fabric) +
      "</p>" +
      "<p><strong>Embroidery:</strong> " +
      escapeHtml(product.embroidery) +
      "</p>" +
      "<p><strong>Delivery:</strong> " +
      escapeHtml(product.delivery) +
      "</p>" +
      "<p><strong>Customization:</strong> " +
      escapeHtml(product.customization) +
      "</p>" +
      "</div>" +
      '<label for="pdp-size">SIZE</label>' +
      '<select id="pdp-size">' +
      "<option>XS</option><option>S</option><option selected>M</option>" +
      "<option>L</option><option>XL</option><option>Custom</option>" +
      "</select>" +
      '<label for="pdp-qty">QUANTITY</label>' +
      '<input type="number" id="pdp-qty" value="1" min="1" max="10">' +
      '<div class="pdp-actions">' +
      '<button type="button" class="gold-btn" id="pdp-add">ADD TO CART</button>' +
      '<button type="button" class="outline-btn" id="pdp-buy">ENQUIRE / BUY</button>' +
      "</div>" +
      '<a class="pdp-wa" id="pdp-wa" href="#" target="_blank" rel="noopener">' +
      '<i class="fab fa-whatsapp"></i> WhatsApp Stylist</a>' +
      '<p class="pdp-back"><a href="' +
      collectionPage(product.collection) +
      '">← Back to ' +
      escapeHtml(product.collection) +
      "</a></p>" +
      "</div>";

    var mainImg = document.getElementById("pdp-main-img");
    root.querySelectorAll(".pdp-thumb").forEach(function (btn) {
      btn.addEventListener("click", function () {
        root.querySelectorAll(".pdp-thumb").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        mainImg.src = btn.getAttribute("data-src");
      });
    });

    function currentOpts() {
      return {
        size: document.getElementById("pdp-size").value,
        qty: document.getElementById("pdp-qty").value
      };
    }

    document.getElementById("pdp-add").addEventListener("click", function () {
      addToCart(product, currentOpts());
      var btn = document.getElementById("pdp-add");
      var prev = btn.textContent;
      btn.textContent = "ADDED ✓";
      setTimeout(function () {
        btn.textContent = prev;
      }, 1400);
    });

    document.getElementById("pdp-buy").addEventListener("click", function () {
      addToCart(product, currentOpts());
      window.location.href = "cart.html";
    });

    var waMsg =
      "Hello House of Madhu Das Gupta, I'm interested in " +
      product.name +
      " (" +
      price +
      "). Please advise on availability & customization.";
    document.getElementById("pdp-wa").href =
      "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(waMsg);
  }

  function collectionPage(name) {
    var map = {
      Bridal: "bridal.html",
      Couture: "couture.html",
      Sherwani: "sherwani.html",
      Evening: "evening.html",
      Resort: "resort.html"
    };
    return map[name] || "collections.html";
  }

  function renderCartPage() {
    var listEl = document.getElementById("cart-items");
    var summaryEl = document.getElementById("cart-summary");
    var emptyEl = document.getElementById("cart-empty");
    if (!listEl) return;

    var cart = getCart();
    if (!cart.length) {
      listEl.innerHTML = "";
      if (summaryEl) summaryEl.style.display = "none";
      if (emptyEl) emptyEl.style.display = "block";
      return;
    }
    if (emptyEl) emptyEl.style.display = "none";
    if (summaryEl) summaryEl.style.display = "";

    listEl.innerHTML = cart
      .map(function (item) {
        var line = item.price * item.qty;
        return (
          '<div class="cart-item" data-id="' +
          escapeHtml(item.id) +
          '" data-size="' +
          escapeHtml(item.size) +
          '">' +
          '<a href="product.html?id=' +
          encodeURIComponent(item.id) +
          '" class="cart-item-img"><img src="' +
          item.image +
          '" alt="' +
          escapeHtml(item.name) +
          '"></a>' +
          '<div class="cart-item-info">' +
          "<h3>" +
          escapeHtml(item.name) +
          "</h3>" +
          '<p class="cart-item-meta">Size: ' +
          escapeHtml(item.size) +
          " · " +
          escapeHtml(item.collection) +
          "</p>" +
          '<p class="cart-item-price">' +
          MDG_formatPrice(item.price) +
          "</p>" +
          '<div class="cart-item-controls">' +
          '<label>Qty <input type="number" class="cart-qty" min="1" max="10" value="' +
          item.qty +
          '"></label>' +
          '<button type="button" class="cart-remove">Remove</button>' +
          "</div>" +
          '<p class="cart-item-line">Line: ' +
          MDG_formatPrice(line) +
          "</p>" +
          "</div></div>"
        );
      })
      .join("");

    listEl.querySelectorAll(".cart-item").forEach(function (row) {
      var id = row.getAttribute("data-id");
      var size = row.getAttribute("data-size");
      row.querySelector(".cart-qty").addEventListener("change", function (e) {
        updateQty(id, size, e.target.value);
        renderCartPage();
      });
      row.querySelector(".cart-remove").addEventListener("click", function () {
        removeFromCart(id, size);
        renderCartPage();
      });
    });

    var sub = cartTotal(cart);
    var subEl = document.getElementById("cart-subtotal");
    var totEl = document.getElementById("cart-total");
    if (subEl) subEl.textContent = MDG_formatPrice(sub);
    if (totEl) totEl.textContent = MDG_formatPrice(sub);
  }

  function renderCheckoutSummary() {
    var box = document.getElementById("checkout-summary");
    if (!box) return;
    var cart = getCart();
    if (!cart.length) {
      box.innerHTML =
        '<div class="shop-empty-state"><p>Your cart is empty.</p>' +
        '<a class="gold-btn" href="collections.html">Browse Collections</a></div>';
      var form = document.getElementById("checkout-form");
      if (form) form.style.display = "none";
      return;
    }
    var rows = cart
      .map(function (item) {
        return (
          '<div class="checkout-line"><span>' +
          escapeHtml(item.name) +
          " × " +
          item.qty +
          " (" +
          escapeHtml(item.size) +
          ')</span><span>' +
          MDG_formatPrice(item.price * item.qty) +
          "</span></div>"
        );
      })
      .join("");
    box.innerHTML =
      '<h2>Order Summary</h2>' +
      rows +
      '<div class="checkout-total"><span>Total</span><span>' +
      MDG_formatPrice(cartTotal(cart)) +
      "</span></div>";
  }

  function buildWhatsAppMessage(customer) {
    var cart = getCart();
    var lines = [
      "Hello House of Madhu Das Gupta — New Enquiry / Order",
      "",
      "Name: " + customer.name,
      "Phone: " + customer.phone
    ];
    if (customer.notes) lines.push("Notes: " + customer.notes);
    lines.push("", "Items:");
    cart.forEach(function (item, idx) {
      lines.push(
        idx +
          1 +
          ". " +
          item.name +
          " | Size: " +
          item.size +
          " | Qty: " +
          item.qty +
          " | " +
          MDG_formatPrice(item.price * item.qty)
      );
    });
    lines.push("", "Total: " + MDG_formatPrice(cartTotal(cart)));
    lines.push("", "Please confirm availability & next steps. Thank you.");
    return lines.join("\n");
  }

  function bindCheckoutForm() {
    var form = document.getElementById("checkout-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var cart = getCart();
      if (!cart.length) {
        alert("Your cart is empty.");
        return;
      }
      var name = (document.getElementById("checkout-name") || {}).value || "";
      var phone = (document.getElementById("checkout-phone") || {}).value || "";
      var notes = (document.getElementById("checkout-notes") || {}).value || "";
      name = name.trim();
      phone = phone.trim();
      if (!name || !phone) {
        alert("Please enter your name and phone number.");
        return;
      }
      var msg = buildWhatsAppMessage({ name: name, phone: phone, notes: notes.trim() });
      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
      if (confirm("Enquiry opened in WhatsApp. Clear your cart?")) {
        clearCart();
        window.location.href = "index.html";
      }
    });
  }


  function designerLinkHTML(d) {
    var initial = (d.name || "?").charAt(0).toUpperCase();
    var portrait = d.image
      ? '<img class="designer-card-photo" src="' +
        d.image +
        '" alt="' +
        escapeHtml(d.name) +
        '">'
      : '<span class="designer-card-initial" aria-hidden="true">' +
        escapeHtml(initial) +
        "</span>";
    return (
      '<a class="designer-card-link" href="designer.html?id=' +
      encodeURIComponent(d.slug) +
      '">' +
      '<span class="designer-card-portrait">' +
      portrait +
      "</span>" +
      '<span class="designer-card-name">' +
      escapeHtml(d.name) +
      "</span>" +
      "</a>"
    );
  }

  function renderDesignersList() {
    if (!window.MDG_DESIGNERS) return;
    var lists = document.querySelectorAll("#designers-list, [data-designers-list]");
    if (!lists.length) return;
    var sorted = MDG_DESIGNERS.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    var html = sorted.map(designerLinkHTML).join("");
    lists.forEach(function (el) {
      el.innerHTML = html;
    });
  }

  function renderDesignerShowroom() {
    var root = document.getElementById("designer-store");
    if (!root) return;
    if (!window.MDG_getDesigner) {
      root.innerHTML =
        '<div class="shop-empty-state"><h2>Designers unavailable</h2>' +
        '<a class="gold-btn" href="designers.html">Browse Designers</a></div>';
      return;
    }

    var designer = MDG_getDesigner(qs("id") || qs("slug"));
    if (!designer) {
      root.innerHTML =
        '<div class="shop-empty-state"><h2>Designer not found</h2>' +
        '<p>Please browse our designer directory.</p>' +
        '<a class="gold-btn" href="designers.html">All Designers</a></div>';
      return;
    }

    document.title = designer.name + " | House of Madhu Das Gupta";

    var products =
      typeof MDG_getProductsByDesigner === "function"
        ? MDG_getProductsByDesigner(designer.id)
        : typeof MDG_getByDesigner === "function"
          ? MDG_getByDesigner(designer.id)
          : [];

    // Fallback: filter by productIds if helper missing products
    if (!products.length && designer.productIds && window.MDG_getProduct) {
      products = designer.productIds
        .map(function (pid) {
          return MDG_getProduct(pid);
        })
        .filter(Boolean);
    }

    var waMsg =
      "Hello House of Madhu Das Gupta, I'd like to enquire about " +
      designer.name +
      "'s collection. Please advise on availability & consultation.";
    var waHref =
      "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(waMsg);

    var heroInner;
    if (designer.image) {
      heroInner =
        '<div class="designer-portrait-hero">' +
        '<div class="designer-portrait">' +
        '<img src="' +
        designer.image +
        '" alt="' +
        escapeHtml(designer.name) +
        '">' +
        "</div>" +
        '<div class="designer-portrait-copy">' +
        '<div class="section-mini">DESIGNER SHOWROOM</div>' +
        "<h1>" +
        escapeHtml(designer.name) +
        "</h1>" +
        "<p>" +
        escapeHtml(designer.bio) +
        "</p>" +
        "</div></div>";
    } else {
      heroInner =
        '<div class="section-mini">DESIGNER SHOWROOM</div>' +
        "<h1>" +
        escapeHtml(designer.name) +
        "</h1>" +
        "<p>" +
        escapeHtml(designer.bio) +
        "</p>";
    }

    var OCCASION_ORDER = ["Wedding", "Casual", "Outdoor", "Cocktail", "Evening"];
    var hasOccasion = products.some(function (p) {
      return p && p.occasion;
    });

    var productsHTML = "";
    if (!products.length) {
      productsHTML =
        '<p class="shop-empty">Pieces arriving soon. <a href="' +
        waHref +
        '" target="_blank" rel="noopener">Enquire on WhatsApp</a></p>';
    } else if (hasOccasion) {
      OCCASION_ORDER.forEach(function (occ) {
        var group = products.filter(function (p) {
          return p.occasion === occ;
        });
        if (!group.length) return;
        productsHTML +=
          '<div class="designer-occasion-section">' +
          '<h3 class="designer-occasion-heading">' +
          escapeHtml(occ) +
          "</h3>" +
          '<div class="product-grid designer-product-grid">' +
          group.map(productCardHTML).join("") +
          "</div></div>";
      });
      // Any products without occasion fall into a final "More" section
      var ungrouped = products.filter(function (p) {
        return !p.occasion;
      });
      if (ungrouped.length) {
        productsHTML +=
          '<div class="designer-occasion-section">' +
          '<h3 class="designer-occasion-heading">More</h3>' +
          '<div class="product-grid designer-product-grid">' +
          ungrouped.map(productCardHTML).join("") +
          "</div></div>";
      }
    } else {
      productsHTML =
        '<div class="product-grid designer-product-grid">' +
        products.map(productCardHTML).join("") +
        "</div>";
    }

    root.innerHTML =
      '<section class="designer-showroom-hero' +
      (designer.image ? " has-portrait" : "") +
      '">' +
      heroInner +
      '<div class="designer-showroom-actions">' +
      '<a class="gold-btn" href="' +
      waHref +
      '" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> ENQUIRE ABOUT ' +
      escapeHtml(designer.name).toUpperCase() +
      "</a>" +
      '<a class="outline-btn" href="designers.html">ALL DESIGNERS</a>' +
      "</div></section>" +
      '<section class="plp-section designer-showroom-products">' +
      '<div class="section-mini">FLAGSHIP &amp; FAST-MOVING</div>' +
      "<h2>Shop the Collection</h2>" +
      productsHTML +
      "</section>";
  }

  function renderFeaturedDesignerStrip() {
    var el = document.getElementById("featured-designer-strip");
    if (!el || !window.MDG_getDesigner) return;
    var d = MDG_getDesigner("sakshi-bindra");
    if (!d) return;
    el.innerHTML =
      '<div class="featured-designer-strip-inner">' +
      (d.image
        ? '<img src="' +
          d.image +
          '" alt="' +
          escapeHtml(d.name) +
          '">'
        : "") +
      '<div class="featured-designer-strip-copy">' +
      '<div class="section-mini">FEATURED</div>' +
      "<h2>" +
      escapeHtml(d.name) +
      "</h2>" +
      "<p>" +
      escapeHtml(d.bio) +
      "</p>" +
      '<a class="outline-btn" href="designer.html?id=' +
      encodeURIComponent(d.slug) +
      '">VIEW SHOWROOM</a>' +
      "</div></div>";
  }

  // Public API (for debugging / extensions)
  window.MDG_Shop = {
    getCart: getCart,
    addToCart: addToCart,
    updateQty: updateQty,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    updateCartBadge: updateCartBadge,
    cartCount: cartCount,
    cartTotal: cartTotal
  };

  document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    renderProductGrids();
    renderPDP();
    renderCartPage();
    renderCheckoutSummary();
    bindCheckoutForm();
    renderDesignersList();
    renderDesignerShowroom();
    renderFeaturedDesignerStrip();
  });
})();
