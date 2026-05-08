/* NEEDLORE Theme — Cart JS */
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart AJAX
  const forms = document.querySelectorAll('form[action="/cart/add"]');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = new FormData(form);
      fetch('/cart/add.js', { method: 'POST', body: data })
        .then(r => r.json())
        .then(function() {
          fetch('/cart.js').then(r => r.json()).then(function(cart) {
            const badge = document.querySelector('.cart-count');
            if (badge) { badge.textContent = cart.item_count; badge.style.display = 'flex'; }
            else {
              const el = document.createElement('span');
              el.className = 'cart-count';
              el.textContent = cart.item_count;
              document.querySelector('.site-header__cart').appendChild(el);
            }
          });
        });
    });
  });
});
