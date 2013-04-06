var getTmsPanel = function(){
	var panel=new Ext.TabPanel({region:"center",
		enableTabScroll:true ,//添加配置，当TABPANEL中tab较多时提供滚动功能，增强用户体验 ADD BY YongZhixiang 2012-07-03
		animScroll:true,
		plugins: new Ext.ux.TabCloseMenu(),//添加右键菜单配置，提高用户操作便捷性
		activeTab:0,items: []});
	
	var items=[];
	//陆运单列表
	if(HR(M1_TMS+TMS_TCON))
		items[items.length]=FosMenu(panel,C_TRAN_LIST,'TRAN',function(){return new Fos.TConsignGrid();});
	//新增陆运单
	if(HR(M1_TMS+TMS_TCON+F_M))
		items[items.length]=FosMenu(panel,C_ADD_TCONSIGN,'TCONSIGN_ADD',function(){
			var p = new TConsign({uuid:HTUtil.UUID(32),rowAction:'N',
				consBizType:BT_T,
				consDate:new Date(),
				grouId:HTStore.getCFG('DEFAULT_DEPT_T'),
				grouName:HTStore.getCFGD('DEFAULT_DEPT_T'),
				consOperatorId:sessionStorage.getItem("USER_ID"),
				consOperatorName:sessionStorage.getItem("USER_NAME"),
				signInDate:new Date()});
			var consignTab = new Fos.TConsignTab(p);
	    	createWindow('TRAN_'+p.get("uuid"),C_ADD_TCONSIGN,consignTab,true,1000,600);  	
		});
	//派车单列表
	if(HR(M1_TMS+TMS_TTASK))
		items[items.length]=FosMenu(panel,C_TRANS_TASK_LIST,'TTRT',function(){return new Fos.TransTaskGrid();});
	//新增派车单
	if(HR(M1_TMS+TMS_TTASK+F_M))
		items[items.length]=FosMenu(panel,C_ADD_TRANS_TASK,'TRANS_TASK_ADD',function(){
			var p = new TTransTask({uuid:HTUtil.UUID(32),rowAction:'N'}); 
			var taskTab = new Fos.TransTaskTab(p);
	    	createWindow('TASK_'+p.get("uuid"),C_ADD_TRANS_TASK,taskTab,true,1000,600);
		});
	//业务管理
	var bizPanel=new Ext.Panel({title:'业务管理',collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style:{border:'0px',background:'transparent'},items:items}),
		iconCls:'user'});

	items=[];
	//单票审核
	if(HR(M1_SET+S_COAU+'03'))
		items[items.length]=FosMenu(panel,C_CONS_AUDIT,'TCOAU',function(){return new Fos.TConsignAuditGrid();});
	//运价管理
	if(HR(M1_TMS+TMS_PRICE))
		items[items.length]=FosMenu(panel,TRANS_PRICE_MANAGEMENT,'TRANS_PRICE_LIST',function(){return new Fos.TPriceTab();});		
	//业务审核
	var auditPanel=new Ext.Panel({title:'业务审核',collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items}),
		iconCls:'user'});
	
	items=[];
	//维修记录
	if(HR(M1_TMS+TMS_RELO))
		items[items.length]=FosMenu(panel,C_REPAIR_LOG,'RELO',function(){return new Fos.RepairLogGrid();});
	//加油记录
	if(HR(M1_TMS+TMS_OILO))
		items[items.length]=FosMenu(panel,C_OIL_LOG,'OILO',function(){return new Fos.OilLogGrid();});
	//事故记录
	if(HR(M1_TMS+TMS_ACCI))
		items[items.length]=FosMenu(panel,C_ACCIDENT_LOG,'ACCI',function(){return new Fos.AccidentGrid();});
	//加油卡
	if(HR(M1_TMS+TMS_OICA))
		items[items.length]=FosMenu(panel,C_OIL_CARD,'OIL_CARD',function(){return new Fos.OilCardPanel();});
	//安全车管
	var maintainPanel=new Ext.Panel({title:'安全车管',collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items}),
		iconCls:'user'});

	items=[];
	//车辆类型
	if(HR(M1_TMS+TMS_VEHT))
		items[items.length]=FosMenu(panel,C_VEHICLE_CLASS,'VEHT',function(){return new Fos.VehicleClassGrid();});
	//车辆管理
	if(HR(M1_TMS+TMS_VEHI))
		items[items.length]=FosMenu(panel,C_VEHICLE_MAN,'VEHI',function(){return new Fos.VehicleGrid();});
	//驾驶员
	if(HR(M1_TMS+TMS_DRIV))
		items[items.length]=FosMenu(panel,C_DRIVER_MAN,'DRIV',function(){return new Fos.DriverGrid();});
	//事故类型
	if(HR(M1_TMS+TMS_ACTY))
		items[items.length]=FosMenu(panel,C_ACCIDENT_TYPE,'ACTY',function(){return new Fos.AccidentTypeGrid();});
	//油品类型
	if(HR(M1_TMS+TMS_OITY))
		items[items.length]=FosMenu(panel,C_OIL_TYPE,'OITY',function(){return new Fos.OilTypeGrid();});	
	//运输方式
	if(HR(M1_TMS+TMS_TRANT))
		items[items.length]=FosMenu(panel,C_TRAT,'TRANS_TYPE',function(){return new Fos.TransTypeGrid();});
	//加油站
	if(HR(M1_TMS+TMS_OIST))
		items[items.length]=FosMenu(panel,C_OIL_STATION,'OIST',function(){return new Fos.OilStationGrid();});
	//运输网点
	if(HR(M1_TMS+TMS_SITE))
		items[items.length]=FosMenu(panel,C_SITE_MANAG,'SITE',function(){return new Fos.GSiteGrid();});
	//货物跟踪
	if(HR(M1_TMS+TMS_TRACING_SETTING))
		items[items.length]=FosMenu(panel,C_CARGO_TRACING,'P_EVENTTYPE',function(){return new Fos.PEventTypeTab();});
	var genPanel=new Ext.Panel({title:'基础设置',collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style:{border:'0px',background:'transparent'},items:items}),
		iconCls:'user'});
	
	var menuPanel = new Ext.Panel({region:"west",width:180,collapsible:true,layout:'accordion',split:true,
		items:[bizPanel,auditPanel,maintainPanel,genPanel]});
	//取消边框 modified by YongZhixiang 2012-07-04
	var contPanel=new Ext.Panel({layout:"border",border:false,items:[menuPanel,panel]});
	return contPanel;
};
		
