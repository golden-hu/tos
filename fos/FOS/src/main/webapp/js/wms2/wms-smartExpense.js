Fos.SmartExpensePanel=function(t){
	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WSTORAGE_NOTE_X'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',idProperty:'id'},WStorageNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var resStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WSTORAGE_NOTE_X'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',idProperty:'id'},WStorageNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var storeWrate = new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WRATE_Q'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WRate',idProperty:'id'},WRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var storeWsmartexpense=new Ext.data.Store({url:SERVICE_URL,baseParams:{_mt:'xml',_A:'WSMARTEXPENSE_Q'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WSmartExpense',idProperty:'id'},WSmartExpense),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,	    
	    {header:'仓单号',dataIndex:'storageNoteNo',width:100},
	    {header:'实际操作时间',dataIndex:'actureTime',width:100,renderer:formatDate},
	    {header:'货主',dataIndex:'cargoOwnerName',width:100},
	    {header:'来源类型',dataIndex:'storageClass',width:100},
	    {header:'类别',dataIndex:'actionGategory',width:100},
	    {header:'客户订单号',dataIndex:'entrustNo',width:100},
	    {header:'订单号',dataIndex:'orderNo',width:100},
	    {header:'状态',dataIndex:'status',width:100,renderer:WHTStore.getInWarehouseNoteStatus}
	    ],defaults:{sortable:true,width:100}});
	
	var grid=new Ext.grid.GridPanel({
    	iconCls:'gen',title:'仓单列表',anchor:'-50,-50',
    	closable:false,store:store,sm:sm,cm:cm
	});
	
	var sm1=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm1=new Ext.grid.ColumnModel({columns:[sm1,
	                                           {header:'仓单号',dataIndex:'storageNoteNo'},
	                                           {header:'结算单位',dataIndex:'accountName'},
	                                           {header:'费用名称',dataIndex:'charName'},
	                                           {header:'单位',dataIndex:'unitPrice'},
	                                           {header:'数量',dataIndex:'num'},
	                                           {header:'金额',dataIndex:'amount'},
	                                           {header:'收付标志',dataIndex:'expeType',renderer:ExpeType},
	                                           {header:'币别',dataIndex:'currCode'},
	                                           {header:'汇率',dataIndex:'exRate'},
	                                           {header:'商品名称',dataIndex:'cargoName'},	                                           
	                                           {header:'起始时间',dataIndex:'fromDate',renderer:formatDate},
	                                           {header:'截止时间',dataIndex:'endDate',renderer:formatDate},
	                                           {header:'所属月份',dataIndex:'ownerMonth',renderer:formatDate},
	                                           {header:'备注',dataIndex:'remarks'},
	                                           {header:'类型',dataIndex:'type'}],defaults:{sortable:true,width:100}
	});
	
	var grid1=new Ext.grid.GridPanel({
    	iconCls:'gen',title:'费用明细',anchor:'-50,-50',
    	closable:false,store:storeWsmartexpense,sm:sm1,cm:cm1
	});
	
	
	
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm2=new Ext.grid.ColumnModel({columns:[sm2,
        {header:'仓单号',dataIndex:'storageNoteNo',width:120},
   	    {header:'入库时间',dataIndex:'actureTime',width:100,renderer:formatDate},
   	    {header:'货主',dataIndex:'cargoOwnerName',width:180},
   	    {header:'来源类型',dataIndex:'storageClass',width:100},
   	    {header:'类别',dataIndex:'actionGategory',width:100},
   	    {header:'客户订单号',dataIndex:'entrustNo',width:100},
   	    {header:'订单号',dataIndex:'orderNo',width:100},
   	    {header:'备注',dataIndex:'remarks',width:200}],
   	    defaults:{sortable:true,width:100}});
	var grid2=new Ext.grid.GridPanel({iconCls:'gen',title:'未生成费用列表',
    	closable:false,store:resStore,sm:sm2,cm:cm2});
	
	var tab=new Ext.TabPanel({activeTab:0,region:'center',
		items:[grid,grid1,grid2]});	
	
	
	var refresh=function(){
		var a=[];
		//var op=1;
		
		var df=cDf.value;
		if(df)
			a[a.length]=new QParam({key:'df',value:df,op:1});
		
		var de=cDe.value;
		if(de)
			a[a.length]=new QParam({key:'de',value:de,op:1});
		
		var storageType=frm.storageType.getValue();			
		if(!Ext.isEmpty(storageType)){
			a[a.length]=new QParam({key:'storageType',value:storageType,op:EQ});
		}
		
		var cargoOwner=frm.cargoOwner.getValue();
		if(cargoOwner){
			if(cargoOwnerId)
				a[a.length]=new QParam({key:'cargoOwnerId',value:cargoOwnerId,op:EQ});
			else
				a[a.length]=new QParam({key:'cargoOwner',value:cargoOwner,op:EQ});
			};
		var storageNoteNoF=frm.storageNoteNoFrom.getValue();
		if(storageNoteNoF){
			a[a.length]=new QParam({key:'storageNoteNoF',value:storageNoteNoF,op:GE});
		}
		var storageNoteNoE=frm.storageNoteNoEnd.getValue();
		if(storageNoteNoE){
			
			a[a.length]=new QParam({key:'storageNoteNoE',value:storageNoteNoE,op:LE});
		}
		
		var storageNoteNo=frm.storageNoteNo.getValue();
		if(storageNoteNo){			
			a[a.length]=new QParam({key:'storageNoteNo',value:storageNoteNo,op:LI});
		}
		
		
		var orderNo=frm.orderNo.getValue();
		if(orderNo)
			a[a.length]=new QParam({key:'entrustNo',value:orderNo,op:LI});
		if(a.length>0){
			store.baseParams={_A:'WSTORAGE_NOTE_X',_ml:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
		}
		else{
			store.baseParams={_A:'WSTORAGE_NOTE_X',_ml:'xml'};
		}
		
		store.load({
			callback:function(r,p,succ){
				if(r.length==0)
	     			XMG.alert(SYS_W,M_NOT_FOUND);
			}
		});
		
	};
	
	var exp=function(){
		
	};
	
	var preCost=function(){
		
		var a=sm.getSelections();		
		
		var xml='';
		//xml= HTUtil.ATX(a,'WStorageNote',WStorageNote);
		if(a.length>0){
			for(var i=0;i<a.length;i++){
				xml=xml+'<WStorageNote>\n<id>'+a[i].get('id')+'</id>\n';
				xml=xml+'<storageNoteNo>'+a[i].get('storageNoteNo')+'</storageNoteNo>\n';
				xml=xml+'<status>'+a[i].get('status')+'</status>\n';
				xml=xml+'</WStorageNote>\n';
			}
		}
		
	/*	var xml ='';
		var a =store.getRange();
		if(a.length>0){
			for(var i=0;i<a.length;i++){
				if(a[i].get('rowAction')!='D' && a[i].get('rowAction')!='N') 
					xml=xml+HTUtil.RTX4R(a[i],t);
			}
		}
		return xml;
		
		var xml =''; 
		xml=xml+'<'+t+'>\n<id>'+r.get('id')+'</id>\n';
		xml += "<rowAction>R</rowAction>\n";
		xml =xml+'</'+t+'>\n';
		return xml;
		*/

		if(!Ext.isEmpty(xml)){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WCOMM_CISSC'},
				success: function(res){
					
					var wrs=HTUtil.XTRA(res.responseXML,'WRate',WRate);
					var wSmartExpenses=HTUtil.XTRA(res.responseXML,'WSmartExpense',WSmartExpense);
					var wsns=HTUtil.XTRA(res.responseXML,'WStorageNote',WStorageNote);
					
					storeWrate.removeAll();
					storeWsmartexpense.removeAll();
					resStore.removeAll();
					resStore.add(wsns);
					storeWrate.add(wrs);
					storeWsmartexpense.add(wSmartExpenses);
					tab.activate(1);
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)
			});
		}
		

	};
	
	//生成费用
	var createCost=function(){
		var a=storeWsmartexpense.getRange();
		
		var xml='';
		xml=HTUtil.ATX(a,'WSmartExpense',WSmartExpense);
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WINVENTORY_CC'},
				success:function(res){
					var a=HTUtil.XTRA(res.responseXML,'WSmartExpense',WSmartExpense);
					HTUtil.RUA(storeWsmartexpense,a,WSmartExpense);
					XMG.alert(SYS,M_S);
				},
				failure:function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)
				});
		}
		
	};
	
	//controls
	var cDf=new Ext.form.DateField({fieldLabel:'接单日期',name:'df',tabIndex:3,format:DATEF,
		altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d',ref:'../df',anchor:'95%'});
	var cDe=new Ext.form.DateField({fieldLabel:'至',name:'de',altFormats:'Ymd|Y/m/d|Y.m.d|Y-m-d',format:DATEF,tabIndex:4,ref:'../de',anchor:'95%'});
	
	var cStorageType=new Ext.form.ComboBox({fieldLabel:'操作类型',name:'storageType',value:t,xtype:'combo',ref:'../storageType',
			store:WHTStore.BIZ_TYPE_S,mode:'local',displayField:'NAME',valueField:'CODE',tabIndex:1,
			triggerAction:'all',selectOnFocus:true,anchor:'95%'});
	
	var cargoOwnerId=null;
	var cCargoOwner={fieldLabel:'货主',name:'cargoOwner',store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwner',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',tabIndex:2,
			displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();	
					cargoOwnerId='';
				}},
			select:function(c,r,i){
				cargoOwnerId=r.get('id');
			},
			keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}};
	
	var cStorageNoteNo={fieldLabel:'仓库编号',name:'storageNoteNo',tabIndex:5,xtype:'textfield',ref:'../storageNoteNo',anchor:'95%'};
	
	var cStorageNoteNoF={fieldLabel:'仓库编号从',name:'storageNoteNoFrom',tabIndex:6,xtype:'textfield',ref:'../storageNoteNoFrom',anchor:'95%'};
	var cStorageNoteNoE={fieldLabel:'至',name:'storageNoteNoEnd',xtype:'textfield',tabIndex:7,ref:'../storageNoteNoEnd',anchor:'95%'};
	var cOrderNo={fieldLabel:'订单号',name:'orderNo',xtype:'textfield',tabIndex:8,ref:'../orderNo',anchor:'95%'};
	
	var frm = new Ext.form.FormPanel({
		title:W_INVENTORY_SEARCH_INFO,
		frame:true,height:150,labelAlign:'right',
		region:'north',layout:'column',layoutConfig:{columns:4},
		items:[
		       {columnWidth:.25,layout:'form',labelWidth:75,border:false,items:[cStorageType,cStorageNoteNo]},
		       {columnWidth:.25,layout:'form',labelWidth:85,border:false,items:[cCargoOwner,cStorageNoteNoF]},
		       {columnWidth:.25,layout:'form',labelWidth:75,border:false,items:[cDf,cStorageNoteNoE]},
		       {columnWidth:.25,layout:'form',labelWidth:75,border:false,items:[cDe,cOrderNo]}]
	});
	
	Fos.SmartExpensePanel.superclass.constructor.call(this,{
		id:'WMS_Smart_Expense'+t,
		title:'智能计费',closable:true,layout:'border',
		tbar:
			[{text:C_REFRESH,iconCls:'refresh',scope:this,handler:refresh},'-',
			 {text:'费用预览',scope:this,handler:preCost},'-',
			 {text:'生成费用',scope:this,handler:createCost},'-',
	        {text:C_EXPORT,iconCls:'print',ref:'../printBtn',scope:this,
	        	menu: {items: [{text:C_CHECK_NOTE,scope:this,handler:exp}]}}
			 ],
		items:[frm,tab]
			
	});
	
};
Ext.extend(Fos.SmartExpensePanel,Ext.Panel);