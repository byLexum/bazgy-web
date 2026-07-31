import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16.2.10'un /_next/image disk önbelleği (disk-lru-cache) 0 boyut
    // hesaplayıp yakalanmayan bir promise reddi fırlatıyor ve sunucuyu
    // düşürüyor. Tüm görseller public/ altında yerel dosyalar olduğu için
    // isteğe bağlı optimizasyona ihtiyaç yok; kapatınca o kod yolu hiç
    // çalışmıyor.
    unoptimized: true,
  },
};

export default nextConfig;
