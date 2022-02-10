const mainApi = require('./main/mainApi');
const artiApi = require('./artiApi');
const infraApi = require('./infraApi');
const tpcoApi = require('./tpcoApi');
const jccApi = require('./jccApi');
const matInfoApi = require('./matInfoApi');

module.exports = app => {
    app.use('/api/main', mainApi); // 통합검색

    app.use('/api/arti', artiApi); // 공지사항, 자료실, FAQ, QNA 검색
    app.use('/api/infra', infraApi); // 공공생산 인프라 관리
    app.use('/api/tpco', tpcoApi); // 조제 관리사 매칭
    app.use('/api/jcc', jccApi); // 제주 화장품 인증 관리
    app.use('/api/matInfo', matInfoApi); // 화장품 소재 정보 관리

}
