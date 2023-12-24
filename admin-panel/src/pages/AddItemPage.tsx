import React, { useState } from 'react';

import {useCreateLocationMutation, useGetAllLocationsQuery} from "../redux/api/locationApi.ts";
import {useCreateDepartmentMutation, useGetAllDepartmentsQuery} from "../redux/api/departmentApi.ts";
import {useCreatePositionMutation} from "../redux/api/positionApi.ts";

const AddItemPage: React.FC<{
    mutationFn: typeof useCreateLocationMutation | typeof useCreateDepartmentMutation | typeof useCreatePositionMutation,
    onItemAdded: (item: any) => void,
    queryFn: typeof useGetAllLocationsQuery | typeof useGetAllDepartmentsQuery,
    transformInput: (name: string, parentId?: number | null) => any
}> = ({ mutationFn, onItemAdded, queryFn, transformInput }) => {
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
        <div>
            <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
            />
            {showSelect && (
                <select
                    value={parentId || ''}
                    onChange={(e) => setParentId(Number(e.target.value))}
                >
                    <option value="">Select a parent</option>
                    {parents?.content.map(parent => (
                        <option key={parent.id} value={parent.id}>{parent.name}</option>
                    ))}
                </select>
            )}
            <button onClick={handleAddItem}>Add Item</button>
        </div>
    );
};

export default AddItemPage;