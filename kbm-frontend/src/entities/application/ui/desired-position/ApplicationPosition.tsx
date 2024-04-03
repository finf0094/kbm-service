import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import './ApplicationPosition.css'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { useDeleteDesiredPositionMutation, useSetDesiredPositionMutation } from '../../api'
import { IPosition } from '@/entities/position'
import { setApplicationData } from '../..'
import { openModal } from '@/app/providers/modal-provider'
import { PositionSelectModal } from '@/shared/ui'

interface ApplicationPositionProps {
	isChangble?: boolean
}

export const ApplicationPosition: React.FC<ApplicationPositionProps> = React.memo(({ isChangble }) => {
	const dispatch = useAppDispatch()
	const { desiredPositions, id: currentApplicationId } = useAppSelector(state => state.application)

	// SET
	const [setPosition, {
		data: applicationData,
		isSuccess: isSetSuccess,
		isError: isSetError,
		error: setError,
	}] = useSetDesiredPositionMutation()

	// DELETE
	const [deletePosition, { 
		data: dataAfterDeleted, 
		isSuccess: isDeleteSuccess, 
		isError: isDeleteError, 
		error: deleteError 
	}] = useDeleteDesiredPositionMutation()

	console.log(applicationData);

	const deleteDesiredPosition = async (position: IPosition) => {
		const { id: positionId } = position
		await deletePosition({ applicationId: currentApplicationId, positionId })
	}

	const addPositionModal = () => dispatch(openModal({ id: 'positionSelect' }));

	const addDesiredPosition = async (position: IPosition) => {
		const {id: positionId} = position;
		await setPosition({applicationId: currentApplicationId, positionId});
};

	useEffect(() => {
		if (isSetSuccess && applicationData) {
			toast.success('Должность успешно добавлена!')
			dispatch(setApplicationData(applicationData))
		}
		if (isSetError && setError && 'data' in setError && setError.data) {
			toast.error(`Ошибка: ${setError.data.message}`)
			console.log(setError)
		}

		if (isDeleteSuccess && dataAfterDeleted) {
			toast.success('Должность успешно удалена!')
			dispatch(setApplicationData(dataAfterDeleted))
		}
		if (isDeleteError && deleteError && 'data' in deleteError && deleteError.data) {
			toast.error(`Ошибка: ${deleteError.data.message}`)
			console.log(deleteError)
		}
	}, [applicationData, deleteError, dispatch, isDeleteError, isDeleteSuccess, dataAfterDeleted, isSetError, isSetSuccess, setError])
	return (
		<div className='app-table'>
			<div className='table__title'>Желаемая должность</div>
			<div className='app-table__content'>
			{desiredPositions.length > 0 && (
				<table>
					<thead>
						<tr>
							<th>Локация</th>
							<th>Департамент</th>
							<th>Должность</th>
							{isChangble && <th>Удалить</th>}
						</tr>
					</thead>
					<tbody>
						{desiredPositions &&
							desiredPositions.map((position, index) => (
								<tr key={index}>
									<td>{position.department?.location.name}</td>
									<td>{position.department?.name}</td>
									<td>{position.name}</td>
									{isChangble && (
										<td>
											<button onClick={() => deleteDesiredPosition(position)} className='app-table__delete'>
												<i className='uil uil-trash-alt'></i>
											</button>
										</td>
									)}
								</tr>
							))}
					</tbody>
				</table>
			)}
				
				{isChangble && (
					<div className={`app-table__button ${desiredPositions.length > 0 ? '' : 'app-table__empty'}`}>
						<button type='button' onClick={addPositionModal}>
							Добавить <i className='uil uil-plus'></i>
						</button>
					</div>
				)}
			</div>
			<PositionSelectModal id='positionSelect' onSubmit={addDesiredPosition} />
		</div>
	)
})