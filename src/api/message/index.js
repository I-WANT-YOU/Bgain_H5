import request from '@utils/request';
import { handlerResponse } from '@utils/auth';

class MessageService {
  // 获取用户消息通知
  static async getAllNews() {
    try {
      const requestOptions = {
        url: '/announcement/fetch-all-announcements',
        method: 'get',
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // 设置消息已读状态
  static async setNewsRead(id) {
    try {
      const requestOptions = {
        url: '/announcement/set-announcement-read',
        method: 'post',
        data: {
          announcement_id: id,
          read: true,
        },
      };
      const response = await request(requestOptions);
      return handlerResponse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  // /announcement/delete-announcement
  // 删除消息
  static async deleteNewsRead(uuid) {
    try {
      console.log(uuid);
      const requestOptions = {
        url: `/announcement/delete-announcement/${uuid}`,
        method: 'post',
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
        data: {
          announcement_type: 'user_msg',
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
