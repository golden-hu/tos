Fos.TransWorkerList = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WPROCESS_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WProcess',id:'id'},WProcess),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:C_PS20}});
    var kw = new Ext.form.TextField();
    this.search=function(){
		var k=kw.getValue();
		if(!k){
			XMG.alert(SYS,M_NO_QUERY_P);return;
		};
     	var a=[];
     	a[0]={key:'homeworkNo',value:k,op:7};
     	store.removeAll();
     	store.baseParams={_A:'WPROCESS_X',_mt:'json',xml:Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(a)))};
     	store.load();
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[sm,                                              
        	{header:'杂作业编号',align:'center',dataIndex:'homeworkNo',width:125},
        	{header:'审批人',align:'center',width:80,dataIndex:'approver'},
        	{header:'出库单号',align:'center',width:100,dataIndex:'singleNo'},
        	{header:'审批状态',align:'center',dataIndex:'approverType',renderer:HTStore.getVOST,width:100},
        	{header:'仓库名称',width:100,dataIndex:'storageName'},
        	{header:'审批意见',width:100,dataIndex:'approverIdea'},
        	{header:'货主',width:100,dataIndex:'shipper'},
        	{header:'审批时间',width:100,dataIndex:'approverTime',renderer:formatDate},
        	{header:'作业类型',width:100,dataIndex:'homeworkType',renderer:HTStore.getTROT},
        	{header:'备注',align:'center',width:100,dataIndex:'remarks'}
            ],defaults:{sortable:true,width:60}});
    var addProcessItem=function(){
    	var p = new WProcess({uuid:HTUtil.UUID(32),rowAction:'N'});
    	var tab = this.ownerCt;
    	tab.setActiveTab(tab.add(new Fos.TransWorkPanel(p)));
    };
    var deleteProcessItem=function(){
    	var a = sm.getSelections();
    	if(a.length>0){
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.SMTX4R(sm,'WProcess');
	            	HTUtil.REQUEST('WPROCESS_M', xml,function(){store.remove(a);});
	        	}
			},this);
    	}
    	else Ext.MessageBox.alert(SYS,M_R_P);
    };
    this.editProcessItem=function(){
    	var p = sm.getSelected();
    	if(!p){Ext.Msg.alert(SYS,'请选择要编辑的内容！');return;}
    	

    	if(p){
    		var tab = this.ownerCt;
    		var c = 'TASKWORK_'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.TransWorkPanel(p)));
    	}
    };
    
    Fos.TransWorkerList.superclass.constructor.call(this,{id:'OPERATION_FORM_LIST',
    	iconCls:'gen',title:'作业单列表',
    	closable:true,store:store,sm:sm,cm:cm,
    	listeners:{scope:this,
    		rowdblclick: function(grid, rowIndex, event){
    			this.editProcessItem();
    		}},bbar:PTB(store,20),
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../btnAdd',scope:this,handler:addProcessItem},'-',
    	        {text:C_EDIT,iconCls:'option',ref:'../btnEdit',scope:this,handler:this.editProcessItem},'-',
    	        {text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',scope:this,handler:deleteProcessItem},'-',
    	        {xtype:'tbtext',text:'作业编号：'},kw,
    		      {text:C_SEARCH,iconCls:'search',handler:this.search}
    	        ]
    });
};
Ext.extend(Fos.TransWorkerList, Ext.grid.GridPanel);