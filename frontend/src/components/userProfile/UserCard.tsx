import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

// MODELS
import { IUserDetail } from "../../models/user/IUserDetail.ts";

// CSS
import './UI/UserCard.css'
import { useUpdateUserMutation } from "../../redux/api/userApi.ts";
import { toast } from "react-toastify";

interface UserCardProps {
    data: IUserDetail
}

const UserCard: React.FC<UserCardProps> = ({ data }) => {

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
        if (isUserUpdateSuccess) toast.success('Профиль успешно сохранен!');
        if (isUserUpdateLoading) console.log("Loading...");
        if (isUserUpdateError) toast.error(`Ошибка при редактировании профиля: ${isUserUpdateError}`);
        if (userUpdateError) toast.error(`Ошибка при редактировании профиля: ${userUpdateError}`);
    }, [userUpdateData, isUserUpdateSuccess, isUserUpdateLoading, isUserUpdateError, userUpdateError]);

    const formattedTime = new Date(data.createdAt).toLocaleString();

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
                                    name="firstname"
                                    value={editedData.firstname}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="edit-card__lastName edit-card__item">
                                <label htmlFor="lastName">Фамилия</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={editedData.lastname}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="edit-card__job edit-card__item">
                            <label htmlFor="job">Должность</label>
                            <input
                                type="text"
                                name="job"
                                value={editedData.position?.name}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="edit-card__aboutMe edit-card__item">
                            <label htmlFor="aboutMe">Обо мне</label>
                            <textarea
                                name="aboutMe"
                                rows={7}
                                cols={4}
                                value={editedData.aboutMe}
                                onChange={(e) => handleInputChange(e)}
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
                                {data.firstname && data.lastname
                                    ? <span className="user-info__name">{data.firstname} {data.lastname}</span>
                                    : <span className="user-info__name" style={{color: 'gray'}}>Пусто</span>}
                                    <span className="edited-card__job">{data.position?.name}</span>
                                </div>
                                <div className="edited-card__info">
                                {data.position?.name ? <span>{data.position?.name}</span> : <span style={{color: 'gray'}}>Пусто</span>}
                                {data.phoneNumber ? <span>{data.phoneNumber}</span> : <span style={{color: 'gray'}}>Пусто</span>}
                                {data.email ? <span>{data.email}</span> : <span style={{color: 'gray'}}>Пусто</span>}
                                </div>
                                <div className="edited-card__aboutMe">
                                    <div className="edited-card__aboutMe_title">{t("About_me")}</div>
                                    {data.aboutMe 
                                        ? <p className="user-info__aboutMe_desc">{data.aboutMe}</p>
                                        : <p className="user-info__aboutMe_desc">Добавьте информацию о себе в редактировании профиля.</p>}
                                </div>
                                <button onClick={handleEditClick}
                                    className="edited-card__button card__button">{t("profile_edit")}</button>
                                <span
                                    className="edited-card__date">Дата регистрации: {formattedTime}</span>
                            </>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default UserCard;
