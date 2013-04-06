//费用界面业务信息（海运，空运）
Fos.ExpenseBizPanel = function(p){
	//委托单位
	var txtCustName = new Ext.form.TextField({fieldLabel:C_BOOKER,
		name:'custName',value:p.get('custName'),anchor:'95%'});
	//承运人
	var txtConsCarrier = new Ext.form.TextField({fieldLabel:C_CARRIER,
		name:'consCarrierName',value:p.get('consCarrierName'),anchor:'95%'});
	//装货港
	var txtConsPolEn = new Ext.form.TextField({fieldLabel:C_POL,
		name:'consPolEn',value:p.get('consPolEn'),anchor:'95%'});
	//箱信息
	var txtConsContainersInfo = new Ext.form.TextField({fieldLabel:C_CONT_NUM,
		name:'consContainersInfo',value:p.get('consContainersInfo'),anchor:'95%'});
	//开航日期
	var txtConsSailDate = new Ext.form.DateField({fieldLabel:p.get('consBizClass')==BC_E?C_SAIL_DATE:C_ETA,
			name:'consSailDate',value:p.get('consSailDate'),format:DATEF,anchor:'95%'});
	//业务号
	var txtConsNo = new Ext.form.TextField({fieldLabel:C_CONS_NO,
		name:'consNo',disabled:true,value:p.get("consNo"),anchor:'95%'});
	//订舱代理
	var txtConsBookingAgencyName = new Ext.form.TextField({fieldLabel:C_BOOK_AGENCY,
		name:'consBookingAgencyName',value:p.get('consBookingAgencyName'),anchor:'95%'});
	//卸货港
	var txtConsPodEn = new Ext.form.TextField({fieldLabel:C_POD,
		name:'consPodEn',value:p.get('consPodEn'),anchor:'95%'});
	//件数
	var txtConsTotalPackages = new Ext.form.TextField({fieldLabel:C_PACKAGES,
		name:'consTotalPackages',value:p.get('consTotalPackages'),anchor:'95%'});
	//操作员
	var txtConsOperatorName = new Ext.form.TextField({fieldLabel:C_OPERATOR,
		name:'consOperatorName',value:p.get('consOperatorName'),anchor:'95%'});
	//运费条款
	var txtConsPateName = new Ext.form.TextField({fieldLabel:C_PATE,
		name:'pateName',value:p.get('pateName'),anchor:'95%'});
	//委托日期	
	var dtConsDate = new Ext.form.DateField({fieldLabel:C_CONS_DATE,
		name:'consDate',value:p.get('consDate'),format:DATEF,anchor:'95%'});
	//船名
	var txtVessName = new Ext.form.TextField({fieldLabel:C_VESS,
		name:'vessName',value:p.get('vessName'),xtype:'textfield',anchor:'95%'});
	
	var txtConsMblNo = new Ext.form.TextField({fieldLabel:C_MBL_NO,
		name:'consMblNo',value:p.get('consMblNo'),anchor:'95%'});
	//毛重
	var txtConsTotalGrossWeight = new Ext.form.TextField({fieldLabel:C_GW_S+(p.get('consShipType')==ST_B?C_UNIT_MT:C_KGS),
		name:'consTotalGrossWeight',value:p.get('consTotalGrossWeight'),anchor:'95%'});
	//业务员
	var txtConsSalesRepName = new Ext.form.TextField({fieldLabel:C_SALES,
		name:'consSalesRepName',value:p.get('consSalesRepName'),anchor:'95%'});
	//客户业务号
	var txtConsRefNo = new Ext.form.TextField({fieldLabel:C_REF_NO,
		name:'consRefNo',value:p.get('consRefNo'),anchor:'95%'});
	//费用审核状态
	var txtConsStatusAud = new Ext.form.TextField({fieldLabel:C_AUDIT_STATUS,name:'consStatusAud',
		value:HTStore.getAUST(p.get('consStatusAud')),anchor:'95%'});
	//航次
	var txtVoyaName = new Ext.form.TextField({fieldLabel:C_VOYA,
		name:'voyaName',value:p.get('voyaName'),anchor:'95%'});
	
	var txtConsHblNo = new Ext.form.TextField({fieldLabel:C_HBL_NO,
		name:'consHblNo',value:p.get('consHblNo'),anchor:'95%'});
	//体积
	var txtConsTotalMeasurement = new Ext.form.TextField({fieldLabel:C_CBM,
		name:'consTotalMeasurement',value:p.get('consTotalMeasurement'),anchor:'95%'});
	//备注
	var txtRemark = new Ext.form.TextField({fieldLabel:C_REMARKS,
		name:'consRemarks',value:p.get('consRemarks'),anchor:'95%'});
	
	Fos.ExpenseBizPanel.superclass.constructor.call(this,{region:'north',height:180,padding:5,
		layout:'column',title:C_BIZ_INFO,layoutConfig:{columns:4},
		deferredRender:true,collapsible:true,items:[
		{columnWidth:.25,layout:'form',border:false,labelWidth:80,
            items:p.get('consBizType')=='M'?[txtCustName,txtConsCarrier,txtConsPolEn,txtConsContainersInfo,txtConsRefNo]:
            	[txtCustName,txtConsCarrier,txtVoyaName,txtConsTotalPackages]},
            	
        {columnWidth:.25,layout:'form',border:false,labelWidth:80,
            items:p.get('consBizType')=='M'?[txtConsBookingAgencyName,txtVessName,txtConsPodEn,txtConsTotalPackages]:
            	[txtConsBookingAgencyName,txtConsPolEn,txtConsMblNo,txtConsTotalGrossWeight]},
            	
        {columnWidth:.25,layout: 'form',border : false,labelWidth:80,items:p.get('consBizType')=='M'?[
            dtConsDate,txtVoyaName,txtConsMblNo,txtConsTotalGrossWeight]:[dtConsDate,txtConsPodEn,txtConsHblNo,txtConsTotalMeasurement]},
            
        {columnWidth:.25,layout: 'form',border : false,labelWidth:80,items:p.get('consBizType')=='M'?[
            txtConsSailDate,txtConsPateName,txtConsHblNo,txtConsTotalMeasurement]:[txtConsSailDate,txtConsPateName,txtConsRefNo]}
		]}
	);
};
Ext.extend(Fos.ExpenseBizPanel, Ext.Panel);

//费用界面业务信息（陆运）
Fos.TmsExpenseBizPanel = function(p){
	var txtConsNo = new Ext.form.TextField({fieldLabel : '陆运单号',
		anchor : '95%',name : 'consNo',value : p.get('consNo')});
	var dtConsDate = new Ext.form.DateField({fieldLabel : '接单日期',
		anchor : '95%',format : DATEF,name : 'consDate',value : p.get('consDate')});
	var txtCustName = new Ext.form.TextField({fieldLabel:'委托单位',
		name:'custName',value:p.get('custName'),anchor:'95%'});
	var cboConsigneeName = new Ext.form.TextField({fieldLabel:'收货单位',
		name:'consigneeName',value:p.get('consigneeName'),anchor:'95%'});
	var txtStartStation = new Ext.form.TextField({fieldLabel:'发货地',
		name:'startStation',value:p.get('startStation'),anchor:'95%'});
	var txtEndStation = new Ext.form.TextField({fieldLabel:'目的地',
		name:'endStation',value:p.get('endStation'),anchor:'95%'});
	var dtLoadDate = new Ext.form.DateField({anchor : '95%',fieldLabel : '提货日期',
		format : DATEF,name : 'loadDate',value : p.get('loadDate')});
	var dtArNewDate = new Ext.form.DateField({fieldLabel:'到货日期',
    	name:'arNewDate',value:p.get('arNewDate'),format:DATEF,anchor:'95%'});
	var txtSumPackages = new Ext.form.TextField({fieldLabel:'件数合计',
		value:p.get('packages'),anchor:'95%'});
	var txtSumGrossWeight = new Ext.form.TextField({fieldLabel:'毛重合计',
		value:p.get('grossWeight'),anchor:'95%'});
	var txtSumVolume= new Ext.form.TextField({fieldLabel:'体积合计',
		value:p.get('volume'),anchor:'95%'});
	
	Fos.TmsExpenseBizPanel.superclass.constructor.call(this,{region:'north',height:150,padding:5,
		layout:'column',title:C_BIZ_INFO,layoutConfig:{columns:4},frame : true,
		deferredRender:true,collapsible:true,items:[
		{columnWidth:.25,layout:'form',border:false,labelWidth:120,labelAlign:'right',
            items:[txtConsNo,txtStartStation,txtSumPackages]},
        {columnWidth:.25,layout:'form',border:false,labelWidth:120,labelAlign:'right',
            items:[dtConsDate,txtEndStation,txtSumGrossWeight]},
        {columnWidth:.25,layout: 'form',border : false,labelWidth:120,labelAlign:'right',
            items:[txtCustName,dtLoadDate,txtSumVolume]},
        {columnWidth:.25,layout: 'form',border : false,labelWidth:120,labelAlign:'right',
            items:[cboConsigneeName,dtArNewDate]}]}
	);
};
Ext.extend(Fos.TmsExpenseBizPanel, Ext.Panel);

//费用界面业务信息（派车）
Fos.TmsTransExpenseBizPanel=function(p){
	var txtTaskNo = new Ext.form.TextField({fieldLabel : C_TRANS_TASK_NO,
		ame : 'transTaskNo',value : p.get('transTaskNo'),anchor : '95%'});
	var txtMotorcadeName = new Ext.form.TextField({fieldLabel:'车队',
		name:'motorcadeName',value:p.get('motorcadeName'),anchor:'95%'});
	var cboVehicleNo = new Ext.form.TextField({fieldLabel : C_VEHICLE_NO,
		name : 'vehicleNo',value : p.get('vehicleNo'),anchor : '95%'});	
	var dtStartDate = new Ext.form.DateField({fieldLabel : C_TRAN_START_DATE,
		name : 'startDate',value : p.get('startDate'),format : DATEF,anchor : '95%'});
	var dtEndDate = new Ext.form.DateField({fieldLabel : C_TRAN_END_DATE,
		name : 'endDate',value : p.get('endDate'),format : DATEF,anchor : '95%'});
	var txtPackages = new Ext.form.TextField({fieldLabel:'件数合计',
		value:p.get('packages'),anchor:'95%'});
	var txtGrossWeight = new Ext.form.TextField({fieldLabel:'毛重合计',
		value:p.get('grossWeight'),anchor:'95%'});
	var txtVolume = new Ext.form.TextField({fieldLabel:'体积合计',
		value:p.get('volume'),anchor:'95%'});	
		
    Fos.TmsExpenseBizPanel.superclass.constructor.call(this,{region:'north',height:150,padding:5,
		layout:'column',title:C_BIZ_INFO,layoutConfig:{columns:4},frame : true,
		deferredRender:true,collapsible:true,items:[
		{columnWidth:.25,layout:'form',border:false,labelWidth:120,labelAlign:'right',
            items:[txtTaskNo,dtEndDate]},
        {columnWidth:.25,layout:'form',border:false,labelWidth:120,labelAlign:'right',
            items:[txtMotorcadeName,txtPackages]},
        {columnWidth:.25,layout: 'form',border : false,labelWidth:120,labelAlign:'right',
            items:[cboVehicleNo,txtGrossWeight]},
        {columnWidth:.25,layout: 'form',border : false,labelWidth:120,labelAlign:'right',
			items:[dtStartDate,txtVolume]}
		]}
	);
};
Ext.extend(Fos.TmsTransExpenseBizPanel,Ext.Panel);

//费用界面业务信息（快件）
Fos.ExpressExpenseBizPanel = function(p){
	var txtCustName = new Ext.form.TextField({fieldLabel:C_BOOKER,
		name:'custName',value:p.get('custName'),anchor:'95%'});
	
	var txtExprCarrierName = new Ext.form.TextField({fieldLabel:'承运单位',
		name: 'exprCarrier',value: p.get('exprCarrier'),anchor:'95%'});
	
	var txtExprOriginNo = new Ext.form.TextField({fieldLabel:'原运单号',
		name: 'exprOriginNo',value: p.get('exprOriginNo'),anchor:'95%'});
	
	var txtExprNo = new Ext.form.TextField({fieldLabel:'实走单号',
		name: 'exprNo',value: p.get('exprNo'),anchor:'95%'});
	
	var txtExprNetwork = new Ext.form.TextField({fieldLabel:'快件网络',
		name: 'exprNetwork',value: p.get('exprNetwork'),anchor:'95%'});
	
	var txtExprCargoType = new Ext.form.TextField({fieldLabel:'快件类型',
		name: 'exprCargoType',value:HTStore.getEFT(p.get('exprCargoType')),anchor:'95%'});
	
	var txtExprSaleName = new Ext.form.TextField({fieldLabel:'业务员',
		name: 'exprSaleName',value: p.get('exprSaleName'),anchor:'95%'});
	
	var txtExprOperator = new Ext.form.TextField({fieldLabel:'操作员',
		name: 'exprOperator',value: p.get('exprOperator'),anchor:'95%'});
	
	var dtExprPostingDate = new Ext.form.DateField({fieldLabel:'委托日期',
		name: 'exprPostingDate',value: p.get('exprPostingDate'),anchor:'95%'});
	
	var dtExprExportDate = new Ext.form.DateField({fieldLabel:'出口日期',
		name: 'exprExportDate',value: p.get('exprExportDate'),anchor:'95%'});
	
	var dtExprDeliveryDate = new Ext.form.DateField({fieldLabel:'交货日期',
		name: 'exprDeliveryDate',value: p.get('exprDeliveryDate'),anchor:'95%'});
	
	var dtExprConsigneeSignatureDate = new Ext.form.DateField({fieldLabel:'签收日期',
		name: 'exprConsigneeSignatureDate',value: p.get('exprConsigneeSignatureDate'),anchor:'95%'});
	
	var txtExprDimensionWeight = new Ext.form.TextField({fieldLabel:'体积重量(客户)',
		name: 'exprDimensionWeight',value: p.get('exprDimensionWeight'),anchor:'95%'});
	
	var txtExprDimensionAWeight = new Ext.form.TextField({fieldLabel:'体积重量(代理)',
		name: 'exprDimensionAWeight',value: p.get('exprDimensionAWeight'),anchor:'95%'});
	
	var txtExprActualWeight = new Ext.form.TextField({fieldLabel:'实际重量(客户)',
		name: 'exprActualWeight',value: p.get('exprActualWeight'),anchor:'95%'});
	
	var txtExprActualAWeight = new Ext.form.TextField({fieldLabel:'实际重量(代理)',
		name: 'exprActualAWeight',value: p.get('exprActualAWeight'),anchor:'95%'});
	
	var txtExprFreightBill = new Ext.form.TextField({fieldLabel:'付费方式',
		name: 'exprFreightBill',value:HTStore.getBILL(p.get('exprFreightBill')),anchor:'95%'});
	
	var txtExprPackages = new Ext.form.TextField({fieldLabel:'发件件数',
		name: 'exprPackages',value: p.get('exprPackages'),anchor:'95%'});
	
	var txtExprTotalWeight = new Ext.form.TextField({fieldLabel:'总重量(客户)',
		name: 'exprTotalWeight',value: p.get('exprTotalWeight'),anchor:'95%'});
	
	var txtExprTotalAWeight = new Ext.form.TextField({fieldLabel:'总重量(代理)',
		name: 'exprTotalAWeight',value: p.get('exprTotalAWeight'),anchor:'95%'});
	
	Fos.ExpressExpenseBizPanel.superclass.constructor.call(this,{region:'north',height:180,padding:5,
		layout:'column',title:C_BIZ_INFO,layoutConfig:{columns:4},
		deferredRender:true,collapsible:true,items:[
		{columnWidth:.25,layout:'form',border:false,labelWidth:120,labelAlign:'right',
            items:[txtCustName,txtExprNetwork,dtExprPostingDate,txtExprDimensionWeight,txtExprFreightBill]},
            	
        {columnWidth:.25,layout:'form',border:false,labelWidth:120,labelAlign:'right',
            items:[txtExprCarrierName,txtExprCargoType,dtExprExportDate,txtExprDimensionAWeight,txtExprPackages]},
            	
        {columnWidth:.25,layout: 'form',border : false,labelWidth:120,labelAlign:'right',
            items: [txtExprOriginNo,txtExprSaleName,dtExprDeliveryDate,txtExprActualWeight,txtExprTotalWeight]},
            
        {columnWidth:.25,layout: 'form',border : false,labelWidth:120,labelAlign:'right',
			items:[txtExprNo,txtExprOperator,dtExprConsigneeSignatureDate,txtExprActualAWeight,txtExprTotalAWeight
            ]}
		]}
	);
};
Ext.extend(Fos.ExpressExpenseBizPanel, Ext.Panel);

