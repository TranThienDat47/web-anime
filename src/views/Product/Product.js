import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

const Product = () => {
   return (
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
                              <span>Lượt xem:</span> <strong> 123N</strong>
                           </div>
                        </div>
                        <div className={cx('others-controls')}>
                           <Button primary className={cx('btn_follow')}>
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
                        <div>Thể loại:</div>
                        <a href="#">Hoạt hình trung quốc</a>
                        <a href="#">Cổ trang</a>
                        <a href="#">Trùng sinh</a>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('wrapper_of_block', 'container')}>
               <div className={cx('detaill')}>
                  <div className={cx('categories')}>
                     "Hoạt hình trung quốc", "Viễn tưởng", "Cổ trang"
                  </div>
                  <div className={cx('country')}>Trung quốc</div>
                  <div className={cx('date')}>10-01-2002</div>
                  <div className={cx('status')}>Đã hoàn thành</div>
                  <div className={cx('episode')}>124/124</div>
                  <div className={cx('description')}>
                     Sau khi Vong Ưu đại sư của Hàn Thủy Tự tọa hóa, một cỗ quan tài vàng thần bí
                     nhập thế, vén lên phân tranh trong giang hồ. Thế lực các nơi đối chọi gay gắt,
                     Lôi Vô Kiệt, Tiêu Sắt, Đường Liên, Tư Không Thiên Lạc, Thiên Nữ Nhụy lần lượt
                     rơi vào phân tranh. Sách mã giang hồ mộng, ỷ kiếm đạp ca hành. Câu chuyện về bí
                     mật của quan tài vàng dần dần được hé mở…
                  </div>
               </div>
               <div className={cx('trailer')}></div>
               <div className={cx('episode-detail')}></div>
               <div className={cx('comment')}></div>
               <div className={cx('recommend')}></div>
            </div>
         </div>
      </div>
   );
};

export default Product;
