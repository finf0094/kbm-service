import React, {useState, useRef, ChangeEvent, useEffect} from "react";
import { useTranslation } from "react-i18next";

import useCurrentUser from "../../hooks/useCurrentUser";

import {baseUrl} from "../../redux/api/baseQuery.ts";

import "./UI/UserResume.css";
import {useDeleteResumeMutation, useUploadResumeMutation} from "../../redux/api/userApi.ts";

const UserResume: React.FC<{resumeUrl: string}> = ({resumeUrl}) => {
    const {id: userId} = useCurrentUser();

    const [isHaveResume, setIsHaveResume] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [resumeId, setResumeId] = useState<string | null>(null);
    const { t } = useTranslation();


    useEffect(() => {
        if(resumeUrl) {
            setResumeId(resumeUrl);
            setIsHaveResume(true);
        }
    }, [resumeUrl]);

    const [uploadResume] = useUploadResumeMutation();
    const [deleteResume] = useDeleteResumeMutation();

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            try {
                await uploadResume({ userId, file });
                setIsHaveResume(true);
            } catch (error) {
                console.error("File upload failed");
            }
        }
    };

    const deleteResumeHandler = async () => {
        if (resumeId) {
            try {
                await deleteResume(userId);
                setIsHaveResume(false);
                setResumeId(null);
                localStorage.removeItem("resumeId");
            } catch (error) {
                console.error("File delete failed");
            }
        }
    };

    const downloadResume = () => {
        if (resumeId) {
            window.location.href = `${baseUrl}/${resumeId}`;
        }
    };

    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };



    return (
        <div>
            <div className="user-resume">
                <div className="user-resume__wrapper">
                    <h3 className="user-resume__title">Резюме</h3>
                    <div className="user-resume__content">

                            <ul className="user-resume__list">
                                {isHaveResume ? (
                                    <li className="user-resume__item">
                                        <img
                                            src="https://i.imgur.com/8T399a0.png"
                                            alt="Resume Link"
                                            className="user-resume__image"
                                        />
                                        <div className="user-resume__links">
                                            <button
                                                onClick={downloadResume}
                                                className="user-resume__link"
                                            >
                                                {t("user_resume_download")}
                                            </button>
                                            <div className="user-resume__link" onClick={deleteResumeHandler}>{t("resume_delete")}</div>
                                        </div>
                                    </li>
                                ) : (
                                    <div className="user-resume__empty">
                                        <span>{t("resume_empty")}</span>
                                        <label
                                            htmlFor="addResume"
                                            className="user-resume__add"
                                            onClick={openFileInput}
                                        >
                                            {t("resume_add")}
                                        </label>
                                        <input
                                            type="file"
                                            name="addResume"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: "none" }}
                                            accept=".pdf, .ppt, .mov, .docx"
                                        />
                                    </div>
                                )}
                            </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserResume;
