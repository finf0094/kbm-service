import React from 'react'
import './UI/Frames.css'
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/modalSlice';
import { useTranslation } from 'react-i18next';

const Frames: React.FC = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal({ id: "infoModal" }));
    };

    const framesData = [
        {
            name: "Корпус “А”",
            desc: t("body_A_desc")
        },
        {
            name: "Корпус “Б”",
            desc: t("body_B_desc")
        },
        {
            name: "Корпус “С”",
            desc: t("body_C_desc")
        },
        {
            name: "Корпус “Е”",
            desc: t("body_E_desc")
        },
    ];

    return (
        <>
            <section className="frames">
                <div className="container">
                    <div className="frames__wrapper">
                        <h1 className="frames__title">{t("When_forming_the_personnel_reserve_the_following_approaches_are_used_to_classify_the_key_positions_of_the_Personnel_Reserve")}</h1>

                        <div className="frames__content">
                            {framesData.map((frame, i) => (
                                <div key={i} className="frames__item">
                                    <h3 className="frames__item-name">{frame.name}</h3>
                                    <p className="frames__item-desc">{frame.desc}</p>
                                </div>
                            ))}
                        </div>
                        <button className="frames__button" onClick={handleOpenModal}>{t("Take_part")}</button>
                    </div>
                </div>
            </section>
        </>
    )
};



export default Frames;
