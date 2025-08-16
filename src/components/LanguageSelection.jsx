import '../styles/LanguageSelection.css';
import 'aos/dist/aos.css';

const LanguageSelection = ({ onSelect }) => {
    return (
        <div className="language-selection-container">
            <h2 data-aos="fade-up">Please select your preferred language</h2>
            <div className="lang-buttons">
                <button data-aos="zoom-in" onClick={() => onSelect('marathi')}>मराठी</button>
                <button data-aos="zoom-in" onClick={() => onSelect('english')}>English</button>
            </div>
        </div>
    );
};

export default LanguageSelection;
