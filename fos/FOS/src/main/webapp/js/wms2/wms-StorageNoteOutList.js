
Fos.StorageNoteOutGrid = function(t) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'WSTORAGE_NOTE_Q',_mt:'xml',storageType:t},
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',idProperty:'id'},WStorageNote),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load({params:{start:0,limit:C_PS20}});
     
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm=new Ext.grid.ColumnModel({columns:[sm, 
	        {header:'类别',align:'left',width:80,dataIndex:'actionGategory',renderer:WHTStore.ACTION_GATEGORY},
	        {header:'状态',align:'left',width:80,dataIndex:'status',renderer:WHTStore.getOutWarehouseNoteStatus},
        	{header:'出库单号',align:'left',dataIndex:'storageNoteNo',width:140},
        	{header:'委托单位',align:'left',dataIndex:'cargoOwnerName',width:150},
        	{header:'客户',align:'left',dataIndex:'custName',width:150},
        	{header:'订单号',width:100,dataIndex:'orderNo'},
        	{header:'出库时间',width:100,dataIndex:'actureTime',renderer:formatDate},
        	{header:'地址',width:100,dataIndex:'loadingAddress'},
        	{header:'客户订单号',align:'center',width:100,dataIndex:'entrustNo'},
        	{header:'接单日期',width:100,dataIndex:'storageDate',renderer:formatDate},
        	{header:'预计出库时间',width:100,dataIndex:'planedTime',renderer:formatDate},
        	{header:'批次号',width:100,dataIndex:'batchNo'},
        	{header:'结算单位',width:100,dataIndex:'accountName'},
        	{header:'合同号',width:100,dataIndex:'contractNo'}
            ],defaults:{sortable:true,width:60}});
  
    var deleteNote=function(){
    	var a = sm.getSelected();
    	if(a){
    		if(a.get('status')!=0){
    			Ext.Msg.alert(SYS,"该出库单不是新增状态，不能删除！");
    			return ;
    		}
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.RTX4R(a,'WStorageNote');
	            	HTUtil.REQUEST('WSTORAGE_NOTE_S', xml,function(){store.remove(a);});
	        	}
			},this);
    	}
    	else Ext.MessageBox.alert(SYS,M_R_P);
    };
    this.editNote=function(){
    	var p = sm.getSelected();
    	if(p){
    		var tab = this.ownerCt;
    		var c = 'STORAGE_NOTE_'+p.get('uuid');
        	tab.setActiveTab(tab.getComponent(c)?tab.getComponent(c):tab.add(new Fos.StorageNoteOutPanel(p)));
    	}
    };
    var textNumber = new Ext.form.TextField({});
    
    this.searchByNumber=function(){
    	var orderNo=textNumber.getValue();
    	if(!orderNo){
    		XMG.alert(SYS,'查询条件不能为空！');return;
    	}else{
    		var a=[];
    		a[a.length]= new QParam({key:'orderNo',value:orderNo,op:7});
    		//conditions
    		a[a.length]=new QParam({key:'storageType',value:t,op:EQ});
    		store.removeAll();
    		store.baseParams={_mt:'xml',_A:'WSTORAGE_NOTE_X',xml:HTUtil.QATX(a)};
    		store.load({
    			callback:function(r){
    				if(r.length<=0){
    					Ext.Msg.alert(SYS,"NO Records!");
    				}
    			}
    		});
    	}
    };
    
    //拣货出库
    var pickedCargo=function(){
    	var selR=sm.getSelected();
    	if (selR)
    	{
    		if(selR.get('status')!=0){
	    		var tab=this.ownerCt;
	    		var tabId='PICK_CARGO_NEW'+selR.get('uuid');
	    		
	    		tab.setActiveTab(tab.getComponent(tabId)?tab.getComponent(tabId):tab.add(new Fos.WPickedCargoTab(selR,0)));
    		}
    		else{
    			XMG.alert(SYS,"该出库单还没有提交，不能再配货！");
    		}
    	}
    	
    };
    
    var showPickedCargo=function(){
    	var selR=sm.getSelected();
    	if (selR)
    	{
    		if(selR.get('status')!=0){
	    		var tab=this.ownerCt;
	    		var tabId='PICK_CARGO_NEW'+selR.get('uuid');
	    		tab.setActiveTab(tab.getComponent(tabId)?tab.getComponent(tabId):tab.add(new Fos.WPickedCargoTab(selR,1)));
    		}
    		else{
    			XMG.alert(SYS,"该出库单还没有提交，不能再配货！");
    		}
    	}
    };
       
    var pickedComplete=function(){
    	var p=sm.getSelected();
    	if(p){
    		Ext.Msg.confirm(SYS,"警告：【拣货】以后将不能再取消，请确认！",function(btn){
	        	if(btn == 'yes') {
    			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
					params:{_A:'WPICKED_CARGO_PCB',id:p.get('id')},
					success:function(r){
						var a=HTUtil.XTRA(r.responseXML,'WStorageNote',WStorageNote);
						HTUtil.RUA(store,a,WStorageNote);
						XMG.alert(SYS,"拣货完成！");
					},
					failure:function(r){
						alert(r.responseText);
						XMG.alert(SYS,M_F+r.responseText);
					}
				});
	        	}},
	        this);
    	}
    };
    
    var cancelPickedComplete=function(){
    	var p=sm.getSelected();
    	if(p){
    		if(p.get('status')==5){
    			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
					params:{_A:'WSTORAGE_NOTE_U',id:p.get('id'),status:2},
					success:function(r){
						p.beginEdit();
						p.set('status',2);
						//this.updateTB(p);
						p.endEdit();
						XMG.alert(SYS,"取消成功！");
					},
					failure:function(r){
						XMG.alert(SYS,M_F+r.responseText);
					}
				
				});
    		}
    	}
    };
    
    var trans=function(){
    	var p=sm.getSelected();
    	if(p){
    		if(p.get('status')==5){
    	    	var win = new Fos.TransWin(p);
    	    	win.show();
    		}
    	}
    };
    
    this.expExcel=function(){
    	var ids = sm.getSelected();
    	if(ids.get('status')==5){
			var url = REPORT_URL;
			
			var id=ids.get('id');
			if(id){
				url += '&__report=reports/wms_CargoOutOnStorageNoteNo.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE")+'&id='+id;
			}
			window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
    	}
    	else{
    		Ext.Msg.alert(SYS,"该业务单还没有拣货确认！不能打印拣货单！");
    	}
	};
	
	this.expPdf=function(){
		var ids = sm.getSelected();
		if(ids.get('status')==5){
			var url = REPORT_URL;
			
			var id=ids.get('id');
			if(id){
				url += '&__report=reports/wms_CargoOutOnStorageNoteNo.rptdesign&__format=pdf&compCode='+sessionStorage.getItem("COMP_CODE")+'&id='+id;
			}
			window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
		}
    	else{
    		Ext.Msg.alert(SYS,"该业务单还没有拣货确认！不能打印拣货单！");
    	}
	};
	
	this.expTransBill=function(){
		var ids = sm.getSelected();
		if(!Ext.isEmpty(ids.get('truckNumber'))){
			var url = REPORT_URL;
			
			var id=ids.get('id');
			var entrustNo=ids.get('entrustNo');
			if(id){
				url += '&__report=reports/wms_CargoTransBill.rptdesign&__format=xls&compCode='+sessionStorage.getItem("COMP_CODE")+'&id='+id+'&entrustNo='+entrustNo;
			}
			window.open(url,'download','height=5,width=5,top=0,left=0,toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no,status=no');
		}
		else{
			Ext.Msg.alert(SYS,"该业务单还没有填入运输车牌号！");
		}
	};
	
	this.reCalc=function(){
		var p=sm.getSelected();
		if(p){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'WSTORAGE_NOTE_RC',id:p.get('id')},
				success:function(r){
					/*p.beginEdit();
					p.set('status',2);
					//this.updateTB(p);
					p.endEdit();*/
					XMG.alert(SYS,"成功！");
				},
				failure:function(r){
					XMG.alert(SYS,M_F+r.responseText);
				}
			
			});
		}
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
	//设置按钮的权限
	var setButtonsDisabled=function(p){
    	//拣货完成
    	/*if (p.get('status')==5)
    	{
    		btnPickedCargo.disable();
    		btnPickedComplete.disable();
    		btnCancelPickedComplete.enable();
    		btnTrans.enable();
    		btnTransList.enable();
    		btnPdf.enable();
    		btnExpTransBill.enable();
    		
    		
    		btnAdd.enable();
    		btnEdit.enable();
    		btnRemove.disable();
    	}*/
    	
	};
	
	this.addNote=function(){
    	var p = new WStorageNote({uuid:HTUtil.UUID(32),status:0,
			userName:sessionStorage.getItem("USER_NAME"),
			cargoOwnerId:HTStore.getCFG('OUT_CARGO_OWNER_NAME'),
			cargoOwnerName:HTStore.getCFGD('OUT_CARGO_OWNER_NAME'),
			planedTime:new Date(),
    		storageDate:new Date(),storageType:t,rowAction:'N'});
    	var tab = this.ownerCt;
    	var newSheet=tab.add(new Fos.StorageNoteOutPanel(p));
    	tab.setActiveTab(newSheet);
    };
	
    var transList=function(){
    	var p=sm.getSelected();
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
    
    var btnPickedCargo=new Ext.Button({text:'预配',iconCls:'task',name:'btnPickedCargo',
    	hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_PICKED),
    	scope:this,handler:pickedCargo});
    
    var btnPickedComplete=new Ext.Button({text:'拣货出库',iconCls:'check',name:'btnPickedComplete',
    	hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_FINISHED),
    	scope:this,handler:pickedComplete});
    
    var btnCancelPickedComplete=new Ext.Button({text:'取消拣货确认',iconCls:'redo',name:'btnCancelPickedComplete',
    	hidden:HR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_CANCEL_FINISHED),
    	scope:this,handler:cancelPickedComplete});
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
    
    var btnTrans=new Ext.Button({text:'发货',iconCls:'out',name:'btnTrans',hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_TRANS),scope:this,handler:trans});
    var btnTransList=new Ext.Button({text:'生成陆运单',iconCls:'broken',name:'btnTrans',hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_CONSIGN),scope:this,handler:transList});
    
    var btnPdf=new Ext.Button({text:'PDF',scope:this,hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_EXPORT),handler:this.expPdf,anchor:'95%'});
    var btnExpTransBill=new Ext.Button({text:'Excel',scope:this,hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_EXPORT),handler:this.expTransBill,anchor:'95%'});
    
    var btnAdd=new Ext.Button({text:C_ADD,iconCls:'add',hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_ADD),scope:this,handler:this.addNote});
    var btnEdit=new Ext.Button({text:C_EDIT,iconCls:'option',hidden:NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_EDIT),scope:this,handler:this.editNote});
    var btnRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_DEL)),scope:this,handler:deleteNote});
    var btnSearch=new Ext.Button({text:'快捷查询',iconCls:'search',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_SEARCH)),scope:this,handler:this.searchByNumber});
    var btnExpe=new Ext.Button({text:C_EXPE,iconCls:'dollar',
    	hidden:NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPENSE),scope:this,handler:this.showExpense});
    var computeCost=new Ext.Button({text:'计费',iconCls:'dollar',hidden:(NR(M1_WMS+WM_NOTEIN+WMI_IN+WF_EXPENSE)),scope:this,handler:this.computeCost});
    
    var btnExport=new Ext.Button({text:C_EXPORT,iconCls:'print',scope:this,
		menu: {items: [		
		    {text:'拣货单',menu:{items:[btnPdf]}},
			{text:'送货单',menu:{items:[btnExpTransBill]}}
			
			]
    }});
    
    Fos.StorageNoteOutGrid.superclass.constructor.call(this,{id:t==0?'IN_NOTE_LIST':'OUT_NOTE_LIST',
    	iconCls:'grid',title:t==0?C_IN_NOTE_LIST:C_OUT_NOTE_LIST,
    	closable:true,store:store,sm:sm,cm:cm,
    	listeners:{scope:this,
    		rowdblclick: function(grid, rowIndex, event){
    			this.editNote();
    		},
    		rowclick:function(t,r,e)
    		{
    			var getR=sm.getSelected();
    			setButtonsDisabled(getR);
    		}
    	},
    	loadMask: true,
    	bbar:PTB(store,20),
    	
        	tbar:[  btnAdd,
        	        btnEdit,
        	        btnRemove,'-',       	       
        	        btnPickedCargo,'-',        	       
        	        btnPickedComplete,'-',
        	        btnTrans,
        	        btnTransList, '-',
        	        {xtype:'tbtext',text:'订单号:'},
                    textNumber,btnSearch,'-',
                    btnExport,'->',bAttach,
                    computeCost,btnExpe]
        	
    	    	       
    });
    
};
Ext.extend(Fos.StorageNoteOutGrid, Ext.grid.GridPanel);

