//tms
MyDesktop = new Ext.app.App({
	init:function(){
		Ext.QuickTips.init();
	},
	getModules : function(){
		var ROLE_ID=sessionStorage.getItem("ROLE_ID");
		var items=[];
		//if(HR(M1_SET)||ROLE_ID==0) items[items.length]=new MyDesktop.SetMenuModule();
		if(HR(M1_GEN)||ROLE_ID==0) 
			items[items.length]=new MyDesktop.GenMenuModule();
		//if(HR(M1_SYS)||ROLE_ID==0) items[items.length]=new MyDesktop.SysMenuModule();
		return items;
	},
    getStartConfig : function(){
        return {
            title:C_WELCOME_HELLO+sessionStorage.getItem('USER_NAME'),iconCls: 'user',
            toolItems: [/*{text:'安全设置',iconCls:'settings',scope:this},'-',*/
                        {text:M_CHANGE_PASS,iconCls:'settings',scope:this,
            				handler:function(){var win = new Fos.PassWin();win.show();}},'-',
                        {text:'安全退出',iconCls:'logout',scope:this,
            				handler:function(){
            					Ext.Msg.confirm(SYS,M_EXIT_CONFIRM,function(btn){
            						if(btn=='yes') {
            							Ext.Ajax.request({url:SERVICE_URL,
		            						params:{_A:'LOGOUT',_mt:'json'},scope:this,
		            			    		success:function(){
		            							sessionStorage.setItem('USER_ID','');
		            							sessionStorage.setItem("USER_PERM","");
		            							sessionStorage.setItem("USER_NAME","");
		            							sessionStorage.setItem("USER_IS_OPERATOR","");
		            							sessionStorage.setItem("USER_IS_SALES","");
		            							sessionStorage.setItem("USER_ALL_VIEW_FLAG","");
		            							sessionStorage.setItem("USER_PASS_CHANGE_DATE","");
		            							sessionStorage.setItem("COMP_CODE","");
		            							sessionStorage.setItem("ROLE_ID","");
		            							clearShortcut();
		            							var win=new Fos.LoginWin();
           							    	 	win.show();
		            			    		},
		            			    		failure:function(){
		            			    			alert('退出失败！');
		            			    			sessionStorage.setItem("USER_ID","");
		            							sessionStorage.setItem("USER_PERM","");
		            							sessionStorage.setItem("USER_NAME","");
		            							sessionStorage.setItem("USER_IS_OPERATOR","");
		            							sessionStorage.setItem("USER_IS_SALES","");
		            							sessionStorage.setItem("USER_ALL_VIEW_FLAG","");
		            							sessionStorage.setItem("USER_PASS_CHANGE_DATE","");
		            							sessionStorage.setItem("COMP_CODE","");
		            							sessionStorage.setItem("ROLE_ID","");
		            							clearShortcut();
		            			    		}
		            					});
            						}
            					});
            				}
            			}]
        };
    }
});
//系统登录前初始化
Ext.onReady(function(){
    if(!sessionStorage.getItem("USER_ID")){
    	var win=new Fos.LoginWin();
		win.show();
    }else{
    	//Ext.state.Manager.setProvider(new Fos.HttpProvider());
        Ext.QuickTips.init();
    	HTStore.iniStore();
    	//checkPassEx();
    	MyDesktop.initApp();
    	iniShortcuts();
    }
});

//模块显示弹出框
var createWindow=function(windowId,title,item,modal,width,height){
	var desktop = MyDesktop.getDesktop();
	var win = desktop.getWindow(windowId);
    if(!win){
    	var widthBoolean=true;
    	if(width!=null){
    		widthBoolean=false;
    	}
    	win = desktop.createWindow({id:windowId,title:title,modal:modal,
            width:width?width:1000,height:height?height:550,iconCls:'',maximized:widthBoolean,maximizable:true,
            		shim:false,animCollapse:false,constrainHeader:true,layout:'fit',
            items:item
        });
    }
    win.show();
};

