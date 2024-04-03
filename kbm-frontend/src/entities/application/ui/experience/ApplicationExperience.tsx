import { FC, useEffect } from 'react'

import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { useDeleteExperienceMutation, useSetExperienceMutation } from '../../api'
import { IExperienceWithoutId } from '../../model/IExperience'
import { setApplicationData } from '../..'
import { openModal } from '@/app/providers/modal-provider'
import './ApplicationExperience.css'
import ExperienceRequestModal from '@/shared/ui/modals/experience-request/ExperienceRequestModal'



export const ApplicationExperience: FC<{ isChangble: boolean }> = ({ isChangble }) => {
	const dispatch = useAppDispatch()
	const { id: applicationId, experiences } = useAppSelector(state => state.application)


	const [setExperienceQuery, {
		data: applicationData,
		isSuccess: isSetSuccess,
		isError: isSetError,
		error: setError,
	}] = useSetExperienceMutation()

	const [deleteExperienceQuery, {
		data: messageAfterDelete,
		isSuccess: isDeleteSuccess,
		isError: isDeleteError,
		error: deleteError,
	}] = useDeleteExperienceMutation()


	const setExperience = async (applicationId: string, experience: IExperienceWithoutId) => {
		await setExperienceQuery({ applicationId, body: experience })
	}

	const deleteExperience = async (experienceId: number) => {
		await deleteExperienceQuery({ experienceId })
	}

	const handleModal = () => dispatch(openModal({ id: 'experienceRequest' }))

	useEffect(() => {
		if (isSetSuccess && applicationData) {
			dispatch(setApplicationData(applicationData))
		}
		if (isSetError && setError && 'data' in setError && setError.data) {
			toast.error(`error: ${setError.data.message}`)
			console.log(setError)
		}
	}, [isSetSuccess, isSetError, applicationData, dispatch, setError])

	useEffect(() => {
		if (isDeleteSuccess && messageAfterDelete) {
			toast.success(messageAfterDelete.message)
		}
		if (isDeleteError && deleteError && 'data' in deleteError && deleteError.data) {
			toast.error(`error: ${deleteError.data.message}`)
			console.log(deleteError)
		}
	}, [isDeleteSuccess, isDeleteError, messageAfterDelete, deleteError])

	return (
		<div className="app-experience">
			<div className="table__title">Опыт работы</div>
			<div className="app-experience__content">
				{experiences.length > 0 && (
					<table>
						<thead>
							<tr>
								<th>Компания</th>
								<th>Должность</th>
								<th>Обязанности</th>
								<th>Дата начало работы</th>
								<th>Дата окончания работы</th>
								{isChangble ? <th>Удалить</th> : null}
							</tr>
						</thead>
						<tbody>
							{experiences.map((experience, index) => (
								<tr key={index}>
									<td>{experience.company}</td>
									<td>{experience.position}</td>
									<td>{experience.jobResponsibilities}</td>
									<td>{new Date(experience.workStart).toLocaleString()}</td>
									<td>{new Date(experience.workEnd).toLocaleString()}</td>
									{isChangble && (
										<td>
											<button onClick={() => deleteExperience(experience.id)} className="app-experience__delete">
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
					<div className="app-experience__button">
						<button type="button" onClick={handleModal}>Добавить <i className="uil uil-plus"></i></button>
					</div>
				)}
			</div>
			<ExperienceRequestModal id='experienceRequest' onSubmit={(experience) => setExperience(applicationId, experience)} />
		</div>
	)
}
