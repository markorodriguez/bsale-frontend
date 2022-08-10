const carIcon = document.getElementById("bar-icon");
const dropDown = document.getElementById("dropdown");
const gridProducts = document.getElementById("grid-product");
const navOptions = document.getElementsByClassName("nav__option");
const productFilter = document.getElementById("product-filter");
const paginationContainer = document.getElementById("pagination-container");
const paginationElements = document.getElementsByClassName("pagination__button");

//Responsividad del navbar
window.addEventListener("resize", () => {
  if (window.innerWidth > 480) {
    dropDown.style.display = "inherit";
  } else {
    dropDown.style.display = "none";
  }
});

//Responsividad del navbar
if (window.innerWidth > 480) {
  dropDown.style.display = "inherit";
} else {
  dropDown.style.display = "none";
}

//Activar el menú dropdown 
carIcon.addEventListener("click", () => {
  if (dropDown.style.display == "none") {
    dropDown.style.display = "block";
  } else {
    dropDown.style.display = "none";
  }
});

//Búsqueda de producto mediante el campo de texto
productFilter.addEventListener("submit", async (e) => {
  e.preventDefault();
  const productToSearch = document.getElementById("product-input").value;

  const product = await fetch(
    "https://bsale-markorod.herokuapp.com/products/buscar",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: productToSearch,
      }),
    }
  );

//Notificar si no hay productos con el nombre ingresado
  const dataProducts = await product.json();
  if (dataProducts.results.length == 0) {
    Toastify({
      text: "No se encontraron resultados",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        fontSize: "1.2rem",
      },
    }).showToast();
    getProducts();
  }

//Renderizar productos y paginación correspondiente
  renderProducts(dataProducts.results);
  renderPagination(dataProducts.numberOfPages);
});

//Refrescar la página si clickea el logo
document.getElementById("h1_brand").addEventListener("click", () => {
  window.location.reload();
});

//Obtener las categorías desde la BD
const getCategories = async () => {
  const fetchedCategories = await fetch(
    "https://bsale-markorod.herokuapp.com/categories",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }
  );

  const dataCategories = await fetchedCategories.json();

//Generar los elementos HTML correspondientes para categoría 
  const categoryItems = dataCategories.map((category) => {
    return `
        <div>
            <span onclick="filterProductsByCategory(${category.id})" class="hover-underline-animation nav__option">${category.name}</span>
        </div>
        `;
  });

  dropDown.innerHTML = categoryItems.join(" ");

//Marcar la categoría clickeada por el usuario  
  for (let i = 0; i < navOptions.length; i++) {
    navOptions[i].addEventListener("click", () => {
      navOptions[i].classList.add("active");
      for (let j = 0; j < navOptions.length; j++) {
        if (i !== j) {
          navOptions[j].classList.remove("active");
        }
      }
    });
  }
};

//Obtener productos de la base de datos
const getProducts = async () => {
  const fetchedProducts = await fetch(
    "https://bsale-markorod.herokuapp.com/products",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const dataProducts = await fetchedProducts.json();

//Renderizar los productos y la paginación correspondiente  
  renderProducts(dataProducts.results);
  renderPagination(dataProducts.numberOfPages);
};

//Acción cuando se clickea el botón de agregar (Simula un carrito)
const toastAgregar = () => {
  Toastify({
    text: "Producto agregado al carrito",
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      fontSize: "1.2rem",
    },
  }).showToast();
};

//Generar los cards respectivos para cada producto
const renderProducts = (arrayProducts) => {
  const productsItems = arrayProducts.map((product) => {
    return `
        <div class="card">
            ${product.url_image?.length <= 0 || product.url_image == null
        ? `<img src='https://www.ti.com/content/dam/ticom/images/icons/illustrative-icons/miscellaneous/no-image-available-icon.png' />`
        : `<img src="${product.url_image}" />`
      }       
            <div class="card__info">  
            <span class="card__info--sub">${product.namecat}</span> <br/>
            <span class="card__info--name">${product.name}</span><br/>
            ${product.discount > 0
        ? `<span class="card__info--price">CLP ${product.newPrice}</span>
            <span class="card__info--discount">- ${product.discount} %</span> <br/>
            <span class="card__info--base">CLP ${product.price}</span> <br/> `
        : `<span class="card__info--price">CLP ${product.newPrice}</span> <br/>`
      }
            <button class="btn" onclick="toastAgregar()">Agregar</button>
            </div>
        </div>
        `;
  });

  gridProducts.innerHTML = productsItems.join(" ");
};

//Generar items de la paginación según la cantidad de páginas que posee
const renderPagination = (length) => {
  const paginationButtons = [];
  for (let i = 0; i < length; i++) {
    paginationButtons.push(
      `<button onclick="getPaginatedResults(${i + 1
      })" class="pagination__button">${i + 1}</button>`
    );
  }

  paginationContainer.innerHTML = paginationButtons.join(" ");
};

//Obtener productos según el número de la página
const getPaginatedResults = async (page) => {
  const products = await fetch(
    "https://bsale-markorod.herokuapp.com/products/paginado",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: page,
      }),
    }
  );

  const dataProducts = await products.json();

  renderProducts(dataProducts.results);
};

//Filtrar productos según la categoría clickeada
const filterProductsByCategory = async (categoryId) => {
  const filteredProducts = await fetch(
    "https://bsale-markorod.herokuapp.com/products/filtrado-categoria",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: categoryId,
      }),
    }
  );

  const dataProducts = await filteredProducts.json();

//renderizar los productos y paginación correspondiente
  renderProducts(dataProducts.results);
  renderPagination(dataProducts.numberOfPages);
};

//Función ejecutada en el evento onLoad del HTML
const firstLoad = () => {
  getCategories();
  getProducts();
};
