//费率管理界面


/////////////////////////////////////////////////////////////////////////////////////////////////////////

//构建费率管理PANEL,左边是列表，右边是费率维护信息
Fos.RatePanel = function() {
	this.sel=-1000;
	var b;
	var puuid='';
	
	//费率Store
	var rateStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WRATE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WRate',id:'id'},WRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	//商品类别
	var rateSheetStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WRATESHEET_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WRateSheet',id:'id'},WRateSheet),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	var rateRecordStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WRATERECORD_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WRateRecord',id:'id'},WRateRecord),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	//客户列表
	var rateCustStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WRATECUST_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WRateCust',id:'id'},WRateCust),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	rateStore.load();
	//rateSheetStore.load();
	
	
	var re={scope:this,
			rowselect:function(sm,row,record){
				if(this.sel!=record.get('id'))
				{
					if(record.get('checkBy')){
						setButtonStatus(true);
					}
					else{
						setButtonStatus(false);
					}
					
					this.sel=record.get('id');
					centerFrm.getForm().reset();
					centerFrm.getForm().loadRecord(record);
									
					//b作为全局变量，时刻要保持最新的数据内容。
					
					puuid='';
					puuid=record.get('uuid');
					rateSheetStore.removeAll();
					rateRecordStore.removeAll();
					rateCustStore.removeAll();
					if(record.get('rowAction')!='N'){
					rateSheetStore.load({params:{rateId:this.sel}});
					rateRecordStore.load({params:{rateId:this.sel}});
					rateCustStore.load({params:{rateId:this.sel}});		
					}
					
				}
			},
			rowdeselect:function(sm,row,record){
				if(centerFrm.getForm().isDirty()){
					record.beginEdit();
					centerFrm.getForm().updateRecord(record);
					record.endEdit();
				}
			}
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re});	
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	    {header:'费率名称',dataIndex:'rateName'},
      	{header:'费用名称',dataIndex:'charName'},
      	{header:'计费方式',dataIndex:'mode'},
      	{header:'计费方法',dataIndex:'unit'},
      	{header:'单价',dataIndex:'unitPrice'},
      	{header:'单位',dataIndex:'unitName'},
      	{header:'货物名称',dataIndex:'cargoName'},
      	{header:'货主',dataIndex:'custName'}
          ],defaults:{sortable:true,width:100}});
	
	 var rateGrid = new Ext.grid.GridPanel({title:'费率列表',
		    region:'west',width:400,
		    split:true,iconCls:'gen',autoScroll:true,
			store:rateStore,sm:sm,cm:cm
			
		    });
	 
	//商品名称
		var ccboCargoName=new Fos.CargoLookUp({fieldLabel:C_CARGO_NAME,tabIndex:51,
			    name:'cargoName',
				store:WHTStore.getWCargo(),enableKeyEvents:true,
				displayField:'skuNo',valueField:'cargoName',itemCls:'required',
				tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
				typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
				listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						var p = sm2.getSelected();
						p.set('cargoId','');				
						p.set('skuNo','');
						p.set('cargoCategoryId','');
						p.set('categoryCode','');
						p.set('categoryName','');
						
					}},
				select:function(c,r,i){	
					var p = sm2.getSelected();
					p.set('cargoName',r.get('cargoName'));
					p.set('cargoId',r.get('id'));				
					p.set('skuNo',r.get('skuNo'));
					p.set('cargoCategoryId',r.get('categoryId'));
					p.set('categoryCode',r.get('categoryCode'));
					p.set('categoryName',r.get('categoryName'));
					
					
				},
				keydown:{
					fn:function(f,e){
						WBlockLC(f,e,0,0,'','');
						},
					buffer:BFL
				}
				
			}});
	 //getWGGATEGORY_S
	 var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	 var sheetCm=new Ext.grid.ColumnModel({columns:[sm2,
	     {header:'货物名称',dataIndex:'cargoName',editor:ccboCargoName},
	     {header:'货物编号',dataIndex:'skuNo'},
	     {header:'商品类别',dataIndex:'categoryName',width:150}
	    ],defaults:{sortable:true,width:100}
		 
	 });
	 
	 this.selectCargo=function(cargos,scope){
			//scope.setValue(cargo.data['cargoName']);
			//scope.fireEvent('select', this, cargo, 0);
		 
			 if(cargos.length>0){
				 var r = rateGrid.getSelectionModel().getSelected();
		    		sheetGrid.stopEditing();
		    		for(var i=0;i<cargos.length;i++){
		    			
		    			 var s=new WRateSheet({uuid:HTUtil.UUID(32),
		    				   rowAction:'N',
		    				   rateId:r.get('id'),
		    				   cargoId:cargos[i].get('cargoId'),
		    				   skuNo:cargos[i].get('skuNo'),
		    				   cargoName:cargos[i].get('cargoName'),
		    				 puuid:puuid});	
		    			
							s.set('cargoCategoryId',cargos[i].get('categoryId'));
							s.set('categoryCode',cargos[i].get('categoryCode'));
							s.set('categoryName',cargos[i].get('categoryName'));
		    			
		    			 
		    			 rateSheetStore.insert(0,s);
		    			 

		    		}
		    		sheetGrid.getSelectionModel().selectFirstRow();
	   			 sheetGrid.startEditing(0,1);
		    	}
		    	else{
		    		alert("p.length="+cargos.length);
		    	}
		 
	};
	 
	 this.addSheet=function()
	 {
		 var r = rateGrid.getSelectionModel().getSelected();
		 if(r)
		 {
			 if(r.get('rowAction')=='N'){
				 Ext.Msg.alert(SYS,'费率主信息未保存，请先保存！');
				 return ;
			 }
			
			 var window=new Fos.MultipleSelectCargoWin(this.selectCargo,this);
	    	window.show();
	    	
	    	
	    	
		 }
		 else
			 XMG.alert(SYS,M_NO_DATA_SELECTED);
		 
	 };
	 
	 this.removeSheet=function(){
		 var r=sheetGrid.getSelectionModel().getSelections();
		 if(r){
			 for(var i=0;i<r.length;i++)
			 {
				 r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				 sheetGrid.getStore().remove(r[i]);
				
			 }
		 }
		 else
			 XMG.alert(SYS,M_NO_DATA_SELECTED);
		 
	 };
	 
	 var sheetGrid=new Ext.grid.EditorGridPanel({iconCls:'gen',autoScroll:true,		 
		 store:rateSheetStore,sm:sm2,cm:sheetCm,
		 tbar:[{text:C_ADD,iconCls:'add',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_ADD),handler:this.addSheet},
		       {text:C_REMOVE,iconCls:'remove',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_DEL),handler:this.removeSheet}]
	 });
	 
	 var sm3=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	 var recordCm=new Ext.grid.ColumnModel({
		 columns:[new Ext.grid.RowNumberer(),sm3,
		          {header:'区间',dataIndex:'Days',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		          {header:'区段',dataIndex:'daysStep',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		          {header:'计费单价',dataIndex:'unitPrice',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})},
		          {header:'类别',dataIndex:'recordType',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})}
		          ],
		 defaults:{sortable:true,width:100}
	 });
	 
	 this.addRecord=function()
	 {
		 var r = rateGrid.getSelectionModel().getSelected();
		 if(r)
		 {
			 if(r.get('rowAction')=='N'){
				 Ext.Msg.alery(SYS,'未保存主信息，请先保存再操作！');
				 return ;
			 }
			 var s=new WRateRecord({uuid:HTUtil.UUID(32),rowAction:'N',				
				 puuid:puuid});	
			
			 recordGrid.stopEditing();
			 rateRecordStore.insert(0,s);
			 recordGrid.getSelectionModel().selectFirstRow();
			 recordGrid.startEditing(0,1);
		 }
		 else
			 XMG.alert(SYS,M_NO_DATA_SELECTED);
		 
	 };
	 
	 this.removeRecord=function(){
		 var r=recordGrid.getSelectionModel().getSelections();
		 if(r){
			 for(var i=0;i<r.length;i++)
			 {
				 r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				 recordGrid.getStore().remove(r[i]);
				
			 }
		 }
		 else
			 XMG.alert(SYS,M_NO_DATA_SELECTED);
		 
	 };
	 
	 var recordGrid=new Ext.grid.EditorGridPanel({iconCls:'gen',autoScroll:true,
		 store:rateRecordStore,sm:sm3,cm:recordCm,
		 tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:this.addRecord},
		       {text:C_REMOVE,iconCls:'remove',scope:this,handler:this.removeRecord}]
	 });
	 
	 var sm4=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	 var custCm=new Ext.grid.ColumnModel({
		 columns:[sm4,
		          {header:'客户名称',dataIndex:'custName',width:150,editor:new Fos.CustomerLookup({displayField:'custCode',valueField:'custName',triggerAction:'all',
		              mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
		              //custType:t=='R'?'custArFlag':'custApFlag',
		              allowBlank:false,blankText:'',invalidText:'',selectOnFocus:true,listClass:'x-combo-list-small',
		              store:HTStore.getCS(),enableKeyEvents:true,
		              listeners:{scope:this,
		              	select:function(c,r,i){
		  					var b =sm4.getSelected();
		  					b.set('custId',r.get('id'));
		  					b.set('custName',r.get('custNameCn'));
		  					b.set('custCode',r.get('custCode'));
		  				},
		             		keydown:{fn:function(f,e){
		  					LC(f,e,t=='R'?'custArFlag':'custApFlag',1);
		  					},buffer:500}
		  			}})},
		          {header:'合同号',dataIndex:'custId',editor:new Ext.form.TextField({allowBlank:false,blankText:'',invalidText:''})}],
		 defaults:{sortable:true,width:100}
	 });
	 
	 this.addCust=function()
	 {
		 var r = rateGrid.getSelectionModel().getSelected();
		 if(r)
		 {
			 if(r.get('rowAction')=='N'){
				 Ext.Msg.alery(SYS,'未保存主信息，请先保存再操作！');
				 return ;
			 }
			 var s=new WRateCust({uuid:HTUtil.UUID(32),rowAction:'N',rateId:r.get('id'),				
				 puuid:puuid});	
			
			 custGrid.stopEditing();
			 rateCustStore.insert(0,s);
			 custGrid.getSelectionModel().selectFirstRow();
			 custGrid.startEditing(0,1);
		 }
		 else
			 XMG.alert(SYS,M_NO_DATA_SELECTED);
		 
	 };
	 
	 this.removeCust=function(){
		 var r=custGrid.getSelectionModel().getSelections();
		 if(r){
			 for(var i=0;i<r.length;i++)
			 {
				 r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				 custGrid.getStore().remove(r[i]);
				
			 }
		 }
		 else
			 XMG.alert(SYS,M_NO_DATA_SELECTED);
		 
	 };
	 
	 var custGrid=new Ext.grid.EditorGridPanel({iconCls:'gen',autoScroll:true,
		 store:rateCustStore,sm:sm4,cm:custCm,
		 tbar:[{text:C_ADD,iconCls:'add',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_ADD),handler:this.addCust},
		       {text:C_REMOVE,iconCls:'remove',scope:this,hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_DEL),handler:this.removeCust}]
	 });
	 
	 //商品类别数据集
	 var charStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WCARGO_Q',baseParams:{_mt:'json'},
			reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WCargo',id:'id'},WCargo),
			remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	 
	 var unitStore=new Ext.data.Store({url:SERVICE_URL+'?_A=UNIT_Q',baseParams:{_mt:'json'},
			reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'GUnit',id:'id'}, GUnit),
			remoteSort:true,sortInfo:{field:'id',direction:'desc'}});
	 
	 var txtRateName=new Ext.form.TextField({fieldLabel:'费率名称',name:'rateName',anchor:'95%'});
	 //费用名称
	 var f1=new Ext.form.ComboBox({fieldLabel:W_CHAR_NAME,tabIndex:1,name:'charName',
	    		store:HTStore.getCHAR_S(),xtype:'combo',
	    		displayField:'charName',valueField:'charName',
	    		typeAhead: true,mode: 'remote',triggerAction: 'all',
	    		selectOnFocus:true,anchor:'95%',
	    		listeners:{select:function(c,r,i){
	    			var re=sm.getSelected();
	    			if(re){
	    				re.set('charId',r.get('id'));
	    				re.set('charCode',r.get('charCode'));
	    			}
		          //b.set('charCode',r.get('charCode'));
	             }}	});
	 //最小计费单位
	 var f2={fieldLabel:W_MIN_QUANTITY,tabIndex:3,name:'minQuantity',xtype:'numberfield',
			 allowNegative:false,decimalPrecision:2,anchor:'95%'};
	 //计费方式
	 var f3=new Ext.form.ComboBox({fieldLabel:'计费方式',tabIndex:2,name:'mode',xtype:'combo',displayField:'NAME',valueField:'NAME',
			 mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			 store:WHTStore.MODE_S});
	 //计费方法 getUNIT_S
	 var f4={fieldLabel:'计费方法',tabIndex:5,name:'unit',xtype:'combo',displayField:'NAME',valueField:'NAME',
			 mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			 store:WHTStore.PACKAGES_S};
	 
	 //单位名称getPACK_S
	 var f5={fieldLabel:W_UNIT_NAME,tabIndex:6,name:'unitName',xtype:'combo',displayField:'unitName',valueField:'unitName',
			 mode:'remot',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			 store:HTStore.getUNIT_C()};
	 //费率类别
	 var f6={fieldLabel:'结算方式',tabIndex:4,name:'rateType',xtype:'textfield',anchor:'95%'};
	 
	 //生效日期
	 var f7={fieldLabel:W_FROM_DATE,tabIndex:7,name:'fromDate',xtype:'datefield',format:DATEF,anchor:'95%',altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d'};
	 //单价
	 var f8={fieldLabel:W_UNIT_PRICE,tabIndex:8,name:'unitPrice',xtype:'numberfield',
			 allowNegative:false,decimalPrecision:2,anchor:'95%'};
	 //币别
	 var f9={fieldLabel:W_CURR_CODE,tabIndex:9,name:'currCode',xtype:'combo',displayField:'currCode',valueField:'currCode',
			 mode:'remot',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			 store:HTStore.getCURR_S()};
	 //仓库类型
	 var f10={fieldLabel:W_WAREHOUSE_TYPE,tabIndex:10,name:'warehouseType',xtype:'combo',displayField:'NAME',valueField:'CODE',
			 mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			 store:WHTStore.WAREHOUSE_TYPE_S};
	 
	 var cboCustName=new Fos.CustomerLookup({fieldLabel:'货主',name:'custName',displayField:'custNameCn',valueField:'custNameCn',triggerAction:'all',
         mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
         
         allowBlank:false,blankText:'',invalidText:'',selectOnFocus:true,listClass:'x-combo-list-small',
         store:HTStore.getCS(),enableKeyEvents:true,anchor:'95%',
         listeners:{scope:this,
         	select:function(c,r,i){
					var b =sm.getSelected();
					b.set('custId',r.get('id'));
					b.set('custName',r.get('custNameCn'));
					b.set('custCode',r.get('custCode'));
				},
        		keyup:{fn:function(f,e){
					LC(f,e,t=='R'?'custArFlag':'custApFlag',1);
					},buffer:500}
			}});
	 
	//商品名称
		var cboCargoName=new Fos.CargoLookUp({fieldLabel:C_CARGO_NAME,tabIndex:51,
			    name:'cargoName',
				store:WHTStore.getWCargo(),enableKeyEvents:true,
				displayField:'skuNo',valueField:'cargoName',
				tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
				typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
				listeners:{scope:this,
				blur:function(f){
					var b =sm.getSelected();
					if(f.getRawValue()==''){
						f.clearValue();
						b.set('cargoId','');
						b.set('cargoCode','');
						
					}},
				select:function(c,r,i){	
					var b =sm.getSelected();
					b.set('cargoId',r.get('id'));
					b.set('cargoCode',r.get('skuNo'));
				
				},
				keydown:{
					fn:function(f,e){
						WBlockLC(f,e,0,0,'','');
						},
					buffer:BFL
				}
				
			}});
	 
	 //收入标志
	 var chkCostInFlag={xtype:'checkbox',labelSeparator:'',boxLabel:W_COST_IN_FLAG,tabIndex:11,
				name:'costInFlag'
					//,checked:b.get('costInFlag')=='1'
		 };
	 
	 //进仓标志
	 var chkStrongInFlag={xtype:'checkbox',labelSeparator:'',boxLabel:W_STRONG_IN_FLAG,tabIndex:12,
				name:'strongInFlag',align:'left'
					//,checked:b.get('strongInFlag')=='1'					
		 };
	 //出仓标志
	 var chkStrongOutFlag={xtype:'checkbox',labelSeparator:'',boxLabel:W_STRONG_OUT_FLAG,tabIndex:13,
				name:'strongOutFlag'
					//,check:b.get('strongOutFlag')=='0'					
		 };
	 //其他标志
	 var chkStrongOtherFlag={xtype:'checkbox',labelSeparator:'',boxLabel:W_STRONG_OTHER_FLAG,tabIndex:14,
				name:'strongOtherFlag'
					//,check:b.get('strongOtherFlag')=='0'				
		 };
	 
	 //库内作业标志
	 var chkOpertionFlag={xtype:'checkbox',labelSeparator:'',boxLabel:W_OPERTION_FLAG,tabIndex:15,
				name:'strongInsideFlag'
					//,check:b.get('strongInsideFlag')=='0'					
		 };
	 
	 var chkItems={autoHeight:true,layout:'column',collapsible:true,frame:true,labelWidth:10,
		    	items:[{columnWidth:.3,layout:'form',border:false,
		    			items:[chkStrongInFlag,chkOpertionFlag]},
		          	{columnWidth:.3,layout:'form',border:false,
		    			items:[chkStrongOutFlag,chkStrongOtherFlag]},
		          		
				]};
	 
	
	 

	 
	 
	var basePanel=new Ext.Panel({		
		region:'north',
		layout:'column',		
		height:200,
		split:true,		
		items:[
 	    	 {layout:'form',labelAlign:'right', columnWidth: 0.5,border:false,
	    		 items:[txtRateName,f1,f4,f7,f9]},
	    	 {layout:'form',labelAlign:'right', columnWidth: 0.5,border:false,
	    		  items:[chkCostInFlag,f3,f5,f8,f10]}
	    	  ]
	});
	
	
	var t1={title:'出现位置',layout:'fit',deferredRender:false,layout:'form',
			collapsible:true,bodyStyle:'padding:0px',
			items:[chkItems]};
	var t2={title:'商品类别',layout:'fit',deferredRender:false,collapsible:true,bodyStyle:'padding:0px',items:[sheetGrid]};
	var t3={title:'仓租算法',layout:'fit',deferredRender:false,collapsible:true,bodyStyle:'padding:0px',items:[recordGrid]};
	var t4={title:'协议客户',layout:'fit',deferredRender:false,collapsible:true,bodyStyle:'padding:0px',items:[custGrid]};
	var cargoPanel=new Ext.TabPanel({region:'center',
		plain:true,activeTab:0,defaults:{bodyStyle:'padding:0px'},
		items:[t1,t2,t4
		       //,t3
		       ]		
	});
	
	 var centerFrm=new Ext.form.FormPanel({layout:'border',		
	     region:'center',
	     frame:true,
	     items:[basePanel,cargoPanel]
	 });
	 
	 var add=function(){
		 puuid=HTUtil.UUID(32);
		 b=new WRate({
			 version:0,
			 uuid:puuid
		 });
		 
		 rateStore.insert(0,b);
		 
		 b.set('rowAction','N');
		 //this.resel=true;
		 rateGrid.getSelectionModel().selectFirstRow();
	 };
	 
	 var copy=function(){
		var r=sm.getSelected();
		if(r){
			b=new WRate({
				uuid:HTUtil.UUID(32),
				version:0,
				rowAction:'N',
				charCode:r.get('charCode'),
				charName:r.get('charName'),
				costInFlag:r.get('costInFlag'),
				mode:r.get('mode'),
				unit:r.get('unit'),
				unitId:r.get('unitId'),
				unitName:r.get('unitName'),
				unitPrice:r.get('unitPrice'),
				fromDate:r.get('fromDate'),
				currCode:r.get('currCode'),
				warehouseType:r.get('warehouseType'),
				custName:r.get('custName'),
				custId:r.get('custId'),
				custCode:r.get('custCode'),
				cargoId:r.get('cargoId'),
				cargoCode:r.get('cargoCode'),
				cargoName:r.get('cargoName'),
				strongInFlag:r.get('strongInFlag'),
				strongOutFlag:r.get('strongOutFlag'),
				strongOtherFlag:r.get('strongOtherFlag'),
				strongInsideFlag:r.get('strongInsideFlag')
			});
			rateStore.insert(0,b);
			 rateGrid.getSelectionModel().selectFirstRow();
		}
	 };
	 
	 var remove=function(){
			var record =rateGrid.getSelectionModel().getSelected();
			if(record){
				
				record.set('rowAction',record.get('rowAction')=='N'?'D':'R');
				rateStore.remove(record);
				centerFrm.getForm().reset();
				b=null;
				
				//TODO:下载从表的数据
	    	}
			else XMG.alert(SYS,M_R_P);
		};
		
		var save=function(){
			rateGrid.stopEditing();
		    sheetGrid.stopEditing();
		    recordGrid.stopEditing();
		    custGrid.stopEditing();		
			
			var re=rateGrid.getSelectionModel().getSelected();
			if(re){
				re.beginEdit();
				centerFrm.getForm().updateRecord(re);
				//re.set('charCode',b.get('charCode'));
				re.endEdit();
			}
			
			//构建XML
			var xml='';
			var a =rateStore.getModifiedRecords();
			if(a.length>0){xml = HTUtil.ATX(a,'WRate',WRate);};	
			
			var a2=rateSheetStore.getModifiedRecords();
			if(a2.length>0){xml+=HTUtil.ATX(a2,'WRateSheet',WRateSheet);};
			
			var a3=rateRecordStore.getModifiedRecords();
			if(a3.length>0){xml+=HTUtil.ATX(a3,'WRateRecord',WRateRecord);};
			
			var a4=rateCustStore.getModifiedRecords();
			if(a4.length>0){xml+=HTUtil.ATX(a4,'WRateCust',WRateCust);};
			
			if(xml!=''){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRATE_S'},
					success: function(res){
						var c=HTUtil.XTR(res.responseXML,'WRate',WRate);
						//var ra=b.get('rowAction');
					    var f = WRate.prototype.fields;
						/*//b.beginEdit();
						for (var i = 0; i < f.keys.length; i++) {
							var fn = ''+f.keys[i];
							b.set(fn,c.get(fn));
						};
						if(ra=='N')
							b.set('rowAction','M');
						b.endEdit();*/
						
						
						var a = HTUtil.XTRA(res.responseXML,'WRate',WRate);
						HTUtil.RUA(rateStore,a,WRate);
						
						var a1=HTUtil.XTRA(res.responseXML,'WRateSheet',WRateSheet);
						HTUtil.RUA(rateSheetStore,a1,WRateSheet);
						
						var a2=HTUtil.XTRA(res.responseXML,'WRateRecord',WRateRecord);
						HTUtil.RUA(rateRecordStore,a2,WRateRecord);
						
						var a3=HTUtil.XTRA(res.responseXML,'WRateCust',WRateCust);
						HTUtil.RUA(rateCustStore,a3,WRateCust);
						
						XMG.alert(SYS,M_S);
					},
					failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
					xmlData:HTUtil.HTX(xml)});
					
					
			}			
		
		};
		
		var commit=function(){
			var r=sm.getSelected();
			if(r){
				//WRATE_C
				var xml=HTUtil.RTX(r,'WRate',WRate);
				if(xml!=''){
					Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
						params:{_A:'WRATE_C',type:1},
						success: function(res){
							var a = HTUtil.XTRA(res.responseXML,'WRate',WRate);
							HTUtil.RUA(rateStore,a,WRate);
							setButtonStatus(true);
							XMG.alert(SYS,M_S);
						},
						failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
						xmlData:HTUtil.HTX(xml)});
				}
			}
		};
		var cancelCommit=function(){
			var r=sm.getSelected();
			if(r){
				var xml=HTUtil.RTX(r,'WRate',WRate);
				if(xml!=''){
					Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
						params:{_A:'WRATE_C',type:0},
						success: function(res){
							var a = HTUtil.XTRA(res.responseXML,'WRate',WRate);
							HTUtil.RUA(rateStore,a,WRate);
							setButtonStatus(false);
							XMG.alert(SYS,M_S);
						},
						failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
						xmlData:HTUtil.HTX(xml)});
				}
			}
		};
		
		var setButtonStatus=function(isChecked){
			if(isChecked){
				btnSave.disable();
				btnRemove.disable();
				btnCommit.disable();
			}
			else{
				btnSave.enable();
				btnRemove.enable();
				btnCommit.enable();
				btnCancelCommit.disable();
			}
		};
		var btnAdd=new Ext.Button({text:C_ADD,iconCls:'add',hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_ADD),ref:'../addBtn',scope:this,handler:add});		
		var btnCopy=new Ext.Button({text:'复制',iconCls:'copy',hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_COPY),ref:'../copyBtn',scope:this,handler:copy});
		var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_SAVE),ref:'../saveBtn',scope:this,handler:save});
        var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_DEL),ref:'../removeBtn',scope:this,handler:remove});
        var btnCommit=new Ext.Button({text:C_COMMIT,iconCls:'check',hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_COMMIT),ref:'../checkBtn',scope:this,handler:commit});
        var btnCancelCommit=new Ext.Button({text:C_COMMIT_CANCEL,iconCls:'renew',hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_CANCEL_COMMIT),ref:'../unCheckBtn',scope:this,handler:cancelCommit});
        var btnExport=new Ext.Button({text:C_EXPORT,iconCls:'print',hidden:NR(M1_WMS+WM_BASE+M2_RATE+WF_EXPORT),ref:'../printBtn'});
	
	  Fos.RatePanel.superclass.constructor.call(this,{id:'WMS-RATE',iconCls:'gen',title:'费率管理',
			closable:true,	
			layout:'border',
			tbar:
				[btnAdd,
				 btnCopy,
				 btnSave,
				 btnRemove,
				 btnCommit,
				 btnCancelCommit,
				 btnExport
				 ],
			items:[rateGrid,centerFrm]
			
		    });
};
Ext.extend(Fos.RatePanel, Ext.Panel);

