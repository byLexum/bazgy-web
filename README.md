# BAZ Mühendislik ve Yapı — Web Sitesi

BAZ Mühendislik ve Yapı A.Ş. için siyah-beyaz temalı kurumsal web sitesi. Next.js (App Router) + TypeScript + Tailwind CSS ile geliştirildi.

Tasarım, [alkatas.com.tr](https://alkatas.com.tr) referans alınarak ve `reference/` altındaki tasarım teslim dosyası temel alınarak siyah-beyaz bir kimliğe uyarlandı: tüm accent renkleri kaldırıldı, fotoğraflar grayscale filtre ile işleniyor.

## Geliştirme

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresinde açılır.

## Yapı

- `src/app` — Next.js App Router giriş noktaları (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components` — Sayfa bölümleri (Header, HeroSlider, StatsBand, About, Services, Projects, Geography, Sustainability, Career, Contact, Footer)
- `src/data/content.ts` — Sayfa metinleri ve içerik verisi (slaytlar, istatistikler, hizmetler, projeler, bölgeler)
- `public/images` — Logo ve proje fotoğrafları

## Notlar

- Bazı bölümlerde (Dikili tesisi, İTO binası, Erzincan camii, Faaliyet Alanları kartları, kariyer fotoğrafı) gerçek fotoğraf yerine placeholder kullanılıyor — gerçek fotoğraflar geldiğinde `public/images` içine eklenip ilgili bileşenlerde `PlaceholderPhoto` yerine `next/image` ile değiştirilmeli.
- Site şu an tek dilli (Türkçe). İngilizce içerik gerekirse `src/data/content.ts` genişletilip bir dil anahtarı eklenebilir.

## Deploy

Vercel'e bağlanıp bu repo'yu import etmek yeterlidir — ek yapılandırma gerekmez (standart Next.js build).