//单票审核：空运、海运
Fos.ConsignAuditGrid = function(bizType) {
	var bp={_mt:'xml',consBizType:bizType,xml:''};
	var store = new Ext.data.Store({
    	url: SERVICE_URL+'?_A=CONS_CHECK_X',baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'FConsign'}, FConsign),
    	sortInfo:{field:'consDate', direction:'DESC'},remoteSort:true
	});	
	store.load({params:{start:0,limit:C_PS20}});
	
	//重置按钮调用的函数
	this.reset=function(){
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS20}});
	};	
	
	//查询按钮调用的函数
	this.search = function(){
		var win = new Fos.ConsLookupWin('','','','CONS_CHECK_X',store);win.show();
	};	
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,
		listeners:{scope:this,rowselect:function(s,row,r){this.updateToolBar(r);}}
	});

	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,width:80,dataIndex:"consStatusAud",renderer:HTStore.getAUST},	//审核状态
		{header:C_CONS_NO,dataIndex:"consNo",width:150},		//业务号
		{header:"F/L",width:40,dataIndex:"consShipType"},
		{header:"P/C",width:40,dataIndex:"pateName"},
		{header:C_BOOKER,width:200,dataIndex:"custName"},		//委托单位
		{header:C_CSNAME,width:200,dataIndex:"custSname"},		//中文简称
		{header:C_CONS_DATE,dataIndex:"consDate",renderer:formatDate},		//委托日期	
		{header:C_PACKAGES,width:60,dataIndex:"consTotalPackages",align:'right',css:'font-weight:bold;'},//件数		
		{header:C_GROSS_WEIGHT,dataIndex:"consTotalGrossWeight",align:'right',css:'font-weight:bold;'},//毛重(kg)
		{header:C_CBM,dataIndex:"consTotalMeasurement",align:'right',css:'font-weight:bold;'},	//体积(CBM)
		{header:C_SUM_AR,dataIndex:"sumR",align:'right',renderer:numRender,css:'font-weight:bold;'},//应收合计
		{header:C_SUM_AP,dataIndex:"sumP",align:'right',renderer:numRender,css:'font-weight:bold;'},//应付合计		
		{header:C_PROFIT,dataIndex:"grossProfit",align:'right',
			renderer:numRenderColor,css:'font-weight:bold;'},//毛利		
		{header:C_PROFIT_RATE,dataIndex:"grossProfitRate",align:'right',
			renderer:numRenderColor,css:'font-weight:bold;'}, //毛利率(%)		
		{header:C_AR_USD,dataIndex:"sumRUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},//应收USD		
		{header:C_AP_USD,dataIndex:"sumPUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},//应付USD		
		{header:C_AR_CNY,dataIndex:"sumRCny",align:'right',renderer:numRender,css:'font-weight:bold;'},//应收CNY			
		{header:C_AP_CNY,dataIndex:"sumPCny",align:'right',renderer:numRender,css:'font-weight:bold;'},//应付CNY		
		{header:C_CONT_NUM,width:60,dataIndex:"consTotalContainers",align:'right',
			renderer:function(v){return (v)?v:0;},css:'font-weight:bold;'},//箱量		
		{header:C_CONT_INFO,width:60,dataIndex:"consContainersInfo"},//箱信息		
		{header:C_AR_USD_INVOICED,hidden:true,dataIndex:"sumRUsdInvoice",align:'right',
			renderer:numRender},//应收USD已开票		
		{header:C_AR_USD_WRITEOFFED,hidden:true,dataIndex:"sumRUsdWriteOff",align:'right',
			renderer:numRender},//应收USD已核销		
		{header:C_AR_CNY_INVOICED,hidden:true,dataIndex:"sumRCnyInvoice",align:'right',
			renderer:numRender},//应收CNY已开票		
		{header:C_AR_CNY_WRITEOFFED,hidden:true,dataIndex:"sumRCnyWriteOff",align:'right',
			renderer:numRender},		//应收CNY已核销		
		{header:C_AP_USD_INVOICED,hidden:true,dataIndex:"sumPUsdInvoice",align:'right',
			renderer:numRender},//应付USD已开票		
		{header:C_AP_USD_WRITEOFFED,hidden:true,dataIndex:"sumPUsdWriteOff",align:'right',
			renderer:numRender},		//应付USD已核销		
		{header:C_AP_CNY_INVOICED,hidden:true,dataIndex:"sumPCnyInvoice",align:'right',
			renderer:numRender}, //应付CNY已开票		
		{header:C_AP_CNY_WRITEOFFED,hidden:true,dataIndex:"sumPCnyWriteOff",align:'right',
			renderer:numRender}, //应付CNY已核销		
		{header:C_VESS,dataIndex:"vessName"},//船名		
		{header:C_VOYA,dataIndex:"voyaName"},//航次		
		{header:C_MBL_NO,dataIndex:"consMblNo"},
		{header:C_HBL_NO,dataIndex:"consHblNo"},		
		{header:C_SAIL_DATE,dataIndex:"consSailDate",renderer:formatDate},//开航日期		
		{header:C_POL,dataIndex:"consPolEn"},//装货码头		
		{header:C_POD,dataIndex:"consPodEn"},//卸货码头		
		{header:C_POT,dataIndex:"consPotEn"},//中转港		
		{header:C_CARRIER,width:200,dataIndex:"consCarrierName"},//承运人		
		{header:C_BOOK_AGENCY,width:200,dataIndex:"consBookingAgencyName"},//订舱代理		
		{header:C_M_CONS_NO,dataIndex:"consMasterConsNo"},//主单号
		{header:C_REMARKS,dataIndex:"consRemarks"}
		],defaults:{sortable:false,width:100}});
	
	//审核更改状态时的调用函数,根据传入s的值的不同做不同的操作
	//s=0:财务未审核状态 s=1:财务已审核状态 s=2:经理已审核状态
	this.updateStatus=function(s){
		var p = sm.getSelected();
		if(p) 
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'CONS_CHECK_AUD',consId:p.get('id'),consStatusAud:s},
				success: function(r){
					p.beginEdit();
					p.set('consStatusAud',s);
					p.endEdit();
					this.updateToolBar(p);
					Ext.Msg.alert(SYS,M_S);
				},
				failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}}); //M_F=数据保存失败
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	//显示费用处理界面
	this.showExpense = function(p){
		var p=sm.getSelected();
		if(p){
			//以下这一段是为了不重复成生费用处理弹出界面
			//去取得以W_EXPE_+id组成的id号的窗口，如果存在，则直接弹出，如果不存在，则生成新的弹出
			var t = Ext.getCmp('W_EXPE_'+p.get("id"));
			if(t){
				t.show();
			}
			else {
				createWindow('W_EXPE_'+p.get("id"),C_CONSIGN+C_EXPE+"-"+p.get("consNo"),new Fos.ExpenseTab(p,'SET'));
			}
		}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};	
	
	var btnShowExp = new Ext.Button({text:C_EXPE,
		disabled:NR(M1_SET+S_EXPE),iconCls:'option',handler:this.showExpense});
	
	//财务审核按钮
	var btnFinCheck = new Ext.Button({text:C_FIN_CHECK,iconCls:'check',
		disabled:NR(M1_SET+S_COAU+F_A),scope:this,handler:function(){this.updateStatus('1');}});
	//取消财务审核按钮
	var btnFinUnCheck = new Ext.Button({text:C_FIN_CHECK_CANCEL,iconCls:'renew',
		disabled:NR(M1_SET+S_COAU+F_A),scope:this,handler:function(){this.updateStatus('0');}});
	
	var btnManagerCheck = new Ext.Button({text:C_MANAGER_CHECK,
		disabled:NR(M1_SET+S_COAU+F_A2),iconCls:'check',scope:this,handler:function(){this.updateStatus('2');}});
	
	//取消经理审核按钮 
	var btnManagerUnCheck = new Ext.Button({text:C_MANAGER_CHECK_CANCEL,iconCls:'renew',
		disabled:NR(M1_SET+S_COAU+F_A2),scope:this,handler:function(){this.updateStatus('1');}});
	
	var btnSearch = new Ext.Button({text:C_SEARCH,iconCls:'search',handler:this.search});	
	var btnExport = new Ext.Button({text:C_EXPORT,
		disabled:NR(M1_SET+S_COAU+F_M),iconCls:'print',handler:function(){EXP('C','CONS_AUDIT','');}});	
	
	
	//重置按钮
	var btnReset = new Ext.Button({text:C_RESET,iconCls:'refresh',handler:this.reset});
		
	//updateToolBar这个函数是用来根据权限和记录状态，来改变tbar上面的各个审核与取消审核状态的。
	this.updateToolBar=function(r){
		btnFinCheck.setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=0);		    	
		btnFinUnCheck.setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
		btnManagerCheck.setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
		btnManagerUnCheck.setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=2);
	};
	
	//定义一个快速查询的输入条件文本框
	//specialkey事件处理，如果输入回车的话，执行快速查询函数
	var kw = new Ext.form.TextField({listeners:{scope:this,
		specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) 
				this.fastSearch();
			}
		}
	});
    
	//快速查询函数，以业务单号为条件
   this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,M_INPUT_BIZ_NO,function(b){kw.focus();});
			return;
		};
     	var a=[];
     	a[a.length]=new QParam({key:'consBizType',value:bizType,op:EQ});
     	var c=consNo.indexOf(',');
		var b=consNo.indexOf('..');
     	if(c>=0){
			a[a.length]=new QParam({key:'consNo',value:consNo,op:IN});
		}
		else if(b>=0){
			var ra=consNo.split('..');
			a[a.length]=new QParam({key:'consNo',value:ra[0],op:GE});
			a[a.length]=new QParam({key:'consNo',value:ra[1],op:LE});
		}
		else{
			a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
		}
     	
 		store.baseParams={_A:'CONS_CHECK_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS20},
 			callback:function(r){
	     		if(r.length==0) 
	     			XMG.alert(SYS,M_NOT_FOUND);
 			}
 		});
	};
   
   //快速查询按钮
   var btnFastSearch = new Ext.Button({text:C_FAST_SEARCH,iconCls:'search',scope:this,handler:this.fastSearch});
   var title = HTStore.getBT(bizType)+C_CONS_AUDIT;   
   Fos.ConsignAuditGrid.superclass.constructor.call(this, {
	    id:bizType+'COAU',iconCls:'grid',store: store,title:title,header:false,
	    autoScroll:true,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{
			rowdblclick: function(g,r,e){
				this.showExpense();
			}
		},
		view:new Ext.grid.GridView({forceFit:false,
			getRowClass: function(record, index) {
				var t=HTStore.getCFG('PROFIT_ALERT_TYPE');
				var v=HTStore.getCFG('PROFIT_ALERT_VALUE');
				var c = 0;
				if(t==C_PROFIT) {
					c = record.get('grossProfit');
				}			
				else{ 
					c=record.get('grossProfitRate');  
				}          
	            if (c < v) {
	            	return 'red-font-row';
	            }
	            else{ 
	            	return 'green-font-row';
	            }
	        }
		}),
		tbar:[btnShowExp,'-',btnFinCheck,btnFinUnCheck,'-',btnManagerCheck,btnManagerUnCheck,'-',
		      btnSearch,'-',btnExport,'-',kw,btnFastSearch,'-',btnReset],
		bbar:PTB(store,C_PS20)}
	);
};
Ext.extend(Fos.ConsignAuditGrid, Ext.grid.GridPanel);

/*Fos.TConsignAuditGrid = function() {
	var bp={_mt:'xml',xml:''};
	var store = new Ext.data.Store({
    	url: SERVICE_URL+'?_A=T_CONS_CHECK_X',baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TConsign'}, TConsign),
    	sortInfo:{field:'consDate', direction:'DESC'},remoteSort:true
	});
	store.load({params:{start:0,limit:C_PS20}});
	
	this.reset=function(){
		store.baseParams=bp;store.reload({params:{start:0,limit:C_PS20}});
	};	
	
	this.search = function(){
		var win = new Fos.consSearchWin('TCON_SEARCH',store);win.show();
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,
		listeners:{scope:this,
			rowselect:function(s,row,r){this.updateToolBar(r);}
		}
	});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,width:100,dataIndex:"consStatusAud",renderer:HTStore.getAUST},
		{header:C_CONS_NO,dataIndex:"consNo",width:150},
		{header:C_BOOKER,width:180,dataIndex:"custName"},
		{header:C_CONS_DATE,dataIndex:"consDate",renderer:formatDate},	
		{header:C_PACKAGES,width:60,dataIndex:"packages",align:'right',css:'font-weight:bold;'},
		{header:C_GROSS_WEIGHT,dataIndex:"grossWeight",align:'right',css:'font-weight:bold;'},
		{header:C_CBM,dataIndex:"measurement",align:'right',css:'font-weight:bold;'},	
		{header:C_SUM_AR,dataIndex:"sumR",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_SUM_AP,dataIndex:"sumP",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_PROFIT,dataIndex:"grossProfit",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_PROFIT_RATE,dataIndex:"grossProfitRate",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_AR_USD,dataIndex:"sumRUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AP_USD,dataIndex:"sumPUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AR_CNY,dataIndex:"sumRCny",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AP_CNY,dataIndex:"sumPCny",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AR_USD_INVOICED,hidden:true,dataIndex:"sumRUsdInvoice",align:'right',renderer:numRender},
		{header:C_AR_USD_WRITEOFFED,hidden:true,dataIndex:"sumRUsdWriteOff",align:'right',renderer:numRender},
		{header:C_AR_CNY_INVOICED,hidden:true,dataIndex:"sumRCnyInvoice",align:'right',renderer:numRender},
		{header:C_AR_CNY_WRITEOFFED,hidden:true,dataIndex:"sumRCnyWriteOff",align:'right',renderer:numRender},		
		{header:C_AP_USD_INVOICED,hidden:true,dataIndex:"sumPUsdInvoice",align:'right',renderer:numRender},
		{header:C_AP_USD_WRITEOFFED,hidden:true,dataIndex:"sumPUsdWriteOff",align:'right',renderer:numRender},		
		{header:C_AP_CNY_INVOICED,hidden:true,dataIndex:"sumPCnyInvoice",align:'right',renderer:numRender},
		{header:C_AP_CNY_WRITEOFFED,hidden:true,dataIndex:"sumPCnyWriteOff",align:'right',renderer:numRender},
		{header:C_REMARKS,dataIndex:"remarks"}
		],defaults:{sortable:false,width:100}});
		
	//显示费用
	this.showExpense = function(p){
		var p=sm.getSelected();
		if(p){
			var t = Ext.getCmp('W_EXPE_'+p.get("id"));
			if(t){
				t.show();
			}
			else {
				createWindow('W_EXPE_'+p.get("id"),C_CONSIGN+C_EXPE+"-"+p.get("consNo"),new Fos.ExpenseTab(p,'TMS'));
			}
		}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};	
	
	//财务审核
	this.updateStatus=function(s){
		var p = sm.getSelected();
		if(p) 
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'T_CONS_U',id:p.get('id'),consStatusAud:s},
				success: function(r){
					p.beginEdit();
					p.set('consStatusAud',s);
					if(s==1||s==2){p.set('consStatusExp',1);}
					else p.set('consStatusExp',0);
					p.endEdit();
					this.updateToolBar(p);
					Ext.Msg.alert(SYS,M_S);
				},
				failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}});
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var kw = new Ext.form.TextField({listeners:{scope:this,specialkey:function(c,e){if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();}}});
    //快速查询
	this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,M_INPUT_BIZ_NO,function(b){kw.focus();});
			return;
		};
     	var a=[];
     	var c=consNo.indexOf(',');
		var b=consNo.indexOf('..');
     	if(c>=0){
			a[a.length]=new QParam({key:'consNo',value:consNo,op:IN});
		}
		else if(b>=0){
			var ra=consNo.split('..');
			a[a.length]=new QParam({key:'consNo',value:ra[0],op:GE});
			a[a.length]=new QParam({key:'consNo',value:ra[1],op:LE});
		}
		else{
			a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
		}
     	
 		store.baseParams={_A:'T_CONS_CHECK_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS20},
 			callback:function(r){
	     		if(r.length==0) 
	     			XMG.alert(SYS,M_NOT_FOUND);
 			}
 		});
	};
	
	this.updateToolBar=function(r){
		tb=this.getTopToolbar();
		if(tb.getComponent('TB_2')) tb.getComponent('TB_2').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=0);
    	if(tb.getComponent('TB_3')) tb.getComponent('TB_3').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_6')) tb.getComponent('TB_6').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_7')) tb.getComponent('TB_7').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=2);
	};
	var b1={itemId:'TB_1',text:C_EXPE,disabled:NR(M1_SET+S_EXPE),iconCls:'option',handler:this.showExpense};
	var b2={itemId:'TB_2',text:C_FIN_CHECK,disabled:NR(M1_SET+S_COAU+F_A),iconCls:'check',scope:this,handler:function(){this.updateStatus('1');}};
	var b3={itemId:'TB_3',text:C_MANAGER_CHECK,disabled:NR(M1_SET+S_COAU+F_A2),iconCls:'check',scope:this,handler:function(){this.updateStatus('2');}};
	var b4={itemId:'TB_4',text:C_SEARCH,iconCls:'search',handler:this.search};
	var b5={itemId:'TB_5',text:C_EXPORT,disabled:NR(M1_SET+S_COAU+F_M),iconCls:'print',handler:function(){EXP('C','CONS_AUDIT','');}};
	var b6={itemId:'TB_6',text:C_FIN_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A),scope:this,handler:function(){this.updateStatus('0');}};
	var b7={itemId:'TB_7',text:C_MANAGER_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A2),scope:this,handler:function(){this.updateStatus('1');}};
	var b8={text:C_FAST_SEARCH+'(Q)',iconCls:'search',scope:this,handler:this.fastSearch};
	var b9={text:C_RESET+'(F5)',iconCls:'refresh',handler:this.reset};
	var vc={forceFit:false,
		groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})',
		getRowClass: function(record, index) {
			var t=HTStore.getCFG('PROFIT_ALERT_TYPE');
			var v=HTStore.getCFG('PROFIT_ALERT_VALUE');
			 var c = 0;
			if(t==C_PROFIT) c = record.get('grossProfit');			
			else c=record.get('grossProfitRate');            
            if (c < v) return 'red-font-row';
            else return 'green-font-row';
        }
	};
    
	Fos.TConsignAuditGrid.superclass.constructor.call(this, {
	    id:'T_G_COAU',iconCls:'grid',store: store,title:'陆运单票审核',header:false,
	    autoScroll:true,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{rowdblclick: function(g,r,e){this.showExpense();}},
		tbar:[b1,'-',b2,b6,'-',b3,b7,'-',b4,'-',b5,'-',kw,b8,'-',b9],bbar:PTB(store,C_PS20)});
};
Ext.extend(Fos.TConsignAuditGrid, Ext.grid.GridPanel);
*/

