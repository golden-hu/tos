﻿﻿Ext.namespace('Fos');
Ext.namespace('Wms');
Ext.BLANK_IMAGE_URL = 'js/ext/resources/images/default/s.gif';
Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8"; 
Ext.WindowMgr.zseed = 10000;
Ext.MessageBox.minWidth=300;

var VERSION=4.0;
var wl=window.location.href;
var idx=wl.lastIndexOf("/");
URL_TMS='/FOS4';
SERVICE_URL=URL_TMS+'/front';
SERVER_URL=wl.substr(0,idx)+'/';

//REPORT_URL='/Fos4Report/preview?__locale=zh_CN&__navigationbar=false&__showtitle=false&__title=REPORT';
//REPORT_URL='http://127.0.0.1:8080/FosReport/preview?__locale=zh_CN&__navigationbar=false&__showtitle=false&__title=REPORT';
REPORT_URL='/FOS4/preview?__locale=zh_CN&__navigationbar=false&__showtitle=false&__title=REPORT';

Date.patterns = {ISO8601Long:"Y-m-d H:i:s",ISO8601Short:"Y-m-d",ShortDate: "n/j/Y",LongDate: "l, F d, Y",FullDateTime: "l, F d, Y g:i:s A",MonthDay: "F d",ShortTime: "g:i A",LongTime: "g:i:s A",SortableDateTime: "Y-m-d\\TH:i:s",UniversalSortableDateTime: "Y-m-d H:i:sO",YearMonth: "F, Y"};

frmValidatePrompt = function(){Ext.Msg.show({title:SYS,msg:M_DATA_NOT_COMPLETE,modal:true,buttons: Ext.Msg.OK});};

var smsUrl='http://http.asp.sh.cn/MT.do?';
var smsUser='jane';
var smsPassword='13601937879';
var smsKey='JFEK8DS5AD2E';

var NEXTID = 0;
var getNextId = function(){
	NEXTID -= 1;
	return NEXTID;
};
function checkContainerNo(n){	 
	if(n.length!=11) return false;	
	/*var a = new Array(11);
	
	a[0]=getContMap(n.substr(0,1));
    a[1]=getContMap(n.substr(1,1));
    a[2]=getContMap(n.substr(2,1));
    a[3]=getContMap(n.substr(3,1));
    
    if(a[0] == 0 || a[1] == 0 ||a[2] == 0 ||a[3] == 0) return false;
    
    a[4]=n.substr(4,1);
    a[5]=n.substr(5,1);
    a[6]=n.substr(6,1);
    a[7]=n.substr(7,1);
    a[8]=n.substr(8,1);
    a[9]=n.substr(9,1);
    a[10]=n.substr(10,1);
    
    var s=a[0]+a[1]*2+a[2]*4+a[3]*8+a[4]*16+a[5]*32+a[6]*64+a[7]*128+a[8]*256+a[9]*512;
    var r=s%11;
    
    if(r!=a[10]) return false;*/
    return true;
};

var getTitleName = function(custClass){
	var titleName = "";
	if(custClass== "Booker")
	    titleName = C_BOOKER;
	else if(custClass== "Carrier")
	 titleName = C_CARRIER;
	else if(custClass== "Custom")
	 titleName = C_CUSTOM_AGENCY;
	else if(custClass== "Oversea")
	 titleName = C_OVERSEA_AGENCY;
	else if(custClass== "BookerA")
	 titleName = C_BOOK_AGENCY;
	else if(custClass== "Insp")
	 titleName = C_INSP_AGENCY;
	else if(custClass== "DoA")
	 titleName = C_DO_AGENCY;
	else if(custClass== "Cfs")
	 titleName = C_CFS;
	else if(custClass== "Warehouse")
	 titleName = C_WARE;
	else if(custClass== "Air")
	 titleName = C_FLIGHTER;
	else if(custClass== "Track")
	 titleName = C_TRACKER;
	else if(custClass== "Cont")
	 titleName = C_CONTAINER;
	else if(custClass== "Insu")
	 titleName = C_INSURANCE;
	else if(custClass== "Oil")
	 titleName = C_OIL_STATION;
	else if(custClass== "Factory")
	 titleName = C_REPAIR_FACTORY;
	else if(custClass== "Expr")
	 titleName = C_EXPRESS;
	return titleName;
};

var HR=function(c){
	var p=sessionStorage.getItem("USER_PERM");
	
	return p.indexOf(c+',')==-1?false:true;
	//return true;
	
};

var NR=function(c){
	return !HR(c);
};

var MR=function(str){
	var ROLE_ID=sessionStorage.getItem("ROLE_ID");
	var dis = NR(str);
	if(ROLE_ID==0){
		dis = false;
	}
	return dis;
};

var openCons=function(n){
	store = new Ext.data.Store({url: SERVICE_URL+'?_A='+'CONS_Q',
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'FConsign',id:'id'}, FConsign),
		remoteSort:true,sortInfo:{field:'consDate', direction:'DESC'}});
	store.load({params:{consNo:n},
		callback:function(re,o,s){
			if(s&&re.length>0) {
				var p=re[0];
				createWindow('CONS_'+p.get("id"),C_CONSIGN+p.get('consNo'),new Fos.ConsignTab(p),true);
			}
	}});};
var openInvo=function(n){
	store = new Ext.data.Store({url: SERVICE_URL+'?_A='+'INVO_Q',reader:new Ext.data.XmlReader({record:'SInvoice'}, SInvoice)});
	store.load({params:{invoNo:n},callback:function(re,o,s){if(s&&re.length>0)	showInvoice(re[0]);}});
};

var C_DEFAULT_WW=900;
var C_DEFAULT_WH=520;

//pagesize 每页的记录数的常量
var C_PS=10;
var C_PS20=20;
var C_PS50=50;
var C_PS100=100;

var BF=600;
var BFL=800;
var PPID=1;
var CY=1,CFS=9;
var C_LW=400;
var EQ=1;//等于
var LT=2;//小于
var LE=3;//小于等于
var GT=4;//大于
var GE=5;//大于等于
var NE=6;//不等于
var LI=7;//相似
var IN=8;//在···范围内




//BizType
var BT_M='M';//海运
var BT_A='A';//空运
var BT_G='G';//报关
var BT_I='I';//报检
var BT_T='T';//陆运
var BT_W='W';//仓储
var BT_E='E';//快件

var getBizType = function(bizType){
	if(bizType==BT_M)
		return '海运';
	else if(bizType==BT_A)
		return '空运';
	else if(bizType==BT_G)
		return '报关';
	else if(bizType==BT_I)
		return '报检';
	else if(bizType==BT_T)
		return '陆运';
	else if(bizType==BT_W)
		return '仓储';
	else if(bizType==BT_E)
		return '快件';
};

//ShipType
var ST_F='FCL';
var ST_L='LCL';
var ST_B='BULK';

//BizClass
var BC_I='I';
var BC_E='E';
var BC_D='D';

var XMG = Ext.MessageBox;

