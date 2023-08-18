import axios from 'axios';

import { apiUrl } from '~/config/constants';

class CommentServices {
   async fetchComments({ parent_id = null, skip = null, limit = null, sort = 1 }) {
      try {
         const response = await axios.get(`${apiUrl}/comments`, {
            params: {
               parent_id,
               skip,
               limit,
               sort,
            },
         });

         return response.data;
      } catch (error) {
         if (error.response) return { success: false, message: error.response };

         return { success: false, message: error.message };
      }
   }

   async addComment({ parent_id = null, user_id = null, content = '', isReply = false }) {
      try {
         const response = await axios.post('http://localhost:5000/api/comments', {
            parent_id,
            user_id,
            content,
            isReply,
         });

         return response.data;
      } catch (error) {
         if (error.response) return { success: false, message: error.response };

         return { success: false, message: error.message };
      }
   }
}

export default new CommentServices();