//陆运单票审核
Fos.TConsignAuditGrid = function() {
	var bp={_mt:'xml',xml:''};
	var store = new Ext.data.Store({
    	url: SERVICE_URL+'?_A=T_CONS_VIRTUAL',baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TConsign'}, TConsign),
    	sortInfo:{field:'consDate', direction:'DESC'},remoteSort:true
	});
	store.load({params:{start:0,limit:C_PS20}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,
		listeners:{scope:this,
			rowselect:function(s,row,r){this.updateToolBar(r);}
		}
	});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,align:'center',width:100,dataIndex:"consStatusAud",renderer:HTStore.getAUST},
		{header:C_CONS_NO,align:'center',dataIndex:"consNo",width:150},
		{header:C_BOOKER,align:'center',width:180,dataIndex:"custName"},
		{header:C_CONS_DATE,align:'center',dataIndex:"consDate",renderer:formatDate},	
		{header:C_PACKAGES,align:'center',width:60,dataIndex:"packages",align:'right',css:'font-weight:bold;'},
		{header:C_GROSS_WEIGHT,align:'center',dataIndex:"grossWeight",align:'right',css:'font-weight:bold;'},
		{header:C_CBM,align:'center',dataIndex:"volume",align:'right',css:'font-weight:bold;'},	
		{header:C_SUM_AR,align:'center',dataIndex:"sumR",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_SUM_AP,align:'center',dataIndex:"sumP",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_PROFIT,align:'center',dataIndex:"grossProfit",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_PROFIT_RATE,align:'center',dataIndex:"grossProfitRate",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_AR_USD,align:'center',dataIndex:"sumRUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AP_USD,align:'center',dataIndex:"sumPUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AR_CNY,align:'center',dataIndex:"sumRCny",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AP_CNY,align:'center',dataIndex:"sumPCny",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AR_USD_INVOICED,align:'center',hidden:true,dataIndex:"sumRUsdInvoice",align:'right',renderer:numRender},
		{header:C_AR_USD_WRITEOFFED,align:'center',hidden:true,dataIndex:"sumRUsdWriteOff",align:'right',renderer:numRender},
		{header:C_AR_CNY_INVOICED,align:'center',hidden:true,dataIndex:"sumRCnyInvoice",align:'right',renderer:numRender},
		{header:C_AR_CNY_WRITEOFFED,align:'center',hidden:true,dataIndex:"sumRCnyWriteOff",align:'right',renderer:numRender},		
		{header:C_AP_USD_INVOICED,align:'center',hidden:true,dataIndex:"sumPUsdInvoice",align:'right',renderer:numRender},
		{header:C_AP_USD_WRITEOFFED,align:'center',hidden:true,dataIndex:"sumPUsdWriteOff",align:'right',renderer:numRender},		
		{header:C_AP_CNY_INVOICED,align:'center',hidden:true,dataIndex:"sumPCnyInvoice",align:'right',renderer:numRender},
		{header:C_AP_CNY_WRITEOFFED,align:'center',hidden:true,dataIndex:"sumPCnyWriteOff",align:'right',renderer:numRender},
		{header:C_REMARKS,align:'center',dataIndex:"remarks"}
		],defaults:{sortable:false,width:100}});
	
	//显示费用
	this.showExpense = function(){
		var p=sm.getSelected();
		if(p){
			var t = Ext.getCmp('W_EXPE_'+p.get("id"));
			if(t){
				t.show();
			}
			else {
				//createWindow('W_EXPE_'+p.get("id"),C_CONSIGN+C_EXPE+"-"+p.get("consNo"),new Fos.TmsExpenseTab(p,'TMS'));
				var tab = this.ownerCt;
				var c = 'W_EXPE_'+p.get("id");
				tab.setActiveTab(tab.getComponent(c) ? tab.getComponent(c) : tab.add(new Fos.TmsExpenseTab(p,'TMS')));
			}
		}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};	
	
	//财务审核
	this.updateStatus=function(s){
		var p = sm.getSelected();
		if(p) 
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'T_VIRTUAL_U',id:p.get('id'),consStatusAud:s,consBizClass:p.get('consBizClass')},
				success: function(r){
					p.beginEdit();
					p.set('consStatusAud',s);
					if(s==1||s==2){p.set('consStatusExp',1);}
					else p.set('consStatusExp',0);
					p.endEdit();
					this.updateToolBar(p);
					Ext.Msg.alert(SYS,M_S);
				},
				failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}});
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	this.search = function(){
		var win = new Fos.TConsignSearchWin('TCON_SEARCH',store);win.show();
	};
	
	var kw = new Ext.form.TextField({listeners:{scope:this,specialkey:function(c,e){if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();}}});
    //快速查询
	this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,M_INPUT_BIZ_NO,function(b){kw.focus();});
			return;
		};
     	var a=[];
     	var c=consNo.indexOf(',');
		var b=consNo.indexOf('..');
     	if(c>=0){
			a[a.length]=new QParam({key:'consNo',value:consNo,op:IN});
		}
		else if(b>=0){
			var ra=consNo.split('..');
			a[a.length]=new QParam({key:'consNo',value:ra[0],op:GE});
			a[a.length]=new QParam({key:'consNo',value:ra[1],op:LE});
		}
		else{
			a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
		}
     	
 		store.baseParams={_A:'T_CONS_VIRTUAL',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS20},
 			callback:function(r){
	     		if(r.length==0) 
	     			XMG.alert(SYS,M_NOT_FOUND);
 			}
 		});
	};
	
	this.reset=function(){
		store.baseParams=bp;store.reload({params:{start:0,limit:C_PS20}});
	};	
	
	this.updateToolBar=function(r){
		tb=this.getTopToolbar();
		if(tb.getComponent('TB_2')) tb.getComponent('TB_2').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=0);
    	if(tb.getComponent('TB_3')) tb.getComponent('TB_3').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_6')) tb.getComponent('TB_6').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_7')) tb.getComponent('TB_7').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=2);
	};
	var b1={itemId:'TB_1',text:C_EXPE,disabled:NR(M1_SET+S_EXPE),iconCls:'option',scope:this,handler:this.showExpense};
	var b2={itemId:'TB_2',text:C_FIN_CHECK,disabled:NR(M1_SET+S_COAU+F_A),iconCls:'check',scope:this,handler:function(){this.updateStatus('1');}};
	var b3={itemId:'TB_3',text:C_MANAGER_CHECK,disabled:NR(M1_SET+S_COAU+F_A2),iconCls:'check',scope:this,handler:function(){this.updateStatus('2');}};
	var b4={itemId:'TB_4',text:C_SEARCH,iconCls:'search',handler:this.search};
	var b5={itemId:'TB_5',text:C_EXPORT,disabled:NR(M1_SET+S_COAU+F_M),iconCls:'print',handler:function(){EXPC('C','CONS_AUDIT','');}};
	var b6={itemId:'TB_6',text:C_FIN_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A),scope:this,handler:function(){this.updateStatus('0');}};
	var b7={itemId:'TB_7',text:C_MANAGER_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A2),scope:this,handler:function(){this.updateStatus('1');}};
	var b8={text:C_FAST_SEARCH+'(Q)',iconCls:'search',scope:this,handler:this.fastSearch};
	var b9={text:C_RESET+'(F5)',iconCls:'refresh',handler:this.reset};
	var vc={forceFit:false,
		groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})',
		getRowClass: function(record, index) {
			var t=HTStore.getCFG('PROFIT_ALERT_TYPE');
			var v=HTStore.getCFG('PROFIT_ALERT_VALUE');
			 var c = 0;
			if(t==C_PROFIT) c = record.get('grossProfit');			
			else c=record.get('grossProfitRate');            
            if (c < v) return 'red-font-row';
            else return 'green-font-row';
        }
	};
    
	Fos.TConsignAuditGrid.superclass.constructor.call(this, {
	    id:'T_G_COAU',iconCls:'grid',store: store,title:'陆运费用',header:false,
	    autoScroll:true,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{rowdblclick: function(g,r,e){this.showExpense();}},
		tbar:[b1,'-',b2,b6,'-',b3,b7,'-',b4,'-',b5,'-',kw,b8,'-',b9],bbar:PTB(store,C_PS20)});
};
Ext.extend(Fos.TConsignAuditGrid, Ext.grid.GridPanel);

//派车单票审核
Fos.TTransAuditGrid = function() {
	var bp={_mt:'xml',xml:''};
	var store = new Ext.data.Store({
    	url: SERVICE_URL+'?_A=T_TTRAN_VIRTUAL',baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TTransTask'}, TTransTask),
    	sortInfo:{field:'startDate', direction:'DESC'},remoteSort:true
	});
	store.load({params:{start:0,limit:C_PS20}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,
		listeners:{scope:this,
			rowselect:function(s,row,r){this.updateToolBar(r);}
		}
	});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,align:'center',width:100,dataIndex:"consStatusAud",renderer:HTStore.getAUST},
		{header:C_CONS_NO,align:'center',dataIndex:"transTaskNo",width:150},
		{header:C_BOOKER,align:'center',width:180,dataIndex:"motorcadeName"},
		{header:C_CONS_DATE,align:'center',dataIndex:"startDate",renderer:formatDate},	
		{header:C_PACKAGES,align:'center',width:60,dataIndex:"packages",align:'right',css:'font-weight:bold;'},
		{header:C_GROSS_WEIGHT,align:'center',dataIndex:"grossWeight",align:'right',css:'font-weight:bold;'},
		{header:C_CBM,align:'center',dataIndex:"volume",align:'right',css:'font-weight:bold;'},	
		{header:C_SUM_AR,align:'center',dataIndex:"sumR",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_SUM_AP,align:'center',dataIndex:"sumP",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_PROFIT,align:'center',dataIndex:"grossProfit",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_PROFIT_RATE,align:'center',dataIndex:"grossProfitRate",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_AR_USD,align:'center',dataIndex:"sumRUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AP_USD,align:'center',dataIndex:"sumPUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AR_CNY,align:'center',dataIndex:"sumRCny",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AP_CNY,align:'center',dataIndex:"sumPCny",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AR_USD_INVOICED,align:'center',hidden:true,dataIndex:"sumRUsdInvoice",align:'right',renderer:numRender},
		{header:C_AR_USD_WRITEOFFED,align:'center',hidden:true,dataIndex:"sumRUsdWriteOff",align:'right',renderer:numRender},
		{header:C_AR_CNY_INVOICED,align:'center',hidden:true,dataIndex:"sumRCnyInvoice",align:'right',renderer:numRender},
		{header:C_AR_CNY_WRITEOFFED,align:'center',hidden:true,dataIndex:"sumRCnyWriteOff",align:'right',renderer:numRender},		
		{header:C_AP_USD_INVOICED,align:'center',hidden:true,dataIndex:"sumPUsdInvoice",align:'right',renderer:numRender},
		{header:C_AP_USD_WRITEOFFED,align:'center',hidden:true,dataIndex:"sumPUsdWriteOff",align:'right',renderer:numRender},		
		{header:C_AP_CNY_INVOICED,align:'center',hidden:true,dataIndex:"sumPCnyInvoice",align:'right',renderer:numRender},
		{header:C_AP_CNY_WRITEOFFED,align:'center',hidden:true,dataIndex:"sumPCnyWriteOff",align:'right',renderer:numRender},
		{header:C_REMARKS,align:'center',dataIndex:"remarks"}
		],defaults:{sortable:false,width:100}});
		
	//显示费用
	this.showExpense = function(p){
		var p=sm.getSelected();
		if(p){
			var t = Ext.getCmp('W_EXPE_'+p.get("id"));
			if(t){
				t.show();
			}
			else {
				//createWindow('W_EXPE_'+p.get("id"),C_CONSIGN+C_EXPE+"-"+p.get("transTaskNo"),new Fos.TmsExpenseTab(p,'TMS'));
				var tab = this.ownerCt;
				var c = 'W_EXPE_'+p.get("id");
				tab.setActiveTab(tab.getComponent(c) ? tab.getComponent(c) : tab.add(new Fos.TmsExpenseTab(p,'TMS')));
			}
		}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};	
	
	//财务审核
	this.updateStatus=function(s){
		var p = sm.getSelected();
		if(p) 
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'T_VIRTUAL_U',id:p.get('id'),consStatusAud:s,consBizClass:p.get('consBizClass')},
				success: function(r){
					p.beginEdit();
					p.set('consStatusAud',s);
					if(s==1||s==2){p.set('consStatusExp',1);}
					else p.set('consStatusExp',0);
					p.endEdit();
					this.updateToolBar(p);
					Ext.Msg.alert(SYS,M_S);
				},
				failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}});
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};	
	
	this.search = function(){
		var win = new Fos.TTransComplexSearchWin('TTRANS_SEARCH',store);win.show();
	};
	
	var kw = new Ext.form.TextField({listeners:{scope:this,specialkey:function(c,e){if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();}}});
    //快速查询
	this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,M_INPUT_BIZ_NO,function(b){kw.focus();});
			return;
		};
     	var a=[];
     	var c=consNo.indexOf(',');
		var b=consNo.indexOf('..');
     	if(c>=0){
			a[a.length]=new QParam({key:'transTaskNo',value:consNo,op:IN});
		}
		else if(b>=0){
			var ra=consNo.split('..');
			a[a.length]=new QParam({key:'transTaskNo',value:ra[0],op:GE});
			a[a.length]=new QParam({key:'transTaskNo',value:ra[1],op:LE});
		}
		else{
			a[a.length]=new QParam({key:'transTaskNo',value:consNo,op:LI});
		}
     	
 		store.baseParams={_A:'T_TTRAN_VIRTUAL',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS20},
 			callback:function(r){
	     		if(r.length==0) 
	     			XMG.alert(SYS,M_NOT_FOUND);
 			}
 		});
	};
	
	this.reset=function(){
		store.baseParams=bp;store.reload({params:{start:0,limit:C_PS20}});
	};
	
	this.updateToolBar=function(r){
		tb=this.getTopToolbar();
		if(tb.getComponent('TB_2')) tb.getComponent('TB_2').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=0);
    	if(tb.getComponent('TB_3')) tb.getComponent('TB_3').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_6')) tb.getComponent('TB_6').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_7')) tb.getComponent('TB_7').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=2);
	};
	var b1={itemId:'TB_1',text:C_EXPE,disabled:NR(M1_SET+S_EXPE),iconCls:'option',scope:this,handler:this.showExpense};
	var b2={itemId:'TB_2',text:C_FIN_CHECK,disabled:NR(M1_SET+S_COAU+F_A),iconCls:'check',scope:this,handler:function(){this.updateStatus('1');}};
	var b3={itemId:'TB_3',text:C_MANAGER_CHECK,disabled:NR(M1_SET+S_COAU+F_A2),iconCls:'check',scope:this,handler:function(){this.updateStatus('2');}};
	var b4={itemId:'TB_4',text:C_SEARCH,iconCls:'search',handler:this.search};
	var b5={itemId:'TB_5',text:C_EXPORT,disabled:NR(M1_SET+S_COAU+F_M),iconCls:'print',handler:function(){EXPC('C','CONS_AUDIT','');}};
	var b6={itemId:'TB_6',text:C_FIN_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A),scope:this,handler:function(){this.updateStatus('0');}};
	var b7={itemId:'TB_7',text:C_MANAGER_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A2),scope:this,handler:function(){this.updateStatus('1');}};
	var b8={text:C_FAST_SEARCH+'(Q)',iconCls:'search',scope:this,handler:this.fastSearch};
	var b9={text:C_RESET+'(F5)',iconCls:'refresh',handler:this.reset};
	var vc={forceFit:false,
		groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})',
		getRowClass: function(record, index) {
			var t=HTStore.getCFG('PROFIT_ALERT_TYPE');
			var v=HTStore.getCFG('PROFIT_ALERT_VALUE');
			 var c = 0;
			if(t==C_PROFIT) c = record.get('grossProfit');			
			else c=record.get('grossProfitRate');            
            if (c < v) return 'red-font-row';
            else return 'green-font-row';
        }
	};
    
	Fos.TConsignAuditGrid.superclass.constructor.call(this, {
	    id:'T_T_RANS',iconCls:'grid',store: store,title:'派车费用',header:false,
	    autoScroll:true,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{rowdblclick: function(g,r,e){this.showExpense();}},
		tbar:[b1,'-',b2,b6,'-',b3,b7,'-',b4,'-',b5,'-',kw,b8,'-',b9],bbar:PTB(store,C_PS20)});
};
Ext.extend(Fos.TTransAuditGrid, Ext.grid.GridPanel);

