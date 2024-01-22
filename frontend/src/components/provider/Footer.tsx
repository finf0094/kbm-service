import PhoneNumberFormatter from '../utils/PhoneNumberFormatter.tsx';
import './UI/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {

    const footerNumber = '+77777777777';
    const footerNumberSecond = '+77777777777';

    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <div className="footer__company">
                    {/*<img src="https://i.imgur.com/dZHVCmo.png" alt="" className="footer__icon" />*/}
                    <p className="footer__desc">
                        Конкурс на включение в кадровый <br /> резерв АО "Каражанбасмунай"
                    </p>
                </div>
                <div className="footer__info">
                    <nav className="footer__nav">
                        <ul className="footer__nav-list">
                            <li className="footer__nav-item">
                                <Link to="/" className="footer__nav-link">Главная</Link>
                            </li>
                            <li className="footer__nav-item">
                                <Link to="/policy" className="footer__nav-link">Политика</Link>
                            </li>
                            <li className="footer__nav-item">
                                <Link to="/profile" className="footer__nav-link">Личный кабинет</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="footer__contact">
                        {window.innerWidth === 930 ? (
                            <div className='footer__number'>
                                <PhoneNumberFormatter numberPhone={footerNumber} /> <PhoneNumberFormatter numberPhone={footerNumberSecond} />
                            </div>
                        ) : (
                            <div className='footer__number'>
                                <PhoneNumberFormatter numberPhone={footerNumber} /> / <PhoneNumberFormatter numberPhone={footerNumberSecond} />
                            </div>
                        )}
                        <div className="footer__mail">info@example-mail.kz</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
