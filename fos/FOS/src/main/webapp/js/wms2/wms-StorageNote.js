
//入库单主界面
Fos.StorageNotePanel = function(p) {
	this.sel=-1000;
	var storageClassId=p.get('storageClassId');
	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNoteCargo',id:'id'},WStorageNoteCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var atStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WASSETS_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WAssets',id:'id'},WAssets),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
   
    
    var receivedCargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WRECEIVED_CARGO_X',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WReceivedCargo',idProperty:'id'},WReceivedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    
    var cargoStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WCARGO_X',baseParams:{_mt:'xml'},
			reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCargo',idProperty:'id'}, WCargo),
				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    
    if(p.get('rowAction')!='N'){
    	store.load({params:{storageNoteId:p.get('id')}});
    	atStore.load({params:{storageNoteId:p.get('id')}});
    	
    }
    

	
	
    //这个函数应该这样理解
	//这个函数是在执行HTUtil.REQUEST时传的第三个参数，
	//这个参数是一个函数，会有请求成功时调用，r表示request返回的response
	//s表示scope,因此意思就是获得当前对象的容器，用该容器删除当前对象。
	this.removeTab=function(r,s){
		var tab = s.ownerCt;	//得到当前对像所在的容器
		tab.remove(s);
	};
	

	//单据状态改为提交或未提交时的处理函数
    this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'WSTORAGE_NOTE_U',id:p.get('id'),status:s},
			success: function(r){
				var sn = HTUtil.XTR(r.responseXML,'WStorageNote',WStorageNote);
                HTUtil.RU(sn,p,WStorageNote);
                
                var rs = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
                HTUtil.RUA(store,rs,WStorageNoteCargo);
               
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				var status=tab.find('name','status');
				
				//如果改为了未提交
				if(status){
					if (s==0)
					{
							if (p.get('storageType')==0)
							{
								status[0].setValue(HTStore.getInWarehouseNoteStatus(0));
							}
							
							if (p.get('storageType')==1)
							{
								status[0].setValue(HTStore.getOutWarehouseNoteStatus(0));
							}
							
							grid.addButton.enable();
							grid.editButton.enable();
							grid.removeButton.enable();
							
						
					}
					//如果改为了提交
					if (s==1)
					{
						if (p.get('storageType')==0)
						{
							status[0].setValue(HTStore.getInWarehouseNoteStatus(1));
						}
						
						if (p.get('storageType')==1)
						{
							status[0].setValue(HTStore.getOutWarehouseNoteStatus(1));
						}
						
				
						grid.addButton.disable();
						grid.editButton.disable();
						grid.removeButton.disable();
						
					}
				}
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
	};

	
	//根据单据状态改变主界面工具栏上的按钮状态
	this.updateToolBar = function(){
		btnReceviedCargo.setDisabled(p.get('status')>3 || p.get('status')==0);
		//btnInListExcel.setDisabled(p.get('status')>3 || p.get('status')==0);
		btnSave.setDisabled(p.get('status')>5);
		btnRemove.setDisabled(p.get('rowAction')=='N'||p.get('status')!=0);
		btnCheck.setDisabled(p.get('rowAction')=='N'||p.get('status')!=0);
		bCancelCheck.setDisabled(p.get('status')!=1&&p.get('status')!=2);
		btnPrint.setDisabled(p.get('rowAction')=='N');
		btnDollar.setDisabled(p.get('status')<1);
		
	};
	
	
	//入库单号
	var txtStorageNoteNo=new Ext.form.TextField({fieldLabel:C_IN_STORAGE_NOTE_NO,
			name:'storageNoteNo',value:p.get('storageNoteNo'),tabIndex:1,
			ref:'../storageNoteNo',readOnly:true,xtype:'textfield',anchor:'95%'});
	
		//货主
	var lkpCargoOwnerName=new Fos.CustomerLookup({fieldLabel:C_CARGO_OWNER,tabIndex:5,name:'cargoOwnerName',value:p.get('cargoOwnerName'),itemCls:'required',
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwnerName',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('cargoOwnerId','');				
				}},
			select:function(c,r,i){
				p.set('cargoOwnerId',r.get('id'));
				
				
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});
	
	
	
	//来源或者类型
	var cboStorageClass=new Ext.form.ComboBox({fieldLabel:'产品类型',xtype:'combo',name:'storageClass',value:p.get('storageClass'),itemCls:'required',
			ref:'../storageClass',store:WHTStore.STORAGE_CLASS_S,displayField:'NAME',valueField:'NAME',tabIndex:2,
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,select:function(c,r,i){
				storageClassId=r.get('CODE');
			}}
	});
	
	var cboActionGategory=new Ext.form.ComboBox({fieldLabel:'入库类别',name:'actionGategory',value:p.get('actionGategory'),
		    store:WHTStore.ACTION_GATEGORY,displayField:'NAME',valueField:'NAME',tabIndex:3,itemCls:'required',
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,select:function(c,r,i){
				//=r.get('CODE');
				p.set('actionGategoryId',r.get('CODE'));
			}}
	});
	
	//预计时间
	var c13=new Ext.form.DateField({fieldLabel:C_PLANED_IN_DATE,
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d|Y.m.d',
			tabIndex:6,name:'planedTime',value:p.get('planedTime'),
			ref:'../planedTime',itemCls:'required',xtype:'datefield',format:DATEF,anchor:'95%'});
	
	//状态
	var ccboStatus=new Ext.form.ComboBox({fieldLabel:'入库单状态',name:'status',
			value:HTStore.getInWarehouseNoteStatus(p.get('status')),mode:'local',
			store:WHTStore.IN_WAREHOUSE_NOTE_S,displayField:'NAME',valueField:'CODE',
			disabled:true,ref:'../status',
			style:'{font-weight:bold;color:green;}',anchor:'95%'});
	
			
	
	//订单号
	var txtOrderNo=new Ext.form.TextField({fieldLabel:'采购订单号',name:'orderNo',value:p.get('orderNo'),tabIndex:7,
			ref:'../orderNo',xtype:'textfield',itemCls:'required',anchor:'95%',
			listeners:{scope:this,
				blur:function(f){}
			}
	});
	
	//客户订单号
	var txtEntrustNo=new Ext.form.TextField({fieldLabel:'委托编号',xtype:'textfield',name:'entrustNo',tabIndex:4,
			value:p.get('entrustNo'),anchor:'95%'
	});			
			
	//接单日期
	var cdteStorageDate=new Ext.form.DateField({fieldLabel:C_STORAGE_DATE,tabIndex:8,name:'storageDate',value:p.get('storageDate'),altFormats:'Ymd|Y/m/d|Y-m-d|Y.m.d',
			ref:'../storageDate',xtype:'datefield',format:DATEF,anchor:'95%'});
	
	//出入库要求
	var ctxtRequirement=new Ext.form.TextField({fieldLabel:p.get('storageType')==0?C_IN_STORAGE_REQUIREMENT:C_OUT_STORAGE_REQUIREMENT,name:'custRequirement',
			value:p.get('custRequirement'),tabIndex:17,anchor:'97%'});

	
	//供应商
	var ccluCustName=new Fos.CustomerLookup({fieldLabel:'供应商',tabIndex:10,name:'custName',value:p.get('custName'),
			store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('custId','');
					
					var custContact=tab.find('name','custContact');
					var custTel=tab.find('name','custTel');
					var custFax=tab.find('name','custFax');
					if(custContact)
						custContact[0].setValue('');
					if(custTel)
						custTel[0].setValue('');
					if(custFax)
						custFax[0].setValue('');
				}},
			select:function(c,r,i){
				p.set('custId',r.get('id'));
				var cargoOwnerName = tab.find('name','cargoOwnerName');
				if(cargoOwnerName)
				{
					if(cargoOwnerName[0].getValue()==''||cargoOwnerName[0].getValue()==null){
						cargoOwnerName[0].setValue(r.get('custNameCn'));
						p.set('cargoOwnerId',r.get('id'));
					}
						
				}
				var custContact=tab.find('name','custContact');
				var custTel=tab.find('name','custTel');
				var custFax=tab.find('name','custFax');
				var loadAddress=tab.find('name','loadAddress');
				if(loadAddress)
					loadAddress[0].setValue(r.get('custAddress'));
				if(custContact)
					custContact[0].setValue(r.get('custContact'));
				if(custTel)
					custTel[0].setValue(r.get('custTel'));
				if(custFax)
					custFax[0].setValue(r.get('custFax'));
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});
	

	
	//供应商联系人
	var ctxtCustContact=new Ext.form.TextField({fieldLabel:C_CONTACT,name:'custContact',value:p.get('custContact'),tabIndex:10,
			anchor:'95%'});	
			
	//供应商电话
	var ctxtCustTel=new Ext.form.TextField({fieldLabel:C_TEL,name:'custTel',value:p.get('custTel'),tabIndex:11,
			anchor:'95%'});
			
	//货主传真
	var ctxtCustFax=new Ext.form.TextField({fieldLabel:C_FAX,name:'custFax',value:p.get('custFax'),tabIndex:12,
			ref:'../custFax',xtype:'numberfield',anchor:'95%'});
	
	var listConsignee=function(f,e){
		if((e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN)){
			var q=f.getRawValue();			
			if(q.length>=1 ){				
		   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
		   			params:{_A:'WSTORAGE_NOTE_F',_mt:'xml',loadAddress:q},
					success: function(r,o){
						f.store.loadData(r.responseXML,false);
						if(!f.isExpanded()){
							f.expand();
						}
					}
					
				});
			}
			else if((q.length==0||q.lenght<1) && f.isExpanded()){				
				f.store.removeAll();
				f.collapse();
			}
		}
	};
	
	//收货地址
	var loadAddress=new Ext.form.ComboBox({fieldLabel:'收货地址',name:'loadAddress',value:p.get('loadAddress'),tabIndex:13,
			xtype:'combo',anchor:'97%',
				store:WHTStore.getLoadAddress('WSTORAGE_NOTE_F'),
				displayField:'loadAddress',valueField:'loadAddress',
				typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
				listeners:{scope:this,
					keyup:{fn:function(f,e){
						listConsignee(f,e);
					},buffer:600}
			 	}
	});			
	
	
	//入库单据信息sheet
	var masterInfoPanel=new Ext.Panel({
		title:'基本信息',labelAlign:'right',padding:5,
		layout:'column',layoutConfig:{columns:4},
		items:[
			{columnWidth:.25,layout:'form',labelWidth:70,border:false,items:[
				txtStorageNoteNo,lkpCargoOwnerName/*,cboStorageClass*/]},
			{columnWidth:.25,layout:'form',labelWidth:95,border:false,items:[
                 cboActionGategory,txtOrderNo]},
			{columnWidth:.25,layout:'form',labelWidth:95,border:false,items:[
             	c13,txtEntrustNo]},
			{columnWidth:.25,layout:'form',labelWidth:95,border:false,items:[				
                 cdteStorageDate,ccboStatus]},
			{columnWidth:.5,layout:'form',labelWidth:70,border:false,items:[
                ctxtRequirement ]}
			]
	});
	
	
	//*****************客户信息sheet********************/
	var pnlCustInfo=new Ext.Panel({
		title:'供应商',labelAlign:'right',padding:5,
		labelWidth:90,layout:'column',
		items:[{columnWidth:.25,layout:'form',border:false,
			items:[ccluCustName]},
		       {columnWidth:.25,layout:'form',border:false,
				items:[ctxtCustContact]},
		       {columnWidth:.25,layout:'form',border:false,
					items:[ctxtCustTel]},
				{columnWidth:.25,layout:'form',border:false,
					items:[ctxtCustFax]},
		       {columnWidth:.5,layout:'form',border:false,
						items:[loadAddress]}]
	});
	
	
	
	var ctxtOriginCountry=new Ext.form.ComboBox({fieldLabel:'原产国',name:'countryOfOrigin',value:p.get('countryOfOrigin'),
			xtype:'textfield',tabIndex:4,anchor:'95%',xtype:'combo',
			store:HTStore.getCOUN_S(),
			displayField:'counNameCn',valueField:'counNameCn',
			typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,
			enableKeyEvents:true,
			listeners:{scope:this,
			 	keydown:{fn:function(f,e){
			 		if(e.getKey()==e.ENTER){
			 			ctxtRequirement.focus();
					} 
			 	},buffer:200}
		 	}
	});
	

	var cboGoalCountry=new Ext.form.ComboBox({fieldLabel:'进口国',name:'countryOfGoal',value:p.get('countryOfGoal'),
		tabIndex:4,anchor:'95%',xtype:'combo',
		store:HTStore.getCOUN_S(),
		displayField:'counNameCn',valueField:'counNameCn',
		typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:{fn:function(f,e){
		 		if(e.getKey()==e.ENTER){
		 			ctxtRequirement.focus();
				} 
		 	},buffer:200}
	 	}
});
	var ctxtTruckType=new Ext.form.TextField({fieldLabel:'车型',name:'truckType',value:p.get('truckType'),
		tabIndex:1,anchor:'95%'});
	var ctxtTruckNo=new Ext.form.TextField({fieldLabel:'车号',name:'truckNumber',value:p.get('truckNumber'),
		tabIndex:1,anchor:'95%'});
	var ctxtOrigin=new Ext.form.TextField({fieldLabel:'装货地',name:'pol',value:p.get('pol'),
		tabIndex:1,anchor:'95%'});
	var ctxtDestination=new Ext.form.TextField({fieldLabel:'卸货地',name:'pod',value:p.get('pod'),
		tabIndex:1,anchor:'95%'});
	var ctxtDeliveryPoint =new Ext.form.TextField({fieldLabel:'交货地',name:'destination',value:p.get('destination'),
		tabIndex:1,anchor:'95%'});
	var ctxtDriver=new Ext.form.TextField({fieldLabel:'司机',name:'driver',value:p.get('driver'),
		tabIndex:1,anchor:'95%'});
	var ccboPaymentClause=new Ext.form.ComboBox({fieldLabel:'付款条款',name:'pateName',value:p.get('pateName'),
		store:HTStore.getPATE_S(),tabIndex:6,
		displayField:'pateName',valueField:'pateName',typeAhead:true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	var ctxtPaymentRemarks=new Ext.form.TextField({fieldLabel:'付款描述',name:'pateRemark',value:p.get('pateRemark'),
		tabIndex:1,anchor:'95%'});
	var ccboDeliveryClause=new Ext.form.ComboBox({fieldLabel:'交货条款',store:HTStore.getPATE_S(),tabIndex:6,
		name:'deliName',value:p.get('deliName'),
		displayField:'pateName',valueField:'pateName',typeAhead:true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	var ctxtDeliveryRemarks=new Ext.form.TextField({fieldLabel:'交货描述',name:'deliRemark',value:p.get('deliRemark'),
		tabIndex:1,anchor:'95%'});

	
	//运单信息sheet
	var pnlTransInfo=new Ext.Panel({
		title:'运单信息',labelAlign:'right',padding:5,
		labelWidth:80,layout:'column',
		items:[{columnWidth:0.25,layout:'form',border:false,items:[ctxtOriginCountry,ctxtOrigin,ccboPaymentClause]},
		       {columnWidth:0.25,layout:'form',border:false,items:[cboGoalCountry,ctxtDestination,ctxtPaymentRemarks]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtTruckType,ctxtDeliveryPoint,ccboDeliveryClause]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtTruckNo,ctxtDriver,ctxtDeliveryRemarks]}]
	});

	var ctxtMasterTransNo=new Ext.form.TextField({fieldLabel:'主单号',name:'masterTransNo',value:p.get('masterTransNo'),
		tabIndex:1,xtype:'textfield',anchor:'95%'});
	var cnumQuantity=new Ext.form.NumberField({fieldLabel:'总件数',name:'quantity',value:p.get('quantity'),
		tabIndex:7,anchor:'95%'});	
	var ctxtTransNo=new Ext.form.TextField({fieldLabel:'分单号',name:'transNo',value:p.get('transNo'),
		tabIndex:2,anchor:'95%'});
	var cnumGW=new Ext.form.NumberField({fieldLabel:'总毛重',name:'grossWeight',value:p.get('grossWeight'),
		tabIndex:9,anchor:'95%'});
	var cnumNW=new Ext.form.NumberField({fieldLabel:'总净重',name:'netWeight',value:p.get('netWeight'),
		tabIndex:10,anchor:'95%'});
	var cnumV=new Ext.form.NumberField({fieldLabel:'总体积',name:'volume',value:p.get('volume'),
		tabIndex:11,anchor:'95%'});

	
	
	var numTankNum=new Ext.form.NumberField({fieldLabel:'箱量',name:'tankNum',value:p.get('tankNum'),tabIndex:15,anchor:'95%'});
	var cboTankType=new Ext.form.ComboBox({fieldLabel:'箱型',name:'tankType',value:p.get('tankType'),
			store:HTStore.getCOTY_S(),tabIndex:16,
    		displayField:'cotyCode',valueField:'cotyCode',typeAhead:true,
    		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	
	var otherInfoPanel=new Ext.Panel({
		title:'其他信息',labelAlign:'right',padding:5,
		labelWidth:80,layout:'column',
		items:[{columnWidth:0.25,layout:'form',border:false,items:[ctxtMasterTransNo,cnumQuantity]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtTransNo,cnumGW]},
		       {columnWidth:0.25,layout:'form',border:false,items:[numTankNum,cnumNW]},
		       {columnWidth:0.25,layout:'form',border:false,items:[cboTankType,cnumV]}]
	});
	
	
	
	
	
	var cnumPackages=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true,
		listeners:{scope:this,    			
			blur:function(f){
				var r=smRCargo.getSelected();
				if(r){
    				if(f.getRawValue()==''){
    					f.clearValue();
    				}
    				else{
    					var sq=HTUtil.round2(r.get('standardQuantity'));
    					var sgw=HTUtil.round2(r.get('standardGrossWeight'));
    					var snw=HTUtil.round2(r.get('standardNetWeight'));
    					var sv=HTUtil.round4(r.get('standardVolume'));
    					var stm=HTUtil.round2(r.get('standardMeasure'));
    					var packages=HTUtil.round2(f.getValue());
    					var quantity=HTUtil.round2(packages*sq);
    					
    					r.set('receivedQuantity',quantity);
    					r.set('receivedGrossWeight',HTUtil.round2(packages*sgw));
    					r.set('receivedNetWeight',HTUtil.round2(packages*snw));
    					r.set('receivedVolume',HTUtil.round4(packages*sv));
    					r.set('receivedMeasure',HTUtil.round2(packages*stm));
    					
    					}
				}
				
			}
		}
	
	});
	var cnumQuantity=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true,
			listeners:{scope:this,    			
				blur:function(f){
					var r=smRCargo.getSelected();
					if(r){
	    				if(f.getRawValue()==''){
	    					f.clearValue();
	    				}
	    				else{
	    					var sq=HTUtil.round2(r.get('standardQuantity'));
	    					var sgw=HTUtil.round2(r.get('standardGrossWeight'));
	    					var snw=HTUtil.round2(r.get('standardNetWeight'));
	    					var sv=HTUtil.round4(r.get('standardVolume'));
	    					var stm=HTUtil.round2(r.get('standardMeasure'));
	    					var quantity=numRender(f.getValue());
	    					var packages=HTUtil.round2(quantity/sq);
	    					if(Ext.isEmpty(r.get('receivedPackages'))){
	    						r.set('receivedPackages',packages);
	    					}
	    					
	    					r.set('receivedGrossWeight',HTUtil.round2(packages*sgw));
	    					r.set('receivedNetWeight',HTUtil.round2(packages*snw));
	    					r.set('receivedVolume',HTUtil.round4(packages*sv));
	    					r.set('receivedMeasure',HTUtil.round2(packages*stm));
	    					
	    					}
					}
					
				}
			}
	
	});
	var cnumGrossWeight=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true
	});
	var cnumNetWeight=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true
	});
	var cnumVolume=new Ext.form.NumberField({
		decimalPrecision:4,allowNegative:false,selectOnFocus:true
	});
	
	var ccboPUnitName=new Ext.form.ComboBox({align:'center',	      
	  displayField:'unitName',valueField:'unitName',triggerAction:'all',
      mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
      store:HTStore.getUNIT_C(),anchor:'95%',
      listeners:{scope:this,select:function(c,r,i){
    	  smRCargo.getSelected().set('pUnitId',r.get('id'));
		}}});
	
	var ccboQualityType=new Ext.form.ComboBox({align:'center',
		displayField:'NAME',valueField:'NAME',triggerAction:'all',
        mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:WHTStore.QUALITY_TYPE_S,anchor:'95%'});
	//收货表选择事件
	var rsRCargo={scope:this,
    		rowselect:function(sm,row,record){
    	}
    		
    };
	
	var smRCargo=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this,listeners:rsRCargo});
	var cmRCargo=new Ext.grid.ColumnModel({columns:[smRCargo,
	        new Ext.grid.RowNumberer(),
	        {header:'品质',
					dataIndex:'qualityType',
					editor:ccboQualityType,
					width:70,
					align:'center'},	        
            {header:'SKU',
					dataIndex:'skuNo',
					width:90,
					align:'center'},          	
          	/*{header:'生产编号',dataIndex:'productNo',width:75,align:'center'},*/
          	{header:'EA单位',dataIndex:'unitName',width:70,align:'center'},
        	{header:'收货EA',
          			dataIndex:'receivedQuantity',
          			editor:cnumQuantity,
          			width:75,
          			align:'center'},
          	{header:'收货件数',
          				dataIndex:'receivedPackages',
          				editor:cnumPackages,
          				width:75,
          				align:'center'},
          	{header:'件数ID',dataIndex:'pUnitId',width:70,align:'center',hidden:true},
          	{header:'件数单位',
          		dataIndex:'pUnit',
          		editor:ccboPUnitName,
          		width:70,
          		align:'center'},
          	{header:'收货毛重',
          			dataIndex:'receivedGrossWeight',
          			editor:cnumGrossWeight,
          			width:75,
          			align:'center'},
          	{header:'收货净重',
          				dataIndex:'receivedNetWeight',
          				editor:cnumNetWeight,
          				width:75,
          				align:'center'},
          	{header:'收货体积',
          					dataIndex:'receivedVolume',
          					editor:cnumVolume,
          					width:75,
          					align:'center'},          	
          	{header:'商品名称',dataIndex:'cargoName',width:200,align:'center'},
          	{header:'上架数量',dataIndex:'placedQuantity',width:75,align:'center'},
          	{header:'库位',dataIndex:'blockName',width:75,align:'center'},
          	{header:'库区',dataIndex:'areaName',width:75,align:'center'},
          	{header:'仓库',dataIndex:'warehouseName',width:90,align:'center'},
          	{header:'生产日期',dataIndex:'productDate',renderer:formatDate,width:90,align:'center'},
          	{header:'重量单位',dataIndex:'wUnitName',width:75,align:'center'},	                                      	
          	{header:'体积单位',dataIndex:'vUnitName',width:75,align:'center'},	                                      	
          	{header:'商品规格',width:120,dataIndex:'specification',width:75,align:'center'},
          	{header:'商品型号',width:120,dataIndex:'cargoType',width:75,align:'center'},
          	{header:'商品颜色',width:120,dataIndex:'cargoColor',width:75,align:'center'},
          	{header:'拆零数量',dataIndex:'openStockNum',width:75,align:'center'},
          	{header:'收货序号',dataIndex:'id',width:95,align:'center'},
            {header:'入库单号',dataIndex:'storageNoteNo',width:120,align:'center'},
            {header:'入库ID',dataIndex:'storageNoteId',width:75,align:'center'},
            {header:'货物明细ID',dataIndex:'storageNoteCargoId',width:95,align:'center'},
        	{header:'最小单位数量',dataIndex:'standardQuantity',width:95,align:'center'},
        	{header:'最小单位毛重',dataIndex:'standardGrossWeight',width:95,align:'center'},
        	{header:'最小单位净重',dataIndex:'standardNetWeight',width:95,align:'center'},
        	{header:'最小单位体积',dataIndex:'standardVolume',width:95,align:'center'},
        	{header:'最小单位面积',dataIndex:'standardMeas',width:95,align:'center'},
        	 {header:'状态',dataIndex:'status',renderer:WHTStore.getInWarehouseNoteStatus,width:70,align:'center'}
              ],defaults:{sortable:true,width:100}}); 
	var addReceivedCargo=function(){
		var r = sm.getSelected();
		if(r){
			if(HTUtil.round2(r.get('planedQuantity'))>HTUtil.round2(r.get('receivedQuantity'))){
				var newR=createReceivedCargo(r);
				grdReceivedCargo.insert(0,newR);
				smRCargo.selectFirstRow();
			}
			else{
				Ext.Msg.alert(SYS,"您选择的货物已经全部收货，请确认！");
			}
		}
		else{
			Ext.Msg.alert(SYS,"请确认是否已经选中上方表格中的货物！");
		}
	};
	
	var saveReceivedCargo=function(){
		var mRCRows=receivedCargoStore.getModifiedRecords();
		var xml='';
		if(mRCRows.length){
			xml+=HTUtil.ATX(mRCRows,'WReceivedCargo',WReceivedCargo);
		}
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_S'},
				success: function(r){
					var a = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
					HTUtil.RUA(store,a,WStorageNoteCargo);
					var b=HTUtil.XTRA(r.responseXML,'WReceivedCargo',WReceivedCargo);
					HTUtil.RUA(receivedCargoStore,b,WReceivedCargo);
					Ext.Msg.alert(SYS,M_S);
				},
				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)
				});
		}
		else{
			
		}
	};
	var delReceivedCargo=function(){
		var rows=smRCargo.getSelections();
		var cc=[];
		if(rows.length){
			for(var i=0;i<rows.length;i++){
				var r=rows[i];
				if(HTUtil.round2(r.get('placedQuantity'))>0){
					Ext.Msg.alert(SYS,r.get("cargoName")+"已上架,数据为："+r.get('placedQuantity')+"，不能删除");
					return ;
				}
				if(r.get('rowAction')=='N'){
					r.set('rowAction','D');
					receivedCargoStore.remove(r);
				}
				else{
					r.set('rowAction','R');
					cc[cc.length]=r;
				}
			}
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(cc,'WReceivedCargo');
	        		if(xml){
	    				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_S'},
	        				success: function(r){
	        					var a = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
	    						HTUtil.RUA(store,a,WStorageNoteCargo);
	    						receivedCargoStore.remove(cc);
	        				},
	        				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
	        				xmlData:HTUtil.HTX(xml)
	        				});
	    			}
	    			else{
	    				alert("xml is empty！");
	    			}
	        	}
			},this);
		}
		else{
			alert("rows length=0!");
		}
	};
	
	var btnAddRC=new Ext.Button({text:"新增收货",iconCls:'add',disabled:p.get('status')>=5,
		scope:this,handler:addReceivedCargo}
	);
	//保存按钮
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',id:'btnSave',disabled:p.get('status')>5,
		scope:this,handler:saveReceivedCargo}
	);
	var btnDelRC=new Ext.Button({text:'删除',iconCls:'remove',disabled:p.get('status')>=5,
		scope:this,handler:delReceivedCargo});

	var grdReceivedCargo=new Ext.grid.EditorGridPanel({title:'收货',
		layout:'fit',region:'south',height:230,
    	closable:true,columnLines:true,stripeRows: true,
    	store:receivedCargoStore,sm:smRCargo,cm:cmRCargo,
    	clicksToEdit:1,
    	tbar:[btnDelRC,btnSave],
    	listeners:{scope:this,			
			afterrender:function(){
				
			},
			beforeedit:function(e){
				
			},
			afteredit:function(e){
				if(cargoStore.getTotalCount()>0){
					var cargo=cargoStore.getAt(0);					
					var f=e.field;
					var r=e.record;
					var unitId=r.get('pUnitId');
					var standardQ=Fos.getStdQuantity(unitId,cargo);
					
					var sq=HTUtil.round2(standardQ[0]);
					var sgw=HTUtil.round2(standardQ[1]);
					var snw=HTUtil.round2(standardQ[2]);
					var sv=HTUtil.round4(standardQ[3]);
					var pUnitId=standardQ[4];
					var pUnitName=standardQ[5];
					var stm=0;
					var quantity=r.get('receivedQuantity');
					var packages=r.get('receivedPackages');	
			    	if(f=='receivedQuantity'){			    							
			    		quantity=HTUtil.round2(e.value);						
						packages=HTUtil.round2(quantity/sq);
						
			    	}
			    	if(f=='receivedPackages'){
			    		packages=HTUtil.nulltoZero(e.value);			    		
			    		quantity=HTUtil.round2(packages*sq);
			    	}
			    	if(f=='pUnit'){
			    		
			    		packages=HTUtil.round2(quantity/sq);
			    	}
			    	
			    	r.beginEdit();					
					r.set('receivedQuantity',quantity);
					r.set('receivedPackages',packages);
					r.set('receivedGrossWeight',HTUtil.round2(packages*sgw));
					r.set('receivedNetWeight',HTUtil.round2(packages*snw));
					r.set('receivedVolume',HTUtil.round2(packages*sv));
					r.set('receivedMeasure',HTUtil.round2(packages*stm));
					
					r.set('standardQuantity',sq);
					r.set('standardGrossWeight',sgw);
					r.set('standardNetWeight',snw);
					r.set('standardVolume',sv);
					
					
		    		r.endEdit();
				}
			}
    	}
    	
	});
	
	//货物表选择事件
	var re={scope:this,
    		rowselect:function(sm,row,record){
    				if(this.sel!=record.get('id')){
    				this.sel=record.get('id');
    				receivedCargoStore.removeAll();
    				cargoStore.removeAll();
    				receivedCargoStore.load({params:{storageNoteCargoId:record.get('id')}});    				
    				cargoStore.load({params:{id:record.get('cargoId')}});    				
    			}
    		}
    		
    };
    //入库单货物明细grid	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this,listeners:re});
    var cmIn=new Ext.grid.ColumnModel({columns:[sm,
    new Ext.grid.RowNumberer({header:'序号',width:36}),
    {header:'商品编号',dataIndex:'skuNo',width:85,align:'center'},
	{header:'商品名称',dataIndex:'cargoName',align:'center'},
	/*{header:'生产编号',dataIndex:'productNo',width:80,align:'center'},*/
	{header:'件数单位ID',dataIndex:'pUnitId',width:70,align:'center'},
	{header:'包装单位',dataIndex:'pUnit',width:70,align:'center'},
	{header:'包装数量',dataIndex:'planedPackages',width:70,align:'center'},
	{header:'EA单位',dataIndex:'unitName',width:70,align:'center'},
	{header:'EA数量',dataIndex:'planedQuantity',width:70,align:'center'},
	{header:'收货数量',dataIndex:'receivedQuantity',width:70,align:'center'},
	{header:'调整数量',dataIndex:'adjustQuantity ',width:70,align:'center'},
	{header:'上架数量',dataIndex:'placedQuantity',width:70,align:'center'},
	{header:'重量单位',dataIndex:'wUnitName',width:70,align:'center'},
	{header:'计划毛重',dataIndex:'planedGrossWeight',width:80,align:'center'},
	{header:'计划净重',dataIndex:'planedNetWeight',width:80,align:'center'},
	{header:'收货毛重',dataIndex:'receivedGrossWeight',width:80,align:'center'},
	{header:'收货净重',dataIndex:'receivedNetWeight',width:80,align:'center'},
	{header:'体积单位',dataIndex:'vUnitName',width:70,align:'center'},
	{header:'计划体积',dataIndex:'planedVolume',width:90,align:'center'},
	{header:'收货体积',dataIndex:'receivedVolume',width:90,align:'center'},
	{header:'面积单位',dataIndex:'mUnitName',width:80,align:'center'},
	{header:'计划面积',dataIndex:'planedMeasure',width:80,align:'center'},
	{header:'收货面积',dataIndex:'receivedMeasure',width:80,align:'center'},
	
	{header:'单价',dataIndex:'unitPrice',width:80,align:'center'},
	{header:'生产日期',dataIndex:'productDate',renderer:formatDate,width:90,align:'center'},
	{header:'批次号',dataIndex:'batchNo',width:80,align:'center'},
	{header:'仓库',dataIndex:'warehouseName',width:80,align:'center'},
	{header:'库区',dataIndex:'areaName',width:80,align:'center'},
	{header:'库位',dataIndex:'blockName',width:80,align:'center'},	
	{header:'商品规格',width:120,dataIndex:'specification',align:'center'},
	{header:'商品型号',width:120,dataIndex:'cargoType',align:'center'},
	{header:'商品颜色',width:120,dataIndex:'cargoColor',align:'center'},
	{header:'备注',dataIndex:'remarks',width:80,align:'center'},
	{header:'质检标志',dataIndex:'qAFlag',width:80,align:'center'},
	{header:'质检类型',dataIndex:'qAType',width:80,align:'center'}
    ],defaults:{sortable:true,width:100}});    
    
    //新增商品
    var addCargo = function(){
    	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
    	else{
    		var c = new WStorageNoteCargo({uuid:HTUtil.UUID(32),
    			storageNoteId:p.get('id'),storageNoteNo:p.get('storageNoteNo'),
    			compCode:p.get('compCode'),
    			warehouseId:p.get('warehouseId'),warehouseCode:p.get('warehouseCode'),
    			warehouseName:p.get('warehouseName'), batchNo:p.get('batchNo'),storageType:p.get('storageType'),			
    			rowAction:'N'});
        	var win = new Fos.WNoteCargoWin(c,store);
        	win.show();
    	}    	
    };
    
    //编辑商品
    var editCargo = function(){
    	var c = sm.getSelected();
    	if(c.get('status')==5){
    		Ext.Msg.alert(SYS,"已经上架完成！不允许再编辑！");
    		return;
    	}
    	c.set('rowAction','M');
    	var win = new Fos.WNoteCargoWin(c,store);
    	win.show();
    };
    
    //删除商品
    var deleteCargo = function(){
    	if(p.get('status')==5){
    		Ext.Msg.alert(SYS,'该入库单的状态是完成状态，不能删除！');
    		return;
    	}
    	var b =sm.getSelections();
		if(b.length>0){
			for(var i=0;i<b.length;i++){
	    		if(!Ext.isEmpty(b[i].get('receivedQuantity'))&&b[i].get('receivedQuantity')!=0){
	    			Ext.Msg.alert(SYS,b[i].get('cargoName')+"已经收货，不能删除！");
	    			return ;
	    		}
			}
			
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(b,'WStorageNoteCargo');
	        		HTUtil.REQUEST('WSTORAGE_NOTE_CARGO_S', xml, function(){store.remove(b);});
	        	}
			},this);
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
    	
    };
    
    var autoReceived=function(){
    	var rows=sm.getSelections();
    	if(rows.length){
    		for(var i=0;i<rows.length;i++){
    			var r=rows[i];
    			if(r.get('rowAction')=='N'||r.get('rowAction')=='n'){
    				Ext.Msg.alert(SYS,"当前记录是新增状态，请先保存！");
    				return ;
    			}
    		}
    		for(var i=0;i<rows.length;i++){
    			var r=rows[i];
    			if(r.get('rowAction')==''||r.get('rowAction')=='M'){
    				if(HTUtil.round2(r.get('planedQuantity'))>HTUtil.round2(r.get('receivedQuantity')))
    					createReceivedCargo(r);
    			}
    		}
    		
    		var mRCRows=receivedCargoStore.getModifiedRecords();
    		var xml='';
    		if(mRCRows.length){
    			xml+=HTUtil.ATX(mRCRows,'WReceivedCargo',WReceivedCargo);
    		}
    		if(xml){
    			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_S'},
    				success: function(r){
    					var a = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
    					
						HTUtil.RUA(store,a,WStorageNoteCargo);
						var b=HTUtil.XTRA(r.responseXML,'WReceivedCargo',WReceivedCargo);
						HTUtil.RUA(receivedCargoStore,b,WReceivedCargo);
						Ext.Msg.alert(SYS,M_S);
    				},
    				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
    				xmlData:HTUtil.HTX(xml)
    				});
    		}
    		else{
    			
    		}
    		
    	}
    	else{
    		Ext.Msg.alert(SYS,"没有获得数据！");
    	}
    };
    
    var createReceivedCargo=function(r){
    	var t=new WReceivedCargo({
			storageNoteCargoId:r.get('id'),
			storageNoteNo:r.get('storageNoteNo'),
			storageNoteId:r.get('storageNoteId'),
			skuNo:r.get('skuNo'),
			cargoId:r.get('cargoId'),
			cargoName:r.get('cargoName'),
			specification:r.get('specification'),
			cargoType:r.get('cargoType'),
			cargoColor:r.get('cargoColor'),
			orderNo:r.get('orderNo'),
			cargoOwnerName:p.get('cargoOwnerName'),
			cargoOwnerId:p.get('cargoOwnerId'),
			standardQuantity:r.get('standardQuantity'),
			standardGrossWeight:r.get('standardGrossWeight'),
			standardNetWeight:r.get('standardNetWeight'),
			standardVolume:r.get('standardVolume'),
			standardMeasure:r.get('standardMeasure'),
			palletQuantity:1,
			status:0,
			verson:0,
			rowAction:'N',
			uuid:HTUtil.UUID(32)});
		
		t.set('warehouseId',r.get('warehouseId'));
		t.set('warehouseCode',r.get('warehouseCode'));
		t.set('warehouseName',r.get('warehouseName'));
		
		t.set('areaId',r.get('areaId'));
		t.set('areaCode',r.get('areaCode'));
		t.set('areaName',r.get('areaName'));
		
		t.set('blockId',r.get('blockId'));
		t.set('blockCode',r.get('blockCode'));
		t.set('blockName',r.get('blockName'));
		t.set('batchNo',r.get('batchNo'));
		t.set('productNo',r.get('productNo'));
		t.set('productDate',r.get('productDate'));
		//有效期至
		
		t.set('qaFlayType','待检测');
		t.set('qualityType',r.get('qualityType'));
		
		t.set('quantity',HTUtil.round2(r.get('planedQuantity'))-HTUtil.round2(r.get('receivedQuantity')));
		t.set('packages',HTUtil.round2(r.get('planedPackages'))-HTUtil.round2(r.get('receivedPackages')));
		t.set('grossWeight',HTUtil.round2(r.get('planedGrossWeight'))-HTUtil.round2(r.get('receivedGrossWeight')));
		t.set('netWeight',HTUtil.round2(r.get('planedNetWeight'))-HTUtil.round2(r.get('receivedNetWeight')));
		t.set('volume',HTUtil.round4(r.get('planedVolume'))-HTUtil.round4(r.get('receivedVolume')));
		t.set('measure',HTUtil.round2(r.get('planedMeasure'))-HTUtil.round2(r.get('receivedMeasure')));
		t.set('receivedQuantity',HTUtil.round2(r.get('planedQuantity'))-HTUtil.round2(r.get('receivedQuantity')));
		t.set('receivedPackages',HTUtil.round2(r.get('planedPackages'))-HTUtil.round2(r.get('receivedPackages')));
		t.set('receivedGrossWeight',HTUtil.round2(r.get('planedGrossWeight'))-HTUtil.round2(r.get('receivedGrossWeight')));
		t.set('receivedNetWeight',HTUtil.round2(r.get('planedNetWeight'))-HTUtil.round2(r.get('receivedNetWeight')));
		t.set('receivedVolume',HTUtil.round4(r.get('planedVolume'))-HTUtil.round4(r.get('receivedVolume')));
		t.set('receivedMeasure',HTUtil.round2(r.get('planedMeasure'))-HTUtil.round2(r.get('receivedMeasure')));
		t.set('receivedDate',new Date());
		
		t.set('unitName',r.get('unitName'));
		t.set('unitId',r.get('unitId'));
		t.set('pUnitId',r.get('pUnitId'));
		t.set('pUnit',r.get('pUnit'));
		t.set('wUnitName',r.get('wUnitName'));
		t.set('vUnitName',r.get('vUnitName'));
		t.set('mUnitName',r.get('mUnitName'));
		t.set('wUnitId',r.get('wUnitId'));
		t.set('vUnitId',r.get('vUnitId'));
		t.set('mUnitId',r.get('mUnitId'));
		
		t.set('dismantlingQuantity',0);
		receivedCargoStore.add(t);
		return r;
    };
    var btnAutoRCargo=new Ext.Button({text:'批量收货',iconCls:'compile',
    	disabled:p.get('status')>=5,
    	scope:this,handler:autoReceived});
    var btnAddCargo=new Ext.Button({text:C_ADD,iconCls:'add',ref:'../addButton',
		hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SAVE)),disabled:p.get('status')>=5,
		 scope:this,handler:addCargo});
    var btnEditCargo=new Ext.Button({text:C_EDIT,ref:'../editButton',iconCls:'option',
		 hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EDIT)),
		 scope:this,handler:editCargo});
    var btnRemoveCargo=new Ext.Button({text:C_REMOVE,iconCls:'remove',ref:'../removeButton',
    	    	  hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)),
    	    	  scope:this,handler:deleteCargo});
    //货物明细的grid
	var grid=new Ext.grid.GridPanel({
    	title:C_CARGO_LIST,layout:'fit',autoscoll:'true',region:'center',
    	closable:false,store:store,sm:sm,cm:cmIn,
    	listeners:{scope:this,
    		rowdblclick: function(grid, rowIndex, event){    				
        		editCargo();
    		}},
    	tbar:[btnAddCargo,
    	      btnEditCargo,
    	      btnRemoveCargo,
    	      btnAddRC,
    	      btnAutoRCargo]
	});
	
	var cboAtClass=new Ext.form.ComboBox({fieldLabel:'操作类型',name:'atClassName',store:WHTStore.AT_CLASS,enableKeyEvents:true,
		displayField:'NAME',valueField:'NAME',anchor:'95%',mode:'local',triggerAction:'all',selectOnFocus:true,
		listeners:{
			scope:this,
			select:function(c,r,i){
				var re=sm2.getSelected();
				if(re){
					re.set('atClassId',r.get('CODE'));
				}
				
			}
		}});
	var numQuantity=new Ext.form.NumberField({fieldLabel:'数量',name:'quantity',anchor:'95%'});
	

	var txtAtName=new Ext.form.ComboBox({fieldLabel:'名称',name:'atName',value:p.get('atName'),anchor:'95%',
			store:WHTStore.getWAssets('WASSETS_F'),
			displayField:'atName',valueField:'atName',
			typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true
		
	});
	var txtAtBland=new Ext.form.ComboBox({fieldLabel:'品牌',name:'atBrand',value:p.get('atBrand'),anchor:'95%',
		store:WHTStore.getWAssets('WASSETS_E'),
		displayField:'atBrand',valueField:'atBrand',
		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true
		/*listeners:{scope:this,
			keyup:{fn:function(f,e){
				listWAssets(f,e,'WASSETS_E');
			},buffer:600}

	 	}*/
});
	var txtAtSpec=new Ext.form.TextField({fieldLabel:'规格',name:'atSpec',anchor:'95%'});
	var txtAtType=new Ext.form.TextField({fieldLabel:'型号',name:'atType',anchor:'95%'});
	var txtAtColor=new Ext.form.TextField({fieldLael:'颜色',name:'atColor',anchor:'95%'});
	
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true});   
    var cm2=new Ext.grid.ColumnModel({columns:[sm2,
    {header:'入库单号',dataIndex:'storageNoteNo',width:120,align:'center'},
	{header:'操作类型',dataIndex:'atClassName',editor:cboAtClass,align:'center'},
	{header:'数量',dataIndex:'quantity',editor:numQuantity,align:'center'},	
	{header:'名称',dataIndex:'atName',editor:txtAtName,align:'center'},
	{header:'品牌',dataIndex:'atBrand',editor:txtAtBland,align:'center'},
	{header:'规格',width:120,dataIndex:'atSpec',editor:txtAtSpec,align:'center'},
	{header:'型号',width:120,dataIndex:'atType',editor:txtAtType,align:'center'},
	{header:'颜色',width:120,dataIndex:'atColor',editor:txtAtColor,align:'center'}	
    ],defaults:{sortable:true,width:100}}); 
    
    var addAssets=function(){
    	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
    	else{
    		var c = new WAssets({uuid:HTUtil.UUID(32),
    			storageNoteId:p.get('id'),
    			storageNoteNo:p.get('storageNoteNo'),
    			atClassId:0,
    			atClassName:'入库',
    			atName:'托盘',
    			rowAction:'N'});
    		atGrid.stopEditing();
    		atStore.insert(0,c);
    		atGrid.getSelectionModel().selectFirstRow();
    		atGrid.startEditing(0,1);
    	}
    };
   
    
    var saveAssets=function(){
    	atGrid.stopEditing();
		//构建XML
		var xml='';
		var a =atStore.getModifiedRecords();
		if(a.length>0){xml = HTUtil.ATX(a,'WAssets',WAssets);};	
		if(xml){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WASSETS_S'},
				success: function(res){
					var a = HTUtil.XTRA(res.responseXML,'WAssets',WAssets);
					HTUtil.RUA(atStore,a,WAssets);
					XMG.alert(SYS,M_S);
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)});
				
				
		}
		
    };
    
    var delAssets=function(){
    	var b =sm2.getSelected();
		if(b){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
    			
	        	if(btn == 'yes') {
	        		
	        		if(b.get('rowAction')=='N'){
	        			b.set('rowAction','D');
	        			atStore.remove(b);
	        		}
	        		else{
		        		atGrid.stopEditing();		        		
		        		b.beginEdit();						
						b.set('rowAction','R');
						b.endEdit();
						
		        		//构建XML
		        		var xml='';
		        		var a =atStore.getModifiedRecords();
		        		if(a.length>0){xml = HTUtil.ATX(a,'WAssets',WAssets);};	
		        		if(xml){		        			
		        			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WASSETS_S'},
		        				success: function(res){
		        					
		        					//var a = HTUtil.XTRA(res.responseXML,'WAssets',WAssets);
		        					//HTUtil.RUA(atStore,a,WAssets);
		        					atStore.remove(b);
		        					XMG.alert(SYS,M_S);
		        				},
		        				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
		        				xmlData:HTUtil.HTX(xml)});
		        		}
		        		
		        	}
	        	  }
				},this);
    		
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
    };
    
    var atGrid=new Ext.grid.EditorGridPanel({
    	title:'托盘管理',layout:'fit',autoscoll:'true',
    	closable:false,store:atStore,sm:sm2,cm:cm2,
    	
    	listeners:{scope:this,
    		beforeedit:function(e){
    			;}
    	},
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../addButton',hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SAVE)),scope:this,handler:addAssets},'-',
    	      {text:C_SAVE,iconCls:'save',ref:'../saveButton',hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EDIT)),scope:this,handler:saveAssets},'-',    	      
    	      {text:C_REMOVE,iconCls:'remove',ref:'../removeButton',hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)),scope:this,handler:delAssets}]
	});
    
    
	
	
	
	//只有在订单状态为新增的情况下面，才能新增保存
	this.save=function(){
		btnSave.suspendEvents();
		var cargoOwner=tab.find('name','cargoOwnerName');		
		var planedTime=tab.find('name','planedTime');
		
		//货主不可为空
		if(cargoOwner==null||cargoOwner[0].getValue()==''){
			XMG.alert(SYS,C_CARGO_OWNER_REQUIRED,function(){cargoOwner[0].focus();});
			return;
		};
		
		//客户订单号不可为空
		if(txtOrderNo.getValue()==''){
			XMG.alert(SYS,"订单号不能为空",function(){txtOrderNo.focus();});
			return;
		};
		
		//预计提货时间不可为空
		if(planedTime==null||planedTime[0].getValue()==''){
			XMG.alert(SYS,C_PLANED_IN_DATE_REQUIRED,function(){planedTime[0].focus();});
			return;
		};
		/*
		if(storageClass==null||storageClass==''){
			XMG.alert(SYS,"来源类型不能为空！",function(){cboStorageClass.focus();});
			return;
		};*/
		
		//cboActionGategory
		if(Ext.isEmpty(cboActionGategory.getValue())){
			XMG.alert(SYS,"类别不能为空！",function(){cboActionGategory.focus();});
			return ;
		}
		p.beginEdit();
		
		var f = WStorageNote.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
		
		
		p.set('storageClassId',storageClassId);
		p.endEdit();
   	 	var xml = HTUtil.RTX(p,'WStorageNote',WStorageNote);
   	 	btnSave.disable();
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'WStorageNote',WStorageNote);
				var ra=p.get('rowAction');
				var f = WStorageNote.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};
				if(ra=='N'){
					this.find('name','storageNoteNo')[0].setValue(p.get('storageNoteNo'));
					p.set('rowAction','M');
				}
				p.endEdit();	
				
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				btnSave.enable();
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
				btnSave.enable();
			},
			
			//在xml文档外面封装HtRequest标签
			xmlData:HTUtil.HTX(xml)
		});
		btnSave.resumeEvents();
	};
	
	//删除单据
	this.removeNote=function(){
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
        	if(btn == 'yes') {
        		if(p.get('status')==0){
        			p.set('rowAction',p.get('rowAction')=='N'?'D':'R');
	        		var xml = HTUtil.RTX4R(p,'WStorageNote');
	        		
	            	//HTUtil.REQUEST('WSTORAGE_NOTE_S', xml,this.removeTab,this);
	        		//Ext.getCmp('removeBtn').setDisabled(true);
	        		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_S'},
	        			success: function(res){
	        				p.beginEdit();           				
	        				p.set('rowAction','R');        				
	        				p.endEdit();
	        				this.updateToolBar();
	        				this.removeTab(res,this);
	        				//Ext.getCmp('removeBtn').setDisabled(false);
	        			},
	        			failure: function(res){
	        				XMG.alert(SYS,M_F+res.responseText);
	        				//Ext.getCmp('removeBtn').setDisabled(false);
	        			},
	        			
	        			//在xml文档外面封装HtRequest标签
	        			xmlData:HTUtil.HTX(xml)
	        		});
        		}
        		else{
        			XMG.alert(SYS,'该入库单不是新增状态，不能删除！');
        		}
        	}
		},this);
	};
	
	//提交
	this.submit=function(){this.updateStatus(1);};
	//取消提交
	this.unSubmit=function(){this.updateStatus(0);};	
	
	 //收货调用方法
    this.receive=function(){
    	
    	if(p){
    		var tab = this.ownerCt;
    		var c = 'RECEIVED_CARGO_NOTE'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.WPlacedCargoTab(p)));
    	}
    };
    
	//输出
	this.exp = function(){
			EXPC('WSTORAGE_LIST','&sort=id&dir=ASC&id='+p.get('id'));
	};	
	
	this.computeCost=function(){
		if(p.get('status')==5){
    		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_CC',id:p.get('id')},
    			success: function(res){
    				var a=HTUtil.XTRA(res.responseXML,'SExpense',SExpense);
    				if(a.length>0){
    					XMG.alert(SYS,M_S);
    				}
    				else{
    					XMG.alert(SYS,M_S+" 已经生成费用！");
    				}
    			},
    			failure: function(res){
    				XMG.alert(SYS,M_F+res.responseText);
    				
    			}
    		});
			
		}
		else{
			Ext.Msg.alert(SYS,'该单不是完成状态，不能计费！');
			return ;
		}
	};
	
	//显示费用处理界面
	this.showExpense=function(){
		createWindow('EXPE_'+p.get("uuid"),C_CONSIGN+C_EXPE+'-'+p.get('storageNoteNo'),
    			new Fos.ExpenseTab(p),true);
		};
	var inListExcel=function(){
		var url = REPORT_URL;
		url += '&__report=reports/wms_CargoInListReport.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE")+'&id='+p.get('id');
		window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};
	
  
	var title = p.get('rowAction')=='N'?(C_ADD+C_IN_STORAGE_NOTE):(C_IN_STORAGE_NOTE+'-'+p.get('storageNoteNo'));
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',ref:'../saveBtn',
		disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SAVE)),scope:this,handler:this.save});
	var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',id:'removeBtn',
		disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)),scope:this,handler:this.removeNote});
	var btnCheck=new Ext.Button({text:C_COMMIT,iconCls:'check',
		disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_COMMIT)),scope:this,handler:this.submit});
	var bCancelCheck=new Ext.Button({text:C_COMMIT_CANCEL,iconCls:'renew',
		disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_CANCEL_COMMIT)),scope:this,handler:this.unSubmit});
	 //收货
    var btnReceviedCargo=new Ext.Button({text:'上架',iconCls:'option',
    	disabled:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_RECEIVED),scope:this,handler:this.receive});
  
    //输出
    //任务清单
    var btnInListExcel={text:'任务清单',
    	disabled:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT),scope:this,handler:inListExcel};
    var btnPStorageNote={text:C_IN_STORAGE_NOTE,scope:this,handler:this.exp};
	var btnPrint=new Ext.Button({text:C_EXPORT,iconCls:'print',
		disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT)),scope:this,
    	menu: {items: [btnPStorageNote,
    	               btnInListExcel]}});
	
	var bCalCost=new Ext.Button({text:'计费',iconCls:'dollar',
		disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPENSE)),scope:this,handler:this.computeCost});
	var btnDollar=new Ext.Button({text:C_EXPE,iconCls:'dollar',
		disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPENSE)),scope:this,handler:this.showExpense});
	
	var basicPanel=new Ext.form.FormPanel({title:'主信息',		
		items:[masterInfoPanel,pnlCustInfo,pnlTransInfo,otherInfoPanel]
	});
	
	var cargoPanel=new Ext.Panel({title:'货物信息',
		layout:'border',
		items:[grid,grdReceivedCargo]
	});
	/*var tab=new Ext.TabPanel({activeTab:0,region:'center',height:200,
		items:[basicPanel,cargoPanel,atGrid,gCostList]});*/
	
	var tab=new Ext.TabPanel({activeTab:0,region:'center',height:200,
		items:[basicPanel,cargoPanel]});
	
	this.showAttach=function(){		
		if(p.get('id')==null||p.get('id')==undefined){
			Ext.Msg.alert(SYS,'请先保存数据单再上传附件！');
			return ;
		}
    	var win = new Fos.AttachWin('W',p.get('id'),p.get('storageNoteNo'));
    	win.show();
    };
    var bAttach={text:C_ATTACH,itemId:'TB_ATTACH',iconCls:'news',
			disabled:p.get('rowAction')=='N',scope:this,handler:this.showAttach};
    this.showStorageRate=function(){
    	var tab = this.ownerCt;
    	tab.setActiveTab(tab.add(new Fos.WStorageRateGrid(p,store)));
    };
    var bSRate={text:'作业服务',itemId:'TB_SRate',iconCls:'news',
    		disabled:p.get('rowAction')=='N',scope:this,handler:this.showStorageRate};
	Fos.StorageNotePanel.superclass.constructor.call(this, {
	id: 'STORAGE_NOTE_'+p.get('uuid'),title:title,
	closable:true,layout:'border',
	tbar:
		[btnSave,btnRemove,btnCheck,bCancelCheck,btnReceviedCargo,
		 btnPrint,'->',bSRate,bAttach,bCalCost,btnDollar],
	items: [tab]
	},this.updateToolBar());
};
Ext.extend(Fos.StorageNotePanel, Ext.Panel);


