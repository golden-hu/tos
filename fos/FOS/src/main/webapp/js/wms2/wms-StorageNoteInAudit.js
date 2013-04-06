

//入库单费用审核
Fos.StorageNoteInAuditGrid=function(){

	var aq=[];
	//new QParam
//	aq[aq.length]={key:'storageType',value:0,op:EQ};	//是入库的
//	aq[aq.length]={key:'status',value:0,op:6};			//非新增的
//	
	
	var cd1={key:'storageType',value:0,op:EQ};
	var cd2={key:'status',value:0,op:6};
	
	
	aq[aq.length]=new QParam(cd1);	//是入库的
	aq[aq.length]=new QParam(cd2);			//非新增的
	
	//var bp={_mt:'json',xml:HTUtil.QATJ(aq)};HTUtil.HTX(HTUtil.QTX(a))
	
	var bp={_mt:'xml',xml:HTUtil.QATX(aq)};
	
//	var store=new Ext.data.GroupingStore({url:SERVICE_URL+'?_A=WStorageNoteExpenseCheck_Q',baseParams:bp,  
//			reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WStorageNote',id:'id'},WStorageNote),
//			remoteSort:true,sortInfo:{field:'storageDate',direction:'desc'},groupField:'storageDate'}
//	);
	
	var store=new Ext.data.GroupingStore({url:SERVICE_URL+'?_A=WStorageNoteExpenseCheck_Q',baseParams:bp,  
			reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'WStorageNote',id:'id'},WStorageNote),
			remoteSort:true,sortInfo:{field:'storageDate',direction:'desc'},groupField:'storageDate'}
	);
	
	
	store.load({params:{start:0,limit:C_PS}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    
	//构建入库单grid的例
	//renderer可以用来对数据进行一定的格式化
	
	var cmIn=new Ext.grid.ColumnModel({columns:[new Ext.grid.RowNumberer(),sm,
			{header:"入库单号",width:130,dataIndex:'storageNoteNo'}
			,{header:'入库单状态',width:100,dataIndex:'status',align:'center',renderer:HTStore.getInWarehouseNoteStatus},
			//审核状态
			{header:C_AUDIT_STATUS,width:100,dataIndex:"audiStatus",renderer:HTStore.getAUST}
			,{header:C_CUSTOMER,width:100,dataIndex:'custName',align:'center'},
			{header:C_STORAGE_DATE,align:'center',dataIndex:'storageDate',width:100,renderer:formatDate},
			{header:C_SUM_AR,dataIndex:'sumR',renderer:numRender,align:'right',css:'font-weight:bold;'},
			{header:C_SUM_AP,dataIndex:'sumP',renderer:numRender,align:'right',css:'font-weight:bold;'}
			,{header:C_PROFIT,dataIndex:'grossProfit',renderer:numRender,align:'right',css:'font-weight:bold;'}
			,{header:C_PROFIT_RATE,dataIndex:'grossProfitRate',renderer:numRender,align:'right',css:'font-weight:bold;'}
			,{header:C_AR_USD,dataIndex:'sumRUsd',renderer:numRender,align:'right',css:'font-weight:bold;'}
			,{header:C_AP_USD,dataIndex:'sumPUsd',renderer:numRender,align:'right',css:'font-weight:bold;'}
			,{header:C_AR_CNY,dataIndex:'sumRCny',renderer:numRender,align:'right',css:'font-weight:bold;'}
			,{header:C_AP_CNY,dataIndex:'sumPCny',renderer:numRender,align:'right',css:'font-weight:bold;'},
			//应收USD已开票
			{header:C_AR_USD_INVOICED,hidden:true,dataIndex:"sumRUsdInvoice",align:'right',renderer:numRender},
			//应收USD已核销
			{header:C_AR_USD_WRITEOFFED,hidden:true,dataIndex:"sumRUsdWriteOff",align:'right',renderer:numRender},
			//应收CNY已开票
			{header:C_AR_CNY_INVOICED,hidden:true,dataIndex:"sumRCnyInvoice",align:'right',renderer:numRender},
			//应收CNY已核销
			{header:C_AR_CNY_WRITEOFFED,hidden:true,dataIndex:"sumRCnyWriteOff",align:'right',renderer:numRender},		
			//应付USD已开票
			{header:C_AP_USD_INVOICED,hidden:true,dataIndex:"sumPUsdInvoice",align:'right',renderer:numRender},
			//应付USD已核销
			{header:C_AP_USD_WRITEOFFED,hidden:true,dataIndex:"sumPUsdWriteOff",align:'right',renderer:numRender},		
			//应付CNY已开票
			{header:C_AP_CNY_INVOICED,hidden:true,dataIndex:"sumPCnyInvoice",align:'right',renderer:numRender},
			//应付CNY已核销
			{header:C_AP_CNY_WRITEOFFED,hidden:true,dataIndex:"sumPCnyWriteOff",align:'right',renderer:numRender}
		
		],defaults:{sortable:true,width:100}
	});
	
	
	//重置按钮调用函数
	this.reset=function(){
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS}});
	};
	
	//查询按钮调用的函数 会弹出查询窗口
	this.search=function()
	{
		var win = new Fos.StorageNoteLookupWin('WStorageNoteExpenseCheck_Q',store,0);
		win.show();
	}; 
	

	//updateTB这个函数是用来根据权限和记录状态，来改变tbar上面的各个审核与取消审核状态的。
	this.updateTB=function(r){
		var tb=this.getTopToolbar();
		
		//当出入库单是新增状态也就是未提交的状态，则费用按钮不可用
		if (tb.getComponent('TB_1'))
		{
			tb.getComponent('TB_1').setDisabled(r.get('status')==0);
		
		}
		
		//当已经财务审核了，财务审核按钮不可用
		if (tb.getComponent('TB_2'))
		{
			tb.getComponent('TB_2').setDisabled(r.get('audiStatus')!=0||NR(M1_SET+S_COAU+F_A));
		}
		
		//当不是已经财务审核了，则经理审核按钮不可用
		if (tb.getComponent('TB_3'))
		{
			tb.getComponent('TB_3').setDisabled(r.get('audiStatus')!=1||NR(M1_SET+S_COAU+F_A));
		}
		
		//当不是已经财务审核了，取消财务审核按钮不可用
		if (tb.getComponent('TB_6'))
		{
			tb.getComponent('TB_6').setDisabled(r.get('audiStatus')!=1||NR(M1_SET+S_COAU+F_A));
		}
		
		//当不是已经经理审核 了，取消经理审核 按钮不可用
		if (tb.getComponent('TB_7'))
		{
			tb.getComponent('TB_7').setDisabled(r.get('audiStatus')!=2 ||NR(M1_SET+S_COAU+F_A));
		}
		
	};
	
	
	
	
	//审核更改状态时的调用函数,根据传入s的值的不同做不同的操作
	//s=0:财务未审核状态 s=1:财务已审核状态 s=2:经理已审核状态
	this.updateStatus=function(s){
		var p = sm.getSelected();
		if(p) 
		{
			//1.ajax请求后台进行审核状态的改变 (传入id值和要更新的audiStatus的值)
			//2.如果成功改变p的值
			//3.修改当前行的各审核按钮状态
			//4.提示成功信息
			//5.如果失败，提示失败信息
			
			Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
				params:{_A:'WStorageNoteExpenseAudi_U',id:p.get('id'),audiStatus:s},
				success:function(r){
					p.beginEdit();
					p.set('audiStatus',s);
					this.updateTB(p);
					p.endEdit();
					XMG.alert(SYS,M_S);
				},
				failure:function(r){
					XMG.alert(SYS,M_F+r.responseText);
				}
			
			});
		
		}
		else 
		{
			XMG.alert(SYS,M_NO_DATA_SELECTED);
		}
		
	};
	
	
	//显示费用处理界面
	
	this.showExpense=function(){
		var p=sm.getSelected();
		if(p){
			//以下这一段是为了不重复成生费用处理弹出界面
			//去取得以W_EXPE_+id组成的id号的窗口，如果存在，则直接弹出，如果不存在，则生成新的弹出
			var t = Ext.getCmp('W_EXPE_'+p.get("id"));
			if(t){
				t.show();
			}
			else {
				
				//定义一个临时的委托单记录的结构，为了可以传入费用处理的界面
				var cs=new FConsign({uuid:HTUtil.UUID(32),
					id:p.get('id'),
					consNo:p.get('storageNoteNo'),
					custId:p.get('custId'),
					custName:p.get('custName'),
					consBizType:'W',
					consDate:p.get('storageDate'),
					consBizClass:'C',
					version:0,rowAction:'N'
				});
				
				createWindow('W_EXPE_'+p.get("id"),C_CONSIGN+C_EXPE+"-"+p.get("consNo"),new Fos.ExpenseTab(cs));
			}
		}
		else XMG.alert(SYS,M_NO_DATA_SELECTED);
	};
	

	
	//快速查询函数，以业务单号为条件
	this.fastSearch=function(){
		//业务单号必需要输入，否则提示
		
		var storageNoteNo=kw.getValue();
		
		if (!storageNoteNo)
		{
			XMG.alert(SYS,M_INPUT_BIZ_NO,
				function()
				{
					kw.focus();
				}
			
			);
			
			return;
		}
		
		//存放查询条件的
		
		var a=[];
		//如果之间有逗号，说明是用,来分隔,  表示多个业务号
		var c=storageNoteNo.indexOf(',');
		//如果之间是..号，说明是用..来分隔， 表示从开始到结束的一个范围
		var b=storageNoteNo.indexOf('..');
		
		if (c>=0)
		{
			a[a.length]=new QParam({key:'storageNoteNo',value:storageNoteNo,op:IN});
		}
		else if(b>=0)
		{
			var ra=storageNoteNo.split('..');
			a[a.length]=new QParam({key:'storageNoteNo',value:ra[0],op:GE});
			a[a.length]=new QParam({key:'storageNoteNo',value:ra[1],op:LE});
		}
		
		a[a.length]=new QParam({key:'storageNoteNo',value:storageNoteNo,op:LI});		//LI=7 like
		
		
//		for (var i=0;i<=aq.length-1;i++)
//		{
//			a[a.length]=new QParam(aq[i]);
//		}
		
		a[a.length]=new QParam(cd1);
		a[a.length]=new QParam(cd2);
		
		//将查询条件数组转成json格式
		store.baseParams={_mt:'xml',xml:HTUtil.QATX(a)};
		store.reload({
			params:{start:0,limit:C_PS},
			callback:function(r){
				if (r.length==0)
				{
					XMG.alert(SYS,M_NOT_FOUND);
				}
				
			}
		
		
		});
		
	};

	
	
	//M1_SET=0007
	//tbar上的费用按钮
	var b1={scope:this,itemId:'TB_1',text:C_EXPE,disabled:NR(M1_SET+S_EXPE),iconCls:'option',handler:this.showExpense};
	
	//tbar上的财务审核按钮 S_COAU=01  F_A=03
	var b2={scope:this,itemId:'TB_2',text:C_FIN_CHECK,disabled:NR(M1_SET+S_COAU+F_A),iconCls:'check',
		handler:function(){
			
			this.updateStatus(1);
		}
	};
	
	//tbar上的经理审核按钮 S_COAU=01  F_A=03
	var b3={scope:this,itemId:'TB_3',text:C_MANAGER_CHECK,disabled:NR(M1_SET+S_COAU+F_A),iconCls:'check',
		handler:function(){
				
				this.updateStatus(2);
			}
		
	};
	
	//tbar上的查询按钮
	var b4={scope:this,itemId:'TB_4',text:C_SEARCH,iconCls:'search',handler:this.search};
	
	//tbar上的输出按钮  S_COAU=01  F_M=02
	var b5={scope:this,itemId:'TB_5',text:C_EXPORT,disabled:NR(M1_SET+S_COAU+F_M),iconCls:'print',
		handler:function(){
			EXP('C','CONS_AUDIT','');
		}
	
	};
	
	//tbar上的取消财务审核按钮   S_COAU=01  F_A=03
	var b6={scope:this,itemId:'TB_6',text:C_FIN_CHECK_CANCEL,disabled:NR(M1_SET+S_COAU+F_A),iconCls:'renew',
		handler:function(){
				
				this.updateStatus(0);
			}
		
	};
	
	//tbar上的取消经理审核按钮  S_COAU=01  F_A=03
	var b7={scope:this,itemId:'TB_7',text:C_MANAGER_CHECK_CANCEL,disabled:NR(M1_SET+S_COAU+F_A),iconCls:'renew',
		handler:function(){
				
				this.updateStatus(1);
			}
		
	};
	
	//tbar上的快速查询按钮
	var b8={scope:this,itemId:'TB_8',text:C_FAST_SEARCH+'(Q)',iconCls:'search',handler:this.fastSearch};
	
	//tbar上的重置按钮
	var b9={scope:this,itemId:'TB_9',text:C_RESET+'(F5)',iconCls:'refresh',handler:this.reset};
	
	//grid视图设置
	//getRowClass设置这是一个方法，用来改写行的css样式，它有四个参数，第一个是代表该行数据的Record对象，第二个是行的索引，第三个就是enableRowBody设置true时传递进来的
    //参数，可以通过该参数的body属性扩展行数据。该方法应当返回一个css类名
	var vc={
			forceFit:false,
			groupTextTpl:'{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
//			getRowClass:function(record,index){
//				var t=HTStore.getCFG('PROFIT_ALERT_TYPE');
//				var v=HTStore.getCFG('PROFIT_ALERT_VALUE');
//				var c = 0;
//				//C_PROFIT=毛利
//				if(t==C_PROFIT) {
//					c = record.get('grossProfit');
//				}			
//				else{ 
//					c=record.get('grossProfitRate');  
//				}          
//           	 	if (c < v) {
//            		return 'red-font-row';
//            	}
//            	else{ 
//            		return 'green-font-row';
//            	}
//			}

	};
	
	//定义一个快速查询的输入条件文本框
	//specialkey事件处理如果输入回车的话，执行快速查询函数
	var kw=new Ext.form.Field(
		{listeners:
			{scope:this,
					specialkey:function(t,e){
						if (e.getKey()==Ext.EventObject.ENTER){
							this.fastSearch();
						}
					}
			}
		}
	);
	
	
	
	//C_CONS_AUDIT =单票审核 
   //loadmask 那么在 load 数据时会自动出现一个层遮盖
   //stripeRows 是否显示斑马线效果
   //closable 可关闭
	Fos.StorageNoteInAuditGrid.superclass.constructor.call(this,{
			id:'SNINAU',iconCls:'grid',store:store,title:'入库单'+C_CONS_AUDIT,header:false,
			autoScroll:true,loadMask:true,
			sm:sm,cm:cmIn,stripeRows:true,closable:true,
			listeners:{rowdblclick:function(g,r,e){
							var p=sm.getSelected();
							
							if (p.get('status')!=0)
							{
								this.showExpense();		//grid行双击，弹出费用处理界面
							}
							
						}
						,
						rowclick:function(t,r,e)
						{
							var p=sm.getSelected();		//grid行单击选择，改变tbar上按钮的状态
							this.updateTB(p);
						}
			},
			view:new Ext.grid.GroupingView(vc),
			tbar:[b1,'-',b2,b6,'-',b3,b7,'-',b4,'-',b5,'-',kw,b8,'-',b9],
			bbar:PTB(store,C_PS)  //设置分页的工具条
		}
	);
	
	
	
};