var groupViewCfg = {forceFit:false,groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'};

var DATEF='Y-m-d';
//格式化日期
var formatDate = function(v){return v ? v.dateFormat(DATEF) : '';};
//格式化日期时间
var formatDateTime = function(v){return v ? v.dateFormat('Y-m-d H:i') : '';};
var numRenderColor  = function(v,m,r){v = parseFloat(v);if(v=='NaN') return '0.00';m.css=(v>0?'green-b':'red-b');return v.toFixed(2);};
var numRenderBold  = function(v,m,r){
	v = parseFloat(v);
	if(v=='NaN') 
		return '0.00';
	m.css='number-b';
	return v.toFixed(2);
};
//渲染两位
var numRender = function(v){
	if(Ext.isEmpty(v)){
		v=0.00;
	}
	v=parseFloat(v);
	v=v.toFixed(2);
	if(v=='NaN') 
		v='0.00';
		
	return v;
};

//渲染四位
var rateRender = function(v){
	v=parseFloat(v);
	v=v.toFixed(4);
	if(v=='NaN'){
		v='0.0000';
	}
	return v;
};

var boolRender = function(v, p, record){p.css += ' x-grid3-check-col-td';return '<div class="x-grid3-check-col'+(v==1?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';};
var consRender  = function(v){return "<a href=\"javascript:openCons('"+v+"');\">"+v+"</a>";};
var invoRender  = function(v){return "<a href=\"javascript:openInvo('"+v+"');\">"+v+"</a>";};
var exhiRender  = function(v){
	var idx=v.lastIndexOf("/");
	fn=v.substr(idx+1,v.length);
	return "<a href=\"javascript:OW('"+SERVER_URL+v+"');\">"+fn+"</a>";
};
var HL=function(c){return '<font color=#ff0000>'+c+'</font>';};
var GL=function(c){return '<font color=#00EE00>'+c+'</font>';};

var cargoTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{cargoCode}</span>&nbsp;&nbsp;&nbsp;&nbsp;{cargoName}</h3></div></tpl>');
var wCargoTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{skuNo}</span>&nbsp;&nbsp;&nbsp;&nbsp;{cargoName}</h3></div></tpl>');
var blockTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{blockCode}</span>&nbsp;{blockName}</h3></div></tpl>');


var goodsTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{storageNoteNo}</span>&nbsp;&nbsp;&nbsp;&nbsp;{skuNo}</h3></div></tpl>');
var custTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{custCode}</span>&nbsp;&nbsp;&nbsp;&nbsp;{custNameCn}</h3></div></tpl>');
var charTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{charCode}</span>{charName}</h3></div></tpl>');
var dotyTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{dotyCode}</span>{dotyName}</h3></div></tpl>');
var portTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{portCode}</span>{portNameEn}</h3></div></tpl>');
var counTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{counCode}</span>{counNameCn}</h3></div></tpl>');
var vessTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3><span>{vessNameEn}</span>&nbsp;&nbsp;&nbsp;&nbsp;{vessNameCn}</h3></div></tpl>');
var getElapsed=function(d){if(!d) return -1;return Math.abs((new Date()).getTime()-d.getTime());};
var showProgress=function(v){return function(){var i = v/11;Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');};};
var loliTpl = new Ext.XTemplate('<tpl for="."><div class="list-item"><h3>{vessName}/{voyaName}</h3></div></tpl>');

var checkPassEx=function(){	
	var md=Date.parseDate(sessionStorage.getItem("USER_PASS_CHANGE_DATE"),DATEF);
	var ed=md.add(Date.DAY,30);
	var pd=ed.add(Date.DAY,-7);
	var td=new Date();
	var bP=td.between(pd,ed);
	if(bP){
		var t=new Ext.Template(M_PASS_EXP);
		var msg=t.apply([ed.format(DATEF)]);
		XMG.alert(SYS,msg);
	}
};

function round2(v){return (Math.round(v*100)/100);};
function round4(v){return (Math.round(v*10000)/10000);};
function getCSM(){return new Ext.grid.CheckboxSelectionModel({singleSelect:false});};
//设置分页的工具条
function PTB(s,ps){
	return new Ext.PagingToolbar({pageSize:ps,store:s,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:C_NR});
	
};
function ACTIVE(){return new Ext.grid.CheckColumn({header:C_ACTIVE,dataIndex:'active',width:55});};
function CHKCLM(t,d,w){return new Ext.grid.CheckColumn({header:t,dataIndex:d,width:w?w:55});};

var C_CT={header:"创建时间",width:100,align:'right',renderer:formatDateTime,dataIndex:"createTime"};
var C_MT={header:"修改时间",width:100,align:'right',renderer:formatDateTime,dataIndex:"modifyTime"};
var getMB = function(p){return [{xtype:'tbtext',text:C_CREATE_BY_C+getUSER(p.get('createBy'))},'-',
			{xtype:'tbtext',text:C_CREATE_TIME_C+formatDateTime(p.get('createTime'))},'-',
			{xtype:'tbtext',text:C_MODIFY_BY_C+getUSER(p.get('modifyBy'))},'-',
			{xtype:'tbtext',text:C_MODIFY_TIME_C+formatDateTime(p.get('modifyTime'))}
			];};

var EXP=function(t,tid,p){
	var url = SERVICE_URL+'?_A='+'TEMP_E&tempId='+tid+'&type='+t+p;
	window.open(url,'download', 'height=5, width=5, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no');
};

var OW=function(url){window.open(url,'','height=0,width=0,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');};
var OWF=function(url){window.open(url,'','height=800,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');};
var OWW=function(url){window.open(url,'','height=800,width=600,top=0,left=0,toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes,location=no,status=no');};

var LC=function(f,e,t,s){
	if(e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN){	
		var q=f.getRawValue();
		if(q.length>1){
			var a=[];
			a[0]=new QParam({key:'custCode',value:q+'%',op:LI});
			if(t!='') 
				a[1]=new QParam({key:t,value:'1',op:EQ});
			
			var xml = HTUtil.QTX(a);
	   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:s==1?{_A:'CUST_X',_mt:'XML',S:1}:{_A:'CUST_X'},
				success: function(r,o){
	   				f.store.loadData(r.responseXML,false);
	   				if(!f.isExpanded()){
	   					f.expand();
	   				}
	   			},
				xmlData:HTUtil.HTX(xml)
			});
		}
		else if((q.length==0||q.lenght<=1) && f.isExpanded()){
			
			f.store.removeAll();
			f.collapse();
		}
	}
};



var loadCustomer=function(f,e,custType,bizType,simpleFlag){
	if(e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN){	
		var q=f.getRawValue();
		if(q.length>1){
			var a=[];
			a[0]=new QParam({key:'custCode',value:q+'%',op:LI});
			if(custType) 
				a[a.length]=new QParam({key:custType,value:'1',op:EQ});
			
			if(bizType){
				var k = '';
				if(bizType=='M') k = 'marineFlag';
				else if(bizType=='A') k = 'airFlag';
				else if(bizType=='C') k = 'customsFlag';
				else if(bizType=='T') k = 'tmsFlag';
				else if(bizType=='W') k = 'wmsFlag';
				else if(bizType=='E') k = 'expressFlag';				
				a[a.length]=new QParam({key:k,value:'1',op:EQ});
			}
			if(simpleFlag==1){
				a[a.length]=new QParam({key:'S',value:'1',op:EQ});
			}
			var xml = HTUtil.QTX(a);
	   		Ext.Ajax.request({url:SERVICE_URL+'?_A=CUST_X&_mt=xml',method:'POST',
				success: function(r,o){
					//f.store.removeAll();
	   				f.store.loadData(r.responseXML,false);
	   				if(!f.isExpanded()){
	   					f.expand();
	   				}
	   			},
				xmlData:HTUtil.HTX(xml)
			});
		}
		else if((q.lenght<=1) && f.isExpanded()){
			
			f.store.removeAll();
			f.collapse();
		}
	}
};

var LP=function(f,e){
	if(e.getKey()!=e.ENTER){
		var q=f.getRawValue();
		if(q.length>1 && !f.isExpanded()){
			var a=[];
			a[0]=new QParam({key:'portNameEn',value:q+'%',op:7});			
			var xml = HTUtil.QTX(a);
	   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'PORT_X',portType:0},
				success: function(r,o){
	   				f.store.loadData(r.responseXML,false);
	   				f.expand();
	   			},
				xmlData:HTUtil.HTX(xml)
			});
		}
		else if(q.length==0 && f.isExpanded()){f.store.removeAll();}
	}
};

var LAP=function(f,e){
	if(e.getKey()!=e.ENTER){
		var q=f.getRawValue();
		if(q.length>1 && !f.isExpanded()){
			var a=[];
			a[0]=new QParam({key:'portCode',value:q+'%',op:7});			
			var xml = HTUtil.QTX(a);
	   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
	   			params:{_A:'PORT_X',portType:1},
				success: function(r,o){
	   				f.store.loadData(r.responseXML,false);
	   				f.expand();
	   			},
				xmlData:HTUtil.HTX(xml)
			});
		}
		else if(q.length==0 && f.isExpanded()){f.store.removeAll();}
	}
};

var listShipper=function(f,e,p){
	if(e.getKey()!=e.ENTER){	
		var q=f.getRawValue();
		if(q.length>0 && !f.isExpanded()){			
	   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
	   			params:p,
				success: function(r,o){
					f.store.loadData(r.responseXML,false);
					f.expand();
				}
			});
		}
		else if(q.length==0 && f.isExpanded()){f.store.removeAll();}
	}
};

var LV=function(f,e,vt){
	var q=f.getRawValue();
	if(q.length>1 && !f.isExpanded()){
		var a=[];
		a[0]=new QParam({key:'active',value:'1',op:1});
		a[1]={key:'vessNameEn',value:q+'%',op:7};
		if(vt) a[a.length]=new QParam({key:'vessType',value:vt,op:1});
		var xml = HTUtil.QTX(a);
   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'VESS_X',_mt:'json'},scope:this,
			success: function(r,o){f.store.loadData(r.responseXML,false);f.expand();},
			failure: function(r,o){},
			xmlData:HTUtil.HTX(xml)
		});
	}
};

//根据cargo类中描述的换算关系，取得传入的源单位转到目标单位的系数
var getRateBySourceToTarget=function(p,sourceUnit,targetUnit)
{
	//如果源单位是默认单位并且目标单位是最小单位
		if (p.get('pUnitName') ==sourceUnit && p.get('numUnitName')==  targetUnit)
		{
			return p.get('numUnitId');
		}
		//如果源单位是最小单位并且目标单位是默认单位
		else if(p.get('pUnitName')==targetUnit && p.get('numUnitName')==sourceUnit)
		{
			return 1.0/p.get('numUnitId');
			
		}
		else
		{
			return 1.0;
		}

}

