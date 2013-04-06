
var GUID=0;
var GGUID=function(){
	GUID=GUID-1;
	return GUID;
};

function addTabToMain(t){
	var tabId = t.get('id');	
	T_MAIN.setActiveTab(T_MAIN.getComponent(tabId)?T_MAIN.getComponent(tabId):T_MAIN.add(t));
};

function FosMenu(tab,title,wid,fn,disabled){
	var dis = false;
	
	if(disabled) dis = disabled;
 	
	return {text:title,iconCls:'grid',hidden:dis,scope:this,handler:function(){
			tab.setActiveTab(tab.getComponent(wid)?tab.getComponent(wid):tab.add(fn()));
		}
	};
};

function CreateMenu(title,icon,tabId,cls,p1,p2){
	return {text:title,iconCls:icon,scope:this,handler:function(){
		T_MAIN.setActiveTab(T_MAIN.getComponent(tabId)?T_MAIN.getComponent(tabId):T_MAIN.add(new (cls)(p1,p2)));
	}};
};

function CreatePopupMenu(title,icon,url){
	return {text:title,iconCls:icon,scope:this,handler:function(){
		window.open(url);
	}};
};

function CreateNode(title,tabId,cls){
	return new Ext.tree.TreeNode({text:title,leaf:true,
		listeners:{click:function(n,e){
			T_MAIN.setActiveTab(T_MAIN.getComponent(tabId)?T_MAIN.getComponent(tabId):T_MAIN.add(new (cls)()));
		}}
	});
};


//初始化菜单，根据当前登陆用户的权限显示不同的菜单项
var getMenu=function(){	
	var menus=[];	
	var items=[];
	
var menus=[];
	
	//入库管理
	var items=[];
	//集装箱运输 Container transport
	//if (HR(M1_TMS + TMS_CONTAINER_TRANS))
		items[items.length] = FosMenu(T_MAIN,C_CONTAINER_TRANS,'CONTAINER',
				function(){
					return new Fos.ContainerTransPanel();
				});
	
	//集装箱进口委托
	//if(HR(M1_TMS + TMS_CONTAINER_IMPORT))
		items[items.length] = FosMenu(T_MAIN,C_CONTAINER_IMPORT,'IMPORT',
				function(){
					
					return new Fos.ImportContainerPanel();
				});
				
	//集装箱出口委托
	//if(HR(M1_TMS + TMS_CONTAINER_IMPORT))
		items[items.length] = FosMenu(T_MAIN,C_CONTAINER_EXPORT,'EXPORT',
				function(){
					
					return new Fos.ExportContainerPanel();
				});	
	var ctmsPanel = new Ext.Panel({title:'集装箱运输',collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
		
	menus[menus.length]=ctmsPanel;
	return menus;
	
};

var logout=function(){	
	sessionStorage.setItem("USER_PERM","");
	sessionStorage.setItem("USER_ID","");
	sessionStorage.setItem("USER_NAME","");        			
	sessionStorage.setItem("USER_IS_OPERATOR","");  
	sessionStorage.setItem("USER_IS_SALES","");  
	sessionStorage.setItem("USER_ALL_VIEW_FLAG","");  
	sessionStorage.setItem("USER_PASS_CHANGE_DATE","");
	sessionStorage.setItem("COMP_CODE","");
	Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'USER_LO'},scope:this});
	
	if(self!=top) 
		top.location='ctms.html';
	else 
		window.location='ctms.html';
};

HT.AnnouncementWin = function(_r) {
	var txtContent = new Ext.Panel({autoScroll:true,
		html:_r.get('annoContent')
		});

	HT.AnnouncementWin.superclass.constructor.call(this, {modal:true,width:600,height:400,closable:true,
        plain:false,layout:'fit',items:[txtContent]
	});
};
Ext.extend(HT.AnnouncementWin,Ext.Window);

