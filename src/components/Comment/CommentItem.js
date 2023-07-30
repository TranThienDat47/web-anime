import { useState, useEffect, useRef, memo } from 'react';

import classNames from 'classnames/bind';

import { AiOutlineLike } from 'react-icons/ai';

import Button from '../Button';
import imgs from '~/assets/img';
import styles from './Comment.module.scss';
import { validateTime } from '~/utils/validated';

const cx = classNames.bind(styles);

function CommentItem({
   data = { _name: '', img: '', content: '', countLikes: 0, countReplys: 0, createdAt: 'vừa xong' },
}) {
   const [time, setTime] = useState(0);
   const timeRef = useRef(0);

   console.log('chileged comment');

   useEffect(() => {
      const curInterVal = setInterval(() => {
         setTime((prev) => prev + 1);
      }, 60000);

      return () => {
         clearInterval(curInterVal);
      };
   }, [time]);

   return (
      <div className={cx('wrapper')}>
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
                  <span className={cx('string-fomatted')}>{data.countLikes}</span>
               </div>
               <Button className={cx('reply')} transparent hover>
                  Phản hồi
               </Button>
            </div>
            <div className={cx('options')}></div>
         </div>
      </div>
   );
}

export default memo(CommentItem);
