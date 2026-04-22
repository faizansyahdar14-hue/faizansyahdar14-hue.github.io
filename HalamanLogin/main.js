// Mengambil semua elemen yang dibutuhkan
const authForm = document.querySelector('#authForm');
const btnView = document.querySelector('#btnView');
const passInput = document.querySelector('#pass');
const statusMsg = document.querySelector('#statusMsg');
const submitBtn = authForm.querySelector('button[type="submit"]');

/**
 * 1. FITUR SHOW/HIDE PASSWORD
 */
btnView.addEventListener('click', () => {
    // Cek tipe input saat ini
    const isPassword = passInput.type === 'password';
    
    // Switch tipe: jika password jadi text, jika text jadi password
    passInput.type = isPassword ? 'text' : 'password';
    
    // Update teks tombol agar user tahu statusnya
    btnView.textContent = isPassword ? 'Sembunyi' : 'Lihat';
    
    // Tambahkan fokus kembali ke input agar user bisa lanjut ngetik
    passInput.focus();
});

/**
 * 2. LOGIKA LOGIN (VALIDASI & SIMULASI)
 */
authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop form biar gak reload halaman

    // Ambil data terbaru dari input
    const username = document.querySelector('#user').value.trim();
    const password = passInput.value;

    // Efek Loading: Ubah tombol jadi disable biar gak diklik berkali-kali
    submitBtn.disabled = true;
    submitBtn.textContent = 'Menghubungkan...';
    statusMsg.innerHTML = '<span class="text-muted">Sedang mengecek akun...</span>';

    // Simulasi delay server selama 1.5 detik
    setTimeout(() => {
        // DATA LOGIN (Ganti di sini kalau mau ubah akunnya)
        const validUser = "admin";
        const validPass = "12345";

        if (username === validUser && password === validPass) {
            // JIKA BERHASIL
            statusMsg.innerHTML = `
                <div class="alert alert-success mt-2">
                    <strong>Berhasil!</strong> Selamat datang kembali, ${username}.
                </div>`;
            
            // Opsional: Redirect ke halaman lain setelah 1 detik
            // setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
            
        } else {
            // JIKA GAGAL
            statusMsg.innerHTML = `
                <div class="alert alert-danger mt-2">
                    Username atau Password salah!
                </div>`;
            
            // Kembalikan tombol ke semula
            submitBtn.disabled = false;
            submitBtn.textContent = 'Masuk Sekarang';
        }
    }, 1500);
});
