
import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class AppService {
  static async getUploadPolicy() {
    try {
      console.log('this is true');
      const requestOptions = {
        url: '/oss/policy',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AppService;
