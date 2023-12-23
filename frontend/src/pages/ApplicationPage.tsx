import React, {useEffect, useState} from 'react';

import useCurrentUser from "../hooks/useCurrentUser.ts";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";


import {setApplicationData} from "../redux/slices/applicationSlice.ts";
import {useGetApplicationByUserIdQuery} from "../redux/api/applicationApi.ts";

import ApplicationTable from "../components/application/ApplicationTable.tsx";
import ApplicationForm from "../components/application/ApplicationForm.tsx";

import Loader from "../components/utils/Loader.tsx";

import './UI/ApplicationPage.css'
import EducationTable from "../components/application/EducationTable.tsx";
import ExperienceTable from "../components/application/ExperienceTable.tsx";
import ApplicationVideo from "../components/application/ApplicationVideo.tsx";

const ApplicationPage: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const {id} = useCurrentUser();

    const dispatch = useAppDispatch()

    const {
        data: applicationData,
        isLoading: isApplicationLoading,
        isSuccess: isApplicationSuccess,
        isError: isApplicationError,
        error: applicationError
    } = useGetApplicationByUserIdQuery(id)

    useEffect(() => {
        if (isApplicationError) {
            console.log("Error", isApplicationError)
        }
        if (applicationError) {
            console.log("application error", applicationError)
        }
        if (isApplicationSuccess) {
            console.log(applicationData)
            dispatch(setApplicationData(applicationData));
        }

    }, [isApplicationError, applicationError]);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    let currentComponent;

    switch (step) {
        case 1:
            currentComponent = <ApplicationForm isChangble={true} onNext={handleNextStep}/>;
            break;
        case 2:
            currentComponent = <ApplicationTable isChangble={true}/>;
            break;
        case 3:
            currentComponent = <EducationTable isChangble={true}/>
            break;
        case 4:
            currentComponent = <ExperienceTable isChangble={true}/>
            break;
        case 5:
            currentComponent = <ApplicationVideo />;
            break;
        default:
            currentComponent = null;
    }

    return (
        <div>
            <div className="page">
                <h1 className="approval-title">Заявка от кандидата для участия в конкурсном отборе</h1>
                <div className="progress-bar">
                    {[1, 2, 3, 4, 5].map((stage, index) => (
                        <div key={index} className={`progress-step ${step >= stage ? 'completed' : ''}`}>
                            {stage}
                        </div>
                    ))}
                </div>
                {isApplicationLoading ? (
                    <Loader/>
                ) : isApplicationSuccess ? (
                    currentComponent
                ) : (
                    <div>Error loading application data</div>
                )}
                {step === 1 ? (
                    ""
                ) : (
                    <div className="approvalrequestpage__buttons">
                        <button type="button" onClick={handlePrevStep} className='approvalrequestpage__prev'>
                            <svg width="27" height="8" viewBox="0 0 27 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H27V3.5H1V4.5Z"
                                    fill="#739EFD"/>
                            </svg>

                            Назад
                        </button>
                        {step === 5 ? null : (
                            <button onClick={handleNextStep} className='approvalrequestpage__next'>
                                Далее
                                <svg width="30" height="11" viewBox="0 0 27 8" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M26.3536 4.35355C26.5488 4.15829 26.5488 3.84171 26.3536 3.64645L23.1716 0.464466C22.9763 0.269204 22.6597 0.269204 22.4645 0.464466C22.2692 0.659728 22.2692 0.976311 22.4645 1.17157L25.2929 4L22.4645 6.82843C22.2692 7.02369 22.2692 7.34027 22.4645 7.53553C22.6597 7.7308 22.9763 7.7308 23.1716 7.53553L26.3536 4.35355ZM0 4.5L26 4.5V3.5L0 3.5L0 4.5Z"
                                        fill="white"/>
                                </svg>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
        ;
}

export default ApplicationPage;
