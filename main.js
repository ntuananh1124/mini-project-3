import { fetchApi, htmlFunc, sortBy } from './helpers/module.js';

// get API:
let productApi = 'http://localhost:3000/products?_limit=12';
let categories = 'http://localhost:3000/category';

// PRODUCT HANDLE
fetchApi(productApi)
    .then((data) => { // data: array with 30 elements
        let html = "";
        let product = document.querySelector('.list-item');
        data.forEach((item) => {
            html += htmlFunc(item);
        });
        product.innerHTML = html;
    })
    .catch(() => {
        let mainLayout = document.querySelector('.inner-main-layout');
        mainLayout.innerHTML = '<img class="not-connected" src="assets/images/disconnected.png">';
    })


// CATEGORIES HANDLE
fetchApi(categories)
    .then(data => { // array with 20 elements
        let html = '';
        let categories2 = document.querySelector('.category');
        data.forEach((item) => {
            html += `<li class="lis">${item}</li>`;
        })
        categories2.innerHTML = html;  
        let lis = document.querySelectorAll('.lis');
        lis.forEach((lisItem) => {
            let categoryName = lisItem.innerText.toLowerCase();
            lisItem.addEventListener('click', function() {
                let html = '';
                let product = document.querySelector('.list-item');
                fetchApi(`http://localhost:3000/products?category=${categoryName}&_limit=12`)
                    .then((data) => {
                        if (data.length != 0) {
                            data.forEach((item) => {
                                html += htmlFunc(item);
                            })
                            product.innerHTML = html;
                        }
                        else {
                            product.innerHTML = '<img class="cannot-find" src="assets/images/sad.png"/>';
                        }
                    })
            })
        })
    })


// Search Input and Btn Handle:
let searchBtn = document.querySelector('.search-btn');
let searchInput = document.querySelector('.search-input');
searchBtn.addEventListener('click', function() {
    let html = '';
    let product = document.querySelector('.list-item');
    if (searchInput.value == '') {
        fetchApi(`http://localhost:3000/products?_limit=12`)
        .then((data) => {
            data.forEach((item) => {
                html += htmlFunc(item);
            })
            product.innerHTML = html;
        })
    }
    // else {
    //     fetchApi(`http://localhost:3000/products?=${searchInput.value}&_limit=12`)
    //     .then((data) => {
    //         data.forEach((item) => {
    //             html += htmlFunc(item);
    //         })
    //         product.innerHTML = html;
    //     })
    // }
})

searchInput.addEventListener('keyup', function(e) {
    let searchSuggestion = document.querySelector('.search-suggestion');
    searchSuggestion.innerHTML = `<span class="search-auto-complete">Tìm kiếm: "${searchInput.value}"</span>`;
    let html = '';
    let product = document.querySelector('.list-item');

    if (searchInput.value == '') {
        searchSuggestion.style.display = 'none'; 
        fetchApi(`http://localhost:3000/products?_limit=12`)
        .then((data) => {
            data.forEach((item) => {
                html += htmlFunc(item);
            })
            product.innerHTML = html;
        })
    }
    else {
        fetchApi(`http://localhost:3000/products?q=${searchInput.value}&_limit=12`)
        .then((data) => {
            data.forEach((item) => {
                html += htmlFunc(item);
            })
            product.innerHTML = html;
        })
    }
})


// SORT: 

// Default
let defaultInput = document.getElementById('default');
let defaultSort = `?_page=1&_limit=12`;  
sortBy(defaultInput, defaultSort);

// Discount
let discount = document.getElementById('discount');
let discountSort = `?_sort=discountPercentage&_order=desc`;
sortBy(discount, discountSort)

// Max to min:
let maxToMin = document.getElementById('max-to-min');
let maxToMinSort = `?_sort=price&_order=desc`;
sortBy(maxToMin, maxToMinSort);

// Min to max:
let minToMax = document.getElementById('min-to-max');
let minToMaxSort = `?_sort=price&_order=asc`;
sortBy(minToMax, minToMaxSort);



// PAGINATION:
let pageList = document.querySelectorAll('.pagination-page');

pageList.forEach((list) => {
    list.addEventListener('click', function() {
        fetchApi(`http://localhost:3000/products?_page=${list.innerText}&_limit=12`)
            .then(data => {
                let html = "";
                let product = document.querySelector('.list-item');
                data.forEach((item) => {
                    html += htmlFunc(item);
                    });
                product.innerHTML = html;
            })
    });
})

// DARK MODE:
let toggle = document.querySelector(".toggle");
let icon = document.querySelector('.fa-regular');
let body = document.querySelector("body");
let innerCategory = document.querySelector('.inner-category');

toggle.addEventListener('click', function() {
    pageList.forEach((listItem) => {
        listItem.classList.toggle('dark-mode');
    });

    innerCategory.classList.toggle('dark-mode');
    toggle.classList.toggle('dark-mode');
    body.classList.toggle('dark-mode');
    if (icon.classList.contains('fa-sun')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
})