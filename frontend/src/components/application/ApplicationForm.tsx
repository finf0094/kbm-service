import React, {useEffect} from 'react'
import {useForm, SubmitHandler} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch.ts";
import {IEmployee} from "../../models/employee/IEmployee.ts";

import './UI/ApplicationForm.css'
import {useSetEmployeeMutation} from "../../redux/api/applicationApi.ts";
import {toast} from "react-toastify";
import Loader from "../utils/Loader.tsx";
import {setApplicationData} from "../../redux/slices/applicationSlice.ts";

interface ApprovalRequestFormProps {
    isChangble: boolean;
    onNext?: () => void;
}

const ApplicationForm: React.FC<ApprovalRequestFormProps> = ({isChangble, onNext}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<IEmployee>();

    const [setEmployeeQuery, {
        data: applicationData,
        isLoading: isEmployeeLoading,
        isSuccess: isEmployeeSuccess,
        isError: isEmployeeError,
        error: employeeError
    }] = useSetEmployeeMutation()
    const dispatch = useAppDispatch();
    const application = useAppSelector(state => state.application);
    const {employee} = application

    const setEmployeeDataToHookForm = async () => {
        if (employee) {
            if (employee.birthDate !== undefined && employee.birthDate !== null) {
                const birthDate = new Date(employee.birthDate);
                const formattedBirthDate = birthDate.toISOString().split('T')[0];
                reset({...employee, birthDate: formattedBirthDate});
            } else {
                reset(employee);
            }
        }
    };

    const onSubmit: SubmitHandler<IEmployee> = (data) => {
        const applicationId = application.id;
        setEmployeeQuery({applicationId, body: data});
    };

    useEffect(() => {
        setEmployeeDataToHookForm();
    }, [])

    useEffect(() => {
        if (isEmployeeSuccess && applicationData) {
            if (onNext) {
                onNext()
            }
            dispatch(setApplicationData(applicationData));
        }
        if (employeeError && 'data' in employeeError && employeeError.data) {
            toast.error(`error: ${employeeError.data.message}`);
            console.log(employeeError);
        }
    }, [isEmployeeSuccess, isEmployeeError, applicationData, employeeError, dispatch]);

    if (isEmployeeLoading) {
        return <Loader/>
    }

    return (
        <div>
            <div className="approvalrequestform">
                <div className="approvalrequestform__wrapper">
                    <form onSubmit={handleSubmit(onSubmit)} className="approvalrequestform__form">
                        <div className="approvalrequestform__inputBoxs">
                            <div className="approvalrequestform__inputBox">
                                <label htmlFor="fullName">Табельный номер*</label>
                                <input
                                    type="text"
                                    {...register("personnelNumber", {required: true})}
                                    disabled={!isChangble}
                                />
                                {errors.personnelNumber && (
                                    <span className="approval-request-form__error">Это поле обязательно!</span>
                                )}
                            </div>
                            <div className="approvalrequestform__inputBox">
                                <label htmlFor="fullName">Гражданство*</label>
                                <input
                                    type="text"
                                    {...register("citizenship", {required: true})}
                                    disabled={!isChangble}
                                />
                                {errors.citizenship && (
                                    <span className="approval-request-form__error">Это поле обязательно!</span>
                                )}
                            </div>
                            <div className="approvalrequestform__inputBox">
                                <label htmlFor="fullName">Информация о детях*</label>
                                <input
                                    type="text"
                                    {...register("informationAboutChildren", {required: true})}
                                    disabled={!isChangble}
                                />
                                {errors.informationAboutChildren && (
                                    <span className="approval-request-form__error">Это поле обязательно!</span>
                                )}
                            </div>
                            <div className="approvalrequestform__inputBox">
                                <label htmlFor="fullName">Дата рождения*</label>
                                <input
                                    type="date"
                                    {...register("birthDate", {required: true})}
                                    disabled={!isChangble}
                                />

                                {errors.birthDate && (
                                    <span className="approval-request-form__error">Это поле обязательно!</span>
                                )}
                            </div>
                            <div className="approvalrequestform__inputBox">
                                <label htmlFor="fullName">Контактные данные*</label>
                                <input
                                    type="text"
                                    {...register("phoneNumber", {required: true})}
                                    disabled={!isChangble}
                                />
                                {errors.phoneNumber && (
                                    <span className="approval-request-form__error">Это поле обязательно!</span>
                                )}
                            </div>
                            <div className="approvalrequestform__inputBox">
                                <label htmlFor="fullName">Семейное положение*</label>
                                <input
                                    type="text"
                                    {...register("familyStatus", {required: true})}
                                    disabled={!isChangble}
                                />
                                {errors.familyStatus && (
                                    <span className="approval-request-form__error">Это поле обязательно!</span>
                                )}
                            </div>
                            <div></div>
                            {onNext ? <div className="approvalrequestform__buttons">
                                <button type="submit" className='approvalrequestpage__next'>
                                    Далее
                                    <svg width="30" height="11" viewBox="0 0 27 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.3536 4.35355C26.5488 4.15829 26.5488 3.84171 26.3536 3.64645L23.1716 0.464466C22.9763 0.269204 22.6597 0.269204 22.4645 0.464466C22.2692 0.659728 22.2692 0.976311 22.4645 1.17157L25.2929 4L22.4645 6.82843C22.2692 7.02369 22.2692 7.34027 22.4645 7.53553C22.6597 7.7308 22.9763 7.7308 23.1716 7.53553L26.3536 4.35355ZM0 4.5L26 4.5V3.5L0 3.5L0 4.5Z" fill="white" />
                                    </svg>
                                </button>
                            </div> : ""}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplicationForm