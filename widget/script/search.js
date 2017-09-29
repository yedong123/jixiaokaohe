/*
使用方法：
仅适用于单个关键字的检索
搜索页面仅需要初始化过滤条件filter即可，
filter过滤条件放于获取数据的方法烦恼GetData()中
三个参数的意义：
keyword:从输入框中获取的关键字，
contain:展示数据的容器,即父元素，
colname1:当作模糊查询条件数据库的某个字段值例如:'name,age',可以设置一个或多个字段
colname2:当作精确查询条件"(name='zhangsan')"
*/
function fnInitQueryFilter(keyword,contain,colnames1,colnames2){
	pageIndex=1;
	contain.innerHTML='';
	if($api.trimAll(keyword)==''){
		filter="";
		fnGetData();
	}else{
		//模糊查询条件和精确查询条件同时存在
		if(colnames1 && colnames2){
			var cols1=colnames1.split(',');
			filter=""+colnames2+" and ("+cols1[0]+" like '%"+keyword+"%'";
			for(var i=0;i<cols1.length;i++)
{				if(i!=cols1.length-1){
					filter+="or "+cols1[1]+" like '%"+keyword+"%'";
				}else{
					filter+=")";
				}
			}
		}else if(colnames1){
			var cols1=colnames1.split(',');
			filter="("+cols1[0]+" like '%"+keyword+"%'";
			for(var i=0;i<cols1.length;i++){
				if(i!=cols1.length-1){
					filter+="or "+cols1[1]+" like '%"+keyword+"%'";
				}else{
					filter+=")";
				}
			}
		}
		fnGetData();
	}
}