
export default () => {
  process.env.MAIL_URL = Meteor.settings.mail.url;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
};