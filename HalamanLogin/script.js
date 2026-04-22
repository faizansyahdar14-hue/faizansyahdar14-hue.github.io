const authForm = document.getElementById('authForm');
const passInput = document.getElementById('passInput');
const toggleBtn = document.getElementById('toggleBtn');

// Fungsi Lihat/Sembunyikan Password
toggleBtn.addEventListener('click', function() {
    if (passInput.type === 'password') {
        passInput.type = 'text';
        this.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passInput.type = 'password';
        this.innerHTML = '<i class="fas fa-eye"></i>';
    }
});

// Verifikasi Akun Sesuai Permintaan (Hanya Faizandhaa & YttaAhda14)
authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const u = document.getElementById('userInput').value;
    const p = passInput.value;

    const db_u = "Faizandhaa";
    const db_p = "AhdaABCD14";

    if (u === db_u && p === db_p) {
        alert("Login Berhasil");
        // window.location.href = "home.html";
    } else {
        alert("Login Gagal");
    }
});
