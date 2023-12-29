import React, {useEffect, useState} from "react";

import {useTranslation} from "react-i18next";

// MODELS
import {IUserDetail} from "../../models/user/IUserDetail.ts";

// CSS
import './UI/UserCard.css'
import {useUpdateUserMutation} from "../../redux/api/userApi.ts";

interface UserCardProps {
    data: IUserDetail
}

const UserCard: React.FC<UserCardProps> = ({data}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        firstname: data.firstname,
        lastname: data.lastname,
        position: data.position,
        aboutMe: data.aboutMe,
        id: data.id,
    });

    const [updateUser, {
        data: userUpdateData,
        isSuccess: isUserUpdateSuccess,
        isLoading: isUserUpdateLoading,
        isError: isUserUpdateError,
        error: userUpdateError
    }] = useUpdateUserMutation();

    const { t } = useTranslation();

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveClick = () => {
        updateUser(editedData)
        setIsEditing(!isEditing);
    };


    useEffect(() => {
        if (userUpdateData) console.log("user data", userUpdateData);
        if (isUserUpdateSuccess) console.log("success");
        if (isUserUpdateLoading) console.log("Loading...");
        if (isUserUpdateError) console.log("user update error: ", isUserUpdateError);
        if (userUpdateError) console.log(userUpdateError);
    }, [userUpdateData, isUserUpdateSuccess, isUserUpdateLoading, isUserUpdateError, userUpdateError]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="user-card">
            {isEditing ? (
                <div className="edit-card">
                    <form action="" className="edit-card__form">
                        <div className="edit-card__name">
                            <div className="edit-card__firstName edit-card__item">
                                <label htmlFor="firstName">Имя</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedData.firstname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="edit-card__lastName edit-card__item">
                                <label htmlFor="lastName">Фамилия</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedData.lastname}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="edit-card__job edit-card__item">
                            <label htmlFor="job">Должность</label>
                            <input
                                type="text"
                                name="job"
                                value={editedData.position.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="edit-card__aboutMe edit-card__item">
                            <label htmlFor="aboutMe">Обо мне</label>
                            <textarea
                                name="aboutMe"
                                rows={7}
                                cols={4}
                                value={editedData.aboutMe}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button onClick={handleSaveClick} className="card__button edit-card__button">Сохранить</button>
                    </form>
                </div>
            ) : (
                <>
                    <div className="edited-card">
                        <div className="edited-card__wrapper">
                            <>
                                <div className="edited-card__head">
                                         <span
                                             className="edited-card__name">{data.firstname} {data.lastname}</span>
                                    <span className="edited-card__job">{data.position?.name}</span>
                                </div>
                                <div className="edited-card__info">
                                    <span>{data.position?.name}</span>
                                    <span>"ТУТ НУЖЕН JOB EXPERIENCE TIME</span><span>{data.phoneNumber}</span>
                                    <span>{data.email}</span>
                                </div>
                                <div className="edited-card__aboutMe">
                                    <div className="edited-card__aboutMe_title">{t("About_me")}</div>
                                    <p className="edited-card__aboutMe_desc">
                                        {data.aboutMe}
                                    </p>
                                </div>
                                <button onClick={handleEditClick}
                                        className="edited-card__button card__button">{t("profile_edit")}</button>
                                <span
                                    className="edited-card__date">Дата регистрации: {data.createdAt}</span>
                            </>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default UserCard;
