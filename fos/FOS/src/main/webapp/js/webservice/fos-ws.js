//web service
WUser = Ext.data.Record.create(['id','wusrId','wusrName','wusrPassword','wusrFirstName','wusrLastName',
        'wusrTitle','wusrDept','wusrMobile','wusrEmail','wusrCompanyName','wusrAddress','wusrCity','wusrProvice',
        'wusrZip','wusrCountry','wusrTel','wusrFax','wusrUrl','wusrStatus','wusrLastLoginTime',
     	{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},
     	{name:'wusrLastLoginTime',type:'date',dateFormat:'Y-m-d H:i:s'},
     	'custId','compCode','version','rowAction']);
WInquiry = Ext.data.Record.create(['id','winqId','winqCargoDesc','winqCargoPackages','winqCargoGw','winqCargoMeasurement',
        'winqReceiptPlace','winqDeliveryPlace','winqPol','winqPolEn','winqPod','winqPodEn',
        'tranId','tranCode','pateId','pateName','winqBizType','winqRemarks',
     	{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},
     	{name:'modiryTime',type:'date',dateFormat:'Y-m-d H:i:s'},
     	'winqStatus','wusrId','wusrName','wusrFirstName','wusrMobile','wusrCompanyName','wusrTel','compCode','version','rowAction']);
WConsign = Ext.data.Record.create(['id','wconId','wconNo',
	'consId','consNo','consShipType','consBizClass','consBizType',
	'consRefNo','consContractNo',{name:'consDate',type:'date',dateFormat:DATEF},
	'custId','custName','consShipper','consConsignee','consNotifyParty','consNotifyParty2',	
	'consPol','consPolEn','consReceiptPlace','consPod','consPodEn',
	'consPot','consPotEn','consDeliveryPlace','consDestination','consTradeCountry','consPrecarriage',
	'vessId','vessName','vessNameCn','voyaId','voyaName',
	'consMblNo','consCargoDesc','consCargoMarks','consTotalPackages',
	{name:'consTotalGrossWeight',type:'float'},		
	{name:'consTotalMeasurement',type:'float'},	
	{name:'cargBigFlag',type:'boolean',convert:function(v){return v==1;}},	
	{name:'cargReeterFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'cargDanagerFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'consTransFlag',type:'boolean',convert:function(v){return v==1;}},
	{name:'consPartialFlag',type:'boolean',convert:function(v){return v==1;}},
	'tranId','tranCode','packId','packName','pateId','pateName','consContainerInfo',
	'consOriginalBlNum','consRemarks','consServiceRequired','consStatus',
	{name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	{name:'modifyTime',type:'date',dateFormat:'Y-m-d H:i:s'},
	'wusrId','compCode','version','rowAction','wusrId','wusrName','wusrFirstName','wusrMobile','wusrCompanyName','wusrTel']);
wuStatusRender = function(v){return v==1?C_WS_USER_ACCEPTED:C_WS_USER_NOT_ACCEPTED;};
var S_BC=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['E','出口'],['I','进口']]});
var S_ST=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['FCL','整箱'],['LCL','拼箱'],['BULK','散货']]});
var S_BT=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[['C','海运'],['A','空运']]});
var getWS_BC=function(v){if(v) return S_BC.getById(v).get('NAME'); else return '';};
var getWS_BT=function(v){if(v) return S_BT.getById(v).get('NAME'); else return '';};
var getWS_ST=function(v){if(v) return S_ST.getById(v).get('NAME'); else return '';};

