import React from 'react';
import {CounterBanner} from "@/components/HomePageDTO";


const Counter = async ({props, lang}: { props: CounterBanner[], lang: "ru"|"en" }) => {
    return (
        <div className={'counter-cont container'}>
            {
                props.map((item, index) => {
                    return (
                        <div className="column" key={index}>
                            <h1>{item.number}</h1>
                            <p>{lang === "ru" ? item.text_ru : item.text_en}</p>
                        </div>
                    );
                }
            )
            }

        </div>
    );
};

export default Counter;