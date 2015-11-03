module.exports = {
  Local: require('passport-local').Strategy,
  Facebook: require('passport-facebook').Strategy,
  Google: require('passport-google-oauth').OAuth2Strategy
};