//快件单票审核
Fos.TExpressAuditGrid = function() {
	var bp={_mt:'xml',xml:''};
	var store = new Ext.data.GroupingStore({
    	url: SERVICE_URL+'?_A=E_CONS_CHECK_X',baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TExpress'}, TExpress),
    	sortInfo:{field:'id', direction:'DESC'},remoteSort:true,groupField:''
	});
	store.load({params:{start:0,limit:C_PS20}});
	this.reset=function(){
		store.baseParams=bp;store.reload({params:{start:0,limit:C_PS20}});
	};	
	this.search = function(){
		var win = new Fos.ExprLookupWin('TEXPRESS_X',store);win.show();
	};	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,
		listeners:{scope:this,rowselect:function(s,row,r){this.updateToolBar(r);}}
	});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,width:80,dataIndex:"consStatusAud",renderer:HTStore.getAUST},
		{header:C_CONS_STATUS,dataIndex:"consStatus",renderer:HTStore.getCOST},
		{header:C_CONS_NO,dataIndex:"consNo",width:150},
		{header:C_BOOKER,width:200,dataIndex:"custName"},
		{header:C_CSNAME,width:200,dataIndex:"custSname"},
		{header:C_CONS_DATE,dataIndex:"consDate",renderer:formatDate},	
		{header:C_PACKAGES,width:60,dataIndex:"packages",align:'right',css:'font-weight:bold;'},
		{header:C_GROSS_WEIGHT,dataIndex:"grossWeight",align:'right',css:'font-weight:bold;'},
		{header:C_CBM,dataIndex:"measurement",align:'right',css:'font-weight:bold;'},	
		{header:C_SUM_AR,dataIndex:"sumR",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_SUM_AP,dataIndex:"sumP",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_PROFIT,dataIndex:"grossProfit",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_PROFIT_RATE,dataIndex:"grossProfitRate",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_AR_USD,dataIndex:"sumRUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AP_USD,dataIndex:"sumPUsd",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AR_CNY,dataIndex:"sumRCny",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_AP_CNY,dataIndex:"sumPCny",align:'right',renderer:numRender,css:'font-weight:bold;'},
		/*{header:C_CONT_NUM,width:60,dataIndex:"consTotalContainers",align:'right',renderer:function(v){return (v)?v:0;},css:'font-weight:bold;'},
		{header:C_CONT_INFO,width:60,dataIndex:"consContainersInfo"},*/
		{header:C_AR_USD_INVOICED,hidden:true,dataIndex:"sumRUsdInvoice",align:'right',renderer:numRender},
		{header:C_AR_USD_WRITEOFFED,hidden:true,dataIndex:"sumRUsdWriteOff",align:'right',renderer:numRender},
		{header:C_AR_CNY_INVOICED,hidden:true,dataIndex:"sumRCnyInvoice",align:'right',renderer:numRender},
		{header:C_AR_CNY_WRITEOFFED,hidden:true,dataIndex:"sumRCnyWriteOff",align:'right',renderer:numRender},		
		{header:C_AP_USD_INVOICED,hidden:true,dataIndex:"sumPUsdInvoice",align:'right',renderer:numRender},
		{header:C_AP_USD_WRITEOFFED,hidden:true,dataIndex:"sumPUsdWriteOff",align:'right',renderer:numRender},		
		{header:C_AP_CNY_INVOICED,hidden:true,dataIndex:"sumPCnyInvoice",align:'right',renderer:numRender},
		{header:C_AP_CNY_WRITEOFFED,hidden:true,dataIndex:"sumPCnyWriteOff",align:'right',renderer:numRender},
		{header:C_REMARKS,dataIndex:"remarks"}
		],defaults:{sortable:false,width:100}});
	//财务审核
	this.updateStatus=function(s){
		var p = sm.getSelected();
		if(p) 
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'E_CONS_U',id:p.get('id'),consStatusAud:s},
				success: function(r){
					p.beginEdit();
					p.set('consStatusAud',s);
					if(s==1||s==2){p.set('consStatusExp',1);}
					else p.set('consStatusExp',0);
					p.endEdit();
					this.updateToolBar(p);
					Ext.Msg.alert(SYS,M_S);
				},
				failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}});
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	//显示费用
	this.showExpense = function(p){
		var p=sm.getSelected();
		if(p){
			var t = Ext.getCmp('W_EXPE_'+p.get("id"));
			if(t){
				t.show();
			}
			else {
				createWindow('W_EXPE_'+p.get("id"),C_CONSIGN+C_EXPE+"-"+p.get("consNo"),new Fos.ExpenseTab(p,'EXPRESS'));
			}
		}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};	
	
	var kw = new Ext.form.TextField({listeners:{scope:this,specialkey:function(c,e){if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();}}});
    //快速查询
		this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,M_INPUT_BIZ_NO,function(b){kw.focus();});
			return;
		};
     	var a=[];
     	var c=consNo.indexOf(',');
		var b=consNo.indexOf('..');
     	if(c>=0){
			a[a.length]=new QParam({key:'consNo',value:consNo,op:IN});
		}
		else if(b>=0){
			var ra=consNo.split('..');
			a[a.length]=new QParam({key:'consNo',value:ra[0],op:GE});
			a[a.length]=new QParam({key:'consNo',value:ra[1],op:LE});
		}
		else{
			a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
		}
     	
 		store.baseParams={_A:'E_CONS_CHECK_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS20},
 			callback:function(r){
	     		if(r.length==0) 
	     			XMG.alert(SYS,M_NOT_FOUND);
 			}
 		});
	};
	
	this.updateToolBar=function(r){
		tb=this.getTopToolbar();
		if(tb.getComponent('TB_2')) tb.getComponent('TB_2').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=0);
    	if(tb.getComponent('TB_3')) tb.getComponent('TB_3').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_6')) tb.getComponent('TB_6').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=1);
    	if(tb.getComponent('TB_7')) tb.getComponent('TB_7').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=2);
	};
	var b1={itemId:'TB_1',text:C_EXPE,disabled:NR(M1_SET+S_EXPE),iconCls:'option',handler:this.showExpense};
	var b2={itemId:'TB_2',text:C_FIN_CHECK,disabled:NR(M1_SET+S_COAU+F_A),iconCls:'check',scope:this,handler:function(){this.updateStatus('1');}};
	var b3={itemId:'TB_3',text:C_MANAGER_CHECK,disabled:NR(M1_SET+S_COAU+F_A2),iconCls:'check',scope:this,handler:function(){this.updateStatus('2');}};
	var b4={itemId:'TB_4',text:C_SEARCH,iconCls:'search',handler:this.search};
	var b5={itemId:'TB_5',text:C_EXPORT,disabled:NR(M1_SET+S_COAU+F_M),iconCls:'print',handler:function(){EXP('C','E_CONS_AUDIT','');}};
	var b6={itemId:'TB_6',text:C_FIN_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A),scope:this,handler:function(){this.updateStatus('0');}};
	var b7={itemId:'TB_7',text:C_MANAGER_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A2),scope:this,handler:function(){this.updateStatus('1');}};
	var b8={text:C_FAST_SEARCH+'(Q)',iconCls:'search',handler:this.fastSearch};
	var b9={text:C_RESET+'(F5)',iconCls:'refresh',handler:this.reset};
	var vc={forceFit:false,
		groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})',
		getRowClass: function(record, index) {
			var t=HTStore.getCFG('PROFIT_ALERT_TYPE');
			var v=HTStore.getCFG('PROFIT_ALERT_VALUE');
			 var c = 0;
			if(t==C_PROFIT) c = record.get('grossProfit');			
			else c=record.get('grossProfitRate');            
            if (c < v) return 'red-font-row';
            else return 'green-font-row';
        }
	};
	Fos.TExpressAuditGrid.superclass.constructor.call(this, {
	    id:'E_G_COAU',iconCls:'grid',store: store,title:'快递单票审核',header:false,
	    autoScroll:true,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{rowdblclick: function(g,r,e){this.showExpense();}},
		view:new Ext.grid.GroupingView(vc),
		tbar:[b1,'-',b2,b6,'-',b3,b7,'-',b4,'-',b5,'-',kw,b8,'-',b9],bbar:PTB(store,C_PS20)});
};
Ext.extend(Fos.TExpressAuditGrid, Ext.grid.GridPanel);

//费用-海运空运-陆运-快件 共用
Fos.ExpenseTab = function(p,parent){
	PCny = new Ext.form.TextField({width:80,disabled:true});
	PUsd = new Ext.form.TextField({width:80,disabled:true});
	PLoc = new Ext.form.TextField({width:80,disabled:true});
	PRc  = new Ext.form.TextField({width:80,disabled:true});
	
	this.parent = parent;
	
	var pR=new Fos.ExGrid(p,'R',this);
	var pP=new Fos.ExGrid(p,'P',this);
	
	this.reCalculate = function(){
		PCny.setValue(HTUtil.round2(pR.sumCny-pP.sumCny));
		PUsd.setValue(HTUtil.round2(pR.sumUsd-pP.sumUsd));
		PLoc.setValue(HTUtil.round2(pR.sumLoc-pP.sumLoc));
		PRc.setValue(HTUtil.round2(pR.sumRc-pP.sumRc));
	};
		
	this.updateStatus=function(s){
		var action = "CONS_U";
		if(p.get('consBizType')==BT_T) action = "TCON_C_U";
		if(p.get('consBizType')==BT_W) action = "WCON_C_U";
		if(p.get('consBizType')==BT_E) action = "ECON_C_U";
		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:action,id:p.get('id'),consStatusExp:s},
			success: function(r){
				p.beginEdit();
				p.set('consStatusExp',s);
				p.endEdit();
				this.updateToolBar();
				Ext.Msg.alert(SYS,M_S);
			},
			failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}});
	};
	
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'));
	if(p.get('consBizType')=='T')
		m=M1_TMS;
	if(parent=='SET') 
		m=M1_SET+S_EXPE+'04';
	else 
		m=m+M3_EXPE+'04'; 
	
	//业务确认 1
	this.check=function(){this.updateStatus('1');};
	//取消确认 0
	this.unCheck=function(){this.updateStatus('0');};
			
	var btnCheck = new Ext.Button({text:C_EXPE_AUDIT,
			disabled:NR(m)||p.get('consStatusExp')==1||p.get('consBizType')==BT_W,
			iconCls:'check',scope:this,handler:this.check});
	var btnUnCheck = new Ext.Button({text:C_EXPE_UNCHECK,
			disabled:NR(m)||p.get('consStatusExp')==0||p.get('consBizType')==BT_W,
			iconCls:'renew',scope:this,handler:this.unCheck});
		
	this.updateToolBar=function(){
		btnCheck.setDisabled(NR(m)||p.get('consStatusExp')==1);
		btnUnCheck.setDisabled(NR(m)||p.get('consStatusExp')==0);
    	pR.updateToolBar();
    	pP.updateToolBar();
	};
	
	var pBiz;
	if(p.get('consBizType')==BT_M||p.get('consBizType')==BT_A){
		pBiz = new Fos.ExpenseBizPanel(p);
	}
	else if(p.get('consBizType')==BT_T){
		
		if(p.get('consBizClass')=='O'){
			pBiz = new Fos.TmsExpenseBizPanel(p);
		}
		if(p.get('consBizClass')=='S'){
			pBiz = new Fos.TmsTransExpenseBizPanel(p);
		}
	}
	else if(p.get('consBizType')==BT_E){
		pBiz = new Fos.ExpressExpenseBizPanel(p);
	}
	else if(p.get('consBizType')==BT_W){
		pBiz = new Fos.WmsExpenseBizPanel(p);
	}
	
	Fos.ExpenseTab.superclass.constructor.call(this, {autoScroll:false,layout:'border',
		items: [pBiz,pR,pP],
		tbar:[btnCheck,'-',btnUnCheck,'->',
		      {xtype:'tbtext',text:C_PROFIT_CNY},PCny,'-',
		      {xtype:'tbtext',text:C_PROFIT_USD},PUsd,'-',
		      {xtype:'tbtext',text:C_PROFIT_LOC},PLoc,'-',
		      {xtype:'tbtext',text:C_PROFIT_RC},PRc]
		}
	);
};
Ext.extend(Fos.ExpenseTab, Ext.Panel);

/*
 * 费用编辑窗口
 * p 委托对象
 * t 费用类型，R：应收  P：应付
 * frm 上级窗口
 */
