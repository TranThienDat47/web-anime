import { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlinePause, AiFillSetting } from 'react-icons/ai';
import { MdReplay } from 'react-icons/md';
import { RiVolumeDownFill, RiVolumeUpFill } from 'react-icons/ri';
import { BiSkipPrevious, BiSkipNext, BiExitFullscreen, BiFullscreen } from 'react-icons/bi';

const videoSrc = null;

const cx = classNames.bind(styles);

const Watch = () => {
   const watchRef = useRef();
   const wrapperVideoRef = useRef();
   const videoRef = useRef();
   const watchControlRef = useRef();
   const modalControlRef = useRef();

   const timeDurationRef = useRef();
   const timeCurrentRef = useRef();

   const tempCurrentRef = useRef(0.0);

   const isEndedRef = useRef(false);

   const previewListRef = useRef([]);
   const modalPreviewRef = useRef();
   const videoPreviewRef = useRef(0);

   const focusVideoRef = useRef(false);
   const hoverProgress = useRef(false);

   const cur_play_pause_Ref = useRef(false);
   const play_pause_Ref = useRef();

   const curImgWrapperRef = useRef();
   const curImgRef = useRef();
   const curTimeImgRef = useRef();

   const effectPlayRef = useRef();

   const volumeCurRef = useRef(1);
   const volumeRef = useRef();
   const volumeClrearRef = useRef();
   const ballVolumeRef = useRef();

   const tempBufferedRef = useRef(0);

   const dragVideoRef = useRef(false);
   const dragVolumeRef = useRef(false);

   const progressRefRef = useRef();
   const progressBuffered = useRef();
   const progressCurrent = useRef();
   const progressBall = useRef();
   const mainProgressfRef = useRef();
   const progressBallMain = useRef();

   const volumeProgressRef = useRef();
   const volumeProgressMainRef = useRef();
   const volumeProgressBallRef = useRef();
   const volumeProgressCurrentRef = useRef();

   const curIntervalRef = useRef();

   const screenStateRef = useRef(0);
   const screenRef = useRef();

   const [volume, setVolume] = useState(2);
   const [screenVideo, setScreenVideo] = useState(0);
   const [showEffectRef, setShowEffectRef] = useState(0);
   const [showControl, setShowControl] = useState(2); // 0 hide, 1 time, 2 full show
   const [play, setPlay] = useState(0); // 1 is play; 2 is ended; 0 is pause

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

   // var captureImage = function () {
   //    var video = videoRef.current;
   //    var canvas = document.createElement('canvas');
   //    canvas.width = 144;
   //    canvas.height = 81;
   //    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

   //    let tempPic = 300;

   //    let listImg = [{ img: canvas.toDataURL('image/jpeg', 0.4), updateTime: 0 }];

   //    if (videoRef.current.duration / 300 > 1)
   //       tempPic = tempPic + ((videoRef.current.duration - 300) / 60) * 8;
   //    else if (videoRef.current.duration < 60) {
   //       tempPic = videoRef.current.duration * 2;
   //    } else if (videoRef.current.duration < 300) tempPic = videoRef.current.duration;

   //    const jump = videoRef.current.duration / tempPic;

   //    let tempTimeCurrent = -1;

   //    const myTimer = () => {
   //       if (tempTimeSaveRef.current > videoRef.current.duration) {
   //          console.log(listImg);

   //          clearInterval(uniqueInterval);
   //          tempTimeSaveRef.current = 0;
   //          function handleAxios() {
   //             const NUMBER = 18;

   //             const loadUser = async (min, max) => {
   //                console.log(min, max);

   //                await axios.post(`${apiUrl}/product_details`, {
   //                   productId: `644ffcfbdc6b6409b35dc7c6`,
   //                   image: listImg.slice(min, max),
   //                });
   //             };

   //             listImg.forEach(async (temp, index) => {
   //                await loadUser(index * NUMBER, (index + 1) * NUMBER).then(() => {});
   //             });
   //          }

   //          handleAxios();
   //       }

   //       if (tempTimeCurrent !== tempTimeSaveRef.current)
   //          videoRef.current.currentTime = tempTimeSaveRef.current;

   //       tempTimeCurrent = tempTimeSaveRef.current;

   //       videoRef.current.onseeked = () => {
   //          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   //          const tempImg = canvas.toDataURL('image/jpeg', 0.5);
   //          listImg.push({ img: tempImg, updateTime: tempTimeSaveRef.current });
   //          tempTimeSaveRef.current += jump;
   //       };
   //    };

   //    const uniqueInterval = setInterval(() => {
   //       myTimer();
   //    }, (tempPic * 5) / jump);
   // };

   const handleAutoProgress = () => {
      const widthProgress = progressRefRef.current.getBoundingClientRect().width;

      curIntervalRef.current = setInterval(() => {
         let moveProgress = videoRef.current.currentTime / videoRef.current.duration;

         if (moveProgress > 1) {
            moveProgress = 1;
         } else if (moveProgress < 0) {
            moveProgress = 0;
         }

         tempCurrentRef.current = videoRef.current.currentTime;

         progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
         progressBall.current.style.transform = `translateX(calc(${
            moveProgress * 100
         }% - var(--size-ball-progress) / 2))`;
      }, (videoRef.current.duration * 650) / widthProgress);
   };

   const handleMoveProgress = useCallback((e) => {
      const leftProgress = progressRefRef.current.getBoundingClientRect().left;
      const widthProgress = progressRefRef.current.getBoundingClientRect().width;

      let moveProgress = (e.clientX - leftProgress) / widthProgress;

      if (moveProgress > 1) {
         moveProgress = 1;

         tempCurrentRef.current = moveProgress * (videoRef.current.duration - 0.001);

         timeCurrentRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;
         curTimeImgRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;

         progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
         progressBall.current.style.transform = `translateX(calc(${
            moveProgress * 100
         }% - var(--size-ball-progress) / 2))`;

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
      }% - var(--size-ball-progress) / 2))`;
   }, []);

   const handlePreviewVideo = useCallback((e) => {
      curImgWrapperRef.current.style.display = 'block';

      const leftProgress = progressRefRef.current.getBoundingClientRect().left;
      const widthProgress = progressRefRef.current.getBoundingClientRect().width;

      let moveProgress = (e.clientX - leftProgress) / widthProgress;

      videoPreviewRef.current = moveProgress * videoRef.current.duration;

      curImgWrapperRef.current.style.transform = `translateX(calc(${moveProgress * 100}% - ${
         144 / 2
      }px))`;

      if (
         curImgRef.current.getBoundingClientRect().left <=
         progressRefRef.current.getBoundingClientRect().left
      ) {
         curImgWrapperRef.current.style.transform = `translateX(0)`;
      } else if (
         curImgRef.current.getBoundingClientRect().right >=
         progressRefRef.current.getBoundingClientRect().right
      ) {
         curImgWrapperRef.current.style.transform = `translateX(calc(${100}% - 144px))`;
      }

      if (videoPreviewRef.current <= 0) {
         videoPreviewRef.current = 0;
      } else if (videoPreviewRef.current >= videoRef.current.duration) {
         videoPreviewRef.current = videoRef.current.duration;
      }

      previewListRef.current.find((element) => {
         if (element.updateTime >= videoPreviewRef.current) {
            curImgRef.current.style.backgroundImage = `url('${element.img}')`;
            if (dragVideoRef.current) {
               modalPreviewRef.current.style.visibility = 'visible';
               modalPreviewRef.current.style.backgroundImage = `url('${element.img}')`;
            }
            return true;
         }
         return false;
      });

      curTimeImgRef.current.innerHTML = `${convertTime(videoPreviewRef.current)}`;
   }, []);

   const handleMousUpProgress = () => {
      if (dragVideoRef.current) {
         curImgWrapperRef.current.style.display = 'none';

         // setShowControl(1);

         if (cur_play_pause_Ref.current || isEndedRef.current) {
            setPlay(1);
            videoRef.current.play();
         }

         modalPreviewRef.current.style.visibility = 'hidden';

         videoRef.current.currentTime = tempCurrentRef.current;

         if (
            videoRef.current.buffered.end(tempBufferedRef.current) < videoRef.current.currentTime ||
            videoRef.current.buffered.start(tempBufferedRef.current) > videoRef.current.currentTime
         ) {
            for (let i = 0; i < videoRef.current.buffered.length; i++) {
               if (
                  videoRef.current.buffered.start(i) <= videoRef.current.currentTime &&
                  videoRef.current.buffered.end(i) >= videoRef.current.currentTime
               ) {
                  tempBufferedRef.current = i;
                  progressBuffered.current.style.transform = `scaleX(${
                     videoRef.current.buffered.end(i) / videoRef.current.duration
                  })`;
                  break;
               }
            }
         }

         if (!hoverProgress.current) {
            mainProgressfRef.current.style.transform = 'scaleY(0.5)';
            progressBall.current.style.visibility = 'hidden';
            progressBallMain.current.style.height = '2px';
            progressBallMain.current.style.width = '2px';

            progressCurrent.current.style.transition = `transform 0.1s cubic-bezier(0, 0, 0.2, 1),
      -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1)`;
            progressBall.current.style.transition = `transform 0.1s cubic-bezier(0, 0, 0.2, 1),
      -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1)`;
         }

         dragVideoRef.current = false;
      }
   };

   const handleMouseMoveProgress = useCallback(
      (e) => {
         if (dragVideoRef.current) {
            handleMoveProgress(e);
            handlePreviewVideo(e);
         }
      },
      [handleMoveProgress, handlePreviewVideo],
   );

   const handleVolumeChange = useCallback(() => {
      if (volume === 0) {
         volumeProgressCurrentRef.current.style.transform = `scaleX(1)`;
         volumeProgressBallRef.current.style.transform = `translateX(calc(100% + var(--size-ball-progress) / -2))`;
         volumeClrearRef.current.children[0].style.height = '0%';
         setVolume(volumeCurRef.current);
      } else {
         volumeProgressCurrentRef.current.style.transform = `scaleX(0)`;
         volumeProgressBallRef.current.style.transform = `translateX(calc(var(--size-ball-progress) / -2))`;
         volumeClrearRef.current.children[0].style.height = '100%';
         setVolume(0);
      }
   }, [volume]);

   const handleMouseUpVolume = () => {
      if (dragVolumeRef.current) {
         // volumeProgressRef.current.style.width = '0';

         // setShowControl(1);
         dragVolumeRef.current = false;
      }
   };

   const handleMouseMoveVolume = (e) => {
      if (dragVolumeRef.current) {
         const leftVolume = volumeProgressRef.current.getBoundingClientRect().left;
         const widthVolumeBall = ballVolumeRef.current.getBoundingClientRect().width;
         const widthVolume =
            volumeProgressRef.current.getBoundingClientRect().width - widthVolumeBall;

         let moveVolume = (e.clientX - leftVolume - widthVolumeBall / 2) / widthVolume;

         if (moveVolume < 0) {
            moveVolume = 0;
            setVolume(0);
         } else if (moveVolume < 0.5 && moveVolume > 0) {
            setVolume(1);
         } else if (moveVolume > 0.5) {
            setVolume(2);
         }

         if (moveVolume > 1) {
            moveVolume = 1;
         }

         volumeCurRef.current = moveVolume;
         videoRef.current.volume = moveVolume;

         volumeProgressCurrentRef.current.style.transform = `scaleX(${moveVolume})`;
         volumeProgressBallRef.current.style.transform = `translateX(calc(${
            moveVolume * 100
         }% + var(--size-ball-progress) / -2))`;
      }
   };

   const handleKeyMoveProgress = (e) => {
      if (e.keyCode === 39) {
         tempCurrentRef.current = tempCurrentRef.current + 5;
         let moveProgress = tempCurrentRef.current / videoRef.current.duration;

         if (moveProgress >= 1) {
            moveProgress = 1;

            tempCurrentRef.current = videoRef.current.duration;

            timeCurrentRef.current.innerHTML = `${convertTime(videoRef.current.duration)}`;
            curTimeImgRef.current.innerHTML = `${convertTime(videoRef.current.duration)}`;

            progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
            progressBall.current.style.transform = `translateX(calc(${
               moveProgress * 100
            }% - var(--size-ball-progress) / 2))`;

            videoRef.current.currentTime = videoRef.current.duration;

            return;
         } else if (moveProgress < 0) {
            moveProgress = 0;
            tempCurrentRef.current = 0;
         }

         timeCurrentRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;
         curTimeImgRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;

         progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
         progressBall.current.style.transform = `translateX(calc(${
            moveProgress * 100
         }% - var(--size-ball-progress) / 2))`;

         videoRef.current.currentTime = tempCurrentRef.current;
      }

      if (e.keyCode === 37) {
         tempCurrentRef.current -= 5;
         let moveProgress = tempCurrentRef.current / videoRef.current.duration;

         if (moveProgress >= 1) {
            moveProgress = 1;

            tempCurrentRef.current = videoRef.current.duration;

            timeCurrentRef.current.innerHTML = `${convertTime(videoRef.current.duration)}`;
            curTimeImgRef.current.innerHTML = `${convertTime(videoRef.current.duration)}`;

            progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
            progressBall.current.style.transform = `translateX(calc(${
               moveProgress * 100
            }% - var(--size-ball-progress) / 2))`;

            videoRef.current.currentTime = videoRef.current.duration;

            return;
         } else if (moveProgress < 0) {
            moveProgress = 0;
            tempCurrentRef.current = 0;
         }

         timeCurrentRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;
         curTimeImgRef.current.innerHTML = `${convertTime(tempCurrentRef.current)}`;

         progressCurrent.current.style.transform = `scaleX(${moveProgress})`;
         progressBall.current.style.transform = `translateX(calc(${
            moveProgress * 100
         }% - var(--size-ball-progress) / 2))`;

         videoRef.current.currentTime = tempCurrentRef.current;

         if (isEndedRef.current) {
            setPlay(1);
         }
      }
   };

   const handleKeyVolume = (e) => {
      if (focusVideoRef.current || screenStateRef.current === 1) {
         if (e.keyCode === 38) {
            e.preventDefault();

            volumeCurRef.current += 0.05;

            if (volumeCurRef.current >= 1) {
               volumeCurRef.current = 1;
            }

            if (volumeCurRef.current < 0.5 && volumeCurRef.current > 0) {
               setVolume(1);
            } else if (volumeCurRef.current > 0.5) {
               setVolume(2);
            }

            videoRef.current.volume = volumeCurRef.current;

            volumeProgressCurrentRef.current.style.transform = `scaleX(${volumeCurRef.current})`;
            volumeProgressBallRef.current.style.transform = `translateX(calc(${
               volumeCurRef.current * 100
            }% + var(--size-ball-progress) / -2))`;
         }

         if (e.keyCode === 40) {
            e.preventDefault();

            volumeCurRef.current -= 0.05;

            if (volumeCurRef.current < 0) {
               volumeCurRef.current = 0;
               setVolume(0);
            } else if (volumeCurRef.current < 0.5 && volumeCurRef.current > 0) {
               setVolume(1);
            } else if (volumeCurRef.current > 0.5) {
               setVolume(2);
            }

            videoRef.current.volume = volumeCurRef.current;

            volumeProgressCurrentRef.current.style.transform = `scaleX(${volumeCurRef.current})`;
            volumeProgressBallRef.current.style.transform = `translateX(calc(${
               volumeCurRef.current * 100
            }% + var(--size-ball-progress) / -2))`;
         }
      }
   };

   useEffect(() => {
      if (volume === 0) {
         videoRef.current.volume = 0;
         volumeClrearRef.current.children[0].style.height = '100%';
      } else {
         videoRef.current.volume = volumeCurRef.current;
         volumeClrearRef.current.children[0].style.height = '0%';
      }

      volumeRef.current.onclick = handleVolumeChange;

      volumeRef.current.onkeyup = (e) => {
         e.preventDefault();
      };

      volumeRef.current.onmouseenter = () => {
         volumeProgressRef.current.style.width = 'calc(54px + var(--size-ball-progress))';
      };

      volumeProgressRef.current.onmouseenter = () => {
         volumeProgressRef.current.style.width = 'calc(54px + var(--size-ball-progress))';
      };

      volumeRef.current.onmouseleave = () => {
         if (!dragVolumeRef.current) volumeProgressRef.current.style.width = '0';
      };

      volumeProgressRef.current.onmouseleave = () => {
         if (!dragVolumeRef.current) volumeProgressRef.current.style.width = '0';
      };
   }, [volume, handleVolumeChange]);

   useEffect(() => {
      videoRef.current.ontimeupdate = () => {
         timeCurrentRef.current.innerHTML = `${convertTime(videoRef.current.currentTime)}`;
      };

      // const loadUser = async () => {
      //    const response = await axios.get(`${apiUrl}/product_details`);
      //    response.data.product_details.foreach((element) => {
      //       previewListRef.current = previewListRef.current.concat(element.image);
      //    });

      //    previewListRef.current = previewListRef.current.sort(
      //       (a, b) => a.updateTime - b.updateTime,
      //    );
      // };
      // loadUser();

      // videoRef.current.playbackRate = 1.25;

      // setTimeout(() => {
      //    captureImage();
      // }, 10000);
   }, []);

   const handleScreen = () => {
      if (screenStateRef.current === 0) {
         setScreenVideo(1);
         screenStateRef.current = 1;

         if (wrapperVideoRef.current.requestFullscreen) {
            wrapperVideoRef.current.requestFullscreen();
         } else if (wrapperVideoRef.current.webkitRequestFullscreen) {
            /* Safari */
            wrapperVideoRef.current.webkitRequestFullscreen();
         } else if (wrapperVideoRef.current.msRequestFullscreen) {
            /* IE11 */
            wrapperVideoRef.current.msRequestFullscreen();
         }
      } else if (screenStateRef.current === 1) {
         screenStateRef.current = 0;
         setScreenVideo(0);

         if (document.exitFullscreen) {
            document.exitFullscreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
         } else if (document.msExitFullscreen) {
            window.top.document.msExitFullscreen();
         }
      }
   };

   useEffect(() => {
      screenRef.current.onclick = handleScreen;
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
         if (
            !videoRef.current.paused &&
            !dragVideoRef.current &&
            !dragVolumeRef.current &&
            !hoverProgress.current
         ) {
            setShowControl(1);
         } else setShowControl(2);
      };

      watchRef.current.onclick = () => {
         if (!videoRef.current.paused) {
            setShowControl(1);
         } else setShowControl(2);
      };

      watchRef.current.onmouseleave = () => {
         if (
            !videoRef.current.paused &&
            !dragVideoRef.current &&
            !dragVolumeRef.current &&
            !hoverProgress.current
         ) {
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

      videoRef.current.ondblclick = (e) => {
         handleScreen(e);
      };

      modalControlRef.current.onclick = (e) => {
         handlePlayAndPaus(e);
      };

      modalControlRef.current.ondblclick = (e) => {
         handleScreen(e);
      };

      if (effectPlayRef.current) {
         effectPlayRef.current.onclick = (e) => {
            handlePlayAndPaus(e);
         };

         effectPlayRef.current.ondblclick = (e) => {
            handleScreen(e);
         };
      }

      window.onkeypress = (e) => {
         if (e.keyCode === 32) {
            handlePlayAndPaus(e);
            if (videoRef.current.paused) {
               setShowControl(1);
            } else setShowControl(2);
         }

         if (e.keyCode === 102) {
            handleScreen();
         }
      };

      window.onkeydown = (e) => {
         handleKeyVolume(e);
         handleKeyMoveProgress(e);
      };

      videoRef.current.oncanplay = (e) => {
         timeDurationRef.current.innerHTML = `${convertTime(videoRef.current.duration)}`;

         progressBuffered.current.style.transform = `scaleX(${
            videoRef.current.buffered.end(tempBufferedRef.current) / videoRef.current.duration
         })`;
      };

      videoRef.current.onplay = () => {
         handleAutoProgress();
         isEndedRef.current = false;
      };

      videoRef.current.onpause = (e) => {
         isEndedRef.current = false;
      };

      videoRef.current.onended = (e) => {
         setPlay(2);

         isEndedRef.current = true;

         if (dragVideoRef.current) {
            videoRef.current.autoplay = false;
         }
         setShowControl(2);
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

         if (!curImgWrapperRef.current.contains(e.target))
            curImgWrapperRef.current.style.display = 'block';
         else if (!dragVideoRef.current) curImgWrapperRef.current.style.display = 'none';

         hoverProgress.current = true;
      };

      progressRefRef.current.onmouseleave = (e) => {
         if (!dragVideoRef.current) {
            mainProgressfRef.current.style.transform = 'scaleY(0.5)';
            progressBall.current.style.visibility = 'hidden';
            progressBallMain.current.style.height = '2px';
            progressBallMain.current.style.width = '2px';
         }

         curImgWrapperRef.current.style.display = 'none';

         hoverProgress.current = false;
      };

      volumeProgressRef.current.onmousedown = (e) => {
         dragVolumeRef.current = true;
         handleMouseMoveVolume(e);
      };

      progressRefRef.current.onmousedown = (e) => {
         dragVideoRef.current = true;

         clearTimeout(curIntervalRef.current);

         progressCurrent.current.style.transition = `none`;
         progressBall.current.style.transition = `none`;

         if (!videoRef.current.paused) cur_play_pause_Ref.current = true;
         else cur_play_pause_Ref.current = false;

         videoRef.current.pause();

         handleMoveProgress(e);
         handlePreviewVideo(e);
      };

      document.onmousemove = (e) => {
         handleMouseMoveProgress(e);
         handleMouseMoveVolume(e);
      };

      videoRef.current.onprogress = () => {
         if (videoRef.current.buffered.length > tempBufferedRef.current) {
            if (
               videoRef.current.buffered.end(tempBufferedRef.current) <
                  videoRef.current.currentTime ||
               videoRef.current.buffered.start(tempBufferedRef.current) >
                  videoRef.current.currentTime
            ) {
               for (let i = 0; i < videoRef.current.buffered.length; i++) {
                  if (
                     videoRef.current.buffered.start(i) <= videoRef.current.currentTime &&
                     videoRef.current.buffered.end(i) >= videoRef.current.currentTime
                  ) {
                     tempBufferedRef.current = i;
                     progressBuffered.current.style.transform = `scaleX(${
                        videoRef.current.buffered.end(tempBufferedRef.current) /
                        videoRef.current.duration
                     })`;
                     break;
                  }
               }
            }
         }
      };

      document.onmouseup = (e) => {
         if (dragVideoRef.current || dragVolumeRef.current) {
            setTimeout(() => {
               if (!watchRef.current.contains(e.target)) {
                  if (!videoRef.current.paused) setShowControl(0);
               } else setShowControl(1);
            }, 0);
         }

         handleMouseUpVolume();
         handleMousUpProgress();

         if (watchRef.current.contains(e.target)) {
            focusVideoRef.current = true;
         } else focusVideoRef.current = false;
      };
   }, [handleMouseMoveProgress, handleMoveProgress, handlePreviewVideo]);

   return (
      <div ref={watchRef} className={cx('wrapper')}>
         <div ref={wrapperVideoRef} className={cx('watch')}>
            <video ref={videoRef} src={videoSrc}></video>
            <div ref={modalPreviewRef} className={cx('modal-previews')}></div>
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
                  <div className={cx('inner-icon', 'left')}>
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
                        {volume === 0 ? (
                           <div className={cx('none-volume')}>
                              <RiVolumeUpFill />
                           </div>
                        ) : volume === 1 ? (
                           <RiVolumeDownFill />
                        ) : (
                           <RiVolumeUpFill />
                        )}
                        <div ref={volumeClrearRef} className={cx('none-volume-clear')}>
                           <div></div>
                        </div>
                     </button>

                     <div ref={volumeProgressRef} className={cx('volume-progress')}>
                        <div>
                           <div ref={volumeProgressMainRef} className={cx('volume-progress__main')}>
                              <div
                                 ref={volumeProgressCurrentRef}
                                 className={cx('volume-progress__current')}
                              ></div>
                           </div>
                           <div
                              ref={volumeProgressBallRef}
                              className={cx('volume-progress__ball-wrapper')}
                           >
                              <div
                                 ref={ballVolumeRef}
                                 className={cx('volume-progress__ball')}
                              ></div>
                           </div>
                        </div>
                     </div>

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
                  <div className={cx('inner-icon', 'right')}>
                     <button className={cx('btn_setting')}>
                        <AiFillSetting />
                     </button>
                     <button ref={screenRef} className={cx('btn_full-screen')}>
                        {screenVideo === 0 ? <BiFullscreen /> : <BiExitFullscreen />}
                     </button>
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
