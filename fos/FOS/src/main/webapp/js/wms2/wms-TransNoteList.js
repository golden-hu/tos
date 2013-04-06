Fos.TransNoteListGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WTRANS_NOTE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WTransNote',id:'id'},WTransNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:C_PS20}});
     
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_TRANS_NOTE_NO,dataIndex:'transNoteNo',width:150,align:'center'},
	{header:C_STATUS,dataIndex:'status',renderer:HTStore.getTransNoteStatus,width:70,align:'center'},
	{header:C_TRANS_DATE,dataIndex:'transDate',renderer:formatDate,width:90,align:'center'},
	{header:C_AUDIT_BY,dataIndex:'checkerName',width:120,align:'center'},
	{header:C_AUDIT_TIME,dataIndex:'checkTime',renderer:formatDate,width:90,align:'center'},
	{header:C_AUDIT_COMMENTS,dataIndex:'checkComments',width:200,align:'center'}

    ],defaults:{sortable:true,width:60}});
    
    var addNote=function(){
    	var p = new WTransNote({uuid:HTUtil.UUID(32),status:0,
    		transDate:new Date(),rowAction:'N'});
    	var tab = this.ownerCt;
    	tab.setActiveTab(tab.add(new Fos.TransNotePanel(p,1)));
    };
    var deleteNote=function(){
    	var a = sm.getSelections();
    	if(a.length>0){
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.SMTX4R(sm,'WTransNote');
	            	HTUtil.REQUEST('WTRANS_NOTE_S', xml,function(){store.remove(a);});
	        	}
			},this);
    	}
    	else Ext.MessageBox.alert(SYS,M_R_P);
    };
    this.editNote=function(){
    	var p = sm.getSelected();
    	
    	if(p){
    		var tab = this.ownerCt;
    		var c = 'TRANS_NOTE_'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.TransNotePanel(p,p.get('status')+2)));
    	}
    };
    
    Fos.TransNoteListGrid.superclass.constructor.call(this,{id:'TRANS_NOTE_LIST',
    	iconCls:'gen',title:C_TRANS_NOTE_LIST,
    	closable:true,store:store,sm:sm,cm:cm,
    	listeners:{scope:this,
    		rowdblclick: function(grid, rowIndex, event){
    			this.editNote();
    		},
    		rowclick:function(grid, rowIndex, event)
    		{
    			var p = sm.getSelected();
    			if (p.get('status')==4)
    			{
    				this.btnRemove.setDisabled(true);
    			}
    			else
    			{
    				this.btnRemove.setDisabled(false);
    			}
    		}
    	},loadMask: true,
		bbar:PTB(store,20),
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../btnAdd',scope:this,hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_ADD),handler:addNote},'-',
    	        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',scope:this,hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_EDIT),handler:this.editNote},'-',
    	        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',scope:this,hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_DEL),handler:deleteNote}]
    });
};
Ext.extend(Fos.TransNoteListGrid, Ext.grid.GridPanel);

