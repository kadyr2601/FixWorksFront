import React from 'react';
import Image from "next/image";
import aboutImg from '@/public/about-us.jpg';


const AboutUs = async () => {
    return (
        <div className={'container'}>
            <div className="about-cont">
                <div className="left">
                    <Image src={aboutImg} alt="About Us" fill={true}/>
                </div>

                <div className="right">
                    <h3>About us</h3>
                    <p>
                        We are an experienced restoration company established on October 4, 2007. We work in Moscow and
                        the
                        Moscow region, but also go to other cities of Russia and abroad.
                        Many significant facilities in Moscow,
                        such as The Ritz-Carlton Hotel, the Moscow City skyscrapers, the Savva Restaurant in the
                        Metropol Hotel,
                        etc., may illustrate the results of our works. The customers we have worked with speak
                        positively
                        about our projects.Having a system approach to any task, we execute restoration works at
                        facilities
                        according to a clear plan of actions developed on the basis of many years of experience.Our
                        customers
                        are hotels, offices, groups of corporate companies, individuals, etc.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;