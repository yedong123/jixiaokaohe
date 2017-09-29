var headerHeight;
function fnReady(){
  var header=$api.byId('header');
  $api.fixStatusBar(header);
  headerHeight=$api.offset(header).h;
  fnBack();
}
function fnBack(){
	var backimg=$api.dom($api.byId('header'), '.backimg');
	$api.addEvt(backimg, 'click', function back(){
		api.closeWin({});
	});
}
//关闭app
var flag = false;
function fnCloseApp() {
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        if (flag == true) {
            api.closeWidget({
                id: api.appId,
                animation: {
                    type: 'flip',
                    subType: 'from_bottom',
                    duration: 500
                },
                silent: true
            });
        }
        api.toast({
            msg: '再按一次退出',
            duration: 2000,
            location: 'bottom'
        });
        flag = true;
        setTimeout(function() {
            flag = false;
        }, 2000);
    });
}