InquiryWin = function(p) {
	var frm = new Ext.form.FormPanel({labelWidth:80,bodyStyle:'padding:5px',items:[    	
    	{fieldLabel:C_POL,name:'winqPolEn',value:p.get('winqPolEn'),xtype:'textfield',readOnly:true,anchor:'95%'},
        {fieldLabel:'出发地',name:'winqReceiptPlace',value:p.get('winqReceiptPlace'),xtype:'textfield',readOnly:true,anchor:'95%'},
        {fieldLabel:C_POD,name:'winqPodEn',value:p.get('winqPodEn'),xtype:'textfield',readOnly:true,anchor:'95%'},
    	{fieldLabel:'目的地',name:'winqDeliveryPlace',value:p.get('winqDeliveryPlace'),xtype:'textfield',readOnly:true,anchor:'95%'},    		
    	{fieldLabel:'运输条款',name:'tranCode',value:p.get('tranCode'),xtype:'textfield',readOnly:true,anchor:'95%'},    	
    	{fieldLabel:'货物描述',name:'winqCargoDesc',value:p.get('winqCargoDesc'),xtype:'textarea',height:100,readOnly:true,anchor:'95%'},
    	{fieldLabel:'货物毛重',name:'winqCargoGw',value:p.get('winqCargoGw'),xtype:'textfield',readOnly:true,anchor:'95%'},
    	{fieldLabel:'货物体积',name:'winqCargoMeasurement',value:p.get('winqCargoMeasurement'),xtype:'textfield',readOnly:true,anchor:'95%'},
    	{fieldLabel:'备注',name:'winqRemarks',value:p.get('tranId'),xtype:'textarea',readOnly:true,height:100,anchor:'95%'}
    	]});    	
	this.save = function(){				
		var rj=RTJ(p,WInquiry);
		var data=FOSJ({'WInquiry':rj});
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{A:'WS_WINQ_S',mt:'JSON'},
			success: function(r){
				var res=Ext.util.JSON.decode(r.responseText);
				var inq=res.WInquiry[0];
				p.set('version',inq.version);
				p.set('winqId',inq.prshId);
				alert('操作成功！');
			},
			failure: function(r){
				var res=Ext.util.JSON.decode(r.responseText);alert(res.FosResponse.msg);},
		jsonData:data});
	};	
    InquiryWin.superclass.constructor.call(this, {title:'网上询价',modal:true,width:500,
        height:470,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm,
        buttons:[{text:"保存",scope:this,handler:this.save},{text:"取消",scope:this,handler:this.close}]
        }); 
};
Ext.extend(InquiryWin,Ext.Window);

