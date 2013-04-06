//入库单查询

/*
 * 入单库挑选界面
 */
Fos.StorageNoteLookUp=Ext.extend(Ext.form.ComboBox,{
	triggerClass:'x-form-search-trigger',
	
	constructor:function(config){	
		Fos.StorageNoteLookUp.superclass.constructor.apply(this, arguments);
	},
	initComponent:function(){
		Fos.StorageNoteLookUp.superclass.initComponent.call(this);        
	},
	selectStrogeNote:function(storageNote,scope){
		scope.setValue(storageNote.data[scope.valueField || scope.displayField]);
		scope.fireEvent('select', this, storageNote, 0);
	},
	onTriggerClick:function(event){
		var win = new Fos.StrogeNoteLookWin(this.selectStrogeNote,this);
		win.show();
	}
});
Ext.reg('storageNoteLookUp', Fos.StorageNoteLookUp);


Fos.StrogeNoteLookWin=function(fn,scope) {
	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WRECEIVED_CARGO_G',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',root:'WStorageNoteCargo',id:'id'},WStorageNoteCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	store.baseParams = {};
    //{
    //这里加入查询参数
    //}
    store.load({params:{start:0,limit:C_PS20}});
    
    var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({columns:[
    	new Ext.grid.RowNumberer(),sm,
		{header:'仓库单号',dataIndex:'strogeNoteNo',width:80},
		{header:'货主',dataIndex:'cargoOwnerName',width:100},
		{header:'接单时间',dataIndex:'storageDate',width: 80}
		],defaults:{sortable:true,width:100}});
	
	var grid = new Ext.grid.GridPanel({region:'center',store: store,sm:sm,cm:cm,
		listeners:{scope:this,rowdblclick:function(g,r,e){
				this.sel;
			}
		},
		bbar:PTB(store,C_PS20)
		//tbar:[{text:C_SEARCH,iconCls:'search'},'-']
	});
	this.sel = function(){
		if(sm.getSelected()){
			fn(sm.getSelected(),scope);
			this.close();
		}else Ext.Msg.alert(SYS_W,M_NO_DATA_SELECTED);
	};
	
	var txtStorageNoteNo=new Ext.form.TextField({fieldLabel:'入库单号',anchor:'95%'});
	var btnSearch=new Ext.Button({text:'查询',anchor:'95%'});
	
	var panel=new Ext.form.FormPanel({frame:true,border:false,region:'north',height:90,
		layout:'column',layoutConfig:{columns:2},items:[
		                                    	    	{columnWidth:.4,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[txtStorageNoteNo]}
		                                    	    	,		                                      	    	
		                                      	    	{columnWidth:.2,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[btnSearch]}
		                                    	    ]});
	
	
	
	Fos.StrogeNoteLookWin.superclass.constructor.call(this,{title:'选择入库单',width:600,height:380,
		layout:'border',
		modal:true,
		items:[panel,grid],
    	buttons:[{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
    	         {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]}); 
};
Ext.extend(Fos.StrogeNoteLookWin,Ext.Window);


//出入库货物列表查询
Fos.StorageNoteCargoLookUp=Ext.extend(Ext.form.ComboBox,{
	triggerClass:'x-form-search-trigger',
	
	constructor:function(config){	
		Fos.StorageNoteCargoLookUp.superclass.constructor.apply(this, arguments);
	},
	initComponent:function(){
		Fos.StorageNoteCargoLookUp.superclass.initComponent.call(this);        
	},
	selectStrogeNoteCargo:function(storageNoteCargo,scope){
		scope.setValue(storageNoteCargo.data[scope.valueField || scope.displayField]);
		scope.fireEvent('select', this, storageNoteCargo, 0);
	},
	onTriggerClick:function(event){
		var win = new Fos.StorageNoteCargoLookWin(this.selectStrogeNoteCargo,this);
		win.show();
	}
});
Ext.reg('storageNoteCargoLookUp', Fos.StorageNoteCargoLookUp);

Fos.StorageNoteCargoLookWin=function(fn,scope) {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_CARGO_X',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',root:'WStorageNoteCargo',id:'id'},WStorageNoteCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.baseParams = {};
    //{
    //这里加入查询参数
    //}
    store.load({params:{start:0,limit:C_PS20}});
    var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({columns:[
    	new Ext.grid.RowNumberer(),sm,
		{header:'仓库单号',dataIndex:'strogeNoteNo',width:80},
		{header:'货主',dataIndex:'cargoOwnerName',width:100},
		{header:'货物名称',dataIndex:'cargoName',width: 80},
		{header:'货物编码',dataIndex:'skuNo',width: 80},
		{header:'型号',dataIndex:'cargoType',width: 80},
		{header:'规格',dataIndex:'specification',width: 80},
		{header:'颜色',dataIndex:'cargoColor',width: 80}
		],defaults:{sortable:true,width:100}});
	
	var grid = new Ext.grid.GridPanel({region:'center',store: store,sm:sm,cm:cm,
		listeners:{scope:this,rowdblclick:function(g,r,e){
				this.sel;
			}
		},
		bbar:PTB(store,C_PS20)
		//tbar:[{text:C_SEARCH,iconCls:'search'},'-']
	});
	this.sel = function(){
		if(sm.getSelected()){
			fn(sm.getSelected(),scope);
			this.close();
		}else Ext.Msg.alert(SYS_W,M_NO_DATA_SELECTED);
	};
	
	var txtStorageNoteNo=new Ext.form.TextField({fieldLabel:'仓库单号',anchor:'95%'});
	var txtCargoOwnerName=new Ext.form.TextField({fieldLabel:'货主',anchor:'95%'});
	var btnSearch=new Ext.Button({text:'查询',anchor:'95%'});
    
	var panel=new Ext.form.FormPanel({frame:true,border:false,region:'north',height:90,
		layout:'column',layoutConfig:{columns:3},items:[
	    	{columnWidth:.3,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[txtStorageNoteNo]}
	    	,
	    	{columnWidth:.3,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[txtCargoOwnerName]}
	    	,
  	    	{columnWidth:.2,labelAlign:'right',labelWidth:90,layout:'form',border:false,items:[btnSearch]}
	    ]});
	
	
	Fos.StorageNoteCargoLookWin.superclass.constructor.call(this,{title:'选择货物列表',width:600,height:380,
		layout:'border',
		modal:true,
		items:[panel,grid],
    	buttons:[{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
    	         {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]}); 
};
Ext.extend(Fos.StorageNoteCargoLookWin,Ext.Window);


