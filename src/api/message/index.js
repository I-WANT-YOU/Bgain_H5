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

  // 设置消息已读状态
  static async setNewsRead(uuid) {
    try {
      const requestOptions = {
        url: '/announcement/set-announcement-read',
        method: 'post',
        data: {
          uuid,
          read: true,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 消息全部已读
  static async setAllNewsRead() {
    try {
      const requestOptions = {
        url: '/announcement/set-all-announcement-read',
        method: 'post',
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

  // 获取系统消息详情
  static async getSystemAnnouncementsDetail(id) {
    try {
      const requestOptions = {
        url: `/announcement/get-system-announcement-details/${id}`,
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  //
}

export default MessageService;
