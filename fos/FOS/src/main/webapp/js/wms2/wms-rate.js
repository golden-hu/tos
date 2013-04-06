//费率管理界面


/////////////////////////////////////////////////////////////////////////////////////////////////////////

//构建费率管理PANEL,左边是列表，右边是费率维护信息
Fos.RatePanel = function() {
	this.sel=-1000;
	var b;
	var puuid='';
	
	//费率Store
	var rateStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WRATE_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WRate',id:'id'},WRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	//商品类别
	var sheetStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WRATESHEET_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WRateSheet',id:'id'},WRateSheet),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
	
	rateStore.load();
	
	
	var re={scope:this,
			/*beforerowselect:function(){
				var rows=rateStore.getModifiedRecords();
				if(rows.length>0){
					XMG.alert(SYS,"修改未保存，请先保存再操作！");
					return ;
				}
			},*/
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
					
					if(record.get('rateType')==0){
						nFreeTime.disable();
					}else{
						nFreeTime.enable();
					}			
					//b作为全局变量，时刻要保持最新的数据内容。
					
					puuid='';
					puuid=record.get('uuid');
					sheetStore.removeAll();
					
					if(record.get('rowAction')!='N'){
					sheetStore.load({params:{rateId:this.sel}});
					
					}
					
				}
			},
			rowdeselect:function(sm,row,record){
				if(centerFrm.getForm().isDirty()){
					record.beginEdit();
					centerFrm.getForm().updateRecord(record);
					if(record.get('rateType')==0){
						nFreeTime.disable();
					}else{
						nFreeTime.enable();
					}
					record.endEdit();
				}
			}
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re});	
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	    {header:'项目代码',dataIndex:'rateCode'},
	    {header:'项目名称',dataIndex:'rateName'},
      	{header:'费用名称',dataIndex:'charName'},
      	{header:'费率类别',dataIndex:'rateType'},
      	{header:'计费方法',dataIndex:'unit'},
      	{header:'包装单位',dataIndex:'unitName'},
      	{header:'单价',dataIndex:'unitPrice'}      	
      	
          ],defaults:{sortable:true,width:100}});
	
	 var rateGrid = new Ext.grid.GridPanel({title:'费率列表',
		    region:'west',width:200,
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
		    			
		    			 
		    			 sheetStore.insert(0,s);
		    			 

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
	 
	 var sheetGrid=new Ext.grid.EditorGridPanel({region:'center',
		 title:'货物类别',
		 layout:'fit',		 
		 store:sheetStore,
		 sm:sm2,
		 cm:sheetCm,
		 tbar:[{text:C_ADD,iconCls:'add',scope:this,disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_ADD),handler:this.addSheet},
		       {text:C_REMOVE,iconCls:'remove',scope:this,disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_DEL),handler:this.removeSheet}]
	 });
	 

	 
	 
	 
	var txtRateCode=new Ext.form.TextField({fieldLabel:'项目代码',name:'rateCode',anchor:'95%'});
	 
	 var txtRateName=new Ext.form.TextField({fieldLabel:'项目名称',name:'rateName',anchor:'95%'});
	 //费用名称
	 var cboCharName=new Ext.form.ComboBox({fieldLabel:W_CHAR_NAME,tabIndex:1,name:'charName',
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
	 //费率类别
	 var cboRateType=new Ext.form.ComboBox({fieldLabel:'结算方式',tabIndex:2,name:'rateType',displayField:'NAME',valueField:'CODE',
			 mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			 store:WHTStore.MODE_S,
			 listeners:{blur:function(f){
				 if(f.getValue()==0){
					 nFreeTime.disable();
				 }
				 else{
					 nFreeTime.enable();
				 }
			 }}});
	 //计费方法 getUNIT_S
	 var cboUnit=new Ext.form.ComboBox({fieldLabel:'计费单位',tabIndex:5,name:'unit',xtype:'combo',displayField:'NAME',valueField:'NAME',
			 mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			 store:WHTStore.PACKAGES_S});
	 
	 //单位名称getPACK_S
	 var cboUnitName=new Ext.form.ComboBox({fieldLabel:'包装名称',tabIndex:6,name:'unitName',xtype:'combo',displayField:'unitName',valueField:'unitName',
			 mode:'remot',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			 store:HTStore.getUNIT_C()});
	 
	 
	 //生效日期
	 var cdfFromDate=new Ext.form.DateField({fieldLabel:W_FROM_DATE,tabIndex:7,name:'fromDate',xtype:'datefield',
		 format:DATEF,anchor:'95%',altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d'});
	 //单价
	 var cnfUnitPrice=new Ext.form.NumberField({fieldLabel:W_UNIT_PRICE,tabIndex:8,name:'unitPrice',xtype:'numberfield',
			 allowNegative:false,decimalPrecision:2,anchor:'95%'});
	 //币别
	 var cboCurrCode=new Ext.form.ComboBox({fieldLabel:W_CURR_CODE,tabIndex:9,name:'currCode',xtype:'combo',displayField:'currCode',valueField:'currCode',
			 mode:'remot',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			 store:HTStore.getCURR_S()});
	 var nFreeTime=new Ext.form.NumberField({fieldLabel:'免费期',name:'freeTime',decimalPrecision:0,anchor:'95%'});
	 
	 //收入标志
	 var chkCostInFlag=new Ext.form.Checkbox({xtype:'checkbox',fieldLabel:W_COST_IN_FLAG,tabIndex:11,
				name:'costInFlag'					
		 });
	 
	 //进仓标志
	 var chkStrongInFlag=new Ext.form.Checkbox({xtype:'checkbox',fieldLabel:W_STRONG_IN_FLAG,tabIndex:12,
				name:'strongInFlag',align:'right'
									
		 });
	 //出仓标志
	 var chkStrongOutFlag=new Ext.form.Checkbox({xtype:'checkbox',fieldLabel:W_STRONG_OUT_FLAG,tabIndex:13,
				name:'strongOutFlag'
										
		 });
	 //其他标志
	 var chkStrongOtherFlag=new Ext.form.Checkbox({xtype:'checkbox',fieldLabel:W_STRONG_OTHER_FLAG,tabIndex:14,
				name:'strongOtherFlag'
								
		 });
	 
	 //库内作业标志
	 var chkOpertionFlag=new Ext.form.Checkbox({xtype:'checkbox',fieldLabel:W_OPERTION_FLAG,tabIndex:15,
				name:'strongInsideFlag'
								
		 });
	
	 
	var basePanel=new Ext.Panel({region:'center',	
		layout:'column',		
		
		split:true,		
		items:[
 	    	 {layout:'form',labelAlign:'right', columnWidth: 0.3,border:false,
	    		 items:[txtRateCode,cboCharName,cboUnit,cnfUnitPrice,cdfFromDate]},
	    	 {layout:'form',labelAlign:'right', columnWidth: 0.3,border:false,
	    		  items:[txtRateName,cboRateType,cboUnitName,cboCurrCode,nFreeTime,chkCostInFlag]},
	    	 {columnWidth:.25,layout:'form',border:false,labelAlign:'right',
		    	  items:[chkStrongInFlag]},
	    	  {columnWidth:.25,layout:'form',border:false,labelAlign:'right',
		    	  items:[chkStrongOutFlag]},
	    	  {columnWidth:.25,layout:'form',border:false,labelAlign:'right',
		    	  items:[chkOpertionFlag]},	    	  
	    	  {columnWidth:.25,layout:'form',border:false,labelAlign:'right',
		    	  items:[chkStrongOtherFlag]}
	    	  ]
	});
	
	
	
		
	 var centerFrm=new Ext.form.FormPanel({layout:'border',
	     region:'center',
	     frame:true,
	     items:[basePanel]
	 });
	 
	 var add=function(){
		/*var rows=rateStore.getModifiedRecords();
		if(rows.length>0){
			XMG.alert(SYS,"修改未保存，请先保存再操作！");
			return ;
		}
			*/
		 puuid=HTUtil.UUID(32);
		 b=new WRate({
			 version:0,
			 uuid:puuid,
			 costInFlag:1,
			 rateType:0,
			 fromDate:new Date(),
			 currCode:'CNY',
			 rowAction:'N'
		 });
		 
		 rateStore.insert(0,b);
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
				rateType:r.get('rateType'),
				unit:r.get('unit'),
				unitId:r.get('unitId'),
				unitName:r.get('unitName'),
				unitPrice:r.get('unitPrice'),
				fromDate:r.get('fromDate'),
				currCode:r.get('currCode'),
				warehouseType:r.get('warehouseType'),			
				strongInFlag:r.get('strongInFlag'),
				strongOutFlag:r.get('strongOutFlag'),
				strongOtherFlag:r.get('strongOtherFlag'),
				strongInsideFlag:r.get('strongInsideFlag')
			});
			rateStore.insert(0,b);
			rateGrid.getSelectionModel().selectFirstRow();
			
			var rs=[];
			var sheetRs=sheetStore.getRange();
			if(sheetRs.length>0){
				for(var i=0;i<sheetRs.length;i++){
					var r=sheetRs[i];
					if(r.get('rowAction')!='R'&&r.get('rowAction')!='D'){
						var b1=new WRateSheet({
							uuid:HTUtil.UUID(32),
							version:0,
							rowAction:'N',
							cargoCategoryId:r.get('cargoCategoryId'),
							categoryCode:r.get('categoryCode'),
							categoryName:r.get('categoryName'),
							cargoId:r.get('cargoId'),
							skuNo:r.get('skuNo'),
							cargoName:r.get('cargoName'),
							puuid:b.get('uuid')
						});
						rs[rs.length]=b1;
					}
				}
				sheetStore.removeAll();
				sheetStore.insert(0,rs);
			}
			
			rs=[];
			var recordRs=recordStore.getRange();
			if(recordRs.length>0){
				for(var i=0;i<recordRs.length;i++){
					var r=recordRs[i];
					if(r.get('rowAction')!='R'&&r.get('rowAction')!='D'){
						var b1=new WRateRecord({
							uuid:HTUtil.UUID(32),
							version:0,
							rowAction:'N',
							fromDate:r.get('fromDate'),
							endDate:r.get('endDate'),
							unitPrice:r.get('unitPrice'),
							recordType:r.get('recordType'),
							
							puuid:b.get('uuid')
						});
						rs[rs.length]=b1;
					}
				}
				recordStore.removeAll();
				recordStore.insert(0,rs);
			}
			
			rs=[];
			var custRs=custStore.getRange();
			if(custRs.length>0){
				for(var i=0;i<custRs.length;i++){
					var r=custRs[i];
					if(r.get('rowAction')!='R'&&r.get('rowAction')!='D'){
						var b1=new WRateRecord({
							uuid:HTUtil.UUID(32),
							version:0,
							rowAction:'N',
							custId:r.get('custId'),
							custCode:r.get('custCode'),
							custName:r.get('custName'),													
							puuid:b.get('uuid')
						});
						rs[rs.length]=b1;
					}
					
				}
				custStore.removeAll();
				custStore.insert(0,rs);
			}
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
			
			var a2=sheetStore.getModifiedRecords();
			if(a2.length>0){xml+=HTUtil.ATX(a2,'WRateSheet',WRateSheet);};
			
			
			if(xml!=''){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WRATE_S'},
					success: function(res){						
						
						var a = HTUtil.XTRA(res.responseXML,'WRate',WRate);
						HTUtil.RUA(rateStore,a,WRate);
						
						var a1=HTUtil.XTRA(res.responseXML,'WRateSheet',WRateSheet);
						HTUtil.RUA(sheetStore,a1,WRateSheet);					
					
						
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
		var btnAdd=new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_ADD),ref:'../addBtn',scope:this,handler:add});		
		var btnCopy=new Ext.Button({text:'复制',iconCls:'copy',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_COPY),ref:'../copyBtn',scope:this,handler:copy});
		var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_SAVE),ref:'../saveBtn',scope:this,handler:save});
        var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_DEL),ref:'../removeBtn',scope:this,handler:remove});
        var btnCommit=new Ext.Button({text:C_COMMIT,iconCls:'check',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_COMMIT),ref:'../checkBtn',scope:this,handler:commit});
        var btnCancelCommit=new Ext.Button({text:C_COMMIT_CANCEL,iconCls:'renew',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_CANCEL_COMMIT),ref:'../unCheckBtn',scope:this,handler:cancelCommit});
        var btnExport=new Ext.Button({text:C_EXPORT,iconCls:'print',disabled:NR(M1_WMS+WM_BASE+M2_RATE+WF_EXPORT),ref:'../printBtn'});
	
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


