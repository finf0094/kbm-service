import { FC, useEffect, useState } from 'react'
import './PositionSelectModal.css'
import { ModalExample } from '../ModalExample'
import { useGetAllLocationsQuery } from '@/entities/position/api'
import { ILocation } from '@/entities/position'
import { IDepartment } from '@/entities/position'
import { IPosition } from '@/entities/position'
import { useGetDepartmentsByLocationQuery } from '@/entities/position/api'
import { useGetPositionsByDepartmentQuery } from '@/entities/position/api'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/app/providers/modal-provider'

export const PositionSelectModal: FC<{ id: string, onSubmit: (position: IPosition) => void }> = ({ id, onSubmit }) => {

	const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null)
	const [selectedDepartment, setSelectedDepartment] = useState<IDepartment | null>(null)
	const [selectedPosition, setSelectedPosition] = useState<IPosition | null>(null)

	const [departmentOptions, setDepartmentOptions] = useState<IDepartment[]>([])
	const [positionOptions, setPositionOptions] = useState<IPosition[]>([])

	const { data: locations = [] } = useGetAllLocationsQuery()
	const { data: departments = [] } = useGetDepartmentsByLocationQuery(selectedLocation?.id || 0)
	const { data: positions = [] } = useGetPositionsByDepartmentQuery(selectedDepartment?.id || 0)

	const dispatch = useDispatch()

	useEffect(() => {
		if (selectedLocation) {
			setDepartmentOptions(departments)
		}
		if (selectedDepartment) {
			setPositionOptions(positions)
		}
	}, [selectedLocation, departments, selectedDepartment, positions])

	const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target
		const selectedLocationObject = locations.find((location) => location.name === value)
		setSelectedLocation(selectedLocationObject || null)
	}

	const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target
		const selectedDepartmentObject = departmentOptions.find((department) => department.name === value)
		setSelectedDepartment(selectedDepartmentObject || null)
	}

	const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target
		const selectedPositionObject = positionOptions.find((position) => position.name === value)
		setSelectedPosition(selectedPositionObject || null)
	}

	const handleSubmit = async () => {
		if (selectedPosition) {
			onSubmit(selectedPosition);
			dispatch(closeModal({ id }))
		}
	}
	return (
		<ModalExample
			id={id}
			title='Выберите локацию, департамент и позицию'
			style={{ width: '40vw' }}
			onConfirm={handleSubmit}
			buttonText='Добавить'
			buttonDisabled={!selectedDepartment && !selectedLocation && !selectedPosition}
		>
			<div className='select-modal__content'>
				<div className='select-box'>
					<select value={selectedLocation ? selectedLocation.name : ''} onChange={handleLocationChange}>
						<option value=''>Выберите локацию</option>
						{locations.map((location) => (
							<option key={location.id} value={location.name}>
								{location.name}
							</option>
						))}
					</select>
				</div>
				{selectedLocation && (
					<div className='select-box'>
						<select value={selectedDepartment ? selectedDepartment.name : ''} onChange={handleDepartmentChange}>
							<option value=''>Выберите департамент</option>
							{departmentOptions.map((department) => (
								<option key={department.id} value={department.name}>
									{department.name}
								</option>
							))}
						</select>
					</div>
				)}
				{selectedDepartment && (
					<div className='select-box'>
						<select value={selectedPosition ? selectedPosition.name : ''} onChange={handlePositionChange}>
							<option value=''>Выберите позицию</option>
							{positionOptions.map((position) => (
								<option key={position.id} value={position.name}>
									{position.name}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
		</ModalExample>
	)
}