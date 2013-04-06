//两个参数，第一个参数表示新增或者编辑时传进来的一条当前移库单数据，op表示当前的操作状态，用以控制按钮开关
//op=1新增，op=2未提交，op=3已提交  op=4审核通过，op=5审核 不通过  op=6 已执行
Fos.TransNotePanel = function(p,op) {
	
	var opStatus=op;
	
	this.changToolBarButtonStatus=function (opin)
	{	
		//新增状态
		if (opin==1)
		{
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(true);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(true);
			this.auditBtn.setDisabled(true);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(true);
			
			btnGridAdd.setDisabled(true);
			btnGridRemove.setDisabled(true);
			btnGridSave.setDisabled(true);

		}
		//未提交
		if (opin==2)
		{
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(false);
			this.checkBtn.setDisabled(false);
			this.unCheckBtn.setDisabled(true);
			this.auditBtn.setDisabled(true);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(true);
			
			btnGridAdd.setDisabled(false);
			btnGridRemove.setDisabled(false);
			btnGridSave.setDisabled(false);
		}
		//已提交
		if (opin==3)
		{
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(false);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(false);
			this.auditBtn.setDisabled(false);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(true);
			
			btnGridAdd.setDisabled(true);
			btnGridRemove.setDisabled(true);
			btnGridSave.setDisabled(true);
		}
		//审核通过
		if (opin==4)
		{
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(false);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(true);
			this.auditBtn.setDisabled(true);
			this.unAuditBtn.setDisabled(false);
			this.doTransBtn.setDisabled(false);
			this.printBtn.setDisabled(true);
			
			btnGridAdd.setDisabled(true);
			btnGridRemove.setDisabled(true);
			btnGridSave.setDisabled(true);
			
		}
		
		//审核未通过
		if (opin==5)
		{
			this.saveBtn.setDisabled(false);
			this.removeBtn.setDisabled(false);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(false);
			this.auditBtn.setDisabled(false);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(true);
			
			btnGridAdd.setDisabled(true);
			btnGridRemove.setDisabled(true);
			btnGridSave.setDisabled(true);
			
		}
		//已执行
		if (opin==6)
		{
			this.saveBtn.setDisabled(true);
			this.removeBtn.setDisabled(true);
			this.checkBtn.setDisabled(true);
			this.unCheckBtn.setDisabled(true);
			this.auditBtn.setDisabled(true);
			this.unAuditBtn.setDisabled(true);
			this.doTransBtn.setDisabled(true);
			this.printBtn.setDisabled(false);
			
			btnGridAdd.setDisabled(true);
			btnGridRemove.setDisabled(true);
			btnGridSave.setDisabled(true);
			
		}
		
		
	};

	
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=WTRANS_NOTE_LIST_Q',baseParams:{_mt:'xml'},pruneModifiedRecords:true,
	reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WTransList',idProperty:'id'},WTransList),
	remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	if(p.get('rowAction')!='N')
    {
    	store.load({params:{transNoteId:p.get('id')}});
    }
    	
	//---------------------------------------------------------------------------------------------
	//panel下部的grid的情况描述
	
	var ccboBlock=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',value:p.get('blockName'),tabIndex:11,
		store:WHTStore.getBlock(),enableKeyEvents:true,
		itemSelector:'div.list-item',tpl:blockTpl,listWidth:400,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					var r=sm.getSelected();
					f.clearValue();
					if(r){
						r.set('blockId','');
						r.set('blockCode','');
					}
					
				}
			},
			select:function(c,r,i){
				var re=sm.getSelected();
				if(re){
					re.set('toBlockId',r.get('id'));
					re.set('toBlockCode',r.get('blockCode'));
					re.set('toBlockName',r.get('blockName'));
				
					re.set('toAreaId',r.get('areaId'));
					re.set('toAreaCode',r.get('areaCode'));
					re.set('toAreaName',r.get('areaName'));
					re.set('toWarehouseId',r.get('warehouseId'));
					re.set('toWarehouseCode',r.get('warehouseCode'));
					re.set('toWarehouseName',r.get('warehouseName'));
				}
			},
			keydown:{
				fn:function(f,e,t){
					var re=sm.getSelected();
					if(re){
						WBlockLC(f,e,BLOCK_ONLY,0,'','');
					}
				},
				buffer:BF
			}
		}
	});
	
	var ccboArea=new Ext.form.ComboBox({listClass:'x-combo-list-small',
		store:WHTStore.getArea(),displayField:'areaName',valueField:'areaName',
		typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				var re=grid.getSelectionModel().getSelected();
				if(re){
					re.set('toAreaId',r.get('id'));
					re.set('toAreaCode',r.get('areaCode'));
				}

			},
			blur:function(f){
				
			}
				
		}});
	
	var ccboWarehouse=new Ext.form.ComboBox({listClass:'x-combo-list-small',
		store:WHTStore.getWarehouse(),displayField:'warehouseName',valueField:'warehouseName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			select:function(c,r,i){
				ccboArea.getStore().load({params:{warehouseId:r.get('id')}});
				var re=grid.getSelectionModel().getSelected();
				if(re){
					re.set('toWarehouseId',r.get('id'));
					re.set('toWarehouseCode',r.get('warehouseCode'));
				}
			},
			blur:function(f){}
		}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
    {header:'序号',dataIndex:'id',width:60,align:'center'},
    {header:C_SKU_NO,dataIndex:'skuNo',align:'center'},
	{header:C_CARGO_NAME,dataIndex:'cargoName',align:'center',width:140},
	{header:C_OLD_QUANTITY,dataIndex:'oldQuantity',align:'center'},
	{header:C_TRANS_QUANTITY,dataIndex:'transQuantity',editor:new Ext.form.NumberField({minValue:0}),align:'center'},
	{header:C_TO_WAREHOUSE,dataIndex:'toWarehouseName',editor:ccboWarehouse,align:'center'},
	{header:C_TO_AREA,dataIndex:'toAreaName',editor:ccboArea,align:'center'},
	{header:C_TO_BLOCK,dataIndex:'toBlockName',editor:ccboBlock,align:'center'},
	{header:C_FROM_WAREHOUSE,dataIndex:'fromWarehouseName',align:'center'},
	{header:C_FROM_AREA,dataIndex:'fromAreaName',align:'center'},
	{header:C_FROM_BLOCK,dataIndex:'fromBlockName',align:'center'}

    ],defaults:{sortable:true,width:100}});
	
    //添加移库明细信息
    this.addTransDetail=function()
    {
    	
    	var win = new Fos.WTransListWin(p,store);
        win.show();
    };
    
    //删除移库明细信息
    this.delTransDetail=function()
    {
    
    	var b =sm.getSelections();
		if(b.length>0){	    	
    		Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {
	        		var xml = HTUtil.ATX4R(b,'WTransList');
	        		HTUtil.REQUEST('WTRANS_NOTE_LIST_S', xml, function(){store.remove(b);});
	        	}
			},this);
	    }
		else 
			Ext.Msg.alert(SYS,M_R_P);
    };
    
    //修改保存移库明细信息
    this.editSaveTransDetail=function()
    {
    
    	grid.stopEditing();
    	
    	if (store.getCount()<=0)
		{
			Ext.Msg.alert(SYS,"没有数据！");
			return;
		}
		
		if (store.getModifiedRecords().length<=0)
		{
			Ext.Msg.alert(SYS,'没有需要保存的移库明细数据!');
			return;
		}
		
		var editRecords=store.getModifiedRecords();
		
		for (var i=0;i<=editRecords.length-1;i++)
		{
			//移库数量必需是大于0的数
			if (editRecords[i].get('transQuantity')==0 || (!editRecords[i].get('transQuantity')) )
			{
				Ext.Msg.alert(SYS,C_TRANSQUANTITY_REQUIRED,
						function(){
							//frm.quantity.focus();
						},
						this);
				return;
			}
			//移库数量不可大于原来数量
			//alert(editRecords[i].get('transQuantity'));
			//alert(editRecords[i].get('oldQuantity'));
			//alert(''+editRecords[i].get('transQuantity')+'>'+''+editRecords[i].get('oldQuantity'));
			//alert(editRecords[i].get('transQuantity')>editRecords[i].get('oldQuantity'));
			if (editRecords[i].get('transQuantity')>editRecords[i].get('oldQuantity'))
			{
				Ext.Msg.alert(SYS,C_TRANSQUANTITY_NOTMORETHAN_OLDQUANTITY,
						function(){
							//frm.quantity.focus();
						},
						this);
				return;
			}
			//必需要正确选择移库的仓库、库区、库位信息
			if ((!editRecords[i].get('toWarehouseName')) || (!editRecords[i].get('toAreaName'))  || (!editRecords[i].get('toBlockName')) )
			{
				Ext.Msg.alert(SYS,C_NEED_WAREHOUSE_INFO,
						function(){
							//frm.quantity.focus();
						},
						this);
				return;
			}
			
			//移库目标仓库信息，不可与移库源目标仓库信息一致，否则失去移库意义。
			if ((editRecords[i].get('toWarehouseName')==editRecords[i].get('fromWarehouseName')) 
				&& (editRecords[i].get('toAreaName')==editRecords[i].get('fromAreaName'))
				&& (editRecords[i].get('toBlockName')==editRecords[i].get('fromBlockName')) 
				)
			
				 
			{
				Ext.Msg.alert(SYS,C_FROMINFO_NOT_TOINFO,
						function(){
							//frm.quantity.focus();
						},
						this);
				return;
			}
		
		
		}
		
		var xml='';
		if(editRecords.length>0){
			xml=xml+HTUtil.ATX(editRecords,'WTransList',WTransList);
		}

		if(xml!=''){
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'WTRANS_NOTE_LIST_S'},
				success: function(r){

					var c = HTUtil.XTRA(r.responseXML,'WTransList',WTransList);

					HTUtil.RUA(store,c,WTransList);

					XMG.alert(SYS,M_S);
				},
				failure: function(r){XMG.alert(SYS,M_F+r.responseText);},
				xmlData:HTUtil.HTX(xml)
			});
		}
		else{
			Ext.Msg.alert(SYS,"后台没有接收到更新的内容！");
		}
		
    
    };
   
    var btnGridAdd=new Ext.Button({text:C_ADD,iconCls:'add',ref:'../addNoteList',disabled:p.get('status')!=0,scope:this,handler:this.addTransDetail});
    var btnGridRemove=new Ext.Button({text:C_REMOVE,iconCls:'remove',ref:'../removeNoteList',disabled:p.get('status')!=0,scope:this,handler:this.delTransDetail});
    var btnGridSave=new Ext.Button({text:"保存",iconCls:'save',ref:'../editNoteList',disabled:p.get('status')!=0,scope:this,handler:this.editSaveTransDetail});
    var grid=new Ext.grid.EditorGridPanel(
     	{iconCls:'gen',title:C_TRANS_DETAIL,layout:'fit',region:'center',clicksToEdit:1,
     		closable:true,store:store,sm:sm,cm:cm,
        	tbar:[btnGridAdd,'-',btnGridRemove,'-',btnGridSave]
    	}
    );

	
	//-------------------------------------------------------------------------------------------------
	
    ////移库单号
    var txtTransNoteNo={fieldLabel:C_TRANS_NOTE_NO,name:'transNoteNo',ref:'../transNoteNo',value:p.get('transNoteNo'),
			tabIndex:1,readOnly:true,xtype:'textfield',anchor:'95%'};
  //审核日期
    var dtfCheckTime={fieldLabel:C_AUDIT_TIME,tabIndex:6,name:'checkTime',value:p.get('checkTime'),altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',
			ref:'../checkTime',xtype:'datefield',format:DATEF,anchor:'95%'};
  //移库类型
    var cmbTransType= {fieldLabel:'操作类型',name:'transType',ref:'../transType',value:p.get('transType'),
    	   	xtype:'combo',store:WHTStore.TRANS_TYPE_S,displayField:'NAME',valueField:'CODE',tabIndex:2,itemCls:'required',
    		typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'};
  //移库人
    var cmbTransBy={fieldLabel:'操作人',name:'transBy',ref:'../transBy',value:p.get('transBy'),
    	   	xtype:'combo',store:HTStore.getUSER_S(),displayField:'userName',valueField:'userName',tabIndex:3,
    		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
    		listeners:{scope:this,				
				select:function(c,r,i){
				}
			}};
  //移库日期
    var dtfTransDate={fieldLabel:C_TRANS_DATE,name:'transDate',ref:'../transDate',value:p.get('transDate'),
    	altFormats:'Ymd|Y-m-d|Y/m/d|Y.m.d',itemCls:'required',
		tabIndex:4,xtype:'datefield',format:DATEF,anchor:'95%'};
    
  //审核人
	var cmbAuditBy={fieldLabel:C_AUDIT_BY,name:'checkerName',ref:'../checkerName',value:p.get('checkerName'),
		tabIndex:5,xtype:'combo',anchor:'95%',store:HTStore.getUSER_S(),displayField:'userName',valueField:'userName',
		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,
		listeners:{scope:this,
			blue:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
					p.set('checkerId','');
				}
			},
			select:function(c,r,i){
				p.set('checkerId',r.get('id'));
			}
		}
	};
	//状态
	var txtStatus={fieldLabel:C_STATUS,tabIndex:5,name:'',ref:'../status',value:HTStore.getTransNoteStatus(p.get('status')),xtype:'textfield',
		disabled:true,style:'{font-weight:bold;color:green;}',anchor:'95%'
	};
	//审核意见
	var txtAuditComments=new Ext.form.TextField({fieldLabel:C_AUDIT_COMMENTS,value:p.get('checkComments'),tabIndex:7,
		name:'checkComments',ref:'../checkComments',tabIndex:6,anchor:'95%'
	});
	//panel上部的form的情况描述
	var frm=new Ext.form.FormPanel({
		title:C_TRANS_NOTE_INFO,
		labelWidth:90,frame:true,
		region:'north',height:105,layout:'column',layoutConfig:{columns:5},
		items:[
			{columnWidth:.2,layout:'form',border:false,
				items:[
					//移库单号
					txtTransNoteNo,cmbAuditBy
				]

			},
			{columnWidth:.2,layout:'form',border:false,
				items:[      	//移库类型
				     cmbTransType,dtfCheckTime
				]
			},
			//cmbTransBy
			{columnWidth:.2,layout:'form',border:false,
				items:[
					//移库人
					cmbTransBy				
				]			
			},
			
			{columnWidth:.2,layout:'form',border:false,
				items:[
					//移库日期
					dtfTransDate				
				]			
			},
			
			{columnWidth:.18,layout:'form',labelWidth:45,border:false,
				items:[ txtStatus]
			},
			{columnWidth:.6,layout:'form',border:false,
				items:[ txtAuditComments]
  			 
   			}

		]
	}
	);
	
	//-------------------------------------------------------------------------------------------------
	
	
	
	
	//保存移库单按钮要执行的方法
	this.save=function()
	{
		//移库日期不可为空
		if(frm.transDate.getValue()==''){
			XMG.alert(SYS,C_TRANS_DATE_REQUIRED,function(){frm.transDate.focus();});
			return;
		};
		if(Ext.isEmpty(frm.transType.getValue())){
			XMG.alert(SYS,'操作类型不能为空！',function(){frm.transType.focus();});
			return;
		};
		p.beginEdit();		
		frm.getForm().updateRecord(p);
		p.endEdit();
		
		var xml=HTUtil.RTX(p,'WTransNote',WTransNote);	
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'WTRANS_NOTE_S'},
				success:function(res)
				{					
					var c=HTUtil.XTR(res.responseXML,'WTransNote',WTransNote);
					//HTUtil.RUA(WTransNote,c,WStorageNoteCargo);
					var ra=p.get('rowAction');
					var f=WTransNote.prototype.fields;
					p.beginEdit();
					for (var i=0;i<f.keys.length;i++)
					{
						var fn=''+f.keys[i];
						p.set(fn,c.get(fn));
					}
					
					if (ra=='N')
					{
						this.find('name','transNoteNo')[0].setValue(p.get('transNoteNo'));
						p.set('rowAction','M');
					}					
					
					p.endEdit();
					
					this.updateStatus(0);
					//XMG.alert(SYS,M_S);
					
				},
				failure:function(res)
				{
					XMG.alert(SYS,M_F+res.responseText);
				
				},
				xmlData:HTUtil.HTX(xml)}
		);
		
		
	};
	
	this.removeTab=function(r,s){
		var tab = s.ownerCt;	//得到当前对像所在的容器
		tab.remove(s);
	};
	
	
	//删除移库单要执行的方法
	this.removeNote=function()
	{
		Ext.Msg.confirm(SYS,M_R_C,function(btn){
        	if(btn == 'yes') {
        		
        		var xml = HTUtil.RTX4R(p,'WTransNote');
        		
            	HTUtil.REQUEST('WTRANS_NOTE_S', xml,this.removeTab,this);
        	}
		},this);
	
	
	};
	
	//提交移库单要执行的方法
	this.submit=function()
	{
		this.updateStatus(1);
	};
	
	//取消提交移库单要执行的方法
	this.unSubmit=function()
	{
		this.updateStatus(0);
	};
	
	//审核移库单要执行的方法
	this.audit=function()
	{
		if (!frm.checkerName.getValue())
		{
			p.set('checkerId',sessionStorage.getItem("USER_ID"));
			frm.checkerName.setValue(sessionStorage.getItem("USER_NAME"));
			
		}
		
		if (!frm.checkTime.getValue())
		{
			var now=new Date();		
			frm.checkTime.setValue(now);
		}
		
		
		this.updateStatus(2);
	};
	
	//取消审核移库单要执行的方法
	this.unAudit=function()
	{
		this.updateStatus(3);
	};
	
	//执行本移库单要做的方法
	this.doTrans=function()
	{
		//this.updateStatus(4);
			//请先添加好移库明细数据再进行执行操作
			if (store.getRange().length<=0)
			{	
				Ext.Msg.alert(SYS,C_NEED_TRANSLIST_DATA,
						
						this);
				return;
			}
		
			//移库明细数据有变化，请先保存移库明细数据
			if (store.getModifiedRecords().length>0)
			{
				Ext.Msg.alert(SYS,C_NEED_SAVE_TRANSLIST_FIRST,
						
						this);
				return;
			}
		
			Ext.Msg.confirm(SYS,'您确定要对这些数据进行移库操作吗？',function(btn){
	        	if(btn == 'yes') {
	        		var a =store.getRange();
					if(a.length>0){
						var x = HTUtil.ATX(a,'WTransList',WTransList);
						Ext.Ajax.request({url:SERVICE_URL,method:'POST',scope:this,params:{_A:'WTRANS_NOTE_LIST_E'},
							success: function(r){
										//store.baseParams={_mt:'json',transNoteId:p.get('id')};
										//store.reload();
										//frm.status.setValue(HTStore.getTransNoteStatus(4));
										//this.changToolBarButtonStatus(6);
								var a=HTUtil.XTRA(r.responseXML,'WTransList',WTransList);
								HTUtil.RUA(store,a,WTransList);
										Ext.MessageBox.alert(SYS,M_S);
									 },
							failure: function(r,o){
									Ext.MessageBox.alert(SYS,HTUtil.XTM(r.responseXML));
							},
						xmlData:HTUtil.HTX(x)});

					}
				
	        	}
			},this);
			
		
	};
	 
	this.updateStatus=function(s){
	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
		params:{_A:'WTRANS_NOTE_U',id:p.get('id'),status:s,checkerName:frm.checkerName.getValue(),
		checkTime:frm.checkTime.getValue()},
		success: function(r){
			p.beginEdit();
			p.set('status',s);
			p.set('version',parseInt(p.get('version'))+1);
			p.endEdit();
			
			XMG.alert(SYS,M_S);
			
			frm.status.setValue(HTStore.getTransNoteStatus(s));
			this.changToolBarButtonStatus(s+2);
			

		},
		failure: function(r){XMG.alert(SYS,M_F+r.responseText);}});


	};
	
	
	//执行输出要执行的方法
	this.exp=function()
	{};
	
	//整个panel的title,如果传进来的记录是新增，则显示新增移库单，否则显示移库单加移库单号
	var title=p.get('rowAction')=='N'?(C_ADD+C_TRANS_NOTE):(C_TRANS_NOTE+'-'+p.get('transNoteNo'));
	//panel的配置项，并按其父类的构造器调用
	
	/*var btnSave=new Ext.Button({text:C_SAVE,iconCls:'save',ref:'../saveBtn',hidden:(NR(M1_WMS+WM_NOTE+WMI_CHECK+WF_SAVE)),scope:this,handler:this.save});
	var btnSave=new Ext.Button({text:C_REMOVE,iconCls:'remove',ref:'../removeBtn',disabled:(p.get('rowAction')=='N'||p.get('status')!=0),scope:this,handler:this.removeNote});
	var btnSave=new Ext.Button({text:C_COMMIT,iconCls:'check',ref:'../checkBtn',disabled:(p.get('rowAction')=='N'||p.get('status')!=0),scope:this,handler:this.submit});
	var btnSave=new Ext.Button({text:C_COMMIT_CANCEL,iconCls:'renew',ref:'../unCheckBtn',disabled:p.get('status')!=1,scope:this,handler:this.unSubmit});
	var btnSave=new Ext.Button({text:C_AUDIT,iconCls:'check',ref:'../auditBtn',disabled:(p.get('status')!=1),scope:this,handler:this.audit});
	var btnSave=new Ext.Button({text:C_AUDIT_CANCEL,iconCls:'renew',ref:'../unAuditBtn',disabled:p.get('status')!=2,scope:this,handler:this.unAudit});
	var btnSave=new Ext.Button({text:C_DO_TRANS,iconCls:'check',ref:'../doTransBtn',disabled:(p.get('status')!=2),scope:this,handler:this.doTrans});
	var btnSave=new Ext.Button({text:C_EXPORT,iconCls:'print',ref:'../printBtn',disabled:p.get('rowAction')=='N',scope:this,
		menu:{items: [{text:C_CHECK_NOTE,scope:this,handler:this.exp}]}});*/
	
	Fos.TransNotePanel.superclass.constructor.call(this,
	{
		id:'TRANS_NOTE_'+p.get('uuid'),title:title,closable:true,layout:'border',
		tbar:[
			{text:C_SAVE,iconCls:'save',ref:'../saveBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_SAVE),disabled:p.get('status')!=0,scope:this,handler:this.save},'-',
			{text:C_REMOVE,iconCls:'remove',ref:'../removeBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_DEL),disabled:(p.get('rowAction')=='N'||p.get('status')!=0),scope:this,handler:this.removeNote},'-',
			{text:C_COMMIT,iconCls:'check',ref:'../checkBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_COMMIT),disabled:(p.get('rowAction')=='N'||p.get('status')!=0),scope:this,handler:this.submit},'-',
			{text:C_COMMIT_CANCEL,iconCls:'renew',ref:'../unCheckBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_CANCEL_COMMIT),disabled:p.get('status')!=1,scope:this,handler:this.unSubmit},'-',
			{text:C_AUDIT,iconCls:'check',ref:'../auditBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_COMMIT),disabled:(p.get('status')!=1),scope:this,handler:this.audit},'-',
			{text:C_AUDIT_CANCEL,iconCls:'renew',ref:'../unAuditBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_CANCEL_COMMIT),disabled:p.get('status')!=2,scope:this,handler:this.unAudit},'-',
			{text:C_DO_TRANS,iconCls:'check',ref:'../doTransBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_DO),disabled:(p.get('status')!=2),scope:this,handler:this.doTrans},'-',
			{text:C_EXPORT,iconCls:'print',ref:'../printBtn',hidden:NR(M1_WMS+WM_NOTE+WMI_TRANS_NOTE+WF_EXPORT),disabled:p.get('status')!=0,scope:this,
				menu:{items: [{text:C_CHECK_NOTE,scope:this,handler:this.exp}]}}
			
		],
		items:[frm,grid],
		listeners:{scope:this,
			afterrender:function(t)
			{
				this.changToolBarButtonStatus(opStatus);
			}
		}
	}
	);
};
Ext.extend(Fos.TransNotePanel, Ext.Panel);

//----------------下面是新增移库明细时弹出的窗口的内容描述-------------------------------------------

Fos.WTransListWin=function(p,store)
{
	
	
	//仓库数据
	var warehouseStore = new Ext.data.Store({url:SERVICE_URL+'?_A=WAREHOUSE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WWarehouse',id:'id'},WWarehouse),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	//库区数据
	var areaStore = new Ext.data.Store({url:SERVICE_URL+'?_A=AREA_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WArea',id:'id'},WArea),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	//库位数据
	var blockStore = new Ext.data.Store({url:SERVICE_URL+'?_A=BLOCK_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WBlock',id:'id'},WBlock),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	
	//上架货物的数据记录
	var placedStore = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'WPLACED_CARGO_X',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WPlacedCargo',id:'id'},WPlacedCargo),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});	
		
		
	this.search=function()
	{
		var a=[];
		
		b=cboWarehouse.getValue();
		c=cboArea.getValue();
		d=cboBlock.getValue();
		var custName=frm.cargoOwnerName.getValue();
		var cargoName=cboCargo.getValue();
		if (b)
		{
			a[a.length]={key:'warehouseName',value:b,op:1};
		}
		if (c)
		{
			a[a.length]={key:'areaName',value:c,op:1};
		}
		if (d)
		{
			a[a.length]={key:'blockName',value:d,op:1};
		}
		if(custName)
		{
			a[a.length]={key:'custName',value:custName,op:1};
		}
		if(cargoName)
		{
			a[a.length]={key:'cargoName',value:cargoName,op:1};
		}
		if(txtProductNo.getValue()){
			a[a.length]={key:'productNo',value:txtProductNo.getValue(),op:LI};
		}
		
		if(a.length>0){
			placedStore.baseParams={_A:'WPLACED_CARGO_X',_mt:'json',xml:Ext.util.JSON.encode(HTUtil.HTJ(HTUtil.QTJ(a)))};
		}
		else{
			placedStore.baseParams={_A:'WPLACED_CARGO_X',_mt:'json'};
		}
		placedStore.removeAll();
     	
     	placedStore.load();
		
	};
		
		
	//仓库
	var cboWarehouse=new Ext.form.ComboBox(
				{fieldLabel:C_WAREHOUSE,name:'warehouseName',tabIndex:2,
					ref:'../warehouseName',store:warehouseStore,xtype:'combo',displayField:'warehouseName',valueField:'warehouseName',
					typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
						select:function(c,r,i){
							
							frm.areaName.setValue('');
							frm.areaName.store.removeAll();
							frm.areaName.store.baseParams={_mt:'json',warehouseId:r.get('id')};
							frm.areaName.store.reload();
						},
						afterrender:function(t){
							
							frm.areaName.store.baseParams={_mt:'json'};
							frm.areaName.store.reload();

							
						}
					}
				}
		);	
		
	
	//库区
	var cboArea=new Ext.form.ComboBox({fieldLabel:C_AREA,name:'areaName',tabIndex:2,
					ref:'../areaName',store:areaStore,xtype:'combo',
					displayField:'areaName',valueField:'areaName',
					typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
						select:function(c,r,i){
						},
						afterrender:function(t){
						}
					
					}
				}
	);
		
				
	//库位
	var cboBlock=new Fos.BlockLookUp({fieldLabel:'库位',name:'blockName',tabIndex:11,
		store:blockStore,enableKeyEvents:true,itemSelector:'div.list-item',tpl:blockTpl,
		displayField:'blockName',valueField:'blockName',
		typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue==''){
					f.clearValue();
				}
			},
			select:function(c,r,i){
				cboArea.setValue(r.get('areaName'));
				cboWarehouse.setValue(r.get('warehouseName'));
			},
			keydown:{
				fn:function(f,e,t){
					WBlockLC(f,e,0,0,'','');
				},
				buffer:BF
			}
		}
	});
	
	var lkpOwner={fieldLabel:'货主',tabIndex:5,name:'cargoOwnerName',
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../cargoOwnerName',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custCode',valueField:'custNameCn',
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
			keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}
		};
	
	var cboCargo=new Fos.CargoLookUp({fieldLabel:C_CARGO_NAME,tabIndex:1,
	    name:'cargoName',
		store:WHTStore.getWCargo(),enableKeyEvents:true,
		displayField:'skuNo',valueField:'cargoName',
		tpl:wCargoTpl,itemSelector:'div.list-item',listWidth:400,
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{scope:this,
		blur:function(f){
			if(f.getRawValue()==''){
				f.clearValue();
				
			}},
		select:function(c,r,i){	

		},
		keydown:{
			fn:function(f,e){
				WCargoLC(f,e);
				},
			buffer:BF
		}
		
	}});
	
	var txtProductNo=new Ext.form.TextField({fieldLabel:'生产批号',name:'productNo',anchor:'95%'});

	var empty={fieldLabel:'.',anchor:'95%',labelSeparator:''};
	
	var frm=new Ext.form.FormPanel(
	{
		labelWidth:80,frame:true,region:'north',height:100,layout:'column',layoutConfig:{columns:3},
		items:[
			{columnWidth:.33,layout:'form',border:false,items:[lkpOwner,cboWarehouse]},
			{columnWidth:.33,layout:'form',border:false,items:[cboCargo,cboArea]},
			{columnWidth:.33,layout:'form',border:false,items:[txtProductNo,cboBlock]}
		]
	}	
	);	
	
	
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
    {header:C_SKU_NO,dataIndex:'skuNo'},
	{header:C_CARGO_NAME,dataIndex:'cargoName'},
	{header:C_CUSTOMER,dataIndex:'custName'},
	{header:"上架数量",dataIndex:'quantity'},
	{header:"已出库数量",dataIndex:'pickedQuantity'},
	{header:C_WAREHOUSE,dataIndex:'warehouseName'},
	{header:C_AREA,dataIndex:'areaName'},
	{header:C_BLOCK,dataIndex:'blockName'}


    ],defaults:{sortable:true,width:100}});
	
 
    var grid=new Ext.grid.GridPanel(
     	{iconCls:'gen',title:C_TRANS_DETAIL,layout:'fit',region:'center',
     		closable:true,store:placedStore,sm:sm,cm:cm
 
    	}
    );
	
	
    //按确定按钮后的操作
	this.sel=function()
	{
		var b =sm.getSelections();
		if (b.length>0)
		{
			for (var i=0;i<=b.length-1;i++)
			{
				//在添加至S之前，应先判断目前S是否已存在所选的内容了
				//如果没有再添加至S
				var tnlRecord = new WTransList({uuid:HTUtil.UUID(32),rowAction:'N'});
				
				tnlRecord.set('transNoteId',p.get('id'));
				tnlRecord.set('placedCargoId',b[i].get('id'));
				tnlRecord.set('skuNo',b[i].get('skuNo'));
				tnlRecord.set('cargoId',b[i].get('cargoId'));
				tnlRecord.set('cargoName',b[i].get('cargoName'));
				tnlRecord.set('fromWarehouseId',b[i].get('warehouseId'));
				tnlRecord.set('fromWarehouseCode',b[i].get('warehouseCode'));
				tnlRecord.set('fromWarehouseName',b[i].get('warehouseName'));
				tnlRecord.set('fromAreaId',b[i].get('areaId'));
				tnlRecord.set('fromAreaCode',b[i].get('areaCode'));
				tnlRecord.set('fromAreaName',b[i].get('areaName'));
				tnlRecord.set('fromBlockId',b[i].get('blockId'));
				tnlRecord.set('fromBlockCode',b[i].get('blockCode'));
				tnlRecord.set('fromBlockName',b[i].get('blockName'));
				tnlRecord.set('oldQuantity',HTUtil.round2(b[i].get('quantity'))-HTUtil.round2(b[i].get('pickedQuantity')));
				tnlRecord.set('status',0);
				
				store.add(tnlRecord);
			}
			
			this.close();
		}
		else
		{
			Ext.Msg.alert(SYS,C_SEL_TRANS_DATA);	//如果没有选择，则提示请选择要移库的记录
		}
	};
	
	
	Fos.WTransListWin.superclass.constructor.call(this,{buttonAlign:'right',title:C_SEL_TRANS_DATA,width:750,
			height:500,modal:true,layout:'border',
			items:[frm,grid],
			buttons:[
					{text:C_OK,iconCls:'ok',scope:this,handler:this.sel},
					{text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}
			],
				
			tbar:[{text:C_SEARCH,iconCls:'search',handler:this.search}]
			
			}
	
	);
		
};
Ext.extend(Fos.WTransListWin,Ext.Window);