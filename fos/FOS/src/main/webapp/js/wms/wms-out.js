
Fos.StorageNoteOutPanel = function(p) {
	
	var storageClassId=p.get('storageClassId');
	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_CARGO_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WStorageNoteCargo',id:'id'},WStorageNoteCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var atStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WASSETS_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WAssets',id:'id'},WAssets),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	 var rateStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_RATE_Q',baseParams:{_mt:'xml'},
	    	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageRate',id:'id'},WStorageRate),
	    	remoteSort:true,sortInfo:{field:'id',direction:'desc'}
	    });
    if(p.get('rowAction')!='N'){
    	store.load({params:{storageNoteId:p.get('id')}});
       atStore.load({params:{storageNoteId:p.get('id')}});
       rateStore.load({params:{storageNoteId:p.get('id')}});
    }
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});

    //构建出库单grid
    var cmOut=new Ext.grid.ColumnModel({columns:[sm,new Ext.grid.RowNumberer({header:'序号',width:36}),
    {header:C_SKU_NO,dataIndex:'skuNo'},
	{header:C_CARGO_NAME,dataIndex:'cargoName'},
	{header:'生产编号',dataIndex:'productNo'},
	{header:C_QUANTITY_UNIT,dataIndex:'unitName'},
	{header:C_QUANTITY,dataIndex:'planedQuantity'},
	{header:C_PICKED_QUANTITY,dataIndex:'pickedQuantity'},
	{header:"调整数量",dataIndex:'AdjustQuantity'},
	{header:C_WEIGHT_UNIT,dataIndex:'wUnitName'},
	{header:C_GROSS_WEIGHT,dataIndex:'planedGrossWeight'},
	{header:C_NET_WEIGHT,dataIndex:'planedNetWeight'},
	{header:C_CBM_S,dataIndex:'plademeasurement'},
	{header:C_UNIT_PRICE,dataIndex:'unitPrice'},
	{header:C_PRODUCT_DATE,dataIndex:'productDate',renderer:formatDate},
	
	{header:C_SPECIFICATION,width:120,dataIndex:'specification'},
	{header:C_BATCH_NO,dataIndex:'batchNo'},
	{header:'备注',dataIndex:'remarks'}
	
    ],defaults:{sortable:true,width:100}});
    
    var addCargo = function(){
    	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
    	else{
    		var c = new WStorageNoteCargo({uuid:HTUtil.UUID(32),
    			storageNoteId:p.get('id'),storageNoteNo:p.get('storageNoteNo'),
    			warehouseId:p.get('warehouseId'),warehouseCode:p.get('warehouseCode'),
    			warehouseName:p.get('warehouseName'), batchNo:p.get('batchNo'),storageType:p.get('storageType'),			
    			rowAction:'N'});
        	var win = new Fos.WNoteCargoOutWin(c,store);
        	win.show();
    	}    	
    };
    var editCargo = function(){
    	var c = sm.getSelected();
    	c.set('rowAction','M');
    	var win = new Fos.WNoteCargoOutWin(c,store);
    	win.show();
    };
    var deleteCargo = function(){
    	var b =sm.getSelections();
		if(b.length>0){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(b,'WStorageNoteCargo');
	        		HTUtil.REQUEST('WSTORAGE_NOTE_CARGO_S', xml, function(){store.remove(b);});
	        	}
			},this);
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
    };
    
	var grid=new Ext.grid.GridPanel({
    	title:C_CARGO_LIST,layout:'fit',
    	closable:false,store:store,sm:sm,cm:cmOut,
    	listeners:{scope:this,
    		rowdblclick: function(grid, rowIndex, event){
    			if (p.get('status')!=0){
    				return;
    			}
        		editCargo();
    		}},
    		
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../addButton',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_SAVE)),disabled:p.get('status')!=0,handler:addCargo},'-',
    	      {text:C_EDIT,ref:'../editButton',iconCls:'option',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_EDIT)),disabled:p.get('status')!=0,handler:editCargo},'-',
    	      {text:C_REMOVE,iconCls:'remove',ref:'../removeButton',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_DEL)),disabled:p.get('status')!=0,scope:this,handler:deleteCargo}]
    		
	});
	
	var cboAtClass=new Ext.form.ComboBox({fieldLabel:'操作类型',name:'atClassName',store:WHTStore.AT_CLASS,enableKeyEvents:true,
		displayField:'NAME',valueField:'NAME',anchor:'95%',mode:'local',triggerAction:'all',selectOnFocus:true,
		listeners:{
			scope:this,
			select:function(c,r,i){
				var re=sm2.getSelected();
				if(re){
					re.set('atClassId',r.get('CODE'));
				}
			}
		}});
	var numQuantity=new Ext.form.NumberField({fieldLabel:'数量',name:'quantity',anchor:'95%'});
	
	var listWAssets=function(f,e,action){
		if((e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN)){
			var q=f.getRawValue();
			if(q.length>=1 ){
		   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
		   			params:{_A:action,_mt:'xml',txtAtName:q},
					success: function(r,o){
						f.store.loadData(r.responseXML,false);
						if(!f.isExpanded()){
							f.expand();
						}
					}
				});
			}
			else if((q.length==0||q.lenght<1) && f.isExpanded()){
				f.store.removeAll();
				f.collapse();
			}
		}
	};
	
	var txtAtName=new Ext.form.ComboBox({fieldLabel:'名称',name:'atName',value:p.get('atName'),anchor:'95%',
		store:WHTStore.getWAssets('WASSETS_F'),
		displayField:'atName',valueField:'atName',
		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true
		/*listeners:{scope:this,
			keyup:{fn:function(f,e){
				listWAssets(f,e,'WASSETS_F');
			},buffer:600}

	 	}*/
});
var txtAtBland=new Ext.form.ComboBox({fieldLabel:'品牌',name:'atBrand',value:p.get('atBrand'),anchor:'95%',
	store:WHTStore.getWAssets('WASSETS_E'),
	displayField:'atBrand',valueField:'atBrand',
	typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true
	/*listeners:{scope:this,
		keyup:{fn:function(f,e){
			listWAssets(f,e,'WASSETS_E');
		},buffer:600}

 	}*/
});
	var txtAtSpec=new Ext.form.TextField({fieldLabel:'规格',name:'atSpec',anchor:'95%'});
	var txtAtType=new Ext.form.TextField({fieldLabel:'型号',name:'atType',anchor:'95%'});
	var txtAtColor=new Ext.form.TextField({fieldLael:'颜色',name:'atColor',anchor:'95%'});
	
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    //构建入库单货物明细grid
    var cm2=new Ext.grid.ColumnModel({columns:[sm2,
    {header:'入库单号',dataIndex:'storageNoteNo'},
	{header:'操作类型',dataIndex:'atClassName',editor:cboAtClass},
	{header:'数量',dataIndex:'quantity',editor:numQuantity},	
	{header:'名称',dataIndex:'atName',editor:txtAtName},
	{header:'品牌',dataIndex:'atBrand',editor:txtAtBland},
	{header:'规格',width:120,dataIndex:'atSpec',editor:txtAtSpec},
	{header:'型号',width:120,dataIndex:'atType',editor:txtAtType},
	{header:'颜色',width:120,dataIndex:'atColor',editor:txtAtColor}	
    ],defaults:{sortable:true,width:100}}); 
    
    var addAssets=function(){
    	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
    	else{
    		var c = new WAssets({uuid:HTUtil.UUID(32),
    			storageNoteId:p.get('id'),
    			storageNoteNo:p.get('storageNoteNo'),
    			atClassId:1,
    			atClassName:'出库',
    			atName:'托盘',
    			rowAction:'N'});
    		atGrid.stopEditing();
    		atStore.insert(0,c);
    		atGrid.getSelectionModel().selectFirstRow();
    		atGrid.startEditing(0,1);
    	}
    };
   
    
    var saveAssets=function(){
    	atGrid.stopEditing();
		
		//构建XML
		var xml='';
		var a =atStore.getModifiedRecords();
		if(a.length>0){xml = HTUtil.ATX(a,'WAssets',WAssets);};	
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WASSETS_S'},
				success: function(res){
					
					var a = HTUtil.XTRA(res.responseXML,'WAssets',WAssets);
					HTUtil.RUA(atStore,a,WAssets);
					
					
					XMG.alert(SYS,M_S);
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)});
				
				
		}
		
    };
    
    var delAssets=function(){
    	var b =sm2.getSelected();
		if(b){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
    			
	        	if(btn == 'yes') {
	        		
	        		if(b.get('rowAction')=='N'){
	        			b.set('rowAction','D');
	        			atStore.remove(b);
	        		}
	        		else{
		        		atGrid.stopEditing();		        		
		        		b.beginEdit();						
						b.set('rowAction','R');
						b.endEdit();
						
		        		//构建XML
		        		var xml='';
		        		var a =atStore.getModifiedRecords();
		        		if(a.length>0){xml = HTUtil.ATX(a,'WAssets',WAssets);};	
		        		if(xml){		        			
		        			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WASSETS_S'},
		        				success: function(res){
		        					atStore.remove(b);
		        					XMG.alert(SYS,M_S);
		        				},
		        				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
		        				xmlData:HTUtil.HTX(xml)});
		        		}
		        	}
	        	  }
				},this);
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
    };
    
    var atGrid=new Ext.grid.EditorGridPanel({
    	title:'托盘管理',layout:'fit',autoscoll:'true',
    	closable:false,store:atStore,sm:sm2,cm:cm2,
    	
    	listeners:{scope:this,
    		beforeedit:function(e){
    			//e.cancel = e.record.get('expeStatus')>0||e.record.get('expeInvoiceStatus')>0||e.record.get('expeWriteOffStatus')>0
    			;}
    	},
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../addButton',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_ADD)),handler:addAssets},'-',
    	      {text:C_SAVE,iconCls:'save',ref:'../saveButton',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_SAVE)),handler:saveAssets},'-',    	      
    	      {text:C_REMOVE,iconCls:'remove',ref:'../removeButton',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_DEL)),handler:delAssets}]
	});
    
    var cboCharName=new Ext.form.ComboBox();
    var sm3=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    //构建计费条目
    var cm3=new Ext.grid.ColumnModel({columns:[sm3,
    {header:'费率标识',dataIndex:'rateName'},
    {header:'费用名称',dataIndex:'charName',editor:cboCharName},
	{header:'计费方式',dataIndex:'mode'},
	{header:'计费方法',dataIndex:'accountMethod'},	
	{header:'计费单位',dataIndex:'unitName'},
	{header:'单价',dataIndex:'unitPrice'},
	{header:'结算对象',width:120,dataIndex:'accountName'},
	{header:'计费重计算比例',width:120}
    ],defaults:{sortable:true,width:100}}); 
    
    var addRate=function(){
    	if(p.get("rowAction")=='N') Ext.Msg.alert(SYS,C_SAVE_FIRST);
    	else{
	    	var win=new Fos.WStorageRateWin(p,rateStore);
	    	win.show();
    	}
    };
    
    var saveRate=function(){
    	CostListGrid.stopEditing();
		//构建XML
		var xml='';
		var a =rateStore.getModifiedRecords();
		if(a.length>0){xml = HTUtil.ATX(a,'WStorageRate',WStorageRate);};	
		if(xml){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_RATE_S'},
				success: function(res){
					var a = HTUtil.XTRA(res.responseXML,'WStorageRate',WStorageRate);
					HTUtil.RUA(rateStore,a,WStorageRate);
					XMG.alert(SYS,M_S);
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)});
		}
		
    };
    
    var delRate=function(){
    	var rs =sm3.getSelections();
		if(rs.length>0){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		for(var i=0;i<rs.length;i++){
	        			var b=rs[i];
		        		if(b.get('rowAction')=='N'){
		        			b.set('rowAction','D');
		        			rateStore.remove(b);
		        		}
		        		else{
		        			CostListGrid.stopEditing();		        		
			        		b.beginEdit();						
							b.set('rowAction','R');
							b.endEdit();
			        	}
		        		
		        		//构建XML
		        		var xml='';
		        		var a =rateStore.getModifiedRecords();
		        		if(a.length>0){xml = HTUtil.ATX(a,'WStorageRate',WStorageRate);};	
		        		if(xml){		        			
		        			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_RATE_S'},
		        				success: function(res){
		        			
		        					rateStore.remove(rs);
		        					XMG.alert(SYS,M_S);
		        				},
		        				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
		        				xmlData:HTUtil.HTX(xml)});
		        		}
		        		
		        	  }
	        	}
				},this);
    		
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
    };
    
    var CostListGrid=new Ext.grid.EditorGridPanel({
    	title:'计费项目',layout:'fit',autoscoll:'true',
    	closable:false,store:rateStore,sm:sm3,cm:cm3,
    	
    	listeners:{scope:this,
    		beforeedit:function(e){
    			//e.cancel = e.record.get('expeStatus')>0||e.record.get('expeInvoiceStatus')>0||e.record.get('expeWriteOffStatus')>0
    			;}
    	},
    	
    	tbar:[{text:C_ADD,iconCls:'add',ref:'../addButton',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_ADD)),disabled:p.get('status')!=0,scope:this,handler:addRate},'-',
    	      {text:C_SAVE,iconCls:'save',ref:'../saveButton',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_SAVE)),disabled:p.get('status')!=0,scope:this,handler:saveRate},'-',    	      
    	      {text:C_REMOVE,iconCls:'remove',ref:'../removeButton',scope:this,hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_DEL)),disabled:p.get('status')!=0,scope:this,handler:delRate}]
	});

    
	
	this.removeTab=function(r,s){
		var tab = s.ownerCt;	//得到当前对像所在的容器
		tab.remove(s);
	};
	
	this.updateStatus=function(s){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:'WSTORAGE_NOTE_U',id:p.get('id'),status:s},
			success: function(r){
				p.beginEdit();
				p.set('status',s);
				p.set('version',p.get('version')+1);
				p.endEdit();
				this.updateToolBar();
				XMG.alert(SYS,M_S);
				var status=frm.find('name','status');
				//如果改为了未提交
				if(status){
					if (s==0)
					{
							status[0].setValue(HTStore.getOutWarehouseNoteStatus(0));
							grid.addButton.enable();
							grid.editButton.enable();
							grid.removeButton.enable();
					}
					//如果改为了提交
					if (s==1)
					{
						status[0].setValue(HTStore.getOutWarehouseNoteStatus(1));
						grid.addButton.disable();
						grid.editButton.disable();
						grid.removeButton.disable();
					}
				}
			},
			failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});
	};
	
	this.exp = function(){};	//表单输出功能暂时没有做，所以内容是空的
	
	//出库单号
	var txtOutStorageNoteNo={fieldLabel:C_OUT_STORAGE_NOTE_NO,
			name:'storageNoteNo',value:p.get('storageNoteNo'),tabIndex:1,
			ref:'../storageNoteNo',readOnly:true,xtype:'textfield',anchor:'95%'};
	//客户订单号
	var txtEntrustNo=new Ext.form.TextField({fieldLabel:'委托编号',name:'entrustNo',value:p.get('entrustNo'),
		tabIndex:6,ref:'../entrustNo',anchor:'95%'});
	//来源类型
	var cboStorageClass=new Ext.form.ComboBox({fieldLabel:'来源类型',name:'storageClass',value:p.get('storageClass'),
			ref:'../storageClass',store:WHTStore.STORAGE_CLASS_S,displayField:'NAME',valueField:'NAME',tabIndex:2,
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,select:function(c,r,i){
				storageClassId=r.get('CODE');
			}}
	});
	
	//类别
	var cboActionGategory=new Ext.form.ComboBox({fieldLabel:'类别',name:'actionGategory',value:p.get('actionGategory'),
	    store:WHTStore.ACTION_GATEGORY,displayField:'NAME',valueField:'NAME',tabIndex:12,itemCls:'required',
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,select:function(c,r,i){
			p.set('actionGategoryId',r.get('CODE'));
		}}
     });
	
	

	
	var validationOrderNo=function(f){
		if(f!=null){
			Ext.Ajax.request({url:SERVICE_URL,method:'POST',
	   			params:{_A:'WSTORAGE_NOTE_VRO',_mt:'xml',orderNo:f.getRawValue(),storageType:1},
				success: function(r){
					var a=HTUtil.XTRA(r.responseXML,'WStorageNote',WStorageNote);
					if(a.length>0){
						f.setValue('');
						Ext.Msg.alert(SYS,'该订单号已经存在不能重复录入！');
					}
				}
				
			});
		}
	};
	
	//订单号
	var txtOrderNo=new Ext.form.TextField({fieldLabel:C_ORDER_NO,name:'orderNo',value:p.get('orderNo'),tabIndex:7,
			ref:'../orderNo',xtype:'textfield',itemCls:'required',anchor:'95%',
			listeners:{scope:this,
				blur:function(f){
					if(ORDER_NO_ONLY){
						if(f.getRawValue()!=''){
							if(p.get('rowAction')=='M'||p.get('rowAction')==''){
								if(f.getRawValue()!=p.get('orderNo')){
									validationOrderNo(f);
								}
							}
							else if(p.get('rowAction')=='N'){
								validationOrderNo(f);
							}
						}
					}
				}
			}
	});
	var txtCargoOwner= new Ext.form.TextField({fieldLabel:'货主名称',name:'cargoOwnerName',value:p.get('cargoOwnerName'),anchor:'95%'});
	//货主
	var cboCargoOwnerCode={fieldLabel:'货主代码',tabIndex:5,name:'cargoOwnerCode',value:p.get('cargoOwnerCode'),
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwnerCode',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custCode',valueField:'custCode',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('cargoOwnerId','');				
				}},
			select:function(c,r,i){
				p.set('cargoOwnerId',r.get('id'));
				txtCargoOwner.setValue(r.get('custNameCn'));
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		};
	
	
	var listTransCarrier=function(f,e){
		if((e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN)){
			var q=f.getRawValue();
			if(q.length>=1 ){
		   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
		   			params:{_A:'WSTORAGE_NOTE_F_CARRIER',_mt:'xml',transCarrier:q},
					success: function(r,o){
						f.store.loadData(r.responseXML,false);
						if(!f.isExpanded()){
							f.expand();
						}
					}
				});
			}
			else if((q.length==0||q.lenght<1) && f.isExpanded()){
				f.store.removeAll();
				f.collapse();
			}
		}
	};
	
	var txtCarrier11= new Ext.form.TextField({fieldLabel:'承运人名称',name:'transCarrier',value:p.get('transCarrier'),anchor:'95%'});
	var cboCarrier22=new Ext.form.ComboBox({fieldLabel:'承运人代码',name:'transCarrier',itemCls:'required',
	    store:WHTStore.getLoadAddress('WSTORAGE_NOTE_F_CARRIER'),tabIndex:12,value:p.get('transCarrier'),
	    displayField:'transCarrier',valueField:'transCarrier',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,anchor:'95%',
			listeners:{scope:this,
				keyup:{fn:function(f,e){
					listTransCarrier(f,e);
				},buffer:800},
				select : function(f,r,i){
					txtCarrier11.setValue(r.get('transCarrier'));
				}
		 	}
     });
	
	
	var truckNumber=new Ext.form.TextField({fieldLabel:'车牌号',name:'truckNumber',value:p.get('truckNumber'),
		tabIndex:12,anchor:'95%',ref:'../truckNumber'
	});
	
	
	
	//操作员
	var cboOperatorName={fieldLabel:C_OPERATOR,tabIndex:11,
    		name:'operatorName',value:p.get('userName'),
    		store:HTStore.getOP_S(),xtype:'combo',displayField:'userName',valueField:'userName',
    		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
    		listeners:{scope:this,
			blur:function(f){
	    		if(f.getRawValue()==''){
	    			f.clearValue();p.set('operatorId','');
	    		}
	    	},
	    	select:function(c,r,i){p.set('operatorId',r.get('id'));}}
		};
	
	//接单日期
	var dteStorageDate={fieldLabel:C_STORAGE_DATE,tabIndex:4,name:'storageDate',value:p.get('storageDate'),altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
			ref:'../storageDate',itemCls:'required',xtype:'datefield',format:DATEF,anchor:'95%'};
	
	//预计出库时间
	var dtePlanedTime={fieldLabel:'预计出库时间',tabIndex:3,name:'planedTime',value:p.get('planedTime'),altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d',
			ref:'../planedTime',itemCls:'required',xtype:'datefield',format:DATEF,anchor:'95%'};
	
	//发货时间
	var dteActureTime={fieldLabel:"发货时间",labelWidth:95,tabIndex:10,name:'actureTime',value:p.get('actureTime'),
			xtype:'datefield',format:DATEF,anchor:'95%',altFormats:'Ymd|Y-m-d|Y.m.d|Y/m/d'};
	
	//状态
	var txtStatus={fieldLabel:C_STATUS,name:'status',value:HTStore.getOutWarehouseNoteStatus(p.get('status')),tabIndex:7,
			disabled:true,ref:'../status',xtype:'textfield',style:'{font-weight:bold;color:green;}',anchor:'95%'};
	
	//生产编号
	var txtProductionNo={fieldLabel:'生产编号',name:'productionNo',value:p.get('productionNo'),xtype:'textfield',tabIndex:9,anchor:'95%'};
	
	//批次号
	var txtBatchNo={fieldLabel:C_BATCH_NO,name:'batchNo',value:p.get('batchNo'),tabIndex:8,xtype:'textfield',anchor:'95%'};
	
	//费用关系人
	var txtAccountName={fieldLabel:'费用关系人',name:'accountName',value:p.get("accountName"),tabIndex:5,xtype:'textfield',anchor:'95%'};
	
	//客户
	var txtCustNamer=new Ext.form.TextField({fieldLabel:'收货人名称',tabIndex:1,name:'custName',value:p.get('custName'),xtype:'textfield',anchor:'95%'});
	//客户
	var txtCustName=new Fos.CustomerLookup({fieldLabel:'收货人代码',tabIndex:5,name:'custName',value:p.get('custName'),
			store:HTStore.getCS(),enableKeyEvents:true,itemCls:'required',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custCode',valueField:'custCode',
			typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			select:function(c,r,i){
				p.set('custId',r.get('id'));
				p.set('custName',r.get('custNameCn'));
				tab.find('name','custName')[0].setValue(r.get('custNameCn'));
				txtCustNamer.setValue(r.get('custNameCn'));
				tab.find('name','destination')[0].setValue(r.get('custCity'));
				var custContact=tab.find('name','custContact');
				var custTel=tab.find('name','custTel');
				var loadAddress=tab.find('name','loadAddress');
				if(custContact)
					custContact[0].setValue(r.get('custContact'));
				if(custTel)
					custTel[0].setValue(r.get('custTel'));
				if(loadAddress)
					loadAddress[0].setValue(r.get('custAddress'));
			},
			keyup:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		});
	
	//客户合同号
	var txtContractNo={fieldLabel:'客户合同号',name:'contractNo',value:p.get('contractNo'),tabIndex:7,
			xtype:'textfield',anchor:'95%'};

	//联系电话
	var txtCustTel={fieldLabel:C_TEL,name:'custTel',value:p.get('custTel'),tabIndex:2,
			ref:'../custTel',xtype:'textfield',anchor:'95%'};
	
	//费用联系人
	var txtAccountContact={fieldLabel:C_CONTACT,name:'accountContact',value:p.get('accountContact'),tabIndex:6,
			xtype:'textfield',anchor:'95%'};
	
	//收货联系人
	var txtCustContact={fieldLabel:'联系人',name:'custContact',value:p.get('custContact'),tabIndex:3,
			ref:'../custContact',xtype:'textfield',anchor:'95%'};
	
	var listConsignee=function(f,e){
		if((e.getKey()!=e.ENTER && e.getKey()!=e.UP && e.getKey()!=e.DOWN)){
			var q=f.getRawValue();
			if(q.length>=1 ){
		   		Ext.Ajax.request({url:SERVICE_URL,method:'POST',
		   			params:{_A:'WSTORAGE_NOTE_F',_mt:'xml',loadAddress:q},
					success: function(r,o){
						f.store.loadData(r.responseXML,false);
						if(!f.isExpanded()){
							f.expand();
						}
					}
				});
			}
			else if((q.length==0||q.lenght<1) && f.isExpanded()){
				
				f.store.removeAll();
				f.collapse();
			}
		}
	};
	
	//送货地址
	var loadAddress=new Ext.form.ComboBox({fieldLabel:'送货地址',name:'loadAddress',value:p.get('loadAddress'),tabIndex:4,anchor:'95%',
		store:WHTStore.getLoadAddress('WSTORAGE_NOTE_F'),
		displayField:'loadAddress',valueField:'loadAddress',
		typeAhead:true,mode:'remote',triggerAction: 'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{scope:this,
			keyup:{fn:function(f,e){
				listConsignee(f,e);
			},buffer:600},
			select:function(c,r,i){
		}
	 	}
	});
	
	//客户要求
	var txtCustRequirement={fieldLabel:'客户要求',name:'custRequirement',value:p.get('custRequirement'),
			xtype:'textfield',
			tabIndex:8,anchor:'95%'};
	
	//提单号
	var c24={fieldLabel:'提单号',name:'storageNoteNo',value:p.get('storageNoteNo'),xtype:'textfield',tabIndex:1,anchor:'95%'};
	
	var c25={fieldLabel:'主单号',name:'masterTransNo',value:p.get('masterTransNo'),xtype:'textfield',tabIndex:5,anchor:'95%'};
	
	var c26={fieldLabel:'分单号',name:'transNo',value:p.get('transNo'),xtype:'textfield',tabIndex:9,anchor:'95%'};

	//装货地址
	var c27={fieldLabel:'装货地址',name:'loadingaddress',value:p.get('loadingaddress'),tabIndex:13,xtype:'textfield',anchor:'95%'};
	
	//卸货地址
	var c28={fieldLabel:'卸货地址',name:'unloadingaddress',value:p.get('unloadingaddress'),xtype:'textfield',tabIndex:2,anchor:'95%'};
	//装运日期
	var c29={fieldLabel:'装运日期',name:'loadDate',value:p.get('loadDate'),xtype:'datefield',tabIndex:6,format:DATEF,anchor:'95%'};
	//发票号
	var c30={fieldLabel:'发票号',name:'invoiceNo',value:p.get('invoiceNo'),xtype:'textfield',tabIndex:10,anchor:'95%'};
	
	//原产地
	var c31={fieldLabel:'原产地',name:'countryOfOrigin',value:p.get('countryOfOrigin'),xtype:'textfield',tabIndex:14,
			/*store:WHTStore.getCountryOfOrigin(),displayField:'countryOfOrigin',valueField:'countryOfOrigin',*/
			typeAhead:true,anchor:'95%',mode:'remote',triggerAction: 'all'};
	//目的地
	var c32={fieldLabel:'目的地',name:'destination',value:p.get('destination'),tabIndex:3,xtype:'textfield',anchor:'95%'};
	
	//付款方式
	var c33={fieldLabel:'付款方式',tabIndex:7,name:'pateName',value:p.get('pateName'),store:HTStore.getPATE_S(),
    		xtype:'combo',displayField:'pateName',valueField:'pateName',typeAhead:true,
    		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'};
	
	var c35={fieldLabel:'币别',name:'currCode',value:p.get('currCode'),
			store:HTStore.getCURR_S(),xtype:'combo',tabIndex:15,
			displayField:'currCode',valueField:'currCode',typeAhead: true,mode:'remote',triggerAction: 'all',
			selectOnFocus:true,anchor:'95%'};
	
	var c36={fieldLabel:'计划件数',name:'quantity',value:p.get('quantity'),xtype:'textfield',tabIndex:4,anchor:'95%'};
	
	var c37={fieldLabel:'件数单位',name:"unitName",value:p.get("unitName"),align:'center',tabIndex:8,
			xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
            listeners:{scope:this,select:function(c,r,i){
				p.set('unitId',r.get('id'));
			}}};
	
	var c38={fieldLabel:'毛重',name:'grossWeight',value:p.get('grossWeight'),xtype:'textfield',tabIndex:12,anchor:'95%'};
	var c39={fieldLabel:'净重',name:'netWeight',value:p.get('netWeight'),xtype:'textfield',tabIndex:16,anchor:'95%'};
	var c40={fieldLabel:'体积',name:'volume',value:p.get('volume'),xtype:'textfield',tabIndex:11,anchor:'95%'};
	var ccboTrans=new Ext.form.ComboBox({fieldLabel:'运输方式',name:'inUnitValue',store:WHTStore.IN_UNIT_NAME,
		value:p.get('inUnitValue'),displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{}});
	var ccboGaveCargo=new Ext.form.ComboBox({fieldLabel:'交货条款',name:'inUnitValue',store:WHTStore.IN_UNIT_NAME,
		value:p.get('inUnitValue'),displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{}});
	var txtPayment=new Ext.form.TextField({fieldLabel:'付款描述',anchor:'95%'});
	
	var txtGaveGargo=new Ext.form.TextField({fieldLabel:'交货描述',anchor:'95%'});
	
	var txtNumber=new Ext.form.TextField({fieldLabel:'总件数',anchor:'95%'});
	
	var txtGW=new Ext.form.TextField({fieldLabel:'总毛重',anchor:'95%'});
	
	var txtGN=new Ext.form.TextField({fieldLabel:'总净重',anchor:'95%'});
	
	var txtVolume=new Ext.form.TextField({fieldLabel:'总体积',anchor:'95%'});
	
	var txtCost=new Ext.form.TextField({fieldLabel:'总价值',anchor:'95%'});
	
	var nulllable2=new Ext.form.Label({fieldLabel:'&nbsp',labelSeparator:''});
	var nulllable4=new Ext.form.Label({fieldLabel:'&nbsp',labelSeparator:''});
	
	var basePanel=new Ext.Panel({
		layout:'column',labelAlign:'right',layoutConfig:{columns:5},padding:5,title:'出库基本信息',
		items:[
			{columnWidth:.25,labelWidth:80,layout:'form',border:false,
				items:[txtOutStorageNoteNo]},
			{columnWidth:.25,labelWidth:80,layout:'form',border:false,
					items:[cboActionGategory]},
			{columnWidth:.25,labelWidth:95,layout:'form',border:false,items:[
			    dtePlanedTime]},
			{columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
			    dteStorageDate]},
		    {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
		         cboCargoOwnerCode]}, 
	        {columnWidth:.5,labelWidth:80,layout:'form',border:false,items:[				
	             txtCargoOwner]}, 
            {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
                 txtOrderNo]}, 
            {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
 		         txtEntrustNo]}, 
 	        {columnWidth:.5,labelWidth:80,layout:'form',border:false,items:[				
 	             txtCustRequirement]}, 
             {columnWidth:.25,labelWidth:80,layout:'form',border:false,items:[				
                  txtStatus]}
			]
	});
	
	var receiverPanel=new Ext.Panel({
		title:'收货人信息',padding:5,height:100,labelAlign:'right',
		labelWidth:90,layout:'column',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[txtCustName,txtCustTel ]},
		       {columnWidth:.5,layout:'form',border:false,
		    	   items:[txtCustNamer,loadAddress]},
	    	   {columnWidth:.25,layout:'form',border:false,
	    		   items:[txtCustContact ]}
				]
	});
	
	
	var carrierPanel=new Ext.Panel({
		title:'承运人信息',height:150,padding:5,labelAlign:'right',
		labelWidth:80,layout:'column',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[cboCarrier22]},
		       {columnWidth:.5,layout:'form',border:false,
				   items:[txtCarrier11]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[txtAccountContact]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[txtCustTel]},
			   {columnWidth:.5,layout:'form',border:false,
				   items:[c27]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[ccboTrans]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[c33]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[txtPayment]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[ccboGaveCargo]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[txtGaveGargo]},
			   {columnWidth:.25,layout:'form',border:false,
				   items:[c28]}, 
			   {columnWidth:.25,layout:'form',border:false,
				   items:[c32]}
	    	  ]
	});

	var OtherPanel=new Ext.Panel({
		title:'其他信息',height:110,padding:5,labelAlign:'right',
		labelWidth:80,layout:'column',
		items:[
		       {columnWidth:.25,layout:'form',border:false,
			       items:[txtNumber,txtCost]},
		       {columnWidth:.25,layout:'form',border:false,
		    	   items:[txtGW]},
	    	   {columnWidth:.25,layout:'form',border:false,
	    		   items:[txtGN]},
	          {columnWidth:.25,layout:'form',border:false,
	    		   items:[txtVolume]}
				]
	});
	
	
	
	this.updateToolBar = function(){
		
		btnSave.setDisabled(p.get('status')<5  && p.get('status')>0);
		btnRemove.setDisabled(p.get('rowAction')=='N'||p.get('status')!=0);
		btnCheck.setDisabled(p.get('rowAction')=='N'||p.get('status')!=0);
		btnUnCheck.setDisabled(p.get('status')!=1&&p.get('status')!=2);
		btnPrint.setDisabled(p.get('rowAction')=='N');
		btnDollar.setDisabled(p.get('status')<1);
		btnTransList.setDisabled(!(p.get('status')>=5));
		btnPickedCargo.setDisabled(p.get('status')<1);
	};
	var noteName =C_OUT_STORAGE_NOTE;
	var title = p.get('rowAction')=='N'?(C_ADD+noteName):(noteName+'-'+p.get('storageNoteNo'));
	
	//保存
	this.save=function(){
		btnSave.suspendEvents();
		var cargoOwner=frm.find('name','cargoOwnerName');
		var storageDate=frm.find('name','storageDate');
		var planedTime=frm.find('name','planedTime');
		var txtCustName=frm.find('name','custName');
		var transCarrier=frm.find('name','transCarrier');
		
		//货主不可为空
		if(cargoOwner==null||cargoOwner[0].getValue()==''){
			XMG.alert(SYS,C_CARGO_OWNER_REQUIRED,function(){cargoOwner[0].focus();});
			return;
		};
		//承运商
		if(transCarrier==null || transCarrier[0].getValue()==''){
			XMG.alert(SYS,'承运商不能为空！',function(){transCarrier[0].focus();});
			return ;
		}
		//接单日期不可为空
		if(storageDate==null||storageDate[0].getValue()==''){
			XMG.alert(SYS,C_STORAGE_DATE_REQUIRED,function(){storageDate[0].focus();});
			return;
		};
		//预计提货时间不可为空
		if(planedTime==null||planedTime[0].getValue()==''){
			XMG.alert(SYS,C_PLANED_OUT_DATE_REQUIRED,function(){planedTime[0].focus();});
			return;
		};  
		
		//订单号不能为空
		if(txtOrderNo.getValue()==''){
			XMG.alert(SYS,"订单号不能为空！",function(){txtOrderNo.focus();});
			return;
		};  
		if(txtCustName==null||txtCustName[0].getValue()==''){
			XMG.alert(SYS,"客户不能为空！",function(){txtCustName[0].focus();});
			return;
		};  
		
		if(Ext.isEmpty(cboActionGategory.getValue())){
			XMG.alert(SYS,"类别不能为空！",function(){cboActionGategory.focus();});
			return ;
		}
		p.beginEdit();
		//frm.getForm().updateRecord(p);
		var f = WStorageNote.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
		var status=p.get('status');
		switch(status){
			case '新增':
				p.set('status','0');
				break;
			case '已提交':
				p.set('status','1');
				break;
			case '配货中':
				p.set('status','2');
				break;
			case '配货完成':
				p.set('status','3');
				break;
			case '出库中':
				p.set('status','4');
				break;
			case '出库完成':
				p.set('status','5');
				break;
			case '已作废':
				p.set('status','6');
				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
				break;
			default:
				break;
		}
		p.set('storageClassId',storageClassId);
		p.endEdit();
   	 	var xml = HTUtil.RTX(p,'WStorageNote',WStorageNote);
   	 	Ext.getCmp('btnSave').setDisabled(true);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_S'},
			success: function(res){
				var c = HTUtil.XTR(res.responseXML,'WStorageNote',WStorageNote);
				var ra=p.get('rowAction');
				var f = WStorageNote.prototype.fields;
				p.beginEdit();
   				for (var i = 0; i < f.keys.length; i++) {
   					var fn = ''+f.keys[i];
   					p.set(fn,c.get(fn));
   				};
				if(ra=='N'){
					this.find('name','storageNoteNo')[0].setValue(p.get('storageNoteNo'));
					this.find('name','entrustNo')[0].setValue(p.get('entrustNo'));
					p.set('rowAction','M');
				}
				p.endEdit();	
				
				this.updateToolBar();
				

				
				XMG.alert(SYS,M_S);
				Ext.getCmp('btnSave').setDisabled(false);
			},
			failure: function(res){
				XMG.alert(SYS,M_F+res.responseText);
				Ext.getCmp('btnSave').setDisabled(false);
			},
			
			//在xml文档外面封装HtRequest标签
			xmlData:HTUtil.HTX(xml)
		});
		
		btnSave.resumeEvents();
	};
	
	
	//删除出库单
	this.removeNote=function(){
		Ext.getCmp('removeBtn').setDisabled(true);
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
        	if(btn == 'yes') {
        		var xml = HTUtil.RTX4R(p,'WStorageNote');
            	HTUtil.REQUEST('WSTORAGE_NOTE_S', xml,this.removeTab,this);
        	}
		},this);
		Ext.getCmp('removeBtn').setDisabled(false);
	};
	
	var transList=function(){
    	if(p){
    		if(p.get('status')==5){
    			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
    				params:{_A:'WSTORAGE_NOTE_T',id:p.get('id')},
    				success:function(r){
    					Ext.Msg.alert(SYS,'生成陆运单成功！');
    				},
    				failure:function(r){
    					XMG.alert(SYS,M_F+r.responseText);
    				}
    			});
    		}
    	}
    };
  //拣货出库
    var pickedCargo=function(){
    	if (p)
    	{
    		if(p.get('status')!=0){
	    		var tab=this.ownerCt;
	    		var tabId='PICK_CARGO_NEW'+p.get('uuid');
	    		tab.setActiveTab(tab.getComponent(tabId)?tab.getComponent(tabId):tab.add(new Fos.WPickedCargoTab(p,0)));
    		}
    		else{
    			XMG.alert(SYS,"该出库单还没有提交，不能再配货！");
    		}
    	}
    	
    };
	//提交	
	this.submit=function(){this.updateStatus(1);};
	//取消提交
	this.unSubmit=function(){this.updateStatus(0);};
	
	this.computeCost=function(){
		if(p.get('status')==5){
    		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_CC',id:p.get('id')},
    			success: function(res){
    				var a=HTUtil.XTRA(res.responseXML,'SExpense',SExpense);
    				if(a.length>0){
    					XMG.alert(SYS,M_S);
    				}
    				else{
    					XMG.alert(SYS,M_S+" 已经生成费用！");
    				}
    			},
    			failure: function(res){
    				XMG.alert(SYS,M_F+res.responseText);
    				
    			}
    		});
			
		}
		else{
			Ext.Msg.alert(SYS,'该单不是完成状态，不能计费！');
			return ;
		}
	};
	//显示费用处理界面
	this.showExpense=function(){
		createWindow('EXPE_'+p.get("uuid"),C_CONSIGN+C_EXPE+'-'+p.get('storageNoteNo'),
		    			new Fos.ExpenseTab(p),true);
	};
	
	this.showAttach=function(){		
		if(p.get('id')==null||p.get('id')==undefined){
			Ext.Msg.alert(SYS,'请先保存数据单再上传附件！');
			return ;
		}
    	var win = new Fos.AttachWin('W',p.get('id'),p.get('storageNoteNo'));
    	win.show();
    };
    var bAttach={text:C_ATTACH,itemId:'TB_ATTACH',iconCls:'news',
			disabled:p.get('rowAction')=='N',scope:this,handler:this.showAttach};
	
	var btnPickedCargo=new Ext.Button({text:'预配',iconCls:'task',name:'btnPickedCargo',ref:'../btnPickedCargo',
    	hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_PICKED),
    	scope:this,handler:pickedCargo});
	var btnTransList=new Ext.Button({text:'生成陆运单',iconCls:'broken',name:'btnTrans',hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_CONSIGN),scope:this,handler:transList});
	var btnSave=new Ext.Button({text:C_SAVE,id:'btnSave',iconCls:'save',ref:'../saveBtn',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_SAVE)),scope:this,handler:this.save});
	var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',id:'removeBtn',ref:'../removeBtn',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_DEL)),scope:this,handler:this.removeNote});
	var btnCheck=new Ext.Button({text:C_COMMIT,iconCls:'check',ref:'../checkBtn',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_COMMIT)),scope:this,handler:this.submit});
	var btnUnCheck=new Ext.Button({text:C_COMMIT_CANCEL,iconCls:'renew',ref:'../unCheckBtn',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_CANCEL_COMMIT)),scope:this,handler:this.unSubmit});
	var btnPrint=new Ext.Button({text:C_EXPORT,iconCls:'print',ref:'../printBtn',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_EXPORT)),scope:this,
    	menu: {items: [{text:noteName,scope:this,handler:this.exp}]}});
	var btnDollar=new Ext.Button({text:C_EXPE,iconCls:'dollar',ref:'../expeBtn',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_EXPENSE)),scope:this,handler:this.showExpense});
	var computeCost=new Ext.Button({text:'计费',iconCls:'dollar',ref:'../expeBtn',hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPENSE)),scope:this,handler:this.computeCost});
	
	
	
	var frm = new Ext.form.FormPanel({title:'主信息',
		frame:false,autoScroll:true,
		items:[basePanel,receiverPanel,carrierPanel,OtherPanel]
	});
	
	var tab=new Ext.TabPanel({activeTab:0,region:'center',
		items:[frm,grid,atGrid,CostListGrid]});
	
	Fos.StorageNoteOutPanel.superclass.constructor.call(this, { 
	id: 'STORAGE_NOTE_'+p.get('uuid'),title:title,
	closable:true,layout:'border',autoScroll:true,
	tbar:
		[btnSave,'-',
		 btnRemove,'-',
		 btnCheck,'-',
		 btnUnCheck,'-',
		 btnPickedCargo,'-',
		 btnPrint,'->',bAttach,
		 btnTransList,'-',computeCost,'-',
		 btnDollar
		 ],
	items: [tab]
	},this.updateToolBar());
};

