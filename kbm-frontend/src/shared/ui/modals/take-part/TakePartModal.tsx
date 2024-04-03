import { FC, MouseEvent, useEffect, useState } from 'react'
import './TakePartModal.css'
import { Checkbox } from 'primereact/checkbox'
import { ModalExample } from '../ModalExample'
import { useNavigate } from 'react-router-dom'
import { useCreateApplicationMutation } from '@/entities/application/api'
import useCurrentUser from '@/shared/lib/useCurrentUser'
import { setApplicationData } from '@/entities/application'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { closeModal } from '@/app/providers/modal-provider'

export const TakePartModal: FC<{ id: string }> = ({ id }) => {
	// STATES
	const [isChecked, setIsChecked] = useState<boolean | undefined>(false)

	// HOOKS
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id: userId } = useCurrentUser();

	const [createApplication, {
		data: applicationData,
		isSuccess: isApplicationSuccess,
		error: applicationError
	}] = useCreateApplicationMutation()

	const handleCreateApplication = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		await createApplication(userId)
	}
		
	useEffect(() => {
		if (isApplicationSuccess && applicationData) {
			dispatch(setApplicationData(applicationData))
			dispatch(closeModal({ id }))
			navigate('/application')
		}
		if (applicationError && 'data' in applicationError && applicationError.data) {
			toast.error(`${applicationError.data.message}`)
			console.log(`Ошибка: ${applicationError}. Покажите эту ошибку разработчикам!`)
		}
	}, [dispatch, id, navigate, applicationData, applicationError, isApplicationSuccess])

	return (
		<ModalExample 
			id={id} 
			title='Это текст о проекте' 
			style={{ width: '34vw' }} 
			buttonText='Принять участие' 
			buttonDisabled={!isChecked}
			onConfirm={handleCreateApplication}
		>
			<p className='take-part__desc'>
				Это текст о проекте. Он необходим для дальнейшего продвижения Вашего
				сайта. Вам будет необходимо предоставить исходные данные, по которым
				наши копирайтеры составят правильный текст, который будет содержать в
				себе основную информацию. Вам будет необходимо предоставить исходные
				данные. Это текст о проекте. Это текст о компании.
			</p>

			<div className='take-part__check'>
				<Checkbox onChange={e => setIsChecked(e.checked)} checked={Boolean(isChecked)} />
				<label htmlFor='check'>
					Я ознакомлен с целью проекта и согласен предоставить свои данные
				</label>
			</div>
		</ModalExample>
	)
}