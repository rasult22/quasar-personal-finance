/*

COMPROMISED DATABASE
  strongly encrypt passwords with salt and hash (bcrypt)
  stringly encrypt passwords reset tokens (SHA 256)


BRUTE FORCE ATTACKS
  use bcrypt (to make login requests slow)
  implement rate limiting (express-rate-limit)
  implement maximum login attempts

CROSS-SITE SCRIPTING (XSS) ATTACKS
  store JWT in HTTPOnly cookies 
  sanitize user input data
  set sprecial HTTP headers (helmet package)

DENIAL-OF-SERVICE (DOS) ATTACK
  implement rate limiting (express-rate-limit)
  limit body payload (in body-parser)
  avoid evil regular expressions


NOSQL QUERY INJECTION
  use mongoose for MongoDB (because of SchemaTypes)
  sanitize user input data

OTHER BEST PRACTICES AND SUGGESTIONS
  always use HTTPS
  create random password reset tokens with expiry dates
  deny access to JWT after password change
  don't commit sensitive config data to git
  don't send error details to clients
  prevent cross-site requests forgery (csurf package)
  require re-authentication before a high-value action
  implement a blacklist of untrusted JWT
  confirm user email address after first creating account
  keep user logged in with refresh tokens
  implement two-factor authentication
  prevent parameter pollution causing Uncaught Exceptions














*/