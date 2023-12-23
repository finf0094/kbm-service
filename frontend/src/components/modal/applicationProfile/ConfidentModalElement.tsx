import React, { useEffect, useState } from 'react';

interface ConfidentModalElementProps {
    title: string;
    animationClass: string;
    children: React.ReactNode;
    isOpen: boolean;
}

const ConfidentModalElement: React.FC<ConfidentModalElementProps> = ({ title, animationClass, isOpen, children }) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(isOpen);

    useEffect(() => {
        setIsModalVisible(isOpen);
    }, [isOpen]);

    const modalClass = isModalVisible ? 'confident-modal-open' : 'confident-modal-closed';

    return (
        <div>
            {isModalVisible ? (
                <div className={`confident-modal ${modalClass} ${animationClass}`}>
                    <div className={`confident-modal__wrapper ${modalClass} ${animationClass}`}>
                        <h3 className="confident-modal__title">{title}</h3>
                        {children}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ConfidentModalElement;
