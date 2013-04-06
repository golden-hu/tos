Fos.FFlightGrid = function() {
	var myReader = new Ext.data.XmlReader({
		   totalProperty: "rowCount",
		   record: "FFlight"
		}, FFlight);
	
	var store=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'FVOYAGE_Q',_mt:'xml'},
		reader:myReader,remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	});
	store.load({params:{start:0, limit:100}});
	
	var dePort = new Ext.form.TextField();//PVG
	var arPort = new Ext.form.TextField();//NRT
	
	this.search=function(){
		var d=dePort.getValue();
		if(!d){XMG.alert(SYS,'始发港不能为空',function(){dePort.focus();});return;};
		var a=arPort.getValue();
		if(!a){XMG.alert(SYS,'目的港不能为空',function(){arPort.focus();});return;};
		var myReader = new Ext.data.XmlReader({
			   totalProperty: 'rowCount',
			   record: 'FFlight'
			}, FFlight);
		store=new Ext.data.Store({url:SERVICE_URL,method:'POST',
			baseParams:{_A:'FVOYAGE_SV',_mt:'xml',dePort:d,arPort:a}
		});
     	store.reload({params:{start:0,limit:C_PS},callback:function(r){
 			if(r.length==0) {XMG.alert(SYS,M_NOT_FOUND);store.removeAll();}}
 		});
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	    {header:'飞航日期',dataIndex:'fightDate',renderer:formatDate,width:100},
		{header:'航班',dataIndex:'flightNo',width:100},
		{header:'始发港',dataIndex:'dePort',width:100},
		{header:'目的港',dataIndex:'arPort',width:100},
		{header:'飞航路线',dataIndex:'flightLine',width:100},
		{header:'预定起航时间',dataIndex:'deScheduleTime',width:100},
		{header:'实际起航时间',dataIndex:'deNewTime',width:100},
		{header:'预定到达时间',dataIndex:'arScheduleTime',width:100},
		{header:'实际到达时间',dataIndex:'arNewTime',width:100},
		{header:'航班状态',dataIndex:'status',renderer:HTStore.flightStatusRender,width:100}
		],defaults:{sortable:true,width:100,width:100}});
	
	Fos.FFlightGrid.superclass.constructor.call(this,{
    id:'F_FLIGHT',iconCls:'gen',title:'全日空',header:false,clicksToEdit:1,closable:true,	
    store:store,sm:sm,cm:cm,loadMask:true,
	bbar:PTB(store,100),
	tbar:[
	     {text:'始发港',xtype:'tbtext'},dePort,
	     {text:'目的港',xtype:'tbtext'},arPort,'-',
        {text:C_SEARCH,iconCls:'search',handler:this.search},'->',
        new Ext.PagingToolbar({width:200,pageSize:100,store:store})]
    });
};
Ext.extend(Fos.FFlightGrid, Ext.grid.EditorGridPanel);