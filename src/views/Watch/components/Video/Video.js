import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlinePause } from 'react-icons/ai';
import { BiSkipPrevious, BiSkipNext, BiVolumeLow, BiVolumeFull } from 'react-icons/bi';

const videoSrc = require('~/assets/videos/y2mate.com - One Wish  Vu Tử Bối Cover  Vietsub_480p.mp4');
// const videoSrc = require('~/assets/videos/Mây - Mr.Siro.mp4');

const cx = classNames.bind(styles);

const Watch = () => {
   const watchRef = useRef();
   const videoRef = useRef();
   const watchControlRef = useRef();
   const modalControlRef = useRef();

   const [showControl, setShowControl] = useState(true);

   const [play, setPlay] = useState(false);
   const cur_play_pause_Ref = useRef(false);
   const play_pause_Ref = useRef();

   const canEffectRef = useRef(false);

   const effectPlayRef = useRef();

   const [volume, setVolume] = useState(2);
   const volumeCurRef = useRef({ level: 2, percent: 1 });
   const volumeRef = useRef();

   const dragRef = useRef(false);
   const progressRefRef = useRef();
   const progressBuffered = useRef();
   const progressCurrent = useRef();
   const progressBall = useRef();
   const mainProgressfRef = useRef();
   const progressBallMain = useRef();

   const curIntervalRef = useRef();

   useEffect(() => {
      volumeRef.current.onclick = () => {
         if (volume === 0) {
            setVolume(volumeCurRef.current.level);
         } else {
            setVolume(0);
         }
      };
   }, [volume]);

   const handlePlayAndPaus = () => {
      if (play) {
         setPlay(false);
      } else {
         setPlay(true);
      }
   };

   const handleAutoProgress = (widthProgress, widthProgressBall) => {
      curIntervalRef.current = setInterval(() => {
         const moveProgress = videoRef.current.currentTime / videoRef.current.duration;

         if (moveProgress > 1) {
            moveProgress = 1;
         } else if (moveProgress < 0) {
            moveProgress = 0;
         }
         progressCurrent.current.style.transform = `scaleX(0${moveProgress})`;
         progressBall.current.style.transform = `translateX(calc(${
            moveProgress * 100
         }% - ${widthProgressBall}px))`;
      }, (videoRef.current.duration * 600) / widthProgress);
   };

   const handleMoveProgress = (e, widthProgressBall) => {
      const leftProgress = progressRefRef.current.getBoundingClientRect().left;
      const widthProgress = progressRefRef.current.getBoundingClientRect().width;

      let moveProgress = (e.clientX - leftProgress) / widthProgress;

      if (moveProgress > 1) {
         moveProgress = 1;
      } else if (moveProgress < 0) {
         moveProgress = 0;
      }

      videoRef.current.currentTime = moveProgress * videoRef.current.duration;

      progressCurrent.current.style.transform = `scaleX(0${moveProgress})`;
      progressBall.current.style.transform = `translateX(calc(${
         moveProgress * 100
      }% - ${widthProgressBall}px))`;
   };

   useEffect(() => {
      if (!showControl) {
         modalControlRef.current.style.opacity = '0';
         watchControlRef.current.style.opacity = '0';
      } else {
         modalControlRef.current.style.opacity = '1';
         watchControlRef.current.style.opacity = '1';
      }

      watchRef.current.onmouseover = () => {
         setShowControl(true);
      };

      watchRef.current.onmouseleave = () => {
         if (!videoRef.current.paused) {
            setShowControl(false);
         }
      };
   }, [showControl]);

   useEffect(() => {
      play_pause_Ref.current.onclick = handlePlayAndPaus;
      videoRef.current.onclick = handlePlayAndPaus;
      modalControlRef.current.onclick = handlePlayAndPaus;

      if (effectPlayRef.current) {
         effectPlayRef.current.onclick = handlePlayAndPaus;
      }

      const widthProgress = progressRefRef.current.getBoundingClientRect().width;
      const widthProgressBall = progressBallMain.current.getBoundingClientRect().width / 2;

      videoRef.current.onplay = () => {
         handleAutoProgress(widthProgress, widthProgressBall);
         canEffectRef.current = true;
      };

      videoRef.current.onpause = (e) => {
         canEffectRef.current = true;
      };

      videoRef.current.onended = (e) => {
         canEffectRef.current = false;
         setPlay(false);
      };

      videoRef.current.oncanplay = (e) => {
         canEffectRef.current = true;
      };

      if (play) {
         videoRef.current.play();
      } else {
         videoRef.current.pause();
         clearInterval(curIntervalRef.current);
      }

      return () => {
         clearInterval(curIntervalRef.current);
      };
   }, [play]);

   useEffect(() => {
      const widthProgressBall = progressBallMain.current.getBoundingClientRect().width / 2;

      progressRefRef.current.onmouseover = (e) => {
         mainProgressfRef.current.style.transform = 'scaleY(1)';
         progressBall.current.style.visibility = 'visible';
         progressBallMain.current.style.height = '14px';
         progressBallMain.current.style.width = '14px';
      };

      progressRefRef.current.onmouseleave = (e) => {
         if (!dragRef.current) {
            mainProgressfRef.current.style.transform = 'scaleY(0.5)';
            progressBall.current.style.visibility = 'hidden';
            progressBallMain.current.style.height = '2px';
            progressBallMain.current.style.width = '2px';
         }
      };

      progressRefRef.current.onmousedown = (e) => {
         dragRef.current = true;

         progressCurrent.current.style.transition = `none`;
         progressBall.current.style.transition = `none`;

         if (!videoRef.current.paused) cur_play_pause_Ref.current = true;
         else cur_play_pause_Ref.current = false;

         handleMoveProgress(e, widthProgressBall);
      };

      document.onmousemove = (e) => {
         if (dragRef.current) {
            handleMoveProgress(e, widthProgressBall);
         }
      };

      document.onmouseup = (e) => {
         if (dragRef.current) {
            if (cur_play_pause_Ref.current) {
               setPlay(true);
               videoRef.current.play();
            }

            mainProgressfRef.current.style.transform = 'scaleY(0.5)';
            progressBall.current.style.visibility = 'hidden';
            progressBallMain.current.style.height = '2px';
            progressBallMain.current.style.width = '2px';

            progressCurrent.current.style.transition = `transform 0.1s cubic-bezier(0, 0, 0.2, 1),
         -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1)`;
            progressBall.current.style.transition = `transform 0.1s cubic-bezier(0, 0, 0.2, 1),
         -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1)`;
            dragRef.current = false;
         }
      };
   }, []);

   return (
      <div className={cx('wrapper')}>
         <div ref={watchRef} className={cx('watch')}>
            <video ref={videoRef} src={videoSrc}></video>
            <div ref={watchControlRef} className={cx('watch-controls')}>
               <div ref={progressRefRef} className={cx('progress')}>
                  <div ref={mainProgressfRef} className={cx('progress-main')}>
                     <div ref={progressBuffered} className={cx('progress-buffered')}></div>
                     <div ref={progressCurrent} className={cx('progress-current')}></div>
                  </div>
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
            <div ref={modalControlRef} className={cx('modal-control')}></div>
            {canEffectRef.current ? (
               <div ref={effectPlayRef}>
                  {!play ? (
                     <div className={cx('effect', 'effect-play')}>
                        <BsFillPlayFill />
                     </div>
                  ) : (
                     <div className={cx('effect', 'effect-pause')}>
                        <AiOutlinePause />
                     </div>
                  )}
               </div>
            ) : (
               <></>
            )}
         </div>
      </div>
   );
};

export default Watch;