//显示收货人
var listConsignee=function(f,e){
	if(e.getKey()!=e.ENTER){
		var q=f.getRawValue();
		if(q.length>0 && !f.isExpanded()){
	   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
	   			params:{_A:'TMS_CONSIGNEE_Q',_mt:'xml',consigneeName:q},
				success: function(r,o){
					f.store.loadData(r.responseXML,false);
					f.expand();
				}
			});
		}
		else if(q.length==0 && f.isExpanded()){f.store.removeAll();}
	}
};
//陆运单列表
Fos.TConsignGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TCON_Q',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TConsign',id:'id'},TConsign),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
		store.load({params:{start:0,limit:C_PS20}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[
	new Ext.grid.RowNumberer(),sm,
	{header:C_STATUS,dataIndex:'status',renderer:HTStore.loadStatusRender,width:80},
	{header:C_TRAN_NO,dataIndex:'consNo',width:150},
	//renderer:function(v){return "<span style='color:red;font-weight:bold;'>"+ v + "</span>";}
	{header:'合同时效期',dataIndex:'contractDate',renderer:formatDate},
	{header:'委托日期',dataIndex:'consDate',renderer:formatDate},
	{header:C_BOOKER,dataIndex:'custName',width:130},
	{header:'业务当担',dataIndex:'custContact'},
	{header:'业务当担电话',dataIndex:'custTel',width:120},
	{header:'操作员',dataIndex:'consOperatorName'},
	//,renderer:function(v){return "<span style='color:#2828FF;font-weight:bold;'>"+ v + "</span>";}
	{header:'始发站',dataIndex:'startStation'},
	{header:'目的站',dataIndex:'endStation'},
	{header:'是否签收',dataIndex:'signInStatus',renderer:function(v){if(v==false){return "否";}else{return "是";}}},
	{header:'收货地址',dataIndex:'deliveryAddress'},
	/*{header:'承运商1单号',dataIndex:'motorcade2No'},
	{header:'承运商1',dataIndex:'motorcade2Name'},
	{header:'承运商1联系人',dataIndex:'motorcade2Contact'},
	{header:'承运商1省',dataIndex:'motorcade2Province'},
	{header:'承运商1市/县',dataIndex:'motorcade2City'},
	{header:'承运商1电话',dataIndex:'motorcade2Tel'},
	{header:'承运商1地址',dataIndex:'motorcade2Address'},
	{header:'承运商2单号',dataIndex:'motorcade3No'},
	{header:'承运商2',dataIndex:'motorcade3Name'},
	{header:'承运商2联系人',dataIndex:'motorcade3Contact'},
	{header:'承运商2省',dataIndex:'motorcade3Province'},
	{header:'承运商2市/县',dataIndex:'motorcade3City'},
	{header:'承运商2电话',dataIndex:'motorcade3Tel'},
	{header:'承运商2地址',dataIndex:'motorcade3Address'},*/
	{header:'驾驶员',dataIndex:'driverName'},
	{header:'车牌号',dataIndex:'vehicleNo'},
	{header:'承运商1',dataIndex:'motorcadeName'},
	{header:'承运商1联系人',dataIndex:'motorcadeContact'},
	{header:'承运商1电话',dataIndex:'motorcadeTel'}
	],defaults:{sortable:false,width:100}});
	
	this.showTConsign = function(p){
		var consignTab = new Fos.TConsignTab(p,store);
    	createWindow('TRAN_'+p.get("uuid"),p.get('rowAction')=='N'?C_ADD_TRANS_BILL:C_TRANS_BILL+'-'+p.get('consNo'),
    			consignTab,true,1000,600);
    };
    //添加
	this.add=function(){
		var r = new TConsign({uuid:HTUtil.UUID(32),rowAction:'N',
			consBizType:BT_T,consDate:new Date(),
			grouId:HTStore.getCFG('DEFAULT_DEPT_T'),
			grouName:HTStore.getCFGD('DEFAULT_DEPT_T'),
			consOperatorId:sessionStorage.getItem("USER_ID"),
			consOperatorName:sessionStorage.getItem("USER_NAME"),
			status:'0'
		}); 
		this.showTConsign(r);
	};
	//删除
	this.del=function(){
		var b =sm.getSelected();
		if(b){
	    	if(b.get('status')=='1') Ext.Msg.alert(SYS,'该陆运单已提货，不可以删除!');
	    	else if(b.get('status')=='2') Ext.Msg.alert(SYS,'该陆运单已到门，不可以删除!');
	    	else{
	    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
		        	if(btn == 'yes') {
		        		var xml = HTUtil.RTX4R(b,'TConsign');
		        		HTUtil.REQUEST('TCON_S', xml, function(){store.remove(b);});
		        	}
				},this);
	    	}
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	//编辑
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showTConsign(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	//快速查询
	this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,C_TRAN_NO_REQUIRED,function(b){kw.focus();});
			return;
		}else{
			if(consNo=='请输入运单号...'){
				XMG.alert(SYS,C_TRAN_NO_REQUIRED,function(b){kw.focus();});
				return;
			}else{
				var a=[];
				a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
		 		store.baseParams={_A:'TCON_SEARCH',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a)),typeKey:'1'};
		 		store.reload({params:{start:0,limit:C_PS20},callback:function(r){
		 			if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
		 		});
			}
		};
	};
	
	//复杂查询
	this.search = function(){
		var w=new Fos.TConsignSearchWin('TCON_SEARCH',store);
		w.show();
	};
	
	var kw = new Ext.form.TextField({value:'请输入运单号...',
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});

	//单票货物跟踪状态
	this.event=function(){
		var p =sm.getSelected();
		if(p){
			createWindow(new Fos.PEventWin(p),true);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	//客户对账表
	this.expExcel1=function(){
		if(store.baseParams.typeKey==1)
			EXPC('TCONSIGN_LIST','&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)
			EXPC('TCONSIGN_LIST','&sort=id&dir=ASC&orderNo=' + store.baseParams.orderNo);
		else
			EXPC('TCONSIGN_LIST','&sort=id&dir=ASC');
	};
	var exp1={text:'客户对账表',scope:this,handler:this.expExcel1};
	
	//供应商付款表
	this.expExcel2=function(){
		if(store.baseParams.typeKey==1)
			EXPC('TCONSIGN_P_LIST','&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)
			EXPC('TCONSIGN_P_LIST','&sort=id&dir=ASC&orderNo=' + store.baseParams.orderNo);
		else
			EXPC('TCONSIGN_P_LIST','&sort=id&dir=ASC');
	};
	var exp2={text:'供应商付款表',scope:this,handler:this.expExcel2};
	
	//办事处日报表
	this.expExcel3=function(){
		if(store.baseParams.typeKey==1)
			EXPC('TCONSIGN_SITE','&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)
			EXPC('TCONSIGN_SITE','&sort=id&dir=ASC&orderNo=' + store.baseParams.orderNo);
		else
			EXPC('TCONSIGN_SITE','&sort=id&dir=ASC');
	};
	var exp3={text:'办事处日报表',scope:this,handler:this.expExcel3};
	
	//客户日报表
	this.expExcel4=function(){
		if(store.baseParams.typeKey==1)
			EXPC('TCONSIGN_CARGO','&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)
			EXPC('TCONSIGN_CARGO','&sort=id&dir=ASC&orderNo=' + store.baseParams.orderNo);
		else
			EXPC('TCONSIGN_CARGO','&sort=id&dir=ASC');
	};
	var exp4={text:'客户日报表',scope:this,handler:this.expExcel4};
	
	//汇总报表
	this.expExcel5=function(){
		if(store.baseParams.typeKey==1)									//复杂查询-订单查询类型
			EXPC('TCONSIGN','&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		else if(store.baseParams.typeKey==2)							//复杂查询-综合查询类型
			EXPC('TCONSIGN','&sort=id&dir=ASC&orderNo=' + store.baseParams.orderNo);
		else
			EXPC('TCONSIGN','&sort=id&dir=ASC');
	};
	
	var exp5={text:'汇总报表',scope:this,handler:this.expExcel5,disabled:NR(M1_SET)};//disabled设置财务有权限才可以下载此报表
	var m = M1_TMS + TMS_TCON;
	
	Fos.TConsignGrid.superclass.constructor.call(this,{title:C_TRAN_LIST,
    id:'G_TRAN',iconCls:'grid',header:false,closable:true,store:store,sm:sm,cm:cm,loadMask:true,
    listeners:{scope:this,
		rowdblclick: function(grid, rowIndex, event){
			var p=sm.getSelected();
			if(p && HR(m+F_V)){
				this.showTConsign(p);
			}
		}},
	bbar:PTB(store,C_PS20),
	tbar:[
	    {text:C_ADD,iconCls:'add',disabled:NR(m+F_M),scope:this,handler:this.add},'-',
		{text:C_EDIT,iconCls:'option',disabled:NR(m+F_V),scope:this,handler:this.edit},'-',
        {text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),scope:this,handler:this.del}, '-', 
        kw,{text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch},'-',
        {text:'复杂查询',iconCls:'search',scope:this,handler:this.search}, '-',
        {text:C_CARGO_TRACING,iconCls:'add',disabled:NR(m+'04'),scope:this,handler:this.event},'-',
        {text:C_EXPORT,iconCls:'print',scope:this,
        	menu:{items:[exp1,'-',exp2,'-',exp3,'-',exp4,'-',exp5]}}
        ]
    });
};
Ext.extend(Fos.TConsignGrid, Ext.grid.GridPanel);
//新增陆运单
Fos.TConsignTab = function(p,listStore){
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TCON_CAR_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TConsignCargo',id:'id'},TConsignCargo),
		remoteSort:false,sortInfo:{field:'id', direction:'desc'}});
	if(p.get('rowAction')!='N')
		store.load({params:{consId:p.get('id')}});
	
	var driverStroe = new Ext.data.Store({url:SERVICE_URL+'?_A=DRIV_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var vehicleStroe = new Ext.data.Store({url:SERVICE_URL+'?_A=VEHI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var transTypeStore = new Ext.data.Store({url:SERVICE_URL+'?_A=T_TRANS_TYPE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TTransType',id:'id'},TTransType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
	{header:'订单编号',dataIndex:'orderNo',width:150,editor:new Ext.form.TextField()},
	{header:'货名',dataIndex:'cargoName',width:150,editor:new Ext.form.TextField()},
	{header:C_PACK,dataIndex:'packName',width:150,
			editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',editable:false,//必须选择产生，禁止手工输入 
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()})},
	{header:'订单数量',dataIndex:'packages',width:100,editor:new Ext.form.NumberField({allowBlank:false})},
	{header:'台数',dataIndex:'packagesNo',width:100,editor:new Ext.form.NumberField({allowBlank:false})},
	{header:'出货数量',dataIndex:'pachagesOut',width:100,editor:new Ext.form.NumberField({allowBlank:false})},
	{header:'包装件数',dataIndex:'packagesNumber',width:100,editor:new Ext.form.NumberField({allowBlank:false})},
	{header:'毛重(KGS)',dataIndex:'grossWeight',width:120,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},	
	{header:'体积(CBM)',dataIndex:'measurement',width:120,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
	{header:'毛重(KGS)(承运人)',dataIndex:'grossWeightProvider',width:140,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},	
	{header:'体积(CBM)(承运人)',dataIndex:'measurementProvider',width:140,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
	{header:'货物类别',dataIndex:'cargoClassName',width:100,
		editor:new Ext.form.ComboBox({displayField:'caclNameCn',valueField:'caclNameCn',triggerAction:'all',
        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCACL_S()
		})},
    {header:'货物价值',dataIndex:'premiumValue',width:150,renderer:rateRender,
        	editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
    {header:'保险费率',dataIndex:'premiumRate',width:100,renderer:rateRender,
        	editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
    {header:'保险费',dataIndex:'premiumExpense',width:100,
        		renderer:function(v,m,r){
			    	v=parseFloat(v);
			    	v=v.toFixed(4);
			    	if(v=='NaN'){
			    		v='0.0000';
			    	};
			    	m.css='green-b';
			    	return v;
			    },
        	editable:false,//保险费由系统自动计算 产生 ，无需录入
        	editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
    {header:'货物价值(承运人)',dataIndex:'premiumValueProvider',width:120,renderer:rateRender,
            editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
    {header:'保险费率(承运人)',dataIndex:'premiumRateProvider',width:120,renderer:rateRender,
            editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
    {header:'保险费(承运人)',dataIndex:'premiumExpenseProvider',width:120,
            	renderer:function(v,m,r){
			    	v=parseFloat(v);
			    	v=v.toFixed(4);
			    	if(v=='NaN'){
			    		v='0.0000';
			    	};
			    	m.css=(v==5?'red-b':'green-b');
			    	return v;
			    },
            editable:false,//保险费由系统自动计算 产生 ，无需录入
            editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})},
	{header:C_REMARKS,dataIndex:'remarks',width:70,editor:new Ext.form.TextField()}
	],defaults:{sortable:false,width:100}});
    	
	this.addConsignCargo = function(){
		var tc = new TConsignCargo({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'});
		grid.stopEditing();
    	store.insert(0,tc);
    	grid.startEditing(0,2);
	};
	this.del = function(){
		HTUtil.REMOVE_SM(sm,store);this.reCalculate();//删除记录后重新计算合计项目 ADD BY YONGZHIXIANG 2012-07-11
	};
	//货物列表-TBAR
	var txtSumPackages = new Ext.form.TextField({width:80,value:p.get('packages'),disabled:true});
	var txtSumGrossWeight = new Ext.form.TextField({width:80,value:p.get('grossWeight'),disabled:true});
	var txtSumMeasurement = new Ext.form.TextField({width:80,value:p.get('measurement'),disabled:true});
	var txtSumCargoValue = new Ext.form.TextField({width:80,value:p.get('premiumValue'),disabled:true});
	var txtSumPremiumExpense = new Ext.form.TextField({width:80,value:p.get('premiumExpense'),disabled:true});
	//货物列表-BBAR
	var txtSumGrossWeightP = new Ext.form.TextField({width:80,value:p.get('grossWeightProvider'),disabled:true});
	var txtSumMeasurementP = new Ext.form.TextField({width:80,value:p.get('measurementProvider'),disabled:true});	
	var txtSumCargoValueP = new Ext.form.TextField({width:80,value:p.get('premiumValueProvider'),disabled:true});
	var txtSumPremiumExpenseP = new Ext.form.TextField({width:80,value:p.get('premiumExpenseProvider'),disabled:true});
	//货物列表-EditorGrid listener
	this.reCalculate = function(){
		var a=store.getRange();
		var sumPackages=0;
		var sumGrossWeight=0;
		var sumMeasurement=0;
		var sumGrossWeightP=0;
		var sumMeasurementP=0;
		var sumCargoValue=0;
		var sumPremiumExpense=0;
		var sumCargoValueP=0;
		var sumPremiumExpenseP=0;
		for(var i=0;i<a.length;i++){
			sumPackages+=parseInt(a[i].get('packages'));
			if(a[i].get('grossWeight'))
				sumGrossWeight+=parseFloat(a[i].get('grossWeight'));
			if(a[i].get('measurement'))
				sumMeasurement+=parseFloat(a[i].get('measurement'));
			if(a[i].get('premiumValue'))
				sumCargoValue+=parseFloat(a[i].get('premiumValue'));
			if(a[i].get('premiumExpense'))
				sumPremiumExpense+=parseFloat(a[i].get('premiumExpense'));
			if(a[i].get('grossWeightProvider'))
				sumGrossWeightP+=parseFloat(a[i].get('grossWeightProvider'));
			if(a[i].get('measurementProvider'))
				sumMeasurementP+=parseFloat(a[i].get('measurementProvider'));
			if(a[i].get('premiumValueProvider'))
				sumCargoValueP+=parseFloat(a[i].get('premiumValueProvider'));
			if(a[i].get('premiumExpenseProvider'))
				sumPremiumExpenseP+=parseFloat(a[i].get('premiumExpenseProvider'));
		}
		p.set('packages',sumPackages);
		p.set('grossWeight',sumGrossWeight);
		p.set('measurement',sumMeasurement);
		p.set('grossWeightProvider',sumGrossWeightP);
		p.set('measurementProvider',sumMeasurementP);
		p.set('premiumValue',sumCargoValue);
		p.set('premiumExpense',sumPremiumExpense);
		p.set('premiumValueProvider',sumCargoValueP);
		p.set('premiumExpenseProvider',sumPremiumExpenseP);
		
		txtSumPackages.setValue(sumPackages);
		txtSumGrossWeight.setValue(HTUtil.round2(sumGrossWeight));
		txtSumMeasurement.setValue(HTUtil.round2(sumMeasurement));
		txtSumGrossWeightP.setValue(HTUtil.round2(sumGrossWeightP));
		txtSumMeasurementP.setValue(HTUtil.round2(sumMeasurementP));
		txtSumCargoValue.setValue(HTUtil.round2(sumCargoValue));
		txtSumPremiumExpense.setValue(HTUtil.round2(sumPremiumExpense));
		txtSumCargoValueP.setValue(HTUtil.round2(sumCargoValueP));
		txtSumPremiumExpenseP.setValue(HTUtil.round2(sumPremiumExpenseP));
	};
	
	var grid = new Ext.grid.EditorGridPanel({title:'货物列表',height:200,
		clicksToEdit:1,autoScroll:true,sm:sm,cm:cm,store:store,
		listeners:{scope:this,afteredit:function(e){var f=e.field;
    		if(f=='packages'||f=='grossWeight'||f=='measurement'||f=='grossWeightProvider'||f=='measurementProvider'||
    		   f=='premiumValueProvider'||f=='premiumExpenseProvider'){reCalculate();}
    	}},
		tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:this.addConsignCargo},'-',
			{text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del},
			'-','->',
			{xtype:'tbtext',text:'件数合计：'},txtSumPackages,
		    {xtype:'tbtext',text:'毛重合计(KGS)：'},txtSumGrossWeight,
		    {xtype:'tbtext',text:'体积合计(CBM)：'},txtSumMeasurement,
		    {xtype:'tbtext',text:'货物价值：'},txtSumCargoValue,
		    {xtype:'tbtext',text:'保险费：'},txtSumPremiumExpense
		],
		bbar:[
		      '->','-',
		      {xtype:'tbtext',text:'毛重合计-承运人(KGS)：'},txtSumGrossWeightP,
		      {xtype:'tbtext',text:'体积合计-承运人(CBM)：'},txtSumMeasurementP,
		      {xtype:'tbtext',text:'货物价值-承运人：'},txtSumCargoValueP,
			  {xtype:'tbtext',text:'保险费-承运人：'},txtSumPremiumExpenseP
		],
		listeners:{scope:this,
			afteredit:function(e){
				var f=e.field;
				var r=e.record;
		    	if(f=='packages'){
		    		r.set('packages',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='grossWeight'){
		    		r.set('grossWeight',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='measurement'){
		    		r.set('measurement',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='grossWeightProvider'){
		    		r.set('grossWeightProvider',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='measurementProvider'){
		    		r.set('measurementProvider',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumValue'){
		    		r.set('premiumValue',e.value);
		    		r.set('premiumExpense',r.get('premiumRate')*r.get('premiumValue'));
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumRate'){
		    		r.set('premiumRate',e.value);
		    		r.set('premiumExpense',r.get('premiumRate')*r.get('premiumValue'));
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumExpense'){
		    		r.set('premiumExpense',e.value);
		    		this.reCalculate();
		    	}
		    	else if(f=='cargoClassName'){
		    		r.set('premiumExpense',r.get('premiumRate')*r.get('premiumValue'));
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumValueProvider'){
		    		r.set('premiumValueProvider',e.value);
		    		//当货物价值（承运人）*保险费率（承运人）小于5时，保险费为5
		    		var prp=r.get('premiumRateProvider')*r.get('premiumValueProvider');
		    		if(prp>0&&prp<5){
		    			prp=5;
		    		}
		    		r.set('premiumExpenseProvider',prp);
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumRateProvider'){
		    		r.set('premiumRateProvider',e.value);
		    		var prp=r.get('premiumRateProvider')*r.get('premiumValueProvider');
		    		if(prp>0&&prp<5){
		    			prp=5;
		    		}
		    		r.set('premiumExpenseProvider',prp);
		    		this.reCalculate();
		    	}
		    	else if(f=='premiumExpenseProviderProvider'){
		    		r.set('premiumExpenseProvider',e.value);
		    		this.reCalculate();
		    	}
			}
		}
	});
	
	var loadTable = new HT.TConsignTable(p);
	
	var y = 0;
	var dtConsDate = new Ext.form.DateField({width:162,x:80,y:y+3,
		name:'consDate',value:p.get('consDate'),enableKeyEvents:true,
		format:DATEF,tabIndex:1,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboGrouName.focus();
				} 
			}
		}
	});
	//业务部门
	var cboGrouName = new Ext.form.ComboBox({width:162,x:322,y:y+3,
		name:'grouName',value:p.get('grouName'),
		tabIndex:2,store:HTStore.getGROU_S(),displayField:'grouName',valueField:'grouName',
		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				p.set('grouId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboSalesRepName.focus();
				} 
			}
		}
	});
	//业务员
	var cboSalesRepName = new Ext.form.ComboBox({width:162,x:564,y:y+3,
		name:'salesRepName',value:p.get('salesRepName'),
		tabIndex:3,store:HTStore.getSALE_S(),displayField:'userName',valueField:'userName',
		typeAhead:true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				p.set('salesRepId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsOperatorName.focus();
				} 
			}
		}
	});
	//操作员
	var cboConsOperatorName = new Ext.form.ComboBox({width:162,x:806,y:y+3,
		name:'consOperatorName',value:p.get('consOperatorName'),
		tabIndex:4,store:HTStore.getOP_S(),displayField:'userName',valueField:'userName',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				p.set('consOperatorId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboStartSite.focus();
				} 
			}
		}
	});
	//陆运单号
	var txtConsNo = new Ext.form.TextField({width:162,x:80,y:y+28,
		name:'consNo',value:p.get('consNo'),
		disabled:true,enableKeyEvents:true,tabIndex:5,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboStartSite.focus();
				} 
			}
		}
	});
	//发运网点
	var cboStartSite = new Ext.form.ComboBox({width:162,x:322,y:y+28,
		name:'startSite',value:p.get('startSite'),
		tabIndex:6,store:HTStore.getSITE_S(),displayField:'siteName',valueField:'siteName',
		typeAhead:true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{scope:this,
			select:function(c,r,i){
				if(cboTransportPlace.getValue()=='')
					cboTransportPlace.setValue(r.get('siteName'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboEndSite.focus();
				} 
			}
		}
	});
	//到达网点
	var cboEndSite =  new Ext.form.ComboBox({width:162,x:564,y:y+28,
		name:'endSite',value:p.get('endSite'),
		tabIndex:7,store:HTStore.getSITE_S(),displayField:'siteName',valueField:'siteName',
		typeAhead:true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboTransportPlace.focus();
				} 
			}
		}
	});
	//工厂
	var cboTransportPlace = new Ext.form.ComboBox({width:162,x:806,y:y+28,
		name:'transportPlace',value:p.get('transportPlace'),enableKeyEvents:true,
		tabIndex:8,store:HTStore.getSITE_S(),displayField:'siteName',valueField:'siteName',
		typeAhead:true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboTransportWay.focus();
				} 
			}
		}
	});
	//运输方式
	var cboTransportWay = new Ext.form.ComboBox({width:162,x:80,y:y+53,
		name:'transportWay',value:p.get('transportWay'),
		tabIndex:9,store:transTypeStore,displayField:'transTypeName',
		valueField:'transTypeName',enableKeyEvents:true,
		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtStartStation.focus();
				} 
			}
		}
	});
	//始发站
	var txtStartStation = new Ext.form.TextField({width:162,x:322,y:y+53,
		name:'startStation',value:p.get('startStation'),
		enableKeyEvents:true,tabIndex:10,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtEndStation.focus();
				} 
			}
		}
	});
	//目的站
	var txtEndStation = new Ext.form.TextField({width:162,x:564,y:y+53,
		name:'endStation',value:p.get('endStation'),
		enableKeyEvents:true,tabIndex:11,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtRouteStation.focus();
				}
			}
		}
	});
	//路由站
	var txtRouteStation = new Ext.form.TextField({width:162,x:806,y:y+53,
		name:'routeStation',value:p.get('routeStation'),
		enableKeyEvents:true,tabIndex:12,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboCustName.focus();
				}
			}
		}
	});
	//委托单位
	var cboCustName = new Fos.CustomerLookup({width:162,x:322,y:y+78,
		name:'custName',value:p.get('custName'),
		tabIndex:13,store:HTStore.getCS(),enableKeyEvents:true,
		displayField:'custNameCn',valueField:'custNameCn',xtype:'customerLookup',custType:'custBookerFlag',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,bizType:BT_T,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		 listeners:{scope:this,
		 	blur:function(f){
		 		if(f.getRawValue()==''){
		 			f.clearValue();
		 			cboCustContact.setValue('');
		 			txtCustTel.setValue('');
		 			txtLoadAddress.setValue('');
		 			p.set('custId','');
		 			p.set('custName','');
		 			p.set('custTel','');
		 			p.set('custContact','');
		 			p.set('loadAddress','');
		 		}},
		 	select:function(c,r,i){
		 		p.set('custId',r.get('id'));
		 		p.set('custSname',r.get('custSname'));
		 		//添加上级公司id--parentId
		 		p.set('parentId',r.get('parentId'));
		 		var custId=p.get('custId');
		 		var parentId=p.get('parentId');
		 		var store=cboCustContact.getStore();
		 		store.removeAll(); 
		 		store.load({params:{custId:custId,parentId:parentId},callback:function(r,opts,isSuccess){
		 			if(store.getTotalCount()>0){
			 			var index=store.find('custId',custId);
			 			var record=index==-1?store.getAt(0):store.getAt(index);
			 			if(record!=undefined){
			 				cboCustContact.setValue(record.get('cucoName'));
				 			txtCustTel.setValue(record.get('cucoTel'));
				 			txtLoadAddress.setValue(record.get('cucoAddress1'));
				 			txtCustMobile.setValue(record.get('cucoMobile'));
			 			}
			 			else{
			 				cboCustContact.setValue('');
				 			txtCustTel.setValue('');
				 			txtLoadAddress.setValue('');
				 			txtCustMobile.setValue('');
			 			}
			 		}
		 		}});
		 		cboSalesRepName.setValue(r.get('custSalesName'));
		 		//cboCustContact.setValue(r.get('custContact'));
	 			//txtCustTel.setValue(r.get('custTel'));
	 			//txtLoadAddress.setValue(r.get('custAddress'));	
		 	},
		 	keydown:{fn:function(f,e){
		 		LC(f,e,'custBookerFlag');
		 		if(e.getKey()==e.ENTER){
		 			txtCustTel.focus();
				} 
		 	},buffer:BF}
		 }
	});
	//座机电话
	var txtCustTel = new Ext.form.TextField({width:404,x:564,y:y+78,
		name:'custTel',value:p.get('custTel'),
		enableKeyEvents:true,tabIndex:14,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboCustContact.focus();
				} 
			}
		}
	});
	//业务担当
	var cboCustContact = new Ext.form.ComboBox({width:162,x:322,y:y+103,
		id:'custContact',
		name:'custContact',value:p.get('custContact'),
		tabIndex:15,store:HTStore.getCUCOS(),displayField:'cucoName',valueField:'cucoName',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		 listeners:{scope:this,
		 	select:function(c,r,i){
		 		txtCustMobile.setValue(r.get('cucoMobile'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustMobile.focus();
				} 
			},
			afterrender:function(combo){
				//combo.doQuery('',true);//渲染后执行一次查询，解决第一次按条件查询后load所有记录bug
				//alert();
				combo.getStore().load({callback:function(){
					combo.getStore().removeAll();
				}});
			}
		 }
	});
	//手机
	var txtCustMobile = new Ext.form.TextField({width:404,x:564,y:y+103,
		name:'custMobile',value:p.get('custMobile'),
		enableKeyEvents:true,tabIndex:16,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtLoadAddress.focus();
				} 
			}
		}
	});
	//提货地址
	var txtLoadAddress = new Ext.form.TextField({width:646,x:322,y:y+128,
		name:'loadAddress',value:p.get('loadAddress'),
		enableKeyEvents:true,tabIndex:17,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsigneeName.focus();
				} 
			}
		}
	});
	//收货单位
	var cboConsigneeName = new Ext.form.ComboBox({width:162,x:322,y:y+153,
		name:'consigneeName',value:p.get('consigneeName'),
		tabIndex:18,store:HTStore.getShipperStore('TMS_CONSIGNEE_Q'),
		displayField:'shipperName',valueField:'shipperName',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,
		enableKeyEvents:true,
		listeners:{scope:this,
			select:function(c,r,i){
		    	c.setValue(r.get('shipperName'));
		    	txtConsigneeContact.setValue(r.get('shipperContact'));
		    	txtConsigneeTel.setValue(r.get('shipperTel'));
		    	txtConsigneeMobile.setValue(r.get('shipperMobile'));
		    	cboDeliveryPlaceName.setValue(r.get('shipperProvince'));
		    	cboDeliveryCity.setValue(r.get('shipperCity'));
		    	txtDeliveryAddress.setValue(r.get('shipperAddress'));
		    	
		 	},
		 	keydown:{fn:function(f,e){
		 		listConsignee(f,e);
		 		if(e.getKey()==e.ENTER){
		 			txtConsigneeTel.focus();
				} 
		 	},buffer:200}
	 	}
	});
	//收货方-座机电话
	var txtConsigneeTel = new Ext.form.TextField({width:404,x:564,y:y+153,
		name:'consigneeTel',value:p.get('consigneeTel'),enableKeyEvents:true,tabIndex:19,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsigneeContact.focus();
				} 
			}
		}
	});
	//收货方-收货人
	var txtConsigneeContact = new Ext.form.TextField({width:162,x:322,y:y+178,
		name:'consigneeContact',value:p.get('consigneeContact'),enableKeyEvents:true,tabIndex:20,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsigneeMobile.focus();
				} 
			}
		}
	});
	//收货方-手机号码
	var txtConsigneeMobile = new Ext.form.TextField({width:404,x:564,y:y+178,
		name:'consigneeMobile',value:p.get('consigneeMobile'),enableKeyEvents:true,tabIndex:21,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboDeliveryPlaceName.focus();
				} 
			}
		}
	});
	//收货方-省
	var cboDeliveryPlaceName = new Ext.form.ComboBox({width:162,x:322,y:y+203,
		name:'deliveryPlaceName',value:p.get('deliveryPlaceName'),
		tabIndex:22,store:HTStore.getPROVINCE_S(),displayField:'placName',valueField:'placName',
		typeAhead:true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{scope:this,
			select:function(c,r,v){
		   	 	p.set('deliveryPlaceId',r.get('id'));
		   	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
		   	 	cboDeliveryCity.store.baseParams= bp;
		   	 	cboDeliveryCity.store.reload();
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboDeliveryCity.focus();
				} 
			}
		}
	});
	//收货方-市/县
    var cboDeliveryCity = new Ext.form.ComboBox({width:404,x:564,y:y+203,
    	name:'deliveryCity',value:p.get('deliveryCity'),
		tabIndex:23,store:HTStore.getCITY_S(p.get('placProvinceId')),
		displayField:'placName',valueField:'placName',
		typeAhead:true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				p.set('deliveryCityId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtDeliveryAddress.focus();
				} 
			}
		}
    });
    //收货方-送货地址
    var txtDeliveryAddress = new Ext.form.TextField({width:646,x:322,y:y+228,
    	name:'deliveryAddress',value:p.get('deliveryAddress'),
    	enableKeyEvents:true,tabIndex:24,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtLoadDate.focus();
				} 
			}
		}
    });
    //提货日期
    var dtLoadDate = new Ext.form.DateField({width:162,x:80,y:y+253,
    	name:'loadDate',value:p.get('loadDate'),
    	enableKeyEvents:true,tabIndex:25,format:DATEF,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtContractDate.focus();
				} 
			}
		}
    });
    //合同时效
    var dtContractDate = new Ext.form.DateField({width:162,x:322,y:y+253,
    	name:'contractDate',value:p.get('contractDate'),
    	enableKeyEvents:true,tabIndex:26,format:DATEF,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtArNewDate.focus();
				} 
			}
		}
    });
    //到达日期
    var dtArNewDate = new Ext.form.DateField({width:162,x:564,y:y+253,
    	name:'arNewDate',value:p.get('arNewDate'),
    	enableKeyEvents:true,tabIndex:27,format:DATEF,
    	listeners:{scope:this,
    		select:function(c,r,i){
    			//把承运商信息中‘到货信息’同步
    			dtEndDate.setValue(r.format(DATEF));
        	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtSignInDate.focus();
				} 
			}
		}
    });
    //签收日期
    var dtSignInDate = new Ext.form.DateField({width:162,x:806,y:y+253,
    	name:'signInDate',value:p.get('signInDate'),
    	enableKeyEvents:true,tabIndex:28,format:DATEF,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboStatus.focus();
				}
			}
		}
    });
    //运输状态
    var cboStatus = new Ext.form.ComboBox({width:162,x:80,y:y+278,
    	name:'status',value:p.get('status'),
		tabIndex:29,store:HTStore.loadStatus,displayField:'N',valueField:'C',enableKeyEvents:true,
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboTransportVehicle.focus();
				} 
			}
		}
	});
    //车辆类型
    var cboTransportVehicle = new Ext.form.ComboBox({width:162,x:322,y:y+278,
    	name:'transportVehicle',value:p.get('transportVehicle'),
    	enableKeyEvents:true,tabIndex:30,store:HTStore.getVETY_S(),displayField:'vehicleClassName',valueField:'vehicleClassName',
		typeAhead:true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPremiumCompany.focus();
				} 
			}
		}
	});
    //保险公司
    var txtPremiumCompany = new Fos.CustomerLookup({width:162,x:564,y:y+278,
    	name:'premiumCompany',value:p.get('premiumCompany'),
    	enableKeyEvents:true,tabIndex:31,store:HTStore.getCS(),tpl:custTpl,itemSelector:'div.list-item',
    	listWidth:C_LW,displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
    	triggerAction:'all',selectOnFocus:true,custType:'custInsuranceFlag',bizType:BT_T,
    	listeners:{scope:this,
    		keydown:{fn:function(f,e){
		 		LC(f,e,'custInsuranceFlag');
		 		if(e.getKey()==e.ENTER){
		 			txtSignInContact.focus();
				} 
		 	},buffer:BF}
		}
    });
    //签收人
    var txtSignInContact = new Ext.form.TextField({width:162,x:806,y:y+278,
    	name:'signInContact',value:p.get('signInContact'),
    	enableKeyEvents:true,tabIndex:32,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboFeedbackWay.focus();
				}
			}
		}
    });
    //返单确认
    var cboFeedbackWay = new Ext.form.ComboBox({width:162,x:80,y:303,
    	name:'feedbackWay',value:p.get('feedbackWay'),
		tabIndex:33,store:HTStore.T_FEEDBACK_S,displayField:'N',valueField:'N',enableKeyEvents:true,
		typeAhead:true,mode: 'local',triggerAction:'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboFeedbackNumber.focus();
				} 
			}
		}
	});
    //返单份数
    var cboFeedbackNumber = new Ext.form.TextField({width:162,x:322,y:y+303,
    	name:'feedbackNumber',value:p.get('feedbackNumber'),
    	enableKeyEvents:true,tabIndex:34,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtContractNo.focus();
				} 
			}
		}
    });
    //合同号
    var txtContractNo = new Ext.form.TextField({width:162,x:564,y:y+303,
    	name:'contractNo',value:p.get('contractNo'),
    	enableKeyEvents:true,tabIndex:35,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					ckbSignInStatus.focus();
				} 
			}
		}
    });
    //是否签收
    var ckbSignInStatus = new Ext.form.Checkbox({width:162,x:806,y:y+303,
    	name:'signInStatus',value:p.get('signInStatus'),
    	tabIndex:36,checked:p.get('signInStatus')==1});
  //代客装卸-是：否
    var cboReplaceLoad = new Ext.form.ComboBox({width:162,x:80,y:y+328,
    	name:'replaceLoad',value:p.get('replaceLoad'),
    	tabIndex:37,store:HTStore.T_BOOLEAN_S,displayField:'N',valueField:'N',enableKeyEvents:true,
		typeAhead:true,mode: 'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboDeliveryDoor.focus();
				} 
			}
		}
    });
    //送货上楼-是：否
    var cboDeliveryDoor = new Ext.form.ComboBox({width:162,x:322,y:y+328,
    	name:'deliveryDoor',value:p.get('deliveryDoor'),
    	tabIndex:38,store:HTStore.T_BOOLEAN_S,displayField:'N',valueField:'N',enableKeyEvents:true,
		typeAhead:true,mode: 'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboPateName.focus();
				} 
			}
		}
    });
    //运费条款
    var cboPateName = new Ext.form.ComboBox({width:162,x:564,y:y+328,
    	name:'pateName',value:p.get('pateName'),
		tabIndex:39,store:HTStore.innerPaymentTermStore,displayField:'NAME',valueField:'CODE',enableKeyEvents:true,
		typeAhead:true,mode: 'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtFeedbackTel.focus();
				} 
			}
		}
	});
    //回访电话
    var txtFeedbackTel = new Ext.form.TextField({width:162,x:806,y:y+328,
    	name:'feedbackTel',value:p.get('feedbackTel'),
    	enableKeyEvents:true,tabIndex:40,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCargoStatus.focus();
				}
			}
		}
    });
    //发货人
    var txtShipperName = new Ext.form.TextField({width:162,x:806,y:y+328,
    	name:'shipperName',value:p.get('shipperName'),
    	enableKeyEvents:true,tabIndex:25,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtShipperTel.focus();
				} 
			}
		}
    });
    //货物状况
    var txtCargoStatus = new Ext.form.TextArea({width:404,x:80,y:y+353,
    	name:'cargoStatus',value:p.get('cargoStatus'),
    	enableKeyEvents:true,tabIndex:41,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtRemarks.focus();
				} 
			}
		}
    });
    //备注
    var txtRemarks = new Ext.form.TextArea({width:404,x:564,y:y+353,
    	name:'remarks',value:p.get('remarks'),
    	enableKeyEvents:true,tabIndex:42
    });
    //服务项目
    var txtServiceItems = new Ext.form.TextField({width:162,x:80,y:y+415,
    	name:'serviceItems',value:p.get('serviceItems'),
    	enableKeyEvents:true,tabIndex:43,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustGrouName.focus();
				} 
			}
		}
    });
    //客户部门
    var txtCustGrouName = new Ext.form.TextField({width:162,x:322,y:y+415,
    	name:'custGrouName',value:p.get('custGrouName'),
    	enableKeyEvents:true,tabIndex:44,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPremiumCompany.focus();
				} 
			}
		}
    });
    //发货电话
    var txtShipperTel = new Ext.form.TextField({width:162,x:564,y:y+415,
    	name:'shipperTel',value:p.get('shipperTel'),
    	enableKeyEvents:true,tabIndex:26,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtLoadContact.focus();
				} 
			}
		}
    });
    //装货人
    var txtLoadContact = new Ext.form.TextField({width:162,x:80,y:y+440,
    	name:'loadContact',value:p.get('loadContact'),
    	enableKeyEvents:true,tabIndex:27,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtLoadTel.focus();
				} 
			}
		}
    });
    //装货电话
    var txtLoadTel = new Ext.form.TextField({width:162,x:322,y:y+440,
    	name:'loadTel',value:p.get('loadTel'),
    	enableKeyEvents:true,tabIndex:28,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboServiceWay.focus();
				}
			}
		}
    });
    //操作要求
    var cboOperateWay = new Ext.form.ComboBox({width:162,x:564,y:y+440,
    	name:'operateWay',value:p.get('operateWay'),
		tabIndex:32,store:HTStore.T_OPERATE_S,displayField:'N',valueField:'N',enableKeyEvents:true,
		typeAhead:true,mode: 'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboDeliveryDoor.focus();
				}
			}
		}
	});
    //服务方式
    var cboServiceWay = new Ext.form.ComboBox({width:162,x:806,y:y+440,
    	name:'serviceWay',value:p.get('serviceWay'),
		tabIndex:29,store:HTStore.T_SERVICE_S,displayField:'N',valueField:'N',enableKeyEvents:true,
		typeAhead:true,mode: 'local',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboFeedbackWay.focus();
				} 
			}
		}
	});
    
	var frm=new Ext.form.FormPanel(
		{title:'陆运信息',layout:'absolute',frame:true,
		items:[loadTable,
		       dtConsDate,cboGrouName,cboSalesRepName,cboConsOperatorName,
		       txtConsNo,cboStartSite,cboEndSite,cboTransportPlace,
		       cboTransportWay,txtStartStation,txtRouteStation,txtEndStation,
		       cboCustName,txtCustTel,cboCustContact,txtCustMobile,txtLoadAddress,
		       cboConsigneeName,txtConsigneeTel,txtConsigneeContact,txtConsigneeMobile,
		       cboDeliveryPlaceName,cboDeliveryCity,txtDeliveryAddress,dtLoadDate,
		       cboFeedbackWay,cboFeedbackNumber,
		       cboDeliveryDoor,cboReplaceLoad,txtContractNo,dtContractDate,cboStatus,
		       cboPateName,cboTransportVehicle,txtCargoStatus,txtRemarks,
		       txtPremiumCompany,txtFeedbackTel,dtArNewDate,
		       dtSignInDate,txtSignInContact,ckbSignInStatus]
	});
	
	var cboMotorcadeName = new Fos.CustomerLookup({
		fieldLabel:'承运商',name:'motorcadeName',value:p.get('motorcadeName'),
	 	tabIndex:1,store:HTStore.getCS(),enableKeyEvents:true,
		displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,mode:'local',triggerAction:'all',
		selectOnFocus:true,anchor:'95%',bizType:BT_T,custType:'custCarrierFlag',emptyText:'',
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('motorcadeId','');
					p.set('motorcadeName','');
				}
			},
			select:function(c,r,i){
				p.set('motorcadeId',r.get('id'));
				txtMotorcadeContact.setValue(r.get('custContact'));
				txtMotorcadeTel.setValue(r.get('custTel'));

		 		var custId=r.get('id');
				var store=txtMotorcadeContact.getStore();
				store.load({params:{custId:custId},callback:function(r,opts,isSuccess){
		 			if(store.getTotalCount()>0){
			 			var index=store.find('custId',custId);
			 			var record=index==-1?store.getAt(0):store.getAt(index);
			 			if(record!=undefined){
			 				txtMotorcadeContact.setValue(record.get('cucoName'));

					 		txtMotorcadeTel.setValue(record.get('cucoMobile'));
					 		txtMotorcadeFax.setValue(record.get('cucoAddress1'));
					 		txtMotorcadeFax.setValue(record.get('cucoFax'));
			 			}
			 			else{
			 				txtMotorcadeContact.setValue('');
			 			}
			 		}
		 		}});
			},
			keydown:{fn:function(f,e){
					LC(f,e,'custCarrierFlag');		//承运商
					if(e.getKey()==e.ENTER){
						txtMotorcadeContact.focus();
					}
				},buffer:BF
			}
		}
	});
	/*var txtMotorcadeContact = new Ext.form.TextField({fieldLabel:'联系人',enableKeyEvents:true,
		name:'motorcadeContact',value:p.get('motorcadeContact'),tabIndex:2,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcadeTel.focus();
				} 
			}
		}
	});*/
	var txtMotorcadeContact = new Ext.form.ComboBox({width:162,fieldLabel:'联系人',tabIndex:2,anchor:'95%',
		id:'motorcadeContact',name:'motorcadeContact',value:p.get('motorcadeContact'),
		store:HTStore.getCUCOS(),displayField:'cucoName',valueField:'cucoName',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		 listeners:{scope:this,
		 	select:function(c,r,i){
		 		txtMotorcadeTel.setValue(r.get('cucoMobile'));
		 		txtMotorcadeFax.setValue(r.get('cucoAddress1'));
		 		txtMotorcadeFax.setValue(r.get('cucoFax'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustMobile.focus();
				} 
			},
			afterrender:function(combo){
				//combo.doQuery('',true);//渲染后执行一次查询，解决第一次按条件查询后load所有记录bug
				//alert();
				combo.getStore().load({callback:function(){
					combo.getStore().removeAll();
				}});
			}
		 }
	});
	var txtMotorcadeTel = new Ext.form.TextField({fieldLabel:'电话',enableKeyEvents:true,
		name:'motorcadeTel',value:p.get('motorcadeTel'),tabIndex:3,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcadeFax.focus();
				} 
			}
		}
	});
	var txtMotorcadeFax = new Ext.form.TextField({fieldLabel:'传真',enableKeyEvents:true,
		name:'motorcadeTel',value:p.get('motorcadeFax'),tabIndex:4,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcadeNo.focus();
				} 
			}
		}
	});
	var txtMotorcadeNo = new Ext.form.TextField({fieldLabel:'承运单号',enableKeyEvents:true,
		name:'motorcadeNo',value:p.get('motorcadeNo'),tabIndex:5,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtEmptyMiles.focus();
				} 
			}
		}
	});
	var txtEmptyMiles = new Ext.form.NumberField({fieldLabel:C_EMPTY_MILES,enableKeyEvents:true,
		name:'emptyMiles',value:p.get('emptyMiles'),tabIndex:6,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtHeavyMiles.focus();
				} 
			}
		}
	});
	var txtHeavyMiles = new Ext.form.NumberField({fieldLabel:C_HEAVY_MILES,enableKeyEvents:true,
		name:'heavyMiles',value:p.get('heavyMiles'),tabIndex:7,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboDriver.focus();
				} 
			}
		}
	});
	var cboDriver = new Ext.form.ComboBox({fieldLabel:C_DRIVER,enableKeyEvents:true,
			name:'driverName',value:p.get('driverName'),tabIndex:8,store:driverStroe,		
			displayField:'driverName',valueField:'driverName',typeAhead:true,mode:'remote',
			triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					p.set('driverId',r.get('id'));
				},
				keydown:function(f,e){
					if(e.getKey()==e.ENTER){
						cboVehicle.focus();
					} 
				}
			}
		});
	var cboVehicle = new Ext.form.ComboBox({fieldLabel:C_VEHICLE_NO,enableKeyEvents:true,
		name:'vehicleNo',value:p.get('vehicleNo'),tabIndex:9,store:vehicleStroe,
		displayField:'vehicleNo',valueField:'vehicleNo',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('vehicleId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtEndDate.focus();
				}
			}
		}
	 });
	var dtEndDate = new Ext.form.DateField({fieldLabel:'到货日期',enableKeyEvents:true,
		name:'arNewDate',value:p.get('arNewDate'),tabIndex:10,format:DATEF,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade2Name.focus();
				} 
			}
		}
	});
	var cboMotorcade2Name = new Fos.CustomerLookup({fieldLabel:'承运商',enableKeyEvents:true,
		name:'motorcade2Name',value:p.get('motorcade2Name'),
	 	tabIndex:11,store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,mode:'local',triggerAction:'all',
		selectOnFocus:true,anchor:'95%',bizType:BT_T,custType:'custCarrierFlag',emptyText:'',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('motorcade2Id','');
					p.set('motorcade2Name','');
				}
			},
			select:function(c,r,i){
				p.set('motorcade2Id',r.get('id'));
				txtMotorcade2Contact.setValue(r.get('custContact'));
				txtMotorcade2Tel.setValue(r.get('custTel'));
				var custId=r.get('id');
				var store=txtMotorcade3Contact.getStore();
				store.load({params:{custId:custId},callback:function(r,opts,isSuccess){
		 			if(store.getTotalCount()>0){
			 			var index=store.find('custId',custId);
			 			var record=index==-1?store.getAt(0):store.getAt(index);
			 			if(record!=undefined){
			 				txtMotorcade2Contact.setValue(record.get('cucoName'));

					 		txtMotorcade2Tel.setValue(record.get('cucoMobile'));
					 		txtMotorcade2Fax.setValue(record.get('cucoAddress1'));
					 		txtMotorcade2Fax.setValue(record.get('cucoFax'));
			 			}
			 			else{
			 				txtMotorcade2Contact.setValue('');
			 			}
			 		}
		 		}});
			},
			keydown:{fn:function(f,e){
					LC(f,e,'custCarrierFlag');		//承运商
					if(e.getKey()==e.ENTER){
						txtMotorcade2Contact.focus();
					} 
				},buffer:BF
			}
		}
	});
	
	/*var txtMotorcade2Contact = new Ext.form.TextField({fieldLabel:'联系人',enableKeyEvents:true,
		name:'motorcade2Contact',value:p.get('motorcade2Contact'),tabIndex:12,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade2Tel.focus();
				} 
			}
		}
	});	*/
	var txtMotorcade2Contact = new Ext.form.ComboBox({width:162,fieldLabel:'联系人',tabIndex:12,anchor:'95%',
		id:'motorcade2Contact',
		name:'motorcade2Contact',value:p.get('motorcade2Contact'),
		store:HTStore.getCUCOS(),displayField:'cucoName',valueField:'cucoName',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		 listeners:{scope:this,
		 	select:function(c,r,i){
		 		txtMotorcade2Tel.setValue(r.get('cucoMobile'));
		 		txtMotorcade2Fax.setValue(r.get('cucoAddress1'));
		 		txtMotorcade2Fax.setValue(r.get('cucoFax'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustMobile.focus();
				}
			},
			afterrender:function(combo){
				//combo.doQuery('',true);//渲染后执行一次查询，解决第一次按条件查询后load所有记录bug
				//alert();
				combo.getStore().load({callback:function(){
					combo.getStore().removeAll();
				}});
			}
		 }
	});
	var txtMotorcade2Tel = new Ext.form.TextField({fieldLabel:'电话',enableKeyEvents:true,
		name:'motorcade2Tel',value:p.get('motorcade2Tel'),tabIndex:13,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade2Fax.focus();
				} 
			}
		}
	});
	var txtMotorcade2Fax = new Ext.form.TextField({fieldLabel:'传真',enableKeyEvents:true,
		name:'motorcade2Fax',value:p.get('motorcade2Fax'),tabIndex:14,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade2No.focus();
				} 
			}
		}
	});
	var txtMotorcade2No = new Ext.form.TextField({fieldLabel:'承运单号',enableKeyEvents:true,
		name:'motorcade2No',value:p.get('motorcade2No'),tabIndex:15,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade2Province.focus();
				} 
			}
		}
	});
	
	var cboMotorcade2Province = new Ext.form.ComboBox({fieldLabel:'省',tabIndex:16,
		name:'motorcade2Province',value:p.get('motorcade2Province'),enableKeyEvents:true,
      	store:HTStore.getPROVINCE_S(),displayField:'placName',valueField:'placName',
      	typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
      	listeners:{scope:this,
      		select:function(c,r,v){
	     		p.set('motorcade2ProvinceId',r.get('id'));
	     	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
	     	 	cboMotorcade2City.store.baseParams= bp;
	     	 	cboMotorcade2City.store.reload();
	      	},
	      	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade2City.focus();
				} 
			}
      	 }
	});
	var cboMotorcade2City = new Ext.form.ComboBox({fieldLabel:'市/县',tabIndex:17,name:'motorcade2City',
    	value:p.get('motorcade2City'),enableKeyEvents:true,
     	store:HTStore.getCITY_S(p.get('motorcade2ProvinceId')),xtype:'combo',displayField:'placName',valueField:'placName',
     	typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
     	listeners:{
     		select:function(c,r,v){
	     		p.set('motorcade2CityId',r.get('id'));
	     	},
	     	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade2Address.focus();
				} 
			}
     	 }
	});
	var txtMotorcade2Address = new Ext.form.TextField({fieldLabel:'地址',enableKeyEvents:true,
		name:'motorcade2Address',value:p.get('motorcade2Address'),tabIndex:18,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtMotorcade2StartDate.focus();
				} 
			}
		}
	});
	var dtMotorcade2StartDate = new Ext.form.DateField({fieldLabel:'起运日期',enableKeyEvents:true,
		name:'motorcade2StartDate',value:p.get('motorcade2StartDate'),tabIndex:19,format:DATEF,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtMotorcade2EndDate.focus();
				} 
			}
		}
	});
	var dtMotorcade2EndDate = new Ext.form.DateField({fieldLabel:'到货日期',enableKeyEvents:true,
		name:'motorcade2EndDate',value:p.get('motorcade2EndDate'),tabIndex:20,format:DATEF,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade3Name.focus();
				} 
			}
		}
	});
	
	var cboMotorcade3Name = new Fos.CustomerLookup({fieldLabel:'承运商',enableKeyEvents:true,
		name:'motorcade3Name',value:p.get('motorcade3Name'),
	 	tabIndex:21,store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,mode:'remote',triggerAction:'all',
		selectOnFocus:true,anchor:'95%',bizType:BT_T,custType:'custCarrierFlag',emptyText:'',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('motorcade3Id','');
					p.set('motorcade3Name','');
				}
			},
			select:function(c,r,i){
				p.set('motorcade3Id',r.get('id'));
				txtMotorcade3Contact.setValue(r.get('custContact'));
				txtMotorcade3Tel.setValue(r.get('custTel'));
				var custId=r.get('id');
				var store=txtMotorcade3Contact.getStore();
				store.load({params:{custId:custId},callback:function(r,opts,isSuccess){
		 			if(store.getTotalCount()>0){
			 			var index=store.find('custId',custId);
			 			var record=index==-1?store.getAt(0):store.getAt(index);
			 			if(record!=undefined){
			 				txtMotorcade3Contact.setValue(record.get('cucoName'));

					 		txtMotorcade3Tel.setValue(record.get('cucoMobile'));
					 		txtMotorcade3Fax.setValue(record.get('cucoAddress1'));
					 		txtMotorcade3Fax.setValue(record.get('cucoFax'));
			 			}
			 			else{
			 				txtMotorcade3Contact.setValue('');
			 			}
			 		}
		 		}});
			},
			keydown:{fn:function(f,e){
					LC(f,e,'custCarrierFlag');
					if(e.getKey()==e.ENTER){
						txtMotorcade3Contact.focus();
					} 
				},buffer:BF
			}
		}
	});
	/*var txtMotorcade3Contact = new Ext.form.TextField({fieldLabel:'联系人',enableKeyEvents:true,
		name:'motorcade3Contact',value:p.get('motorcade3Contact'),tabIndex:22,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade3Tel.focus();
				} 
			}
		}
	});	*/
	var txtMotorcade3Contact = new Ext.form.ComboBox({width:162,fieldLabel:'联系人',tabIndex:22,anchor:'95%',
		id:'motorcade3Contact',
		name:'motorcade3Contact',value:p.get('motorcade3Contact'),
		store:HTStore.getCUCOS(),displayField:'cucoName',valueField:'cucoName',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		 listeners:{scope:this,
		 	select:function(c,r,i){
		 		txtMotorcade3Tel.setValue(r.get('cucoMobile'));
		 		txtMotorcade3Fax.setValue(r.get('cucoAddress1'));
		 		txtMotorcade3Fax.setValue(r.get('cucoFax'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCustMobile.focus();
				} 
			},
			afterrender:function(combo){
				//combo.doQuery('',true);//渲染后执行一次查询，解决第一次按条件查询后load所有记录bug
				//alert();
				combo.getStore().load({callback:function(){
					combo.getStore().removeAll();
				}});
			}
		 }
	});
	
	var txtMotorcade3Tel = new Ext.form.TextField({fieldLabel:'电话',enableKeyEvents:true,
		name:'motorcade3Tel',value:p.get('motorcade3Tel'),tabIndex:23,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade3Fax.focus();
				} 
			}
		}
	});
	
	var txtMotorcade3Fax = new Ext.form.TextField({fieldLabel:'传真',enableKeyEvents:true,
		name:'motorcade3Fax',value:p.get('motorcade3Fax'),tabIndex:24,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade3No.focus();
				} 
			}
		}
	});
	var txtMotorcade3No = new Ext.form.TextField({fieldLabel:'承运单号',enableKeyEvents:true,
		name:'motorcade3No',value:p.get('motorcade3No'),tabIndex:25,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade3Province.focus();
				} 
			}
		}
	});
	var cboMotorcade3Province = new Ext.form.ComboBox({fieldLabel:'省份',tabIndex:26,
		name:'motorcade3Province',value:p.get('motorcade3Province'),enableKeyEvents:true,
      	store:HTStore.getPROVINCE_S(),displayField:'placName',valueField:'placName',
      	typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
      	listeners:{scope:this,
      		select:function(c,r,v){
	     	 	p.set('motorcade2ProvinceId',r.get('id'));
	     	 	var bp = {_A:'PLAC_Q',_mt:'xml',placType:2,placProvinceId:r.get('id')};
	     	 	cboMotorcade3City.store.baseParams= bp;
	     	 	cboMotorcade3City.store.reload();
	      	},
	      	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboMotorcade3City.focus();
				} 
			}
      	}
	});
	var cboMotorcade3City = new Ext.form.ComboBox({fieldLabel:'市/县',tabIndex:27,
		name:'motorcade3City',value:p.get('motorcade3City'),enableKeyEvents:true,
     	store:HTStore.getCITY_S(p.get('motorcade3ProvinceId')),
     	displayField:'placName',valueField:'placName',
     	typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
     	listeners:{
     		select:function(c,r,v){
     			p.set('motorcade3CityId',r.get('id'));
     		},
     		keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcade3Address.focus();
				} 
			}
     	}
	});
	var txtMotorcade3Address = new Ext.form.TextField({fieldLabel:'地址',enableKeyEvents:true,
		name:'motorcade3Address',value:p.get('motorcade3Address'),tabIndex:28,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtMotorcade3StartDate.focus();
				} 
			}
		}
	});
	var dtMotorcade3StartDate = new Ext.form.DateField({fieldLabel:'起运日期',enableKeyEvents:true,
		name:'motorcade3StartDate',value:p.get('motorcade3StartDate'),tabIndex:29,format:DATEF,anchor:'95%',
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtMotorcade3EndDate.focus();
				}
			}
		}
	});
	var dtMotorcade3EndDate = new Ext.form.DateField({fieldLabel:'到货日期',
		name:'motorcade3EndDate',value:p.get('motorcade3EndDate'),tabIndex:30,format:DATEF,anchor:'95%'});
	
	var vendorPanel = new Ext.Panel({title:'承运商信息',items:[
	      {title:'第一程承运商',layout:'column',layoutConfig:{columns:5},border:false,frame:false,
    		padding:5,items:[
		      {columnWidth:.2,layout:'form',border:false,labelWidth:80,items:[cboMotorcadeName,txtEmptyMiles]},
		 	  {columnWidth:.2,layout:'form',border:false,labelWidth:80,items:[txtMotorcadeContact,txtHeavyMiles]},
		 	  {columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcadeTel,cboDriver]},
		 	  {columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcadeFax,cboVehicle]},
		 	  {columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcadeNo,dtEndDate]}
	        ]},
	        {title:'第二程承运商',layout:'column',
	    		layoutConfig:{columns:5},border:false,frame:false,padding:5,items:[
	     	    {columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[cboMotorcade2Name,cboMotorcade2Province]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade2Contact,cboMotorcade2City]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade2Tel,txtMotorcade2Address]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade2Fax,dtMotorcade2StartDate]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade2No,dtMotorcade2EndDate]}
	     	]},
	     	{title:'第三程承运商',layout:'column',
	    		layoutConfig:{columns:5},border:false,frame:false,padding:5,items:[
	     	    {columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[cboMotorcade3Name,cboMotorcade3Province]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade3Contact,cboMotorcade3City]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade3Tel,txtMotorcade3Address]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade3Fax,dtMotorcade3StartDate]},
	     		{columnWidth:.2,layout:'form',border:false,labelWidth:65,items:[txtMotorcade3No,dtMotorcade3EndDate]}
	     	]}]});
	
	this.save = function(){
		if(!HTUtil.checkFieldNotNull(C_CONS_DATE,dtConsDate))			//委托日期
			return;
		if(!HTUtil.checkFieldNotNull(C_BIZ_DEPARTMENT,cboGrouName))		//业务部门
			return;
		if(!HTUtil.checkFieldNotNull(C_SALES,cboSalesRepName))			//业务员
			return;
		if(!HTUtil.checkFieldNotNull(C_OPERATOR,cboConsOperatorName))	//操作员
			return;
		if(!HTUtil.checkFieldNotNull('始发站',txtStartStation))		 	//始发站
			return;
		if(!HTUtil.checkFieldNotNull('目的站',txtEndStation))			//目的站
			return;
		if(!HTUtil.checkFieldNotNull('委托单位',cboCustName))			//委托单位
			return;
		if(!HTUtil.checkFieldNotNull('收货单位',cboConsigneeName))		//收货单位
			return;
		
		HTUtil.saveToRecord(this,p);
		
		var xml = HTUtil.RTX(p,'TConsign',TConsign);
		var a = store.getModifiedRecords();
		xml += HTUtil.ATX(a,'TConsignCargo',TConsignCargo);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'TCON_S'},
			success: function(r){
				var rowAction = p.get('rowAction');
				
				var c = HTUtil.XTR(r.responseXML,'TConsign',TConsign);
				HTUtil.RU(c, p,TConsign);
				var a = HTUtil.XTRA(r.responseXML,'TConsignCargo',TConsignCargo);
				HTUtil.RUA(store, a, TConsignCargo);
				
				if (rowAction=='N'){
					txtConsNo.setValue(p.get('consNo'));
					listStore.insert(0,p);
				}else{
					listStore.reload();
				}
				this.updateToolbar();
				Ext.Msg.alert(SYS,M_S);
			},
			failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
			xmlData:HTUtil.HTX(xml)});
	};
	//费用
	this.showExp = function(){
    	createWindow('EXPE_'+p.get("uuid"),C_EXPE+'-'+p.get('consNo'),new Fos.ExpenseTab(p),true);
    };
    //短信通知
    this.sms=function(){
		var a = store.getRange();
		var orderNo='';
		for(var i=0;i<a.length;i++){
			if(a.length<4){
				orderNo+=a[i].get('orderNo')+',';
			}else{
				orderNo=a[0].get('orderNo')+'....'+a[a.length-1].get('orderNo')+',';
			}
		}
		var mobile=p.get('custMobile');
		var consigneeName=p.get('consigneeName');
		var signDate = p.get('signInDate');
		
		var content='您好！订单'+orderNo+'发往'+consigneeName;
		content += '，于'+signDate.format('m')+'月'+signDate.format('d')+'日已签收，如有疑问请联系：';
		content += p.get('consOperatorName') + '，谢谢';
		var consId=p.get('id');
		var consNo=p.get('consNo');
		var bizType=BT_T;
		var win = new Fos.SMSWin(mobile,content,consId,consNo,bizType);
		win.show();
    };
    
  //单票货物跟踪状态
	this.showTracing = function(){		
		var win = new Fos.PEventWin(p);
		win.show();
	};
	
    this.updateToolbar = function(){
    	btnSave.setDisabled(NR(m+F_M));
    	btnShowExpense.setDisabled(NR(M1_TMS+'13')||p.get('rowAction')=='N');
    	btnSendMessage.setDisabled(NR(m+'05')||p.get('rowAction')=='N'||p.get('smsStatus')=='1');
    	btnTracing.setDisabled(NR(m+'04')||p.get('rowAction')=='N');
    };
    this.showAttach=function(){		
    	var win = new Fos.AttachWin('T',p.get('id'),p.get('consNo'));
    	win.show();
    };
    
    var m = M1_TMS + TMS_TCON;
    
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),
		scope:this,handler:this.save});
	
	var btnShowExpense = new Ext.Button({text:C_EXPE,iconCls:'dollar',
		disabled:NR(M1_TMS+'13')||p.get('rowAction')=='N',
		scope:this,handler:this.showExp});
	
	var btnSendMessage = new Ext.Button({text:MSG_NOTICE,itemId:'TB_NE',iconCls:'mail',
		disabled:NR(m+'05')||p.get('rowAction')=='N'||p.get('smsStatus')=='1',
		scope:this,handler:this.sms});
	
	var btnTracing = new Ext.Button({text:C_CARGO_TRACING,iconCls:'add',
		disabled:NR(m+'04')||p.get('rowAction')=='N',
		scope:this,handler:this.showTracing});
	
	var bAttach={text:C_ATTACH,iconCls:'news',
		disabled:NR(m+'06')||p.get('rowAction')=='N',
		scope:this,handler:this.showAttach};
	
	Fos.TConsignTab.superclass.constructor.call(this,{layout:'fit',
		tbar:[btnSave,'-',btnShowExpense,'-',bAttach,'-',btnSendMessage,'-',btnTracing],
		items:[{activeTab:0,xtype:'tabpanel',items:[frm,grid,vendorPanel]}]
	});
};
Ext.extend(Fos.TConsignTab, Ext.Panel);

