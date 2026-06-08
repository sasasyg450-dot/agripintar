// State Aplikasi global
let currentCategory = 'all';
let searchQuery = '';

// Fungsi Inisialisasi Pertama Kali
document.addEventListener("DOMContentLoaded", () => {
    navigate('home'); // Secara default buka beranda
});

// ROUTING SEDERHANA (Pindah Halaman tanpa Reload)
function navigate(page) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const main = document.getElementById('main-content');
    
    if (page === 'home' || page === 'products') {
        renderProductPage(main, page);
    } else if (page === 'blog') {
        renderBlogPage(main);
    } else if (page === 'about') {
        main.innerHTML = `
            <div class="container static-page">
                <h2>Tentang AgriPintar</h2>
                <p>AgriPintar didirikan dengan misi untuk membantu petani, peternak, dan masyarakat Indonesia menemukan perlengkapan agribisnis terbaik dengan mudah dan transparan.</p>
                <p>Kami menyusun rekomendasi produk dari berbagai marketplace terpercaya seperti Shopee, Tokopedia, Lazada, dan TikTok Shop guna memastikan Anda mendapatkan produk asli dengan harga terbaik.</p>
            </div>`;
    } else if (page === 'contact') {
        main.innerHTML = `
            <div class="container static-page">
                <h2>Hubungi Kami</h2>
                <p>Punya pertanyaan, kritik, saran, atau tawaran kerja sama? Silakan kirimkan pesan kepada kami melalui email resmi.</p>
                <p><strong>Email:</strong> support@agripintar.com</p>
                <p><strong>Jam Kerja:</strong> Senin - Sabtu (08:00 - 17:00 WIB)</p>
            </div>`;
    } else if (page === 'privacy') {
        main.innerHTML = `
            <div class="container static-page">
                <h2>Kebijakan Privasi</h2>
                <p>Di AgriPintar, privasi pengunjung kami adalah hal yang sangat penting. Dokumen kebijakan privasi ini menjelaskan jenis informasi pribadi yang diterima dan dikumpulkan oleh website kami.</p>
                <p>Kami menggunakan data standar log untuk menganalisis tren trafik, namun tidak ada data sensitif pengguna yang kami simpan atau perjualbelikan.</p>
            </div>`;
    } else if (page === 'disclaimer') {
        main.innerHTML = `
            <div class="container static-page">
                <h2>Disclaimer Kemitraan (Affiliate)</h2>
                <p>AgriPintar berpartisipasi dalam berbagai program periklanan affiliate termasuk Shopee Affiliate, Tokopedia Affiliate, Lazada Affiliate, dan TikTok Shop.</p>
                <p>Artinya, jika Anda mengklik link produk di website ini dan melakukan pembelian, kami mungkin akan menerima komisi kecil tanpa ada biaya tambahan sama sekali pada Anda (Harga tetap sama). Hal ini membantu kami mengelola dan memelihara server website ini agar tetap aktif menyajikan informasi bermanfaat bagi dunia pertanian.</p>
            </div>`;
    }
}

// FORMATT CARDS PRODUK
function createProductCard(prod) {
    let badge = '';
    if(prod.isNew) badge = '<span class="product-badge">Terbaru</span>';
    else if(prod.isBestSeller) badge = '<span class="product-badge" style="background:#d32f2f;">Terlaris</span>';
    else if(prod.isFeatured) badge = '<span class="product-badge" style="background:#2e7d32;">Rekomendasi</span>';

    return `
        <div class="product-card">
            ${badge}
            <img src="${prod.image}" alt="${prod.name}" loading="lazy">
            <div class="product-info">
                <h3>${prod.name}</h3>
                <p class="product-desc">${prod.description}</p>
                <div class="product-meta">
                    <span class="product-price">${prod.price}</span>
                    <span class="product-rating">⭐ ${prod.rating}</span>
                </div>
                <a href="${prod.affiliateUrl}" target="_blank" rel="nofollow noopener" class="btn-affiliate">Beli Sekarang</a>
            </div>
        </div>
    `;
}

