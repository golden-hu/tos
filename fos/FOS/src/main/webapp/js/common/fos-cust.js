//
var showCustomerCategory = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'CUCA_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCustomerCategory',id:'id'},CCustomerCategory),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load();
    var sm=getCSM();
    var grid = new  Ext.grid.EditorGridPanel({id:'G_CUCA',title:C_CUCA,
	header:false,clicksToEdit:1,closable:true,store: store,sm:sm,
    cm:new Ext.grid.ColumnModel([sm,{header:"ID",hidden:true,dataIndex:'cucaId',width:50},
	{header:C_NAME,dataIndex:'cucaName',width:100,sortable:false,editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})}]),	
	tbar:[{text:C_ADD,disabled:NR(M1_CRM),iconCls:'add',handler : function(){	
			var p = new CCustomerCategory({cucaName:'',
				version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
			grid.stopEditing();
			store.insert(0,p);
			grid.startEditing(0, 2);
		}},'-',
		{text:C_REMOVE,disabled:NR(M1_CRM),iconCls:'remove',
			handler:function(){HTUtil.REMOVE_SM(sm,store);}}, '-', 
        {text:C_SAVE,disabled:NR(M1_CRM),iconCls:'save',handler:function(){HTUtil.POST(store,'CCustomerCategory',CCustomerCategory,'CUCA_S');}
        }]
    });
     
    return grid;
};


Fos.CustMergeWin = function() {
	this.custId='';
	var frm = new Ext.form.FormPanel({labelWidth: 60,bodyStyle:'padding:5px',
    	items: [{fieldLabel:M_CUST_MERGE_TO,name:'custName',value:'',store:HTStore.getCS(),enableKeyEvents:true,
       		xtype:'combo',displayField:'custCode',valueField:'custNameCn',typeAhead:true,
       		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,anchor:'95%',
             	listeners:{scope:this,
             	select:function(c,r,i){
				this.find('name','custSname')[0].setValue(r.get('custSnameCn'));				
				this.custId=r.get('custId');
			},
			keydown:{fn:function(f,e){LC(f,e,'');},buffer:BF}}},
			{fieldLabel:C_CSNAME,name:'custSname',disabled:true,xtype:'textfield',anchor:'95%'}
			]
    });
    Fos.CustMergeWin.superclass.constructor.call(this, {title:M_SEL_MERGE_TO,modal:true,width:400,
        height:130,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm}); 
};
Ext.extend(Fos.CustMergeWin,Ext.Window);

Fos.CustSelWin = function() {
	this.custId='';
	this.custSname='';
	var frm = new Ext.form.FormPanel({labelWidth: 60,bodyStyle:'padding:5px',
    	items: [{fieldLabel:M_SEL_CUST,name:'custName',value:'',store:HTStore.getCS(),enableKeyEvents:true,
       		xtype:'combo',displayField:'custCode',valueField:'custNameCn',typeAhead:true,
       		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,anchor:'95%',
             	listeners:{scope:this,
             	select:function(c,r,i){
				this.custSname=r.get('custSnameCn');				
				this.custId=r.get('custId');
			},
			keydown:{fn:function(f,e){LC(f,e,'');},buffer:BF}}}
			]
    });
    Fos.CustSelWin.superclass.constructor.call(this, {title:SYS,modal:true,width:400,
        height:130,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frm}); 
};
Ext.extend(Fos.CustSelWin,Ext.Window);



