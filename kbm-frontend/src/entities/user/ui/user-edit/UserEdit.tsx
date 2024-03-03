import { ChangeEvent, FC, FormEvent, useState } from 'react'
import './UserEdit.css'
import { IUserDetail } from '../../model/IUserDetail'

export const UserEdit: FC<{ handleSave: (editedData: IUserDetail, e: FormEvent<HTMLFormElement>) => void, data: IUserDetail }> = ({ handleSave, data }) => {
	const [editedData, setEditedData] = useState<IUserDetail>({
		...data,
		firstname: data.firstname,
    lastname: data.lastname,
    position: data.position,
    aboutMe: data.aboutMe,
	} as IUserDetail);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setEditedData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	return (
		<div>
			<div className="edit-card">
				<form onSubmit={(e) => handleSave(editedData, e)} className="edit-card__form">
					<div className="edit-card__name">
						<div className="edit-card__firstName edit-card__item">
							<label htmlFor="firstname">Имя</label>
							<input
								type="text"
								name="firstname"
								value={editedData.firstname}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
						<div className="edit-card__lastName edit-card__item">
							<label htmlFor="lastname">Фамилия</label>
							<input
								type="text"
								name="lastname"
								value={editedData.lastname}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
					</div>
					<div className="edit-card__job edit-card__item">
						<label htmlFor="job">Должность</label>
						<input
							type="text"
							name="job"
							value={editedData.position?.name}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>
					<div className="edit-card__aboutMe edit-card__item">
						<label htmlFor="aboutMe">Обо мне</label>
						<textarea
							name="aboutMe"
							rows={7}
							cols={4}
							value={editedData.aboutMe}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>

					<button className="card__button edit-card__button" type='submit'>Сохранить</button>
				</form>
			</div>
		</div>
	)
}