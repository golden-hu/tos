Fos.CheckNoteGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WCHECK_NOTE_Q'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCheckNote',idProperty:'id'},WCheckNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:C_PS20}});
     
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm=new Ext.grid.ColumnModel({columns:[sm,                                              
	{header:C_CHECK_NOTE_NO,dataIndex:'checkNoteNo',width:140,align:'center'},
	{header:C_STATUS,dataIndex:'status',width:50,renderer:HTStore.getCheckNoteStatus,align:'center'},
	{header:'仓库',dataIndex:'warehouseName',width:80,align:'center'},
	{header:'库区',dataIndex:'areaName',width:80,align:'center'},
	{header:'库位',dataIndex:'blockName',width:80,align:'center'},
	{header:"库位层数",dataIndex:'blockLayer',width:70,align:'center'},
	{header:C_START_TIME,dataIndex:'startTime',width:90,renderer:HTUtil.formatDate,align:'center'},
	{header:C_END_TIME,dataIndex:'endTime',width:90,renderer:HTUtil.formatDate,align:'center'},
	{header:C_CUSTOMER,dataIndex:'custName',width:120,align:'center'},
	{header:"货物名称",dataIndex:'cargoName',width:140,align:'center'},
	{header:C_ORDER_NO,dataIndex:'orderNo',width:90,align:'center'},
	/*{header:"生产批号",dataIndex:'productNo',width:90,align:'center'},	*/
	{header:C_PRODUCT_DATE,dataIndex:'productDate',width:90,renderer:HTUtil.formatDate,align:'center'},
	{header:C_CHECKER,dataIndex:'checkerName',width:120,align:'center'},
	{header:C_DOUBLE_CHECKER,dataIndex:'doubleCheckerName',width:120,align:'center'},
	{header:C_BATCH_NO,dataIndex:'batchNo',width:120,align:'center'}
    ],defaults:{sortable:true,width:60}});
    
    var addNote=function(){
    	var p = new WCheckNote({uuid:HTUtil.UUID(32),status:0,rowAction:'N'});
    	var tab = this.ownerCt;
    	tab.setActiveTab(tab.add(new Fos.CheckNotePanel(p)));
    };
    var deleteNote=function(){
    	var a = sm.getSelections();
    	if(a.length>0){
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.SMTX4R(sm,'WCheckNote');
	            	HTUtil.REQUEST('WCHECK_NOTE_S', xml,function(){store.remove(a);});
	        	}
			},this);
    	}
    	else Ext.MessageBox.alert(SYS,M_R_P);
    };
    this.editNote=function(){
    	var p = sm.getSelected();
    	if(p){
    		var tab = this.ownerCt;
    		var c = 'CHECK_NOTE_'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.CheckNotePanel(p)));
    	}
    };
    
    this.search=function(){
    };
    
    this.fastSearch=function(){
    	var checkNoteNo=kw.getValue();
		if(!checkNoteNo){
			XMG.alert(SYS_W,W_NO_CHECK_NOTE_NO,function(b){kw.focus();});
			return;
		};
		//alert('Exe fastSearch');
     	var a=[];
		a[a.length]=new QParam({key:'checkNoteNo',value:checkNoteNo,op:LI});
 		store.baseParams={_A:'WCHECK_NOTE_CS',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a)),typeKey:'1'};
 		store.reload({params:{start:0,limit:C_PS},callback:function(r){
 			if(r.length==0) XMG.alert(SYS_W,M_NOT_FOUND);}
 		});
    };
    
    var kw = new Ext.form.TextField({listeners:{scope:this,
		specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) 
				//this.search();
				this.fastSearch();
			}
		}
	});
    
	this.exp = function(){
		var p = sm.getSelected();
		if(p){
			var url = REPORT_URL+'&__report=reports/CheckNote.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE");
			if(p.get('id')){
				url+='&id='+p.get('id');
			}
			window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
		}
		else{
			alert("请先保存盘点单，再输出！");
		}
	};
    
	this.deamonExp = function(){
		var p = sm.getSelected();
		if(p){
			EXPC('CHECK_NOTE_EXP','&sort=id&dir=ASC&checkNoteId='+p.get('id'));
		}
		else{
			alert("请选择一条盘点记录，再输出！");
		}
	};
	
    Fos.CheckNoteGrid.superclass.constructor.call(this,{id:'CHECK_NOTE_LIST',
    	iconCls:'gen',title:C_CHECK_NOTE_LIST,
    	closable:true,store:store,sm:sm,cm:cm,loadMask: true,
    	bbar:PTB(store,C_PS20),
    	listeners:{scope:this,
    		rowdblclick: function(grid, rowIndex, event){
    			this.editNote();
    		}},
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../btnAdd',hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_ADD),scope:this,handler:addNote},'-',
    	        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_EDIT),scope:this,handler:this.editNote},'-',
    	        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_DEL),scope:this,handler:deleteNote},'-',
    	        kw,{text:C_FAST_SEARCH,iconCls:'search',hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_SEARCH),handler:this.fastSearch},'-',
    	        {text:C_SEARCH,iconCls:'search',hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_FILTER),handler:this.search},'-',
    	        /*{text:C_EXPORT,iconCls:'print',hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_EXPORT),scope:this
    	        menu: {items:[{text:'盘点单',menu:[{text:'Excel',scope:this,handler:this.exp}]},
    	                      {text:'盘点单轻量',menu:[{text:'Excel',scope:this,handler:this.deamonExp}]}]}},*/
    	        {text:C_EXPORT,iconCls:'print',scope:this,handler:this.deamonExp}]
    });
};
Ext.extend(Fos.CheckNoteGrid, Ext.grid.GridPanel);
//--------------------------------------------------------------

