export type Slide = {
  id: string;
  eyebrow: string;
  city: string;
  title: string;
  copy: string;
  image: string | null;
};

export const slides: Slide[] = [
  {
    id: "dikili",
    eyebrow: "ATIK SU VE ALTYAPI",
    city: "İzmir, Dikili",
    title: "Şehirlerin geleceğine akan mühendislik",
    copy: "İzmir Dikili Atık Su Arıtma Tesisi, bölgeye sürdürülebilir bir arıtma altyapısı kazandırıyor.",
    image: null,
  },
  {
    id: "karlitepe",
    eyebrow: "ÜSTYAPI VE KONUT",
    city: "İstanbul, Beykoz",
    title: "Konforun zirvede buluştuğu adres",
    copy: "Beykoz Karlıtepe'de, Boğaz manzaralı teraslar ve yeşil çatı bahçeleriyle örülü bir konut projesi.",
    image: "/images/karlitepe-hero.png",
  },
  {
    id: "ito",
    eyebrow: "ÜSTYAPI VE KURUMSAL",
    city: "İstanbul",
    title: "Kurumsal yapılarda kalıcı değer",
    copy: "İstanbul İTO Merkez Binası, kurumsal kimliği güçlü, uzun ömürlü bir hizmet binasına dönüşüyor.",
    image: null,
  },
  {
    id: "cami",
    eyebrow: "ÜSTYAPI VE KAMU",
    city: "Erzincan",
    title: "İbadete adanan bir eser",
    copy: "Erzincan Ulu Camii inşaatında, geleneksel form çağdaş mühendislikle bir araya geliyor.",
    image: null,
  },
];

export const stats = [
  { target: 25, suffix: "+", label: "Yıllık Deneyim" },
  { target: 50, suffix: "+", label: "Tamamlanan Proje" },
  { target: 4, suffix: "+", label: "Sektörde Uzmanlık" },
  { target: 100, suffix: "%", label: "Zamanında Teslim" },
];

export const services = [
  {
    name: "Atık Su / Su Arıtma",
    desc: "Şehirlere temiz su ulaştıran arıtma tesisleri ve su altyapısı çözümleri.",
    icon: "droplet",
  },
  {
    name: "Üstyapı İnşaatları",
    desc: "Konuttan kuruma büyük ölçekli üstyapı projelerinde tasarımdan teslime sorumluluk.",
    icon: "building",
  },
  {
    name: "Kamu Binaları",
    desc: "Cami, belediye ve diğer kamu yapılarında uçtan uca yapım hizmeti.",
    icon: "mosque",
  },
  {
    name: "Altyapı",
    desc: "Yol, saha düzenlemesi ve destek altyapısı projeleri.",
    icon: "road",
  },
] as const;

export const smallProjects = [
  { title: "İzmir Dikili AAT", location: "İzmir, Dikili", category: "Atık Su", status: "Tamamlandı" },
  { title: "Aliağa Sakran AAT", location: "İzmir, Aliağa", category: "Atık Su", status: "Tamamlandı" },
  { title: "Erzincan Ulu Camii", location: "Erzincan", category: "Kamu Binası", status: "Devam Ediyor" },
  { title: "İTO Merkez Binası", location: "İstanbul", category: "Kurumsal", status: "Tamamlandı" },
  { title: "İTO Maltepe Hizmet Binası", location: "İstanbul, Maltepe", category: "Kurumsal", status: "Tamamlandı" },
];

export const regions = [
  { name: "İzmir", count: "2 Proje", focus: "Atık Su / Altyapı" },
  { name: "İstanbul", count: "3 Proje", focus: "Üstyapı / Kurumsal" },
  { name: "Erzincan", count: "1 Proje", focus: "Kamu Binası" },
];

export const navLinks = [
  { href: "#kurumsal", label: "Kurumsal" },
  { href: "#hizmetler", label: "Faaliyet Alanları" },
  { href: "#projeler", label: "Projeler" },
  { href: "#surdurulebilirlik", label: "Sürdürülebilirlik" },
  { href: "#kariyer", label: "Kariyer" },
];
