var config = {};

config.db = {};
config.webhost = 'https://uyenntm-shortenurl.herokuapp.com/';
//config.webhost = 'http://localhost:3000/';
//mongodb://<dbuser>:<dbpassword>@ds161426.mlab.com:61426/shortenurl
config.db.host = 'uyenntm-shortenurl:uyenntm12345678@ds161426.mlab.com:31561';
config.db.name = 'shortenurl';

module.exports = config;