//陆运复杂查询
Fos.TConsignSearchWin = function(action,store){
	var panel = new Ext.Panel({plain:true,height:340,layout:'column',title:'综合查询',id:'T_CONS_LOOK_1',
		padding:5,items:[
			{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
	    	items:[
		    	{fieldLabel:'陆运单号',name:'consNo',xtype:'textfield',anchor:'95%'},
		    	{fieldLabel:'提货状态',name:'status',tabIndex:30,
					store:HTStore.loadStatus,xtype:'combo',
					displayField:'N',valueField:'C',typeAhead:true,mode:'local',triggerAction:'all',
					selectOnFocus:true,anchor:'95%'},
	          	{fieldLabel:'合同号',name:'contractNo',anchor:'95%',xtype:'textfield'},
				
				{fieldLabel:'承运商1',name:'motorcadeName',store:HTStore.getCS(),enableKeyEvents:true,
					 xtype:'customerLookup',custType:'custBookerFlag',bizType:BT_T,
					 displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,
					 mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
					 anchor:'95%',
	              	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custCarrierFlag');},buffer:500}}},
	            {fieldLabel:'收货单位',name:'consigneeName',anchor:'95%',xtype:'textfield'},
	            {fieldLabel:'收货人',name:'consigneeContact',anchor:'95%',xtype:'textfield'}
            ]},
	      	{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
	   		items:[
	   		    {fieldLabel:'委托单位',name:'custName',store:HTStore.getCS(),enableKeyEvents:true,
					 xtype:'customerLookup',custType:'custBookerFlag',bizType:BT_T,
					 displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,
					 mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
					 anchor:'95%',
	              	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:500}}},
	   		    {fieldLabel:'委托日期',name:'consDate',xtype:'datefield',format:DATEF,anchor:'95%'},
	   		    {fieldLabel:'合同时效',name:'contractDate',xtype:'datefield',format:DATEF,anchor:'95%'},
	   		    {fieldLabel:'提货日期',name:'loadDate',xtype:'datefield',format:DATEF,anchor:'95%'},
		   		{fieldLabel:'承运商2',name:'motorcade2Name',store:HTStore.getCS(),enableKeyEvents:true,
					xtype:'customerLookup',custType:'custBookerFlag',bizType:BT_T,
					displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,
					 mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
					 anchor:'95%',
	              	listeners:{scope:this,
	              		keydown:{fn:function(f,e){LC(f,e,'custCarrierFlag');},
	              			buffer:500}}},
              	{fieldLabel:'承运单号2',name:'motorcade2No',anchor:'95%',xtype:'textfield'}
		       ]},
			{columnWidth:.34,layout:'form',border:false,labelWidth:80,labelAlign:"right",
			items:[
			    {fieldLabel:'业务担当',name:'custContact',xtype:'textfield',anchor:'95%'},
			    {fieldLabel:'日期'+C_TO,name:'consDate2',xtype:'datefield',format:DATEF,anchor:'95%'},
			    {fieldLabel:'日期'+C_TO,name:'contractDate2',xtype:'datefield',format:DATEF,anchor:'95%'},
			    {fieldLabel:'日期'+C_TO,name:'loadDate2',xtype:'datefield',format:DATEF,anchor:'95%'},
			    {fieldLabel:'承运商3',name:'motorcade3Name',store:HTStore.getCS(),enableKeyEvents:true,
					xtype:'customerLookup',custType:'custBookerFlag',bizType:BT_T,
					displayField:'custNameCn',valueField:'custNameCn',typeAhead:true,
					 mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
					 anchor:'95%',
	              	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custCarrierFlag');},buffer:500}}},
	             {fieldLabel:'承运单号3',name:'motorcade3No',anchor:'95%',xtype:'textfield'}
			]}
	]});
	
	var panel2 = new Ext.Panel({plain:true,height:340,layout:'column',title:'订单编号查询',
		defaults:{bodyStyle:'padding:10px'},id:'T_CONS_LOOK_2',items:[
			{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:"right",
	    	items:[
		    	{fieldLabel:'订单编号',name:'orderNo',xtype:'textfield',anchor:'95%'}
            ]}
	]});
	
	this.reload=function(){
		var a=[];var op=1;
		var at = tp.getActiveTab();
		if(at.getId()=='T_CONS_LOOK_1'){
	     	var consNo = panel.find('name','consNo')[0].getValue();
	     	if(consNo) 
	     		a[a.length] = new QParam({key:'consNo',value:consNo,op:LI});
	     	
	     	var custName = panel.find('name','custName')[0].getValue();
	     	if(custName!='') 
	     		a[a.length] = new QParam({key:'custName',value:custName,op:op});
	     	
	     	var custContact = panel.find('name','custContact')[0].getValue();
	     	if(custContact) 
	     		a[a.length] = new QParam({key:'custContact',value:custContact,op:op});
	     	
	 		var status=panel.find('name','status')[0].getValue();
	 		if(status>=0&&status!='') {
	 			a[a.length]=new QParam({key:'status',value:status,op:op}); 
	 		}
	 		var consDate = panel.find('name','consDate')[0].getValue();
	 		var consDate2 = panel.find('name','consDate2')[0].getValue();
	 		if(consDate && consDate2){
	 			a[a.length] = new QParam({key:'consDate',value:consDate.format(DATEF),op:GE});
	 			a[a.length] = new QParam({key:'consDate',value:consDate2.format(DATEF),op:LE});
	 		}
	 		else if(consDate) 
	 			a[a.length] = new QParam({key:'consDate',value:consDate.format(DATEF),op:GE});
	 		
	 		var contractNo=panel.find('name','contractNo')[0].getValue();
	 		if(contractNo) 
	 			a[a.length]=new QParam({key:'contractNo',value:contractNo,op:LE});
	 		
	 		var contractDate = panel.find('name','contractDate')[0].getValue();
	 		var contractDate2 = panel.find('name','contractDate2')[0].getValue();
	 		if(contractDate && contractDate2){
	 			a[a.length] = new QParam({key:'contractDate',value:contractDate.format(DATEF),op:GE});
	 			a[a.length] = new QParam({key:'contractDate',value:contractDate2.format(DATEF),op:LE});
	 		}
	 		else if(contractDate)
	 			a[a.length] = new QParam({key:'contractDate',value:contractDate.format(DATEF),op:GE});
	 		
	 		var loadDate = panel.find('name','loadDate')[0].getValue();
	 		var loadDate2 = panel.find('name','loadDate2')[0].getValue();
	 		if(loadDate && loadDate2){
	 			a[a.length] = new QParam({key:'loadDate',value:loadDate.format(DATEF),op:GE});
	 			a[a.length] = new QParam({key:'loadDate',value:loadDate2.format(DATEF),op:LE});
	 		}
	 		else if(loadDate)
	 			a[a.length] = new QParam({key:'loadDate',value:loadDate.format(DATEF),op:GE});
	 		
	 		var motorcadeName = panel.find('name','motorcadeName')[0].getValue();
	 		if(motorcadeName) 
	 			a[a.length]=new QParam({key:'motorcadeName',value:motorcadeName,op:op});
	 		
	 		var motorcade2Name=panel.find('name','motorcade2Name')[0].getValue();
	 		if(motorcade2Name) 
	 			a[a.length]=new QParam({key:'motorcade2Name',value:motorcade2Name,op:op});

	 		var motorcade3Name=panel.find('name','motorcade3Name')[0].getValue();
	 		if(motorcade3Name) 
	 			a[a.length]=new QParam({key:'motorcade3Name',value:motorcade3Name,op:op});
	 		
	 		var consigneeName = panel.find('name','consigneeName')[0].getValue();
	 		if(consigneeName) 
	 			a[a.length]=new QParam({key:'consigneeName',value:consigneeName,op:LI});
	 		
	 		var motorcade2No=panel.find('name','motorcade2No')[0].getValue();
	 		if(motorcade2No) 
	 			a[a.length]=new QParam({key:'motorcade2No',value:motorcade2No,op:LI});
	 		
	 		var motorcade3No=panel.find('name','motorcade3No')[0].getValue();
	 		if(motorcade3No) 
	 			a[a.length]=new QParam({key:'motorcade3No',value:motorcade3No,op:LI});
	 		
	 		var consigneeContact=panel.find('name','consigneeContact')[0].getValue();
	 		if(consigneeContact) 
	 			a[a.length]=new QParam({key:'consigneeContact',value:consigneeContact,op:LI});
	 		store.baseParams={_A:action,_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a)),typeKey:'1'};
	 		store.reload({params:{start:0,limit:C_PS20},
	     		callback:function(r){
	     			if(r.length==0)XMG.alert(SYS,M_NOT_FOUND);
	     		}
	     	});
		}else if(at.getId()=='T_CONS_LOOK_2'){
			var orderNo=panel2.find('name','orderNo')[0].getValue();
	 		if(orderNo!=''){
	 			a[a.length]=new QParam({key:'orderNo',value:orderNo,op:LI});
	 			store.baseParams={_A:action,_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a)),orderNo:orderNo,typeKey:'2'};
	 			store.reload({params:{start:0,limit:C_PS20},
	 	     		callback:function(r){
	 	     			if(r.length==0)XMG.alert(SYS,M_NOT_FOUND);
	 	     		}
	 	     	});
	 		}else
	 			Ext.Msg.alert(SYS,'请输入订单编号！');
		}
     	this.close();
	};
	
	var tp = new Ext.TabPanel({id:'T_CONS_LOOK',xtype:'tabpanel',plain:true,activeTab:0,
		defaults:{bodyStyle:'padding:10px'},items:[panel2,panel]});
	
    Fos.TConsignSearchWin.superclass.constructor.call(this,{title:'单票查询',iconCls:'search',modal:true,
    	width:800,height:320,buttonAlign:'right',items:tp,
    	buttons:[{text:C_OK,scope:this,handler:this.reload},{text:C_CANCEL,scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.TConsignSearchWin, Ext.Window);

Fos.TConsignLookup = function(fn) {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TCON_CAR_Q',baseParams:{_mt:'json',status:0},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TConsignCargo',id:'id'},TConsignCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load({params:{start:0,limit:C_PS}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[
	    new Ext.grid.RowNumberer(),sm,
      	{header:C_TRAN_NO,dataIndex:'consNo',width:100},
      	{header:'收货人',dataIndex:'consigneeName',width:80},
      	{header:'联系人',dataIndex:'consigneeContact',width:80},
      	{header:'联系电话',dataIndex:'consigneeTel',width:80},
      	/*{header:'交货省',dataIndex:'deliveryPlaceName',width:80},
      	{header:'交获市/县',dataIndex:'deliveryCity',width:80},*/
      	{header:C_DELIVERY_ADDRESS,dataIndex:'deliveryAddress',width:80},
      	{header:'货名',dataIndex:'cargoName',width:80},
      	{header:C_PACK,dataIndex:'packName',width:80},
      	{header:C_PACKAGES,dataIndex:'packages',width:60},
      	{header:C_GROSS_WEIGHT+'(KGS)',dataIndex:'grossWeight',width:60,renderer:rateRender},	
      	{header:'体积(CBM)',dataIndex:'measurement',width:60,renderer:rateRender},
      	{header:C_GROSS_WEIGHT+'承运人'+'(KGS)',dataIndex:'grossWeightProvider',width:100,renderer:rateRender},	
      	{header:'体积-承运人(CBM)',dataIndex:'measurementProvider',width:100,renderer:rateRender},
      	{header:'货物类别',dataIndex:'cargoClassName',width:120},
        {header:'货物价值',dataIndex:'premiumValue',width:80,renderer:rateRender},
        {header:'保险费率',dataIndex:'premiumRate',width:80,renderer:rateRender},
        {header:'保险费',dataIndex:'premiumExpense',width:80,renderer:rateRender},
      	{header:C_REMARKS,dataIndex:'remarks',width:100}
      	],defaults:{sortable:false,width:100}});
		
	this.save=function(){
		var a =sm.getSelections();
		if(a){
			fn(a);
			this.close();
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	this.search=function(){

	};
	
	var grid = new Ext.grid.GridPanel({
    header:false,store:store,sm:sm,cm:cm,
	bbar:PTB(store,100)
    });
	
	Fos.TConsignLookup.superclass.constructor.call(this,{buttonAlign:'right',
		title:'',
		width:600,height:430,modal:true,layout:'fit',
	  	items:[grid],
	  	buttons:[{text:C_SAVE,iconCls:'ok',scope:this,handler:this.save},
	  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.TConsignLookup, Ext.Window);

HT.TConsignTable = function(p) {
	remark = '<table class="reference" border="1" cellspacing="0" style="background-color:#DFE8F6;font-size: 14px;">';
	remark += '<tr>';
	remark += '<td height="25" width="8%"><font color="red">委托日期:</font></td>';
	remark += '<td height="25" width="17%">&nbsp;</td>';
	remark += '<td height="25" width="8%"><font color="red">业务部门:</font></td>';
	remark += '<td height="25" width="17%">&nbsp;</td>';
	remark += '<td height="25" width="8%"><font color="red">业务员:</font></td>';
	remark += '<td height="25" width="17%">&nbsp;</td>';
	remark += '<td height="25" width="8%"><font color="red">操作员:</font></td>';
	remark += '<td height="25" width="17%">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">陆运单号:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">发运网点:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">到达网点:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">工厂:</td>';
	remark += '<td height="25">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">运输方式:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25"><font color="red">始发站:</font></td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25"><font color="red">目的站:</font></td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">路由站:</td>';
	remark += '<td height="25">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25" colspan="2" rowspan="5"><div align="center" ><font color="red">委托方:</font></div></td>';
	remark += '<td height="25"><font color="red">委托单位:</font></td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">座机电话:</td>';	
	remark += '<td height="25" colspan="3">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">业务担当:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">手机:</td>';
	remark += '<td height="25" colspan="3">&nbsp;</td><tr>';	
	
	remark += '<tr>';
	remark += '<td height="25">提货地址:</td>';
	remark += '<td height="25" colspan="5">&nbsp;</td><tr>';

	remark += '<tr>';
	remark += '<td height="25" colspan="2" rowspan="7"><div align="center"><font color="red">收货方:</font></div></td>';
	remark += '<td height="25"><font color="red">收货单位:</font></td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">座机电话:</td>';	
	remark += '<td height="25" colspan="3">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">收货人:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">手机号码:</td>';
	remark += '<td height="25" colspan="3">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">省:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">市/县:</td>';
	remark += '<td height="25" colspan="3">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">收货地址:</td>';
	remark += '<td height="25" colspan="5">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">提货日期:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">合同时效:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">到货日期:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">签收日期:</td>';
	remark += '<td height="25">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">运输状态:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">车辆类型:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">保险公司:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">签收人:</td>';
	remark += '<td height="25">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">返单确认:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">返单份数:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">合同号:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">是否签收:</td>';
	remark += '<td height="25">&nbsp;</td><tr>';
	
	remark += '<tr>';
	remark += '<td height="25">代客装卸:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">送货上楼:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">运费条款:</td>';
	remark += '<td height="25">&nbsp;</td>';
	remark += '<td height="25">回访电话:</td>';
	remark += '<td height="25">&nbsp;</td><tr>';
		
	remark += '<tr>';
	remark += '<td height="63">货物状况:</td>';
	remark += '<td colspan="3">&nbsp;</td>';
	remark += '<td>备注:</td>';
	remark += '<td colspan="3">&nbsp;</td><tr>';
	
	HT.TConsignTable.superclass.constructor.call(this,
	 	{border:false,html:remark});
	};
Ext.extend(HT.TConsignTable,Ext.Panel);

//货物状态跟踪窗口
Fos.PEventWin = function(p) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'PEVENT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PEvent',id:'id'},PEvent),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	store.load({params:{consignId:p.get('id')},scope:this});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var ff=CHKCLM(C_FINISHED,'status',60);
	ff.on('click',function(c,e,r){
		r.set('finishedDate',r.get('status')==1?(new Date()):'');
	},this);
	
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	     {header:'状态名称',width:100,dataIndex:"typeName",
			editor:new Ext.form.TextField({allowBlank:false,emptyText:'',invalidText:''})},
	     {header:'预计日期',dataIndex:'estimatedDate',width:120,renderer:formatDate,
		 editor:new Ext.form.DateField({format:DATEF})},
		 ff,
		 {header:'完成日期',dataIndex:'finishedDate',width:120,
		 renderer:formatDate,editor:new Ext.form.DateField({format:DATEF})}],
		 defaults:{sortable:false,width:100}});
	
	this.addEvent = function(){
		var r = new PEvent({uuid:HTUtil.UUID(32),bizType:'T',
			status:'0',version:'0',rowAction:'N',consignId:p.get('id')});
		grid.stopEditing();
    	store.add(r);
    	grid.startEditing(store.getRange().length-1,1);
	};	
	
	this.save = function(){
		grid.stopEditing();
		HTUtil.POST(store,'PEvent',PEvent,'PEVENT_S');
	};
	this.del=function(){HTUtil.REMOVE_SM(sm,store);};
	
	var m = M1_TMS + TMS_VEHT;
    btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
    	scope:this,handler:this.addEvent});
    btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
    	scope:this,handler:this.del});
    btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),
    	scope:this,handler:this.save});
    
	var grid=new Ext.grid.EditorGridPanel({id:'G_EVENT',border:true,height:400,autoScroll:true,clicksToEdit:1,plugins:[ff],
	    stripeRows:true,store:store,sm:sm,cm:cm,
	    tbar:[btnAdd,'-',btnRemove, '-',btnSave]
	});		
    
	Fos.PEventWin.superclass.constructor.call(this,
	   {iconCls:'PEvent',title:'跟踪状态'+'-'+p.get('consNo'),
	   modal:true,width:600,height:400,items:grid}); 
};
Ext.extend(Fos.PEventWin, Ext.Window);
