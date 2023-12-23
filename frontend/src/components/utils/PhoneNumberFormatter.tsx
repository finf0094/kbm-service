import React from 'react';

// Define the type for the numberPhone prop
interface PhoneNumberFormatterProps {
    numberPhone: string | number;
}

function formatPhoneNumber(phoneNumber: string | number): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
    }

    return phoneNumber.toString();
}


const PhoneNumberFormatter: React.FC<PhoneNumberFormatterProps> = ({ numberPhone }) => {
    const formattedPhoneNumber = formatPhoneNumber(numberPhone);

    return (
        <div className='number'>{formattedPhoneNumber}</div>
    );
}


export default PhoneNumberFormatter;
