import { FC } from 'react'
import './HomePage.css'
import { useDispatch } from 'react-redux'
import { openModal } from '@/app/providers/modal-provider'

export const HomePage: FC = () => {
	const dispatch = useDispatch()

	const framesData = [
		{
			name: 'Корпус “А”',
			desc: 'Общий управленческий уровень, уровень организации и контроля деятельности производственного процесса, руководители ключевых подразделений компании (директора департаментов, заместитель директора департамента, главный бухгалтер, заместитель главного бухгалтера)'
		},
		{
			name: 'Корпус “Б”',
			desc: 'Уровень оперативного управления работой отдела, служб, групп цехов (начальник отдела, начальник цеха, заместитель начальника, руководитель службы)'
		},
		{
			name: 'Корпус “С”',
			desc: 'Это технический уровень, уровень управления производственно-хозяйственной деятельностью участка, выполнение производственных задач поставленных перед участком (мастер, начальник участка)'
		},
		{
			name: 'Корпус “Е”',
			desc: 'Исполнители, имеющие потенциал роста (молодые специалисты, рабочий персонал)'
		},
	]
	
	const handleModal = () => {
		dispatch(openModal({ id: 'takePart' }))
	}

	return (
		<div className='home page'>

			{/* Main Title */}
			<section className='main-title'>
				<div className='main-title__wrapper'>
					<h1 className='main-title__title'>Конкурс на включение в кадровый резерв АО 'Каражанбасмунай'</h1>
					<button className='main-title__button' onClick={handleModal}>Принять участие</button>
				</div>
			</section>

			{/* Who */}
			<section className='who'>
				<div className='who__wrapper'>
					<h1 className='who__title'>Кто может принять участие?</h1>

					<div className='who__content'>
						<div className='who__card who__card-first'>
							<img src='https://i.imgur.com/JOFaXc7.png' alt='' className='who__card-img_first' />
							<h3 className='who__card-title'>С высшим образованием.</h3>
						</div>
						<div className='who__cards-second'>
							<div className='who__card'>
								<img src='https://i.imgur.com/6Ejmuob.png' alt='' className='who__card-img' />
								<div className='who__card-content'>
									<h3 className='who__card-title'>Работники АО 'Каражанбасмунай'</h3>
									<p className='who__card-text'>С опытом работы в компании не менее 1 года.</p>
								</div>
							</div>
							<div className='who__card'>
								<img src='https://i.imgur.com/3bs7PHf.png' alt='' className='who__card-img' />
								<div className='who__card-content'>
									<h3 className='who__card-title'>Без дисциплинарных взысканий</h3>
									<p className='who__card-text'>В течение последних 3-х лет работы в Компании.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Frames */}
			<section className='frames'>
				<div className='frames__wrapper'>
					<h1 className='frames__title'>При формировании кадрового резерва, используется следующие подходы к классификации ключевых должностей Кадрового резерва:</h1>

					<div className='frames__content'>
						{framesData.map((frame, i) => (
							<div key={i} className='frames__item'>
								<h3 className='frames__item-name'>{frame.name}</h3>
								<p className='frames__item-desc'>{frame.desc}</p>
							</div>
						))}
					</div>
					<button className='frames__button' onClick={handleModal}>Принять участие</button>
				</div>
			</section>
		</div>
	)
}