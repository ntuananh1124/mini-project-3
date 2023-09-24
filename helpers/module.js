// Optimize Fetch API
export const fetchApi = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return data
}

export const htmlFunc = function(a) {
    return `
    <div class="col-3 mb-3">
        <div class="inner-product">
            <div class="inner-product-discount">${Math.round(a.discountPercentage)}%</div>
            <div class="inner-product-img">
                <img src="${a.thumbnail}" alt="">
            </div>
            <div class="inner-product-desc">
                <h2 class="inner-product-name">${a.title}</h2>
                <div class="inner-product-price-quantity">
                    <span class="product-price">$${a.price}</span>
                    <span class="product-quantity">Còn lại: ${a.stock} sản phẩm</span>
                </div>
            </div>
        </div>
    </div>
`;
}

// Optimize Sort
export const sortBy = function(require, sort) {
    require.onchange = function () {
        let html = '';
        let product = document.querySelector('.list-item');
        fetchApi(`http://localhost:3000/products${sort}&_limit=12`)
            .then((data) => {
                data.forEach((item) => {
                    html += htmlFunc(item);
                })
                product.innerHTML = html;
            })
    }
}