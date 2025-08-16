import React, { useState, useEffect } from 'react';
import '../styles/NameInput.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NameInput = ({ onNameSubmit }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    return (
        <div className="name-input-container">
            <h2 data-aos="fade-up">तुमचं नाव टाका / Enter your name</h2>

            <input
                data-aos="zoom-in"
                type="text"
                placeholder="तुमचं नाव / Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button
                className="submit-btn"
                data-aos="fade-up"
                onClick={() => name.trim() && onNameSubmit(name.trim())}
            >
                पुढे चला / Continue
            </button>
        </div>
    );
};

export default NameInput;