Fos.CustomerLW = function(store) {
	var t1={id:'TCL_1',title:C_LOOK_BY_CUST_CODE,layout:'form',items:[
		{fieldLabel:C_CUST_CODE,name:'custCode',xtype:'textfield',anchor:'95%'},
    	{boxLabel:C_LOOK_SMART,name:'custCodeM',xtype:'checkbox',labelSeparator:'',anchor:'50%'}
		]};
	var t2={id:'TCL_2',title:C_LOOK_BY_CNAME,layout:'form',items:[
		{fieldLabel:C_CNAME,name:'custNameCn',xtype:'textfield',anchor:'95%'},
		{boxLabel:C_LOOK_SMART,name:'custNameCnM',xtype:'checkbox',labelSeparator:'',anchor:'50%'}
		]};
	var t3={id:'TCL_3',title:C_LOOK_BY_ENAME,layout:'form',items:[
		{fieldLabel:C_ENAME,name:'custNameEn',xtype:'textfield',anchor:'95%'},
		{boxLabel:C_LOOK_SMART,name:'custNameEnM',xtype:'checkbox',labelSeparator:'',anchor:'50%'}]};
	var t4={id:'TCL_4',title:C_LOOK_COMPLEX,layout:'column',items:[
    	{columnWidth:.33,layout:'form',labelWidth:70,border:false,items:[	             	
	    	{fieldLabel:C_CSNAME,tabIndex:1,name:'custSNameCn',xtype:'textfield',anchor:'95%'},
        	{fieldLabel:C_INDUSTRY,name:'custIndustry',xtype:'combo',store:HTStore.INDU_S,
	    		displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',
	    		triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
        	{fieldLabel:C_CONTACT,name:'custContact',xtype:'textfield',anchor:'95%'}]},
	    {columnWidth:.33,layout:'form',labelWidth:70,border:false,items:[
	    	{fieldLabel:C_ESNAME,tabIndex:2,name:'custSNameEn',xtype:'textfield',anchor:'95%'},
	    	{fieldLabel:C_CPTY,name:'custType',xtype:'combo',store:HTStore.COPR_S,
	    		displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',
	    		triggerAction: 'all',selectOnFocus:true,anchor:'95%'}
	     	]},
		{columnWidth:.34,layout:'form',labelWidth:70,border:false,items:[
			{fieldLabel:C_CUCA,tabIndex:3,name: 'cucaId',xtype:'combo',store:HTStore.getCUCA_S(),
				displayField:'cucaName',valueField:'cucaId',typeAhead: true,mode: 'local',
				triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	     	{fieldLabel:C_COUN,name:'counCode',xtype:'combo',store:HTStore.getCOUN_S(),
				displayField:'counNameCn',valueField:'counCode',typeAhead: true,
				mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'}
	    ]}]};
	var t5={id:'TCL_5',title:C_LOOK_BY_SERVICE,layout:'column',items:[
		{columnWidth:.33,layout:'form',border:false,items:[	
		{boxLabel:C_BOOKER,xtype: 'checkbox',name:'custBookerFlag',hideLabel:true},
		{boxLabel:C_CARRIER,xtype: 'checkbox',name:'custCarrierFlag',hideLabel:true},
		{boxLabel:C_BOOK_AGENCY,xtype: 'checkbox',name:'custBookingAgencyFlag',hideLabel:true},
		{boxLabel:C_OVERSEA_AGENCY,xtype: 'checkbox',name:'custOverseaAgencyFlag',hideLabel:true},
		{boxLabel:C_CFS,xtype: 'checkbox',name:'custCfsFlag',hideLabel:true}]},
		{columnWidth:.33,layout:'form',border:false,items:[	
		{boxLabel:C_SHIPPER,xtype: 'checkbox',name:'custShipperFlag',hideLabel:true},
		{boxLabel:C_TRACKER,xtype: 'checkbox',name:'custTrackFlag',hideLabel:true},
		{boxLabel:C_CUSTOM_AGENCY,xtype: 'checkbox',name:'custCustomFlag',hideLabel:true},
		{boxLabel:C_INSP_AGENCY,xtype: 'checkbox',name:'custInspectionFlag',hideLabel:true},
		{boxLabel:C_FLIGHTER,xtype: 'checkbox',name:'custAirFlag',hideLabel:true},
		{boxLabel:C_DO_AGENCY,xtype: 'checkbox',name:'custDoAgencyFlag',hideLabel:true}]},
		{columnWidth:.33,layout:'form',border:false,items:[
		{boxLabel:C_CONSIGNEE,xtype: 'checkbox',name:'custConsigneeFlag',hideLabel:true},
		{boxLabel:C_WAREHOUSE,xtype: 'checkbox',name:'custWarehouseFlag',hideLabel:true},
		{boxLabel:C_CONTAINER,xtype: 'checkbox',name:'custContainerFlag',hideLabel:true},
		{boxLabel:C_EXPRESS,xtype: 'checkbox',name:'custExpressFlag',hideLabel:true},		
		{boxLabel:C_INSURANCE,xtype: 'checkbox',name:'custInsuranceFlag',hideLabel:true}]}
		]};

    var tab = new Ext.TabPanel({xtype:'tabpanel',plain:true,activeTab:0,height:200,defaults:{bodyStyle:'padding:10px'},
            items:[t1, t2,t3,t5,t4]});		
    this.reload=function(){
     	var at = tab.getActiveTab();
     	var a=[];var op=1;
     	if(at.getId()=='TCL_1'){
     		var consNo=at.find('name','custCode')[0].getValue();
     		var consNoM=at.find('name','custCodeM')[0].getValue();
     		if(consNoM) op=7;
     		a[a.length]={key:'custCode',value:consNo,op:op};
     	}     	
     	else if(at.getId()=='TCL_2'){
     		var consMblNo=at.find('name','custNameCn')[0].getValue();
     		var consMblNoM=at.find('name','custNameCnM')[0].getValue();
     		if(consMblNoM) op=7;
     		a[a.length]={key:'custNameCn',value:consMblNo,op:op};
     	}
     	else if(at.getId()=='TCL_3'){
     		var consHblNo=at.find('name','custNameEn')[0].getValue();
     		var consHblNoM=at.find('name','custNameEnM')[0].getValue();
     		if(consHblNoM) op=7;
     		a[a.length]={key:'custNameEn',value:consHblNo,op:op};
     	}
     	else if(at.getId()=='TCL_4'){
     		var custSNameCn=at.find('name','custSNameCn')[0].getValue();
     		var custIndustry=at.find('name','custIndustry')[0].getValue();
     		var custContact=at.find('name','custContact')[0].getValue();
     		var custSNameEn=at.find('name','custSNameEn')[0].getValue();
     		var custType=at.find('name','custType')[0].getValue();
     		var cucaId=at.find('name','cucaId')[0].getValue();
     		var counCode=at.find('name','counCode')[0].getValue();
     		
     		if(custSNameCn) a[a.length]={key:'custSNameCn',value:custSNameCn,op:op};
     		if(custIndustry) a[a.length]={key:'custIndustry',value:custIndustry,op:op};
     		if(custContact) a[a.length]={key:'custContact',value:custContact,op:op};
     		if(custSNameEn) a[a.length]={key:'custSNameEn',value:custSNameEn,op:op};
     		if(custType) a[a.length]={key:'custType',value:custType,op:op};
     		if(cucaId) a[a.length]={key:'cucaId',value:cucaId,op:op};
     		if(counCode) a[a.length]={key:'counCode',value:counCode,op:op};
     	}
     	else if(at.getId()=='TCL_5'){
     		var custCarrierFlag=at.find('name','custCarrierFlag')[0].getValue();
     		var custBookingAgencyFlag=at.find('name','custBookingAgencyFlag')[0].getValue();
     		var custCfsFlag=at.find('name','custCfsFlag')[0].getValue();
     		var custTrackFlag=at.find('name','custTrackFlag')[0].getValue();
     		var custCustomFlag=at.find('name','custCustomFlag')[0].getValue();
     		var custInspectionFlag=at.find('name','custInspectionFlag')[0].getValue();
     		var custWarehouseFlag=at.find('name','custWarehouseFlag')[0].getValue();
     		var custContainerFlag=at.find('name','custContainerFlag')[0].getValue();
     		var custOverseaAgencyFlag=at.find('name','custOverseaAgencyFlag')[0].getValue();
     		var custDoAgencyFlag=at.find('name','custDoAgencyFlag')[0].getValue();
     		var custInsuranceFlag=at.find('name','custInsuranceFlag')[0].getValue();
     		var custBookerFlag=at.find('name','custBookerFlag')[0].getValue();
     		var custShipperFlag=at.find('name','custShipperFlag')[0].getValue();
     		var custNotifyFlag=at.find('name','custNotifyFlag')[0].getValue();
     		var custConsigneeFlag=at.find('name','custConsigneeFlag')[0].getValue();
     		var custAirFlag=at.find('name','custAirFlag')[0].getValue();
     		var custExpressFlag=at.find('name','custExpressFlag')[0].getValue();
     		
     		if(custCarrierFlag) a[a.length]={key:'custCarrierFlag',value:1,op:op};
     		if(custBookingAgencyFlag) a[a.length]={key:'custBookingAgencyFlag',value:1,op:op};
     		if(custCfsFlag) a[a.length]={key:'custCfsFlag',value:1,op:op};
     		if(custTrackFlag) a[a.length]={key:'custTrackFlag',value:1,op:op};
     		if(custCustomFlag) a[a.length]={key:'custCustomFlag',value:1,op:op};
     		if(custInspectionFlag) a[a.length]={key:'custInspectionFlag',value:1,op:op};
     		if(custWarehouseFlag) a[a.length]={key:'custWarehouseFlag',value:1,op:op};
     		if(custContainerFlag) a[a.length]={key:'custContainerFlag',value:1,op:op};
     		if(custOverseaAgencyFlag) a[a.length]={key:'custOverseaAgencyFlag',value:1,op:op};
     		if(custDoAgencyFlag) a[a.length]={key:'custDoAgencyFlag',value:1,op:op};
     		if(custInsuranceFlag) a[a.length]={key:'custInsuranceFlag',value:1,op:op};     		
     		if(custBookerFlag) a[a.length]={key:'custBookerFlag',value:1,op:op};
     		if(custShipperFlag) a[a.length]={key:'custShipperFlag',value:1,op:op};
     		if(custNotifyFlag) a[a.length]={key:'custNotifyFlag',value:1,op:op};
     		if(custConsigneeFlag) a[a.length]={key:'custConsigneeFlag',value:1,op:op};
     		if(custAirFlag) a[a.length]={key:'custAirFlag',value:1,op:op};
     		if(custExpressFlag) a[a.length]={key:'custExpressFlag',value:1,op:op};
     	}
     	store.baseParams=a.length>0?{_A:'CUST_X',_mt:'json',xml:HTUtil.QATJ(a)}:{_A:'CUST_X',_mt:'json'};
     	store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});this.close();
	};	
    Fos.CustomerLW.superclass.constructor.call(this, {title:C_LOOK_CUST,iconCls:'search',modal:true,width:600,
        buttonAlign:'right',items:tab,
        buttons:[{text:C_OK,scope:this,handler:this.reload},{text:C_CANCEL,scope:this,handler:this.close}],
        keys:[{key:[10,13],fn:this.reload}]
        });
};
Ext.extend(Fos.CustomerLW, Ext.Window);

Fos.PrshLookupWin = function(store) {    
	var frmLookup = new Ext.form.FormPanel({labelWidth:70,labelAlign:"right",
    	items:[{id:'T_PRSH_LOOK',layout:'column',items:[
       			{columnWidth:.33,layout:'form',border:false,
             	items:[
             	{fieldLabel:C_CARRIER,tabIndex:1,name:'prshCarrier',store:HTStore.getCS(),enableKeyEvents:true,
             		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,xtype:'combo',
             		displayField:'custCode',valueField:'custId',typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
             		listeners:{scope:this,
						keydown:function(f,e){LC(f,e,'custCarrierFlag');}}},             	
             	{fieldLabel:C_CONTRACT_NO,tabIndex:4,name:'prshContractNo',xtype:'textfield',anchor:'95%'},
             	{fieldLabel:C_VESS,tabIndex:7,name:'vessId',store:HTStore.getVES(),enableKeyEvents:true,
             		xtype:'combo',displayField:'vessNameEn',valueField:'vessId',
             		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
              			listeners:{scope:this,select:function(c,r,i){
              				this.find('name','voyaId')[0].store.reload({params:{vessId:r.get('vessId')}});},
              				keydown:function(f,e){LV(f,e);}}},
             	{fieldLabel:C_POD,tabIndex:10,name:'prliPod',xtype:'combo',displayField:'portNameEn',valueField:'portId',anchor:'95%',
            		mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
            		store:HTStore.getPS(),tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
            			listeners:{scope:this,
            			keydown:{fn:LP,buffer:BF}
            		}},            	
              	{fieldLabel:C_POT,tabIndex:13,name:'prliPotEn',xtype:'textfield',anchor:'95%'},             	
              	{fieldLabel:C_CACL,tabIndex:16,name:'caclId',store:getCACL_S(),xtype:'combo',displayField:'caclNameCn',valueField:'caclId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
             	{fieldLabel:C_SHIP_DATE,tabIndex:19,name:'prliShipDate',xtype:'textfield',anchor:'95%'}
             	]},
             	{columnWidth:.33,layout:'form',border:false,
             	items:[
             	{fieldLabel:C_BOOK_AGENCY,tabIndex:2,name:'prshVendorId',store:HTStore.getCS(),enableKeyEvents:true,
             		xtype:'combo',displayField:'custNameCn',valueField:'custId',typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
             		listeners:{scope:this,keydown:function(f,e){LC(f,e,'custBookingAgencyFlag');}}},
             	{fieldLabel:C_SHLI,tabIndex:5,name:'shliId',store:getSHLI_S(),xtype:'combo',displayField:'shliName',valueField:'shliId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
             	{fieldLabel:C_VOYA,tabIndex:8,name:'voyaName',xtype:'textfield',anchor:'95%'},
          		{fieldLabel:C_PATE,tabIndex:11,name:'pateId',store:getPATE_S(),xtype:'combo',
             		displayField:'pateCode',valueField:'pateId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
             	{fieldLabel:C_EFFECT_DATE,tabIndex:14,name:'prshStartDate',xtype:'datefield',format:DATEF,anchor:'95%'},
             	{fieldLabel:C_EXPIRY_DATE,tabIndex:17,name:'prshEndDate',xtype:'datefield',format:DATEF,anchor:'95%'}
             	]},
             	{columnWidth:.34,layout:'form',border:false,
             	items:[	             	
             	{fieldLabel:C_BIZ_TYPE,tabIndex:3,name:'prshBizType',
             		store:HTStore.BC_S,xtype:'combo',displayField:'NAME',valueField:'CODE',
             		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
             	{fieldLabel:C_POL,tabIndex:6,name:'prshPol',store:getPOL_S(),xtype:'combo',displayField:'portNameEn',valueField:'portId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
             	{fieldLabel:C_STATUS,tabIndex:9,name:'prshStatus',store:HTStore.PSST_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
             	{fieldLabel:C_TTER,tabIndex:12,name:'tranId',store:HTStore.getTRAN_S(),
             		xtype:'combo',displayField:'tranCode',valueField:'tranId',typeAhead: true,
             		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
             	{fieldLabel:C_TO,tabIndex:15,name:'prshStartDate2',xtype:'datefield',anchor:'95%'},
             	{fieldLabel:C_TO,tabIndex:18,name:'prshEndDate2',xtype:'datefield',anchor:'95%'}
             	]}
        	]}
        ]
    });
    this.reload=function(){
     	var a=[];var op=1;
     	var prshVendorId=frmLookup.find('name','prshVendorId')[0].getValue();
     	if(prshVendorId) a[a.length]={key:'prshVendorId',value:prshVendorId,op:op};
     	var prshContractNo=frmLookup.find('name','prshContractNo')[0].getValue();        		
     	if(prshContractNo) a[a.length]={key:'prshContractNo',value:prshContractNo,op:op};
     	var vessId=frmLookup.find('name','vessId')[0].getValue();        		
     	if(vessId) a[a.length]={key:'vessId',value:vessId,op:op};
     	var pateId=frmLookup.find('name','pateId')[0].getValue();        		
     	if(pateId) a[a.length]={key:'pateId',value:pateId,op:op};
     	var prliShipDate=frmLookup.find('name','prliShipDate')[0].getValue();        		
    	if(prliShipDate) a[a.length]={key:'prliShipDate',value:prliShipDate,op:op};
    	var prshCarrier=frmLookup.find('name','prshCarrier')[0].getValue();        		
    	if(prshCarrier) a[a.length]={key:'prshCarrier',value:prshCarrier,op:op};
    	var shliId=frmLookup.find('name','shliId')[0].getValue();        		
    	if(shliId) a[a.length]={key:'shliId',value:shliId,op:op};
    	var voyaId=frmLookup.find('name','voyaName')[0].getValue();        		
    	if(voyaId) a[a.length]={key:'voyaName',value:voyaId,op:op};
    	var prliPod=frmLookup.find('name','prliPod')[0].getValue();        		
    	if(prliPod) a[a.length]={key:'prliPod',value:prliPod,op:op};
    	var prliPotEn=frmLookup.find('name','prliPotEn')[0].getValue();        		
    	if(prliPotEn) a[a.length]={key:'prliPotEn',value:prliPotEn,op:op};
    	var prshBizType=frmLookup.find('name','prshBizType')[0].getValue();        		
    	if(prshBizType) a[a.length]={key:'prshBizType',value:prshBizType,op:op};
    	var prshPol=frmLookup.find('name','prshPol')[0].getValue();        		
    	if(prshPol) a[a.length]={key:'prshPol',value:prshPol,op:op};
    	var prshStatus=frmLookup.find('name','prshStatus')[0].getValue();        		
    	if(prshStatus) a[a.length]={key:'prshStatus',value:prshStatus,op:op};
    	var caclId=frmLookup.find('name','caclId')[0].getValue();        		
    	if(caclId) a[a.length]={key:'caclId',value:caclId,op:op};
    	var tranId=frmLookup.find('name','tranId')[0].getValue();        		
    	if(tranId) a[a.length]={key:'tranId',value:caclId,op:op};
     		
     	var prshStartDate=frmLookup.find('name','prshStartDate')[0].getValue();
     	var prshStartDate2=frmLookup.find('name','prshStartDate2')[0].getValue();
     	if(prshStartDate && prshStartDate2){
     		a[a.length]={key:'prshStartDate',value:prshStartDate.format(DATEF),op:5};
     		a[a.length]={key:'prshStartDate',value:prshStartDate2.format(DATEF),op:3};
     	}
     	else if(prshStartDate) a[a.length]={key:'prshStartDate',value:prshStartDate,op:op};
     	var prshEndDate=frmLookup.find('name','prshEndDate')[0].getValue();
     	var prshEndDate2=frmLookup.find('name','prshEndDate2')[0].getValue();
     	if(prshEndDate && iprshEndDate2){
     		a[a.length]={key:'prshEndDate',value:prshEndDate.format(DATEF),op:5};
     		a[a.length]={key:'prshEndDate',value:prshEndDate2.format(DATEF),op:3};
     	}
     	else if(prshEndDate) a[a.length]={key:'prshEndDate',value:prshEndDate,op:op};
     	if(a.length>0){
     		store.baseParams={_mt:'json',xml:HTUtil.QATJ(a)};
   			store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});
   		}
   		this.close();
   	};
    Fos.PrshLookupWin.superclass.constructor.call(this, {title:C_PRSH_QUERY,iconCls:'search',modal:true,width:600,minWidth:300,
        minHeight:200,plain:true,bodyStyle:'padding:0px;',buttonAlign:'right',items:frmLookup,
        buttons:[{text:C_OK,scope:this,handler:this.reload},{text:C_CANCEL,scope:this,handler:this.close}]
        }); 
};
Ext.extend(Fos.PrshLookupWin, Ext.Window);

Fos.PriceSheetGrid = function() {		
 	var store = new Ext.data.GroupingStore({url:SERVICE_URL,baseParams:{_A:'PRSH_X',_mt:'json'},
 		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CPriceRecord',id:'id'}),groupField:'id'}); 	
 	store.load({params:{start:0,limit:50}});
 	
	this.search = function(){var win = new Fos.PrshLookupWin(store);win.show();};
    this.add=function(){
		var e = new CPriceSheet({prshVendorId:'',prshVendorName:'',prshCarrier:'',prshCarrierName:'',
			prshBizType:'A',prshContractNo:'',prshPol:HTStore.getCFG('BASE_PORT'),prshPolEn:HTStore.getCFGD('BASE_PORT'),shliId:'',shliName:'',prshShipType:'',
			prshStartDate:new Date(),prshEndDate:'',prshStatus:'0',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
		var tab = this.ownerCt.add(new Fos.PriceSheetTab(e));
		this.ownerCt.setActiveTab(tab);
    };    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_PRSH_NO,dataIndex:"prliId"},
		{header:C_EFFECT_DATE,dataIndex:"prshStartDate"},
		{header:C_EXPIRY_DATE,dataIndex:"prshEndDate"},
		{header:C_CARRIER,width:120,dataIndex:"prshCarrierName"},
		{header:C_POL,dataIndex:"prshPolEn"},
		{header:C_POD,dataIndex:"prliPodEn"},
		{header:C_SHIP_DATE,dataIndex:"prliShipDate"},
		{header:C_POT,dataIndex:"prliPotEn"},
		{header:C_DURATION,dataIndex:"prliDuration"},
		{header:C_CHAR,dataIndex:"charName"},
		{header:C_CURR,dataIndex:"currCode",summaryRenderer: function(v,params,data){return '合计：';}},
		{header:"20'",dataIndex:"prrePriceP20",summaryType:'sum'},
		{header:"40'",dataIndex:"prrePriceP40",summaryType:'sum'},
		{header:"40'H",dataIndex:"prrePriceP40h",summaryType:'sum'},
		{header:"CBM",dataIndex:"prrePricePCbm",summaryType:'sum'},
		{header:"KGS",dataIndex:"prrePricePKgs",summaryType:'sum'},
		{header:"W/M",dataIndex:"prrePricePTon",summaryType:'sum'},		    
        {header:C_REMARKS,dataIndex:"prshRemarks"},
		{header:"20'"+C_SALES_PRICE,dataIndex:"prrePriceS20",summaryType:'sum'},
		{header:"40'"+C_SALES_PRICE,dataIndex:"prrePriceS40",summaryType:'sum'},
		{header:"40'H"+C_SALES_PRICE,dataIndex:"prrePriceS40h",summaryType:'sum'},
		{header:"CBM"+C_SALES_PRICE,dataIndex:"prrePriceSCbm",summaryType:'sum'},
		{header:"KGS"+C_SALES_PRICE,dataIndex:"prrePriceSKgs",summaryType:'sum'},
		{header:"W/M"+C_SALES_PRICE,dataIndex:"prrePriceSTon",summaryType:'sum'},
		{header:C_COMMISION_RATE,dataIndex:"prreCommissionRate"},
		{header:C_PATE,dataIndex:"pateCode"},
		{header:C_TTER,dataIndex:"tranCode"},			
		{header:C_SHIP_TYPE,dataIndex:"prshShipType",renderer:getSHTY},
		{header:C_STATUS,dataIndex:"prshStatus",renderer:getPSST},
		{header:C_CONTRACT_NO,dataIndex:"prshContractNo"},		
		{header:C_BOOK_AGENCY,width:120,dataIndex:"prshVendorName"},		
		{header:C_SHLI,dataIndex:"shliName"},		
		{header:C_CACL,dataIndex:"caclName"}
		],defaults:{sortable:false,width:60}});
	var re={rowdblclick:function(g,r,e){this.edit();}};
	this.showPriceSheet= function(p){		
		var t = this.ownerCt.getComponent('T_PRSH_'+p.get("id"));
    	if(t){this.ownerCt.setActiveTab(t);} 
    	else{t = new Fos.PriceSheetTab(p);this.ownerCt.add(t);
    	this.ownerCt.setActiveTab(t);}
	};
	this.edit=function(){
		var c= sm.getSelected();
		if(c){
			var st = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'PRSH_Q',_mt:'json'},
				reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CPriceSheet',id:'id'},CPriceSheet),
				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});			
			st.load({params:{id:c.get('prshId')},scope:this,
				callback:function(r,o,s){
					if(s) 
						this.showPriceSheet(r[0]);
				}
			});
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
	this.expExcel=function(){
		EXPC('PRSH_LIST',store.baseParams.xml?'&_mt=JSON&xml='+Ext.util.JSON.encode(store.baseParams.xml):'&_mt=JSON');
	};
    var gv=new Ext.grid.GroupingView({showGroupName:true,enableNoGroups:false,hideGroupedColumn:true,
		groupTextTpl: '{text} ({[values.rs.length]} {["Items"]})'});
	var summary = new Ext.grid.GroupSummary();
	
	Fos.PriceSheetGrid.superclass.constructor.call(this,{
    id:'G_PRSH',iconCls:'grid',store: store,title:C_PRICE_MANAGEMENT,header:false,autoScroll:true,
	sm:sm,cm:cm,stripeRows:true,closable:true,listeners:re,view:gv,plugins:summary,
	tbar:[{text:C_ADD,disabled:NR(M1_CRM+F_M),iconCls:'add',scope:this,handler:this.add},'-',
		{text:C_EDIT,disabled:NR(M1_CRM+F_M),iconCls:'option',scope:this,handler:this.edit},'-',		
		{text:C_SEARCH,disabled:NR(M1_CRM+F_V),iconCls:'search',scope:this,handler:this.search},'-',
		{text:C_EXPORT,disabled:NR(M1_CRM+F_V),iconCls:'print',scope:this,handler:this.expExcel},'->',
		new Ext.PagingToolbar({pageSize:50,store:store})
		],
	bbar:PTB(store,50)
    });
};    
Ext.extend(Fos.PriceSheetGrid, Ext.grid.GridPanel);

Fos.PriceSheetTab = function(p){
	this.sel =-100;
	this.resel = false;	
		
	this.store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'PRLI_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CPriceLine',id:'id'},CPriceLine),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	this.prreStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'PRRE_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CPriceRecord',id:'id'},CPriceRecord),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	if(p.get('rowAction')!='N'){
		this.store.load({params:{prshId:p.get('id')},scope:this});
		this.prreStore.load({params:{prshId:p.get('id')},callback:function(){
			this.grid.getSelectionModel().selectFirstRow();
		},scope:this});
	};
	var re = {scope:this,
		rowselect:function(se,row,record){
			if(this.resel||this.sel!=record.get('id')){
				this.sel=record.get('id');
				var s = this.prreGrid.getStore();s.removeAll();				
				var a = this.prreStore.getRange();
				for(var i=0;i<a.length;i++){
					if(a[i].get('prliId')==this.sel && a[i].get('rowAction')!='D' && a[i].get('rowAction')!='R'){
						s.add(a[i]);
					}
				};
			};
			this.resel=false;
		}
	};	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_POD,dataIndex:'prliPodEn',width:80,editor:new Ext.form.ComboBox({displayField:'portNameEn',valueField:'portNameEn',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
            store:HTStore.getPS(),tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
            listeners:{scope:this,
            	select:function(c,r,i){
            		sm.getSelected().set('prliPod',r.get('portId'));
            		sm.getSelected().set('prliCountryD',r.get('counCode'));
            		sm.getSelected().set('prliCountryDName',getCOUN(r.get('counCode')));            		
            	},
            	keydown:{fn:LP,buffer:BF}}})},
    {header:C_POD_HARBOUR,dataIndex:'prliPodHarbour',width:100,editor:new Ext.form.TextField()},
    {header:C_SHIP_DATE,dataIndex:'prliShipDate',width:100,editor:new Ext.form.TextField()},
	{header:C_POT,dataIndex:'prliPotEn',width:80,editor:new Ext.form.TextField()},
	{header:C_CACL,dataIndex:'caclName',width:60,
			editor:new Ext.form.ComboBox({displayField:'caclNameCn',valueField:'caclNameCn',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:getCACL_S(),
            listeners:{scope:this,select:function(c,r,i){
				this.grid.getSelectionModel().getSelected().set('caclId',r.get('id'));}}})},
	{header:C_PATE,dataIndex:'pateCode',width:40,
			editor:new Ext.form.ComboBox({displayField:'pateCode',valueField:'pateCode',
				triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPATE_S(),
            listeners:{scope:this,select:function(c,r,i){
				this.grid.getSelectionModel().getSelected().set('pateId',r.get('id'));}}})},  
	{header:C_TTER,dataIndex:'tranCode',width:80,
			editor:new Ext.form.ComboBox({displayField:'tranCode',valueField:'tranCode',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getTRAN_S(),
            listeners:{scope:this,select:function(c,r,i){
				this.grid.getSelectionModel().getSelected().set('tranId',r.get('id'));
			}}})},
	{header:C_DURATION,dataIndex:'prliDuration',width:60,editor:new Ext.form.NumberField({})},
	{header:C_REMARKS,dataIndex:'prliRemarks',width:100,editor:new Ext.form.TextField()}],defaults:{sortable:false,width:100}});
	this.addPrli=function(){
		var c = new CPriceLine({prshId:p.get('prshId'),prliCountryD:'',prliCountryT:'',
		prliPod:'',prliPodEn:'',prliPotEn:'',caclId:'',pateId:'',tranId:'',vessId:'',
		voyaId:'',prliShipDate:'',prliRemarks:'',version:'0',uuid:HTUtil.UUID(32)});
       	this.store.insert(0,c);c.set('rowAction','N');
       	this.grid.getSelectionModel().selectFirstRow();this.grid.startEditing(0,1);
	};
	this.removePrli=function(){
		var b =this.grid.getSelectionModel().getSelected();
		if(b){
    		b.set('rowAction',b.get('rowAction')=='N'?'D':'R');this.store.remove(b);
    		var s = this.prreGrid.getStore();
			var a = s.getRange();
			for(var i=0;i<a.length;i++){
				a[i].set('rowAction',a[i].get('rowAction')=='N'?'D':'R');
				s.remove(a[i]);this.prreStore.remove(a[i]);
			};
		}
	};
	this.grid = new Ext.grid.EditorGridPanel({autoScroll:true,clicksToEdit:1,height:150,
		store:this.store,sm:sm,cm:cm,border:false,		
		tbar:[{text:C_ADD+'(A)',disabled:NR(M1_CRM+CRM_PRICE+F_M),iconCls:'add',scope:this,handler:this.addPrli},'-',
		{text:C_REMOVE+'(D)',disabled:NR(M1_CRM+CRM_PRICE+F_M),iconCls:'remove',scope:this,handler:this.removePrli}]});
	
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm2=new Ext.grid.ColumnModel({columns:[sm2,
	{header:C_CHAR,dataIndex:'charName',width:80,
		editor:new Ext.form.ComboBox({displayField:'charCode',valueField:'charName',triggerAction:'all',
    	tpl:charTpl,itemSelector:'div.list-item',listWidth:300,mode:'remote',
    	selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCHAR_S(),
    	listeners:{scope:this,select:function(c,r,i){this.prreGrid.getSelectionModel().getSelected().set('charId',r.get('charId'));}}})},
	{header:C_CURR,dataIndex:"currCode",width:50,
			editor:new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction: 'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCURR_S()})},
	{header:C_COMMISION_RATE,dataIndex:'prreCommissionRate',width:80,renderer:rateRender,editor:new Ext.form.NumberField({})},
	{header:"20'",dataIndex:'prrePriceP20',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"40'",dataIndex:'prrePriceP40',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"40'H",dataIndex:'prrePriceP40h',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"CBM",dataIndex:'prrePricePCbm',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"KGS",dataIndex:'prrePricePKgs',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"TON",dataIndex:'prrePricePTon',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},	
	{header:"20'"+C_SALES_PRICE,dataIndex:'prrePriceS20',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"40'"+C_SALES_PRICE,dataIndex:'prrePriceS40',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"40'H"+C_SALES_PRICE,dataIndex:'prrePriceS40h',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"CBM"+C_SALES_PRICE,dataIndex:'prrePriceSCbm',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"KGS"+C_SALES_PRICE,dataIndex:'prrePriceSKgs',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})},
	{header:"W/M"+C_SALES_PRICE,dataIndex:'prrePriceSTon',width:60,renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4})}
	],defaults:{sortable:false,width:120}});
	this.addPrre=function(){
		var r = this.grid.getSelectionModel().getSelected();
		if(r){
			var t = new CPriceRecord({prliId:r.get('id'),prshId:p.get('id'),
			currCode:'USD',charId:'',charName:'',prreCommissionRate:'',
			prrePriceP20:'',prrePriceP40:'',prrePriceP40h:'',prrePricePCbm:'',prrePricePKgs:'',prrePricePTon:'',
			compCode:'',verson:'0',uuid:HTUtil.UUID(32)});
			this.prreStore.add(t);t.set('rowAction','N');this.prreGrid.getStore().add(t);
			this.prreGrid.getSelectionModel().selectFirstRow();
       		this.prreGrid.startEditing(0,1);
		}
	};
	this.removePrre=function(){
		var r = this.prreGrid.getSelectionModel().getSelections();
		for(var i=0;i<r.length;i++){r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
		this.prreGrid.getStore().remove(r[i]);};
	};
	this.prreGrid = new Ext.grid.EditorGridPanel({autoScroll:true,height:250,sm:sm2,cm:cm2,border:false,
		store:new Ext.data.Store({reader:new Ext.data.XmlReader({id:'prreId',record:'CPriceRecord'},CPriceRecord),sortInfo:{field:'prreId',direction:'ASC'}}),
		tbar:[{text:C_ADD+'(J)',disabled:NR(M1_CRM+CRM_PRICE+F_M),iconCls:'add',scope:this,handler:this.addPrre},'-',
		      {text:C_REMOVE+'(X)',disabled:NR(M1_CRM+CRM_PRICE+F_M),iconCls:'remove',scope:this,handler:this.removePrre}]
	});	
	
	this.save=function(){
		this.grid.stopEditing();
		this.prreGrid.stopEditing();		
		p.beginEdit();
		this.find('name','prshForm')[0].getForm().updateRecord(p);
		p.endEdit();		
		var rj=HTUtil.RTJ(p,CPriceSheet);
		var raj=[];
		var a =this.store.getModifiedRecords();
		if(a.length>0) 
			raj=HTUtil.ATJ(a,CPriceLine);		
		var cc=[];rcj=[];
		var ca =this.prreStore.getRange();
		for(var i=0;i<ca.length;i++){
			if(ca[i].dirty) 
				cc[cc.length]=ca[i];
		};
		if(cc.length>0) 
			rcj=HTUtil.ATJ(cc,CPriceRecord);		
		var data=HTUtil.HTJ({'CPriceSheet':rj,'CPriceLine':raj,'CPriceRecord':rcj});		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'PRSH_S',_mt:'json'},
			success: function(res){
				var o=Ext.util.JSON.decode(res.responseText);
				var ps = o.CPriceSheet[0];
				p.set('compCode',ps.compCode);
				p.set('version',ps.version);
				p.set('id',ps.id);
							
				this.store.each(
					function(r){
						if(r.dirty){
							r.set('rowAction','D');
							this.store.remove(r);
						}},this);
				if(o.CPriceLine) 
					this.store.loadData(HTUtil.JTRA(o,'CPriceLine'),true);
				
				this.prreStore.each(function(r){
					if(r.dirty){
						r.set('rowAction','D');
						this.prreStore.remove(r);
					}},this);
				if(o.CPriceRecord) 
					this.prreStore.loadData(HTUtil.JTRA(o,'CPriceRecord'),true);
				
				if(this.store.getCount){
					var a = this.store.getRange();
					var sel=a[0];
					for(var i=0;i<a.length;i++){
						if(a[i].get('id')==this.sel){sel=a[i];break;};
						if(a[i].get('id')>sel.get('id')) sel=a[i];
					}
					this.resel=true;
					this.grid.getSelectionModel().selectRecords([sel]);
				}
				XMG.alert(SYS,M_S);
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
			jsonData:data});
	};
	this.removePrsh=function(){     	
		var xml=HTUtil.RTX4R(p,'CPriceSheet','id');
		xml+=HTUtil.STX4R(this.store,'CPriceLine','id');
		xml+=HTUtil.STX4R(this.prreStore,'CPriceRecord','id');		
     	Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{A:'PRSH_S'},
			success: function(){
     			XMG.alert(SYS,M_S);
     		},
			failure: function(r,o){
     			XMG.alert(SYS,M_F+r.responseText);
     		},
			xmlData:HTUtil.HTX(xml)});
	};
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'PRSH_U',id:p.get('id'),prshStatus:s},
		success: function(r){
			p.set('prshStatus',s);
			this.updateToolBar();
			XMG.alert(SYS,M_S);
		},
		failure: function(r){
			XMG.alert(SYS,M_F+r.responseText);
		}});
    };
	this.effect=function(){this.updateStatus(1);};
    this.expiry=function(){this.updateStatus(2);};
    this.updateToolBar = function(){
		tb=this.getTopToolbar();
		tb.getComponent('TB_A').setDisabled(p.get('prshStatus')!=0);
    	tb.getComponent('TB_B').setDisabled(p.get('prshStatus')!=0);
    	tb.getComponent('TB_C').setDisabled(p.get('prshStatus')!=0);
    	tb.getComponent('TB_D').setDisabled(p.get('prshStatus')!=1);
    	tb.getComponent('TB_M').setText(C_STATUS_C+getPSST(p.get('prshStatus')));
    };
	this.expExcel=function(){EXPC('PRSH','&id='+b.get('id'));};
	this.expEmail=function(){
		var to='';
		var cc='';
		var sub=C_PRSH;
		var msg='';
		EXPM(to,cc,sub,msg,'PRSH','id='+p.get('id'));
	};
	
	Fos.PriceSheetTab.superclass.constructor.call(this, { 
	id:'T_PRSH_'+p.get('id'),title:C_PRSH+'-'+p.get('id'),border:false,autoScroll:true,header:false,deferredRender:false,	
	labelAlign:'right',labelWidth:80,layout:'border',closable:true,
    listeners:{scope:this,render:function(c){}},
    tbar:[
		{text:C_SAVE,disabled:NR(M1_CRM+F_M),itemId:'TB_A',iconCls:'save',scope:this,handler:this.save},'-',
		{text:C_REMOVE,disabled:NR(M1_CRM+F_M),itemId:'TB_B',iconCls:'remove',scope:this,handler:this.removePrsh},'-',
		{text:C_EFFECT,disabled:NR(M1_CRM+F_M)||p.get('prshStatus')!='0',itemId:'TB_C',iconCls:'save',scope:this,handler:this.effect},'-',
		{text:C_EXPIRY,disabled:NR(M1_CRM+F_M)||p.get('prshStatus')!='1',itemId:'TB_D',iconCls:'cancel',scope:this,handler:this.expiry},'->',
		{itemId:'TB_M',disabled:true,text:C_STATUS_C+getPSST(p.get('prshStatus'))},'-'],
	items: [
		{title:C_PRSH_INFO,name:'prshForm',xtype:'form',region:'north',height:120,layout:'column',layoutConfig:{columns:4},frame:true,deferredRender:false,collapsible:true,items:[
			{columnWidth:.25,layout:'form',labelWidth:60,labelAlign:'right',border:false,items:[
	        	{fieldLabel:C_CARRIER,itemClass:'required',tabIndex:5,name:'prshCarrierName',value:p.get('prshCarrierName'),
	        		store:HTStore.getCS(),enableKeyEvents:true,
	            	tpl:custTpl,itemSelector:'div.list-item',listWidth:400,xtype:'combo',
	            	displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
     					listeners:{scope:this,select:function(c,r,i){
     						p.set('prshCarrier',r.get('custId'));},
     					keydown:{fn:function(f,e){LC(f,e,'custCarrierFlag');},buffer:500}}},
     				{fieldLabel:C_SHLI,tabIndex:15,name:'shliId',value:p.get('shliId'),store:getSHLI_S(),xtype:'combo',displayField:'shliName',valueField:'shliId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
     					listeners:{scope:this,select:function(c,r,i){p.set('shliName',r.get('shliName'));}}}
     			]},
	        	{columnWidth:.25,layout:'form',border:false,labelWidth:60,labelAlign:'right',items:[
	            	{fieldLabel:C_BOOK_AGENCY,tabIndex:2,
	            	name:'prshVendorName',value:p.get('prshVendorName'),store:HTStore.getCS(),enableKeyEvents:true,
	            	xtype:'combo',displayField:'custCode',valueField:'custNameCn',typeAhead:true,
	            	mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
	            		listeners:{scope:this,select:function(c,r,i){
	            			p.set('prshVendorId',r.get('custId'));},
	            			keydown:{fn:function(f,e){LC(f,e,'custBookingAgencyFlag');},buffer:500}}},
	            	{fieldLabel:HL(C_POL),tabIndex:43,name:'prshPol',value:p.get('prshPol'),
	            				store:HTStore.getPS(),xtype:'combo',displayField:'portNameEn',
	            				valueField:'portId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
	            		listeners:{scope:this,select:function(c,r,i){p.set('prshPolEn',r.get('portNameEn'));}}}
	            ]},
    			{columnWidth:.25,layout:'form',border:false,labelWidth:60,labelAlign:'right',items:[	            	
	           		{fieldLabel:C_VESS,tabIndex:34,name:'vessName',value:p.get('vessName'),
	           			store:HTStore.getVES(),enableKeyEvents:true,
	           			xtype:'combo',displayField:'vessNameEn',valueField:'vessNameEn',
	           			typeAhead:true,mode:'remote',
	           			triggerAction:'all',selectOnFocus:true,anchor:'95%',
              			listeners:{scope:this,select:function(c,r,i){p.set('vessId',r.get('vessId'));},
              				keydown:{fn:function(f,e){LV(f,e);},buffer:500}}},
              		{fieldLabel:C_EFFECT_DATE,tabIndex:6,name:'prshStartDate',value:p.get('prshStartDate'),xtype:'datefield',format:DATEF,anchor:'95%'}
	            ]},
    			{columnWidth:.25,layout:'form',border:false,labelWidth:60,labelAlign:'right',items:[
	            	{fieldLabel:C_VOYA,itemCls:'required',tabIndex:35,name:'voyaName',value:p.get('voyaName'),xtype:'textfield',anchor:'95%'}
	            ]},
	            {columnWidth:.25,layout:'form',labelWidth:60,labelAlign:'right',border:false,items:[
	                {fieldLabel:C_EXPIRY_DATE,tabIndex:6,name:'prshEndDate',value:p.get('prshEndDate'),xtype:'datefield',format:DATEF,anchor:'95%'}
     			]},
     			{columnWidth:.25,layout:'form',border:false,labelWidth:60,labelAlign:'right',items:[
	            	{fieldLabel:C_CONTRACT_NO,tabIndex:6,name:'prshContractNo',value:p.get('prshContractNo'),xtype:'textfield',anchor:'95%'}
	            ]},
	            {columnWidth:.25,layout:'form',border:false,labelWidth:60,labelAlign:'right',items:[
	            	{fieldLabel:C_POL_HARBOUR,tabIndex:6,name:'prshPolHarbour',value:p.get('prshPolHarbour'),xtype:'textfield',anchor:'95%'}
	            ]},
     			{columnWidth:.5,layout:'form',border:false,labelWidth:60,labelAlign:'right',items:[
              		{fieldLabel:C_REMARKS,tabIndex:1,name:'prshRemarks',value:p.get('prshRemarks'),xtype:'textfield',anchor:'95%'}
	            ]}
	         ]},
			{title:C_PRLI,region:'west',split:true,width:400,minSize:200,maxSize:600,layout:'fit',items:this.grid},
			{title:C_PRICE,region:'center',width:200,minSize:200,maxSize:600,layout:'fit',items:this.prreGrid
            }]
		});
};
Ext.extend(Fos.PriceSheetTab,Ext.Panel);

