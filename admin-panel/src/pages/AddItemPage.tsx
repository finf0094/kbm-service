import React, { useState } from 'react';
import './UI/AddItemPage.css'

import {useCreateLocationMutation, useGetAllLocationsQuery} from "../redux/api/locationApi.ts";
import {useCreateDepartmentMutation, useGetAllDepartmentsQuery} from "../redux/api/departmentApi.ts";
import {useCreatePositionMutation} from "../redux/api/positionApi.ts";

const AddItemPage: React.FC<{
    mutationFn: typeof useCreateLocationMutation | typeof useCreateDepartmentMutation | typeof useCreatePositionMutation,
    onItemAdded: (item: any) => void,
    queryFn: typeof useGetAllLocationsQuery | typeof useGetAllDepartmentsQuery,
    transformInput: (name: string, parentId?: number | null) => any,
    title: string
}> = ({ mutationFn, onItemAdded, queryFn, transformInput, title }) => {
    const [itemName, setItemName] = useState<string>('');
    const [parentId, setParentId] = useState<number | null>(null);
    const [createItem] = mutationFn();
    const { data: parents } = queryFn({ search: '', offset: 0, pageSize: 100 });

    const handleAddItem = async () => {
        try {
            const result = await createItem(transformInput(itemName, parentId)).unwrap();
            console.log('Item created:', result);
            setItemName('');
            setParentId(null);
            onItemAdded(result);
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    const showSelect = transformInput.length > 1;

    return (
        <div className='addItem'>
            <div className="addItem__title">Добавить {title.toLowerCase()}</div>
            <input
                type="text"
                placeholder="Название"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
            />
            {showSelect && (
                <select
                    value={parentId || ''}
                    onChange={(e) => setParentId(Number(e.target.value))}
                    className='addItem__select'
                >
                    <option value="">Выберите</option>
                    {parents?.content.map(parent => (
                        <option key={parent.id} value={parent.id}>{parent.name}</option>
                    ))}
                </select>
            )}
            <button onClick={handleAddItem}>Добавить</button>
        </div>
    );
};

export default AddItemPage;