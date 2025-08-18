import React, { useEffect, useRef } from 'react';
import '../styles/MainScreen.css';
import ganpatiAudio from '../assets/ganpati-bappa-morya.m4a';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GanpatiInviteSection from './GanpatiInviteSection';
import Schedule from './Schedule';

const MainScreen = ({ userName, language }) => {
    const audioRef = useRef(null);

    const normalizedName = userName?.toLowerCase() || "";
    const specialKeywords = ["gawali", "gavali", "raj", "pravain", "sir", "gwali"];
    const isSpecialUser = specialKeywords.some(keyword => normalizedName.includes(keyword));

    useEffect(() => {
        AOS.init({ duration: 1200 });

        // Create background audio
        const audio = new Audio(ganpatiAudio);
        audio.loop = true; // ✅ loop background audio
        audio.volume = 0.3; // smooth music (not too loud)
        audio.play().catch(err => console.error("Audio play failed:", err));

        audioRef.current = audio;

        // ✅ Pause/Play on tab visibility change
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


    // 🎶 Pause background music when video plays, resume when paused/stopped
    // 🎶 Pause background music when video plays, resume when paused/stopped
    const handleVideoPlay = (event) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }

        // ✅ Pause all other videos except the one being played
        const currentVideo = event.target;
        const allVideos = document.querySelectorAll("video");
        allVideos.forEach((video) => {
            if (video !== currentVideo) {
                video.pause();
            }
        });
    };

    const handleVideoPause = () => {
        // ✅ Resume audio only if NO other video is playing
        const allVideos = document.querySelectorAll("video");
        const isAnyVideoPlaying = Array.from(allVideos).some(
            (video) => !video.paused && !video.ended
        );

        if (!isAnyVideoPlaying && audioRef.current) {
            audioRef.current.play().catch(() => { });
        }
    };


    const content = {
        marathi: {
            welcome: isSpecialUser
                ? "With gratitude in my heart, I welcome the one who has always been an inspiration in my life — Dear Gawali Sir ✨"
                : `🙏 हार्दिक स्वागत आहे, ${userName}!`,
            wish: '🌼 गणेश चतुर्थीच्या पावन अवसरानिमित्त तुमचं आणि तुमच्या कुटुंबाचं मनःपूर्वक अभिनंदन! 🌸',
            sections: [
                { title: 'गौरी मातेचे सुंदर क्षण ✨', desc: 'मागील वर्षीच्या गौरी मातेच्या सुंदर आणि आठवणीपूर्ण क्षणांची काही झलक तुमच्यासाठी.' },
                { title: 'आमच्या सजावटीच्या आठवणी 🎉', desc: 'प्रेमाने सजवलेली आमची मागील वर्षीची गौरी सजावट पाहून आनंद घ्या.' },
                { title: 'पूजन-विधीचा पावन सोहळा 🙏', desc: 'गौरी पूजन आणि विधीचा एक दिव्य अनुभव तुम्हाला दाखवतोय.' },
                { title: 'विसर्जन सोहळा 💧', desc: 'गौरी मातेला निरोप देतानाचे भावपूर्ण क्षण अनुभवून बघा.' },
            ],
        },
        english: {
            welcome: isSpecialUser
                ? "With gratitude in my heart, I welcome the one who has always been an inspiration in my life — Dear Gawali Sir ✨"
                : `🙏 Welcome ${userName}`,
            wish: '🎉 Wishing you and your family a joyful Ganesh Chaturthi celebration!',
            sections: [
                { title: 'Gauri Mata Memories ✨', desc: 'Take a look at last year’s beautiful Gauri Mata celebrations!' },
                { title: 'Decoration Moments 🎉', desc: 'Enjoy our last year’s Gauri decoration, made with love!' },
                { title: 'Rituals & Pooja 🙏', desc: 'A divine glimpse of our Gauri Mata pooja and rituals.' },
                { title: 'Visarjan Sohala 💧', desc: 'Watch the emotional farewell of our beloved Gauri Mata.' },
            ],
        }
    };


    const t = content[language] || content.english;

    return (
        <div className="main-screen">
            <h2 className="welcome-title" data-aos="fade-up">{t.welcome}</h2>
            <div className="greeting-text" data-aos="fade-up"><p>{t.wish}</p></div>

            {/* 1. Photo Gallery */}
            <section className="section" data-aos="fade-up">
                <h3>{t.sections[0].title}</h3>
                <p>{t.sections[0].desc}</p>
                <div className="photo-gallery">
                    {Array.from({ length: 8 }, (_, i) => (
                        <img key={i} src={require(`../assets/${i + 1}.jpg`)} alt={`Ganpati ${i + 1}`} />
                    ))}
                </div>
            </section>

            {/* 2. Decoration Video */}
            <section className="section" data-aos="fade-up">
                <h3>{t.sections[1].title}</h3>
                <p>{t.sections[1].desc}</p>
                <video
                    controls
                    className="section-video"
                    preload="auto"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                >
                    <source src={require('../assets/decor.webm')} type="video/webm" />
                </video>
            </section>

            {/* 3. Rituals Video */}
            <section className="section" data-aos="fade-up">
                <h3>{t.sections[2].title}</h3>
                <p>{t.sections[2].desc}</p>
                <video
                    controls
                    className="section-video"
                    preload="metadata"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                >
                    <source src={require('../assets/patri.webm')} type="video/webm" />
                </video>
            </section>

            {/* 4. Visarjan Video */}
            <section className="section" data-aos="fade-up">
                <h3>{t.sections[3].title}</h3>
                <p>{t.sections[3].desc}</p>
                <video
                    controls
                    className="section-video"
                    preload="auto"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                >
                    <source src={require('../assets/vis.webm')} type="video/webm" />
                </video>
            </section>

            <br /><br /><br />
            <Schedule language={language} />
            <br /><br /><br />
            <GanpatiInviteSection userName={userName} language={language} />
        </div>
    );
};

export default MainScreen;
