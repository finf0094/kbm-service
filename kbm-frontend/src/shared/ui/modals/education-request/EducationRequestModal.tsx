import { FC } from 'react'
import './EducationRequestModal.css'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { EducationDegrees, IEducationWithoutId } from '@/entities/application/model/IEducation'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/app/providers/modal-provider'
import { ModalExample } from '../ModalExample'

export const EducationRequestModal: FC<{ id: string, onSubmit: (educationRequest: IEducationWithoutId) => void }> = ({ id, onSubmit }) => {
	const { register, handleSubmit, control } = useForm<IEducationWithoutId>()
	const dateIssued = useWatch({ control, name: 'dateIssued', defaultValue: '' })
	const educationalInstitution = useWatch({ control, name: 'educationalInstitution', defaultValue: '' })
	const specialization = useWatch({ control, name: 'specialization', defaultValue: '' })
	const degreeDiploma = useWatch({ control, name: 'degreeDiploma', defaultValue: EducationDegrees.BACHELOR })

	const dispatch = useDispatch()

	const handleFormSubmit: SubmitHandler<IEducationWithoutId> = (data) => {
		onSubmit(data)
		dispatch(closeModal({ id }))
	}
	return (
		<ModalExample 
			id={id} 
			title='Введите данные об образовании' 
			buttonText='Добавить'
			buttonDisabled={!dateIssued || !educationalInstitution || !specialization || !degreeDiploma}
			onConfirm={handleSubmit(handleFormSubmit)}
			style={{ width: '33vw' }}
		>
			<form className='er-modal__form'>
				<div className='er-modal__content'>
					<div className='er-modal__field'>
						<label>Дата выпуска:</label>
						<input type='date' {...register('dateIssued')} placeholder='Введите дату выпуска' />
					</div>
					<div className='er-modal__field'>
						<label>Учебное заведение:</label>
						<input type='text' {...register('educationalInstitution')} placeholder='Введите полное название учебного заведение' />
					</div>
					<div className='er-modal__field'>
						<label>Специализация:</label>
						<input type='text' {...register('specialization')} placeholder='Введите специализацию' />
					</div>
					<div className='er-modal__field'>
						<label>Степень/Диплом:</label>
						<select {...register('degreeDiploma')} defaultValue=''>
							<option value='' disabled hidden>Выберите степень/диплом</option>
							<option value='BACHELOR'>Бакалавр</option>
							<option value='MASTER'>Магистр</option>
							<option value='DOCTORAL'>Докторантура</option>
						</select>
					</div>
				</div>
			</form>
		</ModalExample>
	)
}