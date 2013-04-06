MyDesktop = new Ext.app.App({
	init :function(){
		Ext.QuickTips.init();
	},
	getModules : function(){
		var items=[];
		if(HR(M1_CRM+V_CUST)) items[items.length]=new MyDesktop.CustWindow();
		if(HR(M1_MARINE)) items[items.length]=new MyDesktop.ContMenuModule();		
		if(HR(M1_AIR)) items[items.length]=new MyDesktop.AirMenuModule();
		if(HR(M1_CUSTOMS)) items[items.length]=new MyDesktop.CudeMenuModule();
		if(HR(M1_DOC)) items[items.length]=new MyDesktop.DocMenuModule();
		if(HR(M1_SET)) items[items.length]=new MyDesktop.SetMenuModule();
		if(HR(M1_STAT)) items[items.length]=new MyDesktop.StatMenuModule();
		if(HR(M1_GEN)) items[items.length]=new MyDesktop.GenMenuModule();
		if(HR(M1_SYS)) items[items.length]=new MyDesktop.SysMenuModule();
		if(HR(M1_CRM+V_PRSH)) items[items.length]=new MyDesktop.PrshWindow();
		return items;
	},
	 getStartConfig : function(){
        return {
            title:SYS,iconCls: 'user',
            toolItems: [//{text:'Settings',iconCls:'settings',scope:this},'-',
                        {text:M_CHANGE_PASS,iconCls:'settings',scope:this,
            				handler:function(){var win = new Fos.PassWin();win.show();}},'-',
                        {text:'安全退出',iconCls:'logout',scope:this,
            				handler:function(){
            					Ext.Msg.confirm(SYS,M_EXIT_CONFIRM,function(btn){
            						if(btn=='yes') {
            							Ext.Ajax.request({url:SERVICE_URL,
		            						params:{_A:'LOGOUT',_mt:'json'},scope:this,
		            			    		success:function(){
		            							sessionStorage.setItem("USER_ID","");
		            							sessionStorage.setItem("USER_PERM","");
		            							sessionStorage.setItem("USER_NAME","");
		            							sessionStorage.setItem("USER_IS_OPERATOR","");
		            							sessionStorage.setItem("USER_IS_SALES","");
		            							sessionStorage.setItem("USER_ALL_VIEW_FLAG","");
		            							sessionStorage.setItem("USER_PASS_CHANGE_DATE","");
		            							sessionStorage.setItem("COMP_CODE","");
		            							clearShortcut();
		            							var win=new Fos.LoginWin();
           							    	 	win.show();
		            			    		},
		            			    		failure:function(){
		            			    			sessionStorage.setItem("USER_ID","");
		            							sessionStorage.setItem("USER_PERM","");
		            							sessionStorage.setItem("USER_NAME","");
		            							sessionStorage.setItem("USER_IS_OPERATOR","");
		            							sessionStorage.setItem("USER_IS_SALES","");
		            							sessionStorage.setItem("USER_ALL_VIEW_FLAG","");
		            							sessionStorage.setItem("USER_PASS_CHANGE_DATE","");
		            							sessionStorage.setItem("COMP_CODE","");
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
    }
    else{
    	

    	//Ext.state.Manager.setProvider(new Fos.HttpProvider());
        Ext.QuickTips.init();
    	HTStore.iniStore();
    	//checkPassEx();
    	MyDesktop.initApp();
    	iniShortcuts();
    	/*if(Ext.isFF||Ext.isOpera){
    	 //禁止后退键 作用于Firefox、Opera  
    		document.onkeypress=HTUtil.banBackSpace;  
    	}
    	else{
    	//禁止后退键  作用于IE、Chrome  
    		document.onkeydown=HTUtil.banBackSpace;  
    	}*/
    	  
    }
});

//系统登录
Fos.LoginWin = function(){
	var txtLoginName = new Ext.form.TextField({fieldLabel:C_USER_NAME,
		id:'userLoginName',anchor:'95%',enableKeyEvents:true,
		listeners:{
		scope:this,
		keydown:{fn:function(f,e){if(e.getKey()==e.ENTER){
			txtPassword.focus();
		}},
		blur:{fn:function(){txtPassword.focus();}}
		}}
	});
	var txtPassword = new Ext.form.TextField({fieldLabel:C_PASSWORD,id:'userPassword',
		inputType:'password',anchor:'95%',enableKeyEvents:true,
		listeners:{
		scope:this,
		keydown:{fn:function(f,e){if(e.getKey()==e.ENTER){this.login();}}
		}}		
	});
	
	this.frm = new Ext.form.FormPanel({labelWidth:60,bodyStyle:'padding:5px',items:[
		txtLoginName,txtPassword]});
	
	this.login=function(){
		var n=this.frm.findById('userLoginName').getValue();
		var p=this.frm.findById('userPassword').getValue();
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
			params:{_A:'LOGIN',_mt:'json',userLoginName:n,userPassword:p},scope:this,
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
        			MyDesktop.initApp();
        			iniShortcuts();
        			HTStore.iniStore();
    			}
    			
    		},
    		failure: function(r){
    			var res=Ext.util.JSON.decode(r.responseText);
    			alert(res.msg);
    		}
		});
	};
    Fos.LoginWin.superclass.constructor.call(this, {title:C_LOGIN,modal:true,width:250,closable:false,
        height:130,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',activeItem:0,items:this.frm,
        listeners:{
    		scope:this,
    		activate :{fn:function(){txtLoginName.focus();}}
    		},
        buttons:[{text:C_LOGON,scope:this,handler:this.login}]
	});
};
Ext.extend(Fos.LoginWin,Ext.Window);
//模块显示弹出框
var createWindow=function(windowId,title,item,modal,width,height){
	var desktop = MyDesktop.getDesktop();
	var win = desktop.getWindow(windowId);
    if(!win){
    	var widthBoolean=true;
    	if(width!=null){
    		widthBoolean=false;
    	}
    	win = desktop.createWindow({id:windowId,title:title,modal:modal,autoScroll:true,
            width:width?width:1000,height:height?height:550,iconCls:'bogus',maximized:widthBoolean,maximizable:true,
            shim:false,animCollapse:false,constrainHeader:true,layout: 'fit',
            items:item
        });
    }
    win.show();
};

function FosMenu(tab,title,wid,fn,disabled){
	var dis = false;
	if(disabled) dis = disabled;
 	/*return {text:title,iconCls:'grid',disabled:dis,scope:this,handler:function(){
 			tab.setActiveTab(tab.getComponent(wid)?tab.getComponent(wid):tab.add(fn()));
 		}
 	};*/
	return {text:title,iconCls:'grid',hidden:dis,scope:this,handler:function(){
			tab.setActiveTab(tab.getComponent(wid)?tab.getComponent(wid):tab.add(fn()));
		}
	};
};

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
		addShortcut(left,top,'sys48x48.png','SYS','系统管理');
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
	
	if(HR(M1_MARINE)){
		addShortcut(left,top,'ship48x48.png','MARINE','海运');
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
	if(HR(M1_TMS)){
		addShortcut(left,top,'truck.png','TMS','陆运');
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
	if(HR(M1_AIR)){
		addShortcut(left,top,'plane48x48.png','AIR','空运');
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
	if(HR(M1_CUSTOMS)){
		addShortcut(left,top,'cude48x48.png','CUSTOMS','关务');
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
	if(HR(M1_WMS)){
		addShortcut(left,top,'warehouse.png','WMS','仓储');
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
	if(HR(M1_EXPRESS)){
		addShortcut(left,top,'express.png','EXPRESS','快件');
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
		addShortcut(left,top,'money48x48.png','SET','结算');
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
	if(HR(M1_COMPLAINTS)){
		addShortcut(left,top,'im48x48.png','COMPLAINTS','客户投诉');
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
	if(HR(M1_CRM)){
		addShortcut(left,top,'im48x48.png','CUSTS','客户供应商');
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
	
/*	if(HR(M1_WEB)){
		addShortcut(left,top,'ie48x48.png','WEBS','网上服务');
		if(cols<COLNUM){
			cols += 1;
			left += 80;
		}
		else{
			cols = 0;
			left = 10;
			top += 80;
		}
	}*/
};

function addShortcut(left,top,img,wid,title){
	var tpl = new Ext.XTemplate(
			'<tpl for=".">',
			'<div style="position: absolute; left: {left}px; top: {top}px; ">',				
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

function clearShortcut(left,top,img,wid,title){	
	var shortcuts = Ext.get('x-shortcuts');
	shortcuts.update('');
};

//主页模块
var openWin=function(id){
	if(id=='AIR'){		
    	createWindow('AIR',C_AIR,getAirPanel());
	}
	else if(id=='CUSTS'){
		createWindow('CUSTS',C_CUST,getCustPanel());
	}
	else if(id=='MARINE'){
    	createWindow('MARINE',C_MARINE,getMarinePanel());
	}
	else if(id=='TMS'){
    	createWindow('TMS',C_TRAN,getTmsPanel());
	}
	else if(id=='EXPRESS'){
		createWindow('EXPRESS',C_EXPRESS_BILL,new Fos.ExpressGrid());
	}
	//仓储
	else if(id=='WMS'){
		//getWMSPanel @ wms.js
    	createWindow('WARE',C_WAREHOUSE_MGT,getWMSPanel());
	}
	else if(id=='CUSTOMS'){		
    	createWindow('CUDE',C_CUSTOMS,getCustomsPanel());
	}
	else if(id=='COMPLAINTS'){
		createWindow('COMPLAINTS',C_CUSTOMER_COMPLAINTS,new Fos.CComplaintsGrid());
	}
	else if(id=='SET'){		
    	createWindow('SET',C_SETTLE,getSettlementPanel());
	}
	else if(id=='STAT'){
    	createWindow('STAT',C_STAT,getStatPanel());
	}
	else if(id=='SYS'){
    	createWindow('SYS',C_SYSTEM_MGT,getSystemPanel());
	}
	else if(id=='GEN'){
    	createWindow('GEN',C_MASTER_DATA,getGeneralPanel());
	}
	else if(id=='DOC'){		
    	createWindow('DOC',C_DOC_MGT,getDocPanel());
	}
};

MyDesktop.CustWindow = Ext.extend(Ext.app.Module, {
    id:'CUST',
    init : function(){
        this.launcher = {text: C_CUST,iconCls:'user',handler : this.createWindow,scope: this};
    },
    createWindow : function(src){
    	createWindow('CUST',C_CUST,new Fos.CustomerGrid());
    }
});
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

MyDesktop.InspModule = Ext.extend(Ext.app.Module, {
	init : function(){this.launcher = {text: '',iconCls:'bogus',handler : this.createWindow,scope: this,windowId:windowIndex};},
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
		if(HR(M1_CUSTOMS+M2_I))
			items[items.length]={text: C_IMP_CUDE,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CUDE_I',bizClass:'I'};
		if(HR(M1_CUSTOMS+M2_E))
			items[items.length]={text: C_EXP_CUDE,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CUDE_E',bizClass:'E'};
		
		this.launcher = {text: C_CUDE,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    }
});

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
		if(HR(M1_AIR+M2_I))
			items[items.length]={text: C_IMP_AIR,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'AIR_I',bizClass:'I'};
		if(HR(M1_AIR+M2_E))
			items[items.length]={text: C_EXP_AIR,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'AIR_E',bizClass:'E'};
		
		this.launcher = {text: C_AIR,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    }
});
		
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
		if(HR(M1_MARINE+M2_F))
			items[items.length]={text: C_IMP_F,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CONT_I_F',bizClass:'I',shipType:'FCL'};
		if(HR(M1_MARINE+M2_FE))
			items[items.length]={text: C_EXP_F,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CONT_E_F',bizClass:'E',shipType:'FCL'};
		if(HR(M1_MARINE+M2_L))
			items[items.length]={text: C_IMP_L,iconCls:'bogus',handler : this.createWindow,scope: this,windowId: 'CONT_I_F',bizClass:'I',shipType:'LCL'};
		if(HR(M1_MARINE+M2_LE))
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

MyDesktop.SetMenuModule = Ext.extend(MyDesktop.SetModule, {
    init : function(){
		var items=[];
		if(HR(M1_SET+S_COAU+F_V))
			items[items.length]={text: C_CONS_AUDIT,iconCls:'bogus',handler:this.createAuditWindow,scope: this,windowId: 'COAU'};
		items[items.length]='-';
		if(HR(M1_SET+S_INVO_R))
			items[items.length]={text: C_INVO_R,iconCls:'bogus',handler : this.createInvoWindow,scope: this,windowId: 'INVO_R',type:'R'};
		if(HR(M1_SET+S_PR_R))
			items[items.length]={text: C_PR_R,iconCls:'bogus',handler : this.createPrWindow,scope: this,windowId: 'PR_R',type:'R'};
		if(HR(M1_SET+S_VOUC_R))
			items[items.length]={text: C_VOUC_R,iconCls:'bogus',handler : this.createVoucWindow,scope: this,windowId: 'VOUC_R',type:'R'};
		items[items.length]='-';
		
		if(HR(M1_SET+S_INVO_P))
			items[items.length]={text: C_INVO_P,iconCls:'bogus',handler : this.createInvoWindow,scope: this,windowId: 'INVO_P',type:'P'};
		if(HR(M1_SET+S_PR_P))
			items[items.length]={text: C_PR_P,iconCls:'bogus',handler : this.createPrWindow,scope: this,windowId: 'PR_P',type:'R'};
		if(HR(M1_SET+S_VOUC_P))
			items[items.length]={text: C_VOUC_P,iconCls:'bogus',handler : this.createVoucWindow,scope: this,windowId: 'VOUC_P',type:'P'};
		items[items.length]='-';
				
		if(HR(M1_SET+S_INNO))
			items[items.length]={text: C_INNO_MGT,iconCls:'bogus',handler : this.createInvoNoWindow,scope: this,windowId:'INNO'};
		if(HR(M1_SET+S_INNO))
			items[items.length]={text: C_CUST_BALANCE,iconCls:'bogus',handler : this.createBalaWindow,scope: this,windowId:'BALA'};
		if(HR(M1_SET+S_EXRA))
			items[items.length]={text: C_EX_RATE,iconCls:'bogus',handler : this.createExraWindow,scope: this,windowId:'EXRA'};
		if(HR(M1_SET+S_INRA))
			items[items.length]={text: C_INRA_SETTING,iconCls:'bogus',handler : this.createInraWindow,scope: this,windowId:'INRA'};
		
		if(HR(M1_SET+S_INRA)){
			var menus=[];
			if(HR(M1_CRM+V_SAQU))
				menus[menus.length]={text: C_COMMISSION_PLAN,iconCls:'bogus',handler:this.createCommWindow,scope: this,windowId:'COMM'};
			if(HR(M1_CRM+V_SAQU))
				menus[menus.length]={text: C_SALES_COMMISSION,iconCls:'bogus',handler : this.createCommSaleWindow,scope: this,windowId: 'COMM_SALE'};
			if(HR(M1_STAT+T_SALES))
				menus[menus.length]={text: C_STAT_SALES_COMMISSION,iconCls:'bogus',handler : this.createCommStatWindow,scope: this,windowId: 'COMM_STAT'};
			
			items[items.length]={text:C_COMMISSION,iconCls: 'bogus',handler: function() {return false;},
     	       menu:{items:menus}};
		}
		this.launcher = {text: C_SETTLE,iconCls: 'bogus',handler: function() {return false;},
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

MyDesktop.SysMenuModule = Ext.extend(MyDesktop.SysModule, {
    init : function(){
		var items=[];
		if(HR(M1_SYS+A_GROU))
			items[items.length]={text: C_GROU,iconCls:'bogus',handler:this.createGrouWindow,scope: this,windowId: 'GROU'};
		if(HR(M1_SYS+A_GROU))
			items[items.length]={text: C_FUNC_PERMISSION,iconCls:'bogus',handler : this.createRoleWindow,scope: this,windowId: 'ROLE'};
		if(HR(M1_SYS+A_USER))
			items[items.length]={text: C_USER_MGT,iconCls:'bogus',handler : this.createUserWindow,scope: this,windowId: 'USER'};
		if(HR(M1_SYS+A_TEMP))
			items[items.length]={text: C_TEMP_MGT,iconCls:'bogus',handler : this.createTempWindow,scope: this,windowId: 'TEMP'};
		if(HR(M1_SYS+A_COCO))
			items[items.length]={text: C_COCO,iconCls:'bogus',handler : this.createCocoWindow,scope: this,windowId: 'COCO'};
		if(HR(M1_SYS+A_COCO))
			items[items.length]={text: C_TASK_CFG,iconCls:'bogus',handler : this.createTatyWindow,scope: this,windowId: 'TATY'};
		if(HR(M1_SYS+A_COCO))
			items[items.length]={text: C_ACT_LOG,iconCls:'bogus',handler : this.createAcloWindow,scope: this,windowId: 'ACLO'};
		if(HR(M1_SYS+A_COCO))
			items[items.length]={text: C_MSG_TOPIC_SUB,iconCls:'bogus',handler : this.createMetoWindow,scope: this,windowId: 'METO'};
						
		this.launcher = {text: C_SYSTEM_MGT,iconCls: 'bogus',handler: function() {return false;},
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

MyDesktop.GenMenuModule = Ext.extend(MyDesktop.GenModule, {
    init : function(){
		var items=[];
		var bizItems=[];
		if(HR(M1_GEN+G_VESS))
			bizItems[bizItems.length]={text: C_VESS,iconCls:'bogus',handler:this.createVessWindow,scope: this,windowId:'VESS'};
		if(HR(M1_GEN+G_DOTY))
			bizItems[bizItems.length]={text: C_DOTY,iconCls:'bogus',handler : this.createDotyWindow,scope: this,windowId: 'DOTY'};
		if(HR(M1_GEN+G_SHLI))
			bizItems[bizItems.length]={text: C_SHLI,iconCls:'bogus',handler : this.createShliWindow,scope: this,windowId: 'SHLI'};
		if(HR(M1_GEN+G_TRTE))
			bizItems[bizItems.length]={text: C_TRTE,iconCls:'bogus',handler : this.createTrteWindow,scope: this,windowId: 'TRTE'};
		if(HR(M1_GEN+G_TTER))
			bizItems[bizItems.length]={text: C_TTER,iconCls:'bogus',handler : this.createTterWindow,scope: this,windowId: 'TTER'};
		if(HR(M1_GEN+G_PATE))
			bizItems[bizItems.length]={text: C_PATE,iconCls:'bogus',handler : this.createPateWindow,scope: this,windowId: 'PATE'};
		if(HR(M1_GEN+G_VEHT))
			bizItems[bizItems.length]={text: C_VEHT,iconCls:'bogus',handler : this.createVehtWindow,scope: this,windowId: 'VEHT'};
		items[items.length]={text:C_BIZ_RELATED,iconCls: 'bogus',handler: function() {return false;},menu:{items:bizItems}};
		
		var placeItems=[];
		if(HR(M1_GEN+G_PORT))
			placeItems[placeItems.length]={text: C_PORT,iconCls:'bogus',handler : this.createPortWindow,scope: this,windowId: 'PORT'};
		if(HR(M1_GEN+G_AIRP))
			placeItems[placeItems.length]={text: C_AIRP,iconCls:'bogus',handler : this.createAirpWindow,scope: this,windowId: 'AIRP'};
		if(HR(M1_GEN+G_PLAC))
			placeItems[placeItems.length]={text: C_PLAC,iconCls:'bogus',handler : this.createPlacWindow,scope: this,windowId: 'PLAC'};
		if(HR(M1_GEN+G_COUN))
			placeItems[placeItems.length]={text: C_COUN,iconCls:'bogus',handler : this.createCounWindow,scope: this,windowId: 'COUN'};
		items[items.length]={text:C_PLAC_RELATED,iconCls: 'bogus',handler: function() {return false;},menu:{items:placeItems}};
		
		var cargoItems=[];
		if(HR(M1_GEN+G_UNIT))
			cargoItems[cargoItems.length]={text: C_UNIT,iconCls:'bogus',handler : this.createUnitWindow,scope: this,windowId: 'UNIT'};
		if(HR(M1_GEN+G_PACK))
			cargoItems[cargoItems.length]={text: C_PACK,iconCls:'bogus',handler : this.createPackWindow,scope: this,windowId: 'PACK'};
		if(HR(M1_GEN+G_COCL))
			cargoItems[cargoItems.length]={text: C_COCL,iconCls:'bogus',handler : this.createCoclWindow,scope: this,windowId: 'COCL'};
		if(HR(M1_GEN+G_COTY))
			cargoItems[cargoItems.length]={text: C_COTY,iconCls:'bogus',handler : this.createCotyWindow,scope: this,windowId: 'COTY'};
		if(HR(M1_GEN+G_COTY))
			cargoItems[cargoItems.length]={text: C_CACL,iconCls:'bogus',handler : this.createCaclWindow,scope: this,windowId: 'CACL'};
		if(HR(M1_GEN+G_COTY))
			cargoItems[cargoItems.length]={text: C_CATY,iconCls:'bogus',handler : this.createCatyWindow,scope: this,windowId: 'CATY'};
		items[items.length]={text:C_CARO_RELATED,iconCls: 'bogus',handler: function() {return false;},menu:{items:cargoItems}};
		
		var cudeItems=[];
		if(HR(M1_GEN+G_TRTY))
			cudeItems[cudeItems.length]={text: C_TRTY,iconCls:'bogus',handler : this.createTrtyWindow,scope: this,windowId: 'TRTY'};
		if(HR(M1_GEN+G_USAG))
			cudeItems[cudeItems.length]={text: C_USAG,iconCls:'bogus',handler : this.createUsagWindow,scope: this,windowId: 'USAG'};
		if(HR(M1_GEN+G_LETY))
			cudeItems[cudeItems.length]={text: C_LETY,iconCls:'bogus',handler : this.createLetyWindow,scope: this,windowId: 'LETY'};
		if(HR(M1_GEN+G_EXSE))
			cudeItems[cudeItems.length]={text: C_EXSE,iconCls:'bogus',handler : this.createExseWindow,scope: this,windowId: 'EXSE'};
		if(HR(M1_GEN+G_TRAT))
			cudeItems[cudeItems.length]={text: C_TRAT,iconCls:'bogus',handler : this.createTratWindow,scope: this,windowId: 'TRAT'};
		if(HR(M1_GEN+G_ISTY))
			cudeItems[cudeItems.length]={text: C_ISTY,iconCls:'bogus',handler : this.createIstyWindow,scope: this,windowId: 'ISTY'};
		items[items.length]={text:C_CUDE_RELATED,iconCls: 'bogus',handler: function() {return false;},menu:{items:cudeItems}};
		
		var setItems=[];
		if(HR(M1_GEN+G_SEWA))
			setItems[setItems.length]={text: C_SEWA,iconCls:'bogus',handler : this.createSewaWindow,scope: this,windowId: 'SEWA'};
		if(HR(M1_GEN+G_CURR))
			setItems[setItems.length]={text: C_CURR,iconCls:'bogus',handler : this.createCurrWindow,scope: this,windowId: 'CURR'};
		if(HR(M1_GEN+G_CHCL))
			setItems[setItems.length]={text: C_CHCL,iconCls:'bogus',handler : this.createChclWindow,scope: this,windowId: 'CHCL'};
		if(HR(M1_GEN+G_CHAR))
			setItems[setItems.length]={text: C_CHAR,iconCls:'bogus',handler : this.createCharWindow,scope: this,windowId: 'CHAR'};
		if(HR(M1_GEN+G_COBA))
			setItems[setItems.length]={text: C_COBA,iconCls:'bogus',handler : this.createCobaWindow,scope: this,windowId: 'COBA'};
		items[items.length]={text:C_SETTLE_RELATED,iconCls: 'bogus',handler: function() {return false;},menu:{items:setItems}};
		this.launcher = {text:C_MASTER_DATA ,iconCls: 'bogus',handler: function() {return false;},
            menu: {items:items}
        };
    },
    createVessWindow : function(src){createWindow(src.windowId,src.text,new Fos.GVessGrid());},
    createPortWindow : function(src){createWindow(src.windowId,src.text,new Fos.GPortGrid());},
    createPlacWindow : function(src){createWindow(src.windowId,src.test,new Fos.GPlacGrid());},
    createDotyWindow : function(src){createWindow(src.windowId,src.text,new Fos.GDotyGrid());},
    createShliWindow : function(src){createWindow(src.windowId,src.text,new Fos.GShliGrid());},    
    createUnitWindow : function(src){createWindow(src.windowId,src.text,new Fos.GUnitGrid());},
    createPackWindow : function(src){createWindow(src.windowId,src.text,new Fos.GPackGrid());},
    createCoclWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCoclGrid());},
    createCotyWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCotyGrid());},
    createCaclWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCaclGrid());},
    createCatyWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCatyGrid());},
    createTrteWindow : function(src){createWindow(src.windowId,src.text,new Fos.GTrteGrid());},
    createTterWindow : function(src){createWindow(src.windowId,src.text,new Fos.GTterGrid());},
    createPateWindow : function(src){createWindow(src.windowId,src.text,new Fos.GPateGrid());},
    createCounWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCounGrid());},
    createVehtWindow : function(src){createWindow(src.windowId,src.text,new Fos.GVehtGrid());},
    
    createTrtyWindow : function(src){createWindow(src.windowId,src.text,new Fos.GTrtyGrid());},
    createUsagWindow : function(src){createWindow(src.windowId,src.text,new Fos.GUsagGrid());},
    createLetyWindow : function(src){createWindow(src.windowId,src.text,new Fos.GLetyGrid());},
    createExseWindow : function(src){createWindow(src.windowId,src.text,new Fos.GExseGrid());},
    createTratWindow : function(src){createWindow(src.windowId,src.text,new Fos.GTratGrid());},
    createIstyWindow : function(src){createWindow(src.windowId,src.text,new Fos.GIstyGrid());},
    
    createSewaWindow : function(src){createWindow(src.windowId,src.text,new Fos.GSewaGrid());},
    createCurrWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCurrGrid());},
    createChclWindow : function(src){createWindow(src.windowId,src.text,new Fos.GChclGrid());},
    createCharWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCharGrid());},
    createCobaWindow : function(src){createWindow(src.windowId,src.text,new Fos.GCobaGrid());}
});
