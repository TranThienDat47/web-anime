import CommentItem from './CommentItem';

function CommentLists({ comments = [], modeReply = false }) {
   return (
      <>
         {comments.map((comment, index) => (
            <CommentItem key={index} data={comment} modeReply={modeReply}></CommentItem>
         ))}
      </>
   );
}

export default CommentLists;
