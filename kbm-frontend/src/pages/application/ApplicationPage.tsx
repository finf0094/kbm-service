import { FC, useEffect, useState } from 'react'
import './ApplicationPage.css'
import { ApplicationForm, setApplicationData } from '@/entities/application'
import { useAppDispatch } from '@/app/store/hooks'
import { useGetApplicationByUserIdQuery } from '@/entities/application/api'
import useCurrentUser from '@/shared/lib/useCurrentUser'
import { toast } from 'react-toastify'
import { ApplicationPosition } from '@/entities/application/ui/desired-position/ApplicationPosition'
import { ApplicationEducation } from '@/entities/application/ui/education/ApplicationEducation'
import { ApplicationExperience } from '@/entities/application/ui/experience/ApplicationExperience'

export const ApplicationPage: FC = () => {
	// STATES
	const [step, setStep] = useState<number>(1)

	// HOOKS
	const { id: userId } = useCurrentUser()
	const dispatch = useAppDispatch()

	const {
		data: applicationData,
		isSuccess: isApplicationSuccess,
		isError: isApplicationError,
		error: applicationError
	} = useGetApplicationByUserIdQuery(userId)

	useEffect(() => {
		if (applicationError && 'data' in applicationError && applicationError.data) {
			toast.error(`Ошибка: ${applicationError.data.message}`)
			console.log(applicationError)
		}
		if (isApplicationSuccess) {
			dispatch(setApplicationData(applicationData))
		}

	}, [isApplicationError, applicationError, applicationData, dispatch, isApplicationSuccess])

	const handleNextStep = () => setStep(step + 1)
	const handlePrevStep = () => setStep(step - 1)

	let currentComponent

	switch (step) {
		case 1:
			currentComponent = <ApplicationForm isChangble={true} onNext={handleNextStep} />
			break
		case 2:
			currentComponent = <ApplicationPosition isChangble={true} />
			break
		case 3:
			currentComponent = <ApplicationEducation isChangble={true} />
			break
		case 4:
			currentComponent = <ApplicationExperience isChangble={true} />
			break
		case 5:
			// currentComponent = <ApplicationVideo />
			break
		default:
			// eslint-disable-next-line
			currentComponent = null
			break
	}

	return (
		<div className='app page'>
			<h1 className='app__title'>Заявка от кандидата для участия в конкурсном отборе</h1>

			<div className='app__pagination'>
				{[1, 2, 3, 4, 5].map((stage, index) => (
					<div key={index} className={`app__pagination-step ${step >= stage ? 'completed' : ''}`}>
						<span className='circle'></span>
						<span className='divider'></span>
					</div>
				))}
			</div>

			{isApplicationSuccess ? currentComponent : <div className='loader'>Ошибка при загрузке данных</div>}

			{step !== 1 && (
				<div className='app__buttons'>
					<button type='button' onClick={handlePrevStep} className='app__button app__prev'>
						<svg width='27' height='8' viewBox='0 0 27 8' fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H27V3.5H1V4.5Z'
								fill='#739EFD' />
						</svg>

						Назад
					</button>
					{step !== 5 && (
						<button onClick={handleNextStep} className='app__button app__next'>
							Далее
							<svg width='30' height='11' viewBox='0 0 27 8' fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M26.3536 4.35355C26.5488 4.15829 26.5488 3.84171 26.3536 3.64645L23.1716 0.464466C22.9763 0.269204 22.6597 0.269204 22.4645 0.464466C22.2692 0.659728 22.2692 0.976311 22.4645 1.17157L25.2929 4L22.4645 6.82843C22.2692 7.02369 22.2692 7.34027 22.4645 7.53553C22.6597 7.7308 22.9763 7.7308 23.1716 7.53553L26.3536 4.35355ZM0 4.5L26 4.5V3.5L0 3.5L0 4.5Z'
									fill='white' />
							</svg>
						</button>
					)}
				</div>
			)}
		</div>
	)
}