Fos.FileUploadWin = function(title,label) {	
	var fp = new Ext.form.FormPanel({
        id:'F_UP',fileUpload:true,title:title,header:false,autoHeight:true,
        items: [{
            xtype: 'fileuploadfield',emptyText:label,fieldLabel:label,
            name: 'tempFile',anchor: '95%',frame: true,allowBlank: false,msgTarget: 'side'
        }]
    });
    Fos.FileUploadWin.superclass.constructor.call(this, {title:title,iconCls:'up',plain:false,modal:true,width:400,minWidth:300,
        minHeight:200,plain:true,bodyStyle:'padding:0px;',buttonAlign:'right',items:fp}); 
};
Ext.extend(Fos.FileUploadWin,Ext.Window);

Fos.DateWin = function() {    
	var frmDate = new Ext.form.FormPanel({labelWidth: 60,bodyStyle:'padding:5px',
    	items: [{fieldLabel:C_SAIL_DATE,id:'voyaSailDate',value:new Date(),allowBlank:false,xtype:'datefield',anchor:'95%'}]
    });
    Fos.DateWin.superclass.constructor.call(this, {title:C_SAIL_DATE_P,modal:true,width:200,
        Height:300,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frmDate});
};
Ext.extend(Fos.DateWin, Ext.Window);

