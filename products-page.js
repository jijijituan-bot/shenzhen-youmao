// 产品数据
const products = [
    {
        name: "BL4850",
        voltage: "12.0V-48.0V",
        diameter: "φ48",
        length: "50mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL3060",
        voltage: "6.0V-24.0V",
        diameter: "φ30",
        length: "60mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL5OF32",
        voltage: "18.0V-43.2V",
        diameter: "φ50",
        length: "32mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL48F20",
        voltage: "12.0V-24.0V",
        diameter: "φ47.3",
        length: "52mm",
        shape: "圆型铁壳"
    },
    {
        name: "BLDC5032",
        voltage: "18.0V-43.2V",
        diameter: "φ50",
        length: "32mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL50F25",
        voltage: "18.0V-21.6V",
        diameter: "φ50",
        length: "25mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL48F25",
        voltage: "14.4V-21.6V",
        diameter: "φ48",
        length: "25mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL48F23",
        voltage: "14.4V-21.6V",
        diameter: "φ48",
        length: "23mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL48F15",
        voltage: "14.4V-21.6V",
        diameter: "φ48",
        length: "15mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL40E16",
        voltage: "80V-144VAC/176-264VAC",
        diameter: "φ40",
        length: "45mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL3657S",
        voltage: "7.0V-36.0V",
        diameter: "φ36",
        length: "57mm",
        shape: "圆型铁壳"
    },
    {
        name: "BL2838S",
        voltage: "7.0V-24.0V",
        diameter: "φ27.7",
        length: "37.5mm",
        shape: "圆型铁壳"
    }
];

// 分页配置
const itemsPerPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(products.length / itemsPerPage);

// 渲染产品
function renderProducts(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = products.slice(start, end);
    
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    pageProducts.forEach(product => {
        const productCard = `
            <div class="product-item">
                <div class="product-image-placeholder">
                    ${product.name}
                </div>
                <div class="product-details">
                    <h3 class="product-name">${product.name}</h3>
                    <ul class="product-specs">
                        <li>
                            <span class="spec-label">适用电压</span>
                            <span class="spec-value">${product.voltage}</span>
                        </li>
                        <li>
                            <span class="spec-label">直径</span>
                            <span class="spec-value">${product.diameter}</span>
                        </li>
                        <li>
                            <span class="spec-label">长度</span>
                            <span class="spec-value">${product.length}</span>
                        </li>
                        <li>
                            <span class="spec-label">形状</span>
                            <span class="spec-value">${product.shape}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        grid.innerHTML += productCard;
    });
    
    updatePagination(page);
}

// 更新分页
function updatePagination(page) {
    currentPage = page;
    
    // 更新按钮状态
    document.getElementById('prevPage').disabled = page === 1;
    document.getElementById('nextPage').disabled = page === totalPages;
    
    // 渲染页码
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-number' + (i === page ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            renderProducts(i);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pageNumbers.appendChild(pageBtn);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(1);
    
    // 上一页
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            renderProducts(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // 下一页
    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < totalPages) {
            renderProducts(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});