//不带托盘管理的入库编辑界面
Fos.StorageNoteTab = function(p) {
	this.sel=-1000;
	var storageClassId=p.get('storageClassId');
	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNoteCargo',id:'id'},WStorageNoteCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var atStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WASSETS_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WAssets',id:'id'},WAssets),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
  var rateStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_RATE_Q',baseParams:{_mt:'xml'},
  	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageRate',id:'id'},WStorageRate),
  	remoteSort:true,sortInfo:{field:'id',direction:'desc'}
  });
  
  var receivedCargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WRECEIVED_CARGO_X',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WReceivedCargo',idProperty:'id'},WReceivedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
  
  var cargoStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WCARGO_X',baseParams:{_mt:'xml'},
			reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCargo',idProperty:'id'}, WCargo),
				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
  
  if(p.get('rowAction')!='N'){
  	store.load({params:{storageNoteId:p.get('id')}});
  	atStore.load({params:{storageNoteId:p.get('id')}});
  	rateStore.load({params:{storageNoteId:p.get('id')}});
  }
  

	
	
  //这个函数应该这样理解
	//这个函数是在执行HTUtil.REQUEST时传的第三个参数，
	//这个参数是一个函数，会有请求成功时调用，r表示request返回的response
	//s表示scope,因此意思就是获得当前对象的容器，用该容器删除当前对象。
	this.removeTab=function(r,s){
		var tab = s.ownerCt;	//得到当前对像所在的容器
		tab.remove(s);
	};
	

	//单据状态改为提交或未提交时的处理函数
  this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'WSTORAGE_NOTE_U',id:p.get('id'),status:s},
			success: function(r){
				var sn = HTUtil.XTR(r.responseXML,'WStorageNote',WStorageNote);
              HTUtil.RU(sn,p,WStorageNote);
              
              var rs = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
              HTUtil.RUA(store,rs,WStorageNoteCargo);
             
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				var status=tab.find('name','status');
				
				//如果改为了未提交
				if(status){
					if (s==0)
					{
							if (p.get('storageType')==0)
							{
								status[0].setValue(HTStore.getInWarehouseNoteStatus(0));
							}
							
							if (p.get('storageType')==1)
							{
								status[0].setValue(HTStore.getOutWarehouseNoteStatus(0));
							}
							
							grid.addButton.enable();
							grid.editButton.enable();
							grid.removeButton.enable();
							
						
					}
					//如果改为了提交
					if (s==1)
					{
						if (p.get('storageType')==0)
						{
							status[0].setValue(HTStore.getInWarehouseNoteStatus(1));
						}
						
						if (p.get('storageType')==1)
						{
							status[0].setValue(HTStore.getOutWarehouseNoteStatus(1));
						}
						
				
						grid.addButton.disable();
						grid.editButton.disable();
						grid.removeButton.disable();
						
					}
				}
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
	};

	
	//根据单据状态改变主界面工具栏上的按钮状态
	this.updateToolBar = function(){
		btnSave.setDisabled(p.get('status')>5);
		btnRemove.setDisabled(p.get('rowAction')=='N'||p.get('status')!=0);
		
	};
	
	
	//入库单号
	var txtStorageNoteNo=new Ext.form.TextField({fieldLabel:C_IN_STORAGE_NOTE_NO,
			name:'storageNoteNo',value:p.get('storageNoteNo'),tabIndex:1,
			ref:'../storageNoteNo',readOnly:true,xtype:'textfield',anchor:'95%'});
	
		//货主
	var lkpCargoOwnerName=new Fos.CustomerLookup({fieldLabel:C_CARGO_OWNER,tabIndex:5,name:'cargoOwnerName',value:p.get('cargoOwnerName'),itemCls:'required',
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwnerName',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('cargoOwnerId','');				
				}},
			select:function(c,r,i){
				p.set('cargoOwnerId',r.get('id'));
				
				
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});
	
	
	
	//来源或者类型
	var cboStorageClass=new Ext.form.ComboBox({fieldLabel:'产品类型',xtype:'combo',name:'storageClass',value:p.get('storageClass'),itemCls:'required',
			ref:'../storageClass',store:WHTStore.STORAGE_CLASS_S,displayField:'NAME',valueField:'NAME',tabIndex:2,
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'
				,
			listeners:{scope:this,select:function(c,r,i){
				storageClassId=r.get('CODE');
			}}
	});
	
	var cboActionGategory=new Ext.form.ComboBox({fieldLabel:'入库类别',name:'actionGategory',value:p.get('actionGategory'),
		    store:WHTStore.ACTION_GATEGORY,displayField:'NAME',valueField:'NAME',tabIndex:3,itemCls:'required',
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,select:function(c,r,i){
				//=r.get('CODE');
				p.set('actionGategoryId',r.get('CODE'));
			}}
	});
	
	//预计时间
	var c13=new Ext.form.DateField({fieldLabel:C_PLANED_IN_DATE,
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d|Y.m.d',
			tabIndex:6,name:'planedTime',value:p.get('planedTime'),
			ref:'../planedTime',itemCls:'required',xtype:'datefield',format:DATEF,anchor:'95%'});
	
	//状态
	var ccboStatus=new Ext.form.ComboBox({fieldLabel:'入库单状态',name:'status',
			value:HTStore.getInWarehouseNoteStatus(p.get('status')),mode:'local',
			store:WHTStore.IN_WAREHOUSE_NOTE_S,displayField:'NAME',valueField:'CODE',
			disabled:true,ref:'../status',
			style:'{font-weight:bold;color:green;}',anchor:'95%'});
	
			
	var validationOrderNo=function(f){
		if(f!=null){
			Ext.Ajax.request({url:SERVICE_URL,method:'POST',
	   			params:{_A:'WSTORAGE_NOTE_VRO',_mt:'xml',orderNo:f.getRawValue(),storageType:0},
				success: function(r){
					var a=HTUtil.XTRA(r.responseXML,'WStorageNote',WStorageNote);
					if(a.length>0){
						f.setValue('');
						Ext.Msg.alert(SYS,'该订单号已经存在不能重复录入！');
					}
				}
				
			});
		}
	};
	
	//订单号
	var txtOrderNo=new Ext.form.TextField({fieldLabel:'采购订单号',name:'orderNo',value:p.get('orderNo'),tabIndex:7,
			ref:'../orderNo',xtype:'textfield',itemCls:'required',anchor:'95%',
			listeners:{scope:this,
				blur:function(f){/*
					if(ORDER_NO_ONLY){
						if(f.getRawValue()!=''){
							if(p.get('rowAction')=='M'||p.get('rowAction')==''){
								if(f.getRawValue()!=p.get('orderNo')){
									validationOrderNo(f);
								}
							}
							else if(p.get('rowAction')=='N'){
								validationOrderNo(f);
							}
						}
					}
				*/}
			}
	});
	
	//客户订单号
	var txtEntrustNo=new Ext.form.TextField({fieldLabel:'委托编号',xtype:'textfield',name:'entrustNo',tabIndex:4,
			value:p.get('entrustNo'),anchor:'95%'
	});			
			
	//接单日期
	var cdteStorageDate=new Ext.form.DateField({fieldLabel:C_STORAGE_DATE,tabIndex:8,name:'storageDate',value:p.get('storageDate'),altFormats:'Ymd|Y/m/d|Y-m-d|Y.m.d',
			ref:'../storageDate',xtype:'datefield',format:DATEF,anchor:'95%'});
	
	//出入库要求
	var ctxtRequirement=new Ext.form.TextField({fieldLabel:p.get('storageType')==0?C_IN_STORAGE_REQUIREMENT:C_OUT_STORAGE_REQUIREMENT,name:'custRequirement',
			value:p.get('custRequirement'),tabIndex:17,anchor:'97%'});

	
	//供应商
	var ccluCustName=new Fos.CustomerLookup({fieldLabel:'供应商',tabIndex:10,name:'custName',value:p.get('custName'),
			store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('custId','');
					
					var custContact=tab.find('name','custContact');
					var custTel=tab.find('name','custTel');
					var custFax=tab.find('name','custFax');
					if(custContact)
						custContact[0].setValue('');
					if(custTel)
						custTel[0].setValue('');
					if(custFax)
						custFax[0].setValue('');
				}},
			select:function(c,r,i){
				p.set('custId',r.get('id'));
				var cargoOwnerName = tab.find('name','cargoOwnerName');
				if(cargoOwnerName)
				{
					if(cargoOwnerName[0].getValue()==''||cargoOwnerName[0].getValue()==null){
						cargoOwnerName[0].setValue(r.get('custNameCn'));
						p.set('cargoOwnerId',r.get('id'));
					}
						
				}
				var custContact=tab.find('name','custContact');
				var custTel=tab.find('name','custTel');
				var custFax=tab.find('name','custFax');
				var loadAddress=tab.find('name','loadAddress');
				if(loadAddress)
					loadAddress[0].setValue(r.get('custAddress'));
				if(custContact)
					custContact[0].setValue(r.get('custContact'));
				if(custTel)
					custTel[0].setValue(r.get('custTel'));
				if(custFax)
					custFax[0].setValue(r.get('custFax'));
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});
	

	
	//供应商联系人
	var ctxtCustContact=new Ext.form.TextField({fieldLabel:C_CONTACT,name:'custContact',value:p.get('custContact'),tabIndex:10,
			anchor:'95%'});	
			
	//供应商电话
	var ctxtCustTel=new Ext.form.TextField({fieldLabel:C_TEL,name:'custTel',value:p.get('custTel'),tabIndex:11,
			anchor:'95%'});
			
	//货主传真
	var ctxtCustFax=new Ext.form.TextField({fieldLabel:C_FAX,name:'custFax',value:p.get('custFax'),tabIndex:12,
			ref:'../custFax',xtype:'numberfield',anchor:'95%'});
	
	var listConsignee=function(f,e){
		if((e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN)){
			var q=f.getRawValue();			
			if(q.length>=1 ){				
		   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
		   			params:{_A:'WSTORAGE_NOTE_F',_mt:'xml',loadAddress:q},
					success: function(r,o){
						f.store.loadData(r.responseXML,false);
						if(!f.isExpanded()){
							f.expand();
						}
					}
					
				});
			}
			else if((q.length==0||q.lenght<1) && f.isExpanded()){				
				f.store.removeAll();
				f.collapse();
			}
		}
	};
	
	//收货地址
	var loadAddress=new Ext.form.ComboBox({fieldLabel:'收货地址',name:'loadAddress',value:p.get('loadAddress'),tabIndex:13,
			xtype:'combo',anchor:'97%',
				store:WHTStore.getLoadAddress('WSTORAGE_NOTE_F'),
				displayField:'loadAddress',valueField:'loadAddress',
				typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
				listeners:{scope:this,
					keyup:{fn:function(f,e){
						listConsignee(f,e);
					},buffer:600}
			 	}
	});			
	
	
	//入库单据信息sheet
	var masterInfoPanel=new Ext.Panel({
		title:'基本信息',labelAlign:'right',padding:5,
		layout:'column',layoutConfig:{columns:4},
		items:[
			{columnWidth:.25,layout:'form',labelWidth:70,border:false,items:[
				txtStorageNoteNo,lkpCargoOwnerName/*,cboStorageClass*/]},
			{columnWidth:.25,layout:'form',labelWidth:95,border:false,items:[
cboActionGategory,txtOrderNo]},
			{columnWidth:.25,layout:'form',labelWidth:95,border:false,items:[
c13,txtEntrustNo]},
			{columnWidth:.25,layout:'form',labelWidth:95,border:false,items:[				
cdteStorageDate,ccboStatus]},
			{columnWidth:.5,layout:'form',labelWidth:70,border:false,items:[
ctxtRequirement ]}
			]
	});
	
	
	//*****************客户信息sheet********************/
	var pnlCustInfo=new Ext.Panel({
		title:'供应商',labelAlign:'right',padding:5,
		labelWidth:90,layout:'column',
		items:[{columnWidth:.25,layout:'form',border:false,
			items:[ccluCustName]},
		       {columnWidth:.25,layout:'form',border:false,
				items:[ctxtCustContact]},
		       {columnWidth:.25,layout:'form',border:false,
					items:[ctxtCustTel]},
				{columnWidth:.25,layout:'form',border:false,
					items:[ctxtCustFax]},
		       {columnWidth:.5,layout:'form',border:false,
						items:[loadAddress]}]
	});
	
	
	
	var ctxtOriginCountry=new Ext.form.ComboBox({fieldLabel:'原产国',name:'countryOfOrigin',value:p.get('countryOfOrigin'),
			xtype:'textfield',tabIndex:4,anchor:'95%',xtype:'combo',
			store:HTStore.getCOUN_S(),
			displayField:'counNameCn',valueField:'counNameCn',
			typeAhead:true,mode:'local',triggerAction: 'all',selectOnFocus:true,
			enableKeyEvents:true,
			listeners:{scope:this,
			 	keydown:{fn:function(f,e){
			 		if(e.getKey()==e.ENTER){
			 			ctxtRequirement.focus();
					} 
			 	},buffer:200}
		 	}
	});
	
	var cboGoalCountry=new Ext.form.TextField({fieldLabel:'进口国',
		tabIndex:1,anchor:'95%'});
	var ctxtTruckType=new Ext.form.TextField({fieldLabel:'车型',
		tabIndex:1,anchor:'95%'});
	var ctxtTruckNo=new Ext.form.TextField({fieldLabel:'车号',
		tabIndex:1,anchor:'95%'});
	var ctxtOrigin=new Ext.form.TextField({fieldLabel:'装货地',
		tabIndex:1,anchor:'95%'});
	var ctxtDestination=new Ext.form.TextField({fieldLabel:'卸货地',name:'destination',value:p.get('destination'),
		tabIndex:1,anchor:'95%'});
	var ctxtDeliveryPoint =new Ext.form.TextField({fieldLabel:'交货地',
		tabIndex:1,anchor:'95%'});
	var ctxtDriver=new Ext.form.TextField({fieldLabel:'司机',
		tabIndex:1,anchor:'95%'});
	var ccboPaymentClause=new Ext.form.ComboBox({fieldLabel:'付款条款',name:'pateName',value:p.get('pateName'),store:HTStore.getPATE_S(),tabIndex:6,
		displayField:'pateName',valueField:'pateName',typeAhead:true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	var ctxtPaymentRemarks=new Ext.form.TextField({fieldLabel:'付款描述',
		tabIndex:1,anchor:'95%'});
	var ccboDeliveryClause=new Ext.form.ComboBox({fieldLabel:'交货条款',store:HTStore.getPATE_S(),tabIndex:6,
		displayField:'pateName',valueField:'pateName',typeAhead:true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	var ctxtDeliveryRemarks=new Ext.form.TextField({fieldLabel:'交货描述',
		tabIndex:1,anchor:'95%'});

	
	//运单信息sheet
	var pnlTransInfo=new Ext.Panel({
		title:'运单信息',labelAlign:'right',padding:5,
		labelWidth:80,layout:'column',
		items:[{columnWidth:0.25,layout:'form',border:false,items:[ctxtOriginCountry,ctxtOrigin,ccboPaymentClause]},
		       {columnWidth:0.25,layout:'form',border:false,items:[cboGoalCountry,ctxtDestination,ctxtPaymentRemarks]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtTruckType,ctxtDeliveryPoint,ccboDeliveryClause]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtTruckNo,ctxtDriver,ctxtDeliveryRemarks]}]
	});

	var ctxtMasterTransNo=new Ext.form.TextField({fieldLabel:'主单号',name:'masterTransNo',value:p.get('masterTransNo'),
		tabIndex:1,xtype:'textfield',anchor:'95%'});
	var cnumQuantity=new Ext.form.NumberField({fieldLabel:'总件数',name:'quantity',value:p.get('quantity'),
		tabIndex:7,anchor:'95%'});	
	var ctxtTransNo=new Ext.form.TextField({fieldLabel:'分单号',name:'transNo',value:p.get('transNo'),
		tabIndex:2,anchor:'95%'});
	var cnumGW=new Ext.form.NumberField({fieldLabel:'总毛重',name:'grossWeight',value:p.get('grossWeight'),
		tabIndex:9,anchor:'95%'});
	var cnumNW=new Ext.form.NumberField({fieldLabel:'总净重',name:'netWeight',value:p.get('netWeight'),
		tabIndex:10,anchor:'95%'});
	var cnumV=new Ext.form.NumberField({fieldLabel:'总体积',name:'volume',value:p.get('volume'),
		tabIndex:11,anchor:'95%'});

	
	
	var numTankNum=new Ext.form.NumberField({fieldLabel:'箱量',name:'tankNum',value:p.get('tankNum'),tabIndex:15,anchor:'95%'});
	var cboTankType=new Ext.form.ComboBox({fieldLabel:'箱型',name:'tankType',value:p.get('tankType'),
			store:HTStore.getCOTY_S(),tabIndex:16,
  		displayField:'cotyCode',valueField:'cotyCode',typeAhead:true,
  		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	
	var otherInfoPanel=new Ext.Panel({
		title:'其他信息',labelAlign:'right',padding:5,
		labelWidth:80,layout:'column',
		items:[{columnWidth:0.25,layout:'form',border:false,items:[ctxtMasterTransNo,cnumQuantity]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ctxtTransNo,cnumGW]},
		       {columnWidth:0.25,layout:'form',border:false,items:[numTankNum,cnumNW]},
		       {columnWidth:0.25,layout:'form',border:false,items:[cboTankType,cnumV]}]
	});
	
	
	
	
	
	var cnumPackages=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true,
		listeners:{scope:this,    			
			blur:function(f){
				var r=smRCargo.getSelected();
				if(r){
  				if(f.getRawValue()==''){
  					f.clearValue();
  				}
  				else{
  					var sq=HTUtil.round2(r.get('standardQuantity'));
  					var sgw=HTUtil.round2(r.get('standardGrossWeight'));
  					var snw=HTUtil.round2(r.get('standardNetWeight'));
  					var sv=HTUtil.round4(r.get('standardVolume'));
  					var stm=HTUtil.round2(r.get('standardMeasure'));
  					var packages=HTUtil.round2(f.getValue());
  					var quantity=HTUtil.round2(packages*sq);
  					
  					r.set('receivedQuantity',quantity);
  					r.set('receivedGrossWeight',HTUtil.round2(packages*sgw));
  					r.set('receivedNetWeight',HTUtil.round2(packages*snw));
  					r.set('receivedVolume',HTUtil.round4(packages*sv));
  					r.set('receivedMeasure',HTUtil.round2(packages*stm));
  					
  					}
				}
				
			}
		}
	
	});
	var cnumQuantity=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true,
			listeners:{scope:this,    			
				blur:function(f){
					var r=smRCargo.getSelected();
					if(r){
	    				if(f.getRawValue()==''){
	    					f.clearValue();
	    				}
	    				else{
	    					var sq=HTUtil.round2(r.get('standardQuantity'));
	    					var sgw=HTUtil.round2(r.get('standardGrossWeight'));
	    					var snw=HTUtil.round2(r.get('standardNetWeight'));
	    					var sv=HTUtil.round4(r.get('standardVolume'));
	    					var stm=HTUtil.round2(r.get('standardMeasure'));
	    					var quantity=numRender(f.getValue());
	    					var packages=HTUtil.round2(quantity/sq);
	    					if(Ext.isEmpty(r.get('receivedPackages'))){
	    						r.set('receivedPackages',packages);
	    					}
	    					
	    					r.set('receivedGrossWeight',HTUtil.round2(packages*sgw));
	    					r.set('receivedNetWeight',HTUtil.round2(packages*snw));
	    					r.set('receivedVolume',HTUtil.round4(packages*sv));
	    					r.set('receivedMeasure',HTUtil.round2(packages*stm));
	    					
	    					}
					}
					
				}
			}
	
	});
	var cnumGrossWeight=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true
	});
	var cnumNetWeight=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true
	});
	var cnumVolume=new Ext.form.NumberField({
		decimalPrecision:4,allowNegative:false,selectOnFocus:true
	});
	
	var ccboPUnitName=new Ext.form.ComboBox({align:'center',	      
	  displayField:'unitName',valueField:'unitName',triggerAction:'all',
    mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
    store:HTStore.getUNIT_C(),anchor:'95%',
    listeners:{scope:this,select:function(c,r,i){
  	  smRCargo.getSelected().set('pUnitId',r.get('id'));
		}}});
	
	var ccboQualityType=new Ext.form.ComboBox({align:'center',
		displayField:'NAME',valueField:'NAME',triggerAction:'all',
      mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:WHTStore.QUALITY_TYPE_S,anchor:'95%'});
	//收货表选择事件
	var rsRCargo={scope:this,
  		rowselect:function(sm,row,record){
  	}
  		
  };
	
	var smRCargo=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this,listeners:rsRCargo});
	var cmRCargo=new Ext.grid.ColumnModel({columns:[smRCargo,
	        new Ext.grid.RowNumberer(),
	        {header:'品质',
					dataIndex:'qualityType',
					editor:ccboQualityType,
					width:70,
					align:'center'},	        
          {header:'SKU',
					dataIndex:'skuNo',
					width:90,
					align:'center'},          	
        	/*{header:'生产编号',dataIndex:'productNo',width:75,align:'center'},*/
        	{header:'EA单位',dataIndex:'unitName',width:70,align:'center'},
        	{header:'收货EA',
        			dataIndex:'receivedQuantity',
        			editor:cnumQuantity,
        			width:75,
        			align:'center'},
        	{header:'收货件数',
        				dataIndex:'receivedPackages',
        				editor:cnumPackages,
        				width:75,
        				align:'center'},
        	{header:'件数ID',dataIndex:'pUnitId',width:70,align:'center',hidden:true},
        	{header:'件数单位',
        		dataIndex:'pUnit',
        		editor:ccboPUnitName,
        		width:70,
        		align:'center'},
        	{header:'收货毛重',
        			dataIndex:'receivedGrossWeight',
        			editor:cnumGrossWeight,
        			width:75,
        			align:'center'},
        	{header:'收货净重',
        				dataIndex:'receivedNetWeight',
        				editor:cnumNetWeight,
        				width:75,
        				align:'center'},
        	{header:'收货体积',
        					dataIndex:'receivedVolume',
        					editor:cnumVolume,
        					width:75,
        					align:'center'},          	
        	{header:'商品名称',dataIndex:'cargoName',width:200,align:'center'},
        	{header:'上架数量',dataIndex:'placedQuantity',width:75,align:'center'},
        	{header:'库位',dataIndex:'blockName',width:75,align:'center'},
        	{header:'库区',dataIndex:'areaName',width:75,align:'center'},
        	{header:'仓库',dataIndex:'warehouseName',width:90,align:'center'},
        	{header:'生产日期',dataIndex:'productDate',renderer:formatDate,width:90,align:'center'},
        	{header:'重量单位',dataIndex:'wUnitName',width:75,align:'center'},	                                      	
        	{header:'体积单位',dataIndex:'vUnitName',width:75,align:'center'},	                                      	
        	{header:'商品规格',width:120,dataIndex:'specification',width:75,align:'center'},
        	{header:'商品型号',width:120,dataIndex:'cargoType',width:75,align:'center'},
        	{header:'商品颜色',width:120,dataIndex:'cargoColor',width:75,align:'center'},
        	{header:'拆零数量',dataIndex:'openStockNum',width:75,align:'center'},
        	{header:'收货序号',dataIndex:'id',width:95,align:'center'},
            {header:'入库单号',dataIndex:'storageNoteNo',width:120,align:'center'},
            {header:'入库ID',dataIndex:'storageNoteId',width:75,align:'center'},
            {header:'货物明细ID',dataIndex:'storageNoteCargoId',width:95,align:'center'},
            {header:'最小单位数量',dataIndex:'standardQuantity',width:95,align:'center'},
            {header:'最小单位毛重',dataIndex:'standardGrossWeight',width:95,align:'center'},
            {header:'最小单位净重',dataIndex:'standardNetWeight',width:95,align:'center'},
            {header:'最小单位体积',dataIndex:'standardVolume',width:95,align:'center'},
            {header:'最小单位面积',dataIndex:'standardMeas',width:95,align:'center'},
            {header:'状态',dataIndex:'status',renderer:WHTStore.getInWarehouseNoteStatus,width:70,align:'center'}
            ],defaults:{sortable:true,width:100}}); 
	var addReceivedCargo=function(){
		var r = sm.getSelected();
		if(r){
			if(HTUtil.round2(r.get('planedQuantity'))>HTUtil.round2(r.get('receivedQuantity'))){
				var newR=createReceivedCargo(r);
				smRCargo.selectFirstRow();
			}
			else{
				Ext.Msg.alert(SYS,"您选择的货物已经全部收货，请确认！");
			}
		}
		else{
			Ext.Msg.alert(SYS,"请确认是否已经选中上方表格中的货物！");
		}
	};
	
	var saveReceivedCargo=function(){
		var mRCRows=receivedCargoStore.getModifiedRecords();
		var xml='';
		if(mRCRows.length){
			xml+=HTUtil.ATX(mRCRows,'WReceivedCargo',WReceivedCargo);
		}
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_S'},
				success: function(r){
					var a = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
					HTUtil.RUA(store,a,WStorageNoteCargo);
					var b=HTUtil.XTRA(r.responseXML,'WReceivedCargo',WReceivedCargo);
					HTUtil.RUA(receivedCargoStore,b,WReceivedCargo);
					Ext.Msg.alert(SYS,M_S);
				},
				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)
				});
		}
		else{
			
		}
	};
	var delReceivedCargo=function(){
		var rows=smRCargo.getSelections();
		var cc=[];
		if(rows.length){
			for(var i=0;i<rows.length;i++){
				var r=rows[i];
				if(HTUtil.round2(r.get('placedQuantity'))>0){
					Ext.Msg.alert(SYS,r.get("cargoName")+"已上架,数据为："+r.get('placedQuantity')+"，不能删除");
					return ;
				}
				if(r.get('rowAction')=='N'){
					r.set('rowAction','D');
					receivedCargoStore.remove(r);
				}
				else{
					r.set('rowAction','R');
					cc[cc.length]=r;
				}
			}
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(cc,'WReceivedCargo');
	        		if(xml){
	    				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_S'},
	        				success: function(r){
	        					var a = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
	    						HTUtil.RUA(store,a,WStorageNoteCargo);
	    						receivedCargoStore.remove(cc);
	        				},
	        				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
	        				xmlData:HTUtil.HTX(xml)
	        				});
	    			}
	    			else{
	    				alert("xml is empty！");
	    			}
	        	}
			},this);
		}
		else{
			alert("rows length=0!");
		}
	};
	
	var btnAddRC=new Ext.Button({text:"新增收货",iconCls:'add',disabled:p.get('status')>=5,
		scope:this,handler:addReceivedCargo}
	);
	//保存按钮
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',id:'btnSave',disabled:p.get('status')>5,
		scope:this,handler:saveReceivedCargo}
	);
	
	
	//货物表选择事件
	var re={scope:this,
  		rowselect:function(sm,row,record){
  				if(this.sel!=record.get('id')){
  				this.sel=record.get('id');
  				receivedCargoStore.removeAll();
  				cargoStore.removeAll();
  				receivedCargoStore.load({params:{storageNoteCargoId:record.get('id')}});    				
  				cargoStore.load({params:{id:record.get('cargoId')}});    				
  			}
  		}
  		
  };
  //入库单货物明细grid	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this,listeners:re});
  var cmIn=new Ext.grid.ColumnModel({columns:[sm,
  new Ext.grid.RowNumberer({header:'序号',width:36}),
  {header:'商品编号',dataIndex:'skuNo',width:85,align:'center'},
	{header:'商品名称',dataIndex:'cargoName',align:'center'},
	/*{header:'生产编号',dataIndex:'productNo',width:80,align:'center'},*/
	{header:'件数单位ID',dataIndex:'pUnitId',width:70,align:'center'},
	{header:'包装单位',dataIndex:'pUnit',width:70,align:'center'},
	{header:'包装数量',dataIndex:'planedPackages',width:70,align:'center'},
	{header:'EA单位',dataIndex:'unitName',width:70,align:'center'},
	{header:'EA数量',dataIndex:'planedQuantity',width:70,align:'center'},
	{header:'收货数量',dataIndex:'receivedQuantity',width:70,align:'center'},
	{header:'调整数量',dataIndex:'adjustQuantity ',width:70,align:'center'},
	{header:'上架数量',dataIndex:'placedQuantity',width:70,align:'center'},
	{header:'重量单位',dataIndex:'wUnitName',width:70,align:'center'},
	{header:'计划毛重',dataIndex:'planedGrossWeight',width:80,align:'center'},
	{header:'计划净重',dataIndex:'planedNetWeight',width:80,align:'center'},
	{header:'收货毛重',dataIndex:'receivedGrossWeight',width:80,align:'center'},
	{header:'收货净重',dataIndex:'receivedNetWeight',width:80,align:'center'},
	{header:'体积单位',dataIndex:'vUnitName',width:70,align:'center'},
	{header:'计划体积',dataIndex:'planedVolume',width:90,align:'center'},
	{header:'收货体积',dataIndex:'receivedVolume',width:90,align:'center'},
	{header:'面积单位',dataIndex:'mUnitName',width:80,align:'center'},
	{header:'计划面积',dataIndex:'planedMeasure',width:80,align:'center'},
	{header:'收货面积',dataIndex:'receivedMeasure',width:80,align:'center'},
	
	{header:'单价',dataIndex:'unitPrice',width:80,align:'center'},
	{header:'生产日期',dataIndex:'productDate',renderer:formatDate,width:90,align:'center'},
	{header:'批次号',dataIndex:'batchNo',width:80,align:'center'},
	{header:'仓库',dataIndex:'warehouseName',width:80,align:'center'},
	{header:'库区',dataIndex:'areaName',width:80,align:'center'},
	{header:'库位',dataIndex:'blockName',width:80,align:'center'},	
	{header:'商品规格',width:120,dataIndex:'specification',align:'center'},
	{header:'商品型号',width:120,dataIndex:'cargoType',align:'center'},
	{header:'商品颜色',width:120,dataIndex:'cargoColor',align:'center'},
	{header:'备注',dataIndex:'remarks',width:80,align:'center'},
	{header:'质检标志',dataIndex:'qAFlag',width:80,align:'center'},
	{header:'质检类型',dataIndex:'qAType',width:80,align:'center'}
  ],defaults:{sortable:true,width:100}});    
  
  //新增商品
  var addCargo = function(){
  	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
  	else{
  		var c = new WStorageNoteCargo({uuid:HTUtil.UUID(32),
  			storageNoteId:p.get('id'),storageNoteNo:p.get('storageNoteNo'),
  			compCode:p.get('compCode'),
  			warehouseId:p.get('warehouseId'),warehouseCode:p.get('warehouseCode'),
  			warehouseName:p.get('warehouseName'), batchNo:p.get('batchNo'),storageType:p.get('storageType'),			
  			rowAction:'N'});
      	var win = new Fos.WNoteCargoWin(c,store);
      	win.show();
  	}    	
  };
  
  //编辑商品
  var editCargo = function(){
  	var c = sm.getSelected();
  	if(c.get('status')==5){
  		Ext.Msg.alert(SYS,"已经上架完成！不允许再编辑！");
  		return;
  	}
  	c.set('rowAction','M');
  	var win = new Fos.WNoteCargoWin(c,store);
  	win.show();
  };
  
  //删除商品
  var deleteCargo = function(){
  	if(p.get('status')==5){
  		Ext.Msg.alert(SYS,'该入库单的状态是完成状态，不能删除！');
  		return;
  	}
  	var b =sm.getSelections();
		if(b.length>0){
			for(var i=0;i<b.length;i++){
	    		if(!Ext.isEmpty(b[i].get('receivedQuantity'))&&b[i].get('receivedQuantity')!=0){
	    			Ext.Msg.alert(SYS,b[i].get('cargoName')+"已经收货，不能删除！");
	    			return ;
	    		}
			}
			
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(b,'WStorageNoteCargo');
	        		HTUtil.REQUEST('WSTORAGE_NOTE_CARGO_S', xml, function(){store.remove(b);});
	        	}
			},this);
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
  	
  };
  
  var autoReceived=function(){
  	var rows=sm.getSelections();
  	if(rows.length){
  		for(var i=0;i<rows.length;i++){
  			var r=rows[i];
  			if(r.get('rowAction')=='N'||r.get('rowAction')=='n'){
  				Ext.Msg.alert(SYS,"当前记录是新增状态，请先保存！");
  				return ;
  			}
  		}
  		for(var i=0;i<rows.length;i++){
  			var r=rows[i];
  			if(r.get('rowAction')==''||r.get('rowAction')=='M'){
  				if(HTUtil.round2(r.get('planedQuantity'))>HTUtil.round2(r.get('receivedQuantity')))
  					createReceivedCargo(r);
  			}
  		}
  		
  		var mRCRows=receivedCargoStore.getModifiedRecords();
  		var xml='';
  		if(mRCRows.length){
  			xml+=HTUtil.ATX(mRCRows,'WReceivedCargo',WReceivedCargo);
  		}
  		if(xml){
  			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_S'},
  				success: function(r){
  					var a = HTUtil.XTRA(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
  					
						HTUtil.RUA(store,a,WStorageNoteCargo);
						var b=HTUtil.XTRA(r.responseXML,'WReceivedCargo',WReceivedCargo);
						HTUtil.RUA(receivedCargoStore,b,WReceivedCargo);
						Ext.Msg.alert(SYS,M_S);
  				},
  				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
  				xmlData:HTUtil.HTX(xml)
  				});
  		}
  		else{
  			
  		}
  		
  	}
  	else{
  		Ext.Msg.alert(SYS,"没有获得数据！");
  	}
  };
  
  var createReceivedCargo=function(r){
  	var t=new WReceivedCargo({
			storageNoteCargoId:r.get('id'),
			storageNoteNo:r.get('storageNoteNo'),
			storageNoteId:r.get('storageNoteId'),
			skuNo:r.get('skuNo'),
			cargoId:r.get('cargoId'),
			cargoName:r.get('cargoName'),
			specification:r.get('specification'),
			cargoType:r.get('cargoType'),
			cargoColor:r.get('cargoColor'),
			orderNo:r.get('orderNo'),
			cargoOwnerName:p.get('cargoOwnerName'),
			cargoOwnerId:p.get('cargoOwnerId'),
			standardQuantity:r.get('standardQuantity'),
			standardGrossWeight:r.get('standardGrossWeight'),
			standardNetWeight:r.get('standardNetWeight'),
			standardVolume:r.get('standardVolume'),
			standardMeasure:r.get('standardMeasure'),
			palletQuantity:1,
			status:0,
			verson:0,
			rowAction:'N',
			uuid:HTUtil.UUID(32)});
		
		t.set('warehouseId',r.get('warehouseId'));
		t.set('warehouseCode',r.get('warehouseCode'));
		t.set('warehouseName',r.get('warehouseName'));
		
		t.set('areaId',r.get('areaId'));
		t.set('areaCode',r.get('areaCode'));
		t.set('areaName',r.get('areaName'));
		
		t.set('blockId',r.get('blockId'));
		t.set('blockCode',r.get('blockCode'));
		t.set('blockName',r.get('blockName'));
		t.set('batchNo',r.get('batchNo'));
		t.set('productNo',r.get('productNo'));
		t.set('productDate',r.get('productDate'));
		//有效期至
		
		t.set('qaFlayType','待检测');
		t.set('qualityType',r.get('qualityType'));
		
		t.set('quantity',HTUtil.round2(r.get('planedQuantity'))-HTUtil.round2(r.get('receivedQuantity')));
		t.set('packages',HTUtil.round2(r.get('planedPackages'))-HTUtil.round2(r.get('receivedPackages')));
		t.set('grossWeight',HTUtil.round2(r.get('planedGrossWeight'))-HTUtil.round2(r.get('receivedGrossWeight')));
		t.set('netWeight',HTUtil.round2(r.get('planedNetWeight'))-HTUtil.round2(r.get('receivedNetWeight')));
		t.set('volume',HTUtil.round4(r.get('planedVolume'))-HTUtil.round4(r.get('receivedVolume')));
		t.set('measure',HTUtil.round2(r.get('planedMeasure'))-HTUtil.round2(r.get('receivedMeasure')));
		t.set('receivedQuantity',HTUtil.round2(r.get('planedQuantity'))-HTUtil.round2(r.get('receivedQuantity')));
		t.set('receivedPackages',HTUtil.round2(r.get('planedPackages'))-HTUtil.round2(r.get('receivedPackages')));
		t.set('receivedGrossWeight',HTUtil.round2(r.get('planedGrossWeight'))-HTUtil.round2(r.get('receivedGrossWeight')));
		t.set('receivedNetWeight',HTUtil.round2(r.get('planedNetWeight'))-HTUtil.round2(r.get('receivedNetWeight')));
		t.set('receivedVolume',HTUtil.round4(r.get('planedVolume'))-HTUtil.round4(r.get('receivedVolume')));
		t.set('receivedMeasure',HTUtil.round2(r.get('planedMeasure'))-HTUtil.round2(r.get('receivedMeasure')));
		t.set('receivedDate',new Date());
		
		t.set('unitName',r.get('unitName'));
		t.set('unitId',r.get('unitId'));
		t.set('pUnitId',r.get('pUnitId'));
		t.set('pUnit',r.get('pUnit'));
		t.set('wUnitName',r.get('wUnitName'));
		t.set('vUnitName',r.get('vUnitName'));
		t.set('mUnitName',r.get('mUnitName'));
		t.set('wUnitId',r.get('wUnitId'));
		t.set('vUnitId',r.get('vUnitId'));
		t.set('mUnitId',r.get('mUnitId'));
		
		t.set('dismantlingQuantity',0);
		receivedCargoStore.add(t);
		return r;
  };
  var btnAutoRCargo=new Ext.Button({text:'批量收货',iconCls:'compile',
  	disabled:p.get('status')>=5,
  	scope:this,handler:autoReceived});
  var btnAddCargo=new Ext.Button({text:C_ADD,iconCls:'add',ref:'../addButton',
		hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SAVE)),disabled:p.get('status')>=5,
		 scope:this,handler:addCargo});
  var btnEditCargo=new Ext.Button({text:C_EDIT,ref:'../editButton',iconCls:'option',
		 hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EDIT)),
		 scope:this,handler:editCargo});
  var btnRemoveCargo=new Ext.Button({text:C_REMOVE,iconCls:'remove',ref:'../removeButton',
  	    	  hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)),
  	    	  scope:this,handler:deleteCargo});
  //货物明细的grid
	var grid=new Ext.grid.GridPanel({
  	iconCls:'gen',title:C_CARGO_LIST,layout:'fit',autoscoll:'true',region:'center',
  	closable:false,store:store,sm:sm,cm:cmIn,
  	listeners:{scope:this,
  		rowdblclick: function(grid, rowIndex, event){    				
      		editCargo();
  		}},
  	tbar:[btnAddCargo,
  	      btnEditCargo,
  	      btnRemoveCargo,
  	      btnAddRC,
  	      btnAutoRCargo]
	});
	
	var cboAtClass=new Ext.form.ComboBox({fieldLabel:'操作类型',name:'atClassName',store:WHTStore.AT_CLASS,enableKeyEvents:true,
		displayField:'NAME',valueField:'NAME',anchor:'95%',mode:'local',triggerAction:'all',selectOnFocus:true,
		listeners:{
			scope:this,
			select:function(c,r,i){
				var re=sm2.getSelected();
				if(re){
					re.set('atClassId',r.get('CODE'));
				}
				
			}
		}});
	var numQuantity=new Ext.form.NumberField({fieldLabel:'数量',name:'quantity',anchor:'95%'});
	

	var txtAtName=new Ext.form.ComboBox({fieldLabel:'名称',name:'atName',value:p.get('atName'),anchor:'95%',
			store:WHTStore.getWAssets('WASSETS_F'),
			displayField:'atName',valueField:'atName',
			typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true
		
	});
	var txtAtBland=new Ext.form.ComboBox({fieldLabel:'品牌',name:'atBrand',value:p.get('atBrand'),anchor:'95%',
		store:WHTStore.getWAssets('WASSETS_E'),
		displayField:'atBrand',valueField:'atBrand',
		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true
		/*listeners:{scope:this,
			keyup:{fn:function(f,e){
				listWAssets(f,e,'WASSETS_E');
			},buffer:600}

	 	}*/
});
	var txtAtSpec=new Ext.form.TextField({fieldLabel:'规格',name:'atSpec',anchor:'95%'});
	var txtAtType=new Ext.form.TextField({fieldLabel:'型号',name:'atType',anchor:'95%'});
	var txtAtColor=new Ext.form.TextField({fieldLael:'颜色',name:'atColor',anchor:'95%'});
	
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true});   
  var cm2=new Ext.grid.ColumnModel({columns:[sm2,
  {header:'入库单号',dataIndex:'storageNoteNo',width:120,align:'center'},
	{header:'操作类型',dataIndex:'atClassName',editor:cboAtClass,align:'center'},
	{header:'数量',dataIndex:'quantity',editor:numQuantity,align:'center'},	
	{header:'名称',dataIndex:'atName',editor:txtAtName,align:'center'},
	{header:'品牌',dataIndex:'atBrand',editor:txtAtBland,align:'center'},
	{header:'规格',width:120,dataIndex:'atSpec',editor:txtAtSpec,align:'center'},
	{header:'型号',width:120,dataIndex:'atType',editor:txtAtType,align:'center'},
	{header:'颜色',width:120,dataIndex:'atColor',editor:txtAtColor,align:'center'}	
  ],defaults:{sortable:true,width:100}}); 
  
  var addAssets=function(){
  	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
  	else{
  		var c = new WAssets({uuid:HTUtil.UUID(32),
  			storageNoteId:p.get('id'),
  			storageNoteNo:p.get('storageNoteNo'),
  			atClassId:0,
  			atClassName:'入库',
  			atName:'托盘',
  			rowAction:'N'});
  		atStore.insert(0,c);
  	}
  };
 
  
  var saveAssets=function(){
		//构建XML
		var xml='';
		var a =atStore.getModifiedRecords();
		if(a.length>0){xml = HTUtil.ATX(a,'WAssets',WAssets);};	
		if(xml){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WASSETS_S'},
				success: function(res){
					var a = HTUtil.XTRA(res.responseXML,'WAssets',WAssets);
					HTUtil.RUA(atStore,a,WAssets);
					XMG.alert(SYS,M_S);
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)});
				
				
		}
		
  };
  
  var delAssets=function(){
  	var b =sm2.getSelected();
		if(b){	    	
  		Ext.Msg.confirm(SYS,M_R_C,function(btn){
  			
	        	if(btn == 'yes') {
	        		
	        		if(b.get('rowAction')=='N'){
	        			b.set('rowAction','D');
	        			atStore.remove(b);
	        		}
	        		else{	        		
		        		b.beginEdit();						
						b.set('rowAction','R');
						b.endEdit();
						
		        		//构建XML
		        		var xml='';
		        		var a =atStore.getModifiedRecords();
		        		if(a.length>0){xml = HTUtil.ATX(a,'WAssets',WAssets);};	
		        		if(xml){		        			
		        			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WASSETS_S'},
		        				success: function(res){
		        					
		        					//var a = HTUtil.XTRA(res.responseXML,'WAssets',WAssets);
		        					//HTUtil.RUA(atStore,a,WAssets);
		        					atStore.remove(b);
		        					XMG.alert(SYS,M_S);
		        				},
		        				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
		        				xmlData:HTUtil.HTX(xml)});
		        		}
		        		
		        	}
	        	  }
				},this);
  		
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
  };
  
  
  var cboCharName=new Ext.form.ComboBox();
  
  var sm3=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
  //构建计费条目
  var cm3=new Ext.grid.ColumnModel({columns:[sm3,
  {header:'费率标识',dataIndex:'rateName',align:'center'},
  {header:'费用名称',dataIndex:'charName',editor:cboCharName,align:'center'},
	{header:'计费方式',dataIndex:'mode',align:'center'},
	{header:'计费方法',dataIndex:'accountMethod',align:'center'},	
	{header:'计费单位',dataIndex:'unitName',align:'center'},
	{header:'单价',dataIndex:'unitPrice',align:'center'},
	{header:'结算对象',dataIndex:'accountName',align:'center',width:170},
	{header:'计费重计算比例',width:120,align:'center'}
  ],defaults:{sortable:true,width:100}}); 
  
  var addRate=function(){
  	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
  	else{
	    	var win=new Fos.WStorageRateWin(p,rateStore);
	    	win.show();
  	}
  };
  
  var saveRate=function(){
		//构建XML
		var xml='';
		var a =rateStore.getModifiedRecords();
		if(a.length>0){xml = HTUtil.ATX(a,'WStorageRate',WStorageRate);};	
		if(xml){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_RATE_S'},
				success: function(res){
					var a = HTUtil.XTRA(res.responseXML,'WStorageRate',WStorageRate);
					HTUtil.RUA(rateStore,a,WStorageRate);
					XMG.alert(SYS,M_S);
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)});
		}
		
  };
  
  var delRate=function(){
  	var rs =sm3.getSelections();
		if(rs.length>0){	    	
  		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		for(var i=0;i<rs.length;i++){
	        			var b=rs[i];
		        		if(b.get('rowAction')=='N'){
		        			b.set('rowAction','D');
		        			rateStore.remove(b);
		        		}
		        		else{        		
			        		b.beginEdit();						
							b.set('rowAction','R');
							b.endEdit();
			        	}
		        		
		        		//构建XML
		        		var xml='';
		        		var a =rateStore.getModifiedRecords();
		        		if(a.length>0){xml = HTUtil.ATX(a,'WStorageRate',WStorageRate);};	
		        		if(xml){		        			
		        			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_RATE_S'},
		        				success: function(res){
		        			
		        					rateStore.remove(rs);
		        					XMG.alert(SYS,M_S);
		        				},
		        				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
		        				xmlData:HTUtil.HTX(xml)});
		        		}
		        		
		        	  }
	        	}
				},this);
  		
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
  };
	
	//只有在订单状态为新增的情况下面，才能新增保存
	this.save=function(){
		btnSave.suspendEvents();
		var cargoOwner=tab.find('name','cargoOwnerName');		
		var planedTime=tab.find('name','planedTime');
		var storageClass=cboStorageClass.getValue();
		
		//货主不可为空
		if(cargoOwner==null||cargoOwner[0].getValue()==''){
			XMG.alert(SYS,C_CARGO_OWNER_REQUIRED,function(){cargoOwner[0].focus();});
			return;
		};
		
		//客户订单号不可为空
		if(txtOrderNo.getValue()==''){
			XMG.alert(SYS,"订单号不能为空",function(){txtOrderNo.focus();});
			return;
		};
		
		//预计提货时间不可为空
		if(planedTime==null||planedTime[0].getValue()==''){
			XMG.alert(SYS,C_PLANED_IN_DATE_REQUIRED,function(){planedTime[0].focus();});
			return;
		};
		/*
		if(storageClass==null||storageClass==''){
			XMG.alert(SYS,"来源类型不能为空！",function(){cboStorageClass.focus();});
			return;
		};*/
		
		//cboActionGategory
		if(Ext.isEmpty(cboActionGategory.getValue())){
			XMG.alert(SYS,"类别不能为空！",function(){cboActionGategory.focus();});
			return ;
		}
		p.beginEdit();
		
		var f = WStorageNote.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
      	var fn = ''+f.keys[i];
      	var fc = this.find('name',fn);
      	if(fc!=undefined&&fc.length>0){
      		p.set(fn,fc[0].getValue());
      	}
 	 	}	
		
		
		p.set('storageClassId',storageClassId);
		p.endEdit();
 	 	var xml = HTUtil.RTX(p,'WStorageNote',WStorageNote);
 	 	btnSave.disable();
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'WStorageNote',WStorageNote);
				var ra=p.get('rowAction');
				var f = WStorageNote.prototype.fields;
				p.beginEdit();
 				for (var i = 0; i < f.keys.length; i++) {
 					var fn = ''+f.keys[i];
 					p.set(fn,c.get(fn));
 				};
				if(ra=='N'){
					this.find('name','storageNoteNo')[0].setValue(p.get('storageNoteNo'));
					p.set('rowAction','M');
				}
				p.endEdit();	
				
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				btnSave.enable();
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
				btnSave.enable();
			},
			
			//在xml文档外面封装HtRequest标签
			xmlData:HTUtil.HTX(xml)
		});
		btnSave.resumeEvents();
	};
	
	//删除单据
	this.removeNote=function(){
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
      	if(btn == 'yes') {
      		if(p.get('status')==0){
      			p.set('rowAction',p.get('rowAction')=='N'?'D':'R');
	        		var xml = HTUtil.RTX4R(p,'WStorageNote');
	        		
	            	//HTUtil.REQUEST('WSTORAGE_NOTE_S', xml,this.removeTab,this);
	        		//Ext.getCmp('removeBtn').setDisabled(true);
	        		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_S'},
	        			success: function(res){
	        				p.beginEdit();           				
	        				p.set('rowAction','R');        				
	        				p.endEdit();
	        				this.updateToolBar();
	        				this.removeTab(res,this);
	        				//Ext.getCmp('removeBtn').setDisabled(false);
	        			},
	        			failure: function(res){
	        				XMG.alert(SYS,M_F+res.responseText);
	        				//Ext.getCmp('removeBtn').setDisabled(false);
	        			},
	        			
	        			//在xml文档外面封装HtRequest标签
	        			xmlData:HTUtil.HTX(xml)
	        		});
      		}
      		else{
      			XMG.alert(SYS,'该入库单不是新增状态，不能删除！');
      		}
      	}
		},this);
	};
	
	 //收货调用方法
  this.receive=function(){
  	
  	if(p){
  		var tab = this.ownerCt;
  		var c = 'RECEIVED_CARGO_NOTE'+p.get('uuid');
      	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.WPlacedCargoTab(p)));
  		
  	
  	}
  };
  
	//输出
	this.exp = function(){
			EXPC('WSTORAGE_LIST','&sort=id&dir=ASC&id='+p.get('id'));
	};	
	
	var inListExcel=function(){
		var url = REPORT_URL;
		url += '&__report=reports/wms_CargoInListReport.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE")+'&id='+p.get('id');
		window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};
	

	var title = p.get('rowAction')=='N'?(C_ADD+C_IN_STORAGE_NOTE):(C_IN_STORAGE_NOTE+'-'+p.get('storageNoteNo'));
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',ref:'../saveBtn',
		hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SAVE)),scope:this,handler:this.save});
	var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',id:'removeBtn',
		hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)),scope:this,handler:this.removeNote});
	
	 //收货
  var btnReceviedCargo=new Ext.Button({text:'上架',iconCls:'option',
  	hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_RECEIVED),scope:this,handler:this.receive});

  //输出
  //任务清单
  var btnInListExcel={text:'任务清单',
  	hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT),scope:this,handler:inListExcel};
  var btnPStorageNote={text:C_IN_STORAGE_NOTE,scope:this,handler:this.exp};
	var btnPrint=new Ext.Button({text:C_EXPORT,iconCls:'print',
		hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT)),scope:this,
  	menu: {items: [btnPStorageNote,
  	               btnInListExcel]}});
	
	var basicPanel=new Ext.form.FormPanel({title:'主信息',
		items:[masterInfoPanel,pnlCustInfo,pnlTransInfo,otherInfoPanel]
	});
	
	var cargoPanel=new Ext.Panel({title:'货物信息',
		layout:'border',
		items:[grid]
	});
	var tab=new Ext.TabPanel({activeTab:0,region:'center',height:200,
		items:[basicPanel,cargoPanel]});
	
	Fos.StorageNoteTab.superclass.constructor.call(this, {
	id: 'STORAGE_NOTE_'+p.get('uuid'),title:title,
	closable:true,layout:'border',
	tbar:
		[btnSave,
		 btnRemove,
		 btnReceviedCargo,
		 btnPrint],
	items: [tab]
	},this.updateToolBar());
};
Ext.extend(Fos.StorageNoteTab, Ext.Panel);



