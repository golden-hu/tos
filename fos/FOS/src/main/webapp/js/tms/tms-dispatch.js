Fos.TransTaskGrid = function(){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'TTRT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TTransTask',id:'id'},TTransTask),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	store.load({params:{start:0,limit:C_PS}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[
	     new Ext.grid.RowNumberer(),sm,
        {header:C_TRANS_TASK_NO,dataIndex:'transTaskNo',width:100},
  	    {header:'车队',dataIndex:'motorcadeName',width:100},
  	    {header:C_VEHICLE_NO,dataIndex:'vehicleNo',width:100},
  	    {header:'车队联系人',dataIndex:'motorcadeContact',width:100},
  	    {header:'车队电话',dataIndex:'motorcadeTel',width:100},
  	    {header:'驾驶员',dataIndex:'driverName',width:100},
  	    {header:'司机电话',dataIndex:'driverTel',width:100},
  	    {header:'发货地点',dataIndex:'placeFromName',width:100},
  	    {header:'交货地点',dataIndex:'placeToName',width:100},
  	    {header:'空载公里数',dataIndex:'emptyMiles',width:100},
  	    {header:'重载公里数',dataIndex:'heavyMiles',width:100},
  	    {header:'件数合计',dataIndex:'packages',width:100},
  	    {header:'毛重合计',dataIndex:'grossWeight',width:100},
  	    {header:'体积合计',dataIndex:'measurement',width:100},
  	    {header:'发车日期',dataIndex:'startDate',renderer:formatDate,width:100},
  	    {header:'完成日期',dataIndex:'endDate',renderer:formatDate,width:100}
	],defaults:{sortable:false,width:100}});
	
	this.showTask = function(p){    	
    	var taskTab = new Fos.TransTaskTab(p,store);
    	createWindow('TASK_'+p.get("uuid"),
    		p.get('rowAction')=='N'?C_ADD_TRANS_TASK:C_TRANS_TASK+'-'+p.get('transTaskNo'),
    		taskTab,true,1000,600);
    	
    };
    
	this.add=function(){
		var p = new TTransTask({uuid:HTUtil.UUID(32),rowAction:'N'}); 
		this.showTask(p);
	};
	
	this.del=function(){
		var b =sm.getSelected();
		if(b){
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(b,'TTransTask');
	        		HTUtil.REQUEST('TTRT_R', xml, function(){store.remove(b);});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
	};
	
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showTask(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	//查询
	this.search=function(){
		var transTaskNo=kw.getValue();
		if(!transTaskNo){
			XMG.alert(SYS,C_TRANS_TASK_NO_REQUIRED,function(b){kw.focus();});
			return;
		}else{
			if(transTaskNo=='请输入派车单号...'){
				XMG.alert(SYS,C_TRANS_TASK_NO_REQUIRED,function(b){kw.focus();});
				return;
			}else{
				var a=[];
	 			a[a.length]={key:'transTaskNo',value:transTaskNo,op:LI};
		     	store.baseParams={_A:'TTRT_SEARCH',_mt:'json',xml:Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(a)))};
		     	store.reload({params:{start:0,limit:C_PS},callback:function(r){
		     		if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}
		     	});
			}
		};
	};
	
	var kw = new Ext.form.TextField({value:'请输入派车单号...',
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER) 
					this.search();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	
	var m = M1_TMS + TMS_TTASK;
	
	var btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(m+F_M),
		scope:this,handler:this.add});
	var btnEdit = new Ext.Button({text:C_EDIT,iconCls:'option',disabled:NR(m+F_V),
		scope:this,handler:this.edit});
	var btnRemove = new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_R),
		scope:this,handler:this.del});
	var btnSearch = new Ext.Button({text:C_SEARCH,iconCls:'search',handler:this.search});
	
	Fos.TransTaskGrid.superclass.constructor.call(this,{title:C_TRANS_TASK_LIST,
		id:'G_TTRT',iconCls:'grid',autoScroll:true,sm:sm,cm:cm,store:store,closable:true,
		listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var p=sm.getSelected();
				if(p){
					this.showTask(p);
				}
			}
		},
		tbar:[btnAdd,'-',btnEdit,'-',btnRemove,'-',kw,btnSearch],
		bbar:PTB(store,C_PS)
	});
};
Ext.extend(Fos.TransTaskGrid, Ext.grid.GridPanel);

