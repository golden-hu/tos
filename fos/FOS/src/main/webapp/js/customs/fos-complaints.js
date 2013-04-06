Fos.CComplaintsTypeGrid = function() {
	var store = new Ext.data.Store({url:SERVICE_URL+'?_A=CCOMTYPE_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CComplaintType',id:'id'},CComplaintType),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
    store.load();
    
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_COM_TYPE,dataIndex:'complaintName',editor:new Ext.form.TextField()}
    ],defaults:{sortable:true,width:150}});
    
    this.add=function(){
    	var p = new CComplaintType({uuid:HTUtil.UUID(32),version:'0',rowAction:'N'});
        this.stopEditing();
        store.insert(0,p);
        this.startEditing(0,1);
    };
    this.del=function(){
    	HTUtil.REMOVE_SM(sm,store);
    };
    this.save=function(){
    	HTUtil.POST(store,'CComplaintType',CComplaintType,'CCOMTYPE_S');
    };
    Fos.CComplaintsTypeGrid.superclass.constructor.call(this,{id:'CCOM_TYPE',iconCls:'gen',title:C_COM_TYPE,
	clicksToEdit:1,closable:true,store:store,sm:sm,cm:cm,
	tbar:[{
		text:C_ADD,iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_SAVE,iconCls:'save',scope:this,handler:this.save}]
    });
};
Ext.extend(Fos.CComplaintsTypeGrid, Ext.grid.EditorGridPanel);


Fos.CComplaintsGrid = function(complaint){
	var store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'CCOM_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CComplaint',id:'id'},CComplaint),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
		store.load({params:{start:0,limit:C_PS}});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_COM_STATUS,dataIndex:'status',renderer:HTStore.getTRST,width:70},
	{header:C_COM_NO,dataIndex:'consNo',width:100},
	{header:C_COM_DATE,dataIndex:'complaintDate',renderer:formatDate,width:100},
	{header:C_COM_NAME,dataIndex:'custName',width:100},
	{header:C_COM_CTYPE,dataIndex:'complaintType',width:100},
	{header:C_BIZ_TYPE,dataIndex:'businessType',renderer:HTStore.getCTYPE,width:100},
	{header:C_COM_REASON,dataIndex:'reason',width:150},
	{header:C_COM_SOLUTION,dataIndex:'solution',width:150}
	],defaults:{sortable:true,width:100}});
	
	this.showTran = function(p){
    	var win = new Fos.CComplaintsWin(p,store);
    	win.show();
    };
    this.add=function(){
		if(Ext.isEmpty(complaint)){
			var r = new CComplaint({uuid:HTUtil.UUID(32),rowAction:'N',complaintDate:new Date()}); 
			this.showTran(r);
		}else
		{
			var r = new CComplaint({
				consNo:complaint.get('consNo'),
				rowAction:'N',
				status:'0',version:'0',uuid:HTUtil.UUID(32)});  
			this.showTran(r);
		}
	};
	this.del=function(){
		var a =sm.getSelections();
       	if(a.length){
       		XMG.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){
           		var b = false;
               	for(var i=0;i<a.length;i++){if(a[i].get('status')!='0'){b=true;break;}}
               	if(b) XMG.alert(SYS,C_COM_CONFIRMED);
               	else {
               		var xml = HTUtil.SMTX4R(sm,'CComplaint');
               		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'CCOM_S'},
					success: function(){sm.each(function(p){store.remove(p);});XMG.alert(SYS,M_S);},
					failure: function(r,o){XMG.alert(SYS,M_F+r.responseText);},
					xmlData:HTUtil.HTX(xml)});
               	}
           }});
		}
       	else XMG.alert(SYS,M_R_P);
	};
	this.edit=function(){
		var p =sm.getSelected();
		if(p){
			this.showTran(p);
    	}
		else Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
	};
	Fos.CComplaintsGrid.superclass.constructor.call(this,{title:C_COM,
	    id:'C_COM',iconCls:'grid',header:false,closable:true,
	    store:store,sm:sm,cm:cm,loadMask: true,
	    listeners:{
	    	scope:this,
	    	rowdblclick:function(grid,rowIndex,event){
	    		var c = sm.getSelected();
	    		if(c) this.showTran(c);
	    	}
	    },
	    bbar:PTB(store,C_PS),
	    tbar:[
	  	    {text:C_ADD,iconCls:'add',scope:this,handler:this.add},'-',
	  		{text:C_EDIT,iconCls:'option',scope:this,handler:this.edit},'-',
	          {text:C_REMOVE,iconCls:'remove',scope:this,handler:this.del}]
	});
};
Ext.extend(Fos.CComplaintsGrid, Ext.grid.GridPanel);

