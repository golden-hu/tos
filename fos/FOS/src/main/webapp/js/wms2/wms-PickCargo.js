
/*
 * 出库列表的拣货出库弹出界面
 */
Fos.WPickedCargoTab=function(noteRecord,t){
	this.sel=-10000;
	this.mSel=-1000;
	
	var storageStore=new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_Q',baseParams:{_mt:'xml',storageType:1},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',id:'id'},WStorageNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//出库单货物明细store
	var storageCargoStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNoteCargo',id:'id'},WStorageNoteCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//拣货明细store
	var pkcStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WPICKED_CARGO_Q',baseParams:{_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPickedCargo',id:'id'},WPickedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var re0={scope:this,
    		rowselect:function(sm,row,record){
    			if(this.mSel!=record.get('id')){
    				this.mSel=record.get('id');
    				storageCargoStore.removeAll();
    				storageCargoStore.load({params:{storageNoteId:record.get('id')}});
    				storageCargoStore.removeAll();
        			
    			}
    			
    		}
    		
    };
	var sm0=new Ext.grid.CheckboxSelectionModel({singleSelect:true,scope:this,listeners:re0});
    //构建入库单grid
    var cm0=new Ext.grid.ColumnModel({columns:[sm0,
    {header:'状态',dataIndex:'status',renderer:WHTStore.getOutWarehouseNoteStatus,width:80},
	{header:'出库单号',dataIndex:'storageNoteNo',width:150},
	{header:'货主',dataIndex:'cargoOwnerName',width:150},
	{header:'客户',dataIndex:'custName',width:150}
    ],defaults:{sortable:true,width:100}});    
    
    var grdStorage=new Ext.grid.GridPanel({
    	region:'west',width:250,
    	closable:false,collapseMode:'mini',split:true,
		autoScroll:true,containerScroll:true,
    	store:storageStore,sm:sm0,cm:cm0,
    	loadMask: true,
    	bbar:PTB(storageStore,20)
   	});
    
	if(noteRecord){
		this.mSel=noteRecord.get('id');
		storageStore.load({
			params:{id:noteRecord.get('id')},
			callback:function(r){
				if(r.length>0){
					storageCargoStore.load({params:{storageNoteId:noteRecord.get('id')},
						callback:function(r){
							grdStorage.getSelectionModel().selectFirstRow();
						}});
					
				}
			}
		});
	}
	else{
		storageStore.load({params:{start:0,limit:20}});
	}

	
	//定义选择模式为check框选择
	var sm1=new Ext.grid.CheckboxSelectionModel({
			singleSelect:false,
			scope:this
			//listeners:re
	});
	
	//定义列模式
	var cm1=new Ext.grid.ColumnModel({
		columns:[sm1,
			{header:'商品编码',width:80,dataIndex:'skuNo'},
			{header:'商品名称',width:200,dataIndex:'cargoName'},			
			{header:'生产批号',width:80,dataIndex:'productNo'},
			{header:'计划数量',width:80,dataIndex:'planedQuantity',renderer:round2},
			{header:'分配数量',width:80,dataIndex:'distQuantity',renderer:round2},
			{header:'已拣数量',width:80,dataIndex:'pickedQuantity',renderer:round2},
			{header:'欠货数量',width:80,dataIndex:'adjustQuantity',renderer:round2},
			{header:'件数单位',width:80,dataIndex:'pUnit'},
			{header:'计划件数',width:80,dataIndex:'planedPackages',renderer:round2},
			{header:'分配件数',width:80,dataIndex:'distPackages',renderer:round2},
			{header:'已拣件数',width:80,dataIndex:'pickedPackages',renderer:round2},
			{header:'重量单位',width:80,dataIndex:'wUnitName'},
			{header:'计划毛重',width:80,dataIndex:'planedGrossWeight',renderer:round2},
			{header:'已拣毛重',width:80,dataIndex:'pickedGrossWeight',renderer:round2},
			{header:'计划净重',width:80,dataIndex:'planedNetWeight',renderer:round2},			
			{header:'已拣净重',width:80,dataIndex:'pickedNetWeight',renderer:round2},
			{header:'体积单位',width:80,dataIndex:'vUnitName'},
			{header:'计划体积',width:80,dataIndex:'planedVolume',renderer:round2},
			{header:'已拣体积',width:80,dataIndex:'pickedVolume',renderer:round2},
			{header:'面积单位',width:80,dataIndex:'mUnitName'},
			{header:'计划面积',width:80,dataIndex:'planedMeasure',renderer:round2},
			{header:'已拣面积',width:80,dataIndex:'pickedMeaSure',renderer:round2},
			{header:'库位',width:80,dataIndex:'blockName'},
			{header:'库区',width:80,dataIndex:'areaName'},
			{header:'仓库',width:80,dataIndex:'warehouseName'},
			{header:'商品规格',width:120,dataIndex:'specification'},
			{header:'商品型号',width:120,dataIndex:'cargoType'},
			{header:'商品颜色',width:120,dataIndex:'cargoColor'},
			{header:'备注',width:200,dataIndex:'remarks'}
			
			], 
		defaults:{sortable:true,width:100}
		
	});
	
	//自动拣货
	var multBatPick=function(){
		var rows=pkcStore.getModifiedRecords();
		if(rows.length>0){
			XMG.alert(SYS,"分配记录未保存，请先保存再操作！");
			return ;
		}
		var rows=sm1.getSelections();
		if(rows.length>0){
			var xml='';
			xml=HTUtil.ATX(rows,'WStorageNoteCargo',WStorageNoteCargo);
			if(xml!=''){
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
					params:{_A:'WPICKED_CARGO_APC'},
					success:function(res){
						var a=HTUtil.XTRA(res.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
						HTUtil.RUA(storageCargoStore,a,WPlacedCargo);
						if(a.length>0){
							pkcStore.load({
								params:{outStorageNoteCargoId:a[0].get('id')},
								callback:function(rows){
									if(rows.length>0){
										XMG.alert(SYS,"自动拣货完成！");
									}
									else{
										XMG.alert(SYS,"自动拣货查询不到可以匹配的库存，无法自动拣货！");
									}
								}
							});
						}else{
							XMG.alert(SYS,"自动拣货查询不到可以匹配的库存，无法自动拣货！");							
						}
					},
					failure:function(r){
						XMG.alert(SYS,M_F+r.responseText);
					},
					xmlData:HTUtil.HTX(xml)
			});
			}
		}
	};
	
	//拣货按钮功能
	this.pick=function(){
		var rows=pkcStore.getModifiedRecords();
		if(rows.length>0){
			XMG.alert(SYS,"分配记录未保存，请先保存再操作！");
			return ;
		}
		//取得一条选中的需要拣货的货物
		var cargoRecord = sm1.getSelected();
		//如果取到的话再根据出库单的货主ID去取得已上架物品的数据
		if(cargoRecord){
			//判断需要拣货的数量
			var needQuantity=HTUtil.round2(cargoRecord.get('planedQuantity'))
			-HTUtil.round2(cargoRecord.get('pickedQuantity'))-HTUtil.round2(cargoRecord.get('distQuantity'));
			//只有需要拣货的数量大于0时才去拣货
			if (needQuantity>0)
			{
				var win=new Fos.WPickCargoFromPlacedWin(noteRecord,cargoRecord,pkcStore);
				win.show();				
			}	
			else
				XMG.alert(SYS,"该货物已经完成拣货！");	
		}
		else{
			XMG.alert(SYS,C_SELECT_PLANED_CARGO);
		}	

	}; 
	
	// 调整数量 adjust_quantity
	this.adjust=function(){		
		var r=sm1.getSelected();
		if(r){
			if(r.get('planedQuantity')==(HTUtil.round2(r.get('pickedQuantity'))+HTUtil.round2(r.get('adjustQuantity')))){
				Ext.Msg.alert(SYS,"已经全部拣货，无需再调整！");
				return ;
			}
			var win=new Fos.AdjustQuantityWin(r);
			win.show();
		}		
	};
	
	var btnAdjust=new Ext.Button({text:'欠货数量',iconCls:'option',hidden:NR(M1_WMS+WM_NOTEOUT+WMI_PICKED+WF_ADJUTS),
		disabled:noteRecord.get('status')==5,scope:this,handler:this.adjust});
	var btnBatPick=new Ext.Button({text:'自动分配',iconCls:'gen',scope:this,handler:multBatPick});	
	var btnAdd=new Ext.Button({text:'手工分配',iconCls:'add',disabled:noteRecord.get('status')==5,
		scope:this,
		handler:this.pick
});
	//显示出库货物明细的grid
	var grdCargoInfo=new Ext.grid.GridPanel({
		layout:'fit',
		region:'north',
		height:250,
		closable:false,
		store:storageCargoStore,sm:sm1,cm:cm1,
		listeners:{scope:this,
    		rowclick:function(t,r,e){
    			var rows=pkcStore.getModifiedRecords();
    			if(rows.length>0){
    				XMG.alert(SYS,"分配记录未保存，请先保存再操作！");
    				return ;
    			}
    			
	    		var cargoRecord = sm1.getSelected();
	    		if(cargoRecord)
	    			pkcStore.reload({params:{outStorageNoteCargoId:cargoRecord.get('id')}});
	    		else 
	    			pkcStore.removeAll();
	    	}
	    },
		tbar:[btnAdd,btnBatPick,'-',btnAdjust]
	});
	
	var nbfQ=new Ext.form.NumberField({allowNegative:false,selectOnFocus:true});
	var nbfP=new Ext.form.NumberField({allowNegative:false,selectOnFocus:true});
	var nbfGW=new Ext.form.NumberField({allowNegative:false,selectOnFocus:true});
	var nbfNW=new Ext.form.NumberField({allowNegative:false,selectOnFocus:true});
	var nbfV=new Ext.form.NumberField({decimalPrecision:4,allowNegative:false,selectOnFocus:true});
	var nbfM=new Ext.form.NumberField({allowNegative:false,selectOnFocus:true});
	
	var sm2=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm2=new Ext.grid.ColumnModel({columns:[sm2,
	         new Ext.grid.RowNumberer(),
			{header:'商品编码',width:80,dataIndex:'skuNo'},			
			{header:'库位',width:60,dataIndex:'blockName'},
			{header:'EA单位',dataIndex:'unitName',width:60},
			{header:'分配EA',dataIndex:'distQuantity',width:60,renderer:round2,editor:nbfQ},			
			{header:'已拣EA',dataIndex:'pickedQuantity',width:60,renderer:round2},			
			{header:'件数<br/>单位',width:60,dataIndex:'pUnitName'},
			{header:'分配<br/>件数',dataIndex:'distPackages',width:60,renderer:round2,editor:nbfP},			
			{header:'已拣<br/>件数',dataIndex:'pickedPackages',width:60,renderer:round2},
			{header:'重量<br/>单位',width:60,dataIndex:'wUnitName'},					
			{header:'分配<br/>毛重',width:60,dataIndex:'distGrossWeight',renderer:round2,editor:nbfGW},
			{header:'分配<br/>净重',width:60,dataIndex:'distNetWeight',renderer:round2,editor:nbfNW},	
			{header:'体积<br/>单位',width:60,dataIndex:'vUnitName'},			
			{header:'分配<br/>体积',width:60,dataIndex:'distVolume',renderer:round4,editor:nbfV},
			{header:'面积<br/>单位',width:60,dataIndex:'mUnitName'},	
			{header:'分配<br/>面积',width:60,dataIndex:'distMeasure',renderer:round2,editor:nbfM},							
			{header:'已拣<br/>毛重',width:60,dataIndex:'pickedGrossWeight',renderer:round2},
			{header:'已拣<br/>净重',width:60,dataIndex:'pickedNetWeight',renderer:round2},
			{header:'已拣<br/>体积',width:60,dataIndex:'pickedVolume',renderer:round2},
			{header:'已拣<br/>面积',width:60,dataIndex:'pickedMeasurement',renderer:round2},
			{header:'商品名称',width:200,dataIndex:'cargoName'},
			{header:'库区',width:60,dataIndex:'areaName'},
			{header:'仓库',width:80,dataIndex:'warehouseName'},
			 {header:'序号',width:60,dataIndex:'id'},
			 {header:'SQ',width:60,dataIndex:'standardQuantity'},
              ],defaults:{sortable:true,width:100}}); 
	
    
    //已拣货列表删除按钮功能
	this.removePickCargo = function(){		
		var b =sm2.getSelections();		
		if(b.length>0){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var rows=[];
	        		for(var i=0;i<b.length;i++){
	        			var r=b[i];
	        			if(r.get('rowAction')=='N'){
	        				r.set('rowAction','D');
	        				pkcStore.remove(r);
	        			}
	        			else if(HTUtil.round2(r.get('pickedQuantity'))<=0){
	        				r.set('rowAction','R');
	        				rows[rows.length]=r;
	        			}
	        		}
	        		
	        		var xml='';
	        		if(rows.length>0){
	        			xml=HTUtil.ATX(rows,'WPickedCargo',WPickedCargo);
	        		}
	        		if(xml!=''){
	        			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
	        		 		params:{_A:'WPICKED_CARGO_DCS'},
	        				success: function(res){	
	        					var a = HTUtil.XTRA(res.responseXML,'WStorageNote',WStorageNote);
	        					HTUtil.RUA(storageStore,a,WStorageNote);
	        					var c = HTUtil.XTRA(res.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
	        					HTUtil.RUA(storageCargoStore,c,WStorageNoteCargo);
	        					pkcStore.remove(rows);
	        					XMG.alert(SYS,M_S);
	        				},
	        				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
	        				xmlData:HTUtil.HTX(xml)
	        			});
	        		};
	        		
	        		
	        	}
			},this);
	    }
		else{ 
			Ext.Msg.alert(SYS,M_R_P);	//如果没有选择，则提示请选择要删除的记录
		}	
	}; 
	
	var save=function(){
		var selR=sm1.getSelected();
		if(selR==null){
			return;
		}
		var rows=pkcStore.getRange();
		if(rows.length>0){
			var sumDistQ=0.00;
			var sumDistP=0.00;
			var sumDistGW=0.00;
			var sumDistNW=0.00;
			var sumDistV=0.00;
			var sumDistM=0.00;
			for(var i=0;i<rows.length;i++){
				var r=rows[i];
				if(r.get('rowAction')=='M'||r.get('rowAction')=='N'||r.get('rowAction')==null){
					sumDistQ+=HTUtil.round2(r.get('distQuantity'));
					sumDistP+=HTUtil.round2(r.get('distPackages'));
					sumDistGW+=HTUtil.round2(r.get('distGrossWeight'));
					sumDistNW+=HTUtil.round2(r.get('distNetWeight'));
					sumDistV+=HTUtil.round4(r.get('distVolume'));
					sumDistM+=HTUtil.round2(r.get('distMeasure'));
				}
			}
			if(HTUtil.round2(selR.get('planedQuantity'))-HTUtil.round2(selR.get('pickedQuantity'))<sumDistQ){
				Ext.Msg.alert(SYS,"分配的数量合计超过计划出库数量，不能保存！");
				return;
			}
		}
		
		rows=pkcStore.getModifiedRecords();
		var xml='';
		if(rows.length>0){
			xml=HTUtil.ATX(rows,'WPickedCargo',WPickedCargo);
		}
		if(xml!=''){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
		 		params:{_A:'WPICKED_CARGO_DCS'},
				success: function(res){		
					var a = HTUtil.XTRA(res.responseXML,'WStorageNote',WStorageNote);
					HTUtil.RUA(storageStore,a,WStorageNote);
					
					var c = HTUtil.XTRA(res.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
					HTUtil.RUA(storageCargoStore,c,WStorageNoteCargo);
					
					var pc=HTUtil.XTRA(res.responseXML,'WPickedCargo',WPickedCargo);
					HTUtil.RUA(pkcStore,pc,WPickedCargo);
					
					XMG.alert(SYS,M_S);
				},
				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)
			});
		};
	};
	
	
	var pick=function(){
		var rows =sm2.getSelections();		
		if(rows.length>0){	    	
    		Ext.Msg.confirm(SYS,"警告：【拣货完成】以后将不能再取消，请确认！",function(btn){
	        	if(btn == 'yes') {
	        		for(var i=0;i<rows.length;i++){
	        			if(rows[i].get('rowAction')=='N'){
	        				XMG.alert(SYS,"存在未修改未保存的数据，请先保存再拣货完成！");
	        				return ;
	        			}
	        		}
	        		
	        		var a=[];
	        		for(var i=0;i<rows.length;i++){
	        			var r=rows[i];
	        			if(r.get('status')!='5'){
	        				r.set('status',5);
	        				r.set('pickedQuantity',HTUtil.round2(r.get('distQuantity')));
	        				r.set('pickedPackages',HTUtil.round2(r.get('distPackages')));
	        				r.set('pickedGrossWeight',HTUtil.round2(r.get('distGrossWeight')));
	        				r.set('pickedNetWeight',HTUtil.round2(r.get('distNetWeight')));
	        				r.set('pickedVolume',HTUtil.round4(r.get('distVolume')));
	        				r.set('pickedMeasurement',HTUtil.round2(r.get('distMeasure')));
	        				
	        				r.set('pickedDate',new Date());
	        				
	        				r.set('distQuantity',0.00);
	        				r.set('distPackages',0.00);
	        				r.set('distGrossWeight',0.00);
	        				r.set('distNetWeight',0.00);
	        				r.set('distVolume',0.00);
	        				r.set('distMeasure',0.00);
	        				r.set('rowAction','M');
	        				
	        				a[a.length]=r;
	        			}
	        		}
	        		
	        		var xml='';
	        		xml=HTUtil.ATX(a,'WPickedCargo',WPickedCargo);
	        		if(xml!=''){

	        			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
	        		 		params:{_A:'WPICKED_CARGO_PC'},
	        				success: function(res){		
	        					var a = HTUtil.XTRA(res.responseXML,'WStorageNote',WStorageNote);
	        					HTUtil.RUA(storageStore,a,WStorageNote);
	        					
	        					var c = HTUtil.XTRA(res.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
	        					HTUtil.RUA(storageCargoStore,c,WStorageNoteCargo);
	        					
	        					var pc=HTUtil.XTRA(res.responseXML,'WPickedCargo',WPickedCargo);
	        					HTUtil.RUA(pkcStore,pc,WPickedCargo);
	        					
	        					XMG.alert(SYS,M_S);
	        				},
	        				failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
	        				xmlData:HTUtil.HTX(xml)
	        			});
	        		
	        		}
	        	}
    		},this);
		}
	};
	
	
	var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',disabled:noteRecord.get('status')==5,
			scope:this,
			handler:this.removePickCargo			
	});
	
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',disabled:noteRecord.get('status')==5,
		scope:this,handler:save});
	
	var btnPickCheck=new Ext.Button({text:"拣货确认",iconCls:'check',disabled:noteRecord.get('status')==5,
		scope:this,handler:pick});
	
	var grdPickedCargo=new Ext.grid.EditorGridPanel({iconCls:'gen',
		title:'分配明细',layout:'fit',	region:'center',
		clicksToEdit:1,columnLines:true,
    	closable:true,store:pkcStore,sm:sm2,cm:cm2,    	
    	tbar:[btnRemove,btnSave,btnPickCheck],    	
		listeners:{scope:this,			
			afterrender:function(){
				if(t==1){
					btnAdd.disable();
					btnRemove.disable();
				}
			},
			beforeedit:function(e){
				if(e.record.get('pickedQuantity')>0){
					return false;
				}
				else{
					return true;
				}
			},
			afteredit:function(e){
				var f=e.field;
				var r=e.record;
				var sq=numRender(r.get('standardQuantity'));
				sq=sq==0?1:sq;
				var sgw=numRender(r.get('standardGrossWeight'));
				var snw=numRender(r.get('standardNetWeight'));
				var sv=numRender(r.get('standardVolume'));
				var stm=numRender(r.get('standardMeasure'));
				
		    	if(f=='distQuantity'){
		    		r.beginEdit();
		    		var quantity=numRender(e.value);
					var packages=HTUtil.round2(quantity/sq);
					//if(Ext.isEmpty(r.get('distPackages'))||HTUtil.round2(r.get('distPackages'))==0){
						r.set('distPackages',packages);
						r.set('packages',packages);
					//}
					
					r.set('grossWeight',HTUtil.round2(packages*sgw));
					r.set('netWeight',HTUtil.round2(packages*snw));
					r.set('volume',HTUtil.round2(packages*sv));
					r.set('measure',HTUtil.round2(packages*stm));
					
					r.set('distQuantity',quantity);
					r.set('distGrossWeight',HTUtil.round2(packages*sgw));
					r.set('distNetWeight',HTUtil.round2(packages*snw));
					r.set('distVolume',HTUtil.round2(packages*sv));
					r.set('distMeasure',HTUtil.round2(packages*stm));
					
		    		r.endEdit();
		    		}
		    	if(f=='distPackages'){
		    		r.beginEdit();
		    		var packages=numRender(e.value);
					var quantity=HTUtil.round2(packages*sq);
					if(Ext.isEmpty(r.get('distQuantity'))||HTUtil.round2(r.get('distQuantity'))==0){
						r.set('quantity',quantity);
						r.set('distQuantity',quantity);
					}
					
					r.get('packages',packages);
					r.set('grossWeight',HTUtil.round2(packages*sgw));
					r.set('netWeight',HTUtil.round2(packages*snw));
					r.set('volume',HTUtil.round2(packages*sv));
					r.set('measure',HTUtil.round2(packages*stm));
					
					r.get('distPackages',packages);					
					r.set('distGrossWeight',HTUtil.round2(packages*sgw));
					r.set('distNetWeight',HTUtil.round2(packages*snw));
					r.set('distVolume',HTUtil.round2(packages*sv));
					r.set('distMeasure',HTUtil.round2(packages*stm));
		    		r.endEdit();
		    		}
			}
		}

	});
	
	var center=new Ext.Panel({
		region:'center',layout:'border',
		items:[grdCargoInfo,grdPickedCargo]
	});
	
	
	Fos.WPickedCargoTab.superclass.constructor.call(this,{
		id:'PICK_CARGO_NEW'+noteRecord.get('uuid'),
		width:1000,iconCls:'gen',title:'拣货出库',closable:true,layout:'border',
		items:[grdStorage,center]
	});
	
};
Ext.extend(Fos.WPickedCargoTab,Ext.Panel);
//================ P1 END ==================================================================