Fos.ExGrid = function(p,t,frm) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'EXPE_Q',_mt:'json',consBizType:p.get('consBizType')},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SExpense',id:'id'},SExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	
	store.load({params:{expeType:t,consId:p.get('id')},
		callback:function(){
		this.reCalculate();
	},scope:this});
	var txtSumCny = new Ext.form.TextField({width:80,disabled:true});
	var txtSumUsd = new Ext.form.TextField({width:80,disabled:true});
	var txtSumLoc = new Ext.form.TextField({width:80,disabled:true});
	var txtSumRc  = new Ext.form.TextField({width:80,disabled:true});
	
	this.sumCny=0;
	this.sumUsd=0;
	this.sumLoc=0;
	this.sumRc=0;
	
	this.reCalculate = function(){
		var d=store.getRange();
		this.sumCny=0;
		this.sumUsd=0;
		this.sumLoc=0;
		this.sumRc=0;
		for(var i=0;i<d.length;i++){
			if(d[i].get('currCode')=='CNY')
				this.sumCny+=parseFloat(d[i].get('expeTotalAmount'));
			else if(d[i].get('currCode')=='USD')
				this.sumUsd+=parseFloat(d[i].get('expeTotalAmount'));
			this.sumLoc+=parseFloat(d[i].get('expeTotalAmount')*d[i].get('expeExRate'));
			this.sumRc+=parseFloat(d[i].get('expeWriteOffRcAmount'));
		}
		txtSumCny.setValue(HTUtil.round2(this.sumCny));
		txtSumUsd.setValue(HTUtil.round2(this.sumUsd));
		txtSumLoc.setValue(HTUtil.round2(this.sumLoc));
		txtSumRc.setValue(HTUtil.round2(this.sumRc));	
		frm.reCalculate();
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	//结算单位
	var t1={header:C_SETTLE_OBJECT,width:200,dataIndex:"custName",align:'left',
			editor:new Fos.CustomerLookup({displayField:'custCode',valueField:'custCode',
			store:HTStore.getCS(),mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
           typeAhead:true,triggerAction:'all',selectOnFocus:true,lazyRender:true,
           custType:t=='R'?'custArFlag':'custApFlag',bizType:p.get('consBizType'),
           listClass:'x-combo-list-small',enableKeyEvents:true,
           listeners:{
           	scope:this,
         		keydown:{fn:function(f,e){
         			loadCustomer(f,e,t=='R'?'custArFlag':'custApFlag',p.get('consBizType'),1);
         		},buffer:400},
           	select:function(c,r,i){
					var b =sm.getSelected();
					b.set('custId',r.get('id'));
					b.set('custName',r.get('custNameCn'));
					b.set('custSName',r.get('custSNameCn'));
				}
			}})};
	
	var charBp = {_A:'CHAR_Q',_mt:'json'};
	if(p.get('consBizType') == BT_M){
		charBp = {_A:'CHAR_Q',_mt:'json',marineFlag:1};
	}
	else if(p.get('consBizType') == BT_A){
		charBp = {_A:'CHAR_Q',_mt:'json',airFlag:1};
	}
	else if(p.get('consBizType') == BT_G || p.get('consBizType') == BT_I){
		charBp = {_A:'CHAR_Q',_mt:'json',customsFlag:1};
	}
	else if(p.get('consBizType') == BT_T){
		charBp = {_A:'CHAR_Q',_mt:'json',tmsFlag:1};
	}
	else if(p.get('consBizType') == BT_W){
		charBp = {_A:'CHAR_Q',_mt:'json',wmsFlag:1};
	}
	else if(p.get('consBizType') == BT_E){
		charBp = {_A:'CHAR_Q',_mt:'json',expressFlag:1};
	}
	
	var charStore = new Ext.data.Store({url:SERVICE_URL,baseParams:charBp,
				reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GCharge',id:'id'},GCharge),
				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	//费用名称
    var t2={header:C_CHAR,width:100,dataIndex:"charName",align:'center',
			editor:new Ext.form.ComboBox({displayField:'charCode',valueField:'charName',triggerAction:'all',
           tpl:charTpl,itemSelector:'div.list-item',listWidth:300,allowBlank:false,
           emptyText:'',invalidText:'',mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',
           store:HTStore.getCHAR_S(),enableKeyEvents:true,
           listeners:{scope:this,select:function(c,r,i){
           	var b =sm.getSelected();
           	b.set('charId',r.get('id'));
           	b.set('chclId',r.get('chclId'));
           	b.set('chclCode',r.get('chclCode'));
           	b.set('charNameEn',r.get('charNameEn'));
           	b.set('currCode',r.get('currCode'));
           	b.set('unitId',r.get('unitId'));
           	b.set('expeExRate',HTStore.getExRate(r.get('currCode'),'CNY'));
           	b.set('charName',r.get('charName'));
           	this.reCalculate();}}})};
    //计量单位
    var t3={header:C_UNIT,width:80,dataIndex:"unitName",align:'center',
			editor:new Ext.form.ComboBox({displayField:'unitCode',valueField:'unitCode',triggerAction:'all',
           mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C()})};
    //计费数量
    var t4={header:C_CHARGE_QUANTITY,width:80,dataIndex:"expeNum",
   		renderer:function(v,m,r){
		    	v=parseFloat(v);
		    	v=v.toFixed(4);
		    	if(v=='NaN'){
		    		v='0.0000';
		    	};
		    	m.css='red-b';
		    	return v;
		    },
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
    //单价
	var t5={header:C_UNIT_PRICE,width:80,dataIndex:"expeUnitPrice",
			renderer:function(v,m,r){
		    	v=parseFloat(v);
		    	v=v.toFixed(4);
		    	if(v=='NaN'){
		    		v='0.0000';
		    	};
		    	m.css='red-b';
		    	return v;
		    },
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
	//币种
	var t6={header:C_CURR,dataIndex:'currCode',width:50,align:'center',
			editor:new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction: 'all',
           allowBlank:false,emptyText:'',invalidText:'',mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
           store:HTStore.getCURR_S()})};
	//汇率
	var t7={header:C_EX_RATE,width:60,dataIndex:"expeExRate",renderer:rateRender};
	//金额
	var t8={header:C_AMOUNT,width:80,dataIndex:"expeTotalAmount",
				renderer:function(v,m,r){
			    	v=parseFloat(v);
			    	v=v.toFixed(3);
			    	if(v=='NaN'){
			    		v='0.000';
			    	};
			    	m.css='red-b';
			    	return v;
			    }
			};
	//P/L
	var t11={header:C_PPCC,dataIndex:'pateCode',width:40,align:'center',
			editor:new Ext.form.ComboBox({displayField:'pateCode',valueField:'pateCode',triggerAction: 'all',
           mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPATE_S(),
           listeners:{scope:this,
				select:function(c,r,i){
					sm.getSelected().set('pateId',r.get('id'));
				}
			}})};
	//账单号
    var t12={header:C_INVO_NO,align:'center',dataIndex:"expeInvoiceNo"};
    //税务发票号
    var t13={header:C_TAX_NO,align:'center',dataIndex:"expeTaxInvoiceNo"};
    //C_INVOICED_AMOUNT
    var t14={header:C_INVOICED_AMOUNT,renderer:rateRender,dataIndex:"expeInvoiceAmount"};
    //已核销金额
    var t15={header:C_WRITEOFFED_AMOUNT,renderer:rateRender,dataIndex:"expeWriteOffAmount"};
    //备注
    var t16={header:C_REMARKS,width:100,dataIndex:"expeRemarks",editor:new Ext.form.TextField({enableKeyEvents:true,
   	listeners:{scope:this,keydown:function(c,e){k = e.getKey();if(k == e.ENTER) this.add();}}})};
    //账单日期
    var t17={header:C_INVO_DATE,width:100,renderer:formatDate,dataIndex:"expeInvoiceDate"};
    //核销日期
    var t18={header:C_WRITEOFF_DATE,renderer:formatDate,dataIndex:"expeWriteOffDate"};
    //创建时间
    var t19={header:C_CREATE_TIME,renderer:formatDateTime,dataIndex:"createTime"};
    //修改时间
    var t20={header:C_MODIFY_TIME,renderer:formatDateTime,dataIndex:"modifyTime"};
    //佣金%
    var t21={header:C_COMMISION_RATE,width:80,dataIndex:"expeCommissionRate",renderer:rateRender,
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
    //佣金
    var t22={header:C_COMMISION,width:60,dataIndex:"expeCommission",renderer:numRender,
			editor:new Ext.form.NumberField({decimalPrecision:2,allowBlank:false,emptyText:'',invalidText:''})};
    //创建人
    var t23={header:C_CREATE_BY,dataIndex:"createBy"};
    //修改人
    var t24={header:C_MODIFY_BY,dataIndex:"expeUpdateBy"};
    //制单人
    var t25={header:C_BILL_BY,dataIndex:"expeInvoiceBy"};
    //核销人
    var t26={header:C_VOUC_BY,dataIndex:"expeWriteOffBy"};
    //实际数量
    var t27={header:C_ACT_QUANTITY,width:80,dataIndex:"expeNum2",
			 renderer:function(v,m,r){
			    	v=parseFloat(v);
			    	v=v.toFixed(4);
			    	if(v=='NaN'){
			    		v='0.0000';
			    	};
			    	m.css='green-b';
			    	return v;
			    },
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
	
	var cols=[sm,t1,t2,t3,t4,t27,t5,t6,t21,t22,t8,t11,t7,t16,t12,t13,t14,t15,
	          t17,t18,t23,t19,t24,t20,t25,t26];	
	var cm=new Ext.grid.ColumnModel({columns:cols,defaults:{sortable:false,width:100,align:'right'}});
	cm.defaultSortable=true;cm.defaultWidth=100;
	
	//新增
	this.add=function(){
		function custIdFunction(){
			var cnId='';
			if(t=='R'){
				cnId=p.get('custId');					//委托单位
			}else if(t=='P'){
				if(p.get('consBizType')=='A'){
					cnId=p.get('consBookingAgency');	//空运-订舱代理
				}else if(p.get('consBizType')=='M'){
					cnId=p.get('consBookingAgency');	//海运-订舱代理
				}else if(p.get('consBizType')=='T'){
					cnId=p.get('motorcadeId');			//陆运-承运人
				}else if(p.get('consBizType')=='E'){
					cnId=p.get('exprCarrierId');		//快件-承运人
				}
			}
			return cnId;
		};
		function custNameFunction(){
			var cn='';
			if(t=='R'){
				cn=p.get('custName');					//委托单位
			}else if(t=='P'){
				if(p.get('consBizType')=='A'){
					cn=p.get('consBookingAgencyName');	//空运-订舱代理
				}else if(p.get('consBizType')=='M'){
					cn=p.get('consBookingAgencyName');	//海运-订舱代理
				}else if(p.get('consBizType')=='T'){
					cn=p.get('motorcadeName');			//陆运-承运人
				}else if(p.get('consBizType')=='E'){
					cn=p.get('exprCarrier');			//快件-承运人
				}
			}
			return cn;
		};
		var e = new SExpense({uuid:HTUtil.UUID(32),
			consId:p.get('id'),
			consNo:p.get('consNo'),
			consDate:p.get('consDate'),
			consMblNo:p.get('consMblNo'),
			consHblNo:p.get('consHblNo'),
			vessName:p.get('vessName'),
			voyaName:p.get('voyaName'),
			consSailDate:p.get('consSailDate'),
	   		consBizType:p.get('consBizType'),
	   		consBizClass:p.get('consBizClass'),
	   		consShipType:p.get('consShipType'),
	   		consCustId:p.get('custId'),
	   		consCustName:p.get('custName'),
	   		shliId:p.get('shliId'),
	   		custId:custIdFunction(),
	   		custName:custNameFunction(),
	   		custSname:t=='R'?p.get('custSname'):'',
	   		expeType:t=='R'?'R':'P',
	   		pateCode:'P',
	   		unitName:'EACH',
	   		currCode:'CNY',
	   		expeExRate:'1.0000',
	   		expeDate:new Date(),
	   		expeAllocationFlag:0,
	   		expeAllocatedFlag:0,
	   		expeInvoiceAmount:0,
	   		expeWriteOffAmount:0,
	   		expeWriteOffRcAmount:0,
	   		expeInnerAmount:0,
	   		expeRcAmount:0,
	   		expeCommission:0,
	   		expeCommissionRate:0,
	   		expeTotalAmount:0,
	   		expeStatus:0,
	   		expeBillStatus:0,
	   		expeInvoiceStatus:0,
	   		expeWriteOffStatus:0,
	   		version:0,
	   		rowAction:'N'});
		   	this.stopEditing();
		   	store.insert(0,e);
		   	sm.selectFirstRow();
		   	e.set('rowAction','N');
		   	this.startEditing(0, 1);
	};
	
	//删除
	this.removeExp=function(){
		var r = sm.getSelections();
		if(r.length){
			for(var i=0;i<r.length;i++){
				if(r[i].get('expeInvoiceStatus')>0) 
					Ext.Msg.alert(SYS,M_REMOVE_EXP_INVOICED);
				else{
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
					store.remove(r[i]);
					this.reCalculate();
				}
			}
		}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	//保存
	this.save=function(){
		var a = store.getModifiedRecords();
		if(a.length){
			for(var i=0;i<a.length;i++){
				if(a[i].get('rowAction')!='R'&&a[i].get('rowAction')!='D'){
					if(a[i].get('custId')==''){
						Ext.Msg.alert(SYS,M_SETTLE_OBJECT_REQUIRED);
						return;
					}
					else if(a[i].get('charId')==''){
						Ext.Msg.alert(SYS,M_CHAR_REQUIRED);
						return;
					}
					else if(a[i].get('expeNum')==''||a[i].get('expeNum')=='0'){
						Ext.Msg.alert(SYS,C_CHARGE_QUANTITY_REQUIRED);
						return;
					}
					else if(a[i].get('expeUnitPrice')==''||a[i].get('expeUnitPrice')=='0'){
						Ext.Msg.alert(SYS,M_UNIT_PRICE_REQUIRED);
						return;
					}
					else if(a[i].get('currCode')==''){
						Ext.Msg.alert(SYS,M_CURR_PRICE_REQUIRED);
						return;}
					else if(a[i].get('pateCode')==''){
						Ext.Msg.alert(SYS,M_PPCC_REQUIRED);
						return;
					}
				}
			}
			var x = HTUtil.ATX(a,'SExpense',SExpense);
			if(x!=''){					
				btnSave.setDisabled(true);
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'EXPE_S'},
					success: function(res){
						var a = HTUtil.XTRA(res.responseXML,'SExpense',SExpense);
						for(var i=0;i<a.length;i++){
							if(a[i].get('rowAction')=='N'){
								a[i].set('rowAction','M');
							}
						};
						HTUtil.RUA(store,a,SExpense);
						Ext.Msg.alert(SYS,M_S);
						btnSave.setDisabled(false);
					},
					failure: function(res){
						Ext.Msg.alert(SYS,M_F+res.responseText);
						btnSave.setDisabled(false);
					},
					xmlData:HTUtil.HTX(x)
				});
			}
		}
		else Ext.Msg.alert(SYS,M_NC);
	};
	
	//复制
	this.cp=function(){
		var p = sm.getSelected();
		if(p){
			var e = new SExpense({});
			var f = SExpense.prototype.fields;
			for (var i=0;i<f.keys.length;i++){
			var fn=''+f.keys[i];
			e.set(fn,p.get(fn));}
			e.set('expeDate',new Date());
			e.set('id','');
			e.set('version','1');
			e.set('expeInvoiceNo','');
			e.set('expeInvoiceDate','');
			e.set('expeUnitPrice','');
			e.set('expeNum',1);
			e.set('expeTotalAmount','');
			e.set('expeCommission','');
			e.set('expeCommissionRate','');
			e.set('expeRcAmount',0);
			e.set('expeWriteOffDate','');
			e.set('expeInvoiceAmount',0);
			e.set('expeWriteOffAmount',0);
			e.set('expeWriteOffRcAmount',0);
			e.set('expeStatus',0);e.set('expeBillStatus',0);
			e.set('expeInvoiceStatus',0);
			e.set('expeWriteoffStatus',0);
			e.set('expeAllocationFlag',0);
			e.set('expeAllocatedFlag',0);
			e.set('consIdM','');
			e.set('consNoM','');
			e.set('uuid',HTUtil.UUID(32));
			this.stopEditing();
			store.insert(0,e);
			e.set('rowAction','N');
			this.startEditing(0,1);
			this.reCalculate();
		}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	
	var addExpenseByTemplate = function(tempId){
		 var action = 'GET_EXPE_BY_TEMPLATE_M';
		 
		Ext.Ajax.request({scope:this,url:SERVICE_URL+'?_A='+action+'&exteId='+tempId+'&consId='+p.get('id'),method:'POST',
			success: function(res){
				var ra = HTUtil.XTRA(res.responseXML,'SExpense',SExpense);
				if(ra.length==0){
					XMG.alert(SYS,'费用模板没有配置收费项目！');
				}
				else{
					store.add(ra);
				}
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}
		});
	};
	
	//从模版导入数据
	this.getExpenseByTemplate = function(){
		Ext.Ajax.request({scope:this,url:SERVICE_URL+'?_A=EXPE_TEMPLATE_Q&consBizType='+p.get('consBizType'),method:'POST',
			success: function(res){
				var ra = HTUtil.XTRA(res.responseXML,'SExpenseTemplate',SExpenseTemplate);
				if(ra.length==0){
					XMG.alert(SYS,'没有找到费用模板，请先维护费用模板！');
				}
				else if(ra.length==1){
					var tempId = ra[0].get('id');
					addExpenseByTemplate(tempId);
				}
				else{
					var tempStore = new Ext.data.Store({
						reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'SExpenseTemplate'},SExpenseTemplate)
					});	
					tempStore.loadData(res.responseXML,false);			
					
					var frmTemplate = new Ext.form.FormPanel({labelWidth:80,padding:5,
				    	items: [{fieldLabel:C_TEMP_SEL_P,id:'tempId',allowBlank:false,
				    		store:tempStore,xtype:'combo',displayField:'exteName',valueField:'id',
				    		typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}]
				    });
					
					var w=new Ext.Window({title:C_TEMP_SEL_P,modal:true,width:400,
				        Height:300,buttonAlign:'right',items:frmTemplate});
					
					w.addButton({text:C_OK,handler:function(){					
						var tempId = w.findById('tempId').getValue();
						if(tempId){
							addExpenseByTemplate(tempId);
					  	}
					  	w.close();
					}},this);
					w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);w.show();
				}
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}
		});
	};
	
	var locked=p.get('consBizType')!=BT_W?(p.get('consStatusExp')==1||p.get('consStatusAud')!=0):false;
	
	//费用确认单
	this.expConfirm=function(){
		var a = sm.getSelections();
		var expeIds = '';
		if(a.length){
			for(var i=0;i<a.length;i++){
				expeIds += a[i].get('id');
				if(i<a.length-1){
					expeIds += ',';
				}
			}
			EXPC('EXPE_CONFIRM','&aggressive=1&consBizType='+p.get('consBizType')+'&expeType='+t+'&expeIds='+expeIds+'&consignId='+p.get('id'));
		}
		else{
			EXPC('EXPE_CONFIRM','&aggressive=1&consBizType='+p.get('consBizType')+'&expeType='+t+'&consignId='+p.get('id'));
		}
	};
	
	//费用结算单
	this.expSettlement = function(){
		EXPC('EXPE_SETTLEMENT','&aggressive=1&consBizType='+p.get('consBizType')+'&sort='+t+'&id='+p.get('id'));
	};
	
	//退单申请
	this.expChargeBack=function(){
	    EXPC('EXPE_CHARGEBACK','&aggressive=1&consBizType='+p.get('consBizType')+'&id='+p.get('id'));
	};
	var expMenu = [{text:C_EXPE_CONFIRM,scope:this,handler:this.expConfirm}];
	if(t=='R'){
		expMenu[expMenu.length] = new Ext.menu.Item({text:C_EXPE_SETTLEMENT,scope:this,handler:this.expSettlement});
		expMenu[expMenu.length] = new Ext.menu.Item({text:M_CHARGEBACK,scope:this,handler:this.expChargeBack});
	}
	
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'));
	var x=S_AR;
	if(t=='P') 
		x=S_AP; 
	else if(t=='R')  
		x=S_AR; 
	else 
		x=S_AC;
	if(frm.parent=='SET') 
		m=M1_SET+S_EXPE+x;
	else 
		m=m+M3_EXPE+x; 
		
	var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',scope:this,
			disabled:NR(m+F_M)||locked,handler:this.add});
	var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',scope:this,
			disabled:NR(m+F_R)||locked,handler:this.removeExp});
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',scope:this,
			disabled:NR(m+F_M)||locked,handler:this.save});
	var btnCopy = new Ext.Button({text:C_COPY_FROM,iconCls:'copy',scope:this,
			disabled:NR(m+F_M)||locked,handler:this.cp});
   var btnExport = new Ext.Button({text:C_EXPORT,iconCls:'print',
   		disabled:NR(m+F_E)||locked,scope:this,menu:{items:expMenu}});
  
   var btnAddByTemplate = new Ext.Button({text:'从模板导入费用',iconCls:'copy',scope:this,
		disabled:NR(m+F_M)||locked,handler:this.getExpenseByTemplate});
   
   this.updateToolBar=function(){
		tb=this.getTopToolbar();
		locked=p.get('consBizType')!=BT_W?p.get('consStatusExp')==1||p.get('consStatusAud')!=0:false;
		
		btnAdd.setDisabled(NR(F_M)||locked);
		btnRemove.setDisabled(NR(F_M)||locked);
		btnSave.setDisabled(NR(F_M)||locked);
		btnCopy.setDisabled(NR(F_M)||locked);
		btnAddByTemplate.setDisabled(NR(F_M)||locked);
	};
	
	Fos.ExGrid.superclass.constructor.call(this, {title:t=='R'?C_EXPE_R:C_EXPE_P,
			split:t=='R',collapsible:t=='R',region:t=='R'?'center':'south',
			autoScroll:true,clicksToEdit:1,height:180,
			stripeRows:false,store:store,sm:sm,cm:cm,listeners:{scope:this,
		beforeedit:function(e){
			e.cancel = e.record.get('expeStatus')>0||e.record.get('expeInvoiceStatus')>0||e.record.get('expeWriteOffStatus')>0;},
   		afteredit:function(e){
			var f=e.field;
			var r=e.record;
	    	if(f=='expeNum'){
	    		r.beginEdit();
	    		r.set('expeNum',e.value);
	    		r.set('expeTotalAmount',HTUtil.round2(e.value*r.get('expeUnitPrice')-r.get('expeCommission')));    		
	    		r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
	    		r.endEdit();
	    		this.reCalculate();}
	    	if(f=='unitName'){
	    		r.beginEdit();
	            r.set('expeTotalAmount',HTUtil.round2(r.get('expeNum')*r.get('expeUnitPrice')-r.get('expeCommission')));    		
	    		r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
	    		r.endEdit();
	    		this.reCalculate();}
			else if(f=='expeUnitPrice'){
				r.beginEdit();
				r.set('expeTotalAmount',HTUtil.round2(e.value*r.get('expeNum')-r.get('expeCommission')));			
				r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
				r.endEdit();
				this.reCalculate();}
			else if(f=='currCode'){
				r.beginEdit();
				r.set('expeExRate',HTStore.getExRate(e.value,'CNY'));
				r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
				r.endEdit();
				this.reCalculate();}
			else if(f=='expeCommission'){
				r.beginEdit();
				r.set('expeTotalAmount',HTUtil.round2(r.get('expeUnitPrice')*r.get('expeNum')-e.value));
				r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
				r.endEdit();
				this.reCalculate();}
			else if(f=='expeCommissionRate'){
				r.beginEdit();
				r.set('expeCommission',HTUtil.round2(r.get('expeTotalAmount')*e.value/100));
				r.set('expeTotalAmount',HTUtil.round2(r.get('expeUnitPrice')*r.get('expeNum')-r.get('expeCommission')));
				r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
				r.endEdit();
				this.reCalculate();}
			else if(f=='charName'){
				r.beginEdit();
				var charNameValue=r.get('charName');
				if(charNameValue=='保费'||charNameValue=='BF'){
					r.set('expeNum',1);
					r.set('expeNum2',0);
					if(t=='R'){
						if(p.get('consBizType')=='T'){
							r.set('expeUnitPrice',p.get('premiumExpense'));
						}
					}else if(t=='P'){
						if(p.get('consBizType')=='T'){
							r.set('expeUnitPrice',p.get('premiumExpenseProvider'));
						}
					}
				}else if(charNameValue=='运费'||charNameValue=='YF'){
					r.set('expeNum',0);
					r.set('expeUnitPrice',0);
					if(t=='R'){
						if(p.get('consBizType')=='E'){
							r.set('expeNum2',p.get('exprTotalWeight'));
						}
					}else if(t=='P'){
						if(p.get('consBizType')=='E'){
							r.set('expeNum2',p.get('exprTotalAWeight'));
						}
					}
				}
	            r.set('expeTotalAmount',HTUtil.round2(r.get('expeNum')*r.get('expeUnitPrice')-r.get('expeCommission')));    		
	    		r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
	    		r.endEdit();
				this.reCalculate();}
			}
	},
   tbar:[btnAdd, '-',btnRemove,'-',btnSave,'-',btnCopy,'-',btnAddByTemplate,'-',p.get('consBizType')!='T'?btnExport:'',
   		'->',
   		{xtype:'tbtext',text:C_SUM_CNY_C},txtSumCny,'-',
 	      {xtype:'tbtext',text:C_SUM_USD_C},txtSumUsd,'-',
 	      {xtype:'tbtext',text:C_SUM_LOC_C},txtSumLoc,'-',
 	      {xtype:'tbtext',text:C_SUM_RC},txtSumRc
   	]});
};
Ext.extend(Fos.ExGrid, Ext.grid.EditorGridPanel);

