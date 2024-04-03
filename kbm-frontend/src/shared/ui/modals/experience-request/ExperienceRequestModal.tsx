import React from 'react'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'

import './ExperienceRequestModal.css'
import { IExperienceWithoutId } from '@/entities/application/model/IExperience'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/app/providers/modal-provider'
import { ModalExample } from '../ModalExample'

const ExperienceRequestModal: React.FC<{ id: string; onSubmit: (experienceRequest: IExperienceWithoutId) => void }> = ({ id, onSubmit }) => {
	const { register, handleSubmit, control } = useForm<IExperienceWithoutId>()
	const company = useWatch({ control, name: 'company', defaultValue: '' })
	const position = useWatch({ control, name: 'position', defaultValue: '' })
	const jobResponsibilities = useWatch({ control, name: 'jobResponsibilities', defaultValue: '' })
	const workStart = useWatch({ control, name: 'workStart', defaultValue: '' })
	const workEnd = useWatch({ control, name: 'workEnd', defaultValue: '' })

	const dispatch = useDispatch()

	const handleFormSubmit: SubmitHandler<IExperienceWithoutId> = (data) => {
		onSubmit(data)
		dispatch(closeModal({ id }))
	}

	return (
		<ModalExample
			id={id}
			title="Введите данные об опыте работы"
			buttonText="Добавить"
			buttonDisabled={!company || !position || !jobResponsibilities || !workEnd || !workStart}
			onConfirm={handleSubmit(handleFormSubmit)}
			style={{ width: '27vw' }}
		>
			<form className='exp-request__form'>
				<div className="exp-request__content">
					<div className="exp-request__field">
						<label>Компания:</label>
						<input type="text" {...register('company')} placeholder="Введите название компании" />
					</div>
					<div className="exp-request__field">
						<label>Должность:</label>
						<input type="text" {...register('position')} placeholder="Введите вашу должность" />
					</div>
					<div className="exp-request__field">
						<label>Обязанности:</label>
						<input type="text" {...register('jobResponsibilities')} placeholder="Введите ваши обязанности" />
					</div>
					<div className="exp-request__field">
						<label>Начало работы:</label>
						<input type="date" {...register('workStart')} />
					</div>
					<div className="exp-request__field">
						<label>Конец работы:</label>
						<input type="date" {...register('workEnd')} />
					</div>
				</div>
			</form>
		</ModalExample>
	)
}

export default ExperienceRequestModal
