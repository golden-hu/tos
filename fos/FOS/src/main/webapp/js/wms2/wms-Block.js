///构建库位界面维护的panel，因为这是是一个左边是树，右边是grid的结构，所以这里是panel
Fos.BlockPanel = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=BLOCK_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WBlock',id:'id'},WBlock),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    
    
    var root=new Ext.tree.TreeNode({text:C_BULK,leaf:false});
    var tree = new Ext.tree.TreePanel({title:C_AREA,rootVisible:false,
    	region:"west",width:"130",collapsible:true,collapseMode:'mini',split:true,
		animate:true,enableDD:false,autoScroll:true,containerScroll:true,root:root
	});
    
    areaStore.load({scope:this,callback:function(r,o,s){
		if(r.length){
    		for(var i=0;i<r.length;i++){
    			
    			var node = tree.getNodeById("W_"+r[i].get('warehouseId'));
    			var warehouseName=r[i].get('warehouseName');
    			var areaName=r[i].get('areaName');
    			
    		
    			if(!node){
    				node = new Ext.tree.TreeNode({text:warehouseName,id:'W_'+r[i].get('warehouseId'),leaf:false,
    					listeners:{scope:this,
                		click:function(n,e){
                			
                			store.removeAll(); 
                			grid.setTitle(C_BLOCK_LIST);
                			grid.btnAdd.setDisabled(true);
                			grid.btnEdit.setDisabled(true);
                			grid.btnRemove.setDisabled(true);
                		}
                	}
    				});
    			}
                var anode = new Ext.tree.TreeNode({text:areaName,id:r[i].get('id'),leaf:true,
                	listeners:{scope:this,
                		click:function(n,e){
                			
                			store.removeAll();
                			store.load({params:{warehouseId:n.parentNode.id.substring(2),areaId:n.id}});
                			grid.setTitle(C_BLOCK_LIST+" ["+n.parentNode.text+"-"+n.text+"]");
                			grid.btnAdd.setDisabled(false);
                			grid.btnEdit.setDisabled(false);
                			grid.btnRemove.setDisabled(false);
                		}
                	}
                });
                node.appendChild(anode);
                root.appendChild(node);
    		}
		}}});
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_BLOCK_CODE,dataIndex:'blockCode'},
	{header:C_BLOCK_NAME,width:120,dataIndex:'blockName'},
	{header:C_IN_AREA_NAME,dataIndex:'inAreaName'},	
	{header:C_OUT_AREA_NAME,dataIndex:'outAreaName'},
	{header:C_BLOCK_TYPE,dataIndex:'blockType',renderer:HTStore.getWAREHOUSE_TYPE},
	{header:C_BLOCK_GROUP,dataIndex:'blockGroup'},
	{header:C_BLOCK_LENGTH,dataIndex:'blockLength'},
	{header:C_BLOCK_WIDTH,dataIndex:'blockWidth'},
	{header:C_BLOCK_HEIGHT,dataIndex:'blockHeight'},
	{header:C_BLOCK_ROW,dataIndex:'blockRow'},
	{header:C_BLOCK_COL,dataIndex:'blockCol'},
	{header:C_MAX_WEIGHT,dataIndex:'maxWeight'},
	{header:C_MAX_QUANTITY,dataIndex:'maxQuantity'},
	{header:C_MAX_VOLUME,dataIndex:'maxVolume'},
	{header:C_MAX_PALLET,dataIndex:'maxPallet'}
    ],defaults:{sortable:true,width:100}});    
    
    var addBlock=function(){
    	
    	var n = tree.getSelectionModel().getSelectedNode();
    	if(n){
    		var areaId = n.id;
    		var area = areaStore.getById(areaId);
    		var p = new WBlock({uuid:HTUtil.UUID(32),
    			warehouseId:area.get('warehouseId'),
    			warehouseCode:area.get('warehouseCode'),
    			warehouseName:area.get('warehouseName'),
    			areaId:area.get('id'),
    			areaCode:area.get('areaCode'),
    			areaName:area.get('areaName'),
    			rowAction:'N'});
            var win = new Fos.BlockWin(p,store);
            win.show();
    	}
    };
    var eidtBlock=function(){
    	var b =sm.getSelected();
		if(b){
			var win = new Fos.BlockWin(b,store);
	        win.show();
		}
    };
    var deleteBlock=function(){
    	var b =sm.getSelected();
		if(b){
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'WBlock');
	        		HTUtil.REQUEST('BLOCK_S', xml, function(){store.remove(b);});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
    };
    
    var grid = new Ext.grid.GridPanel({iconCls:'gen',title:C_BLOCK_LIST,region:"center",
	store:store,sm:sm,cm:cm,
	listeners:{scope:this,
		rowdblclick: function(grid, rowIndex, event){
    		eidtBlock();
		}},
	tbar:[{text:C_ADD,iconCls:'add',ref:'../btnAdd',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_BLOCK+WF_ADD),handler:addBlock},'-',
        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_BLOCK+WF_DEL),handler:eidtBlock},'-',
        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_BLOCK+WF_DEL),handler:deleteBlock}]
    });
    
    Fos.BlockPanel.superclass.constructor.call(this,{iconCls:'gen',title:C_BLOCK,
	closable:true,layout:"border",items:[tree,grid]	
    });
};
Ext.extend(Fos.BlockPanel, Ext.Panel);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * name:BlockWin
 * remark:库位的编辑弹出窗口
 * 
 */
