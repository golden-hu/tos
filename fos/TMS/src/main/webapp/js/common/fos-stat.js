﻿//业务汇总表
Fos.BusinessSummaryTab = function(a){	
	BusinessSummaryItem = Ext.data.Record.create(
			['consBizType','consBizTypeName','consNum','totalAR',
	          'totalAP','grossProfitA','totalR','totalP','grossProfit']);
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'REPT_BUSI_SUMM',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'BusinessSummaryItem'},BusinessSummaryItem)});
	
	var DT_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_CONS_DATE],['1',C_SAIL_DATE]]});
	 var t3=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
      	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:DT_S});
	
	var t1=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
    var t2=new Ext.form.DateField({value:new Date(),format:DATEF});
    
	this.report=function(){
		if(!t1.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
		store.reload({params:{consDateF:t1.value,consDateT:t2.value}});
	};		
	var cm=new Ext.grid.ColumnModel({columns:[
		{header:'业务类型',dataIndex:'consBizTypeName',width:80},
		{header:'单票数量',dataIndex:'consNum',width:80,align:'right'},
		{header:'应收合计',dataIndex:'totalAR',width:80,align:'right',renderer:numRender},
		{header:'应付合计',dataIndex:'totalAP',width:80,align:'right',renderer:numRender},
		{header:'毛利',dataIndex:'grossProfitA',width:80,align:'right',renderer:numRender},
		{header:'已收合计',dataIndex:'totalAR',width:80,align:'right',renderer:numRender},
		{header:'已付合计',dataIndex:'totalAP',width:80,align:'right',renderer:numRender},
		{header:'实现利润',dataIndex:'grossProfitA',width:80,align:'right',renderer:numRender}],
		defaults:{sortable:true,width:100}});
	var grid = new Ext.grid.EditorGridPanel({region:'center',border:false,store:store,cm:cm,
		 viewConfig: {
		        forceFit: true,
		        getRowClass: function(record, index) {
		            if (record.get('consBizType') == "TT") {
		                return 'number-b';
		            } 
		        }
		    }});	    

	/*var piePanel = new Ext.Panel({title: '',region:'south',height:300,width:300,border:false,  
        items: {
            store: store,
            xtype: 'piechart',
            dataField: 'totalAR',
            categoryField: 'consBizTypeName',
            extraStyle:
            {
                legend:{display: 'bottom',padding: 5}
            }
        }
    });*/
	
	Fos.BusinessSummaryTab.superclass.constructor.call(this,{id:'BUSINESS_SUMMARY',title:'业务汇总表',iconCls:'gen',
		autoScroll:true,closable:true,layout:'border',items: [grid],
	tbar:[t3,{xtype:'tbtext',text:C_FROM},t1,
	      {xtype:'tbtext',text:C_TO},t2,
	      {text:'生成报表',disabled:false,iconCls:'save',scope:this,handler:this.report}]});
};
Ext.extend(Fos.BusinessSummaryTab, Ext.Panel);

//业务员业绩统计表
Fos.SalesBusinessSummaryTab = function(a){	
	BusinessSummaryItem = Ext.data.Record.create(
			['consSalesRepId','consSalesRepName','consBizType','consBizTypeName','consNum','totalAR',
	          'totalAP','grossProfitA','totalR','totalP','grossProfit']);
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'REPT_SALES_SUMM',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'BusinessSummaryItem'},BusinessSummaryItem)});
    var t1=new Ext.form.DateField({value:(new Date()).getFirstDateOfMonth(),format:DATEF});
    var t2=new Ext.form.DateField({value:new Date(),format:DATEF});
    
    var DT_S=new Ext.data.SimpleStore({id:0,fields:['CODE','NAME'],
		data:[['0',C_CONS_DATE],['1',C_SAIL_DATE]]});
	 var t3=new Ext.form.ComboBox({width:80,displayField:'NAME',valueField:'CODE',triggerAction:'all',value:'0',
      	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:DT_S});
	 
	this.report=function(){
		if(!t1.getValue()){
			XMG.alert(SYS,M_INPUT_START_TIME,function(){t2.focus();},this);return;};
		if(!t2.getValue()){
			XMG.alert(SYS,M_INPUT_END_TIME,function(){t3.focus();},this);return;};
		store.load({params:{consDateF:t1.value,consDateT:t2.value}});
	};		
	var cm=new Ext.grid.ColumnModel({columns:[
		{header:'业务员',dataIndex:'consSalesRepName',width:80},
		{header:'单票数量',dataIndex:'consNum',width:80,align:'right'},
		{header:'应收合计',dataIndex:'totalAR',width:80,align:'right',renderer:numRender},
		{header:'应付合计',dataIndex:'totalAP',width:80,align:'right',renderer:numRender},
		{header:'毛利',dataIndex:'grossProfitA',width:80,align:'right',renderer:numRender},
		{header:'已收合计',dataIndex:'totalAR',width:80,align:'right',renderer:numRender},
		{header:'已付合计',dataIndex:'totalAP',width:80,align:'right',renderer:numRender},
		{header:'实现利润',dataIndex:'grossProfitA',width:80,align:'right',renderer:numRender}],
		defaults:{sortable:true,width:100}});
	var grid = new Ext.grid.EditorGridPanel({region:'center',border:true,store:store,cm:cm,
		 viewConfig: {
		        forceFit: true,
		        getRowClass: function(record, index) {
		            if (record.get('consSalesRepName') == "TT") {
		                return 'number-b';
		            } 
		        }
		    }});	    

	
	Fos.SalesBusinessSummaryTab.superclass.constructor.call(this,{id:'SALES_BUSINESS_SUMMARY',title:'业务员业绩统计表',iconCls:'gen',
		autoScroll:true,closable:true,layout:'border',items: [grid],
	tbar:[t3,{xtype:'tbtext',text:C_FROM},t1,
	      {xtype:'tbtext',text:C_TO},t2,
	      {text:'刷新',disabled:false,iconCls:'save',scope:this,handler:this.report}]});
};
Ext.extend(Fos.SalesBusinessSummaryTab, Ext.Panel);

