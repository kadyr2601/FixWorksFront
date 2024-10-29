import React from 'react';
import Image from 'next/image';
import img5 from '@/public/img5.jpg';
import icon1 from '@/public/icon1.svg';
import icon2 from '@/public/icon2.svg';
import icon3 from '@/public/icon3.svg';
import icon4 from '@/public/icon4.svg';
import icon5 from '@/public/icon5.svg';
import icon6 from '@/public/icon6.svg';
import {getDictionary, Locale} from "@/app/dictionaries";


const Main4 = async ({lang}: {lang: string}) => {

    const dict = await getDictionary(lang as Locale);

    return (
        <div className={'main4-cont'}>
            <div className="container">
                <div className="info-cont">
                    <div className="left">
                        <h2>FIXWORKS</h2>
                        <div className="column">
                            <div className="row">
                                <div className="image">
                                    <Image src={icon1} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>Always by your side</h4>
                                <p>We will help you on the same day</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon2} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>We are attentive</h4>
                                <p>To customer wishes</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon3} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>All over the world</h4>
                                <p>We work all across Russia and abroad</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon4} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>We value our clients</h4>
                                <p>We do our best</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon5} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>We are always open</h4>
                                <p>To new experiences</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon6} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>We are good</h4>
                                <p>At what we do</p>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <Image src={img5} alt={'info'} fill={true}/>
                    </div>
                </div>
            </div>
            <div className="line"></div>
        </div>
    );
};

export default Main4;