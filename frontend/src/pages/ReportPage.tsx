import React, { useState } from 'react';
import './UI/ReportPage.css';
import { useGetPositionsQuery } from '../redux/api/reportApi';
import Loader from '../components/utils/Loader';
import { IReportPosition } from '../models/report/IReportPosition';
import PositionDetail from '../components/report/PositionDetail';

const ReportPage: React.FC = () => {
  const { data: reports, error, isError, isLoading } = useGetPositionsQuery();
  const [selectedPosition, setSelectedPosition] = useState<IReportPosition | null>(null);

  if (isLoading) return <div className="page"><Loader /></div>;
  if (isError && error && 'data' in error && error.data) return <div className="page">{error.data.message}</div>;

  const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPositionName = event.target.value;
    const position = reports?.find((pos) => pos.positionName === selectedPositionName) || null;
    setSelectedPosition(position);
  };

  return (
    <div className='page report'>
      <h1 className='report__title'>Позиции</h1>
      <select
        className="report__nav-select"
        value={selectedPosition?.positionName || ''}
        onChange={handlePositionChange}
      >
        <option value="" disabled>Выберите позицию</option>
        {reports?.map((report, index) => (
          <option key={`${report.positionName}-${index}`} value={report.positionName}>
            {report.positionName}
          </option>
        ))}
      </select>
      {selectedPosition && <PositionDetail position={selectedPosition} />}
      {reports?.map((report, index) => (
        <div key={index}>
          {report.candidates.map((candidate) => (
            <span>{candidate.status}</span>
          ))}
        </div>
      ))}

    </div>
  );
};

export default ReportPage;
