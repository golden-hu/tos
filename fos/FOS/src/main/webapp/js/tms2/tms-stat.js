//statistics
Fos.TransSumGrid = function() {
	var myReader = new Ext.data.XmlReader({
		   totalProperty: "rowCount",
		   record: "TConsign"
		}, TConsign);
	
	var store=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TCON_X',_mt:'xml'},
		reader:myReader
	});
	 var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
	 var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
	 var cm=new Ext.grid.ColumnModel({columns:[
	 {header:SUM_MONTH,dataIndex:'sumMonth',width:100},
	 {header:SUM_CONSNO,dataIndex:'sumConsNo',width:100},
	 {header:SUM_PACKAGES,dataIndex:'sumPackages',width:100},
	 {header:C_GW_S,dataIndex:'sumGrossWeight',width:100}
	/* ,
	 {header:C_SUM_AR,dataIndex:'',width:100},
	 {header:C_SUM_AP,dataIndex:'',width:100},
	 {header:SUM_PROFITS,dataIndex:'',width:100},*/
	],defaults:{sortable:false,width:100}});
	
	this.search=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
		a[0]=new QParam({key:'consDate',value:t2.getValue().format(DATEF),op:GE});
		a[1]=new QParam({key:'consDate',value:t3.getValue().format(DATEF),op:LE});
 		store.baseParams={_A:'TCON_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS},callback:function(r){
 			if(r.length==0) {XMG.alert(SYS,M_NOT_FOUND);store.removeAll();}}
 		});
	};
	Fos.TransSumGrid.superclass.constructor.call(this,{title:C_STAT_BIZ_SUM,
    id:'G_TRAN',iconCls:'grid',header:false,closable:true,
    store:store,sm:'',cm:cm,loadMask: true,
	bbar:PTB(store,C_PS),
	tbar:[
	      {text:C_CONS_DATE+C_FROM,xtype:'tbtext'},t2,
	      {text:C_TO,xtype:'tbtext'},t3,'-',
        {text:C_SEARCH,iconCls:'search',handler:this.search}]
    });
};
Ext.extend(Fos.TransSumGrid, Ext.grid.GridPanel);

Fos.VehicleSumGrid = function() {
	 var myReader = new Ext.data.XmlReader({
		   totalProperty: "rowCount",
		   record: "TTransTask"
		}, TTransTask);
	
	var store=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TTRT_X',_mt:'xml'},
		reader:myReader
	});
	
	 var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
	 var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
	 var cm=new Ext.grid.ColumnModel({columns:[
	 {header:C_VEHICLE_NO,dataIndex:'sumT',width:100},
	 {header:SUM_C_V,dataIndex:'sumStartDate',width:100},
	 {header:SUM_LOAD,dataIndex:'sumGrossWeight',width:100},
	 {header:SUM_MiLES,dataIndex:'sumDistance',width:100}
	 /*,
	 {header:'油耗（升）',dataIndex:'consNo',width:100},
	 {header:'维修次数',dataIndex:'consNo',width:100},
	 {header:'维修金额',dataIndex:'consNo',width:100},
	 {header:'事故次数',dataIndex:'consNo',width:100},*/
	],defaults:{sortable:false,width:100}});
	
	this.search=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
			a[0]=new QParam({key:'startDate',value:t2.getValue().format(DATEF),op:GE});
			a[1]=new QParam({key:'startDate',value:t3.getValue().format(DATEF),op:LE});
			a[2]=new QParam({key:'status',value:'0',op:EQ});
	 		store.baseParams={_A:'TTRT_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
 		store.reload({params:{start:0,limit:C_PS},callback:function(r){
 			if(r.length==0) {XMG.alert(SYS,M_NOT_FOUND);store.removeAll();}}
 		});
	};
	
	Fos.VehicleSumGrid.superclass.constructor.call(this,{title:C_STAT_VEHICLE_SUM,
    id:'T_TASK',iconCls:'grid',header:false,closable:true,
    store:store,sm:'',cm:cm,loadMask: true,
	bbar:PTB(store,C_PS),
	tbar:[
	      {text:C_TRAN_START_DATE+C_FROM,xtype:'tbtext'},t2,
	      {text:C_TO,xtype:'tbtext'},t3,'-',
        {text:C_SEARCH,iconCls:'search',handler:this.search}]
    });
};
Ext.extend(Fos.VehicleSumGrid, Ext.grid.GridPanel);

Fos.DriverSumGrid = function() {
	 var myReader = new Ext.data.XmlReader({
		   totalProperty: "rowCount",
		   record: "TTransTask"
		}, TTransTask);
	
	var store=new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TTRT_X',_mt:'xml'},
		reader:myReader
	});
	
	 var t2=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
	 var t3=new Ext.form.DateField({value:new Date(),format:DATEF});
	 var cm=new Ext.grid.ColumnModel({columns:[
	 {header:C_DRIVER,dataIndex:'sumT',width:100},
	 {header:SUM_C_V,dataIndex:'sumStartDate',width:100},
	 {header:SUM_LOAD,dataIndex:'sumGrossWeight',width:100},
	 {header:SUM_MiLES,dataIndex:'sumDistance',width:100}
	 /*,
	 {header:'油耗（升）',dataIndex:'consNo',width:100},
	 {header:'维修次数',dataIndex:'consNo',width:100},
	 {header:'维修金额',dataIndex:'consNo',width:100},
	 {header:'事故次数',dataIndex:'consNo',width:100},*/
	],defaults:{sortable:false,width:100}});
	
	this.search=function(){
		var a=[];
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t3.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
			a[0]=new QParam({key:'startDate',value:t2.getValue().format(DATEF),op:GE});
			a[1]=new QParam({key:'startDate',value:t3.getValue().format(DATEF),op:LE});
			a[2]=new QParam({key:'status',value:'1',op:EQ});
	 		store.baseParams={_A:'TTRT_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
		store.reload({params:{start:0,limit:C_PS},callback:function(r){
			if(r.length==0) {XMG.alert(SYS,M_NOT_FOUND);store.removeAll();}}
		});
	};
	
	Fos.DriverSumGrid.superclass.constructor.call(this,{title:C_STAT_VEHICLE_SUM,
    id:'G_DRIV',iconCls:'grid',header:false,closable:true,
    store:store,sm:'',cm:cm,loadMask: true,
	bbar:PTB(store,C_PS),
	tbar:[
	      {text:C_TRAN_DRIVER_DATE+C_FROM,xtype:'tbtext'},t2,
	      {text:C_TO,xtype:'tbtext'},t3,'-',
        {text:C_SEARCH,iconCls:'search',handler:this.search}]
    });
};
Ext.extend(Fos.DriverSumGrid, Ext.grid.GridPanel);
