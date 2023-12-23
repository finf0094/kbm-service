import React, {useEffect, useRef, useState} from 'react';
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";

import axios from "axios";

import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch.ts"
import {setApplicationData} from "../../redux/slices/applicationSlice.ts";
import {useStartTestingMutation} from "../../redux/api/applicationApi.ts";
import {baseUrl} from "../../redux/api/baseQuery.ts";

import './UI/ApplicationVideo.css';

const ApprovalRequestVideo: React.FC = () => {
    const navigate = useNavigate();
    const {id: applicationId, user} = useAppSelector(state => state.application);
    const {id: userId} = user;
    const dispatch = useAppDispatch();
    const [startTesting, {data: applicationData, isSuccess, isError, error}] = useStartTestingMutation();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showButton, setShowButton] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);


    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const formData = new FormData();
            formData.append('video', file);
            setLoading(true);

            try {
                const response = await axios.post(
                    baseUrl + `/applications/${applicationId}/uploadVideo`,
                    formData,
                    {
                        onUploadProgress: (progressEvent) => {
                            if (progressEvent.total) {
                                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                setUploadProgress(percentCompleted);
                            }
                        },
                    }
                );

                if (response.status === 200) {
                    setSelectedFile(file);
                    setShowButton(false);
                    toast.success("Видео успешно добавлено!");

                    // Update the state using RTK Query
                    dispatch(setApplicationData(response.data));
                } else {
                    toast.error("Ошибка с добавлением видео");
                }
            } catch (error) {
                console.error("Network error:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleFinishClick = async () => {
        if (userId) {
            await startTesting(userId);
        }
    };

    useEffect(() => {
        if (isSuccess && applicationData) {
            toast.success("Успешно")
            navigate("/quiz-sessions")
        }
        if (isError && error && 'data' in error && error.data) {
            toast.error(error.data.message)
        }
    }, [isSuccess, isError])



    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // if (loading) {
    //     return <Loader/>;
    // }

    return (
        <div>
            <div className="approvalrequestvideo">
                <div className="approvalrequestvideo__wrapper">
                    <p className="approvalrequestvideo__desc">
                        Добавьте видео о себе с размером не более 100 МБ
                    </p>
                    <div className="approvalrequestvideo__content">
                        {selectedFile && (
                            <span className="approvalrequestvideo__selectedFile">
                            {selectedFile.name}
                        </span>
                        )}
                        {!loading && showButton && (
                            <label className="approvalrequestvideo__file" onClick={openFileInput}>
                                Добавить видео
                            </label>
                        )}
                        {!loading && (
                            <input
                                type="file"
                                accept=".mp4, .wav, .mov, .avi, .mkv"
                                ref={fileInputRef}
                                style={{display: 'none'}}
                                onChange={handleFileChange}
                            />
                        )}
                        {loading && <div>Upload progress: {uploadProgress}%</div>}
                        <button onClick={handleFinishClick}>Завершить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApprovalRequestVideo;