// RENDER HALAMAN PRODUK & HOMEPAGE
function renderProductPage(target, view) {
    let categoryFilterHtml = AGRI_DATA.categories.map(cat => 
        `<button class="filter-btn ${currentCategory === cat.id ? 'active' : ''}" onclick="filterCategory('${cat.id}')">${cat.name}</button>`
    ).join('');

    let heroHtml = view === 'home' ? `
        <section class="hero">
            <div class="container">
                <h1>Rekomendasi Produk Pertanian Modern Terbaik</h1>
                <p>Cari ulasan, spesifikasi, dan harga dari pupuk, benih, hingga mesin peternakan berkualitas tinggi sebelum Anda membeli.</p>
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="Cari pupuk, benih, pakan ternak..." value="${searchQuery}" onkeyup="handleSearch(event)">
                </div>
            </div>
        </section>
    ` : '<div class="container" style="margin-top:40px;"></div>';

    // Filter Data Berdasarkan Pencarian & Kategori
    let filteredProducts = AGRI_DATA.products.filter(p => {
        let matchCat = currentCategory === 'all' || p.category === currentCategory;
        let matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    let mainGridHtml = filteredProducts.map(p => createProductCard(p)).join('');
    if(filteredProducts.length === 0) mainGridHtml = '<p style="text-align:center; grid-column: 1/-1; padding: 40px 0;">Produk tidak ditemukan. Silakan cari kata kunci lain.</p>';

    // Halaman Home menampilkan Segmentasi Tambahan (Unggulan dll)
    let extraSectionsHtml = '';
    if (view === 'home' && searchQuery === '' && currentCategory === 'all') {
        let featured = AGRI_DATA.products.filter(p => p.isFeatured).map(p => createProductCard(p)).join('');
        let best = AGRI_DATA.products.filter(p => p.isBestSeller).map(p => createProductCard(p)).join('');
        
        extraSectionsHtml = `
            <div class="container">
                <h2 class="section-title">⭐ Produk Unggulan Pilihan Penyuluh</h2>
                <div class="product-grid">${featured || '<p>Belum ada produk unggulan.</p>'}</div>
                
                <h2 class="section-title">🔥 Paling Laris di Pasaran</h2>
                <div class="product-grid">${best || '<p>Belum ada produk terlaris.</p>'}</div>
            </div>
        `;
    }

    target.innerHTML = `
        ${heroHtml}
        <div class="container">
            <h2 class="section-title">Kategori Pilihan</h2>
            <div class="filter-container">
                <button class="filter-btn ${currentCategory === 'all' ? 'active' : ''}" onclick="filterCategory('all')">Semua Produk</button>
                ${categoryFilterHtml}
            </div>
            
            <h2 class="section-title">${view === 'home' ? '⚡ Semua Rekomendasi Produk' : 'Hasil Pencarian Produk'}</h2>
            <div class="product-grid">${mainGridHtml}</div>
        </div>
        ${extraSectionsHtml}
        
        <div class="container">
            <section class="newsletter-section">
                <h2>Dapatkan Tips Tani & Info Promo Produk Gratis via Email</h2>
                <p>Bergabunglah dengan ribuan petani Indonesia lainnya!</p>
                <form class="newsletter-form" onsubmit="handleSubscribe(event)">
                    <input type="email" placeholder="Masukkan alamat email Anda..." required>
                    <button type="submit">Berlangganan</button>
                </form>
            </section>
        </div>
    `;
}

// LOGIKA CARI & FILTER
function handleSearch(e) {
    searchQuery = e.target.value;
    renderProductPage(document.getElementById('main-content'), 'products');
}
function filterCategory(catId) {
    currentCategory = catId;
    renderProductPage(document.getElementById('main-content'), 'products');
}

// RENDER BLOG (SEO)
function renderBlogPage(target) {
    let listArticles = AGRI_DATA.articles.map(art => `
        <div class="static-page" style="margin-bottom: 30px; cursor: pointer;" onclick="viewArticle(${art.id})">
            <div style="display:flex; gap:20px; flex-wrap:wrap;">
                <img src="${art.image}" style="width:200px; height:120px; object-fit:cover; border-radius:8px;">
                <div style="flex:1;">
                    <span style="font-size:12px; color:var(--accent); font-weight:600;">${art.date}</span>
                    <h3 style="color:var(--primary-dark); margin:5px 0 10px;">${art.title}</h3>
                    <p style="font-size:14px; color:#7f8c8d;">${art.summary}</p>
                </div>
            </div>
        </div>
    `).join('');

    target.innerHTML = `
        <div class="container" style="padding-top:40px;">
            <h2 class="section-title">Artikel Edukasi Tani & Ternak (SEO)</h2>
            <div>${listArticles || '<p>Belum ada artikel.</p>'}</div>
        </div>
    `;
}

function viewArticle(id) {
    let art = AGRI_DATA.articles.find(a => a.id === id);
    if(!art) return;
    
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="container static-page" style="max-width: 800px; margin-top:40px;">
            <span style="color:var(--accent); font-weight:600;">Diterbitkan: ${art.date}</span>
            <h1 style="color:var(--primary-dark); margin:10px 0 20px; font-size:32px;">${art.title}</h1>
            <img src="${art.image}" alt="${art.title}" style="width:100%; height:400px; object-fit:cover; border-radius:12px; margin-bottom:20px;">
            <div style="font-size:16px; line-height:1.8; color:#34495e;">${art.content}</div>
            <hr style="margin:30px 0; border:0; border-top:1px solid #e0e0e0;">
            <button onclick="navigate('blog')" class="filter-btn active">⬅ Kembali ke Daftar Artikel</button>
        </div>
    `;
}

// HANDLING NEWSLETTER SUBSCRIBE
function handleSubscribe(e) {
    e.preventDefault();
    alert("Terima kasih! Email Anda telah berhasil terdaftar dalam sistem newsletter AgriPintar.");
    e.target.reset();
}