var getRateByNGVM=function(p,sourceUnit){
	
		var rate=[];
		
		//如果指定单位是默认单位
		if (p.get('pUnitName') ==sourceUnit)
		{
			
			if (p.get('netWeight')==null)
			{
				rate[0]=0.0;
			}
			else
			{
				rate[0]=p.get('netWeight');
			}
			
			if (p.get('grossWeight')==null)
			{
				rate[1]=0.0;
			}
			else
			{
				rate[1]=p.get('grossWeight');
			}
			
			if (p.get('volumn')==null)
			{
				rate[2]=0.0;
			}
			else
			{
				rate[2]=p.get('volumn');
			}
			
			if (p.get('measure')==null)
			{
				rate[3]=0.0;
			}
			else
			{
				rate[3]=p.get('measure');
			}
			
			return rate;
		}
		//如果指定单位是最小单位
		else if (p.get('numUnitName')==sourceUnit )
		{
			var dblRate=getRateBySourceToTarget(p,sourceUnit,p.get('pUnitName'));
			
			if (p.get('netWeight')==null)
			{
				rate[0]=0.0;
			}
			else
			{
				rate[0]= dblRate*p.get('netWeight');
			}
			
			if (p.get('grossWeight')==null)
			{
				rate[1]=0.0;
			}
			else
			{
				rate[1]=dblRate*p.get('grossWeight');
			}
			
			if (p.get('volumn')==null)
			{
				rate[2]=0.0;
			}
			else
			{
				rate[2]=dblRate*p.get('volumn');
			}
			
			if (p.get('measure')==null)
			{
				rate[3]=0.0;
			}
			else
			{
				rate[3]=dblRate*p.get('measure');
			}
			
			return rate;
			
		}
		else
		{
			rate[0]=0.0;
			rate[1]=0.0;
			rate[2]=0.0;
			rate[3]=0.0;
			return rate;
		}
}

var EXPC=function(t,p){
	var templates = HTStore.getTemplates(t);
	var a = templates.getRange();
	if(a.length==0) 
		XMG.alert(SYS,M_TEMP_NOT_FOUND);
	else if(a.length==1){
		var tempId = a[0].get('id');
		var url = SERVICE_URL+'?_A='+'TEMP_E&tempId='+tempId+'&type=I'+p;
		window.open(url,'download', 'height=5, width=5, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
	}
	else{
		var w=new Fos.TemplateChooseWin(t);
		w.addButton({text:C_OK,handler:function(){					
			var tempId = w.findById('tempId').getValue();
			if(tempId){
				var url = SERVICE_URL+'?_A='+'TEMP_E&tempId='+tempId+'&type=I'+p;
				window.open(url,'download', 'height=5, width=5, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
		  	}
		  	w.close();
		}},this);
		w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);w.show();
	}
};
var EXPM=function(to,cc,sub,msg,t,p,mt){
	var m=new PMessage({messTo:to,messCc:cc,messSubject:sub,messBody:msg,rowAction:'N'});	
	var w=new Fos.MailWin(m,t,mt?mt:1);
	w.addButton({text:C_SEND,handler:function(){
		to= w.findById('to').getValue();
		cc= w.findById('cc').getValue();
		sub= w.findById('sub').getValue();
		body= w.findById('body').getValue();
		tid=w.findById('tempId').getValue();
		m.set('messTo',to);
		m.set('messCc',cc);
		m.set('messSubject',sub);
		m.set('messBody',body);
		m.set('messType',mt?mt:1);
		var x = RTX(m,'PMessage',PMessage);	
		Ext.Ajax.request({scope:this,url:SERVICE_URL+'?_A=MESS_S&tempId='+tid+'&type=I&'+p,method:'POST',
			success: function(r){XMG.alert(SYS,M_MAIL_SEND_SUCCESS);w.close();},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
			xmlData:FOSX(x)
		});
	}},this);
	w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);w.show();
};

var CREATE_E_MENU=function(t,fd,fe,ff,s){
	return {text:t,menu:{items:[{text:'Excel',scope:s,handler:fd},{text:C_EMAIL,scope:s,handler:fe},{text:'传真',scope:s,handler:ff}]}};
};

var CREATE_P_MENU=function(t,fd,fe,ff,s){
	return {text:t,menu:{items:[{text:'PDF',scope:s,handler:fd}]}};
};

var CREATE_EP_MENU=function(t,fd,fp,ff,s){
	return {text:t,menu:{items:[{text:'Excel',scope:s,handler:fd},{text:'PDF',scope:s,handler:fp}]}};

};

var CREATE_KM=function(id,s,g){
	new Ext.KeyMap(Ext.getDoc(), {
		key:'nrs',ctrl:true,
		handler: function(k, e) {
		 	var tc = T_MAIN.getComponent(id);
		 	if(tc){
			 	if(tc==T_MAIN.getActiveTab())
			 	{
			 		if(g) tb=s.grid.getTopToolbar();
			 		else tb=s.getTopToolbar();
			 		switch(k) {
			 		case Ext.EventObject.N:
			 			if(!tb.items.get('TB_N').disabled) s.add();break;
			 		case Ext.EventObject.R:
			 			if(!tb.items.get('TB_R').disabled) s.remove();break;
			 		case Ext.EventObject.S:
			 			if(!tb.items.get('TB_S').disabled) s.save();break;
					}
			 	}
		 	}
		},stopEvent:true,scope:s});
};

Ext.grid.CheckColumn = function(config){
	this.addEvents({click:true});
	Ext.grid.CheckColumn.superclass.constructor.call(this);
	Ext.apply(this,config,{
		init:function(grid){
			this.grid = grid;
			this.grid.on('render', function(){var view = this.grid.getView();view.mainBody.on('mousedown', this.onMouseDown,this);},this);
		},
		onMouseDown:function(e, t){
			if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
			e.stopEvent();
			var index = this.grid.getView().findRowIndex(t);
			var record = this.grid.store.getAt(index);
			record.set(this.dataIndex,record.data[this.dataIndex]==1?0:1);
			this.fireEvent('click', this, e, record);
		}},
		renderer:function(v, p, record){
			p.css += ' x-grid3-check-col-td';
			return '<div class="x-grid3-check-col'+(v==1?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
		}
	});
	if(!this.id){this.id = Ext.id();};
	this.renderer = this.renderer.createDelegate(this);
};
Ext.extend(Ext.grid.CheckColumn, Ext.util.Observable);

Ext.ux.IFrameComponent = Ext.extend(Ext.BoxComponent,{
	onRender:function(ct, position){
		this.el=ct.createChild({tag:'iframe',id:'IF_'+ this.id,frameBorder:0,src:this.url});
	}
});

Ext.ux.TabCloseMenu = function(){
    var tabs, menu, ctxItem;
    this.init = function(tp){
    	tabs = tp;
    	tabs.on('contextmenu', onContextMenu);
    };
    function onContextMenu(ts, item, e){
        if(!menu){
            menu = new Ext.menu.Menu([
            {id: tabs.id + '-close',text: 'Close Tab',handler : function(){tabs.remove(ctxItem);}},
            {id: tabs.id + '-close-others',text: 'Close Other Tabs',handler : function(){
            	tabs.items.each(function(item){if(item.closable && item != ctxItem){tabs.remove(item);}});}
            }]);
        }
        ctxItem = item;
        var items = menu.items;
        items.get(tabs.id + '-close').setDisabled(!item.closable);
        var disableOthers = true;
        tabs.items.each(function(){
            if(this != item && this.closable){disableOthers = false;return false;}
        });
        items.get(tabs.id + '-close-others').setDisabled(disableOthers);
        menu.showAt(e.getPoint());
    }
};

Ext.form.FileUploadField = Ext.extend(Ext.form.TextField,  {
	buttonText: 'Browse...',
	buttonOnly: false,
	buttonOffset: 3,
	readOnly: true,
	autoSize: Ext.emptyFn,
    initComponent: function(){
        Ext.form.FileUploadField.superclass.initComponent.call(this);        
        this.addEvents('fileselected');},    
    onRender : function(ct, position){
        Ext.form.FileUploadField.superclass.onRender.call(this, ct, position);        
        this.wrap = this.el.wrap({cls:'x-form-field-wrap x-form-file-wrap'});
        this.el.addClass('x-form-file-text');
        this.el.dom.removeAttribute('name');        
        this.fileInput = this.wrap.createChild({
            id: this.getFileInputId(),
            name: this.name||this.getId(),
            cls: 'x-form-file',
            tag: 'input', 
            type: 'file',
            size: 1
        });        
        var btnCfg = Ext.applyIf(this.buttonCfg || {}, {text: this.buttonText});
        this.button = new Ext.Button(Ext.apply(btnCfg, {
            renderTo: this.wrap,
            cls: 'x-form-file-btn' + (btnCfg.iconCls ? ' x-btn-icon' : '')}));        
        if(this.buttonOnly){
            this.el.hide();
            this.wrap.setWidth(this.button.getEl().getWidth());}        
        this.fileInput.on('change', function(){
            var v = this.fileInput.dom.value;
            this.setValue(v);
            this.fireEvent('fileselected', this, v);
        }, this);
    },
    getFileInputId: function(){return this.id+'-file';},
    onResize : function(w, h){
        Ext.form.FileUploadField.superclass.onResize.call(this, w, h);        
        this.wrap.setWidth(w);        
        if(!this.buttonOnly){
            var w = this.wrap.getWidth() - this.button.getEl().getWidth() - this.buttonOffset;
            this.el.setWidth(w);
        }
    },
    preFocus : Ext.emptyFn,
    getResizeEl : function(){return this.wrap;},
    getPositionEl : function(){return this.wrap;},
    alignErrorIcon : function(){this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);}    
});
Ext.reg('fileuploadfield', Ext.form.FileUploadField);

