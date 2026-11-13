import { useState } from 'react';
import About from './components/About.jsx';
import Calculator from './components/Calculator.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import OrderContact from './components/OrderContact.jsx';
import Process from './components/Process.jsx';
import Services from './components/Services.jsx';
import Testimonials from './components/Testimonials.jsx';

export default function App() {
  const [calcConfig, setCalcConfig] = useState({
    startTierId: 'diamond-5',
    targetTierId: 'ace',
    modeId: 'squad-tpp',
    addons: [],
    packageLabel: '',
  });

  const [orderForm, setOrderForm] = useState({
    ign: '',
    whatsapp: '',
    server: 'Asia • Squad TPP',
    playSystem: 'Joki Login Terjadwal',
    routeSummary: 'Push Diamond V – Ace (Est. Rp 135.000)',
    scheduleNote: '',
  });

  const handleSelectPackage = (preset) => {
    const addons = preset.addons || [];
    setCalcConfig({
      startTierId: preset.startTierId,
      targetTierId: preset.targetTierId,
      modeId: preset.modeId,
      addons,
      packageLabel: preset.packageLabel || '',
    });

    setOrderForm((prev) => ({
      ...prev,
      server: preset.modeId === 'fpp' ? 'Asia • FPP Mode' : 'Asia • Squad TPP',
      playSystem: addons.includes('mabar')
        ? 'Mabar / Gendong (Tanpa Login)'
        : 'Joki Login Terjadwal',
      routeSummary: preset.packageLabel,
    }));

    const calcSection = document.getElementById('kalkulator');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToOrder = (estimate) => {
    const addonSuffix =
      estimate.addonLabels.length > 0 ? ` + ${estimate.addonLabels.join(', ')}` : '';
    const summary = `${estimate.startLabel} → ${estimate.targetLabel} (${estimate.modeLabel}${addonSuffix}) • Est. ${estimate.formattedCost}`;

    let serverValue = 'Asia • Squad TPP';
    if (calcConfig.modeId === 'duo-tpp') serverValue = 'Asia • Duo TPP';
    if (calcConfig.modeId === 'solo-tpp') serverValue = 'Asia • Solo TPP';
    if (calcConfig.modeId === 'fpp') serverValue = 'Asia • FPP Mode';

    setOrderForm((prev) => ({
      ...prev,
      server: serverValue,
      playSystem: calcConfig.addons.includes('mabar')
        ? 'Mabar / Gendong (Tanpa Login)'
        : 'Joki Login Terjadwal',
      routeSummary: summary,
    }));

    const contactSection = document.getElementById('kontak');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services onSelectPackage={handleSelectPackage} />
        <Calculator
          config={calcConfig}
          onChangeConfig={setCalcConfig}
          onProceedToOrder={handleProceedToOrder}
        />
        <Process />
        <Testimonials />
        <Faq />
        <OrderContact orderForm={orderForm} onChangeOrderForm={setOrderForm} />
      </main>
      <Footer />
    </>
  );
}
