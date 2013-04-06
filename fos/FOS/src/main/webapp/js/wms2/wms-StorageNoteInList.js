
Fos.StorageNoteGrid = function(t) {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WSTORAGE_NOTE_Q',baseParams:{_mt:'xml',storageType:t},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',id:'id'},WStorageNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:C_PS20}});
     
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	
    //renderer可以用来对数据进行一定的格式化
    var cm=new Ext.grid.ColumnModel({columns:[sm,
      {header:'类别',align:'left',width:50,dataIndex:'actionGategory',renderer:WHTStore.ACTION_GATEGORY,align:'center'},
      {header:C_STATUS,dataIndex:'status',align:'left',width:80,renderer:WHTStore.getInWarehouseNoteStatus},
 	{header:C_IN_STORAGE_NOTE_NO,align:'center',dataIndex:'storageNoteNo',width:125},	
 	{header:'货主',dataIndex:'cargoOwnerName',width:200,align:'center'},
 	{header:'供应商',align:'center',dataIndex:'custName',width:200},
 	{header:'采购订单号',dataIndex:'orderNo',width:120,align:'left'},
 	{header:'委托编号',dataIndex:'entrustNo',width:100,align:'center'},
 	{header:C_PLANED_IN_DATE,width:100,dataIndex:'planedTime',renderer:formatDate}, 	
 	{header:C_STORAGE_DATE,align:'center',dataIndex:'storageDate',width:100,renderer:formatDate},
 	{header:C_ACTURE_IN_TIME,width:100,dataIndex:'actureTime',renderer:formatDate}
     ],defaults:{sortable:true,width:60}});
    
    //新增
    var addNote=function(){
    	var p = new WStorageNote({uuid:HTUtil.UUID(32),
    		status:0,
    		storageDate:new Date(),
    		planedTime:new Date(),
    		compCode:sessionStorage.getItem('COMP_CODE'),
    		userName:sessionStorage.getItem("USER_NAME"),
    		cargoOwnerId:HTStore.getCFG('IN_CARGO_OWNER_NAME'),
			cargoOwnerName:HTStore.getCFGD('IN_CARGO_OWNER_NAME'),
    		storageType:t,
    		rowAction:'N'});
    	var tab = this.ownerCt;
    	tab.setActiveTab(tab.add(new Fos.StorageNotePanel(p)));
    };
    
    //删除
    var deleteNote=function(){
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
    this.editNote=function(){
    	var p = sm.getSelected();
    	if(p){
    		var tab = this.ownerCt;
    		var c = 'STORAGE_NOTE_'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.StorageNotePanel(p)));
    	
    		this.changeBtnStatus(p);
    	}
    };
    
    //收货调用方法
    var placed=function(){
    	var p=sm.getSelected();
    	if(p){
    		var tab = this.ownerCt;
    		var c = 'RECEIVED_CARGO_NOTE'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.WPlacedCargoTab(p)));
    		this.changeBtnStatus(p);
    	
    	}
    };
    
   var reCalc=function(){
	 var p=sm.getSelected();
	 if(p){
		 Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'WSTORAGE_NOTE_RCPC',id:p.get('id')},
				success:function(r){
					
					XMG.alert(SYS,"成功");
				},
				failure:function(r){
					XMG.alert(SYS,M_F+r.responseText);
				}
			
			});
	 }
   };
   
   var reCalcVolume=function(){
	   var p=sm.getSelected();
	   if(p){
		   Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'WSTORAGE_NOTE_RCRC',id:p.get('id')},
				success:function(r){
					
					XMG.alert(SYS,"成功");
				},
				failure:function(r){
					XMG.alert(SYS,M_F+r.responseText);
				}
			
			});
	   }
   };
    //整单质检调用方法
    var noteQc=function()
    {
    	var p=sm.getSelected();
    	if (p)
    	{
    		if(p.get('status')!=3){
    			XMG.alert(SYS,'请入库单还未收货完成，不能整单质检！');
    			return ;
    		}
    		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'NOTE_ALL_QC',storageNoteId:p.get('id')},
				success:function(r){
					p.beginEdit();
					p.set('status',7);
					this.changeBtnStatus(p);
					p.endEdit();
					XMG.alert(SYS,"整单质检处理成功");
				},
				failure:function(r){
					XMG.alert(SYS,M_F+r.responseText);
				}
			});
    	}
    };
    
    //质检完成调用方法
    function qcComplete()
    {
    	var p=sm.getSelected();
    	if (p)
    	{
    		if(p.get('status')!=7){
    			XMG.alert(SYS,'请入库单还未质检，不能整单质检完成！');
    			return ;
    		}
    	    Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'QC_COMPLETE',storageNoteId:p.get('id')},
				success:function(r){
					p.beginEdit();
					p.set('status',8);
					this.changeBtnStatus(p);
					p.endEdit();
					XMG.alert(SYS,"质检完成处理成功");
				},
				failure:function(r){
					XMG.alert(SYS,M_F+r.responseText);
				}
			});
    	}
    	
    }
    
    //整单上架调用方法
    function notePlaced()
    {
    	var p=sm.getSelected();
    	if (p)
    	{
    		var tab = this.ownerCt;
    		var c = 'RECEIVED_CARGO_GRID'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.WReceivedCargoGrid(p,0)));
    		this.changeBtnStatus(p);
    	}
    }
    
    var setAddEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_ADD)){
    		btnAdd.enable();
    	}
    	else{
    		btnAdd.disable();
    	}
    };
    
    var setEditEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EDIT)){
    		btnEdit.enable();
    	}
    	else{
    		btnEdit.disable();
    	}
    };
    
    var setRemoveEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL)){
    		btnRemove.enable();
    	}
    	else{
    		btnRemove.disable();
    	}
    };
    
    var setReceivedEnable=function(t){
  
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_RECEIVED)){
    		btnPlacedCargo.enable();
    	}
    	else{
    		btnPlacedCargo.disable();
    	}
    };
    
    var setQCEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_QA)){
    		//btnNoteQC.enable();
    	}
    	else{
    		//btnNoteQC.disable();
    	}
    };
    
    var setQcCompleteEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_QA)){
    		//btnQcComplete.enable();
    	}
    	else{
    		//btnQcComplete.disable();
    	}
    };
    
    var setPlacedEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_PLACED)){
    		
    	}
    	else{
    		
    	}
    };
    
    var setCancelPlacedEnable=function(t){
    	if(t&&!NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_PLACED)){
    		//btnCancelPlaced.enable();
    	}
    	else{
    		//btnCancelPlaced.disable();
    	}
    };
    //根据单据状态改变工具栏按钮状态
    this.changeBtnStatus=function(p)
    {
    	//新增状态
    	if (p.get('status')==0)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(true);
    		setReceivedEnable(false);
    		setQCEnable(false);
    		setQcCompleteEnable(false);
    		setPlacedEnable(false);
    		setCancelPlacedEnable(false);
    	}
    	
    	//已提交状态
    	if (p.get('status')==1)
    	{
    		setAddEnable(true);
    		setEditEnable(false);
    		setRemoveEnable(false);
    		setReceivedEnable(true);
    		setQCEnable(false);
    		setQcCompleteEnable(false);
    		setPlacedEnable(false);
    		setCancelPlacedEnable(false);
    	}
    	
    	//收货中状态
    	if (p.get('status')==2)
    	{
    		setAddEnable(true);
    		setEditEnable(false);
    		setRemoveEnable(false);
    		setReceivedEnable(true);
    		setQCEnable(true);
    		setQcCompleteEnable(true);
    		setPlacedEnable(true);
    		setCancelPlacedEnable(true);
    	}
    	
    	//收货完成状态
    	if (p.get('status')==3)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setReceivedEnable(true);
    		setQCEnable(true);
    		setQcCompleteEnable(true);
    		setPlacedEnable(true);
    		setCancelPlacedEnable(true);
    	}
    	
    	//质检中状态
    	if (p.get('status')==7)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setReceivedEnable(false);
    		setQCEnable(false);
    		setQcCompleteEnable(true);
    		setPlacedEnable(false);
    		setCancelPlacedEnable(false);
    	}
    	
    	//质检完成状态
    	if (p.get('status')==8)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setReceivedEnable(false);
    		setQCEnable(false);
    		setQcCompleteEnable(false);
    		setPlacedEnable(true);
    		setCancelPlacedEnable(false);
    	}
    	
    	//上架中状态
    	if (p.get('status')==4)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setReceivedEnable(true);
    		setQCEnable(false);
    		setQcCompleteEnable(false);
    		setPlacedEnable(true);
    		setCancelPlacedEnable(false);
    	}
    	//上架完成
    	if (p.get('status')==5)
    	{
    		setAddEnable(true);
    		setEditEnable(true);
    		setRemoveEnable(false);
    		setReceivedEnable(false);
    		setQCEnable(false);
    		setQcCompleteEnable(false);
    		setPlacedEnable(false);
    		setCancelPlacedEnable(true);
    	}
    };
	
	this.report=function(){
		var url = REPORT_URL+'&__report=reports/wms_CargoTake.rptdesign&__format=pdf&compCode='+sessionStorage.getItem("COMP_CODE");
		var p = sm.getSelected();
		if(!p){
			XMG.alert(SYS,'请选择一条数据！');
			return ;
		}else if(p){
			url +=	'&id='+p.get('id');
		}
		window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};
	
	this.computeCost=function(){
		var p = sm.getSelected();
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
		var p = sm.getSelected();
		if(p){
			createWindow('EXPE_'+p.get("uuid"),C_CONSIGN+C_EXPE+'-'+p.get('storageNoteNo'),
	    			new Fos.ExpenseTab(p),true);
		}
	};
	var reSetStatus=function(){
		var p=sm.getSelected();
		if(p){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'WSTORAGE_NOTE_U',id:p.get('id'),status:'-1'},
    			success: function(res){
    				var a=HTUtil.XTRA(res.responseXML,'WStorageNote',WStorageNote);
    				if(a.length>0){
    					HTUtil.RUA(store,a,WStorageNote);
    				}
    				
    			},
    			failure: function(res){
    				XMG.alert(SYS,M_F+res.responseText);
    			}
    		});
		}
	};
	
	var inListExcel=function(){
		var a = sm.getSelected();
		var url = REPORT_URL;
		url += '&__report=reports/wms_CargoInListReport.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE")+'&id='+a.get('id');
		window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};
	var placedListExcel=function(){
		var a = sm.getSelected();
		var url = REPORT_URL;
		url += '&__report=reports/wms_PlacedCargoList.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE")+'&id='+a.get('id');
		window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
	};
	
	var storageNo=new Ext.form.TextField();
	
	this.searchByEntrustNo=function(){
		var orderNo=storageNo.getValue();
		if(!orderNo){
			XMG.alert(SYS,'查询条件不能为空！');return;
		}
		else{
			store.removeAll();
			store.baseParams={_mt:'xml',_A:'WSTORAGE_NOTE_X',orderNo:orderNo};
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
    var btnAdd=new Ext.Button({text:C_ADD,iconCls:'add',ref:'../btnAdd',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_ADD),scope:this,handler:addNote});
    //编辑
    var btnEdit=new Ext.Button({text:C_EDIT,iconCls:'option',ref:'../btnEdit',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EDIT),scope:this,handler:this.editNote});
    //删除
    var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',ref:'../btnRemove',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_DEL),scope:this,handler:deleteNote});
    
    //上架
    var btnPlacedCargo=new Ext.Button({text:'上架',iconCls:'option',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_PLACED),scope:this,handler:placed});
    
  //上架
    var btnStatus=new Ext.Button({text:'状态更新',iconCls:'option',scope:this,handler:reSetStatus});
  
	this.showAttach=function(){
		var p = sm.getSelected();
		if(p.get('id')==null||p.get('id')==undefined){
			Ext.Msg.alert(SYS,'请先保存数据单再上传附件！');
			return ;
		}
    	var win = new Fos.AttachWin('W',p.get('id'),p.get('storageNoteNo'));
    	win.show();
    };
    var bAttach={text:C_ATTACH,itemId:'TB_ATTACH',iconCls:'news',scope:this,handler:this.showAttach};
  
  //重新计算
    var btnReCalcCargo=new Ext.Button({text:'重新计算',iconCls:'option',scope:this,handler:reCalc});
    
  //重新计算重量，体积
    var btnReCalcCargoVolume=new Ext.Button({text:'重新计算体积',iconCls:'option',scope:this,handler:reCalcVolume});
    
    var btnSearch=new Ext.Button({text:'快捷查询',iconCls:'search',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_SEARCH),scope:this,handler:this.searchByEntrustNo,lableWidth:'right',anchor:'50%'});
    
    var computeCost=new Ext.Button({text:'计费',iconCls:'dollar',ref:'../expeBtn',hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPENSE)),scope:this,handler:this.computeCost});
	
    var btnExpe=new Ext.Button({text:C_EXPE,iconCls:'dollar',ref:'../expeBtn',
    	hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPENSE),scope:this,handler:this.showExpense});
    
    var btnPrintReport={text:'入库单列印',iconCls:'stats',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT),
    	scope:this,handler:this.report,
    	lableWidth:'right',anchor:'50%'};
    //任务清单
    var btnInListExcel={text:'任务清单',iconCls:'print',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT),
    	scope:this,handler:inListExcel};    
    //上架清单
    var btnPlacedListExcel={text:'上架任务清单',iconCls:'print',hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPORT),
    	scope:this,handler:placedListExcel};
  
    var btnExport=new Ext.Button({text:C_EXPORT,iconCls:'print',scope:this,
		menu: {items: [		   		
			{text:'Excel',menu:{items:[btnInListExcel,btnPlacedListExcel]}},
			{text:'PDF',menu:{items:[btnPrintReport]}}
			]
    }});
	
    Fos.StorageNoteGrid.superclass.constructor.call(this,{id:t==0?'IN_NOTE_LIST':'OUT_NOTE_LIST',
    	iconCls:'gen',title:t==0?C_IN_NOTE_LIST:C_OUT_NOTE_LIST,
    	closable:true,store:store,sm:sm,cm:cm,stripeRows:true,columnLines:true,
    	listeners:{scope:this,
    		//双击进入编辑
    		rowdblclick: function(grid, rowIndex, event){
    			this.editNote();
    		},
    		
    		//单击后根据单据状态改变toolbar按钮
    		rowclick:function(grid,rowIndex,event){
    			var p = sm.getSelected();
    			this.changeBtnStatus(p);
    		}
    	},
    	loadMask: true,
    	bbar:PTB(store,20),
    	tbar:[          btnAdd,
    	    	        btnEdit,
    	    	        btnRemove,'-',
    	    	        btnPlacedCargo,'-',
    	    	        btnStatus,'-',
    	    	        {text:'订单号:'},
    	    	        storageNo,
    	    	        btnSearch,'-',    	    	        
    	    	        btnExport,'->',
    	    	        bAttach,
    	    	        computeCost,
    	    	        btnExpe
    	    ]
    });
};
Ext.extend(Fos.StorageNoteGrid, Ext.grid.GridPanel);


