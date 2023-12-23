import React from "react";

import {useTranslation} from "react-i18next";
import {baseUrl} from "../../redux/api/baseQuery.ts";

import './UI/ApplicationProfileResume.css'

interface IApplicationProfileResumeProps {
    videoUrl: string
}

const ApplicationProfileResume: React.FC<IApplicationProfileResumeProps> = ({videoUrl}) => {
    const {t} = useTranslation();

    const downloadResume = () => {
        window.location.href = `${baseUrl}/${videoUrl}`;
    };

    return (
        <div className="resume">
            <h3 className="resume__title">Видео</h3>
            <div className="resume__content">
                <div className="resume__name">
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEwMV8yMzcpIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy45ODM0IDcuOTY3NDFWMjIuNzUyMUMyNy45ODM0IDIzLjcxNjQgMjcuMTk4NSAyNC41MDExIDI2LjIzNDMgMjQuNTAxMUgyMC45ODc4QzIwLjUwMzkgMjQuNTAxMSAyMC4xMTI4IDI0LjExMDEgMjAuMTEyOCAyMy42MjdDMjAuMTEyOCAyMy4xNDMxIDIwLjUwMzkgMjIuNzUyMSAyMC45ODc4IDIyLjc1MjFIMjYuMjM0M1Y4Ljc1NzMySDIwLjExMjhDMTkuNjI5NyA4Ljc1NzMyIDE5LjIzODYgOC4zNjYzMSAxOS4yMzg2IDcuODgyMzdWMS42OTkwMkgxMC41QzEwLjAxNyAxLjY5OTAyIDkuNjE4ODggMS4zNjg1IDkuNjE4ODggMC44ODU0NDNDOS42MTg4OCAwLjQwMTUwNiAxMC4wMSAwLjAxMDQ5OCAxMC40OTM5IDAuMDEwNDk4SDIwLjExMjhDMjAuMTMyIDAuMDEwNDk4IDIwLjE0NzggMC4wMjAxNDE3IDIwLjE2NjEgMC4wMjEwMTg0QzIwLjI0NTggMC4wMjYyNzg2IDIwLjMyMjggMC4wNDIwNTkyIDIwLjM5ODkgMC4wNjgzNjAxQzIwLjQyNjkgMC4wNzgwMDM4IDIwLjQ1NCAwLjA4NTAxNzQgMjAuNDgwMiAwLjA5NzI5MTJDMjAuNTY5NSAwLjEzODQ5NiAyMC42NTI2IDAuMTkxMDk4IDIwLjcyNTMgMC4yNjIxMTFDMjAuNzI3OSAwLjI2NDc0MSAyMC43MzA1IDAuMjY1NjE3IDIwLjczMjMgMC4yNjgyNDdMMjcuNjMyNSA3LjE2ODc0QzI3LjY2MDUgNy4xODgwMyAyNy42NzQ1IDcuMjIyMjIgMjcuNjk5IDcuMjQ1MDFDMjcuNzI0NCA3LjI2ODY5IDI3Ljc0MzYgNy4yOTU4NiAyNy43NjY0IDcuMzIyMTZDMjcuOTAxMSA3LjQ3NTU5IDI4LjAwMDkgNy42NjE0NSAyOC4wMDA5IDcuODgyMzdDMjguMDAwOSA3LjkxMzA2IDI3Ljk4NjkgNy45Mzg0OCAyNy45ODM0IDcuOTY3NDFaTTIwLjk4NzggMi45OTY1M1Y3LjAwODMxSDI0Ljk5NzlMMjAuOTg3OCAyLjk5NjUzWk0xMC41NDY0IDMuNTE5OTJDMTAuNjI2OSAzLjUyNTE4IDEwLjcwMyAzLjU0MDA5IDEwLjc3OTEgMy41NjcyNkMxMC44MDcxIDMuNTc2OTEgMTAuODM0MyAzLjU4MzkyIDEwLjg2MTQgMy41OTYyQzEwLjk0OTcgMy42Mzc0IDExLjAzMzggMy42OSAxMS4xMDU1IDMuNzYxMDFDMTEuMTA4MSAzLjc2MzY0IDExLjExMDggMy43NjQ1MiAxMS4xMTM0IDMuNzY3MTVMMTguMDEyOCAxMC42Njc2QzE4LjA0MDggMTAuNjg2OSAxOC4wNTQ4IDEwLjcyMTEgMTguMDgwMSAxMC43NDM5QzE4LjEwNTUgMTAuNzY3NiAxOC4xMjQ4IDEwLjc5MzkgMTguMTQ2NiAxMC44MjAyQzE4LjI4MTQgMTAuOTc0NSAxOC4zODExIDExLjE2MDQgMTguMzgxMSAxMS4zODEzQzE4LjM4MTEgMTEuNDExMSAxOC4zNjcxIDExLjQzNjUgMTguMzY0NSAxMS40NjYzVjI2LjI1MUMxOC4zNjQ1IDI3LjIxNTMgMTcuNTc5NiAyOCAxNi42MTU0IDI4SDEuNzQ4MjVDMC43ODQ4NzUgMjggMCAyNy4yMTUzIDAgMjYuMjUxVjUuMjU4NDJDMCA0LjI5NDA1IDAuNzg0ODc1IDMuNTA5NCAxLjc0ODI1IDMuNTA5NEgxMC40OTM5QzEwLjUxMjIgMy41MDk0IDEwLjUyOCAzLjUxOTA1IDEwLjU0NjQgMy41MTk5MlpNMTEuMzY4IDYuNDk1NDRWMTAuNTA2M0gxNS4zNzgxTDExLjM2OCA2LjQ5NTQ0Wk05LjYxODg4IDExLjM4MTNWNS4yMDU4MUgxLjc1TDEuNzQ4MjUgMjYuMjUxSDE2LjYxNTRWMTIuMjE5NEgxMC41QzEwLjAxNyAxMi4yMTk0IDkuNjE4ODggMTEuODY0MyA5LjYxODg4IDExLjM4MTNaIiBmaWxsPSIjMTcyNDJBIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTAxXzIzNyI+CjxyZWN0IHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"
                        alt=""
                        className="admin__claims-icon"
                    />
                    <span className="resume__name-file">Видео</span>
                </div>
                <button className="resume__download" onClick={downloadResume}>{t("video_download")}</button>
            </div>
        </div>
    );
};

export default ApplicationProfileResume;
