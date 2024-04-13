// Arreglo de productos del carro
let products = [];

// Función para cargar los productos 
const loadProductsFromLocalStorage = () => {
  products = JSON.parse(localStorage.getItem('products')) ?? [];
  products.forEach(addItemModal);
  // Actualiza el contador de productos en el carro
  toggleItemsCount();
};

// Función para agregar un producto al carro
const addProductToCart = (product) => {
  if (!products.includes(product)) {
    products.push(product);
    toggleItemsCount();
    addItemModal(product);
    localStorage.setItem('products', JSON.stringify(products));
  }
};

// Función para limpiar el carro
const clearCart = () => {
  products = [];
  localStorage.clear();
  toggleItemsCount();
  $('#items-modal').empty();
  $('.modal').modal('hide');
};

// Función para mostrar u ocultar el contador de productos en el carro
const toggleItemsCount = () => {
  // Obtiene el número de productos en el carro
  const items = products.length;
  // Muestra u oculta el contador dependiendo del número de productos
  $('#shoppingcaritems').text(items).toggle(items > 0);
};

// Función para agregar un elemento al modal
const addItemModal = (item) => {
  // Crea el HTML para mostrar el producto en el modal
  const html = `<div class="card col-1 mx-1 my-1 tooltip-test" title="${item}" style="width: 5rem"><img src="img/${item}.png" class="card-img"></div>`;
  $('#items-modal').append(html);
};

// Ejecutar cuando el documento esté listo
$(function() {
  loadProductsFromLocalStorage();

  // Manejador de evento para agregar un producto al carro cuando se hace clic en él
  $('.product-card').on('click', function() {
    const product = $(this).attr('id');
    addProductToCart(product);
  });

  // Manejador de evento para mostrar el modal cuando se hace clic en el icono del carro
  $('#shoppingcar').on('click', function() {
    // Muestra el modal si hay productos en el carro, de lo contrario muestra una alerta
    if (products.length > 0) {
      $('.modal').modal('show');
    } else {
      alert('El carro está vacío');
    }
  });

  // Manejador de evento para limpiar el carro cuando se hace clic en "Clear Items"
  $('#clearitems').on('click', clearCart);
});