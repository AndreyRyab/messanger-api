const ERROR_COMMON_MESSAGE = 'Something went wrong. Please try again later.';
const ERROR_BAD_REQUEST_MESSAGE = 'Not valid data';
const ERROR_USER_NOT_FOUND = 'User not found';
const ERROR_CREDENTIALS_MESSAGE = 'Incorrect email or password';
const ERROR_EMAIL_MESSAGE = 'Email is required';

const ERROR_PASSWORD_MESSAGE = 'Password must contain at least 8 characters.';
const ERROR_EMAIL_EXIST = 'Email already exists';
const ERROR_SERVER_MESSAGE = 'Server error';
const ERROR_AUTH_MESSAGE = 'Authorization required';
const ERROR_DATA_NOT_FOUND = 'Data not found';
const SUCCESS_MESSAGE = 'Success';
const SERVER_ERROR_CODE = 500;

const EMAIL_REGEXP =
  /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,6}$/;

module.exports = {
  ERROR_COMMON_MESSAGE,
  ERROR_BAD_REQUEST_MESSAGE,
  ERROR_CREDENTIALS_MESSAGE,
  ERROR_USER_NOT_FOUND,
  EMAIL_REGEXP,
  ERROR_EMAIL_MESSAGE,

  ERROR_PASSWORD_MESSAGE,
  ERROR_EMAIL_EXIST,
  ERROR_SERVER_MESSAGE,
  ERROR_AUTH_MESSAGE,
  ERROR_DATA_NOT_FOUND,
  SUCCESS_MESSAGE,
  SERVER_ERROR_CODE,
};
