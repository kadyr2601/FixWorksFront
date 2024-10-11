import React from 'react';
import Image from "next/image";
import {FiArrowRight} from "react-icons/fi";

const Card = ({name, image}:{name: string, image: string}) => {

    return (
        <div className="card">
            <Image alt={'b1'} src={image} fill={true}/>
            <h3>{name}</h3>
            <p>Learn more <FiArrowRight color={"white"}/></p>
        </div>
    );
};

export default Card;