//自定义控件
Fos.RateLookup = Ext.extend(Ext.form.ComboBox, {
	triggerClass:'x-form-search-trigger',
	constructor:function(config){
		
		Fos.RateLookup.superclass.constructor.apply(this, arguments);
	},
	initComponent:function(){
		Fos.RateLookup.superclass.initComponent.call(this);        
	},
	
	select:function(rate,scope){
		scope.setValue(rate.data[scope.valueField || scope.displayField]);
		scope.fireEvent('select', this, rate, 0);
	},
	
	//弹出窗口按钮
	onTriggerClick:function(event){
		var win = new Fos.WRateWin(this.select,this);
		win.show();
	}
});
Ext.reg('RateLookup', Fos.RateLookup);

Fos.WRateWin = function(fn,scope) {
	//WRATE_QR
	var store=new Ext.data.Store({url:SERVICE_URL+'?_A=WRATE_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WRate',idProperty:'id'},WRate),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	/*if(p){
		var a=[];		
		a[a.length]=new QParam({key:'custId',value:p.get('cargoOwnerId'),op:EQ});
		a[a.length]=new QParam({key:'storageType',value:p.get('storageType'),op:EQ});
		store.baseParams={_A:'WRATE_QR',_mt:'xml',xml:HTUtil.QATX(a)};
		
	}*/
	store.load();
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false });	
	var cm=new Ext.grid.ColumnModel({
		columns:[sm,
              {header:'作业代码',dataIndex:'rateCode'},
	    {header:'作业名称',dataIndex:'rateName'},
      	{header:'收货项目',dataIndex:'charName'},
      	{header:'费率',dataIndex:'unitPrice'},
      	{header:'计费单位',dataIndex:'unitName'}
          ],defaults:{sortable:true,width:100}});
	
	 var grid = new Ext.grid.GridPanel({
		    region:'center',height:320,
		    autoScroll:true,
			store:store,sm:sm,cm:cm
			
		    });
	this.save=function(){
		if(sm.getSelected()){
			fn(sm.getSelected(),scope);
			this.close();
		}
		else{ 
			Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
		}
	};
	var btnSave=new Ext.Button({text:'确认',iconCls:'save',scope:this,handler:this.save});
	Fos.WRateWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:"费率选择",width:800,height:360,modal:true,
	  	items:[grid],
	  	buttons:[btnSave,
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.WRateWin, Ext.Window);
