import React, { useState, useEffect } from 'react';
import '../styles/CountdownTimer.css';

const CountdownTimer = ({ date }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(date) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Minutes: Math.floor((difference / 1000 / 60) % 60),
                Seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="countdown-container">
            {Object.keys(timeLeft).length === 0 ? (
                <p className="final-msg">🌸 Gauri Mata Has Arrived! 🌸</p>
            ) : (
                <div className="countdown-box">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="countdown-item">
                            <span className="time">{value}</span>
                            <span className="label">{unit}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CountdownTimer;