//业务年报表
Fos.MonthlySummaryTab = function(a){	
	BusinessSummaryItem = Ext.data.Record.create(
			['mm','consNum','totalAR',
	          'totalAP','grossProfitA','totalR','totalP','grossProfit']);
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'REPT_MONTH_SUMM',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'BusinessSummaryItem'},BusinessSummaryItem)});
       
    var DT_S=new Ext.data.SimpleStore({id:0,fields:['CODE'],
		data:[['2010'],['2011'],['2012'],['2013'],['2014'],['2015'],['2016'],['2017'],['2018'],['2019'],['2020']]});
	 var t1=new Ext.form.ComboBox({width:80,displayField:'CODE',valueField:'CODE',triggerAction:'all',value:'2012',
      	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:DT_S});
	 
	this.report=function(){	
		store.load({params:{yy:t1.value}});
	};		
	var cm=new Ext.grid.ColumnModel({columns:[
		{header:'月份',dataIndex:'mm',width:80},
		{header:'单票数量',dataIndex:'consNum',width:80,align:'right'},
		{header:'应收合计',dataIndex:'totalAR',width:80,align:'right',renderer:numRender},
		{header:'应付合计',dataIndex:'totalAP',width:80,align:'right',renderer:numRender},
		{header:'毛利',dataIndex:'grossProfitA',width:80,align:'right',renderer:numRender},
		{header:'已收合计',dataIndex:'totalAR',width:80,align:'right',renderer:numRender},
		{header:'已付合计',dataIndex:'totalAP',width:80,align:'right',renderer:numRender},
		{header:'实现利润',dataIndex:'grossProfitA',width:80,align:'right',renderer:numRender}],
		defaults:{sortable:true,width:100}});
	var grid = new Ext.grid.EditorGridPanel({region:'center',border:true,store:store,cm:cm,
		 viewConfig: {
		        forceFit: true,
		        getRowClass: function(record, index) {
		            if (record.get('consSalesRepName') == "TT") {
		                return 'number-b';
		            } 
		        }
		    }});
	
	Fos.MonthlySummaryTab.superclass.constructor.call(this,{id:'MONTHLY_SUMMARY',title:'业务年报表',iconCls:'gen',
		autoScroll:true,closable:true,layout:'border',items: [grid],
	tbar:[t1,{xtype:'tbtext',text:'年'},{text:'生成报表',disabled:false,iconCls:'save',scope:this,handler:this.report}]});
};
Ext.extend(Fos.MonthlySummaryTab, Ext.Panel);

//业务月报表
Fos.DailySummaryTab = function(a){	
	BusinessSummaryItem = Ext.data.Record.create(
			['dd','consNum','totalAR',
	          'totalAP','grossProfitA','totalR','totalP','grossProfit']);
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'REPT_DAILY_SUMM',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'BusinessSummaryItem'},BusinessSummaryItem)});
       
    var YY_S=new Ext.data.SimpleStore({id:0,fields:['CODE'],
		data:[['2010'],['2011'],['2012'],['2013'],['2014'],['2015'],['2016'],['2017'],['2018'],['2019'],['2020']]});
	var t1=new Ext.form.ComboBox({width:80,displayField:'CODE',valueField:'CODE',triggerAction:'all',value:'2012',
      	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:YY_S});
	var MM_S=new Ext.data.SimpleStore({id:0,fields:['CODE'],
			data:[['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['10'],['11'],['12']]});
	 var t2=new Ext.form.ComboBox({width:80,displayField:'CODE',valueField:'CODE',triggerAction:'all',value:'1',
      	mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:MM_S});
		 
	this.report=function(){
		store.load({params:{yy:t1.value,mm:t2.value}});
	};		
	var cm=new Ext.grid.ColumnModel({columns:[
		{header:'日期',dataIndex:'dd',width:80},
		{header:'单票数量',dataIndex:'consNum',width:80,align:'right'},
		{header:'应收合计',dataIndex:'totalAR',width:80,align:'right',renderer:numRender},
		{header:'应付合计',dataIndex:'totalAP',width:80,align:'right',renderer:numRender},
		{header:'毛利',dataIndex:'grossProfitA',width:80,align:'right',renderer:numRender},
		{header:'已收合计',dataIndex:'totalAR',width:80,align:'right',renderer:numRender},
		{header:'已付合计',dataIndex:'totalAP',width:80,align:'right',renderer:numRender},
		{header:'实现利润',dataIndex:'grossProfitA',width:80,align:'right',renderer:numRender}],
		defaults:{sortable:true,width:100}});
	var grid = new Ext.grid.EditorGridPanel({region:'center',border:true,store:store,cm:cm,
		 viewConfig: {
		        forceFit: true,
		        getRowClass: function(record, index) {
		            if (record.get('consSalesRepName') == "TT") {
		                return 'number-b';
		            } 
		        }
		    }});
	
	Fos.DailySummaryTab.superclass.constructor.call(this,{id:'DAILY_SUMMARY',title:'业务月报表',iconCls:'gen',
		autoScroll:true,closable:true,layout:'border',items: [grid],
	tbar:[t1,{xtype:'tbtext',text:'年'},t2,{xtype:'tbtext',text:'月'},{text:'生成报表',disabled:false,iconCls:'save',scope:this,handler:this.report}]});
};
Ext.extend(Fos.DailySummaryTab, Ext.Panel);