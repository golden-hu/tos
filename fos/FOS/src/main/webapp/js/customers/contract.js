//费率管理界面


/////////////////////////////////////////////////////////////////////////////////////////////////////////

//构建费率管理PANEL,左边是列表，右边是费率维护信息
Fos.ContractTab = function(p){
	this.sel=-1000;
	var b;
	var puuid='';
	
	//费率Store
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WCONTRACT_RATE_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WContractRate',id:'id'},WContractRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	
	
	var store2 = new Ext.data.Store({url:SERVICE_URL+'?_A=WRATECUST_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WRateCust',id:'id'},WRateCust),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	if(p){
		store.load({params:{contractId:p.get('id')}});
		store2.load({params:{contractId:p.get('id')}});
	}
	
	var cCharName=new Ext.form.ComboBox({displayField:'charCode',valueField:'charName',triggerAction:'all',
        tpl:charTpl,itemSelector:'div.list-item',listWidth:300,allowBlank:false,
        emptyText:'',invalidText:'',mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',
        store:HTStore.getCHAR_S(),enableKeyEvents:true,
        listeners:{scope:this,select:function(c,r,i){
        	var b =sm.getSelected();
        	b.set('charId',r.get('id'));        	
        	b.set('currCode',r.get('currCode'));        	
        	b.set('charName',r.get('charName'));
        	}}});
	var cSkuNo=new Fos.CargoLookUp({displayField:'cargoName',valueField:'skuNo',triggerAction:'all',
		store:WHTStore.getWCargo(),enableKeyEvents:true,tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'local',selectOnFocus:true,
		listeners:{scope:this,
		blur:function(f){},
		select:function(c,r,i){
			var b =sm.getSelected();
			b.set('cargoId',r.get('id'));
			b.set('skuNo',r.get('skuNo'));
			b.set('cargoName',r.get('cargoName'));
		},
		keydown:{fn:function(f,e){WCargoLC(f,e,0,0,'','');},buffer:BFL}		
	}});
	
	 var cPateName=new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',
		 mode:'local',triggerAction:'all',selectOnFocus:true,
		 store:WHTStore.MODE_S,
		 listeners:{blur:function(f){}}});
	 var cUnitName=new Ext.form.ComboBox({displayField:'unitName',valueField:'unitName',
		 mode:'remot',triggerAction:'all',selectOnFocus:true,
		 store:HTStore.getUNIT_C()});
	 var nUnitPrice=new Ext.form.NumberField({allowNegative:false,decimalPrecision:2});
	 var cCurrCode=new Ext.form.ComboBox({displayField:'currCode',valueField:'currCode',triggerAction: 'all',
         allowBlank:false,emptyText:'',invalidText:'',mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
         store:HTStore.getCURR_S()});
	 var cUnitTime=new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction: 'all',
         allowBlank:false,emptyText:'',invalidText:'',mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',
         store:HTStore.TIME_UNIT_S});
	 //收入标志
	 var cCostInFlag=new Ext.form.Checkbox();
	 var cCostOutFlag=new Ext.form.Checkbox();
	 var tRemark=new Ext.form.TextArea();
	 
	var re={scope:this			
	};
	var add=function(){
		var a=new WContractRate({
			uuid:HTUtil.UUID(32),			
			costInFlag:1,
			rowAction:'N'
		});
		store.insert(0,a);
		sm.selectFirstRow();
	};
	
	var del=function(){
		var r=sm.getSelected();
		if(r){
			r.set('rowAction',r.get('rowAction')=='N'?'D':'R');
			store.remove(r);
		}
	};
	var bgAdd=new Ext.Button({text:'新增',iconCls:'add',scope:this,handler:add});
	var bgRemove=new Ext.Button({text:'删除',iconCls:'remove',scope:this,handler:del});
	var costInFlagCol=new Ext.grid.CheckColumn({header:'收标志',dataIndex:'costInFlag',align:'center',editor:cCostInFlag});
	var costOutFlagCol=new Ext.grid.CheckColumn({header:'付标志',dataIndex:'costOutFlag',align:'center',editor:cCostOutFlag});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re});	
	var cm=new Ext.grid.ColumnModel({
		columns:[sm,	   
                {header:'费用名称',dataIndex:'charName',editor:cCharName},
      	      	{header:'SKU',dataIndex:'skuNo',editor:cSkuNo},
      	         costInFlagCol,
      	         costOutFlagCol,
      	      	{header:'结算方式',dataIndex:'pateName',editor:cPateName},
      	      	{header:'计量单位',dataIndex:'unitName',editor:cUnitName},
      	      	{header:'单价',dataIndex:'unitPrice',editor:nUnitPrice},
      	      	{header:'币别',dataIndex:'currCode',editor:cCurrCode},
      	      	{header:'时间单位',dataIndex:'timeUnit',editor:cUnitTime},
      	      	{header:'备注',dataIndex:'remark',editor:tRemark}	
          ],defaults:{sortable:true,width:100}});
	
	 var grid = new Ext.grid.EditorGridPanel({title:'协议费用',
		    region:'south',width:200,clicksToEdit:1,
		    split:true,iconCls:'gen',autoScroll:true,
			store:store,sm:sm,cm:cm,
			tbar:[bgAdd,bgRemove]
	});
	 
	 //grid2
	 var cCustName=new Fos.CustomerLookup({store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			custType:'custBookerFlag',displayField:'custNameCn',valueField:'custNameCn',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					var b=sm2.getSelected();
					b.set('custId','');	
					b.set('custName','');
				}},
			select:function(c,r,i){
				var b=sm2.getSelected();
				b.set('custId',r.get('id'));
				b.set('custName',r.get('custNameCn'));			
				
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});
	
	 var re2={
			 
	 };
	 
	 var add2=function(){
		 var a=new WRateCust({
			uuid:HTUtil.UUID(32),			
			fromDate:new Date(),
			rowAction:'N'
		 });
		 store2.insert(0,a);
		 sm2.selectFirstRow();
	 };
	 var del2=function(){
		 var r=sm2.getSelected();
			if(r){
				r.set('rowAction',r.get('rowAction')=='N'?'D':'R');
				store2.remove(r);
			}
	 };
	 
	 var bAdd2=new Ext.Button({text:'新增',iconCls:'add',scope:this,handler:add2});
	 var bRemove2=new Ext.Button({text:'删除',iconCls:'remove',scope:this,handler:del2});
	 var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re2});	
	 var cm2=new Ext.grid.ColumnModel({columns:
		 [sm,		   
            {header:'客户名称',dataIndex:'custName',editor:cCustName},
          	{header:'合同号',dataIndex:'contractNo',editor:new Ext.form.TextField()},
          	{header:'生产日期',dataIndex:'fromDate',renderer:formatDate,editor:new Ext.form.DateField()},
          	{header:'失效日期',dataIndex:'endDate',renderer:formatDate,editor:new Ext.form.DateField()},
          	{header:'结算日期',dataIndex:'pateDate',renderer:formatDate,editor:new Ext.form.DateField()},      	
          	{header:'备注',dataIndex:'remark',editor:new Ext.form.TextArea()}
	      ],defaults:{sortable:true,width:100}});
		
	 var grid2 = new Ext.grid.EditorGridPanel({title:'客户列表',
			    region:'south',width:200,clicksToEdit:1,
			    split:true,iconCls:'gen',autoScroll:true,
				store:store2,sm:sm2,cm:cm2,
				tbar:[bAdd2,bRemove2]
		});
	 
	 var tContractNo=new Ext.form.TextField({fieldLabel:'协议编号',name:'contractNo',value:p.get('contractNo'),anchor:'95%'});
	 var tContractName=new Ext.form.TextField({fieldLabel:'协议名称',name:'contractName',value:p.get('contractName'),anchor:'95%'});
	 var cIsSure=new Ext.form.ComboBox({fieldLabel:'是否有效',name:'enableFlag',value:HTStore.getEnableFlag(p.get('enableFlag')),
		 store:HTStore.ENABLED_FLAG_S,displayField:'NAME',valueField:'CODE',mode: 'local',triggerAction: 'all',
 		selectOnFocus:true, anchor:'95%'});
	 var dFromDate=new Ext.form.DateField({fieldLabel:'生效日期',name:'fromDate',value:p.get('fromDate'),format:DATEF,anchor:'95%'});
	 var dEndDate=new Ext.form.DateField({fieldLabel:'失效日期',name:'endDate',value:p.get('endDate'),format:DATEF,anchor:'95%'});
	 var cCheckName=new Ext.form.ComboBox({fieldLabel:'审核人',name:'checkBy',value:p.get('checkBy'),disabled:true,anchor:'95%'});
	 var cCheckStatus=new Ext.form.ComboBox({fieldLabel:'审核状态',name:'checkStatus',value:p.get('checkStatus'),disabled:true,anchor:'95%'});
	 var dCheckDate=new Ext.form.DateField({fieldLabel:'审核日期',name:'checkTime',value:p.get('checkTime'),disabled:true,anchor:'95%'});
	
	
	 
	var basePanel=new Ext.form.FormPanel({region:'north',	
		layout:'column',		
		height:70,
		split:true,
		padding:5,
		items:[
 	    	 {layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,
	    		 items:[tContractNo,cCheckName]},
	    	 {layout:'form',labelAlign:'right', columnWidth: 0.25,border:false,
	    		  items:[tContractName,cCheckStatus]},
	    	 {columnWidth:.25,layout:'form',border:false,labelAlign:'right',
		    	  items:[dFromDate,dCheckDate]},
	    	  {columnWidth:.25,layout:'form',border:false,labelAlign:'right',
		    	  items:[dEndDate,cIsSure]}
	    	  ]
	});
	 
	var tab=new Ext.TabPanel({region:'center',plain:true,activeTab:0,defaults:{bodyStyle:'padding:0px'},
		items:[grid,grid2]
	});
	 
	 var remove=function(){
			
	 };
		
	 var save=function(){
		 basePanel.getForm().updateRecord(p);
		 var xml='';
		 xml+=HTUtil.RTX(p,'CContract',CContract);
		 
		 var a=store.getModifiedRecords();
		 if(a.length>0){
			 xml+=HTUtil.ATX(a,'WContractRate',WContractRate);
		 }
		 
		 var b=store2.getModifiedRecords();
		 if(b.length>0){
			 xml+=HTUtil.ATX(b,'WRateCust',WRateCust);
		 }
		 
		 if(xml!=null){
			 Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WCONTRACT_RATE_S'},
					success: function(res){
						var r = HTUtil.XTR(res.responseXML,'CContract',CContract);
						
						HTUtil.RU(r,p,CContract);
						
						var r1 = HTUtil.XTRA(res.responseXML,'WContractRate',WContractRate);
						HTUtil.RUA(store,r1,WContractRate);
						
						var r2 = HTUtil.XTRA(res.responseXML,'WRateCust',WRateCust);
						HTUtil.RUA(store2,r2,WRateCust);
						
						XMG.alert(SYS,M_S);
					},
					failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
					xmlData:HTUtil.HTX(xml)});
		 }		 
	 };
		
	 var commit=function(){
	 };
		
	 var cancelCommit=function(){
			
	 };		
	
	 var bSave=new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_SAVE),ref:'../saveBtn',scope:this,handler:save});
     var bRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_DEL),ref:'../removeBtn',scope:this,handler:remove});
     var bCommit=new Ext.Button({text:C_COMMIT,iconCls:'check',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_COMMIT),ref:'../checkBtn',scope:this,handler:commit});
     var bCancelCommit=new Ext.Button({text:C_COMMIT_CANCEL,iconCls:'renew',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_CANCEL_COMMIT),ref:'../unCheckBtn',scope:this,handler:cancelCommit});
     var bExport=new Ext.Button({text:C_EXPORT,iconCls:'print',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_EXPORT),ref:'../printBtn'});
	
	 Fos.ContractTab.superclass.constructor.call(this,{id:'C_CONTRACT',iconCls:'gen',title:'合同管理',
	  closable:true,layout:'border',
	  tbar:[
				 bSave,
				 bRemove,
				 bCommit,
				 bCancelCommit,
				 bExport
				 ],
	 items:[basePanel,tab]
	});
};
Ext.extend(Fos.ContractTab, Ext.Panel);

