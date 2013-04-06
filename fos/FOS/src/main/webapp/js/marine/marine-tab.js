Fos.MarineTab = function(p,listStore) {
	var cargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=CARG_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FCargo',id:'id'},FCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	var contStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'CONT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FContainer',id:'id'},FContainer),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	if(p.get('rowAction')!='N'){
		cargoStore.load({params:{consId:p.get('id')}});	
		contStore.load({params:{consId:p.get('id')}});
	}
	this.saveConsign = function(){
		if(Ext.isEmpty(p.get('custId'))){
			XMG.alert(SYS,M_CUST_MUST_PREDEFINED);return;};
		if(Ext.isEmpty(p.get('consSalesRepId'))){
			XMG.alert(SYS,M_SALES_REQUIRED,function(){
			this.find('name','consSalesRepName')[0].focus();},this);return;};
		if(Ext.isEmpty(p.get('consOperatorId'))){
			XMG.alert(SYS,M_OPERATOR_REQUIRED,function(){
			this.find('name','consOperatorName')[0].focus();},this);return;};
		
		var cargos = cargoStore.getModifiedRecords();
   	 	var conts = contStore.getModifiedRecords();
		for(var i=0;i<conts.length;i++){
				if(checkContainerNo(conts[i].get('contNo')) == false){
					XMG.alert(SYS,'集装箱编码格式不正确，请重新输入！');
					return;
				}
		}		
		var f = FConsign.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
   	 	p.set('consCargoPackages',''+p.get('consTotalPackages')+p.get('packName'));
 		p.set('consCargoNetWeight',''+p.get('consTotalNetWeight')+'KGS');
 		p.set('consCargoGrossWeight',''+p.get('consTotalGrossWeight')+'KGS');
 		p.set('consCargoMeasurement',''+p.get('consTotalMeasurement')+'CBM');
 		if(conts.length>0){
 			var cif='';	   	 		
   	 		var ra = contStore.getRange();
   	 		for(var i=0;i<ra.length;i++){
   	 			var ct = ra[i].get('cotyId');
   	 			var cc=HTStore.getCOTY(ct);
   	 			var n = ra[i].get('contNum');
   	 			cif+=n+'X'+cc+' ';
   	 		}
   	 		p.set('consContainersInfo',cif);
 		}
   	 	var xml = HTUtil.RTX(p,'FConsign',FConsign);
   	 	var cargoXml = HTUtil.ATX(cargos,'FCargo',FCargo);
   	 	var contXml = HTUtil.ATX(conts,'FContainer',FContainer);
   	 	if(cargos.length>0&&conts.length==0){
   	 		xml = xml+cargoXml;
   	 	}
   	 	else if(conts.length>0&&cargos.length==0){
   	 		xml = xml+contXml;
   	 	}else{
   	 		xml = xml+cargoXml+contXml;
   	 	}
   	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
   	 		params:{_A:'CONS_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'FConsign',FConsign);
				var ra=p.get('rowAction');
				var f = FConsign.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};   				
				if(ra=='N'){
					p.set('rowAction','M');
					listStore.insert(0,p);
				}
				p.endEdit();
				var a = HTUtil.XTRA(res.responseXML,'FCargo',FCargo);
				HTUtil.RUA(cargoStore,a,FCargo);
				var b = HTUtil.XTRA(res.responseXML,'FContainer',FContainer);
				HTUtil.RUA(contStore,b,FContainer);
				XMG.alert(SYS,M_S);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
    }; 
	
	//业务号
    var txtConsNo= new Ext.form.TextField({fieldLabel:C_CONS_NO,style:'{font-weight:bold;color:green;}',
		disabled:true,tabIndex:5,name:'consNo',value:p.get('consNo'),anchor:'95%'});
	 //业务员
    var cboSales = new Ext.form.ComboBox({fieldLabel:C_SALES,itemCls:'required',
		name:'consSalesRepName',value:p.get('consSalesRepName'),
		store:HTStore.getSALE_S(),displayField:'userName',valueField:'userName',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consSalesRepId','');
					p.set('consSalesRepName','');
				}
			},
	    	select:function(c,r,i){p.set('consSalesRepId',r.get('id'));
	    	}
	    }});
	 //操作员
    var cboOperator = new Ext.form.ComboBox({fieldLabel:C_OPERATOR,itemCls:'required',
    		name:'consOperatorName',value:p.get('consOperatorName'),
    		store:HTStore.getOP_S(),xtype:'combo',displayField:'userName',valueField:'userName',
    		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
    		listeners:{scope:this,
				blur:function(f){
	    		if(f.getRawValue()==''){
	    			f.clearValue();p.set('consOperatorId','');
	    		}
    			},
    			select:function(c,r,i){p.set('consOperatorId',r.get('id'));}}});
    //委托日期
    var dtConsign = new Ext.form.DateField({fieldLabel:C_CONS_DATE,name:'consDate',value:p.get('consDate'),
    	format:DATEF,anchor:'95%'});
    
     //委托单位
    var cboCust= new Fos.CustomerLookup({fieldLabel:C_BOOKER,itemCls:'required',
		name:'custName',value:p.get('custName'),store:HTStore.getCS(),enableKeyEvents:true,
   		custType:'custBookerFlag',bizType:'M',
   		displayField:'custCode',valueField:'custCode',typeAhead:true,
   		mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
   		triggerAction:'all',selectOnFocus:true,
   		anchor:'95%',
         	listeners:{scope:this,
             	blur:function(f){
             		if(f.getRawValue()==''){
             			f.clearValue();p.set('custId','');p.set('custName','');
             	}},
             	select:function(c,r,i){
             	this.find('name','custName')[0].setValue(r.get('custNameCn'));
				p.set('custContact',r.get('custContact'));
				p.set('custTel',r.get('custTel'));
				p.set('custFax',r.get('custFax'));
				p.set('custId',r.get('id'));
				p.set('custSname',r.get('custSnameCn'));
				this.find('name','consShipper')[0].setValue(r.get('custShipper'));
				this.find('name','consSalesRepName')[0].setValue(r.get('custSalesName'));
			    },
				keydown:{fn:function(f,e){
					loadCustomer(f,e,'custBookerFlag','M',1);
				},buffer:BF}}});
				
	//联系人
	var txtCustContact = new Ext.form.TextField({fieldLabel:C_CONTACT,name:'custContact',value:p.get('custContact'),anchor:'95%'});
	//联系电话
	var txtCustTel = new Ext.form.TextField({fieldLabel:C_TEL,name:'custTel',value:p.get('custTel'),anchor:'95%'});
	//联系传真
	var txtCustFax = new Ext.form.TextField({fieldLabel:C_FAX,name:'custFax',value:p.get('custFax'),anchor:'95%'});
	//订舱代理
	var cboBookingAgency = new Fos.CustomerLookup({fieldLabel:C_BOOK_AGENCY,name:'consBookingAgencyName',
		value:p.get('consBookingAgencyName'),store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		custType:'custBookingAgencyFlag',bizType:'M',
		displayField:'custCode',valueField:'custCode',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){if(f.getRawValue()==''){f.clearValue();
			p.set('consBookingAgency','');
			p.set('consBookingAgencyName','');}},
        	select:function(c,r,i){
				p.set('consBookingAgency',r.get('id'));
				p.set('consBookingAgencyName',r.get('custNameCn'));
				p.set('consBookingAgencyTel',r.get('custTel'));
				p.set('consBookingAgencySname',r.get('custCode'));
				p.set('consBookingAgencyTel',r.get('custCode'));
			},
        	keydown:{fn:function(f,e){
        		loadCustomer(f,e,'custBookingAgencyFlag','M',1);
        	},buffer:BF}}});
    //订舱代理联系人
    var txtBookingAgencyName =  new Ext.form.TextField({fieldLabel:M_BOOKING_AGENCY_NAME,
    	name:'consBookingAgencySname',value:p.get('consBookingAgencySname'),anchor:'95%'});
    //订舱代理联系电话
    var txtBookingAgencyTel =  new Ext.form.TextField({fieldLabel:M_BOOKING_AGENCY_TEL,
    	name:'consBookingAgencyTel',value:p.get('consBookingAgencyTel'),anchor:'95%'});	
    //订舱日期
    var dtConsBookingDate = new Ext.form.DateField({fieldLabel:C_BOOKING_DATE,name:'consBookingDate',value:p.get('consBookingDate'),
    	format:DATEF,anchor:'95%'});
	//客户业务号
	var txtConsRefNo = new Ext.form.TextField({fieldLabel:C_CUST_CONS_NO,name:'consRefNo',value:p.get('consRefNo'),anchor:'95%'});
	//合同号
	var txtConsContactNo = new Ext.form.TextField({fieldLabel:C_CONTRACT_NO,name:'consContactNo',value:p.get('consContactNo'),anchor:'95%'});
	//运输条款
	var cboTranTerm= new Ext.form.ComboBox({fieldLabel:C_TTER,itemCls:'needed',name:'tranCode',value:p.get('tranCode'),
		store:p.get('consShipType')==ST_B?HTStore.getTTB_S():HTStore.getTTC_S(),
		displayField:'tranCode',valueField:'tranCode',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
   //运费条款
    var cboPaymentTerm = new Ext.form.ComboBox({fieldLabel:C_PATE,itemCls:'needed',
    		name:'pateCode',value:p.get('pateCode'),
    		store:HTStore.getPATE_S(),
    		displayField:'pateName',valueField:'pateName',
    		typeAhead:true,mode:'remote',triggerAction: 'all',
    		selectOnFocus:true,anchor:'95%'});
   	//发货人
    var cboShipper = new Ext.form.ComboBox({fieldLabel:C_SHIPPER,
			store:HTStore.getShipperStore('FMS_QSHIPPER'),
			displayField:'shipperName',valueField:'shipperName',typeAhead: true,
			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'97.5%',
			enableKeyEvents:true,
			listeners:{scope:this,
			blur:function(f){
				f.clearValue();
			},
			select:function(c,r,i){				        		
				this.find('name','consShipper')[0].setValue(r.get('shipperAddress'));
			},
		 	keydown:{fn:function(f,e){
		 		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
		 			shipperType:'S',bizType:'M',_A:'FMS_QSHIPPER',_mt:'xml'});
		 	},buffer:BF}}});
	//发货人
    var txtShipper = new Ext.form.TextArea({fieldLabel:'',name:'consShipper',value:p.get('consShipper'),
	 	anchor:'97.5%'});
	//收货人
    var cboConsignee = new Ext.form.ComboBox({fieldLabel:C_CONSIGNEE,
			store:HTStore.getShipperStore('FMS_QSHIPPER'),
			displayField:'shipperName',valueField:'shipperName',typeAhead: true,
			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'97.5%',
			enableKeyEvents:true,
			listeners:{scope:this,
			blur:function(f){
					f.clearValue();
			},
			select:function(c,r,i){				        		
				this.find('name','consConsignee')[0].setValue(r.get('shipperAddress'));
			},
		 	keydown:{fn:function(f,e){
		 		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
		 			shipperType:'C',bizType:'M',_A:'FMS_QSHIPPER',_mt:'xml'});
		 	},buffer:BF}}});
	//收货人
    var txtConsignee = new Ext.form.TextArea({fieldLabel:'',name:'consConsignee',value:p.get('consConsignee'),
   		anchor:'97.5%'});
    	
    //通知人
    var cboNotifyParty = new Ext.form.ComboBox({fieldLabel:C_NOTIFIER,
			store:HTStore.getShipperStore('FMS_QSHIPPER'),
			displayField:'shipperName',valueField:'shipperName',typeAhead: true,
			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'97.5%',
			enableKeyEvents:true,
			listeners:{scope:this,
			blur:function(f){
					f.clearValue();
			},
			select:function(c,r,i){				        		
				this.find('name','consNotifyParty')[0].setValue(r.get('shipperAddress'));
			},
		 	keydown:{fn:function(f,e){
		 		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
		 			shipperType:'N',bizType:'M',_A:'FMS_QSHIPPER',_mt:'xml'});
		 	},buffer:BF}}});
    //通知人
    var txtNotifyParty = new Ext.form.TextArea({fieldLabel:'',name:'consNotifyParty',value:p.get('consNotifyParty'),
        anchor:'97.5%'});
   //第二通知人
    var cboNotifyParty2 = new Ext.form.ComboBox({fieldLabel:C_NOTIFIER2,
			store:HTStore.getShipperStore('FMS_QSHIPPER'),
			displayField:'shipperName',valueField:'shipperName',typeAhead: true,
			mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'97.5%',
			enableKeyEvents:true,
			listeners:{scope:this,
			blur:function(f){
					f.clearValue();
			},
			select:function(c,r,i){				        		
				this.find('name','consNotifyParty2')[0].setValue(r.get('shipperAddress'));
			},
		 	keydown:{fn:function(f,e){
		 		listShipper(f,e,{shipperName:f.getRawValue(),custId:p.get('custId'),
		 			shipperType:'O',bizType:'M',_A:'FMS_QSHIPPER',_mt:'xml'});
		 	},buffer:BF}}});
    //第二通知人
    var txtNotifyParty2 = new Ext.form.TextArea({fieldLabel:'',name:'consNotifyParty2',value:p.get('consNotifyParty2'),
        anchor:'97.5%'});
   	//船名
	var cboVessel = new Fos.VesselLookup({fieldLabel:C_VESS,itemCls:'needed',name:'vessName',value:p.get('vessName'),
			store:HTStore.getVES(),enableKeyEvents:true,
			displayField:'vessNameEn',valueField:'vessNameEn',typeAhead:true,
			mode:'remote',tpl:vessTpl,itemSelector:'div.list-item',listWidth:400,
			triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					p.set('vessNameCn',r.get('vessNameCn'));
					var vcn=this.find('name','vessNameCn')[0];
					if(vcn) vcn.setValue(r.get('vessNameCn'));
				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						p.set('vessNameCn','');
					}
				},
				keydown:{fn:function(f,e){LV(f,e,'');},buffer:BF}}});
	//航次
	var txtVoyage = new Ext.form.TextField({fieldLabel:C_VOYA,itemCls:'needed',
		name:'voyaName',value:p.get('voyaName'),anchor:'95%'});
	//MblNo
    var txtMblNo = new Ext.form.TextField({fieldLabel:C_MBL_NO,name:'consMblNo',value:p.get('consMblNo'),anchor:'95%'});
    //HblNo
    var txtHblNo = new Ext.form.TextField({fieldLabel:C_HBL_NO,name:'consHblNo',value:p.get('consHblNo'),anchor:'95%'});
    //开航日期
    var dtSailDate = new Ext.form.DateField({fieldLabel:C_SAIL_DATE,
    		itemCls:'required',
    		name:'consSailDate',value:p.get('consSailDate'),format:DATEF,anchor:'95%',
        	listeners:{scope:this,
	        	change:function(f,nv,ov){
		        		  if(p.get('consBizClass')==BC_E) 
		        			  p.set('consSailDate',nv);
		        		  }
	        }
    });
    //装货港
    var cboPol = new Fos.PortLookup({fieldLabel:C_POL,itemCls:'required',
    		name:'consPolEn',value:p.get('consPolEn'),
    		store:HTStore.getPS(),xtype:'portLookup',displayField:'portNameEn',valueField:'portNameEn',
    		typeAhead: true,mode:'local',portType:0,
    		triggerAction:'all',selectOnFocus:true,anchor:'95%',
    		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,
    		listeners:{scope:this,
            	select:function(c,r,i){
            	if(p.get('consBizClass')==BC_I&&this.find('name','consTradeCountry')[0]) 
            		this.find('name','consTradeCountry')[0].setValue(r.get('counCode'));
            	if(p.get('consBizClass')==BC_E&&this.find('name','consReceiptPlace')[0]) 
            		this.find('name','consReceiptPlace')[0].setValue(r.get('portNameEn'));},
             	keydown:{fn:LP,buffer:BF}}});
     //卸货港
	var cboPod = new Fos.PortLookup({fieldLabel:C_POD,itemCls:'required',
		name:'consPodEn',value:p.get('consPodEn'),
		store:HTStore.getPS(),displayField:'portNameEn',valueField:'portNameEn',
		typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		tpl:portTpl,itemSelector:'div.list-item',listWidth:C_LW,enableKeyEvents:true,portType:0,
		listeners:{scope:this,
        	select:function(c,r,i){
            	if(p.get('consBizClass')==BC_E&&this.find('name','consTradeCountry')[0]) 
            		this.find('name','consTradeCountry')[0].setValue(r.get('counCode'));
            	if(this.find('name','consDeliveryPlace')[0]) 
            		this.find('name','consDeliveryPlace')[0].setValue(r.get('portNameEn'));
            	if(this.find('name','consDestination')[0]) 
            		this.find('name','consDestination')[0].setValue(r.get('portNameEn'));},
         	keydown:{fn:LP,buffer:BF}}});
     //中转港
    var cboPot = new Ext.form.TextField({fieldLabel:C_POT,
    	name:'consPotEn',value:p.get('consPotEn'),anchor:'95%'});
    //收货地点
    var txtConsReceiptPlace = new Ext.form.TextField({fieldLabel:C_SHIP_TO,name:'consReceiptPlace',value:p.get('consReceiptPlace'),anchor:'95%'});
    //交货地点
    var txtConsDeliveryPlace = new Ext.form.TextField({fieldLabel:C_DELIVERY_ADDRESS,name:'consDeliveryPlace',value:p.get('consDeliveryPlace'),anchor:'95%'});
    //目的地
    var txtConsDestination = new Ext.form.TextField({fieldLabel:C_DESTINATION,name:'consDestination',value:p.get('consDestination'),anchor:'95%'});
   	//前程运输
    var txtConsPrecarriage = new Ext.form.TextField({fieldLabel:C_PRECARRIAGE,name:'consPrecarriage',value:p.get('consPrecarriage'),anchor:'95%'});
    //装船日期
    var dtShipLoad = new Ext.form.DateField({fieldLabel:C_SHIP_LOAD_DATE,name:'consShipDate',value:p.get('consShipDate'),
    	format:DATEF,anchor:'95%'});
    //承运人
	var cboCarrier = new Fos.CustomerLookup({fieldLabel:p.get('consBizType')==BT_A?C_FLIGHTER:C_CARRIER,itemClass:'needed',
		name:'consCarrierName',
		value:p.get('consCarrierName'),store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		custType:'custCarrierFlag',bizType:'M',
		displayField:'custCode',valueField:'custCode',typeAhead: true,
		mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consCarrier','');
					p.set('consCarrierName','');
				}
			},
			select:function(c,r,i){
				p.set('consCarrier',r.get('id'));
				this.find('name','consCarrierName')[0].setValue(r.get('custNameCn'));
			},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custCarrierFlag','M',1);
			},buffer:BF}}});
	//海外代理
	var cboOverseaAgency = new Fos.CustomerLookup({fieldLabel:C_OVERSEA_AGENCY,
			name:'consOverseaAgencyName',value:p.get('consOverseaAgencyName'),store:HTStore.getCS(),
			enableKeyEvents:true,tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			custType:'custOverseaAgencyFlag',bizType:'M',
			displayField:'custCode',valueField:'custCode',typeAhead: true,
			mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						p.set('consOverseaAgency','');
						p.set('consOverseaAgencyName','');
					}
				},
				select:function(c,r,i){
	            	p.set('consOverseaAgency',r.get('id'));
	            	this.find('name','consNotifyParty2')[0].setValue(r.get('custAddress2'));
	            	this.find('name','consOverseaAgencyName')[0].setValue(r.get('custNameCn'));
	 			},
				keydown:{fn:function(f,e){
					loadCustomer(f,e,'custOverseaAgencyFlag','M',1);
				},buffer:BF}}});
				
    //订舱要求
    var bookingRequirement = new Ext.form.TextArea({fieldLabel:M_BOOKING_REQUIREMENT,name:'consBookRemarks',value:p.get('consBookRemarks'),anchor:'97.5%'});
   
     //仓库
	var cboConsWarehouseName = new Fos.CustomerLookup(
		{fieldLabel:M_WAREHOUSE,name:'consWarehouseName',value:p.get('consWarehouseName'),
			store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			custType:'custWarehouseFlag',bizType:'M',
			displayField:'custCode',valueField:'custNameCn',
			typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('consWarehouse','');
					p.set('consWarehouseName','');
				}
			},
			select:function(c,r,i){
				this.find('name','consWarehouseContact')[0].setValue(r.get('custContact'));
				this.find('name','consWarehouseTel')[0].setValue(r.get('custTel'));
				this.find('name','consWarehouseAddress')[0].setValue(r.get('custAddress'));
				p.set('consWarehouse',r.get('id'));
				p.set('consWarehouseFax',r.get('custFax'));},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custWarehouseFlag','M',1);
			},buffer:BF}}});
	//报关行
	var cboConsCustomsVendorName = new Fos.CustomerLookup(
		{fieldLabel:C_CUSTOM_AGENCY,name:'consCustomsVendorName',value:p.get('consCustomsVendorName'),
		store:HTStore.getCS(),enableKeyEvents:true,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		custType:'custCustomFlag',bizType:'M',
		displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
		triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();p.set('consCustomsVendor','');
					p.set('consCustomsVendorName','');
				}
			},
			select:function(c,r,i){
				p.set('consCustomsVendor',r.get('id'));
				this.find('name','consSendSingleAddress')[0].setValue(r.get('custAddress'));
			},
			keydown:{fn:function(f,e){
				loadCustomer(f,e,'custCustomFlag','M',1);
			},buffer:BF}}});
	//寄单地址
	var sendSingleAddress = new Ext.form.TextField({fieldLabel:C_SEND_SINGLE_ADDRESS,
		name:'consSendSingleAddress',value:p.get('consSendSingleAddress'),anchor:'97.5%'});
	//装箱日期
	var dtConsContainerLoadDate = new Ext.form.DateField(
		{fieldLabel:C_WARE_LOAD_DATE,name:'consContainerLoadDate',value:p.get('consContainerLoadDate'),format:DATEF,anchor:'95%'});
	//装箱要求	
	var txtConsContainerLoadRequirment = new Ext.form.TextArea({fieldLabel:C_CONT_LOAD_REQUIREMENT,name:'consServiceSpec',
		value:p.get('consServiceSpec'),anchor:'97.5%'});
	//运输要求
	var txtTransPortRequirment = new Ext.form.TextArea({fieldLabel:M_TRANSPORT_REQUIRMENT,name:'consRemarks',value:p.get('consRemarks'),anchor:'97.5%'});
	//截关日期
    var dtExpiryDate = new Ext.form.DateField({fieldLabel:C_CUSTOM_EXPIRY_DATE,name:'consExpiryDate',
    		value:p.get('consExpiryDate'),format:DATEF,anchor:'95%'});
	//装货日期
	var dtConsLoadDate = new Ext.form.DateField({fieldLabel:C_LOAD_DATE,name:'consLoadDate',value:p.get('consLoadDate'),format:DATEF,anchor:'95%'});
	//装货地址
	var txtConsLoadAddress = new Ext.form.TextField({fieldLabel:C_LOAD_ADDRESS,name:'consLoadAddress',value:p.get('consLoadAddress'),anchor:'97.5%'});
	//车队
	var cboConsTrackVendorName = new Fos.CustomerLookup(
	    {fieldLabel:C_MOTORCADE,name:'consTrackVendorName',value:p.get('consTrackVendorName'),
	    store:HTStore.getCS(),enableKeyEvents:true,
	    tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
	    custType:'custTrackFlag',bizType:'M',
	    displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
	    triggerAction:'all',selectOnFocus:true,anchor:'95%',
	    listeners:{scope:this,
	    blur:function(f){
	    	if(f.getRawValue()==''){
	    		f.clearValue();
	    		p.set('consTrackVendor','');
	    		p.set('consTrackVendorName','');
	    	}
	    },
	    select:function(c,r,i){p.set('consTrackVendor',r.get('id'));},
	    keydown:{fn:function(f,e){
	    	loadCustomer(f,e,'custTrackFlag','M',1);
	    },buffer:BF}}});
	//进仓编号
	var txtConsWarehouseNo = new Ext.form.TextField({fieldLabel:C_WAREHOUSE_NO,
		name:'consWarehouseNo',value:p.get('consWarehouseNo'),anchor:'97.5%'});  
	this.reCalculate = function(){
		var pkg=0;
		var gw=0;
		var m=0;
		var a=cargoStore.getRange();
		var mark = '';
		var ename = '';
		var cname = '';
		var pkgs = '';
		for(var i=0;i<a.length;i++){
			pkg += parseFloat(a[i].get('cargPackageNum'));
			gw +=  parseFloat(a[i].get('cargGrossWeight'));
			m +=   parseFloat(a[i].get('cargMeasurement'));
			if(mark=='') 
				mark = a[i].get('cargMarks');
			else{
				if(a[i].get('cargMarks')!=mark){
					mark += '\r\n';
					mark += a[i].get('cargMarks');
				}
			}			
			if(ename!='') 
				ename += ',';
			ename = ename + a[i].get('cargNameEn');
			
			if(cname!='') 
				cname += ',';
			cname = cname + a[i].get('cargNameCn');
			
			if(pkgs==''){
				pkgs = a[i].get('packName');
			}
			else if(pkgs!=a[i].get('packName')){				
				pkgs = 'PKGS';
			}
		}
		cboPackName.setValue(pkgs);
		txtConsTotalPackages.setValue(pkg);
		txtConsTotalGrossWeight.setValue(gw);
		txtConsTotalMeasurement.setValue(m);	
		txtConsCargoMarks.setValue(mark);
		txtConsCargoNameCn.setValue(cname);
		txtConsCargoNameEn.setValue(ename);
		txtConsCargoDesc.setValue(ename);
		var pw='SAY '+HTUtil.N2EW(pkg)+' '+pkgs+' ONLY';
		txtConsTotalPackagesInWord.setValue(pw);
	};	
	
	//唛头
	var txtConsCargoMarks = new Ext.form.TextArea({fieldLabel:C_MARKS,name:'consCargoMarks',
		value:p.get('consCargoMarks'),anchor:'95%'});
	//中文名称
	var txtConsCargoNameCn = new Ext.form.TextArea({fieldLabel:C_CARGO_NAME_CN,
		name:'consCargoNameCn',value:p.get('consCargoNameCn'),anchor:'95%'});
	//英文名称
	var txtConsCargoNameEn = new Ext.form.TextArea({fieldLabel:C_CARGO_NAME_EN,
		name:'consCargoNameEn',value:p.get('consCargoNameEn'),anchor:'95%'});
	//货物描述
	var txtConsCargoDesc = new Ext.form.TextArea({fieldLabel:C_CARGO_DESC,
		name:'consCargoDesc',value:p.get('consCargoDesc'),anchor:'95%'
	});   
	//总件数
    var txtConsTotalPackages = new Ext.form.NumberField({fieldLabel:C_NUM_PACK,name:'consTotalPackages',
    	value:p.get('consTotalPackages'),anchor:'95%',
		listeners:{scope:this,
			change:function(f,nv,ov){				
				p.set('consTotalPackages',nv);
				var pw='SAY TOTAL '+HTUtil.N2EW(p.get('consTotalPackages'))+' '+p.get('packName')+' ONLY';
				txtConsTotalPackagesInWord.setValue(pw);
				p.set('consTotalPackagesInWord',pw);
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPackName.focus();
				}
			}
    	}});
	//包装名称
	var cboPackName = new Ext.form.ComboBox({fieldLabel:C_PACK,name:'packName',value:p.get('packName'),
    	store:HTStore.getPACK_S(),displayField:'packName',valueField:'packName',typeAhead: true,
    	mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
    		change:function(f,nv,ov){
				p.set('packName',nv);
				var pw='SAY TOTAL '+HTUtil.N2EW(p.get('consTotalPackages'))+' '+p.get('packName')+' ONLY';
				txtConsTotalPackagesInWord.setValue(pw);
				p.set('consTotalPackagesInWord',pw);
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsTotalPackagesInWord.focus();
				}
			}
    	}});
	//总毛重
	var txtConsTotalGrossWeight = new Ext.form.NumberField({fieldLabel:C_GROSS_WEIGHT,
		name:'consTotalGrossWeight',value:p.get('consTotalGrossWeight'),decimalPrecision:4,anchor:'95%'});
	//总体积
	var txtConsTotalMeasurement = new Ext.form.NumberField({fieldLabel:C_CBM,
		name:'consTotalMeasurement',value:p.get('consTotalMeasurement'),decimalPrecision:4,anchor:'95%'});
	//大写合计
	var txtConsTotalPackagesInWord = new Ext.form.TextField({fieldLabel:C_PACKAGES_CAP,
		name:'consTotalPackagesInWord',value:p.get('consTotalPackagesInWord'),anchor:'98.5%',
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsCargoNameEn.focus();
				} 
			}
		}});
		
	var bookingPanel =  new Ext.form.FormPanel({
		layout:'column',layoutConfig:{columns:4},frame:false,header:false,
		border:false,padding:5,items:[
			{columnWidth:.25,layout:'form',border:false,
				items:[txtConsNo,cboCust,cboBookingAgency,txtConsRefNo]
			},
			{columnWidth:.25,layout:'form',border:false,
				items:[cboSales,txtCustContact,txtBookingAgencyName,txtConsContactNo]
			},
			{columnWidth:.25,layout:'form',border:false,
				items:[cboOperator,txtCustTel,txtBookingAgencyTel,cboTranTerm]
			},
			{columnWidth:.25,layout:'form',border:false,
				items:[dtConsign,txtCustFax,dtConsBookingDate,cboPaymentTerm]
			},
			{columnWidth:.5,layout:'form',border:false,items:[
				cboShipper,txtShipper,cboNotifyParty,txtNotifyParty]
			},
			{columnWidth:.5,layout:'form',border:false,items:[
				cboConsignee,txtConsignee,cboNotifyParty2,txtNotifyParty2]
			},
			{columnWidth:.25,layout:'form',border:false,
				items:[cboVessel,dtSailDate,txtConsReceiptPlace]
			},
			{columnWidth:.25,layout:'form',border:false,
				items:[txtVoyage,cboPol,txtConsDeliveryPlace]
			},
			{columnWidth:.25,layout:'form',border:false,
				items:[txtMblNo,cboPod,txtConsDestination]
			},
			{columnWidth:.25,layout:'form',border:false,
				items:[txtHblNo,cboPot,txtConsPrecarriage]
			},
			{columnWidth:.5,layout:'form',border:false,
				items:[new Fos.Cargo(p,cargoStore,this)]
			},
			{columnWidth:.5,layout:'form',border:false,
				items:[new Fos.Container(p,contStore)]
			},
			{columnWidth:0.25,layout:'form',border:false,labelWidth:80,padding:5,labelAlign:'right',
				items:[txtConsCargoMarks,txtConsTotalPackages]
			},
			{columnWidth:0.25,layout:'form',border:false,labelWidth:80,padding:5,labelAlign:'right',
				items:[txtConsCargoNameCn,txtConsTotalGrossWeight]
			},
			{columnWidth:0.25,layout:'form',border:false,labelWidth:80,padding:5,labelAlign:'right',
				items:[txtConsCargoNameEn,txtConsTotalMeasurement]
			},
			{columnWidth:0.25,layout:'form',border:false,labelWidth:80,padding:5,labelAlign:'right',
				items:[txtConsCargoDesc,cboPackName]
			},
			{columnWidth:1,layout:'form',border:false,labelWidth:80,padding:5,labelAlign:'right',
				items:[txtConsTotalPackagesInWord]
			}
		]
	});
	var eastPanel =  new Ext.form.FormPanel({
		layout:'column',layoutConfig:{columns:2},frame:false,header:false,
		border:false,autoScroll:true,labelWidth:80,labelAlign:'right',items:[
			{columnWidth:1,layout:'form',border:false,
				items:[bookingPanel]
			}
		]
	});	
	this.task = function(){ 
		var w=new Fos.TaskWin(p);w.show();}
	
	this.showExpense=function(){
		createWindow('EXPE_'+p.get("uuid"),C_CONSIGN+C_EXPE+'-'+p.get('consNo'),
    			new Fos.ExpenseTab(p),true);
	};
	
	var locked=p.get('consStatusLock')==1;
    var disable=p.get('editable')==0;
    var m=M3_CONS;
	var btSave={text:C_SAVE,itemId:'TB_SAVE',iconCls:'save',
			disabled:NR(m+F_M)||locked||disable,scope:this,handler:this.saveConsign};
	var btUnlock={text:C_UNLOCK,itemId:'TB_UNLOCK',iconCls:'unlock',
			disabled:NR(m+F_UL)||locked!=1||p.get('rowAction')=='N',
			scope:this,handler:this.unlock};
	this.expExcel = function(n){
		EXPC(n,'&id='+p.get('id'));
	};
	var btnExpense = {text:C_EXPE,itemId:'TB_EXPENSE',iconCls:'dollar',
			disabled:NR(m+F_M)||locked||disable,scope:this,handler:this.showExpense};
	var btnTask = {text:C_TASK,iconCls:'task',scope:this,handler:this.task};	
	var exp1={text:M_ARRIVE_ADVICE,scope:this,handler:function(){this.expExcel('ARAD');}};		
	var exp2={text:M_BOOK,scope:this,handler:function(){this.expExcel('CONS_B');}};
	var exp3={text:M_BOOK_CONFIRM,scope:this,handler:function(){this.expExcel('BOOK_C');}};
	var exp4={text:M_CONSIGN,scope:this,handler:function(){this.expExcel('CONS');}};
	var exp5={text:M_BL_ER,scope:this,handler:function(){this.expExcel('BLER');}};
	var exp6={text:M_BL_SEAWAY,scope:this,handler:function(){this.expExcel('SEAW');}};
	var exp7={text:M_LOAD_ADVICE,scope:this,handler:function(){this.expExcel('WARE_INFO');}};
	var exp8={text:M_SGS_ADVICE,scope:this,handler:function(){this.expExcel('SGS_INFO');}};
	var exp9={text:M_SHIP_ADVICE,scope:this,handler:function(){this.expExcel('SHIP_INFO');}};
	var exp10={text:C_WARE_NOTICE,scope:this,handler:function(){this.expExcel('CONS_NOTICE');}};
	var expM=[exp1,exp2,exp3,exp4,exp5,exp6,exp7,exp8,exp9,exp10];
	var btExp={text:C_EXPORT,iconCls:'print',
			disabled:p.get('rowAction')=='N',
			scope:this,menu:{items:expM}};
	Fos.MarineTab.superclass.constructor.call(this,{
		layout:'column',autoScroll:true,items:[
			{columnWidth:1,layout:'form',border:false,
				items:[eastPanel]
			}
		],
		tbar:[btSave,'-',btnTask,'-',btUnlock,'-',btExp,'-',btnExpense],
		bbar:[{xtype:'tbtext',text:C_CREATE_BY_C+p.get('createBy')},'-',
 			{xtype:'tbtext',text:C_CREATE_TIME_C+formatDateTime(p.get('createTime'))},'-',
			{xtype:'tbtext',text:C_MODIFY_BY_C+p.get('modifyBy')},'-',
			{xtype:'tbtext',text:C_MODIFY_TIME_C+formatDateTime(p.get('modifyTime'))},'->']
	});
};
Ext.extend(Fos.MarineTab,Ext.Panel);

