import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { redirect } from "react-router-dom";
import "../UI/modal.css";
import "./UI/QuizFinishModal.css";

interface QuizModalProps {
    score: number | undefined;
    isOpen: boolean;
    onClose: () => void;
}

const QuizFinishModal: React.FC<QuizModalProps> = ({
    score,
    isOpen,
    onClose,
}) => {
    const [animationClass, setAnimationClass] = useState("");

    const handleToggleModal = () => {
        if (isOpen) {
            // Closing animation
            setAnimationClass("quizModal-closing-animation");
            setTimeout(() => {
                setAnimationClass("");
                onClose();
                redirect("/");
            }, 300);
        } else {
            // Opening animation
            setAnimationClass("quizModal-opening-animation");
            onClose();
        }
    };

    const getScales = () => {
        const { clientWidth: A, clientHeight: e } = document.documentElement;
        return (A + e) / 2800;
    };

    const modalClass = isOpen ? "quizModal-open" : "quizModal-closed";

    const isPassed = score !== undefined && score >= 80;

    // Используем useSpring для анимации изменения значения score
    const scoreAnimation = useSpring({
        score: score || 0,
        from: { score: 0 },
        config: { duration: 1000 },
    });

    useEffect(() => {
        scoreAnimation.score.start(score || 0);
    }, [scoreAnimation, score]);

    return (
        <>
            <div className={`modal quizModal ${modalClass} ${animationClass}`}>
                <div
                    className={`modal__wrapper quizModal__wrapper ${modalClass} ${animationClass}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{ transform: `scale(${getScales()})` }}
                >
                    <div className="quizModal__icon"
                        style={isPassed ? { background: "#00E933" } : { background: "#ED1212" }}>
                        {isPassed ? <i className="uil uil-check"></i> : <span>&times;</span>}
                    </div>

                    <h1 className="quizModal__title">{isPassed ? "Тест пройден!" : "Тест не пройден :("}</h1>

                    <div className="quizModal__subtitle">
                        {isPassed
                            ? "Поздравляем! Вы успешно прошли тест на:"
                            : "К сожалению ваш результат не превзошёл нужные требования. Вы прошли тест на:"}
                    </div>

                    <animated.div className="quizModal__score">
                        <animated.span className="quizModal__score-value"
                            style={isPassed ? { color: "#46F66D" } : { color: "red" }}>
                            {scoreAnimation.score.to((val: number) => Math.floor(val))}
                        </animated.span>
                        <animated.span
                            className="quizModal__score-bg"
                            style={isPassed ? { color: "rgba(91, 240, 123, .2)" } : { color: "rgba(249, 162, 162, .2)" }}
                        >
                            %
                        </animated.span>
                    </animated.div>

                    <button className="modal__button" onClick={handleToggleModal}>Закрыть</button>
                </div>
            </div>
        </>
    );
};


export default QuizFinishModal;