function FosMenu(tab,t,c,f){
 	return {text:t,iconCls:'greater_then',scope:this,handler:function(){
 			tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(f()));
 		}
 	};
};

function CreateNode(t,c,panel,icon,f){
	return new Ext.tree.TreeNode({text:t,id:c,leaf:true,iconCls:icon,
		listeners:{
			click:function(n,e){
				panel.setActiveTab(panel.getComponent(c)?panel.getComponent(c):panel.add(f()));
			}
		}
	});
};

//初始化桌面
function iniShortcuts(){
	var left = 10;
	var top = 10;
	var iconWidth = 100;
	var cols = 0;
	var COLNUM = 3;
	if(HR(M1_GEN)){
		addShortcut(left,top,'gen48x48.png','GEN','基础数据');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	if(HR(M1_SYS)){
		addShortcut(left,top,'sysm.png','SYS','系统管理');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	if(HR(M1_CUST)){
		addShortcut(left,top,'im48x48.png','CUST','客户管理');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	
	if(HR(M1_CONS)){
		addShortcut(left,top,'tcon.png','TCONSIGN','托运管理');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	if(HR(M1_TRANS)){
		addShortcut(left,top,'truck.png','TRANS','运输管理');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	if(HR(M1_MAINT)){
		addShortcut(left,top,'sys48x48.png','TMAINT','运维管理');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	if(HR(M1_SET)){
		addShortcut(left,top,'money48x48.png','SET','费用结算');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	if(HR(M1_STAT)){
		addShortcut(left,top,'stat48x48.png','STAT','统计分析');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	if(HR(M1_TRACK)){
		addShortcut(left,top,'map.png','TRACK','车辆跟踪');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	if(HR(M1_RECEI)){
		addShortcut(left,top,'doc48x48.png','RECEIPT','回单管理');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
	if(HR(M1_CUST_SERV)){
		addShortcut(left,top,'ie48x48.png','CUST_SERVICE','客户服务');
		if(cols<COLNUM){
			cols += 1;
			left += iconWidth;
		}
		else{
			cols = 0;
			left = 10;
			top += iconWidth;
		}
	}
};

function addShortcut(left,top,img,wid,title){
	var tpl = new Ext.XTemplate(
			'<tpl for=".">',
			'<div style="position:absolute;left:{left}px; top: {top}px; ">',				
				'<a href="javascript:openWin(\'{wid}\')">',		
				'<img src="js/desktop/images/{img}" />',
				' <br>{title}</a>',
			'</div>',
			'</tpl>'
		);
	tpl.compile();
	var html = tpl.apply({left:left,top:top,wid:wid,img:img,title:title});
	var shortcuts = Ext.get('x-shortcuts');
	shortcuts.createChild(html);
};
//清空桌面图标
function clearShortcut(left,top,img,wid,title){	
	var shortcuts = Ext.get('x-shortcuts');
	shortcuts.update('');
};

//主页模块
var openWin=function(id){
	//接单（托运单管理）
	if(id=='TCONSIGN'){
		getConsPanel();
	}
	//派车（运输管理）
	else if(id=='TRANS'){
		getTranTask();
	}
	//车辆运维（运维管理）
	else if(id=='TMAINT'){
		getMaintainPanel();
	}
	//基础数据
	else if(id=='GEN'){
		getGeneralPanel();
	}
	//客户供应商
	else if(id=='CUST'){
		getCustomerPanel();
	}
	//结算
	else if(id=='SET'){
		getSetPanel();
	}
	//系统管理
	else if(id=='SYS'){
		getSysPanel();
	}
	//统计
	else if(id=='STAT'){
		getStatPanel();
	}
	//车辆跟踪(地图)
	else if(id=='TRACK'){
		getMapPanel_v2();
	}
	//回单管理
	else if(id=='RECEIPT'){
		getRecePanel();
	}
	//客户服务
	else if(id=='CUST_SERVICE'){
		getCustServicePanel();
	}
};

//客户供应商
MyDesktop.CustWindow = Ext.extend(Ext.app.Module, {
    id:'CUST',
    init : function(){
        this.launcher = {text: C_CUST,iconCls:'user',handler : this.createWindow,scope: this};
    },
    createWindow : function(src){
    	createWindow('CUST',C_CUST,new Fos.CustomerGrid());
    }
});

//运价管理
MyDesktop.PrshWindow = Ext.extend(Ext.app.Module, {
    id:'PRSH',
    init : function(){
        this.launcher = {text: C_PRICE_MANAGEMENT,iconCls:'user',handler : this.createWindow,scope: this};
    },
    createWindow : function(src){
    	var panel=new Ext.TabPanel({activeTab:0,items:new Fos.PriceSheetGrid()});	
    	createWindow('PRSH',C_PRICE_MANAGEMENT,panel);
    }
});

//报检
MyDesktop.InspModule = Ext.extend(Ext.app.Module, {
	init : function(){
		this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};
	},
    createWindow : function(src){
		var panel=new Ext.TabPanel({activeTab:0,items: [new Fos.ConsignGrid(src.bizClass,'I','')]});		
		createWindow(src.windowId,src.text,panel);
    }
});
MyDesktop.InspMenuModule = Ext.extend(MyDesktop.InspModule, {
    init : function(){
		var items=[];
		if(HR(M1_I+M2_I))
			items[items.length]={text: C_IMP_INSP,iconCls:'bogus',handler : this.createWindow,scope: this,windowId:'INSP_I',bizClass:'I'};
		if(HR(M1_I+M2_E))
			items[items.length]={text: C_EXP_INSP,iconCls:'bogus',handler : this.createWindow,scope: this,windowId:'INSP_E',bizClass:'E'};
		this.launcher = {text: C_INSP,iconCls: 'bogus',handler: function() {return false;},
			menu: {items:items}
		};
    }
});

//报关
MyDesktop.CudeModule = Ext.extend(Ext.app.Module, {
    init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};},
    createWindow : function(src){
    	var panel=new Ext.TabPanel({activeTab:0,items: [new Fos.ConsignGrid(src.bizClass,'G','')]});
    	createWindow(src.windowId,src.text,panel);
    }
});
MyDesktop.CudeMenuModule = Ext.extend(MyDesktop.CudeModule, {
    init : function(){
		var items=[];
		if(HR(M1_G+M2_I))
			items[items.length]={text: C_IMP_CUDE,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CUDE_I',bizClass:'I'};
		if(HR(M1_G+M2_E))
			items[items.length]={text: C_EXP_CUDE,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CUDE_E',bizClass:'E'};
		
		this.launcher = {text: C_CUDE,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    }
});

//空运
MyDesktop.AirModule = Ext.extend(Ext.app.Module, {
    init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};},
    createWindow : function(src){
    	var panel=new Ext.TabPanel({activeTab:0,items: [new Fos.ConsignGrid(src.bizClass,'A','')]});
    	createWindow(src.windowId,src.text,panel);
    }
});
MyDesktop.AirMenuModule = Ext.extend(MyDesktop.AirModule, {
	init : function(){
		var items=[];
		if(HR(M1_A+M2_I))
			items[items.length]={text: C_IMP_AIR,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'AIR_I',bizClass:'I'};
		if(HR(M1_A+M2_E))
			items[items.length]={text: C_EXP_AIR,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'AIR_E',bizClass:'E'};
		
		this.launcher = {text: C_AIR,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    }
});

//散货
MyDesktop.BulkModule = Ext.extend(Ext.app.Module, {
    init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};},
    createWindow : function(src){
    	var panel=new Ext.TabPanel({activeTab:0,items: [new Fos.ConsignGrid(src.bizClass,'B','')]});
    	createWindow(src.windowId,src.text,panel);
    }
});
MyDesktop.BulkMenuModule = Ext.extend(MyDesktop.BulkModule, {
    init : function(){
		var items=[];
		if(HR(M1_B+M2_I))
			items[items.length]={text: C_IMP_BULK,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'BULK_I',bizClass:'I'};
		if(HR(M1_B+M2_E))
			items[items.length]={text: C_EXP_BULK,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'BULK_E',bizClass:'E'};
		
		this.launcher = {text: C_BULK,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    }
});

//进口，出口
MyDesktop.ContModule = Ext.extend(Ext.app.Module, {
    init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};},
    createWindow : function(src){
    	var panel=new Ext.TabPanel({activeTab:0,items: [new Fos.ConsignGrid(src.bizClass,'C',src.shipType)]});
    	createWindow(src.windowId,src.text,panel);
    }
});
MyDesktop.ContMenuModule = Ext.extend(MyDesktop.ContModule, {
    init : function(){
		var items=[];
		if(HR(M1_C+M2_F))
			items[items.length]={text: C_IMP_F,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CONT_I_F',bizClass:'I',shipType:'FCL'};
		if(HR(M1_C+M2_FE))
			items[items.length]={text: C_EXP_F,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CONT_E_F',bizClass:'E',shipType:'FCL'};
		if(HR(M1_C+M2_L))
			items[items.length]={text: C_IMP_L,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CONT_I_F',bizClass:'I',shipType:'LCL'};
		if(HR(M1_C+M2_LE))
			items[items.length]={text: C_EXP_L,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CONT_E_F',bizClass:'E',shipType:'LCL'};
		
		this.launcher = {text: C_CONT,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    }
});

MyDesktop.DocModule = Ext.extend(Ext.app.Module, {
    init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this};},
    createWindow : function(src){
    	createWindow(src.windowId,src.text,new Fos.DocGrid(src.dtype));
    }
});
MyDesktop.DocMenuModule = Ext.extend(MyDesktop.DocModule, {
    init : function(){
		this.launcher = {text: C_DOC_MGT,iconCls: 'bogus',handler: function() {return false;},
            menu: {
                items:[
                {text: C_DOC_ALL,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'DOC_A',dtype:'A'},
                {text: C_DOC_NOT_RETURN,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'DOC_B',dtype:'B'},
                {text: C_DOC_RETURN_NOT_BACK,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'DOC_C',dtype:'C'},
                {text: C_DOC_BACK,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'DOC_D',dtype:'D'}
                ]
            }
        };
    }
});

MyDesktop.SetModule = Ext.extend(Ext.app.Module, {
    init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};}
});
//费用结算
MyDesktop.SetMenuModule = Ext.extend(MyDesktop.SetModule, {
    init : function(){
		var items=[];
		
		if(HR(M1_SET+S_INVO_R))
			items[items.length]={text: C_INVO_R,iconCls:'bogus',handler : this.createInvoWindow,scope: this,windowId: 'INVO_R',type:'R'};
		if(HR(M1_SET+S_PR_R))
			items[items.length]={text: C_PR_R,iconCls:'bogus',handler : this.createPrWindow,scope: this,windowId: 'PR_R',type:'R'};
		/*if(HR(M1_SET+S_VOUC_R))
			items[items.length]={text: C_VOUC_R,iconCls:'bogus',handler : this.createVoucWindow,scope: this,windowId: 'VOUC_R',type:'R'};*/
		items[items.length]='-';
		
		if(HR(M1_SET+S_INVO_P))
			items[items.length]={text: C_INVO_P,iconCls:'bogus',handler : this.createInvoWindow,scope: this,windowId: 'INVO_P',type:'P'};
		if(HR(M1_SET+S_PR_P))
			items[items.length]={text: C_PR_P,iconCls:'bogus',handler : this.createPrWindow,scope: this,windowId: 'PR_P',type:'P'};
		if(HR(M1_SET+S_VOUC_P))
			items[items.length]={text: C_WRITEOFF_P,iconCls:'bogus',handler : this.createVoucWindow,scope: this,windowId: 'VOUC_P',type:'P'};
		items[items.length]='-';
				
		/*if(HR(M1_SET+S_INNO))
			items[items.length]={text: C_INNO_MGT,iconCls:'bogus',handler : this.createInvoNoWindow,scope: this,windowId:'INNO'};*/
		if(HR(M1_SET+S_INNO))
			items[items.length]={text: C_CUST_BALANCE,iconCls:'bogus',handler : this.createBalaWindow,scope: this,windowId:'BALA'};
		/*if(HR(M1_SET+S_EXRA))
			items[items.length]={text: C_EX_RATE,iconCls:'bogus',handler : this.createExraWindow,scope: this,windowId:'EXRA'};
		if(HR(M1_SET+S_INRA))
			items[items.length]={text: C_INRA_SETTING,iconCls:'bogus',handler : this.createInraWindow,scope: this,windowId:'INRA'};*/
		
		this.launcher = {text: S_SETTLE,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    },
    createAuditWindow : function(src){createWindow(src.windowId,src.text,new Fos.ConsignAuditGrid());},
    createInvoWindow : function(src){createWindow(src.windowId,src.text,new Fos.InvoiceGrid(src.type));},
    createPrWindow : function(src){createWindow(src.windowId,src.test,new Fos.PrGrid(src.type));},
    createVoucWindow : function(src){createWindow(src.windowId,src.text,new Fos.VoucherGrid(src.type));},
    createInvoNoWindow : function(src){createWindow(src.windowId,src.text,new Fos.InvoNoGrid());},    
    createBalaWindow : function(src){createWindow(src.windowId,src.text,new Fos.BalaGrid());},
    createExraWindow : function(src){createWindow(src.windowId,src.text,new Fos.RateTab());},
    createInraWindow : function(src){createWindow(src.windowId,src.text,new Fos.InraGrid());},
    createCommWindow : function(src){createWindow(src.windowId,src.text,new Fos.CommissionTab());},
    createCommSaleWindow: function(src){createWindow(src.windowId,src.text,new Fos.SalesCommissionGrid());},
    createCommStatWindow: function(src){createWindow(src.windowId,src.text,new Fos.SalesCommissionTab());}
});

MyDesktop.StatModule = Ext.extend(Ext.app.Module, {
    init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};}
});
MyDesktop.StatMenuModule = Ext.extend(MyDesktop.StatModule, {
    init : function(){
		var items=[];
		if(HR(M1_STAT+T_BUSI))
			items[items.length]={text: C_STAT_BIZ_SUM,iconCls:'bogus',handler:this.createBusiWindow,scope: this,windowId: 'REPT_BUSI'};
		if(HR(M1_STAT+T_BUSI))
			items[items.length]={text: C_STAT_BIZ_SUM_SALES,iconCls:'bogus',handler : this.createBusiSalesWindow,scope: this,windowId: 'REPT_BUSI_SALES'};
		if(HR(M1_STAT+T_BUDE))
			items[items.length]={text: C_STAT_BIZ_DETAIL,iconCls:'bogus',handler : this.createBudeWindow,scope: this,windowId: 'T_BUDE'};
		items[items.length]='-';
		
		if(HR(M1_STAT+T_BUEX))
			items[items.length]={text: C_STAT_PROFIT_SUM,iconCls:'bogus',handler : this.createBuexWindow,scope: this,windowId: 'REPT_BUEX'};
		if(HR(M1_STAT+T_PTEU))
			items[items.length]={text: C_STAT_PROFIT_CONT,iconCls:'bogus',handler : this.createPteuWindow,scope: this,windowId: 'REPT_PTEU'};
		if(HR(M1_STAT+T_PROF))
			items[items.length]={text: C_STAT_PROFIT,iconCls:'bogus',handler : this.createProfWindow,scope: this,windowId: 'REPT_PROF'};
		items[items.length]='-';
		
		if(HR(M1_STAT+T_CUEX))
			items[items.length]={text: C_STAT_AR,iconCls:'bogus',handler : this.createCuexWindow,scope: this,windowId: 'T_CUEX'};
		if(HR(M1_STAT+T_VEEX))
			items[items.length]={text: C_STAT_AP,iconCls:'bogus',handler : this.createVeenWindow,scope: this,windowId:'T_VEEN'};
		if(HR(M1_STAT+T_WROF))
			items[items.length]={text: C_STAT_WRITEOFF,iconCls:'bogus',handler : this.createWrofWindow,scope: this,windowId:'T_WROF'};
		items[items.length]='-';
		
		if(HR(M1_STAT+T_ACAR))
			items[items.length]={text: C_STAT_AR_AC,iconCls:'bogus',handler : this.createAcarWindow,scope: this,windowId: 'T_ACAR'};
		if(HR(M1_STAT+T_ACAP))
			items[items.length]={text: C_STAT_AP_AC,iconCls:'bogus',handler : this.createAcapWindow,scope: this,windowId: 'T_ACAP'};
		if(HR(M1_STAT+T_ARA))
			items[items.length]={text: C_STAT_ARA,iconCls:'bogus',handler : this.createAraWindow,scope: this,windowId:'T_ARA'};
		if(HR(M1_STAT+T_APA))
			items[items.length]={text: C_STAT_APA,iconCls:'bogus',handler : this.createApaWindow,scope: this,windowId:'T_APA'};
				
		this.launcher = {text: C_STAT,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    },
    createBusiWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatSumTab('REPT_BUSI'));},
    createBusiSalesWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatSalesSumTab());},
    createBuexWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatSumTab('REPT_BUEX'));},
    createPteuWindow : function(src){createWindow(src.windowId,src.test,new Fos.StatContProfitTab());},
    createBudeWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatDetailTab());},
    createProfWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatProfitTab('REPT_PROF'));},    
    createAcarWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatACTab('AR'));},
    createAcapWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatACTab('AP'));},
    createCuexWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatArTab('CUEX'));},
    createVeenWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatApTab());},
    createWrofWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatWOTab());},
    createAraWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatAraTab('R'));},
    createApaWindow : function(src){createWindow(src.windowId,src.text,new Fos.StatAraTab('P'));}
});

