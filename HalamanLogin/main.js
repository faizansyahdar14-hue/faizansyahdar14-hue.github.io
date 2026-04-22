const form = document.getElementById('formLogin');
const info = document.getElementById('errorNote');

// Gunakan addEventListener supaya lebih rapi daripada onclick
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah reload

    const userKetik = document.getElementById('userInput').value;
    const passKetik = document.getElementById('passInput').value;

    // Data user kita (Misal: kamu dan temanmu)
    const database = [
        { u: "ahda", p: "22" },
        { u: "fathan", p: "123" }
    ];

    // Cek apakah ada yang cocok
    const cek = database.find(data => data.u === userKetik && data.p === passKetik);

    if (cek) {
        alert("Login Sukses! Selamat datang " + userKetik);
        info.innerText = "Mengalihkan...";
        info.style.color = "green";
        // window.location.href = "dashboard.html";
    } else {
        alert("Login Gagal! Username/Password tidak ditemukan.");
        info.innerText = "Username atau password salah!";
        info.style.color = "red";
        
        // Reset input password saja biar user bisa coba lagi
        document.getElementById('passInput').value = "";
    }
});
