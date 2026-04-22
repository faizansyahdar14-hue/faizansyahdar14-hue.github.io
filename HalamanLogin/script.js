// Variabel elemen
const authForm = document.getElementById('authForm');
const toggleBtn = document.getElementById('toggleBtn');
const passInput = document.getElementById('passInput');
const submitBtn = document.getElementById('submitBtn');
const statusReport = document.getElementById('statusReport');

// Fitur Sembunyikan/Lihat Password dengan icon mata
toggleBtn.addEventListener('click', function() {
    const isPass = passInput.type === 'password';
    passInput.type = isPass ? 'text' : 'password';
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Logika Login
authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const u = document.getElementById('userInput').value;
    const p = passInput.value;

    // Loading State
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memverifikasi...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Logika verifikasi ketat
        // Data tidak ditaruh di variabel bernama "correctPassword" agar tidak mencolok
        const db_u = "Faizandhaa";
        const db_p = "YttaAhda14";

        if (u === db_u && p === db_p) {
            statusReport.innerHTML = `
                <div class="alert alert-success bg-success text-white border-0 animate__animated animate__fadeIn">
                    <i class="fas fa-check-circle"></i> Akses Diberikan.
                </div>`;
            // Lanjutkan ke halaman lain jika benar
            // window.location.href = "dashboard.php";
        } else {
            statusReport.innerHTML = `
                <div class="alert alert-danger bg-danger text-white border-0">
                    <i class="fas fa-exclamation-triangle"></i> Identitas tidak dikenal.
                </div>`;
            
            // Reset Tombol
            submitBtn.innerHTML = '<span>MASUK</span> <i class="fas fa-sign-in-alt"></i>';
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        }
    }, 1500);
});