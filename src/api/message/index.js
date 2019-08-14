import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class MessageService {
  // 获取用户消息通知
  static async getAllNews() {
    try {
      const requestOptions = {
        url: '/announcement/fetch-all-announcements',
        method: 'post',
        data: {
          page_size: 10,
          page_number: 0,
          announcement_type: 'USER_MSG',
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 获取系统消息
  static async getSystemAnnouncements() {
    try {
      const requestOptions = {
        url: '/announcement/get-system-announcements',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default MessageService;
