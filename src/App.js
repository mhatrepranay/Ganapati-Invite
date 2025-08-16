import React, { useState, useEffect } from 'react';
import GanpatiIntro from './components/GanpatiIntro';
import NameInput from './components/NameInput';
import MainScreen from './components/MainScreen';
import LanguageSelection from './components/LanguageSelection'; // NEW
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './components/Footer';


function App() {
  const [stage, setStage] = useState('intro');
  const [userName, setUserName] = useState('');
  const [language, setLanguage] = useState('');

  const handleIntroComplete = () => setStage('name');
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleNameSubmit = (name) => {
    setUserName(name);
    

    // Google Fo rm POST URL
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfKbNcw8q1do9jc1Ay0Z2Jim1dBCuoBCQlsdSuLf9igvanFpA/formResponse";

    // Prepare form data
    const formData = new FormData();
    formData.append("entry.949286030", name); // Replace with your entry ID

    // Send POST
    fetch(formUrl, {
      method: "POST",
      mode: "no-cors", // This is key — prevents CORS errors
      body: formData
    }).then(() => {
      console.log("Name stored successfully!");
      setStage('language'); // Go to next stage
    }).catch((err) => {
      console.error("Error storing name:", err);
      alert("Failed to save name");
    });
  };







  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setStage('main');
  };

  return (
    <>
      {stage === 'intro' && <GanpatiIntro onComplete={handleIntroComplete} />}
      {stage === 'name' && <NameInput onNameSubmit={handleNameSubmit} />}
      {stage === 'language' && <LanguageSelection onSelect={handleLanguageSelect} />}
      {stage === 'main' && <MainScreen userName={userName} language={language} />}
      <Footer />
    </>
  );
}

export default App;
