'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, Scale, AlertTriangle, FileText, CheckCircle2, Lock } from 'lucide-react';

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-20 border-b border-neutral-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider">
              Ketentuan Hukum & Perjanjian Sewa
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-4 leading-tight">
              Syarat & Ketentuan Layanan
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Perjanjian sewa website mandiri antara PT Sivilize Corp Indonesia dengan Penyewa Layanan (Klien).
              Berlaku mengikat sejak aktivasi website dimulai.
            </p>
            <p className="mt-2 text-xs font-mono text-neutral-400">
              Terakhir diperbarui: 14 Oktober 2026 • Versi 2.4-LEG
            </p>
          </div>
        </section>

        {/* Legal Clauses */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-10 text-neutral-800 text-xs sm:text-sm leading-relaxed">
            
            {/* Pasal 1 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">1</span>
                <span>Definisi & Badan Hukum Penyedia</span>
              </h3>
              <p>
                Layanan <strong>Sivilize Space</strong> dikembangkan, dioperasikan, dan dimiliki sepenuhnya oleh <strong>PT SIVILIZE CORP INDONESIA</strong>, perseroan terbatas yang sah berdasarkan hukum Republik Indonesia dengan Nomor Induk Berusaha (NIB) <code>0207260103661</code>, KBLI <code>62199 (Aktivitas Pemrograman Komputer Lainnya)</code>, berkedudukan hukum di Kota Kupang, Nusa Tenggara Timur (NTT).
              </p>
              <p>
                <strong>Penyewa (Klien)</strong> adalah individu, pelaku usaha mikro, kecil, menengah (UMKM), atau korporasi yang menyewa infrastruktur website mandiri melalui platform Sivilize Space.
              </p>
            </div>

            <hr className="border-neutral-200" />

            {/* Pasal 2 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">2</span>
                <span>Sifat Layanan: Sewa Website Mandiri (WaaS)</span>
              </h3>
              <p>
                Sivilize Space menyediakan layanan <em>Website-as-a-Service (WaaS)</em> berbasis sewa berkala (tahunan atau bulanan). Seluruh proses konfigurasi modul, pemilihan tata letak, dan pengisian konten diselesaikan secara mandiri di dalam website oleh Penyewa.
              </p>
              <p>
                Biaya sewa telah mencakup hak pemakaian perangkat lunak, infrastruktur server Global Anycast Edge SLA 99.8%, sertifikat SSL otomatis, dan subdomain resmi <code>namabisnis.sivilizecorp.my.id</code> (atau custom domain berbayar).
              </p>
            </div>

            <hr className="border-neutral-200" />

            {/* Pasal 3: Zero-Tolerance Policy */}
            <div className="space-y-3 p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-rose-950">
              <h3 className="text-base sm:text-lg font-black text-rose-700 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Pasal 3: Kebijakan Anti-Judi Online, Pinjol Ilegal, & Konten Terlarang</span>
              </h3>
              <p className="font-medium">
                PT Sivilize Corp Indonesia menerapkan prinsip <strong>TOLERANSI NOL (ZERO TOLERANCE)</strong> terhadap aktivitas ilegal. Penyewa DILARANG KERAS menggunakan website sewaan untuk:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-rose-900">
                <li>Promosi, fasilitasi, atau operasional <strong>Judi Online (Judol)</strong>, taruhan, atau kasino daring dalam bentuk apa pun.</li>
                <li>Layanan pinjaman online ilegal yang tidak terdaftar di Otoritas Jasa Keuangan (OJK).</li>
                <li>Konten pornografi, eksploitasi asusila, atau perdagangan manusia.</li>
                <li>Penipuan (fraud), phishing perbankan, penyebaran malware, atau pelanggaran UU ITE No. 1 Tahun 2024.</li>
              </ul>
              <p className="text-xs text-rose-800 font-semibold pt-1">
                Sanksi: Pelanggaran klausul ini berakibat pemutusan sewa seketika (Immediate Suspension), penghapusan data permanen tanpa pengembalian dana (no refund), dan bukti akses/IP diteruskan ke unit Bareskrim Siber Polri.
              </p>
            </div>

            <hr className="border-neutral-200" />

            {/* Pasal 4 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">4</span>
                <span>Periode Sewa, Perpanjangan, & Masa Tenggang</span>
              </h3>
              <p>
                Masa aktif website dihitung sesuai paket sewa yang dipilih (365 hari untuk paket tahunan, atau 30 hari untuk paket bulanan). Penyewa diberikan masa tenggang toleransi (grace period) selama 3 (tiga) hari kerja setelah jatuh tempo untuk melakukan perpanjangan mandiri di dashboard.
              </p>
              <p>
                Jika hingga masa tenggang berakhir perpanjangan sewa belum diselesaikan, website akan dialihkan otomatis ke mode penangguhan (suspended). Data website disimpan aman di server hingga 30 hari sebelum dibersihkan.
              </p>
            </div>

            <hr className="border-neutral-200" />

            {/* Pasal 5 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">5</span>
                <span>Saluran Resmi & Penanganan Kendala Teknis</span>
              </h3>
              <p>
                Seluruh aktivitas pendaftaran, pemilihan paket, dan pengelolaan website dilakukan secara mandiri di web portal.
                Alamat email resmi <code>sivilizecorpindonesia@gmail.com</code> difungsikan <strong>khusus untuk pelaporan kendala teknis darurat, bug sistem, aduan penyalahgunaan konten, dan urusan hukum korporat</strong>.
              </p>
            </div>

            <hr className="border-neutral-200" />

            {/* Pasal 6 */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">6</span>
                <span>Hukum yang Berlaku & Domisili Hukum</span>
              </h3>
              <p>
                Syarat dan Ketentuan ini diatur dan ditafsirkan berdasarkan hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan yang tidak dapat diselesaikan melalui musyawarah mufakat akan diselesaikan melalui yurisdiksi Pengadilan Negeri Kota Kupang, Nusa Tenggara Timur.
              </p>
            </div>

            <hr className="border-neutral-200" />

            {/* Pasal 7: Fasilitas Ekosistem Aplikasi Kasir SiKasir POS & Dine Lite Termasuk Dalam Sewa */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-neutral-900 text-white text-xs flex items-center justify-center font-mono">7</span>
                <span>Fasilitas Ekosistem Aplikasi Kasir Termasuk Dalam Sewa</span>
              </h3>
              <p>
                Setiap paket sewa website mandiri di Sivilize Space secara otomatis telah mencakup (include) hak lisensi pemakaian aplikasi kasir resmi tanpa biaya langganan software tambahan selama masa sewa website aktif:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>
                  <strong>SiKasir POS Modern:</strong> Disertakan untuk <strong>seluruh jenis usaha</strong> (usaha makanan, retail minimarket, bengkel servis, salon/barbershop, klinik/apotek, dan jasa laundry) lengkap dengan modul spesifik industri, pencatatan kasir, dan integrasi stok 2-arah.
                </li>
                <li>
                  <strong>Sivilize Dine Lite (Self-Order Barcode QR Meja):</strong> Khusus disertakan untuk <strong>kategori usaha makanan dan minuman (F&B, Restoran, Kafe, Warung, Katering)</strong>. Untuk jenis usaha non-makanan, fitur Dine Lite secara otomatis dinonaktifkan dari kunci lisensi karena tidak relevan dengan operasional meja restoran.
                </li>
                <li>
                  <strong>Kunci Lisensi Terpadu (Smart Ecosystem Key):</strong> Tercetak resmi pada e-Receipt / Invoice Digital Penyewa (misalnya format <code>SIV-FNB-XXXXX-365D</code> atau <code>SIV-RETAIL-XXXXX-365D</code>) yang secara instan mengimpor profil bisnis dan katalog produk ke aplikasi kasir tanpa perlu mendaftar ulang manual.
                </li>
              </ul>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
