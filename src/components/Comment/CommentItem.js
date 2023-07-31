import { useState, useEffect, useRef, memo } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import classNames from 'classnames/bind';

import { AiOutlineLike, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

import Button from '../Button';
import imgs from '~/assets/img';
import styles from './Comment.module.scss';
import { validateTime } from '~/utils/validated';
import CommentLists from './CommentList';
import CommentWrite from './CommentWrite';

const cx = classNames.bind(styles);

function CommentItem({
   data = { _name: '', img: '', content: '', likes: 0, replies: 0, createdAt: 'vừa xong' },
   modeReply = false,
   ...passProp
}) {
   const classes = cx('wrapper', {
      modeReply,
      ...passProp,
   });

   const socket = io('http://localhost:3001');

   const [showReplies, setShowReplies] = useState(false);
   const [showReplyWrite, setShowReplyWrite] = useState(false);
   const [comments, setComments] = useState([]);

   const [time, setTime] = useState(0);
   const timeRef = useRef(0);
   const btnReplyRef = useRef();
   const btnShowReplyRef = useRef();

   const childRef = useRef(null);

   const handleShowAndHideReplyWrite = () => {
      setShowReplyWrite(false);
   };

   const fetchComments = async () => {
      try {
         const response = await axios.get('http://localhost:5000/api/comments', {
            params: {
               parentID: '648abc185aa4a2ca9704cb5e',
            },
         });

         var newComments = [];

         response.data.comments.forEach((element) => {
            newComments = [...newComments, element.comment_details];
         });

         setComments(newComments);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      timeRef.current = validateTime(data.createdAt).realValue;

      const curInterVal = setInterval(() => {
         setTime((prev) => -prev);
      }, timeRef.current);

      return () => {
         clearInterval(curInterVal);
      };
   }, [time]);

   useEffect(() => {
      if (showReplies && comments.length <= 0) {
         fetchComments();
      }

      if (btnShowReplyRef.current) {
         btnShowReplyRef.current.onclick = () => {
            setShowReplies((prev) => !prev);
         };
      }
   }, [showReplies]);

   useEffect(() => {
      btnReplyRef.current.onclick = () => {
         setShowReplyWrite(true);
         if (childRef.current) childRef.current.handleFocusTextAria();
      };
   }, []);

   return (
      <div className={classes} {...passProp}>
         <div className={cx('inner-top')}>
            <div className={cx('comment-left')}>
               <div className={cx('avata')}>
                  <img
                     className={cx('avt')}
                     src={data.img}
                     alt=""
                     onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = imgs.noImage;
                     }}
                  />
               </div>
            </div>
            <div className={cx('comment-right')}>
               <div className={cx('info')}>
                  <span className={cx('string-formatted strong small')}>{data._name}</span>
                  <span className={cx('string-fomatted')}> </span>
                  <span className={cx('string-formatted very-small blur')}>
                     {(validateTime(data.createdAt).value || '') +
                        ' ' +
                        validateTime(data.createdAt).unit}
                  </span>
               </div>
               <div className={cx('content')}>{data.content}</div>
            </div>
         </div>
         <div className={cx('inner-bottom')}>
            <div className={cx('controls')}>
               <div>
                  <Button className={cx('like')} transparent hover>
                     <AiOutlineLike></AiOutlineLike>
                  </Button>
                  <span className={cx('string-fomatted')}>{data.likes}</span>
               </div>
               <Button ref={btnReplyRef} className={cx('reply')} transparent hover>
                  Phản hồi
               </Button>
            </div>
            <div className={cx('options')}></div>

            {showReplyWrite && (
               <div className={cx('wrapper-comment__write')}>
                  <CommentWrite
                     ref={childRef}
                     modeReply
                     handleShowAndHideReplyWrite={handleShowAndHideReplyWrite}
                  ></CommentWrite>
               </div>
            )}

            {data.replies > 0 && !modeReply && (
               <div className={cx('replies')}>
                  <div className={cx('reply-header')}>
                     <Button
                        ref={btnShowReplyRef}
                        className={cx('show-reply')}
                        leftIcon={!showReplies ? <AiOutlineDown /> : <AiOutlineUp />}
                        hover
                        transparent
                     >
                        4 phản hồi
                     </Button>
                  </div>

                  {showReplies && <CommentLists comments={comments} modeReply />}
               </div>
            )}
         </div>
      </div>
   );
}

export default memo(CommentItem);
