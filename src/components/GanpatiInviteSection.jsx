import React, { useState } from 'react';
import '../styles/GanpatiInviteSection.css';
import decorationImage from '../assets/2.jpg'; // blurred & hidden
import CountdownTimer from './CountdownTimer';

export default function GanpatiInviteSection({ userName, language }) {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);

    const handleReveal = () => setShowPopup(true);
    const handleReveal1 = () => setShowPopup1(true);
    const closePopup = () => {
        setShowPopup(false);
        setShowPopup1(false);
    };

    const content = {
        marathi: {
            heading: '🎊 गणपती बाप्पा 2025 – आपल्या घरात हार्दिक स्वागत!',

            decorationBtn: '✨ या वर्षीच्या सजावटीचा आनंद घ्या',

            invitePopupTitle: '🙏 आमच्या मनापासून आमंत्रण',

            invitePopupDesc: 'कृपया आमच्या घरी या, बाप्पाचे आशीर्वाद घ्या आणि मनमोहक सजावट पाहा! 🎉',

            thankYouPopupTitle: '🙏 आमच्या गणपती निमंत्रणाला मान्यता दिल्याबद्दल धन्यवाद 🙏',

            thankYouPopupDesc1: 'आपल्याला <strong>गणपती उत्सव</strong> साजरा करण्यासाठी आमच्या घरी पाहण्याची आम्हाला आतुरता आहे.',

            thankYouPopupDesc2: '१ सप्टेंबर २०२५ रोजी,',

            thankYouPopupDesc3: 'आमच्या घरी 🏠',

            thankYouPopupDesc4: '🌸 तुमची उपस्थिती हा सण अजून संस्मरणीय करेल 🌸',

            inviteText: `या वर्षी आमच्या बाप्पाच्या आगमन सोहळ्यात आपण नक्कीच सहभागी व्हाल अशी आशा आहे!  
        हा आमंत्रण नाही, तर आपल्या मनाचा भाव आहे. 🔔`,

            rsvpBtn: '✨ मी उपस्थित असेन! ✨',
        },

        english: {
            heading: '🎊 Ganpati Bappa 2025 – Grand Welcome Awaits You!',
            decorationBtn: '✨ See This Year’s Decoration',
            invitePopupTitle: '🙏 Invitation from our heart',
            invitePopupDesc: "Please come to our home to take Bappa's blessings and witness the beautiful decoration! 🎉",
            thankYouPopupTitle: '🙏 Thank You for Accepting Our Ganpati Invitation 🙏',
            thankYouPopupDesc1: 'We can’t wait to welcome you for the ',
            thankYouPopupDesc2: 'Ganpati Celebration on ',
            thankYouPopupDesc3: '1st September 2025 at Our Home 🏠',
            thankYouPopupDesc4: '🌸 Your presence will make the celebration even more special 🌸',
            inviteText: "It's more than an invite, it’s an emotion. 🔔",
            rsvpBtn: "✨ I'M COMING! ✨",
        }
    };

    const t = content[language] || content.english;

    const handleNameSubmit = (name) => {
        if (!name) {
            alert(language === 'marathi' ? 'कृपया आपले नाव टाका' : 'Please enter your name');
            return;
        }

        // Google Form POST URL
        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdcDNgOLmzik81JnxcqP96gMnHce_FlDjIaKfX1goEqoQq-Mg/formResponse";

        // Prepare form data
        const formData = new FormData();
        formData.append("entry.1563976339", name); // Replace with your entry ID

        // Send POST request
        fetch(formUrl, {
            method: "POST",
            mode: "no-cors", // Prevents CORS errors
            body: formData
        }).then(() => {
            handleReveal1();
            console.log("Name stored successfully!");
        }).catch((err) => {
            console.error("Error storing name:", err);
            alert(language === 'marathi' ? 'नाव जतन करण्यात अडचण' : 'Failed to save name');
        });
    };

    return (
        <section className="ganpati-invite-section">
            <h2>{t.heading}</h2>

            <div className="image-container secret-img">
                <img src={decorationImage} alt="Secret Decoration" />
                <button className="reveal-btn" onClick={handleReveal}>
                    {t.decorationBtn}
                </button>
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>{t.invitePopupTitle}</h3>
                        <p dangerouslySetInnerHTML={{ __html: t.invitePopupDesc }} />
                        <button className="close-btn" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}

            {showPopup1 && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>{t.thankYouPopupTitle}</h3>
                        {language === 'marathi' ? (
                            <>
                                <p>आम्ही आपले स्वागत करण्यास उत्सुक आहोत <strong>गणपती साजरा</strong> साठी</p>
                                <p><strong>1 सप्टेंबर 2025</strong> रोजी आमच्या घरी 🏠</p>
                                <p>🌸 तुमच्या उपस्थितीमुळे साजरा अजून खास होईल 🌸</p>
                            </>
                        ) : (
                            <>
                                <p>{t.thankYouPopupDesc1}<strong>Ganpati Celebration</strong></p>
                                <p>{t.thankYouPopupDesc2}<strong>1st September 2025</strong>{t.thankYouPopupDesc3}</p>
                                <p>{t.thankYouPopupDesc4}</p>
                            </>
                        )}
                        <button className="close-btn" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}

            <p className="invite-text" style={{ whiteSpace: 'pre-line' }}>
                {language === 'marathi'
                    ? `या वर्षी आमच्या बाप्पाच्या आगमन सोहळ्यात तुम्ही हजर राहाच!\nहे फक्त आमंत्रण नाही, तर एक भावना आहे. 🔔`
                    : t.inviteText}
            </p>

            <div className="countdown-wrapper">
                <CountdownTimer date="2025-09-01" />
            </div>

            <button className="rsvp-btn" onClick={() => handleNameSubmit(userName)}>
                {t.rsvpBtn}
            </button>
        </section>
    );
}
