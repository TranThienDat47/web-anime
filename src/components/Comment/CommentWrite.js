import { forwardRef, useEffect, useImperativeHandle, useRef, useState, memo } from 'react';
import classNames from 'classnames/bind';

import Button from '../Button';

import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

const CommentWrite = forwardRef(
   (
      {
         handleComment = () => {},
         modeReply = false,
         handleShowAndHideReplyWrite = () => {},
         ...passProp
      },
      ref,
   ) => {
      const classes = cx('wrapper', {
         modeReply,
         ...passProp,
      });

      const [possibleComment, setPossibleComment] = useState(false);
      const [commentValue, setCommentValue] = useState('');
      const ariaCommentRef = useRef();
      const btnRefreshRef = useRef();
      const btnCancelRef = useRef();
      const sendCommentRef = useRef();

      const handleInput = (e) => {
         setCommentValue(e.target.innerText.trim());
      };

      const handleRefresh = (e) => {
         setCommentValue('');

         ariaCommentRef.current.innerText = '';
         ariaCommentRef.current.focus();
      };

      useEffect(() => {
         if (commentValue) setPossibleComment(true);
         else setPossibleComment(false);

         ariaCommentRef.current.oninput = (e) => {
            handleInput(e);
         };

         ariaCommentRef.current.onblur = () => {};

         btnRefreshRef.current.onclick = () => {
            handleRefresh();
         };

         sendCommentRef.current.onclick = () => {
            handleComment(commentValue);

            handleRefresh();
         };
      }, [commentValue, handleComment]);

      useEffect(() => {
         if (modeReply) ariaCommentRef.current.focus();
         if (btnCancelRef.current) btnCancelRef.current.onclick = handleShowAndHideReplyWrite;
      }, []);

      useImperativeHandle(ref, () => ({
         handleFocusTextAria() {
            ariaCommentRef.current.focus();
         },
      }));

      return (
         <div ref={ref} className={classes}>
            <div className={cx('inner-top')}>
               <div className={cx('comment-left')}>
                  <div className={cx('avata')}>
                     <img
                        src="https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg"
                        alt=""
                        className={cx('avt')}
                     />
                  </div>
               </div>
               <div className={cx('comment-right', 'write-comment')}>
                  <div
                     ref={ariaCommentRef}
                     contentEditable="true"
                     className={cx('comment-content')}
                  ></div>
                  <div className={cx('write-comment--controls')}>
                     <div className={cx('control-left')}></div>
                     <div className={cx('control-right')}>
                        {modeReply && (
                           <Button
                              ref={btnCancelRef}
                              transparent
                              hover
                              className={cx('btn-cancle')}
                           >
                              hủy
                           </Button>
                        )}
                        <Button
                           ref={btnRefreshRef}
                           disable={!possibleComment}
                           transparent
                           hover
                           className={cx('btn-cancle')}
                        >
                           làm mới
                        </Button>
                        <Button
                           ref={sendCommentRef}
                           primary
                           transparent
                           disable={!possibleComment}
                           className={cx('btn-comment')}
                        >
                           Bình luận
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   },
);

export default memo(CommentWrite);