Ext.override(Ext.grid.RowSelectionModel, {  
	onEditorKey : function(field, e){
        var k = e.getKey(), 
            newCell, 
            g = this.grid, 
            last = g.lastEdit,
            ed = g.activeEditor,
            ae, last, r, c;
        var shift = e.shiftKey;
        if(k == e.LEFT){
			e.stopEvent(); ed.completeEdit();
			newCell = g.walkCells(ed.row, ed.col - 1, -1,this.acceptsNav, this);
		}
		if(k == e.RIGHT){
			e.stopEvent(); ed.completeEdit();
			newCell = g.walkCells(ed.row, ed.col+ 1, 1,this.acceptsNav, this);
		}		
        else if(k == e.TAB){
            e.stopEvent();
            ed.completeEdit();
            if(shift){
                newCell = g.walkCells(ed.row, ed.col-1, -1, this.acceptsNav, this);
            }else{
                newCell = g.walkCells(ed.row, ed.col+1, 1, this.acceptsNav, this);
            }
        }else if(k == e.ENTER){
            //if(this.moveEditorOnEnter !== false){
                if(shift){
                    newCell = g.walkCells(last.row - 1, last.col, -1, this.acceptsNav, this);
                }else{
                    newCell = g.walkCells(last.row , last.col+1, 1, this.acceptsNav, this);
                }
           // }
        }
        if(newCell){
            r = newCell[0];
            c = newCell[1];
            if(last.row != r){                
                this.selectRow(r);
            }
            if(g.isEditor && g.editing){
                ae = g.activeEditor;
                if(ae && ae.field.triggerBlur){
                    ae.field.triggerBlur();
                }
            }
            g.startEditing(r, c);
        }
    }    
	});
	
Ext.grid.GroupSummary = function(config){Ext.apply(this, config);};

Ext.extend(Ext.grid.GroupSummary, Ext.util.Observable, {
    init : function(grid){
        this.grid = grid;
        this.cm = grid.getColumnModel();
        this.view = grid.getView();
        var v = this.view;
        v.doGroupEnd = this.doGroupEnd.createDelegate(this);
        v.afterMethod('onColumnWidthUpdated', this.doWidth, this);
        v.afterMethod('onAllColumnWidthsUpdated', this.doAllWidths, this);
        v.afterMethod('onColumnHiddenUpdated', this.doHidden, this);
        v.afterMethod('onUpdate', this.doUpdate, this);
        v.afterMethod('onRemove', this.doRemove, this);
        if(!this.rowTpl){
            this.rowTpl = new Ext.Template(
                '<div class="x-grid3-summary-row" style="{tstyle}">',
                '<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                    '<tbody><tr>{cells}</tr></tbody>',
                '</table></div>'
            );
            this.rowTpl.disableFormats = true;
        }
        this.rowTpl.compile();
        if(!this.cellTpl){
            this.cellTpl = new Ext.Template(
                '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
                '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on">{value}</div>',
                "</td>"
            );
            this.cellTpl.disableFormats = true;
        }
        this.cellTpl.compile();
    },
    toggleSummaries : function(visible){
        var el = this.grid.getGridEl();
        if(el){
            if(visible === undefined){
                visible = el.hasClass('x-grid-hide-summary');
            }
            el[visible ? 'removeClass' : 'addClass']('x-grid-hide-summary');
        }
    },
    renderSummary : function(o, cs){
        cs = cs || this.view.getColumnData();
        var cfg = this.cm.config;
        var buf = [], c, p = {}, cf, last = cs.length-1;
        for(var i = 0, len = cs.length; i < len; i++){
            c = cs[i];
            cf = cfg[i];
            p.id = c.id;
            p.style = c.style;
            p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
            if(cf.summaryType || cf.summaryRenderer){
                p.value = (cf.summaryRenderer || c.renderer)(o.data[c.name], p, o);
            }else{
                p.value = '';
            }
            if(p.value == undefined || p.value === "") p.value = "&#160;";
            buf[buf.length] = this.cellTpl.apply(p);
        }

        return this.rowTpl.apply({
            tstyle: 'width:'+this.view.getTotalWidth()+';',
            cells: buf.join('')
        });
    },
    calculate : function(rs, cs){
        var data = {}, r, c, cfg = this.cm.config, cf;
        for(var j = 0, jlen = rs.length; j < jlen; j++){
            r = rs[j];
            for(var i = 0, len = cs.length; i < len; i++){
                c = cs[i];
                cf = cfg[i];
                if(cf.summaryType){
                    data[c.name] = Ext.grid.GroupSummary.Calculations[cf.summaryType](data[c.name] || 0, r, c.name, data);
                }
            }
        }
        return data;
    },
    doGroupEnd : function(buf, g, cs, ds, colCount){
        var data = this.calculate(g.rs, cs);
        buf.push('</div>', this.renderSummary({data: data}, cs), '</div>');
    },
    doWidth : function(col, w, tw){
        var gs = this.view.getGroups(), s;
        for(var i = 0, len = gs.length; i < len; i++){
            s = gs[i].childNodes[2];
            s.style.width = tw;
            s.firstChild.style.width = tw;
            s.firstChild.rows[0].childNodes[col].style.width = w;
        }
    },
    doAllWidths : function(ws, tw){
        var gs = this.view.getGroups(), s, cells, wlen = ws.length;
        for(var i = 0, len = gs.length; i < len; i++){
            s = gs[i].childNodes[2];
            s.style.width = tw;
            s.firstChild.style.width = tw;
            cells = s.firstChild.rows[0].childNodes;
            for(var j = 0; j < wlen; j++){
                cells[j].style.width = ws[j];
            }
        }
    },
    doHidden : function(col, hidden, tw){
        var gs = this.view.getGroups(), s, display = hidden ? 'none' : '';
        for(var i = 0, len = gs.length; i < len; i++){
            s = gs[i].childNodes[2];
            s.style.width = tw;
            s.firstChild.style.width = tw;
            s.firstChild.rows[0].childNodes[col].style.display = display;
        }
    },
    refreshSummary : function(groupValue){
        return this.refreshSummaryById(this.view.getGroupId(groupValue));
    },
    getSummaryNode : function(gid){
        var g = Ext.fly(gid, '_gsummary');
        if(g){
            return g.down('.x-grid3-summary-row', true);
        }
        return null;
    },
    refreshSummaryById : function(gid){
        var g = document.getElementById(gid);
        if(!g){
            return false;
        }
        var rs = [];
        this.grid.store.each(function(r){
            if(r._groupId == gid){
                rs[rs.length] = r;
            }
        });
        var cs = this.view.getColumnData();
        var data = this.calculate(rs, cs);
        var markup = this.renderSummary({data: data}, cs);

        var existing = this.getSummaryNode(gid);
        if(existing){
            g.removeChild(existing);
        }
        Ext.DomHelper.append(g, markup);
        return true;
    },
    doUpdate : function(ds, record){
        this.refreshSummaryById(record._groupId);
    },
    doRemove : function(ds, record, index, isUpdate){
        if(!isUpdate){
            this.refreshSummaryById(record._groupId);
        }
    },
    showSummaryMsg : function(groupValue, msg){
        var gid = this.view.getGroupId(groupValue);
        var node = this.getSummaryNode(gid);
        if(node){
            node.innerHTML = '<div class="x-grid3-summary-msg">' + msg + '</div>';
        }
    }
});

Ext.grid.GroupSummary.Calculations = {
    'sum' : function(v, record, field){
        return v + (record.data[field]||0);
    },
    'count' : function(v, record, field, data){
        return data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
    },
    'max' : function(v, record, field, data){
        var v = record.data[field];
        var max = data[field+'max'] === undefined ? (data[field+'max'] = v) : data[field+'max'];
        return v > max ? (data[field+'max'] = v) : max;
    },
    'min' : function(v, record, field, data){
        var v = record.data[field];
        var min = data[field+'min'] === undefined ? (data[field+'min'] = v) : data[field+'min'];
        return v < min ? (data[field+'min'] = v) : min;
    },
    'average' : function(v, record, field, data){
        var c = data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
        var t = (data[field+'total'] = ((data[field+'total']||0) + (record.data[field]||0)));
        return t === 0 ? 0 : t / c;
    }
};

