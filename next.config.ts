import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16.3.0'a güncellendi (disk-lru-cache 0 boyut hatası bu sürümde
    // giderildi), optimizasyon tekrar açık. Kalite öncelikli: sıkıştırma
    // hızından çok görsel netliği önemli olduğu için üst sınır kalite
    // kullanılıyor ve büyük/retina ekranlar için genişletilmiş boyut seti
    // tanımlandı.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560, 3200, 3840],
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
