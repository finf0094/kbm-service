import "./UI/Who.css";
import { useTranslation } from "react-i18next";

export default function Who() {
    const {t} = useTranslation()
    return (
        <>
            <section className="who">
                <div className="container">
                    <div className="who__wrapper">
                        <h1 className="who__title">{t('who_can_take_part')}</h1>

                        <div className="who__content">
                            <div className="who__card who__card-first">
                                <img src="https://i.imgur.com/JOFaXc7.png" alt="" className="who__card-img_first"/>
                                <h3 className="who__card-title">{t('with_higher_education')}</h3>
                            </div>
                            <div className="who__cards-second">
                                <div className="who__card">
                                    <img src="https://i.imgur.com/6Ejmuob.png" alt="" className="who__card-img"/>
                                    <div className="who__card-content">
                                        <h3 className="who__card-title">{t("Employees_of_JSC")}</h3>
                                        <p className="who__card-text">{t("With_at_least_1_year_of_experience_in_the_company")}</p>
                                    </div>
                                </div>
                                <div className="who__card">
                                    <img src="https://i.imgur.com/3bs7PHf.png" alt="" className="who__card-img"/>
                                    <div className="who__card-content">
                                        <h3 className="who__card-title">{t("Without_disciplinary_penalties")}</h3>
                                        <p className="who__card-text">{t("During_the_last_3_years_of_work_in_the_Company")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