Ext.grid.HybridSummary = Ext.extend(Ext.grid.GroupSummary, {
    calculate : function(rs, cs){
        var gcol = this.view.getGroupField();
        var gvalue = rs[0].data[gcol];
        var gdata = this.getSummaryData(gvalue);
        return gdata || Ext.grid.HybridSummary.superclass.calculate.call(this, rs, cs);
    },
    updateSummaryData : function(groupValue, data, skipRefresh){
        var json = this.grid.store.reader.jsonData;
        if(!json.summaryData){
            json.summaryData = {};
        }
        json.summaryData[groupValue] = data;
        if(!skipRefresh){
            this.refreshSummary(groupValue);
        }
    },
    getSummaryData : function(groupValue){
        var json = this.grid.store.reader.jsonData;
        if(json && json.summaryData){
            return json.summaryData[groupValue];
        }
        return null;
    }
});

Ext.grid.RowExpander = function(config){
    Ext.apply(this, config);
    this.addEvents({beforeexpand:true,expand:true,beforecollapse:true,collapse:true});
    Ext.grid.RowExpander.superclass.constructor.call(this);
    if(this.tpl){if(typeof this.tpl == 'string'){this.tpl = new Ext.Template(this.tpl);}this.tpl.compile();}
    this.state = {};
    this.bodyContent = {};
};
Ext.extend(Ext.grid.RowExpander,Ext.util.Observable,{
    header:"",width:20,sortable: false,fixed:true,menuDisabled:true,dataIndex:'',id:'expander',lazyRender:true,
    enableCaching:true,
    getRowClass : function(record, rowIndex, p, ds){
        p.cols = p.cols-1;
        var content = this.bodyContent[record.id];
        if(!content && !this.lazyRender){content = this.getBodyContent(record, rowIndex);}
        if(content){p.body = content;}
        return this.state[record.id] ? 'x-grid3-row-expanded' : 'x-grid3-row-collapsed';
    },
    init : function(grid){
        this.grid = grid;
        var view = grid.getView();
        view.getRowClass = this.getRowClass.createDelegate(this);
        view.enableRowBody = true;
        grid.on('render', function(){view.mainBody.on('mousedown', this.onMouseDown, this);}, this);
    },
    getBodyContent : function(record, index){
        if(!this.enableCaching){return this.tpl.apply(record.data);}
        var content = this.bodyContent[record.id];
        if(!content){content = this.tpl.apply(record.data);this.bodyContent[record.id] = content;}
        return content;
    },
    onMouseDown : function(e, t){
        if(t.className=='x-grid3-row-expander'){e.stopEvent();var row=e.getTarget('.x-grid3-row');this.toggleRow(row);}
    },
    renderer : function(v, p, record){
        p.cellAttr = 'rowspan="2"';return '<div class="x-grid3-row-expander">&#160;</div>';
    },
    beforeExpand : function(record, body, rowIndex){
        if(this.fireEvent('beforeexpand', this, record, body, rowIndex) !== false){
            if(this.tpl && this.lazyRender){body.innerHTML = this.getBodyContent(record, rowIndex);}
            return true;
        }
        else{return false;}
    },
    toggleRow : function(row){
        if(typeof row == 'number'){row = this.grid.view.getRow(row);}
        this[Ext.fly(row).hasClass('x-grid3-row-collapsed') ? 'expandRow' : 'collapseRow'](row);
    },
    expandRow : function(row){
        if(typeof row == 'number'){row = this.grid.view.getRow(row);}
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.DomQuery.selectNode('tr:nth(2) div.x-grid3-row-body', row);
        if(this.beforeExpand(record, body, row.rowIndex)){
            this.state[record.id] = true;
            Ext.fly(row).replaceClass('x-grid3-row-collapsed', 'x-grid3-row-expanded');
            this.fireEvent('expand', this, record, body, row.rowIndex);
        }
    },
    collapseRow : function(row){
        if(typeof row == 'number'){row = this.grid.view.getRow(row);}
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.fly(row).child('tr:nth(1) div.x-grid3-row-body', true);
        if(this.fireEvent('beforecollapse', this, record, body, row.rowIndex) !== false){
            this.state[record.id] = false;
            Ext.fly(row).replaceClass('x-grid3-row-expanded', 'x-grid3-row-collapsed');
            this.fireEvent('collapse', this, record, body, row.rowIndex);
        }
    }
});

Ext.override(Ext.form.Checkbox, {
	getValue : function(){
		if(this.rendered){return this.el.dom.checked;}
		return this.checked;
	},
	setValue : function(v) {
		var checked = this.checked;
		this.checked = (v === true || v === 'true' || v == '1' || String(v).toLowerCase() == 'on');
		if(this.rendered){
			this.el.dom.checked = this.checked;
			this.el.dom.defaultChecked = this.checked;
			this.wrap[this.checked? 'addClass' : 'removeClass'](this.checkedCls);
		}
		if(checked != this.checked){
			this.fireEvent("check", this, this.checked);
			if(this.handler){this.handler.call(this.scope || this, this, this.checked);}
		}
	}
});

Ext.grid.CheckboxSelectionModel.override({
	handleMouseDown : function(g, rowIndex, e){
		if(e.button !== 0 || this.isLocked()){return;};
		var view = this.grid.getView();
		if(e.shiftKey && this.last !== false){
			var last = this.last;
			this.selectRange(last, rowIndex, e.ctrlKey);
			this.last = last;
			view.focusRow(rowIndex);
		}
		else{
			var isSelected = this.isSelected(rowIndex);
			if(e.ctrlKey && isSelected){
				this.deselectRow(rowIndex);
			}
			else if(!isSelected || this.getCount() > 1){
				this.selectRow(rowIndex, false);
				view.focusRow(rowIndex);
			}
		}
	}
});

Ext.menu.EditableItem = Ext.extend(Ext.menu.BaseItem, {
    itemCls : "x-menu-item",
    hideOnClick: false,    
    initComponent: function(){
		Ext.menu.EditableItem.superclass.initComponent.call(this);
    	this.addEvents('keyup');    	
		this.editor = this.editor || new Ext.form.TextField();
		if(this.text) this.editor.setValue(this.text);
    },    
    onRender: function(container){
        var s = container.createChild({
        	cls: this.itemCls,
        	html:'<img src="' + this.icon + '" class="x-menu-item-icon" style="position: static; margin: 3px 3px 2px 2px;" />'
        });        
        Ext.apply(this.config, {width: 125});
        this.editor.render(s);
        this.el = s;
        this.relayEvents(this.editor.el, ["keyup"]);        
        if(Ext.isGecko) s.setStyle('overflow', 'auto');			
        Ext.menu.EditableItem.superclass.onRender.call(this, container);
    },    
    getValue: function(){return this.editor.getValue();},    
    setValue: function(value){this.editor.setValue(value);},    
    isValid: function(preventMark){return this.editor.isValid(preventMark);}
});
Ext.menu.RangeMenu = function(config){
	Ext.menu.RangeMenu.superclass.constructor.call(this, config);  
	this.updateTask = new Ext.util.DelayedTask(this.fireUpdate, this);
	var cfg = this.fieldCfg;
	var cls = this.fieldCls;
	var fields = this.fields = Ext.applyIf(this.fields || {}, {
		'gt': new Ext.menu.EditableItem({
			icon: this.icons.gt,
			editor: new cls(typeof cfg == "object" ? cfg.gt || '' : cfg)
    }),
		'lt': new Ext.menu.EditableItem({
			icon: this.icons.lt,
			editor: new cls(typeof cfg == "object" ? cfg.lt || '' : cfg)
    }),
		'eq': new Ext.menu.EditableItem({
			icon:this.icons.eq, 
			editor: new cls(typeof cfg == "object" ? cfg.gt || '' : cfg)
    })
	});
	this.add(fields.gt, fields.lt, '-', fields.eq);	
	for(var key in fields) {
		fields[key].on('keyup', this.onKeyUp.createDelegate(this, [fields[key]], true), this);
	}  
	this.addEvents('update');
};
Ext.extend(Ext.menu.RangeMenu, Ext.menu.Menu, {
	fieldCls:     Ext.form.NumberField,
	fieldCfg:     '',
	updateBuffer: 500,
	icons: {
		gt: './images/greater_then.png', 
		lt: './images/less_then.png',
		eq: './images/equals.png'
	},		
	fireUpdate: function() {
		this.fireEvent("update", this);
	},	
	setValue: function(data) {
		for(var key in this.fields) {
			this.fields[key].setValue(data[key] !== undefined ? data[key] : '');
    	}
		this.fireEvent("update", this);
	},	
	getValue: function() {
		var result = {};
		for(var key in this.fields) {
			var field = this.fields[key];
			if(field.isValid() && String(field.getValue()).length > 0)
				result[key] = field.getValue();
		}		
		return result;
	},  
	onKeyUp: function(event, input, notSure, field) {
    	if(event.getKey() == event.ENTER && field.isValid()) {
	    	this.hide(true);
	    	return;
	  	}	
		if(field == this.fields.eq) {
	    	this.fields.gt.setValue(null);
	    	this.fields.lt.setValue(null);
	  	}
		else this.fields.eq.setValue(null);
	  	this.updateTask.delay(this.updateBuffer);
	}
});

