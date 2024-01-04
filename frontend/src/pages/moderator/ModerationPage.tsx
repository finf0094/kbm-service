import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import ApplicationWrapper from "../../components/moderation/ApplicationWrapper.tsx";
import Pagination from "../../components/utils/Pagination.tsx";

import {useGetApplicationsQuery} from "../../redux/api/moderatorApi.ts";

import {ApplicationStatus} from "../../models/application/ApplicationStatus.ts";

import './UI/ModerationPage.css'
import Loader from "../../components/utils/Loader.tsx";
import NavigationButton from "../../components/moderation/NavigationButton.tsx";



const ModerationPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showingStatus, setShowingStatus] = useState(ApplicationStatus.PENDING);
    const [searchTerm, setSearchTerm] = useState("");
    const {
        data: applications,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetApplicationsQuery({status: showingStatus, offset: currentPage, pageSize: 10, search: searchTerm});


    useEffect(() => {
        if (isSuccess && applications) {
            setTotalPages(applications.totalPages);
        }
    }, [isSuccess, applications]);

    const handleButtonClick = (newStatus: ApplicationStatus) => {
        setShowingStatus(newStatus);
        refetch();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        refetch();
    };

    if (isLoading) return <div className="page"><Loader /></div>
    if (isError && error && 'data' in error && error.data) return <div className="page">{error.data.message}</div>

    return (
        <div className="page">
            <div className="admin">
                <div className="admin__nav">
                    <ul className="admin__nav-list">
                        <NavigationButton currentStatus={showingStatus} status={ApplicationStatus.PENDING} onClick={handleButtonClick}>Заявки</NavigationButton>
                        <NavigationButton currentStatus={showingStatus} status={ApplicationStatus.APPROVED} onClick={handleButtonClick}>Принятые</NavigationButton>
                        <NavigationButton currentStatus={showingStatus} status={ApplicationStatus.REJECTED} onClick={handleButtonClick}>Отклонённые</NavigationButton>
                        <NavigationButton currentStatus={showingStatus} status={ApplicationStatus.INTERVIEW_SCHEDULED} onClick={handleButtonClick}>Собеседование</NavigationButton>
                    </ul>
                    <div className="admin-second">
                        <div className="admin__sort">
                            <select name="sort" id="sort">
                                <option value="new">Новые</option>
                                <option value="old">Старые</option>
                            </select>
                        </div>
                        <div className="admin__search">
                            <input type="text" placeholder="Поиск" value={searchTerm} onChange={handleSearchChange}/>
                            <button className="admin__search-button">
                                <svg width="20" height="20" viewBox="0 0 25 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M24 24L18.4507 18.4507M18.4507 18.4507C19.3999 17.5014 20.1529 16.3745 20.6666 15.1343C21.1803 13.8941 21.4447 12.5648 21.4447 11.2224C21.4447 9.87995 21.1803 8.55067 20.6666 7.31044C20.1529 6.0702 19.3999 4.9433 18.4507 3.99406C17.5014 3.04483 16.3745 2.29185 15.1343 1.77813C13.8941 1.26441 12.5648 1 11.2224 1C9.87995 1 8.55067 1.26441 7.31044 1.77813C6.0702 2.29185 4.9433 3.04483 3.99406 3.99406C2.077 5.91113 1 8.51123 1 11.2224C1 13.9335 2.077 16.5336 3.99406 18.4507C5.91113 20.3677 8.51123 21.4447 11.2224 21.4447C13.9335 21.4447 16.5336 20.3677 18.4507 18.4507Z"
                                        stroke="#393939" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="admin__claims">
                    {applications?.content.length === 0 && <span className="admin__claims-empty">Пусто...</span>}
                    <ul className="admin__claims-list">
                        {applications?.content.map(
                            (application) => (
                                <li key={application.id} className="admin__claims-item">
                                    <ApplicationWrapper application={application}>
                                        
                                        <Link to={`/application/${application.id}`}
                                              className="admin__claims-button">Открыть</Link>
                                    </ApplicationWrapper>
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export default ModerationPage;
