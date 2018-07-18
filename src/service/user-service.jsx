import MUtil        from 'util/util.jsx'

const _mm   = new MUtil();

class User{
    // 用户登录
    login(loginInfo){
        return _mm.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        });
    }
    // 检查登录接口的数据是不是合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        // 判断用户名为空
        if(typeof username !== 'string' || username.length ===0){
            return {
                status: false,
                msg: 'Please Enter User Name'
            }
        }
        // 判断密码为空
        if(typeof password !== 'string' || password.length ===0){
            return {
                status: false,
                msg: 'Please Enter Password'
            }
        }
        return {
            status : true,
            msg : 'Validate Pass'
        }
    }
    // 退出登录
    logout(){
        return _mm.request({
            type    : 'post',
            url     : '/user/logout.do'
        });
    }
    getUserList(pageNum){
        return _mm.request({
            type    : 'post',
            url     : '/manage/user/list.do',
            data    : {
                pageNum : pageNum
            }
        });
    }
}

export default User;