//货物信息界面
Fos.Cargo = function(p,store,container){
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var txtConsMblNo = {header:C_MBL_NO,dataIndex:'consMblNo',width:100,editor:new Ext.form.TextField()};
	var txtConsHblNo = {header:C_HBL_NO,dataIndex:'consHblNo',width:100,editor:new Ext.form.TextField()};
	var txtCargMarks={header:C_MARKS,dataIndex:'cargMarks',editor:new Ext.form.TextField({})};
	var txtCargNameCn={header:C_CARGO_NAME_EN,dataIndex:'cargNameEn',editor:new Ext.form.TextField({allowBlank:false})};
	var txtCargNameEn={header:C_CARGO_NAME_CN,dataIndex:'cargNameCn',editor:new Ext.form.TextField({})};
	var txtCargPackageNum={header:C_PACKAGES,dataIndex:'cargPackageNum',editor:new Ext.form.NumberField({allowBlank:false})};
	var cboCargPackName={header:C_PACK,dataIndex:'packName',
			editor:new Ext.form.ComboBox({store:HTStore.getPACK_S(),
    	displayField:'packName',valueField:'packName',typeAhead: true,mode: 'local',
    	triggerAction: 'all',selectOnFocus:true})};
	var txtCargGrossWeight={header:C_GW_S+C_KGS,dataIndex:'cargGrossWeight',
		renderer:rateRender,editor:new Ext.form.NumberField({decimalPrecision:4,allowBlank:false})};
	var txtCargMeasurement={header:C_CBM,dataIndex:'cargMeasurement',renderer:rateRender,editor:new Ext.form.NumberField({
		decimalPrecision:4,allowBlank:false})};
	var txtCargManuNo={header:C_MANU_NO,dataIndex:'cargManuNo',editor:new Ext.form.TextField()};
	var txtCargSpec={header:C_SPEC,dataIndex:'cargSpec',editor:new Ext.form.TextField()};
	var txtCargNo={header:C_HS_CODE,dataIndex:'cargNo',editor:new Ext.form.TextField()};
	var cboConsCustName = {header:C_CARGO_OWNER,dataIndex:'consCustName',width:150,editor:new Fos.CustomerLookup({
		store:HTStore.getCS(),enableKeyEvents:true,
	   		custType:'custBookerFlag',bizType:'M',
	   		displayField:'custCode',valueField:'custNameCn',typeAhead:true,enableKeyEvents:true,
    		mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,triggerAction:'all',selectOnFocus:true,anchor:'90%',
          	listeners:{scope:this,
          		keydown:{fn:function(f,e){
          		loadCustomer(f,e,'custBookerFlag','M',1)},buffer:500},
          		select:function(c,r,i){
          			sm.getSelected().set('consCustName',r.get('custNameCn'));
          		}
	}})};
	var cm=new Ext.grid.ColumnModel({columns:[sm,txtCargMarks,txtCargNameCn,txtCargNameEn,txtCargPackageNum,cboCargPackName,
		txtCargGrossWeight,txtCargMeasurement,txtCargManuNo,txtCargSpec,txtCargNo,cboConsCustName,txtConsMblNo,txtConsHblNo],defaults:{sortable:true,width:80}});
	var m=M3_CONS;
	var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),scope:this,
		handler:function(){
			var c = new FCargo({consNo:p.get('consNo'),
			consId:p.get('id'),cargMarks:'N/M',cargSpec:'',
			consMblNo:p.get('consMblNo'),
			consHblNo:p.get('consHblNo'),
			packId:'',
			cargPackageNum:'',
			cargNameCn:'',
			cargNameEn:'',
			cargGrossWeight:'',
			cargNetWeight:'',
			cargMeasurement:'',
			cargUnit:'',
			consCustName:'',
			version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
        	store.insert(0,c);
        	sm.selectFirstRow();
        	cargoGrid.startEditing(0,1);
        }
	});
	
	var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),iconCls:'remove',scope:this,
		handler:function(){
			var r = sm.getSelections();
			if(r){
				for(var i=0;i<r.length;i++){
					r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
					store.remove(r[i]);
				}
				container.reCalculate();
			}
		}
	});
	var cargoGrid = new Ext.grid.EditorGridPanel({border:false,autoScroll:true,
		clicksToEdit:1,height:126,store:store,sm:sm,cm:cm,
	    tbar:[btnAdd,'-',btnRemove],
	    listeners:{scope:this,afteredit:function(e){			
	    	var f=e.field;
	    	if(f=='cargPackageNum'||
	    			f=='cargNetWeight'||
	    			f=='cargGrossWeight'||
	    			f=='cargMeasurement'||
	    			f=='packName'||
	    			f=='cargMarks'||
	    			f=='cargNameEn'||
	    			f=='cargNameCn'||
	    			f=='packId')
	    	{
	    		container.reCalculate();
	    	}
	    }}});
	Fos.Cargo.superclass.constructor.call(this,{title:C_CARG_DETAIL,anchor:'98.5%',
		layout:'fit',autoScroll:true,items:[
			cargoGrid
		]
	});
};
Ext.extend(Fos.Cargo,Ext.Panel);

