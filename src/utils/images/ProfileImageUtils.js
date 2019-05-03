// @flow

'use strict';

import Bot from 'fb-local-chat-bot';
import sharp from 'sharp';
import S3Utils from '../S3Utils.js';
import {Gender} from '../../class/ClassEnums';
import Promise from 'bluebird';
import ImageUtils from './ImageUtils';
import User from '../../class/User';
import rp from 'request-promise';

const DEFAULT_PROFILE_SIZE = 150;

const ProfileImageUtils = {
  getProfileURL(userID: number): string {
    return `${userID}-profile`;
  },

  async genProfilePicBuffer(user: User, size: number): Promise<?Buffer> {
    let userData = {};
    try {
      userData = await Bot.getUserProfile(user.getFBID());
      const buffer = await rp({url: userData.profile_pic, encoding: null});
      const resizeOption = {
        kernel: sharp.kernel.lanczos2,
        interpolator: sharp.interpolator.nohalo,
      };
      return await sharp(buffer)
        .resize(size, size, resizeOption)
        .crop()
        .toBuffer();
    } catch (err) {
      // try our best to get gender
      let gender;
      if (userData.gender) {
        gender = userData.gender === 'male'
          ? Gender.MALE
          : Gender.FEMALE;
        // update user gender if there's inconsistency
        if (gender !== user.getGender()) {
          user.setGender(gender);
          await user.genSave();
        }
      } else {
        gender = user.getGender();
      }

      return gender === Gender.MALE
        ? await sharp(ImageUtils.getPath('male-profile')).resize(size, size).toBuffer()
        : await sharp(ImageUtils.getPath('female-profile')).resize(size, size).toBuffer();
    }
  },

  async genProfilePicAndSave(user: User): Promise<?string> {
    const buffer = await this.genProfilePicBuffer(user, DEFAULT_PROFILE_SIZE);
    if (buffer === null) {
      return null;
    }
    return await S3Utils.genUploadImage(buffer, this.getProfileURL(user.getID()));
  }
}

module.exports = ProfileImageUtils;
