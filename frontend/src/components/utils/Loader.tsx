const Loader = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             style={{ margin: 'auto', background: 'rgb(255, 255, 255)', display: 'block', shapeRendering: 'auto', width: '204px' }}
             height="204px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#739efd" strokeWidth="11" r="33"
                    strokeDasharray="155.50883635269477 53.83627878423159">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
                                  dur="0.7407407407407407s" values="0 50 50;360 50 50"
                                  keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
    );
};

export default Loader;