Fos.TemplateChooseWin = function(t){
	var frmTemplate = new Ext.form.FormPanel({labelWidth:80,bodyStyle:'padding:5px',
    	items: [{fieldLabel:C_TEMP_SEL_P,id:'tempId',allowBlank:false,
    		store:HTStore.getTemplates(t),xtype:'combo',displayField:'tempName',valueField:'id',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'}]
    });
    Fos.TemplateChooseWin.superclass.constructor.call(this,{title:C_TEMP_SEL_P,modal:true,width:400,
        Height:300,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:frmTemplate}); 
};
Ext.extend(Fos.TemplateChooseWin, Ext.Window);

Fos.MailWin = function(m,t,mt) {
	var form = new Ext.form.FormPanel({labelWidth:60,id:'F_MAIL',bodyStyle:'padding:5px 5px 0',frame:true,width:800,height:400,
		items: [{layout:'column',layoutConfig:{columns:1},deferredRender:false,items:[
			{columnWidth:1,layout:'form',border:false,items:[
				{fieldLabel:'To',id:'to',value:m.get('messTo'),xtype:'textfield',allowBlank:false,anchor:'95%'},
	            {fieldLabel:'Cc',id:'cc',value:m.get('messCc'),xtype:'textfield',anchor:'95%'},
	            {fieldLabel:'Subject',id:'sub',value:m.get('messSubject'),xtype:'textfield',anchor:'95%'},
	            {fieldLabel:C_TEMP_FILE,disabled:t=='',id:'tempId',store:HTStore.getTemplates(t),xtype:'combo',displayField:'tempName',valueField:'id',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
	            	listeners:{scope:this,
	        		render:function(cbx){
	        			if(cbx.store.getCount()){
	        				var r=cbx.store.getAt(0);
	        				cbx.setValue(r.get('id'));
	        			}
	            }}},
	            {layout:'fit',items:[{id:'body',value:m.get('messBody'),xtype:'htmleditor',anchor:'95%'}]}]
	         }]}]
    });
    Fos.MailWin.superclass.constructor.call(this, {title:mt==1?C_SEND_MAIL:C_SEND_FAX,modal:true,plain:true,layout:'fit',width:800,height:400,
    border:true,bodyStyle:'padding:0px;',buttonAlign:'right',items:form}); 
};
Ext.extend(Fos.MailWin, Ext.Window);

Fos.SalesQuotaGrid = function() {	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'SAQU_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CSalesQuota',id:'id'},CSalesQuota),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	store.load({params:{start:0,limit:C_PS}});	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_SALES,dataIndex:'saquSalesName',width:100,
			editor:new Ext.form.ComboBox({displayField:'userLoginName',valueField:'userName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getSALE_S(),
            listeners:{scope:this,select:function(c,r,i){
            	var b =this.getSelectionModel().getSelected();b.set('saquSalesId',r.get('userId'));}}})},
	{header:C_YEAR,dataIndex:'saquYear',width:80,editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:YY_S})},
	{header:C_MONTY,dataIndex:'saquMonth',width:80,editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:MM_S})},
	{header:C_BASE_PROFIT,dataIndex:'saquBaseProfit',width:80,editor:new Ext.form.NumberField({decimalPrecision:2})},
	{header:C_COMMISION_RATE,dataIndex:'saquCommissionRate',width:80,editor:new Ext.form.NumberField({decimalPrecision:4})}	
	],defaults:{sortable:false,width:100}});
	var d=new Date();y=d.format('Y');m=d.format('m');
	this.add=function(){
		var t = new CSalesQuota({saquSalesId:'',saquSalesName:'',saquYear:y,saquMonth:m,
		saquBaseProfit:'',saquCommissionRate:'',version:'0',uuid:HTUtil.UUID(32)});
		store.insert(0,t);t.set('rowAction','N');
		sm.selectFirstRow();
		this.startEditing(0,1);
	};
	this.remove=function(){HTUtil.REMOVE_SM(sm,store);};
	this.save=function(){HTUtil.POST(store,'CSalesQuota',CSalesQuota,'SAQU_S');};
	CREATE_KM('G_SAQU',this);	
	Fos.SalesQuotaGrid.superclass.constructor.call(this,{
	id:'G_SAQU',title:C_SALES_QUOTA,header:false,deferredRender:false,closable:true,
		border:false,height:200,autoScroll:true,sm:sm,cm:cm,store:store,sortInfo:{field:'fdocId',direction:'DESC'},
		tbar:[
			{itemId:'TB_N',text:C_ADD+'(N)',disabled:NR(M1_CRM+F_M),iconCls:'add',scope:this,handler:this.add},'-',
			{itemId:'TB_R',text:C_REMOVE+'(R)',disabled:NR(M1_CRM+F_M),iconCls:'remove',scope:this,handler:this.remove},'-',
			{itemId:'TB_S',text:C_SAVE+'(S)',disabled:NR(M1_CRM+F_M),iconCls:'save',scope:this,handler:this.save},'->',
		new Ext.PagingToolbar({pageSize:C_PS,store:store})],
		bbar:PTB(store,C_PS)
    });
};
Ext.extend(Fos.SalesQuotaGrid, Ext.grid.EditorGridPanel);

