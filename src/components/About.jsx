import squadImage from '../assets/squad-studio.jpg';

const COMMITMENTS = [
  {
    number: '01',
    title: '100% Play Pure (Anti-Banned)',
    description:
      'Murni mengandalkan kemampuan mekanik, rotasi zona, dan komunikasi squad di smartphone resmi tanpa cheat, config, atau emulator ilegal.',
  },
  {
    number: '02',
    title: 'Privasi & Keamanan Login',
    description:
      'Akses login hanya dipakai pada jam yang telah disepakati bersama. Tim wajib logout permanen setelah target selesai.',
  },
  {
    number: '03',
    title: 'Update Progres Harian',
    description:
      'Setiap malam kami kirimkan tangkapan layar statistik poin tier, K/D ratio, dan riwayat match agar Anda selalu tahu perkembangan akun.',
  },
  {
    number: '04',
    title: 'Garansi Target Tercapai',
    description:
      'Estimasi waktu disepakati sejak awal. Apabila kendala teknis membuat target tidak terpenuhi, dana dikembalikan proporsional.',
  },
];

export default function About() {
  return (
    <section id="tentang" className="section section-muted">
      <div className="container about-grid">
        <figure className="about-media">
          <img
            src={squadImage}
            alt="Dua pemain profesional tim SANGAR sedang fokus bermain di ruang studio taktis"
          />
          <figcaption className="about-media-note">
            Roster inti SANGAR beranggotakan mantan pemain kompetitif komunitas dengan rata-rata
            tier Ace Dominator hingga Conqueror di Server Asia.
          </figcaption>
        </figure>

        <div>
          <header className="section-header about-header">
            <span className="eyebrow">Tentang SANGAR</span>
            <h2 className="section-title">
              Dikerjakan Roster Terverifikasi, Bukan Bot atau Program Ilegal.
            </h2>
            <p className="section-lead">
              Berdiri sejak 2021 untuk pemain PUBG Indonesia yang sibuk kuliah maupun bekerja,
              SANGAR menjaga keseimbangan antara kecepatan naik tier, statistik K/D yang layak
              dipamerkan, dan keamanan penuh atas akun Anda.
            </p>
          </header>

          <ol className="pillars-list">
            {COMMITMENTS.map((item) => (
              <li key={item.number} className="pillar-item">
                <span className="pillar-number">{item.number}</span>
                <div>
                  <h3 className="pillar-title">{item.title}</h3>
                  <p className="pillar-desc">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
