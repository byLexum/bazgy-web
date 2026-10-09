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

- Proje görselleri `public/images/projects/<proje>/` altında, kaynak HD dosyalardan üretilmiş 1920px genişliğinde JPEG (q92) olarak tutuluyor. Yeni görsel eklerken aynı boyut/format düzenine uyulmalı.
- Yasal metinler (`/kvkk`, `/cerez-politikasi`, `/gizlilik-politikasi`) tek bir `LegalPageContent` bileşeni üzerinden, içerikleri `src/i18n/dictionaries.ts` içindeki `legalPages` anahtarından render ediliyor.
- Site iki dilli (TR/EN); tüm metinler `src/i18n/dictionaries.ts` içinde tutulur ve `en` bloğu `tr` ile yapısal olarak birebir aynı olmak zorundadır (`Dictionary = typeof dictionaries.tr`).

## Deploy

Canlı site Hostinger'da Node.js uygulaması olarak çalışıyor (standart `next build` + `next start`). Sunucunun Node.js 20.9 veya üstünü desteklemesi gerekir; iletişim ve kariyer formları sunucu tarafında çalıştığı için yalnızca statik/PHP barındırma yeterli değildir.

## Formlar (iletişim ve kariyer)

`/contact` ve `/career` formları mesajları SMTP üzerinden e-posta olarak gönderir (`src/lib/mail.ts`). Kariyer başvurularında CV (PDF/DOC/DOCX, en fazla 4 MB) e-postaya ek olarak gelir. Gerekli ortam değişkenleri `.env.example` dosyasında açıklanmıştır; Hostinger'da hPanel → Node.js uygulaması → Ortam değişkenleri bölümüne girilmelidir:

| Değişken | Açıklama |
|---|---|
| `SMTP_HOST` | Örn. `mail.bazgy.com` |
| `SMTP_PORT` | `465` veya `587` |
| `SMTP_USER` / `SMTP_PASS` | Gönderimi yapan posta kutusu ve şifresi |
| `CONTACT_TO` | İletişim mesajlarının gideceği adres (varsayılan `info@bazgy.com`) |
| `CAREER_TO` | Başvuruların gideceği adres (varsayılan `CONTACT_TO`) |
| `NEXT_PUBLIC_SITE_URL` | Kanonik adres (varsayılan `https://www.bazgy.com`) |

Ayarlar girilmezse formlar çökmez; ziyaretçiye doğrudan info@bazgy.com adresine yazmasını söyler.
