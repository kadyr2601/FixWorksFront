'use client'
import React, { useState, useEffect } from 'react';

const RotatingPhrases = () => {
    const phrases = [
        "Мы оптимизировали каждый пиксель, чтобы вы улыбались.",
        "Создано для вас. Отлажено для вечности.",
        "Работаем 25 часов в сутки для вашего удобства.",
        "Кодируем с любовью, тестируем с терпением.",
        "В каждой строке кода — капля вдохновения.",
        "Сайт, который знает, что такое магия кода.",
        "Когда строки кода превращаются в цифровое искусство.",
        "Больше кофе, меньше багов. Так мы и живём.",
        "Сначала кофе, потом код. И так каждый день.",
        'С любовью сделано для вас!',
        'Каждая строка кода написана с заботой!',
        'Разработано и оптимизировано до мелочей.',
        'От команды, которая заботится о деталях.',
        'Сайт сделан при поддержке кофе и вдохновения!',

    ];

    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [fade, setFade] = useState(false); // Для плавной анимации

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true); // Запускаем анимацию
            setTimeout(() => {
                setCurrentPhrase((prevPhrase) => (prevPhrase + 1) % phrases.length); // Меняем фразу
                setFade(false); // Возвращаем видимость
            }, 500); // Время анимации (должно совпадать с transition)
        }, 2500); // Интервал в 2 секунды

        return () => clearInterval(interval); // Очищаем интервал при размонтировании
    }, []);

    return (
        <p className={fade ? `fade`: ''}>{phrases[currentPhrase]}</p>
    );
};

export default RotatingPhrases;