//箱信息界面
Fos.Container = function(p,store){
	var cargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=CARG_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FCargo',id:'id'},FCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});	
	var soc = new Ext.grid.CheckColumn({header: "SOC",dataIndex:'contSocFlag',width:55});
	var cm = new Ext.grid.ColumnModel({columns:[sm,
	{header:C_CONT_NO,dataIndex:'contNo',validator:HTUtil.checkContainerNo,editor:new Ext.form.TextField({
		invalidText:'集装箱编码格式不正确，前四位应为字母，后七位为数字，请重新输入！'})},
	{header:C_SEAL_NO,dataIndex:'contSealNo',editor:new Ext.form.TextField({})},
	{header:C_COTY,dataIndex:'cotyId',renderer:HTStore.getCOTY,width:80,
			editor:new Ext.form.ComboBox({displayField:'cotyCode',valueField:'id',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getCOTY_S()})},
	{header:C_FL,dataIndex:'contFl',width:80,
			editor:new Ext.form.ComboBox({displayField:'CODE',valueField:'CODE',triggerAction: 'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.FL_S})},
    soc,
	{header:C_REMARKS,dataIndex:'contRemarks',editor:new Ext.form.TextField()}],defaults:{sortable:true,width:120}});
	var addCont = function(){
		var c = new FContainer({consId:p.get('id'),consNo:p.get('consNo'),contPreFlag:'N',contPartOfFlag:'N',
		consMblNo:p.get('consMblNo'),consHblNo:p.get('consHblNo'),contMid:p.get('id'),contNum:1,
		contVessel:p.get('vessName'),contVoyage:p.get('voyaName'),contPol:p.get('consPolEn'),contPod:p.get('consPodEn'),contDeliveryPlace:p.get('consDeliveryPlace'),
		contMConsNo:p.get('consNo'),contMMblNo:p.get('consMblNo'),contHBlNo:p.get('consHblNo'),
		contNo:'',contSealNo:'',cotyId:'',contFl:'FCL',packId:'',contPackageNum:'',
		contCargoNameEn:'',contGrossWeight:'',contMeasurement:'',contSocFlag:'0',contLoadDate:new Date(),
		contRemarks:'',version:'0',rowAction:'N',uuid:HTUtil.UUID(32)});
       	store.insert(0,c);
       	sm.selectFirstRow();
       	contGrid.startEditing(0,1);
	};
	var removeCont = function(){
		var record = sm.getSelections();
		if(record){
			for(var i=0;i<record.length;i++){
				record[i].set('rowAction',record[i].get('rowAction')=='N'?'D':'R');
				store.remove(record[i]);
			}
		}
	};
	var shipCont = function(){
		var record = sm.getSelected();
		if(record){
			var win = new Fos.ShipCont(p,cargoStore,sm.getSelected());
			win.show();
		}else{
			XMG.alert(SYS,M_REQUIRE_CONT);
		}
	}
	//集装箱权限
	var contLimits=M3_CONT;
	//集装箱列表
	var contGrid = new Ext.grid.EditorGridPanel({border:false,
		plugins:soc,autoScroll:true,clicksToEdit:1,height:126,
		store:store,sm:sm,cm:cm,
		tbar:[{text:C_ADD,iconCls:'add',disabled:NR(contLimits+F_M),handler:addCont},'-',
		{text:C_REMOVE,iconCls:'remove',disabled:NR(contLimits+F_M),handler:removeCont}, '-', 
		{text:C_SHIP_CONT,iconCls:'save',disabled:NR(contLimits+F_M),handler:shipCont}]
    });	
    Fos.Container.superclass.constructor.call(this,{title:C_CONT_INFO,
    	layout:'fit',anchor:'98%',autoScroll:true,items:[
			contGrid
		]
	});
};
Ext.extend(Fos.Container,Ext.Panel);

//装箱界面
Fos.ShipCont = function (p,store,cont){
	var contCargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=COCA_X',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FContainerCargo',id:'id'},FContainerCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	contCargoStore.load({params:{consId:p.get('id'),contId:cont.get('id')}});
	store.load({params:{consId:p.get('id'),cargContStatus:0}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var txtConsMblNo = {header:C_MBL_NO,dataIndex:'consMblNo',width:100};
	var txtConsHblNo = {header:C_HBL_NO,dataIndex:'consHblNo',width:100};
	var txtCargMarks={header:C_MARKS,dataIndex:'cargMarks'};
	var txtCargNameCn={header:C_CARGO_NAME_EN,dataIndex:'cargNameEn'};
	var txtCargNameEn={header:C_CARGO_NAME_CN,dataIndex:'cargNameCn'};
	var txtCargPackageNum={header:C_PACKAGES,dataIndex:'cargPackageNum'};
	var cboCargPackName={header:C_PACK,dataIndex:'packName'};
	var txtCargGrossWeight={header:C_GW_S+C_KGS,dataIndex:'cargGrossWeight',renderer:rateRender};
	var txtCargMeasurement={header:C_CBM,dataIndex:'cargMeasurement',renderer:rateRender};
	var txtCargOwner = {header:C_CARGO_OWNER,dataIndex:'consCustName',width:120};
	var cm=new Ext.grid.ColumnModel({columns:[sm,txtConsMblNo,txtConsHblNo,txtCargMarks,txtCargNameCn,txtCargNameEn,txtCargPackageNum,cboCargPackName,
		txtCargGrossWeight,txtCargMeasurement,txtCargOwner],defaults:{sortable:true,width:80}});
	
	var contCargoSm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var contCargoCm=new Ext.grid.ColumnModel({columns:[contCargoSm,
	{header:C_MBL_NO,dataIndex:'consMblNo',width:100},
	{header:C_HBL_NO,dataIndex:'consHblNo',width:100},
	{header:C_MARKS,dataIndex:'cocaMarks',width:100},	
	{header:C_CARGO_NAME_EN,dataIndex:'cocaCargoName',width:80},	
	{header:C_PACKAGES,dataIndex:'cocaPackageNum',width:60},
	{header:C_PACK,dataIndex:'packName',width:80},
	{header:C_GW_S+C_KGS,dataIndex:'cocaGrossWeight',width:80,renderer:rateRender},	
	{header:C_CBM,dataIndex:'cocaMeasurement',width:80,renderer:rateRender},
	{header:C_CARGO_OWNER,dataIndex:'consCustName',width:120}
	],defaults:{sortable:true,width:120}});
	var shipCont = function(){
		var a = sm.getSelections();
		if(a.length>0){
			for(var i = 0;i<a.length;i++){
				var c = new FContainerCargo({version:'0',rowAction:'N',uuid:HTUtil.UUID(32),
					consId:p.get('id'),contId:cont.get('id'),cargId:a[i].get('id'),
					consNo:p.get('consNo'),contNo:cont.get('contNo'),consMblNo:a[i].get('consMblNo'),
					consHblNo:a[i].get('consHblNo'),cocaMarks:a[i].get('cargMarks'),
					cocaCargoName:a[i].get('cargNameEn'),cocaPackageNum:a[i].get('cargPackageNum'),
					packName:a[i].get('packName'),cocaGrossWeight:a[i].get('cargGrossWeight'),
					cocaMeasurement:a[i].get('cargMeasurement'),consCustName:a[i].get('consCustName')
				});
				contCargoStore.add(c);
				store.remove(a);
			}
		}else{
			XMG.alert(SYS,M_REQUIRE_CARGO);
		}
	};
	var saveContCargo = function(){
		var contCargos = contCargoStore.getModifiedRecords();
		var xml = HTUtil.ATX(contCargos,'FContainerCargo',FContainerCargo);
		Ext.Ajax.request({url:SERVICE_URL,params:{_A:'COCA_S'},method:'POST',
			success:function(res){
				var a = HTUtil.XTRA(res.responseXML,'FContainerCargo',FContainerCargo);
				HTUtil.RUA(contCargoStore,a,FCargo);
				store.reload({params:{consId:p.get('id'),cargContStatus:0}});
				XMG.alert(SYS,M_S);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
	};
	
	var removeContCargo = function(){
		var record = contCargoSm.getSelections();
		if(record.length>0){
			for(var i=0;i<record.length;i++){
				record[i].set('rowAction','R');
				contCargoStore.remove(record[i]);
			}
		}else{
			XMG.alert(SYS,M_REQUIRE_EXIST_CARGO);
		}
	}
	var cargoGrid = new Ext.grid.GridPanel({title:M_NOT_SHIP_CONT,sm:sm,cm:cm,store:store,height:200,region:'north',
	tbar:[{text:C_SHIP_CONT,iconCls:'add',handler:shipCont},'-',
			{text:C_SAVE,iconCls:'save',handler:saveContCargo},'-',
			{text:C_REMOVE,iconCls:'remove',handler:removeContCargo}]});
	
	var contCargoGrid =  new Ext.grid.GridPanel({title:M_SHIP_CONT,region:'center',
		sm:contCargoSm,cm:contCargoCm,store:contCargoStore,height:200
	});
	Fos.ShipCont.superclass.constructor.call(this,{width:700,height:420,
		layout:'border',frame:false,header:false,
		border:false,autoScroll:true,items:[cargoGrid,contCargoGrid]
	});
};
Ext.extend(Fos.ShipCont,Ext.Window);