'use client'
import React from 'react';
import Image from "next/image";
import {FiArrowRight} from "react-icons/fi";
import { useRouter } from 'next/navigation';


interface CardProps {
    name: string;
    image: string;
    slug: string;
    lang: string;
}

const Card = ({ name, image, slug, lang }: CardProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/${lang}/${slug}`);
    };
    return (
        <div className="card" onClick={handleClick}>
            <Image alt={'b1'} src={process.env.HostName + image} fill={true}/>
            <h3>{name}</h3>
            <p>Learn more <FiArrowRight color={"white"}/></p>
        </div>
    );
};

export default Card;