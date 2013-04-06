//Inspection
Fos.InspGrid = function(bizClass,consign) {	
	var store = new Ext.data.GroupingStore({url:SERVICE_URL+'?_A=INSP_X',baseParams:{_mt:'xml',consBizClass:bizClass},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'FInspection',idProperty:'id'},FInspection),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}
	});
	if(Ext.isEmpty(consign))
		store.load({params:{start:0,limit:C_PS}});
	else
		store.load({params:{oriConsId:consign.get('id')}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,	
	{header:C_STATUS,dataIndex:'inspStatus',renderer:HTStore.getINSPST,width:100},
	{header:C_CONS_NO,dataIndex:'consNo',width:100},	
	{header:C_CONS_DATE,dataIndex:'consDate',renderer:formatDate,width:100},
	{header:C_BOOKER,dataIndex:'custName',width:100},
	{header:C_CARGO_NAME,dataIndex:'cargoName',width:150},	
	{header:C_INSP_AGENCY,dataIndex:'inspVendorName',width:150},
	{header:C_INSP_DATE,dataIndex:'inspDate',renderer:formatDate,width:100},
	{header:C_DEPT,dataIndex:'grouName',width:150},
	{header:C_SALES,dataIndex:'salesRepName',width:150}
	],defaults:{sortable:true,width:100}});
	
	this.showInsp = function(p){
    	createWindow('INSP'+p.get("uuid"),
    			p.get('rowAction')=='N'?C_ADD_INSP_CONS:C_INSP_CONS+'-'+p.get('consNo'),
    			new Fos.InspTab(p),true);
    };
    
	this.add=function(){
		var r = new FInspection({uuid:HTUtil.UUID(32),rowAction:'N',consBizType:BT_I,
			consBizClass:bizClass,consDate:new Date(),operatorId:sessionStorage.getItem("USER_ID"),
    		operatorName:sessionStorage.getItem("USER_NAME"),inspStatus:0}); 
		this.showInsp(r);
	};
	this.addByConsign = function(){
		var r = new FInspection({oriConsId:consign.get('id'),
			oriConsNo:consign.get('consNo'),
			consDate:consign.get('consDate'),
			consBizType:BT_I,
			consBizClass:consign.get('consBizClass'),
			custId:consign.get('custId'),
			custName:consign.get('custName'),
			custSName:consign.get('custSName'),
			custContact:consign.get('custContact'),
			custTel:consign.get('custTel'),
			custFax:consign.get('custFax'),
			grouId:consign.get('grouId'),
			grouName:consign.get('grouName'),
			salesRepId:consign.get('salesRepId'),
			salesRepName:consign.get('salesRepName'),
			operatorId:consign.get("USER_ID"),
			operatorName:consign.get("USER_NAME"),
			inspDate:consign.get("inspDate"),
			inspShipperEn:consign.get('consShipper'),
			inspConsigneeEn:consign.get('consConsignee'),		
			/*cargoName:consign.get('consCargoDesc'),*/
			inspCargoName:consign.get('consCargoDesc'),
			inspNum:consign.get('consCargoGrossWeight'),
			inspPackages:consign.get('consCargoPackages'),
			inspConveyance:consign.get('vessName')+' '+consign.get('voyaName'),
			inspContractNo:consign.get('consTradeContractNo'),
			inspShippingDate:consign.get('consLoadDate'),
			inspTradeCountry:consign.get('consTradeCountry'),
			inspPol:consign.get('consPolEn'),
			inspPod:consign.get('consPodEn'),
			inspContainerInfo:consign.get('consContainerInfo'),
			inspMarks:consign.get('consCargoMarks'),
			inspStatus:0,				
			rowAction:'N',
			version:'0',uuid:HTUtil.UUID(32)});  
		this.showInsp(r);
	};
	
	this.del=function(){
		var b =sm.getSelected();
		if(b){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'FInspection');
	        		HTUtil.REQUEST('INSP_S', xml, function(){store.remove(b);});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showInsp(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	var kw = new Ext.form.TextField({listeners:{scope:this,
		specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) 
				this.search();
			}
		}
	});
	this.search=function(){
		var consNo=kw.getValue();
		if(!consNo){
			XMG.alert(SYS,C_CONS_NO_REQUIRED,function(b){kw.focus();});
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
		else
 			a[a.length]=new QParam({key:'consNo',value:consNo,op:LI});
		 	store.baseParams={_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
			store.reload({params:{start:0,limit:C_PS},callback:function(r){
			if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
     	});
	};
	
	
	
	var bAdd = {text:C_ADD,iconCls:'add',scope:this,handler:this.addByConsign};
	if(Ext.isEmpty(consign))		
		bAdd = {text:C_ADD,iconCls:'add',scope:this,handler:this.add};
	
	Fos.InspGrid.superclass.constructor.call(this,{ 
    id:'G_INSP_'+bizClass,iconCls:'grid',title:(bizClass=='I'?C_IMP:C_EXP)+C_INSP_LIST,header:false,closable:true,	
    store:store,sm:sm,cm:cm,loadMask: true,
    listeners:{scope:this,
		rowdblclick: function(grid, rowIndex, event){
			var p=sm.getSelected();
			if(p){
				this.showInsp(p);
			}
		}},
	bbar:PTB(store,C_PS),
	tbar:[bAdd,'-',
		{text:C_EDIT,iconCls:'option',scope:this,handler:this.edit},'-',
        {text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_CONS_NO,xtype:'tbtext'},
        kw,{text:C_SEARCH,iconCls:'search',handler:this.search}]
    });
};
Ext.extend(Fos.InspGrid, Ext.grid.GridPanel);

Fos.InspTab = function(p) {	
	this.save = function(){
		p.beginEdit();
		//this.getForm().updateRecord(p);
		var f = FInspection.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
		p.endEdit();
		
		if(Ext.isEmpty(p.get('custId'))){
			Ext.Msg.alert(SYS,M_CUST_REQUIRED,function(){
				this.find('name','custName')[0].focus();
			},this);
			return;
		};
		if(Ext.isEmpty(p.get('consDate'))){
			Ext.Msg.alert(SYS,C_CONS_DATE_REQUIRED,function(){
				this.find('name','consDate')[0].focus();},this);return;};
		if(Ext.isEmpty(p.get('grouId'))){
			Ext.Msg.alert(SYS,M_DEPT_REQUIRED,function(){
				this.find('name','grouName')[0].focus();
			},this);return;};	
		if(Ext.isEmpty(p.get('salesRepId'))){
			Ext.Msg.alert(SYS,M_SALES_REQUIRED,function(){
				this.find('name','salesRepName')[0].focus();
			},this);return;};				
		var xml = HTUtil.RTX(p,'FInspection',FInspection);						
		HTUtil.REQUEST('INSP_S', xml, function(r){
			var c = HTUtil.XTR(r.responseXML,'FInspection',FInspection);
			HTUtil.RU(c, p, FInspection);
		});
	};
	this.expExcel=function(){
		if(p.dirty){			
			XMG.alert(SYS,M_DIRTY_PROMPT);return;
		}
		else EXPC('INSP','&id='+p.get('id'));
	};
	this.expEmail=function(){	
		p.beginEdit();
		this.getForm().updateRecord(p);
		p.endEdit();
		if(p.dirty){			
			XMG.alert(SYS,M_DIRTY_PROMPT);return;
		}
		else{
			var to='',cc='',sub='';
			var msg='';
			EXPM(to,cc,sub,msg,'INSP','id='+p.get('id'));
		}
	};	
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'INSP_U',id:p.get('id'),inspStatus:s},
			success: function(r){
				p.set('inspStatus',s);
				this.updateToolBar();
				XMG.alert(SYS,M_S);
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}
		});
	};
	var m=M3_INSP;
    this.updateToolBar=function(){
    	var s=p.get('inspStatus');
    	var tb= this.getTopToolbar();		
		tb.getComponent('TB_D').setDisabled(NR(m+F_M)||s!=0);
		tb.getComponent('TB_E').setDisabled(NR(m+F_M)||s!=1);
		tb.getComponent('TB_M').setText(C_STATUS_C+HTStore.getINSPST(p.get('inspStatus')));
    };    
	var menu=CREATE_E_MENU(C_TRANS_BILL,this.expExcelTR,this.expEmailTR,function(){},this);	
	
	this.showExp = function(){
    	createWindow('EXPE_'+p.get("uuid"),C_CONSIGN+C_EXPE+'-'+p.get('consNo'),
    			new Fos.ExpenseTab(p),true);
    };
    
	var tab = new Ext.TabPanel({height:600,plain:true,activeTab:0,
		listeners:{scope:this,tabchange:function(m,a){a.doLayout();}},
		items:[{title:C_CONS_INFO,layout:'column',frame:true,items:[
		       {columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
				{fieldLabel:C_BOOKER,itemCls:'required',tabIndex:1,
					 name:'custName',value:p.get('custName'),store:HTStore.getCS(),enableKeyEvents:true,
					 xtype:'customerLookup',custType:'custInspectionFlag',bizType:'I',
					 displayField:'custCode',valueField:'custNameCn',typeAhead:true,
					 mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,triggerAction:'all',selectOnFocus:true,
					 anchor:'95%',
					 listeners:{scope:this,
					 	blur:function(f){
					 		if(f.getRawValue()==''){
					 			p.set('custId','');
					 			p.set('custSname','');
					 		}},
					 	select:function(c,r,i){
					 		this.find('name','custContact')[0].setValue(r.get('custContact'));
					 		this.find('name','custTel')[0].setValue(r.get('custTel'));
					 		this.find('name','custFax')[0].setValue(r.get('custFax'));
					 		p.set('custId',r.get('id'));
					 		p.set('custSname',r.get('custSname'));
					 	},
					 	keydown:{fn:function(f,e){
					 		      loadCustomer(f,e,'custInspectionFlag','I',1);},buffer:BF}}},
				{fieldLabel:C_CONS_DATE,itemCls:'required',name:'consDate',value:p.get('consDate'),
					value:p.get('consDate'),tabIndex:5,xtype:'datefield',format:DATEF,anchor:'95%'},		        
				{fieldLabel:C_DOC_RECEIVED_DATE,tabIndex:9,name:'docReceivedDate',value:p.get('docReceivedDate'),
                   	 xtype:'datefield',format:DATEF,anchor:'95%'}
                ]},
                {columnWidth:.25,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
                    {fieldLabel:C_CONTACT,tabIndex:2,name:'custContact',
                    	value:p.get('custContact'),xtype:'textfield',anchor:'95%'},
                    {fieldLabel:C_DEPT,itemCls:'required',tabIndex:6,name:'grouName',
           	        	 value:p.get('grouName'),store:HTStore.getGROU_S(),
           	        	 xtype:'combo',displayField:'grouName',valueField:'grouName',typeAhead: true,mode: 'remote',
           	        	 triggerAction: 'all',selectOnFocus:true,anchor:'95%',
           	        	 listeners:{select:function(c,r,v){
           	        	 	p.set('grouId',r.get('id'));
           	         	}}},
           	        {fieldLabel:C_RECEIVE_DATE,name:'inspReceiveDate',tabIndex:10,
           	         	value:p.get('inspReceiveDate'),xtype:'datefield',format:DATEF,anchor:'95%'}
                ]},
                {columnWidth:.25,layout:'form',labelWidth:100,labelAlign:'right',border:false,items:[
                    {fieldLabel:C_PHONE,tabIndex:3,name:'custTel',
                    	value:p.get('custTel'),xtype:'textfield',anchor:'95%'},
                    {fieldLabel:C_SALES,itemCls:'required',tabIndex:7,name:'salesRepName',value:p.get('salesRepName'),
                       	 store:HTStore.getSALE_S(),xtype:'combo',displayField:'userName',valueField:'userName',
                       	 typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
                       	 listeners:{select:function(c,r,v){
           	        	 	p.set('salesRepId',r.get('id'));
           	         	}}}/*,
                    {fieldLabel:C_CARGO_NAME,tabIndex:11,name:'cargoName',value:p.get('cargoName'),xtype:'textfield',anchor:'95%'}*/
                ]},
                {columnWidth:.25,layout:'form',labelWidth:100,labelAlign:'right',border:false,items:[
                     {fieldLabel:C_FAX,tabIndex:4,name:'custFax',
                    	 value:p.get('custFax'),xtype:'textfield',anchor:'95%'},
                     {fieldLabel:C_OPERATOR,itemCls:'required',tabIndex:8,name:'operatorName',
                           	 value:p.get('operatorName'),
                           	 store:HTStore.getOP_S(),xtype:'combo',displayField:'userName',valueField:'userName',
                           	 typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
                           	 listeners:{select:function(c,r,v){
               	        	 	p.set('operatorId',r.get('id'));
               	         	}}}/*,
                     {fieldLabel:'HS code',tabIndex:12,name:'inspHsNo',value:p.get('inspHsNo'),xtype:'textfield',anchor:'95%'}*/                        
                 ]},
                 {columnWidth:.6,layout:'form',labelWidth:90,labelAlign:'right',border:false,items:[
                  	{fieldLabel:C_INSP_REQUIREMENT,tabIndex:17,name:'inspRequirement',value:p.get('inspRequirement'),
                  		xtype:'textarea',height:150,anchor:'99%'},
                    {fieldLabel:C_REMARKS,tabIndex:18,name:'remarks',value:p.get('remarks'),
                  		xtype:'textarea',height:150,anchor:'99%'}                                             
                  ]},
                 {columnWidth:.2,layout:'form',labelWidth:10,title:C_RECEIVED_DOCS,frame:true,items:[
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_CONTRACT,tabIndex:20,
                    	 name:'contractReceived',checked:p.get('contractReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_CREDIT_BILL,tabIndex:21,
                         name:'creditReceived',checked:p.get('creditReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_INVOICE,tabIndex:22,
                      	name:'invoiceReceived',checked:p.get('invoiceReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_TRAFFIC_BILL,tabIndex:23,
                        name:'blReceived',checked:p.get('blReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_CONTAINER_PACKING_LIST,tabIndex:24,
                      	name:'packingListReceived',checked:p.get('packingListReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_FACTORY_INSP,tabIndex:25,
                        name:'factoryInspReceived',checked:p.get('factoryInspReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_PACKAGES_INSP,tabIndex:26,
                        name:'packagesInspReceived',checked:p.get('packagesInspReceived')=='1'},
                    {xtype:'checkbox',labelSeparator:'',boxLabel:C_CERTIFICATE_DOC,tabIndex:27,
                        name:'licenceReceived',checked:p.get('licenceReceived')=='1'}
                 ]},
                 {columnWidth:.2,layout:'form',labelWidth:10,title:C_REQUIRED_DOCS,frame:true,items:[
                      {xtype:'checkbox',labelSeparator:'',boxLabel:C_INSP_QUALITY,tabIndex:28,
                      	 name:'qualityRequired',checked:p.get('qualityRequired')=='1'},
                      {xtype:'checkbox',labelSeparator:'',boxLabel:C_INSP_WEIGHT,tabIndex:29,
                           name:'weightRequired',checked:p.get('weightRequired')=='1'},
                      {xtype:'checkbox',labelSeparator:'',boxLabel:C_INSP_QUANTITY,tabIndex:30,
                        	name:'quantityRequired',checked:p.get('quantityRequired')=='1'},
                      {xtype:'checkbox',labelSeparator:'',boxLabel:C_VETERINARY_QUANTITY,tabIndex:31,
                          name:'veterinaryRequired',checked:p.get('veterinaryRequired')=='1'},
                      {xtype:'checkbox',labelSeparator:'',boxLabel:C_HEALTH_QUANTITY,tabIndex:32,
                        	name:'healthRequired',checked:p.get('healthRequired')=='1'},
                      {xtype:'checkbox',labelSeparator:'',boxLabel:C_SANITATION_QUANTITY,tabIndex:33,
                          name:'sanitationRequired',checked:p.get('sanitationRequired')=='1'},
                      {xtype:'checkbox',labelSeparator:'',boxLabel:C_ANIMAL_QUANTITY,tabIndex:34,
                          name:'animalRequired',checked:p.get('animalRequired')=='1'}
                   ]}
			]
		},
		{layout:'column',title:C_INSP_BILL_INFO,layoutConfig: {columns:4},frame:true,height:600,autoScroll:true,
			items: [
			  {columnWidth:.6,layout:'form',labelWidth:120,border:false,items:[
				{fieldLabel:C_INSP_AGENCY,name:'inspVendorName',value:p.get('inspVendorName'),tabIndex:1,
					store:HTStore.getCS(),enableKeyEvents:true,
				   tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
				   xtype:'customerLookup',custType:'custInspectionFlag',
				   displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
				   triggerAction:'all',selectOnFocus:true,anchor:'99%',
				   listeners:{scope:this,
				      blur:function(f){
						if(f.getRawValue()==''){f.clearValue();p.set('cudeVendorId','');}},
				      select:function(c,r,i){
				        this.find('name','inspVendorContact')[0].setValue(r.get('custContact'));
				       	this.find('name','inspVendorTel')[0].setValue(r.get('custTel'));
				       	p.set('inspVendorId',r.get('id'));
				       	},
				       keydown:{fn:function(f,e){loadCustomer(f,e,'custBookerFlag','I',1);},buffer:BF}}}]},
			{columnWidth:.4,layout:'form',labelWidth:80,border:false,items:[
				{fieldLabel:C_NO,name:'inspNo',value:p.get('inspNo'),tabIndex:2,
					xtype:'textfield',anchor:'95%'}]},
			{columnWidth:.4,layout:'form',labelWidth:120,border:false,items:[
				{fieldLabel:C_INSP_VENDOR_RN,name:'inspRefNo',value:p.get('inspRefNo'),tabIndex:3,
                	xtype:'textfield',anchor:'95%'}]},
            {columnWidth:.2,layout:'form',labelWidth:80,border:false,items:[
                {fieldLabel:C_CONTACT,name:'inspVendorContact',value:p.get('inspVendorContact'),tabIndex:4,
       	         	xtype:'textfield',anchor:'95%'}]},
       	    {columnWidth:.2,layout:'form',labelWidth:80,border:false,items:[
       	        {fieldLabel:C_PHONE,name:'inspVendorTel',value:p.get('inspVendorTel'),tabIndex:5,
       	         	xtype:'textfield',anchor:'95%'}]},
       	    {columnWidth:.2,layout:'form',labelWidth:80,border:false,items:[
       	        {fieldLabel:C_INSP_DATE,name:'inspDate',value:p.get('inspDate'),tabIndex:6,
    				xtype:'datefield',format:DATEF,anchor:'95%'}]},
    					
			{columnWidth:1,layout:'form',labelWidth:120,border:false,items:[
				{fieldLabel:C_SHIPPER_CN,name:'inspShipperCn',value:p.get('inspShipperCn'),tabIndex:7,
					xtype:'textfield',anchor:'99%'}]},
			{columnWidth:1,layout:'form',labelWidth:120,border:false,items:[
				{fieldLabel:C_EN,name:'inspShipperEn',value:p.get('inspShipperEn'),tabIndex:8,
					xtype:'textfield',anchor:'99%'}]},
			{columnWidth:1,layout:'form',labelWidth:120,border:false,items:[
				{fieldLabel:C_CONSIGNEE_CN,name:'inspConsigneeCn',value:p.get('inspConsigneeCn'),tabIndex:9,
					xtype:'textfield',anchor:'99%'}]},
			{columnWidth:1,layout:'form',labelWidth:120,border:false,items:[
				{fieldLabel:C_EN,name:'inspConsigneeEn',value:p.get('inspConsigneeEn'),tabIndex:10,
					xtype:'textfield',anchor:'99%'}]},
						
			{columnWidth:.3,layout: 'form',border :false,labelAlign:'top',
                items: [{fieldLabel:C_CARGO_NAME_CN_EN,name:'inspCargoName',value:p.get('inspCargoName'),tabIndex:11,
                	xtype:'textarea',anchor:'95%'}]},
			{columnWidth:.1,layout: 'form',border:false,labelAlign:'top',
                items: [{fieldLabel:C_HS_CODE,name:'inspHsNo',value:p.get('inspHsNo'),tabIndex:12,
                	xtype:'textarea',anchor:'95%'}]},
			{columnWidth:.1,layout: 'form',border:false,labelAlign:'top',
                items: [{fieldLabel:C_MADE_IN,name:'inspMadeIn',value:p.get('inspMadeIn'),tabIndex:13,
                	xtype:'textarea',anchor:'95%'}]},
			{columnWidth:.1,layout: 'form',border:false,labelAlign:'top',
                items: [{fieldLabel:C_QUANTITY_WEIGHT,name:'inspNum',value:p.get('inspNum'),tabIndex:14,
                	xtype:'textarea',anchor:'95%'}]},
            {columnWidth:.1,layout: 'form',border : false,labelAlign:'top',
                items: [{fieldLabel:C_CARGO_VALUE,name:'inspValue',value:p.get('inspValue'),tabIndex:15,
                	xtype:'textarea',anchor:'95%'}]},
            {columnWidth:.3,layout: 'form',labelAlign:'top',labelWidth:85,border:false,
                items: [{fieldLabel:C_PACK_QUANTITY,name:'inspPackages',value:p.get('inspPackages'),tabIndex:16,
                	xtype:'textarea',anchor:'95%'}]},
            
			{columnWidth:.33,layout:'form',labelWidth:120,border:false,items:[
				{fieldLabel:C_CONVEYANCE,name:'inspConveyance',value:p.get('inspConveyance'),tabIndex:17,
					xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_CONTRACT_NO,name:'inspContractNo',value:p.get('inspContractNo'),tabIndex:21,
						xtype:'textfield',anchor:'95%'},
				{fieldLabel:p.get('consBizClass')==BC_E?C_CARGO_DELIVERY_DATE:C_CARGO_DISCHARGE_DATE,
						name:'inspShippingDate',value:p.get('inspShippingDate'),tabIndex:25,
						xtype:'datefield',format:DATEF,anchor:'95%'},
				{fieldLabel:C_PORT_FROM,name:'inspPol',value:p.get('inspPol'),tabIndex:29,
						xtype:'textfield',anchor:'95%'}
			]},
            {columnWidth:.33,layout:'form',labelWidth:120,border : false,items:[
				{fieldLabel:C_TRTY,name:'inspTradeType',value:p.get('inspTradeType'),tabIndex:18,
					store:HTStore.getTRTY_S(),xtype:'combo',
					displayField:'trtyName',valueField:'trtyName',
					typeAhead:true,mode:'remote',
					triggerAction:'all',selectOnFocus:true,anchor:'95%'},
				{fieldLabel:C_CREDIT_NO,name:'inspCreditNo',value:p.get('inspCreditNo'),tabIndex:22,
						xtype:'textfield',anchor:'95%'},
				{fieldLabel:p.get('consBizClass')==BC_E?C_COUNTRY_TO:C_COUNTRY_FROM,
						name:'inspTradeCountry',value:p.get('inspTradeCountry'),tabIndex:26,
						store:HTStore.getCOUN_S(),xtype:'combo',
						displayField:'counNameEn',valueField:'counNameEn',
						typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
				{fieldLabel:p.get('consBizClass')==BC_E?C_PORT_TO:C_PORT_IN,
						name:'inspPod',value:p.get('inspPod'),tabIndex:30,
						xtype:'textfield',anchor:'95%'}
			]},
            {columnWidth:.33,layout:'form',labelWidth:120,border : false,items:[
				{fieldLabel:C_CARGO_ADDRESS,name:'inspCargoAddress',value:p.get('inspCargoAddress'),tabIndex:19,
					xtype:'textfield',anchor:'95%'},
				{fieldLabel:C_USAG,name:'inspUsage',value:p.get('inspUsage'),tabIndex:23,
						store:HTStore.getUSAG_S(),xtype:'combo',
					displayField:'usagName',valueField:'usagName',typeAhead:true,mode:'remote',
					triggerAction:'all',selectOnFocus:true,anchor:'95%'},
				{fieldLabel:C_CERTIFICATE_NO,name:'inspCertificateNo',value:p.get('inspCertificateNo'),tabIndex:27,
						xtype:'textfield',anchor:'95%'},
				p.get('consBizClass')==BC_E?{fieldLabel:C_REGISTER_NO,
						name:'inspRegisterNo',value:p.get('inspRegisterNo'),tabIndex:31,
						xtype:'textfield',anchor:'95%'}:
				{fieldLabel:C_CLAIM_DATE,name:'inspClaimDate',value:p.get('inspClaimDate'),tabIndex:31,
						xtype:'datefield',format:DATEF,anchor:'95%'}
			]},
            
            {columnWidth:.99,layout:'form',labelWidth:160,border : false,items:[
				{fieldLabel:C_CONT_SPEC_NO,name:'inspContainerInfo',value:p.get('inspContainerInfo'),tabIndex:32,
					xtype:'textfield',anchor:'99%'}]},
            {columnWidth:.50,layout:'form',labelWidth:100,border : false,labelAlign:'top',items:[
				{fieldLabel:C_INSP_SPECIAL_TERM,name:'inspSpecialTerm',value:p.get('inspSpecialTerm'),tabIndex:33,
					xtype:'textarea',anchor:'99%'}]},
            {columnWidth:.50,layout:'form',labelWidth:100,border : false,labelAlign:'top',items:[
				{fieldLabel:C_MARKS_NO,name:'inspMarks',value:p.get('inspMarks'),tabIndex:34,
					xtype:'textarea',anchor:'99%'}]}
            ]}
		]});
	
	Fos.InspTab.superclass.constructor.call(this,{labelWidth:80,autoScroll:true,
		tbar:[
		      {text:C_SAVE,itemId:'TB_C',disabled:NR(m+F_M),iconCls:'save',scope:this,handler:this.save},'-',
		      {text:C_APPLY,itemId:'TB_D',disabled:NR(m+F_M),iconCls:'docpass',scope:this,handler:function(){this.updateStatus('1');}},'-',
		      {text:C_END,itemId:'TB_E',disabled:NR(m+F_M),iconCls:'pass',scope:this,handler:function(){this.updateStatus('2');}},'-',
		      {text:C_EXPORT,disabled:NR(m+F_V),iconCls:'print',scope:this,
			menu: {items: [
	   		{text:C_INSP_BILL,menu:{items:[
	   			{text:'Excel',scope:this,handler:this.expExcel},
	   			{text:C_EMAIL,scope:this,handler:this.expEmail},
	   			{text:C_FAX,scope:this,handler:function(){}}]}}
	   		]}},'-',
	   		{text:C_EXPE,iconCls:'dollar',scope:this,handler:this.showExp},'-',
			'->',
			{itemId:'TB_M',xtype:'tbtext',text:C_STATUS_C+HTStore.getINSPST(p.get('inspStatus'))}
	   		],
		items:[tab]
	});
};
Ext.extend(Fos.InspTab, Ext.form.FormPanel);