//公告显示PANEL
HT.OaAnnouncementView = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=OaAnnouncement_Q&_mt=xml',
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'OaAnnouncement',idProperty:'id'},OaAnnouncement),
		remoteSort:true,sortInfo:{field:'id', direction:'DESC'}});	
	store.load({params:{start:0,limit:5}});	
	
	var tpl = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="row-wrap" id="{id}">',
			'<div class="title">{annoTitle}({annoDate})</div>',	
		'</div>',
		'</tpl>'
	);
	tpl.compile();
	
	var formatData = function(data) {
		data.annoDate=HTUtil.formatDate(data.annoDate);
		return data;
	};
	
	var doCallback = function(){
		var selNode = view.getSelectedNodes()[0];
		var p=store.getById(selNode.id);
		if(p){
			var win = new HT.AnnouncementWin(p);
			win.show();
		}
	};
	var view = new Ext.DataView({tpl:tpl,singleSelect:true,
		overClass:'row-wrap-over',itemSelector:'div.row-wrap',
		store:store,emptyText: '',
		listeners: {
			'click': {fn:doCallback, scope:this}
		},
		prepareData: formatData.createDelegate(this)
	});	
		
	HT.OaAnnouncementView.superclass.constructor.call(this, {id:'ANNOUNCEMENT_VIEW',padding:1,
		title:C_ANNOUCEMENT,closable:true,autoScroll:true,items:view,
		width:400,height:200,collapsible:true
	});
};
Ext.extend(HT.OaAnnouncementView,Ext.Panel);

//主窗口


var btnLogout=new Ext.Button({width:60,height:24,text:'退出',handler:logout});
var btnChangPSW=new Ext.Button({width:60,height:24,text:'修改密码',handler:function(){var win =new Fos.PassWin();win.show();}});
 
var topPanel=new Ext.Panel({region:'north',height:45,frame:true,layout:'hbox',
	items:[{heigth:40,flex:9,html:'<div class="htshadow">'+SYS_CT+'</div>'},
	       {width:80,padding:2,items:[btnChangPSW]},
		   {width:80,padding:2,items:[btnLogout]}
	]
});

var T_MAIN = new Ext.TabPanel({id:'T_MAIN',region:'center',margins:'0 5 5 0',layoutOnTabChange:true,
	enableTabScroll:true,border:true,enableTabScroll:true,activeTab:0,
	items:[]
});

/*
 * 网页加载完成后执行的操作
 */
Ext.onReady(function(){
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';	
	setTimeout(function(){Ext.get('loading').remove();
	Ext.get('loading-mask').fadeOut({remove:true});},50);
	
	
	
	
	if(!sessionStorage.getItem("USER_ID")){
		var win= new HT.LoginWin();
		win.show();
	}
	else{
		/*var AnnouncementView = new HT.OaAnnouncementView();
		var T_MESS = new Ext.Panel({title:new Date().format('Y-m-d'),padding:5,
			items:[AnnouncementView]
		});
		
		
		T_MAIN.add(T_MESS);*/
		
		var T_MENU = new Ext.Panel({
			id:'AP',title:SYS_MENU,region:'west',split:true,collapsible: true,collapseMode: 'mini',
			margins:'0 0 5 5',cmargins:'0 0 0 0',
			layout:'accordion',width:200,minWidth:100,maxSize:300,
			items:[getMenu()]});
		
		var T_DESKTOP = new Ext.Panel({layout:'border',items:[topPanel,T_MENU,T_MAIN]});
		
		var viewPort = new Ext.Viewport({layout:'fit',items:T_DESKTOP});
		viewPort.doLayout();		
	}
});


/*
 * 用户登陆窗口
 */
