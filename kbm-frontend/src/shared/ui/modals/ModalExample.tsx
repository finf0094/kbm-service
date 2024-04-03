import { CSSProperties, FC, MouseEvent, ReactNode, useCallback } from 'react'
import { Dialog } from 'primereact/dialog'
import { useAppSelector } from '@/app/store/hooks'
import { closeModal } from '@/app/providers/modal-provider'
import { useDispatch } from 'react-redux'

interface ModalExampleProps {
	id: string
	title: string
	style?: CSSProperties
	buttonText?: string
	buttonDisabled?: boolean
	onConfirm?: (e: MouseEvent<HTMLButtonElement>) => void
	children: ReactNode
}

export const ModalExample: FC<ModalExampleProps> = ({ id, title, style, buttonText, buttonDisabled, onConfirm, children }) => {
	const dispatch = useDispatch()
	const isOpen = useAppSelector((state) =>
		state.modal.modals.some((modal) => modal.id === id && modal.isOpen)
	)

	const handleCloseModal = useCallback(() => {
		dispatch(closeModal({ id }))
	}, [dispatch, id])

	return (
		<Dialog draggable={false} resizable={false} visible={isOpen} onHide={handleCloseModal} header={title} style={style}>
			{children}

			{buttonText && <button className='modal__button' disabled={buttonDisabled} onClick={onConfirm} style={{
				width: '100%',
				padding: '15px 0',
				fontSize: 19,
				color: '#fff',
				border: 'none',
				marginTop: 20,
				borderRadius: 15,
				background: 'var(--first-color)',
			}}>{buttonText}</button>}
		</Dialog>
	)
}