//构建库位新增修改弹出框的相关代码
Fos.BlockWin = function(p,store,s) {
	
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json',warehouseId:p.get('warehouseId')},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	this.save = function(){
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if(Ext.isEmpty(blockCode.getValue())){
			Ext.Msg.alert(SYS,C_BLOCK_CODE_REQUIRED,function(){frm.blockCode.focus();},this);
			return;
		};
		if(Ext.isEmpty(blockName.getValue())){
			Ext.Msg.alert(SYS,C_BLOCK_NAME_REQUIRED,function(){frm.blockName.focus();},this);
			return;
		};
		p.endEdit();
		
		var xml = HTUtil.RTX(p,'WBlock',WBlock);		
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'BLOCK_SS',blockName:p.get('blockName'),blockCode:p.get('blockCode'),rowAction:p.get('rowAction')},
		success: function(r){
			p.beginEdit();
			var c = HTUtil.XTR(r.responseXML,'WBlock',WBlock);
			var ra=p.get('rowAction');
			var f = WBlock.prototype.fields;
			if(c){
				for (var i = 0; i < f.keys.length; i++) {
					var fn = ''+f.keys[i];
					p.set(fn,c.get(fn));
					};  
			}
			if(ra=='N'){					
				this.setTitle(C_BLOCK+'-'+p.get("blockName"));
				p.set('rowAction','M');
			}
			p.endEdit();
			Ext.Msg.alert(SYS,M_S);
			
			store.reload();
			
			this.close();
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
		xmlData:HTUtil.HTX(xml)});
	};
	//库位代码
	var blockCode=new Ext.form.TextField({fieldLabel:C_BLOCK_CODE,name:'blockCode',value:p.get('blockCode'),xtype:'textfield',
			tabIndex:1,ref:'../blockCode',disabled:p.get('rowAction')=='N'?false:true,itemCls:'required',anchor:'95%'});
	
	//上架库区ComboField
	var inAreaName=new Ext.form.ComboBox({fieldLabel:C_IN_AREA,name:'inAreaName',value:p.get('inAreaName'),tabIndex:8,
			store:areaStore,displayField:'areaName',valueField:'areaName',typeAhead:true,
			mode:'remote',triggerAction:'all',selectOnFocus:true,
			anchor:'95%',
			listeners:{
				scope:this,select:function(c,r,i){
					p.set('inAreaId',r.get('id'));
					p.set('inAreaCode',r.get('areaCode'));
				}
			}});
	//库位类型
	var blockType= new Ext.form.ComboBox({fieldLabel:'库位类型',name:'blockType',value:p.get('blockType'),store:HTStore.WAREHOUSE_TYPE_S,xtype:'combo',
			displayField:'NAME',tabIndex:6,valueField:'CODE',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'});
	//库位宽度
	var blockWidth= new Ext.form.NumberField({fieldLabel:C_BLOCK_WIDTH,name:'blockWidth',tabIndex:21,value:p.get('blockWidth'),xtype:'numberfield',anchor:'95%'});
	
	//库位行号
	var blockRow=new Ext.form.NumberField({fieldLabel:'X坐标',name:'blockRow',tabIndex:24,value:p.get('blockRow'),xtype:'numberfield',anchor:'95%'});
	//层
	var blockLayer=new Ext.form.NumberField({fieldLabel:C_BLOCK_LAYER,tabIndex:23,name:'blockLayer',value:p.get('blockLayer'),xtype:'numberfield',anchor:'95%'});
	//最大库存重量
	var maxWeight=new Ext.form.NumberField({fieldLabel:C_MAX_WEIGHT,name:'maxWeight',tabIndex:17,value:p.get('maxWeight'),xtype:'numberfield',anchor:'95%'});
	//最大托盘数
	var maxPallet=new Ext.form.NumberField({fieldLabel:C_MAX_PALLET,name:'maxPallet',tabIndex:19,value:p.get('maxPallet'),xtype:'numberfield',anchor:'95%'});
	//库位名称
	var blockName=new Ext.form.TextField({fieldLabel:C_BLOCK_NAME,name:'blockName',value:p.get('blockName'),tabIndex:2,ref:'../blockName',
		xtype:'textfield',disabled:p.get('rowAction')=='N'?false:true,itemCls:'required',anchor:'95%'});
	//拣货库区
	var outAreaName=new Ext.form.ComboBox({fieldLabel:C_OUT_AREA,name:'outAreaName',value:p.get('outAreaName'),store:areaStore,anchor:'95%',
			displayField:'areaName',valueField:'areaName',typeAnead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,tabIndex:12,
			listeners:{
				select:function(c,r,i){
					p.set('outAreaId',r.get('id'));
					p.set('outAreaCode',r.get('areaCode'));
				}
			}});
	//库位长度
	var blockLength=new Ext.form.NumberField({fieldLabel:C_BLOCK_LENGTH,tabIndex:20,name:'blockLength',value:p.get('blockLength'),xtype:'numberfield',anchor:'95%'});
	//库位高度
	var blockHeight=new Ext.form.NumberField({fieldLabel:C_BLOCK_HEIGHT,tabIndex:22,name:'blockHeight',value:p.get('blockHeight'),xtype:'numberfield',anchor:'95%'});
	//库位列号
	var blockCol=new Ext.form.NumberField({fieldLabel:'Y坐标',tabIndex:25,name:'blockCol',value:p.get('blockCol'),xtype:'numberfield',anchor:'95%'});
	//最大库存数量
	var maxQuantity=new Ext.form.NumberField({fieldLabel:C_MAX_QUANTITY,tabIndex:27,name:'maxQuantity',value:p.get('maxQuantity'),xtype:'numberfield',anchor:'95%'});
	//最大库容
	var maxVolume=new Ext.form.NumberField({fieldLabel:C_MAX_VOLUME,tabIndex:16,name:'maxVolume',value:p.get('maxVolume'),xtype:'numberfield',anchor:'95%'});
	//备注
	var remark=new Ext.form.TextArea({fieldLabel:C_REMARKS,name:'remark',width:1005,tabIndex:31,value:p.get('remark'),xtype:'textarea',anchor:'98%'});
	//上架顺序
	var shelvesOrder=new Ext.form.TextField({fieldLabel:'上架顺序',name:'shelvesOrder',value:p.get('shelvesOrder'),tabIndex:3,xtype:'textfield',anchor:'95%'});
	//拣货顺序
	var pickOrder=new Ext.form.TextField({fieldLabel:'拣货顺序',name:'pickOrder',value:p.get('pickOrder'),tabIndex:4,xtype:'textfield',anchor:'95%'});
	//状态
	var status=new Ext.form.ComboBox({fieldLabel:C_STATUS,name:'status',value:p.get('status'),tabIndex:15,store:HTStore.vehicleStatusStore,
			xtype:'combo',displayField:'N',valueField:'C',typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	//库位使用
	var locationUsing=new Ext.form.ComboBox({fieldLabel:'库位使用',store:HTStore.LocationUsing,mode:'local',triggerAction:'all',selectOnFocus:true,
		name:'locationUsing',value:p.get('locationUsing'),displayField:'N',valueField:'C',typleAhead:true,tabIndex:5,xtype:'combo',anchor:'95%'});
	//库位属性
	var locationAttribute=new Ext.form.ComboBox({fieldLabel:'库位属性',name:'locationAttribute',value:p.get('locationAttribute'),tabIndex:7,xtype:'combo',
		store:HTStore.LocationAttribute,mode:'local',triggerAction:'all',displayField:'N',valueField:'C',typeAhead:true,selectOnFocus:true,anchor:'95%'});
	//库位处理
	var locationProcessing=new Ext.form.ComboBox({fieldLabel:'库位处理',name:'locationProcessing',value:p.get('locationProcessing'),tabIndex:9,
		store:HTStore.LocationAttribute,mode:'local',triggerAction:'all',displayField:'N',valueField:'C',typeAhead:true,selectOnFocus:true,xtype:'combo',anchor:'95%'});
	//周转需求
	var turnoverDemand=new Ext.form.ComboBox({fieldLabel:'周转需求',name:'turnoverDemand',value:p.get('turnoverDemand'),tabIndex:10,xtype:'combo',
		store:HTStore.LocationAttribute,mode:'local',triggerAction:'all',displayField:'N',valueField:'C',typeAhead:true,selectOnFocus:true,anchor:'95%'});
	//库存环境
	var inventoryCondition=new Ext.form.ComboBox({fieldLabel:'库存环境',name:'inventoryCondition',value:p.get('inventoryCondition'),tabIndex:11,
		store:HTStore.InventoryCondition,mode:'local',displayField:'N',valueField:'C',triggerAction:'all',typeAhead:true,selectOnFocus:true,xtype:'combo',anchor:'95%'});
	//库位组1
	var localGroup1=new Ext.form.ComboBox({fieldLabel:'库位组1',name:'localGroup1',value:p.get('localGroup1'),tabIndex:13,xtype:'combo',
		store:HTStore.LocationAttribute,mode:'local',triggerAction:'all',displayField:'N',valueField:'C',typeAhead:true,selectOnFocus:true,anchor:'95%'});
	//库位组2
	var localGroup2=new Ext.form.ComboBox({fieldLabel:'库位组2',name:'localGroup2',value:p.get('localGroup2'),tabIndex:14,xtype:'combo',
		store:HTStore.LocationAttribute,mode:'local',triggerAction:'all',displayField:'N',valueField:'C',typeAhead:true,selectOnFocus:true,anchor:'95%'});
	//最大面积
	var maxArea=new Ext.form.NumberField({fieldLabel:'最大面积',name:'maxArea',value:p.get('maxArea'),tabIndex:18,xtype:'numberField',anchor:'95%'});
	//z坐标
	var coordinateZ=new Ext.form.NumberField({fieldLabel:'Z坐标',name:'coordinateZ',value:p.get('coordinateZ'),tabIndex:26,xtype:'textfield',anchor:'95%'});
	//存放类别ID
	var storeTypeId=new Ext.form.NumberField({fieldLabel:'存放类别ID',name:'storeTypeId',value:p.get('storeTypeId'),tabIndex:28,xtype:'textfield',anchor:'95%'});
	//存放类别名称
	var storeTypeName=new Ext.form.TextField({fieldLabel:'存放类别名称',name:'storeTypeName',value:p.get('storeTypeName'),tabIndex:29,xtype:'textfield',anchor:'95%'});
	//库位条码
	var locationBarCode=new Ext.form.TextField({fieldLabel:'库位条码',name:'locationBarCode',value:p.get('locationBarCode'),tabIndex:30,xtype:'textfield',anchor:'95%'});

	//库位代码   blockCode  ，             //上架库区   inAreaName，                    //库位类型   blockType= ，            //库位宽度   blockWidth=
	//库位行号   blockRow= ，               //层  blockLayer= ，                             //最大库存重量  maxWeight= ，    //最大托盘数    maxPallet=
	//库位名称      blockName= ，         //拣货库区      outAreaName= ，            //库位长度      blockLength= ，     //库位高度      blockHeight=
	//库位列号      blockCol= ，            //最大库存数量  maxQuantity=，          //最大库容      maxVolume= ，        //状态          status=
	//备注          remark=   ，               //上架顺序      shelvesOrder，              //拣货顺序      pickOrder，            //库位使用      locationUsing
	//库位属性  locationAttribute ，//库位处理      locationProcessing， //周转需求      turnoverDemand ，//库存环境      inventoryCondition
	//库位组1  localGroup1 ，            //库位组2       localGroup1，         //最大面积      maxArea=  ，           //z坐标         coordinateZ
	//存放类别ID  storeTypeId ，    //存放类别名称  storeTypeName ，       //库位条码 locationBarCode
	var base = new Ext.Panel({Width:1100,frame:true,border:false,title:'库位基本信息',
		layout:'column',layoutConfig:{columns:4},items:[
	    	
	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[blockCode,locationUsing,locationProcessing,localGroup1]}
	    	,
  	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[blockName,blockType,turnoverDemand,localGroup2]}
  	    	,
  	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[shelvesOrder,locationAttribute,inventoryCondition,status]}
  	    	,
  	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[pickOrder,inAreaName,outAreaName]}
	    ]});
	
	
	
	var astrict = new Ext.Panel({Width:1100,frame:true,border:false,title:'限制',
		layout:'column',layoutConfig:{columns:4},items:[
	    	
	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[maxVolume,blockLength,blockRow]}
	    	,
  	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[maxWeight,blockWidth,blockCol]}
  	    	,
  	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[maxArea,blockHeight,coordinateZ]}
  	    	,
  	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[maxPallet,blockLayer,maxQuantity]}
	    ]});
	
	var other = new Ext.Panel({frame:true,border:false,title:'其他',
		layout:'column',layoutConfig:{columns:4},items:[
	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[storeTypeId]}
	    	,
  	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[storeTypeName]}
  	    	,
  	    	{columnWidth:.25,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[locationBarCode]}
  	    	,
  	    	{columnWidth:.99,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[remark]}
  	    	
	    ]});
	
	var frm = new Ext.form.FormPanel({labelWidth:100,frame:true,region:'center',
		items:[base,astrict,other]});
	
	Fos.BlockWin.superclass.constructor.call(this,{buttonAlign:'right',id:'BLOCKS',
		title:p.get('rowAction')=='N'?C_ADD_BLOCK:C_BLOCK+'-'+p.get('blockName'),
		width:1100,height:480,modal:true,layout:'border',
	  	items:[frm],
	  	buttons:[{text:C_SAVE,iconCls:'ok',scope:this,handler:this.save},
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});            		
};
Ext.extend(Fos.BlockWin, Ext.Window);
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/*****
 * 库位挑选
 * name:BlockLookUp
 */
