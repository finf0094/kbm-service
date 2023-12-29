import React, {useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch.ts";

import {setApplicationData} from "../../redux/slices/applicationSlice.ts";
import {useDeleteDesiredPositionMutation, useSetDesiredPositionMutation} from "../../redux/api/applicationApi.ts";

import {toast} from "react-toastify";

import PositionSelectModal from "../modal/position/PositionSelectModal.tsx";

import {IPosition} from "../../models/position/IPosition.ts";

import './UI/ApplicationTable.css';

interface ApprovalRequestTableProps {
    isChangble?: boolean;
}

const ApplicaitonTable: React.FC<ApprovalRequestTableProps> = React.memo(({ isChangble }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const {desiredPositions, id: currentApplicationId} = useAppSelector(state => state.application)

    const [setDesiredPositionQuery, {data: applicationData, isSuccess: isSetDesiredPositionSuccess, isError: isSetDesiredPositionError, error: setDesiredPositionError}] = useSetDesiredPositionMutation();
    const [deleteDesiredPositionQuery, {data: afterDeletedDesiredPositionMessage, isSuccess: isDeleteDesiredPositionSuccess, isError: isDeleteDesiredPositionError, error: deleteDesiredPositionError,}] = useDeleteDesiredPositionMutation();

    const deleteDesiredPosition = async (position: IPosition) => {
        const {id: positionId} = position;
        await deleteDesiredPositionQuery({applicationId: currentApplicationId, positionId});
    };

    const addDesiredPosition = async (position: IPosition) => {
        const {id: positionId} = position;
        await setDesiredPositionQuery({applicationId: currentApplicationId, positionId});
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (isSetDesiredPositionSuccess && applicationData) {
            dispatch(setApplicationData(applicationData))
        }
        if (isSetDesiredPositionError && setDesiredPositionError && 'data' in setDesiredPositionError && setDesiredPositionError.data) {
            toast.error(`error: ${setDesiredPositionError.data.message}`);
            console.log(setDesiredPositionError);
        }
    }, [isSetDesiredPositionSuccess, isSetDesiredPositionError]);

    useEffect(() => {
        if (isDeleteDesiredPositionSuccess && afterDeletedDesiredPositionMessage) {
            toast.success(afterDeletedDesiredPositionMessage.message)
        }
        if (isDeleteDesiredPositionError && deleteDesiredPositionError && 'data' in deleteDesiredPositionError && deleteDesiredPositionError.data) {
            toast.error(`error: ${deleteDesiredPositionError.data.message}`);
            console.log(deleteDesiredPositionError);
        }
    }, [isDeleteDesiredPositionSuccess, isDeleteDesiredPositionError]);

    return (
        <div className="approvalrequesttable">
            <div className="approvalrequesttable__wrapper">
                <form className="approvalrequesttable__form">
                    <div className="table__title">Желаемая должность</div>
                    <div className="approvalrequesttable__content">
                        <table>
                            <thead>
                            <tr>
                                <th>Локация</th>
                                <th>Департамент</th>
                                <th>Должность</th>
                                {isChangble ? <th>Удалить</th> : null}
                            </tr>
                            </thead>
                            <tbody>
                            {desiredPositions &&
                                desiredPositions.map((position, index) => (
                                    <tr key={index}>
                                        <td>{position.department?.location.name}</td>
                                        <td>{position.department?.name}</td>
                                        <td>{position.name}</td>
                                        {isChangble ? (
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteDesiredPosition(position)}
                                                    className="approvalrequesttable__delete"
                                                >
                                                    <svg
                                                        width="14"
                                                        height="18"
                                                        viewBox="0 0 14 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z"
                                                            fill="#393939"
                                                        />
                                                    </svg>
                                                </button>
                                            </td>
                                        ) : null}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {isChangble ? (
                            <div className="approvalrequesttable__button">
                                <button type="button" onClick={openModal}>
                                    Добавить <i className="uil uil-plus"></i>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </form>
                <PositionSelectModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={addDesiredPosition}
                />
            </div>
        </div>
    );
});

export default ApplicaitonTable;
