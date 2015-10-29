var LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = {
  Local: LocalStrategy,
  Facebook: FacebookStrategy,
  Google: GoogleStrategy
};
