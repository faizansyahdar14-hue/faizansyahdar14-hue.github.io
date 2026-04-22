function prosesLogin() {
    // Ambil apa yang diketik user
    const userKetik = document.getElementById("userInput").value;
    const passKetik = document.getElementById("passInput").value;

    // Ambil elemen popup
    const modal = document.getElementById("popupPesan");
    const statusTeks = document.getElementById("statusTeks");

    // DATA ASLI (Database sederhana)
    const userBenar = "ahda";
    const passBenar = "22";

    // Logika pengecekan
    if (userKetik === userBenar && passKetik === passBenar) {
        statusTeks.innerText = "Login Berhasil";
        statusTeks.style.color = "green";
        modal.style.display = "block";
    } else {
        statusTeks.innerText = "Login Gagal";
        statusTeks.style.color = "red";
        modal.style.display = "block";
    }
}

function tutupPesan() {
    // Menutup popup saat tombol OK diklik
    document.getElementById("popupPesan").style.display = "none";
}