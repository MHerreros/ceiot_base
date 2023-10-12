const fs = require('fs');

const persistDbToFile = async (command, db, file) => {
  let msg = 'done';
  switch (command) {
    case 'clear':
      if (db == 'mongo') {
        msg = 'clearing mongo';
        /* UNIMPLEMENTED */
      } else if (db == 'psql') {
        msg = 'clearing psql';
        /* UNIMPLEMENTED */
      } else {
        msg = 'unknown db ' + db;
      }
      break;
    case 'save':
      if (db == 'mongo') {
        msg = 'saving mongo to ' + file;
        /* UNIMPLEMENTED */
      } else if (db == 'psql') {
        msg = 'saving psql ' + file;
        /* UNIMPLEMENTED */
      } else {
        msg = 'unknown db ' + db;
      }
      break;
    case 'show':
      msg = fs.readFileSync('../../fixtures/' + file);
      break;
    default:
      msg = 'Command: ' + command + ' not implemented';
  }
  return `<html>
    <head><title>Admin</title></head>
    <body>
      ${msg}
    </body>
  </html>`;
};
module.exports = { persistDbToFile };
