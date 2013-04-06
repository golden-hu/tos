
//===========P1 begin ============================================
//左侧菜单 收货列表
//收货列表
//入库列表的上架功能

Fos.WReceivedCargoGrid = function(p,t) {
	
	var sel=-10000;
	
	//选中的行
	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'WRECEIVED_CARGO_X',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WReceivedCargo',idProperty:'id'},WReceivedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});

	//上架表的数据
	var placedCargoStore= new Ext.data.Store({url:SERVICE_URL+'?_A=WPLACED_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPlacedCargo',idProperty:'id'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	
	if(p){
		store.load({params:{storageNoteId:p.get('id')}});
	}

	
	
	var re={scope:this,
  		rowselect:function(sm,row,record){
  			if(this.sel!=record.get('id')){
  				this.sel=record.get('id');
  				
  				//placedCargoStore.baseParams={_A:'WPLACED_CARGO_Q',_mt:'xml',receivedCargoId:record.get('id')};
  				placedCargoStore.load({params:{receivedCargoId:record.get('id')}});
  			}
  		},
  		selectionchange:function(sm){
  			
  		}
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
		{header:C_IN_STORAGE_NOTE_NO,width:120,dataIndex: 'storageNoteNo'},
		{header:C_SKU_NO,width:60,dataIndex: 'skuNo'},
		{header:C_CARGO_NAME,width:150,dataIndex: 'cargoName'},
		{header:'生产批号',dataIndex: 'productNo'},
		{header:'库位',dataIndex: 'blockName'},
      {header:C_SPECIFICATION,dataIndex: 'specification'},
      {header:'数量单位',dataIndex: 'unitName'},
      {header:C_PLANED_QUANTITY,dataIndex: 'planedQuantity'},
      {header:C_RECEIVED_QUANTITY,dataIndex: 'receivedQuantity'},
      {header:"上架数量",dataIndex: 'placedQuantity'},
      {header:'收货件数',dataIndex: 'receivedPackages'},
      {header:'件数单位',dataIndex: 'pUnit'},
      {header:'计划件数',dataIndex: 'planedPackages'},
      {header:'重量单位',dataIndex: 'wUnitName'},
      {header:'重量',dataIndex: 'receivedGrossWeight'},
      {header:'体积单位',dataIndex: 'vUnitName'},
      {header:'体积',dataIndex: 'receivedVolume'},
      {header:'面积单位',dataIndex: 'mUnitName'},
      {header:'面积',dataIndex: 'receviedMeasure'},
      {header:'货主',dataIndex: 'cargoOwnerName'},
		{header:C_WARE_DATE_IN,dataIndex: 'receivedDate',renderer:formatDate},
		{header:C_PRODUCT_DATE,dataIndex: 'productDate',renderer:formatDate},
		{header:'仓库',dataIndex: 'warehouseName'},
		{header:'库区',dataIndex: 'areaName'}
		
      ],
		defaults:{sortable:true,width:100}});
	
	var grid=new Ext.grid.GridPanel({height:200,
		 store:store,sm:sm,cm:cm,
		 loadMask: true
		 //bbar:PTB(store,20)
		 
	 });
	
	var re2={scope:this,
  		rowselect:function(sm,row,record){
  			if(record){
  				//frm.getForm().update(p);
  				frm.getForm().loadRecord(record);
  				if(record.get('status')=='5'){
  					buttonPanel.setDisabled(true);
  				}
  				else{
  					buttonPanel.setDisabled(false);
  				}
  			};
  		},
  		selectionchange:function(sm){
  			
  		}
	};
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re2});
	var cm2=new Ext.grid.ColumnModel({columns:[sm,
	    {header:'库位',dataIndex: 'blockName'},
	    {header:'生产批号',dataIndex: 'productNo'},
		{header:C_SKU_NO,width:60,dataIndex: 'skuNo'},
		{header:C_CARGO_NAME,width:150,dataIndex: 'cargoName'},
		{header:C_IN_STORAGE_NOTE_NO,width:120,dataIndex: 'storageNoteNo'},
      {header:C_SPECIFICATION,dataIndex: 'specification'},
      {header:'数量单位',dataIndex: 'unitName'},
      {header:"上架数量",dataIndex: 'quantity'},
      {header:'上架件数',dataIndex: 'packages'},
      {header:'件数单位',dataIndex: 'pUnitName'},
     
      {header:'重量单位',dataIndex: 'wUnitName'},
      {header:'重量',dataIndex: 'grossWeight'},
      {header:'体积单位',dataIndex: 'vUnitName'},
      {header:'体积',dataIndex: 'volume'},
      {header:'面积单位',dataIndex: 'mUnitName'},
      {header:'面积',dataIndex: 'measure'},
      {header:'货主',dataIndex: 'cargoOwnerName'},

		{header:C_WARE_DATE_IN,dataIndex: 'receivedDate',renderer:formatDate},
		{header:C_PRODUCT_DATE,dataIndex: 'productDate',renderer:formatDate},
		
		{header:'仓库',dataIndex: 'warehouseName'},
		{header:'库区',dataIndex: 'areaName'}
		
      ],
		defaults:{sortable:true,width:100}});
	
	var placedGrid=new Ext.grid.GridPanel({title:'上架列表',region:'west',width:400,
		 store:placedCargoStore,sm:sm2,cm:cm2,
		 loadMask: true
		 //bbar:PTB(store,20)
		 
	 });
	
	
	var del=function(){	
		var rs=sm2.getSelections();
		if(rs.length>0){
			for(var i=0;i<rs.length;i++){
				
				var re=rs[i];
				
				if(re.get('status')=='5'){
					Ext.Msg.alert(SYS,'该货物已经上架完成，不能删除！');
					return ;
				}
				
				if(Ext.isEmpty(re.get('pickedQuantity'))||re.get('pickedQuantity')==0){
					re.beginEdit();
					
					re.set('rowAction',re.get('rowAction')=='N'?'D':'R');
					re.endEdit();
				}
				else{
					Ext.Msg.alert(SYS,"该货物已经开始出库，不能允许删除！");
					return;
				}
			}
			
			
		}
		//构建XML
		var xml='';
		var a =placedCargoStore.getModifiedRecords();
		if(a.length>0){xml = HTUtil.ATX(a,'WPlacedCargo',WPlacedCargo);};	
		//xml=HTUtil.RTX(re,'WPlacedCargo',WPlacedCargo);
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WPLACED_CARGO_S'},
				success: function(res){
					var ra = HTUtil.XTRA(res.responseXML,'WPlacedCargo',WPlacedCargo);
				
					HTUtil.RUA(placedCargoStore,ra,WPlacedCargo);
					
					//grid.getStore().remove(re);
					placedCargoStore.remove(rs);
					
					Ext.Msg.alert(SYS,'数据删除成功！');
					
					},
				failure: function(res){
						Ext.Msg.alert(SYS,M_F+res.responseText);
					
				},
				xmlData:HTUtil.HTX(xml)
			});
		}
	};
	
	//上架
	var placed=function(){
		//var a=new WStorageNote({id:'M',statusFrozen:0});
		var rs=sm2.getSelections();
		if(rs.length>0){
			
          		var xml='';
          		xml=xml+HTUtil.ATX(rs,'WPlacedCargo',WPlacedCargo);
          		//WRECEIVED_CARGO_CUS
          		if(xml!=''){
          			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
          				params:{_A:'WRECEIVED_CARGO_CUS',status:5},
          				success: function(res){
          					var a = HTUtil.XTRA(res.responseXML,'WReceivedCargo',WReceivedCargo);
          					alert("a.length:"+a.length);
          					HTUtil.RUA(store,a,WReceivedCargo);
          					var b=HTUtil.XTRA(res.responseXML,'WPlacedCargo',WPlacedCargo);
          					alert("b.length:"+b.length);
          					HTUtil.RUA(placedCargoStore,b,WPlacedCargo);
          					
          					Ext.Msg.alert(SYS,"状态更新成功！");
          					
          					},
          				failure: function(res){
          						Ext.Msg.alert(SYS,M_F+res.responseText);
          					
          				},
          				xmlData:HTUtil.HTX(xml)
          			});
          		}
          		else{
          			
          		}
          		
          	}
			
		
		 
	};
	
	//取消上架
	var cancelPlaced=function(){
		//var a=new WStorageNote({id:'M',statusFrozen:0});
		var rs=sm2.getSelections();
		if(rs.length>0){
			for(var i=0;i<rs.length;i++){
				var r=rs[i];
				if(HTUtil.round2(r.get('pickedQuantity'))>0){
					Ext.Msg.alert(SYS,'货物名称:'+r.get('cargoName')+' 正在出库中不能取消！');
					return ;
				}
			}
			
          		var xml='';
          		xml=xml+HTUtil.ATX(rs,'WPlacedCargo',WPlacedCargo);
          		//WRECEIVED_CARGO_CUS
          		if(xml!=''){
          			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
          				params:{_A:'WRECEIVED_CARGO_CUS',status:0},
          				success: function(res){
          					var a = HTUtil.XTRA(res.responseXML,'WReceivedCargo',WReceivedCargo);
          					alert("a.length:"+a.length);
          					HTUtil.RUA(store,a,WReceivedCargo);
          					
          					var b=HTUtil.XTRA(res.responseXML,'WPlacedCargo',WPlacedCargo);
          					alert("b.length:"+b.length);
          					HTUtil.RUA(placedCargoStore,b,WPlacedCargo);
          					
          					Ext.Msg.alert(SYS,"状态更新成功！");
          					
          					},
          				failure: function(res){
          						Ext.Msg.alert(SYS,M_F+res.responseText);
          					
          				},
          				xmlData:HTUtil.HTX(xml)
          			});
          		}
          		else{
          			
          		}
          		
          	}
			
		
		 
	};
	
	
	//保存
	var save=function(){

		//构建XML
		var xml='';
		var a =store.getModifiedRecords();
		if(a.length>0){xml =xml+HTUtil.ATX(a,'WReceivedCargo',WReceivedCargo);};
		
		var pc=placedCargoStore.getModifiedRecords();
		if(pc.length>0){
			xml=xml+HTUtil.ATX(pc,'WPlacedCargo',WPlacedCargo);
		}
		
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRECEIVED_CARGO_SRTP'},
				success: function(res){
					var a = HTUtil.XTRA(res.responseXML,'WReceivedCargo',WReceivedCargo);
					HTUtil.RUA(store,a,WReceivedCargo);
					var b=HTUtil.XTRA(res.responseXML,'WPlacedCargo',WPlacedCargo);
					HTUtil.RUA(placedCargoStore,b,WPlacedCargo);
					
					Ext.Msg.alert(SYS,M_S);
					
					},
				failure: function(res){
						Ext.Msg.alert(SYS,M_F+res.responseText);
					
				},
				xmlData:HTUtil.HTX(xml)
			});
		}		
			
	};
	
	var createNewPlacedCargo=function(a,quantity,remarks){
		
		if(quantity>0){
			var pc=new WPlacedCargo({
				storageNoteId:a.get('storageNoteId'),
				storageNoteNo:a.get('storageNoteNo'),
				storageNoteCargoId:a.get('storageNoteCargoId'),
				receivedCargoId:a.get('id'),
				skuNo:a.get('skuNo'),
				cargoId:a.get('cargoId'),
				cargoName:a.get('cargoName'),
				specification:a.get('specification'),
				cargoType:a.get('cargoType'),
				cargoColor:a.get('cargoColor'),
				orderNo:a.get('orderNo'),
				cargoOwnerName:a.get('cargoOwnerName'),
				batchNo:a.get('batchNo'),
				warehouseId:a.get('warehouseId'),
				warehouseName:a.get('warehouseName'),
				areaId:a.get('areaId'),
				areaName:a.get('areaName'),
				blockId:a.get('blockId'),
				blockName:a.get('blockName'),
				productDate:a.get('productDate'),
				effectiveDate:a.get('effectiveDate'),
				qualityType:a.get('qualityType'),
				qaFlagDate:a.get('qaFlagDate'),
				custId:a.get('cargoOwnerId'),
				custName:a.get('cargoOwnerName'),
				productNo:a.get('productNo'),
				
				unitId:a.get('unitId'),
				unitName:a.get('unitName'),
				//没有加punitid
				pUnitId:a.get('pUnitId'),
				pUnitName:a.get('pUnit'),
				wUnitName:a.get('wUnitName'),
				wUnitId:a.get('wUnitId'),
				vUnitName:a.get('vUnitName'),
				vUnitId:a.get('vUnitId'),
				mUnitName:a.get('mUnitName'),
				mUnitId:a.get('mUnitId'),
				//没有packUnitId
				packUnitId:a.get('packUnitId'),
				packUnitName:a.get('packUnitName'),
				
				standardQuantity:a.get('standardQuantity'),
				standardGrossWeight:a.get('standardGrossWeight'),
				standardNetWeight:a.get('standardNetWeight'),
				standardVolume:a.get('standardVolume'),
				standardMeasure:a.get('standardMeasure'),
				palletNo:a.get('palletNo'),
				palletQuantity:1,
				verson:0,
			    rowAction:'N',
			    uuid:HTUtil.UUID(32)
			});
			
			
			pc.set('quantity',quantity);
			pc.set('packages',HTUtil.round2(a.get('standardQuantity'))==0?0:quantity/HTUtil.round2(a.get('standardQuantity')));
			pc.set('grossWeight',HTUtil.round2(a.get('standardGrossWeight'))*quantity);
			pc.set('netWeight',HTUtil.round2(a.get('standardNetWeight'))*quantity);
			pc.set('volume',HTUtil.round2(a.get('standardVolume'))*quantity);
			pc.set('measure',HTUtil.round2(a.get('standardMeasure'))*quantity);
			//pc.set('packQuantity',Ext.isEmpty(a.get('unitNum'))?0:a.get('unitNum'));
			
			pc.set('placedQuantity',pc.get('quantity'));
			pc.set('placedPackages',pc.get('packages'));
			pc.set('placedGrossWeight',pc.get('grossWeight'));
			pc.set('placedNetWeight',pc.get('netWeight'));
			pc.set('placedVolume',pc.get('volume'));
			pc.set('placedMeasure',pc.get('measure'));
			
			pc.set('receivedDate',a.get('receivedDate'));
			pc.set('remarks',remarks);
			
			a.set('placedQuantity',HTUtil.round2('placedQuantity')+HTUtil.round2(pc.get('quantity')));
			a.set('placedPackages',HTUtil.round2('placedPackages')+HTUtil.round2(pc.get('packages')));
			a.set('placedGrossWeight',HTUtil.round2('placedGrossWeight')+HTUtil.round2(pc.get('grossWeight')));
			a.set('placedNetWeight',HTUtil.round2('placedNetWeight')+HTUtil.round2(pc.get('netWeight')));
			a.set('placedVolume',HTUtil.round2('placedVolume')+HTUtil.round2(pc.get('volume')));
			a.set('placedMeasure',HTUtil.round2('placedMeasure')+HTUtil.round2(pc.get('measure')));
			
			
			placedCargoStore.add(pc);
		}
		
	};
	//生成上架单
	var add=function(){
		var r=sm.getSelected();
		if(r){
			if(r.get('receivedQuantity')>r.get('placedQuantity')){
				createNewPlacedCargo(r,r.get('receivedQuantity')-r.get('placedQuantity'),r.get('remarks'));
			}
			else{
				Ext.Msg.alert(SYS,'已经上架，不能新增！');
			}
		}
	};
	
	//批量生成上架单
	var batAdd=function(){
		var r=sm.getSelected();
		if(r){
			
			var quantity=0;
			var packages=0;
			var grossWeight=0;
			var netWeight=0;
			var volume=0;
			var measure=0;
			var unitNum=0;
			
			var placedQuantity=HTUtil.round2(r.get('placedQuantity'));
			var receivedQuantity=HTUtil.round2(r.get('receivedQuantity'));
			
			if(placedQuantity<receivedQuantity){
				 quantity=receivedQuantity-placedQuantity;		
			}
		
			var placedPackages=HTUtil.round2(r.get('placedPackages'));
			var receivedPackages=HTUtil.round2(r.get('receivedPackages'));
			if(placedPackages<receivedPackages){
				 packages=receivedPackages-placedPackages;
			}
			
			var placedGrossWeight=HTUtil.round2(r.get('placedGrossWeight'));
			var receivedGrossWeight=HTUtil.round2(r.get('receivedGrossWeight'));
			if(placedGrossWeight<receivedGrossWeight){
				
				grossWeight=receivedGrossWeight-placedGrossWeight;
			}
			
			var placedNetWeight=HTUtil.round2(r.get('placedNetWeight'));
			var receivedNetWeight=HTUtil.round2(r.get('receivedNetWeight'));
			if(placedNetWeight<receivedNetWeight){
				
				netWeight=receivedNetWeight-placedNetWeight;
			}
			
			var placedVolume=HTUtil.round2(r.get('placedVolume'));
			var receivedVolume=HTUtil.round2(r.get('receivedVolume'));
			if(placedVolume<receivedVolume){
				
				volume=receivedVolume-placedVolume;
			}
			
			var placedMeasure=HTUtil.round2(r.get('placedMeasure'));
			var receivedMeasure=HTUtil.round2(r.get('receivedMeasure'));
			if(placedMeasure<receivedMeasure){
				
				measure=receivedMeasure-placedMeasure;
			}
			
			var planPack=HTUtil.round2(r.get('planPack'));
			var receivedPackQuantity=HTUtil.round2(r.get('receivedPackQuantity'));
			if(planPack<receivedPackQuantity){
				
				unitNum=receivedPackQuantity-planPack;
			}
			
			//如果quantity＝＝0,则表示已经收货完成了
			if(quantity==0){
				Ext.Msg.alert(SYS,'该货物都已上架，无需再批量上架！');
				return ;
			}
			var pUnit=r.get('pUnit');
			var wUnitName=r.get('wUnitName');			
			var vUnitName=r.get('vUnitName');				
			var mUnitName=r.get('mUnitName');
			var packName=r.get('packName');
				
			var standardQuantity=HTUtil.round2(r.get('standardQuantity'));
			var standardGrossWeight=HTUtil.round2(r.get('standardGrossWeight'));
			var standardNetWeight=HTUtil.round2(r.get('standardNetWeight'));
			var standardVolume=HTUtil.round2(r.get('standardVolume'));
			var standardMeasure=HTUtil.round2(r.get('standardMeasure'));
			
			//拆零数量
			var size=packages;
			var surplus=0;
			if(standardQuantity!=0){
				
				surplus=quantity%standardQuantity;
				size=quantity/standardQuantity;
			}
			if(surplus>0){
				
				size=size-1;
			}
			
			//下面开始循环赋值
			
			for(var i=0;i<size;i++){
				
				//将货物列表的备注，赋值给第一条收货纪录
				var remarks='';
				if(i==0){
					remarks=r.get('remarks');
				}
				createNewPlacedCargo(r,standardQuantity,remarks);
			};
			if(surplus!=0){
				createNewPlacedCargo(r,surplus,'');
			}
			
		}

	};
	
	//====================  View Controls   =============
	
	
	var dteProductDate=new Ext.form.DateField({fieldLabel:'生产日期',name:'productDate',disabled:true,anchor:'95%'});
	var txtProductNo=new Ext.form.TextField({fieldLabel:'生产批号',name:'productNo',disabled:true,anchor:'95%'});
	var txtSkuNo=new Ext.form.TextField({fieldLabel:'货物编号',name:'skuNo',disabled:true,anchor:'95%'});
	var txtCargoName=new Ext.form.TextField({fieldLabel:'货物名称',name:'cargoName',disabled:true,anchor:'95%'});
	var txtSpec=new Ext.form.TextField({fieldLabel:'规格',name:'specification',disabled:true,anchor:'95%'}); 
	var txtStorageNoteNo=new Ext.form.TextField({fieldLabel:'入库单号',name:'storageNoteNo',disabled:true,anchor:'95%'});
	var ctxtStatus=new Ext.form.TextField({fieldLabel:'状态',name:'status',disabled:true,anchor:'95%'});
	
	var ccboBlockName=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',
		store:WHTStore.getBlock(),enableKeyEvents:true,itemSelector:'div.list-item',tpl:blockTpl,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					var re=sm2.getSelected();
					if(re){
						re.set('blockId','');
						re.set('blockCode','');
						re.set('blockName','');
						re.set('areaId','');
						re.set('areaCode','');
						re.set('areaName','');
						re.set('warehouseId','');
						re.set('warehouseCode','');
						re.set('warehouseName','');
						ccboAreaName.setValue('');
						ccboWarehouseName.setValue('');
					}
				}
			},
			select:function(c,r,i){
				
				var re=sm2.getSelected();
				if(re){
					re.set('blockId',r.get('id'));
					re.set('blockCode',r.get('blockCode'));
					re.set('blockName',r.get('blockName'));
					re.set('areaId',r.get('areaId'));
					re.set('areaCode',r.get('areaCode'));
					re.set('areaName',r.get('areaName'));
					re.set('warehouseId',r.get('warehouseId'));
					re.set('warehouseCode',r.get('warehouseCode'));
					re.set('warehouseName',r.get('warehouseName'));
					ccboAreaName.setValue(r.get('areaName'));
					ccboWarehouseName.setValue(r.get('warehouseName'));
				}
				else{
					alert('no record!');
				}
			},
			keydown:{
				fn:function(f,e,t){
					var re=sm2.getSelected();
					if(re)
					{
						WBlockLC(f,e,1,null,re.get('areaId'),re.get('warehouseId'));
					}
				},
				buffer:BF
			}
		}
	});
	var ccboAreaName=new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',ref:'../areaName',
		store:WHTStore.getArea(),
			displayField:'areaName',valueField:'areaName',typeAhead: true,mode:'remote',
			triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					var re=sm2.getSelected();
					if(re){
						
						re.set('areaId',r.get('areaId'));
						re.set('areaCode',r.get('areaCode'));
						re.set('areaName',r.get('areaName'));
						
						ccboBlockName.setAreaName(r.get('areaName'));
						
					}
				},
				blur:function(f){
					if(f.getRawValue==''){
						f.clearValue();
						var re=sm2.getSelected();
						if(re){
							re.set('blockId','');
							re.set('blockCode','');
							re.set('blockName','');
							cboBlockName.setValue('');
							re.set('areaId','');
							re.set('areaCode','');
							re.set('areaName','');
							
							
						}
					}

				}
			}});
	var ccboWarehouseName=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',
			ref:'../warehouseName',store:WHTStore.getWarehouse(),
			displayField:'warehouseName',valueField:'warehouseName',
			typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					var re=sm2.getSelected();
					if(re){
						
						re.set('warehouseId',r.get('warehouseId'));
						re.set('warehouseCode',r.get('warehouseCode'));
						ccboBlockName.setWarehouseName(r.get('warehouseName'));
					}
				},
				blur:function(f){
					if(f.getRawValue==''){
						f.clearValue();
						var re=sm2.getSelected();
						if(re){
							re.set('blockId','');
							re.set('blockCode','');
							re.set('blockName','');
							cboBlockName.setValue('');
							re.set('areaId','');
							re.set('areaCode','');
							re.set('areaName','');
							re.set('warehouseId','');
							re.set('warehouseCode','');
							re.set('warehouseName','');
							ccboAreaName.setValue('');
							
						}
					}
				}
			}});
	
	
	
	var txtUnitName=new Ext.form.TextField({fieldLabel:'数量单位',name:'unitName',disabled:true,anchor:'95%'});
	
	var numPlacedQuantity=new Ext.form.NumberField({fieldLabel:'上架数量',name:'quantity',
		anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				var r=sm2.getSelected();
				if(r){
						if(f.getRawValue==''){
							f.clearValue();
							r.set('quantity','');
							r.set('packages','');
							r.set('grossWeight','');
							r.set('netWeight','');
							r.set('volume','');
							r.set('measure','');
							
							numPlacedPackages.setValue('');
							numPlacedGrossWeight.setValue('');
							numPlacedNetWeight.setValue('');
							numPlacedVolume.setValue('');
							numPlacedMeasure.setValue('');
							}
						else{
							
							r.set('quantity',HTUtil.round2(f.getRawValue()));
							r.set('packages',HTUtil.round2(r.get('standardQuantity'))==0?0:f.getRawValue()/HTUtil.round2(r.get('standardQuantity')));
							r.set('grossWeight',HTUtil.round2(r.get('standardGrossWeight'))*HTUtil.round2(f.getRawValue()));
							r.set('netWeight',HTUtil.round2(r.get('standardNetWeight'))*HTUtil.round2(f.getRawValue()));
							r.set('volume',HTUtil.round2(r.get('standardVolume'))*HTUtil.round2(f.getRawValue()));
							r.set('measure',HTUtil.round2(r.get('standardMeasure'))*HTUtil.round2(f.getRawValue()));
							
							numPlacedPackages.setValue(r.get('packages'));
							numPlacedGrossWeight.setValue(r.get('grossWeight'));
							numPlacedNetWeight.setValue(r.get('netWeight'));
							numPlacedVolume.setValue(r.get('volume'));
							numPlacedMeasure.setValue(r.get('measure'));
						}
					}
			}
			
		}
	});

	var txtPUnit=new Ext.form.TextField({fieldLabel:'件数单位',name:'pUnitName',disabled:true,anchor:'95%'});
	
	var numPlacedPackages=new Ext.form.NumberField({fieldLabel:'上架件数',name:'packages',
		anchor:'95%',

		listeners:{scope:this,
			blur:function(f){
				var r=sm2.getSelected();
				if(r){
						if(f.getRawValue==''){
							f.clearValue();
								r.set('packages','');
								
							}
						else{
							r.set('packages',f.getRawValue());
						}
					}
			}
		}
	});
	var txtWUnitName=new Ext.form.TextField({fieldLabel:'重量单位',name:'wUnitName',
		disabled:true,anchor:'95%'
	});


	var numPlacedGrossWeight=new Ext.form.NumberField({fieldLabel:'上架毛重',name:'grossWeight',
		anchor:'95%',

		listeners:{scope:this,
			blur:function(f){
				var r=sm2.getSelected();
				if(r){
						if(f.getRawValue==''){
							f.clearValue();
							r.set('grossWeight','');
							}
						else{
							r.set('grossWeight',f.getRawValue());
						}
					}
			}
		}
			});
	var numPlacedNetWeight=new Ext.form.NumberField({fieldLabel:'上架净重',name:'netWeight',
		anchor:'95%',

		listeners:{scope:this,
			blur:function(f){
				var r=sm2.getSelected();
				if(r){
						if(f.getRawValue==''){
							f.clearValue();
							r.set('netWeight','');
							}
						else{
							r.set('netWeight',f.getRawValue());
						}
					}
			}
		}
	});
	var txtVUnitName=new Ext.form.TextField({fieldLabel:'体积单位',name:'vUnitName',
		disabled:true,anchor:'95%'});


	var numPlacedVolume=new Ext.form.NumberField({fieldLabel:'上架体积',name:'volume',
		anchor:'95%',

		listeners:{scope:this,
			blur:function(f){
				var r=sm2.getSelected();
				if(r){
						if(f.getRawValue==''){
							f.clearValue();
							r.set('volume','');
							}
						else{
							r.set('volume',f.getRawValue());
						}
					}
			}
		}
			});
	var txtMUnitName=new Ext.form.TextField({fieldLabel:'面积单位',name:'mUnitName',
		disabled:true,anchor:'95%'});

	var numPlacedMeasure=new Ext.form.NumberField({fieldLabel:'上架面积',name:'measure',
		anchor:'95%',

		listeners:{scope:this,
			blur:function(f){
				var r=sm2.getSelected();
				if(r){
						if(f.getRawValue==''){
							f.clearValue();
							r.set('measure','');
							}
						else{
							r.set('measure',f.getRawValue());
						}
					}
			}
		}});
	var txtpackUnitName=new Ext.form.TextField({fieldLabel:'包装单位',name:'packUnitName',
		disabled:true,anchor:'95%'});

	var numPlacedPackQuantity=new Ext.form.NumberField({fieldLabel:'上架包装',name:'packQuantity',
		anchor:'95%',

		listeners:{scope:this,
			blur:function(f){
				var r=sm2.getSelected();
				if(r){
						if(f.getRawValue==''){
							f.clearValue();
							r.set('packQuantity','');
							}
						else{
							r.set('packQuantity',f.getRawValue());
						}
					}
			}
		}});
	var txtRemarks=new Ext.form.TextField({fieldLabel:'备注',name:'remarks',
		anchor:'95%'});
	//var space=new Ext.form.TextField({fieldLabel:'-',disabled:true,anchor:'95%',hideLabel:true});
	//var space2=new Ext.form.TextField({fieldLabel:'-',disabled:true,anchor:'95%',hideLabel:true});
	var space={fieldLabel:'--',anchor:'95%',labelSeparator:''};
	
	var updatePlaced=function(){
		var r=sm2.getSelected();
		if(r){
			frm.getForm().updateRecord(r);
		}
	};
	
	var cancel=function(){
		
	};
	var btnCheck=new Ext.Button({text:'确认',iconCls:'ok',scope:this,handler:updatePlaced});
	var btnCancel=new Ext.Button({text:'取消',iconCls:'cancel',scope:this,handler:cancel});
	var buttonPanel=new Ext.Panel(
			{title:'数量信息',region:'center',layout:'column',width:500,padding:5,
           items:[{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,labelWidth:65,
					items:[txtSkuNo]},
					{layout:'form',labelAlign:'right', columnWidth: 0.5,border:false,labelWidth:65,
					 	items:[txtCargoName]},
					{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,labelWidth:65,
							items:[txtSpec]},
					{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,labelWidth:65,
						items:[txtStorageNoteNo,
						       txtUnitName,
						       txtWUnitName,
						       txtMUnitName,
						       txtpackUnitName
						       ]},
					{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,labelWidth:65,
						items:[dteProductDate,
						       numPlacedQuantity,
						       numPlacedGrossWeight,
						       numPlacedMeasure,
						       numPlacedPackQuantity
						       ]},
					{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,labelWidth:65,
						items:[txtProductNo,
						       txtPUnit,
						       numPlacedNetWeight,
						       txtVUnitName
						       ]},
					{layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,labelWidth:65,
							items:[ctxtStatus,
							       numPlacedPackages,
							       space,
							       numPlacedVolume
							       ]},
			       {layout:'form',labelAlign:'right', columnWidth: 0.5,border:false,labelWidth:65,
						items:[txtRemarks]},
			       {layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,labelWidth:65,
						items:[ccboAreaName]},
			       {layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,labelWidth:65,
						items:[ccboWarehouseName]},
			       {layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,labelWidth:65,
						items:[ccboBlockName]}
					
                  
			]}
			);
	var btnPlaced=new Ext.Button({text:'上架',iconCls:'gen',scope:this,handler:placed});
	var btnCancelPlaced=new Ext.Button({text:'取消上架',iconCls:'gen',scope:this,handler:cancelPlaced});
	var btnAddPlaced=new Ext.Button({text:'添加上架',iconCls:'add',scope:this,handler:add});
	var btnBatAddPlaced=new Ext.Button({text:'码盘',iconCls:'add',scope:this,handler:batAdd});
	var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',scope:this,handler:del});
	var btnSave=new Ext.Button({text:C_SAVE,id:'btnSave',iconCls:'save',scope:this,handler:save});
	var frm=new Ext.form.FormPanel({height:300,
		layout:'border',
		items:[placedGrid,buttonPanel],
		tbar:[
		      btnAddPlaced,'-',
		      btnBatAddPlaced,'-',
		      btnRemove, '-', 
		      btnSave,'-',
	         btnPlaced ],
			listeners:{scope:this,			
				afterrender:function(){
					if(t==1){
						btnAddPlaced.disable();
						btnBatAddPlaced.disable();
						btnPlaced.disable();
						btnRemove.disable();
						btnSave.disable();
					}
				}
			}
		});
	
	
	
	Fos.WReceivedCargoGrid.superclass.constructor.call(this,{title:C_IN_NOTE_RECEIVE,
  id:'G_RECEIVED_LIST',iconCls:'gen',header:false,clicksToEdit:1,closable:true,
  layout:'form',
  items:[grid,frm]
  });
};
Ext.extend(Fos.WReceivedCargoGrid, Ext.Panel);
//===================P1 END ========================================


