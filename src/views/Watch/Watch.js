import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Watch.module.scss';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlinePause } from 'react-icons/ai';
import { BiSkipPrevious, BiSkipNext, BiVolumeLow, BiVolumeFull } from 'react-icons/bi';

const videoSrc = require('~/assets/videos/Mây - Mr.Siro.mp4');

const cx = classNames.bind(styles);

const Watch = () => {
   const videoRef = useRef();

   const [play, setPlay] = useState(false);
   const play_pause_Ref = useRef();

   const [volume, setVolume] = useState(2);
   const volumeCurRef = useRef(2);
   const volumeRef = useRef();

   const dragRef = useRef(false);
   const progressRefRef = useRef();
   const progressBuffered = useRef();
   const progressCurrent = useRef();
   const progressBall = useRef();
   const mainRefRef = useRef();
   const progressBallMain = useRef();

   useEffect(() => {
      volumeRef.current.onclick = () => {
         if (volume === 0) {
            setVolume(volumeCurRef.current);
         } else {
            setVolume(0);
         }
      };
   }, [volume]);

   useEffect(() => {
      play_pause_Ref.current.onclick = () => {
         if (play) {
            setPlay(false);
            videoRef.current.pause();
         } else {
            setPlay(true);
            videoRef.current.play();
         }
      };
   }, [play]);

   useEffect(() => {
      const widthProgress = progressRefRef.current.getBoundingClientRect().width;

      const widthProgressBall = progressBallMain.current.getBoundingClientRect().width / 2;
      videoRef.current.onplay = (e) => {
         setInterval(() => {
            let moveProgress = videoRef.current.currentTime / videoRef.current.duration;

            if (moveProgress > 1) {
               moveProgress = 1;
            } else if (moveProgress < 0) {
               moveProgress = 0;
            }
            progressCurrent.current.style.transform = `scaleX(0${moveProgress})`;
            progressBall.current.style.transform = `translateX(calc(${
               moveProgress * 100
            }% - ${widthProgressBall}px))`;
         }, widthProgress / (videoRef.current.duration * 5));
      };

      progressRefRef.current.onmousedown = (e) => {
         const leftProgress = progressRefRef.current.getBoundingClientRect().left;
         const widthProgress = progressRefRef.current.getBoundingClientRect().width;
         // const widthProgressBall = progressBallMain.current.getBoundingClientRect().width / 2;
         dragRef.current = true;

         let moveProgress = (e.clientX - leftProgress) / widthProgress;

         if (moveProgress > 1) {
            moveProgress = 1;
         } else if (moveProgress < 0) {
            moveProgress = 0;
         }

         progressCurrent.current.style.transform = `scaleX(0${moveProgress})`;
         progressBall.current.style.transform = `translateX(calc(${
            moveProgress * 100
         }% - ${widthProgressBall}px))`;
      };

      document.onmousemove = (e) => {
         if (dragRef.current) {
            const leftProgress = progressRefRef.current.getBoundingClientRect().left;
            const widthProgress = progressRefRef.current.getBoundingClientRect().width;
            // const widthProgressBall = progressBallMain.current.getBoundingClientRect().width / 2;
            let moveProgress = (e.clientX - leftProgress) / widthProgress;

            if (moveProgress > 1) {
               moveProgress = 1;
            } else if (moveProgress < 0) {
               moveProgress = 0;
            }

            progressCurrent.current.style.transform = `scaleX(0${moveProgress})`;
            progressBall.current.style.transform = `translateX(calc(${
               moveProgress * 100
            }% - ${widthProgressBall}px))`;
         }
      };

      document.onmouseup = (e) => {
         if (dragRef.current) {
            dragRef.current = false;
         }
      };
   }, []);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('watch')}>
            <video ref={videoRef} src={videoSrc}></video>
            <div className={cx('watch-controls')}>
               <div ref={progressRefRef} className={cx('progress')}>
                  <div ref={mainRefRef} className={cx('progress-main')}></div>
                  <div ref={progressBuffered} className={cx('progress-buffered')}></div>
                  <div ref={progressCurrent} className={cx('progress-current')}></div>
                  <div ref={progressBall} className={cx('progress-ball__wrapper')}>
                     <div ref={progressBallMain} className={cx('progress-ball')}></div>
                  </div>
               </div>
               <div className={cx('icon')}>
                  <button type="button" className={cx('btn-prev')}>
                     <BiSkipPrevious />
                  </button>
                  <button ref={play_pause_Ref} type="button" className={cx('btn-player')}>
                     {!play ? <BsFillPlayFill /> : <AiOutlinePause />}
                  </button>
                  <button type="button" className={cx('btn-next')}>
                     <BiSkipNext />
                  </button>
                  <button ref={volumeRef} type="button" className={cx('btn-volume')}>
                     {volume === 1 ? (
                        <BiVolumeLow />
                     ) : volume === 2 ? (
                        <BiVolumeFull />
                     ) : (
                        <div className={cx('none-volume')}>
                           <BiVolumeFull />
                        </div>
                     )}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Watch;
