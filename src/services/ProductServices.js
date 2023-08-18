import axios from 'axios';

import { apiUrl } from '~/config/constants';

class ProductServices {
   async search(skip, limit, recently = false) {
      try {
         const response = await axios.get(
            `${apiUrl}/products/search?skip=${skip}&limit=${limit}&recently=${recently}`,
         );

         return response.data;
      } catch (error) {
         if (error.response) return { success: false, message: error.response };

         return { success: false, message: error.message };
      }
   }
}

export default new ProductServices();