/////////////////////////////////////////////////////////////////////////////////////////////

Fos.WStorageRateWin = function(p,rateStore) {
	//WRATE_QR
	var store=new Ext.data.Store({url:SERVICE_URL+'?_A=WRATE_QR',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WRate',idProperty:'id'},WRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	if(p){
		var a=[];
		
		a[a.length]=new QParam({key:'custId',value:p.get('cargoOwnerId'),op:EQ});
		a[a.length]=new QParam({key:'storageType',value:p.get('storageType'),op:EQ});
		store.baseParams={_A:'WRATE_QR',_mt:'xml',xml:HTUtil.QATX(a)};
		store.load();
	}
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false });	
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	    {header:'费率名称',dataIndex:'rateName'},
      	{header:'费用名称',dataIndex:'charName'},
      	{header:'计费方式',dataIndex:'mode'},
      	{header:'计费方法',dataIndex:'unit'},
      	{header:'单价',dataIndex:'unitPrice'},
      	{header:'单位',dataIndex:'unitName'}
          ],defaults:{sortable:true,width:100}});
	
	 var grid = new Ext.grid.GridPanel({
		    region:'center',height:320,
		    autoScroll:true,
			store:store,sm:sm,cm:cm
			
		    });
	this.save=function(){
		var r=sm.getSelections();
		var rateName='';
		if(r.length>0){
			var rr=rateStore.getRange();
			for(var i=0;i<r.length;i++){
				var a=r[i];
				var isExist=false;
				for(var j=0;j<rr.length;j++){
					if(rr[j].get('rateId')==a.get('id')){
						isExist=true;
						rateName=rateName+a.get('rateName')+"\r\n";
					}
				}
				if(!isExist){
					var c=new WStorageRate({
						uuid:HTUtil.UUID(32),
						storageNoteId:p.get('id'),
						storageNoteNo:p.get('storageNoteNo'),
						charName:a.get('charName'),
						rateId:a.get('id'),
						rateName:a.get('rateName'),
						mode:a.get('mode'),
						accountMethod:a.get('unit'),
						unitName:a.get('unitName'),
						unitPrice:a.get('unitPrice'),
						accountId:p.get('cargoOwnerId'),
						accountName:p.get('cargoOwnerName'),
						rowAction:'N'
					});
					
					rateStore.add(c);
				}
				
			}
		}
		if(!Ext.isEmpty(rateName)){
			Ext.Msg.alert(SYS,rateName+" 已存在！");
		}
		this.close();
	};
	var btnSave=new Ext.Button({text:'确认',iconCls:'save',scope:this,handler:this.save});
	Fos.WStorageRateWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:"费率选择",width:800,height:360,modal:true,
	  	items:[grid],
	  	buttons:[btnSave,
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.WStorageRateWin, Ext.Window);