Fos.SalesCommissionGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'SACO_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CSalesCommission',id:'id'},CSalesCommission),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	store.load({params:{start:0,limit:C_PS}});	
	var cs = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'COMM_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCommission',id:'id'},CCommission),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
    cs.load();    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_SALES,dataIndex:'sacoSalesName',width:100,
			editor:new Ext.form.ComboBox({displayField:'userLoginName',valueField:'userName',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:getSALE_S(),
            listeners:{scope:this,select:function(c,r,i){
            	var b =this.getSelectionModel().getSelected();b.set('sacoSalesId',r.get('userId'));}}})},	
	{header:C_COMMISSION,dataIndex:'commName',width:80,editor:new Ext.form.ComboBox({xtype:'combo',store:cs,displayField:'commName',valueField:'commName',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,
		listeners:{scope:this,select:function(c,r,i){
	            	var b=sm.getSelected();
	            	if(b){b.set('commId',r.get('commId'));}}}
				})}	
	],defaults:{sortable:false,width:100}});
	this.add=function(){
		var t = new CSalesCommission({sacoSalesId:'',sacoSalesName:'',commId:'',
			version:'0',uuid:HTUtil.UUID(32)});
		store.insert(0,t);t.set('rowAction','N');sm.selectFirstRow();this.startEditing(0,1);
	};
	this.removeRecords=function(){HTUtil.REMOVE_SM(sm,store);};
	this.save=function(){HTUtil.POST(store,'CSalesCommission',CSalesCommission,'SACO_S');};
	CREATE_KM('G_SACO',this);	
	Fos.SalesCommissionGrid.superclass.constructor.call(this,{
	id:'G_SACO',title:C_SALES_COMMISSION,header:false,deferredRender:false,closable:true,
		border:false,height:200,autoScroll:true,sm:sm,cm:cm,store:store,
		tbar:[
			{itemId:'TB_N',text:C_ADD+'(N)',disabled:NR(M1_CRM+F_M),iconCls:'add',scope:this,handler:this.add},'-',
			{itemId:'TB_R',text:C_REMOVE+'(R)',disabled:NR(M1_CRM+F_M),iconCls:'remove',scope:this,handler:this.removeRecords},'-',
			{itemId:'TB_S',text:C_SAVE+'(S)',disabled:NR(M1_CRM+F_M),iconCls:'save',scope:this,handler:this.save},'->',
		new Ext.PagingToolbar({pageSize:C_PS,store:store})],
		bbar:PTB(store,C_PS)
    });
};
Ext.extend(Fos.SalesCommissionGrid, Ext.grid.EditorGridPanel);

