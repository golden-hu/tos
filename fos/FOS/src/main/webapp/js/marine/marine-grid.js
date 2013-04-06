var getMarinePanel = function(){
	var panel=new Ext.TabPanel({region:"center",
		enableTabScroll:true ,
		animScroll:true,
		plugins: new Ext.ux.TabCloseMenu(),
		activeTab:0,items: []});
	
	var items=[];
	//进口整箱
	if(HR(M1_MARINE+MARINE_I_FCL))
		items[items.length]=FosMenu(panel,C_IMP_F,'MARINE_I_FCL',function(){return new Fos.ConsignGrid('I','M','FCL');});
	//进口分拨
	if(HR(M1_MARINE+MARINE_I_FCL))
		items[items.length]=FosMenu(panel,C_IMP_L,'MARINE_I_M_LCL',function(){return new Fos.ConsignGrid('I','M','LCL');});
	//出口整箱
	if(HR(M1_MARINE+MARINE_I_FCL))
		items[items.length]=FosMenu(panel,C_EXP_F,'MARINE_E_M_FCL',function(){return new Fos.ConsignGrid('E','M','FCL');});
	//出口拼箱
	if(HR(M1_MARINE+MARINE_I_FCL))
		items[items.length]=FosMenu(panel,C_EXP_L,'MARINE_E_M_LCL',function(){return new Fos.ConsignGrid('E','M','LCL');});
	
	//集装箱管理
	var contPanel=new Ext.Panel({title:C_CONT,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style:{border:'0px',background:'transparent'},items:items}),
		iconCls:'user'});
		
	items = [];
	//散货进口
	if(HR(M1_MARINE+MARINE_I_BULK))
		items[items.length]=FosMenu(panel,C_IMP_BULK,'MARINE_I_B',function(){return new Fos.ConsignGrid();});
	//散货出口
	if(HR(M1_MARINE+MARINE_E_BULK))
		items[items.length]=FosMenu(panel,C_EXP_BULK,'MARINE_E_B',function(){return new Fos.ConsignGrid();});
	
	//散货管理
	var bulkPanel=new Ext.Panel({title:C_BULK,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style:{border:'0px',background:'transparent'},items:items}),
		iconCls:'user'});
	
	items = [];
	if(HR(M1_MARINE+M2_DOC)){
		items[items.length]=FosMenu(panel,C_DOC_ALL,'G_DOC_A',function(){return new Fos.DocGrid('A');});
		items[items.length]=FosMenu(panel,C_DOC_NOT_RETURN,'G_DOC_B',function(){return new Fos.DocGrid('B');});
		items[items.length]=FosMenu(panel,C_DOC_RETURN_NOT_BACK,'G_DOC_C',function(){return new Fos.DocGrid('C');});
		items[items.length]=FosMenu(panel,C_DOC_BACK,'G_DOC_D',function(){return new Fos.DocGrid('D');});
	}
	//单证管理
	var docPanel=new Ext.Panel({title:C_DOC,collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style:{border:'0px',background:'transparent'},items:items}),
		iconCls:'user'});
	var menuPanel = new Ext.Panel({region:"west",width:'12%',collapsible:true,layout:'accordion',split:true,
		items:[contPanel,bulkPanel,docPanel]});

	var marinePanel=new Ext.Panel({layout:"border",border:false,items:[menuPanel,panel]});
	return marinePanel;
};