Ext.grid.GridFilters = function(config){		
	this.filters = new Ext.util.MixedCollection();
	this.filters.getKey = function(o) {return o ? o.dataIndex : null;};	
	for(var i=0, len=config.filters.length; i<len; i++) {
		this.addFilter(config.filters[i]);
	}  
	this.deferredUpdate = new Ext.util.DelayedTask(this.reload, this);	
	delete config.filters;
	Ext.apply(this, config);
};
Ext.extend(Ext.grid.GridFilters, Ext.util.Observable, {
	updateBuffer: 500,
	paramPrefix: 'filter',
	filterCls: 'ux-filtered-column',
	local: true,
	autoReload: true,
	stateId: undefined,
	showMenu: true,
	filtersText: 'Filters',
	init: function(grid){
		if(grid instanceof Ext.grid.GridPanel){
      		this.grid  = grid;      
			this.store = this.grid.getStore();
			if(this.local) this.store.on('load', function(store){store.filterBy(this.getRecordFilter());},this);
			else this.store.on('beforeload', this.onBeforeLoad, this);      
      		this.grid.filters = this;      
      		this.grid.addEvents('filterupdate');      
      		grid.on("render", this.onRender, this);
			grid.on("beforestaterestore", this.applyState, this);
      		grid.on("beforestatesave", this.saveState, this);      
		}
		else if(grid instanceof Ext.PagingToolbar) this.toolbar = grid;
	},
	applyState: function(grid, state) {
		this.suspendStateStore = true;
		this.clearFilters();
		if(state.filters) {
			for(var key in state.filters) {
				var filter = this.filters.get(key);
				if(filter) {
					filter.setValue(state.filters[key]);
					filter.setActive(true);
				}
			}
    	}    
		this.deferredUpdate.cancel();
		if(this.local) this.reload();
		this.suspendStateStore = false;
	},
	saveState: function(grid, state){
		var filters = {};
		this.filters.each(function(filter){if(filter.active) filters[filter.dataIndex] = filter.getValue();});
		return state.filters = filters;
	},	
	onRender: function(){
		var hmenu;		
		if(this.showMenu) {
			hmenu = this.grid.getView().hmenu;			
			this.sep=hmenu.addSeparator();
			this.menu=hmenu.add(new Ext.menu.CheckItem({text:this.filtersText,menu:new Ext.menu.Menu()}));
			this.menu.on('checkchange', this.onCheckChange, this);
			this.menu.on('beforecheckchange', this.onBeforeCheck, this);				
			hmenu.on('beforeshow', this.onMenu, this);
		}		
		this.grid.getView().on("refresh", this.onRefresh, this);
		this.updateColumnHeadings(this.grid.getView());
	},
	onMenu: function(filterMenu) {
		var filter = this.getMenuFilter();
		if(filter) {
			this.menu.menu = filter.menu;
			this.menu.setChecked(filter.active, false);
		}		
		this.menu.setVisible(filter !== undefined);
		this.sep.setVisible(filter !== undefined);
	},	
	onCheckChange: function(item, value) {this.getMenuFilter().setActive(value);},	
	onBeforeCheck: function(check, value) {return !value || this.getMenuFilter().isActivatable();},	
	onStateChange: function(event, filter) {
    	if(event == "serialize") return;
		if(filter == this.getMenuFilter()) this.menu.setChecked(filter.active, false);
		if(this.autoReload || this.local) this.deferredUpdate.delay(this.updateBuffer);
		var view = this.grid.getView();
		this.updateColumnHeadings(view);			
		this.grid.saveState();			
		this.grid.fireEvent('filterupdate', this, filter);
	},	
	onBeforeLoad: function(store, options) {
    	options.params = options.params || {};
		this.cleanParams(options.params);		
		var params = this.buildQuery(this.getFilterData());
		Ext.apply(options.params, params);
	},
	onRefresh: function(view) {this.updateColumnHeadings(view);},
	getMenuFilter: function() {
		var view = this.grid.getView();
		if(!view || view.hdCtxIndex === undefined) return null;
		return this.filters.get(view.cm.config[view.hdCtxIndex].dataIndex);
	},
	updateColumnHeadings: function(view) {
		if(!view || !view.mainHd) return;
		var hds = view.mainHd.select('td').removeClass(this.filterCls);
		for(var i=0, len=view.cm.config.length; i<len; i++) {
			var filter = this.getFilter(view.cm.config[i].dataIndex);
			if(filter && filter.active) hds.item(i).addClass(this.filterCls); 
		}
	}, 
	reload: function() {
		if(this.local){
			this.grid.store.clearFilter(true);
			this.grid.store.filterBy(this.getRecordFilter());
		} 
		else {
			this.deferredUpdate.cancel();
			var store = this.grid.store;
			if(this.toolbar) {
				var start = this.toolbar.paramNames.start;
				if(store.lastOptions && store.lastOptions.params && store.lastOptions.params[start]) store.lastOptions.params[start] = 0;
			}
			store.reload();
		}
	},
	getRecordFilter: function() {
		var f = [];
		this.filters.each(function(filter) {if(filter.active) f.push(filter);});		
		var len = f.length;
		return function(record) {
			for(var i=0; i<len; i++) {
				if(!f[i].validateRecord(record)) return false;
      		}
			return true;
		};
	},
	addFilter: function(config) {
		var filter = config.menu ? config : new (this.getFilterClass(config.type))(config);
		this.filters.add(filter);		
		Ext.util.Observable.capture(filter, this.onStateChange, this);
		return filter;
	},
	getFilter: function(dataIndex){return this.filters.get(dataIndex);},
	clearFilters: function() {this.filters.each(function(filter) {filter.setActive(false);});},
	getFilterData: function() {
		var filters = [];		
		this.filters.each(function(f) {
			if(f.active) {
				var d = [].concat(f.serialize());
				for(var i=0, len=d.length; i<len; i++) {
					filters.push({field: f.dataIndex, data: d[i]});
        		}
			}
		});		
		return filters;
	},
	buildQuery: function(filters) {
		var a=[];var op=EQ;		
		for(var i=0, len=filters.length; i<len; i++) {
			var f = filters[i];
			var d=f.data;
			if(d['type']=='date'){
				if(d['comparison']=='lt') op=LE;
				else if(d['comparison']=='gt') op=GE;
				else op=EQ;
			}
			else if(d['type']=='numeric'){
				if(d['comparison']=='lt') op=LE;
				else if(d['comparison']=='gt') op=GE;
				else op=EQ;
			}
			else op=EQ;
			a[a.length]={key:f.field,value:f.data['value'],op:op};
		}
		var p = {xml:Ext.util.JSON.encode(FOSJ(QTJ(a)))};
		return p;
	},
	cleanParams: function(p) {
		var regex = new RegExp("^" + this.paramPrefix + "\[[0-9]+\]");
		for(var key in p) {
			if(regex.test(key)) delete p[key];
    	}
	},
	getFilterClass: function(type){
		return Ext.grid.filter[type.substr(0, 1).toUpperCase() + type.substr(1) + 'Filter'];
	}
});

Ext.ns("Ext.grid.filter");
Ext.grid.filter.Filter = function(config){
	Ext.apply(this, config);		
	this.events = {
		'activate': true,
		'deactivate': true,
		'update': true,
		'serialize': true
	};
	Ext.grid.filter.Filter.superclass.constructor.call(this);	
	this.menu = new Ext.menu.Menu();
	this.init();
	if(config && config.value) {
		this.setValue(config.value);
		this.setActive(config.active !== false, true);
		delete config.value;
	}
};
Ext.extend(Ext.grid.filter.Filter, Ext.util.Observable, {
	active: false,
	dataIndex: null,
	menu: null,
	init: Ext.emptyFn,
	fireUpdate: function() {
		this.value = this.item.getValue();		
		if(this.active) this.fireEvent("update", this);
		this.setActive(this.value.length > 0);
	},
	isActivatable: function() {return true;},
	setActive: function(active, suppressEvent) {
		if(this.active != active) {
			this.active = active;
			if(suppressEvent !== true) this.fireEvent(active ? 'activate' : 'deactivate', this);
		}
	},
	getValue: Ext.emptyFn,
	setValue: Ext.emptyFn,
	serialize: Ext.emptyFn,
	validateRecord: function(){return true;}
});