Fos.CommissionTab = function(p){
	this.sel =GSEL;
	this.reload = false;	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'COMM_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCommission',id:'id'},CCommission),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
    var itemStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'COIT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCommissionItem',id:'id'},CCommissionItem),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
    itemStore.load();	
	var re = {scope:this,
		rowselect:function(sm,row,r){
			if(this.sel!=r.get('id')){
				this.sel=r.get('id');				
				var s = grid2.getStore();s.removeAll();
				var a = itemStore.getRange();
				for(var i=0;i<a.length;i++){if(a[i].get('commId')==this.sel) s.add(a[i]);}
			}
		}
	};	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,listeners:re});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_NAME,dataIndex:'commName',width:250,editor:new Ext.form.TextField()}],defaults:{sortable:false}});
	var grid = new Ext.grid.EditorGridPanel({id:'G_COMM',clicksToEdit:1,border:true,store:store,sm:sm,cm:cm});	
    
	var ss = new Ext.data.Store({baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCommissionItem'},CCommissionItem)
		});	 
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm2=new Ext.grid.ColumnModel({columns:[sm2,
		{header:C_COMMISSION_LOWER,dataIndex:'coitLower',editor:new Ext.form.NumberField()},
		{header:C_COMMISSION_LIMIT,dataIndex:'coitLimit',editor:new Ext.form.NumberField()},
		{header:C_COMMISSION_RATE,dataIndex:'coitRate',editor:new Ext.form.NumberField()}],defaults:{sortable:false,width:80}});
	var grid2 = new Ext.grid.EditorGridPanel({id:'G_COIT',clicksToEdit:1,border:true,store:ss,sm:sm2,cm:cm2});	
	this.save = function(){
		var xml='';
		var a = store.getModifiedRecords();
		if(a.length) xml = HTUtil.ATX(a,'CCommission',CCommission);
		var cc=[];
		var ca =itemStore.getRange();
		for(var i=0;i<ca.length;i++){
			if(ca[i].dirty) cc[cc.length]=ca[i];
		}
		if(cc.length>0){
			var x = HTUtil.ATX(cc,'CCommissionItem',CCommissionItem);
			xml=xml+x;
		};		
		if(xml!=''){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'COMM_S'},
			success: function(r){				
				var a = HTUtil.XTRA(r.responseXML,'CCommission',CCommission);
				HTUtil.RUA(store, a, rt)(store,a,CCommission);
				var b = HTUtil.XTRA(r.responseXML,'CCommissionItem',CCommissionItem);
				HTUtil.RUA(itemStore,b,CCommissionItem);
				HTUtil.RUA(ss,b,CCommissionItem);
				XMG.alert(SYS,M_S);},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
			xmlData:HTUtil.HTX(x)(xml)});
		}
		else XMG.alert(SYS,M_NC);
	};
	this.addComm=function(){
		var r = new CCommission({commName:'',active:'1',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
    	grid.stopEditing();
    	store.insert(0,r);grid.getSelectionModel().selectFirstRow();
    	grid.startEditing(0,1);
	};
	this.removeComm=function(){
		var r = grid.getSelectionModel().getSelected();
		if(r){
			r.set('rowAction',r.get('rowAction')=='N'?'D':'R');
				grid.getStore().remove(r);				
				var a=grid2.getStore().getRange();
				for(var i=0;i<a.length;i++){
					a[i].set('rowAction',a[i].get('rowAction')=='N'?'D':'R');
					grid2.getStore().remove(a[i]);
				}
			}
	};
	this.addItem=function(){
		var r = new CCommissionItem({commId:this.sel,active:'1',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
    	grid2.stopEditing();
    	itemStore.add(r);ss.insert(0,r);
    	grid2.getSelectionModel().selectFirstRow();
    	grid2.startEditing(0,1);
	};
	this.removeItem=function(){
		var r = grid2.getSelectionModel().getSelections();
		if(r){
			for(var i=0;i<r.length;i++){
				r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				grid2.getStore().remove(r[i]);
			}
		}
	};
	Fos.CommissionTab.superclass.constructor.call(this,{id:'T_COMM',title:C_COMMISSION,iconCls:'gen',header:false,deferredRender:false,
	autoScroll:true,labelAlign:'right',closable:true,labelWidth:80,border:false,width:800,layout:'border',
	items: [{title:C_COMMISSION_LIST,region:'center',width:400,minSize:200,maxSize:600,layout:'fit',items:[grid]},
		{title:C_COMMISSION_ITEM,region:'east',split:true,width:400,minSize:200,maxSize:600,layout:'fit',items:[grid2],
				tbar:[
				{text:C_ADD,iconCls:'add',scope:this,scope:this,handler:this.addItem},
				{text:C_REMOVE,disabled:false,iconCls:'remove',scope:this,handler:this.removeItem}]
		}],
	tbar:[		
		{text:C_ADD,disabled:NR(M1_CRM+F_M),iconCls:'add',scope:this,scope:this,handler:this.addComm},
		{text:C_REMOVE,disabled:NR(M1_CRM+F_M),iconCls:'remove',scope:this,handler:this.removeComm},
		{text:C_SAVE,disabled:NR(M1_CRM+F_M),iconCls:'save',scope:this,handler:this.save}
		]});
};
Ext.extend(Fos.CommissionTab, Ext.Panel);


//自定义控件
Fos.CustomerLookup = Ext.extend(Ext.form.ComboBox, {
	 triggerClass:'x-form-search-trigger',
	custType:'',	//客户类型属性
	bizType:'',		//类务类型属性
	
	constructor:function(config){
		this.custType = config['custType'];
		this.bizType = config['bizType'];
		Fos.CustomerLookup.superclass.constructor.apply(this, arguments);
	},
	initComponent:function(){
		Fos.CustomerLookup.superclass.initComponent.call(this);        
	},
	
	selectCust:function(cust,scope){
		scope.setValue(cust.data[scope.valueField || scope.displayField]);
		scope.fireEvent('select', this, cust, 0);
	},
	
	//弹出窗口按钮
	onTriggerClick:function(event){
		var win = new Fos.CustomerLookWin(this.custType,this.bizType,this.selectCust,this);
		win.show();
	}
});
Ext.reg('customerLookup', Fos.CustomerLookup);

Fos.CustomerLookWin = function(custType,bizType,fn,scope) {
    var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CUST_X&_mt=json',baseParams:{},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CCustomer',id:'id'},CCustomer),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.baseParams = {};
    
    //委托单位
    if(custType=='custBookerFlag')
    	store.baseParams.custBookerFlag=1;
    //承运人
    else if(custType=='custCarrierFlag')
    	store.baseParams.custCarrierFlag=1;
    //报关行
    else if(custType=='custCustomFlag')
    	store.baseParams.custCustomFlag=1;
    //海外代理
    else if(custType=='custOverseaAgencyFlag')
    	store.baseParams.custOverseaAgencyFlag=1;
    //订舱代理
    else if(custType=='custBookingAgencyFlag')
    	store.baseParams.custBookingAgencyFlag=1;
    //报检单位
    else if(custType=='custInspectionFlag')
    	store.baseParams.custInspectionFlag=1;
    //换单代理
    else if(custType=='custDoAgencyFlag')
    	store.baseParams.custDoAgencyFlag=1;
    //场站
    else if(custType=='custCfsFlag')
    	store.baseParams.custCfsFlag=1;
    //仓库
    else if(custType=='custWarehouseFlag')
    	store.baseParams.custWarehouseFlag=1;
    //航空公司
    else if(custType=='custAirFlag')
    	store.baseParams.custAirFlag=1;
    //车队
    else if(custType=='custTrackFlag')
    	store.baseParams.custTrackFlag=1;
    //箱公司
    else if(custType=='custContainerFlag')
    	store.baseParams.custContainerFlag=1;
    //保险公司
    else if(custType=='custInsuranceFlag')
    	store.baseParams.custInsuranceFlag=1;
    //加油站
    else if(custType=='custOilFlag')
    	store.baseParams.custTrackFlag=1;
    //维修工厂
    else if(custType=='custFactoryFlag')
    	store.baseParams.custFactoryFlag=1;
    //快件公司
    else if(custType=='custExpressFlag')
    	store.baseParams.custTrackFlag=1;
    
    if(bizType=='M')
    	store.baseParams.marineFlag=1;
    else if(bizType=='A')
    	store.baseParams.airFlag=1;
    else if(bizType=='E')
    	store.baseParams.expressFlag=1;
    else if(bizType=='C')
    	store.baseParams.customsFlag=1;
    else if(bizType=='W')
    	store.baseParams.wmsFlag=1;
    else if(bizType=='T')
    	store.baseParams.tmsFlag=1;
      
    store.load({params:{start:0,limit:C_PS20}});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({columns:[
    	new Ext.grid.RowNumberer(),sm,
		{header:C_CODE,dataIndex:'custCode',width:80},
		{header:C_CNAME,dataIndex:'custNameCn',width:100},
		{header:C_CSNAME,dataIndex:'custSnameCn',width: 80},
		{header:C_ENAME,dataIndex:'custNameEn',width:100},
		{header:C_ESNAME,dataIndex:'custSnameEn',width:80},
		{header:C_CONTACT,dataIndex:'custContact',width:100},
		{header:C_TEL,dataIndex:'custTel',width:100},
		{header:C_FAX,dataIndex:'custFax',width:100},
		{header:'上级公司',dataIndex:'parentId',hidden:true,width:100},//添加上级公司id隐藏字段 ADD BY YongZhixiang 2011-07-03
		C_CT,C_MT],defaults:{sortable:false,width:100}});
    
		
	//添加按钮的代码
    this.addCustomer = function(){
    	var p = new CCustomer({custCode:'',custClass:'',custNameCn:'',custSnameCn:'',custNameEn:'',custSnameEn:'',
		custArFlag:1,custApFlag:1,custIndustry:'',cucaId:'',custType:'',counCode:'CN',custProvince:'',custCity:'',
		custAddress:'',custZip:'',custContact:'',custTel:'',custFax:'',custEmail:'',custUrl:'',custBankCny:'',
		custAccountCny:'',custBankUsd:'',custAccountUsd:'',custInvoiceHeader:'',custActive:'1',
		custBookerFlag:'1',custShipperFlag:'1',
		custShipTo:'',custChargeTo:'',custCreditDay:'',
		custCreditDay:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_DAYS'),
		custCreditAmount:HTStore.getCFG('CUSTOMER_DEFAULT_CRDIT_AMOUNT'),custRemarks:'',
		version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
    	var win = new Fos.CustomerWin(p,store);//-->cust.js
		win.show();
    };
    
    this.editCustomer = function(){
    	var record  = sm.getSelected();
    	if(sm){
    		 var window = new Fos.CustomerWin(record);//-->cust.js
    		 window.show();
    	}
    	   else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
    //查询按钮的代码
	this.search = function(){
		var w=new Fos.CustomerLW(store);w.show();
	};
	
	//ok选择
	this.sel = function(){
		//当确实选择了一项数据时，执行传入的函数参数，并关闭窗口
		if(sm.getSelected()){
			fn(sm.getSelected(),scope);
			this.close();
		}
		else{ 
			Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
		}
	};
	
	//构建grid
	var grid = new Ext.grid.GridPanel({store: store,sm:sm,cm:cm,
		listeners:{scope:this,rowdblclick:this.sel},
		bbar:PTB(store,C_PS20),
		tbar:[{text:C_ADD,disabled:NR(M1_CRM),iconCls:'add',handler:this.addCustomer}, '-', 
		      {text:C_EDIT,disabled:NR(M1_CRM),iconCls:'option',handler:this.editCustomer}, '-',
			{text:C_SEARCH,iconCls:'search',handler:this.search},'-']
	});
	
	//配置项
    Fos.CustomerLookWin.superclass.constructor.call(this,{title:C_CUST_SEL,width:600,height:400,layout:'fit',modal:true,items:grid,
    	buttons:[{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
    	         {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
    	}
    ); 
};
Ext.extend(Fos.CustomerLookWin,Ext.Window);

//自定义控件
Fos.CustomerLookupGood = Ext.extend(Ext.form.ComboBox, {
	 triggerClass:'x-form-search-trigger',
	status:'',	//状态
	version:'',		
	
	constructor:function(config){
		this.status = config['status'];
		this.version = config['version'];
		Fos.CustomerLookupGood.superclass.constructor.apply(this, arguments);
	},
	initComponent:function(){
		Fos.CustomerLookupGood.superclass.initComponent.call(this);        
	},
	
	selectCust:function(cust,scope){
		scope.setValue(cust.data[scope.valueField || scope.displayField]);
		scope.fireEvent('select', this, cust, 0);
	},
	
	//弹出窗口按钮
	onTriggerClick:function(event){
		
	}
});
Ext.reg('customerLookupGood', Fos.CustomerLookupGood);

//自定义控件
Fos.ReceivedLookup = Ext.extend(Ext.form.ComboBox, {
	 triggerClass:'x-form-search-trigger',
	status:'',	//状态
	version:'',		
	
	constructor:function(config){
		this.status = config['status'];
		this.version = config['version'];
		Fos.ReceivedLookup.superclass.constructor.apply(this, arguments);
	}
});
Ext.reg('receivedLookup', Fos.ReceivedLookup);

Fos.PortLookup = Ext.extend(Ext.form.ComboBox, {
	triggerClass:'x-form-search-trigger',
	portType:'',
	constructor: function(config){
		this.portType = config['portType'],
		Fos.PortLookup.superclass.constructor.apply(this, arguments);
	},
	initComponent : function(){
		Fos.PortLookup.superclass.initComponent.call(this);        
	},
	selectPort:function(port,scope){
		scope.setValue(port.data[scope.valueField || scope.displayField]);
		scope.fireEvent('select', this, port, 0);
	},
	onTriggerClick: function(event){
		var win = new Fos.PortLookWin(this.portType,this.selectPort,this);
		win.show();
	}
});

Ext.reg('portLookup', Fos.PortLookup);

Fos.PortLookWin = function(portType,fn,scope) {	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=PORT_X&_mt=json',baseParams:{},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GPort',id:'id'},GPort),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.baseParams = {};
	if (portType==0){
		store.baseParams.portType=0;
	}
	else if (portType==1){
		store.baseParams.portType=1;
	}
    store.load({params:{start:0,limit:100}});   
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});	
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	       {header:C_COUN,dataIndex: 'counCode',
			editor:new Ext.form.ComboBox({displayField:'counCode',valueField:'counCode',triggerAction: 'all',
			tpl:counTpl,itemSelector:'div.list-item',listWidth:300,mode:'local',selectOnFocus:true,
			listClass:'x-combo-list-small',store:HTStore.getCOUN_S()})},
	       {header:C_CODE,dataIndex: 'portCode',editor:new Ext.form.TextField({})},
	       {header:C_ENAME,dataIndex: 'portNameEn',editor:new Ext.form.TextField({})},
	       {header:C_CNAME,dataIndex: 'portNameCn',editor:new Ext.form.TextField({})}
	],defaults:{sortable:true,width:100}});
	
	var ts=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],data:[
		['portCode',C_CODE],['portNameEn',C_ENAME],['portNameCn',C_CNAME],['counCode',C_COUN_CODE]]});
	var st = new Ext.form.ComboBox({width:80,store:ts,value:'portNameEn',displayField:'NAME',
		valueField:'CODE',typeAhead:true,mode:'local',forceSelection: true,triggerAction:'all',selectOnFocus:true});
	var kw = new Ext.form.TextField();
	this.search=function(){
		var t=st.getValue();var k=kw.getValue();
		if(!t||!k){XMG.alert(SYS,M_NO_QUERY_P);return;};
     	var a=[];
     	a[0]={key:t,value:k,op:7};
     	a[1]={key:'portType',value:portType,op:1};
     	store.baseParams={_mt:'json',xml:HTUtil.QATJ(a)};
     	store.reload({params:{start:0,limit:100}});
	};
			
	this.sel = function(){
		//当确实选择了一项数据时，执行传入的函数参数，并关闭窗口
		if(sm.getSelected()){
			fn(sm.getSelected(),scope);
			this.close();
		}
		else{ 
			Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
		}
	};
	
	this.addPort=function(){
		var p = new GPort({uuid:HTUtil.UUID(32),
			portCode:'',portNameEn:'',portNameCn:'',counCode:'CN',portType:portType,
			active:1,version:'0',rowAction:'N'});
    	grid.stopEditing();
    	store.insert(0,p);
    	grid.startEditing(0, 1);
	};
	this.delPort=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.savePort = function(){
		HTUtil.POST(store,'GPort',GPort,'PORT_S');
	};
	
	var grid = new Ext.grid.EditorGridPanel({store:store,sm:sm,cm:cm,clicksToEdit:1,
		bbar:PTB(store,100),
		tbar:[st,kw,{text:C_SEARCH,iconCls:'search',scope:this,handler:this.search},'-',
		{text:C_ADD,disabled:NR(M1_GEN+G_PORT),iconCls:'add',scope:this,handler:this.addPort},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_PORT),iconCls:'remove',scope:this,handler:this.delPort},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_PORT),iconCls:'save',scope:this,handler:this.savePort}]
	});
    Fos.PortLookWin.superclass.constructor.call(this,{title:C_PORT_SEL,width:600,height:400,
    	layout:'fit',modal:true,items:grid,
    	buttons:[{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
    	         {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]}); 
};
Ext.extend(Fos.PortLookWin,Ext.Window);

Fos.VesselLookup = Ext.extend(Ext.form.ComboBox, {
	triggerClass:'x-form-search-trigger',
	constructor: function(config){
		Fos.VesselLookup.superclass.constructor.apply(this, arguments);
	},
	initComponent : function(){
		Fos.VesselLookup.superclass.initComponent.call(this);        
	},
	selectVessel:function(vessel,scope){
		scope.setValue(vessel.data[scope.valueField || scope.displayField]);
		scope.fireEvent('select', this, vessel, 0);
	},
	onTriggerClick: function(event){
		var win = new Fos.VesselLookWin(this.selectVessel,this);
		win.show();
	}
});

Ext.reg('vesselLookup', Fos.VesselLookup);

Fos.VesselLookWin = function(fn,scope) {	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'VESS_X',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GVessel',id:'id'},GVessel),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	store.load({params:{start:0, limit:100}});
	var kw = new Ext.form.TextField();
	this.search=function(){
		var k=kw.getValue();
		if(!k){
			XMG.alert(SYS,M_NO_QUERY_P);return;
		};
     	var a=[];
     	a[0]={key:'vessNameEn',value:k,op:7};
     	store.baseParams={_A:'VESS_X',_mt:'json',xml:Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(a)))};
     	store.reload({params:{start:0,limit:100}});
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_ENAME,dataIndex: 'vessNameEn'},
		{header:C_CNAME,dataIndex: 'vessNameCn'},
		{header:C_VESS_TYPE,dataIndex: 'vessType',renderer:HTStore.getVETY},
        {header:C_CARRIER,dataIndex: 'vessLiner'},
        {header:C_REMARKS,dataIndex: 'vessDesc'},
		{header:C_COUN,dataIndex: 'counCode'},		
		{header:C_VESS_CALL,dataIndex: 'vessCode'}],defaults:{sortable:false,width:100}});	
	var grid = new Ext.grid.GridPanel({store: store,sm:sm,cm:cm,
		listeners:{scope:this,rowdblclick:function(g,r,e){
			fn(sm.getSelected(),scope);
			this.close();
		}
		},
		bbar:PTB(store,100),
		tbar:[kw,{text:C_SEARCH,iconCls:'search',scope:this,handler:this.search}]
	});
    Fos.VesselLookWin.superclass.constructor.call(this,{title:C_VESSEL_SEL,width:600,height:400,
    	layout:'fit',modal:true,items:grid}); 
};
Ext.extend(Fos.VesselLookWin,Ext.Window);

