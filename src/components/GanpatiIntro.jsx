import { useRef, useState, } from 'react';
import '../styles/GanpatiIntro.css';
import introVideo from '../assets/intro.mp4';

const GanpatiIntro = ({ onComplete }) => {
    const playCountRef = useRef(1); // Starts at 1st play
    const videoRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    const handleVideoEnd = () => {
        if (playCountRef.current < 2) {
            playCountRef.current += 1;
            videoRef.current.play(); // Replay the video
        } else {
            onComplete(); // Call the callback after 3 plays
        }
    };

    return (
        <div className="intro-container">

            <video
                ref={videoRef}
                src={introVideo}
                className="intro-video"
                autoPlay
                playsInline
                muted
                preload="auto"
                onCanPlay={() => setIsReady(true)} // ✅ Fires when video is buffered
                onEnded={handleVideoEnd}
            />

            {!isReady && (
                <div className="loading-screen">
                    <h1 className="om-symbol">ॐ</h1>
                </div>
            )}
        </div>
    );
};

export default GanpatiIntro;
