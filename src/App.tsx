import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Users, 
  Briefcase, 
  Trophy, 
  Send, 
  Instagram, 
  Facebook, 
  Twitter,
  ChevronRight,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // URL Google Apps Script yang Anda berikan
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzHgC3Usj7QcbzpNqvOUPAyWhcJl2QOzndWpiaVxe2oiYR0v1UsQMfFWYnJQtA8yz_z/exec';
      
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setSubmitStatus('success');
      setFormData({ nama: '', email: '', subjek: '', pesan: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "150+", label: "Anggota Aktif" },
    { icon: <Briefcase className="w-8 h-8" />, value: "12", label: "Program Kerja" },
    { icon: <Trophy className="w-8 h-8" />, value: "4", label: "Prestasi Utama" },
  ];

  const programs = [
    {
      title: "Kerja Bakti Rutin",
      description: "Menjaga kebersihan dan keasrian lingkungan RW 04 setiap akhir pekan.",
      image: "/api/attachments/3"
    },
    {
      title: "Kegiatan Sosial",
      description: "Meningkatkan keakraban antar pemuda melalui berbagai kegiatan sosial dan kemasyarakatan.",
      image: "/api/attachments/2"
    },
    {
      title: "Pelatihan UMKM",
      description: "Memberdayakan ekonomi kreatif warga melalui workshop kewirausahaan digital.",
      image: "/api/attachments/1"
    }
  ];

  const gallery = [
    {
      url: "https://lh3.googleusercontent.com/d/107pX8Fz96ZyvlpQl1wIQ00kyglwmG2n8",
      title: "Gotong Royong",
      caption: "Sinergi pemuda dan warga dalam menjaga kebersihan lingkungan RW 04 Tegal Parang."
    },
    {
      url: "https://lh3.googleusercontent.com/d/1CdH7f9dZT6iZEX0TDmR4Zhh-wQtUsCel",
      title: "Penghijauan Lingkungan",
      caption: "Aksi nyata pemuda dalam menanam pohon untuk menciptakan udara yang lebih bersih dan lingkungan yang asri."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="https://lh3.googleusercontent.com/d/1ZQHsrDGWX1sJt6QxQL-spMb7v2BVkKGB" 
              alt="Logo RW 04" 
              className="w-10 h-10 object-contain rounded-full bg-white p-1 shadow-inner"
              referrerPolicy="no-referrer"
            />
            <span className={`font-bold text-xl tracking-tight ${scrolled ? 'text-white' : 'text-white'}`}>
              Katar <span className="text-gold">RW 04</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {['Beranda', 'Program', 'Galeri', 'Kontak'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-white hover:text-gold transition-colors font-medium text-sm uppercase tracking-wider"
              >
                {item}
              </a>
            ))}
            <a 
              href="#kontak" 
              className="bg-gold hover:bg-gold-light text-navy px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-md"
            >
              Kirim Pesan
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-navy border-t border-white/10 p-6 md:hidden shadow-2xl"
            >
              <div className="flex flex-col space-y-4">
                {['Beranda', 'Program', 'Galeri', 'Kontak'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="text-white text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <a 
                  href="#kontak" 
                  className="bg-gold text-navy px-6 py-3 rounded-xl font-bold w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kirim Pesan
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1B7ewqhu3yMPZ1d8xSFJc2xkWKi0Gyl6Y" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-gold/20 text-gold border border-gold/30 px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase mb-6">
              Karang Taruna Tegal Parang
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Membangun Tegal Parang <br />
              <span className="text-gold">dengan Karya</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Wadah kreativitas dan pengabdian pemuda RW 04 untuk menciptakan lingkungan yang harmonis, inovatif, dan berprestasi.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <a href="#program" className="bg-gold hover:bg-gold-light text-navy px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl flex items-center">
                Lihat Program <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#kontak" className="border-2 border-white/30 hover:border-white text-white px-10 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm">
                Hubungi Kami
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gold rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white relative -mt-20 z-20 rounded-t-[3rem] md:rounded-t-[5rem] shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-navy p-10 rounded-3xl text-center shadow-xl group transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 text-gold rounded-2xl mb-6 group-hover:bg-gold group-hover:text-navy transition-all">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Kerja Section */}
      <section id="program" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-gold font-bold tracking-widest uppercase mb-2">Aksi Nyata Kami</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-navy">Program Kerja Unggulan</h3>
            <div className="w-24 h-1.5 bg-gold mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-all"></div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold mb-4 text-navy group-hover:text-gold transition-colors">{program.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {program.description}
                  </p>
                  <button className="text-navy font-bold flex items-center hover:text-gold transition-colors">
                    Selengkapnya <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeri" className="py-24 bg-navy">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="text-left mb-8 md:mb-0">
              <h2 className="text-gold font-bold tracking-widest uppercase mb-2">Momen Berharga</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white">Galeri Kegiatan</h3>
            </div>
            <button className="border-2 border-gold text-gold px-8 py-3 rounded-full font-bold hover:bg-gold hover:text-navy transition-all">
              Lihat Semua Foto
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {gallery.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative bg-white/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-gold/20 backdrop-blur-md border border-gold/30 inline-block px-3 py-1 rounded-lg text-gold text-xs font-bold uppercase tracking-widest mb-3">
                    {item.title}
                  </div>
                  <p className="text-white text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.caption}
                  </p>
                </div>
                
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white">
                    <Instagram size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gray-50 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            {/* Contact Info */}
            <div className="lg:w-1/3 bg-navy p-12 text-white">
              <h3 className="text-3xl font-bold mb-8">Hubungi Kami</h3>
              <p className="text-gray-400 mb-12">
                Punya pertanyaan atau ingin berkolaborasi? Kami siap mendengar aspirasi Anda.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gold/20 p-3 rounded-xl text-gold">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gold">Alamat</h4>
                    <p className="text-gray-300">Sekretariat RW 04, Tegal Parang, Jakarta Selatan</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gold/20 p-3 rounded-xl text-gold">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gold">Telepon</h4>
                    <p className="text-gray-300">+62 812 3456 7890</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gold/20 p-3 rounded-xl text-gold">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gold">Email</h4>
                    <p className="text-gray-300">katar.rw04@tegalparang.id</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex space-x-6">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 p-12">
              <form 
                onSubmit={handleFormSubmit} 
                action="https://script.google.com/macros/s/AKfycbzHgC3Usj7QcbzpNqvOUPAyWhcJl2QOzndWpiaVxe2oiYR0v1UsQMfFWYnJQtA8yz_z/exec"
                method="POST"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy uppercase tracking-wider">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="nama"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@contoh.com"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-navy uppercase tracking-wider">Subjek</label>
                  <input 
                    type="text" 
                    name="subjek"
                    required
                    value={formData.subjek}
                    onChange={(e) => setFormData({...formData, subjek: e.target.value})}
                    placeholder="Apa yang ingin Anda bicarakan?"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-navy uppercase tracking-wider">Pesan</label>
                  <textarea 
                    rows={5}
                    name="pesan"
                    required
                    value={formData.pesan}
                    onChange={(e) => setFormData({...formData, pesan: e.target.value})}
                    placeholder="Tuliskan pesan Anda di sini..."
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-navy text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-navy/90 transition-all shadow-xl flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'} <Send className="ml-2 w-5 h-5" />
                  </button>
                  
                  {submitStatus === 'success' && (
                    <p className="mt-4 text-green-600 font-bold text-center">Terima kasih, pesan Anda sudah diterima!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="mt-4 text-red-600 font-bold text-center">Gagal mengirim pesan. Silakan coba lagi.</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <img 
              src="https://lh3.googleusercontent.com/d/1ZQHsrDGWX1sJt6QxQL-spMb7v2BVkKGB" 
              alt="Logo RW 04" 
              className="w-8 h-8 object-contain rounded-full bg-white p-0.5"
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-lg text-white">
              Karang Taruna <span className="text-gold">RW 04</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Karang Taruna RW 04 Tegal Parang. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Dibuat dengan dedikasi untuk kemajuan lingkungan.
          </p>
        </div>
      </footer>
    </div>
  );
}
