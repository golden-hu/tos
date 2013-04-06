
Fos.WAreaGrid=function(){
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    

    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
          	{header:C_AREA_CODE,dataIndex:'areaCode',editor:new Ext.form.TextField()},
          	{header:C_AREA_NAME,width:120,dataIndex:'areaName',editor:new Ext.form.TextField()},
          	{header:C_AREA_TYPE,dataIndex:'areaType',renderer:HTStore.getWAREHOUSE_TYPE,
          		editor:new Ext.form.ComboBox({store:HTStore.WAREHOUSE_TYPE_S,triggerAction:'all',
             	 		displayField:'NAME',valueField:'CODE',mode:'local'})},
          	{header:C_WAREHOUSE,dataIndex:'warehouseName',
           		editor:new Ext.form.ComboBox({store:HTStore.getWWarehouse_S(),triggerAction:'all',selectOnFocus:true,
           			displayField:'warehouseName',valueField:'warehouseName',mode:'remote',			
          		listeners:{scope:this,
          			select:function(c,r,i){          				
          				var p = sm.getSelected();
           				p.set('warehouseId',r.get('id'));
           				p.set('warehouseCode',r.get('warehouseCode'));
          			}}})
          		}
              ],defaults:{sortable:true,width:100}});
    
    this.add=function(){
    	var p = new WArea({uuid:HTUtil.UUID(32),rowAction:'N'});
        this.stopEditing();
        store.insert(0,p);
        this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST(store,'WArea',WArea,'AREA_S');
    };
    
    Fos.WAreaGrid.superclass.constructor.call(this,{id:'G_AREA',iconCls:'gen',title:C_AREA,
	clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,iconCls:'add',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_AREA+WF_ADD),handler:this.add},'-',
        {text:C_REMOVE,iconCls:'remove',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_AREA+WF_DEL),handler:this.del}, '-', 
        {text:C_SAVE,iconCls:'save',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_AREA+WF_SAVE),handler:this.save}]
    });
};

Ext.extend(Fos.WAreaGrid, Ext.grid.EditorGridPanel);