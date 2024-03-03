import { FC, useCallback, useState } from 'react'
import './TakePartModal.css'
import { Dialog } from 'primereact/dialog'
import { useAppSelector } from '@/app/store/hooks'
import { closeModal } from '@/app/providers/modal-provider'
import { useDispatch } from 'react-redux'
import { Checkbox } from 'primereact/checkbox'

export const TakePartModal: FC<{ id: string }> = ({ id }) => {
	const dispatch = useDispatch();
	const isOpen = useAppSelector((state) =>
		state.modal.modals.some((modal) => modal.id === id && modal.isOpen)
	)

	const [isChecked, setIsChecked] = useState<boolean | undefined>(false);

	const handleCloseModal = useCallback(() => {
		dispatch(closeModal({ id }))
	}, [dispatch, id])

	return (
		<Dialog draggable={false} resizable={false} visible={isOpen} onHide={handleCloseModal} header="Это текст о проекте" style={{ width: '34vw' }}>
			<p className="take-part__desc">
				Это текст о проекте. Он необходим для дальнейшего продвижения Вашего
				сайта. Вам будет необходимо предоставить исходные данные, по которым
				наши копирайтеры составят правильный текст, который будет содержать в
				себе основную информацию. Вам будет необходимо предоставить исходные
				данные. Это текст о проекте. Это текст о компании.
			</p>

			<div className="take-part__check">
				<Checkbox onChange={e => setIsChecked(e.checked)} checked={Boolean(isChecked)} />
				<label htmlFor="check">
					Я ознакомлен с целью проекта и согласен предоставить свои данные
				</label>
			</div>

			<button className="take-part__button ui-button" disabled={!isChecked}>Принять участие</button>
		</Dialog>
	)
}