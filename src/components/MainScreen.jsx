import React, { useEffect, useRef } from 'react';
import '../styles/MainScreen.css';
import ganpatiAudio from '../assets/ganpati-bappa-morya.m4a';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GanpatiInviteSection from './GanpatiInviteSection';

const MainScreen = ({ userName, language }) => {
    const audioRef = useRef(null);

    const normalizedName = userName?.toLowerCase() || "";
    const specialKeywords = ["gawali", "gavali", "raj", "pravain", "sir"];
    const isSpecialUser = specialKeywords.some(keyword => normalizedName.includes(keyword));

    useEffect(() => {
        AOS.init({ duration: 1000 });

        const audio = new Audio(ganpatiAudio);
        audio.loop = true;
        audio.volume = 0.08;
        audio.play().catch(() => { });
        audioRef.current = audio;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                audio.pause();
            } else {
                audio.play().catch(() => { });
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    const handleVideoPlay = (event) => {
        if (audioRef.current) audioRef.current.pause();

        const currentVideo = event.target;
        document.querySelectorAll("video").forEach((video) => {
            if (video !== currentVideo) video.pause();
        });
    };

    const handleVideoPause = () => {
        const anyPlaying = Array.from(document.querySelectorAll("video")).some(
            (v) => !v.paused && !v.ended
        );
        if (!anyPlaying && audioRef.current) {
            audioRef.current.play().catch(() => { });
        }
    };

    const content = {
        english: {
            welcome: isSpecialUser
                ? "✨ With gratitude in my heart, I welcome my inspiration — Dear Gawali Sir ✨"
                : `🙏 Welcome ${userName}`,
            wish: "🌸 May this Ganesh Chaturthi bring peace, joy, and wisdom to you and your family.",
            sections: [
                { title: "Murti Glimpses ✨", desc: "A glimpse of last year’s divine idol." },
                { title: "Decoration Moments 🎉", desc: "Peaceful decor filled with devotion." },
                { title: "Rituals & Pooja 🙏", desc: "The sacred moments of prayer." },
                { title: "Visarjan 💧", desc: "The heartfelt farewell of Bappa." },
            ],
        },
    };

    const t = content[language] || content.english;

    return (
        <div className="main-screen">
            {/* Welcome Section */}
            <h1 className="welcome-title" data-aos="fade-down">{t.welcome}</h1>
            <p className="greeting-text" data-aos="fade-up">{t.wish}</p>

            {/* Gallery */}
            <section className="section glass" data-aos="fade-up">
                <h3>{t.sections[0].title}</h3>
                <p>{t.sections[0].desc}</p>
                <div className="photo-gallery">
                    {Array.from({ length: 6 }, (_, i) => (
                        <img
                            key={i}
                            src={require(`../assets/${i + 1}.jpg`)}
                            alt={`Ganpati ${i + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Videos */}
            {t.sections.slice(1).map((sec, idx) => (
                <section key={idx} className="section glass" data-aos="fade-up">
                    <h3>{sec.title}</h3>
                    <p>{sec.desc}</p>
                    <video
                        controls
                        className="section-video"
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                        onEnded={handleVideoPause}
                    >
                        <source
                            src={require(`../assets/${["decor", "patri", "vis"][idx]}.webm`)}
                            type="video/webm"
                        />
                    </video>
                </section>
            ))}

            <GanpatiInviteSection userName={userName} language={language} />
        </div>
    );
};

export default MainScreen;