Ext.grid.filter.BooleanFilter = Ext.extend(Ext.grid.filter.Filter, {
    defaultValue: false,
    yesText: 'Yes',
    noText: 'No',
	init: function(){
	    var gId = Ext.id();
			this.options = [
				new Ext.menu.CheckItem({text: this.yesText, group: gId, checked: this.defaultValue === true}),
				new Ext.menu.CheckItem({text: this.noText, group: gId, checked: this.defaultValue === false})
	    ];		
		this.menu.add(this.options[0], this.options[1]);		
		for(var i=0; i<this.options.length; i++) {
			this.options[i].on('click', this.fireUpdate, this);
			this.options[i].on('checkchange', this.fireUpdate, this);
		}
	},	
	isActivatable: function() {return true;},	
	fireUpdate: function() {
		this.fireEvent("update", this);			
		this.setActive(true);
	},	
	setValue: function(value) {this.options[value ? 0 : 1].setChecked(true);},	
	getValue: function() {return this.options[0].checked;},	
	serialize: function() {
		var args = {type: 'boolean', value: this.getValue()};
		this.fireEvent('serialize', args, this);
		return args;
	},	
	validateRecord: function(record) {return record.get(this.dataIndex) == this.getValue();}
});
Ext.grid.filter.DateFilter = Ext.extend(Ext.grid.filter.Filter, {
	dateFormat: 'm/d/Y',
	pickerOpts: {},
    beforeText: 'Before',
    afterText: 'After',
    onText: 'On',
	init: function() {
		var opts = Ext.apply(this.pickerOpts, {
			minDate: this.minDate, 
			maxDate: this.maxDate, 
			format:  this.dateFormat
		});
		var dates = this.dates = {
			'before': new Ext.menu.CheckItem({text: this.beforeText, menu: new Ext.menu.DateMenu(opts)}),
			'after':  new Ext.menu.CheckItem({text: this.afterText, menu: new Ext.menu.DateMenu(opts)}),
			'on':     new Ext.menu.CheckItem({text: this.onText, menu: new Ext.menu.DateMenu(opts)})
    	};				
		this.menu.add(dates.before, dates.after, "-", dates.on);		
		for(var key in dates) {
			var date = dates[key];
			date.menu.on('select', this.onSelect.createDelegate(this, [date]), this);  
      		date.on('checkchange', function(){this.setActive(this.isActivatable());}, this);
		};
	},  
	onSelect: function(date, menuItem, value, picker) {
    	date.setChecked(true);
    	var dates = this.dates;    
    	if(date == dates.on) {
			dates.before.setChecked(false, true);
			dates.after.setChecked(false, true);
    	} 
    	else {
      	dates.on.setChecked(false, true);      
		if(date == dates.after && dates.before.menu.picker.value < value)
        	dates.before.setChecked(false, true);
		else if (date == dates.before && dates.after.menu.picker.value > value)
        	dates.after.setChecked(false, true);
		}    
    	this.fireEvent("update", this);
  	},  
	getFieldValue: function(field) {return this.dates[field].menu.picker.getValue();},	
	getPicker: function(field) {return this.dates[field].menu.picker;},	
	isActivatable: function() {return this.dates.on.checked || this.dates.after.checked || this.dates.before.checked;},
	setValue: function(value) {
		for(var key in this.dates) {
			if(value[key]) {
				this.dates[key].menu.picker.setValue(value[key]);
				this.dates[key].setChecked(true);
			} 
			else this.dates[key].setChecked(false);
    	}
	},	
	getValue: function() {
		var result = {};
		for(var key in this.dates) {
			if(this.dates[key].checked) result[key] = this.dates[key].menu.picker.getValue();
    	}	
		return result;
	},	
	serialize: function() {
		var args = [];
		if(this.dates.before.checked)
			args = [{type: 'date', comparison: 'lt', value: this.getFieldValue('before').format(this.dateFormat)}];
		if(this.dates.after.checked)
			args.push({type: 'date', comparison: 'gt', value: this.getFieldValue('after').format(this.dateFormat)});
		if(this.dates.on.checked)
			args = {type: 'date', comparison: 'eq', value: this.getFieldValue('on').format(this.dateFormat)};
    	this.fireEvent('serialize', args, this);
		return args;
	},	
	validateRecord: function(record) {
		var val = record.get(this.dataIndex).clearTime(true).getTime();		
		if(this.dates.on.checked && val != this.getFieldValue('on').clearTime(true).getTime()) {
			return false;
    	}
		if(this.dates.before.checked && val >= this.getFieldValue('before').clearTime(true).getTime()) {
			return false;
    	}
		if(this.dates.after.checked && val <= this.getFieldValue('after').clearTime(true).getTime()) {
			return false;
    	}
		return true;
	}
});

Ext.grid.filter.ListFilter = Ext.extend(Ext.grid.filter.Filter, {
	labelField:  'text',
	loadingText: 'Loading...',
	loadOnShow:  true,
	value:       [],
	loaded:      false,
	phpMode:     false,	
	init: function(){
		this.menu.add('<span class="loading-indicator">' + this.loadingText + '</span>');		
		if(this.store && this.loadOnShow) this.menu.on('show', this.onMenuLoad, this);
		else if(this.options){
			var options = [];
			for(var i=0, len=this.options.length; i<len; i++) {
				var value = this.options[i];
				switch(Ext.type(value)) {
					case 'array': options.push(value);break;
					case 'object':options.push([value.id, value[this.labelField]]);break;
					case 'string':options.push([value, value]);break;
				}
			}			
			this.store = new Ext.data.Store({
				reader: new Ext.data.ArrayReader({id: 0}, ['id', this.labelField])
			});
			this.options = options;
			this.menu.on('show', this.onMenuLoad, this);
		}    
		this.store.on('load', this.onLoad, this);
		this.bindShowAdapter();
	},
	bindShowAdapter: function() {
		var oShow = this.menu.show;
		var lastArgs = null;
		this.menu.show = function() {
			if(arguments.length == 0) {
				oShow.apply(this, lastArgs);
			} else {
				lastArgs = arguments;
				oShow.apply(this, arguments);
			}
		};
	},	
	onMenuLoad: function() {
		if(!this.loaded) {
			if(this.options) this.store.loadData(this.options);
      		else  this.store.load();
		}
	},	
	onLoad: function(store, records) {
		var visible = this.menu.isVisible();
		this.menu.hide(false);		
		this.menu.removeAll();		
		var gid = this.single ? Ext.id() : null;
		for(var i=0, len=records.length; i<len; i++) {
			var item = new Ext.menu.CheckItem({
				text: records[i].get(this.labelField), 
				group: gid, 
				checked: this.value.indexOf(records[i].id) > -1,
				hideOnClick: false
      		});			
			item.itemId = records[i].id;
			item.on('checkchange', this.checkChange, this);						
			this.menu.add(item);
		}		
		this.setActive(this.isActivatable());
		this.loaded = true;		
		if(visible) this.menu.show();
	},
	checkChange: function(item, checked) {
		var value = [];
		this.menu.items.each(function(item){if(item.checked) value.push(item.itemId);},this);
		this.value = value;		
		this.setActive(this.isActivatable());
		this.fireEvent("update", this);
	},	
	isActivatable: function() {return this.value.length > 0;},	
	setValue: function(value) {
		var value = this.value = [].concat(value);
		if(this.loaded) {
			this.menu.items.each(function(item) {
				item.setChecked(false, true);
				for(var i=0, len=value.length; i<len; i++) {
					if(item.itemId == value[i]) item.setChecked(true, true);
        		}
			}, this);
    	}			
		this.fireEvent("update", this);
	},	
	getValue: function() {return this.value;},	
	serialize: function() {
    	var args = {type: 'list', value: this.phpMode ? this.value.join(',') : this.value};
    	this.fireEvent('serialize', args, this);
		return args;
	},	
	validateRecord: function(record) {
		return this.getValue().indexOf(record.get(this.dataIndex)) > -1;
	}
});

Ext.grid.filter.NumericFilter = Ext.extend(Ext.grid.filter.Filter, {
	init: function() {
		this.menu = new Ext.menu.RangeMenu();		
		this.menu.on("update", this.fireUpdate, this);
	},	
	fireUpdate: function() {
		this.setActive(this.isActivatable());
		this.fireEvent("update", this);
	},	
	isActivatable: function() {
		var value = this.menu.getValue();
		return value.eq !== undefined || value.gt !== undefined || value.lt !== undefined;
	},	
	setValue: function(value) {this.menu.setValue(value);},	
	getValue: function() {return this.menu.getValue();},	
	serialize: function() {
		var args = [];
		var values = this.menu.getValue();
		for(var key in values) {
			args.push({type: 'numeric', comparison: key, value: values[key]});
    	}
		this.fireEvent('serialize', args, this);
		return args;
	},	
	validateRecord: function(record) {
		var val = record.get(this.dataIndex),
			values = this.menu.getValue();			
		if(values.eq != undefined && val != values.eq) return false;
		if(values.lt != undefined && val >= values.lt) return false;
		if(values.gt != undefined && val <= values.gt) return false;
		return true;
	}
});

