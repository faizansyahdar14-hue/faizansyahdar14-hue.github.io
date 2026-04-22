const userInp = document.getElementById('usernameInput');
const passInp = document.getElementById('passwordInput');
const toggler = document.getElementById('eyeToggle');
const formAuth = document.getElementById('authAction');

// Fitur Intip Password
toggler.addEventListener('change', function() {
    passInp.type = this.checked ? 'text' : 'password';
});

// Fitur Validasi Login
formAuth.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = userInp.value;
    const password = passInp.value;

    // Sesuai permintaan: Ahda & 22
    if (username === "ahda" && password === "22") {
        alert("Sistem: Verifikasi Berhasil! Selamat datang, Ahda.");
        // window.location.href = "dashboard.html";
    } else {
        alert("Peringatan Keamanan: Username atau Password tidak cocok dengan database kami.");
        passInp.value = ""; // Kosongkan password biar diisi lagi
    }
});