Fos.ConsignGrid = function(bizClass,bizType,shipType) {
	var queryParams=[];	
	queryParams[queryParams.length]=new QParam({key:'consBizClass',value:bizClass,op:1});
	queryParams[queryParams.length]=new QParam({key:'consBizType',value:bizType,op:1});
	if(shipType!='') 
		queryParams[queryParams.length]=new QParam({key:'consShipType',value:shipType,op:1});
	var bp={_mt:'xml',xml:HTUtil.QATX(queryParams)};
	var store = new Ext.data.Store({
   		url: SERVICE_URL + '?_A=CONS_X',baseParams:bp,
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'FConsign',id:'id'}, FConsign),
    	remoteSort:true,sortInfo:{field:'id', direction:'DESC'}});
			
	var sm=new Ext.grid.RowSelectionModel({singleSelect:true});
	var c1=new Ext.grid.RowNumberer();
	var c2={header:'',dataIndex:'consStatusLock',menuDisabled:true,fixed:true,width:25,renderer:function(v){
               if(v==1) return '<div class="locked"></div>'; else return '';
         }};
    var c3={header:C_CONS_NO,width:120,dataIndex:"consNo"};
    var c4={header:C_BOOKER,width:200,dataIndex:"custName"};
    var c5={header:C_OPERATOR,width:80,dataIndex:"consOperatorName"};    
    var c6={header:C_CONS_DATE,width:100,dataIndex:"consDate",renderer:formatDate};
    var c7={header:C_TTER,dataIndex:"tranCode",width:100};
    var c8={header:C_PATE,dataIndex:"pateCode",width:100};
    var c9={header:C_VESS,width:100,dataIndex:"vessName"};
    var c10={header:C_VOYA,width:80,dataIndex:"voyaName"};
    var c11={header:C_SAIL_DATE,dataIndex:"consSailDate",renderer:formatDate};
    var c12={header:C_POL,dataIndex:"consPolEn"};
    var c13={header:C_POD,width:100,dataIndex:"consPodEn"};
    var c14={header:C_MBL_NO,width:100,dataIndex:"consMblNo"};
    var c15={header:C_HBL_NO,width:100,dataIndex:"consHblNo"};
    var c16={header:C_PACKAGES,width:80,dataIndex:"consTotalPackages",align:'right',css:'font-weight:bold;'};
    var c17={header:C_GW_S+C_KGS,width:100,dataIndex:"consTotalGrossWeight",renderer:rateRender,align:'right',css:'font-weight:bold;'};
    var c18={header:C_CBM,width:100,dataIndex:"consTotalMeasurement",renderer:rateRender,align:'right',css:'font-weight:bold;'};
    
    var c19={header:C_CONT_INFO,width:80,dataIndex:"consContainersInfo"};
    var c20={header:C_CARRIER,dataIndex:"consCarrierName"};
    var c21={header:C_BOOK_AGENCY,width:120,dataIndex:"consBookingAgencyName"};
    var c22={header:C_REMARKS,dataIndex:"consRemarks"};
    var c23={header:C_CONTRACT_NO,dataIndex:"consContractNo"};
    var c24={header:C_CARGO_OWNER,width:200,dataIndex:"consCargoOwnerName"};
    var cm=new Ext.grid.ColumnModel({columns:
    	[c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23,c24],
		defaults: {sortable: true}});
    var newConsign = function(){
    	var c = new FConsign({uuid:HTUtil.UUID(32),
    		consNotifyParty:'SAME AS CONSIGNEE',
    		consSource:0,
    		consDate:new Date(),
    		consBizType:bizType,
    		consBizClass:bizClass,
    		consShipType:shipType,
    		consStatus:0,consStatusExp:0,consStatusAr:0,consStatusAp:0,
    		consStatusInvoR:0,consStatusInvoP:0,consStatusAud:0,consStatusLock:0,    				
    		consTransFlag:0,consPartialFlag:0,
    		consPol:HTStore.getCFG('BASE_PORT'),
    		consPolEn:HTStore.getCFGD('BASE_PORT'),
    		consPod:HTStore.getCFG('BASE_PORT'),
    		consPodEn:HTStore.getCFGD('BASE_PORT'),
    		consOperatorId:sessionStorage.getItem("USER_ID"),
    		consOperatorName:sessionStorage.getItem("USER_NAME"),
    		consSalesRepId:sessionStorage.getItem("USER_ID"),
    		consSalesRepName:sessionStorage.getItem("USER_NAME"),
    		consSendSingleAddress:HTStore.getCFG('COMPANY_ADDRESS_CN'),
    		version:0,rowAction:'N'});
    	return c;
    };
    
    this.showConsign = function(p){
    	createWindow('CONS_'+p.get("uuid"),p.get('rowAction')=='N'?C_ADD_CONSIGN:C_CONSIGN+'-'+p.get('consNo'),new Fos.MarineTab(p,store),true);
    };
    
	this.consolidate = function(){
		var c=sm.getSelected();
		if(c.get('consMasterFlag')=='1'){
			var b=newConsign(bizClass,bizType,shipType);
			b.set('consMasterFlag','0');
			b.set('consMasterId',c.get('id'));
			b.set('consMasterNo',c.get('consNo'));
			b.set('vessName',c.get('vessName'));
			b.set('vessNameEn',c.get('vessNameEn'));
			b.set('voyaName',c.get('voyaName'));
			b.set('consPolEn',c.get('consPolEn'));
			b.set('consPodEn',c.get('consPodEn'));
			b.set('consPotEn',c.get('consPotEn'));
			b.set('consTranCountry',c.get('consTranCountry'));
			b.set('consTradeCountry',c.get('consTradeCountry'));
			b.set('consOverseaAgency',c.get('consOverseaAgency'));			
			b.set('consOverseaAgencyName',c.get('consOverseaAgencyName'));
			b.set('consHarbour',c.get('consHarbour'));
			b.set('consCfs',c.get('consCfs'));
			b.set('consCfsName',c.get('consCfsName'));
			b.set('consBookingAgency',c.get('consBookingAgency'));
			b.set('consBookingAgencyName',c.get('consBookingAgencyName'));
			b.set('consCarrier',c.get('consCarrier'));
			b.set('consCarrierName',c.get('consCarrierName'));
			this.showConsign(b);
		}
		else XMG.alert(SYS,M_SEL_M_CONS);
	};
	this.addConsign = function(){
		var c=newConsign();
		this.showConsign(c);
	};
	this.editConsign = function(){
		var b=sm.getSelected();
		if(b) 
			this.showConsign(b); 
		else 
			XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	this.task = function(){ 
		var b=sm.getSelected();
		if(b){var w=new Fos.TaskWin(b);w.show();}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};	
	this.removeConsign = function(){
		var a =sm.getSelections();
       	if(a.length){
       		XMG.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){
           		var xml = HTUtil.SMTX4R(sm,'FConsign');
           		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'CONS_S'},
				success: function(){
           			sm.each(function(p){
           				store.remove(p);
           			});
           			XMG.alert(SYS,M_S);
           		},
				failure: function(r,o){
           			XMG.alert(SYS,M_F+r.responseText);
           		},
				xmlData:HTUtil.HTX(xml)});
           	}
           });
		}
       	else XMG.alert(SYS,M_R_P);
    };
	this.search = function(){
		var win = new Fos.MarineLookupWin(store,'M');
		win.show();
	};
	
	var kw = new Ext.form.TextField({listeners:{scope:this,
		specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) 
				this.fastSearch();
			}
		}
	});
	this.fastSearch=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,M_INPUT_BIZ_NO,function(b){kw.focus();});
			return;
		};
     	var a=[];
     	a[a.length]=new QParam({key:'consBizClass',value:bizClass,op:EQ});
     	a[a.length]=new QParam({key:'consBizType',value:bizType,op:EQ});
     	if(shipType!='') 
     		a[a.length]=new QParam({key:'consShipType',value:shipType,op:EQ});
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
		else
 			a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
     	queryParams = a;
     	store.baseParams={_mt:'xml',xml:HTUtil.QATX(a)};
     	store.reload({params:{start:0,limit:C_PS},callback:function(r){
     		if(r.length==0) 
     			XMG.alert(SYS,M_NOT_FOUND);
     		}
     	});
	};
	this.exp=function(){
		if(store.baseParams.xml)
			EXPC('CONS_LIST','&sort=id&dir=ASC&xml=' + store.baseParams.xml);
		else
			EXPC('CONS_LIST','&sort=id&dir=ASC');
		
	};
  	var title=HTStore.getBT(bizType);
  		title+=HTStore.getBC(bizClass);
	if(bizClass==BC_I&&shipType=='LCL') 
		title+=C_SWITCH; 
	else 
		title+=HTStore.getSHTY(shipType);
		title+=C_CONS_LIST;
	
	var m=M3_CONS;
	
	var b1={text:C_ADD,disabled:false,iconCls:'add',scope:this,handler:this.addConsign};
	var b2={text:C_CONSOLIDATE,disabled:NR(m+F_M),iconCls:'add',scope:this,handler:this.consolidate};
	var b3={text:C_EDIT,disabled:NR(m+F_V),iconCls:'option',scope:this,handler:this.editConsign};
	var b4={text:C_REMOVE,disabled:NR(m+F_M),iconCls:'remove',scope:this,handler:this.removeConsign};
	var b5={text:C_SEARCH,iconCls:'search',scope:this,handler:this.search};	
	var b6={text:C_EXPORT,disabled:NR(m+F_M),iconCls:'print',scope:this,handler:this.exp};	
	var b8={text:C_FAST_SEARCH,iconCls:'search',scope:this,handler:this.fastSearch};
	var b10={text:C_TASK,iconCls:'task',scope:this,handler:this.task};	
	
    var tbs=[b1, '-',b3,'-',b4,'-',b5,'-',b6,'-',kw,b8,'-',b10,'-'];
    
	Fos.ConsignGrid.superclass.constructor.call(this, {
	    id:'MARINE_'+bizClass+'_'+bizType+(shipType==''?'':'_'+shipType),iconCls:'grid',
	    store: store,title:title,header:false,loadMask:true,
		sm:sm,cm:cm,stripeRows:true,closable:true,
		listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var c=sm.getSelected();
				if(c){this.showConsign(c);
				}
			}	
		},
		tbar:tbs,bbar:PTB(store,C_PS20)});
	    store.load({params:{start:0,limit:C_PS20}
    });
};
Ext.extend(Fos.ConsignGrid, Ext.grid.GridPanel);