/*
 * name:WNoteCargoWin
 * 入库单 编辑 弹出界在
 */
//入库单添加入库或出库的商品列表
Fos.WNoteCargoWin = function(p,store) {
	var markUnit=1;
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库区数据
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库位数据
	var blockStore = new Ext.data.Store({url:SERVICE_URL+'?_A=BLOCK_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WBlock',idProperty:'id'},WBlock),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	this.save = function(){
		btnSave.suspendEvents();
		p.beginEdit();
		//frm.getForm().updateRecord(p);
		var f = WStorageNoteCargo.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
		if(Ext.isEmpty(p.get('cargoId'))){
			Ext.Msg.alert(SYS,C_CARGO_NAME_REQUIRED,function(){frm.cargoName.focus();},this);
			return;
		};
		if(Ext.isEmpty(p.get('unitId'))){
			Ext.Msg.alert(SYS,C_QUANTITY_UNIT_REQUIRED,function(){frm.unitName.focus();},this);
			return;
		};
		if(Ext.isEmpty(p.get('planedPackages'))){
			Ext.Msg.alert(SYS,'件数不能为空！',function(){cnumPlanedPackages.focus();},this);
			return;
		};
		if(Ext.isEmpty(p.get('planedPackages'))){
			Ext.Msg.alert(SYS,C_QUANTITY_REQUIRED,function(){frm.quantity.focus();},this);
			return;
		};/*
		if(Ext.isEmpty(ctxtProductNo.getValue())){
			Ext.Msg.alert(SYS,"生产编号不能为空，请重新输入！",function(){
				ctxtProductNo.focus();
			},this);
			return ;
		}*/
		
		p.endEdit();
		var xml = HTUtil.RTX(p,'WStorageNoteCargo',WStorageNoteCargo);		
		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_CARGO_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
			if(p.get('rowAction')=='N'){	
				store.add(c);
			}
			else{
				var f = WStorageNoteCargo.prototype.fields;
				p.beginEdit();
				for (var i = 0; i < f.keys.length; i++) {
					var fn = ''+f.keys[i];
					p.set(fn,c.get(fn));
				};  
				p.endEdit();
			}
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
		xmlData:HTUtil.HTX(xml)
		});
		btnSave.resumeEvents();
	};
	
	var ctxtCargoName=new Ext.form.TextField({fieldLabel:C_CARGO_NAME,
		name:'cargoName',xtype:'textfield',value:p.get('cargoName'),
		disabled:true,anchor:'97.5%'});
	
	//商品名称
	var ccboSkuNo=new Fos.CargoLookUp({fieldLabel:'商品编号',tabIndex:51,
		    name:'skuNo',value:p.get('skuNo'),
			store:WHTStore.getWCargo(),enableKeyEvents:true,
			displayField:'skuNo',valueField:'skuNo',itemCls:'required',
			tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('cargoId','');
					
					ctxtCargoName.setValue('');
					p.set('blockId','');
					p.set('blockCode','');			
					
					ccboBlockName.setValue('');
					p.set('areaId','');
					p.set('areaCode','');	
					ccboAreaName.setValue('');

					p.set('warehouseId','');
					p.set('warehouseCode','');	
					ccboWarehouseName.setValue('');
			
					ctxtSpecification.setValue('');
					ctxtCargoType.setValue('');
					ctxtCargoColor.setValue('');
					
					cnumPlanedGrossWeight.setValue('');
					cnumPlanedNetWeight.setValue('');
					cnumPlanedVolume.setValue('');
					p.set('standardQuantity','');
					p.set('standardGrossWeight','');
					p.set('standardNetWeight','');
					p.set('standardVolume','');
					
				}},
			select:function(c,r,i){
				p.set('cargoId',r.get('id'));				
				ccboSkuNo.setValue(r.get('skuNo'));
				ctxtCargoName.setValue(r.get('cargoName'));
				p.set('blockId',r.get('blockId'));
				p.set('blockCode',r.get('blockCode'));			
				ccboBlockName.setValue(r.get('blockName'));
				
				p.set('areaId',r.get('areaId'));
				p.set('areaCode',r.get('areaCode'));				
				ccboAreaName.setValue(r.get('areaName'));
				
				p.set('warehouseId',r.get('warehouseId'));
				p.set('warehouseCode',r.get('warehouseCode'));
				ccboWarehouseName.setValue(r.get('warehouseName'));
				
				ctxtSpecification.setValue(r.get('specification'));
				ctxtCargoType.setValue(r.get('cargoType'));
				ctxtCargoColor.setValue(r.get('cargoColor'));
				
				var sq=1;
				var sgw=0;
				var snw=0;
				var sv=0;
				var unitId=r.get('pUnitId');
				var unitName=r.get('pUnitName');
				var pUnitId=r.get('pUnitId');
				var pUnit=r.get('pUnitName');
				
				p.set('wUnitId',r.get('wUnitId'));
				ccboWUnitName.setValue(r.get('wUnitName'));
				p.set('vUnitId',r.get('vUnitId'));
				ccboVUnitName.setValue(r.get('vUnitName'));
				
				if(r.get('outUnitValue')==1){
					if(r.get('pQuantity')){
					
						sq=r.get('pQuantity');
						sgw=HTUtil.round2(r.get('grossWeight'));
						snw=HTUtil.round2(r.get('netWeight'));
						sv=HTUtil.round4(r.get('volume'));
						pUnitId=r.get('pUnitId');
						pUnit=r.get('pUnitName');
					}
				}
				else if(r.get('outUnitValue')==2){
					if(r.get('p1Quantity')){
						
						sq=r.get('p1Quantity');
						sgw=HTUtil.round2(r.get('p1GW'));
						snw=HTUtil.round2(r.get('p1NW'));
						sv=HTUtil.round4(r.get('p1V'));
						pUnitId=r.get('p1UnitId');
						pUnit=r.get('p1UnitName');
					}
				}
				else if(r.get('outUnitValue')==3){
					if(r.get('p2Quantity')){
						sq=r.get('p2Quantity');
						sgw=HTUtil.round2(r.get('p2GW'));
						snw=HTUtil.round2(r.get('p2NW'));
						sv=HTUtil.round4(r.get('p2V'));
						pUnitId=r.get('p2UnitId');
						pUnit=r.get('p2UnitName');
					}
				}
				else if(r.get('outUnitValue')==4){
					if(r.get('p3Quantity')){
						sq=r.get('p3Quantity');
						sgw=HTUtil.round2(r.get('p3GW'));
						snw=HTUtil.round2(r.get('p3NW'));
						sv=HTUtil.round4(r.get('p3V'));
						pUnitId=r.get('p3UnitId');
						pUnit=r.get('p3UnitName');
					}
				}
				else if(r.get('outUnitValue')==5){
					if(r.get('p4Quantity')){
						sq=r.get('p4Quantity');
						sgw=HTUtil.round2(r.get('p4GW'));
						snw=HTUtil.round2(r.get('p4NW'));
						sv=HTUtil.round4(r.get('p4V'));
						pUnitId=r.get('p4UnitId');
						pUnit=r.get('p4UnitName');
					}
				}
				
				p.set('standardQuantity',sq);
				p.set('standardGrossWeight',sgw);
				p.set('standardNetWeight',snw);
				p.set('standardVolume',sv);
				var pcs=cnumPlanedPackages.getValue()!=null?cnumPlanedPackages.getValue():0;
				p.set('planedQuantity',pcs*sq);
				p.set('planedGrossWeight',pcs*sgw);
				p.set('planedNetWeight',pcs*snw);
				p.set('planedVolume',pcs*sv);
				p.set('unitId',unitId);//数量单位ID
				ccboUnitName.setValue(unitName);//数量单位
				
				p.set('pUnitId',pUnitId);
				ccboPUnit.setValue(pUnit);
				cnumPlanedQuantity.setValue(pcs*sq); //数量
				cnumPlanedGrossWeight.setValue(pcs*sgw);//毛重
				cnumPlanedNetWeight.setValue(pcs*snw);//净重  
				cnumPlanedVolume.setValue(pcs*sv);	//体积
			},
			keydown:{
				fn:function(f,e){
					WCargoLC(f,e,0,0,'','');
					},
				buffer:BFL
			}
			
		}});
	
	//件数单位=以前的数量单位
	//包装单位=以前的件数单位
	//数量单位
	var ccboUnitName=new Ext.form.ComboBox({fieldLabel:'EA单位',name:"unitName",value:p.get("unitName"),align:'center',
		      tabIndex:62,itemCls:'required',
			ref:'../unitName',displayField:'unitName',valueField:'unitName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
            listeners:{scope:this,select:function(c,r,i){
				p.set('unitId',r.get('id'));
			}}});	
	//重量单位
	var ccboWUnitName=new Ext.form.ComboBox({fieldLabel:C_WEIGHT_UNIT,name:"wUnitName",ref:'../wUnitName',
		value:p.get('wUnitName'),align:'center',tabIndex:66,
			xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
	        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
            listeners:{scope:this,select:function(c,r,i){
				p.set('wUnitId',r.get('id'));
			}}});
	
	
	
	//是否质检
	var cchkQaFlag={fieldLabel:C_QA_FLAG,tabIndex:15,
			name:'qaFlag',xtype:'checkbox',anchor:'99%'};
	//质检单号
	var ctxtQaNo=new Ext.form.TextField({fieldLabel:C_QA_NO,name:'qaNo',value:p.get('qaNo'),tabIndex:17,xtype:'textfield',anchor:'95%'});
	
	//抽样率
	var cnumSmapleRate=new Ext.form.NumberField({fieldLabel:C_SAMPLE_RATE,name:'sampleRate',value:p.get('sampleRate'),value:p.get('sampleRate'),					
			tabIndex:13,xtype:'numberfield',anchor:'95%'});
	
	//品质
	var ccboQualityType=new Ext.form.ComboBox({fieldLabel:C_QUALITY,name:"qualityType",value:p.get('qualityType'),align:'center',tabIndex:19,
			xtype:'combo',displayField:'NAME',valueField:'CODE',triggerAction:'all',
	        mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.QUALITY_TYPE_S,anchor:'95%'});
	//货物规格
	var ctxtSpecification=new Ext.form.TextField({fieldLabel:'货物规格',name:'specification',value:p.get('specification'),tabIndex:52,
	    	ref:'../specification',xtype:'textfield',anchor:'95%'});
	//数量
	var cnumPlanedQuantity=new Ext.form.NumberField({fieldLabel:'EA数量',name:'planedQuantity',value:p.get('planedQuantity'),tabIndex:63,
	    	anchor:'95%',itemCls:'required',
	    	listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						
					}
					else{
						if(markUnit==1){
						var pQuantity=HTUtil.round2(p.get('standardQuantity'));
						pQuantity=pQuantity==0?1:pQuantity;
						var pcs=0;
						if(pQuantity!=null&&pQuantity!=''){
							pcs=f.getRawValue()/pQuantity;
							cnumPlanedPackages.setValue(pcs);
						}
						
						var grossWeight=p.get('standardGrossWeight');
						if(grossWeight!=null&&grossWeight!=''){
							cnumPlanedGrossWeight.setValue(pcs*grossWeight);
						}
						var netWeight=p.get('standardNetWeight');
						if(netWeight!=null&&netWeight!=''){
							cnumPlanedNetWeight.setValue(pcs*netWeight);
						}
						
						var volume=p.get('standardVolume');
						if(volume!=null&&volume!=''){
							cnumPlanedVolume.setValue(pcs*volume);
						}
						var measure=p.get('standardMeasure');
						if(measure!=null&&measure!=''){
							cnumPlanedMeasure.setValue(pcs*measure);
							
						}
					}
					}
				}
	    	}
	});
	
	
	//毛重
	var cnumPlanedGrossWeight=new Ext.form.NumberField({fieldLabel:'毛重',name:'planedGrossWeight',value:p.get('planedGrossWeight'),ref:'../grossWeight',
			tabIndex:67,xtype:'numberfield',anchor:'95%',
			listeners:{}
	});
	
	//净重
	var cnumPlanedNetWeight=new Ext.form.NumberField({fieldLabel:'净重',name:'planedNetWeight',value:p.get('planedNetWeight'),
		ref:'../netWeight',tabIndex:68,xtype:'numberfield',anchor:'95%',
		listeners:{}
	});
	//批次号
	var ctxtBatchNo=new Ext.form.TextField({fieldLabel:C_BATCH_NO,name:'batchNo',value:p.get('batchNo'),tabIndex:60,xtype:'textfield',anchor:'95%'});
	//生产日期
	var cdteProductDate=new Ext.form.DateField({fieldLabel:C_PRODUCT_DATE,tabIndex:58,name:'productDate',value:p.get('productDate'),
			xtype:'datefield',format:DATEF,anchor:'95%',
			listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
					}
					else{
						//f.setValue(formatDate(f.getRawValue()));
					}
				}
				
			}
				});
	
	//生产编号
	var ctxtProductNo=new Ext.form.TextField({fieldLabel:'生产编号',tabIndex:59,name:'productNo',value:p.get('productNo'),
		itemCls:'needed',anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.setValue('');
				}
				else{
					if(f.getRawValue().length!=PO_LENGTH){
						Ext.Msg.alert(SYS,"生产编号的长度不等于6位，请重新输入！");
						f.setValue('');
						
					}
						
					}
				}
			}
	});
	//质检类型
	var ccboQaType=new Ext.form.ComboBox({fieldLabel:C_QA_TYPE,name:'qaType',value:p.get('qaType'),tabIndex:16,
			store:HTStore.QA_TYPE_S,xtype:'combo',
			displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction: 'all',
			selectOnFocus:true,anchor:'95%'});
	//抽样数量
	var cnumSampleNum=new Ext.form.NumberField({fieldLabel:C_SAMPLE_NUM,name:'sampleNum',value:p.get('sampleNum'),
			tabIndex:18,xtype:'numberfield',anchor:'95%'});
	
	//质检说明
	var ctxtQaDescription=new Ext.form.TextField({fieldLabel:C_QA_DESCRIPTION,name:'qaDescription',value:p.get('qaDescription'),
		tabIndex:20,xtype:'textfield',anchor:'95%'});

	//体积
	var cnumPlanedVolume=new Ext.form.NumberField({fieldLabel:C_CBM_S,name:'planedVolume',value:p.get('planedVolume'),ref:'../planedVolume',
			tabIndex:70,xtype:'numberfield',anchor:'95%',decimalPrecision:4,
			listeners:{}
	});
	
	var ccboVUnitName=new Ext.form.ComboBox({fieldLabel:'体积单位',name:'vUnitName',value:p.get('vUnitName'),ref:'../vUnitName',
			xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',tabIndex:69,
	        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
	        listeners:{scope:this,select:function(c,r,i){
							p.set('vUnitId',r.get('id'));
						}}
			});
	var cnumPlanedMeasure=new Ext.form.NumberField({fieldLabel:'面积',name:'planedMeasure',ref:'../planedMeasure',tabIndex:72,
		value:p.get('planedMeasure'),xtype:'numberfield',anchor:'95%'});
	var ccboMUnitName=new Ext.form.ComboBox({fieldLabel:'面积单位',name:'mUnitName',ref:'../mUnitName',
		value:p.get('mUnitName'),xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
	        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',tabIndex:71,
	        listeners:{scope:this,select:function(c,r,i){
							p.set('mUnitId',r.get('id'));
						}}});
	
	var ccboPUnit=new Ext.form.ComboBox({fieldLabel:'件数单位',name:'pUnit',value:p.get('pUnit'),xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
	        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_S(),anchor:'95%',tabIndex:64,itemCls:'required',
	        listeners:{scope:this,
	        			select:function(c,re,i){
							p.set('pUnitId',re.get('id'));
							Ext.Ajax.request({url:SERVICE_URL,method:'POST',
					   			params:{_A:'WCARGO_FU',_mt:'xml',id:p.get('cargoId')},
								success: function(r){
									var a=HTUtil.XTRA(r.responseXML,'WCargo',WCargo);
									var sq=1;
									var sgw=0;
									var snw=0;
									var sv=0;
									var unitId=re.get('id');
									var unitName=re.get('unitName');
									
									
									p.set('wUnitId',a[0].get('wUnitId'));
									ccboWUnitName.setValue(a[0].get('wUnitName'));
									p.set('vUnitId',a[0].get('vUnitId'));
									ccboVUnitName.setValue(a[0].get('vUnitName'));
									
									if(a.length>0){
										if(p.get('pUnitId')==a[0].get('pUnitId')){//与单号包装一样									
											if(a[0].get('pQuantity')){
												markUnit=1;
												sq=a[0].get('pQuantity');
												sgw=HTUtil.round2(a[0].get('grossWeight'));
												snw=HTUtil.round2(a[0].get('netWeight'));
												sv=HTUtil.round4(a[0].get('volume'));
												unitId=a[0].get('pUnitId');
												unitName=a[0].get('pUnitName');
												
											}												
										}
										else if(p.get('pUnitId')==a[0].get('p1UnitId')){
											if(a[0].get('p1Quantity')){
												markUnit=1;
												sq=a[0].get('p1Quantity');
												sgw=HTUtil.round2(a[0].get('p1GW'));
												snw=HTUtil.round2(a[0].get('p1NW'));
												sv=HTUtil.round4(a[0].get('p1V'));
												unitId=a[0].get('pUnitId');
												unitName=a[0].get('pUnitName');													
											}
											
										}
										else if(p.get('pUnitId')==a[0].get('p2UnitId')){
											if(a[0].get('p2Quantity')){
												markUnit=1;
												sq=a[0].get('p2Quantity');
												sgw=HTUtil.round2(a[0].get('p2GW'));
												snw=HTUtil.round2(a[0].get('p2NW'));
												sv=HTUtil.round4(a[0].get('p2V'));
												unitId=a[0].get('pUnitId');
												unitName=a[0].get('pUnitName');	
											}
										}
										else if(p.get('pUnitId')==a[0].get('p3UnitId')){
											if(a[0].get('p3Quantity')){	
												markUnit=1;
												sq=a[0].get('p3Quantity');
												sgw=HTUtil.round2(a[0].get('p3GW'));
												snw=HTUtil.round2(a[0].get('p3NW'));
												sv=HTUtil.round4(a[0].get('p3V'));
												unitId=a[0].get('pUnitId');
												unitName=a[0].get('pUnitName');	
											}
											
										}
										else if(p.get('pUnitId')==a[0].get('p4UnitId')){
											if(a[0].get('p4Quantity')){
												markUnit=1;
												sq=a[0].get('p4Quantity');
												sgw=HTUtil.round2(a[0].get('p4GW'));
												snw=HTUtil.round2(a[0].get('p4NW'));
												sv=HTUtil.round4(a[0].get('p4V'));
												unitId=a[0].get('pUnitId');
												unitName=a[0].get('pUnitName');
											}	
									}
										else{
											markUnit=2;
										}
								}
							}
						});
			}}});
	
	var cnumPlanedPackages=new Ext.form.NumberField({fieldLabel:'件数',name:'planedPackages',value:p.get('planedPackages'),
		xtype:'numberfield',anchor:'95%',tabIndex:65,itemCls:'required',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){					
				}
				else{
					if(markUnit==1){
					var sq=p.get('standardQuantity');
					
					var pcs=f.getRawValue();
					if(sq!=null&&sq!=''){
						//cnumPlanedPackages.setValue(f.getRawValue()/pQuantity);
						cnumPlanedQuantity.setValue(pcs*sq);
					}
					
					var grossWeight=p.get('standardGrossWeight');
					
					if(grossWeight!=null&&grossWeight!=''){
						cnumPlanedGrossWeight.setValue(pcs*grossWeight);
					}
					var netWeight=p.get('standardNetWeight');
					if(netWeight!=null&&netWeight!=''){
						cnumPlanedNetWeight.setValue(pcs*netWeight);
					}
					
					var volume=p.get('standardVolume');
					if(volume!=null&&volume!=''){
						cnumPlanedVolume.setValue(pcs*volume);
					}
					var measure=p.get('standardMeasure');
					if(measure!=null&&measure!=''){
						cnumPlanedMeasure.setValue(pcs*measure);
					}
				}
				}
			}
		}
    });
	var MPlanedQ=cnumPlanedPackages.getValue();
	this.getGNV = function(){
		if(MPlanedQ){
			MGrossWeight1=cnumPlanedGrossWeight.getValue()/MPlanedQ;
			MNetWeight1=cnumPlanedNetWeight.getValue()/MPlanedQ;
			MVolume1=cnumPlanedVolume.getValue()/MPlanedQ;
		}
	};
	var ccboBlockName=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',value:p.get('blockName'),tabIndex:55,
		store:WHTStore.getBlock(),enableKeyEvents:true,itemSelector:'div.list-item',tpl:blockTpl,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					f.clearValue();
					p.set('blockId','');
					p.set('blockCode','');
				}
			},
			select:function(c,r,i){
				p.set('blockId',r.get('id'));
				p.set('blockCode',r.get('blockCode'));
				p.set('areaId',r.get('areaId'));
				p.set('areaCode',r.get('areaCode'));
				//p.set('areaName',r.get('areaName'));
				p.set('warehouseId',r.get('warehouseId'));
				p.set('warehouseCode',r.get('warehouseCode'));
				ccboAreaName.setValue(r.get('areaName'));
				ccboWarehouseName.setValue(r.get('warehouseName'));
			},
			keydown:{
				fn:function(f,e,t){
					var r=p.get('areaId');
					var w=p.get('warehouseId');
					WBlockLC(f,e,'0','',r,w);
				},
				buffer:BF
			}
		}
	});
	var ccboAreaName=new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',value:p.get('areaName'),ref:'../areaName',store:areaStore,xtype:'combo',
			displayField:'areaName',valueField:'areaName',typeAhead: true,mode:'remote',
			triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:56,
			listeners:{scope:this,
				select:function(c,r,i){							
					//areaId=r.get('id');
					p.set('areaId',r.get('id'));
					p.set('areaCode',r.get('areaCode'));	
					p.set('warehouseId',r.get('warehouseId'));
					p.set('warehouseCode',r.get('warehouseCode'));
					frm.warehouseName.setValue(r.get('warehouseName'));	
					ccboBlockName.setAreaName(r.get('areaName'));
					
					
				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						areaId='';	
						p.set('areaId','');
						p.set('areaCode','');
						p.set('warehouseCode','');
						p.set('warehouseId','');
						frm.warehouseName.setValue('');
						ccboBlockName.setAreaName('');
					}
				}
			}});
	var ccboWarehouseName=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',value:p.get('warehouseName'),
			ref:'../warehouseName',store:warehouseStore,xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
			typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:57,
			listeners:{scope:this,
				select:function(c,r,i){
					p.set('warehouseId',r.get('id'));
					p.set('warehouseCode',r.get('warehouseCode'));
					ccboBlockName.setWarehouseName(r.get('warehouseName'));
					
	    			frm.areaName.setValue('');
	    			frm.areaName.store.removeAll();
	    			frm.areaName.store.baseParams={_mt:'json',warehouseId:r.get('id')};
	    			frm.areaName.store.reload();

				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						p.set('warehouseId','');
						p.set('warehouseCode','');
						ccboBlockName.setWarehouseName('');
					}}
			}});
	var ctxtCargoType=new Ext.form.TextField({fieldLabel:'货物型号',xtype:'textfield',name:'cargoType',tabIndex:53,
			value:p.get('cargoType'),ref:'../cargoType',anchor:'95%'});
	var ctxtCargoColor=new Ext.form.TextField({fieldLabel:'货物颜色',xtype:'textfield',name:'cargoColor',tabIndex:54,
			value:p.get('cargoColor'),ref:'../cargoColor',anchor:'95%'});
	
	var cEmpty={fieldLabel:'-',anchor:'95%',labelSeparator:''};
	var ctxtRemarks=new Ext.form.TextField({fieldLabel:'备注',name:'remarks',tabIndex:61,value:p.get('remarks'),anchor:'88.5%'});
	

	var sheet1=new Ext.Panel({title:'质检信息',
		labelWidth:80,layout:'column',layoutConfig:{columns:4},
		items:[{columnWidth:.25,layout:'form',border:false,
			       items:[cchkQaFlag]},
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ccboQaType,cnumSmapleRate]},
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ccboQualityType,cnumSampleNum]},
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ctxtQaDescription,ctxtQaNo]}]
	});
	
	var tab=new Ext.TabPanel({activeTab:0,
		items:[sheet1]});
	
	
	var frm = new Ext.form.FormPanel({labelWidth:80,frame:true,padding:5,
		layout:'column',ref:'../frm',layoutConfig:{columns:4},items:[
            {columnWidth:.3,layout:'form',border:false,items:[
                ccboSkuNo
            ]},/*
            {columnWidth:.3,layout:'form',border:false,items:[
                ctxtProductNo
              ]},*/
            {columnWidth:.3,layout:'form',border:false,items:[
               ctxtBatchNo
            ]},
           {columnWidth:.3,layout:'form',border:false,items:[
                cdteProductDate
            ]},
            {columnWidth:.9,layout:'form',border:false,items:[
               ctxtCargoName
            ]},
            {columnWidth:.3,layout:'form',border:false,items:[
               ctxtCargoType,ccboWarehouseName
               ]},
            {columnWidth:.3,layout:'form',border:false,items:[
              ctxtSpecification,ccboAreaName
               ]},
            {columnWidth:.3,layout:'form',border:false,items:[
                ctxtCargoColor,ccboBlockName
               ]},
           {columnWidth:1,layout:'form',border:false,items:[
             ctxtRemarks]}
            
            
	    ]});
	
	var quantityPanel=new Ext.Panel({title:'数量信息',
		frame:false,layout:'column',padding:5,
		items:[
		       {columnWidth:.25,labelWidth:65,layout:'form',border:false,
		    	   items:[ccboPUnit,ccboWUnitName,ccboVUnitName]},
	    	   {columnWidth:.25,labelWidth:65,layout:'form',border:false,
		    	   items:[cnumPlanedPackages,cnumPlanedGrossWeight,cnumPlanedVolume]},
	    	   {columnWidth:.25,labelWidth:65,layout:'form',border:false,
		    	   items:[ccboUnitName,cnumPlanedNetWeight,ccboMUnitName]},
	    	   {columnWidth:.25,labelWidth:65,layout:'form',border:false,
		    	   items:[cnumPlanedQuantity,cEmpty,cnumPlanedMeasure]}
		       ]
	});
	
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'ok',scope:this,handler:this.save});
	Fos.WNoteCargoWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:C_ADD_CARGO,width:800,height:360,modal:true,
	  	items:[frm,quantityPanel],
	  	buttons:[btnSave,
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	},this.getGNV());
};
Ext.extend(Fos.WNoteCargoWin, Ext.Window);