Fos.ContractGrid=function(){
var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CCONTRACT_Q',baseParams:{_mt:'xml'},
	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'CContract',id:'id'},CContract),
	remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
store.load({params:{start:0,limit:C_PS20}});
 
var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});

//renderer可以用来对数据进行一定的格式化
var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:'协议编号',align:'center',dataIndex:'contractNo',width:125},	
	{header:'协议名称',dataIndex:'contractName',width:200,align:'center'},
	{header:'生效日期',align:'center',dataIndex:'fromDate',width:200,renderer:formatDate},
	{header:'失效日期',dataIndex:'endDate',width:120,align:'left',renderer:formatDate},
	{header:'审核状态',dataIndex:'checkStatus',width:100,align:'center'}
 ],defaults:{sortable:true,width:60}});

//新增
var add=function(){
	var p = new CContract({uuid:HTUtil.UUID(32),		
		fromDate:new Date(),
		enableFlag:1,
		rowAction:'N'});
	var tab = this.ownerCt;
	tab.setActiveTab(tab.add(new Fos.ContractTab(p)));
};

//删除
this.del=function(){
	var a = sm.getSelected();
	if(a){
		if(a.get('status')!=0){
			Ext.MessagesBox.alert(SYS,'该入库单不是新增状态，不能删除，请先取消提交！');
			return ;
		}
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
        	if(btn == 'yes') {
        		var xml = HTUtil.SMTX4R(sm,'WStorageNote');
            	HTUtil.REQUEST('WSTORAGE_NOTE_S', xml,function(){store.remove(a);});
        	}
		},this);
	}
	else Ext.MessageBox.alert(SYS,M_R_P);
};

