// --- ELEMEN HTML UTAMA ---
const halamanLogin = document.getElementById('halamanLogin');
const halamanTransisi = document.getElementById('halamanTransisi');
const halamanUtama = document.getElementById('halamanUtama');
const tombolLogin = document.getElementById('tombolLogin');
const tombolPlay = document.getElementById('tombolPlay');
const inputPassword = document.getElementById('inputPassword');
const pesanError = document.getElementById('pesanError');
const lagu = document.getElementById('laguLatar');
const animasiContainer = document.getElementById('animasiContainer');

// --- 1. LOGIN & PLAY LAGU ---
tombolLogin.addEventListener('click', function() {
    if (inputPassword.value === '17092005') {
        halamanLogin.classList.add('tersembunyi');
        halamanTransisi.classList.remove('tersembunyi');
    } else {
        pesanError.classList.remove('tersembunyi');
    }
});

tombolPlay.addEventListener('click', function() {
    halamanTransisi.classList.add('tersembunyi');
    halamanUtama.classList.remove('tersembunyi');
    lagu.play().catch(e => console.log("Audio diblokir browser"));
    initScratchCard(); 
    mulaiAnimasiLatar(); 
});

// --- 2. DARK MODE (STARGAZING) ---
const btnGelap = document.getElementById('btnGelap');
let intervalBintang;

btnGelap.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        btnGelap.innerText = 'Kembali ke Siang ☀️';
        intervalBintang = setInterval(buatBintang, 300);
    } else {
        btnGelap.innerText = 'Gelapkan Layar 🌙';
        clearInterval(intervalBintang);
        document.querySelectorAll('.bintang').forEach(b => b.remove());
    }
});

function buatBintang() {
    const bintang = document.createElement('div');
    bintang.classList.add('bintang');
    bintang.style.left = Math.random() * 100 + 'vw';
    bintang.style.top = Math.random() * 100 + 'vh';
    const ukuran = Math.random() * 3 + 1;
    bintang.style.width = ukuran + 'px';
    bintang.style.height = ukuran + 'px';
    animasiContainer.appendChild(bintang);
    setTimeout(() => bintang.remove(), 4000);
}

// --- 3. KAPSUL WAKTU ---
const tanggalJadian = new Date('2026-01-01T00:00:00').getTime(); 
setInterval(function() {
    const selisih = new Date().getTime() - tanggalJadian;
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);
    document.getElementById('counter').innerHTML = `${hari} Hari, ${jam} Jam, ${menit} Menit, ${detik} Detik ❤️`;
}, 1000);

// --- 4. LOVE METER (PENGUKUR CINTA) ---
const btnMeter = document.getElementById('btnMeter');
const progressFill = document.getElementById('progressFill');
const meterTeks = document.getElementById('meterTeks');

btnMeter.addEventListener('click', function() {
    btnMeter.disabled = true;
    meterTeks.classList.add('tersembunyi');
    let width = 0;
    progressFill.style.width = '0%';
    
    let interval = setInterval(() => {
        width += Math.floor(Math.random() * 15) + 5; 
        if (width >= 100) {
            clearInterval(interval);
            progressFill.style.width = '100%';
            progressFill.innerText = '100%';
            
            // Kejutan 3000%
            setTimeout(() => {
                document.querySelector('.love-meter-box').classList.add('meledak');
                progressFill.style.width = '100%'; 
                progressFill.innerText = '3000% !!!';
                meterTeks.innerHTML = "ERROR: Kapasitas mesin meledak! 💥<br>Cinta Najo terlalu besar dan gak bisa dihitung! ❤️";
                meterTeks.classList.remove('tersembunyi');
            }, 500);
        } else {
            progressFill.style.width = width + '%';
            progressFill.innerText = width + '%';
        }
    }, 150);
});

// --- 5. KOTAK KADO VIRTUAL ---
const boxKado = document.getElementById('boxKado');
const kadoTeks = document.getElementById('kadoTeks');
let klikKado = 0;

boxKado.addEventListener('click', function() {
    if (klikKado >= 5) return; // Udah kebuka
    
    klikKado++;
    boxKado.classList.remove('shake');
    void boxKado.offsetWidth; // trigger reflow
    boxKado.classList.add('shake');
    
    if (klikKado === 5) {
        setTimeout(() => {
            boxKado.innerText = '🎉';
            boxKado.classList.remove('shake');
            kadoTeks.classList.remove('tersembunyi');
            for(let i=0; i<15; i++) { setTimeout(buatConfetti, i*100); }
        }, 300);
    }
});

function buatConfetti() {
    const confetti = document.createElement('div');
    confetti.innerText = ['🎉', '🎊', '✨', '💸'][Math.floor(Math.random()*4)];
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10vh';
    confetti.style.fontSize = '24px';
    confetti.style.zIndex = '9999';
    confetti.style.transition = 'transform 2s ease-out, top 2s ease-in';
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.style.top = '100vh';
        confetti.style.transform = `rotate(${Math.random()*360}deg)`;
    }, 50);
    setTimeout(() => confetti.remove(), 2050);
}