/*
 * 拣货界面
 * pm:出库主信息
 * p:待拣货货物
 * pkcStore:保存分拣信息
 */

Fos.WPickCargoFromPlacedWin = function(pm,p,pkcStore) {
	
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'WPLACED_CARGO_X4PK',_mt:'xml'},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WPlacedCargo',id:'id'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'productDate', direction:'desc'}});
	
	//还需拣货数量
	var txtPlanedPickedQuantity=new Ext.form.TextField({fieldLabel:'计划拣货数量',name:'planedPickedQuantity',
		     value:p.get('planedQuantity')-p.get('pickedQuantity')-p.get('distQuantity'),disabled:true,anchor:'95%'});
	var txtNeedPickedQuantity=new Ext.form.TextField({fieldLabel:'还需拣货数量',disabled:true,anchor:'95%'});
	
	
	if(p){
		store.baseParams={_mt:'xml',_A:'WPLACED_CARGO_X',cargoId:p.get('cargoId')};
		
	}
	
	var rs={
			scope:this,
			rowselect:function(sm,row,record){
				txtNeedPickedQuantity.setValue(HTUtil.round2(txtNeedPickedQuantity.getValue())+HTUtil.round2(record.get('nowQuantity')));
			},
			rowdeselect:function(sm,row,record){
				txtNeedPickedQuantity.setValue(HTUtil.round2(txtNeedPickedQuantity.getValue())-HTUtil.round2(record.get('nowQuantity')));
			} 
	};
	
	//构建一个新的拣货信息记录
	var selectRow =CHKCLM('选择','selectFlag');
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[selectRow,
	     {header:'库位',width:80,dataIndex:'blockName'},
	     {header:C_SKU_NO,width:80,dataIndex:'skuNo'},
	     {header:C_CARGO_NAME,width:200,dataIndex:'cargoName'},
	     {header:'件数单位',width:80,dataIndex:'pUnitName'},  
     	 {header:'库存件数',width:80,dataIndex:'packages',renderer:round2},
	     {header:'已拣件数',width:80,dataIndex:'pickedPackages',renderer:HTUtil.round2},
	     {header:'数量单位',width:80,dataIndex:'unitName'},
	     {header:"库存数量",width:80,dataIndex:'quantity',renderer:HTUtil.round2},
	     {header:C_PICKED_QUANTITY,width:80,dataIndex:'pickedQuantity',renderer:HTUtil.round2},	
	     {header:'预配数量',width:80,dataIndex:'lastPickedQuantity',renderer:HTUtil.round2},
	 	 /*{header:'生产编号',width:80,dataIndex:'productNo'},*/
	 	 {header:C_IN_STORAGE_NOTE_NO,width:120,dataIndex:'storageNoteNo'},
	 	 {header:C_CARGO_OWNER,width:200,dataIndex:'custName'},
     	 {header:'库区',width:80,dataIndex:'areaName'},
     	 {header:'仓库',width:80,dataIndex:'warehouseName'},
     	{header:'重量单位',width:80,dataIndex:'wUnitName'},
     	{header:'计划毛重',width:120,dataIndex:'grossWeight',renderer:HTUtil.round2},
     	{header:'拣货毛重',width:120,dataIndex:'pickedGrossWeight',renderer:HTUtil.round2},
     	{header:'计划净重',width:120,dataIndex:'netWeight',renderer:HTUtil.round2},
     	{header:'拣货净重',width:120,dataIndex:'pickedNetWeight',renderer:HTUtil.round2},
     	{header:'体积单位',dataIndex:'vUnitName'},
     	{header:'计划体积',width:120,dataIndex:'volume',renderer:HTUtil.round4},
     	{header:'拣货体积',width:120,dataIndex:'pickedVolume',renderer:HTUtil.round4},
     	{header:'面积单位',width:80,dataIndex:'mUnitName'},
     	{header:'计划面积',width:120,dataIndex:'measure',renderer:HTUtil.round2},
     	{header:'拣货面积',width:120,dataIndex:'pickedMeasure',renderer:HTUtil.round2},     	
     	{header:C_WARE_DATE_IN,width:100,dataIndex:'receivedDate',renderer:formatDate},
     	{header:C_PRODUCT_DATE,width:100,dataIndex:'productDate',renderer:formatDate},
     	{header:C_BATCH_NO,width:80,dataIndex:'batchNo'},
     	{header:C_SPECIFICATION,width:80,dataIndex:'specification'},
     	{header:'货物型号',width:80,dataIndex:'cargoType'},
     	{header:'货物颜色',width:80,dataIndex:'cargoColor'},
     	{header:'备注',width:100,dataIndex:'remarks'}
         ],defaults:{sortable:true,width:80}});
	
	var selectedRow=function(r){
		/*
		 * 选中一行纪录，则记录本次拣货数量
		 * 算法：如果该库存量小于等于需要拣货数量，则将本次拣货数量设为库存数量，并且，将需要拣货数量＝需拣货数量-本次拣货数量
		 * 将库存数量，拣货数量，显示在控件上
		 * 将拣货数量做为全局变量，暂存起来，以便后面拣货数量变化以后，再做用。
		 * 
		 * 如果库存数量大于需要拣货数量，则将本次拣货数量设为f需要拣货数量，更新需要拣货数量为0；
		 * 将库存数量，拣货数量，显示在控件上
		 * 将拣货数量做为全局变量
		 */
		
		if(r.get('unitName')!=p.get('unitName')){
			Ext.Msg.confirm(SYS,'库存EA单位与出库货物的EA单位不一致，是否继续？',function(btn){
				if(btn=='no'){
					return ;
				}});	
			
		}
		var quantity=txtPlanedPickedQuantity.getValue()==null?0:txtPlanedPickedQuantity.getValue();
		var distedQ=txtNeedPickedQuantity.getValue()==null?0:txtNeedPickedQuantity.getValue();
		var needDistQ=quantity-distedQ;
		var lastPickedQuantity=HTUtil.round2(r.get('lastPickedQuantity'));
		var canDistQ=HTUtil.round2(r.get('quantity'))-HTUtil.round2(r.get('pickedQuantity'))-lastPickedQuantity;
		if(needDistQ>0&&canDistQ>0){
			if(needDistQ>=canDistQ){
				r.set('lastPickedQuantity',HTUtil.round2(lastPickedQuantity)+HTUtil.round2(canDistQ));
				distedQ=HTUtil.round2(distedQ)+HTUtil.round2(canDistQ);
				txtNeedPickedQuantity.setValue(distedQ);
			}
			else{
				r.set('lastPickedQuantity',HTUtil.round2(lastPickedQuantity)+HTUtil.round2(needDistQ));
				distedQ=HTUtil.round2(distedQ)+HTUtil.round2(needDistQ);
				txtNeedPickedQuantity.setValue(distedQ);
			}
			r.set('selectFlag',1);
		}
		
	};
	
	var cancelSelectedRow=function(r){
		if(r.get('selectFlag')!=1){			
			return ;
		}
		var distedQ=txtNeedPickedQuantity.getValue()==null?0:txtNeedPickedQuantity.getValue();
		var lastPickedQuantity=HTUtil.round2(r.get('lastPickedQuantity'));
		
		r.set('lastPickedQuantity',0);
		distedQ=HTUtil.round2(distedQ)-HTUtil.round2(lastPickedQuantity);
		txtNeedPickedQuantity.setValue(distedQ);
		r.set('selectFlag',0);
		
	};
	
	
	
    //拣货界面右侧grid的，显示的传入的第一个参数store,已经上架的可供拣货的数据集(上架信息)
	var grid=new Ext.grid.GridPanel({
		store:store,sm:sm,cm:cm,height:250,region:'center',
		listeners:{scope:this,
			rowclick: function(g, rowIndex, event){
				var c=sm.getSelected();
				//c是上架数据
				//cargo是需要拣货的对象
				if(c){
					//如果是刚选中的，就执行自动拣货功能
					if(c.get('selectFlag')==0){		
						var quantity=txtPlanedPickedQuantity.getValue()==null?0:txtPlanedPickedQuantity.getValue();
						var distedQ=txtNeedPickedQuantity.getValue()==null?0:txtNeedPickedQuantity.getValue();
						var needDistQ=quantity-distedQ;
						if(needDistQ>0){
							selectedRow(c);
						}
						else{
							Ext.Msg.alert(SYS,'未拣货数量已经为0，无需再拣了！');
						}
					}
					else{
						//如果是取消选中的，则从已经添加的表中删掉，还原数据
						cancelSelectedRow(c);
						
					}
				}
			}
		},
	bbar:[{text:'计划合计数量'},txtPlanedPickedQuantity,{text:'已分配数量'},txtNeedPickedQuantity]
	});
	
	//生成新的拣货单
	var createNewPickedCargo=function(c){
		pc = new WPickedCargo({uuid:HTUtil.UUID(32),rowAction:'N'});
		pc.set('compCode',sessionStorage.getItem("COMP_CODE"));
		pc.set('version',0);
		
		pc.set('outStorageNoteId',p.get('storageNoteId'));
		pc.set('outStorageNoteNo',p.get('storageNoteNo'));
		pc.set('outStorageNoteCargoId',p.get('id'));				
		pc.set('inStorageNoteId',c.get('storageNoteId'));
		pc.set('inStorageNoteNo',c.get('storageNoteNo'));
		pc.set('inStorageNoteCargoId',c.get('storageNoteCargoId'));
		pc.set('placedCargoId',c.get('id'));
		pc.set('receivedDate',c.get('receivedDate'));
		pc.set('pickedDate',new Date());
		pc.set('custId',c.get('custId'));
		pc.set('custName',c.get('custName'));
		pc.set('orderNo',c.get('orderNo'));
		pc.set('warehouseId',c.get('warehouseId'));
		pc.set('warehouseCode',c.get('warehouseCode'));
		pc.set('warehouseName',c.get('warehouseName'));
		pc.set('areaId',c.get('areaId'));
		pc.set('areaCode',c.get('areaCode'));
		pc.set('areaName',c.get('areaName'));
		pc.set('blockId',c.get('blockId'));
		pc.set('blockCode',c.get('blockCode'));
		pc.set('blockName',c.get('blockName'));
		pc.set('skuNo',c.get('skuNo'));
		pc.set('cargoId',c.get('cargoId'));
		pc.set('cargoName',c.get('cargoName'));
		pc.set('specification',c.get('specification'));
		pc.set('batchNo',c.get('batchNo'));					
		pc.set('productDate',c.get('productDate'));
		pc.set('productNo',c.get('productNo'));
		pc.set('unitId',c.get('unitId'));
		pc.set('unitName',c.get('unitName'));
		pc.set('wUnitId',c.get('wUnitId'));
		pc.set('wUnitName',c.get('wUnitName'));
		pc.set('vUnitId',c.get('vUnitId'));
		pc.set('vUnitName',c.get('vUnitName'));
		pc.set('mUnitId',c.get('mUnitId'));
		pc.set('mUnitName',c.get('mUnitName'));
		pc.set('pUnitName',c.get('pUnitName'));
		pc.set('pUnitId',c.get('pUnitId'));
		pc.set('packUnitName',c.get('packUnitName'));
		pc.set('packUnitId',c.get('packUnitId'));
		pc.set('remarks',c.get('remarks'));	
		
		var sq=HTUtil.round2(c.get('standardQuantity'));
		sq=sq==0?1:sq;
		var sgw=HTUtil.round2(c.get('standardGrossWeight'));
		var snw=HTUtil.round2(c.get('standardNetWeight'));
		var sv=HTUtil.round4(c.get('standardVolume'));
		var sm=HTUtil.round2(c.get('standardMeasure'));
		pc.set('standardQuantity',HTUtil.round2(c.get('standardQuantity')));
		pc.set('standardGrossWeight',HTUtil.round2(c.get('standardGrossWeight')));
		pc.set('standardNetWeight',HTUtil.round2(c.get('standardNetWeight')));
		pc.set('standardVolume',HTUtil.round4(c.get('standardVolume')));
		pc.set('standardMeasure',HTUtil.round2(c.get('standardMeasure')));
		
		var distQuantity=HTUtil.round2(c.get('lastPickedQuantity'));
		
		pc.set('quantity',HTUtil.round2(distQuantity));
		var pgs=distQuantity/sq;
		pc.set('packages',HTUtil.round2(pgs));
		pc.set('grossWeight',HTUtil.round2(pgs*sgw));
		pc.set('netWeight',HTUtil.round2(pgs*snw));
		pc.set('volume',HTUtil.round4(pgs*sv));
		pc.set('measurement',HTUtil.round2(pgs*sm));
		
		pc.set('distQuantity',HTUtil.round2(distQuantity));
		//alert(c.get('nowPackages'));
		pc.set('distPackages',HTUtil.round2(pgs));
		pc.set('distGrossWeight',HTUtil.round2(pgs*sgw));
		pc.set('distNetWeight',HTUtil.round2(pgs*snw));
		pc.set('distVolume',HTUtil.round4(pgs*sv));
		pc.set('distMeasure',HTUtil.round2(pgs*sm));
		
		pc.set('pickedQuantity',0.00);
		pc.set('pickedPackages',0.00);
		pc.set('pickedGrossWeight',0.00);
		pc.set('pickedNetWeight',0.00);
		pc.set('pickedVolume',0.00);
		pc.set('pickedMeasurement',0.00);
		return pc;
		
	};	
	
	
	//拣货窗口保存按钮功能	
	var save = function(){
		//var rows=sm.getSelections();
		var rows=store.getModifiedRecords();
		if(rows.length>0){
			for(var i=0;i<rows.length;i++){
				var r=rows[i];
				if(r.get('selectFlag')==1){
					var pc=createNewPickedCargo(r);
					//同时更新w_storage_note_cargo的记录数量
					//p.set('distQuantity',HTUtil.round2(p.get('distQuantity'))+HTUtil.round2(pc.get('distQuantity')));
					pkcStore.add(pc);
				}
			}
			this.close();
		}
		
	};
	
	var cancel=function(){
		Ext.Msg.confirm(SYS,"请确认要取消保存数据，并关闭页面！",function(btn){
        	if(btn == 'yes') {
				this.close();
        	}
		},this);
	};	

	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'ok',menuAlign:'right',scope:this,handler:save});
	var btnCanel=new Ext.Button({text:'关闭',iconCls:'cancel',menuAlign:'right',scope:this,handler:cancel});
	
	//Definition Search Control
	//Begin
	var lkpCargoOwnerName=new Fos.CustomerLookup({fieldLabel:C_CARGO_OWNER,
            name:'cargoOwnerName',value:pm.get('cargoOwnerName'),
			store:HTStore.getCS(),enableKeyEvents:true,
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custCode',valueField:'custNameCn',
			typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'97%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
				}},
			select:function(c,r,i){
			},
			keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		}
	);
	
	var ccboCargoName=new Fos.CargoLookUp({fieldLabel:C_CARGO_NAME,
	    name:'cargoName',value:p.get('cargoName'),
		store:WHTStore.getWCargo(),enableKeyEvents:true,
		displayField:'skuNo',valueField:'cargoName',itemCls:'required',
		tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'97%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();
				txtSkuNo.setValue('');
			}},
		select:function(c,r,i){					
			txtSkuNo.setValue(r.get('skuNo'));
		},
		keydown:{
			fn:function(f,e){
				WCargoLC(f,e);
				},
			buffer:BF
		}
		
	}});
	
	var txtSkuNo=new Ext.form.TextField({fieldLabel:'货物编号',name:'skuNo',value:p.get('skuNo'),anchor:'95%',hidden:true});
	var dtaProductDate=new Ext.form.DateField({fieldLabel:'生产日期',name:'productDate',
		format:DATEF,
		altFormats:'Ymd|Y/m/d|Y.m.d|Y-m-d',
		value:p.get('productDate'),anchor:'95%'});
	
	var txtProductNo=new Ext.form.TextField({fieldLabel:'生产编号',name:'productNo',
		value:p.get('productNo'),anchor:'95%'});
	
	var txtBatchNo=new Ext.form.TextField({fieldLabel:'批次号',name:'batchNo',
		value:p.get('batchNo'),anchor:'95%'});
	var txtOrderNo=new Ext.form.TextField({fieldLabel:'客户订单号',name:'orderNo',
		anchor:'95%'});
	
	var ccboAreaName=new Ext.form.ComboBox({fieldLabel:'库区',name:'areaName',value:p.get('areaName'),
		store:WHTStore.getArea(),
		displayField:'areaName',valueField:'areaName',typeAhead: true,mode:'remote',
		triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){	
			},
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
				}
			}
		}});
	
	// 查询
	
	var search=function(){
		var a=[];
		if(lkpCargoOwnerName.getValue()){
			a[a.length]=new QParam({key:'cargoOwnerName',value:lkpCargoOwnerName.getValue(),op:EQ});
		}
		
		if(txtSkuNo.getValue()){
			a[a.length]=new QParam({key:'skuNo',value:txtSkuNo.getValue(),op:EQ});
		}
		else{
			if(ccboCargoName.getValue()){
				a[a.length]=new QParam({key:'cargoName',value:ccboCargoName.getValue(),op:EQ});
			}
		}
/*
		var productNo=txtProductNo.getValue();
		if(productNo){
			a[a.length]=new QParam({key:'productNo',value:productNo,op:LI});
		}*/
		
		if(dtaProductDate.getValue()){
			a[a.length]=new QParam({key:'productDate',value:dtaProductDate.value,op:EQ});
		}
		if(ccboAreaName.getValue()){
			a[a.length]=new QParam({key:'areaName',value:ccboAreaName.getValue(),op:EQ});
		}
		
		if(txtOrderNo.getValue()){
			a[a.length]=new QParam({key:'orderNo',value:txtOrderNo.getValue(),op:LI});
		}
		if(a.length>0){
			store.baseParams={_mt:'xml',_A:'WPLACED_CARGO_X4PK',xml:HTUtil.QATX(a)};
		}
		else{
			store.baseParams={_mt:'xml',_A:'WPLACED_CARGO_X4PK'};
		}
		
		
		store.reload({
     		callback:function(r){
      		}     	
     	});
	};
	
	var btnSearch=new Ext.Button({text:"查询",iconCls:'search',scope:this,handler:search});
	
	var pnlSearch=new Ext.Panel({layout:'column',height:100,padding:5,region:'north',
		buttonAlign:'center',
		items:[{columnWidth:.5,labelWidth:80,layout:'form',border:false,
			   items:[lkpCargoOwnerName,ccboCargoName]},			   
			   {columnWidth:.25,labelWidth:80,layout:'form',border:false,
					items:[txtOrderNo,dtaProductDate]},
			   {columnWidth:.25,labelWidth:80,layout:'form',border:false,
				    items:[ccboAreaName,txtBatchNo]},			  
			   {columnWidth:.1,labelWidth:10,layout:'form',border:false,
					items:[txtSkuNo]}
	         ],
	         buttons:[btnSearch]
	});
	
	
	Fos.WPickCargoFromPlacedWin.superclass.constructor.call(this,{buttonAlign:'center',
		title:'拣货页面',layout:'border',width:1024,height:560,modal:true,closable:true,
		
		items:[pnlSearch,grid],   
	  	buttons:[btnSave,'-',btnCanel]
	});
};
Ext.extend(Fos.WPickCargoFromPlacedWin, Ext.Window);