Fos.MarineTypeLookup = function() {	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'MARINE_TYPE_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GMarineType',id:'id'},GMarineType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:10}});   
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});	
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	       {header:M_MARINE_TYPE,dataIndex:'marineTypeName',editor:new Ext.form.TextField({})},
	       {header:C_REMARKS,dataIndex:'remarks',editor:new Ext.form.TextField({})}
	],defaults:{sortable:true,width:100}});
			
	this.addMarineType=function(){
		var p = new GMarineType({uuid:HTUtil.UUID(32),
			marineTypeName:'',remarks:'',version:'0',rowAction:'N'});
    	grid.stopEditing();
    	store.insert(0,p);
    	grid.startEditing(0, 1);
	};
	this.delMarineType=function(){
		HTUtil.REMOVE_SM(sm,store);
	};
	this.saveMarineType = function(){
		HTUtil.POST(store,'GMarineType',GMarineType,'MARINE_TYPE_S');
	};
	this.closePanel = function(){
		this.ownerCt.close();
	}
	var grid = new Ext.grid.EditorGridPanel({store:store,sm:sm,cm:cm,clicksToEdit:1,
		bbar:PTB(store,100),
		tbar:[
		{text:C_ADD,disabled:NR(M1_GEN+G_PORT),iconCls:'add',scope:this,handler:this.addMarineType},'-',
        {text:C_REMOVE,disabled:NR(M1_GEN+G_PORT),iconCls:'remove',scope:this,handler:this.delMarineType},'-', 
        {text:C_SAVE,disabled:NR(M1_GEN+G_PORT),iconCls:'save',scope:this,handler:this.saveMarineType}]
	});
    Fos.MarineTypeLookup.superclass.constructor.call(this,{width:300,height:300,
    	layout:'fit',modal:true,items:grid,
    	buttons:[{text:M_CLOSE,iconCls:'cancel',scope:this,handler:this.closePanel}]}); 
};
Ext.extend(Fos.MarineTypeLookup,Ext.Panel);
