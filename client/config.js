/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://152787365.datiseu.xyz';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址
        loginUrl: `${host}/weapp/login`,
        // 出题地址
        getOptionsUrl: `${host}/weapp/getOptions`,
        // 获得题干
        getTitleUrl: `${host}/weapp/getTitle`,
        // 检测是否存在用户
        checkUrl: `${host}/weapp/check`,
    }
};

module.exports = config;
