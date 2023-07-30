import CommentItem from './CommentItem';

function CommentLists({ comments = [] }) {
   return (
      <>
         {comments.map((comment, index) => (
            <CommentItem key={index} data={comment}></CommentItem>
         ))}
      </>
   );
}

export default CommentLists;