Fos.WinqGrid = function() {	
    var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WINQ_X',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WInquiry'}, WInquiry),remoteSort:true,
    	sortInfo:{field:'winqId', direction:'DESC'}});
    store.load({params:{start:0,limit:20,mt:'JSON'}});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm = new Ext.grid.ColumnModel([
    	new Ext.grid.RowNumberer(),sm,
		{header:'询价时间',dataIndex:'createTime',width:80,renderer:formatDateTime},
		{header:C_WS_USR_NAME,dataIndex:'wusrName',width:80},
		{header:C_WS_FIRST_NAME,dataIndex:'wusrFirstName',width:80},
		{header:C_WS_COMPANY,dataIndex:'wusrCompanyName',width:100},
		{header:C_WS_TEL,dataIndex:'wusrTel',width: 80},
		{header:'状态',dataIndex:'winqStatus',width:100},
		{header:'装货港',dataIndex:'winqPolEn',width: 80},
		{header:'卸货港',dataIndex:'winqPodEn',width:100},
		{header:'交货地',dataIndex:'winqDeliveryPlace',width:80},
		{header:'收货地',dataIndex:'winqReceiptPlace',width:100},
		{header:'运输条款',dataIndex:'tranCode',width:100},
		{header:'运费条款',dataIndex:'pateName',width:100},
		{header:'业务类型',dataIndex:'winqBizType',width:100},
		{header:'货物毛重',dataIndex:'winqCargoGw',width:100},
		{header:'货物体积',dataIndex:'winqCargoMeasurement',width:100}]);
	cm.defaultSortable=true;
	var re={rowdblclick:function(g,r,e){this.edit();}};
    this.edit = function(){
    	var p = sm.getSelected();
    	if(p){var win = new InquiryWin(p);win.show();}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };	
    Fos.WinqGrid.superclass.constructor.call(this, {
    id:'G_WINQ',store: store,iconCls:'grid',width:600,height:300,title:'询价列表',header:false,closable:true,
    sm:sm,cm:cm,listeners:re,loadMask:true,
	bbar:new Ext.PagingToolbar({pageSize:20,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:'没有记录'}),
	tbar:[
		{text:C_REPLY+'(M)',iconCls:'option',handler:this.edit},'->',
		new Ext.PagingToolbar({pageSize:20,store:store})]
    }); 
};
Ext.extend(Fos.WinqGrid,Ext.grid.GridPanel);
WconWin = function(p,store) {
	var frm = new Ext.form.FormPanel({labelWidth:60,bodyStyle:'padding:5px',layout:'column',border:false,items:[
		{columnWidth:.6,layout:'form',border:false,defaultType:'textfield',items: [
			{fieldLabel:C_SHIPPER,name:'consShipper',value:p.get('consShipper'),xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:C_CONSIGNEE,name:'consConsignee',value:p.get('consConsignee'),xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:C_NOTIFIER,name:'consNotifyParty',value:p.get('consNotifyParty'),xtype:'textarea',height:100,anchor:'95%'},
			{fieldLabel:C_MARKS,name:'consCargoMarks',value:p.get('consCargoMarks'),xtype:'textarea',height:100,anchor:'95%'},		
			{fieldLabel:C_CARGO_DESC,name:'consCargoDesc',value:p.get('consCargoDesc'),xtype:'textarea',height:100,anchor:'95%'}
		]},            
		{columnWidth:.4,layout:'form',border:false,items:[            
			{fieldLabel:C_BC,name:'consBizClass',value:p.get('consBizClass'),xtype:'textfield',anchor:'95%'},
			{fieldLabel:C_BT,name:'consBizType',value:p.get('consBizType'),xtype:'textfield',anchor:'95%'},
			{fieldLabel:C_ST,name:'consShipType',value:p.get('consShipType'),xtype:'textfield',anchor:'95%'},
			{fieldLabel:C_POL,name:'consPolEn',value:p.get('consPolEn'),xtype:'textfield',anchor:'95%'},
			{fieldLabel:C_POD,name:'consPodEn',value:p.get('consPodEn'),xtype:'textfield',anchor:'95%'},
			{fieldLabel:'出发地',name:'consReceiptPlace',value:p.get('consReceiptPlace'),xtype:'textfield',anchor:'95%'},
			{fieldLabel:'目的地',name:'consDeliveryPlace',value:p.get('consDeliveryPlace'),xtype:'textfield',anchor:'95%'}, 
			{fieldLabel:'运输条款',tabIndex:17,name:'tranCode',value:p.get('tranCode'),xtype:'textfield',anchor:'95%'},			
			{fieldLabel:'运费条款',tabIndex:17,name:'pateName',value:p.get('pateName'),xtype:'textfield',anchor:'95%'},    	
			{fieldLabel:C_PACKAGES,name:'consTotalPackages',value:p.get('consTotalPackages'),xtype:'numberfield',anchor:'95%'},
			{fieldLabel:'包装种类',name:'packId',value:p.get('packId'),xtype:'combo',anchor:'95%'},
			{fieldLabel:'货物毛重',name:'consTotalGrossWeight',value:p.get('consTotalGrossWeight'),xtype:'numberfield',anchor:'95%'},
			{fieldLabel:'货物体积',name:'consTotalMeasurement',value:p.get('ConsTotalMeasurement'),xtype:'textfield',anchor:'95%'},
			{fieldLabel:'备注',name:'consRemarks',value:p.get('consRemarks'),xtype:'textarea',anchor:'95%'},
			{fieldLabel:'箱量',name:'consContainerInfo',value:p.get('consContainerInfo'),xtype:'textarea',anchor:'95%'},
			{xtype: 'checkboxgroup',fieldLabel: '延伸服务',itemCls: 'x-check-group-alt',columns: 4,items: [
        		{boxLabel: '拖车', id: 'SR_TRAN',checked:p.get('consServiceRequired').indexOf(SR_TRAN)!=-1},
        		{boxLabel: '仓储', id: 'SR_WARE', checked:p.get('consServiceRequired').indexOf(SR_WARE)!=-1},
        		{boxLabel: '报关', id: 'SR_CUDE',checked:p.get('consServiceRequired').indexOf(SR_CUDE)!=-1},
        		{boxLabel: '报检', id: 'SR_INSP',checked:p.get('consServiceRequired').indexOf(SR_INSP)!=-1}
    			]}
		]}
      ]
     });
    this.accept=function(){		
    	W2F(p);
    	this.close();
    };
    WconWin.superclass.constructor.call(this, {title:'网上订舱-'+p.get('wconNo'),modal:true,width:800,
        height:600,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm,
        buttons:[{text:"转为正式委托",disabled:p.get('consStatus')==1,scope:this,handler:this.accept},{text:"关闭",scope:this,handler:this.close}]
        }); 
};
Ext.extend(WconWin,Ext.Window);
var W2F=function(r){	
   	if(!r.get('custId')){alert('该订单用户不是正式客户，请先将该用户转为正式客户。');return;}
   	else{							
		var bt=r.get('consBizType');
		var st=r.get('consShipType');
		if(st=='BULK') bt='B';
		var sc = new Ext.data.Store({url: SERVICE_URL+'?A='+'CUST_Q',
			reader: new Ext.data.XmlReader({record:'CCustomer'}, CCustomer)});
		sc.load({params:{custId:r.get('custId')},callback:function(rec,o,s){
			if(s&&rec.length>0){
				var cust=rec[0];
				custName=cust.get('custNameCn');
				custSname=cust.get('custSname');
				custContact=cust.get('custContact');
				custTel=cust.get('custTel');
				custFax=cust.get('custFax');
				var c = new FConsign({consId:rid,custId:r.get('custId'),custName:custName,wconId:r.get('wconId'),
				custSname:custSname,custContact:custContact,custTel:custTel,custFax:custFax,
				consPol:r.get('consPol'),consPolEn:r.get('consPolEn'),consPod:r.get('consPod'),consPodEn:r.get('consPodEn'),
				consPot:r.get('consPot'),consPotEn:r.get('consPotEn'),
				consDeliveryPlace:r.get('consDeliveryPlace'),
				consReceiptPlace:r.get('consReceiptPlace'),consDestination:r.get('consDestination'),consTradeCountry:r.get('consTradeCountry'),
				vessId:r.get('vessId'),vessName:r.get('vessName'),vessNameCn:r.get('vessNameCn'),
				voyaId:r.get('voyaId'),voyaName:r.get('voyaName'),consMblNo:r.get('consMblNo'),
				consMblNo:r.get('consMblNo'),consCargoDesc:r.get('consCargoDesc'),
				consCargoMarks:r.get('consCargoMarks'),consTotalPackages:r.get('consTotalPackages'),
				consTotalGrossWeight:r.get('consTotalGrossWeight'),consTotalMeasurement:r.get('consTotalMeasurement'),
				cargBigFlag:r.get('cargBigFlag'),cargReeterFlag:r.get('cargReeterFlag'),cargDanagerFlag:r.get('cargDanagerFlag'),
				consTransFlag:r.get('consTransFlag'),consPartialFlag:r.get('consPartialFlag'),
				consContainerInfo:r.get('consContainerInfo'),consOriginalBlNum:r.get('consOriginalBlNum'),
				consRemarks:r.get('consRemarks'),consServiceRequired:r.get('consServiceRequired'),
				consShipper:r.get('consShipper'),consConsignee:r.get('consConsignee'),consNotifyParty:r.get('consNotifyParty'),consNotifyParty2:r.get('consNotifyParty2'),
				consNo:'N'+rid,consType:'A',consShipType:r.get('consShipType'),consActionType:'A',consMasterFlag:r.get('consShipType')=='LCL'?1:0,
				consBizClass:r.get('consBizClass'),consBizType:r.get('consBizType'),consSource:0,consOperatorId:'',
				consDate:new Date(),tranId:r.get('tranId'),tranCode:r.get('tranCode'),pateId:r.get('pateId'),pateName:r.get('pateName'),					
				version:0,consStatus:0,consStatusBooking:0,consStatusClearance:0,
				consStatusSwitchBl:0,consStatusSplit:0,consStatusInsp:0,consStatusCont:0,
				consStatusCarg:0,consStatusMbl:0,consStatusHbl:0,consStatusBBook:0,
				consStatusDepa:0,consStatusDocs:0,consStatusExp:0,consStatusAr:0,consStatusAp:0,
				consStatusInvoR:0,consStatusInvoP:0,consStatusAud:0,consStatusReassign:0,
				consStatusInCy:0,consStatusInCfs:0,consStatusOnBoard:0,consStatusEir:0,
				consStatusSendCont:0,consStatusLock:0,consReassignFrom:0,consStatusSettlement:0,consExternalFlag:0,
				grouId:HTStore.getCFG('DEFAULT_DEPT_'+bt),consOperatorId:CUSER_ID,consOperatorName:CUSER_NAME,
				consFumigateFlag:0,consQuarantineFlag:0,consTransferringFlag:0,rowAction:'N'});
				showConsign(c);
			}    						
		},scope:this});				
	}
};
Fos.WconGrid = function() {	
    var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WCON_X',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WConsign'}, WConsign),remoteSort:true,
    	sortInfo:{field:'wconId', direction:'DESC'}});
    store.load({params:{start:0,limit:20,mt:'JSON'}});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var getWCON_ST=function(v){if(v==1) return C_WS_WCON_ACCEPTED; else return C_WS_WCON_NOT_ACCEPTED;};
	var cm = new Ext.grid.ColumnModel([
    	new Ext.grid.RowNumberer(),sm,
		{header:C_WS_USR_NAME,dataIndex:'wusrName',width:80},
		{header:C_WS_FIRST_NAME,dataIndex:'wusrFirstName',width:80},
		{header:C_WS_COMPANY,dataIndex:'wusrCompanyName',width:100},
		{header:C_WS_TEL,dataIndex:'wusrTel',width: 80},
		{header:'订单号',dataIndex:'wconNo',width:80},
		{header:'委托日期',dataIndex:'consDate',width:80,renderer:formatDateTime},
		{header:'状态',dataIndex:'consStatus',width:100,renderer:getWCON_ST},
		{header:'受理业务号',dataIndex:'consNo',width:80},
		{header:'装货港',dataIndex:'consPolEn',width: 80},
		{header:'卸货港',dataIndex:'consPodEn',width:100},
		{header:'交货地',dataIndex:'consDeliveryPlace',width:80},
		{header:'收货地',dataIndex:'consReceiptPlace',width:100},
		{header:'运输条款',dataIndex:'tranCode',width:100},
		{header:'运费条款',dataIndex:'pateName',width:100},
		{header:C_BT,dataIndex:'consBizType',width:100,renderer:getWS_BT},
		{header:C_BC,dataIndex:'consBizClass',width:100,renderer:getWS_BC},
		{header:C_ST,dataIndex:'consShipType',width:100,renderer:getWS_ST},
		{header:'货物毛重',dataIndex:'consTotalGrossWeight',width:100},
		{header:'货物体积',dataIndex:'consTotalMeasurement',width:100}]);
	cm.defaultSortable=true;
	var re={rowdblclick:function(g,r,e){this.edit();}};
    this.edit = function(){
    	var p = sm.getSelected();
    	if(p){var win = new WconWin(p);win.show();}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };    
	this.accept=function(){		
    	var r=sm.getSelected();
    	if(r){W2F(r);}
    };
    Fos.WconGrid.superclass.constructor.call(this, {
    id:'G_WCON',store: store,iconCls:'grid',width:600,height:300,title:C_WS_CONS_LIST,header:false,closable:true,
    sm:sm,cm:cm,listeners:re,loadMask:true,
	bbar:new Ext.PagingToolbar({pageSize:20,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:'没有记录'}),
	tbar:[
		{text:C_EDIT+'(M)',iconCls:'option',handler:this.edit}, '-',
		{text:C_WS_WCON_ACCEPT+'(R)',iconCls:'remove',handler:this.accept},'->',
		new Ext.PagingToolbar({pageSize:20,store:store})]
    }); 
};
Ext.extend(Fos.WconGrid,Ext.grid.GridPanel);
Fos.WusrGrid = function(){
    var store = new Ext.data.Store({
   		url: SERVICE_URL+'?A=WUSR_Q',
    	reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WUser'}, WUser),remoteSort:true,
    	sortInfo:{field:'wusrId', direction:'DESC'}});
    store.load({params:{start:0,limit:20,mt:'JSON'}});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm = new Ext.grid.ColumnModel([
    	new Ext.grid.RowNumberer(),sm,
		{header:C_WS_USR_NAME,dataIndex:'wusrName',width:80},
		{header:C_WS_FIRST_NAME,dataIndex:'wusrFirstName',width:80},
		{header:C_WS_TITLE,dataIndex:'wusrTitle',width:80},		
		{header:C_WS_COMPANY,dataIndex:'wusrCompanyName',width:100},
		{header:C_WS_TEL,dataIndex:'wusrTel',width: 80},
		{header:C_WS_FAX,dataIndex:'wusrFax',width:100},
		{header:C_WS_DEPT,dataIndex:'wusrDept',width:80},
		{header:C_WS_MOBILE,dataIndex:'wusrMobile',width:100},
		{header:C_WS_CITY,dataIndex:'wusrCity',width:100},
		{header:C_WS_REG_TIME,dataIndex:'createTime',width:100,renderer:formatDateTime},
		{header:C_WS_REG_TIME,dataIndex:'wusrStatus',width:100,renderer:wuStatusRender}]);
	cm.defaultSortable=true;	
	this.accept=function(){		
    	var u=sm.getSelected();
    	if(u){
	    	if(u.get('wusrStatus')==1){alert('该用户已经是正式客户！不可以再转。');return;}
	    	else{
		    	var p = new CCustomer({custId:'0',custCode:'',custClass:'',custNameCn:u.get('wusrCompanyName'),custSnameCn:'',custNameEn:'',custSnameEn:'',
				custArFlag:1,custApFlag:1,custIndustry:'',cucaId:'',custType:'',counCode:'CN',custProvince:u.get('wusrProvince'),custCity:u.get('wusrCity'),
				custAddress:u.get('wusrAddress'),custZip:u.get('wusrZip'),custContact:u.get('wusrFirstName'),
				custTel:u.get('wusrTel'),custFax:u.get('wusrFax'),custEmail:u.get('wusrEmail'),custUrl:u.get('wusrUrl'),custBankCny:'',
				custAccountCny:'',custBankUsd:'',custAccountUsd:'',custInvoiceHeader:'',custActive:'1',
				custShipTo:'',custChargeTo:'',custCreditDay:'',
				custCreditDay:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_DAYS'),
				custCreditAmount:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_AMOUNT'),custRemarks:'',version:'0',rowAction:'N'});	       	
		       	var win = new Fos.CustomerWin(p,'',u);
				win.show();
			}
		}
    };
    Fos.WusrGrid.superclass.constructor.call(this, {
    id:'G_WUSR',store:store,iconCls:'grid',width:600,height:300,title:'注册用户列表',header:false,closable:true,
    sm:sm,cm:cm,loadMask:true,
	bbar:new Ext.PagingToolbar({pageSize:20,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:'没有记录'}),
	tbar:[
		{text:C_WS_USER_ACCEPT,iconCls:'renew',handler:this.accept},'->',
		new Ext.PagingToolbar({pageSize:20,store:store})]
    }); 
};
Ext.extend(Fos.WusrGrid,Ext.grid.GridPanel);