Fos.BlockLookUp=Ext.extend(Ext.form.ComboBox,{
	triggerClass:'x-form-search-trigger',
	warehouseName:'',	//客户类型属性
	areaName:'',		//类务类型属性
	
	setWarehouseName:function(_warehouseName){
		this.warehouseName=_warehouseName;
	},
	
	setAreaName:function(_areaName){
		this.areaName=_areaName;
	},
	
	constructor:function(config){	
		Fos.BlockLookUp.superclass.constructor.apply(this, arguments);
	},
	initComponent:function(){
		Fos.BlockLookUp.superclass.initComponent.call(this);        
	},
	selectBlock:function(block,scope){
		scope.setValue(block.data[scope.valueField || scope.displayField]);
		scope.fireEvent('select', this, block, 0);
	},
	onTriggerClick:function(event){
		var win = new Fos.BlockLookWin(this.selectBlock,this.warehouseName,this.areaName,BLOCK_ONLY,this);
		win.show();
	}
});
Ext.reg('blockLookUp', Fos.BlockLookUp);

Fos.BlockLookWin=function(fn,warehouseName,areaName,isAll,scope) {
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	//库区数据
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WBLOCK_SQ',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WBlock',idProperty:'id'},WBlock),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({columns:[
    	new Ext.grid.RowNumberer({header:'序号:',width:36}),sm,
		{header:'库位编号',dataIndex:'blockCode',align:'center',width:100},
		{header:'库位名称',dataIndex:'blockName',align:'center',width:100},
		{header:'库区',dataIndex:'areaName',align:'center',width:100},
		{header:'仓库名称',dataIndex:'warehouseName',align:'center',width:100},
		{header:'库存数量',dataIndex:'nowQuantity',align:'center',width:100}/*,
		{header:'库存件数',dataIndex:'nowPackages',align:'center',width:100},
		{header:'库存重量',dataIndex:'nowGrossWeight',width: 80},
		{header:'库存体积',dataIndex:'nowVolume',width: 80},
		{header:'库存面积',dataIndex:'nowMeasure',width: 80}*/
		],defaults:{sortable:true,width:100}});
	
	this.sel = function(){
	
		if(sm.getSelected()){
			
			fn(sm.getSelected(),scope);
			this.close();
		}
		else Ext.Msg.alert(SYS_W,M_NO_DATA_SELECTED);
	};
	
	var grid = new Ext.grid.GridPanel({region:'center',
		store:store,sm:sm,cm:cm,
		loadMask:true,
		listeners:{scope:this,
			rowdblclick:this.sel
		},
		bbar:PTB(store,15)
		
	});
	
	
	
	var search=function(){
		var a=[];
		var blockNo=ctxtBlockNo.getValue();
		if(blockNo){
			a[a.length]=new QParam({key:'blockCode',value:blockNo,op:7});
		}
		var blockName=ctxtBlockName.getValue();
		if(blockName){
			a[a.length]=new QParam({key:'blockName',value:blockName,op:7});
		}
		
		var areaName=ccboArea.getValue();
		if(areaName){
			a[a.length]=new QParam({key:'areaName',value:areaName,op:7});
		}
		
		var warehouse=ccboWarehouse.getValue();
		if(warehouse){
			a[a.length]=new QParam({key:'warehouseName',value:warehouse,op:7});
		}
		var radGet=radgAll.getValue();
		var sName=radGet.inputValue;
		
		 a[a.length]=new QParam({key:'all',value:sName,op:7});
	
		if(a.length<=0){
			
			store.baseParams={_mt:'xml',_A:'WBLOCK_SQ'};
		}		
		else{
			
			store.baseParams={_mt:'xml',_A:'WBLOCK_SQ',xml:HTUtil.QATX(a)};
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
	
	var ctxtBlockNo=new Ext.form.TextField({fieldLabel:'库位编号',name:'blockNo',anchor:'95%',enableKeyEvents:true,tabIndex:1,
		listeners: {
			scope: this,
			keydown: function(f, e) {
				if (e.getKey() == e.ENTER) {
					
					search();
					ctxtBlockName.focus();
				}
			}
		}});
	var ctxtBlockName=new Ext.form.TextField({fieldLabel:'库位名称',name:'blockName',anchor:'95%',enableKeyEvents:true,tabIndex:2,
		listeners:{
			scope: this,
			keydown: function(f, e) {
				if (e.getKey() == e.ENTER) {
					search();
					radgAll.focus();
				}
			}
		}});
	var ccboWarehouse=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',value:warehouseName,tabIndex:3,
		store:warehouseStore,xtype:'combo',
		displayField:'warehouseName',valueField:'warehouseName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	var ccboArea=new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',value:areaName,tabIndex:4,
		store:areaStore,
		displayField:'areaName',valueField:'areaName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'});
	
	var radCode=new Ext.form.Radio({checked:isAll==0,name:'all',inputValue:'1',boxLabel:'无库存'});
	var radName=new Ext.form.Radio({checked:isAll==1,name:'all',inputValue:'0',boxLabel:'全部'});
	var radgAll=new Ext.form.RadioGroup({fieldLabel:'范围',items:[radCode,radName],anchor:'99%',tabIndex:5});
	if(isAll==0){
		radgAll.setValue(0,true);
		radgAll.setValue(1,false);
	}
	else{
		radgAll.setValue(1,true);
		radgAll.setValue(0,false);
	}
	var cbtnSearch=new Ext.Button({text:'查询',iconCls:'search',anchor:'35%',scope:this,handler:search,tabIndex:6});
	
	var panel=new Ext.form.FormPanel({frame:true,border:false,region:'north',height:65,
		layout:'column',
		items:[
    	    	{columnWidth:.3,labelAlign:'right',labelWidth:65,layout:'form',border:false,items:[ctxtBlockNo,ccboWarehouse]}
    	    	,
      	    	{columnWidth:.3,labelAlign:'right',labelWidth:65,layout:'form',border:false,items:[ctxtBlockName,ccboArea]}
      	    	,
      	    	{columnWidth:.3,labelAlign:'right',labelWidth:35,layout:'form',border:false,items:[radgAll,cbtnSearch]}
    	    ]});

	
	Fos.BlockLookWin.superclass.constructor.call(this,{title:'选择库位',width:700,height:500,
		layout:'border',
		modal:true,
		items:[panel,grid],
    	buttons:[{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
    	         {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]}); 

};
Ext.extend(Fos.BlockLookWin,Ext.Window);
