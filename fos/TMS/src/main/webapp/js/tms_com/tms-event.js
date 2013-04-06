//货物状态跟踪窗口
Fos.PEventWin = function(p) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'PEVENT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PEvent',id:'id'},PEvent),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	store.load({params:{consignId:p.get('id')},scope:this});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var ff=CHKCLM(C_FINISHED,'status',60);
	ff.on('click',function(c,e,r){
		r.set('finishedDate',r.get('status')==1?(new Date()):'');
	},this);
	
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	     {header:'内容',width:200,dataIndex:"typeName",
			editor:new Ext.form.TextField({allowBlank:false,emptyText:'',invalidText:''})},
	     {header:'预计日期',dataIndex:'estimatedDate',width:150,renderer:formatDate,
		 editor:new Ext.form.DateField({format:DATEF})},
		 ff,
		 {header:'完成日期',dataIndex:'finishedDate',width:150,
		 renderer:formatDate,editor:new Ext.form.DateField({format:DATEF})}],
		 defaults:{sortable:false,width:100}});
	
	this.addEvent = function(){
		var r = new PEvent({uuid:HTUtil.UUID(32),bizType:'T',
			status:'0',version:'0',rowAction:'N',consignId:p.get('id')});
		grid.stopEditing();
    	store.add(r);
    	grid.startEditing(store.getRange().length-1,1);
	};	
	
	this.save = function(){
		grid.stopEditing();
		HTUtil.POST(store,'PEvent',PEvent,'PEVENT_S');
	};
	this.del=function(){HTUtil.REMOVE_SM(sm,store);};
	
    btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(M1_CONS+F_ADD),
    	scope:this,handler:this.addEvent});
    btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(M1_CONS+F_R),
    	scope:this,handler:this.del});
    btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(M1_CONS+F_M),
    	scope:this,handler:this.save});
    
	var grid=new Ext.grid.EditorGridPanel({id:'G_EVENT',border:true,height:400,autoScroll:true,clicksToEdit:1,plugins:[ff],
	    stripeRows:true,store:store,sm:sm,cm:cm,
	    tbar:[btnAdd,'-',btnRemove, '-',btnSave]
	});
    
	Fos.PEventWin.superclass.constructor.call(this,
	   {iconCls:'user',title:'跟踪状态'+'-'+p.get('consNoHandler'),layout:'fit',
	   modal:true,width:600,height:400,items:grid}); 
};
Ext.extend(Fos.PEventWin, Ext.Window);