//WMS`s Expense

//仓储单票审核
Fos.TWMSAuditGrid = function() {
	var bp={_mt:'xml',xml:''};
	var store = new Ext.data.GroupingStore({
    	url: SERVICE_URL+'?_A=WSTORAGE_NOTE_CQCSN',baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote'}, WStorageNote),
    	sortInfo:{field:'id', direction:'DESC'},remoteSort:true,groupField:''
	});
	store.load({params:{start:0,limit:C_PS20}});
	
	this.reset=function(){
		store.baseParams=bp;store.reload({params:{start:0,limit:C_PS20}});
	};	
	this.search = function(){
		var win = new Fos.ExprLookupWin('TEXPRESS_X',store);win.show();
	};	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,
		listeners:{scope:this,rowselect:function(s,row,r){this.updateToolBar(r);}}
	});
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),sm,
		{header:C_AUDIT_STATUS,width:80,dataIndex:"consStatusAud",renderer:HTStore.getAUST},
		{header:C_CONS_STATUS,dataIndex:"status",renderer:WHTStore.getInWarehouseNoteStatus},
		{header:C_CONS_NO,dataIndex:"storageNoteNo",width:150},
		{header:C_BOOKER,width:200,dataIndex:"cargoOwnerName"},		
		{header:'接单日期',dataIndex:"storageDate",renderer:formatDate},	
		{header:C_PACKAGES,width:60,dataIndex:"packages",align:'right',css:'font-weight:bold;'},
		{header:C_GROSS_WEIGHT,dataIndex:"grossWeight",align:'right',css:'font-weight:bold;'},
		{header:C_CBM,dataIndex:"measurement",align:'right',css:'font-weight:bold;'},	
		{header:C_SUM_AR,dataIndex:"sumR",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_SUM_AP,dataIndex:"sumP",align:'right',renderer:numRender,css:'font-weight:bold;'},
		{header:C_PROFIT,dataIndex:"grossProfit",align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_PROFIT_RATE,align:'right',renderer:numRenderColor,css:'font-weight:bold;'},
		{header:C_REMARKS,dataIndex:"remarks"}
		],defaults:{sortable:false,width:100}});
	//财务审核
	this.updateStatus=function(s){
		var p = sm.getSelected();
		if(p) 
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'E_CONS_U',id:p.get('id'),consStatusAud:s},
				success: function(r){
					p.beginEdit();
					p.set('consStatusAud',s);
					if(s==1||s==2){p.set('consStatusExp',1);}
					else p.set('consStatusExp',0);
					p.endEdit();
					this.updateToolBar(p);
					Ext.Msg.alert(SYS,M_S);
				},
				failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}});
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	//显示费用
	this.showExpense = function(p){
		var p=sm.getSelected();
		if(p){
			var t = Ext.getCmp('W_EXPE_'+p.get("id"));
			if(t){
				t.show();
			}
			else {
				addTabToMain(new Fos.WmsExpenseTab(p,'EXPRESS'));
			}
		}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};	
	
	var kw = new Ext.form.TextField({listeners:{scope:this,specialkey:function(c,e){if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();}}});
    //快速查询
		this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,M_INPUT_BIZ_NO,function(b){kw.focus();});
			return;
		};
     	var a=[];
     	var c=consNo.indexOf(',');
		var b=consNo.indexOf('..');
     	if(c>=0){
			a[a.length]=new QParam({key:'storageNoteNo',value:consNo,op:IN});
		}
		else if(b>=0){
			var ra=consNo.split('..');
			a[a.length]=new QParam({key:'storageNoteNo',value:ra[0],op:GE});
			a[a.length]=new QParam({key:'storageNoteNo',value:ra[1],op:LE});
		}
		else{
			a[a.length]=new QParam({key:'storageNoteNo',value:consNo,op:LI});
		}
     	
 		store.baseParams={xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS20},
 			callback:function(r){
	     		if(r.length==0) 
	     			XMG.alert(SYS,M_NOT_FOUND);
 			}
 		});
	};
	
	this.updateToolBar=function(r){
		tb=this.getTopToolbar();
		if(tb.getComponent('TB_2')) tb.getComponent('TB_2').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=null?r.get('consStatusAud')!=0:false);
    	if(tb.getComponent('TB_3')) tb.getComponent('TB_3').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=null?r.get('consStatusAud')!=1:false);
    	if(tb.getComponent('TB_6')) tb.getComponent('TB_6').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=null?r.get('consStatusAud')!=1:false);
    	if(tb.getComponent('TB_7')) tb.getComponent('TB_7').setDisabled(NR(M1_SET+S_COAU+F_A)||r.get('consStatusAud')!=null?r.get('consStatusAud')!=2:false);
	};
	var b1={itemId:'TB_1',text:C_EXPE,disabled:NR(M1_SET+S_EXPE),iconCls:'option',handler:this.showExpense};
	var b2={itemId:'TB_2',text:C_FIN_CHECK,disabled:NR(M1_SET+S_COAU+F_A),iconCls:'check',scope:this,handler:function(){this.updateStatus('1');}};
	var b3={itemId:'TB_3',text:C_MANAGER_CHECK,disabled:NR(M1_SET+S_COAU+F_A2),iconCls:'check',scope:this,handler:function(){this.updateStatus('2');}};
	var b4={itemId:'TB_4',text:C_SEARCH,iconCls:'search',handler:this.search};
	var b5={itemId:'TB_5',text:C_EXPORT,disabled:NR(M1_SET+S_COAU+F_M),iconCls:'print',handler:function(){EXP('C','E_CONS_AUDIT','');}};
	var b6={itemId:'TB_6',text:C_FIN_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A),scope:this,handler:function(){this.updateStatus('0');}};
	var b7={itemId:'TB_7',text:C_MANAGER_CHECK_CANCEL,iconCls:'renew',disabled:NR(M1_SET+S_COAU+F_A2),scope:this,handler:function(){this.updateStatus('1');}};
	var b8={text:C_FAST_SEARCH+'(Q)',iconCls:'search',handler:this.fastSearch};
	var b9={text:C_RESET+'(F5)',iconCls:'refresh',handler:this.reset};
	var vc={forceFit:false,
		groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})',
		getRowClass: function(record, index) {
			var t=HTStore.getCFG('PROFIT_ALERT_TYPE');
			var v=HTStore.getCFG('PROFIT_ALERT_VALUE');
			 var c = 0;
			if(t==C_PROFIT) c = record.get('grossProfit');			
			else c=record.get('grossProfitRate');            
            if (c < v) return 'red-font-row';
            else return 'green-font-row';
        }
	};
	Fos.TWMSAuditGrid.superclass.constructor.call(this, {
	    id:'E_G_COAU',iconCls:'grid',store: store,title:'仓储费用登记',header:false,
	    autoScroll:true,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{rowdblclick: function(g,r,e){this.showExpense();}},
		view:new Ext.grid.GroupingView(vc),
		tbar:[b1,'-',b2,b6,'-',b3,b7,'-',b4,'-',b5,'-',kw,b8,'-',b9],bbar:PTB(store,C_PS20)});
};
Ext.extend(Fos.TWMSAuditGrid, Ext.grid.GridPanel);

