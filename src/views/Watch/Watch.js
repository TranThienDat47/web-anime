import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import { Comment } from '~/components/Comment';

import classNames from 'classnames/bind';
import styles from './Watch.module.scss';
import { GlobalContext } from '~/contexts/global';

import Video from '~/components/Video/index';
import imgs from '~/assets/img';
import { converterDate, converterDateTitle, formattedEpisodes } from '~/utils/validated';
import { ProductItem } from '~/components/ProductItem';

const cx = classNames.bind(styles);

const Watch = ({ parent_id }) => {
   const {
      globalState: { productCurrent, loading },
      setProductCurrent,
   } = useContext(GlobalContext);

   const [productCurrentState, setProductCurrentState] = useState({});
   const wrapperRef = useRef(null);
   const childRef = useRef(null);

   useEffect(() => {
      wrapperRef.current.onscroll = () => {
         childRef.current.handleScroll(wrapperRef.current);
      };
   }, []);

   return (
      <div ref={wrapperRef} className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('wrapper_of_block', 'top')}>
               <div className={cx('wrapper_video')}>
                  <Video></Video>
               </div>
            </div>
            <div className={cx('page-body')}>
               <div className={cx('body-left')}>
                  <div>
                     <div className={cx('wrapper_of_block', 'container', 'wrapper_detail')}>
                        <div className={cx('detail')}>
                           <div className={cx('inf__header')}>
                              <span className={cx('string-formatted')}>132N lượt xem</span>
                              <span className={cx('string-formatted')}> - </span>
                              <span className={cx('string-formatted')}>
                                 {converterDateTitle(productCurrentState.createdAt)}
                              </span>
                           </div>
                           <div className={cx('wrapper-count', 'description', 'mrg-b-3')}>
                              <span className={cx('string-formatted strong flex-shink-0')}>
                                 Nội dung phim:
                              </span>
                              <span className={cx('string-formatted')}> </span>
                              <div
                                 className={cx(
                                    'string-formatted',
                                    'content-empty w-100 h-20',
                                    'text-align-justify',
                                 )}
                              >
                                 {loading ? '' : productCurrentState.description}
                              </div>
                           </div>

                           <div className={cx('wrapper-count', 'date', 'mrg-b-3')}>
                              <span className={cx('string-formatted strong flex-shink-0')}>
                                 Ngày phát hành:
                              </span>
                              <span className={cx('string-formatted')}> </span>
                              <div
                                 className={cx(
                                    'string-formatted',
                                    'content-empty w-100 h-20',
                                    'text-align-justify',
                                 )}
                              >
                                 {loading ? '' : productCurrentState.releaseDate}
                              </div>
                           </div>

                           <div className={cx('wrapper-count', 'country', 'mrg-b-3')}>
                              <span className={cx('string-formatted strong flex-shink-0')}>
                                 Quốc gia:
                              </span>
                              <span className={cx('string-formatted')}> </span>
                              <div
                                 className={cx(
                                    'string-formatted',
                                    'content-empty w-100 h-20',
                                    'text-align-justify',
                                 )}
                              >
                                 {loading ? '' : productCurrentState.country_Of_Origin}
                              </div>
                           </div>

                           <div className={cx('wrapper-count', 'status', 'mrg-b-3')}>
                              <span className={cx('string-formatted strong flex-shink-0')}>
                                 Trạng thái:
                              </span>
                              <span className={cx('string-formatted')}> </span>
                              <div
                                 className={cx(
                                    'string-formatted',
                                    'content-empty w-100 h-20',
                                    'text-align-justify',
                                 )}
                              >
                                 Đã hoàn thành
                              </div>
                           </div>
                           <div className={cx('wrapper-count', 'episode', 'mrg-b-3')}>
                              <span className={cx('string-formatted strong flex-shink-0')}>
                                 Số tập:
                              </span>
                              <span className={cx('string-formatted')}> </span>
                              <div
                                 className={cx(
                                    'string-formatted',
                                    'content-empty w-100 h-20',
                                    'text-align-justify',
                                 )}
                              >
                                 {loading ? '' : productCurrentState.currentEpisodes}/
                                 {loading ? '' : productCurrentState.episodes}
                              </div>
                           </div>

                           <div className={cx('wrapper-count', 'categories')}>
                              <span className={cx('string-formatted strong')}>Thể loại:</span>
                              <span className={cx('string-formatted')}> </span>
                              <div
                                 className={cx(
                                    'string-formatted',
                                    'content-empty w-100 h-20',
                                    'text-align-justify',
                                 )}
                              >
                                 {productCurrentState.categories &&
                                    productCurrentState.categories.map((element, index) =>
                                       index === 0 ? element.title : ', ' + element.title,
                                    )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={cx('wrapper_of_block', 'container')}>
                     <div className={cx('header-inner eposide__header')}>
                        <span className={cx('string-formatted strong')}>Chọn tập</span>
                     </div>
                     <div className={cx('list-episodes')}>
                        {productCurrent.product_details &&
                        productCurrent.product_details.length > 0 ? (
                           formattedEpisodes(productCurrent.product_details).map(
                              (element, index) => (
                                 <Link
                                    to={'#'}
                                    key={element.episode}
                                    className={cx('item-episodes')}
                                 >
                                    {element.episode}
                                 </Link>
                              ),
                           )
                        ) : (
                           <div>Hiện chưa có tập phim nào</div>
                        )}
                     </div>
                  </div>

                  <Comment key={parent_id} ref={childRef} parent_id={parent_id}></Comment>
               </div>
               <div className={cx('body-right')}>
                  <div className={cx('heading_of_block')}>
                     <h3 className={cx('title')}>Đề xuất</h3>
                  </div>
                  <div className={cx('sperator')}></div>
                  <div className={cx('wrapper_of_block', 'container', 'no-margin-top')}>
                     <div className={cx('recommend')}>
                        <div className={cx('productTest')}>
                           <ProductItem></ProductItem>
                        </div>
                        <div className={cx('productTest')}>
                           <ProductItem></ProductItem>
                        </div>
                        <div className={cx('productTest')}>
                           <ProductItem></ProductItem>
                        </div>
                        <div className={cx('productTest')}>
                           <ProductItem></ProductItem>
                        </div>
                        <div className={cx('productTest')}>
                           <ProductItem></ProductItem>
                        </div>
                        <div className={cx('productTest')}>
                           <ProductItem></ProductItem>
                        </div>
                        <div className={cx('productTest')}>
                           <ProductItem></ProductItem>
                        </div>
                        <div className={cx('productTest')}>
                           <ProductItem></ProductItem>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className={cx('footer_pseudo')}></div>
         </div>
      </div>
   );
};

export default Watch;
