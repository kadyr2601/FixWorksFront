'use client';
import React from 'react';

const Menu = ({ active, toggleMenu }: { active: boolean; toggleMenu: () => void }) => {
    return (
        <div className={active ? "menu active" : "menu"} onClick={toggleMenu}>
            <div className="menu__burger">
                <div className="menu__burger_line menu__burger_line--first"></div>
                <div className="menu__burger_line menu__burger_line--second"></div>
                <div className="menu__burger_line menu__burger_line--third"></div>
                <div className="menu__burger_line menu__burger_line--fourth"></div>
            </div>
        </div>
    );
};

export default Menu;
