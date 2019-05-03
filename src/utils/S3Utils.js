// @flow

'use strict';

import knox from 'knox';
import path from 'path';
import rp from 'request-promise';
import Promise from 'bluebird';

const config = require('../config.js');
const client = knox.createClient({
  key: config.s3.key,
  secret: config.s3.secret,
  bucket: config.s3.bucket,
  region: config.s3.region,
});

const DOMAIN = 'https://s3-us-west-2.amazonaws.com' + '/' + config.s3.bucket;
const FOLDER = config.s3.folder;
// https://s3-us-west-2.amazonaws.com/messengergoboards/public/board1463694201969.jpg

const S3Utils = {
  async genUploadImage(buffer: Buffer, S3Filename: string): Promise<string> {
    return this.genUploadBuffer(buffer, S3Filename + '.jpg', 'image/jpeg');
  },

  async genUploadBuffer(buffer: Buffer, S3Filename: string, contentType: string): Promise<string> {
    const S3Filepath = path.join(FOLDER, S3Filename);
    const options = {'x-amz-acl': 'public-read', 'Content-Type': contentType};

    return new Promise((resolve, reject) => {
      client.putBuffer(buffer, S3Filepath, options, function(err) {
        if (err) {
          return reject(err);
        }
        info(`Uploaded file to ${S3Filepath} successfully`);
        resolve(DOMAIN + '/' + S3Filepath);
      });
    });
  },

  async genExists(filename: string): Promise<boolean> {
    const S3fileURL = this.getURL(filename);
    info('Checking if the file exists here:' + S3fileURL);

    const options = {
      method: 'HEAD',
      uri: S3fileURL,
      resolveWithFullResponse: true,
      simple: true,
    };
    try {
      const res = await rp(options);
      return res.statusCode === 200;
    } catch(err) {
      return false;
    }
  },

  getURL: function(filename: string): string {
    return DOMAIN + '/' + FOLDER + '/' + filename + '.jpg';
  },
};

module.exports = S3Utils;