MyDesktop.SysModule = Ext.extend(Ext.app.Module, {
    init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};}
});
//系统管理
MyDesktop.SysMenuModule = Ext.extend(MyDesktop.SysModule, {
    init : function(){
		var items=[];
		if(HR(M1_SYS+P_GROU))
			items[items.length]={text: C_GROU,iconCls:'bogus',handler:this.createGrouWindow,scope: this,windowId: 'GROU'};
		if(HR(M1_SYS+P_GROU))
			items[items.length]={text: C_FUNC_PERMISSION,iconCls:'bogus',handler : this.createRoleWindow,scope: this,windowId: 'ROLE'};
		if(HR(M1_SYS+P_USER))
			items[items.length]={text: C_USER_MGT,iconCls:'bogus',handler : this.createUserWindow,scope: this,windowId: 'USER'};
						
		this.launcher = {text:C_SYSTEM_MGT,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    },
    createGrouWindow : function(src){createWindow(src.windowId,src.text,new Fos.GroupTab());},
    createRoleWindow : function(src){createWindow(src.windowId,src.text,new Fos.RoleTab());},
    createUserWindow : function(src){createWindow(src.windowId,src.text,new Fos.UserTab);},
    
    createTempWindow : function(src){createWindow(src.windowId,src.text,new Fos.TempTab());},
    createCocoWindow : function(src){createWindow(src.windowId,src.text,new Fos.CocoTab());},
    createTatyWindow : function(src){createWindow(src.windowId,src.text,new Fos.TatyTab());},    
    createAcloWindow : function(src){createWindow(src.windowId,src.text,new Fos.AcloGrid());},
    createMetoWindow : function(src){createWindow(src.windowId,src.text,new Fos.MetoTab());}
});

MyDesktop.GenModule = Ext.extend(Ext.app.Module, {
    init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};}
});
//基础数据
MyDesktop.GenMenuModule = Ext.extend(MyDesktop.GenModule, {
    init:function(){
		var items=[];
		var placeItems=[];
		if(HR(M1_GEN+P_PLAC))
			placeItems[placeItems.length]={text: C_PLAC,iconCls:'bogus',handler : this.createPlacWindow,scope: this,windowId: 'PLAC'};
		if(HR(M1_GEN+P_COUN))
			placeItems[placeItems.length]={text: C_COUN,iconCls:'bogus',handler : this.createCounWindow,scope: this,windowId: 'COUN'};
		items[items.length]={text:C_PLAC_RELATED,iconCls: 'bogus',handler: function() {return false;},menu:{items:placeItems}};
		
		var setItems=[];
		if(HR(M1_GEN+P_SEWA))
			setItems[setItems.length]={text: C_SEWA,iconCls:'bogus',handler : this.createSewaWindow,scope: this,windowId: 'SEWA'};
		if(HR(M1_GEN+P_CURR))
			setItems[setItems.length]={text: C_CURR,iconCls:'bogus',handler : this.createCurrWindow,scope: this,windowId: 'CURR'};
		if(HR(M1_GEN+P_CHCL))
			setItems[setItems.length]={text: C_CHCL,iconCls:'bogus',handler : this.createChclWindow,scope: this,windowId: 'CHCL'};
		if(HR(M1_GEN+P_CHAR))
			setItems[setItems.length]={text: C_CHAR,iconCls:'bogus',handler : this.createCharWindow,scope: this,windowId: 'CHAR'};
		if(HR(M1_GEN+P_COBA))
			setItems[setItems.length]={text: C_COBA,iconCls:'bogus',handler : this.createCobaWindow,scope: this,windowId: 'COBA'};
		items[items.length]={text:C_SETTLE_RELATED,iconCls: 'bogus',handler: function() {return false;},menu:{items:setItems}};
		this.launcher = {text:C_MASTER_DATA ,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    },
    createPlacWindow : function(src){createWindow(src.windowId,src.test,new Fos.GPlacGrid());}, 
    createCounWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCounGrid());},
    createSewaWindow : function(src){createWindow(src.windowId,src.text,new Fos.GSewaGrid());},
    createCurrWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCurrGrid());},
    createChclWindow : function(src){createWindow(src.windowId,src.text,new Fos.GChclGrid());},
    createCharWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCharGrid());},
    createCobaWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCobaGrid());},
    
    createUnitWindow : function(src){createWindow(src.windowId,src.text,new Fos.GUnitGrid());},
    createPackWindow : function(src){createWindow(src.windowId,src.text,new Fos.GPackGrid());},
    createCaclWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCaclGrid());},
    createCatyWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCatyGrid());},
    createTrteWindow : function(src){createWindow(src.windowId,src.text,new Fos.GTrteGrid());},
    createTterWindow : function(src){createWindow(src.windowId,src.text,new Fos.GTterGrid());},
    createPateWindow : function(src){createWindow(src.windowId,src.text,new Fos.GPateGrid());},
    createVehtWindow : function(src){createWindow(src.windowId,src.text,new Fos.GVehtGrid());},
    createExseWindow : function(src){createWindow(src.windowId,src.text,new Fos.GExseGrid());},
    createTratWindow : function(src){createWindow(src.windowId,src.text,new Fos.GTratGrid());}
});