/*
 * WStorageRateWin
 * 作业单 弹出界面
 */
Fos.WStorageRateGrid = function(p,cargoStore) {
	
	 var store=new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_RATE_Q',baseParams:{_mt:'xml'},
	    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageRate',id:'id'},WStorageRate),
	    	remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	    });
	 var rateStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WRATE_QR',baseParams:{_mt:'xml'},
			reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WRate',idProperty:'id'},WRate),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	/* var cargoStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WCARGO_X',baseParams:{_mt:'xml'},
			reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCargo',idProperty:'id'}, WCargo),
				remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	*/ 
	 if(p.get('rowAction')!='N'){
		 	//cargoStore.load({params:{storageNoteId:p.get('id')}});
	    	store.load({params:{storageNoteId:p.get('id')}});
	 }
	 
	 var cboCharName=new Ext.form.ComboBox();
	    
	  //商品名称
		var cCargoName=new Ext.form.ComboBox({
			    name:'carogName',
				store:cargoStore,enableKeyEvents:true,
				displayField:'cargoName',valueField:'cargoName',
				tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
				typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
				listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){						
						var a=sm.getSelected();
						a.set('skuNo','');
						a.set('cargoId','');
						a.set('cargoQuantity','');
						a.set('qUnitId','');
						a.set('qUnitName','');
						a.set('cargoWeight','');
						a.set('wUnitId','');
						a.set('wUnitName','');
						a.set('cargoVolume','');
						a.set('vUnitId','');
						a.set('vUnitName','');
						a.set('storageNoteCargoId','');
						a.set('quantity','');
						a.set('receivedQuantity','');
					}},
				select:function(c,r,i){
					var a=sm.getSelected();
					a.set('skuNo',r.get('skuNo'));
					a.set('cargoId',r.get('cargoId'));
					a.set('cargoQuantity',r.get('receivedQuantity'));
					a.set('qUnitId',r.get('unitId'));
					a.set('qUnitName',r.get('unitName'));
					a.set('cargoWeight',r.get('receivedGrossWeight'));
					a.set('wUnitId',r.get('wUnitId'));
					a.set('wUnitName',r.get('wUnitName'));
					a.set('cargoVolume',r.get('receivedVolume'));
					a.set('vUnitId',r.get('vUnitId'));
					a.set('vUnitName',r.get('vUnitName'));
					a.set('storageNoteCargoId',r.get('id'));
					a.set('quantity',r.get('storageType')==0?r.get('receivedQuantity'):r.get('pickedQuantity'));
				}
				
			}});
	    
		var cRateName=new Fos.RateLookup({name:'rateName',store:rateStore,enableKeyEvents:true,
			displayField:'rateName',valueField:'rateCode',typeAhead:true,mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
	  		triggerAction:'all',selectOnFocus:true,
	  		anchor:'99%', listeners:{scope:this,
	        	blur:function(f){
	        		if(f.getRawValue()==''){
	        			
	        		}
	        	},
	        	select:function(c,r,i){
	        		var a=sm.getSelected();
	        		a.set('rateId',r.get('id'));
	        		a.set('rateCode',r.get('charCode'));
	        		a.set('rateName',r.get('rateName'));
	        		a.set('charName',r.get('charName'));
	        		a.set('charId',r.get('charId'));
	        		a.set('unit',r.get('unit'));
	        		a.set('unitName',r.get('unitName'));
	        		a.set('unitPrice',r.get('unitPrice'));
	        		if(a.get('quantity') !=undefined && a.get('unitPrice') !=undefined && a.get('taskTime') !=undefined){
	        			a.set('amount',HTUtil.round2(a.get('quantity'))*HTUtil.round2(a.get('unitPrice'))*HTUtil.round2(a.get('taskTime')));
	        		}
	        		else{
	        			a.set('amount',0);
	        		}
				}
			}});
		
		//单价
		var txtUnitProce=new Ext.form.TextField({name:'unitPrice',value:p.get('unitPrice'),
			tabIndex:6,ref:'../unitPrice',anchor:'95%'
				});
		//计费数量
		var txtPuantity=new Ext.form.TextField({name:'quantity',value:p.get('quantity'),
			tabIndex:6,ref:'../quantity',anchor:'95%'
				});
		//工时
		var txtTaskTime=new Ext.form.TextField({name:'taskTime',value:p.get('taskTime'),
			tabIndex:6,ref:'../taskTime',anchor:'95%'
		});
		
	    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	    //构建计费条目
	    var cm=new Ext.grid.ColumnModel({
	    	columns:[sm,
	               {header:'商品名称',dataIndex:'cargoName',align:'center',editor:cCargoName},
	               {header:'商品编码',dataIndex:'skuNo',align:'center'},
				   {header:'服务项目',dataIndex:'rateName',align:'center',editor:cRateName},
				   {header:'服务代码',dataIndex:'rateCode',align:'center'},
				   {header:'费用名称',dataIndex:'charName',editor:cboCharName,align:'center'},			  
				   {header:'单位类别',dataIndex:'unit',align:'center'},	
				   {header:'计费单位',dataIndex:'unitName',align:'center'},
				   {header:'单价',dataIndex:'unitPrice',align:'center',editor:txtUnitProce},
				   {header:'计费数量',dataIndex:'quantity',align:'center',editor:txtPuantity},
				   {header:'工时',dataIndex:'taskTime',align:'center',editor:txtTaskTime},
				   {header:'金额',dataIndex:'amount',align:'center'},
				   {header:'数量',dataIndex:'cargoQuantity',align:'center'},
				   {header:'数量单位',dataIndex:'unitName',align:'center'},
				   {header:'重量',dataIndex:'cargoWeight',align:'center'},
				   {header:'重量单位',dataIndex:'wUnitName',align:'center'},
				   {header:'体积',dataIndex:'cargoVolume',align:'center'},
				   {header:'体积单位',dataIndex:'vUnitName',align:'center'},
				   {header:'结算对象',dataIndex:'accountName',align:'center',width:170},
				   {header:'计费重计算比例',width:120,align:'center'}
	    ],defaults:{sortable:true,width:100}}); 
	    
	    var addRate=function(){
	    	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
	    	else{
		    	//var win=new Fos.WStorageRateWin(p,rateStore);
		    	//win.show();
	    		var r=new WStorageRate({
	    			storageNoteId:p.get('id'),
	    			storageNoteNo:p.get('storageNoteNo'),
	    			accountName:p.get('cargoOwnerName'),
	    			accountCode:p.get('cargoOwnerCode'),
	    			accountId:p.get('cargoOwnerId'),
	    			uuid:HTUtil.UUID(32),
	    			rowAction:'N'
	    		});
	    		store.insert(0,r);
	    		sm.selectFirstRow();
	    		this.startEditing(0,1);
	    		
	    	}
	    };
	    
	    var saveRate=function(){
	    	this.stopEditing();
			//构建XML
			var xml='';
			var a =store.getModifiedRecords();
			if(a.length>0){xml = HTUtil.ATX(a,'WStorageRate',WStorageRate);};	
			if(xml){
					Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_RATE_S'},
					success: function(res){
						var a = HTUtil.XTRA(res.responseXML,'WStorageRate',WStorageRate);
						HTUtil.RUA(store,a,WStorageRate);
						XMG.alert(SYS,M_S);
					},
					failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
					xmlData:HTUtil.HTX(xml)});
			}
			
	    };
	    
	    var delRate=function(){
	    	var rs =sm.getSelections();
			if(rs.length>0){	    	
	    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
		        	if(btn == 'yes') {
		        		for(var i=0;i<rs.length;i++){
		        			var b=rs[i];
			        		if(b.get('rowAction')=='N'){
			        			b.set('rowAction','D');
			        			store.remove(b);
			        		}
			        		else{
			        			this.stopEditing();		        		
				        		b.beginEdit();						
								b.set('rowAction','R');
								b.endEdit();
				        	}
			        		
			        		//构建XML
			        		var xml='';
			        		var a =store.getModifiedRecords();
			        		if(a.length>0){xml = HTUtil.ATX(a,'WStorageRate',WStorageRate);};	
			        		if(xml){		        			
			        			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_RATE_S'},
			        				success: function(res){
			        			
			        					store.remove(rs);
			        					XMG.alert(SYS,M_S);
			        				},
			        				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
			        				xmlData:HTUtil.HTX(xml)});
			        		}
			        		
			        	  }
		        	}
					},this);
	    		
		    }
			else 
				Ext.Msg.alert(SYS,M_R_P);
	    };
	    
	    
	  Fos.WStorageRateGrid.superclass.constructor.call(this,{id:'STORAGE_RATE',title:'收费服务',
		autoscoll:'true',
    	closable:true,store:store,sm:sm,cm:cm, stripeRows:true,columnLines:true,  	
    	listeners:{scope:this,
    		beforeedit:function(e){
    			},
    			afteredit: function(e) {
    				var f = e.field;
    				var r=e.record;
    				if (f == 'taskTime') {
    					if(r.get('taskTime')=='' || r.get('unitPrice')=='' || r.get('quantity')==''){
    						r.set('amount',0);
    					}else{
    						r.set('amount',r.get('unitPrice')*r.get('quantity')*r.get('taskTime'));
    					}
    				}else if (f == 'unitPrice'){
    					if(r.get('taskTime')=='' || r.get('unitPrice')=='' || r.get('quantity')==''){
    						r.set('amount',0);
    					}else{
    						r.set('amount',r.get('unitPrice')*r.get('quantity')*r.get('taskTime'));
    					}
    				}else if (f == 'quantity'){
    					if(r.get('taskTime')=='' || r.get('unitPrice')=='' || r.get('quantity')==''){
    						r.set('amount',0);
    					}else{
    						r.set('amount',r.get('unitPrice')*r.get('quantity')*r.get('taskTime'));
    					}
    				}else if (f == 'cargoName'){
    					if(r.get('taskTime')=='' || r.get('unitPrice')=='' || r.get('quantity')==''){
    						r.set('amount',0);
    					}else{
    						r.set('amount',r.get('unitPrice')*r.get('quantity')*r.get('taskTime'));
    					}
    				}else if (f == 'rateName'){
    					if(r.get('taskTime')=='' || r.get('unitPrice')=='' || r.get('quantity')==''){
    						r.set('amount',0);
    					}else{
    						r.set('amount',r.get('unitPrice')*r.get('quantity')*r.get('taskTime'));
    					}
    				}
    				
    				
    				
    			}
    	},
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../addButton',
    		disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SAVE)),scope:this,handler:addRate},'-',
    	      {text:C_SAVE,iconCls:'save',ref:'../saveButton',disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EDIT)),scope:this,handler:saveRate},'-',    	      
    	      {text:C_REMOVE,iconCls:'remove',ref:'../removeButton',disabled:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)),scope:this,handler:delRate}]
	});
};
Ext.extend(Fos.WStorageRateGrid, Ext.grid.EditorGridPanel);