Fos.CheckNotePanel = function(p) {
	
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WWarehouse',idProperty:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	//库区数据
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WArea',idProperty:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库位数据
	var blockStore = new Ext.data.Store({url:SERVICE_URL+'?_A=BLOCK_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WBlock',idProperty:'id'},WBlock),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'WCHECK_LIST_Q',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCheckList',idProperty:'id'},WCheckList),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	//盘点商品信息
	var storeCargo = new Ext.data.Store({url:SERVICE_URL+'?_A=WCHECK_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCheckCargo',idProperty:'id'},WCheckCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	//库存数据
	var cargoStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WPLACED_CARGO_X'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPlacedCargo',idProperty:'id'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var placedCargoStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WPLACED_CARGO_Q'},pruneModifiedRecords:true,
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPlacedCargo',idProperty:'id'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});

	
    if(p.get('rowAction')!='N'){
    	store.load({params:{checkNoteId:p.get('id')}});
    	storeCargo.load({params:{checkId:p.get('id')}});
    }
    var numCheckQuantity=new Ext.form.NumberField({
    		listeners:{scope:this,
    			blur:function(f){
    				var r=sm.getSelected();
    				if(r){
	    				if(f.getRawValue()==''){
	    					f.clearValue();
	    				}
	    				else{
	    					r.set('lossQuantity',HTUtil.round2(f.getRawValue())-HTUtil.round2(r.get('accountQuantity')));
	    					r.set('adjustQuantity',HTUtil.round2(f.getRawValue())-HTUtil.round2(r.get('accountQuantity')));
	    				}
    				}
    				
    			}
    		}
    });
    var numAdjustQuantity=new Ext.form.NumberField();
    var txtAdjustReson=new Ext.form.TextField();
    
    var re={scope:this,
    		rowselect:function(sm,row,record){
    			
    			placedCargoStore.load({params:{id:record.get('placedCargoId')}});
    		}
    		
	};
    
    var smm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this});
    var cmm=new Ext.grid.ColumnModel({columns:[smm,
     {header:'商品代码',dataIndex:'skuNo',width:80},
     {header:'商品名称',dataIndex:'cargoName',width:150},
     {header:'英文名称',dataIndex:'cargoNameEn',width: 80},
     {header:'规格',dataIndex:'specification',width: 80},
     {header:'型号',dataIndex:'cargoType',width: 80},
     {header:'颜色',dataIndex:'cargoColor',width: 80},
     {header:'类别',dataIndex:'categoryName',width: 80},
     {header:'品牌',dataIndex:'cargoBrand',width: 80}
     ],defaults:{sortable:false,width:100}});
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false,scope:this,listeners:re});
    var cm=new Ext.grid.ColumnModel({columns:[sm,   
    {header:'仓单号',dataIndex:'storageNoteNo',width:150},                                 
    {header:'SkuNo',dataIndex:'skuNo',width:80},
	{header:'商品名称',dataIndex:'cargoName',width:150},	
	{header:'库位',dataIndex:'blockName',width:60},
	{header:'帐面<br>数量',dataIndex:'accountQuantity',width:60,renderer:HTUtil.round2},
	/*{header:'盘点数量',dataIndex:'checkQuantity',editor:numCheckQuantity,width:70},
	{header:'损益数量',dataIndex:'lossQuantity',width:70},
	{header:'调整数量',dataIndex:'adjustQuantity',editor:numAdjustQuantity,width:70},*/
	{header:'单位<br>名称',dataIndex:'unitName',width:60},
	/*{header:'调整原因',dataIndex:'adjustReson',editor:txtAdjustReson,width:120},*/
	{header:'客户<br>名称',dataIndex:'custName',width:200},
	{header:'仓库',dataIndex:'warehouseName',width:100},
	{header:'库区',dataIndex:'areaName',width:60}
    ],defaults:{sortable:false,width:100}});
    
    
    var adjust2InStorage=function(r){
    	
		var adjustQuantity=HTUtil.round2(r.get('adjustQuantity'));
		if(adjustQuantity<0){
			adjustQuantity=adjustQuantity*-1;
		}
		var re=placedCargoStore.getRange();
		
		if(re.length==0){
			XMG.alert(SYS_W,M_NOT_FOUND);
			return "";
		}
		else if(re.length>1){
			XMG.alert(SYS_W,"请确认只选中了一行！");
			return " ";
		}
		else{
 			var a=re[0];
	    	var pc=new WPlacedCargo({uuid:HTUtil.UUID(32),
    				rowAction:'N',
    				storageNoteId:a.get('storageNoteId'),
    				storageNoteNo:a.get('storageNoteNo'),
    				storageNoteCargoId:a.get('storageNoteCargoId'),    				
    				receivedCargoId:a.get('receivedCargoId'),
    				cargoId:a.get('cargoId'),
    				skuNo:a.get('skuNo'),
    				cargoName:a.get('cargoName'),
    				specification:a.get('specification'),
    				cargoType:a.get('cargoType'),
    				cargoColor:a.get('cargoColor'),
    				custId:a.get('custId'),
    				custName:a.get('custName'),
    				orderNo:a.get('orderNo'),
    				blockId:a.get('blockId'),
    				blockName:a.get('blockName'),
    				blockCode:a.get('blockCode'),
    				warehouseId:a.get('warehouseId'),
    				warehouseCode:a.get('warehouseCode'),
    				warehouseName:a.get('warehouseName'),
    				areaId:a.get('areaId'),
    				areaCode:a.get('areaCode'),
    				areaName:a.get('areaName'),
    				unitId:a.get('unitId'),
    				unitName:a.get('unitName'),
    				
    				pUnitName:a.get('pUnitName'),
    				pUnitId:a.get('pUnitId'),
    				wUnitName:a.get('wUnitName'),
    				wUnitId:a.get('wUnitId'),
    				vUnitId:a.get('vUnitId'),
    				vUnitName:a.get('vUnitName'),
    				mUnitName:a.get('mUnitName'),
    				mUnitId:a.get('mUnitId'),
    				packUnitName:a.get('packUnitName'),
    				packUnitId:a.get('packUnitId'),
    				
    				standardQuantity:a.get('standardQuantity'),
    				standardGrossWeight:a.get('standardGrossWeight'),
    				standardNetWeight:a.get('standardNetWeight'),
    				standardVolume:a.get('standardVolume'),
    				standardMeasure:a.get('standardMeasure'),
    				barCode:a.get('barCode'),
    				cargoNo:a.get('cargoNo'),
    				containerNo:a.get('containerNo'),
    				status:a.get('status'),
    				placedType:1,//盘点入库
    				batchNo:a.get('batchNo'),
					palletNo:a.get('palletNo'),
				    palletQuantity:a.get('palletQuantity'),
				    placedDate:new Date(),
				    productNo:a.get('productNo'),
				    productDate:a.get('productDate'),
				    receivedDate:a.get('receivedDate'),
				    fromPlacedCargoId:a.get('id'),
				    quantity:adjustQuantity,
				    
				    remarks:'盘亏入库'
    		 });
	    	
	    	//var adjustQuantity=HTUtil.round2(r.get('adjunstQuantity'));
	    	//计算重量，件数，体积，面积
	    	pc.set('packages',HTUtil.round2(a.get('standardQuantity'))==0?0:adjustQuantity/HTUtil.round2(a.get('standardQuantity')));
	    	pc.set('grossWeight',adjustQuantity*HTUtil.round2(a.get('standardGrossWeight')));
	    	pc.set('netWeight',adjustQuantity*HTUtil.round2(a.get('standardNetWeight')));
	    	pc.set('volume',adjustQuantity*HTUtil.round2(a.get('standardVolume')));
	    	pc.set('measure',adjustQuantity*HTUtil.round2(a.get('standardMeasure')));
	    	
	    	//placedCargoStore.add(pc)
	    	return pc;
	    	
		}
    };
    
    var createOutStorageNote=function(r){
    	var p = new WStorageNote({uuid:r.get('uuid'),
    		status:5,
    		storageDate:new Date(),
    		planedTime:new Date(),
    		storageType:1,
    		cargoOwnerId:r.get('custId'),
    		cargoOwnerName:r.get('custName'),
    		planedTime:new Date(),
    		rowAction:'N'});
    	
    	return p;
    };
    
    var createOutStorageNoteCargo=function(r){
    	var adjustQuantity=HTUtil.round2(r.get("adjustQuantity"));
    	if(adjustQuantity<0){
    		adjustQuantity=adjustQuantity*-1;
    	}
    	var c = new WStorageNoteCargo({
    		uuid:r.get('uuid'),
    		planedQuantity:adjustQuantity,
			storageType:1,
			skuNo:r.get('skuNo'),
			cargoId:r.get('cargoId'),
			cargoName:r.get('cargoName'),
			storageNoteId:0,
    		storageNoteNo:'0',
    		standardQuantity:r.get('standardQuantity'),
			standardGrossWeight:r.get('standardGrossWeight'),
			standardNetWeight:r.get('standardNetWeight'),
			standardVolume:r.get('standardVolume'),
			standardMeasure:r.get('standardMeasure'),
			rowAction:'N'});
    	
    	c.set('quantity',adjustQuantity);
		c.set('packages',HTUtil.round2(r.get('standardQuantity'))==0?0:adjustQuantity/HTUtil.round2(r.get('standardQuantity')));
    	c.set('grossWeight',adjustQuantity*HTUtil.round2(r.get('standardGrossWeight')));
    	c.set('netWeight',adjustQuantity*HTUtil.round2(r.get('standardNetWeight')));
    	c.set('volume',adjustQuantity*HTUtil.round2(r.get('standardVolume')));
    	c.set('measure',adjustQuantity*HTUtil.round2(r.get('standardMeasure')));
    	
    	c.set('pickedQuantity',adjustQuantity);
    	c.set('pickedPackages',HTUtil.round2(r.get('standardQuantity'))==0?0:adjustQuantity/HTUtil.round2(r.get('standardQuantity')));
    	c.set('pickedGrossWeight',adjustQuantity*HTUtil.round2(r.get('standardGrossWeight')));
    	c.set('pickedNetWeight',adjustQuantity*HTUtil.round2(r.get('standardNetWeight')));
    	c.set('pickedVolume',adjustQuantity*HTUtil.round2(r.get('standardVolume')));
    	c.set('pickedMeasure',adjustQuantity*HTUtil.round2(r.get('standardMeasure')));
    	
    	return c;
    };
    
    
    var createPickedCargo=function(c){
    	
    	var adjustQuantity=HTUtil.round2(c.get("adjustQuantity"));
    	if(adjustQuantity<0){
    		adjustQuantity=adjustQuantity*-1;
    	}
		var pc = new WPickedCargo({uuid:c.get('uuid'),rowAction:'N'});
		
			pc.set('inStorageNoteId',c.get('storageNoteId'));
			pc.set('inStorageNoteNo',c.get('storageNoteNo'));
			pc.set('inStorageNoteCargoId',c.get('storageNoteCargoId'));
			pc.set('placedCargoId',c.get('placedCargoId'));
			
			pc.set('pickedDate',new Date());
			pc.set('custId',c.get('custId'));
			pc.set('custName',c.get('custName'));
			//pc.set('orderNo',c.get('orderNo'));
			pc.set('warehouseId',c.get('warehouseId'));
			pc.set('warehouseCode',c.get('warehouseCode'));
			pc.set('warehouseName',c.get('warehouseName'));
			pc.set('areaId',c.get('areaId'));
			pc.set('areaCode',c.get('areaCode'));
			pc.set('areaName',c.get('areaName'));
			pc.set('blockId',c.get('blockId'));
			pc.set('blockCode',c.get('blockCode'));
			pc.set('blockName',c.get('blockName'));
			pc.set('skuNo',c.get('skuNo'));
			pc.set('cargoId',c.get('cargoId'));
			pc.set('cargoName',c.get('cargoName'));
			//pc.set('specification',c.get('specification'));
			pc.set('batchNo',c.get('batchNo'));					
			//pc.set('productDate',c.get('productDate'));
			pc.set('productNo',c.get('productNo'));
			pc.set('unitId',c.get('unitId'));
			pc.set('unitName',c.get('unitName'));
			pc.set('wUnitId',c.get('wUnitId'));
			pc.set('wUnitName',c.get('wUnitName'));
			pc.set('vUnitId',c.get('vUnitId'));
			pc.set('vUnitName',c.get('vUnitName'));
			//pc.set('mUnitId',c.get('mUnitId'));
			//pc.set('mUnitName',c.get('mUnitName'));
			//pc.set('pUnitName',c.get('pUnitName'));
			//pc.set('pUnitId',c.get('pUnitId'));
			//pc.set('packUnitName',c.get('packUnitName'));
			///pc.set('packUnitId',c.get('packUnitId'));
			//pc.set('remarks',c.get('remarks'));
			pc.set('standardQuantity',c.get('standardQuantity'));
			pc.set('standardGrossWeight',c.get('standardGrossWeight'));
			pc.set('standardNetWeight',c.get('standardNetWeight'));
			pc.set('standardVolume',c.get('standardVolume'));
			pc.set('standardMeasure',c.get('standardMeasure'));
			
		
			pc.set('quantity',adjustQuantity);
			pc.set('packages',HTUtil.round2(c.get('standardQuantity'))==0?0:adjustQuantity/HTUtil.round2(c.get('standardQuantity')));
	    	pc.set('grossWeight',adjustQuantity*HTUtil.round2(c.get('standardGrossWeight')));
	    	pc.set('netWeight',adjustQuantity*HTUtil.round2(c.get('standardNetWeight')));
	    	pc.set('volume',adjustQuantity*HTUtil.round2(c.get('standardVolume')));
	    	pc.set('measure',adjustQuantity*HTUtil.round2(c.get('standardMeasure')));
			
			pc.set('pickedQuantity',adjustQuantity);
			
			pc.set('pickedPackages',HTUtil.round2(c.get('standardQuantity'))==0?0:adjustQuantity/HTUtil.round2(c.get('standardQuantity')));
	    	pc.set('pickedGrossWeight',adjustQuantity*HTUtil.round2(c.get('standardGrossWeight')));
	    	pc.set('pickedNetWeight',adjustQuantity*HTUtil.round2(c.get('standardNetWeight')));
	    	pc.set('pickedVolume',adjustQuantity*HTUtil.round2(c.get('standardVolume')));
	    	pc.set('pickedMeasurement',adjustQuantity*HTUtil.round2(c.get('standardMeasure')));
			
			return pc;
				
    };
    
   var decPlacedCargo=function(pc,c){
	   var adjustQuantity=HTUtil.round2(c.get("adjustQuantity"));
	   	if(adjustQuantity<0){
	   		adjustQuantity=adjustQuantity*-1;
	   	}
	   //var pickedQuantity=adjustQuantity;
	   var pickedPackages=HTUtil.round2(c.get('standardQuantity'))==0?0:adjustQuantity/HTUtil.round2(c.get('standardQuantity'));
	   var pickedGrossWeight=adjustQuantity*HTUtil.round2(c.get('standardGrossWeight'));
	   var pickedNetWeight=adjustQuantity*HTUtil.round2(c.get('standardNetWeight'));
	   var pickedVolume=adjustQuantity*HTUtil.round2(c.get('standardVolume'));
	   var pickedMeasurement=adjustQuantity*HTUtil.round2(c.get('standardMeasure'));
	   
	   pc.set('pickedQuantity',HTUtil.round2(pc.get('pickedQuantity'))+adjustQuantity);
		
		pc.set('pickedPackages',HTUtil.round2(pc.get('pickedPackages'))+pickedPackages);
   	pc.set('pickedGrossWeight',HTUtil.round2(pc.get('pickedGrossWeight'))+pickedGrossWeight);
   	pc.set('pickedNetWeight',HTUtil.round2(pc.get('pickedNetWeight'))+pickedNetWeight);
   	pc.set('pickedVolume',HTUtil.round2(pc.get('pickedVolume'))+pickedVolume);
   	pc.set('pickedMeasurement',HTUtil.round2(pc.get('pickedMeasurement'))+pickedMeasurement);
   	pc.set('rowAction','M');
   };
        
    var dealCargo = function(){   	
    	var r=sm.getSelected();
    	if(r){
    		
    		//如果没有处理完，则处理，如果处理完了，就不再处理
    		if(r.get('adjustOver')!=1){
    		
    			var lossQuantity=HTUtil.round2(r.get('lossQuantity'));
    			if(lossQuantity<0){//盘亏 损益数量<0 作出库
    				//生成新的出库单
    				//生成新的出库货物
    				//生成拣货单
    				
    				var pcList=placedCargoStore.getRange();
    				if(pcList.length>0){
    					var pc=pcList[0];
    					decPlacedCargo(pc,r);
	    				var sn=createOutStorageNote(r);
	    				var snc=createOutStorageNoteCargo(r);
	    				var pk=createPickedCargo(r);
	    				r.set('adjustOver',1);
	    				r.set('rowAction','M');
	    				
	    				var xml='';
	    				xml=xml+HTUtil.RTX(r,'WCheckList',WCheckList);
	    				xml=xml+HTUtil.RTX(sn,'WStorageNote',WStorageNote);
	    				xml+=HTUtil.RTX(snc,'WStorageNoteCargo',WStorageNoteCargo);
	    				xml+=HTUtil.RTX(pk,'WPickedCargo',WPickedCargo);
	    				
	    				var a=placedCargoStore.getModifiedRecords();
	    				if(a.length>0){
	    					xml+=HTUtil.ATX(a,'WPlacedCargo',WPlacedCargo);
	    				}
	    				
	    				if(xml){
	    					Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
	    				 		params:{_A:'WCHCEK_LIST_ATPK'},
	    						success: function(res){
	    							var c = HTUtil.XTRA(res.responseXML,'WCheckList',WCheckList);
	    							HTUtil.RUA(store,c,WCheckList);
	    							XMG.alert(SYS,M_S);
	    					},
	    					failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
	    					xmlData:HTUtil.HTX(xml)
	    					});
	    				}
    				}
    				
    			}
    			if(lossQuantity>0){//盘盈 损益数量>0 作入库
    				
    				var p=adjust2InStorage(r);
    				r.set('adjustOver',1);
    				r.set('rowAction','M');
    				var xml='';
    				//var a=placedCargoStore.getModifiedRecords();
    				/*if(a.length>0){
    					xml=xml+HTUtil.ATX(a,'WPlacedCargo',WPlacedCargo);
    					xml=xml+HTUtil.RTX(r,'WCheckList',WCheckList);
    				}*/
    				if(p){
    					xml=xml+HTUtil.RTX(p,'WPlacedCargo',WPlacedCargo);
    					xml=xml+HTUtil.RTX(r,'WCheckList',WCheckList);
    				}
    				
    				if(xml){
    					//传入页面上的输入数量，实际上为了去处理货物明细表中数量的变化，保证货物明细表中的数量是以请求时的数量单位
    				 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
    				 		params:{_A:'WCHCEK_LIST_ATPC'},
    						success: function(res){
    							var c = HTUtil.XTRA(res.responseXML,'WCheckList',WCheckList);
    							HTUtil.RUA(store,c,WCheckList);
    							XMG.alert(SYS,M_S);
    					},
    					failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
    					xmlData:HTUtil.HTX(xml)
    					});
    				}
    				else{
    					
    				}
    				
    			}
    		}
    		else{
    			Ext.Msg.alert(SYS,'该数据已经处理！');
    		}
    	}
    };
    
    
    var deleteCargo = function(){
    	var b =sm.getSelections();
		if(b.length>0){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(b,'WCheckList');
	        		HTUtil.REQUEST('WCHECK_LIST_S', xml, function(){store.remove(b);});
	        	}
			},this);
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
    };
    
    var changePO=function(){
    	var r=sm.getSelected();
    	if(r){
    		if(r.get('adjustOver')!=1){
	    		var win=new Fos.ChangeProductNoWin(r);
	    		win.show();
    		}
    		else{
    			Ext.Msg.alert(SYS,'已经处理，不能重复处置！');
    		}
    	}
    };
    
    var addCargoGrid =function(){
    	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
    	else{
    		var c = new WCheckCargo({uuid:HTUtil.UUID(32),checkId:p.get('id'),rowAction:'N'});
    		var window=new Fos.CheckCargoGrid(storeCargo,c);
    		window.show();
    	}
    	
    };
    
    var removedCargoGrid=function(){
    	var a = smm.getSelections();
    	if(a.length>0){
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.SMTX4R(smm,'WCheckCargo');
	            	HTUtil.REQUEST('WCHECK_CARGO_S', xml,function(){storeCargo.remove(a);});
	        	}
			},this);
    	}
    	else Ext.MessageBox.alert(SYS,M_R_P);
    };
    var btnChangeProuductNo=new Ext.Button({text:'改生产编号',iconCls:'edit',scope:this,handler:changePO});
    
	var grid=new Ext.grid.EditorGridPanel({
    	iconCls:'gen',title:C_CHECK_DETAIL,layout:'fit',region:'center',
    	closable:true,store:store,sm:sm,cm:cm/*,
    	tbar:[btnChangeProuductNo]*/
	});
	
	var cargoGrid=new Ext.grid.EditorGridPanel({
    	iconCls:'gen',title:'商品信息',layout:'fit',region:'south',height:300,
    	closable:true,store:storeCargo,sm:smm,cm:cmm,
    	tbar:[{text:'新增',iconCls:'add',scope:this,handler:addCargoGrid},'-',
    	      {text:'删除',iconCls:'remove',scope:this,handler:removedCargoGrid}]
	});
	//盘点实际执行函数
	var CheckNote=function(){
    	var a=[];
    	var op=1;
     	//客户
     	var custName = frm.find('name','custName')[0].getValue();
     	if(custName) a[a.length] = new QParam({key:'custName',value:custName,op:op});
     	//仓库
     	var warehouseName = frm.find('name','warehouseName')[0].getValue();
     	if(warehouseName) a[a.length] = new QParam({key:'warehouseName',value:warehouseName,op:op});
     
     	//订单号
     	var orderNo = frm.find('name','orderNo')[0].getValue();
     	if(orderNo) a[a.length] = new QParam({key:'orderNo',value:orderNo,op:op});
     	
     	//库区
     	var areaName = frm.find('name','areaName')[0].getValue();
     	if(areaName) a[a.length] = new QParam({key:'areaName',value:areaName,op:op});
     	
     	//库位
     	var blockName = frm.find('name','blockName')[0].getValue();
     	if(blockName) a[a.length] = new QParam({key:'blockName',value:blockName,op:op});
     	
     
     	
     	/*//批次名称  
     	var productNo = frm.find('name','productNo')[0].getValue();
     	if(productNo) a[a.length] = new QParam({key:'productNo',value:productNo,op:op});
     	*/
     	//批次名称  
     	var productDate = frm.find('name','productDate')[0].getValue();
     	if(productDate) a[a.length] = new QParam({key:'productDate',value:productDate,op:op});
     	
     	//起始时间
     	var startTime = dtaStartTime.value;
     	if(startTime) a[a.length] = new QParam({key:'startTime',value:startTime,op:op});
     	
     	//截止时间
     	var endTime = dteEndTime.value;
     	if(endTime) a[a.length] = new QParam({key:'endTime',value:endTime,op:op});
     	
     	var  blockLayer= txtBlockLayer.getValue();
     	if(blockLayer) a[a.length] = new QParam({key:'blockLayer',value:blockLayer,op:EQ});
     	
     	if(storeCargo.getTotalCount()>0 || storeCargo.getCount()>0){
     			if(a.length>0){
     				store.baseParams={_mt:'xml',_A:'WCHECK_NOTE_I',checkId:p.get('id'),
     						id:p.get('id'),
     						xml:HTUtil.HTX(HTUtil.QTX(a))};	
     			}
     			else{
     				store.baseParams={_mt:'xml',_A:'WCHECK_NOTE_I',checkId:p.get('id'),id:p.get('id')};
     			}
     		} else{
     			if(a.length>0){
     				store.baseParams={_mt:'xml',_A:'WCHECK_NOTE_I',
     						id:p.get('id'),xml:HTUtil.HTX(HTUtil.QTX(a))};
     			}else{
     				store.baseParams={_mt:'xml',_A:'WCHECK_NOTE_I',
     						id:p.get('id')};
     			}
     		}
     	store.load({params:{id:p.get('id')},
     			callback:function(r,p,success){
		     		if(r.length==0)
		     			XMG.alert(SYS_W,M_NOT_FOUND);
		     		//else cargo2NoteList(r);
     	}});
     	
     	
    };
	
    
	this.stock=function(){
		gridTab.setActiveTab(grid);
		var storeNum=store.getCount();
    	if(storeNum<=0)
    		//根据盘点的要求获得库存表
    		CheckNote();
    	else
    		Ext.Msg.alert(SYS_W,'已经生成了盘点单，不能重复生成！');
	};
	
	this.save=function(){		
		p.beginEdit();
		
		//frm.getForm().updateRecord(p);
		var f = WCheckNote.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
		
		var status=p.get('status');
		switch(status){
			case '新增':
				p.set('status','0');
				break;
			case '已提交':
				p.set('status','1');
				break;
			case '收货中':
				p.set('status','2');
				break;
			case '收货完成':
				p.set('status','3');
				break;
			case '上架中':
				p.set('status','4');
				break;
			case '上架完成':
				p.set('status','5');
				break;
			case '已作废':
				p.set('status','6');
				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
				break;
			default:				
				break;
		}
		
		
		if(Ext.isEmpty(p.get('checkType'))){
			Ext.Msg.alert(SYS,W_STOCK_CHECK_TYPE,function(){this.find('name','checkType')[0].focus();},this);return;};
		p.endEdit();
		
   	 	var xml = HTUtil.RTX(p,'WCheckNote',WCheckNote);
   	 	var a = grid.getStore().getModifiedRecords();
	   	if(a.length>0){
				var x = HTUtil.ATX(a,'WCheckList',WCheckList);
				xml=xml+x;
			};
		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WCHECK_NOTE_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'WCheckNote',WCheckNote);
				var ra=p.get('rowAction');
				var f = WCheckNote.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};
				if(ra=='N'){
					this.find('name','checkNoteNo')[0].setValue(p.get('checkNoteNo'));
					p.set('rowAction','M');
				}
				p.endEdit();	
				
				var b = HTUtil.XTRA(res.responseXML,'WCheckList',WCheckList);
				HTUtil.RUA(grid.getStore(),b,WCheckList);
				XMG.alert(SYS,M_S);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
	};
	
	this.removeTab=function(r,s){
		var tab = s.ownerCt;
		tab.remove(s);
	};
	
	this.removeNote=function(){
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
        	if(btn == 'yes') {
        		var xml = HTUtil.RTX4R(p,'WCheckNote');
            	HTUtil.REQUEST('WCHECK_NOTE_S', xml,this.removeTab,this);
        	}
		},this);
	};
	this.submit=function(){this.updateStatus(1);};
	this.unSubmit=function(){this.updateStatus(0);};
	this.audit=function(){this.updateStatus(2);};
	this.unAudit=function(){this.updateStatus(1);};
	this.complete=function(){this.updateStatus(3);};
	
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'WCHECK_NOTE_U',id:p.get('id'),status:s},
			success: function(r){
				p.beginEdit();
				p.set('status',s);
				p.set('version',p.get('version')+1);
				p.endEdit();
				this.updateToolBar();
				XMG.alert(SYS,M_S);
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
	};
	this.exp = function(){
		if(p){
			var url = REPORT_URL+'&__report=reports/CheckNote.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE");
			if(p.get('id')){
				url+='&id='+p.get('id');
			}
			window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
		}
		else{
			alert("请先保存盘点单，再输出！");
		}
		
	};
	
	this.damemonExp = function(){
		if(p.get('id')){
			EXPC('CHECK_NOTE_EXP','&sort=id&dir=ASC&checkNoteId='+p.get('id'));
		}
		else{
			alert("请先保存盘点单，再输出！");
		}
	};
	
	var cargoName=new Fos.CargoLookUp({fieldLabel:'商品名称',tabIndex:1,
	    name:'cargoName',value:p.get('cargoName'),
		store:WHTStore.getWCargo(),enableKeyEvents:true,
		displayField:'cargoName',valueField:'cargoName',
		tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();
			}},
		select:function(c,r,i){
		},
		keydown:{
			fn:function(f,e){
				WCargoLC(f,e);
				},
			buffer:BF
		}
	}});
	
	var clkpBlock=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',value:p.get('blockName'),tabIndex:11,
					store:blockStore,enableKeyEvents:true,itemSelector:'div.list-item',tpl:blockTpl,
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
								WBlockLC(f,e);
							},
							buffer:BF
						}
					}
				});
	
	var ccboWarehouseName=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',value:p.get('warehouseName'),tabIndex:9,
		ref:'../warehouseName',store:warehouseStore,xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('warehouseId',r.get('id'));
				p.set('warehouseCode',r.get('warehouseCode'));
				
				/*frm.blockName.setValue('');
				frm.blockName.store.removeAll();
				frm.areaName.setValue('');
				frm.areaName.store.removeAll();
				frm.areaName.store.baseParams={_mt:'json',warehouseId:r.get('id')};
				frm.areaName.store.reload();*/
			},
			afterrender:function(t){
				var warehouseId=p.get('warehouseId');
				if(warehouseId==null||warehouseId=='')
					warehouseId='0';
				/*frm.areaName.store.baseParams={_mt:'json',warehouseId:warehouseId};
				frm.areaName.store.reload();*/

				
			}
		}
	});
	
	var ccboAreaName=new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',value:p.get('areaName'),tabIndex:10,
		ref:'../areaName',store:areaStore,xtype:'combo',
		displayField:'areaName',valueField:'areaName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				p.set('areaId',r.get('id'));
				p.set('areaCode',r.get('areaCode'));
				
				/*frm.blockName.setValue('');
				frm.blockName.store.removeAll();
				frm.blockName.store.baseParams={_mt:'json',warehouseId:p.get('warehouseId'),areaId:r.get('id')};
				frm.blockName.store.reload();*/
			},
			afterrender:function(t){
				var warehouseId=p.get('warehouseId');
				if(warehouseId==null||warehouseId=='')
					warehouseId='0';
				var areaId=p.get('areaId');
				if(areaId==null||areaId=='')
					areaId='0';
				
				/*frm.blockName.store.baseParams={_mt:'json',warehouseId:warehouseId,areaId:areaId};
				frm.blockName.store.reload();*/
			}
		}
	});
	
	var txtCargoName=new Ext.form.TextField({fieldLabel:'货物名称',name:'cargoName',anchor:'95%'});
	var txtProductNo=new Ext.form.TextField({fieldLabel:C_PRODUCTION_NO,name:'productNo',value:p.get('productNo'),
    	xtype:'textfield',anchor:'95%'});
	var txtBlockLayer=new Ext.form.TextField({fieldLabel:'层',name:'blockLayer',anchor:'95%'});
	var txtCheckNoteNo=new Ext.form.TextField({fieldLabel:C_CHECK_NOTE_NO,
						name:'checkNoteNo',value:p.get('checkNoteNo'),tabIndex:1,
					ref:'../checkNoteNo',xtype:'textfield',disabled:true,anchor:'95%'});
	var lkpCargoOwner=new Fos.CustomerLookup({fieldLabel:C_CARGO_OWNER,tabIndex:5,name:'custName',value:p.get('custName'),
		store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwner',
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custBookerFlag',
		displayField:'custCode',valueField:'custNameCn',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();
				p.set('custId','');
			}},
		select:function(c,r,i){
			p.set('custId',r.get('id'));
		},
		keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
	});
	
	var dtaStartTime=new Ext.form.DateField({fieldLabel:C_START_TIME,tabIndex:13,name:'startTime',value:p.get('startTime'),
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
		ref:'../startTime',xtype:'datefield',format:DATEF,anchor:'95%'});
	var cboCheckType=new Ext.form.ComboBox({fieldLabel:C_CHECK_TYPE,tabIndex:2,name:'checkType',value:p.get('checkType'),
		ref:'../checkType',itemCls:'required',xtype:'combo',store:HTStore.CHECK_TYPE_S,
		displayField:'NAME',valueField:'CODE',
		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	
	var txtOrderNo=new Ext.form.TextField({fieldLabel:'客户订单号',name:'orderNo',value:p.get('orderNo'),tabIndex:6,
		ref:'../orderNo',xtype:'textfield',anchor:'95%'});
	
	var dteEndTime=new Ext.form.DateField({fieldLabel:C_END_TIME,tabIndex:14,name:'endTime',value:p.get('endTime'),
		altFormats:'Ymd|Y-m-d|Y/m/d|y.m.d',
		ref:'../endTime',xtype:'datefield',format:DATEF,anchor:'95%'});
	
	var cboCheckName=new Ext.form.ComboBox({fieldLabel:C_CHECKER,tabIndex:3,
		name:'checkerName',value:p.get('checkerName'),
		store:HTStore.getUSER_S(),xtype:'combo',displayField:'userName',valueField:'userName',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();p.set('checkerId','');
			}
		},
		select:function(c,r,i){p.set('checkerId',r.get('id'));}}
	});
	
	var txtBatchNo=new Ext.form.TextField({fieldLabel:C_BATCH_NO,name:'batchNo',value:p.get('batchNo'),tabIndex:7,
    	xtype:'textfield',anchor:'95%'});
	var txtStatus=new Ext.form.TextField({fieldLabel:C_STATUS,name:'status',value:HTStore.getCheckNoteStatus(p.get('status')),tabIndex:4,disabled:true,
		ref:'../status',xtype:'textfield',style:'{font-weight:bold;color:green;}',anchor:'95%'});
	var dteProductDate=new Ext.form.DateField({fieldLabel:C_PRODUCT_DATE,tabIndex:8,name:'productDate',value:p.get('productDate'),
		altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d',
		xtype:'datefield',format:DATEF,anchor:'95%'});
	var cboDoubleCheckName=new Ext.form.ComboBox({fieldLabel:C_DOUBLE_CHECKER,tabIndex:12,
			name:'doubleCheckerName',value:p.get('doubleCheckerName'),
				store:HTStore.getUSER_S(),xtype:'combo',displayField:'userName',valueField:'userName',
				typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
				listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();p.set('doubleCheckerId','');
					}
				},
				select:function(c,r,i){p.set('doubleCheckerId',r.get('id'));}}
			});
	var frm = new Ext.form.FormPanel({
		labelWidth:80,frame:true,
		region:'north',height:120,layout:'column',layoutConfig:{columns:4},items:[
			{columnWidth:.25,layout:'form',labelWidth:80,border:false,items:[
				txtCheckNoteNo,
				lkpCargoOwner,
				ccboWarehouseName
				
			]},
			{columnWidth:.25,layout:'form',labelWidth:80,border:false,items:[
				cboCheckType,
				txtOrderNo,
				ccboAreaName
				
			]},
			{columnWidth:.25,layout:'form',border:false,items:[				
				dtaStartTime,
				
				dteProductDate,
				clkpBlock
				
			]},
			{columnWidth:.25,layout:'form',border:false,items:[				
				dteEndTime,						    			
				/*txtProductNo,	*/
				txtBlockLayer
   				
			 ]}
			
		]
	});

	
	this.updateToolBar = function(){
		btnSave.setDisabled(p.get('status')!=0);
		btRemove.setDisabled(p.get('rowAction')=='N'||p.get('status')!=0);
		btnAdd.setDisabled(p.get('status')!=0);
		btnCheck.setDisabled(p.get('rowAction')=='N'||p.get('status')!=0);
		btnUnCheck.setDisabled(p.get('status')!=1);
		btnAudit.setDisabled(p.get('status')!=1);
		btnUnAudit.setDisabled(p.get('status')!=2);
		btnComplete.setDisabled(p.get('status')!=2);
		btnPrint.setDisabled(p.get('status')>1);
	};
	var gridPanel=new Ext.form.FormPanel({region:'center',title:C_CHECK_NOTE_INFO,
		items:[frm,cargoGrid]});
	
	var gridTab=new Ext.TabPanel({activeTab:0,region:'center',
		items:[gridPanel,grid]});
	
	var title = p.get('rowAction')=='N'?(C_ADD+C_CHECK_NOTE):(C_CHECK_NOTE+'-'+p.get('checkNoteNo'));
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',ref:'../saveBtn',hidden:(NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_SAVE)),scope:this,handler:this.save});
	var btRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',ref:'../removeBtn',hidden:(NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_DEL)),scope:this,handler:this.removeNote});
	var btnAdd=new Ext.Button({text:W_STOCK,iconCls:'add',hidden:(NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_ADD)),scope:this,handler:this.stock});
	var btnCheck=new Ext.Button({text:C_COMMIT,iconCls:'check',ref:'../checkBtn',hidden:(NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_COMMIT)),scope:this,handler:this.submit});
	var btnUnCheck=new Ext.Button({text:C_COMMIT_CANCEL,iconCls:'renew',ref:'../unCheckBtn',hidden:(NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_CANCEL_COMMIT)),scope:this,handler:this.unSubmit});
	var btnAudit=new Ext.Button({text:C_AUDIT,iconCls:'check',ref:'../auditBtn',hidden:(NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_COMMIT)),scope:this,handler:this.audit});
	var btnUnAudit=new Ext.Button({text:C_AUDIT_CANCEL,iconCls:'renew',ref:'../unAuditBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_CANCEL_COMMIT),scope:this,handler:this.unAudit});
	var btnComplete=new Ext.Button({text:C_COMPLETE,iconCls:'check',ref:'../completeBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_FINISHED),scope:this,handler:this.complete});
	/*var btnPrint=new Ext.Button({text:C_EXPORT,iconCls:'print',ref:'../printBtn',scope:this,hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_EXPORT),
    	menu: {items: [{text:C_CHECK_NOTE,scope:this,handler:this.exp},
    	               {text:'盘点单轻量',scope:this,handler:this.damemonExp}]}});*/
	
	var btnPrint=new Ext.Button({text:C_EXPORT,iconCls:'print',ref:'../printBtn',scope:this,hidden:NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_EXPORT),
    	handler:this.damemonExp});
	
	Fos.CheckNotePanel.superclass.constructor.call(this, { 
	id: 'CHECK_NOTE_'+p.get('uuid'),title:title,
	closable:true,layout:'border',
	tbar:[	btnSave,
			btRemove,
			btnAdd,
			btnPrint
		 ],
	items: [gridTab]
	},this.updateToolBar());
};
Ext.extend(Fos.CheckNotePanel, Ext.Panel);

//========= P3 BEGIN =========== ChangePOWIN===============
Fos.ChangeProductNoWin = function(p) {
	
	var dteProductDate=new Ext.form.DateField({fieldLabel:' 生产日期',name:'productDate',format:DATEF,anchor:'95%',altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d'});
	var txtProductNo=new Ext.form.TextField({fieldLabel:'生产批号',name:'productNo',anchor:'95%'});
	var txtAdjustReason=new Ext.form.TextArea({fieldLabel:'调整原因',name:'adjustReason',value:p.get('adjustReason'),anchor:'95%'});
	
	this.frm = new Ext.form.FormPanel({labelWidth:80,padding:5,
            	items:[dteProductDate,txtProductNo,txtAdjustReason]
    });
	
	this.save=function(){
		if(Ext.isEmpty(txtProductNo.getValue())){
			Ext.Msg.alert(SYS,"生产批号不能为空！");
			return ;
		}
		
		if(txtProductNo.getValue().length!=PO_LENGTH){
			alert("productNo length:"+txtProductNo.getValue().length);
			Ext.Msg.alert(SYS,'生产批号的长度不是6，请确认！');
			return ;
		}
		
		p.set('adjustReason',txtAdjustReason.getValue());
		p.set('adjustOver',1);
		p.set('lossOrProfit',2);
		
		
		
		var xml='';
		xml=xml+HTUtil.RTX(p,'WCheckList',WCheckList);
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'WCHECK_LIST_CGPO',productDate:dteProductDate.getValue(),productNo:txtProductNo.getValue()},
				success:function(r){
					//var a=HTUtil.ATR
					var a = HTUtil.XTR(r.responseXML,'WCheckList',WCheckList);
					HTUtil.RU(a,p,WCheckList);
					XMG.alert(SYS,"数据保存成功！");
					this.close();
				},
				failure:function(r){
					XMG.alert(SYS,M_F+r.responseText);
				},
				xmlData:HTUtil.HTX(xml)
			
			});
		}
	};
	
	this.cancel=function(){
		this.close();
	};
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',scope:this,handler:this.save});
	var btnCancel=new Ext.Button({text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.cancel});
    Fos.ChangeProductNoWin.superclass.constructor.call(this, {modal:true,
    	title:'出运信息',
    	width:250,height:200,maximizable:true,layout:'fit',
        plain:false,items:this.frm,
        buttons:[btnSave,'-',btnCancel]
  			});
};
Ext.extend(Fos.ChangeProductNoWin, Ext.Window);


