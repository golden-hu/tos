
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
	if(HR(M1_WMS+WM_NOTEIN+WMI_IN+WF_ADD))
		//新增入库单
		items[items.length]=FosMenu(T_MAIN,C_IN_NOTE_ADD,'IN_NOTE_ADD',function(){
			var p = new WStorageNote({uuid:HTUtil.UUID(32),
				storageDate:new Date(),
				planedTime:new Date(),
				compCode:sessionStorage.getItem('COMP_CODE'),
				userName:sessionStorage.getItem("USER_NAME"),
				cargoOwnerId:HTStore.getCFG('IN_CARGO_OWNER_NAME'),
				cargoOwnerName:HTStore.getCFGD('IN_CARGO_OWNER_NAME'),
				status:0,
				storageType:0,
				rowAction:'N'});
			return new Fos.StorageNotePanel(p);
		});	
	//
	if(HR(M1_WMS+WM_NOTEIN+WMI_IN))
		//入库单列表
		items[items.length]=FosMenu(T_MAIN,C_IN_NOTE_LIST,'IN_NOTE_LIST',function(){return new Fos.StorageNoteGrid(0);});	
	if(HR(M1_WMS+WM_NOTEIN+WMI_IN))
		//入库明细列表
		items[items.length]=FosMenu(T_MAIN,'入库查看','SHOW_PLACED_AND_PICKED',function(){return new Fos.ShowPlacedAndPickedCargoTab();});

	//冻结货物
	if(HR(M1_WMS))
		items[items.length]=FosMenu(T_MAIN,'冻结货物','FREEZE_START',function(){
			var a=new WPlacedCargo({rowAction:'M',statusFrozen:0});
			return new Fos.FrozenStoragePanel(a);});
	//取消冻结
	if(HR(M1_WMS))
		items[items.length]=FosMenu(T_MAIN,'取消冻结','FREEZE_STOP',function(){
			var a=new WPlacedCargo({rowAction:'M',statusFrozen:1});
			return new Fos.FrozenStoragePanel(a);});
	
	
	//入库panel title:入库管理
	var inPanel = new Ext.Panel({title:C_IN_STOCK_MGT,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	menus[menus.length]=inPanel;
	
	//出库管理
	items=[];
	//新增出库单
	if(HR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_ADD))
		items[items.length]=FosMenu(T_MAIN,C_OUT_NOTE_ADD,'OUT_NOTE_ADD',function(){
			var p = new WStorageNote({uuid:HTUtil.UUID(32),
				planedTime:new Date(),userName:sessionStorage.getItem("USER_NAME"),
				cargoOwnerId:HTStore.getCFG('OUT_CARGO_OWNER_NAME'),
				cargoOwnerName:HTStore.getCFGD('OUT_CARGO_OWNER_NAME'),
				storageDate:new Date(),status:0,storageType:1,rowAction:'N'});
			return new Fos.StorageNoteOutPanel(p);
		});
	//出库单列表
	if(HR(M1_WMS+WM_NOTEOUT+WMI_OUT))
		items[items.length]=FosMenu(T_MAIN,C_OUT_NOTE_LIST,'OUT_NOTE_LIST',function(){return new Fos.StorageNoteOutGrid(1);});	
	
	
	//出库panel title:出库管理
	var outPanel = new Ext.Panel({title:C_OUT_STOCK_MGT,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	menus[menus.length]=outPanel;
	
	//库存管理
	items=[];
	if(HR(M1_WMS+WM_NOTE))		
		items[items.length]=FosMenu(T_MAIN,'库存交易','InventoryBusiness',function(){			
			return new Fos.InventoryBusinessTab();});
	
	if(HR(M1_WMS+WM_NOTE+WMI_CHECK+WF_ADD))		
		items[items.length]=FosMenu(T_MAIN,C_CHECK_NOTE_ADD,'CHECK_NOTE_ADD',function(){
			var p = new WCheckNote({uuid:HTUtil.UUID(32),status:0,rowAction:'N'});
			return new Fos.CheckNotePanel(p);});
	
	if(HR(M1_WMS+WM_NOTE+WMI_CHECK))
		items[items.length]=FosMenu(T_MAIN,"盘点历史",'CHECK_NOTE_LIST',function(){return new Fos.CheckNoteGrid();});
	if(HR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_ADD))		//移库单(新增部分)
		items[items.length]=FosMenu(T_MAIN,'新增移库','TRANS_NOTE_ADD2',function(){
			var p=new WTransNote({uuid:HTUtil.UUID(32),status:0,transDate:new Date(),rowAction:'N'});
			return new Fos.TransNotePanel(p,1);});	
	if(HR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE))		//移库单
		items[items.length]=FosMenu(T_MAIN,"移库历史",'TRANS_NOTE_LIST',function(){return new Fos.TransNoteListGrid();});
	
	
	
	var checkPanel = new Ext.Panel({title:C_STOCK_MGT,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	menus[menus.length]=checkPanel;

	//商务结算
	var items = [];
	if(HR(M1_SET+S_COAU))
		items[items.length]=FosMenu(T_MAIN,'应收应付管理','WCOAU',
				function(){return new Fos.TWMSAuditGrid();});
	
	items[items.length]= '-';
	items[items.length]=FosMenu(T_MAIN,C_BILL_R,'BILL_R',
		function(){return new Wms.BillGrid('R');},!HR(M1_SET+S_BILL_R));
		
	items[items.length]=FosMenu(T_MAIN,C_INVO_R,'INVO_R',
		function(){return new Wms.InvoiceGrid('R');},!HR(M1_SET+S_INVO_R));
	
	/*items[items.length]=FosMenu(T_MAIN,C_PR_R,'PR_R',
			function(){return new Wms.PrGrid('R');},!HR(M1_SET+S_PR_R));*/
	
	items[items.length]=FosMenu(T_MAIN,C_WRITEOFF_R,'VOUC_R',
			function(){return new Wms.VoucherGrid('R');},!HR(M1_SET+S_VOUC_R));
	items[items.length]= '-';
	items[items.length]=FosMenu(T_MAIN,C_BILL_P,'BILL_P',function(){return new Wms.BillGrid('P');},!HR(M1_SET+S_BILL_P));
	items[items.length]=FosMenu(T_MAIN,C_INVO_P,'INVO_P',function(){return new Wms.InvoiceGrid('P');},!HR(M1_SET+S_INVO_P));
	items[items.length]=FosMenu(T_MAIN,C_PR_P,'PR_P',function(){return new Wms.PrGrid('P');},!HR(M1_SET+S_PR_P));
	items[items.length]=FosMenu(T_MAIN,C_WRITEOFF_P,'VOUC_P',function(){return new Wms.VoucherGrid('P');},!HR(M1_SET+S_VOUC_P));

	var apPanel = new Ext.Panel({title:"商务结算",collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	menus[menus.length]=apPanel;
	
	//查询统计--决策中心
	items=[];
	
	items[items.length]=FosMenu(T_MAIN,'入库日报表','CARGO_IN_REPORT1',function(){return new Fos.CargoInReportTab(1,'入库日报表');});	
	items[items.length]=FosMenu(T_MAIN,'移库汇总表','CARGO_IN_REPORT6',function(){return new Fos.CargoInReportTab(4,'移库汇总报表');});
	
	items[items.length]=('-');
	
	if(HR(M1_WMS+WM_NOTEOUT+WMI_PICKED+WF_LIST))	
	items[items.length]=FosMenu(T_MAIN,'出库日报表','CARGO_OUT_REPORT1',function(){return new Fos.CargoOutReportTab(1,'出库日报表','CARGO_OUT_REPORT1');});
	items[items.length]=('-');
	
	if(HR(M1_WMS+WM_NOTE+WMI_INVENTORY+WF_SEARCH))
		items[items.length]=FosMenu(T_MAIN,'库存综合查询','INVENTORY_SEARCH',function(){return new Fos.InventorySearchPanel(1);});	
	items[items.length]=FosMenu(T_MAIN,'库存统计表','INVENTORY_SEARCH',function(){return new Fos.InventorySummaryTab(3);});
	
    items[items.length]='-';
	if(HR(M1_STAT+T_CUEX)) 
		items[items.length]=FosMenu(T_MAIN,C_STAT_AR,'T_CUEX',
				function(){return new Fos.StatArTab('CUEX');});
	if(HR(M1_STAT+T_VEEX)) 
		items[items.length]=FosMenu(T_MAIN,C_STAT_AP,'T_VEEX',
				function(){return new Fos.StatApTab();});
	if(HR(M1_STAT+T_WROF)) 
		items[items.length]=FosMenu(T_MAIN,C_STAT_WRITEOFF,'T_WROF',
				function(){return new Fos.StatWOTab();});
	items[items.length]='-';
	if(HR(M1_STAT+T_ACAR)) 
		items[items.length]=FosMenu(T_MAIN,C_STAT_AR_AC,'T_ACAR',
				function(){return new Fos.StatACTab('AR');});
	if(HR(M1_STAT+T_ACAP)) 
		items[items.length]=FosMenu(T_MAIN,C_STAT_AP_AC,'T_ACAP',
				function(){return new Fos.StatACTab('AP');});			
	
	
	var decisionCenterPanel=new Ext.Panel({title:W_DECISION_CENTER,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	menus[menus.length]=decisionCenterPanel;
	
	
	//客户供应商
	items=[];
	items[items.length] = FosMenu(T_MAIN,'客户管理' ,'C_BOOKER',
	function(){return new Fos.CustomerGrid('Booker');});
	items[items.length] = FosMenu(T_MAIN,'合同管理' ,'C_CONTRACT',
			function(){	return new Fos.ContractGrid();}
	);
	var custPanel=new Ext.Panel({title:'客户供应商',collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	menus[menus.length]=custPanel;
	
	//结算相关
	items=[];
	if(HR(M1_GEN+G_SEWA))
		items[items.length]=FosMenu(T_MAIN,C_SEWA,'SEWA',function(){return new Fos.GSewaGrid();});
	if(HR(M1_GEN+G_CURR))
		items[items.length]=FosMenu(T_MAIN,C_CURR,'CURR',function(){return new Fos.GCurrGrid();});
	if(HR(M1_GEN+G_CHCL))
		items[items.length]=FosMenu(T_MAIN,C_CHCL,'CHCL',function(){return new Fos.GChclGrid();});
	if(HR(M1_GEN+G_CHAR))
		items[items.length]=FosMenu(T_MAIN,C_CHAR,'CHAR',function(){return new Fos.GCharGrid();});
	if(HR(M1_GEN+G_COBA))
		items[items.length]=FosMenu(T_MAIN,C_COBA,'COBA',function(){return new Fos.GCobaGrid();});
	
	items[items.length]=('-');
	
	items[items.length]=FosMenu(T_MAIN,C_INNO_MGT,'INNO',function(){return new Fos.InvoNoGrid();},!HR(M1_SET+S_INNO));
	items[items.length]=FosMenu(T_MAIN,C_CUST_BALANCE,'BALA',function(){return new Fos.BalaGrid();},!HR(M1_SET+S_BALA));
	items[items.length]=FosMenu(T_MAIN,C_EX_RATE,'EXRA',function(){return new Fos.RateTab();},!HR(M1_SET+S_EXRA));
	items[items.length]=FosMenu(T_MAIN,C_INTEREST_RATE,'INRA',function(){return new Fos.InraGrid();},!HR(M1_SET+S_INRA));
	items[items.length]=FosMenu(T_MAIN,C_EXPENSE_TEMPLATE,'EXTE',function(){return new Fos.ExpenseTemplateGrid();},!HR(M1_SET+S_EXTE));
	items[items.length]=('-');
	if(HR(M1_WMS+WM_BASE+M2_RATE+WF_LIST))
		items[items.length]=FosMenu(T_MAIN,'费率管理','RATE',function(){return new Fos.RatePanel();});
	
	var setPanel=new Ext.Panel({title:C_SETTLE_RELATED,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});	
	
	menus[menus.length]=setPanel;
	
	//基础资料
	items=[];
	if(HR(M1_WMS+WM_BASE+M2_WAREHOUSE+WF_LIST))
		items[items.length]=FosMenu(T_MAIN,C_WAREHOUSE,'WAREHOUSE',function(){return new Fos.WarehouseGrid();});
	if(HR(M1_WMS+WM_BASE+M2_AREA+WF_LIST))
		items[items.length]=FosMenu(T_MAIN,C_AREA,'AREA',function(){return new Fos.WAreaGrid();});
	if(HR(M1_WMS+WM_BASE+M2_BLOCK+WF_LIST))
		items[items.length]=FosMenu(T_MAIN,C_BLOCK,'BLOCK',function(){return new Fos.BlockPanel();});
	if(HR(M1_WMS+WM_BASE+M2_CATEGORY+WF_LIST))
		items[items.length]=FosMenu(T_MAIN,C_CARGO_CATEGORY,'CATEGORY',function(){return new Fos.CategoryPanel();});
	if(HR(M1_WMS+WM_BASE+M2_CARGO+WF_LIST))
		items[items.length]=FosMenu(T_MAIN,C_CARGO,'CARGO',function(){return new Fos.CargoPanel();});
	if(HR(M1_GEN+G_UNIT))
		items[items.length]=FosMenu(T_MAIN,"包装单位",'UNIT',function(){return new Fos.GUnitGrid();});
	
	if(HR(M1_GEN+G_TTER))
		items[items.length]=FosMenu(T_MAIN,C_TTER,'TTER',function(){return new Fos.GTterGrid();});
	
	if(HR(M1_GEN+G_PATE))
		items[items.length]=FosMenu(T_MAIN,C_PATE,'PATE',function(){return new Fos.GPateGrid();});
	
	if(HR(M1_GEN+G_TRAT))
		items[items.length]=FosMenu(T_MAIN,C_TRAT,'TRAT',function(){return new Fos.GTratGrid();});
	
	var genPanel = new Ext.Panel({title:C_MASTER_DATA,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	
	menus[menus.length]=genPanel;
	
	items=[];
	//部门
	if(HR(M1_SYS+A_GROU+F_V))
		items[items.length]=FosMenu(T_MAIN,C_GROU,'T_GROU',function(){return new Fos.GroupTab();});
	//角色权限
	if(HR(M1_SYS+A_ROLE+F_V)) 
		items[items.length]=FosMenu(T_MAIN,C_FUNC_PERMISSION,'T_ROLE',function(){return new Fos.RoleTab();});
	//用户管理
	if(HR(M1_SYS+A_USER+F_V)) 
		items[items.length]=FosMenu(T_MAIN,C_USER_MGT,'T_USER',function(){return new Fos.UserTab();});
	//模版管理
	if(HR(M1_SYS+A_TEMP+F_V)) 
		items[items.length]=FosMenu(T_MAIN,C_TEMP_MGT,'G_TEMP',function(){return new Fos.TempTab();});
	//系统参数
	if(HR(M1_SYS+A_COCO+F_V))
		items[items.length]=FosMenu(T_MAIN,'系统参数','G_COCO',function(){return new Fos.CocoTab();});
	//任务分配
	if(HR(M1_SYS+A_COCO+F_V)) 
		items[items.length]=FosMenu(T_MAIN,C_TASK_CFG,'T_TATY',function(){return new Fos.TatyTab();});
	//操作日志
	if(HR(M1_SYS+A_COCO+F_V)) 
		items[items.length]=FosMenu(T_MAIN,C_ACT_LOG,'G_ACLO',function(){return new Fos.AcloGrid();});
	//消息订阅
	if(HR(M1_SYS+A_COCO+F_V)) 
		items[items.length]=FosMenu(T_MAIN,C_MSG_TOPIC_SUB,'T_METO',function(){return new Fos.MetoTab();});
		
	var menuPanel = new Ext.Panel({title:'系统管理',collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	menus[menus.length]=menuPanel;
	
	//网上服务
	items=[];
	if(HR(M1_WMS+WM_NOTEIN+WMI_IN+WF_ADD))
		items[items.length]=FosMenu(T_MAIN,'指令列表','OUT_NOTE_ADD',function(){
			return new Fos.WsStorageNoteGrid(1);
		});
	if(HR(M1_WMS+WM_NOTEIN+WMI_IN+WF_ADD))
		//新增入库单
		items[items.length]=FosMenu(T_MAIN,'入库指令','IN_NOTE_ADD',function(){
			var p = new WStorageNote({uuid:HTUtil.UUID(32),
				storageDate:new Date(),
				planedTime:new Date(),
				compCode:sessionStorage.getItem('COMP_CODE'),
				userName:sessionStorage.getItem("USER_NAME"),
				cargoOwnerId:HTStore.getCFG('IN_CARGO_OWNER_NAME'),
				cargoOwnerName:HTStore.getCFGD('IN_CARGO_OWNER_NAME'),
				status:0,storageType:0,
				rowAction:'N'});
			return new Fos.WsStorageTab(p);
		});
	if(HR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_ADD))
		items[items.length]=FosMenu(T_MAIN,'出库指令','OUT_NOTE_ADD',function(){
			var p = new WStorageNote({uuid:HTUtil.UUID(32),
				planedTime:new Date(),userName:sessionStorage.getItem("USER_NAME"),
				cargoOwnerId:HTStore.getCFG('OUT_CARGO_OWNER_NAME'),
				cargoOwnerName:HTStore.getCFGD('OUT_CARGO_OWNER_NAME'),
				storageDate:new Date(),status:0,storageType:1,rowAction:'N'});
			return new Fos.WSOutPanel(p);
		});
	//网上服务
	var FosWS = new Ext.Panel({title:'网上服务',collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	menus[menus.length]=FosWS;
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
		top.location='index.html';
	else 
		window.location='index.html';
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
	items:[{heigth:40,flex:9,html:'<div class="htshadow">'+SYS_W+'</div>'},
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
