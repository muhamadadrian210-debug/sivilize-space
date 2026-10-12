/**
 * -----------------------------------------------------------------------------
 * CLIENT-SIDE WEBP IMAGE COMPRESSOR (MICRO-SPEC 4)
 * PT SIVILIZE CORP INDONESIA — ZERO STORAGE BLOATING ENGINE
 * -----------------------------------------------------------------------------
 * Mengubah foto mentah kamera HP (5MB-10MB) menjadi format WebP
 * beresolusi maksimal 1080px (<150KB) di browser sebelum upload.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export async function compressImageToWebP(
  file: File,
  options: CompressionOptions = {}
): Promise<{ file: File; dataUrl: string; sizeKb: number }> {
  const { maxWidth = 1080, maxHeight = 1080, quality = 0.82 } = options;

  return new Promise((resolve, reject) => {
    // 1. Validasi tipe dasar
    if (!file.type.startsWith('image/')) {
      return reject(new Error('File yang diunggah wajib berupa gambar (JPG/PNG/WebP).'));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 2. Hitung dimensi proporsional max 1080px
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // 3. Render ke HTML5 Canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Gagal menginisialisasi canvas context.'));
        }

        // Gambar ulang dengan smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // 4. Ekspor ke format image/webp
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('Gagal mengompres gambar ke WebP.'));
            }

            const cleanFileName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
            const compressedFile = new File([blob], cleanFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            const dataUrl = canvas.toDataURL('image/webp', quality);
            const sizeKb = Math.round(blob.size / 1024);

            resolve({
              file: compressedFile,
              dataUrl,
              sizeKb,
            });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('File gambar rusak atau tidak dapat dibaca.'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Gagal membaca file dari perangkat.'));
    };
  });
}
