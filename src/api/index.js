const mainApi = require('./main/mainApi');

module.exports = app => {
    app.use('/api/main', mainApi); // 통합검색
}