Fos.TransTaskTab = function(p,listStore) {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TCAR_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TCargo',id:'id'},TCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	if(p.get('rowAction')!='N')
		store.load({params:{transTaskId:p.get('id')}});
	
	var driverStroe = new Ext.data.Store({url:SERVICE_URL+'?_A=DRIV_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var vehicleStroe = new Ext.data.Store({url:SERVICE_URL+'?_A=VEHI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//派车单号
	var txtTaskNo = new Ext.form.TextField({fieldLabel:C_TRANS_TASK_NO,
			name:'transTaskNo',value:p.get('transTaskNo'),disabled:true,tabIndex:1,anchor:'95%'
		});
	
	//车队
	var cboMotorcadeName = new Fos.CustomerLookup({fieldLabel:C_MOTORCADE,
			name:'motorcadeName',value:p.get('motorcadeName'),
		 	itemCls:'required',tabIndex:2,store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			custType:'custTrackFlag',
			displayField:'custCode',valueField:'custNameCn',typeAhead:true,
			mode:'remote',triggerAction:'all',
			selectOnFocus:true,anchor:'95%',bizType:BT_T,blankText:'不能为空',
			listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						p.set('motorcadeId','');
						p.set('motorcadeName','');
					}
				},
				select:function(c,r,i){
					txtMotorcadeContact.setValue(r.get('custContact'));
					txtMotorcadeTel.setValue(r.get('custTel'));
					p.set('motorcadeId',r.get('id'));
				},
				keydown:{fn:function(f,e){
					LC(f,e,'custTrackFlag');
					if(e.getKey()==e.ENTER){
						txtMotorcadeContact.focus();
					} 
				},buffer:BF}
			}
		});
	
	//车队联系人
	var txtMotorcadeContact = new Ext.form.TextField({fieldLabel:C_MOTORCADE_CONTACT,
		name:'motorcadeContact',value:p.get('motorcadeContact'),
		tabIndex:3,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMotorcadeTel.focus();
				} 
			}
		}
	});
	
	//车队联系电话
	var txtMotorcadeTel = new Ext.form.TextField({fieldLabel:C_MOTORCADE_TEL,
		name:'motorcadeTel',value:p.get('motorcadeTel'),tabIndex:4,anchor:'95%',
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboVehicleNo.focus();
				} 
			}
		}
	});
	
	//车牌号
	var cboVehicleNo = new Ext.form.ComboBox({fieldLabel:C_VEHICLE_NO,
			name:'vehicleNo',value:p.get('vehicleNo'),tabIndex:5,store:vehicleStroe,
	 		itemCls:'required',displayField:'vehicleNo',valueField:'vehicleNo',
	 		typeAhead: true,mode:'remote',enableKeyEvents:true,
	    	triggerAction: 'all',selectOnFocus:true,anchor:'95%',
	    	listeners:{scope:this,
		    	select:function(c,r,i){
			    	p.set('vehicleId',r.get('id'));
		    	},
		    	keydown:function(f,e){
					if(e.getKey()==e.ENTER){
						cboDriver.focus();
					} 
				}
			}
    	});
	
	//驾驶员
	var cboDriver = new Ext.form.ComboBox({fieldLabel:C_DRIVER,
			name:'driverName',tabIndex:6,store:driverStroe,value:p.get('driverName'),
			itemCls:'required',displayField:'driverName',valueField:'driverName',
			typeAhead:true,mode:'remote',enableKeyEvents:true,
			triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
				select:function(c,r,i){
					p.set('driverId',r.get('id'));
				},
				keydown:function(f,e){
					if(e.getKey()==e.ENTER){
						txtDriverTel.focus();
					} 
				}
			}
		});
		
	//司机电话
	var txtDriverTel = new Ext.form.TextField({fieldLabel:C_DRIVER_TEL,
		name:'driverTel',value:p.get('driverTel'),tabIndex:7,anchor:'95%',
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPateName.focus();
				} 
			}
		}
	});
	
	//运费条款
	var txtPateName = new Ext.form.ComboBox({fieldLabel:C_PATE,tabIndex:8,
		name:'pateName',value:p.get('pateName'),store:HTStore.getPATE_S(),
		displayField:'pateName',valueField:'pateName',typeAhead:true,
		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPlaceFrom.focus();
				} 
			}
		}
	});
	
	//发货地点
	var txtPlaceFrom = new Ext.form.TextField({fieldLabel:C_PLACE_FROM,
			name:'placeFromName',value:p.get('placeFromName'),
			tabIndex:9,anchor:'95%',enableKeyEvents:true,
			listeners:{scope:this,
			 	keydown:function(f,e){
					if(e.getKey()==e.ENTER){
						txtPlaceTo.focus();
					} 
				}
			}
		});
	
	//交货地点
	var txtPlaceTo = new Ext.form.TextField({fieldLabel:C_PLACE_TO,
		name:'placeToName',value:p.get('placeToName'),
		tabIndex:10,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtEmptyMiles.focus();
				} 
			}
		}
	});
	
	//空载公里数
	var txtEmptyMiles = new Ext.form.NumberField({fieldLabel:C_EMPTY_MILES,
		name:'emptyMiles',value:p.get('emptyMiles'),
    	tabIndex:11,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtHeavyMiles.focus();
				} 
			}
		}
	});
	
	//重载公里数
	var txtHeavyMiles = new Ext.form.NumberField({fieldLabel:C_HEAVY_MILES,
		name:'heavyMiles',value:p.get('heavyMiles'),
    	tabIndex:12,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtCargoName.focus();
				} 
			}
		}
	});
	
	//货物品名
	var txtCargoName = new Ext.form.TextField({fieldLabel:C_CARGO_NAME,
			name:'cargoName',value:p.get('cargoName'),
			tabIndex:13,anchor:'95%',enableKeyEvents:true,
			listeners:{scope:this,
			 	keydown:function(f,e){
					if(e.getKey()==e.ENTER){
						txtPackages.focus();
					} 
				}
			}
		});	
	
	
	//件数合计
	var txtPackages = new Ext.form.NumberField({fieldLabel:C_SUM_PACK,
		name:'packages',value:p.get('packages'),
    	tabIndex:14,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtGrossWeight.focus();
				} 
			}
		}
	});
	
	//毛重合计
	var txtGrossWeight = new Ext.form.NumberField({fieldLabel:C_SUM_GW,
		name:'grossWeight',value:p.get('grossWeight'),
		tabIndex:16,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtMeasurement.focus();
				} 
			}
		}
	});
	
	//体积合计
	var txtMeasurement = new Ext.form.NumberField({fieldLabel:C_SUM_CBM,
		name:'measurement',value:p.get('measurement'),
		tabIndex:16,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPremiumNumber.focus();
				} 
			}
		}
	});
	
	
	
	//保单号
	var txtPremiumNumber = new Ext.form.TextField({fieldLabel:'保单号',
		name:'premiumNumber',value:p.get('premiumNumber'),
		tabIndex:17,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPremiumCompany.focus();
				} 
			}
		}
	});
	
	//保险公司
	var txtPremiumCompany = new Fos.CustomerLookup({fieldLabel:'保险公司',name:'premiumCompany',value:p.get('premiumCompany'),
    	enableKeyEvents:true,tabIndex:45,store:HTStore.getCS(),tpl:custTpl,itemSelector:'div.list-item',
    	listWidth:C_LW,displayField:'custCode',valueField:'custNameCn',typeAhead:true,mode:'remote',
    	triggerAction:'all',selectOnFocus:true,custType:'custInsuranceFlag',bizType:BT_T,anchor:'95%',
    	listeners:{scope:this,
    		keydown:{fn:function(f,e){
		 		LC(f,e,'custInsuranceFlag');
		 		if(e.getKey()==e.ENTER){
		 			dtPremiumDateFrom.focus();
				} 
		 	},buffer:BF}
		}
    });
	
	//保险日期(从)
	var dtPremiumDateFrom = new Ext.form.DateField({fieldLabel:'保险日期(从)',
		name:'premiumDateFrom',value:p.get('premiumDateFrom'),
		tabIndex:19,format:DATEF,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtPremiumDateTo.focus();
				} 
			}
		}
	});
	
	//保险日期(到)
	var dtPremiumDateTo = new Ext.form.DateField({fieldLabel:'保险日期(到)',
		name:'premiumDateTo',value:p.get('premiumDateTo'),
		tabIndex:20,format:DATEF,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtPremiumExpense.focus();
				} 
			}
		}
	});
	
	//保险费
	var txtPremiumExpense = new Ext.form.NumberField({fieldLabel:'保险费',
		name:'premiumExpense',value:p.get('premiumExpense'),
   	 tabIndex:21,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtStartDate.focus();
				} 
			}
		}
	});

	//发车日期
	var dtStartDate = new Ext.form.DateField({fieldLabel:C_TRAN_START_DATE,
		name:'startDate',value:p.get('startDate'),
    	tabIndex:22,format:DATEF,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					dtEndDate.focus();
				} 
			}
		}
	});
	
	//完成日期
	var dtEndDate = new Ext.form.DateField({fieldLabel:C_TRAN_END_DATE,
		name:'endDate',value:p.get('endDate'),
    	tabIndex:23,format:DATEF,anchor:'95%',enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtRemarks.focus();
				} 
			}
		}
	});
	
	//备注
	var txtRemarks = new Ext.form.TextField({fieldLabel:C_REMARKS,
		name:'remarks',value:p.get('remarks'),tabIndex:24,anchor:'95%'} );
	
	var frm = new Ext.form.FormPanel({region:'north',height:190,layout:'column',layoutConfig:{columns:4},
		labelWidth:80,frame:false,padding:5,items:[
        {columnWidth:.25,layout:'form',border:false,labelWidth:80,items:[
			 txtTaskNo,cboVehicleNo,txtPlaceFrom,txtCargoName,txtPremiumNumber,txtPremiumExpense
		]},
		{columnWidth:.25,layout:'form',border:false,items:[
			cboMotorcadeName,cboDriver,txtPlaceTo,txtPackages,txtPremiumCompany,dtStartDate
		 ]},
		 {columnWidth:.25,layout:'form',labelWidth:100,border:false,items:[
			txtMotorcadeContact,txtDriverTel,txtEmptyMiles,txtGrossWeight,dtPremiumDateFrom,dtEndDate	
		]},
		{columnWidth:.25,layout:'form',labelWidth:100,border:false,items:[
			txtMotorcadeTel,txtPateName,txtHeavyMiles,txtMeasurement,dtPremiumDateTo,txtRemarks
    	]}
		]});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[sm,
      	{header:C_TRAN_NO,dataIndex:'consNo',width:100},
      	{header:'收货人',dataIndex:'consigneeName',width:80},
      	{header:'联系人',dataIndex:'consigneeContact',width:80},
      	{header:'联系电话',dataIndex:'consigneeTel',width:80},
      	{header:C_DELIVERY_ADDRESS,dataIndex:'deliveryAddress',width:80},
      	{header:'货名',dataIndex:'cargoName',width:80,editor:new Ext.form.TextField()},
      	{header:C_PACK,dataIndex:'packName',width:100,
      			editor:new Ext.form.ComboBox({displayField:'packName',valueField:'packName',triggerAction:'all',
                  mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getPACK_S()})},
      	{header:C_PACKAGES,dataIndex:'packages',width:60,editor:new Ext.form.NumberField({allowBlank:false})},
      	{header:C_GROSS_WEIGHT+'承运人'+'(KGS)',dataIndex:'grossWeightProvider',width:100,renderer:rateRender},	
      	{header:'体积承运人(CBM)',dataIndex:'measurementProvider',width:100,renderer:rateRender},
      	{header:C_GROSS_WEIGHT+'(KGS)',dataIndex:'grossWeight',width:60,renderer:rateRender},	
      	{header:'体积(CBM)',dataIndex:'measurement',width:60,renderer:rateRender},
      	{header:'货物类别',dataIndex:'cargoClassName',width:120},
        {header:'货物价值',dataIndex:'premiumValue',width:80,renderer:rateRender},
        {header:'保险费率',dataIndex:'premiumRate',width:80,renderer:rateRender},
        {header:'保险费',dataIndex:'premiumExpense',width:80,renderer:rateRender},
      	{header:C_REMARKS,dataIndex:'remarks',width:100,editor:new Ext.form.TextField()}
      	],defaults:{sortable:false,width:100}});
	
	this.save=function(){
		if(!HTUtil.checkFieldNotNull(C_MOTORCADE,cboMotorcadeName))
			return;
		if(!HTUtil.checkFieldNotNull(C_VEHICLE_NO,cboVehicleNo))
			return;
		if(!HTUtil.checkFieldNotNull(C_DRIVER,cboDriver))
			return;		
		HTUtil.saveToRecord(frm,p);
		
		var xml = HTUtil.RTX(p,'TTransTask',TTransTask);
		var a = store.getModifiedRecords();
		xml+=HTUtil.ATX(a,'TCargo',TCargo);
		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'TTRT_S'},
		success: function(r,o){
			var rowAction = p.get('rowAction');
			
			var c = HTUtil.XTR(r.responseXML,'TTransTask',TTransTask);
			HTUtil.RU(c, p,TTransTask);
			
			var a = HTUtil.XTRA(r.responseXML,'TCargo',TCargo);
			HTUtil.RUA(store, a, TCargo);
			
			if (rowAction=='N'){				
				txtTaskNo.setValue(p.get('transTaskNo'));				
				var desktop = MyDesktop.getDesktop();
				var win = desktop.getWindow('TASK_'+p.get("uuid"));
				win.setTitle(C_TRANS_TASK+'-'+p.get('transTaskNo'));
				if(listStore)
					listStore.insert(0,p);
			}
			this.updateToolbar();
			Ext.Msg.alert(SYS,M_S);
		},
		failure:function(r,o){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
		xmlData:HTUtil.HTX(xml)});
	 	
	};
	
	var reCalculate=function(){
		var sumP=0;var sumG=0;var sumM=0;
		var a=store.getRange();
		for(var i=0;i<a.length;i++){
			if(a[i].get('packages')>0) sumP+=parseInt(a[i].get('packages'));
			if(a[i].get('grossWeight')>0) sumG+=parseFloat(a[i].get('grossWeight'));
			if(a[i].get('measurement')>0) sumM+=parseFloat(a[i].get('measurement'));
		}
		p.set('packages',sumP);
		p.set('grossWeight',sumG);
		p.set('measurement',sumM);
		frm.txtPackages.setValue(sumP);
		frm.txtGrossWeight.setValue(sumG);
		frm.txtMeasurement.setValue(sumM);
	};
	
	var addCargos = function(a){
		for(var i=0;i<a.length;i++){
			if(store.find('consCargoId',a[i].get('id'))==-1){
				var t = new TCargo({uuid:HTUtil.UUID(32),
					consId:a[i].get('consId'),consNo:a[i].get('consNo'),consCargoId:a[i].get('id'),
					consigneeName:a[i].get('consigneeName'),
					consigneeContact:a[i].get('consigneeContact'),consigneeTel:a[i].get('consigneeTel'),
					deliveryPlaceId:a[i].get('deliveryPlaceId'),deliveryPlaceName:a[i].get('deliveryPlaceName'),
					deliveryCityId:a[i].get('deliveryCityId'),deliveryCity:a[i].get('deliveryCity'),
					deliveryAddress:a[i].get('deliveryAddress'),
					cargoName:a[i].get('cargoName'),packName:a[i].get('packName'),
					packages:a[i].get('packages'),grossWeight:a[i].get('grossWeight'),measurement:a[i].get('measurement'),
					grossWeightProvider:a[i].get('grossWeightProvider'),measurementProvider:a[i].get('measurementProvider'),
					cargoClassName:a[i].get('cargoClassName'),
					premiumValue:a[i].get('premiumValue'),premiumRate:a[i].get('premiumRate'),premiumExpense:a[i].get('premiumExpense'),
					remarks:a[i].get('remarks'),rowAction:'N'});
				store.add(t);
			}
		}
		reCalculate();
	};
	
	this.addCargo = function(){
		var win = new Fos.TConsignLookup(addCargos,this);
		win.show();
	};
	this.del = function(){
		var r = sm.getSelections();
		if(r){
			for(var i=0;i<r.length;i++){
				r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				store.remove(r[i]);}
			reCalculate();
		}
	};
	var grid = new Ext.grid.EditorGridPanel({title:C_TRAN_CARGO_LIST,
		region:'center',autoScroll:true,sm:sm,cm:cm,store:store,
		listeners:{scope:this,afteredit:function(e){var f=e.field;
    		if(f=='packages'||f=='grossWeight'||f=='measurement'){reCalculate();}
    	}},
		tbar:[{text:C_ADD,iconCls:'add',scope:this,handler:this.addCargo},'-',
			{text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del}
		]
	});
		
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'TTRT_U',id:p.get('id'),status:s},
			success: function(r){
				p.set('status',s);
				this.updateToolbar();
				Ext.Msg.alert(SYS,M_S);
			},
			failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}
		});
	};
	this.start=function(){
		Ext.Msg.confirm(SYS,C_TRANS_TASK_CONFIRM_START,function(btn){
        	if(btn == 'yes') {
        		this.updateStatus(1);
        	}
		},this);
	};
	this.end=function(){
		Ext.Msg.confirm(SYS,C_TRANS_TASK_CONFIRM_FINISHED,function(btn){
        	if(btn == 'yes') {
        		this.updateStatus(2);
        	}
		},this);
	};

	var menu=CREATE_E_MENU(C_TRANS_TASK,this.expExcelTR,this.expEmailTR,function(){},this);	
	
	this.updateToolbar = function(){
    	btnSave.setDisabled(NR(m+F_M));
    	btnStart.setDisabled(NR(m+F_M)||p.get('rowAction')=='N'||p.get('status')!=0);
    	btnEnd.setDisabled(NR(m+F_M)||p.get('rowAction')=='N'||p.get('status')!=1);
    	btnExport.setDisabled(p.get('rowAction')=='N');
    };
    
	var m = M1_TMS + TMS_TTASK;
	
	var btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),
		scope:this,handler:this.save});
	var btnStart = new Ext.Button({text:C_START,iconCls:'save',
		disabled:NR(m+F_M)||p.get('rowAction')=='N'||p.get('status')!=0,
		scope:this,handler:this.start});
	var btnEnd = new Ext.Button({text:C_END,iconCls:'check',
		disabled:NR(m+F_M)||p.get('rowAction')=='N'||p.get('status')!=1,
		scope:this,handler:this.end});
	var btnExport = new Ext.Button({text:C_EXPORT,
		disabled:p.get('rowAction')=='N',iconCls:'print',scope:this,menu: {items:[menu]}});
	
	Fos.TransTaskTab.superclass.constructor.call(this,{layout:'border',items:[frm,grid],
		tbar:[
		    btnSave,'-',btnStart,'-',btnEnd,'-',btnExport
		]
	}); 
	};
Ext.extend(Fos.TransTaskTab,Ext.Panel);