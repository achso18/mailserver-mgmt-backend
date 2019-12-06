const path = require('path');
const BASE_PATH = path.join(__dirname, 'src', 'db');

module.exports = {
  test: {
    client: 'mysql',
    connection: {
        user: 'virtualmail',
        password: 'virtualmail',
        database: 'virtual_mail_test'

    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    debug: false
  },

  development: {
    client: 'mysql',
    connection: {
        user: 'virtualmail',
        password: 'virtualmail',
        database: 'virtual_mail'

    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    },
    debug: false
  }
};