//费用界面业务信息（仓储）
Fos.WmsExpenseBizPanel = function(p){
	var txtCargoOwnerName = new Ext.form.TextField({fieldLabel:"货主",
		name:'cargoOwnerName',value:p.get('cargoOwnerName'),anchor:'95%'});
	
	var txtStorageNoteNo = new Ext.form.TextField({fieldLabel:'仓单号',
		name:'storageNoteNo',value:p.get('storageNoteNo'),anchor:'95%'});
	
	var txtStorageClass=new Ext.form.TextField({fieldLabel:'来源类型',
		name:'storageClass',value:p.get('storageClass'),anchor:'95%'});
	
	var txtActionGategory=new Ext.form.TextField({fieldLabel:'类别',name:'actionGategory',value:p.get('actionGategory'),
	   anchor:'95%'});
	
	//接单日期
	var ctxtStorageDate=new Ext.form.DateField({fieldLabel:C_STORAGE_DATE,
		name:'storageDate',value:p.get('storageDate'),format:DATEF,anchor:'95%'});
	
	//订单号
	var txtOrderNo=new Ext.form.TextField({fieldLabel:C_ORDER_NO,
		name:'orderNo',value:p.get('orderNo'),anchor:'95%'});
	
	//委托编号
	var txtEntrustNo=new Ext.form.TextField({fieldLabel:'客户订单号',
		name:'entrustNo',value:p.get('entrustNo'),anchor:'95%'});
	
	//客户
	var txtCustName=new Ext.form.TextField({fieldLabel:'客户',
			name:'custName',value:p.get('custName'),anchor:'95%'});
	
	//出入库要求
	var txtcustRequirement=new Ext.form.TextField({fieldLabel:'备注',name:'custRequirement',
			value:p.get('custRequirement'),anchor:'98%'});
	
	//出入库
	var txtStorageType=new Ext.form.TextField({fieldLabel:'业务类源',name:'storageType',
			value:WHTStore.getBizType(p.get('storageType')),anchor:'95%'});
	
	var txtTotalQuantity=new Ext.form.NumberField({fieldLabel:'总数量',anchor:'95%'});
	var txtTotalPackages=new Ext.form.NumberField({fieldLabel:'总件数',anchor:'95%'});
	var txtTotalGrossWeight=new Ext.form.NumberField({fieldLabel:'总毛重',anchor:'95%'});
	var txtTotalNetWeight=new Ext.form.NumberField({fieldLabel:'总净重',anchor:'95%'});
	var txtTotalVolume=new Ext.form.NumberField({fieldLabel:'总体积',anchor:'95%'});
	var txtTotalMeasure=new Ext.form.NumberField({fieldLabel:'总面积',anchor:'95%'});
	var txtTotalPallerQuantity=new Ext.form.NumberField({fieldLabel:'总铲板数',anchor:'95%'});
	
	Fos.WmsExpenseBizPanel.superclass.constructor.call(this,{region:'north',height:130,padding:5,
		layout:'column',title:C_BIZ_INFO,layoutConfig:{columns:2},
		deferredRender:true,collapsible:true,
		items:[
		{columnWidth:.25,layout:'form',border:false,labelWidth:90,labelAlign:'right',
            items:[txtStorageNoteNo,txtCargoOwnerName]},
        {columnWidth:.25,layout:'form',border:false,labelWidth:90,labelAlign:'right',
            items:[txtActionGategory,txtEntrustNo]},
        {columnWidth:.25,layout:'form',border:false,labelWidth:90,labelAlign:'right',
            items:[txtStorageClass,txtOrderNo]},
        {columnWidth:.25,layout:'form',border:false,labelWidth:90,labelAlign:'right',
            items:[ctxtStorageDate,txtStorageType]},
        {columnWidth:1,layout:'form',border:false,labelWidth:90,labelAlign:'right',
                items:[txtcustRequirement]}
            	
       
		]}
	);
};
Ext.extend(Fos.WmsExpenseBizPanel, Ext.Panel);

Fos.WmsExpenseTab = function(p,parent){
	PCny = new Ext.form.TextField({width:80,disabled:true});
	PUsd = new Ext.form.TextField({width:80,disabled:true});
	PLoc = new Ext.form.TextField({width:80,disabled:true});
	PRc  = new Ext.form.TextField({width:80,disabled:true});
	
	this.parent = parent;
	
	var pR=new Fos.WmsExGrid(p,'R',this);
	var pP=new Fos.WmsExGrid(p,'P',this);
	
	this.reCalculate = function(){
		PCny.setValue(HTUtil.round2(pR.sumCny-pP.sumCny));
		PUsd.setValue(HTUtil.round2(pR.sumUsd-pP.sumUsd));
		PLoc.setValue(HTUtil.round2(pR.sumLoc-pP.sumLoc));
		PRc.setValue(HTUtil.round2(pR.sumRc-pP.sumRc));
	};
		
	this.updateStatus=function(s){
		var action = "CONS_U";
		if(p.get('consBizType')==BT_T) action = "TCON_C_U";
		if(p.get('consBizType')==BT_W) action = "WCON_C_U";
		if(p.get('consBizType')==BT_E) action = "ECON_C_U";
		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:action,id:p.get('id'),consStatusExp:s},
			success: function(r){
				p.beginEdit();
				p.set('consStatusExp',s);
				p.endEdit();
				this.updateToolBar();
				Ext.Msg.alert(SYS,M_S);
			},
			failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}});
	};
	
	var m=M1_WMS;
	
	if(parent=='SET') 
		m=M1_SET+S_EXPE+'04';
	else 
		m=m+M3_EXPE+'04'; 
	
	//业务确认 1
	this.check=function(){this.updateStatus('1');};
	//取消确认 0
	this.unCheck=function(){this.updateStatus('0');};
			
	var btnCheck = new Ext.Button({text:C_EXPE_AUDIT,
			disabled:NR(m)||p.get('consStatusExp')==1,
			iconCls:'check',scope:this,handler:this.check});
	var btnUnCheck = new Ext.Button({text:C_EXPE_UNCHECK,
			disabled:NR(m)||p.get('consStatusExp')==0,
			iconCls:'renew',scope:this,handler:this.unCheck});
		
	this.updateToolBar=function(){
		btnCheck.setDisabled(NR(m)||p.get('consStatusExp')==1);
		btnUnCheck.setDisabled(NR(m)||p.get('consStatusExp')==0);
    	pR.updateToolBar();
    	pP.updateToolBar();
	};
	
	var pBiz = new Fos.WmsExpenseBizPanel(p);	

	var tab=new Ext.TabPanel({activeTab:0,region:'center',
		items:[pR,pP]});
	
	Fos.WmsExpenseTab.superclass.constructor.call(this, {title:'费用登记',
		id:'Expense'+p.get('id'),
		autoScroll:false,layout:'border',closable:true,
		items: [pBiz,tab],
		tbar:[btnCheck,'-',btnUnCheck,'->',
		      
		      {xtype:'tbtext',text:'利润合计'},PLoc,'-',
		      {xtype:'tbtext',text:C_PROFIT_RC},PRc]
		}
	);
};
Ext.extend(Fos.WmsExpenseTab, Ext.Panel);

/*
 * 仓储费用编辑窗口
 * p 委托对象
 * t 费用类型，R：应收  P：应付
 * frm 上级窗口
 */
