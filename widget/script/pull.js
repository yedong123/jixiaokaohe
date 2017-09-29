/*
使用方法：
监听上拉和下拉的事件，引用页面获取数据的方法是fnGetData(),
需要在方法里初始化pageCount，引用页面不需要定义起始页pageIndex，
*/

var pageIndex=1,pageCount=0;
//上拉加载更多
function fnListenPullUp() {
	api.addEventListener({
		name : 'scrolltobottom',
		extra : {
			threshold : 200
		}
	}, function(ret, err) {
		if (!loading) {
			pageIndex++;
			if (pageIndex > pageCount) {
				api.toast({
					msg : '没有更多数据了',
					duration : 2000,
					location : 'bottom'
				});
			} else {
				//调用页面加载数据的方法
				fnGetData();
			}
		}
	});
}
//下拉刷新
function fnListenPullDown(contain) {
    api.setRefreshHeaderInfo({
        visible: true,
        loadingImg: 'widget://image/refresh.png',
        bgColor: '#ccc',
        textColor: '#fff',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true
    }, function(ret, err) {
        pageIndex = 1;
        contain.innerHTML = '';
        fnGetData();
        setTimeout(function() {
            api.refreshHeaderLoadDone();
        }, 1000);
    });
}