Fos.CComplaintsWin = function(p,listStore){
	this.save = function(){
		p.beginEdit();
		frm.getForm().updateRecord(p);
		p.endEdit();
		if(Ext.isEmpty(p.get('complaintDate'))){
			Ext.Msg.alert(SYS,C_COM_SELECT_DATE,function(){dateComplaint.focus();},this);return;};
		if(Ext.isEmpty(p.get('consNo'))){
			Ext.Msg.alert(SYS,C_COM_REQUIRED,function(){txtConsNo.focus();},this);return;};
		if(Ext.isEmpty(p.get('custName'))){
			Ext.Msg.alert(SYS,C_COM_SELECT_NAME,function(){cboCust.focus();},this);return;};
		
		var newP = (p.get('rowAction') == 'N');
		
		var xml = HTUtil.RTX(p,'CComplaint',CComplaint);
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CCOM_S'},
			success: function(r){
				var c = HTUtil.XTR(r.responseXML,'CComplaint',CComplaint);
				HTUtil.RU(c, p,CComplaint);
             
				if (newP) listStore.insert(0,p);
				Ext.Msg.alert(SYS,M_S);
			},
			failure:function(r){Ext.Msg.alert(SYS,HTUtil.XTM(r.responseXML));},
			xmlData:HTUtil.HTX(xml)});
	};
	
	
	var dateComplaint = new Ext.form.DateField({fieldLabel:C_COM_DATE,
		name:'complaintDate',value:p.get('complaintDate'),tabIndex:1,
    	allowBlank:false,blankText:'不能为空',format:DATEF,itemCls:'required',anchor:'95%'});
	var txtConsNo = new Ext.form.TextField({fieldLabel:C_CONS_NO,name:'consNo',value:p.get('consNo'),tabIndex:3,
    	allowBlank:false,blankText:'不能为空',anchor:'95%',itemCls:'required'});
	var cboBizType = new Ext.form.ComboBox({fieldLabel:C_BIZ_TYPE,
		name:'businessType',value:p.get('businessType'),tabIndex:5,
		anchor:'95%',store:HTStore.BT_S,displayField:'NAME',valueField:'CODE',
		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{
			select:function(c,r,v){
				p.set('businessType',r.get('businessType'));
			}
		}
	});
	var cboCust = new Ext.form.ComboBox({fieldLabel:C_COM_NAME,name:'custName',value:p.get('custName'),itemCls:'required', 
	    allowBlank:false,blankText:'不能为空',tabIndex:2,xtype:'customerLookup',anchor:'95%',
	    store:HTStore.getCS(),displayField:'custNameCn',valueField:'custNameCn',
		 mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
			listeners:{
			  	select:function(c,r,v){
			  	p.set('custId',r.get('id'));
		    }
	}});
	var cboComplaintType = new Ext.form.ComboBox({fieldLabel:C_COM_CTYPE,name:'complaintType',value:p.get('complaintType'),tabIndex:4,
		anchor:'95%',store:HTStore.getComplaintTypeStore(),displayField:'complaintName',valueField:'complaintName',
		mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
		listeners:{
			select:function(c,r,v){
				p.set('complaintTypeId',r.get('id'));
			}
	}});
	
	var cboComplaintStatus = new Ext.form.ComboBox({fieldLabel:'处理状态',name:'status',value:p.get('status'),tabIndex:4,
		anchor:'95%',store:HTStore.COMPLAINT_STATUS_S,displayField:'NAME',valueField:'CODE',
		mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'});
	
	var frm = new Ext.form.FormPanel({labelWidth:60,autoScroll:true,		
		items:[{layout:'column',layoutConfig:{columns:2},frame:false,padding:5,title:C_COM_INFO,items:[
		      {columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		    	  items:[dateComplaint,txtConsNo,cboBizType]
		      },
		      {columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		    	  items:[cboCust,cboComplaintType,cboComplaintStatus]
		      },
		      {columnWidth:1,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		    	  items:[{fieldLabel:C_COM_REASON,name:'reason',value:p.get('reason'),tabIndex:6,
		    		  xtype:'textarea',anchor:'97.5%'}]
		      },
		      {columnWidth:1,layout:'form',border:false,labelWidth:80,labelAlign:'right',
		    	  items:[{fieldLabel:C_COM_SOLUTION,name:'solution',value:p.get('solution'),tabIndex:7,
		    		  xtype:'textarea',anchor:'97.5%'}
		    	  ]
		      }
		      ]},
		      {layout:'column',layoutConfig:{columns:2},frame:false,border:false,padding:5,title:C_COM_CARGO_INFO,items:[
		      {columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',items:[
		           	{fieldLabel:C_COM_DAMAGEDNUM,name:'damagedNum',value:p.get('damagedNum'),tabIndex:8,
		           		xtype:'textfield',anchor:'95%'},				       		         		
		           	{fieldLabel:C_COM_LAMOUNT,name:'lossAmount',value:p.get('lossAmount'),tabIndex:10,
		           		xtype:'textfield',anchor:'95%',
				     	listeners:{scope:this,
						 change:function(f,nv,ov){
						    var ca = this.find("name","compensationAmount")[0].getValue();
						    var obj = this.find("name","custCompAmount");
						    var v = nv-ca;
					    	if(obj) obj[0].setValue(v);
						 }
					}},			       		         		
				{fieldLabel:C_COM_CUSAMOUNT,name:'custCompAmount',value:p.get('custCompAmount'),tabIndex:12,
					xtype:'textfield',anchor:'95%'}]
				},
				{columnWidth:.5,layout:'form',border:false,labelWidth:80,labelAlign:'right',
					items:[{fieldLabel:C_COM_LOSSNUM,name:'lossNum',value:p.get('lossNum'),tabIndex:9,xtype:'textfield',anchor:'95%'},					       		         		
				{fieldLabel:C_COM_COMAMOUNT,name:'compensationAmount',value:p.get('compensationAmount'),tabIndex:11,
					xtype:'textfield',anchor:'95%',
				    	listeners:{scope:this,
						 change:function(f,nv,ov){
						    var la = this.find("name","lossAmount")[0].getValue();
						    var obj = this.find("name","custCompAmount");
									    var v = la-nv;
								    	if(obj) obj[0].setValue(v);
									 }
								}}
				      ]}
				   ]}
				]
			});
	Fos.CComplaintsWin.superclass.constructor.call(this,{title:'客户投诉',width:600,height:'470',layout:'fit',	
		items:[frm],
	    buttons:[
	    	{text:C_SAVE,iconCls:'save',scope:this,handler:this.save},'-',
			{text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}
			]
	});
};
Ext.extend(Fos.CComplaintsWin, Ext.Window);