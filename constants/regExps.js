const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}/;
const emailRegExp = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6}/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}/;

module.exports = {
  emailRegExp,
  passwordRegExp,
  phoneRegExp,
};
