// ============================================
//  PORTAL PPDB - Script Utama
//  Validasi Formulir & Toast Notification
// ============================================

/**
 * Tampilkan Custom Toast Notification
 * @param {string} message  - Pesan yang ditampilkan
 * @param {string} type     - 'success' | 'error'
 */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  // Set ikon & tipe
  const icon = type === 'success' ? '✅' : '❌';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  toast.className = '';           // reset kelas sebelumnya
  toast.classList.add('show', type);

  // Hilangkan setelah 3 detik (fade out)
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Validasi & Submit Formulir Pendaftaran
 */
function handleSubmit() {
  const nama  = document.getElementById('nama');
  const nik   = document.getElementById('nik');
  const jalur = document.getElementById('jalur');

  // --- 1. Cek field kosong ---
  if (!nama.value.trim()) {
    showToast('Nama Lengkap tidak boleh kosong!', 'error');
    nama.focus();
    return;
  }

  if (!nik.value.trim()) {
    showToast('NIK tidak boleh kosong!', 'error');
    nik.focus();
    return;
  }

  // --- 2. Validasi NIK: harus tepat 16 digit angka ---
  const nikValue = nik.value.trim();
  if (!/^\d{16}$/.test(nikValue)) {
    showToast('NIK harus berupa tepat 16 digit angka!', 'error');
    nik.focus();
    return;
  }

  if (!jalur.value) {
    showToast('Jalur Pendaftaran belum dipilih!', 'error');
    jalur.focus();
    return;
  }

  // --- 3. Semua valid → sukses ---
  showToast('Pendaftaran berhasil dikirim! 🎉', 'success');

  // Reset seluruh kolom form
  document.getElementById('formPendaftaran').reset();
}
