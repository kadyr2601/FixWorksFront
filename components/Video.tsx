'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import videoBG from '@/public/video_bg.jpg';
import videoIcon from '@/public/video-button.svg';


const YouTubeThumbnail = ({ videoId }: { videoId: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenWidth = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
        };
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);

    return (
        <div className={'xdvg'}>
            <div className="container">
                {!isPlaying ? (
                    <div className={'video-thumb'}>
                        <Image src={videoBG} alt="YouTube video thumbnail" onClick={handlePlayClick}/>

                        <div className={'video-icon'} onClick={handlePlayClick}>
                            <Image src={videoIcon} alt="Play Icon" width={64} height={64}/>
                        </div>
                    </div>
                ) : (
                    <iframe
                        width="100%"
                        height={isMobile ? 211 : 700}
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}

                <div className="text">
                    <h3>Understanding. Reality. Newton’s cradle.</h3>
                    <p>FIXWORKS – choosing the best</p>
                </div>
            </div>
            <div className="line"></div>
        </div>
    );
};

export default YouTubeThumbnail;
