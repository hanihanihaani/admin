



class MUtil{
    request(param) {
        return new Promise((resolve,reject) => {
            $.ajax({
                type        :param.type     || 'get',
                url         :param.url      || '',
                dataType    :param.dataType || 'json',
                data        :param.data     || null,
                success     :res => {
                    // 数据请求成功
                    if (0 == res.status) {
                        typeof resolve == 'function' && resolve (res.data,res.msg);
                    } else if(10 == res.status){    //没有登录状态，强制登录
                        this.doLogin();
                    } else {
                        typeof reject == 'function' && reject(res.msg || res.data);
                    }
                },
                err         :err => {
                        typeof reject == 'function' && reject(err.statusText);
                }
            })
        })
    }
    // 跳转登录
    doLogin() {
        window.location.href = 'login/redirect=' +  encodeURIComponent(window.location.pathname);
    }
    // 获取URl参数
    getUrlParam(name) {
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*(&|$))"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 成功提示
    successTips(successMsg) {
        alert(successMsg || '操作成功！')
    }
    // 失败提示
    errTips(errMsg) {
        alert(errMsg || '失败了吗？再来一次吧！')
    }
   
}

export default MUtil;