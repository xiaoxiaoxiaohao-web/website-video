//sql语句
var sqlMap = {
  user: {
    login: 'select username, ID, power from user where account= ? and password= ?',
    register: 'insert into user(account,password,username,phone) values (?,?,?,?)',
    info: 'select username, sign, sex, birthday, phone, avatar, ID from user where username = ?',
    update: 'update user set username =?, sign =?,sex=?, birthday=?, phone =?, avatar = ? where ID =?',
    video: 'select * from video where ID = ? order by time desc',
    deleteBarrage: 'delete from bullet where bID = ?',
    updatePsw: 'update user set password = ? where ID = ?',
    judgePsw: 'select ID from user where ID = ? and password = ?'
  },
  video: {
    upload: 'insert into video(ID, vID) values (?,?)',
    delete: 'delete from video where vID = ?',
    info: 'insert into video(ID, vID, title, synopsis, type, time, address, src, label, actID, state) values (?,?,?,?,?,?,?,?,?,?,?)',
    type: 'select type from video_type group by type',
    label: 'select label from video_type where type = ?',
    typeNum: 'select count(*) from video where type = ?',
    labelData: 'select * from video where label = ? and state= "已通过" order by rand() limit 10',
    popularizeData: 'select vID, username, title, src from video left join user on video.ID = user.ID where state= "已通过" order by rand() limit ?',
    typeData: 'select vID, username, avatar, title, src, type, label from video left join user on video.ID = user.ID where video.type = ? and video.state= "已通过" order by rand() limit 10',
    url: 'select * from video where vID =  ?',
    userInfo: 'select username, sign, avatar from user where ID = ?',
    updateAll: 'update video set title = ?, synopsis = ?, type = ?, label = ?, state = ?, reason = ? where vID = ?',
    userVideo: 'select * from video where ID = ? order by time desc',
    carouselImg: 'select * from carousel where team = ? ',
    backgroundImg: 'select * from carousel where team = ? order by rand() limit 1',
    appealVideo: 'update video set state="进行中", reason = ? where vID= ?'
  },
  list: {
    moviesList: 'select vID, broadcast, title, synopsis from video where video.type = ? and state = "已通过" order by broadcast desc limit ?',
    danmuList: 'select * from bullet where vID = ? order by sendtime desc',
    addDanmuList: 'insert into bullet (vID, start, txt, sendtime, uID) values (?,?,?,?,?)',
    addCommentList: 'insert into comments (vID, uID, content, datetime) values (?,?,?,?)',
    commentList: 'select content, datetime, username, avatar from comments left join user on comments.uID = user.ID where comments.vID = ? order by datetime desc',
    labelList: 'select vID, src, title, broadcast, message, (barrage * 1 + broadcast * 2 + message * 3) as grade from video where label = ? and state = "已通过" order by grade desc',
    frontList: 'select * from video where ID = ? and state = "已通过" order by broadcast desc limit 3',
    messageList: 'select * from comments left join video on comments.vID = video.vID left join user on comments.uID = user.ID where video.ID = ? and state = "已通过" order by datetime desc',
    barrageList: 'select * from bullet left join video on bullet.vID = video.vID left join user on bullet.uID = user.ID where video.ID = ? and state = "已通过" order by sendtime desc',
    actList: 'select * from activity order by startTime desc'
  },
  sum: {
    // numSum: 'select sum(broadcast) as sum from video where ID = ? and state = "已通过" '
  },
  root: {
    user: 'select * from user',
    updateUser: 'update user set power = ? where ID = ?',
    deleteUser: 'delete from user where ID = ?',
    video: 'select * from video where state = "进行中"',
    stateVideo: 'update video set state = ?, reason = ? where vID = ?',
    carouselImg: 'select * from carousel',
    deleteCarousel: 'delete from carousel where name = ? and team = ?',
    addCarousel: 'insert into carousel(name, team) values (?,?)'
  }
}
module.exports = sqlMap