Ext.grid.filter.StringFilter = Ext.extend(Ext.grid.filter.Filter, {
	updateBuffer: 500,
	icon: './images/find.png',	
	init: function() {
		var value = this.value = new Ext.menu.EditableItem({icon: this.icon});
		value.on('keyup', this.onKeyUp, this);
		this.menu.add(value);		
		this.updateTask = new Ext.util.DelayedTask(this.fireUpdate, this);
	},	
	onKeyUp: function(event) {
		if(event.getKey() == event.ENTER){
			this.menu.hide(true);
			return;
		}
		this.updateTask.delay(this.updateBuffer);
	},	
	isActivatable: function() {return this.value.getValue().length > 0;},	
	fireUpdate: function() {		
		if(this.active) this.fireEvent("update", this);
		this.setActive(this.isActivatable());
	},	
	setValue: function(value) {
		this.value.setValue(value);
		this.fireEvent("update", this);
	},	
	getValue: function() {return this.value.getValue();},	
	serialize: function() {
		var args = {type: 'string', value: this.getValue()};
		this.fireEvent('serialize', args, this);
		return args;
	},	
	validateRecord: function(record) {
		var val = record.get(this.dataIndex);
		if(typeof val != "string") return this.getValue().length == 0;
		return val.toLowerCase().indexOf(this.getValue().toLowerCase()) > -1;
	}
});

Ext.form.ColorField = function(config){Ext.form.ColorField.superclass.constructor.call(this, config);};
Ext.extend(Ext.form.ColorField, Ext.form.TriggerField,  {
    triggerClass : 'x-form-color-trigger',
    defaultAutoCreate : {tag: "input", type: "text", size: "10", maxlength: "7", autocomplete: "off"},
    maskRe: /[a-f0-9]/i,
    regex: /[a-f0-9]/i,
    validateValue : function(value){
        if(!Ext.form.ColorField.superclass.validateValue.call(this, value)){
            return false;
        }
        if(value.length < 1){
             return true;
        }
        var parseOK = this.parseColor(value);
        if(!value || (parseOK == false)){
            this.markInvalid(String.format(this.invalidText, value, '#AABBCC'));
            return false;
        }
        return true;
    },
    validateBlur : function(){
        return !this.menu || !this.menu.isVisible();
    },
    getValue : function(){
        return Ext.form.ColorField.superclass.getValue.call(this) || "";
    },
    setValue : function(color){
        Ext.form.ColorField.superclass.setValue.call(this, this.formatColor(color));
    },
    parseColor : function(value){
	return (!value || (value.substring(0,1) != '#')) ?
		false : true;
    },
    formatColor : function(value){
		if (value && (this.parseColor(value) == false)) {
			value = '#' + value;
		}
        return value;
    },
    menuListeners : {
        select: function(e, c){this.setValue(c);},
        show : function(){this.onFocus();},
        hide : function(){
            this.focus();
            var ml = this.menuListeners;
            this.menu.un("select", ml.select,  this);
            this.menu.un("show", ml.show,  this);
            this.menu.un("hide", ml.hide,  this);
        }
    },
    onTriggerClick : function(){
        if(this.disabled){return;}
        if(this.menu == null){this.menu = new Ext.menu.ColorMenu();}
        this.menu.on(Ext.apply({}, this.menuListeners, {scope:this}));
        this.menu.show(this.el, "tl-bl?");
    }
});


Fos.HttpProvider = function(config) {
    this.addEvents('readsuccess','readfailure','savesuccess','savefailure');
    Fos.HttpProvider.superclass.constructor.call(this);
    Ext.apply(this, config, {
         delay:750,dirty:false,started:false,autoStart:true,autoRead:true,user:'user',id:1,session:'session'
        ,logFailure:false,logSuccess:false,queue:[],url:SERVICE_URL,
        readUrl:'',
        saveUrl:''
        ,method:'post',saveBaseParams:{},readBaseParams:{}
        ,paramNames:{id:'id',name:'usseName',value:'usseValue',user:'user',session:'session',data:'PUserSetting'
        }
    });
    if(this.autoRead) {this.readState();}
    this.dt = new Ext.util.DelayedTask(this.submitState, this);
    if(this.autoStart) {this.start();}
};
Ext.extend(Fos.HttpProvider, Ext.state.Provider, {
     saveSuccessText:'Save Success'
    ,saveFailureText:'Save Failure'
    ,readSuccessText:'Read Success'
    ,readFailureText:'Read Failure'
    ,dataErrorText:'Data Error'
    ,initState:function(state) {
        if(state instanceof Array) {
            Ext.each(state, function(item) {
                this.state[item.name] = this.decodeValue(item[this.paramNames.value]);
            }, this);
        }
        else {this.state = state ? state : {};}
    }
    ,set:function(name, value) {
        if(!name) {return;}
        this.queueChange(name, value);
    }
    ,start:function() {
        this.dt.delay(this.delay);
        this.started = true;
    }
    ,stop:function() {
        this.dt.cancel();
        this.started = false;
    }
    ,queueChange:function(name, value) {
        var changed = undefined === this.state[name] || this.state[name] !== value;
        var o = {};
        var i;
        var found = false;
        if(changed) {
            o[this.paramNames.name] = name;
            o[this.paramNames.value] = this.encodeValue(value);
            for(i = 0; i < this.queue.length; i++) {
                if(this.queue[i].name === o.name) {
                    this.queue[i] = o;
                    found = true;
                }
            }
            if(false === found) {this.queue.push(o);}
            this.dirty = true;
        }
        if(this.started) {this.start();}
        return changed;
    }
    ,submitState:function() {
        if(!this.dirty){this.dt.delay(this.delay);return;}
        this.dt.cancel();
        this.dirty = false;   
        Ext.Ajax.request({url:this.saveUrl || this.url
                ,method:this.method
                ,scope:this
                ,success:this.onSaveSuccess
                ,failure:this.onSaveFailure
                ,queue:HTUtil.clone(this.queue),
                params:{_A:'USSE_S',_mt:'json'},
                jsonData:{"HtRequest":{"data":{"PUserSetting":this.queue}}}
		});
    }
    ,clear:function(name) {this.set(name, undefined);}
    ,onSaveSuccess:function(response, options) {
        var o = {};        
        try {o = Ext.decode(response.responseText);}
        catch(e) {
        	this.dirty = true;return;
        }
        if(0 != o.code) {this.dirty = true;}
        else {
        	Ext.each(options.queue, function(item) {
                if(!item) {return;}
                var name = item[this.paramNames.name];
                var value = this.decodeValue(item[this.paramNames.value]);
                if(undefined === value || null === value) {
                    Fos.HttpProvider.superclass.clear.call(this, name);
                }
                else {
                    Fos.HttpProvider.superclass.set.call(this, name, value);
                }
            }, this);
            if(false === this.dirty) {this.queue = [];}
            else {
                var i, j, found;
                for(i = 0; i < options.queue.length; i++) {
                    found = false;
                    for(j = 0; j < this.queue.length; j++) {
                        if(options.queue[i].name === this.queue[j].name) {
                            found = true;break;
                        }
                    }
                    if(true === found && this.encodeValue(options.queue[i].value) === this.encodeValue(this.queue[j].value)) {
                        this.queue.remove(this.queue[j]);
                    }
                }
            }
            this.fireEvent('savesuccess', this);
        }
    }
    ,onSaveFailure:function(response, options) {
        this.dirty = true;
        this.fireEvent('savefailure', this);
    }
    ,onReadFailure:function(response, options) {
        this.fireEvent('readfailure', this);
    }
    ,onReadSuccess:function(response, options) {
        var o = {}, data;        
        try {o = Ext.decode(response.responseText);}
        catch(e) {return;}
        if(0==o.code){
            data = o[this.paramNames.data];
            if(!(data instanceof Array) && true === this.logFailure) {return;}
            Ext.each(data, function(item) {
                this.state[item[this.paramNames.name]] = this.decodeValue(item[this.paramNames.value]);
            }, this);
            this.queue = [];
            this.dirty = false;
            this.fireEvent('readsuccess', this);
        }
    }
    ,readState:function() {
        Ext.Ajax.request({url:this.readUrl || this.url
            ,method:this.method
            ,scope:this
            ,success:this.onReadSuccess
            ,failure:this.onReadFailure
            ,params:{_A:'USSE_G',_mt:'json'}
		});
    }
    ,log:function(){if(console) {console.log.apply(console, arguments);}}
});

