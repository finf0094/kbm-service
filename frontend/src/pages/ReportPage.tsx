import React, { useState } from 'react';
import './UI/ReportPage.css';
import { useGetCandidatesQuery, useGetPositionsQuery } from '../redux/api/reportApi';
import Loader from '../components/utils/Loader';
import { IReportPosition } from '../models/report/IReportPosition';
import PositionDetail from '../components/report/PositionDetail';

const ReportPage: React.FC = () => {
  const { data: positions, error, isError, isLoading } = useGetPositionsQuery();
  const { data: candidates, error: candidatesError, isError: isCandidatesError, isLoading: isCandidatesLoading } = useGetCandidatesQuery();
  const [selectedPosition, setSelectedPosition] = useState<IReportPosition | null>(null);

  if (isLoading && isCandidatesLoading) return <div className="page"><Loader /></div>;
  if (isError && error && 'data' in error && error.data) return <div className="page">{error.data.message}</div>;
  if (isCandidatesError && candidatesError && 'data' in candidatesError && candidatesError.data) return <div className="page">{candidatesError.data.message}</div>;

  const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPositionName = event.target.value;
    const position = positions?.find((pos) => pos.positionName === selectedPositionName) || null;
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
        {positions?.map((position, index) => (
          <option key={`${position.positionName}-${index}`} value={position.positionName}>
            {position.positionName}
          </option>
        ))}
      </select>
      {selectedPosition && <PositionDetail position={selectedPosition} />}
      {candidates?.map((candidate, index) => (
        <div key={index}>
          <span>{candidate.positionName}</span>
          <div>{candidate.candidates.id}</div>
        </div>
      ))}

    </div>
  );
};

export default ReportPage;
