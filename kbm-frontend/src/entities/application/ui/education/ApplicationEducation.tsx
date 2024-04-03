import { FC, useEffect } from 'react'
import './ApplicationEducation.css'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { useDeleteEducationMutation, useSetEducationMutation } from '../../api'
import { openModal } from '@/app/providers/modal-provider'
import { IEducationWithoutId } from '../../model/IEducation'
import { setApplicationData } from '../..'
import { toast } from 'react-toastify'
import { EducationRequestModal } from '@/shared/ui/modals/education-request/EducationRequestModal'

export const ApplicationEducation: FC<{ isChangble: boolean }> = ({ isChangble }) => {
	const dispatch = useAppDispatch()
	const { id: applicationId, educations } = useAppSelector(state => state.application)

	const [setEducationQuery, {
		data: applicationData,
		isSuccess: isSetSuccess,
		isError: isSetError,
		error: setError,
	}] = useSetEducationMutation()

	const [deleteEducationQuery, {
		data: afterDeletedEducationMessage,
		isSuccess: isDeleteSuccess,
		isError: isDeleteError,
		error: deleteError,
	}] = useDeleteEducationMutation()

	const handleModal = () => dispatch(openModal({ id: 'educationRequest' }))

	const setEducation = async (applicationId: string, education: IEducationWithoutId) => {
		await setEducationQuery({ applicationId, body: education })
	}

	const deleteEducation = async (educationId: number) => {
		await deleteEducationQuery({ educationId })
	}

	useEffect(() => {
		if (isSetSuccess && applicationData) {
			dispatch(setApplicationData(applicationData))
		}
		if (isSetError && setError && 'data' in setError && setError.data) {
			toast.error(`error: ${setError.data.message}`)
			console.log(setError)
		}
	}, [isSetSuccess, isSetError, setError, applicationData, dispatch])

	useEffect(() => {
		if (isDeleteSuccess && afterDeletedEducationMessage) {
			toast.success(afterDeletedEducationMessage.message)
		}
		if (isDeleteError && deleteError && 'data' in deleteError && deleteError.data) {
			toast.error(`error: ${deleteError.data.message}`)
			console.log(deleteError)
		}
	}, [isDeleteSuccess, isDeleteError, afterDeletedEducationMessage, deleteError])

	return (
		<div className='app-education'>
			<div className='table__title'>Образование</div>
			<div className='app-education__content'>
				{educations.length > 0 && (
					<table>
						<thead>
							<tr>
								<th>Дата выпуска</th>
								<th>Учебное заведение</th>
								<th>Специализация</th>
								<th>Степень/Диплом</th>
								{isChangble ? <th>Удалить</th> : null}
							</tr>
						</thead>
						<tbody>
							{educations.map((education, index) => (
								<tr key={index}>
									<td>{education.dateIssued}</td>
									<td>{education.educationalInstitution}</td>
									<td>{education.specialization}</td>
									<td>{education.degreeDiploma}</td>
									{isChangble && (
										<td>
                      <button onClick={() => deleteEducation(education.id)} className="app-table__delete">
                        <i className="uil uil-trash-alt"></i>
                      </button>
                    </td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				)}
				{isChangble && (
					<div className="app-education__button">
						<button type="button" onClick={handleModal}>Добавить <i className="uil uil-plus"></i></button>
					</div>
				)}
			</div>
			<EducationRequestModal id='educationRequest' onSubmit={(education) => setEducation(applicationId, education)} />
		</div>
	)
}