Ext.extend(Fos.StorageNoteOutPanel, Ext.Panel);

//添加出库的商品界面
Fos.WNoteCargoOutWin = function(p,store) {
	
	
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库区数据
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库位数据
	var blockStore = new Ext.data.Store({url:SERVICE_URL+'?_A=BLOCK_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WBlock',idProperty:'id'},WBlock),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var close=function(){
		this.hide();
	};
	
	var save = function(){
		p.beginEdit();
		//frm.getForm().updateRecord(p);
		var f = WStorageNoteCargo.prototype.fields;
		for (var i = 0; i < f.keys.length; i++) {
        	var fn = ''+f.keys[i];
        	var fc = this.find('name',fn);
        	if(fc!=undefined&&fc.length>0){
        		p.set(fn,fc[0].getValue());
        	}
   	 	}
		
		if(Ext.isEmpty(p.get('cargoName'))){
			Ext.Msg.alert(SYS,C_CARGO_NAME_REQUIRED,function(){frm.cargoName.focus();},this);
			return;
		};
		if(Ext.isEmpty(p.get('planedPackages'))){
			Ext.Msg.alert(SYS,'件数不能为空！',function(){cnumPlanedPackages.focus();},this);
			return;
		};
		if(Ext.isEmpty(p.get('unitId'))){
			Ext.Msg.alert(SYS,C_QUANTITY_UNIT_REQUIRED,function(){frm.unitName.focus();},this);
			return;
		};
		if(Ext.isEmpty(p.get('planedQuantity'))){
			Ext.Msg.alert(SYS,C_QUANTITY_REQUIRED,function(){frm.quantity.focus();},this);
			return;
		};
		p.endEdit();
		
		
		var xml = HTUtil.RTX(p,'WStorageNoteCargo',WStorageNoteCargo);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WSTORAGE_NOTE_CARGO_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
			if(p.get('rowAction')=='N'){	
				store.add(c);
			}
			else{
				var f = WStorageNoteCargo.prototype.fields;
				p.beginEdit();
				for (var i = 0; i < f.keys.length; i++) {
					var fn = ''+f.keys[i];
					p.set(fn,c.get(fn));
				};  
				p.endEdit();
			}
			this.hide();
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
		xmlData:HTUtil.HTX(xml)});
	};
	var markId=0;
	var markQuantity=0;
	var markGross=0;
	var markWeight=0;
	var markVolume=0;
	
	var ctxtCargoName=new Ext.form.TextField({fieldLabel:C_CARGO_NAME,name:'cargoName',value:p.get('cargoName'),
		disabled:true,anchor:'97%'});
	
	
	//商品名称
	var ccboSkuNo=new Fos.CargoLookUp({fieldLabel:'商品编号',tabIndex:61,
	    name:'skuNo',value:p.get('skuNo'),
		store:WHTStore.getWCargo(),enableKeyEvents:true,
		displayField:'skuNo',valueField:'skuNo',itemCls:'required',
		tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'99%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();
				p.set('cargoId','');
				ctxtCargoName.setValue('');
				p.set('blockId','');
				p.set('blockCode','');	
				ccboBlockName.setValue('');
				p.set('areaId','');
				p.set('areaCode','');	
				ccboAreaName.setValue('');
				p.set('warehouseId','');
				p.set('warehouseCode','');	
				ccboWarehouseName.setValue('');
				ctxtSpecification.setValue('');
				ctxtCargoType.setValue('');
				ctxtCargoColor.setValue('');
				p.set('unitId','');
				ccboUnitName.setValue('');
				p.set('wUnitId','');
				ccboWUnitName.setValue('');
				p.set('vUnitId','');
				ccboVUnitName.setValue('');	
				cnumPlanedGrossWeight.setValue('');
				cnumPlanedNetWeight.setValue('');
				cnumPlanedVolume.setValue('');	
				
				p.set('standardQuantity','');
				p.set('standardGrossWeight','');
				p.set('standardNetWeight','');
				p.set('standardVolume','');
				
			}},
		select:function(c,r,i){
			p.set('cargoId',r.get('id'));				
			
			ctxtCargoName.setValue(r.get('cargoName'));
			p.set('blockId',r.get('blockId'));
			p.set('blockCode',r.get('blockCode'));			
			ccboBlockName.setValue(r.get('blockName'));
			
			p.set('areaId',r.get('areaId'));
			p.set('areaCode',r.get('areaCode'));				
			ccboAreaName.setValue(r.get('areaName'));
			
			p.set('warehouseId',r.get('warehouseId'));
			p.set('warehouseCode',r.get('warehouseCode'));
			ccboWarehouseName.setValue(r.get('warehouseName'));
			
			ctxtSpecification.setValue(r.get('specification'));
			ctxtCargoType.setValue(r.get('cargoType'));
			ctxtCargoColor.setValue(r.get('cargoColor'));
			
			var sq=1;
			var sgw=0;
			var snw=0;
			var sv=0;
			var unitId=r.get('pUnitId');
			var unitName=r.get('pUnitName');
			var pUnitId=r.get('pUnitId');
			var pUnit=r.get('pUnitName');
			
			ccboWUnitName.setValue('千克');
			ccboVUnitName.setValue('立方米');
			
			if(r.get('outUnitValue')==1){
				if(r.get('pQuantity')){
				
					sq=r.get('pQuantity');
					sgw=HTUtil.round2(r.get('grossWeight'));
					snw=HTUtil.round2(r.get('netWeight'));
					sv=HTUtil.round4(r.get('volume'));
					pUnitId=r.get('pUnitId');
					pUnit=r.get('pUnitName');
				}
			}
			else if(r.get('outUnitValue')==2){
				if(r.get('p1Quantity')){
					
					sq=r.get('p1Quantity');
					sgw=HTUtil.round2(r.get('p1GW'));
					snw=HTUtil.round2(r.get('p1NW'));
					sv=HTUtil.round4(r.get('p1V'));
					pUnitId=r.get('p1UnitId');
					pUnit=r.get('p1UnitName');
				}
			}
			else if(r.get('outUnitValue')==3){
				if(r.get('p2Quantity')){
					sq=r.get('p2Quantity');
					sgw=HTUtil.round2(r.get('p2GW'));
					snw=HTUtil.round2(r.get('p2NW'));
					sv=HTUtil.round4(r.get('p2V'));
					pUnitId=r.get('p2UnitId');
					pUnit=r.get('p2UnitName');
				}
			}
			else if(r.get('outUnitValue')==4){
				if(r.get('p3Quantity')){
					sq=r.get('p3Quantity');
					sgw=HTUtil.round2(r.get('p3GW'));
					snw=HTUtil.round2(r.get('p3NW'));
					sv=HTUtil.round4(r.get('p3V'));
					pUnitId=r.get('p3UnitId');
					pUnit=r.get('p3UnitName');
				}
			}
			else if(r.get('outUnitValue')==5){
				if(r.get('p4Quantity')){
					sq=r.get('p4Quantity');
					sgw=HTUtil.round2(r.get('p4GW'));
					snw=HTUtil.round2(r.get('p4NW'));
					sv=HTUtil.round4(r.get('p4V'));
					pUnitId=r.get('p4UnitId');
					pUnit=r.get('p4UnitName');
				}
			}
			
			p.set('standardQuantity',sq);
			p.set('standardGrossWeight',sgw);
			p.set('standardNetWeight',snw);
			p.set('standardVolume',sv);
			var pcs=cnumPlanedPackages.getValue()!=null?cnumPlanedPackages.getValue():0;
			p.set('planedQuantity',pcs*sq);
			p.set('planedGrossWeight',pcs*sgw);
			p.set('planedNetWeight',pcs*snw);
			p.set('planedVolume',pcs*sv);
			p.set('unitId',unitId);//数量单位ID
			ccboUnitName.setValue(unitName);//数量单位
			
			p.set('pUnitId',pUnitId);
			ccboPUnit.setValue(pUnit);
			cnumPlanedQuantity.setValue(pcs*sq); //数量
			cnumPlanedGrossWeight.setValue(pcs*sgw);//毛重
			cnumPlanedNetWeight.setValue(pcs*snw);//净重  
			cnumPlanedVolume.setValue(pcs*sv);	//体积
		},
		keydown:{
			fn:function(f,e){
				WCargoLC(f,e);
				},
			buffer:BFL
		}
		
	}});

	
	//数量单位
	var ccboUnitName=new Ext.form.ComboBox({fieldLabel:'EA包装',name:"unitName",value:p.get("unitName"),align:'center',tabIndex:72,
			ref:'../unitName',displayField:'unitName',valueField:'unitName',triggerAction:'all',disabled:true,
            mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
            listeners:{scope:this,select:function(c,r,i){
				p.set('unitId',r.get('id'));
			}}});

	//重量单位
	var ccboWUnitName=new Ext.form.ComboBox({fieldLabel:C_WEIGHT_UNIT,name:"wUnitName",ref:'../wUnitName',
		value:p.get('wUnitName'),align:'center',tabIndex:76,
			xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
	        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
            listeners:{scope:this,select:function(c,r,i){
				p.set('wUnitId',r.get('id'));
			}}});
	
	
	
	//是否质检
	var cchkQaFlag={fieldLabel:C_QA_FLAG,tabIndex:15,
			name:'qaFlag',xtype:'checkbox',anchor:'99%'};
	//质检单号
	var ctxtQaNo=new Ext.form.TextField({fieldLabel:C_QA_NO,name:'qaNo',value:p.get('qaNo'),tabIndex:17,xtype:'textfield',anchor:'95%'});
	
	//抽样率
	var cnumSmapleRate=new Ext.form.NumberField({fieldLabel:C_SAMPLE_RATE,name:'sampleRate',value:p.get('sampleRate'),value:p.get('sampleRate'),					
			tabIndex:13,xtype:'numberfield',anchor:'95%'});
	
	//品质
	var ccboQualityType=new Ext.form.ComboBox({fieldLabel:C_QUALITY,name:"qualityType",value:p.get('qualityType'),align:'center',tabIndex:19,
			xtype:'combo',displayField:'NAME',valueField:'CODE',triggerAction:'all',
	        mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.QUALITY_TYPE_S,anchor:'95%'});
	//货物规格
	var ctxtSpecification=new Ext.form.TextField({fieldLabel:'货物规格',name:'specification',value:p.get('specification'),tabIndex:62,
	    	ref:'../specification',xtype:'textfield',anchor:'95%'});
	//数量
	var cnumPlanedQuantity=new Ext.form.NumberField({fieldLabel:'EA数量',name:'planedQuantity',value:p.get('planedQuantity'),tabIndex:73,
	    	ref:'../quantity',anchor:'95%',itemCls:'required',
	    	listeners:{scope:this,
				blur:function(f){
					if(f.getRawValue()==''){
						
					}
					else{
						var pQuantity=HTUtil.round2(p.get('standardQuantity'));
						pQuantity=pQuantity==0?1:pQuantity;
						var pcs=0;
						if(pQuantity!=null&&pQuantity!=''){
							pcs=f.getRawValue()/pQuantity;
							cnumPlanedPackages.setValue(pcs);
						}
						
						var grossWeight=p.get('standardGrossWeight');
						if(grossWeight!=null&&grossWeight!=''){
							cnumPlanedGrossWeight.setValue(pcs*grossWeight);
						}
						var netWeight=p.get('standardNetWeight');
						if(netWeight!=null&&netWeight!=''){
							cnumPlanedNetWeight.setValue(pcs*netWeight);
						}
						
						var volume=p.get('standardVolume');
						if(volume!=null&&volume!=''){
							cnumPlanedVolume.setValue(pcs*volume);
						}
						var measure=p.get('standardMeasure');
						if(measure!=null&&measure!=''){
							cnumPlanedMeasure.setValue(pcs*measure);
							
						}
					}
				}
	    	}});
	
	//毛重
	var cnumPlanedGrossWeight=new Ext.form.NumberField({fieldLabel:'毛重',name:'planedGrossWeight',value:p.get('planedGrossWeight'),ref:'../grossWeight',
			tabIndex:77,xtype:'numberfield',anchor:'95%',
			listeners:{}
	});
	
	//净重
	var cnumPlanedNetWeight=new Ext.form.NumberField({fieldLabel:'净重',name:'planedNetWeight',value:p.get('planedNetWeight'),ref:'../netWeight',tabIndex:78,xtype:'numberfield',anchor:'95%',
		listeners:{}});
	//批次号
	var ctxtBatchNo=new Ext.form.TextField({fieldLabel:C_BATCH_NO,name:'batchNo',value:p.get('batchNo'),tabIndex:70,xtype:'textfield',anchor:'95%'});
	
	//生产编码
	var ctxtProductNo=new Ext.form.TextField({fieldLabel:'生产编号',tabIndex:69,name:'productNo',value:p.get('productNo'),anchor:'95%'});
	//生产日期
	var cdteProductDate=new Ext.form.DateField({fieldLabel:C_PRODUCT_DATE,tabIndex:68,name:'productDate',value:p.get('productDate'),
			xtype:'datefield',format:DATEF,anchor:'95%',altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d'});
	//质检类型
	var ccboQaType=new Ext.form.ComboBox({fieldLabel:C_QA_TYPE,name:'qaType',value:p.get('qaType'),tabIndex:16,
			store:HTStore.QA_TYPE_S,xtype:'combo',
			displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction: 'all',
			selectOnFocus:true,anchor:'95%'});
	//抽样数量
	var cnumSampleNum=new Ext.form.NumberField({fieldLabel:C_SAMPLE_NUM,name:'sampleNum',value:p.get('sampleNum'),
			tabIndex:18,xtype:'numberfield',anchor:'95%'});
	
	//质检说明
	var ctxtQaDescription=new Ext.form.TextField({fieldLabel:C_QA_DESCRIPTION,name:'qaDescription',value:p.get('qaDescription'),
		tabIndex:20,xtype:'textfield',anchor:'95%'});
	
	
	//体积
	var cnumPlanedVolume=new Ext.form.NumberField({fieldLabel:C_CBM_S,name:'planedVolume',value:p.get('planedVolume'),ref:'../planedVolume',
			tabIndex:80,xtype:'numberfield',anchor:'95%',decimalPrecision:4,
			listeners:{}
	});
	
	var ccboVUnitName=new Ext.form.ComboBox({fieldLabel:'体积单位',name:'vUnitName',value:p.get('vUnitName'),ref:'../vUnitName',
			xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',tabIndex:79,
	        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',
	        listeners:{scope:this,select:function(c,r,i){
							p.set('vUnitId',r.get('id'));
						}}	
			});
	var cnumPlanedMeasure=new Ext.form.NumberField({fieldLabel:'面积',name:'planedMeasure',ref:'../planedMeasure',tabIndex:82,
		value:p.get('planedMeasure'),xtype:'numberfield',anchor:'95%'});
	var ccboMUnitName=new Ext.form.ComboBox({fieldLabel:'面积单位',name:'mUnitName',ref:'../mUnitName',
		value:p.get('mUnitName'),xtype:'combo',displayField:'unitName',valueField:'unitName',triggerAction:'all',
	        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getUNIT_C(),anchor:'95%',tabIndex:81,
	        listeners:{scope:this,select:function(c,r,i){
							p.set('mUnitId',r.get('id'));
						}}});
	
	var ccboPUnit=new Ext.form.ComboBox({fieldLabel:'件数单位',name:'pUnit',value:p.get('pUnit'),xtype:'combo',
		displayField:'unitName',valueField:'unitName',triggerAction:'all',
	        mode:'remote',selectOnFocus:true,listClass:'x-combo-list-small',
	        store:HTStore.getUNIT_C(),anchor:'95%',tabIndex:74,itemCls:'required',
	        listeners:{scope:this,
		        	select:function(c,re,i){
		        		p.set('pUnitId',re.get('id'));
						if(p.get('pUnitId')){
							Ext.Ajax.request({url:SERVICE_URL,method:'POST',
					   			params:{_A:'WCARGO_FU',_mt:'xml',id:p.get('cargoId')},
								success: function(r){
									var a=HTUtil.XTRA(r.responseXML,'WCargo',WCargo);
									var sq=1;
									var sgw=0;
									var snw=0;
									var sv=0;
									var unitId=re.get('id');
									var unitName=re.get('unitName');
									ccboWUnitName.setValue('千克');
									ccboVUnitName.setValue('立方米');
									if(a.length>0){
											if(p.get('pUnitId')==a[0].get('pUnitId')){//与单号包装一样									
												if(a[0].get('pQuantity')){
													sq=a[0].get('pQuantity');
													sgw=HTUtil.round2(a[0].get('grossWeight'));
													snw=HTUtil.round2(a[0].get('netWeight'));
													sv=HTUtil.round4(a[0].get('volume'));
													unitId=a[0].get('pUnitId');
													unitName=a[0].get('pUnitName');
													
												}												
											}
											else if(p.get('pUnitId')==a[0].get('p1UnitId')){
												if(a[0].get('p1Quantity')){
													sq=a[0].get('p1Quantity');
													sgw=HTUtil.round2(a[0].get('p1GW'));
													snw=HTUtil.round2(a[0].get('p1NW'));
													sv=HTUtil.round4(a[0].get('p1V'));
													unitId=a[0].get('pUnitId');
													unitName=a[0].get('pUnitName');													
												}
												
											}
											else if(p.get('pUnitId')==a[0].get('p2UnitId')){
												if(a[0].get('p2Quantity')){
													sq=a[0].get('p2Quantity');
													sgw=HTUtil.round2(a[0].get('p2GW'));
													snw=HTUtil.round2(a[0].get('p2NW'));
													sv=HTUtil.round4(a[0].get('p2V'));
													unitId=a[0].get('pUnitId');
													unitName=a[0].get('pUnitName');	
												}
											}
											else if(p.get('pUnitId')==a[0].get('p3UnitId')){
												if(a[0].get('p3Quantity')){													
													sq=a[0].get('p3Quantity');
													sgw=HTUtil.round2(a[0].get('p3GW'));
													snw=HTUtil.round2(a[0].get('p3NW'));
													sv=HTUtil.round4(a[0].get('p3V'));
													unitId=a[0].get('pUnitId');
													unitName=a[0].get('pUnitName');	
												}
												
											}
											else if(p.get('pUnitId')==a[0].get('p4UnitId')){
												if(a[0].get('p4Quantity')){
													
													sq=a[0].get('p4Quantity');
													sgw=HTUtil.round2(a[0].get('p4GW'));
													snw=HTUtil.round2(a[0].get('p4NW'));
													sv=HTUtil.round4(a[0].get('p4V'));
													unitId=a[0].get('pUnitId');
													unitName=a[0].get('pUnitName');
												}	
										}
										
									}																
										
									p.set('standardQuantity',sq);
									p.set('standardGrossWeight',sgw);
									p.set('standardNetWeight',snw);
									p.set('standardVolume',sv);
									var pcs=cnumPlanedPackages.getValue()!=null?cnumPlanedPackages.getValue():0;
									p.set('planedQuantity',pcs*sq);
									p.set('planedGrossWeight',pcs*sgw);
									p.set('planedNetWeight',pcs*snw);
									p.set('planedVolume',pcs*sv);
									p.set('unitId',unitId);//数量单位ID
									ccboUnitName.setValue(unitName);//数量单位
									cnumPlanedQuantity.setValue(pcs*sq); //数量
									cnumPlanedGrossWeight.setValue(pcs*sgw);//毛重
									cnumPlanedNetWeight.setValue(pcs*snw);//净重  
									cnumPlanedVolume.setValue(pcs*sv);	//体积
								}		
							});
					}
		      }
	}
	});
	var MGrossWeight1=0;
	var MNetWeight1=0;
	var MVolume1=0;
	
	var MQuantity=p.get('standardQuantity');
	var cnumPlanedPackages=new Ext.form.NumberField({fieldLabel:'件数',tabIndex:75,
		name:'planedPackages',
		value:p.get('planedPackages'),xtype:'numberfield',anchor:'95%',itemCls:'required',
		listeners:{scope:this,			
			blur:function(f){
				if(f.getRawValue()==''){
					
				}
				else{
					var sq=p.get('standardQuantity');
					
					var pcs=f.getRawValue();
					if(sq!=null&&sq!=''){
						//cnumPlanedPackages.setValue(f.getRawValue()/pQuantity);
						cnumPlanedQuantity.setValue(pcs*sq);
					}
					
					var grossWeight=p.get('standardGrossWeight');
					
					if(grossWeight!=null&&grossWeight!=''){
						cnumPlanedGrossWeight.setValue(pcs*grossWeight);
					}
					var netWeight=p.get('standardNetWeight');
					if(netWeight!=null&&netWeight!=''){
						cnumPlanedNetWeight.setValue(pcs*netWeight);
					}
					
					var volume=p.get('standardVolume');
					if(volume!=null&&volume!=''){
						cnumPlanedVolume.setValue(pcs*volume);
					}
					var measure=p.get('standardMeasure');
					if(measure!=null&&measure!=''){
						cnumPlanedMeasure.setValue(pcs*measure);
						
					}
				}
			
			}
			}
	});
	var MPlanedQ=cnumPlanedPackages.getValue();
	this.getGNV = function(){
		if(MPlanedQ){
			MGrossWeight1=cnumPlanedGrossWeight.getValue()/MPlanedQ;
			MNetWeight1=cnumPlanedNetWeight.getValue()/MPlanedQ;
			MVolume1=cnumPlanedVolume.getValue()/MPlanedQ;
		}
	};
	var ccboBlockName=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',value:p.get('blockName'),tabIndex:65,
		store:blockStore,enableKeyEvents:true,itemSelector:'div.list-item',tpl:blockTpl,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					f.clearValue();
					p.set('blockId','');
					p.set('blockCode','');
				}
			},
			select:function(c,r,i){
				p.set('blockId',r.get('id'));
				p.set('blockCode',r.get('blockCode'));
				p.set('areaId',r.get('areaId'));
				p.set('areaCode',r.get('areaCode'));
				
				p.set('warehouseId',r.get('warehouseId'));
				p.set('warehouseCode',r.get('warehouseCode'));
				ccboAreaName.setValue(r.get('areaName'));
				ccboWarehouseName.setValue(r.get('warehouseName'));
			},
			keyup:{
				fn:function(f,e,t){
					WBlockLC(f,e,1,0,'','');
				},
				buffer:BF
			}
		}
	});
	
	var ccboAreaName=new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',value:p.get('areaName'),ref:'../areaName',store:areaStore,xtype:'combo',
			displayField:'areaName',valueField:'areaName',typeAhead: true,mode:'remote',
			triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:66,
			listeners:{scope:this,
				select:function(c,r,i){							
					//areaId=r.get('id');
					p.set('areaId',r.get('id'));
					p.set('areaCode',r.get('areaCode'));	
					p.set('warehouseId',r.get('warehouseId'));
					p.set('warehouseCode',r.get('warehouseCode'));
					frm.warehouseName.setValue(r.get('warehouseName'));	
				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						areaId='';	
						p.set('areaId','');
						p.set('areaCode','');
						p.set('warehouseCode','');
						p.set('warehouseId','');
						frm.warehouseName.setValue('');
					}
				}
			}});
	var ccboWarehouseName=new Ext.form.ComboBox({fieldLabel:'仓库',name:'warehouseName',value:p.get('warehouseName'),
			ref:'../warehouseName',store:warehouseStore,xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
			typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',tabIndex:67,
			listeners:{scope:this,
				select:function(c,r,i){
					p.set('warehouseId',r.get('id'));
					p.set('warehouseCode',r.get('warehouseCode'));
					
	    			frm.areaName.setValue('');
	    			frm.areaName.store.removeAll();
	    			frm.areaName.store.baseParams={_mt:'json',warehouseId:r.get('id')};
	    			frm.areaName.store.reload();

				},
				blur:function(f){
					if(f.getRawValue()==''){
						f.clearValue();
						p.set('warehouseId','');
						p.set('warehouseCode','');
					}}
			}});
	var ctxtCargoType=new Ext.form.TextField({fieldLabel:'货物型号',xtype:'textfield',name:'cargoType',tabIndex:63,
			value:p.get('cargoType'),ref:'../cargoType',anchor:'95%'});
	var ctxtCargoColor=new Ext.form.TextField({fieldLabel:'货物颜色',xtype:'textfield',name:'cargoColor',tabIndex:64,
			value:p.get('cargoColor'),ref:'../cargoColor',anchor:'95%'});
	
	var ccboPackName=new Ext.form.ComboBox({fieldLabel:'包装种类',tabIndex:83,name:'packName',value:p.get('packName'),anchor:'95%'});
	var cnumPlanPack=new Ext.form.NumberField({fieldLabel:'包装数量',tabIndex:84,name:'planPack',value:p.get('planPack'),anchor:'95%'});
	var cEmpty={fieldLabel:'-',anchor:'95%',labelSeparator:''};
	var ctxtRemarks=new Ext.form.TextField({fieldLabel:'备注',name:'remarks',tabIndex:71,value:p.get('remarks'),anchor:'88.5%'});
	

	var sheet1=new Ext.Panel({title:'质检信息',
		labelWidth:80,layout:'column',layoutConfig:{columns:4},
		items:[{columnWidth:.25,layout:'form',border:false,
			       items:[cchkQaFlag]},
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ccboQaType,cnumSmapleRate]},
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ccboQualityType,cnumSampleNum]},
		       {columnWidth:.25,layout:'form',border:false,
			       items:[ctxtQaDescription,ctxtQaNo]}]
	});
	
	var tab=new Ext.TabPanel({activeTab:0,
		items:[sheet1]});
	
	
	var frm = new Ext.form.FormPanel({labelWidth:65,frame:true,padding:5,
		layout:'column',ref:'../frm',layoutConfig:{columns:4},items:[
            {columnWidth:.3,layout:'form',border:false,items:[
                ccboSkuNo
                ]},
            {columnWidth:.3,layout:'form',border:false,items:[
ctxtProductNo
              ]},
          {columnWidth:.3,layout:'form',border:false,items:[
cdteProductDate
               ]},
            {columnWidth:.6,layout:'form',border:false,items:[ctxtCargoName]},
            {columnWidth:.3,layout:'form',border:false,items:[
ctxtBatchNo
               ]},
            {columnWidth:.3,layout:'form',border:false,items:[
               ctxtCargoType,ccboWarehouseName
               ]},
            {columnWidth:.3,layout:'form',border:false,items:[
              ctxtSpecification,ccboAreaName
               ]},
            {columnWidth:.3,layout:'form',border:false,items:[
                ctxtCargoColor,ccboBlockName
               ]},
            {columnWidth:1,layout:'form',border:false,items:[
               ctxtRemarks
              ]}
	    ]});
	
	var quantityPanel=new Ext.Panel({title:'数量信息',
		frame:false,layout:'column',padding:5,
		items:[
		       {columnWidth:.25,labelWidth:65,layout:'form',border:false,
		    	   items:[ccboUnitName,ccboWUnitName,ccboVUnitName]},
	    	   {columnWidth:.25,labelWidth:65,layout:'form',border:false,
		    	   items:[cnumPlanedQuantity,cnumPlanedGrossWeight,cnumPlanedVolume]},
	    	   {columnWidth:.25,labelWidth:65,layout:'form',border:false,
		    	   items:[ccboPUnit,cnumPlanedNetWeight,ccboMUnitName]},
	    	   {columnWidth:.25,labelWidth:65,layout:'form',border:false,
		    	   items:[cnumPlanedPackages,cEmpty,cnumPlanedMeasure]}
		       ]
	});
	
	Fos.WNoteCargoOutWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:C_ADD_CARGO,width:800,height:360,modal:true, closeAction : 'hide',
	  	items:[frm,quantityPanel],
	  	buttons:[{text:C_SAVE,iconCls:'ok',id:'btnSave',scope:this,handler:save},
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:close}]
	},this.getGNV());
};
Ext.extend(Fos.WNoteCargoOutWin, Ext.Window);

//===========  PART 3   ================  PART 3   ================  PART 3   ==================


