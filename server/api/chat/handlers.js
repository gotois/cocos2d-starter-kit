exports.hello = function (message) {
  log.info(`Hello ${ message }`);

  this.emit('status', 'wazzaap!');
};