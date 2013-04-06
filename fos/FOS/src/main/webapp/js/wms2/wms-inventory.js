//库存查询
///////////////////////////////////////////////////////////////

Fos.InventorySummaryTab=function(t){
	var custId='';					//客户 
	var warehouseId='';				//仓库
	var areaId='';					//库区
	var blockId='';					//库位
	var cargoId='';					//商品
	
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库区数据
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	


	

	var doc=new Ext.ux.IFrameComponent({id:'AC'+t, url:'',title:'明细',labeAction:'right',padding:5,height:465,width:'100%'});
	
	//分组统计的条件
	var ck1={boxLabel:'按库位分组',tabIndex:28,name:'byBlock',
								xtype:'checkbox',anchor:'99%'};
								
	var ck2={boxLabel:'按商品分组',tabIndex:28,name:'byCargo',
								xtype:'checkbox',anchor:'99%'};
								
	var ck3={boxLabel:'按货主分组',tabIndex:28,name:'byCustId',
								xtype:'checkbox',anchor:'99%'};
								
	var ck4={boxLabel:'按入库单号分组',tabIndex:29,name:'byStorageNoteNo',
								xtype:'checkbox',anchor:'99%'};
								
	var clkpBlock=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',tabIndex:11,
		store:WHTStore.getBlock(),enableKeyEvents:true,itemSelector:'div.list-item',
		tpl:blockTpl,listWidth:400,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					f.clearValue();
					
				}
			},
			select:function(c,r,i){
				cboAreaName.setValue(r.get('areaName'));
				cboWarehouseName.setValue(r.get('warehouseName'));
			},
			keyup:{
				fn:function(f,e,t){
					WBlockLC(f,e,0,0,'','');
				},
				buffer:BF
			}
		}
	});

	
	var lkpCargoOwner=new Fos.CustomerLookup({fieldLabel:'货主',name:'owner',tabIndex:5,
		store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwner',
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custBookerFlag',
		displayField:'custNameCn',valueField:'custNameCn',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();
				custId='';									
			}},
		select:function(c,r,i){
				custId=r.get('id');								
		},
		keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}});
	
	var lkpCustomerLookup=new Fos.CustomerLookup({fieldLabel:'供应商',name:'custName',
		store:HTStore.getCS(),enableKeyEvents:true,ref:'../custName',
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custBookerFlag',tabIndex:9,
		displayField:'custNameCn',valueField:'custNameCn',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();										
			}},
		select:function(c,r,i){		
			custId=r.get('id');
		},
		keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}});
	
	
	var txtProductNo=new Ext.form.TextField({fieldLabel:'生产编号',name:'productNo',tabIndex:12,anchor:'95%'});
	
	var cargoType=new Ext.form.ComboBox({fieldLabel:'产品类别',name:'cargoType',tabIndex:2,

		store:WHTStore.getWCargoCategory(),mode:'remote',displayField:'categoryName',valueField:'categoryName',
		itemselector:'div.list-item',listWidth:160,
		typeAhead:true,triggerAction:'all',
		selectOnFocus:true,anchor:'95%'
		});
	var cboWarehouseName=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',tabIndex:6,
		ref:'../warehouseName',store:warehouseStore,xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				
				warehouseId=r.get('id');
				
				clkpBlock.setValue('');
				clkpBlock.store.removeAll();
				cboAreaName.setValue('');
				cboAreaName.store.removeAll();
				cboAreaName.store.baseParams={_mt:'json',warehouseId:r.get('id')};
				cboAreaName.store.reload();
			},
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					warehouseId='';									
				}}
		}
	});
	
	var cboAreaName =new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',tabIndex:7,
		ref:'../areaName',store:areaStore,xtype:'combo',
		displayField:'areaName',valueField:'areaName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){							
				areaId=r.get('id');
				clkpBlock.setValue('');
				clkpBlock.store.removeAll();
				clkpBlock.store.baseParams={_mt:'json',warehouseId:warehouseId,areaId:r.get('id')};
				clkpBlock.store.reload();
			},
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					areaId='';									
				}
			}
		}
	});
	
	
	var lkcargoName=new Fos.CargoLookUp({fieldLabel:'商品',name:'cargoName',tabIndex:4,
    	xtype:'cargoLookUp',anchor:'95%',
    	store:WHTStore.getWCargo(),enableKeyEvents:true,
    	tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:C_LW,
    	displayField:'cargoName',valueField:'cargoName',
    	typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,
    	listeners:{scope:this,
    				blur:function(f){
						if(f.getRawValue()==''){
							f.clearValue();
							cargoId='';									
						}
					},
					select:function(c,r,i){
							cargoId=r.get('id');								
					},
					
    				keydown:{fn:function(f,e){
    							WCargoLC(f,e);
    							},buffer:BF
    				}
    	}
    });
	
	var dteStorageDateStart=new Ext.form.DateField({fieldLabel:'接单日期始',name:'storageDateStart',tabIndex:10,xtype:'datefield',
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',format:DATEF,anchor:'95%'});
	var dteStorageDateEnd=new Ext.form.DateField({fieldLabel:'接单日期止',name:'storageDateEnd',xtype:'datefield',tabIndex:11,
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',format:DATEF,anchor:'95%'});
	var txtOrderNo=new Ext.form.TextField({fieldLabel:'客户订单号',name:'orderNo',tabIndex:14,xtype:'textField',anchor:'95%'});
	var frm = new Ext.form.FormPanel({
		padding:5,
		title:'综合过滤条件',
		frame:true,height:130,collapsible:true,
		collapsed:true,
		labelWidth:80,labelAlign:'left',
		region:'north',layout:'column',
		items:[
		       {columnWidth:.25,layout:'form',border:false,items:[
		           lkpCargoOwner,
		           cboWarehouseName,
		           ck1]
		       },
		       {columnWidth:.25,layout:'form',border:false,items:[
		            lkpCustomerLookup,
		            cboAreaName,
		       		ck2 ]
		       },
		       {columnWidth:.25,layout:'form',border:false,items:[
					cargoType,
					clkpBlock,	
		            ck3 ]
		            },
		       {columnWidth:.25,layout:'form',border:false,items:[		            
		            txtOrderNo,		           
		            /*txtProductNo,*/
					ck4]}
				
			]
	});
	
	this.InvTotal=function(n){
		
		var url = REPORT_URL;
		if(t==2){
			url+='&__report=reports/wms_inventoryTotal.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
		}
		else{
			url +='&__report=reports/wms_inventoryForPlacedTotal.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
				
		}
		
		if(cargoId){
			url+="&cargoId="+cargoId;
		}
		else{
			if(lkcargoName.getValue()){//商品
				url+='&cargoName='+lkcargoName.getValue();
			}
		}
		if(custId){
			url+="&custId="+custId;
		}
		if(lkpCustomerLookup.getValue()){
			url+="&custName="+lkpCustomerLookup.getValue();
		}
		if(lkpCargoOwner.getValue()){//货主
			url+='&owner='+lkpCargoOwner.getValue();
		}
		if(cboWarehouseName.getValue()){//仓库
			url+='&warehouseName='+cboWarehouseName.getValue();
		}
		if(cboAreaName.getValue()){//库区
			url+='&areaName='+cboAreaName.getValue();
		}
		if(clkpBlock.getValue()){//库位
			url+='&clkpBlock='+clkpBlock.getValue();
		}
		
		if(dteStorageDateStart.getValue()){//接单日期始
			url+='&storageDateStart='+dteStorageDateStart.value;
		}
		if(dteStorageDateEnd.getValue()){//接单日期止
			url+='&storageDateEnd='+dteStorageDateEnd.value;
		}
		if(n=='S'){
			Ext.get('IF_AC'+t).dom.src=url;	
		}
		else{
			url+="&__format=xls";
			window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');	
		}
		
	};
	
	var btnSearch=new Ext.Button({text:"生成报表",iconCls:'stats',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SEARCH),
		scope:this,handler:function(){this.InvTotal('S');}});
	
	Fos.InventorySummaryTab.superclass.constructor.call(this,{
		id:'WMS-INVENTORY_SEARCH'+t,
		title:t==2?'库存汇总表':'库存统计表',
		closable:true,
		tbar:
			[{text:'商品:'},lkcargoName,'-',{text:'接单时间从:'},dteStorageDateStart,{text:'至:'},dteStorageDateEnd,'-',
			 btnSearch,'-',
	        {text:'输出',iconCls:'print',scope:this,hidden:NR(M1_WMS+WM_NOTE+WMI_INVENTORY+WF_EXPORT),handler:function(){this.InvTotal('E');}},'-',
	       ],
		items: [frm,doc]
		  //设置分页的工具条
		});
};
Ext.extend(Fos.InventorySummaryTab, Ext.Panel);

Fos.InventorySearchPanel=function(t){
	var custId='';					//客户 
	var warehouseId='';				//仓库
	var areaId='';					//库区
	var blockId='';					//库位
	var cargoId='';					//商品
	
	var accountId='';				//结算对象
	
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库区数据
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库位数据
	var blockStore = new Ext.data.Store({url:SERVICE_URL+'?_A=BLOCK_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WBlock',id:'id'},WBlock),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'Winventory_Qnew'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WInventory',idProperty:'id'},WInventory),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});

	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	    {header:"货物编号",dataIndex:'skuNo',align:'center'},
	    {header:W_CARGO_NAME,dataIndex:'cargoName',align:'center',width:150},
	    {header:'仓单号',dataIndex:'storageNoteNo',width:120,align:'center'},
	    {header:'接单日期',dataIndex:'storageDate',renderer:formatDate,align:'center',width:85},
	    {header:"仓库",dataIndex:'warehouseName',align:'center'},	 
	    {header:W_BLOCK,dataIndex:'blockName',align:'center',width:80},	  
	    {header:"层",dataIndex:'blockLayer',align:'center',width:60},	 
	    {header:'货主',dataIndex:'custName',align:'center',width:150},
	    {header:'商品规格',dataIndex:'specification',align:'center',width:80},
	    {header:'商品型号',dataIndex:'cargoType',align:'center',width:80},
	    {header:'商品品牌',dataIndex:'cargoBrand',align:'center',width:80},	   
	    {header:'商品类别',dataIndex:'cargoCategory',align:'center',width:80},
	    {header:'结算对象',dataIndex:'accountName',align:'center'},
	    {header:'数量',dataIndex:'quantity',align:'center',width:80},
	    {header:'数量单位',dataIndex:'qUnitName',align:'center',width:80},	
	    {header:'件数',dataIndex:'packages',align:'center',width:80},
	    {header:'件数单位',dataIndex:'pUnit',align:'center',width:80},	
	    {header:'净重',dataIndex:'netWeight',align:'center',width:80},
	    {header:'毛重',dataIndex:'grossWeight',align:'center',width:80},	   
	    {header:'重量单位',dataIndex:'wUnitName',align:'center',width:80},
	    {header:'体积',dataIndex:'volume',align:'center',width:80},
	    {header:'面积单位',dataIndex:'vUnitName',align:'center',width:80},
	    {header:'面积',dataIndex:'measure',align:'center',width:80},
	    {header:'面积单位',dataIndex:'mUnitName',align:'center',width:80},
	    {header:'库龄',dataIndex:'cargoDays',align:'center',width:80},
	    {header:'委托编号',dataIndex:'entrustNo',align:'center',width:80}, 
	    {header:'客户订单号',dataIndex:'orderNo',align:'center',width:80},	    
	    {header:'批次',dataIndex:'batchNo',align:'center',width:80},
	    {header:'生产日期',dataIndex:'productDate',renderer:formatDate,align:'center',width:85},
	    {header:'生产编号',dataIndex:'productNo',align:'center',width:80},
	    {header:'仓库属性',dataIndex:'warehouseProperty',align:'center',width:80},
	    {header:'货龄',dataIndex:'cargoAges',align:'center',width:80},
	    {header:'商品属性',dataIndex:'cargoProperty',align:'center',width:80},
	    {header:'残损数量',dataIndex:'bornQuantity',align:'center',width:80},	    
	    {header:'备注',dataIndex:'remarks',align:'center',width:80},
	    {header:'供应商',dataIndex:'supplier',align:'center',width:80},
	    {header:'入库操作',dataIndex:'operator',align:'center',width:80},
	    {header:'上架人员',dataIndex:'placedName',align:'center',width:80},
	    {header:'操作类型',dataIndex:'opType',align:'center',width:80},
	    {header:'实物签收人',dataIndex:'realSignName',align:'center',width:80},
	    {header:'系统入库时间',dataIndex:'realStockDate',align:'center',width:100},
	    {header:'破损情况 ',dataIndex:'bornRemarks',align:'center',width:80},
	    {header:'是否包仓',dataIndex:'rentalFlag',align:'center',width:80},
	    {header:'库龄分类',dataIndex:'stockDaysAnalysis',align:'center',width:80}
	    ],defaults:{sortable:true,width:100}});
	
	var grid=new Ext.grid.GridPanel({
    	iconCls:'gen',title:W_STORAGE_DETAIL,layout:'fit',region:'center',
    	closable:false,store:store,sm:sm,cm:cm,
		bbar:PTB(store,20)
	});
	
	
	//分组统计的条件
	var ck1={boxLabel:'按库位分组',tabIndex:28,name:'byBlock',
								xtype:'checkbox',anchor:'99%'};
								
	var ck2={boxLabel:'按商品分组',tabIndex:28,name:'byCargo',
								xtype:'checkbox',anchor:'99%'};
								
	var ck3={boxLabel:'按货主分组',tabIndex:28,name:'byCustId',
								xtype:'checkbox',anchor:'99%'};
								
	var ck4={boxLabel:'按入库单号分组',tabIndex:29,name:'byStorageNoteNo',
								xtype:'checkbox',anchor:'99%'};
								
	var clkpBlock=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',tabIndex:11,
		store:WHTStore.getBlock(),enableKeyEvents:true,itemSelector:'div.list-item',
		tpl:blockTpl,listWidth:400,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					f.clearValue();
					
				}
			},
			select:function(c,r,i){
				cboAreaName.setValue(r.get('areaName'));
				cboWarehouseName.setValue(r.get('warehouseName'));
			},
			keyup:{
				fn:function(f,e,t){
					WBlockLC(f,e,0,0,'','');
				},
				buffer:BF
			}
		}
	});

	
	var lkpCargoOwner=new Fos.CustomerLookup({fieldLabel:'货主',name:'owner',tabIndex:5,
		store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwner',
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custBookerFlag',
		displayField:'custNameCn',valueField:'custNameCn',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();
				custId='';									
			}},
		select:function(c,r,i){
				custId=r.get('id');								
		},
		keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}});
	
	var lkpCustomerLookup=new Fos.CustomerLookup({fieldLabel:'供应商',name:'custName',
		store:HTStore.getCS(),enableKeyEvents:true,ref:'../custName',
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'customerLookup',custType:'custBookerFlag',tabIndex:9,
		displayField:'custNameCn',valueField:'custNameCn',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();										
			}},
		select:function(c,r,i){		
			custId=r.get('id');
		},
		keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}});
	
	
	var txtProductNo=new Ext.form.TextField({fieldLabel:'生产编号',name:'productNo',tabIndex:12,anchor:'95%'});
	
	var cargoType=new Ext.form.ComboBox({fieldLabel:'产品类别',name:'cargoType',tabIndex:2,

		store:WHTStore.getWCargoCategory(),mode:'remote',displayField:'categoryName',valueField:'categoryName',
		itemselector:'div.list-item',listWidth:160,
		typeAhead:true,triggerAction:'all',
		selectOnFocus:true,anchor:'95%'
		});
	var cboWarehouseName=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',tabIndex:6,
		ref:'../warehouseName',store:warehouseStore,xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				
				warehouseId=r.get('id');
				
				clkpBlock.setValue('');
				clkpBlock.store.removeAll();
				cboAreaName.setValue('');
				cboAreaName.store.removeAll();
				cboAreaName.store.baseParams={_mt:'json',warehouseId:r.get('id')};
				cboAreaName.store.reload();
			},
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					warehouseId='';									
				}}
		}
	});
	
	var cboAreaName =new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',tabIndex:7,
		ref:'../areaName',store:areaStore,xtype:'combo',
		displayField:'areaName',valueField:'areaName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){							
				areaId=r.get('id');
				clkpBlock.setValue('');
				clkpBlock.store.removeAll();
				clkpBlock.store.baseParams={_mt:'json',warehouseId:warehouseId,areaId:r.get('id')};
				clkpBlock.store.reload();
			},
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					areaId='';									
				}
			}
		}
	});
	
	
	var lkcargoName=new Fos.CargoLookUp({fieldLabel:'商品',name:'cargoName',tabIndex:4,
    	xtype:'cargoLookUp',anchor:'95%',
    	store:WHTStore.getWCargo(),enableKeyEvents:true,
    	tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:C_LW,
    	displayField:'cargoName',valueField:'cargoName',
    	typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,
    	listeners:{scope:this,
    				blur:function(f){
						if(f.getRawValue()==''){
							f.clearValue();
							cargoId='';									
						}
					},
					select:function(c,r,i){
							cargoId=r.get('id');								
					},
					
    				keydown:{fn:function(f,e){
    							WCargoLC(f,e);
    							},buffer:BF
    				}
    	}
    });
	
	var dteStorageDateStart=new Ext.form.DateField({fieldLabel:'接单日期始',name:'storageDateStart',tabIndex:10,xtype:'datefield',
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',format:DATEF,anchor:'95%'});
	var dteStorageDateEnd=new Ext.form.DateField({fieldLabel:'接单日期止',name:'storageDateEnd',xtype:'datefield',tabIndex:11,
		altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',format:DATEF,anchor:'95%'});
	var txtOrderNo=new Ext.form.TextField({fieldLabel:'客户订单号',name:'orderNo',tabIndex:14,xtype:'textField',anchor:'95%'});
	var frm = new Ext.form.FormPanel({
		padding:5,
		title:'综合过滤条件',
		frame:true,height:130,collapsible:true,
		collapsed:true,
		labelWidth:80,labelAlign:'left',
		region:'north',layout:'column',
		items:[
		       {columnWidth:.25,layout:'form',border:false,items:[
		           lkpCargoOwner,
		           cboWarehouseName,
		           ck1]
		       },
		       {columnWidth:.25,layout:'form',border:false,items:[
		            lkpCustomerLookup,
		            cboAreaName,
		       		ck2 ]
		       },
		       {columnWidth:.25,layout:'form',border:false,items:[
					cargoType,
					clkpBlock,	
		            ck3 ]
		            },
		       {columnWidth:.25,layout:'form',border:false,items:[		            
		            txtOrderNo,		           
		            /*txtProductNo,*/
					ck4]}
				
			]
	});
	//打印输出
	this.exp=function()
	{
		var condition='&sort=id&dir=ASC';
		
		if(cargoId){
			condition+="&cargoId="+cargoId;
		}
		else{
			if(lkcargoName.getValue()){//商品
				condition+='&cargoName='+lkcargoName.getValue();
			}
		}
		if(custId){
			condition+="&custId="+custId;
		}
		if(lkpCustomerLookup.getValue()){
			condition+="&custName="+lkpCustomerLookup.getValue();
		}
		if(lkpCargoOwner.getValue()){//货主
			condition+='&owner='+lkpCargoOwner.getValue();
		}
		if(cboWarehouseName.getValue()){//仓库
			condition+='&warehouseName='+cboWarehouseName.getValue();
		}
		if(cboAreaName.getValue()){//库区
			condition+='&areaName='+cboAreaName.getValue();
		}
		if(clkpBlock.getValue()){//库位
			condition+='&clkpBlock='+clkpBlock.getValue();
		}
		
		if(dteStorageDateStart.getValue()){//接单日期始
			condition+='&storageDateStart='+dteStorageDateStart.value;
		}
		if(dteStorageDateEnd.getValue()){//接单日期止
			condition+='&storageDateEnd='+dteStorageDateEnd.value;
		}
		
		EXPC('INVENTOR',condition);
			 
	};
	
	this.exp1=function(){
		var url = REPORT_URL+'&__report=reports/wms_inventoryCargo.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE");
		if(cargoId){
			url+="&cargoId="+cargoId;
		}
		else{
			if(lkcargoName.getValue()){//商品
				url+='&cargoName='+lkcargoName.getValue();
			}
		}
		if(custId){
			url+="&custId="+custId;
		}
		if(lkpCustomerLookup.getValue()){
			url+="&custName="+lkpCustomerLookup.getValue();
		}
		if(lkpCargoOwner.getValue()){//货主
			url+='&owner='+lkpCargoOwner.getValue();
		}
		if(cboWarehouseName.getValue()){//仓库
			url+='&warehouseName='+cboWarehouseName.getValue();
		}
		if(cboAreaName.getValue()){//库区
			url+='&areaName='+cboAreaName.getValue();
		}
		if(clkpBlock.getValue()){//库位
			url+='&clkpBlock='+clkpBlock.getValue();
		}
		
		if(dteStorageDateStart.getValue()){//接单日期始
			url+='&storageDateStart='+dteStorageDateStart.value;
		}
		if(dteStorageDateEnd.getValue()){//接单日期止
			url+='&storageDateEnd='+dteStorageDateEnd.value;
		}
		window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};

	
	var refresh=function(){
		var a=[];
		var op=1;
		
		//这里需要说明的是，a数组中不仅加入了一般的查询条件，还加入了分组条件，当然，分组条件只是利用了
		//数组中key,value的格式写法，便于Dao层中可以解析分组条件。
		
		
		//货主条件
		var custName=lkpCustomerLookup.getValue();
		//如果有取到货主名称
		if(custName) {
			//如果有取到货主Id
			if(custId)
				//拼货主Id条件
				a[a.length] = new QParam({key:'custId',value:custId,op:op});
			else
				//拼货主名称条件
				a[a.length] = new QParam({key:'custName',value:custName,op:op});
		};
		
		
		
		//仓库条件
		var warehouseName=cboWarehouseName.getValue();
		//如是取到仓库名称
		if(warehouseName){
			//如果取到仓库id
			if(warehouseId)
				//拼仓库id条件
				a[a.length]=new QParam({key:'warehouseId',value:warehouseId,op:op});
			else
				//拼仓库名称条件
				a[a.length] = new QParam({key:'warehouseName',value:warehouseName,op:op});
		};
		
		//库区条件
		var areaName=cboAreaName.getValue();
		//如果取到库区名称
		if(areaName){
			//如果取到库区Id
			if(warehouseId)
				//拼库区Id条件
				a[a.length]=new QParam({key:'areaId',value:areaId,op:op});
			else
				//拼库区名称条件
				a[a.length] = new QParam({key:'areaName',value:areaName,op:op});
		};
		
		//库位条件
		var blockName=clkpBlock.getValue();
		
		//如果取到库位名称
		if(blockName){
			//如果取到库位id
			if(warehouseId)
				//拼库位Id条件
				a[a.length]=new QParam({key:'blockId',value:blockId,op:op});
			else
				//拼库位名称条件
				a[a.length] = new QParam({key:'blockName',value:blockName,op:op});
		};
		
		
		//商品名称条件
		var cargoName=lkcargoName.getValue();
		
		if (cargoName)
		{
			if (cargoId)
			{
				a[a.length]=new QParam({key:'cargoId',value:cargoId,op:op});
			
			}
			else
			{
				a[a.length]=new QParam({key:'cargoName',value:cargoName,op:op});
			}
		}
		
		//接单日期条件
		
		var storageDateStart=dteStorageDateStart.value;
		if (storageDateStart)
		{
			a[a.length]=new QParam({key:'storageDateStart',value:storageDateStart,op:GE});
		}
		
		var storageDateEnd=dteStorageDateEnd.value;
		if (storageDateEnd)
		{
			a[a.length]=new QParam({key:'storageDateEnd',value:storageDateEnd,op:LE});
		}
		
		
		//是入库的条件
		a[a.length]=new QParam({key:'storageType',value:0,op:op});
		
		//库位分组条件
		if (frm.find('name','byBlock')[0].getValue()==1)
		{
			a[a.length]=new QParam({key:'isGroup',value:'1',op:op});
			a[a.length]=new QParam({key:'BLOCK_ID',value:"BLOCK_ID",op:op});
			a[a.length]=new QParam({key:'BLOCK_CODE',value:"BLOCK_CODE",op:op});
			a[a.length]=new QParam({key:'BLOCK_NAME',value:"BLOCK_NAME",op:op});
		}
		
		//商品分组条件
		if (frm.find('name','byCargo')[0].getValue()==1)
		{
			a[a.length]=new QParam({key:'isGroup',value:'1',op:op});
			a[a.length]=new QParam({key:'CARGO_ID',value:"CARGO_ID",op:op});
			a[a.length]=new QParam({key:'CARGO_NAME',value:"CARGO_NAME",op:op});
		}
		
		//货主分组条件
		if (frm.find('name','byCustId')[0].getValue()==1)
		{
			a[a.length]=new QParam({key:'isGroup',value:'1',op:op});
			a[a.length]=new QParam({key:'CUST_ID',value:"CUST_ID",op:op});
			a[a.length]=new QParam({key:'CUST_NAME',value:"CUST_NAME",op:op});
			
		}
		
		//入库单号分组条件
		if (frm.find('name','byStorageNoteNo')[0].getValue()==1)
		{
			a[a.length]=new QParam({key:'isGroup',value:'1',op:op});
			a[a.length]=new QParam({key:'STORAGE_NOTE_NO',value:'STORAGE_NOTE_NO',op:op});
		}
		
		//store.baseParams={_mt:'xml',_A:'WINVENTORY_IQ',xml:HTUtil.HTX(HTUtil.QTX(a))};
		store.baseParams={_mt:'xml',_A:'Winventory_Qnew',xml:HTUtil.QATX(a)};
		store.reload({
			params:{start:0,limit:20},
			callback:function(r){
				if (r.length==0)
				{
					XMG.alert(SYS,M_NOT_FOUND);
				}
				else{
					tab.setActiveTab(grid);
				}
			}
		
		});
		
	};

	Fos.InventorySearchPanel.superclass.constructor.call(this,{
		id:'WMS-INVENTORY_SEARCH'+t,
		title:'库存查询',
		closable:true,layout:'border',
		tbar:
			[{text:'商品:'},lkcargoName,'-',{text:'接单时间从:'},dteStorageDateStart,{text:'至:'},dteStorageDateEnd,'-',{text:C_REFRESH,iconCls:'refresh',hidden:NR(M1_WMS+WM_NOTE+WMI_INVENTORY+WF_SEARCH),scope:this,handler:refresh},'-',	        
	        {text:C_EXPORT,iconCls:'print',ref:'../printBtn',scope:this,hidden:NR(M1_WMS+WM_NOTE+WMI_INVENTORY+WF_EXPORT),
	        	menu: {items: [{text:C_INVENTORY_REPORT,scope:this,handler:this.exp},
	        	               {text:'库存单新',scope:this,handler:this.exp1}
	        	]}}],
		items: [grid,frm]
		  //设置分页的工具条
		});
};
Ext.extend(Fos.InventorySearchPanel, Ext.Panel);


Fos.PalletPanel=function(t,b){
	
	var doc=new Ext.ux.IFrameComponent({id:'AC'+t, url:'',
		labeAction:'right',layout:'form',padding:5,height:500,width:1000});
	
	this.inPallet=function (n){
		var url = REPORT_URL;
		switch(t){
		case 1:
			url += '&__report=reports/wms_PalletInReport.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;			
		case 2:
			url += '&__report=reports/wms_PalletOutReport.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		case 3:
			url += '&__report=reports/wms_PalletInventoryReport.rptdesign&compCode='+sessionStorage.getItem("COMP_CODE");
			break;
		default:
			break;
		}
		if(fromDate.getValue()){
			url+=' &startDate='+fromDate.value;
		}
		if(toDate.getValue()){
			url+=' &endDate='+toDate.value;
		}
		if(n=='S'){
			Ext.get('IF_AC'+t).dom.src=url;
		}
		else{
			url+="&__format=xls";
			window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
			
		}
		
	};
	
	var fromDate=new Ext.form.DateField({fieldLabel:'起始时间',
		format:DATEF,altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
		anchor:'95%'
	});
	
    var toDate=new Ext.form.DateField({fieldLabel:'截止时间',
		format:DATEF,altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
		anchor:'95%'
    });
 
	var btnPalletInExcel={text:'输出',iconCls:'print',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT),
	    	scope:this,handler:function(){this.inPallet('E');}};
	
	var btnPalletIn={text:'生成报表',iconCls:'stats',scope:this,hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_EXPORT),
			handler:function(){this.inPallet('S');}};
	
	Fos.PalletPanel.superclass.constructor.call(this,{
		id:'PalletPanel'+t,title:b,
		closable:true,layout:'form',
		tbar:[{xtype:'tbtext',text:'日  期:'},'-',fromDate,'-',toDate,'-',
		      btnPalletIn,'-',btnPalletInExcel],
		items: [doc]
		});
};
Ext.extend(Fos.PalletPanel, Ext.Panel);


Fos.InventoryBusinessTab=function(){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WPLACED_CARGO_QA'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPlacedCargo',idProperty:'id'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	    {header:"行跟踪号",dataIndex:'id',align:'center'},
	    {header:"货物编号",dataIndex:'skuNo',align:'center'},
	    {header:W_CARGO_NAME,dataIndex:'cargoName',align:'center',width:150},
	    {header:'业务单号',dataIndex:'storageNoteNo',width:120,align:'center'},
	    {header:'生产编号',dataIndex:'productNo',align:'center',width:80}, 	
	    {header:'状态',dataIndex:'status',renderer:WHTStore.getInWarehouseNoteStatus,width:80},
	    {header:'行状态',dataIndex:'removed',renderer:WHTStore.getRemoved,width:80},
	    {header:"库位",dataIndex:'blockName',align:'center',width:80}, 
	    {header:'原EA',dataIndex:'quantity',align:'center',renderer:HTUtil.round2,width:80},
	    {header:'上架EA',dataIndex:'placedQuantity',align:'center',renderer:HTUtil.round2,width:80},
	    {header:'分配EA',dataIndex:'distQuantity',align:'center',renderer:HTUtil.round2,width:80},
	    {header:'拣货EA',dataIndex:'pickedQuantity',align:'center',renderer:HTUtil.round2,width:80},
	    {header:'EA单位',dataIndex:'unitName',align:'center',width:80},	
	    {header:'件数',dataIndex:'packages',align:'center',renderer:HTUtil.round2,width:80},
	    {header:'件数单位',dataIndex:'pUnitName',align:'center',width:80},	
	    {header:'上架时间',dataIndex:'placedDate',align:'center',width:100},
	    {header:'源库位',dataIndex:'fromBlockName',align:'center',width:80},	
	    {header:'移库时间',dataIndex:'changeDate',align:'center',width:100},
	    {header:'操作人',dataIndex:'modifyBy',align:'center',width:80},
	    {header:'修改时间',dataIndex:'modifyTime',align:'center',renderer:formatDate,width:90},
	    {header:'净重',dataIndex:'netWeight',align:'center',renderer:HTUtil.round2,width:80},
	    {header:'毛重',dataIndex:'grossWeight',align:'center',renderer:HTUtil.round2,width:80},	   
	    {header:'重量单位',dataIndex:'wUnitName',align:'center',width:80},
	    {header:'体积',dataIndex:'volume',align:'center',renderer:HTUtil.round4,width:80},
	    {header:'面积单位',dataIndex:'vUnitName',align:'center',width:80},
	    {header:'面积',dataIndex:'measure',align:'center',renderer:HTUtil.round2,width:80},
	    {header:'面积单位',dataIndex:'mUnitName',align:'center',width:80},	 
	    {header:'委托编号',dataIndex:'entrustNo',align:'center',width:80}, 
	    {header:'订单号',dataIndex:'orderNo',align:'center',width:80},
	    {header:'商品类别',dataIndex:'cargoCategory',align:'center',width:80},
	    {header:'批次',dataIndex:'batchNo',align:'center',width:80}
	    ],defaults:{sortable:true,width:100}});
	
	var grid=new Ext.grid.GridPanel({
    	iconCls:'gen',title:W_STORAGE_DETAIL,layout:'fit',region:'center',
    	closable:false,store:store,sm:sm,cm:cm,
		bbar:PTB(store,15)
	});
	
	var txtStorageNoteNo=new Ext.form.TextField({fieldLabel:'业务单号'});
	var txtProductNo=new Ext.form.TextField({fieldLabel:'生产编号'});
	var txtSkuNo=new Ext.form.TextField({fieldLabel:'SkuNo'});
	var txtBlockName=new Ext.form.TextField({fieldLabel:'库位名称'});
	
	var frm = new Ext.form.FormPanel({
		padding:5,
		title:'综合过滤条件',
		frame:true,height:100,collapsible:true,
		collapsed:false,
		labelWidth:80,labelAlign:'left',
		region:'north',layout:'column',
		items:[
		       {columnWidth:.5,layout:'form',border:false,items:[
		           txtStorageNoteNo/*,
		           txtProductNo*/]
		       },
		       {columnWidth:.5,layout:'form',border:false,items:[
		            txtSkuNo,
		            txtBlockName]
		       }
				
			]
	});
	var refresh=function(){
		var a=[];
		
		//这里需要说明的是，a数组中不仅加入了一般的查询条件，还加入了分组条件，当然，分组条件只是利用了
		//数组中key,value的格式写法，便于Dao层中可以解析分组条件。
		//如果取到库位名称
		if(txtStorageNoteNo.getValue()){
			//如果取到库位id
				a[a.length] = new QParam({key:'storageNoteNo',value:txtStorageNoteNo.getValue(),op:LI});
		};
		/*
		if(txtProductNo.getValue()){
			//如果取到库位id
				a[a.length] = new QParam({key:'productNo',value:txtProductNo.getValue(),op:LI});
		};*/
		
		//如果取到库位名称
		if(txtBlockName.getValue()){
			//如果取到库位id
				a[a.length] = new QParam({key:'blockName',value:txtBlockName.getValue(),op:LI});
		};
		
		
		
		if (txtSkuNo.getValue())
		{
			a[a.length]=new QParam({key:'skuNo',value:txtSkuNo.getValue(),op:LI});
			
		}
		
		//接单日期条件
		if(a.length>0)
		{
			store.baseParams={_mt:'xml',_A:'WPLACED_CARGO_QA',xml:HTUtil.QATX(a)};
			store.load({
				params:{start:0,limit:15},
				callback:function(){				
				}		
			});
		}
		else{
			XMG.alert(SYS,'请输入条件！');
		}
			
	};
	
	Fos.InventoryBusinessTab.superclass.constructor.call(this,{
		id:'InventoryBusiness',title:'库存交易',
		closable:true,layout:'border',
		tbar:[{text:C_REFRESH,iconCls:'refresh',scope:this,handler:refresh}],
		items: [frm,grid]
		});
};
Ext.extend(Fos.InventoryBusinessTab, Ext.Panel);