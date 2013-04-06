Fos.QCPanel = function(storageNoteNo,storageNoteId) {
    
	//根据传参进来的仓单号与入库单ID,检索入库单，将入库单的内空传值给
	var storeNote=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'WSTORAGE_NOTE_Q',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',id:'id'}, WStorageNote),
		remoteSort:true,sortInfo:{field:'id',direction:'desc'}
		});
	
	
	
	var store=new Ext.data.Store({url:SERVICE_URL+'?_A=WUALITY_CONTROL_ITEM_Q',baseParams:{_mt:'xml'},
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WQualityControlItem',id:'id'},WQualityControlItem),
    	remoteSort:true,sortInfo:{field:'id',direction:'desc'}});
	
    var store2=new Ext.data.Store({url:SERVICE_URL+'?_A=WUALITY_CONTROL_ITEM_Q',baseParams:{_mt:'xml'},
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WQualityControlItem',id:'id'},WQualityControlItem),
    	remoteSort:true,sortInfo:{field:'id',direction:'desc'}});
   // store.load();
    //
    if(storageNoteId){
		storeNote.load({params:{start:0,limit:C_PS20,storageNoteId:storageNoteId}});
		store.load({params:{storageNoteId:storageNoteId}});
	}
	
	var p_Note=new WStorageNote();
	if(storeNote.getCount()>0){
		alert("lenght="+storeNote.getCount());
		p_Note=storeNote.getAt(0);
	}
	else{
		alert("storeNote.lenght=0");
	}
	
   /* var storageNoteNo=new Fos.StorageNoteLookUp({fieldLabel:'入库单号',name:'storageNoteNo',
		store:WHTStore.getQualityControl(),enableKeyEvents:true,anchor:'95%',
		tpl:goodsTpl,itemSelector:'div.list-item',listWidth:C_LW,status:'status',
		xtype:'receivedLookup',
		displayField:'storageNoteNo',valueField:'storageNoteNo',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
				}},
				select:function(c,r,i){
				var storageNoteNo=basepan.find('name','storageNoteNo');
				if(storageNoteNo){
					storageNoteNo[0].setValue(r.get('storageNoteNo'));
					orderNo.setValue(r.get('orderNo'));
					cargoOwnerName.setValue(r.get('cargoOwnerName'));
					store.load({params:{storageNoteNo:r.get('storageNoteNo'),start:0,limit:C_PS20}});
				}},
				keydown:{fn:function(f,e){QualityControlList(f,e,1);},buffer:600}}
});*/
	var storageNoteNo=new Ext.form.TextField({fieldLabel:'入库单号',name:'storageNoteNo',value:p_Note.get('storageNoteNo'),anchor:'95%'});
	//
	var orderNo=new Ext.form.TextField({fieldLabel:'订单号',name:'orderNo',anchor:'95%',value:p_Note.get('orderNo')});
	//
	var cargoOwnerName=new Ext.form.TextField({fieldLabel:'货主',name:'cargoOwnerName',anchor:'95%',value:p_Note.get('cargoOwnerName')});
	
	
	var base=new Ext.Panel({title:'基本信息',region:'north',frame:false,border:false,
    	height:80,padding:5,layout:'column',layoutConfig:{columns:3},
		items:[
		       {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
		    	   items:[storageNoteNo]},
		       {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
			   	   items:[orderNo]}, 
			   {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
				   items:[cargoOwnerName]}
		       ]
	});
	//
	var cargoName=new Ext.form.TextField({fieldLabel:'货物名称',name:'cargoName',anchor:'95%'});
	//
	var skuNO=new Ext.form.TextField({fieldLabel:'货物编号',name:'skuNO',anchor:'95%'});
	//
	var cargoType=new Ext.form.TextField({fieldLabel:'货物型号',name:'cargoType',anchor:'95%'});
	//
	var specification=new Ext.form.TextField({fieldLabel:'货物规格',name:'specification',anchor:'95%'});
	//
	var cargoColor=new Ext.form.TextField({fieldLabel:'货物颜色',name:'cargoColor',anchor:'95%'});
	//
	var qualityType=new Ext.form.TextField({fieldLabel:'品质',name:'qualityType',anchor:'95%'});
	//
	var qaFlagType=new Ext.form.TextField({fieldLabel:'质检状态',name:'qaFlagType',anchor:'95%'});
	//
	var qaFlagOperatorName=new Ext.form.TextField({fieldLabel:'操作人',name:'qaFlagOperatorName',anchor:'95%'});

	
	var basetop=new Ext.form.FieldSet({titel:'货物信息',autoHeight:true,columnWidth:1,layout:'column',border:true,
		anchor:'95%',labelWidth:70,
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
	var qaFlagPackages=new Ext.form.TextField({fieldLabel:'货物件数',name:'qaFlagPackages',anchor:'95%'});
	//
	var qaFlagPackagesUnit=new Ext.form.TextField({fieldLabel:'件数单位',name:'qaFlagPackagesUnit',anchor:'95%'});
	//
	var qaFlagGrossWeight=new Ext.form.TextField({fieldLabel:'货物毛重',name:'qaFlagGrossWeight',anchor:'95%'});
	//
	var qaFlagWeightUnit=new Ext.form.TextField({fieldLabel:'毛重单位',name:'qaFlagWeightUnit',anchor:'95%'});
	//
	var qaFlagVolume=new Ext.form.TextField({fieldLabel:'货物体积',name:'qaFlagVolume',anchor:'95%'});
	//
	var qaFlagVolumeUnit=new Ext.form.TextField({fieldLabel:'体积单位',name:'qaFlagVolumeUnit',anchor:'95%'});
	//
	var quantity=new Ext.form.TextField({fieldLabel:'货物数量',name:'quantity',anchor:'95%'});
	//
	var qaFlagQuantityUnit=new Ext.form.TextField({fieldLabel:'数量单位',name:'qaFlagQuantityUnit',anchor:'95%'});
	//
	var qaFlagQuantity=new Ext.form.TextField({fieldLabel:'质检数量',name:'qaFlagQuantity',anchor:'95%'});
	//
	var qaFlagCasingQuantity=new Ext.form.TextField({fieldLabel:'质检包装数',name:'qaFlagCasingQuantity',anchor:'95%'});
	//
	var qaFlagCasingUnit=new Ext.form.TextField({fieldLabel:'质检包装单位',name:'qaFlagCasingUnit',anchor:'95%'});
	//
	var warehouseName=new Ext.form.TextField({fieldLabel:'仓库名称',name:'warehouseName',anchor:'95%'});
	//
	var areaName=new Ext.form.TextField({fieldLabel:'库区名称',name:'areaName',anchor:'95%'});
	//
	var blockName=new Ext.form.TextField({fieldLabel:'库位名称',name:'blockName',anchor:'95%'});
	//
	var trayType=new Ext.form.TextField({fieldLabel:'托盘类型',name:'trayType',anchor:'95%'});
	//
	var trayQuantity=new Ext.form.TextField({fieldLabel:'托盘数量',name:'trayQuantity',anchor:'95%'});
	
	
	var basebottom=new Ext.form.FieldSet({title:'质检信息',autoHeight:true,columnWidth:1,layout:'column',border:true,
			anchor:'95%',labelWidth:70,
			items:[ {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
		    	   items:[qaFlagQuantity,areaName]},
			       {columnWidth:0.25,labelAlign:'right',labelWidth:80,layout:'form',border:false,
				   	   items:[qaFlagCasingQuantity,warehouseName]},
				   {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
					   items:[trayQuantity,blockName]}, 
				   {columnWidth:0.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,
					   items:[trayType,qaFlagCasingUnit]}
					   ]
	});
	
	
	
	var basetall=new Ext.form.FieldSet({title:'数量信息',autoHeight:true,columnWidth:1,layout:'column',border:true,
		anchor:'95%',labelWidth:70,
		items:[{columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
		    	   items:[quantity,qaFlagGrossWeight]},
		       {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
			   	   items:[qaFlagQuantityUnit,qaFlagWeightUnit]},
			   {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
				   items:[qaFlagPackages,qaFlagVolume]}, 
			   {columnWidth:0.25,labelAlign:'right',labelWidth:70,layout:'form',border:false,
				   items:[qaFlagPackagesUnit,qaFlagVolumeUnit]}]});
	
	 var messagepan = new Ext.Panel({region:'center',layout:'form',border:true,padding:2,height:400,width:600,
	    	items:[basetop,basetall,basebottom]}
	    );

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
				if(basepan.getForm().isDirty()){
					record.beginEdit();
					basepan.getForm().updateRecord(record);
					record.endEdit();
				}
			}};
	
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:'入库单号',dataIndex:'storageNoteNo',width:120},
	{header:'货物编号',dataIndex:'skuNO',width:80}
    ],defaults:{sortable:true,width:60}});
    
    
    var baseGrid = new Ext.grid.GridPanel({title:'质检列表',
	    region:'west',width:400,height:400,autoScroll:true,
	    split:true,iconCls:'gen',autoScroll:true,
		store:store,sm:sm,cm:cm
	    });
    
   
    
    var minutepan = new Ext.form.FormPanel({title:'详细信息',region:'center',layout:'border',
    	frame:false,border:false,
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../btnAdd',scope:this},'-',
	        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',scope:this},'-',
	        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',scope:this}],
    	items:[baseGrid,messagepan]
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
		}else{
			var storageNoteNo = basepan.find('name','storageNoteNo');
			if(storageNoteNo){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WUALITY_CONTROL_ITEM_U',storageNoteNo:storageNoteNo},
					success: function(r){
						store.load();
						XMG.alert(SYS,"下推成功！");
					},
					failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
					xmlData:HTUtil.HTX(xml)});
			}
		}
		
	};
    
    Fos.QCPanel.superclass.constructor.call(this,{id:'QUALITY_CONTROL_LIST',iconCls:'gen',title:'质检列表',
		closable:true,			
		layout:'border',
		tbar:[{text:' 下 推',iconCls:'redo',scope:this,handler:this.inspect},'-',
 	        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',scope:this},'-',
	        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',scope:this}],width:1800,
		items:[base,minutepan]
		
	    });
};
Ext.extend(Fos.QCPanel, Ext.Panel);

