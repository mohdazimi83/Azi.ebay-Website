// Greeting with template literals
const user = { name: "Azi" };
console.log(`Welcome, ${user.name}! Enjoy shopping.`);

// Collect elements (spread to make a real array)
const searchInput = document.querySelector("#search");
const categories = [...document.querySelectorAll(".category")];

// Debounce (default params, rest/spread)
const debounce = (fn, wait = 250) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

// Filter function (arrow, optional chaining, nullish coalescing)
const filterCategories = (query = "") => {
  const q = query.trim().toLowerCase();
  categories.forEach((card) => {
    const name = card.querySelector("p")?.textContent?.toLowerCase() ?? "";
    card.style.display = name.includes(q) ? "" : "none";
  });
};

// Restore last search (nullish coalescing)
const lastQuery = localStorage.getItem("query") ?? "";
if (searchInput) {
  searchInput.value = lastQuery;
  filterCategories(lastQuery);

  // Debounced input listener
  const onInput = debounce((e) => {
    const value = e.target.value;
    localStorage.setItem("query", value);
    filterCategories(value);
  }, 200);

  searchInput.addEventListener("input", onInput);
}

// Small ES6 examples:
const [firstCategory, ...rest] = categories; // array destructuring
if (firstCategory) {
  const label = firstCategory.querySelector("p")?.textContent ?? "Unknown";
  console.log(`First category: ${label}`);
}
