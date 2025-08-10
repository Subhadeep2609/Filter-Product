const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const categoryBtns = document.querySelectorAll(".category-btn");
const productItems = document.querySelectorAll(".product-item");

// Store active category
let activeCategory = "all";

function filterProducts() {
    const searchValue = searchInput.value.toLowerCase();

    productItems.forEach(item => {
        const title = item.querySelector("h3").innerText.toLowerCase();
        const category = item.dataset.category;

        // Show if matches search AND matches category (or category is all)
        if (
            (title.includes(searchValue) || searchValue === "") &&
            (category === activeCategory || activeCategory === "all")
        ) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function setCategory(e) {
    // Update active category
    categoryBtns.forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    activeCategory = e.target.dataset.category;

    // Apply filter
    filterProducts();

    // Scroll to first visible product in that category
    const firstItem = [...productItems].find(
        item => item.style.display !== "none" && (activeCategory === "all" || item.dataset.category === activeCategory)
    );
    if (firstItem) {
        firstItem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// Event listeners
searchInput.addEventListener("keyup", filterProducts);
searchBtn.addEventListener("click", filterProducts);
categoryBtns.forEach(btn => btn.addEventListener("click", setCategory));

// Initial load
filterProducts();
