const carIcon = document.getElementById("bar-icon");
const dropDown = document.getElementById("dropdown");
const gridProducts = document.getElementById("grid-product");
const navOptions = document.getElementsByClassName("nav__option");
const productFilter = document.getElementById("product-filter");
const paginationContainer = document.getElementById("pagination-container");
const paginationElements =
  document.getElementsByClassName("pagination__button");

window.addEventListener("resize", () => {
  if (window.innerWidth > 480) {
    dropDown.style.display = "inherit";
  } else {
    dropDown.style.display = "none";
  }
});

if (window.innerWidth > 480) {
  dropDown.style.display = "inherit";
} else {
  dropDown.style.display = "none";
}

carIcon.addEventListener("click", () => {
  if (dropDown.style.display == "none") {
    dropDown.style.display = "block";
  } else {
    dropDown.style.display = "none";
  }
});

productFilter.addEventListener("submit", async (e) => {
  e.preventDefault();
  const productToSearch = document.getElementById("product-input").value;

  const product = await fetch("https://bsale-markorod.herokuapp.com/products/buscar", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product: productToSearch,
    }),
  });

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
        fontSize: "1.2rem"
      },
    }).showToast();
    getProducts()
  }
  renderProducts(dataProducts.results);
  renderPagination(dataProducts.numberOfPages);
});

document.getElementById("h1_brand").addEventListener("click", () => {
  window.location.reload();
});

const getCategories = async () => {
  const fetchedCategories = await fetch("https://bsale-markorod.herokuapp.com/categories");
  const dataCategories = await fetchedCategories.json();

  const categoryItems = dataCategories.map((category) => {
    return `
        <div>
            <span onclick="filterProductsByCategory(${category.id})" class="hover-underline-animation nav__option">${category.name}</span>
        </div>
        `;
  });

  dropDown.innerHTML = categoryItems.join(" ");

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

const getProducts = async () => {
  const fetchedProducts = await fetch("https://bsale-markorod.herokuapp.com/products", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const dataProducts = await fetchedProducts.json();

  renderProducts(dataProducts.results);
  renderPagination(dataProducts.numberOfPages);
};

const toastAgregar = () => {
  Toastify({
    text: "Producto agregado al carrito",
    duration: 3000,
    gravity: "top",
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #ff416c, #ff4b2b)",
      fontSize: "1.2rem"
    },
  }).showToast();
}

const renderProducts = (arrayProducts) => {
  const productsItems = arrayProducts.map((product) => {
    return `
        <div class="card">
            ${
              product.url_image?.length <= 0 || product.url_image == null
                ? `<img src='https://www.ti.com/content/dam/ticom/images/icons/illustrative-icons/miscellaneous/no-image-available-icon.png' />`
                : `<img src="${product.url_image}" />`
            }       
            <div class="card__info">  
            <span class="card__info--sub">${product.namecat}</span> <br/>
            <span class="card__info--name">${product.name}</span><br/>
            ${
              product.discount > 0
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

const renderPagination = (length) => {
  const paginationButtons = [];
  for (let i = 0; i < length; i++) {
    paginationButtons.push(
      `<button onclick="getPaginatedResults(${
        i + 1
      })" class="pagination__button">${i + 1}</button>`
    );
  }

  paginationContainer.innerHTML = paginationButtons.join(" ");
};

const getPaginatedResults = async (page) => {
  const products = await fetch("https://bsale-markorod.herokuapp.com/products/paginado", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: page,
    }),
  });

  const dataProducts = await products.json();

  renderProducts(dataProducts.results);
};

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
  renderProducts(dataProducts.results);
  renderPagination(dataProducts.numberOfPages);
};

const firstLoad = () => {
  getCategories();
  getProducts();
};
