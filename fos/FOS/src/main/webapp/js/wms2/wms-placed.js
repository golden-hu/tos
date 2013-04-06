
// 收货明细界面
// 收货弹出界面
Fos.WPlacedCargoTab=function(p){
	this.sel=-10000;
	this.mSel=-1000;
	//02——货物列表
	var storageStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_Q',baseParams:{_mt:'xml',storageType:0},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',id:'id'},WStorageNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var storageCargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNoteCargo',idProperty:'id'},WStorageNoteCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WRECEIVED_CARGO_X',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WReceivedCargo',idProperty:'id'},WReceivedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var placedStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WPLACED_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPlacedCargo',idProperty:'id'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var cargoStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WCARGO_X',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCargo',idProperty:'id'}, WCargo),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	
	
	
	var re0={scope:this,
    		rowselect:function(sm,row,record){
    			if(this.mSel!=record.get('id')){
    				this.mSel=record.get('id');
    				store.removeAll();
    				store.load({params:{storageNoteId:record.get('id')}});
    			}
    			
    		}
    		
    };
	var sm0=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re0});
    //构建入库单grid
    var cm0=new Ext.grid.ColumnModel({columns:[sm0,
    {header:'状态',dataIndex:'status',renderer:WHTStore.getInWarehouseNoteStatus,width:80},
	{header:'入库单号',dataIndex:'storageNoteNo',width:150},
	{header:'货主',dataIndex:'cargoOwnerName',width:150}
    ],defaults:{sortable:true,width:100}});    
    
    var storageGrid=new Ext.grid.GridPanel({
    	region:'west',width:250,
    	closable:false,collapseMode:'mini',split:true,
		autoScroll:true,containerScroll:true,
    	store:storageStore,sm:sm0,cm:cm0,
    	loadMask: true,
    	bbar:PTB(storageStore,20)
   	});
    
	if(p){
		this.mSel=p.get('id');
		storageStore.load({
			params:{id:p.get('id')},
			callback:function(r){
				if(r.length>0){
					store.load({params:{storageNoteId:p.get('id')},
						callback:function(r){
							storageGrid.getSelectionModel().selectFirstRow();
						}});
					
				}
			}
		});
	}
	else{
		storageStore.load({params:{start:0,limit:20}});
	}
	
    var re={scope:this,
    		rowselect:function(sm,row,record){
    			if(this.sel!=record.get('id')){
    				this.sel=record.get('id');
    				placedStore.load({params:{receivedCargoId:record.get('id')}});
    				cargoStore.load({params:{id:record.get('cargoId')}});
    				
    			}
    		}};
	
		
	var createPlacedCargo=function(a){
		
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
			pUnitId:a.get('pUnitId'),
			pUnitName:a.get('pUnit'),
			wUnitName:a.get('wUnitName'),
			wUnitId:a.get('wUnitId'),
			vUnitName:a.get('vUnitName'),
			vUnitId:a.get('vUnitId'),
			mUnitName:a.get('mUnitName'),
			mUnitId:a.get('mUnitId'),
			palletNo:a.get('palletNo'),
			palletQuantity:1,
			verson:0,
		    rowAction:'N',
		    uuid:HTUtil.UUID(32)
		});
		
		pc.set('standardQuantity',HTUtil.round2(a.get('standardQuantity')));
		pc.set('standardGrossWeight',HTUtil.round2(a.get('standardGrossWeight')));
		pc.set('standardNetWeight',HTUtil.round2(a.get('standardNetWeight')));
		pc.set('standardVolume',HTUtil.round4(a.get('standardVolume')));
		pc.set('standardMeasure',HTUtil.round2(a.get('standardMeasure')));
		pc.set('receivedDate',a.get('receivedDate'));
		
		return pc;
	};
	
	//收货表新增，新增前先判断是不是已选中了入库单 货物表
	//将入库单 货物的明细，初始化给收货单表
	//
	var add=function(){
		
		var r=grdReceivedCargo.getSelectionModel().getSelected();
		if(r){
			var quantity=0;
			var packages=0;
			var grossWeight=0;
			var netWeight=0;
			var volume=0;
			var measure=0;		
			
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
			
			var placedVolume=HTUtil.round4(r.get('placedVolume'));
			var receivedVolume=HTUtil.round4(r.get('receivedVolume'));
			if(placedVolume<receivedVolume){				
				volume=receivedVolume-placedVolume;
			}
			
			var placedMeasure=HTUtil.round2(r.get('placedMeasure'));
			var receivedMeasure=HTUtil.round2(r.get('receivedMeasure'));
			if(placedMeasure<receivedMeasure){				
				measure=receivedMeasure-placedMeasure;
			}
				
			var pc=createPlacedCargo(r);
			pc.set('quantity',quantity);
			pc.set('packages',packages);
			pc.set('grossWeight',grossWeight);
			pc.set('netWeight',netWeight);
			pc.set('volume',volume);
			pc.set('measure',measure);
			
			pc.set('placedQuantity',pc.get('quantity'));
			pc.set('placedPackages',pc.get('packages'));
			pc.set('placedGrossWeight',pc.get('grossWeight'));
			pc.set('placedNetWeight',pc.get('netWeight'));
			pc.set('placedVolume',pc.get('volume'));
			pc.set('placedMeasure',pc.get('measure'));
			placedStore.add(pc);
				
		}
		else{
			XMG.alert(SYS,'请选择要收货的商品！');
		}
	};
	var getStdNum=function(unitName,r){
		var res=[];
		res[0]=1;
		res[1]=0;
		res[2]=0;
		res[3]=0;
		res[4]=-1;
		res[5]='';
		
		if(unitName!=null){
			if(unitName==r.get('pUnitName')){
				res[0]=HTUtil.round2(r.get('pQuantity'));
				res[1]=HTUtil.round2(r.get('grossWeight'));
				res[2]=HTUtil.round2(r.get('newWeight'));
				res[3]=HTUtil.round4(r.get('volume'));
				res[4]=r.get('pUnitId');
				res[5]=r.get('pUnitName');
			}
			else if(unitName==r.get('p1UnitName')){
				res[0]=HTUtil.round2(r.get('p1Quantity'));
				res[1]=HTUtil.round2(r.get('p1GW'));
				res[2]=HTUtil.round2(r.get('p1NW'));
				res[3]=HTUtil.round4(r.get('p1V'));
				res[4]=r.get('p1UnitId');
				res[5]=r.get('p1UnitName');
			}
			else if(unitName==r.get('p2UnitName')){
				res[0]=HTUtil.round2(r.get('p2Quantity'));
				res[1]=HTUtil.round2(r.get('p2GW'));
				res[2]=HTUtil.round2(r.get('p2NW'));
				res[3]=HTUtil.round4(r.get('p2V'));
				res[4]=r.get('p2UnitId');
				res[5]=r.get('p2UnitName');
			}
			else if(unitName==r.get('p3UnitName')){
				res[0]=HTUtil.round2(r.get('p3Quantity'));
				res[1]=HTUtil.round2(r.get('p3GW'));
				res[2]=HTUtil.round2(r.get('p3NW'));
				res[3]=HTUtil.round4(r.get('p3V'));
				res[4]=r.get('p3UnitId');
				res[5]=r.get('p3UnitName');
			}
			else if(unitName==r.get('p4UnitName')){
				res[0]=HTUtil.round2(r.get('p4Quantity'));
				res[1]=HTUtil.round2(r.get('p4GW'));
				res[2]=HTUtil.round2(r.get('p4NW'));
				res[3]=HTUtil.round4(r.get('p4V'));
				res[4]=r.get('p4UnitId');
				res[5]=r.get('p4UnitName');
			}			
		}
		
		return res;
	};
	
	//自动码盘
	var autoAdd=function(){
		var r=grdReceivedCargo.getSelectionModel().getSelected();
		if(r){
			
			if(cargoStore.getTotalCount()==0){
				XMG.alert(SYS,"请重新选择要码盘的收货记录！");
				return ;
			}
			
			var cargo=cargoStore.getAt(0);
			btnAutoAdd.disable();
			var stdNums=getStdNum('托',cargo);
			if(stdNums[5]!='托'){//再次验证返回是不是托为单位，如果不是，则退出
				XMG.alert(SYS,'该商品没有找到，为《托》的包装单位，系统无法码盘！请先在商品信息中，维护包装为托的信息！');
				return ;
			}
			
			var stdQ=HTUtil.round2(stdNums[0]);
			var stdGW=HTUtil.round2(stdNums[1]);
			var stdNW=HTUtil.round2(stdNums[2]);
			var stdV=HTUtil.round4(stdNums[3]);
			var stdM=0;
			
			var quantity=0;
			var packages=0;
			
			var placedQuantity=HTUtil.round2(r.get('placedQuantity'));
			var receivedQuantity=HTUtil.round2(r.get('receivedQuantity'));			
			if(placedQuantity<receivedQuantity){
				 quantity=receivedQuantity-placedQuantity;		
			}
			
			var size=0;
			//拆零数量
			var surplus=0;
			if(stdQ!=0){
				size=quantity/stdQ;
				size=Math.floor(size);//求最大整数
				surplus=quantity%stdQ;				
			}
			
			//下面开始循环赋值
			for(var i=0;i<size;i++){
				//将货物列表的备注，赋值给第一条收货纪录
				var remarks='';
				if(i==0){
					remarks=r.get('remarks');
				}
				
				var pc=createPlacedCargo(r);
				pc.set('quantity',stdQ);
				pc.set('packages',1);
				pc.set('grossWeight',stdGW);
				pc.set('netWeight',stdNW);
				pc.set('volume',stdV);
				pc.set('measure',stdM);
				pc.set('pUnitId',stdNums[4]);
				pc.set('pUnitName',stdNums[5]);
				
				pc.set('standardQuantity',HTUtil.round2(stdQ));
				pc.set('standardGrossWeight',HTUtil.round2(stdGW));
				pc.set('standardNetWeight',HTUtil.round2(stdNW));
				pc.set('standardVolume',HTUtil.round4(stdV));
				pc.set('standardMeasure',HTUtil.round2(stdM));
				
				
				pc.set('placedQuantity',pc.get('quantity'));
				pc.set('placedPackages',pc.get('packages'));
				pc.set('placedGrossWeight',pc.get('grossWeight'));
				pc.set('placedNetWeight',pc.get('netWeight'));
				pc.set('placedVolume',pc.get('volume'));
				pc.set('placedMeasure',pc.get('measure'));
				pc.set('remarks',remarks);
				placedStore.add(pc);
			};
			if(surplus!=0){		
				
				var pc=createPlacedCargo(r);
				pc.set('quantity',surplus);
				pc.set('packages',1);
				pc.set('grossWeight',stdGW*(surplus/stdQ));
				pc.set('netWeight',stdNW*(surplus/stdQ));
				pc.set('volume',stdV*(surplus/stdQ));
				pc.set('measure',stdM*(surplus/stdQ));
				pc.set('pUnitId',stdNums[4]);
				pc.set('pUnitName',stdNums[5]);
				
				pc.set('standardQuantity',HTUtil.round2(stdQ));
				pc.set('standardGrossWeight',HTUtil.round2(stdGW));
				pc.set('standardNetWeight',HTUtil.round2(stdNW));
				pc.set('standardVolume',HTUtil.round4(stdV));
				pc.set('standardMeasure',HTUtil.round2(stdM));
				
				
				pc.set('placedQuantity',pc.get('quantity'));
				pc.set('placedPackages',pc.get('packages'));
				pc.set('placedGrossWeight',pc.get('grossWeight'));
				pc.set('placedNetWeight',pc.get('netWeight'));
				pc.set('placedVolume',pc.get('volume'));
				pc.set('placedMeasure',pc.get('measure'));
				
				placedStore.add(pc);
			}
			btnAutoAdd.enable();
		}

	};
    
	var placedListExcel=function(){
		var r=storageGrid.getSelectionModel().getSelected();
		var url = REPORT_URL;
		url += '&__report=reports/wms_PlacedCargoList.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE")+'&id='+r.get('id');
		window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};
	
    var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re});
    var cm2=new Ext.grid.ColumnModel({columns:[sm2,
    {header:'状态',dataIndex:'status',renderer:WHTStore.getInWarehouseNoteStatus,width:80},
    {header:'品质',dataIndex:'quanlityType',width:80},
    {header:'商品代码',dataIndex:'skuNo',width:80},
	{header:'商品名称',dataIndex:'cargoName',width:200},
	/*{header:'生产编号',dataIndex:'productNo',width:80},*/
	
	
	{header:'EA',dataIndex:'receivedQuantity',renderer:HTUtil.round2,width:80},
	{header:'EA单位',dataIndex:'unitName',width:80},
	{header:'件数',dataIndex:'receivedPackages',renderer:HTUtil.round2,width:80},
	{header:'件数单位',dataIndex:'pUnit',width:80},
	{header:'毛重',dataIndex:'receivedGrossWeight',renderer:HTUtil.round2,width:80},
	{header:'净重',dataIndex:'receivedNetWeight',renderer:HTUtil.round2,width:80},
	{header:'体积',dataIndex:'receivedVolume',renderer:HTUtil.round4,width:80},
	{header:'面积',dataIndex:'receivedMeasure',renderer:HTUtil.round2,width:80},
	
	{header:'上架EA',dataIndex:'placedQuantity',renderer:HTUtil.round2,width:80},
	{header:'上架件数',dataIndex:'placedPackages',renderer:HTUtil.round2,width:80},
	{header:'上架GW',dataIndex:'placedGrossWeight',renderer:HTUtil.round2,width:80},
	{header:'上架NW',dataIndex:'placedNetWeight',renderer:HTUtil.round2,width:80},	
	{header:'上架体积',dataIndex:'placedVolume',renderer:HTUtil.round4,width:80},
	{header:'上架面积',dataIndex:'placedMeasure',renderer:HTUtil.round2,width:80},	
	
	{header:'重量单位',dataIndex:'wUnitName',width:80},
	{header:'体积单位',dataIndex:'vUnitName',width:80},
	{header:'面积单位',dataIndex:'mUnitName',width:80},
	
	{header:'批次号',dataIndex:'batchNo',width:80},
	{header:'商品规格',width:120,dataIndex:'specification',width:80},
	{header:'商品型号',width:120,dataIndex:'cargoType',width:80},
	{header:'商品颜色',width:120,dataIndex:'cargoColor',width:80},
	{header:'生产日期',dataIndex:'productDate',renderer:formatDate,width:80},
	{header:'单位数量',dataIndex:'standardQuantity',width:80},
	{header:'单位毛重',dataIndex:'standardGrossWeight',width:80},
	{header:'单位净重',dataIndex:'standardNetWeight',width:80},
	{header:'单位体积',dataIndex:'standardVolume',width:80},
	{header:'单位面积',dataIndex:'standardMeasure',width:80}
    ],defaults:{sortable:true,width:100}});    
    
    var grdReceivedCargo=new Ext.grid.GridPanel({
    	layout:'fit',height:200,region:'north',
    	closable:false,store:store,sm:sm2,cm:cm2,
    	columnLines:true,stripeRows: true
         
		
   	});
    
    
    
    
	
	//03_收货明细
	
	var ccboBlock=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',value:p.get('blockName'),tabIndex:11,
		store:WHTStore.getBlock(),enableKeyEvents:true,
		itemSelector:'div.list-item',tpl:blockTpl,listWidth:400,
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
				var re=grid.getSelectionModel().getSelected();
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
				}
			},
			keydown:{
				fn:function(f,e,t){
					var re=grid.getSelectionModel().getSelected();
					if(re){
						var r=re.get('areaId');
						var w=re.get('warehouseId');
						WBlockLC(f,e,BLOCK_ONLY,'',r,w);
					}
				},
				buffer:BF
			}
		}
	});
	
	var ccboArea=new Ext.form.ComboBox({listClass:'x-combo-list-small',
		store:WHTStore.getArea(),displayField:'areaName',valueField:'areaName',
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				ccboBlock.getStore().reload({params:{warehouseId:r.get('warehouseId'),areaId:r.get('id')}});
				var re=grid.getSelectionModel().getSelected();
				if(re){
					re.set('areaId',r.get('id'));
					re.set('areaCode',r.get('areaCode'));
				}
				
				ccboBlock.setAreaName(r.get('areaName'));
			},
			blur:function(f){
				
			}
				
		}});
	
	var ccboWarehouse=new Ext.form.ComboBox({listClass:'x-combo-list-small',
		store:WHTStore.getWarehouse(),displayField:'warehouseName',valueField:'warehouseName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				ccboArea.getStore().load({params:{warehouseId:r.get('id')}});
				var re=grid.getSelectionModel().getSelected();
				if(re){
					re.set('warehouseId',r.get('id'));
					re.set('warehouseCode',r.get('warehouseCode'));
				}
				ccboBlock.setWarehouseName(r.get('warehouseName'));
				
			},
			blur:function(f){
				
			}
				
		}});
	
	
	
	var ccboQualityType=new Ext.form.ComboBox({listClass:'x-combo-list-small',name:'quanlityType',
			store:WHTStore.QUALITY_CONTUOL,displayField:'NAME',valueField:'NAME',
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					
				},
				blur:function(f){
					
				}
					
			}});
	
	var cdftQaFlagType=new Ext.form.DateField();
	
	var cnumQuantity=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true
	});
	var cnumPackages=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true
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
	var cnumMeasure=new Ext.form.NumberField({
		allowNegative:false,selectOnFocus:true
	});
	
	var ccboPUnitName=new Ext.form.ComboBox({align:'center',	      
		  displayField:'unitName',valueField:'unitName',triggerAction:'all',
	      mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
	      store:HTStore.getUNIT_C(),anchor:'95%',
	      listeners:{scope:this,select:function(c,r,i){
	    	  sm.getSelected().set('pUnitId',r.get('id'));
			}}});
	
	var ctxtPalletNo=new Ext.form.TextField();
	var txtRemarks=new Ext.form.TextField();
	
	//保存按钮调用方法
	var save=function(){

			grdReceivedCargo.stopEditing();
			grid.stopEditing();
			
			var xml='';
			var rows=placedStore.getModifiedRecords();
			if(rows.length>0){
				for(var i=0;i<rows.length;i++){
					var r=rows[i];
					
					if(r.get('status')!=5&&r.get('rowAction')!='D'){
						
						xml+=HTUtil.RTX(r,'WPlacedCargo',WPlacedCargo);
					}
				}
			}
			
			if(xml!=''){
				Ext.getCmp('btnSave').setDisabled(true);
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WPLACED_CARGO_XS'},				
					success: function(res){
						var a=HTUtil.XTRA(res.responseXML,'WPlacedCargo',WPlacedCargo);
						HTUtil.RUA(placedStore,a,WPlacedCargo);
						
						var b=HTUtil.XTRA(res.responseXML,'WReceivedCargo',WReceivedCargo);
						HTUtil.RUA(store,b,WReceivedCargo);
						
						var c=HTUtil.XTRA(res.responseXML,'WStorageNote',WStorageNote);
						if(c.length>0){
							HTUtil.RUA(storageStore,c,WStorageNote);
						}
						else{
							alert('length<0');
						}

						Ext.Msg.alert(SYS,M_S);
						Ext.getCmp('btnSave').setDisabled(false);
						},
					failure: function(res){
							Ext.Msg.alert(SYS,M_F+res.responseText);
							Ext.getCmp('btnSave').setDisabled(false);
					},
					xmlData:HTUtil.HTX(xml)});
			}else{
				Ext.Msg.alert(SYS,"没有修改不用保存！");
			};
		
	};
	
	var remove=function(){
		var p=sm0.getSelected();
		if(p){
		if(p.get('status')!=5){
			var r = grid.getSelectionModel().getSelections();
			if(r){
				var cc=[];
				for(var i=0;i<r.length;i++){
					var c=r[i];
					if(c.get('status')!=5&&HTUtil.round2(c.get('pickedQuantity'))==0.00){
						if(c.get('rowAction')=='N'){
							c.set('rowAction','D');
							placedStore.remove(c);
						}
						else{
							c.set('rowAction','R');
							cc[cc.length]=c;
						}
					}					
					else{
						Ext.Msg.alert(SYS,"状态为上架完成或已经拣货，不能删除！");
						return;
					}
				}
				
				
				var xml='';
				if(cc.length>0){
					var x = HTUtil.ATX(cc,'WPlacedCargo',WPlacedCargo);
					xml=xml+x;
				}
				if(xml!=''){
					Ext.getCmp('btnSave').setDisabled(true);
					btnRemove.disable();
					Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WPLACED_CARGO_XS'},				
						success: function(res){
							placedStore.remove(cc);
							var a=HTUtil.XTRA(res.responseXML,'WPlacedCargo',WPlacedCargo);
							HTUtil.RUA(placedStore,a,WPlacedCargo);	
							
							var b=HTUtil.XTRA(res.responseXML,'WReceivedCargo',WReceivedCargo);
							HTUtil.RUA(store,b,WReceivedCargo);
							
							var c=HTUtil.XTRA(res.responseXML,'WStorageNote',WStorageNote);
							if(c.length>0){
								HTUtil.RUA(storageStore,c,WStorageNote);
							}
							else{
								alert('length<0');
							}

							Ext.Msg.alert(SYS,M_S);
							Ext.getCmp('btnSave').setDisabled(false);
							btnRemove.enable();
							},
						failure: function(res){
								Ext.Msg.alert(SYS,M_F+res.responseText);
								Ext.getCmp('btnSave').setDisabled(false);
								btnRemove.enable();
						},
						xmlData:HTUtil.HTX(xml)});
				}
			}
			else{
				Ext.Msg.alert(SYS,'没有选择要删除的行！');
				return ;
			}
		}
		else{
			Ext.Msg.alert(SYS,'该货物状态不是收货中，不能删除！');
		}
		}
	};
	
	var placedChecked=function(){
		var selRows=sm.getSelections();
		if(selRows.length>0){
			var xml='';
			for(var i=0;i<selRows.length;i++){
				var r=selRows[i];
				if(r.get('status')!=5&&r.get('blockId')!=null){
					
					if(r.get('rowAction')!='N'||r.get('rowAction')==null){
						r.set('status',5);
						xml+=HTUtil.RTX(r,'WPlacedCargo',WPlacedCargo);
					}
					
				}
			}
			if(xml){
				Ext.Msg.confirm(SYS,'上架确认以后则表示完成上架，将无法取消上架，是否确认上架完成？',function(btn){
					if(btn=='yes'){
						Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
							params:{_A:'WPLACED_RECEIVED_TO_PLACED'},
							success:function(res){
								var a=HTUtil.XTRA(res.responseXML,'WPlacedCargo',WPlacedCargo);
								HTUtil.RUA(placedStore,a,WPlacedCargo);
								
								var b=HTUtil.XTRA(res.responseXML,'WReceivedCargo',WReceivedCargo);
								HTUtil.RUA(store,b,WReceivedCargo);
								
								var a=HTUtil.XTRA(res.responseXML,'WStorageNote',WStorageNote);
								HTUtil.RUA(storageStore,a,WStorageNote);
								XMG.alert(SYS,"上架完成处理成功");
							},
							failure:function(r){
								XMG.alert(SYS,M_F+r.responseText);
							},
							xmlData:HTUtil.HTX(xml)
					});
					}
				});
			}
		}
	};
	
	var btnAdd=new Ext.Button({text:'新增上架',iconCls:'add',scope:this,handler:add});
	var btnAutoAdd=new Ext.Button({text:'码盘(托)',iconCls:'compile',scope:this,handler:autoAdd});
	//上架清单
    var btnPlacedListExcel=new Ext.Button({text:'输出上架清单',iconCls:'print',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT),scope:this,handler:placedListExcel});
  
	
	//保存按钮
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',
		id:'btnSave',ref:'../btnSave', 
		scope:this,handler:save}
	);
	
	var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',
		scope:this,handler:remove});

	var btnPlaced=new Ext.Button({text:'上架确认',iconCls:'ok',
		scope:this,handler:placedChecked}
		);
	
	var rs={
		scope:this,
		rowselect:function(sm,row,record){
			ccboBlock.setWarehouseName(record.get('warehouseName'));
			ccboBlock.setAreaName(record.get('areaName'));
		}
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this,listeners:rs});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	        new Ext.grid.RowNumberer(),
	        {header:'状态',dataIndex:'status',renderer:WHTStore.getInWarehouseNoteStatus,width:80}, 
            {header:'SKU',dataIndex:'skuNo',width:80},          	
          	{header:'生产<br/>编号',dataIndex:'productNo',width:60},
          	{header:'件数',dataIndex:'packages',editor:cnumPackages,renderer:HTUtil.round2,width:60},
          	{header:'件数<br/>单位',dataIndex:'pUnitId',width:40},	
          	{header:'件数<br/>单位',dataIndex:'pUnitName',editor:ccboPUnitName,width:40},	
          	{header:'数量',dataIndex:'quantity',editor:cnumQuantity,renderer:HTUtil.round2,width:60},
          	{header:'数量<br/>单位',dataIndex:'unitName',width:40},	 
          	{header:'库位',dataIndex:'blockName',css : 'background:#ffb3a7;',editor:ccboBlock,width:80},
          	{header:'库<br/>区',dataIndex:'areaName',editor:ccboArea,width:40},
          	{header:'仓库',dataIndex:'warehouseName',editor:ccboWarehouse,width:100},
          	{header:'商品<br/>名称',dataIndex:'cargoName',width:200},
          	{header:'生产<br/>日期',dataIndex:'productDate',renderer:formatDate,width:90},
          	{header:'重量<br/>单位',dataIndex:'wUnitName',width:40},	                                      	
          	{header:'毛重',dataIndex:'grossWeight',editor:cnumGrossWeight,renderer:HTUtil.round2,width:60},
          	{header:'净重',dataIndex:'netWeight',editor:cnumNetWeight,renderer:HTUtil.round2,width:60},
          	{header:'体积<br/>单位',dataIndex:'vUnitName',width:60},	                                      	
          	{header:'体积',dataIndex:'volume',editor:cnumVolume,renderer:HTUtil.round4,width:60},
          	{header:'面积<br/>单位',dataIndex:'mUnitName',width:60},	                                      	
          	{header:'面积',dataIndex:'measure',editor:cnumMeasure,renderer:HTUtil.round2,width:60},          
        	{header:'批次号',dataIndex:'batchNo',width:60},
          	{header:'检验<br/>状态',dataIndex:'qaFlagType',width:60},
          	{header:'品质',dataIndex:'qualityType',editor:ccboQualityType,width:60},
          	{header:'检验<br/>时间',dataIndex:'qaFlagDate',editor:cdftQaFlagType,width:60},
        	{header:'商品<br/>规格',width:120,dataIndex:'specification',width:60},
          	{header:'商品<br/>型号',width:120,dataIndex:'cargoType',width:60},
          	{header:'商品<br/>颜色',width:120,dataIndex:'cargoColor',width:60},
          	{header:'拆零<br/>数量',dataIndex:'openStockNum',renderer:HTUtil.round2,width:60},	   
          	{header:'有效<br/>期至',dataIndex:'effectiveDate',renderer:formatDate,width:60},
          	{header:'托盘号',dataIndex:'palletNo',editor:ctxtPalletNo,width:60},
          	{header:'上架<br/>时间',dataIndex:'placedDate',width:60},
          	{header:'备注',width:200,dataIndex:'remarks',editor:txtRemarks,width:60},
          	{header:'收货<br/>序号',dataIndex:'id',width:60},
            {header:'入库<br/>单号',dataIndex:'storageNoteNo',width:120},
            {header:'入库<br/>ID',dataIndex:'storageNoteId',width:60},
            {header:'货物明<br/>细ID',dataIndex:'storageNoteCargoId',width:60},
        	{header:'单位<br/>数量',dataIndex:'standardQuantity',renderer:HTUtil.round2,width:60},
        	{header:'单位<br/>毛重',dataIndex:'standardGrossWeight',renderer:HTUtil.round2,width:60},
        	{header:'单位<br/>净重',dataIndex:'standardNetWeight',renderer:HTUtil.round2,width:60},
        	{header:'单位<br/>体积',dataIndex:'standardVolume',renderer:HTUtil.round4,width:60},
        	{header:'单位<br/>面积',dataIndex:'standardMeasure',renderer:HTUtil.round2,width:60}
              ],defaults:{sortable:true,width:100}}); 
		
	var grid=new Ext.grid.EditorGridPanel({iconCls:'gen',title:'上架信息',
		layout:'fit',region:'center',clicksToEdit:1,
    	closable:true,columnLines:true,store:placedStore,sm:sm,cm:cm,
    	tbar:[btnAdd,btnAutoAdd,'-',btnSave,btnRemove,'-',btnPlaced,'->',btnPlacedListExcel],
    	listeners:{scope:this,			
			afterrender:function(){
				
			},
			beforeedit:function(e){
				if(e.record.get('status')>=5){
					return false;
				}
				else{
					if(cargoStore.getTotalCount()>0)
						return true;
					else 
						XMG.alert(SYS,'请在上面的表格，重新选择一次货物信息，再进行操作！');
						return false;
				}
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
					var quantity=r.get('quantity');
					var packages=r.get('packages');	
			    	if(f=='quantity'){			    							
			    		quantity=HTUtil.round2(e.value);						
						packages=HTUtil.round2(quantity/sq);
						
			    	}
			    	if(f=='packages'){
			    		packages=HTUtil.nulltoZero(e.value);			    		
			    		quantity=HTUtil.round2(packages*sq);
			    	}
			    	if(f=='pUnitName'){
			    		
			    		packages=HTUtil.round2(quantity/sq);
			    	}
			    	
			    	r.beginEdit();	
			    	
					r.set('quantity',quantity);
					r.set('packages',packages);
					r.set('grossWeight',HTUtil.round2(packages*sgw));
					r.set('netWeight',HTUtil.round2(packages*snw));
					r.set('volume',HTUtil.round4(packages*sv));
					r.set('measure',HTUtil.round2(packages*stm));
					
					r.get('placedPackages',packages);
					r.set('placedQuantity',quantity);
					r.set('placedGrossWeight',HTUtil.round2(packages*sgw));
					r.set('placedNetWeight',HTUtil.round2(packages*snw));
					r.set('placedVolume',HTUtil.round4(packages*sv));
					r.set('placedMeasure',HTUtil.round2(packages*stm));
					
					r.set('standardQuantity',sq);
					r.set('standardGrossWeight',sgw);
					r.set('standardNetWeight',snw);
					r.set('standardVolume',sv);
					
					
		    		r.endEdit();
				}
				
			
			}
		}

    	
	});
	

	
	var eastPanel=new Ext.Panel({
		layout:'fit',region:'center',layout:'border',
		items:[grdReceivedCargo,grid]
	});
	
	Fos.WPlacedCargoTab.superclass.constructor.call(this,{title:'上架',
	    id:'RECEIVED_CARGO_NOTE'+p.get('uuid'),width:1000,iconCls:'gen',
	    collapsible:false,split:true,
	    closable:true,layout:'border',
	    items:[storageGrid,eastPanel]
	    });
	
	
};
Ext.extend(Fos.WPlacedCargoTab,Ext.Panel);


