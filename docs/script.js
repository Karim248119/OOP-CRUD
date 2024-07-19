class Product {
  constructor(id, name, category, price, description) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
  }
}

class ProductManager {
  constructor() {
    this.products = this.loadProducts();
    this.productForm = document.getElementById("product-form");
    this.createButton = document.getElementById("create-btn");
    this.clearButton = document.getElementById("clear-btn");
    this.tableBody = document.getElementById("table-body");
    this.alertModal = document.getElementById("alert-modal");
    this.warningMsg = document.getElementById("warning-msg");

    this.productForm.addEventListener("submit", this.handleSubmit.bind(this));
    this.clearButton.addEventListener("click", this.clearForm.bind(this));

    this.renderProducts();
  }

  loadProducts() {
    const productsJson = localStorage.getItem("products");
    return productsJson ? JSON.parse(productsJson) : [];
  }

  saveProducts() {
    localStorage.setItem("products", JSON.stringify(this.products));
  }

  handleSubmit(event) {
    event.preventDefault();

    const productName = document.getElementById("product_name").value.trim();
    const productCategory = document
      .getElementById("product_category")
      .value.trim();
    const productPrice = document.getElementById("product_price").value.trim();
    const productDesc = document.getElementById("product_desc").value.trim();

    if (!productName || !productCategory || !productPrice) {
      this.showAlert("Please fill out all fields", "error");
      return;
    }

    const submitButton = document.getElementById("create-btn");
    const action = submitButton.innerText.toLowerCase();

    if (action === "create") {
      const newProduct = new Product(
        Date.now(),
        productName,
        productCategory,
        productPrice,
        productDesc
      );
      this.products.push(newProduct);
      this.showAlert("Product added successfully!", "success");
    } else if (action === "update") {
      const productId = parseInt(submitButton.getAttribute("data-id"));
      const index = this.products.findIndex(
        (product) => product.id === productId
      );

      this.products[index].name = productName;
      this.products[index].category = productCategory;
      this.products[index].price = productPrice;
      this.products[index].description = productDesc;

      this.showAlert("Product updated successfully!", "success");
      submitButton.innerText = "Create";
      submitButton.removeAttribute("data-id");
    }

    this.clearForm();
    this.saveProducts();
    this.renderProducts();
  }

  clearForm() {
    this.productForm.reset();
  }

  renderProducts() {
    this.tableBody.innerHTML = "";

    if (this.products.length === 0) {
      this.warningMsg.classList.remove("hidden");
      return;
    } else {
      this.warningMsg.classList.add("hidden");
    }

    this.products.forEach((product, index) => {
      const row = `
        <tr class="border-b border-gray-300">
          <td class="py-2 px-4">${index + 1}</td>
          <td class="py-2 px-4">${product.name}</td>
          <td class="py-2 px-4">${product.category}</td>
          <td class="py-2 px-4">$${product.price}</td>
          <td class="py-2 px-4">${product.description}</td>
          <td class="py-2 px-4">
            <button class="bg-blue-500 text-white px-2 py-1 rounded mr-2" onclick="productManager.editProduct(${
              product.id
            })">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="productManager.deleteProduct(${
              product.id
            })">Delete</button>
          </td>
        </tr>
      `;
      this.tableBody.innerHTML += row;
    });
  }

  editProduct(productId) {
    const product = this.products.find((product) => product.id === productId);

    document.getElementById("product_name").value = product.name;
    document.getElementById("product_category").value = product.category;
    document.getElementById("product_price").value = product.price;
    document.getElementById("product_desc").value = product.description;

    const submitButton = document.getElementById("create-btn");
    submitButton.innerText = "Update";
    submitButton.setAttribute("data-id", productId);
  }

  deleteProduct(productId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
        this.showAlert("Product deleted successfully!", "success");
        this.saveProducts();
        this.renderProducts();
      }
    });
  }

  showAlert(message, icon) {
    Swal.fire({
      title: message,
      icon: icon,
      timer: 1500,
      showConfirmButton: false,
    });
  }
}

const productManager = new ProductManager();
