import React, { useState } from 'react';
import './UI/ReportPage.css';
import { useGetReportQuery } from '../redux/api/reportApi';
import Loader from '../components/utils/Loader';
import PositionDetail from '../components/report/PositionDetail';
import {IPosition} from "../models/position/IPosition.ts";
import PositionSelectModal from "../components/modal/position/PositionSelectModal.tsx";

const ReportPage: React.FC = () => {
    const [selectedPositionId, setSelectedPositionId] = useState<number>(1);
    const { data: report, error, isError, isLoading } = useGetReportQuery(selectedPositionId);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePositionSubmit = (position: IPosition) => {
        setSelectedPositionId(position.id);
        setIsModalOpen(false);
    };

    if (isLoading) return <div className="page"><Loader /></div>;
    if (isError && error && 'data' in error && error.data) return <div className="page">{error.data.message}</div>;

    return (
        <div className='page report'>
            <h1 className='report__title'>Позиции</h1>
            <button onClick={() => setIsModalOpen(true)}>Выбрать позицию</button>
            <PositionSelectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handlePositionSubmit}
            />
            {report && <PositionDetail position={report} />}
            <>Список потенциальных кандидатов</>
        </div>
    );
};

export default ReportPage;