Ext.extend(Fos.StorageNoteInAuditGrid,Ext.grid.GridPanel);



Fos.StorageNoteLookupWin=function(action,store,storageType){
	
	this.reload=function()
	{
		
		var a=[];
		
		//出入库单
		if (this.find('name','storageNoteNo')[0].getValue())
		{
			a[a.length]={key:'storageNoteNo',value:this.find('name','storageNoteNo')[0].getValue(),op:LI};
		}
		
		//订单号
		if (this.find('name','orderNo')[0].getValue())
		{
			a[a.length]={key:'orderNo',value:this.find('name','orderNo')[0].getValue(),op:1};
		}
		
		//批号
		if (this.find('name','batchNo')[0].getValue())
		{
			a[a.length]={key:'batchNo',value:this.find('name','batchNo')[0].getValue(),op:1};
		}
		
		//接单日期
		if (this.find('name','storageDate')[0].getValue())
		{
			a[a.length]={key:'storageDate',value:this.find('name','storageDate')[0].getValue().format(DATEF),op:1};
		}
		
		//委托编号
		if (this.find('name','entrustNo')[0].getValue())
		{
			a[a.length]={key:'entrustNo',value:this.find('name','entrustNo')[0].getValue(),op:1};
		}
		
		//货主
		if (this.find('name','custName')[0].getRawValue())
		{
			a[a.length]={key:'custName',value:this.find('name','custName')[0].getRawValue(),op:LI};
		
		}
		
		//操作员
		if (this.find('name','operatorName')[0].getRawValue())
		{
			a[a.length]={key:'operatorName',value:this.find('name','operatorName')[0].getRawValue(),op:LI};
		
		}
		
		//来源类型
		if (this.find('name','storageClass')[0].getRawValue())
		{
			a[a.length]={key:'storageClass',value:this.find('name','storageClass')[0].getRawValue(),op:LI};
		
		}
		
		
		a[a.length]={key:'storageType',value:storageType==0?0:1,op:1};
		a[a.length]={key:'status',value:0,op:NE};
		store.baseParams={_mt:'json',A:action,xml:HTUtil.QATJ(a)};
		
		store.reload(
			{params:{start:0,limit:C_PS},
				callback:function(r)
				{
					if (r.length==0)
					{
						XMG.alert(SYS,M_NOT_FOUND);
					}
				}
			
			}
		);
	
     	this.close();
		
	}
	
	
	//出入库单号
	var c1={fieldLabel:storageType==0?C_IN_STORAGE_NOTE_NO:C_OUT_STORAGE_NOTE_NO,scope:this,
			name:'storageNoteNo',tabIndex:1,
			ref:'../storageNoteNo',xtype:'textfield',anchor:'95%'};
	
		//货主
	var c2={fieldLabel:C_CARGO_OWNER,tabIndex:5,name:'custName',
			store:HTStore.getCS(),enableKeyEvents:true,ref:'../custName',
			tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
			xtype:'customerLookup',custType:'custBookerFlag',
			displayField:'custCode',valueField:'custNameCn',
			typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{scope:this,
			blur:function(f){
				if(f.getRawValue()==''){
					f.clearValue();
								
				}},
			select:function(c,r,i){
				
				
			},
			keydown:{fn:function(f,e){
							LC(f,e,'custBookerFlag');
						},
						buffer:BF
					}

			}
		};
	
		//操作员
	var c3={fieldLabel:C_OPERATOR,tabIndex:13,
    		name:'operatorName',ref:'../operatorName',
    		store:HTStore.getOP_S(),xtype:'combo',displayField:'userName',valueField:'userName',
    		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
    		listeners:{scope:this,
			blur:function(f){
	    		if(f.getRawValue()==''){
	    			f.clearValue();
	    		}
	    	},
	    	select:function(c,r,i){
	    		//p.set('operatorId',r.get('id'));
	    	}
	    	
	    	
	    	}
		};
	
	
	
	//接单日期
	var c4={fieldLabel:C_STORAGE_DATE,tabIndex:14,name:'storageDate',
			ref:'../storageDate',xtype:'datefield',format:DATEF,anchor:'95%'};
	
	//订单号
	var c5={fieldLabel:C_ORDER_NO,name:'orderNo',tabIndex:3,ref:'../orderNo',xtype:'textfield',anchor:'95%'};
	
	//批号
	var c6={fieldLabel:C_BATCH_NO,name:'batchNo',ref:'../batchNo',tabIndex:4,
	    	xtype:'textfield',anchor:'95%'};
	
	
		//来源或者类型
	var c7={fieldLabel:'来源类型',xtype:'combo',name:'storageClass',ref:'../storageClass',
			ref:'../storageClass',store:WHTStore.STORAGE_CLASS_S,displayField:'NAME',valueField:'NAME',
			typeAhead: true,mode:'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'
			
	};
	
	
	//委托编号
	var c8={fieldLabel:'委托编号',xtype:'textfield',name:'entrustNo',ref:'../entrustNo',
			anchor:'95%'};
	
	var panel=new Ext.Panel({plain:true,height:300,layout:'column',scope:this,
			defaults:{bodyStyle:'padding:10px'},items:[
				//第一列
				{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:'right',
					items:[c1,c2,c3]
				
				},
				//第二列
				{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:'right',
					items:[c4,c5,c6]
				
				},
				//第三列
				{columnWidth:.33,layout:'form',border:false,labelWidth:80,labelAlign:'right',
					items:[c7,c8]
				
				}
			
			]
	
		
	});
	
	
	Fos.StorageNoteLookupWin.superclass.constructor.call(this,{title:'出入库单综合查询',iconCls:'search',modal:true,
		width:800,height:280,buttonAlign:'right',items:panel,
		buttons:[{text:C_OK,scope:this,
						handler:this.reload
				 },
				 {text:C_CANCEL,scope:this,
				 	handler:this.close
				 }
			]
		
	});
	
};
Ext.extend(Fos.StorageNoteLookupWin,Ext.Window);