// --- 6. COUPLE BUCKET LIST ---
const checkboxes = document.querySelectorAll('.bucket-list input[type="checkbox"]');
checkboxes.forEach(box => {
    box.addEventListener('change', function() {
        const label = this.nextElementSibling;
        if(this.checked) {
            label.classList.add('dicoret');
        } else {
            label.classList.remove('dicoret');
        }
    });
});

// --- 7. MINI KUIS ---
function jawabKuis(jawaban) {
    const kuisTeks = document.getElementById('kuisTeks');
    kuisTeks.classList.remove('tersembunyi');
    if (jawaban === 'adynn') {
        kuisTeks.innerHTML = "Bener banget! Ngambeknya ADYNN itu gemesin pengen gigit! 😆❤️";
    } else {
        kuisTeks.innerHTML = "Dih masa sih Najo? Coba ngaca dulu wleee 😜";
    }
}

// --- 8. AMPLOP "BUKA SAAT..." ---
function bukaAmplop(kondisi) {
    const pesan = document.getElementById('pesanAmplop');
    pesan.classList.remove('tersembunyi');
    if (kondisi === 'kangen') pesan.innerHTML = "Jangan kangen dong! Langsung chat atau telpon najo aja sekarang, okee? 🥺❤️";
    else if (kondisi === 'sedih') pesan.innerHTML = "Hei orang paling hebat, gapapa kok capek. Najo selalu di sini buat dengerin ceritamu. You did great! ✨";
    else if (kondisi === 'peluk') pesan.innerHTML = "*Sending virtual hugs!* 🤗🤗 Nanti ketemu najo peluk beneran ya!";
}

// --- 9. BALON HARAPAN ---
document.getElementById('btnTerbang').addEventListener('click', function() {
    const input = document.getElementById('inputHarapan');
    if (input.value.trim() === '') return alert("Tulis harapanmu dulu dong!");
    const balon = document.createElement('div');
    balon.classList.add('balon-terbang');
    balon.innerText = "🎈 " + input.value;
    balon.style.left = (Math.random() * 50 + 10) + 'vw';
    animasiContainer.appendChild(balon);
    input.value = '';
    setTimeout(() => balon.remove(), 5000);
});

// --- 10. KARTU GOSOK DIGITAL ---
function initScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#a0a0a0'; ctx.fillRect(0, 0, 250, 250);
    ctx.font = 'bold 20px Arial'; ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.fillText('GOSOK DI SINI! 🪙', 125, 125);
    let isDrawing = false;
    function hapusCanvas(e) {
        if (!isDrawing) return; e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill();
    }
    canvas.addEventListener('mousedown', () => isDrawing = true); canvas.addEventListener('mouseup', () => isDrawing = false); canvas.addEventListener('mousemove', hapusCanvas);
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; hapusCanvas(e); }); canvas.addEventListener('touchend', () => isDrawing = false); canvas.addEventListener('touchmove', hapusCanvas);
}

// --- 11. TOMBOL KABUR ---
const btnNggak = document.getElementById('btnNggak');
function kabur() {
    btnNggak.style.position = 'fixed';
    btnNggak.style.left = `${Math.max(10, Math.random() * (window.innerWidth - 100))}px`;
    btnNggak.style.top = `${Math.max(10, Math.random() * (window.innerHeight - 50))}px`;
    btnNggak.style.zIndex = '999';
}
btnNggak.addEventListener('mouseenter', kabur);
btnNggak.addEventListener('touchstart', (e) => { e.preventDefault(); kabur(); });
document.getElementById('btnSayang').addEventListener('click', function() {
    document.getElementById('teksResponSayang').innerText = "YAY! Najo juga sayang banget sama ADYNN! ❤️🥰";
    document.getElementById('teksResponSayang').classList.remove('tersembunyi');
    btnNggak.style.display = 'none';
});

// --- 12. SURAT RAHASIA ---
document.getElementById('btnSurat').addEventListener('click', () => document.getElementById('modalSurat').classList.remove('tersembunyi'));
document.getElementById('closeSurat').addEventListener('click', () => document.getElementById('modalSurat').classList.add('tersembunyi'));

// --- 13. ANIMASI BACKGROUND CONTINUOUS ---
function mulaiAnimasiLatar() {
    setInterval(() => {
        const item = document.createElement('div');
        item.classList.add('floating-item');
        item.innerText = ['❤️', '💖', '💕', '✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 7)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.fontSize = (Math.random() * 15 + 10) + 'px';
        item.style.animationDuration = (Math.random() * 4 + 5) + 's';
        animasiContainer.appendChild(item);
        setTimeout(() => item.remove(), 9000);
    }, 400); 
}