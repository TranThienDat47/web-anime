import { useState, useEffect, useRef, memo, useContext, useCallback } from 'react';
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
import { AuthContext } from '~/contexts/auth';

import CommentServices from '~/services/CommentServices';

const cx = classNames.bind(styles);

function CommentItem({
   data = { _id: '', _name: '', img: '', content: '', likes: 0, replies: 0, createdAt: 'vừa xong' },
   modeReply = false,
   ...passProp
}) {
   const classes = cx('wrapper', {
      modeReply,
      ...passProp,
   });

   const {
      authState: { user },
   } = useContext(AuthContext);

   const socket = io('http://localhost:3001');

   const [showReplies, setShowReplies] = useState(false);
   const [showReplyWrite, setShowReplyWrite] = useState(false);
   const [commentReplies, setCommentReplies] = useState([]);

   const [time, setTime] = useState(0);
   const timeRef = useRef(0);
   const btnReplyRef = useRef();
   const btnShowReplyRef = useRef();

   const childRef = useRef(null);

   const handleShowAndHideReplyWrite = () => {
      setShowReplyWrite(false);
   };

   const handleComment = useCallback(
      async (text) => {
         await CommentServices.addComment({
            parent_id: data._id,
            user_id: user._id,
            content: text || ' ',
            isReply: true,
         })
            .then((response) => {
               const comment =
                  response.comments.comment_details[response.comments.comment_details.length - 1];

               comment._name = user._name;
               comment.img = user.img;

               socket.emit('comment_reply', comment);

               data.replies++;
            })
            .catch((error) => {});
      },
      [socket, commentReplies],
   );

   const fetchComments = async () => {
      try {
         const response = await CommentServices.fetchComments({ parent_id: data._id });

         var newComments = [];

         response.comments.forEach((element) => {
            newComments = [...newComments, element.comment_details];
         });

         setCommentReplies(newComments);
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
      if (showReplies && commentReplies.length >= 0) {
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
         setShowReplies(true);
      };
   }, []);

   useEffect(() => {
      socket.on('comment_reply', (comment) => {
         setCommentReplies((prev) => [...prev, comment]);
         setShowReplies(true);
      });

      return () => {
         socket.disconnect();
      };
   }, [socket, data._id, commentReplies]);

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
                     handleComment={handleComment}
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
                        {showReplies && 'ẩn'} {data.replies} phản hồi
                     </Button>
                  </div>

                  {showReplies && <CommentLists comments={commentReplies} modeReply />}
               </div>
            )}
         </div>
      </div>
   );
}

export default memo(CommentItem);
