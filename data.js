const AGRI_DATA = {
    // 1. DAFTAR KATEGORI
    categories: [
        { id: 'pupuk', name: 'Pupuk' },
        { id: 'pestisida', name: 'Pestisida' },
        { id: 'herbisida', name: 'Herbisida' },
        { id: 'benih', name: 'Benih' },
        { id: 'alat', name: 'Alat Pertanian' },
        { id: 'mesin', name: 'Mesin Pertanian' },
        { id: 'organik', name: 'Produk Organik' }
    ],

    // 2. DAFTAR PRODUK AFFILIATE
    products: [
        {
            id: 1,
            name: "Benih Padi Unggul Sertani 13 F1",
            category: "benih",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop&q=60", // Ganti dengan URL gambar asli nanti
            description: "Benih padi berkualitas tinggi, tahan hama wereng, dan hasil panen melimpah.",
            price: "Rp 85.000",
            rating: 4.9,
            affiliateUrl: "https://shope.ee/contohLinkAffiliateBenih", // GANTI LINK ANDA DI SINI
            isFeatured: true, // Produk Unggulan
            isBestSeller: true, // Produk Terlaris
            isNew: false
        },
        {
            id: 2,
            name: "Pupuk Organik Cair Super Subur 1L",
            category: "pupuk",
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60",
            description: "Nutrisi lengkap untuk mempercepat pertumbuhan daun dan buah tanaman.",
            price: "Rp 45.000",
            rating: 4.8,
            affiliateUrl: "https://tokopedia.link/contohLinkAffiliatePupuk", // GANTI LINK ANDA DI SINI
            isFeatured: true,
            isBestSeller: false,
            isNew: true // Produk Terbaru
        },
        {
            id: 3,
            name: "Mesin Chopper Pencacah Rumput Portable",
            category: "mesin",
            image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&auto=format&fit=crop&q=60",
            description: "Memudahkan peternak mencacah rumput pakan sapi dan kambing secara cepat.",
            price: "Rp 1.250.000",
            rating: 4.7,
            affiliateUrl: "https://v.tiktok.com/contohLinkAffiliateMesin", // GANTI LINK ANDA DI SINI
            isFeatured: false,
            isBestSeller: true,
            isNew: true
        }
    ],

    // 3. ARTIKEL BLOG (SEO)
    articles: [
        {
            id: 1,
            slug: "tips-pemupukan-padi-optimal",
            title: "Cara Pemupukan Padi yang Benar Agar Hasil Panen Berlipat Ganda",
            summary: "Panduan praktis waktu dan dosis pemupukan padi sawah menggunakan kombinasi pupuk organik dan medis.",
            date: "08 Juni 2026",
            image: "https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=600&auto=format&fit=crop&q=60",
            content: `
                <p>Pemupukan merupakan kunci utama dalam budidaya padi. Banyak petani mengeluhkan hasil panen yang stagnan padahal biaya pupuk terus meningkat. Masalahnya seringkali bukan pada merk pupuk, melainkan pada waktu dan dosis aplikasi yang kurang tepat.</p>
                <h3>1. Fase Awal (Umur 7-10 HST)</h3>
                <p>Pada fase ini, tanaman memerlukan Nitrogen (N) dan Fosfat (P) yang tinggi untuk merangsang pertumbuhan akar dan anakan. Gunakan pupuk tunggal atau majemuk sesuai dosis rekomendasi setempat.</p>
                <h3>2. Fase Primordia (Umur 40-45 HST)</h3>
                <p>Saat padi mulai masuk fase bunting, tambahkan unsur Kalium (K) agar pengisian bulir padi nantinya menjadi lebih bernas dan tidak hampa. Anda juga bisa menyemprotkan <strong>Pupuk Organik Cair</strong> berkualitas untuk menjaga stamina tanaman.</p>
            `
        }
    ]
};
