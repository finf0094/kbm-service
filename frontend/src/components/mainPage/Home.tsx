import React from "react";
import './UI/Home.css'
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice';
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal({ id: 'infoModal' }));
    };

    return (
        <>
            <section className="home">
                <div className="container">
                    <div className="home__wrapper">
                        <h1 className="home__title">{t('competetion_hr')}
                            {/* <h1>{t('welcome')}</h1> */}
                        </h1>
                        <button className="home__button" onClick={handleOpenModal}>{t('take_part')}</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
