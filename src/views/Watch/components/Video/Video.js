import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlinePause } from 'react-icons/ai';
import { MdReplay } from 'react-icons/md';
import { BiSkipPrevious, BiSkipNext, BiVolumeLow, BiVolumeFull } from 'react-icons/bi';

import axios from 'axios';
import { apiUrl } from '~/contexts/constants';

// const videoSrc = require('~/assets/videos/y2mate.com - One Wish  Vu Tử Bối Cover  Vietsub_480p.mp4');
const videoSrc = require('~/assets/videos/Mây - Mr.Siro.mp4');

const cx = classNames.bind(styles);

const Watch = () => {
   useEffect(() => {}, []);

   const checkNode = (parent, children) => {
      let node = children;
      while (node !== null) {
         if (node === parent) return true;
         node = node.parentNode;
      }
      return false;
   };

   const watchRef = useRef();
   const videoRef = useRef();
   const watchControlRef = useRef();
   const modalControlRef = useRef();

   const timeDurationRef = useRef();
   const timeCurrentRef = useRef();

   const tempCurrentRef = useRef();

   const isEndedRef = useRef(false);

   const previewListRef = useRef([]);

   const videoPreviewRef = useRef(0);

   const [showControl, setShowControl] = useState();

   const [play, setPlay] = useState(0); // 1 is play; 2 is ended; 0 is pause
   const cur_play_pause_Ref = useRef(false);
   const play_pause_Ref = useRef();

   const curImgWrapperRef = useRef();
   const curImgRef = useRef();
   const curTimeImgRef = useRef();

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

   const convertTime = (time) => {
      const date = new Date(null);
      date.setSeconds(time);
      var result;
      if (time > 3600) result = date.toISOString().slice(11, 19);
      else result = date.toISOString().slice(14, 19);

      if (result[0] === '0') result = result.slice(1, result.length);

      return result;
   };

   const handlePlayAndPaus = (e) => {
      e.preventDefault();
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

   var captureImage = function () {
      var video = videoRef.current;
      var canvas = document.createElement('canvas');
      canvas.width = 192;
      canvas.height = 108;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      let tempPic = 300;

      let listImg = [];

      if (videoRef.current.duration / 300 > 1)
         tempPic = tempPic + ((videoRef.current.duration - 300) / 60) * 8;
      else if (videoRef.current.duration < 60) {
         tempPic = videoRef.current.duration * 2;
      } else if (videoRef.current.duration < 300) tempPic = videoRef.current.duration;

      const jump = videoRef.current.duration / tempPic;

      let i = 0,
         tempTimeCurrent = -1;

      const myTimer = () => {
         if (i > videoRef.current.duration) {
            clearInterval(uniqueInterval);
            i = 0;
            (function () {
               const NUMBER = 18;
               var tempLength = { min: 0, max: NUMBER };

               const loadUser = async () => {
                  const response = await axios.post(`${apiUrl}/product_details`, {
                     productId: `31201662873524613`,
                     image: listImg.slice(tempLength.min, tempLength.max),
                  });
               };

               for (let i = 0; i < listImg.length; i += NUMBER) {
                  setTimeout(() => {
                     loadUser();
                     tempLength.max += NUMBER;
                     tempLength.min += NUMBER;
                  }, i * 100);
               }
            })();
         }
         if (tempTimeCurrent !== i) videoRef.current.currentTime = i;

         tempTimeCurrent = i;

         videoRef.current.onseeked = () => {
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            listImg.push({ img: canvas.toDataURL('image/jpeg', 0.4), updateTime: i });
            console.log(canvas.toDataURL('image/jpeg', 0.4));

            i += jump;
         };
      };

      const uniqueInterval = setInterval(() => {
         myTimer();
      }, 140);
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

         tempCurrentRef.current = moveProgress * (videoRef.current.duration - 0.01);

         timeCurrentRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;
         curTimeImgRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;

         progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
         progressBall.current.style.transform = `translateX(calc(${
            moveProgress * 100
         }% - ${widthProgressBall}px))`;

         return;
      } else if (moveProgress < 0) {
         moveProgress = 0;
      }

      tempCurrentRef.current = moveProgress * videoRef.current.duration;
      timeCurrentRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;
      curTimeImgRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;

      progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
      progressBall.current.style.transform = `translateX(calc(${
         moveProgress * 100
      }% - ${widthProgressBall}px))`;
   };

   const handlePreviewVideo = (e) => {
      const leftProgress = progressRefRef.current.getBoundingClientRect().left;
      const widthProgress = progressRefRef.current.getBoundingClientRect().width;

      let moveProgress = (e.clientX - leftProgress) / widthProgress;

      videoPreviewRef.current = moveProgress * videoRef.current.duration;

      curImgWrapperRef.current.style.transform = `translateX(calc(${moveProgress * 100}% - 96px))`;

      if (
         curImgRef.current.getBoundingClientRect().left <=
         progressRefRef.current.getBoundingClientRect().left
      ) {
         curImgWrapperRef.current.style.transform = `translateX(0)`;
      } else if (
         curImgRef.current.getBoundingClientRect().right >=
         progressRefRef.current.getBoundingClientRect().right
      ) {
         curImgWrapperRef.current.style.transform = `translateX(calc(${100}% - 192px))`;
      }

      if (videoPreviewRef.current <= 0) {
         videoPreviewRef.current = 0;
      } else if (videoPreviewRef.current >= videoRef.current.duration) {
         videoPreviewRef.current = videoRef.current.duration;
      }

      previewListRef.current.find((element) => {
         if (element.updateTime >= videoPreviewRef.current) {
            curImgRef.current.style.backgroundImage = `url('${element.img}')`;
            return true;
         }
      });

      curTimeImgRef.current.innerHTML = `${convertTime(videoPreviewRef.current)}`;
   };

   useEffect(() => {
      volumeRef.current.onclick = () => {
         if (volume === 0) {
            setVolume(volumeCurRef.current.level);
         } else {
            setVolume(0);
         }
      };
   }, [volume]);

   useEffect(() => {
      videoRef.current.ontimeupdate = () => {
         timeCurrentRef.current.innerHTML = `${convertTime(videoRef.current.currentTime)}`;
      };

      const loadUser = async () => {
         const response = await axios.get(`${apiUrl}/product_details`);
         response.data.product_details.map((element) => {
            previewListRef.current = previewListRef.current.concat(element.image);
         });
      };
      loadUser();

      // setTimeout(() => {
      //    captureImage();
      // }, 5000);
   }, []);

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
         if (play === 1 && !dragRef.current) {
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
      play_pause_Ref.current.onclick = (e) => {
         handlePlayAndPaus(e);
      };
      videoRef.current.onclick = (e) => {
         handlePlayAndPaus(e);
      };
      modalControlRef.current.onclick = (e) => {
         handlePlayAndPaus(e);
      };

      if (effectPlayRef.current) {
         effectPlayRef.current.onclick = (e) => {
            handlePlayAndPaus(e);
         };
      }

      window.onkeypress = (e) => {
         if (e.keyCode == 32) {
            handlePlayAndPaus(e);
            play_pause_Ref.current.click();
         }
      };

      videoRef.current.oncanplay = (e) => {
         timeDurationRef.current.innerHTML = `${convertTime(videoRef.current.duration)}`;

         // const widthProgressBall = progressBallMain.current.getBoundingClientRect().width / 2;

         // progressCurrent.current.style.transform = `scaleX(${0})`;
         // progressBall.current.style.transform = `translateX(calc(${0}% - ${widthProgressBall}px))`;

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

      return () => {
         clearInterval(curIntervalRef.current);
      };

      // eslint-disable-next-line
   }, [play]);

   useEffect(() => {
      progressRefRef.current.onmousemove = (e) => {
         handlePreviewVideo(e);
      };

      progressRefRef.current.onmouseover = (e) => {
         mainProgressfRef.current.style.transform = 'scaleY(1)';
         progressBall.current.style.visibility = 'visible';
         progressBallMain.current.style.height = '14px';
         progressBallMain.current.style.width = '14px';

         if (!checkNode(curImgWrapperRef.current, e.target))
            curImgWrapperRef.current.style.display = 'block';
         else if (!dragRef.current) curImgWrapperRef.current.style.display = 'none';
      };

      progressRefRef.current.onmouseleave = (e) => {
         if (!dragRef.current) {
            mainProgressfRef.current.style.transform = 'scaleY(0.5)';
            progressBall.current.style.visibility = 'hidden';
            progressBallMain.current.style.height = '2px';
            progressBallMain.current.style.width = '2px';

            curImgWrapperRef.current.style.display = 'none';
         }
      };

      progressRefRef.current.onmousedown = (e) => {
         dragRef.current = true;

         curImgWrapperRef.current.style.display = 'block';

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
            handlePreviewVideo(e);
         }
      };

      document.onmouseup = (e) => {
         if (dragRef.current) {
            curImgWrapperRef.current.style.display = 'none';

            setShowControl(1);

            if (cur_play_pause_Ref.current || isEndedRef.current) {
               setPlay(1);
               videoRef.current.play();
            }

            videoRef.current.currentTime = tempCurrentRef.current;

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
                  <div ref={curImgWrapperRef} className={cx('wrapper__progress-img')}>
                     <div ref={curImgRef} className={cx('progress-img')}>
                        <span ref={curTimeImgRef} className={cx('progress-time_img')}>
                           0:00
                        </span>
                     </div>
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

                  <div className={cx('timeStamp')}>
                     <span ref={timeCurrentRef} className={cx('timeCurrent')}>
                        0:00
                     </span>
                     <span className={cx('timeSeparator')}> / </span>
                     <span ref={timeDurationRef} className={cx('timeDuration')}>
                        0:00
                     </span>
                  </div>
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
