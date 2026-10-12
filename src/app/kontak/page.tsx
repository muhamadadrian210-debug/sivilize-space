'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function KontakPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    store_name: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="py-20 border-b border-neutral-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <span className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-700 uppercase tracking-wider">
              Layanan Pelanggan & Konsultasi
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 mt-4 leading-tight">
              Hubungi Tim Engineer & Bisnis SivilizeSpace
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Punya pertanyaan seputar integrasi domain, kapasitas katalog, atau ingin konsultasi
              sebelum menyewa website bisnis? Tim PT Sivilize Corp Indonesia siap membantu Anda.
            </p>
          </div>
        </section>

        {/* Contact Form & Office Info */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Info Column (5 cols) */}
            <div className="md:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-neutral-950">Kantor & Kontak Resmi</h3>

                <div className="space-y-4 text-xs text-neutral-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-neutral-900">Kantor Pusat:</strong>
                      <span>Kota Kupang, Nusa Tenggara Timur (NTT), Indonesia</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-neutral-900">Email Resmi Laporan Bug & Bantuan:</strong>
                      <a
                        href="mailto:sivilizecorpindonesia@gmail.com?subject=Laporan Kendala / Bug SivilizeSpace"
                        className="text-emerald-600 font-mono font-bold hover:underline"
                      >
                        sivilizecorpindonesia@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900 text-white space-y-3">
                <h4 className="font-bold text-sm">Lapor Kendala / Bug Sistem?</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Semua kendala teknis, downtime, atau bug sistem dilaporkan langsung ke email resmi manajemen PT Sivilize Corp Indonesia untuk penanganan cepat.
                </p>
                <a
                  href="mailto:sivilizecorpindonesia@gmail.com?subject=Laporan Bug / Kendala Teknis SivilizeSpace"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-neutral-950 font-bold text-xs mt-2 hover:bg-neutral-100 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>Kirim Email: sivilizecorpindonesia@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Right Form Column (7 cols) */}
            <div className="md:col-span-7 p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-base text-neutral-900">Pesan Anda Telah Diterima</h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Tim kami akan menghubungi Anda dalam waktu 1x24 jam kerja melalui WhatsApp atau surel yang Anda cantumkan.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-bold text-base text-neutral-950 mb-4">Kirimkan Pertanyaan Anda</h3>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Hendra Wijaya"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Nomor WhatsApp Aktif</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="081234567890"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Nama Usaha / Jenis Produk</label>
                    <input
                      type="text"
                      value={formData.store_name}
                      onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                      placeholder="Contoh: Kopi Senja / Kuliner"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Pesan atau Pertanyaan</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan kendala atau pertanyaan yang ingin Anda konsultasikan..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pesan Konsultasi</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
