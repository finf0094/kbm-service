import React, { useState, useEffect } from "react";

// COMPONENTS
import Modal from "../Modal.tsx";

import {useGetAllLocationsQuery} from "../../../redux/api/position/locationApi.ts";
import {useGetDepartmentsByLocationQuery} from "../../../redux/api/position/departmentApi.ts";
import {useGetPositionsByDepartmentQuery} from "../../../redux/api/position/positionApi.ts";

import {ILocation} from "../../../models/position/ILocation.ts";
import {IDepartment} from "../../../models/position/IDepartment.ts";
import {IPosition} from "../../../models/position/IPosition.ts";

// CSS
import './UI/PositionSelectModal.css'

interface PositionSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (position: IPosition) => void;
}

const PositionSelectModal: React.FC<PositionSelectModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { data: locations = [] } = useGetAllLocationsQuery();
    const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<IDepartment | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<IPosition | null>(null);
    const [departmentOptions, setDepartmentOptions] = useState<IDepartment[]>([]);
    const [positionOptions, setPositionOptions] = useState<IPosition[]>([]);

    const { data: departments = [] } = useGetDepartmentsByLocationQuery(selectedLocation?.id || 0)
    const { data: positions = [] } = useGetPositionsByDepartmentQuery(selectedDepartment?.id || 0);

    useEffect(() => {
        if (selectedLocation) {
            setDepartmentOptions(departments);
        }
    }, [selectedLocation, departments]);

    useEffect(() => {
        if (selectedDepartment) {
            setPositionOptions(positions);
        }
    }, [selectedDepartment, positions]);

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const selectedLocationObject = locations.find((location) => location.name === value);
        setSelectedLocation(selectedLocationObject || null);
    };

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const selectedDepartmentObject = departmentOptions.find((department) => department.name === value);
        setSelectedDepartment(selectedDepartmentObject || null);
    };

    const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const selectedPositionObject = positionOptions.find((position) => position.name === value);
        setSelectedPosition(selectedPositionObject || null);
    };

    const handleSubmit = () => {
        if (selectedPosition) {
            console.log(selectedPosition)
            onSubmit(selectedPosition);
            onClose();
        }
    };

    return (
        <div className="select-modal">
            {isOpen && (
                <Modal
                    id=""
                    title="Выберите локацию, департамент и позицию"
                    button={true}
                    buttonText="Добавить"
                    buttonDisabled={!selectedDepartment && !selectedLocation && !selectedPosition}
                    isOpen={isOpen}
                    onClose={onClose}
                    onConfirm={handleSubmit}
                >
                    <div className="select-modal__content">
                        <div className="select-box">
                            <select value={selectedLocation ? selectedLocation.name : ""} onChange={handleLocationChange}>
                                <option value="">Выберите локацию</option>
                                {locations.map((location) => (
                                    <option key={location.id} value={location.name}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedLocation && (
                            <div className="select-box">
                                <select value={selectedDepartment ? selectedDepartment.name : ""} onChange={handleDepartmentChange}>
                                    <option value="">Выберите департамент</option>
                                    {departmentOptions.map((department) => (
                                        <option key={department.id} value={department.name}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {selectedDepartment && (
                            <div className="select-box">
                                <select value={selectedPosition ? selectedPosition.name : ""} onChange={handlePositionChange}>
                                    <option value="">Выберите позицию</option>
                                    {positionOptions.map((position) => (
                                        <option key={position.id} value={position.name}>
                                            {position.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default PositionSelectModal;
