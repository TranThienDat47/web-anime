import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlinePause } from 'react-icons/ai';
import { MdReplay } from 'react-icons/md';
import { BiSkipPrevious, BiSkipNext, BiVolumeLow, BiVolumeFull } from 'react-icons/bi';

const videoSrc = require('~/assets/videos/y2mate.com - One Wish  Vu Tử Bối Cover  Vietsub_480p.mp4');
// const videoSrc = require('~/assets/videos/Mây - Mr.Siro.mp4');

const cx = classNames.bind(styles);

const Watch = () => {
   const watchRef = useRef();
   const videoRef = useRef();
   const watchControlRef = useRef();
   const modalControlRef = useRef();

   const isEndedRef = useRef(false);

   const [showControl, setShowControl] = useState();

   const [play, setPlay] = useState(0);
   const cur_play_pause_Ref = useRef(false);
   const play_pause_Ref = useRef();

   const [showEffectRef, setShowEffectRef] = useState(0);

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
      if (videoRef.current.paused) {
         setShowEffectRef(1);
      } else {
         setShowEffectRef(2);
      }

      if (play === 1) {
         setPlay(0);
      } else {
         setPlay(1);
      }
   };

   const handleAutoProgress = () => {
      const widthProgress = progressRefRef.current.getBoundingClientRect().width;
      const widthProgressBall = progressBallMain.current.getBoundingClientRect().width / 2;

      curIntervalRef.current = setInterval(() => {
         let moveProgress = videoRef.current.currentTime / videoRef.current.duration;
         if (moveProgress > 1) {
            moveProgress = 1;
         } else if (moveProgress < 0) {
            moveProgress = 0;
         }

         progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
         progressBall.current.style.transform = `translateX(calc(${
            moveProgress * 100
         }% - ${widthProgressBall}px))`;
      }, (videoRef.current.duration * 600) / widthProgress);
   };

   const handleMoveProgress = (e) => {
      const leftProgress = progressRefRef.current.getBoundingClientRect().left;
      const widthProgress = progressRefRef.current.getBoundingClientRect().width;
      const widthProgressBall = progressBallMain.current.getBoundingClientRect().width / 2;

      let moveProgress = (e.clientX - leftProgress) / widthProgress;

      if (moveProgress > 1) {
         moveProgress = 1;

         videoRef.current.currentTime = moveProgress * (videoRef.current.duration - 0.01);

         progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
         progressBall.current.style.transform = `translateX(calc(${
            moveProgress * 100
         }% - ${widthProgressBall}px))`;

         return;
      } else if (moveProgress < 0) {
         moveProgress = 0;
      }

      videoRef.current.currentTime = moveProgress * videoRef.current.duration;

      progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
      progressBall.current.style.transform = `translateX(calc(${
         moveProgress * 100
      }% - ${widthProgressBall}px))`;
   };

   useEffect(() => {
      let uniqueTime;

      if (showControl === 0) {
         modalControlRef.current.style.opacity = '0';
         watchControlRef.current.style.opacity = '0';
      } else if (showControl === 1) {
         modalControlRef.current.style.opacity = '1';
         watchControlRef.current.style.opacity = '1';

         uniqueTime = setTimeout(() => {
            setShowControl(0);
         }, 3169);
      } else {
         modalControlRef.current.style.opacity = '1';
         watchControlRef.current.style.opacity = '1';
      }

      watchRef.current.onmousemove = () => {
         if (play === 1) {
            setShowControl(1);
         } else setShowControl(2);
      };

      watchRef.current.onclick = () => {
         if (play === 1) {
            setShowControl(1);
         } else setShowControl(2);
      };

      watchRef.current.onmouseleave = () => {
         if (play === 1 && !dragRef.current) {
            setShowControl(0);
         } else setShowControl(2);
      };

      return () => {
         clearTimeout(uniqueTime);
      };
   }, [showControl, play]);

   useEffect(() => {
      play_pause_Ref.current.onclick = handlePlayAndPaus;
      videoRef.current.onclick = handlePlayAndPaus;
      modalControlRef.current.onclick = handlePlayAndPaus;

      if (effectPlayRef.current) {
         effectPlayRef.current.onclick = handlePlayAndPaus;
      }

      videoRef.current.oncanplay = (e) => {
         // videoRef.current.muted = true;
         // videoRef.current.autoplay = true;
         // setPlay(1);
      };

      videoRef.current.onplay = () => {
         setShowControl(1);
         handleAutoProgress();

         isEndedRef.current = false;
      };

      videoRef.current.onpause = (e) => {
         setShowControl(2);
         isEndedRef.current = false;
      };

      videoRef.current.onended = (e) => {
         setPlay(2);

         isEndedRef.current = true;

         if (dragRef.current) {
            videoRef.current.autoplay = false;
         }
         setShowControl(1);
      };

      if (play === 1) {
         videoRef.current.play();
      } else if (play === 0) {
         videoRef.current.pause();
         clearInterval(curIntervalRef.current);
      }

      window.onkeypress = (e) => {
         if (e.keyCode == 32) {
            handlePlayAndPaus();
         }
      };

      return () => {
         clearInterval(curIntervalRef.current);
      };

      // eslint-disable-next-line
   }, [play]);

   useEffect(() => {
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
         clearTimeout(curIntervalRef.current);

         progressCurrent.current.style.transition = `none`;
         progressBall.current.style.transition = `none`;

         if (!videoRef.current.paused) cur_play_pause_Ref.current = true;
         else cur_play_pause_Ref.current = false;

         videoRef.current.pause();

         handleMoveProgress(e);
      };

      document.onmousemove = (e) => {
         if (dragRef.current) {
            handleMoveProgress(e);
         }
      };

      document.onmouseup = (e) => {
         if (dragRef.current) {
            setShowControl(1);

            if (cur_play_pause_Ref.current || isEndedRef.current) {
               setPlay(1);
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
      <div ref={watchRef} className={cx('wrapper')}>
         <div className={cx('watch')}>
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
                     {play === 0 ? (
                        <BsFillPlayFill />
                     ) : play === 1 ? (
                        <AiOutlinePause />
                     ) : (
                        <MdReplay />
                     )}
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
            <div ref={effectPlayRef}>
               {showEffectRef === 2 ? (
                  <div className={cx('effect', 'effect-play')}>
                     <BsFillPlayFill />
                  </div>
               ) : showEffectRef === 1 ? (
                  <div className={cx('effect', 'effect-pause')}>
                     <AiOutlinePause />
                  </div>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   );
};

export default Watch;
