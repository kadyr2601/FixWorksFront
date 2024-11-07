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

    const t = await getDictionary(lang as Locale);

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
                                <h4>{t.home.section2}</h4>
                                <p>{t.home.section2_2}</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon2} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>{t.home.section3}</h4>
                                <p>{t.home.section3_2}</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon3} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>{t.home.section4}</h4>
                                <p>{t.home.section4_2}</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon4} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>{t.home.section5}</h4>
                                <p>{t.home.section5_2}</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon5} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>{t.home.section6}</h4>
                                <p>{t.home.section6_2}</p>
                            </div>
                            <div className="row">
                                <div className="image">
                                    <Image src={icon6} alt={'icon1'} fill={true}/>
                                </div>
                                <h4>{t.home.section7}</h4>
                                <p>{t.home.section7_2}</p>
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