//========= P3 BEGIN =========== CheckCargoGrid===============


Fos.CheckCargoGrid = function(storeCargo,c){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WCARGO_X'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WCargo',idProperty:'id'},WCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
    store.load({params:{start:0,limit:15}});
    var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm = new Ext.grid.ColumnModel({columns:[
    	new Ext.grid.RowNumberer(),sm,
		{header:'商品代码',dataIndex:'skuNo',width:80},
		{header:'商品名称',dataIndex:'cargoName',width:100},
		{header:'英文名称',dataIndex:'cargoNameEn',width: 80},
		{header:'规格',dataIndex:'specification',width: 80},
		{header:'型号',dataIndex:'cargoType',width: 80},
		{header:'颜色',dataIndex:'cargoColor',width: 80},
		{header:'类别',dataIndex:'categoryName',width: 80},
		{header:'品牌',dataIndex:'cargoBrand',width: 80}
		],defaults:{sortable:true,width:100}});
	
	var grid = new Ext.grid.GridPanel({store: store,sm:sm,cm:cm,height:385,autoScroll:true,
		loadMask: true,
		bbar:PTB(store,15)
	});
	
	
	this.sel = function(){
		var re = grid.getSelectionModel().getSelections();
		if(re.length>0){
			//c.beginEdit();
			/*var f = WCheckCargo.prototype.fields;
			for (var i = 0; i < f.keys.length; i++) {
	        	var fn = ''+f.keys[i];
	        	var fc = this.find('name',fn);
	        	if(fc!=undefined&&fc.length>0){
	        		c.set(fn,fc[0].getValue());
	        	}
	   	 	}*/
				
				var selc=[];
				for(var i=0;i<re.length;i++){
						var a=re[i];
						var r = new WCheckCargo({uuid:HTUtil.UUID(32),checkId:c.get('checkId'),rowAction:'N'});
							r.set('skuNo',a.get('skuNo'));
							r.set('cargoName',a.get('cargoName'));
							r.set('categoryName',a.get('categoryName'));
							r.set('cargoNameEn',a.get('cargoNameEn'));
							r.set('categoryName',a.get('categoryName'));
							r.set('specification',a.get('specification'));
							r.set('cargoColor',a.get('cargoColor'));
							r.set('cargoBrand',a.get('cargoBrand'));
							storeCargo.add(r);
							selc[selc.length]=r;
				}
				
				var xml = HTUtil.ATX(selc,'WCheckCargo',WCheckCargo);
				
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WCHECK_CARGO_S'},
					success: function(r){
						var a = HTUtil.XTRA(r.responseXML,'WCheckCargo',WCheckCargo);
						HTUtil.RUA(storeCargo,a,WCheckCargo);
						/*if(c.get('rowAction')=='N'){
							storeCargo.add(a);
						}
						else{
							var f = WCheckCargo.prototype.fields;
							c.beginEdit();
							for (var i = 0; i < f.keys.length; i++) {
								var fn = ''+f.keys[i];
								c.set(fn,a.get(fn));
							}; 
							c.endEdit();
						}*/
						this.close();
					},
					failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
					xmlData:HTUtil.HTX(xml)});
				
				
		}else Ext.Msg.alert(SYS_W,M_NO_DATA_SELECTED);
	};
	var search=function(){
		var a=[];
		var sValue=txtFilter.getValue();
		var radGet=radgType.getValue();
		var sName=radGet.inputValue;
		if(sValue){
			a[a.length]=new QParam({key:sName,value:sValue,op:7});
		}
		if(a.length<=0){
			store.baseParams={_mt:'xml',_A:'WCARGO_X'};
		}
		else{
			store.baseParams={_mt:'xml',_A:'WCARGO_X',xml:HTUtil.QATX(a)};
		}
		store.reload({
			params:{start:0,limit:15},
			callback:function(r){
				if (r.length==0)
				{
					XMG.alert(SYS,M_NOT_FOUND);
				}
			}
		});
	};
	
	var txtFilter=new Ext.form.TextField({fieldLabel:'查询条件',name:'filter',anchor:'95%'});
	var radCode=new Ext.form.Radio({checked:true,name:'type',inputValue:'skuNo',boxLabel:'编码'});
	var radName=new Ext.form.Radio({name:'type',inputValue:'cargoName',boxLabel:'名称'});
	var radgType=new Ext.form.RadioGroup({fieldLabel:'查询方式',items:[radCode,radName]});
	var btnSearch=new Ext.Button({text:'查询',iconCls:'search',scope:this,hidden:(NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_SEARCH)),handler:search});
	
	var panel=new Ext.Panel({frame:true,border:false,height:50,
		layout:'column',
		items:[{columnWidth:.4,labelAlign:'right',labelWidth:65,layout:'form',border:false,items:[txtFilter]},
    	    	{columnWidth:.4,labelAlign:'right',labelWidth:65,layout:'form',border:false,items:[radgType]},
    	    	{columnWidth:.15,labelAlign:'right',labelWidth:10,layout:'form',border:false,items:[btnSearch]}
    	    ]});
	
	Fos.CheckCargoGrid.superclass.constructor.call(this,{title:'商品选择',width:700,height:500,layout:'form',modal:true,
		items:[panel,grid],
    	buttons:[{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
    	         {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]}); 

};
Ext.extend(Fos.CheckCargoGrid, Ext.Window);

