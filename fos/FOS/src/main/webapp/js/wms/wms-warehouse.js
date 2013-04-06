/////////////////////////////////////////////////////////////////////////////////
//构建仓库维护界面的那个grid
Fos.WarehouseGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_WAREHOUSE_CODE,dataIndex:'warehouseCode',editor:new Ext.form.TextField()},
	{header:C_WAREHOUSE_NAME,width:120,dataIndex:'warehouseName',editor:new Ext.form.TextField()},
	{header:C_AREA_NUM,dataIndex:'area',width:120,editor:new Ext.form.NumberField({maxValue:'99999.99',mixValue:'0'})},
	{header:C_VOLUME,dataIndex:'volume',width:120,editor:new Ext.form.NumberField({maxValue:'99999.99',mixValue:'0'})},
	{header:C_LOCATION,dataIndex:'location',width:120,editor:new Ext.form.TextField()},
	{header:C_CUSTODIAN,dataIndex:'custodian',width:120,editor:new Ext.form.TextField()},
	{header:C_TEL,dataIndex:'tel',width:120,editor:new Ext.form.TextField()},
	{header:C_FAX,dataIndex:'fax',width:120,editor:new Ext.form.TextField()},	
	{header:C_DESCRIPTION,dataIndex:'description',width:240,editor:new Ext.form.TextField()}
    ],defaults:{sortable:true,width:100}});    
    this.add=function(){
    	var p = new WWarehouse({uuid:HTUtil.UUID(32),rowAction:'N'});
        this.stopEditing();
        store.insert(0,p);
        this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST(store,'WWarehouse',WWarehouse,'WAREHOUSE_S');
    };
    Fos.WarehouseGrid.superclass.constructor.call(this,{id:'G_WAREHOUSE',iconCls:'gen',title:C_WAREHOUSE,
	clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,iconCls:'add',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_WAREHOUSE+WF_ADD),handler:this.add},'-',
        {text:C_REMOVE,iconCls:'remove',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_WAREHOUSE+WF_DEL),handler:this.del}, '-', 
        {text:C_SAVE,iconCls:'save',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_WAREHOUSE+WF_SAVE),handler:this.save}]
    });
};
Ext.extend(Fos.WarehouseGrid, Ext.grid.EditorGridPanel);

/////////////////////////////////////////////////////////////////

