import React from "react";
import "../styles/Schedule.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Schedule = ({ language }) => {
    React.useEffect(() => {
        AOS.init({ duration: 1200, once: true });
    }, []);

    // English Events
    const eventsEn = [
        { time: "1st Sept – 12 PM", title: "Aarti", icon: "🪔" },
        { time: "1st Sept – 1 PM", title: "Prasad (Lunch with Family)", icon: "🍽️" },
        { time: "2nd Sept – 12 AM", title: "Midnight Aarti & Rituals", icon: "🪔" },
        { time: "2nd Sept – 4 PM", title: "Aarti", icon: "🪔" },
        { time: "2nd Sept – Evening", title: "Visarjan Sohala (Immersion Ceremony)", icon: "🌊" },
    ];

    // Marathi Events
    const eventsMr = [
        { time: "१ सप्टेंबर – दुपारी १२ वा.", title: "शुभारंभाची आरती", icon: "🪔" },
        { time: "१ सप्टेंबर – दुपारी १ वा.", title: "प्रसाद (कौटुंबिक जेवण)", icon: "🍽️" },
        { time: "२ सप्टेंबर – मध्यरात्री १२ वा.", title: "मध्यरात्रीची आरती व पूजा", icon: "🪔" },
        { time: "२ सप्टेंबर – संध्याकाळी ४ वा.", title: "संध्याकाळची आरती", icon: "🪔" },
        { time: "२ सप्टेंबर – संध्याकाळ", title: "विसर्जन सोहळा", icon: "🌊" },
    ];

    // Choose Events based on language prop
    const events = language === "marathi" ? eventsMr : eventsEn;

    return (
        <div className="schedule-container">
            <h2 className="schedule-title">
                ✨ {language === "marathi" ? "कार्यक्रमाचे वेळापत्रक" : "Function Timings"} ✨
            </h2>
            <div className="timeline">
                {events.map((event, index) => (
                    <div key={index} className="timeline-item" data-aos="fade-up">
                        <div className="timeline-dot">{event.icon}</div>
                        <div className="timeline-content">
                            <h3 className="event-title">{event.title}</h3>
                            <p className="event-time">{event.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
