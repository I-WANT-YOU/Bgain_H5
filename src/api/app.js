import axios from 'axios';
import { handlerResponse } from '@utils/auth';

class AppService {
  static async getUploadPolicy() {
    try {
      const requestOptions = {
        url: 'http://dev.xjetry.top:8084/oss/policy',
        method: 'get',
      };
      const response = await axios(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AppService;
