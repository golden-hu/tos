Fos.FrozenStoragePanel = function(a){
	
	var store=new Ext.data.Store({url:SERVICE_URL+'?_A=WPLACED_CARGO_A',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalPropery:'rowCount',record:'WPlacedCargo'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	var storeC=new Ext.data.Store({url:SERVICE_URL+'?_A=WPLACED_CARGO_C',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalPropery:'rowCount',record:'WPlacedCargo'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	
	
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
	
	var cobxHold=new Ext.form.ComboBox({name:'frozenCategory',
	    store:WHTStore.FROZEN_HOLD,displayField:'NAME',valueField:'NAME',tabIndex:3,
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				a.set('frozenCategoryCode',r.get('CODE'));
			}
		}
	});
	
	var cobxHHold=new Ext.form.ComboBox({name:'frozenCategory',fieldLabel:'被冻结类型',
	    store:WHTStore.FROZEN_HOLD,displayField:'NAME',valueField:'NAME',tabIndex:3,
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				a.set('frozenCategoryCode',r.get('CODE'));
			}
		}
	});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	
    var cm=new Ext.grid.ColumnModel({columns:[sm,
    {header:'跟踪号',dataIndex:'id',width:70,align:'center'},
    {header:'进仓日期',dataIndex:'receivedDate',renderer:formatDate,width:90,align:'center'},
	{header:'寄仓单位',dataIndex:'custName',width:150,align:'center'},
	{header:'生产日期',dataIndex:'productDate',renderer:formatDate,width:90,align:'center'},
	{header:'保质期天数',dataIndex:'safeDays',width:80,align:'center'},
	{header:'超期天数',dataIndex:'overdueDays',width:70,align:'center'},
	{header:'冻结类型',dataIndex:'frozenCategory',width:120,align:'center'},
	{header:'商品名称',dataIndex:'cargoName',width:120,align:'center'},
	{header:'仓位',dataIndex:'blockName',width:70,align:'center'},
	{header:'数量单位',dataIndex:'unitName',width:70,align:'center'},
	{header:'数量',dataIndex:'quantity',width:70,align:'center'},
	{header:'批次',dataIndex:'batchNo',width:90,align:'center'},
	{header:'进仓单号',dataIndex:'storageNoteNo',width:120,align:'center'},
	{header:'面积单位',dataIndex:'mUnitName',width:70,align:'center'},
	{header:'面积',dataIndex:'planedMeasure',width:80,align:'center'},
	{header:'体积单位',dataIndex:'vUnitName',width:70,align:'center'},
	{header:'体积',dataIndex:'volume',width:80,align:'center'},
	{header:'重量单位',dataIndex:'wUnitName',width:70,align:'center'},
	{header:'毛重',dataIndex:'grossWeight',width:80,align:'center'},
	{header:'净重',dataIndex:'netWeight',width:80,align:'center'},
	{header:'冻结人',dataIndex:'freezeName',width:80,align:'center'},
	{header:'冻结时间',dataIndex:'freezetime',renderer:formatDate,width:90,align:'center'},
	{header:'取消冻结人',dataIndex:'freezeCancelName',width:90,align:'center'},
	{header:'取消冻结时间',dataIndex:'freezeCancelTime',renderer:formatDate,width:100,align:'center'}
    ],defaults:{sortable:true,width:100}});
    
    var frozenStorageCargo = function(){
		var nowLoginUser=sessionStorage.getItem("USER_NAME");
		var frozenCategory = cobxHold.getValue();
		var frozenCategoryCode=a.get('frozenCategoryCode');
		var select=sm.getSelections();
		var xml='';
		if(select){
			xml=HTUtil.ATX(select,'WPlacedCargo',WPlacedCargo);
		}
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WPLACED_CARGO_F',
				frozenCategoryCode:frozenCategoryCode,frozenCategory:frozenCategory,statusFrozen:0,nowLoginUser:nowLoginUser},
			success: function(r){
				XMG.alert(SYS,"冻结成功！");
			},
			failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
			xmlData:HTUtil.HTX(xml)});
		}
	};
	 var frozenCancelStorageCargo = function(){
			
			var nowLoginUser=sessionStorage.getItem("USER_NAME");
			
			var select=sm.getSelections();
			var xml='';
			if(select){
				xml=HTUtil.ATX(select,'WPlacedCargo',WPlacedCargo);
			}
			if(xml){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WPLACED_CARGO_F',statusFrozen:1,nowLoginUser:nowLoginUser},
				success: function(r){
					XMG.alert(SYS,"取消冻结成功！");
				},
				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)});
			}
		};
    var grid=new Ext.grid.GridPanel({
    	iconCls:'gen',title:'列表',layout:'fit',region:'center',
    	closable:true,store:a.get('statusFrozen')==0?store:storeC,sm:sm,cm:cm,
    	listeners:{scope:this,
    		rowdblclick: function(grid, rowIndex, event){
    			this.editStorageCargo;
    		}},
    	tbar:[
    	        a.get('statusFrozen')==0?cobxHold:'','-',{text:a.get('statusFrozen')==0?'冻结':'取消冻结',iconCls:a.get('statusFrozen')==0?'redo':'renew',scope:this,
    	        handler:a.get('statusFrozen')==0?frozenStorageCargo:frozenCancelStorageCargo}
    	     ]
    	});
    
    
    var ccboCargoName=new Fos.CargoLookUp({fieldLabel:C_CARGO_NAME,tabIndex:51,
	    name:'cargoName',
		store:WHTStore.getWCargo(),enableKeyEvents:true,
		displayField:'cargoName',valueField:'cargoName',
		tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		keydown:{
			fn:function(f,e){
				WCargoLC(f,e,0,0,'','');
				},
			buffer:BFL
		}
		
	}});
    
    var lkpCargoOwnerName=new Fos.CustomerLookup({fieldLabel:'货主',tabIndex:10,name:'cargoOwnerName',
			store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});
	var datreceivedDate=new Ext.form.DateField({fieldLabel:'起始日期' ,name:'receivedDate',
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
          tabIndex:7,anchor:'95%',format:DATEF});
	
	var datendReceivedDate=new Ext.form.DateField({fieldLabel:'截止日期',name:'endReceivedDate',
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
		  tabIndex:10,anchor:'95%',format:DATEF});
	
	//var txtbatchNo=new Ext.form.TextField({fieldLabel:'批次', name:'batchNo',xtype:'textfield',tabIndex:9,anchor:'95%'});
	
	var txtstorageNoteNo=new Ext.form.TextField({fieldLabel:'仓单号',name:'storageNoteNo',tabIndex:4,anchor:'95%'});
	
	var ccboBlockName=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',tabIndex:55,
		store:blockStore,enableKeyEvents:true,itemSelector:'div.list-item',tpl:blockTpl,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				a.set('blockId',r.get('id'));
				a.set('blockCode',r.get('blockCode'));
				a.set('areaId',r.get('areaId'));
				a.set('areaCode',r.get('areaCode'));
				a.set('warehouseId',r.get('warehouseId'));
				a.set('warehouseCode',r.get('warehouseCode'));
				ccboAreaName.setValue(r.get('areaName'));
				ccboWarehouseName.setValue(r.get('warehouseName'));
			},
			keydown:{
				fn:function(f,e,t){
					var r=a.get('areaId');
					var w=a.get('warehouseId');
					
					WBlockLC(f,e,'0','',r,w);
				},
				buffer:BF
			}
		}
	});
	var ccboAreaName=new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',ref:'../areaName',store:areaStore,xtype:'combo',
			displayField:'areaName',valueField:'areaName',typeAhead: true,mode:'remote',
			triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:56,
			listeners:{scope:this,
				select:function(c,r,i){
					ccboWarehouseName.setValue(r.get('warehouseName'));	
					ccboBlockName.setAreaName(r.get('areaName'));
				}
			}});
	
	var ccboWarehouseName=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',
			ref:'../warehouseName',store:warehouseStore,xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
			typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:57
			});
	
	var checkoverDue= new Ext.form.Checkbox({boxLabel:'超期',name:'overDue',anchor:'99%'});
	
	//var overDue={boxLabel:'超期',name:'overDue', xtype:'checkbox',anchor:'99%'};
	
	var cobxactionGategory=new Ext.form.ComboBox({fieldLabel:'类别',name:'actionGategory',
	    store:WHTStore.ACTION_GATEGORY,displayField:'NAME',valueField:'NAME',tabIndex:3,
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'
		
	});
	
	//生产编号
	var ctxtProductNo=new Ext.form.TextField({fieldLabel:'生产编号',tabIndex:59,name:'productNo',anchor:'95%'
	});
	
	var txtEntrustNo=new Ext.form.TextField({fieldLabel:'客户订单号',name:'entrustNo',tabIndex:4,anchor:'95%'
	});
	
	/*var txtcategoryName=new Ext.form.TextField({fieldLabel:'商品类型',name:'categoryName',tabIndex:4,anchor:'95%'
	});*/
	var txtcategoryName=new Ext.form.ComboBox({fieldLabel:'产品类别',name:'cargoType',tabIndex:2,
		store:WHTStore.getWCargoCategory(),mode:'remote',displayField:'categoryName',valueField:'categoryName',
		itemselector:'div.list-item',listWidth:160,
		typeAhead:true,triggerAction:'all',
		selectOnFocus:true,anchor:'95%'
		});
	
	search=function(){
		/* 商品cargoName   仓位blockName    仓单号storageNoteNo  货主cargoOwnerName  库区areaName  开始日期receivedDate
		 * 批次batchNo     仓库warehouseName       截止日期endReceivedDate   类别actionGategory  超期overDue
		 */
		var a=[];
		var op=1;
		var cargoName=ccboCargoName.getValue();//商品
		if(cargoName){
			a[a.length]=new QParam({key:'cargoName',value:cargoName,op:op});
		}
		var blockName=ccboBlockName.getValue();//仓位
		if(blockName){
			a[a.length]=new QParam({key:'blockName',value:blockName,op:op});
		}
		var storageNoteNo=txtstorageNoteNo.getValue();//仓单号
		if(storageNoteNo){
			a[a.length]=new QParam({key:'storageNoteNo',value:storageNoteNo,op:op});
		}
		var cargoOwnerName=lkpCargoOwnerName.getValue();//货主
		if(cargoOwnerName){
			a[a.length]=new QParam({key:'cargoOwnerName',value:cargoOwnerName,op:op});
		}
		var areaName=ccboAreaName.getValue();//库区
		if(areaName){
			a[a.length]=new QParam({key:'areaName',value:areaName,op:op});
		}
		var warehouseName=ccboWarehouseName.getValue();//仓库
		if(warehouseName){
			a[a.length]=new QParam({key:'warehouseName',value:warehouseName,op:op});
		}
		var receivedDate=datreceivedDate.getValue();//开始日期
		if(receivedDate){
			a[a.length]=new QParam({key:'receivedDate',value:HTUtil.formatDate(receivedDate),op:op});
		}
		
		var endReceivedDate=datendReceivedDate.getValue();//截止日期
		if(endReceivedDate){
			a[a.length]=new QParam({key:'endReceivedDate',value:HTUtil.formatDate(endReceivedDate),op:op});
		}
		var actionGategory=cobxactionGategory.getValue();//类别
		if(actionGategory){
			a[a.length]=new QParam({key:'actionGategory',value:actionGategory,op:op});
		}/*
		var productNo=ctxtProductNo.getValue();//生产编号
		if(productNo){
			a[a.length]=new QParam({key:'productNo',value:productNo,op:op});
		}*/
		var entrustNo=txtEntrustNo.getValue();//客户订单号
		if(entrustNo){
			a[a.length]=new QParam({key:'entrustNo',value:entrustNo,op:op});
		}
		var categoryName=txtcategoryName.getValue();//商品类别
		if(categoryName){
			a[a.length]=new QParam({key:'categoryName',value:categoryName,op:op});
		}
		/*var overDue=checkoverDue.getValue();//超期
		if(overDue){
			//alert(overDue);
			a[a.length]=new QParam({key:'overDue',value:overDue,op:op});
		}*/
		
		if(a.length>0){
			store.baseParams={_A:'WPLACED_CARGO_A',_ml:'xml',xml:HTUtil.QATX(a)};	
	    }
		else{
			store.baseParams={_A:'WPLACED_CARGO_A',_ml:'xml'};
		}
		
		store.load({
			params:{overdue:checkoverDue.getValue()},
			callback:function(r,p,succ){
				if(r.length==0)
	     			XMG.alert(SYS_W,M_NOT_FOUND);
			}
		});
	};
	
	refresh=function(){
		/* 商品cargoName   仓位blockName    仓单号storageNoteNo  货主cargoOwnerName  库区areaName  开始日期receivedDate
		 * 批次batchNo     仓库warehouseName       截止日期endReceivedDate   类别actionGategory  超期overDue
		 */
		var a=[];
		var op=1;
		var cargoName=ccboCargoName.getValue();//商品
		if(cargoName){
			a[a.length]=new QParam({key:'cargoName',value:cargoName,op:op});
		}
		var blockName=ccboBlockName.getValue();//仓位
		if(blockName){
			a[a.length]=new QParam({key:'blockName',value:blockName,op:op});
		}
		var storageNoteNo=txtstorageNoteNo.getValue();//仓单号
		if(storageNoteNo){
			a[a.length]=new QParam({key:'storageNoteNo',value:storageNoteNo,op:op});
		}
		var cargoOwnerName=lkpCargoOwnerName.getValue();//货主
		if(cargoOwnerName){
			a[a.length]=new QParam({key:'cargoOwnerName',value:cargoOwnerName,op:op});
		}
		var areaName=ccboAreaName.getValue();//库区
		if(areaName){
			a[a.length]=new QParam({key:'areaName',value:areaName,op:op});
		}
		var receivedDate=datreceivedDate.value;//开始日期
		if(receivedDate){
			a[a.length]=new QParam({key:'receivedDate',value:receivedDate,op:op});
		}
		var warehouseName=ccboWarehouseName.getValue();//仓库
		if(warehouseName){
			a[a.length]=new QParam({key:'warehouseName',value:warehouseName,op:op});
		}
		var endReceivedDate=datendReceivedDate.value;//截止日期
		if(endReceivedDate){
			a[a.length]=new QParam({key:'endReceivedDate',value:endReceivedDate,op:op});
		}
		var actionGategory=cobxactionGategory.getValue();//类别
		if(actionGategory){
			a[a.length]=new QParam({key:'actionGategory',value:actionGategory,op:op});
		}
		/*var overDue=checkoverDue.getValue();//超期
		if(overDue){
			//alert(overDue);
			a[a.length]=new QParam({key:'overDue',value:overDue,op:op});
		}*/
		var frozenCategory=cobxHHold.getValue();//冻结类型
		if(frozenCategory){
			a[a.length]=new QParam({key:'frozenCategory',value:frozenCategory,op:op});
		}/*
		var productNo=ctxtProductNo.getValue();//生产编号
		if(productNo){
			a[a.length]=new QParam({key:'productNo',value:productNo,op:op});
		}*/
		var entrustNo=txtEntrustNo.getValue();//客户订单号
		if(entrustNo){
			a[a.length]=new QParam({key:'entrustNo',value:entrustNo,op:op});
		}
		var categoryName=txtcategoryName.getValue();//商品类别
		if(categoryName){
			a[a.length]=new QParam({key:'categoryName',value:categoryName,op:op});
		}
		if(a.length>0){
			storeC.baseParams={_A:'WPLACED_CARGO_C',_ml:'xml',xml:HTUtil.QATX(a)};
			
		}
		else{
			storeC.baseParams={_A:'WPLACED_CARGO_C',_ml:'xml'};
		}
		storeC.load({
			params:{overdue:checkoverDue.getValue()},
			callback:function(r,p,succ){
				if(r.length==0)
	     			XMG.alert(SYS_W,M_NOT_FOUND);
			}
		});
		
	};
	
	var sheet1= new Ext.Panel({scope:this,padding:5,height:150,
		title:a.get('statusFrozen')==0?'冻结货物':'取消冻结',labelWidth:100,labelAlign:'right',layout:'column',
		items:[{columnWidth:0.25,layout:'form',border:false,items:[lkpCargoOwnerName,ccboBlockName,txtstorageNoteNo]},
		       {columnWidth:0.25,layout:'form',border:false,items:[ccboCargoName,ccboAreaName,txtEntrustNo]},
		       {columnWidth:0.25,layout:'form',border:false,items:[txtcategoryName,ccboWarehouseName,datreceivedDate]},
		       a.get('statusFrozen')==0?{columnWidth:0.25,layout:'form',border:false,items:[cobxactionGategory,checkoverDue,datendReceivedDate]}:
		       {columnWidth:0.25,layout:'form',border:false,items:[cobxactionGategory,cobxHHold,datendReceivedDate,checkoverDue]},
		]
	});

	var tables=new Ext.TabPanel({activeTab:0,scope:this,
		items:[sheet1]}
			);
	
	var frme= new Ext.form.FormPanel({
		labelWidth:90,frame:true,height:160,scope:this,
		region:'north',
		items:[tables]
	});

	Fos.FrozenStoragePanel.superclass.constructor.call(this, {id:a.get('statusFrozen')==0?'FREEZE_START':'FREEZE_STOP',
		title:a.get('statusFrozen')==0?'冻结货物':'取消冻结',
		closable:true,layout:'border',
		store:store,sm:sm,cm:cm,
		tbar:[{text:'查 询',iconCls:'search',scope:this,hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SEARCH),handler:a.get('statusFrozen')==0?search:refresh},
			 ],
		items: [frme,grid]
		});
};
Ext.extend(Fos.FrozenStoragePanel,Ext.Panel);