////////////////////////////////////////////////////////////////////////////////////////

Fos.WQCGrid=function(){
	var store=new Ext.data.Store({url:SERVICE_URL+'?_A=WUALITY_CONTROL_ITEM_Q',baseParams:{_mt:'xml'},
    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WQualityControlItem',id:'id'},WQualityControlItem),
    	remoteSort:true,sortInfo:{field:'id',direction:'desc'}});
	store.load({params:{start:0,limit:C_PS20}});
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
          	{header:'入库单号',dataIndex:'storageNoteNo'},
          	{header:'货主',width:120,dataIndex:'cargoOwnerName'},
          	{header:'货物编号',dataIndex:'skuNo'},
          	{header:'货物名称',dataIndex:'cargoName'}
              ],defaults:{sortable:true,width:100}});
    
    var edit=function(){
    	var p = sm.getSelected();
    	
    	if(p){
    		var storageNoteNo=p.get('storageNoteNo');
    		var storageNoteId=p.get('storageNoteId');
    		var tab = this.ownerCt;
    		var c = 'QC_PANEL_'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.QCPanel(storageNoteNo,storageNoteId)));
    	}
    };
    
    var remove=function(){
    	
    };
    
  
    //编辑
    var btnEdit=new Ext.Button({text:C_EDIT,iconCls:'option',ref:'../btnEdit',disabled:NR(M1_WMS),scope:this,handler:edit});
    //删除
    var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',disabled:NR(M1_WMS),scope:this,handler:remove});
    
    Fos.WQCGrid.superclass.constructor.call(this,{id:'QC_LIST',
        	iconCls:'gen',title:'质检单列表',
        	closable:true,store:store,sm:sm,cm:cm,
        	listeners:{scope:this,
        		rowdblclick: function(grid, rowIndex, event){
        			edit();
        		}
        	},
        	loadMask: true,
        	bbar:PTB(store,20),
        	tbar:[
        	        btnEdit,'-',
        	        btnRemove
        	        ]
        });
};
Ext.extend(Fos.WQCGrid, Ext.grid.GridPanel);