Fos.MarineLookupWin = function(store,bizType){
	var cboCustId = {fieldLabel:C_BOOKER,name:'custId',store:HTStore.getCS(),
	    			xtype:'combo',custType:'custBookerFlag',bizType:'M',
	        		displayField:'custCode',valueField:'id',typeAhead:true,enableKeyEvents:true,
	        		mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,triggerAction:'all',selectOnFocus:true,anchor:'90%',
	              	listeners:{scope:this,
	              		keydown:{fn:function(f,e){
	              		loadCustomer(f,e,'custBookerFlag','M',1);
	              	},buffer:500}}};  		
	var cboOperatorId = {fieldLabel:C_OPERATOR,name:'consOperatorId',store:HTStore.getOP_S(),xtype:'combo',
	        			displayField:'userName',valueField:'id',typeAhead: true,mode: 'remote',
	        			triggerAction: 'all',selectOnFocus:true,anchor:'90%'};
	var cboConsSalesRepId = {fieldLabel:C_SALES,name:'consSalesRepId',store:HTStore.getSALE_S(),xtype:'combo',
              				displayField:'userName',valueField:'id',typeAhead: true,
              				mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'90%'};
	var cboConsStatusAud = {fieldLabel:C_CONS_AUDIT_STATUS,name:'consStatusAud',xtype:'combo',
	         				store:HTStore.AUST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
	         				mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'};
	var cboConsStatusAr = {fieldLabel:C_WRITEOFF_STATUS_R,name:'consStatusAr',xtype:'combo',
	         				store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
	         				mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'};
	var cboConsStatusAp = {fieldLabel:C_WRITEOFF_STATUS_P,name:'consStatusAp',xtype:'combo',
							store:HTStore.WRST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
							mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'};
	var dtConsDate = {fieldLabel:C_CONS_DATE,name:'consDate',xtype:'datefield',format:DATEF,anchor:'90%'};
	var dtConsDate2 = {fieldLabel:C_TO,name:'consDate2',xtype:'datefield',format:DATEF,anchor:'90%'};
	var cboConsCarrier = {fieldLabel:C_CARRIER,name:'consCarrier',store:HTStore.getCS(),enableKeyEvents:true,
	        				tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	        				xtype:'combo',custType:'custCarrierFlag',bizType:'M',
	        				displayField:'custCode',valueField:'id',typeAhead: true,mode: 'local',
	        				triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	        				listeners:{scope:this,keydown:{fn:function(f,e){
	        				loadCustomer(f,e,'custCarrierFlag','M',1);},buffer:500}}};  	
	var cboConsOverseaAgency = {fieldLabel:C_OVERSEA_AGENCY,name:'consOverseaAgency',store:HTStore.getCS(),
								enableKeyEvents:true,tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	        					xtype:'combo',custType:'custOverseaAgencyFlag',bizType:'M',
	        					displayField:'custCode',valueField:'id',typeAhead: true,mode: 'local',
	        					triggerAction: 'all',selectOnFocus:true,anchor:'90%',
	        					listeners:{scope:this,
	        						keydown:{fn:function(f,e){
	        							loadCustomer(f,e,'custOverseaAgencyFlag','M',1);},buffer:500}}};
	var cboConsBookingAgency = {fieldLabel:C_BOOK_AGENCY,name:'consBookingAgency',store:HTStore.getCS(),
			              		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,xtype:'combo',
			              		displayField:'custCode',valueField:'id',bizType:'M',custType:'custBookingAgencyFlag',
			              		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,
			              		anchor:'90%',enableKeyEvents:true,
			              		listeners:{scope:this,
				         			keydown:{fn:function(f,e){
				         				loadCustomer(f,e,'custBookingAgencyFlag','M',1);
				         			},buffer:500}}};
	var cboConsStatusInvoR = {fieldLabel:C_INVO_STATUS_R,name:'consStatusInvoR',xtype:'combo',
								store:HTStore.INST_S,displayField:'NAME',valueField:'CODE',typeAhead: true,
								mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'90%'};
	var cboConsStatusInvoP = {fieldLabel:C_INVO_STATUS_P,name:'consStatusInvoP',xtype:'combo',store:HTStore.INST_S,
	       						displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',
	       						triggerAction:'all',selectOnFocus:true,anchor:'90%'};	
	       						
	var txtConsMblNo = {fieldLabel:C_MBL_NO,name:'consMblNo',xtype:'textfield',anchor:'90%'};	
	var txtConsHblNo = {fieldLabel:C_HBL_NO,name:'consHblNo',xtype:'textfield',anchor:'90%'};	
	
	var cboVessName = {fieldLabel:C_VESS,name:'vessName',xtype:'combo',store:HTStore.getVES(),enableKeyEvents:true,
								displayField:'vessNameEn',valueField:'vessNameEn',typeAhead:true,
								mode:'remote',tpl:vessTpl,itemSelector:'div.list-item',listWidth:400,
								triggerAction:'all',selectOnFocus:true,anchor:'90%'};
	var txtVoyaName = {fieldLabel:C_VOYA,name:'voyaName',xtype:'textfield',anchor:'90%'};	 
	
	var marineType = {fieldLabel:M_MARINE_TYPE,name:'consStatus',store:HTStore_M.MARINE_TYPE_S,
		displayField:'NAME',valueField:'CODE',anchor:'95%',xtype:'combo',anchor:'90%',
		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus: true}
	this.reload=function(){
     	var a=[];var op=1;
     	var consMblNo=this.find('name','consMblNo')[0].getValue();
     	var consHblNo=this.find('name','consHblNo')[0].getValue();
     	var vessName=this.find('name','vessName')[0].getValue();
     	var voyaId=this.find('name','voyaName')[0].getValue();
     	var custId=this.find('name','custId')[0].getValue();
     	var consSalesRepId=this.find('name','consSalesRepId')[0].getValue();
     	var consStatusAud=this.find('name','consStatusAud')[0].getValue();
     	var consStatusAr=this.find('name','consStatusAr')[0].getValue();  
     	var consStatusAp=this.find('name','consStatusAp')[0].getValue(); 
     	var consStatusInvoR=this.find('name','consStatusInvoR')[0].getValue();
     	var consStatusInvoP=this.find('name','consStatusInvoP')[0].getValue();  
     	var consDate=this.find('name','consDate')[0].getValue();
     	var consDate2=this.find('name','consDate2')[0].getValue();
     	var consOperatorId=this.find('name','consOperatorId')[0].getValue(); 
     	var consCarrier=this.find('name','consCarrier')[0].getValue();  
     	var consOverseaAgency=this.find('name','consOverseaAgency')[0].getValue();  
     	var consBookingAgency=this.find('name','consBookingAgency')[0].getValue();   
     	var marineType = this.find('name','consStatus')[0].getValue();
     	if(bizType!=''){
     		a[a.length]=new QParam({key:'consBizType',value:bizType,op:1});
		}
     	if(consMblNo){
     		a[a.length]=new QParam({key:'consMblNo',value:consMblNo,op:op});
     	}
     	if(consHblNo){
     		a[a.length]=new QParam({key:'consHblNo',value:consHblNo,op:op});
     	}
     	if(vessName) {
     			a[a.length]=new QParam({key:'vessName',value:vessName,op:LI});
     	}
     	if(voyaId) {
     			a[a.length]=new QParam({key:'voyaName',value:voyaId,op:op});
     	}
     	if(custId) {
     			a[a.length]=new QParam({key:'custId',value:custId,op:op});
     	}
     	if(consSalesRepId) {
     			a[a.length]=new QParam({key:'consSalesRepId',value:consSalesRepId,op:op});
     	}
     	if(consStatusAud) {
     			a[a.length]=new QParam({key:'consStatusAud',value:consStatusAud,op:op});
     	}
     	if(consStatusAr) {
     			a[a.length]=new QParam({key:'consStatusAr',value:consStatusAr,op:op});
     	}
     	if(consStatusAp) {
     			a[a.length]=new QParam({key:'consStatusAp',value:consStatusAp,op:op});
     	}
     	if(consStatusInvoR) {
     			a[a.length]=new QParam({key:'consStatusInvoR',value:consStatusInvoR,op:op});
     	}
     	if(consStatusInvoP) {
     			a[a.length]=new QParam({key:'consStatusInvoP',value:consStatusInvoP,op:op});
     	}
     	if(consDate && consDate2){
     			a[a.length]=new QParam({key:'consDate',value:consDate.format(DATEF),op:5});
     			a[a.length]=new QParam({key:'consDate',value:consDate2.format(DATEF),op:3});
     	}
     	else if(consDate) {
     			a[a.length]=new QParam({key:'consDate',value:consDate,op:op});
     	}
     	if(consOperatorId) {
     			a[a.length]=new QParam({key:'consOperatorId',value:consOperatorId,op:op});
     	}
     	if(consCarrier) {
     			a[a.length]=new QParam({key:'consCarrier',value:consCarrier,op:op});
     	}
     	if(consOverseaAgency) {
     			a[a.length]=new QParam({key:'consOverseaAgency',value:consOverseaAgency,op:op});
     	}
     	if(consBookingAgency) {
     			a[a.length]= new QParam({key:'consBookingAgency',value:consBookingAgency,op:op});
     	}
     	if(marineType){
     			a[a.length]= new QParam({key:'consBizClass',value:marineType,op:op});
     	}
     	store.baseParams={_mt:'xml',xml:HTUtil.QATX(a)};
     	store.reload({params:{start:0,limit:C_PS20},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});this.close();
	};
	var queryPanel =  new Ext.form.FormPanel({padding:5,
	layout:'column',layoutConfig:{columns:3},frame:false,header:false,
		border:false,autoScroll:true,labelWidth:100,labelAlign:'right',items:[
		{columnWidth:.33,layout:'form',border:false,
				items:[cboCustId,cboConsStatusAud,dtConsDate,cboConsOverseaAgency,cboConsStatusInvoP,cboVessName]
		},
		{columnWidth:.33,layout:'form',border:false,
				items:[cboOperatorId,cboConsStatusAr,dtConsDate2,cboConsBookingAgency,txtConsMblNo,txtVoyaName]
		},
		{columnWidth:.34,layout:'form',border:false,
				items:[cboConsSalesRepId,cboConsStatusAp,cboConsCarrier,cboConsStatusInvoR,txtConsHblNo,marineType]
		}]
	});
	Fos.MarineLookupWin.superclass.constructor.call(this,{title:C_CONS_QUERY,
		iconCls:'search',modal:true,width:800,height:240,minWidth:600,
        minHeight:240,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',
        buttons:[{text:C_OK,scope:this,handler:this.reload},{text:C_CANCEL,scope:this,handler:this.close}],
        items:[queryPanel]
	});
};
Ext.extend(Fos.MarineLookupWin,Ext.Window);