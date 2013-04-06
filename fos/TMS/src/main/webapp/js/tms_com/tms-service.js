//网上服务
var getCustServicePanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,enableTabScroll:true,items: []});
	var items=[];
	if(true)
		items[items.length]=FosMenu(panel,'托运单查询','T_GROU',function(){return new Fos.ConsCustGrid();});
	/*if(true)
		items[items.length]=FosMenu(panel,'回单查询','OFFICE',function(){return ;});*/
	/*if(true)
		items[items.length]=FosMenu(panel,'对账查询','S_SET_FUNCTION',function(){return ;});
	if(true)
		items[items.length]=FosMenu(panel,'业务量查询','T_USER',function(){return ;});*/
	
	var genPanel = new Ext.Panel({title:'单票查询',collapsible:true,layout:'fit',iconCls:'folder_go',
		items:new Ext.menu.Menu({floating:false,style:{border:'0px',background:'transparent'},items:items})});
	
	var menuPanel = new Ext.Panel({title:'',region:"west",width:"180",
		collapsible:true,layout:'accordion',split:true,collapseMode:'mini',
		iconCls:'',maxSize:220,
		items:[genPanel]});
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	createWindow('CUST_SERVICE','客户服务',contPanel);//客户网上服务管理
};

//托运单
Fos.ConsCustGrid = function() {
	//userTypeFlag 区分是内部帐号还是外部帐号
	var b=[];
	var bp='';
	if(sessionStorage.getItem("USER_TYPE_FLAG")=='1'){//1：外部帐号0：内部帐号
		b[b.length] = new QParam({key:'custName',value:sessionStorage.getItem("CUST_NAME_CN"),op:1});
		bp={_A:'TCON_Q',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(b))};
	}else{
		bp={_A:'TCON_Q',_mt:'xml'}
	}
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:bp,
		reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'TConsign',id:'id'},TConsign),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
	var txtSumPack = new Ext.form.TextField({disabled:true,width:120});
	
	//费用合计
	this.expeSum=function(){
		store.baseParams=bp;
		store.reload({params:{},callback:function(){sum();}});
	}
	
	var sum = function(){
		var r=store.getRange();
		var sumPack = 0;
		if(r.length==0) {
			XMG.alert(SYS,M_NOT_FOUND);
		}else{
			for(var i = 0;i < r.length;i++){
				var record = r[i];
				
				if(parseInt(record.get('packages'))){
					sumPack += parseInt(record.get('packages'));
				}
			};
		}
		
		txtSumPack.setValue(HTUtil.numRender(sumPack));	
	};
	
	this.reset=function(){							//刷新
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS30},callback:function(){}});
	};
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm=new Ext.grid.ColumnModel({columns:[
	new Ext.grid.RowNumberer(),sm,
	{header:boldFont('派车状态'),dataIndex:'transTaskStatus',width:80,
		renderer:function(v){
			var str;
			if(v==0){
				str='未派车';
			}else if(v==1){
				str='部分派车';
			}else if(v==2){
				str='全部派车';
			}
			return str;
		}
	},
	{header:boldFont('到货状态'),dataIndex:'cargoArrivalStatus',width:80,
		renderer:function(v){
			var str;
			if(v==0){
				str='未到货';
			}else if(v==1){
				str='部分到货';
			}else if(v==2){
				str='全部到货';
			}
			return str;
		}
	},
	{header:boldFont('托运单号'),dataIndex:'consNo',width:140},
	{header:boldFont('手工单号'),dataIndex:'consNoHandler',width:110},
	{header:boldFont('委托日期'),dataIndex:'consDate',renderer:formatDate},
	{header:boldFont(C_BOOKER),dataIndex:'custName',width:140},
	{header:boldFont('收货地址'),dataIndex:'deliveryAddress',width:150},
	
	{header:boldFont('首发站'),dataIndex:'startStation'},
	{header:boldFont('目的站'),dataIndex:'endStation'},
	{header:boldFont('运输方式'),dataIndex:'transportWay'}
	
	],defaults:{sortable:false,width:100}});
	
	this.showTConsign = function(p){
		var consignTab = new Fos.TConsCustPanel(p,store);
    	createWindow('TRAN_'+p.get("uuid"),'托运单'+'-'+p.get('consNoHandler'),
    			consignTab,true,1200,550);
    };
	//接单-编辑
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showTConsign(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	var txtConsNoSeac = new Ext.form.TextField({fieldLabel:'托运单号',anchor:'99%',height:20,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	
	var txtConsNoHandlerSeac = new Ext.form.TextField({fieldLabel:'手工单号',anchor:'99%',height:20,
		listeners:{scope:this,
			specialkey:function(c,e){
				if(e.getKey()==Ext.EventObject.ENTER)
					this.fastSearch();
			},
			focus:function(f){f.setValue('');},
			blur:function(f){if(f.getValue()=='') f.reset();}
		}
	});
	
	var sConsDate=new Ext.form.DateField({fieldLabel:'委托日期',format:DATEF,width:130,height:20,anchor:'99%'});
	var sConsDateTo=new Ext.form.DateField({fieldLabel:'&nbsp;&nbsp;&nbsp;&nbsp;至',format:DATEF,width:130,height:20,anchor:'99%'});
	
	//快速查询
	this.fastSearch=function(){
		var a=[];
		
		if(txtConsNoHandlerSeac.getValue()!='')
			a[a.length]=new QParam({key:'consNoHandler',value:txtConsNoHandlerSeac.getValue(),op:LI});
		if(txtConsNoSeac.getValue()!='')
			a[a.length]=new QParam({key:'consNo',value:txtConsNoSeac.getValue(),op:LI});
		if(sConsDate.getValue()){
			a[a.length]=new QParam({key:'consDate',value:sConsDate.getValue().format(DATEF),op:GE});
		}
		if(sConsDateTo.getValue()){
			a[a.length]=new QParam({key:'consDate',value:sConsDateTo.getValue().format(DATEF),op:LE});
		}
		//如果是外部帐号登录就添加此条件
 		if(sessionStorage.getItem("USER_TYPE_FLAG")=='1'){//1：外部帐号0：内部帐号
			a[a.length] = new QParam({key:'custName',value:sessionStorage.getItem("CUST_NAME_CN"),op:1});
		}
		if(a.length<1){
			XMG.alert(SYS,C_INPUT_SEARCH);
			return ;
		}
 		store.baseParams={_A:'TCON_SEARCH',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a)),typeKey:'1'};
 		store.reload({params:{start:0,limit:C_PS30},callback:function(){}});
	};

	//单票货物跟踪状态
	this.event=function(){
		var p =sm.getSelected();
		if(p){
			createWindow(new Fos.PEventWin_C(p),true);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	
	//store.load({params:{start:0,limit:C_PS30},callback:function(){}});
	//stripeRows:true 条纹
	Fos.ConsCustGrid.superclass.constructor.call(this,{title:'托运单查询',
	    id:'G_TRAN',iconCls:'gen',header:false,closable:true,store:store,sm:sm,cm:cm,loadMask:true,plain:true,modal:true,
	    view:new Ext.grid.GridView({
	    	getRowClass: function(record,rowIndex,p,ds) {
	    		var colorStatus=record.get('consColorStatus');
	    		if(colorStatus=='1'){
	    			return 'red-row';
	    		}else if(colorStatus=='2'){
	    			return 'orange-row';
	    		}else if(colorStatus=='3'){
	    			return 'yellow-row';
	    		}else if(colorStatus=='4'){
	    			return 'green-row';
	    		}else if(colorStatus=='5'){
	    			return 'blue-row';
	    		}
	    		
	    	 }
	    }),
	    listeners:{scope:this,
			rowdblclick: function(grid, rowIndex, event){
				var p=sm.getSelected();
				if(p){
					this.showTConsign(p);
				}
	    }},
		bbar:[{text:'费用合计：',iconCls:'out',handler:this.expeSum},'-',
			{text:'件数合计'},txtSumPack
		],
		tbar:new Ext.Panel({border:false,
			items:[{xtype:'toolbar',items:[
		        {text:C_EDIT,iconCls:'option',scope:this,handler:this.edit},'-',
		        {text:C_CARGO_TRACING,iconCls:'add',scope:this,handler:this.event},'-',
		        {text:C_RESET,iconCls:'refresh',handler:this.reset},'-',								//刷新
		        '->',//PTB(store,C_PS30)
		        new Ext.PagingToolbar({pageSize:C_PS30,store:store,displayInfo:true,displayMsg:'{0} - {1} of {2}',emptyMsg:C_NR,
		        	doLoad : function(start){
		                var o = {}, pn = this.getParams();
		                o[pn.start] = start;
		                o[pn.limit] = this.pageSize;
		                if(this.fireEvent('beforechange', this, o) !== false){
		                    this.store.load({params:o,callback:function(){}});
		                }
		            }
		        })
	        ]},
	       new Ext.form.FormPanel(
		       	{frame:false,height:30,collapsible:false,border:false,layout:'column',
		       	layoutConfig:{columns:5},deferredRender:true,collapsible:false,bodyStyle:'padding:5px;',
		       		items:[
		       			{frame:false,columnWidth:.2,layout:'form',labelWidth:58,border:false,
				          items:[txtConsNoSeac]
				        },
		       			{frame:false,columnWidth:.2,layout:'form',labelWidth:58,border:false,
				          items:[txtConsNoHandlerSeac]
				        },
					    {frame:false,columnWidth:.2,layout:'form',labelWidth:58,border:false,
					      items:[sConsDate]
					    },
					    {frame:false,columnWidth:.2,layout: 'form',labelWidth:58,border:false,
					      items: [sConsDateTo]
					    },
						{frame:false,columnWidth:.2,layout: 'form',labelWidth:80,border:false,
						  items:[{xtype:'button',text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch}]
						}
		       		]
		       	}
	       )
	   ]})
    });
};
Ext.extend(Fos.ConsCustGrid, Ext.grid.GridPanel);

//新增编辑
Fos.TConsCustPanel = function(p,listStore){
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=TCON_CAR_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TConsignCargo',id:'id'},TConsignCargo),
		remoteSort:false,sortInfo:{field:'id', direction:'desc'}});
	if(p.get('rowAction')!='N')
		store.load({params:{consId:p.get('id')}});
	
	var driverStroe = new Ext.data.Store({url:SERVICE_URL+'?_A=DRIV_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TDriver',id:'id'},TDriver),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	var vehicleStroe = new Ext.data.Store({url:SERVICE_URL+'?_A=VEHI_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TVehicle',id:'id'},TVehicle),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
    var cm=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),
	  	{header:'订单编号',dataIndex:'orderNo',width:110,hidden:true},
	  	{header:'货名',dataIndex:'cargoName',width:110},
	  	{header:C_PACK,dataIndex:'packName',width:110},
	  	{header:'件数',dataIndex:'packages',width:100,renderer:numRender},
	  	{header:'台数',dataIndex:'packagesNo',width:100,hidden:true},
	  	{header:'出货数量',dataIndex:'pachagesOut',width:100,hidden:true},
	  	{header:'包装件数',dataIndex:'packagesNumber',width:100,hidden:true},
	  	{header:'毛重(KGS)',dataIndex:'grossWeight',width:120,renderer:numRender},	
	  	{header:'体积(CBM)',dataIndex:'measurement',width:120,renderer:numRender},
	  	{header:boldFont('派车剩余件数'),dataIndex:'packagesRemainder',width:120,css:'background:#ffaa66;',renderer:numRenderColor},
	  	{header:boldFont('派车剩余毛重(KGS)'),dataIndex:'grossWeightRemainder',width:150,css:'background:#ffaa66;',renderer:numRenderColor},
	  	{header:boldFont('派车剩余体积(CBM)'),dataIndex:'measurementRemainder',width:150,css:'background:#ffaa66;',renderer:numRenderColor},
	  	{header:C_REMARKS,dataIndex:'remarks',width:300}
	  	],defaults:{sortable:false,width:100}});
    	
	this.addConsignCargo = function(){
		var tc = new TConsignCargo({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'
		});
		cargGrid.stopEditing();
    	store.insert(0,tc);
    	cargGrid.startEditing(0,2);
	};
	
	
	var txtSumPackages = new Ext.form.TextField({width:80,value:p.get('packages'),disabled:true});
	var txtSumGrossWeight = new Ext.form.TextField({width:80,value:p.get('grossWeight'),disabled:true});
	var txtSumMeasurement = new Ext.form.TextField({width:80,value:p.get('measurement'),disabled:true});
	
	this.reCalculate = function(){
		var a=store.getRange();
		var sumPackages=0;
		var sumGrossWeight=0;
		var sumMeasurement=0;
		
		for(var i=0;i<a.length;i++){
			sumPackages+=parseInt(a[i].get('packages'));
			if(a[i].get('grossWeight'))
				sumGrossWeight+=parseFloat(a[i].get('grossWeight'));
			if(a[i].get('measurement'))
				sumMeasurement+=parseFloat(a[i].get('measurement'));
		}
		p.set('packages',sumPackages);
		p.set('grossWeight',sumGrossWeight);
		p.set('measurement',sumMeasurement);
		
		txtSumPackages.setValue(sumPackages);
		txtSumGrossWeight.setValue(HTUtil.round2(sumGrossWeight));
		txtSumMeasurement.setValue(HTUtil.round2(sumMeasurement));
	};
	
	var cargGrid = new Ext.grid.EditorGridPanel({iconCls:'gen',
		clicksToEdit:1,sm:sm,cm:cm,store:store,
		tbar:[
			{xtype:'tbtext',text:'件数合计：'},txtSumPackages,
		    {xtype:'tbtext',text:'毛重合计(KGS)：'},txtSumGrossWeight,
		    {xtype:'tbtext',text:'体积合计(CBM)：'},txtSumMeasurement
		]
	});
	
	//托运单号
	var txtConsNo = new Ext.form.TextField({fieldLabel:'托运单号',anchor:'95%',
		name:'consNo',value:p.get('consNo'),itemCls:'',
		enableKeyEvents:true,disabled:false,tabIndex:1,readOnly:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					txtConsNoHandler.focus();
				}
			}
		}
	});
	
	//业务部门
	var cboGrouName = new Ext.form.ComboBox({fieldLabel:'业务部门',anchor:'95%',
		name:'grouName',value:p.get('grouName'),itemCls:'red-b',
		tabIndex:2,store:HTStore.getGROU_S(),displayField:'grouName',valueField:'grouName',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{scope:this,
			select:function(c,r,v){
				p.set('grouId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboSalesRepName.focus();
				}
			}
			/*afterRender:function(combo){
				//var firstValue = ;
				//combo.setValue(firstValue);
			}*/
		}
	});
	
	//业务员
	var cboSalesRepName = new Ext.form.ComboBox({fieldLabel:'业务员',anchor:'95%',
		name:'salesRepName',value:p.get('salesRepName'),itemCls:'red-b',
		tabIndex:3,store:HTStore.getSALE_S(),displayField:'userName',valueField:'userName',
		typeAhead:true,mode: 'remote',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				p.set('salesRepId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboConsOperatorName.focus();
				} 
			}
		}
	});
	
	//操作员
	var cboConsOperatorName = new Ext.form.ComboBox({fieldLabel:'操作员',anchor:'95%',
		name:'consOperatorName',value:p.get('consOperatorName'),itemCls:'red-b',
		tabIndex:4,store:HTStore.getOP_S(),displayField:'userName',valueField:'userName',
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				p.set('consOperatorId',r.get('id'));
			},
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					cboStartSite.focus();
				} 
			}
		}
	});
	
	//委托日期
	var dtConsDate = new Ext.form.DateField({fieldLabel:'委托日期',anchor:'95%',
		name:'consDate',value:p.get('consDate'),enableKeyEvents:true,
		itemCls:'',format:DATEF,tabIndex:5,readOnly:true,
		listeners:{
			keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
	
	//手工单号
	var txtConsNoHandler = new Ext.form.TextField({fieldLabel:'手工单号',anchor:'95%',
		name:'consNoHandler',value:p.get('consNoHandler'),
		itemCls:'red-b',enableKeyEvents:true,tabIndex:6,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
	
	//始发站
	var txtStartStation = new Ext.form.TextField({fieldLabel:'始发站',anchor:'95%',
		name:'startStation',value:p.get('startStation'),itemCls:'',
		enableKeyEvents:true,tabIndex:7,readOnly:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
	
	//目的站
	var txtEndStation = new Ext.form.TextField({fieldLabel:'目的站',anchor:'95%',
		name:'endStation',value:p.get('endStation'),
		itemCls:'',enableKeyEvents:true,tabIndex:8,readOnly:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
	});
	
	//运输状态(提货状态)
	var cboStatus=new Ext.form.TextField({fieldLabel:'提货状态',anchor:'95%',
		name:'status',value:p.get('status'),readOnly:true
	});
    
    //提货日期
    var dtLoadDate = new Ext.form.DateField({fieldLabel:'提货日期',anchor:'95%',
    	name:'loadDate',value:p.get('loadDate'),
    	enableKeyEvents:true,format:DATEF,tabIndex:10,readOnly:true
    });
    
    //到货日期-托运单
    var dtArNewDate = new Ext.form.DateField({fieldLabel:'到货日期',anchor:'95%',
    	name:'arNewDate',value:p.get('arNewDate'),
    	enableKeyEvents:true,tabIndex:11,format:DATEF,readOnly:true
    });
    
    //签收日期
    var dtSignInDate = new Ext.form.DateField({fieldLabel:'签收日期',anchor:'95%',
    	name:'signInDate',value:p.get('signInDate'),
    	enableKeyEvents:true,tabIndex:12,format:DATEF,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
    
    //返单确认（返单类型）
    var cboFeedbackWay = new Ext.form.ComboBox({fieldLabel:'返单类型',anchor:'95%',
    	name:'feedbackWay',value:p.get('feedbackWay'),
		store:HTStore.T_FEEDBACK_S,displayField:'N',valueField:'N',
		enableKeyEvents:true,tabIndex:13,
		typeAhead:true,mode: 'local',triggerAction:'all',selectOnFocus:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
    
    //返单份数
    var cboFeedbackNumber = new Ext.form.TextField({fieldLabel:'返单份数',anchor:'95%',
    	name:'feedbackNumber',value:p.get('feedbackNumber'),
    	enableKeyEvents:true,tabIndex:14,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
    
    //是否签收
    var ckbSignInStatus = new Ext.form.Checkbox({fieldLabel:'是否签收',anchor:'95%',
    	name:'signInStatus',value:p.get('signInStatus'),
    	tabIndex:15,checked:p.get('signInStatus')==1});
    
    //签收人
    var txtSignInContact = new Ext.form.TextField({fieldLabel:'签收人',anchor:'95%',
    	name:'signInContact',value:p.get('signInContact'),
    	enableKeyEvents:true,tabIndex:16,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
    
	//委托单位
    var cboCustName = new Ext.form.TextField({fieldLabel:'委托单位',anchor:'95%',
    	name:'custName',value:p.get('custName'),readOnly:true
    });
    
	//委托归属
	var cboConsBelong = new Ext.form.ComboBox({fieldLabel:'委托归属',anchor:'95%',
		name:'consBelong',value:p.get('consBelong'),itemCls:'red-b',
		tabIndex:18,store:HTStore.consBelong,displayField:'N',valueField:'C',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		listeners:{
			select:function(c,r,v){
				if(v=='0'){
					if(cboCustName.getValue()!=''){
						p.set('shipperId',p.get('custId'));
		 				txtShipperName.setValue(cboCustName.getValue());
		 				txtShipperContact.setValue(cboCustContact.getValue());
		 				txtShipperTel.setValue(txtCustTel.getValue());
		 				txtLoadAddress.setValue(txtLoadAddress.getValue());
			 			txtShipperMobile.setValue(txtCustMobile.getValue());
			 			
			 			p.set('consigneeId','');
		 				cboConsigneeName.setValue('');
		 				txtConsigneeContact.setValue('');
		 				txtConsigneeTel.setValue('');
		 				txtDeliveryAddress.setValue('');
		 				txtConsigneeMobile.setValue('');
					}
	 			}else if(v=='1'){
	 				if(cboCustName.getValue()!=''){
	 					p.set('consigneeId',p.get('custId'));
		 				cboConsigneeName.setValue(cboCustName.getValue());
		 				txtConsigneeContact.setValue(cboCustContact.getValue());
		 				txtConsigneeTel.setValue(txtCustTel.getValue());
		 				txtDeliveryAddress.setValue(txtLoadAddress.getValue());
		 				txtConsigneeMobile.setValue(txtCustMobile.getValue());
		 				
		 				p.set('shipperId','');
		 				txtShipperName.setValue('');
		 				txtShipperContact.setValue('');
		 				txtShipperTel.setValue('');
		 				txtLoadAddress.setValue('');
			 			txtShipperMobile.setValue('');
	 				}
	 			}
			},
			keydown:function(f,e){
				
			}
		}
	});
	
	//委托人
	var cboCustContact = new Ext.form.ComboBox({fieldLabel:'委托人',anchor:'95%',
		name:'custContact',value:p.get('custContact'),tabIndex:19,
		store:HTStore.getCUCOS(),displayField:'cucoName',valueField:'cucoName',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true,
		 listeners:{scope:this,
		 	select:function(c,r,i){
		 		txtCustMobile.setValue(r.get('cucoMobile'));
		 	},
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			},
			afterrender:function(combo){
				//combo.doQuery('',true);//渲染后执行一次查询，解决第一次按条件查询后load所有记录bug
				combo.getStore().load({callback:function(){
					combo.getStore().removeAll();
				}});
			}
		 }
	});
	
	//手机-委托方
	var txtCustMobile = new Ext.form.TextField({fieldLabel:'手机',anchor:'95%',
		name:'custMobile',value:p.get('custMobile'),
		enableKeyEvents:true,tabIndex:20,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	
	//货物状况
    var txtCargoStatus = new Ext.form.TextArea({fieldLabel:'货物状况',anchor:'99%',
    	name:'cargoStatus',value:p.get('cargoStatus'),
    	enableKeyEvents:true,tabIndex:21,readOnly:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				}
			}
		}
    });
    //备注
    var txtRemarks = new Ext.form.TextArea({fieldLabel:'备注',anchor:'97%',
    	name:'remarks',value:p.get('remarks'),readOnly:true,
    	enableKeyEvents:true,tabIndex:22
    });
	
  //发货单位-发货方
    var txtShipperName = new Ext.form.TextField({fieldLabel:'发货单位',anchor:'95%',
    	name:'shipperName',value:p.get('shipperName'),
    	itemCls:'',enableKeyEvents:true,tabIndex:23,readOnly:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				}
			}
		}
    });
    //发货人-发货方
    var txtShipperContact = new Ext.form.TextField({fieldLabel:'发货人',anchor:'95%',
    	name:'shipperContact',value:p.get('shipperContact'),readOnly:true,
    	enableKeyEvents:true,tabIndex:24
    });
   //座机电话-发货方
    var txtShipperTel = new Ext.form.TextField({fieldLabel:'座机电话',anchor:'95%',
    	name:'shipperTel',value:p.get('shipperTel'),readOnly:true,
    	enableKeyEvents:true,tabIndex:25,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
				} 
			}
		}
    });
    //手机号码-发货方
    var txtShipperMobile = new Ext.form.TextField({fieldLabel:'手机号码',anchor:'95%',
    	name:'shipperMobile',value:p.get('shipperMobile'),readOnly:true,
    	enableKeyEvents:true,tabIndex:26
    });
    
   //提货地址
	var txtLoadAddress = new Ext.form.TextField({fieldLabel:'提货地址',anchor:'95%',
		name:'loadAddress',value:p.get('loadAddress'),readOnly:true,
		enableKeyEvents:true,tabIndex:27,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	
	//座机电话-委托方
	var txtCustTel = new Ext.form.TextField({fieldLabel:'座机电话',anchor:'95%',
		name:'custTel',value:p.get('custTel'),readOnly:true,
		enableKeyEvents:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	
	//收货单位-手工填写
	var cboConsigneeName = new Ext.form.TextField({fieldLabel:'收货单位',anchor:'95%',
		name:'consigneeName',value:p.get('consigneeName'),readOnly:true
	});
	
	//收货方-收货人
	var txtConsigneeContact = new Ext.form.TextField({fieldLabel:'收货人',anchor:'95%',
		name:'consigneeContact',value:p.get('consigneeContact'),enableKeyEvents:true,readOnly:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	//收货方-座机电话
	var txtConsigneeTel = new Ext.form.TextField({fieldLabel:'座机电话',anchor:'95%',
		name:'consigneeTel',value:p.get('consigneeTel'),enableKeyEvents:true,readOnly:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	//收货方-手机号码
	var txtConsigneeMobile = new Ext.form.TextField({fieldLabel:'手机号码',anchor:'95%',
		name:'consigneeMobile',value:p.get('consigneeMobile'),enableKeyEvents:true,readOnly:true,
		listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
	});
	//收货方-收货地址
    var txtDeliveryAddress = new Ext.form.TextField({fieldLabel:'收货地址',anchor:'97.3%',
    	name:'deliveryAddress',value:p.get('deliveryAddress'),
    	enableKeyEvents:true,readOnly:true,
    	listeners:{scope:this,
		 	keydown:function(f,e){
				if(e.getKey()==e.ENTER){
					
				} 
			}
		}
    });
    
    //付款方式
    var cboPateName = new Ext.form.ComboBox({fieldLabel:'付款方式',anchor:'95%',
    	name:'pateName',value:p.get('pateName'),itemCls:'red-b',disabled:p.get('expeSubmitStatus')=='1'?true:false,
		tabIndex:33,store:HTStore.getPATE_S(),displayField:'pateName',valueField:'pateName',enableKeyEvents:true,
		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,forceSeletion:true
		})
    //总运费（单票运费）
    var txtExpenseTotal2 = new Ext.form.NumberField({fieldLabel:'总运费',anchor:'95%',itemCls:'green-b',
    	name:'expenseTotal2',value:p.get('expenseTotal2'),disabled:p.get('expeSubmitStatus')=='1'?true:false,
    	enableKeyEvents:true,tabIndex:34,emptyText:'0000.00',allowBlank:true
    });
    //发货方付费
    var txtExpenseTotal = new Ext.form.NumberField({fieldLabel:'发货方付',anchor:'95%',
    	name:'expenseTotal',value:p.get('expenseTotal'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:35,emptyText:'0000.00',allowBlank:true,disabled:p.get('expeSubmitStatus')=='1'
    });
    //收货方付费
    var txtExpenseTotal3 = new Ext.form.NumberField({fieldLabel:'收货方付',anchor:'95%',
    	name:'expenseTotal3',value:p.get('expenseTotal3'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:36,emptyText:'0000.00',allowBlank:true,disabled:p.get('expeSubmitStatus')=='1'
    });
    //现付费
    var txtExpenseXff = new Ext.form.NumberField({fieldLabel:'现付',anchor:'95%',
    	name:'expenseXff',value:p.get('expenseXff'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:37,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'?true:false,
    	listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    //到付费
    var txtExpenseDff = new Ext.form.NumberField({fieldLabel:'到付',anchor:'95%',
    	name:'expenseDff',value:p.get('expenseDff'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:38,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'?true:false,
		listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    //到付对象
	var cboArrivePayName = new Fos.CustomerLookup({fieldLabel:'到付对象',anchor:'95%',
		name:'arrivePayName',value:p.get('arrivePayName'),itemCls:'green-b',disabled:p.get('expeSubmitStatus')=='1'?true:false,
		store:HTStore.getCS(),enableKeyEvents:true,tabIndex:39,
		displayField:'custNameCn',valueField:'custNameCn',xtype:'customerLookup',custType:'custBookerFlag',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,bizType:BT_T,
		tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		 listeners:{scope:this,
			 blur:function(f){
		 		if(f.getRawValue()==''){
		 			f.clearValue();
		 			p.set('arrivePayId','');
		 			p.set('consigneePateName','');
		 			cboConsigneePateName.setValue('');
		 			cboConsigneePateName.setDisabled(true);
		 		}},
		 	select:function(c,r,i){
		 		p.set('arrivePayId',r.get('id'));
		 		p.set('arrivePayName',r.get('custSname'));
		 		cboConsigneePateName.setDisabled(false);
		 	},
		 	keydown:{fn:function(f,e){
		 		LC(f,e,'custBookerFlag');
		 		if(e.getKey()==e.ENTER){
		 			
				}
		 	},buffer:BF}
		 }
	});
    
	//付款方式-收获单位付款给‘第三方物流’的付款方式‘到付’‘月结’
	var cboConsigneePateName = new Ext.form.ComboBox({fieldLabel:'到付款方式',anchor:'95%',
		name:'consigneePateName',value:p.get('consigneePateName'),itemCls:'green-b',disabled:true,
		tabIndex:40,store:HTStore.consigneePateName,displayField:'N',valueField:'C',
		typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,enableKeyEvents:true
	});
	
    //回单付费
    var txtExpenseHdf = new Ext.form.NumberField({fieldLabel:'回单付',anchor:'95%',
    	name:'expenseHdf',value:p.get('expenseHdf'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:41,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'?true:false,
		listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    //月结费
    var txtExpenseYjf = new Ext.form.NumberField({fieldLabel:'月结',anchor:'95%',
    	name:'expenseYjf',value:p.get('expenseYjf'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:42,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'?true:false,
		listeners:{scope:this,
    		blur:function(f){
    		}
    	}
    });
    //仓储费
    var txtExpenseCcf = new Ext.form.NumberField({fieldLabel:'仓储费',anchor:'95%',
    	name:'expenseCcf',value:p.get('expenseCcf'),itemCls:'green-b',
    	enableKeyEvents:true,tabIndex:43,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1'
    });
    //代收款
    var txtExpenseDsf = new Ext.form.NumberField({fieldLabel:'代收款',anchor:'95%',
    	name:'expenseDsf',value:p.get('expenseDsf'),itemCls:'green-b',
    	enableKeyEvents:true,emptyText:'0000.00',allowBlank:true,
    	disabled:p.get('expeSubmitStatus')=='1',tabIndex:44
    });
	//运输方式:自提/到货 送货方式
	var cboTransportWay = new Ext.form.TextField({fieldLabel:'运输方式',anchor:'95%',
		name:'transportWay',value:p.get('transportWay'),readOnly:true
	});
    var frm = new Ext.form.FormPanel({
    	title:'',frame:false,iconCls:'',padding:5,
    	items:[
    	  {title:'单票信息',xtype:'fieldset',checkboxToggle:false,layout:'column',labelWidth:58,labelAlign:'right',items:[
    	     {layout:'form',columnWidth:.25,border:false,items:[txtConsNo,txtStartStation]},
    	     {layout:'form',columnWidth:.25,border:false,items:[dtConsDate,dtLoadDate]},
    	     {layout:'form',columnWidth:.25,border:false,items:[cboCustName,dtArNewDate]},
    	     {layout:'form',columnWidth:.25,border:false,items:[txtRemarks]}
    	  ]},
    	  {layout:'column',fram:false,border:false,items:[
    	  	{title:'发货方',xtype:'fieldset',columnWidth:.5,layout:'column',labelWidth:58,labelAlign:'right',items:[
    	  		{layout:'form',columnWidth:.5,border:false,items:[txtShipperName]},
	       	    {layout:'form',columnWidth:.5,border:false,items:[txtShipperContact]},
	       	    {layout:'form',columnWidth:.5,border:false,items:[txtShipperTel]},
	       	    {layout:'form',columnWidth:.5,border:false,items:[txtShipperMobile]},
	       	    {layout:'form',columnWidth:.5,border:false,items:[txtLoadAddress]},
   	     		{layout:'form',columnWidth:.5,border:false,items:[cboTransportWay]}
             ]},
             {title:'收货方',xtype:'fieldset',columnWidth:.5,layout:'column',labelWidth:58,labelAlign:'right',items:[
             	{layout:'form',columnWidth:.5,border:false,items:[cboConsigneeName]},
	       	    {layout:'form',columnWidth:.5,border:false,items:[txtConsigneeContact]},
	       	    {layout:'form',columnWidth:.5,border:false,items:[txtConsigneeTel]},
	       	    {layout:'form',columnWidth:.5,border:false,items:[txtConsigneeMobile]},
	       	    {layout:'form',columnWidth:1,border:false,items:[txtDeliveryAddress]}
       	     ]}
    	  ]}
    	]
    });
    //单票货物跟踪状态
	this.showTracing = function(){
		var win = new Fos.PEventWin_C(p);
		win.show();
	};
	//派车信息
	this.showDispatching = function(){
		var win = new Fos.TransTaskInfo(p);
		win.show();
	}
	//按钮-货物跟踪
	var btnTracing = new Ext.Button({text:C_CARGO_TRACING,iconCls:'add',
		scope:this,handler:this.showTracing});
	//按钮-派车信息
	var btnDispatching = new Ext.Button({text:'派车信息',iconCls:'add',
		scope:this,handler:this.showDispatching});
	
	Fos.TConsCustPanel.superclass.constructor.call(this,{layout:'border',height:800,
		tbar:[
			btnTracing,'-',
			btnDispatching,'-'
		],
		items:[{region:'north',autoScroll:true,layout:'fit',height:230,items:[frm]},
			{region:'center',layout:'fit',autoScroll:true,items:[cargGrid]}]
	});
};
Ext.extend(Fos.TConsCustPanel, Ext.Panel);

//货物状态跟踪窗口
Fos.PEventWin_C = function(p) {
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'PEVENT_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'PEvent',id:'id'},PEvent),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	store.load({params:{consignId:p.get('id')},scope:this});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var ff=CHKCLM(C_FINISHED,'status',60);
	ff.on('click',function(c,e,r){
		r.set('finishedDate',r.get('status')==1?(new Date()):'');
	},this);
	
	var cm=new Ext.grid.ColumnModel({columns:[
		new Ext.grid.RowNumberer(),
	     {header:'跟踪记录',width:200,dataIndex:"typeName",
			editor:new Ext.form.TextField({allowBlank:false,emptyText:'',invalidText:''})},
	     {header:'预计日期',dataIndex:'estimatedDate',width:120,renderer:formatDate,
		 editor:new Ext.form.DateField({format:DATEF})},
		 ff,
		 {header:'完成日期',dataIndex:'finishedDate',width:120,
		 renderer:formatDate,editor:new Ext.form.DateField({format:DATEF})}],
		 defaults:{sortable:false,width:100}});
	
	this.addEvent = function(){
		var r = new PEvent({uuid:HTUtil.UUID(32),bizType:'T',
			status:'0',version:'0',rowAction:'N',consignId:p.get('id')});
		grid.stopEditing();
    	store.add(r);
    	grid.startEditing(store.getRange().length-1,1);
	};	
	
	this.save = function(){
		grid.stopEditing();
		HTUtil.POST(store,'PEvent',PEvent,'PEVENT_S');
	};
	
    btnAdd = new Ext.Button({text:C_ADD,iconCls:'add',disabled:NR(M1_CONS+F_ADD),
    	scope:this,handler:this.addEvent});
    
    btnSave = new Ext.Button({text:C_SAVE,iconCls:'save',disabled:NR(M1_CONS+F_M),
    	scope:this,handler:this.save});
    
	var grid=new Ext.grid.EditorGridPanel({id:'G_EVENT',border:true,height:400,autoScroll:true,clicksToEdit:1,plugins:[ff],
	    stripeRows:true,store:store,sm:sm,cm:cm
	});
    
	Fos.PEventWin_C.superclass.constructor.call(this,
	   {title:'跟踪状态',modal:true,width:550,height:400,items:grid}); 
};
Ext.extend(Fos.PEventWin_C, Ext.Window);

//派车信息
Fos.TransTaskInfo=function(p){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'CUST_CONS_TASK',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'TTransTask',id:'id'},TTransTask),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	store.load({params:{consId:p.get('id')},scope:this});
	
	var cm=new Ext.grid.ColumnModel({columns:[
	     {header:'车牌号',dataIndex:'vehicleNo'},	
	     {header:'驾驶机',dataIndex:'driverName'},
		 {header:'联系电话',dataIndex:'driverTel'},
		 {header:'车辆状态',dataIndex:'status',
			 renderer:function(v){
			 	var str;
			 	if(v==0){
			 		str='未派车';
			 	}else if(v==1){
			 		str='已发车';
			 	}else if(v==2){
			 		str='运输结束';
			 	}
			 	return str;
			 }
		},
		 {header:'发车日期',dataIndex:'startDate',renderer:formatDate}
	 ],
	 defaults:{sortable:false,width:100}});
		 
	var transGrid=new Ext.grid.GridPanel({id:'T_TRANS_TASK_INFO',border:true,autoScroll:true,
	    stripeRows:true,store:store,sm:'',cm:cm,layout:'fit',height:550
	});
	
	Fos.TransTaskInfo.superclass.constructor.call(this,
	   {title:'派车信息',modal:true,width:550,height:200,items:transGrid}); 
}
Ext.extend(Fos.TransTaskInfo,Ext.Window);