import { memo } from 'react';
import CommentItem from './CommentItem';

function CommentLists({ comments = [], modeReply = false }) {
   return (
      <>
         {comments.map((comment) => (
            <CommentItem key={comment._id} data={comment} modeReply={modeReply}></CommentItem>
         ))}
      </>
   );
}

export default memo(CommentLists);
