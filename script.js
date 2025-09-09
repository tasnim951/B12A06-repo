 document.addEventListener('DOMContentLoaded',() => {


function addToCart(tree) {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  
  const li = document.createElement('li');
  li.classList.add('flex', 'justify-between', 'items-center', 'gap-2');

  li.innerHTML = `
    <span>${tree.name} - ৳ ${tree.price || 0}</span>
    <i class="fa-solid fa-xmark cursor-pointer text-red-500"></i>
  `;

  cartItems.appendChild(li);


  let currentTotal = parseFloat(cartTotal.textContent.replace(/[^\d.]/g, '')) || 0;
  let newTotal = currentTotal + (parseFloat(tree.price) || 0);
  cartTotal.innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign"> </i> ${newTotal}`;


  li.querySelector('i').addEventListener('click', () => {
   
    let updatedTotal = parseFloat(cartTotal.textContent.replace(/[^\d.]/g, '')) - (parseFloat(tree.price) || 0);
    cartTotal.innerHTML =`<i class="fa-solid fa-bangladeshi-taka-sign"></i> ${updatedTotal}`;

    
    li.remove();
  });
}


 // --- Load Categories 
async function loadCategories() {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();

  
    const categories = data.categories || [];  

    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

    categories.forEach(category => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      
      btn.textContent = category.category_name;  
      btn.classList.add(
        'w-full',
        'text-left',
        'px-3',
        'py-2',
        'rounded',
        'hover:bg-green-100'
      );

      btn.addEventListener('click', () => {
        setActiveCategory(btn);
        loadTreesByCategory(category.id);
      });

      li.appendChild(btn);
      categoryContainer.appendChild(li);
    });

    if (categories.length === 0) console.warn('No categories found in API response');
  } catch (err) {
    console.error('Error loading categories:', err);
  }
}

// -------------------- Set active button style --------------------
function setActiveCategory(btn) {
  document
    .querySelectorAll('#category-container button')
    .forEach(b => b.classList.remove('bg-[#15803d]', 'text-white'));
  btn.classList.add('bg-[#15803d]', 'text-white');
}

async function loadTreesByCategory(categoryId) {
  
   const treeContainer =
   document.getElementById("tree-container");
   treeContainer.innerHTML = '<p>Loading...</p>';
  try {

    // ⿡ Fetch the category API for the selected category
    const categoryRes = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
    const categoryData = await categoryRes.json();
    const treesInCategory = categoryData.plants || []; // only IDs and names

    if (treesInCategory.length === 0) {
      treeContainer.innerHTML = '<p>No trees found in this category</p>';
      return;
    }

    // ⿢ Fetch all plants API (full details)
    const allPlantsRes = await fetch(`https://openapi.programming-hero.com/api/plants`);
    const allPlantsData = await allPlantsRes.json();
    const allPlants = allPlantsData.plants || [];

    // ⿣ Match IDs to get full details for each tree
    const detailedTrees = treesInCategory.map(tree =>
      allPlants.find(p => p.id === tree.id)
    ).filter(Boolean); // remove undefined if no match

    // ⿤ Render the cards
    treeContainer.innerHTML = '';
    detailedTrees.forEach(tree => {
      const card = document.createElement('div');
      card.classList.add('bg-white', 'shadow', 'rounded', 'p-4');

      card.innerHTML = `
        <img src="${tree.image}"alt = "${tree.name}"
        class="w-full max-h-40 sm:max-h-48 object-cover rounded mb-2">
      <h3 class="font-bold text-lg mb-2">${tree.name}</h3>
        <p class="text-gray-600 text-sm mb-4">${tree.description || 'No description available'}</p>

        <div class="flex items-center justify-between mb-2">
          <span class="bg-[#DCFCE7] text-green-700 text-xs font-semibold px-2 py-1 rounded-full">${tree.category}</span>
          <span class="text-sm font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${tree.price || '0'}</span> </div> 
       <button class="bg-green-600 text-white text-sm font-medium py-1 rounded hover:bg-green-700 w-full mt-3 add-to-cart-btn">
            Add to Cart
          </button>
        
      `;

      // Add event listener for Add to Cart
      card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        addToCart(tree);
      });

      treeContainer.appendChild(card);
    });

  } catch (err) {
    console.error('Error loading trees:', err);
    treeContainer.innerHTML = '<p>Error loading trees</p>';
  }
}


// Call function

loadCategories();




 });
