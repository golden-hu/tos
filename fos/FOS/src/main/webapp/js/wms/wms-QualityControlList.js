Fos.QualityControlPanel = function() {
    
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库区数据
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库位数据
	var blockStore = new Ext.data.Store({url:SERVICE_URL+'?_A=BLOCK_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WBlock',id:'id'},WBlock),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var store=new Ext.data.Store({url:SERVICE_URL+'?_A=WUALITY_CONTROL_ITEM_Q',baseParams:{_mt:'xml'},
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WQualityControlItem',id:'id'},WQualityControlItem),
    	remoteSort:true,sortInfo:{field:'id',direction:'desc'}});
	
   store.load({params:{start:0,limit:C_PS20}});
    //
    var storageNoteNo=new Fos.StorageNoteLookUp({fieldLabel:'入库单号',name:'storageNoteNo',
		store:WHTStore.getQualityControl(),enableKeyEvents:true,anchor:'95%',tabIndex:1,
		tpl:goodsTpl,itemSelector:'div.list-item',listWidth:C_LW,
		xtype:'receivedLookup',
		displayField:'storageNoteNo',valueField:'storageNoteNo',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
				}},
				select:function(c,r,i){
				var storageNoteNo=base.find('name','storageNoteNo');
				if(storageNoteNo){
					storageNoteNo[0].setValue(r.get('storageNoteNo'));
					orderNo.setValue(r.get('orderNo'));
					cargoOwnerName.setValue(r.get('cargoOwnerName'));
					store.load({params:{storageNoteNo:r.get('storageNoteNo'),start:0,limit:C_PS20}});
				}},
				keydown:{fn:function(f,e){QualityControlList(f,e,1);},buffer:600}}
});
	//
	var orderNo=new Ext.form.TextField({fieldLabel:'订单号',name:'orderNo',tabIndex:2,anchor:'95%'});
	//
	var cargoOwnerName=new Ext.form.TextField({fieldLabel:'货主',name:'cargoOwnerName',tabIndex:3,anchor:'95%'});
	
	
	var base=new Ext.form.FormPanel({region:'north',frame:false,border:false,
    	height:110,padding:5,layout:'column',layoutConfig:{columns:3},
		items:[
		       {columnWidth:0.3,labelAlign:'right',labelWidth:70,layout:'form',border:false,
		    	   items:[storageNoteNo]},
		       {columnWidth:0.3,labelAlign:'right',labelWidth:70,layout:'form',border:false,
			   	   items:[orderNo]}, 
			   {columnWidth:0.3,labelAlign:'right',labelWidth:70,layout:'form',border:false,
				   items:[cargoOwnerName]}
		       ]
	});
	//
	var cargoName=new Ext.form.TextField({fieldLabel:'货物名称',name:'cargoName',tabIndex:4,anchor:'95%'});
	//
	var skuNO=new Ext.form.TextField({fieldLabel:'货物编号',name:'skuNO',tabIndex:8,anchor:'95%'});
	//
	var cargoType=new Ext.form.TextField({fieldLabel:'货物型号',name:'cargoType',tabIndex:5,anchor:'95%'});
	//
	var specification=new Ext.form.TextField({fieldLabel:'货物规格',name:'specification',tabIndex:10,anchor:'95%'});
	//
	var cargoColor=new Ext.form.TextField({fieldLabel:'货物颜色',name:'cargoColor',tabIndex:9,anchor:'95%'});
	//
	var qaFlagType=new Ext.form.ComboBox({fieldLabel:'质检状态',name:'qaFlagType',tabIndex:6,store:WHTStore.QUALITY_TYPE,
		mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',displayField:'NAME',valueField:'CODE',triggerAction: 'all',
		selectOnFocus:true,anchor:'95%'});
	//
	var qualityType=new Ext.form.ComboBox({fieldLabel:'品质',name:'qualityType',tabIndex:7,store:WHTStore.QUALITY_CONTUOL,
		mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',displayField:'NAME',valueField:'CODE',triggerAction: 'all',
		selectOnFocus:true,anchor:'95%',listeners:{
			scope:this,select:function(c,r,i){
				qaFlagType.setValue(WHTStore.getNameById(WHTStore.QUALITY_TYPE,0));
			}
		}
	});
	//
	var qaFlagOperatorName=new Ext.form.ComboBox({fieldLabel:'操作员',tabIndex:11,
		name:'qaFlagOperatorName',
		store:HTStore.getOP_S(),xtype:'combo',displayField:'userName',valueField:'userName',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'
	});

	var basetop=new Ext.form.FieldSet({region:'north',autoHeight:true,columnWidth:1,frame:false,border:true,layout:'column',layoutConfig:{columns:4},
		items:[
		       {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
		    	   items:[cargoName,skuNO]},
		       {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
			   	   items:[cargoType,cargoColor]},
			   {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
				   items:[qaFlagType,specification]}, 
			   {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
				   items:[qualityType,qaFlagOperatorName]}
		       ]
	});
	//
	var qaFlagPackages=new Ext.form.TextField({fieldLabel:'货物件数',tabIndex:14,name:'qaFlagPackages',anchor:'95%'});
	//
	var qaFlagPackagesUnit=new Ext.form.ComboBox({fieldLabel:'件数单位',name:'qaFlagPackagesUnit',tabIndex:15,displayField:'unitName',valueField:'unitName',triggerAction:'all',
        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%'});
	//
	var qaFlagGrossWeight=new Ext.form.TextField({fieldLabel:'货物毛重',name:'qaFlagGrossWeight',tabIndex:16,anchor:'95%'});
	//
	var qaFlagWeightUnit=new Ext.form.ComboBox({fieldLabel:'毛重单位',name:'qaFlagWeightUnit',tabIndex:17,store:WHTStore.WEIGHT_UNIT,triggerAction:'all',
		mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',displayField:'NAME',valueField:'CODE',anchor:'95%'});
	//
	var qaFlagVolume=new Ext.form.TextField({fieldLabel:'货物体积',name:'qaFlagVolume',tabIndex:18,anchor:'95%'});
	//
	var qaFlagVolumeUnit=new Ext.form.ComboBox({fieldLabel:'体积单位',name:'qaFlagVolumeUnit',tabIndex:19,store:WHTStore.VOLUME_UNIT,triggerAction:'all',
		mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',displayField:'NAME',valueField:'CODE',anchor:'95%'});
	//
	var quantity=new Ext.form.TextField({fieldLabel:'货物数量',name:'quantity',tabIndex:12,anchor:'95%'});
	//
	var qaFlagQuantityUnit=new Ext.form.ComboBox({fieldLabel:'数量单位',name:'qaFlagQuantityUnit',tabIndex:13,displayField:'unitName',valueField:'unitName',triggerAction:'all',
        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%'});
	//
	var qaFlagQuantity=new Ext.form.TextField({fieldLabel:'质检数量',name:'qaFlagQuantity',tabIndex:20,anchor:'95%'});
	//
	var qaFlagCasingQuantity=new Ext.form.TextField({fieldLabel:'质检包装数',name:'qaFlagCasingQuantity',tabIndex:21,anchor:'95%'});
	//
	var qaFlagCasingUnit=new Ext.form.TextField({fieldLabel:'质检包装单位',name:'qaFlagCasingUnit',tabIndex:27,anchor:'95%'});
	//
	var warehouseName=new Ext.form.ComboBox({fieldLabel:'仓库名称',name:'warehouseName',tabIndex:24,
		store:warehouseStore,displayField:'warehouseName',valueField:'warehouseName',typeAhead:true,
		mode:'remote',triggerAction:'all',selectOnFocus:true,listeners:{
			scope:this,select:function(c,r,i){
				areaStore.load({params:{warehouseId:r.get('id')}});
			}
		},
		anchor:'95%'});
	//
	var areaName=new Ext.form.ComboBox({fieldLabel:'库区名称',name:'areaName',tabIndex:25,triggerAction:'all',
		store:areaStore,displayField:'areaName',valueField:'areaName',selectOnFocus:true,mode:'remote',typeAhead:false,
		listeners:{
			scope:this,select:function(c,r,i){
				blockStore.load({params:{areaId:r.get('id')}});
			}
		},
		anchor:'95%'});
	//
	var blockName=new Ext.form.ComboBox({fieldLabel:'库位名称',name:'blockName',triggerAction:'all',tabIndex:26,
		store:blockStore,mode:'remote',displayField:'blockName',valueField:'blockName',typeAhead:false,selectOnFocus:true,
		anchor:'95%'});
	//
	var trayType=new Ext.form.ComboBox({fieldLabel:'托盘类型',name:'trayType',tabIndex:23,store:WHTStore.TRAY_TYPE,triggerAction:'all',
		mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',displayField:'NAME',valueField:'CODE',anchor:'95%'});
	//
	var trayQuantity=new Ext.form.TextField({fieldLabel:'托盘数量',name:'trayQuantity',tabIndex:22,anchor:'95%'});
	
	var basebottom=new Ext.form.FieldSet({region:'center',autoHeight:true,columnWidth:1,frame:false,border:true,layout:'column',layoutConfig:{columns:4},
		items:[
		       {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
		    	   items:[qaFlagQuantity,warehouseName]},
		       {columnWidth:0.25,labelAlign:'right',labelWidth:80,layout:'form',border:false,
			   	   items:[qaFlagCasingQuantity,areaName]},
			   {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
				   items:[trayQuantity,blockName]}, 
			   {columnWidth:0.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,
				   items:[trayType,qaFlagCasingUnit]}
		       ]
	});
	
	var basetall=new Ext.form.FieldSet({region:'center',autoHeight:true,columnWidth:1,frame:false,border:true,layout:'column',layoutConfig:{columns:4},
		items:[
		       {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
		    	   items:[quantity,qaFlagGrossWeight]},
		       {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
			   	   items:[qaFlagQuantityUnit,qaFlagWeightUnit]},
			   {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
				   items:[qaFlagPackages,qaFlagVolume]}, 
			   {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
				   items:[qaFlagPackagesUnit,qaFlagVolumeUnit]}
		       ]
	});
	var re={scope:this,
			rowselect:function(sm,row,record){
				if(this.sel!=record.get('id')){
					this.sel=record.get('id');
					minutepan.getForm().reset();
					minutepan.getForm().loadRecord(record);
					b=null;
					b=record;
					puuid='';
					puuid=record.get('uuid');
				}},
			rowdeselect:function(sm,row,record){
				if(minutepan.getForm().isDirty()){
					record.beginEdit();
					minutepan.getForm().updateRecord(record);
					record.endEdit();
				}
				if(base.getForm().isDirty()){
					record.beginEdit();
					base.getForm().updateRecord(record);
					record.endEdit();
				}
			}};
	
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:'入库单号',dataIndex:'storageNoteNo',width:120},
	{header:'货物编号',dataIndex:'skuNO',width:80}
    ],defaults:{sortable:true,width:60}});
    
    
    var baseGrid = new Ext.grid.GridPanel({title:'质检列表',
	    region:'west',width:200,height:400,
	    split:true,iconCls:'gen',autoScroll:true,
		store:store,sm:sm,cm:cm
	    });
	
    var messagepan = new Ext.Panel({items:[basetop,basetall,basebottom],frame:false,border:false,padding:8,height:400});
    
    var minutepan = new Ext.form.FormPanel({title:'详细信息',region:'center',layout:'column',
    	frame:false,border:false,
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../btnAdd',scope:this},'-',
	        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',scope:this},'-',
	        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',scope:this}],
    	items:[
    	       {columnWidth:0.15,layout:'form',border:false,
		    	   items:[baseGrid]},
		       {columnWidth:0.85,layout:'form',border:false,
			   	   items:[messagepan]}
			 ]
    	});
    
	this.inspect=function(){
		var select=sm.getSelections();
		var xml='';
		if(select){
			xml=HTUtil.ATX(select,'WQualityControlItem',WQualityControlItem);
			if(xml){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WUALITY_CONTROL_ITEM_U'},
				success: function(r){
					store.load();
					XMG.alert(SYS,"质检成功！");
				},
				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)});
			}
		}
	};
    
    Fos.QualityControlPanel.superclass.constructor.call(this,{id:'QUALITY_CONTROL_LIST',iconCls:'gen',title:'质检列表',
		closable:true,			
		layout:'border',
		tbar:[{text:' 下 推',iconCls:'redo',scope:this,handler:this.inspect},'-',
 	        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',scope:this},'-',
	        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',scope:this}],width:1800,
		items:[base,minutepan]
		
	    });
};
Ext.extend(Fos.QualityControlPanel, Ext.Panel);