Fos.WmsExGrid = function(p,t,frm) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'EXPE_Q',_mt:'json',consBizType:p.get('consBizType')},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'SExpense',id:'id'},SExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	
	store.load({params:{expeType:t,consId:p.get('id')},
		callback:function(){
		this.reCalculate();
	},scope:this});
	var txtSumCny = new Ext.form.TextField({width:80,disabled:true});
	var txtSumUsd = new Ext.form.TextField({width:80,disabled:true});
	var txtSumLoc = new Ext.form.TextField({width:80,disabled:true});
	var txtSumRc  = new Ext.form.TextField({width:80,disabled:true});
	
	this.sumCny=0;
	this.sumUsd=0;
	this.sumLoc=0;
	this.sumRc=0;
	
	this.reCalculate = function(){
		var d=store.getRange();
		this.sumCny=0;
		this.sumUsd=0;
		this.sumLoc=0;
		this.sumRc=0;
		for(var i=0;i<d.length;i++){
			if(d[i].get('currCode')=='CNY')
				this.sumCny+=parseFloat(d[i].get('expeTotalAmount'));
			else if(d[i].get('currCode')=='USD')
				this.sumUsd+=parseFloat(d[i].get('expeTotalAmount'));
			this.sumLoc+=parseFloat(d[i].get('expeTotalAmount')*d[i].get('expeExRate'));
			this.sumRc+=parseFloat(d[i].get('expeWriteOffRcAmount'));
		}
		txtSumCny.setValue(HTUtil.round2(this.sumCny));
		txtSumUsd.setValue(HTUtil.round2(this.sumUsd));
		txtSumLoc.setValue(HTUtil.round2(this.sumLoc));
		txtSumRc.setValue(HTUtil.round2(this.sumRc));	
		frm.reCalculate();
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	//结算单位
	var t1={header:C_SETTLE_OBJECT,width:200,dataIndex:"custName",align:'left',
			editor:new Fos.CustomerLookup({displayField:'custCode',valueField:'custCode',
			store:HTStore.getCS(),mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
           typeAhead:true,triggerAction:'all',selectOnFocus:true,lazyRender:true,
           custType:t=='R'?'custArFlag':'custApFlag',bizType:p.get('consBizType'),
           listClass:'x-combo-list-small',enableKeyEvents:true,
           listeners:{
           	scope:this,
         		keydown:{fn:function(f,e){
         			loadCustomer(f,e,t=='R'?'custArFlag':'custApFlag',p.get('consBizType'),1);
         		},buffer:400},
           	select:function(c,r,i){
					var b =sm.getSelected();
					b.set('custId',r.get('id'));
					b.set('custName',r.get('custNameCn'));
					b.set('custSName',r.get('custSNameCn'));
				}
			}})};
	

	//费用名称
    var t2={header:C_CHAR,width:100,dataIndex:"charName",align:'center',
			editor:new Ext.form.ComboBox({displayField:'charCode',valueField:'charName',triggerAction:'all',
           tpl:charTpl,itemSelector:'div.list-item',listWidth:300,allowBlank:false,
           emptyText:'',invalidText:'',mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',
           store:WHTStore.getCHAR_S(),enableKeyEvents:true,
           listeners:{scope:this,select:function(c,r,i){
           	var b =sm.getSelected();
           	b.set('charId',r.get('id'));
           	b.set('chclId',r.get('chclId'));
           	b.set('chclCode',r.get('chclCode'));
           	b.set('charNameEn',r.get('charNameEn'));
           	b.set('currCode',r.get('currCode'));
           	b.set('unitId',r.get('unitId'));
           	b.set('expeExRate',HTStore.getExRate(r.get('currCode'),'CNY'));
           	b.set('charName',r.get('charName'));
           	this.reCalculate();}}})};
    //计量单位
    var t3={header:C_UNIT,width:80,dataIndex:"unitName",align:'center',
			editor:new Ext.form.ComboBox({displayField:'unitCode',valueField:'unitCode',triggerAction:'all',
           mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C()})};
    //计费数量
    var t4={header:C_CHARGE_QUANTITY,width:80,dataIndex:"expeNum",
   		renderer:function(v,m,r){
		    	v=parseFloat(v);
		    	v=v.toFixed(4);
		    	if(v=='NaN'){
		    		v='0.0000';
		    	};
		    	m.css='red-b';
		    	return v;
		    },
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
    //单价
	var t5={header:C_UNIT_PRICE,width:80,dataIndex:"expeUnitPrice",
			renderer:function(v,m,r){
		    	v=parseFloat(v);
		    	v=v.toFixed(4);
		    	if(v=='NaN'){
		    		v='0.0000';
		    	};
		    	m.css='red-b';
		    	return v;
		    },
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
	//币种
	var t6={header:C_CURR,dataIndex:'currCode',width:50,align:'center',
			editor:new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction: 'all',
           allowBlank:false,emptyText:'',invalidText:'',mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
           store:HTStore.getCURR_S()})};
	//汇率
	var t7={header:C_EX_RATE,width:60,dataIndex:"expeExRate",renderer:rateRender};
	//金额
	var t8={header:C_AMOUNT,width:80,dataIndex:"expeTotalAmount",
				renderer:function(v,m,r){
			    	v=parseFloat(v);
			    	v=v.toFixed(3);
			    	if(v=='NaN'){
			    		v='0.000';
			    	};
			    	m.css='red-b';
			    	return v;
			    }
			};
	//P/L
	var t11={header:C_PPCC,dataIndex:'pateCode',width:40,align:'center',
			editor:new Ext.form.ComboBox({displayField:'pateCode',valueField:'pateCode',triggerAction: 'all',
           mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPATE_S(),
           listeners:{scope:this,
				select:function(c,r,i){
					sm.getSelected().set('pateId',r.get('id'));
				}
			}})};
	//账单号
    var t12={header:C_INVO_NO,align:'center',dataIndex:"expeInvoiceNo"};
    //税务发票号
    var t13={header:C_TAX_NO,align:'center',dataIndex:"expeTaxInvoiceNo"};
    //C_INVOICED_AMOUNT
    var t14={header:C_INVOICED_AMOUNT,renderer:rateRender,dataIndex:"expeInvoiceAmount"};
    //已核销金额
    var t15={header:C_WRITEOFFED_AMOUNT,renderer:rateRender,dataIndex:"expeWriteOffAmount"};
    //备注
    var t16={header:C_REMARKS,width:100,dataIndex:"expeRemarks",editor:new Ext.form.TextField({enableKeyEvents:true,
   	listeners:{scope:this,keydown:function(c,e){k = e.getKey();if(k == e.ENTER) this.add();}}})};
    //账单日期
    var t17={header:C_INVO_DATE,width:100,renderer:formatDate,dataIndex:"expeInvoiceDate"};
    //核销日期
    var t18={header:C_WRITEOFF_DATE,renderer:formatDate,dataIndex:"expeWriteOffDate"};
    //创建时间
    var t19={header:C_CREATE_TIME,renderer:formatDateTime,dataIndex:"createTime"};
    //修改时间
    var t20={header:C_MODIFY_TIME,renderer:formatDateTime,dataIndex:"modifyTime"};
    //佣金%
    var t21={header:C_COMMISION_RATE,width:80,dataIndex:"expeCommissionRate",renderer:rateRender,
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
    //佣金
    var t22={header:C_COMMISION,width:60,dataIndex:"expeCommission",renderer:numRender,
			editor:new Ext.form.NumberField({decimalPrecision:2,allowBlank:false,emptyText:'',invalidText:''})};
    //创建人
    var t23={header:C_CREATE_BY,dataIndex:"createBy"};
    //修改人
    var t24={header:C_MODIFY_BY,dataIndex:"expeUpdateBy"};
    //制单人
    var t25={header:C_BILL_BY,dataIndex:"expeInvoiceBy"};
    //核销人
    var t26={header:C_VOUC_BY,dataIndex:"expeWriteOffBy"};
    //实际数量
    var t27={header:C_ACT_QUANTITY,width:80,dataIndex:"expeNum2",
			 renderer:function(v,m,r){
			    	v=parseFloat(v);
			    	v=v.toFixed(4);
			    	if(v=='NaN'){
			    		v='0.0000';
			    	};
			    	m.css='green-b';
			    	return v;
			    },
			editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false,emptyText:'',invalidText:''})};
	
	var cols=[sm,t1,t2,t3,t4,t5,t8,t16,t12,t13,t14,t15,
	          t17,t18,t23,t19,t24,t20,t25,t26];	
	var cm=new Ext.grid.ColumnModel({columns:cols,defaults:{sortable:false,width:100,align:'right'}});
	cm.defaultSortable=true;cm.defaultWidth=100;
	
	//新增
	this.add=function(){
		function custIdFunction(){
			var cnId='';
			if(t=='R'){
				cnId=p.get('cargoOwnerId');					//委托单位
			}else if(t=='P'){
				cnId=p.get('custId');
			}
			return cnId;
		};
		function custNameFunction(){
			var cn='';
			if(t=='R'){
				cn=p.get('cargoOwnerName');					//委托单位
			}else if(t=='P'){
				cn=p.get('custName');
			}
			return cn;
		};
		var e = new SExpense({uuid:HTUtil.UUID(32),
			consId:p.get('id'),
			consNo:p.get('storageNoteNo'),
			consDate:p.get('storageDate'),
			consMblNo:'',
			consHblNo:'',
			vessName:'',
			voyaName:'',
			consSailDate:'',
	   		consBizType:'W',
	   		consBizClass:'',
	   		consShipType:'',
	   		consCustId:p.get('cargoOwnerId'),
	   		consCustName:p.get('cargoOwnerName'),
	   		shliId:'',
	   		custId:custIdFunction(),
	   		custName:custNameFunction(),
	   		custSname:t=='R'?p.get('cargoOwnerName'):'',
	   		expeType:t=='R'?'R':'P',
	   		pateCode:'P',
	   		unitName:'EACH',
	   		currCode:'CNY',
	   		expeExRate:'1.0000',
	   		expeDate:new Date(),
	   		expeAllocationFlag:0,
	   		expeAllocatedFlag:0,
	   		expeInvoiceAmount:0,
	   		expeWriteOffAmount:0,
	   		expeWriteOffRcAmount:0,
	   		expeInnerAmount:0,
	   		expeRcAmount:0,
	   		expeCommission:0,
	   		expeCommissionRate:0,
	   		expeTotalAmount:0,
	   		expeStatus:0,
	   		expeBillStatus:0,
	   		expeInvoiceStatus:0,
	   		expeWriteOffStatus:0,
	   		version:0,
	   		rowAction:'N'});
		   	this.stopEditing();
		   	store.insert(0,e);
		   	sm.selectFirstRow();
		   	e.set('rowAction','N');
		   	this.startEditing(0, 1);
	};
	
	//删除
	this.removeExp=function(){
		var r = sm.getSelections();
		if(r.length){
			for(var i=0;i<r.length;i++){
				if(r[i].get('expeInvoiceStatus')>0) 
					Ext.Msg.alert(SYS,M_REMOVE_EXP_INVOICED);
				else{
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
					store.remove(r[i]);
					this.reCalculate();
				}
			}
		}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	//保存
	this.save=function(){
		var a = store.getModifiedRecords();
		if(a.length){
			for(var i=0;i<a.length;i++){
				if(a[i].get('rowAction')!='R'&&a[i].get('rowAction')!='D'){
					if(a[i].get('custId')==''){
						Ext.Msg.alert(SYS,M_SETTLE_OBJECT_REQUIRED);
						return;
					}
					else if(a[i].get('charId')==''){
						Ext.Msg.alert(SYS,M_CHAR_REQUIRED);
						return;
					}
					else if(a[i].get('expeNum')==''||a[i].get('expeNum')=='0'){
						Ext.Msg.alert(SYS,C_CHARGE_QUANTITY_REQUIRED);
						return;
					}
					else if(a[i].get('expeUnitPrice')==''||a[i].get('expeUnitPrice')=='0'){
						Ext.Msg.alert(SYS,M_UNIT_PRICE_REQUIRED);
						return;
					}
					else if(a[i].get('currCode')==''){
						Ext.Msg.alert(SYS,M_CURR_PRICE_REQUIRED);
						return;}
					else if(a[i].get('pateCode')==''){
						Ext.Msg.alert(SYS,M_PPCC_REQUIRED);
						return;
					}
				}
			}
			var x = HTUtil.ATX(a,'SExpense',SExpense);
			if(x!=''){					
				btnSave.setDisabled(true);
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'EXPE_S'},
					success: function(res){
						var a = HTUtil.XTRA(res.responseXML,'SExpense',SExpense);
						for(var i=0;i<a.length;i++){
							if(a[i].get('rowAction')=='N'){
								a[i].set('rowAction','M');
							}
						};
						HTUtil.RUA(store,a,SExpense);
						Ext.Msg.alert(SYS,M_S);
						btnSave.setDisabled(false);
					},
					failure: function(res){
						Ext.Msg.alert(SYS,M_F+res.responseText);
						btnSave.setDisabled(false);
					},
					xmlData:HTUtil.HTX(x)
				});
			}
		}
		else Ext.Msg.alert(SYS,M_NC);
	};
	
	//复制
	this.cp=function(){
		var p = sm.getSelected();
		if(p){
			var e = new SExpense({});
			var f = SExpense.prototype.fields;
			for (var i=0;i<f.keys.length;i++){
			var fn=''+f.keys[i];
			e.set(fn,p.get(fn));}
			e.set('expeDate',new Date());
			e.set('id','');
			e.set('version','1');
			e.set('expeInvoiceNo','');
			e.set('expeInvoiceDate','');
			e.set('expeUnitPrice','');
			e.set('expeNum',1);
			e.set('expeTotalAmount','');
			e.set('expeCommission','');
			e.set('expeCommissionRate','');
			e.set('expeRcAmount',0);
			e.set('expeWriteOffDate','');
			e.set('expeInvoiceAmount',0);
			e.set('expeWriteOffAmount',0);
			e.set('expeWriteOffRcAmount',0);
			e.set('expeStatus',0);e.set('expeBillStatus',0);
			e.set('expeInvoiceStatus',0);
			e.set('expeWriteoffStatus',0);
			e.set('expeAllocationFlag',0);
			e.set('expeAllocatedFlag',0);
			e.set('consIdM','');
			e.set('consNoM','');
			e.set('uuid',HTUtil.UUID(32));
			this.stopEditing();
			store.insert(0,e);
			e.set('rowAction','N');
			this.startEditing(0,1);
			this.reCalculate();
		}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	
	var addExpenseByTemplate = function(tempId){
		 var action = 'GET_EXPE_BY_TEMPLATE_M';
		 
		Ext.Ajax.request({scope:this,url:SERVICE_URL+'?_A='+action+'&exteId='+tempId+'&consId='+p.get('id'),method:'POST',
			success: function(res){
				var ra = HTUtil.XTRA(res.responseXML,'SExpense',SExpense);
				if(ra.length==0){
					XMG.alert(SYS,'费用模板没有配置收费项目！');
				}
				else{
					store.add(ra);
				}
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}
		});
	};
	
	//从模版导入数据
	this.getExpenseByTemplate = function(){
		Ext.Ajax.request({scope:this,url:SERVICE_URL+'?_A=EXPE_TEMPLATE_Q&consBizType='+p.get('consBizType'),method:'POST',
			success: function(res){
				var ra = HTUtil.XTRA(res.responseXML,'SExpenseTemplate',SExpenseTemplate);
				if(ra.length==0){
					XMG.alert(SYS,'没有找到费用模板，请先维护费用模板！');
				}
				else if(ra.length==1){
					var tempId = ra[0].get('id');
					addExpenseByTemplate(tempId);
				}
				else{
					var tempStore = new Ext.data.Store({
						reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'SExpenseTemplate'},SExpenseTemplate)
					});	
					tempStore.loadData(res.responseXML,false);			
					
					var frmTemplate = new Ext.form.FormPanel({labelWidth:80,padding:5,
				    	items: [{fieldLabel:C_TEMP_SEL_P,id:'tempId',allowBlank:false,
				    		store:tempStore,xtype:'combo',displayField:'exteName',valueField:'id',
				    		typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}]
				    });
					
					var w=new Ext.Window({title:C_TEMP_SEL_P,modal:true,width:400,
				        Height:300,buttonAlign:'right',items:frmTemplate});
					
					w.addButton({text:C_OK,handler:function(){					
						var tempId = w.findById('tempId').getValue();
						if(tempId){
							addExpenseByTemplate(tempId);
					  	}
					  	w.close();
					}},this);
					w.addButton({text:C_CANCEL,handler:function(){w.close();}},this);w.show();
				}
			},
			failure: function(r){
				XMG.alert(SYS,M_F+r.responseText);
			}
		});
	};
	
	//var locked=p.get('consBizType')!=BT_W?(p.get('consStatusExp')==1||p.get('consStatusAud')!=0):false;
	var locked=p.get('consStatusAud')!=null?p.get('consStatusAud')!=0:false;
	//费用确认单
	this.expConfirm=function(){
		var a = sm.getSelections();
		var expeIds = '';
		if(a.length){
			for(var i=0;i<a.length;i++){
				expeIds += a[i].get('id');
				if(i<a.length-1){
					expeIds += ',';
				}
			}
			EXPC('EXPE_CONFIRM','&aggressive=1&consBizType=W&expeType='+t+'&expeIds='+expeIds+'&consignId='+p.get('id'));
		}
		else{
			EXPC('EXPE_CONFIRM','&aggressive=1&consBizType='+'W'+'&expeType='+t+'&consignId='+p.get('id'));
		}
	};
	
	//费用结算单
	this.expSettlement = function(){
		EXPC('EXPE_SETTLEMENT','&aggressive=1&consBizType='+'W'+'&sort='+t+'&id='+p.get('id'));
	};
	
	//退单申请
	this.expChargeBack=function(){
	    EXPC('EXPE_CHARGEBACK','&aggressive=1&consBizType='+'W'+'&id='+p.get('id'));
	};
	var expMenu = [{text:C_EXPE_CONFIRM,scope:this,handler:this.expConfirm}];
	if(t=='R'){
		expMenu[expMenu.length] = new Ext.menu.Item({text:C_EXPE_SETTLEMENT,scope:this,handler:this.expSettlement});
		expMenu[expMenu.length] = new Ext.menu.Item({text:M_CHARGEBACK,scope:this,handler:this.expChargeBack});
	}
	
	var m=getRM('','W','');
	var x=S_AR;
	if(t=='P') 
		x=S_AP; 
	else if(t=='R')  
		x=S_AR; 
	else 
		x=S_AC;
	if(frm.parent=='SET') 
		m=M1_SET+S_EXPE+x;
	else 
		m=m+M3_EXPE+x; 
		
	var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',scope:this,
			disabled:NR(m+F_M)||locked,handler:this.add});
	var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',scope:this,
			disabled:NR(m+F_R)||locked,handler:this.removeExp});
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',scope:this,
			disabled:NR(m+F_M)||locked,handler:this.save});
	var btnCopy = new Ext.Button({text:C_COPY_FROM,iconCls:'copy',scope:this,
			disabled:NR(m+F_M)||locked,handler:this.cp});
   var btnExport = new Ext.Button({text:C_EXPORT,iconCls:'print',
   		disabled:NR(m+F_E)||locked,scope:this,menu:{items:expMenu}});
  
   var btnAddByTemplate = new Ext.Button({text:'从模板导入费用',iconCls:'copy',scope:this,
		disabled:NR(m+F_M)||locked,handler:this.getExpenseByTemplate});
   
   this.updateToolBar=function(){
		tb=this.getTopToolbar();
		locked=p.get('consStatusAud')!=null?p.get('consStatusAud')!=0:false;
		
		btnAdd.setDisabled(NR(F_M)||locked);
		btnRemove.setDisabled(NR(F_M)||locked);
		btnSave.setDisabled(NR(F_M)||locked);
		btnCopy.setDisabled(NR(F_M)||locked);
		btnAddByTemplate.setDisabled(NR(F_M)||locked);
	};
	
	Fos.WmsExGrid.superclass.constructor.call(this, {title:t=='R'?C_EXPE_R:C_EXPE_P,
		/*split:t=='R',collapsible:t=='R',region:t=='R'?'center':'south',*/
			autoScroll:true,clicksToEdit:1,height:180,
			stripeRows:false,store:store,sm:sm,cm:cm,listeners:{scope:this,
		beforeedit:function(e){
			e.cancel = e.record.get('expeStatus')>0||e.record.get('expeInvoiceStatus')>0||e.record.get('expeWriteOffStatus')>0;},
   		afteredit:function(e){
			var f=e.field;
			var r=e.record;
	    	if(f=='expeNum'){
	    		r.beginEdit();
	    		r.set('expeNum',e.value);
	    		r.set('expeTotalAmount',HTUtil.round2(e.value*r.get('expeUnitPrice')-r.get('expeCommission')));    		
	    		r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
	    		r.endEdit();
	    		this.reCalculate();}
	    	if(f=='unitName'){
	    		r.beginEdit();
	            r.set('expeTotalAmount',HTUtil.round2(r.get('expeNum')*r.get('expeUnitPrice')-r.get('expeCommission')));    		
	    		r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
	    		r.endEdit();
	    		this.reCalculate();}
			else if(f=='expeUnitPrice'){
				r.beginEdit();
				r.set('expeTotalAmount',HTUtil.round2(e.value*r.get('expeNum')-r.get('expeCommission')));			
				r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
				r.endEdit();
				this.reCalculate();}
			else if(f=='currCode'){
				r.beginEdit();
				r.set('expeExRate',HTStore.getExRate(e.value,'CNY'));
				r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
				r.endEdit();
				this.reCalculate();}
			else if(f=='expeCommission'){
				r.beginEdit();
				r.set('expeTotalAmount',HTUtil.round2(r.get('expeUnitPrice')*r.get('expeNum')-e.value));
				r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
				r.endEdit();
				this.reCalculate();}
			else if(f=='expeCommissionRate'){
				r.beginEdit();
				r.set('expeCommission',HTUtil.round2(r.get('expeTotalAmount')*e.value/100));
				r.set('expeTotalAmount',HTUtil.round2(r.get('expeUnitPrice')*r.get('expeNum')-r.get('expeCommission')));
				r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
				r.endEdit();
				this.reCalculate();}
			else if(f=='charName'){
				r.beginEdit();
				var charNameValue=r.get('charName');
				if(charNameValue=='保费'||charNameValue=='BF'){
					r.set('expeNum',1);
					r.set('expeNum2',0);
					if(t=='R'){
						if(p.get('consBizType')=='T'){
							r.set('expeUnitPrice',p.get('premiumExpense'));
						}
					}else if(t=='P'){
						if(p.get('consBizType')=='T'){
							r.set('expeUnitPrice',p.get('premiumExpenseProvider'));
						}
					}
				}else if(charNameValue=='运费'||charNameValue=='YF'){
					r.set('expeNum',0);
					r.set('expeUnitPrice',0);
					if(t=='R'){
						if(p.get('consBizType')=='E'){
							r.set('expeNum2',p.get('exprTotalWeight'));
						}
					}else if(t=='P'){
						if(p.get('consBizType')=='E'){
							r.set('expeNum2',p.get('exprTotalAWeight'));
						}
					}
				}
	            r.set('expeTotalAmount',HTUtil.round2(r.get('expeNum')*r.get('expeUnitPrice')-r.get('expeCommission')));    		
	    		r.set('expeRcAmount',HTUtil.round2(r.get('expeTotalAmount')*r.get('expeExRate')));
	    		r.endEdit();
				this.reCalculate();}
			}
	},
   tbar:[btnAdd, '-',btnRemove,'-',btnSave,'-',btnCopy,'-',btnAddByTemplate,'-',btnExport,
   		'->',
   		
 	      {xtype:'tbtext',text:'费用合计'},txtSumLoc,'-',
 	      {xtype:'tbtext',text:C_SUM_RC},txtSumRc
   	]});
};
Ext.extend(Fos.WmsExGrid, Ext.grid.EditorGridPanel);