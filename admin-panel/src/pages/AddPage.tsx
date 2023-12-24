// AddPage.tsx
import React, { useState } from 'react';
import { useCreateLocationMutation } from "../redux/api/locationApi";

const AddPage: React.FC = () => {
    const [locationName, setLocationName] = useState<string>('');
    const [createLocation] = useCreateLocationMutation();

    const handleAddLocation = async () => {
        try {
            const result = await createLocation(locationName).unwrap();
            console.log('Location created:', result);
            setLocationName('');
        } catch (error) {
            console.error('Error creating location:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Location Name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
            />
            <button onClick={handleAddLocation}>Add Location</button>
        </div>
    );
};

export default AddPage;
