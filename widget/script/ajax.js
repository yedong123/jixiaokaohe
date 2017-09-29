//数据请求地址
var url='http://112.53.68.227:900/service.asmx/';
//当正在加载数据时将loading设置为true，处于此状态则不再加载数据
var loading = false;

//网络请求 method:接口名称,params:json键值对,callback_success:合法数据的回调函数,callback_error:非法数据的回调函数
function fnAjaxPost(method, params, callback_success, callback_error) {
	if (loading) {//防止重复加载数据
		return;
	}
	loading = true;
	api.showProgress({
		title : "加载中...",
		modal : true
	});
	api.ajax({//请求正文
		url : url + method,
		method : "post",
		dataType : "text",
		data : {
			values : params
		}
	}, function(ret, err) {//ret：正常返回数据，err：异常返回数据
		loading = false;
		api.hideProgress();
		if (ret) {//正常返回数据
			//去掉返回数据包裹的外壳
			ret = ret.substring(ret.indexOf(">") + 1);
			ret = ret.substring(ret.indexOf(">") + 1, ret.lastIndexOf("</string>")).trim();
			var json;
			try {//尝试转换成json数据
				json = $api.strToJson(ret);
			} catch(e) {
			}
			if (json && ( typeof json == "object")) {//如果是json数据,object类型必须判断
				if (json.error) {//如果服务器返回错误信息
					if (callback_error) {//如果定义了错误回调函数，将错误的json数据全部返回给回调函数，供前台处理
						callback_error(json);
					} else {//没有定义错误回调函数，默认Toast显示错误消息
						fnToast(json.error, 1500);
					}
				} else {
					if (json.success) {//如果服务器返回正确消息，默认Toast显示
						fnToast(json.success, 1500);
					}
					//将合法的json数据返回给回调函数
					callback_success(json);
				}
			} else {//非json数据，直接将结果返回给正确的回调函数
				callback_success(ret);
			}
		} else {//err：异常返回数据
			api.alert({
				msg : JSON.stringify(err)
			});
		}
	});
}

//提示：time:1000表示1秒
function fnToast(msg, time, callback) {
	//不传time则默认1.5s显示
	time = time ? time : 1500;
	api.toast({
		msg : msg,
		duration : time,
		location : 'bottom'
	});
	if (callback) {
		setTimeout(function() {
			callback();
		}, time);
	}
}

//截取发送ajax请求返回结果的字符串
function fnSubstr(ret) {
	var start = ret.indexOf('">') + 2;
	var end = ret.indexOf('</');
	var subret = ret.substring(start, end);
	return subret;
}

//若返回结果是纯json对象则可用此方法
function fnSubstrToJson(ret) {
	var start = ret.indexOf('">') + 2;
	var end = ret.indexOf('</');
	var subret = ret.substring(start, end);
	var tJson = $api.strToJson(subret);
	return tJson;
}

