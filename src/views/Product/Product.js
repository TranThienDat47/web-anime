import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from './Product.module.scss';
import { ProductItem } from '~/components/ProductItem';
import { CommentLists, CommentWrite } from '~/components/Comment';

import { AuthContext } from '~/contexts/auth';

const cx = classNames.bind(styles);

const Product = () => {
   const {
      authState: { user },
   } = useContext(AuthContext);

   const [comments, setComments] = useState([]);

   const socket = io('http://localhost:3001');

   const listEpisodes = new Array(100).fill(0);

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/comments', {
               params: {
                  parentID: '648abc185aa4a2ca9704cb5e',
               },
            });

            console.log(response);

            var newComments = [];

            response.data.comments.forEach((element) => {
               newComments = [...newComments, element.comment_details];
            });

            setComments(newComments);
         } catch (error) {
            console.error(error);
         }
      };
      fetchComments();
   }, []);

   useEffect(() => {
      socket.on('comment', (comment) => {
         setComments((prev) => [comment, ...prev]);
      });

      return () => {
         socket.disconnect();
      };
   }, [socket, comments]);

   console.log('parent comment');

   const handleComment = useCallback(
      (text) => {
         axios
            .post('http://localhost:5000/api/comments/6311a1f2f17c747a18307266', {
               parentID: '648abc185aa4a2ca9704cb5e',
               userID: user._id,
               content: text || ' ',
            })
            .then((response) => {
               const comment =
                  response.data.comments.comment_details[
                     response.data.comments.comment_details.length - 1
                  ];

               comment._name = user._name;
               comment.img = user.img;

               socket.emit('comment', comment);
            })
            .catch((error) => {});
      },
      [socket, comments, user],
   );

   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('wrapper_of_block', 'top')}>
                  <div className={cx('top__background')}>
                     <img
                        src="https://i.ytimg.com/vi/NYH7a2rB9P8/maxresdefault.jpg"
                        alt="Thieu nien ca hanh"
                     />
                     <div className={cx('background_modal')}></div>
                  </div>

                  <div className={cx('top__introduce')}>
                     <div className={cx('top__thumbnail')}>
                        <img
                           src="https://hhtq.vip/wp-content/uploads/2021/09/thieu-nien-ca-hanh-phan-2-1-1.jpg"
                           alt="Ko co gi"
                        />
                     </div>
                     <div className={cx('top__details')}>
                        <div className={cx('top__name')}>Thiếu niên ca hành (Phần 2)</div>
                        <div className={cx('top__another-name')}>
                           Thiếu niên bạch mã túy xuân phong
                        </div>

                        <div className={cx('top__details-inf')}>
                           <div className={cx('top__details-inf__content')}>
                              <div className={cx('count-date')}>
                                 <span>Ngày ra mắt:</span> <strong>10-01-2002</strong>
                              </div>
                              <div className={cx('count-episode')}>
                                 <span>Số tập:</span> <strong> 124/124</strong>
                              </div>
                              <div className={cx('count-views')}>
                                 <span>Số người theo dõi:</span> <strong> 123N</strong>
                              </div>
                           </div>
                           <div className={cx('others-controls')}>
                              <Button
                                 to={`/watch?${'juhhuhuhu'}`}
                                 primary
                                 className={cx('btn_follow')}
                              >
                                 Xem phim
                              </Button>
                              <Button grey className={cx('btn_follow')}>
                                 Xem sau
                              </Button>
                              <Button grey className={cx('btn_watching')}>
                                 Theo dõi
                              </Button>
                           </div>
                        </div>

                        <div className={cx('categories')}>
                           <div className={cx('categories-title')}>
                              <span>Thể loại:</span>
                           </div>
                           <div className={cx('categories-list')}>
                              <Link to="#">Hoạt hình trung quốc</Link>
                              <Link to="#">Cổ trang</Link>
                              <Link to="#">Trùng sinh</Link>
                           </div>
                        </div>
                     </div>
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
                                 <span className={cx('string-formatted')}>27 thg 10, 2020</span>
                              </div>
                              <div className={cx('description')}>
                                 <span className={cx('string-formatted strong')}>
                                    Nội dung phim:
                                 </span>
                                 <span className={cx('string-formatted')}> </span>
                                 <span className={cx('string-formatted')}>
                                    Sau khi Vong Ưu đại sư của Hàn Thủy Tự tọa hóa, một cỗ quan tài
                                    vàng thần bí nhập thế, vén lên phân tranh trong giang hồ. Thế
                                    lực các nơi đối chọi gay gắt, Lôi Vô Kiệt, Tiêu Sắt, Đường Liên,
                                    Tư Không Thiên Lạc, Thiên Nữ Nhụy lần lượt rơi vào phân tranh.
                                    Sách mã giang hồ mộng, ỷ kiếm đạp ca hành. Câu chuyện về bí mật
                                    của quan tài vàng dần dần được hé mở…
                                 </span>
                              </div>
                              <div className={cx('country')}>
                                 <span className={cx('string-formatted strong')}>Quốc gia:</span>
                                 <span className={cx('string-formatted')}> </span>
                                 <span className={cx('string-formatted')}>Trung quốc</span>
                              </div>
                              <div className={cx('date')}>
                                 <span className={cx('string-formatted strong')}>
                                    Ngày phát hành:
                                 </span>
                                 <span className={cx('string-formatted')}> </span>
                                 <span className={cx('string-formatted')}>10-01-2002</span>
                              </div>
                              <div className={cx('status')}>
                                 <span className={cx('string-formatted strong')}>Trạng thái:</span>
                                 <span className={cx('string-formatted')}> </span>
                                 <span className={cx('string-formatted')}>Đã hoàn thành</span>
                              </div>
                              <div className={cx('episode')}>
                                 <span className={cx('string-formatted strong')}>Số tập:</span>
                                 <span className={cx('string-formatted')}> </span>
                                 <span className={cx('string-formatted')}>124/124</span>
                              </div>

                              <div className={cx('categories')}>
                                 <span className={cx('string-formatted strong')}>Thể loại:</span>
                                 <span className={cx('string-formatted')}> </span>
                                 <span className={cx('string-formatted')}>
                                    Hoạt hình trung quốc, Viễn tưởng, Cổ trang
                                 </span>
                              </div>

                              <div className={cx('trailer')}>
                                 <span className={cx('string-formatted strong')}>
                                    Đoạn phim giới thiệu
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className={cx('wrapper_of_block', 'container')}>
                        <div className={cx('header-inner eposide__header')}>
                           <span className={cx('string-formatted strong')}>Chọn tập</span>
                        </div>
                        <div className={cx('list-episodes')}>
                           {listEpisodes.map((element, index) => (
                              <Link to={'#'} key={index} className={cx('item-episodes')}>
                                 {index < 10 ? '0' + index : index}
                              </Link>
                           ))}
                        </div>
                     </div>

                     <div className={cx('wrapper_of_block', 'container')}>
                        <div className={cx('comment')}>
                           <div className={cx('comment__header')}>
                              <div className={cx('header-inner')}>
                                 <span className={cx('string-formatted strong')}>
                                    2.369 bình luận
                                 </span>
                              </div>

                              <div className={cx('wrapper-comment')}>
                                 <div className={cx('comment-top')}>
                                    <CommentWrite handleComment={handleComment}></CommentWrite>
                                 </div>
                                 <div className={cx('comment-bottom')}>
                                    <CommentLists comments={comments}></CommentLists>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={cx('body-right')}>
                     <div className={cx('heading_of_block')}>
                        <h3 className={cx('title')}>Đề xuất</h3>
                     </div>
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
      </>
   );
};

export default Product;