//========= P2 BEGIN =========== TransWin===============
Fos.TransWin = function(p) {
	
	var txtTruckNumber=new Ext.form.TextField({fieldLabel:'车牌号',name:'truckNumber',value:p.get('truckNumber'),anchor:'95%'});
	var txtTransCarrier=new Ext.form.TextField({fieldLabel:'承运人',name:'transCarrier',value:p.get('transCarrier'),anchor:'95%'});
	var txtTransRemarks=new Ext.form.TextArea({fieldLabel:'运输备注',name:'transRemarks',value:p.get('transRemarks'),anchor:'95%'});
	
	this.frm = new Ext.form.FormPanel({labelWidth:80,padding:5,
            	items:[txtTruckNumber,txtTransCarrier,txtTransRemarks]
    });
	
	this.save=function(){
		if(Ext.isEmpty(txtTransCarrier.getValue())){
			Ext.Msg.alert(SYS,"承运人不能为空！");
			return ;
		}
		p.set('truckNumber',txtTruckNumber.getValue());
		p.set('transCarrier',txtTransCarrier.getValue());
		p.set('transRemarks',txtTransRemarks.getValue());
		
		var xml='';
		xml=xml+HTUtil.RTX(p,'WStorageNote',WStorageNote);
		if(xml){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'WSTORAGE_NOTE_ST'},
				success:function(r){
					//var a=HTUtil.ATR
					var a = HTUtil.XTR(r.responseXML,'WStorageNote',WStorageNote);
					HTUtil.RU(a,p,WStorageNote);
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
	var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_SAVE)),scope:this,handler:this.save});
	var btnCancel=new Ext.Button({text:C_CANCEL,iconCls:'cancel',hidden:(NR(M1_WMS+WM_NOTEOUT+WMI_OUT+WF_CANCEL)),scope:this,handler:this.cancel});
    Fos.TransWin.superclass.constructor.call(this, {modal:true,
    	title:'出运信息',
    	width:400,height:200,maximizable:true,layout:'fit',
        plain:false,items:this.frm,
        buttons:[btnSave,'-',btnCancel]
  			});
};
Ext.extend(Fos.TransWin, Ext.Window);
//========= P2 END =============
