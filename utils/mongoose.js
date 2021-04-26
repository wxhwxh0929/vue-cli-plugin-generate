const config = require('../config/index');

const constant = require('./constant');

const mongoose = require('mongoose');

const chalk = require('chalk');

const dataUrl = config.databaseUrl;

mongoose.connect(dataUrl, (err) => {
  if (err) {
    console.log(chalk.red(err));
    console.log('');
    console.log('');
    console.log(chalk.red(constant.CONNECT_FAIL));
    console.log('');
    console.log('');
  } else {
    console.log(chalk.green(constant.CONNECT_SUCCESS));
    console.log('');
    console.log();
  }
});

module.exports = {
  mongoose
};