HT.LoginWin = function() {	
	var txtLoginName = new Ext.form.TextField({id:'loginName',enableKeyEvents:true,width:200,x:310,y:220,
		listeners:{
		scope:this,
		keydown:{fn:function(f,e){if(e.getKey()==e.ENTER){
			txtPassword.focus();
		}},
		blur:{fn:function(){txtPassword.focus();}}
		}}
	});
	var txtPassword = new Ext.form.TextField({id:'password',inputType:'password',width:200,x:310,y:255,
		enableKeyEvents:true,
		listeners:{
		scope:this,
		keydown:{fn:function(f,e){if(e.getKey()==e.ENTER){this.login();}}
		}}		
	});
	
	this.login=function(){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'LOGIN',_mt:'json',
			userLoginName:txtLoginName.getValue(),userPassword:txtPassword.getValue()},scope:this,
    		success: function(r){	
    			var res=Ext.util.JSON.decode(r.responseText);
    			if(res.code!="fw.success") alert(res.msg);
    			else{
    				sessionStorage.setItem("USER_PERM",res.PUser.funcCode);
        			sessionStorage.setItem("USER_ID",res.PUser.id);
        			sessionStorage.setItem("USER_NAME",res.PUser.userName);        			
        			sessionStorage.setItem("USER_IS_OPERATOR",res.PUser.userOperatorFlag);  
        			sessionStorage.setItem("USER_IS_SALES",res.PUser.userSalesFlag);  
        			sessionStorage.setItem("USER_ALL_VIEW_FLAG",res.PUser.userAllViewFlag);  
        			sessionStorage.setItem("USER_PASS_CHANGE_DATE",res.PUser.userPasswordModifyDate);
        			sessionStorage.setItem("COMP_CODE",res.PUser.compCode);  
        			this.close();
    			
    			/*var AnnouncementView = new HT.OaAnnouncementView();
    			var T_MESS = new Ext.Panel({title:new Date().format('Y-m-d'),padding:5,
    				items:[AnnouncementView]
    			});
    			
    			T_MAIN.add(T_MESS);*/
    			
    			var T_MENU = new Ext.Panel({
    				id:'AP',title:'HI-WMS',region:'west',split:true,collapsible: true,collapseMode: 'mini',
    				margins:'0 0 5 5',cmargins:'0 0 0 0',
    				layout:'accordion',width:200,minWidth:100,maxSize:300,
    				items:[getMenu()]});
    			
    			var T_DESKTOP = new Ext.Panel({layout:'border',items:[topPanel,T_MENU,T_MAIN]});
    			
    			var viewPort = new Ext.Viewport({layout:'fit',items:T_DESKTOP});
    			viewPort.doLayout();
    			}
    		},
    		failure: function(r){
    			Ext.MessageBox.alert(SYS,HTUtil.XTM(r.responseXML));
    		}
		});
	};
	
	var btLogin = new Ext.Button({text:C_LOGON,scope:this,width:80,x:350,y:290,
		listeners:{scope:this,click:function(){this.login();
	}}});
	
    HT.LoginWin.superclass.constructor.call(this, {modal:true,width:737,height:394,closable:false,
        plain:false,bodyStyle:'background-image:url(/FOS4/images/login_bg.png);',
        layout:'absolute',items:[txtLoginName,txtPassword,btLogin],defaultButton:btLogin
	});
};
Ext.extend(HT.LoginWin,Ext.Window);

HT.FavoritesMenuPanel = function() {	
	var menu = new Ext.menu.Menu({floating:false, style: 
	{border:'0px',background:'transparent'},items:[]});
	
	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'Favorites_Q'},
		success: function(res){
			var ra = HTUtil.XTRA(res.responseXML, 'PFavorites', PFavorites);
			for(var i=0;i<ra.length;i++){
				menu.addMenuItem(CreatePopupMenu(ra[i].get('favoTitle'),'list',ra[i].get('favoUrl')));
			}
		}});	

	HT.FavoritesMenuPanel.superclass.constructor.call(this, {title:'公用网址',
		iconCls:'list',collapsible:true,layout:'fit',items:menu
	});
};
Ext.extend(HT.FavoritesMenuPanel,Ext.Panel);