//编辑
this.edit=function(){
	var p = sm.getSelected();
	if(p){
		var tab = this.ownerCt;
		var c = 'CONTRACT_'+p.get('uuid');
    	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.ContractTab(p)));
	
	}
};

var contractNo=new Ext.form.TextField();

this.search=function(){
	var contractNo=contractNo.getValue();
	if(!contractNo){
		XMG.alert(SYS,'查询条件不能为空！');return;
	}
	else{
		store.removeAll();
		store.baseParams={_mt:'xml',_A:'CCONTRACT_Q',contractNo:contractNo};
		store.load({
			callback:function(r){
				if(r.length<=0){
					Ext.Msg.alert(SYS,"没有返回的数据!");
				}
			}
		});
	}
};
//新增
var btnAdd=new Ext.Button({text:C_ADD,iconCls:'add',scope:this,handler:add});
//编辑
var btnEdit=new Ext.Button({text:C_EDIT,iconCls:'option',scope:this,handler:this.edit});
//删除
var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del});

var btnSearch=new Ext.Button({text:'快捷查询',iconCls:'search',scope:this,handler:this.search,lableWidth:'right',anchor:'50%'});

Fos.ContractGrid.superclass.constructor.call(this,{id:'CONTRACT_LIST',
	iconCls:'gen',title:'合同列表',
	closable:true,store:store,sm:sm,cm:cm,stripeRows:true,columnLines:true,
	listeners:{scope:this,
		//双击进入编辑
		rowdblclick: function(grid, rowIndex, event){
			this.edit();
		}
	},
	loadMask: true,
	bbar:PTB(store,20),
	tbar:[ btnAdd, btnEdit,btnRemove,'-', {text:'协议编号:'},contractNo,btnSearch]
});
};
Ext.extend(Fos.ContractGrid,Ext.grid.GridPanel);