/*
 * 调整数量 窗口
 */
Fos.AdjustQuantityWin = function(p) {
	var numAdjustQuantity=new Ext.form.NumberField({fieldLabel:'调整数量',itemCls:'required',name:'adjustQuantity',
		value:p.get('planedQuantity')-HTUtil.round2(p.get('pickedQuantity')),
		anchor:'95%'});
	
	var txtRemarks=new Ext.form.TextArea({fieldLabel:'备注',name:'remarks',anchor:'95%',itemCls:'required'});
	
	this.frm = new Ext.form.FormPanel({labelWidth:80,padding:5,
            	items:[numAdjustQuantity,txtRemarks]
    });
	
	this.save=function(){
		if(Ext.isEmpty(numAdjustQuantity.getValue())){
			Ext.Msg.alert(SYS,"调整数量不能为空！");
			return ;
		}
		if(Ext.isEmpty(txtRemarks.getValue())){
			Ext.Msg.alert(SYS,"备注不能为空！");
			return ;
		}
		p.set('adjustQuantity',numAdjustQuantity.getValue());
		
		p.set('remarks',p.get('remarks')+'\n'+txtRemarks.getValue());
		
		var xml='';
		xml=xml+HTUtil.RTX(p,'WStorageNoteCargo',WStorageNoteCargo);
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'WSTORAGE_NOTE_CARGO_AJ'},
				success:function(r){
					//var a=HTUtil.ATR
					var a = HTUtil.XTR(r.responseXML,'WStorageNoteCargo',WStorageNoteCargo);
					HTUtil.RU(a,p,WStorageNoteCargo);
					XMG.alert(SYS,"数据保存成功！");
					this.close();
				},
				failure:function(r){
					XMG.alert(SYS,M_F+r.responseText);
				},
				xmlData:HTUtil.HTX(xml)
			
			});
		}
	};
	
	this.cancel=function(){
		this.close();
	};
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',scope:this,handler:this.save});
	var btnCancel=new Ext.Button({text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.cancel});
	
	Fos.AdjustQuantityWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:'调整数量',width:400,height:200,maximizable:true,layout:'fit',
        plain:false,items:this.frm,
        buttons:[btnSave,'-',btnCancel]
  			
	});
};
Ext.extend(Fos.AdjustQuantityWin, Ext.Window);
