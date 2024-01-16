import { IReportPosition } from "../../models/report/IReportPosition";
import "./UI/PositionDetail.css";

interface PositionDetailProps {
    position: IReportPosition; // Assuming there's a Position type, replace it with the actual type
}

const PositionDetail: React.FC<PositionDetailProps> = ({ position }) => {
    return (
        <div className="report__items">
            <h2 className="report__items-name">{position.positionName}</h2>
            <ul className="report__items-list">
                <li className="report__item">
                    <p className="report__item-info">{position.totalApplications}</p>
                    <p className="report__item-desc">Всего заявок</p>
                </li>
                <li className="report__item">
                    <p className="report__item-info">{position.passedApplications}</p>
                    <p className="report__item-desc">Пройдено</p>
                </li>
                <li className="report__item">
                    <p className="report__item-info">{position.failedApplications}</p>
                    <p className="report__item-desc">Не пройдено</p>
                </li>
                <li className="report__item">
                    <p className="report__item-info">{position.inInterview}</p>
                    <p className="report__item-desc">Собеседование</p>
                </li>
                <li className="report__item">
                    <p className="report__item-info">{position.inTesting}</p>
                    <p className="report__item-desc">В тестировании</p>
                </li>
                <li className="report__item">
                    <p className="report__item-info">{position.inProcess}</p>
                    <p className="report__item-desc">В процессе</p>
                </li>
            </ul>
        </div>
    );
};

export default PositionDetail;