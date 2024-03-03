import './UserCard.css'
import { IUserDetail } from '../../model/IUserDetail.ts'
import { FC } from 'react'


interface UserCardProps {
	data: IUserDetail;
	handleEdit: () => void;
}

export const UserCard: FC<UserCardProps> = ({ data, handleEdit }) => {
	return (
		<div className="user-card">
			<div className="edited-card">
				<div className="edited-card__wrapper">
					<>
						<div className="edited-card__head">
							{data.firstname && data.lastname
								? <span className="user-info__name">{data.firstname} {data.lastname}</span>
								: <span className="user-info__name" style={{ color: 'gray' }}>Пусто</span>}
							<span className="edited-card__job">{data.position?.name}</span>
						</div>
						<div className="edited-card__info">
							{data.position?.name ? <span>{data.position?.name}</span> : <span style={{ color: 'gray' }}>Позиция</span>}
							{data.phoneNumber ? <span>{data.phoneNumber}</span> : <span style={{ color: 'gray' }}>Номер телефона</span>}
							{data.email ? <span>{data.email}</span> : <span style={{ color: 'gray' }}>Email</span>}
						</div>
						<div className="edited-card__aboutMe">
							<div className="edited-card__aboutMe_title">Обо мне</div>
							{data.aboutMe
								? <p className="user-info__aboutMe_desc">{data.aboutMe}</p>
								: <p className="user-info__aboutMe_desc">Добавьте информацию о себе в редактировании профиля.</p>}
						</div>
						<button onClick={handleEdit} className="edited-card__button card__button">Редактировать</button>
						<span
							className="edited-card__date">Дата регистрации: {new Date(data.createdAt).toLocaleString()}</span>
					</>
				</div>
			</div>
		</div>
	)
}
