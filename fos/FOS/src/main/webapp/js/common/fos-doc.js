var getDocPanel = function(){
	var panel=new Ext.TabPanel({region:"center",activeTab:0,items: []});
	var items=[];
	if(HR(M1_DOC+F_V)) 
		items[items.length]=FosMenu(panel,C_DOC_ALL,'G_DOC_A',function(){return new Fos.DocGrid('A');});
	if(HR(M1_DOC+F_V)) 
		items[items.length]=FosMenu(panel,C_DOC_NOT_RETURN,'G_DOC_B',function(){return new Fos.DocGrid('B');});
	if(HR(M1_DOC+F_V))
		items[items.length]=FosMenu(panel,C_DOC_RETURN_NOT_BACK,'G_DOC_C',function(){return new Fos.DocGrid('C');});
	if(HR(M1_DOC+F_V))
		items[items.length]=FosMenu(panel,C_DOC_BACK,'G_DOC_D',function(){return new Fos.DocGrid('D');});

	var menuPanel = new Ext.Panel({region:"west",width:"180",collapsible:true,layout:'fit',
		items:new Ext.menu.Menu({floating:false, style: {border:'0px',background:'transparent'},items:items})});
	var contPanel=new Ext.Panel({layout:"border",items:[menuPanel,panel]});
	return contPanel;
};

Fos.GVoyaGrid = function() {
	var store = new Ext.data.Store({url: SERVICE_URL+'?_A=VOYA_X',baseParams:{_mt:'xml',xml:''},
            reader:new Ext.data.XmlReader({totalProperty:'rowCount',record:'GVoyage'}, GVoyage),
            remoteSort:true,
            sortInfo:{field:'id', direction:'DESC'}});
	store.load({params:{start:0, limit:C_PS}});
	this.reset=function(){
        store.baseParams={_mt:'xml',xml:''};
        store.reload({params:{start:0,limit:C_PS}});
    };
    this.edit = function(){
    	var p = sm.getSelected();
    	if(p){
    		var win = new Fos.GVoyaWin(p,store);
    		win.show();
    	}
    	else XMG.alert(SYS,M_NO_DATA_SELECTED);
    };
	this.del=function(){
		if (sm.getSelections().length > 0)
        	XMG.confirm(SYS,M_R_C,function(btn){
            	if(btn == 'yes') {
	            	var xml=HTUtil.SMTX4R(sm,'GVoyage');
            		HTUtil.REQUEST('VOYA_S',xml,function(){
            			sm.each(function(p){store.remove(p);});
            		});
            	}            	
        	});
        else XMG.alert(SYS,M_R_P);
	};
	
	var sailed=CHKCLM(C_SAILED,'voyaSailedFlag',100);
	var shipMap=CHKCLM(C_SHIP_MAP,'voyaShipMapFlag',100);
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});	
	var cm=new Ext.grid.ColumnModel({columns:[sm,sailed,shipMap,
        {header:C_DISPATCHER,dataIndex: 'voyaDispatcherName',width:120},
        {header:C_OPERATOR,dataIndex: 'voyaOperatorName',width:120},
		{header:C_VESS,dataIndex:'vessName',width:150},
        {header:C_VESS_NAME_CN,dataIndex:'vessNameCn',width:120},
		{header:C_VOYA,dataIndex:'voyaName',width:120},
		{header:C_CARRIER,dataIndex: 'voyaCarrierName',width:120},		
		{header:C_ETA,dataIndex:'voyaEta',width:100,renderer:formatDate},
		{header:C_ETA_T,dataIndex: 'voyaEtaT',width:100},
		{header:C_BERTHING_DATE,dataIndex:'voyaBerthingDate',width:100,renderer:formatDate},
		{header:C_BERTHING_DATE_T,dataIndex: 'voyaBerthingDateT',width:100},
		{header:C_ETD,dataIndex:'voyaEtd',width:100,renderer:formatDate},
		{header:C_ETD_T,dataIndex: 'voyaEtdT',width:100},
		{header:C_SAIL_DATE_V,dataIndex:'voyaSailDate',width:100,renderer:formatDate},
		{header:C_SAIL_DATE_T,dataIndex: 'voyaSailDateT',width:100},
		{header:C_SHLI,dataIndex:'shliName',width:120},
		{header:C_HARBOUR,dataIndex: 'voyaHarbourName',width:120},
		{header:C_VOYA_PORTS,dataIndex: 'voyaPorts',width:120}
		],defaults:{sortable:true}});
  	this.search = function(){
  		var w=new Fos.VoyaLW(store);
  		w.show();
  	};
	
	this.add=function(){
		var p = new GVoyage({rowAction:'N',uuid:HTUtil.UUID(32)});
		var win= new Fos.GVoyaWin(p,store);
		win.show();
	};
	var kw = new Ext.form.TextField({listeners:{scope:this,specialkey:function(c,e){if(e.getKey()==Ext.EventObject.ENTER) this.fastSearch();}}});
    this.fastSearch=function(){
        var vessName=kw.getValue();
        if(!vessName){XMG.alert(SYS,M_INPUT_VESS_NAME,function(b){kw.focus();});return;};
        var a=[];
        a[a.length]=new QParam({key:'vessName',value:vessName,op:LI});
        store.baseParams={_A:'VOYA_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
        store.reload({params:{start:0,limit:C_PS},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});
    };
	var b8={text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch};    
    var b9={text:C_RESET,iconCls:'refresh',handler:this.reset};
	
    Fos.GVoyaGrid.superclass.constructor.call(this,{ 
    id:'G_VOYA',iconCls:'gen',title:C_SHIP_DATE,header:false,closable:true,	
    store: store,sm:sm,cm:cm,loadMask: true,
    listeners:{rowdblclick:function(g,r,e){this.edit();}},
	bbar:PTB(store,C_PS),
	tbar:[{text:C_ADD,disabled:NR(M1_MARINE+MARINE_VOY+F_M),iconCls:'add',scope:this,handler:this.add},'-',
        {text:C_REMOVE,disabled:NR(M1_MARINE+MARINE_VOY+F_M),iconCls:'remove',scope:this,handler:this.del}, '-', 
        {text:C_EDIT,disabled:NR(M1_MARINE+MARINE_VOY+F_M),iconCls:'save',scope:this,handler:this.edit},'-',
        {text:C_SEARCH,iconCls:'search',scope:this,handler:this.search},'-',
        kw,b8,'-',b9,'-',
        {text:C_EXPORT,iconCls:'print',disabled:false,scope:this,menu:{items: [
                {text:C_VOYA_LIST,scope:this,handler:this.expVoya}
        		]}}
		  ,'-']
    }); 
};
Ext.extend(Fos.GVoyaGrid, Ext.grid.GridPanel);

Fos.GVoyaWin = function(p,store){
	this.save=function(){	
		if(frm.find('name','vessName')[0].getValue()==''){
			XMG.alert(SYS,C_VESS_NAME_REQUIRED,function(){
				frm.find('name','vessName')[0].focus();
			},this);
			return;
		};
		if(frm.find('name','voyaName')[0].getValue()==''){
			XMG.alert(SYS,C_VOYA_NAME_REQUIRE,function(){
				frm.find('name','voyaName')[0].focus();
			},this);
			return;
		};
		
		p.beginEdit();
		var fs = p.fields;
        fs.each(function(f){
            var field = frm.getForm().findField(f.name);
            if(field){
                p.set(f.name, field.getValue());
            }
        }, this);
		p.endEdit();
		var xml=HTUtil.RTX(p,'GVoyage',GVoyage);
		
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',scope:this,
			params:{_A:'VOYA_S'},
			success: function(r,o){
				var c = HTUtil.XTR(r.responseXML,'GVoyage',GVoyage);						
                var ra=p.get('rowAction');
                HTUtil.RU(c,p,GVoyage);
                if(ra=='N'&&store) 
                	store.addSorted(p); 
				XMG.alert(SYS,M_S);
				this.close();},
			failure: function(r,o){
				XMG.alert(SYS,M_F+r.responseText);
			},
			xmlData:HTUtil.HTX(xml)
		});
	};
	var frm = new Ext.form.FormPanel({layout:'column',layoutConfig:{columns:3},labelWidth:80,
		labelAlign:'right',bodyStyle:'padding:5px',
    	items:[
    		{columnWidth:.5,layout:'form',border:false,labelWidth:100,items:[
            	{fieldLabel:C_VESS,tabIndex:1,name:'vessName',value:p.get('vessName'),
            		store:HTStore.getVES(),disabled:p.get('rowAction')!='N',itemCls:'required',
					xtype:'combo',displayField:'vessNameEn',valueField:'vessNameEn',typeAhead:true,enableKeyEvents:true,						
					mode:'remote',tpl:vessTpl,itemSelector:'div.list-item',listWidth:400,triggerAction:'all',selectOnFocus:true,anchor:'95%',
					listeners:{scope:this,
						select:function(c,r,i){
            				p.set('vessId',r.get('id'));
            				p.set('vessNameCn',r.get('vessNameCn'));
            			},
						keydown:{fn:function(f,e){LV(f,e);},buffer:500}
            			}},
            	{fieldLabel:C_CARRIER,tabIndex:3,name:'voyaCarrierName',value:p.get('voyaCarrierName'),
            		store:HTStore.getCS(),enableKeyEvents:true,
            		xtype:'customerLookup',custType:'custCarrierFlag',bizType:'M',displayField:'custNameCn',
              		valueField:'custNameCn',typeAhead:true,
              		mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
              		triggerAction:'all',selectOnFocus:true,
              		anchor:'95%',
            			listeners:{scope:this,
            	        	blur:function(f){
            	        		if(f.getRawValue()==''){
            	        			f.clearValue();
            	        			p.set('voyaCarrier','');
            	        		}
            	        	},
            	        	select:function(c,r,i){
            	        		p.set('voyaCarrier',r.get('id'));
            				},
            				keydown:{fn:function(f,e){
            						loadCustomer(f,e,'custCarrierFlag','M',1);
            					},buffer:BF
            				}
            			}},
                {fieldLabel:C_ETA,tabIndex:5,name:'voyaEta',value:p.get('voyaEta'),xtype:'datefield',format:DATEF,anchor:'95%'},
                {fieldLabel:C_ETD,tabIndex:7,name:'voyaEtd',value:p.get('voyaEtd'),xtype:'datefield',format:DATEF,anchor:'95%'},
                {fieldLabel:C_BERTHING_DATE,tabIndex:9,name:'voyaBerthingDate',value:p.get('voyaBerthingDate'),xtype:'datefield',format:DATEF,anchor:'95%'},
                {fieldLabel:C_SAIL_DATE,tabIndex:11,name:'voyaSailDate',value:p.get('voyaSailDate'),xtype:'datefield',format:DATEF,anchor:'95%'},                
                {fieldLabel:C_SAILED,tabIndex:13,name:'voyaSailedFlag',value:p.get('voyaSailedFlag'),xtype:'checkbox',checked:p.get('voyaSailedFlag'),labelSeparator:'',anchor:'50%'},
                {fieldLabel:C_DISPATCHER,tabIndex:15,name:'voyaDispatcherName',value:p.get('voyaDispatcherName'),xtype:'combo',store:HTStore.getUSER_S(),
         			displayField:'userName',valueField:'userName',typeAhead: true,mode:'local',triggerAction:'all',anchor:'95%',
         			selectOnFocus:true,
         			listeners:{scope:this,
                		select:function(c,r,i){p.set('voyaDispatcherId',r.get('id'));}}
                 }
              ]},
              {columnWidth:.5,layout:'form',border:false,labelWidth:100,items:[
              {fieldLabel:C_VOYA,tabIndex:2,name:'voyaName',itemCls:'required',value:p.get('voyaName'),xtype:'textfield',disabled:p.get('rowAction')!='N',anchor:'95%'},	            	
              {fieldLabel:C_SHLI,tabIndex:4,name:'shliName',value:p.get('shliName'),store:HTStore.getSHLI_S(),xtype:'combo',
            	  displayField:'shliName',valueField:'shliName',typeAhead: true,mode: 'local',
            	  triggerAction: 'all',selectOnFocus:true,anchor:'95%',
            	  listeners:{scope:this,
          			select:function(c,r,i){p.set('shliId',r.get('id'));}}
              },
              {fieldLabel:C_ETA_T,tabIndex:6,name:'voyaEtaT',value:p.get('voyaEtaT'),xtype:'textfield',anchor:'95%'},
              {fieldLabel:C_ETD_T,tabIndex:8,name:'voyaEtdT',value:p.get('voyaEtdT'),xtype:'textfield',anchor:'95%'},
              {fieldLabel:C_BERTHING_DATE_T,tabIndex:10,name:'voyaBerthingDateT',value:p.get('voyaDispatcherName'),xtype:'textfield',anchor:'95%'},
              {fieldLabel:C_SAIL_DATE_T,tabIndex:12,name:'voyaSailDateT',xtype:'textfield',anchor:'95%'},
              {fieldLabel:C_HARBOUR,tabIndex:14,name:'voyaHarbourName',value:p.get('voyaHarbourName'),xtype:'combo',
              	store:HTStore.getHARB_S(),displayField:'placName',valueField:'placName',typeAhead:true,mode:'local',
              	triggerAction:'all',selectOnFocus:true,anchor:'95%'},
              {fieldLabel:C_OPERATOR,tabIndex:16,name:'voyaOperatorName',value:p.get('voyaOperatorName'),
              		value:p.get('voyaOperatorName'),xtype:'combo',store:HTStore.getOP_S(),
                    displayField:'userName',valueField:'userName',typeAhead: true,mode:'remote',
                    triggerAction:'all',selectOnFocus:true,anchor:'95%',
                    listeners:{scope:this,
              		select:function(c,r,i){p.set('voyaOperatorId',r.get('id'));}}
              }
        	]} 
    	]
	});
    
	Fos.GVoyaWin.superclass.constructor.call(this, {title:C_VOYA,modal:true,width:600,minWidth:300,
        minHeight:200,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items: frm,
        buttons:[{text:C_OK,tabIndex:17,disabled:NR(M1_MARINE+MARINE_VOY+F_M),scope:this,handler:this.save},
				{text:C_CANCEL,tabIndex:18,scope:this,handler:function(){this.close();}}]
        }); 
};
Ext.extend(Fos.GVoyaWin, Ext.Window);

Fos.VoyaLW = function(store){	
    this.search=function(){
   		a=[];
   		var vessName=this.find('name','vessName')[0].getValue();   		
   		if(vessName) a[a.length]=new QParam({key:'vessName',value:vessName,op:LI});
   		
   		var voyaName=this.find('name','voyaName')[0].getValue();
   		if(voyaName) a[a.length]=new QParam({key:'voyaName',value:voyaName,op:EQ});
   		
   		var voyaCarrierName=this.find('name','voyaCarrierName')[0].getValue();        		
   		if(voyaCarrierName) a[a.length]=new QParam({key:'voyaCarrierName',value:voyaCarrierName,op:EQ});
   		
   		var shliId=this.find('name','shliId')[0].getValue();
   		if(shliId) a[a.length]=new QParam({key:'shliId',value:shliId,op:EQ});
  
   		var voyaEta=this.find('name','voyaEta')[0].getValue();
   		var voyaEta2=this.find('name','voyaEta2')[0].getValue();
   		if(voyaEta && voyaEta2){
   			a[a.length]=new QParam({key:'voyaEta',value:voyaEta.format(DATEF),op:GE});
   			a[a.length]=new QParam({key:'voyaEta',value:voyaEta2.format(DATEF),op:LE});
   		}
   		else if(voyaEta) a[a.length]=new QParam({key:'voyaEta',value:voyaEta.format(DATEF),op:EQ});
   		
     	var voyaBerthingDate=this.find('name','voyaBerthingDate')[0].getValue();
     	var voyaBerthingDate2=this.find('name','voyaBerthingDate2')[0].getValue();
     	if(voyaBerthingDate && voyaBerthingDate2){
   			a[a.length]=new QParam({key:'voyaBerthingDate',value:voyaBerthingDate.format(DATEF),op:GE});
   			a[a.length]=new QParam({key:'voyaBerthingDate',value:voyaBerthingDate2.format(DATEF),op:LE});
   		}
   		else if(voyaBerthingDate) a[a.length]=new QParam({key:'voyaBerthingDate',value:voyaBerthingDate.format(DATEF),op:EQ});
     	
     	var voyaEtd=this.find('name','voyaEtd')[0].getValue();
     	var voyaEtd2=this.find('name','voyaEtd2')[0].getValue();
     	if(voyaEtd && voyaEtd2){
   			a[a.length]=new QParam({key:'voyaEtd',value:voyaEtd.format(DATEF),op:GE});
   			a[a.length]=new QParam({key:'voyaEtd',value:voyaEtd2.format(DATEF),op:LE});
   		}
   		else if(voyaEtd) a[a.length]=new QParam({key:'voyaEtd',value:voyaEtd.format(DATEF),op:EQ});
   		
   		var voyaSailDate=this.find('name','voyaSailDate')[0].getValue();
   		var voyaSailDate2=this.find('name','voyaSailDate2')[0].getValue();
   		if(voyaSailDate && voyaSailDate2){
   			a[a.length]=new QParam({key:'voyaSailDate',value:voyaSailDate.format(DATEF),op:GE});
   			a[a.length]=new QParam({key:'voyaSailDate',value:voyaSailDate2.format(DATEF),op:LE});
   		}
   		else if(voyaSailDate) a[a.length]=new QParam({key:'voyaSailDate',value:voyaSailDate.format(DATEF),op:EQ}); 		
   		
   		var voyaSailedFlag=this.find('name','voyaSailedFlag')[0].getValue();
   		if(voyaSailedFlag) a[a.length]=new QParam({key:'voyaSailedFlag',value:'0',op:EQ});
   		var voyaHarbourId=this.find('name','voyaHarbourId')[0].getValue();
   		if(voyaHarbourId) a[a.length]=new QParam({key:'voyaHarbourId',value:voyaHarbourId,op:EQ});
   		store.baseParams={_A:'VOYA_X',_mt:'xml',xml:HTUtil.HTX(HTUtil.QTX(a))};
     	store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});this.close();
	};
	this.tab = new Ext.Panel({id:'F_VOLP',bodyStyle:'padding:0px',
        items:[{layout:'column',layoutConfig:{columns:3},padding:'5px',labelWidth:80,labelAlign:'right',items:[	        	
    			{columnWidth:.5,layout:'form',border:false,labelWidth:100,items:[
					{fieldLabel:C_VESS,tabIndex:1,name:'vessName',store:HTStore.getVES(),
						xtype:'combo',displayField:'vessNameEn',valueField:'vessNameEn',typeAhead:true,enableKeyEvents:true,						
						mode:'remote',tpl:vessTpl,itemSelector:'div.list-item',listWidth:400,triggerAction:'all',selectOnFocus:true,anchor:'95%',
						listeners:{scope:this,
							keydown:{fn:function(f,e){LV(f,e);},buffer:500}
	            			}},
	           		{fieldLabel:C_CARRIER,tabIndex:5,name:'voyaCarrierName',store:HTStore.getCS(),enableKeyEvents:true,
							custType:'custCarrierFlag',bizType:'M',displayField:'custNameCn',
		              		valueField:'custNameCn',typeAhead:true,
		              		mode:'local',tpl:custTpl,itemSelector:'div.list-item',listWidth:C_LW,
		              		triggerAction:'all',selectOnFocus:true,
		              		anchor:'95%',xtype:'customerLookup',
		              		listeners:{scope:this,
	            				keydown:{fn:function(f,e){
	            						loadCustomer(f,e,'custCarrierFlag','M',1);
	            					},buffer:BF
	            				}
	            			}},
	     			{fieldLabel:C_ETA,tabIndex:3,name:'voyaEta',xtype:'datefield',format:DATEF,anchor:'95%'},
	     			{fieldLabel:C_ETD,tabIndex:3,name:'voyaEtd',xtype:'datefield',format:DATEF,anchor:'95%'},
	     			{fieldLabel:C_SAIL_DATE,tabIndex:3,name:'voyaSailDate',xtype:'datefield',format:DATEF,anchor:'95%'},
	     			{fieldLabel:C_BERTHING_DATE,tabIndex:3,name:'voyaBerthingDate',xtype:'datefield',format:DATEF,anchor:'95%'},
	     			{fieldLabel:C_NOT_SAILED,name:'voyaSailedFlag',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}
	            ]},
    			{columnWidth:.5,layout:'form',border:false,labelWidth:100,items:[
    			    {fieldLabel:C_VOYA,tabIndex:2,name:'voyaName',xtype:'textfield',anchor:'95%'},	            	
	            	{fieldLabel:C_SHLI,tabIndex:6,name:'shliId',store:HTStore.getSHLI_S(),xtype:'combo',displayField:'shliName',valueField:'shliId',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	            	{fieldLabel:C_TO,name:'voyaEta2',xtype:'datefield',format:DATEF,anchor:'95%'},
	            	{fieldLabel:C_TO,name:'voyaEtd2',xtype:'datefield',format:DATEF,anchor:'95%'},
	            	{fieldLabel:C_TO,name:'voyaSailDate2',xtype:'datefield',format:DATEF,anchor:'95%'},
	            	{fieldLabel:C_TO,name:'voyaBerthingDate2',xtype:'datefield',format:DATEF,anchor:'95%'},
	            	{fieldLabel:C_HARBOUR,tabIndex:3,name:'voyaHarbourId',xtype:'combo',anchor:'95%',
	            		store:HTStore.getHARB_S(),displayField:'placName',valueField:'placId',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true}
	            ]}
	    	]}
	    	]});  
    Fos.VoyaLW.superclass.constructor.call(this,{title:C_VOYA,iconCls:'search',modal:true,width:600,minWidth:300,
        minHeight:200,plain:true,bodyStyle:'padding:0px;',buttonAlign:'right',items:this.tab,
        buttons:[{text:C_OK,scope:this,handler:this.search},{text:C_CANCEL,scope:this,handler:this.close}]
	}); 
};
Ext.extend(Fos.VoyaLW,Ext.Window);

Fos.ConsDocGrid = function(p) {
	var store = new Ext.data.Store({url: SERVICE_URL,baseParams:{_mt:'json',_A:'FDOC_Q'},
        reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FDoc'}, FDoc),
       remoteSort:true,sortInfo:{field:'id', direction:'DESC'}});
	store.load({params:{consId:p.get('id')}});
	
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_DOC_NAME,dataIndex:'dotyName',width:150,
			editor:new Ext.form.ComboBox({displayField:'dotyCode',valueField:'dotyName',triggerAction:'all',
				tpl:dotyTpl,itemSelector:'div.list-item',listWidth:300,mode:'remote',
				selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getDOTY_S(),
            listeners:{scope:this,
				select:function(c,r,i){
					sm.getSelected().set('dotyId',r.get('id'));
				}
			}})},
	{header:C_DOC_TITLE,dataIndex:'fdocTitle',width:150,editor:new Ext.form.TextField()},
	{header:C_DOC_NO,dataIndex:'fdocNo',width:80,editor:new Ext.form.TextField()},
	{header:C_DOC_ORI_NUM,dataIndex:'fdocOriginalNum',width:80,editor:new Ext.form.NumberField()},
	{header:C_DOC_COPY_NUM,dataIndex:'fdocCopyNum',width:80,editor:new Ext.form.NumberField()},	
	{header:C_DOC_RECEIVE_DATE,dataIndex:'fdocRecvDate',renderer:formatDate,width:80,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_DOC_SEND_COMPANY,dataIndex:'fdocSendSigner',width:150,
			editor:new Fos.CustomerLookup({displayField:'custCode',valueField:'custNameCn',triggerAction:'all',
            mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,custType:'custCustomFlag',
            allowBlank:false,blankText:'不能为空',selectOnFocus:true,
            store:HTStore.getCS(),enableKeyEvents:true,
           		listeners:{scope:this,
        			blur:function(f){
        				if(f.getRawValue()==''){
        					f.clearValue();
        					p.set('fdocSendTo','');
        					p.set('fdocSendSigner','');
        				}
        			},
        			select:function(c,r,i){
        				sm.getSelected().set('fdocSendTo',r.get('id'));
        				sm.getSelected().set('fdocSendSigner',r.get('custNameCn'));
        			},
        			keydown:{fn:function(f,e){
        				loadCustomer(f,e,'custCustomFlag','',1);
        			},buffer:BF}}})},
	{header:C_DOC_SEND_DATE,dataIndex:'fdocSendDate',renderer:formatDate,width:80,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_DOC_SEND_TYPE,dataIndex:'fdocSendType',width:80,renderer:HTStore.getITTY,
			editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.ITTY_S})},	
    {header:EXPR_NO,dataIndex:'exprNo',width:80,editor:new Ext.form.TextField()},
	{header:C_DOC_RETURN_DATE,dataIndex:'fdocReturnDate',renderer:formatDate,width:80,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_DOC_BACK_DATE,dataIndex:'fdocBackDate',renderer:formatDate,width:80,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_DOC_BACK_TYPE,dataIndex:'fdocBackType',width:80,renderer:HTStore.getITTY,
			editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.ITTY_S})},
    {header:C_DOC_BACK_SIGNER,dataIndex:'fdocBackSigner',width:80,editor:new Ext.form.TextField()}
	],defaults:{sortable:true,width:100}});
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'))+M3_DOC;
	this.add=function(){
		var t = new FDoc({uuid:HTUtil.UUID(32),consId:p.get('id'),consNo:p.get('consNo'),
			consBizClass:p.get('consBizClass'),consShipType:p.get('consShipType'),
		dotyId:'',dotyClass:'',fdocNo:'',fdocOriginalNum:'1',fdocCopyNum:0,fdocStatus:1,
		fdocRecvDate:new Date(),fdocSendDate:new Date(),fdocSendType:'',fdocSendSigner:'',
		fdocReturnDate:'',fdocBackDate:'',fdocBackType:'',fdocBackSigner:'',
		fdocReturnFlag:0,fdocBackFlag:0,fdocReleasableFlag:0,version:0});
		store.insert(0,t);
		t.set('rowAction','N');
		sm.selectFirstRow();
		this.startEditing(0,1);
	};
	this.del=function(){HTUtil.REMOVE_SM(sm,store);};
	this.save=function(){
		this.stopEditing();
		HTUtil.POST(store,'FDoc',FDoc,'FDOC_S');
	};
	
	Fos.ConsDocGrid.superclass.constructor.call(this,{
	itemId:'C_DOC',id:'T_DOC_'+p.get('id'),title:C_DOC,header:false,deferredRender:false,clicksToEdit:1,
		border:false,height:200,autoScroll:true,sm:sm,cm:cm,store:store,sortInfo:{field:'id',direction:'DESC'},
		tbar:[{text:C_ADD,iconCls:'add',disabled:NR(m+F_M),scope:this,handler:this.add},'-',
			{text:C_REMOVE,iconCls:'remove',disabled:NR(m+F_M),scope:this,handler:this.del},'-',
			{text:C_SAVE,iconCls:'save',disabled:NR(m+F_M),scope:this,handler:this.save}
		]
	});
};
Ext.extend(Fos.ConsDocGrid,Ext.grid.EditorGridPanel);

Fos.DocGrid = function(s) {
	var title=C_DOC_ALL;
	var a=[];
	if(s=='B'){
		title=C_DOC_NOT_RETURN;
		a[a.length]={key:'fdocReturnFlag',value:'0',op:EQ};
	}
	else if(s=='C'){title=C_DOC_RETURN_NOT_BACK;
		a[a.length]={key:'fdocReturnFlag',value:'1',op:EQ};
		a[a.length]={key:'fdocBackFlag',value:'0',op:EQ};
	}
	else if(s=='D'){
		title=C_DOC_BACK;
		a[a.length]={key:'fdocBackFlag',value:'1',op:EQ};
	}
	var bp=a.length?{_mt:'json',xml:HTUtil.QATJ(a)}:{_mt:'json'};
	var store = new Ext.data.GroupingStore({url: SERVICE_URL+'?_A='+'FDOC_X',
		baseParams:bp,
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'FDoc'}, FDoc),
		sortInfo:{field:'id', direction:'DESC'},remoteSort:true});
	store.load({params:{start:0,limit:C_PS}});
	
	this.reset=function(){
		store.baseParams=bp;
		store.reload({params:{start:0,limit:C_PS}});
	};
	this.search = function(){
		var w=new Fos.FDocLookupWin(store,s);
		w.show();
	};
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false}); 
	
	var releasableFlag = new Ext.grid.CheckColumn({header:C_DOC_RELEASABLE_FLAG,dataIndex:'fdocReleasableFlag',width:55});		
	var returnFlag = new Ext.grid.CheckColumn({header:C_DOC_RETURN,dataIndex:'fdocReturnFlag',width:55,
		listeners:{
			click:function(c,e,r){
				r.set('fdocReturnDate',r.get('fdocReturnFlag')==1?(new Date()):'');
			}
		}
	});	
	var backFlag = new Ext.grid.CheckColumn({header:C_DOC_BACK,dataIndex:'fdocBackFlag',width:55,
		listeners:{
			click:function(c,e,r){
				r.set('fdocBackDate',r.get('fdocBackFlag')==1?(new Date()):'');
			}
		}
	});	
	
	var cm=new Ext.grid.ColumnModel({columns:[sm,releasableFlag,returnFlag,backFlag,
	{header:C_DOC_NAME,dataIndex:'dotyName',width:100,
			editor:new Ext.form.ComboBox({displayField:'dotyCode',valueField:'dotyName',triggerAction:'all',
				tpl:dotyTpl,itemSelector:'div.list-item',listWidth:300,mode:'remote',
				selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.getDOTY_S(),
            listeners:{scope:this,select:function(c,r,i){sm.getSelected().set('dotyId',r.get('id'));}}})},
	{header:C_CONS_NO,dataIndex:'consNo',width:80,renderer:consRender},
	{header:C_DOC_NO,dataIndex:'fdocNo',width:80,editor:new Ext.form.TextField()},	
	{header:C_DOC_ORI_NUM,dataIndex:'fdocOriginalNum',width:30,editor:new Ext.form.NumberField()},
	{header:C_DOC_COPY_NUM,dataIndex:'fdocCopyNum',width:30,editor:new Ext.form.NumberField()},	
	{header:C_DOC_RECEIVE_DATE,dataIndex:'fdocRecvDate',renderer:formatDate,width:80,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_CUSTOM_AGENCY,dataIndex:'fdocSendSigner',width:80,editor:new Ext.form.ComboBox({displayField:'custCode',valueField:'custNameCn',triggerAction:'all',
            mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,allowBlank:false,blankText:'',invalidText:'',mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',
            store:HTStore.getCS(),enableKeyEvents:true,
            listeners:{scope:this,select:function(c,r,i){
           		sm.getSelected().set('fdocSendTo',r.get('id'));},
           		keydown:{fn:function(f,e){LC(f,e,'custCustomFlag');},buffer:500}}})},
	{header:C_DOC_SEND_DATE,dataIndex:'fdocSendDate',renderer:formatDate,width:80,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_DOC_SEND_TYPE,dataIndex:'fdocSendType',width:80,renderer:HTStore.getITTY,
			editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.ITTY_S})},
	{header:C_DOC_RETURN_DATE,dataIndex:'fdocReturnDate',renderer:formatDate,width:80,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_DOC_BACK_DATE,dataIndex:'fdocBackDate',renderer:formatDate,width:80,editor:new Ext.form.DateField({format:DATEF})},
	{header:C_DOC_BACK_TYPE,dataIndex:'fdocBackType',width:80,renderer:HTStore.getITTY,
			editor:new Ext.form.ComboBox({displayField:'NAME',valueField:'CODE',triggerAction:'all',
            mode:'local',selectOnFocus:true,listClass:'x-combo-list-small',store:HTStore.ITTY_S})},
    {header:C_DOC_BACK_SIGNER,dataIndex:'fdocBackSigner',width:80,editor:new Ext.form.TextField()},    
    {header:C_VESS,dataIndex:'vessName',width:80},
    {header:C_VOYA,dataIndex:'voyaName',width:80},
    {header:C_BL_NO,dataIndex:'consMblNo',width:80},
    {header:C_SAIL_DATE,dataIndex:'consSailDate',width:80},
    {header:C_BOOKER,dataIndex:'custName',width:80},
    {header:C_CARGO_OWNER,dataIndex:'consCargoOwnerName',width:80}
	],defaults:{sortable:true,width:100}});
	var vc={forceFit:false,groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'};
	var kw = new Ext.form.TextField({listeners:{scope:this,
		specialkey:function(c,e){
			if(e.getKey()==Ext.EventObject.ENTER) 
				this.fastSearch();
			}
		}
	});
	
	this.fastSearch=function(){
        var consNo=kw.getValue();
        if(!consNo){
        	XMG.alert(SYS,M_INPUT_BIZ_NO,function(b){kw.focus();});
        	return;
        };
        var a=[];
        if(s=='B'){
        	a[a.length]={key:'fdocReturnFlag',value:'0',op:EQ};
        }
        else if(s=='C'){
            a[a.length]={key:'fdocReturnFlag',value:'1',op:EQ};
            a[a.length]={key:'fdocBackFlag',value:'0',op:EQ};
        }
        else if(s=='D'){
        	a[a.length]={key:'fdocBackFlag',value:'1',op:EQ};
        }       
        a[a.length]={key:'consNo',value:consNo,op:LI};
        store.baseParams={_mt:'json',xml:HTUtil.QATJ(a)};
        store.reload({params:{start:0,limit:C_PS},callback:function(r){
        	if(r.length==0) 
        		XMG.alert(SYS,M_NOT_FOUND);
        	}
        });
    };
	var b8={text:C_FAST_SEARCH,iconCls:'search',handler:this.fastSearch};
    var b9={text:C_RESET,iconCls:'refresh',handler:this.reset};
	
	Fos.DocGrid.superclass.constructor.call(this,{
	id:'G_DOC_'+s,title:C_DOC_MGT+'-'+title,header:false,deferredRender:false,closable:true,plugins:[releasableFlag,returnFlag,backFlag],
		border:false,height:200,autoScroll:true,sm:sm,cm:cm,store:store,sortInfo:{field:'id',direction:'DESC'},clicksToEdit:1,
		view:new Ext.grid.GroupingView(vc),
		tbar:[{text:C_SAVE,disabled:NR(M1_DOC+F_M),iconCls:'save',disabled:NR(M1_DOC+F_M),
			handler:function(){HTUtil.POST(store,'FDoc',FDoc,'FDOC_S');}},'-',
		      {text:C_SEARCH,disabled:NR(M1_DOC+F_M),iconCls:'search',disabled:NR(M1_DOC+F_V),handler:this.search},'-',
    		kw,b8,'-',b9,'-',
    		{text:C_EXPORT,disabled:NR(M1_DOC+F_M),iconCls:'print',disabled:NR(M1_DOC+F_M),scope:this,handler:function(){
    			EXP('C','FDOC_LIST',store.baseParams.xml?'&_mt=json&xml='+Ext.util.JSON.encode(store.baseParams.xml):'&_mt=JSON');
    		}},'-'],
		bbar:PTB(store,C_PS)});
};
Ext.extend(Fos.DocGrid, Ext.grid.EditorGridPanel);

Fos.FDocLookupWin = function(store,s){
	var t1={id:'T_CONS_LOOK_1',title:C_LOOK_BY_NO,layout:'form',labelWidth:70,labelAlign:"right",
		items:[{fieldLabel:C_CONS_NO,name:'consNo',xtype:'textarea',anchor:'90%'},
    		{boxLabel:C_LOOK_SMART,name:'consNoM',xtype:'checkbox',checked:true,labelSeparator:'',anchor:'50%'}]};
	var t5={id:'T_CONS_LOOK_5',title:C_DOC_BY_NO,layout:'form',labelWidth:70,labelAlign:"right",
		items:[{fieldLabel:C_DOC_NO,name:'fdocNo',xtype:'textarea',anchor:'90%'},
    		{boxLabel:C_LOOK_SMART,name:'fdocNoM',xtype:'checkbox',labelSeparator:'',anchor:'50%'}]};	
	var t2={id:'T_CONS_LOOK_2',title:C_LOOK_BY_MBL,layout:'form',labelWidth:70,labelAlign:"right",
		items: [{fieldLabel:C_MBL_NO,name:'consMblNo',xtype:'textarea',anchor:'90%'},
			{boxLabel:C_LOOK_SMART,name:'consMblNoM',xtype:'checkbox',labelSeparator:'',anchor:'50%'}]};
	var t3={id:'T_CONS_LOOK_3',title:C_LOOK_BY_HBL,layout:'form',labelWidth:70,labelAlign:"right",
		items: [{fieldLabel:C_HBL_NO,name:'consHblNo',xtype:'textarea',anchor:'90%'},
			{boxLabel:C_LOOK_SMART,name:'consHblNoM',xtype:'checkbox',labelSeparator:'',anchor:'50%'}]};	
    var t4={id:'T_CONS_LOOK_4',title:C_LOOK_COMPLEX,layout:'column',
    	items:[{columnWidth:.33,layout:'form',border:false,labelWidth:70,labelAlign:"right",
	    	items:[{fieldLabel:C_DOC_NAME,tabIndex:4,name:'dotyId',store:HTStore.getDOTY_S(),
	    		xtype:'combo',displayField:'dotyName',valueField:'dotyId',
	    		typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	    		{fieldLabel:C_BOOKER,name:'custId',store:HTStore.getCS(),
	        		xtype:'customerLookup',custType:'custBookerFlag',displayField:'custCode',
	        		valueField:'id',typeAhead:true,enableKeyEvents:true,
	        		mode:'remote',tpl:custTpl,itemSelector:'div.list-item',listWidth:400,
	        		triggerAction:'all',selectOnFocus:true,anchor:'95%',
	              	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custBookerFlag');},buffer:BF}}},
				{fieldLabel:C_BIZ_TYPE,tabIndex:7,name:'consBizType',store:HTStore.BT_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	        	{fieldLabel:C_VESS,tabIndex:5,name:'vessId',store:HTStore.getVES(),
          		xtype:'vesselLookup',displayField:'vessNameEn',valueField:'id',typeAhead:true,enableKeyEvents:true,
          		mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',
              		listeners:{scope:this,keydown:{fn:function(f,e){LV(f,e);},buffer:500}}},
	        	{fieldLabel:C_POL,name:'consPol',store:HTStore.getPS(),
              			xtype:'portLookup',displayField:'portNameEn',valueField:'id',
              			typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},	             		
	        	{fieldLabel:C_OPERATOR,name:'consOperatorId',store:HTStore.getOP_S(),xtype:'combo',
	        		displayField:'userName',valueField:'id',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	        	{fieldLabel:C_TRADE_CONTRACT_NO,name:'consTradeContractNo',xtype:'textfield',anchor:'95%'},
	        	{fieldLabel:C_SHIP_TYPE,name:'consShipType',store:HTStore.SHTY_S,xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode: 'local',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	         	{fieldLabel:'S/O No.',name:'consSoNo',xtype:'textfield',anchor:'95%'}]},
	      	{columnWidth:.33,layout:'form',border:false,labelWidth:70,labelAlign:"right",
	   		items:[
	   		{fieldLabel:C_CONS_DATE,name:'consDate',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_SAIL_DATE,name:'consEtd',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_VOYA,tabIndex:35,name:'voyaName',xtype:'textfield',anchor:'95%'},
	        	{fieldLabel:C_COUNTRY_D,name:'consTradeCountry',store:HTStore.getCOUN_S(),xtype:'combo',displayField:'counNameEn',valueField:'counCode',typeAhead:true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%',
                	listeners:{scope:this,select:function(c,r,i){this.find('name','consPod')[0].store.reload({params:{counCode:r.get('counCode'),portActive:1}});}}},	             	
	        	{fieldLabel:C_SALES,name:'consSalesRepId',store:HTStore.getSALE_S(),xtype:'combo',
                		displayField:'userName',valueField:'userId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	        	{fieldLabel:C_CONTRACT_NO,name:'consContractNo',xtype:'textfield',anchor:'95%'},
	        	{fieldLabel:C_CARRIER,name:'consCarrier',store:HTStore.getCS(),enableKeyEvents:true,
	        		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,xtype:'combo',
	        		displayField:'custCode',valueField:'custId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
	        		listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custCarrierFlag');},buffer:500}}},
	           {fieldLabel:C_CUSTOM_AGENCY,name:'fdocSendTo',store:HTStore.getCS(),enableKeyEvents:true,
	        	tpl:custTpl,itemSelector:'div.list-item',listWidth:400,xtype:'combo',
	        	displayField:'custCode',valueField:'custId',typeAhead: true,mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
	        	listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custCustomFlag');},buffer:BF}}}]},
			{columnWidth:.34,layout:'form',border:false,labelWidth:70,labelAlign:"right",
			items:[{fieldLabel:C_DOC_NO,name:'fdocNo',xtype:'textfield',anchor:'95%'},
			{fieldLabel:C_TO,name:'consDate2',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_TO,name:'consEtd2',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_POD,name:'consPod',store:new Ext.data.Store({url: SERVICE_URL+'?A='+'PORT_Q',reader:new Ext.data.XmlReader({record:'GPort'},GPort),sortInfo:{field:'portNameEn',direction:'ASC'}}),xtype:'combo',displayField:'portNameEn',valueField:'portId',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'},
	        	{fieldLabel:C_CARGO_SOURCE,name:'consSource',store:HTStore.SOUR_S,
	        		xtype:'combo',displayField:'NAME',valueField:'CODE',typeAhead: true,mode:'local',triggerAction:'all',selectOnFocus:true,anchor:'95%'},
	         	{fieldLabel:C_REF_NO,name:'consRefNo',xtype:'textfield',anchor:'95%'},	        	
	        	{fieldLabel:C_BOOK_AGENCY,name:'consBookingAgency',store:HTStore.getCS(),
              		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,xtype:'combo',
              		displayField:'custCode',valueField:'custId',
              		typeAhead:true,mode:'remote',triggerAction:'all',selectOnFocus:true,anchor:'95%',enableKeyEvents:true,
              		listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custBookingAgencyFlag');},buffer:BF}}},
	       		{fieldLabel:C_CONTAINER,name:'consContainerCompany',store:HTStore.getCS(),enableKeyEvents:true,
	       		tpl:custTpl,itemSelector:'div.list-item',listWidth:400,xtype:'combo',
	       		displayField:'custCode',valueField:'custId',typeAhead: true,mode:'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%',
	       		listeners:{scope:this,keydown:{fn:function(f,e){LC(f,e,'custContainerFlag');},buffer:BF}
             	}}]}
		]};	
	var t6={id:'T_CONS_LOOK_6',title:C_LOOK_BY_DOC_STATUS,layout:'column',
    	items:[
	      	{columnWidth:.5,layout:'form',border:false,labelWidth:70,labelAlign:"right",
	   		items:[
            	{fieldLabel:C_DOC_NAME,tabIndex:4,name:'dotyId',store:HTStore.getDOTY_S(),
            		xtype:'combo',displayField:'dotyName',valueField:'dotyId',typeAhead: true,
            		mode: 'remote',triggerAction: 'all',selectOnFocus:true,anchor:'95%'},
	   			{fieldLabel:C_DOC_RECEIVE_DATE,name:'recvDate',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_DOC_SEND_DATE,name:'sendDate',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_DOC_RETURN_DATE,name:'returnDate',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_DOC_BACK_DATE,name:'backDate',xtype:'datefield',format:DATEF,anchor:'95%'}]},
			{columnWidth:.5,layout:'form',border:false,labelWidth:70,labelAlign:"right",
			items:[
				{fieldLabel:C_TO,name:'recvDate2',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_TO,name:'sendDate2',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_TO,name:'returnDate2',xtype:'datefield',format:DATEF,anchor:'95%'},
	        	{fieldLabel:C_TO,name:'backDate2',xtype:'datefield',format:DATEF,anchor:'95%'}]}
		]};	
	this.reload=function(){
     	var at = t.getActiveTab();
     	a=[];
     	if(s=='B') a[a.length]={key:'fdocReturnFlag',value:'0',op:EQ};
		else if(s=='C'){title=C_DOC_RETURN_NOT_BACK;
			a[a.length]={key:'fdocReturnFlag',value:'1',op:EQ};
			a[a.length]={key:'fdocBackFlag',value:'0',op:EQ};
		}
		else if(s=='D'){title=C_DOC_BACK;a[a.length]={key:'fdocBackFlag',value:'1',op:EQ};}     	
     	if(at.getId()=='T_CONS_LOOK_1'){
     		var consNo=at.find('name','consNo')[0].getValue();
     		var consNoM=at.find('name','consNoM')[0].getValue();
     		var c=consNo.indexOf(',');
    		var b=consNo.indexOf('..');
    		if(c>=0){a[a.length]={key:'consNo',value:consNo,op:IN};}
    		else if(b>=0){
    			var ra=consNo.split('..');
    			a[a.length]={key:'consNo',value:ra[0],op:GE};
    			a[a.length]={key:'consNo',value:ra[1],op:LE};
    		}
    		else a[a.length]={key:'consNo',value:consNo,op:consNoM?LI:EQ};
     	}     	
     	else if(at.getId()=='T_CONS_LOOK_2'){
     		var consMblNo=at.find('name','consMblNo')[0].getValue();
     		var consMblNoM=at.find('name','consMblNoM')[0].getValue();
     		a[a.length]={key:'consMblNo',value:consMblNo,op:consMblNoM?LI:EQ};
     	}
     	else if(at.getId()=='T_CONS_LOOK_3'){
     		var consHblNo=at.find('name','consHblNo')[0].getValue();
     		var consHblNoM=at.find('name','consHblNoM')[0].getValue();
     		a[a.length]={key:'consHblNo',value:consHblNo,op:consHblNoM?LI:EQ};
     	}
     	else if(at.getId()=='T_CONS_LOOK_4'){
     		var dotyId=at.find('name','dotyId')[0].getValue();
     		if(dotyId) a[a.length]={key:'dotyId',value:dotyId,op:EQ};
     		var fdocStatus=at.find('name','fdocStatus')[0].getValue();
     		if(fdocStatus) a[a.length]={key:'fdocStatus',value:fdocStatus,op:EQ};
     		var fdocNo=at.find('name','fdocNo')[0].getValue();
     		if(fdocNo) a[a.length]={key:'fdocNo',value:fdocNo,op:EQ};
     		var vessId=at.find('name','vessId')[0].getValue();
     		var voyaName=at.find('name','voyaName')[0].getValue();
     		if(vessId) a[a.length]={key:'vessId',value:vessId,op:EQ};
     		if(voyaName) a[a.length]={key:'voyaName',value:voyaName,op:EQ};
     		var custId=at.find('name','custId')[0].getValue();
     		if(custId) a[a.length]={key:'custId',value:custId,op:EQ};
     		var consBizType=at.find('name','consBizType')[0].getValue();        		
     		if(consBizType) a[a.length]={key:'consBizType',value:consBizType,op:EQ};
     		var consPol=at.find('name','consPol')[0].getValue();        		
     		if(consPol) a[a.length]={key:'consPol',value:consPol,op:EQ};
     		var consSalesRepId=at.find('name','consSalesRepId')[0].getValue();        		
     		if(consSalesRepId) a[a.length]={key:'consSalesRepId',value:consSalesRepId,op:EQ};
     		var consTradeContractNo=at.find('name','consTradeContractNo')[0].getValue();        		
     		if(consTradeContractNo) a[a.length]={key:'consTradeContractNo',value:consTradeContractNo,op:EQ};
     		var consShipType=at.find('name','consShipType')[0].getValue();        		
     		if(consShipType) a[a.length]={key:'consShipType',value:consShipType,op:EQ};     		
     		var consDate=at.find('name','consDate')[0].getValue();
     		var consDate2=at.find('name','consDate2')[0].getValue();
     		if(consDate && consDate2){
     			a[a.length]={key:'consDate',value:consDate.format('Y-m-d H:i:s'),op:GE};
     			a[a.length]={key:'consDate',value:consDate2.format('Y-m-d H:i:s'),op:LE};
     		}
     		else if(consDate) a[a.length]={key:'consDate',value:consDate,op:EQ};
     		var consEtd=at.find('name','consEtd')[0].getValue();
     		var consEtd2=at.find('name','consEtd2')[0].getValue();
     		if(consEtd && consEtd2){
     			a[a.length]={key:'consEtd',value:consEtd.format('Y-m-d H:i:s'),op:GE};
     			a[a.length]={key:'consEtd',value:consEtd2.format('Y-m-d H:i:s'),op:LE};
     		}
     		else if(consEtd) a[a.length]={key:'consEtd',value:consEtd,op:EQ};
     		var consTradeCountry=at.find('name','consTradeCountry')[0].getValue();        		
     		if(consTradeCountry) a[a.length]={key:'consTradeCountry',value:consTradeCountry,op:EQ};
     		var consOperatorId=at.find('name','consOperatorId')[0].getValue();        		
     		if(consOperatorId) a[a.length]={key:'consOperatorId',value:consOperatorId,op:EQ};
     		var consContractNo=at.find('name','consContractNo')[0].getValue();        		
     		if(consContractNo) a[a.length]={key:'consContractNo',value:consContractNo,op:EQ};
     		var consPod=at.find('name','consPod')[0].getValue();        		
     		if(consPod) a[a.length]={key:'consPod',value:consPod,op:EQ};
     		var consSource=at.find('name','consSource')[0].getValue();        		
     		if(consSource) a[a.length]={key:'consSource',value:consSource,op:EQ};
     		var consRefNo=at.find('name','consRefNo')[0].getValue();        		
     		if(consRefNo) a[a.length]={key:'consRefNo',value:consRefNo,op:EQ};
     		var consSoNo=at.find('name','consSoNo')[0].getValue();        		
     		if(consSoNo) a[a.length]={key:'consSoNo',value:consSoNo,op:EQ};
     		var consCarrier=at.find('name','consCarrier')[0].getValue();        		
     		if(consCarrier) a[a.length]={key:'consCarrier',value:consCarrier,op:EQ};
     		var fdocSendTo=at.find('name','fdocSendTo')[0].getValue();        		
     		if(fdocSendTo) a[a.length]={key:'fdocSendTo',value:fdocSendTo,op:EQ};
     		var consBookingAgency=at.find('name','consBookingAgency')[0].getValue();        		
     		if(consBookingAgency) a[a.length]={key:'consBookingAgency',value:consBookingAgency,op:EQ};
     		var consContainerCompany=at.find('name','consContainerCompany')[0].getValue();        		
     		if(consContainerCompany) a[a.length]={key:'consContainerCompany',value:consContainerCompany,op:EQ};
     	}
     	else if(at.getId()=='T_CONS_LOOK_5'){
     		var fdocNo=at.find('name','fdocNo')[0].getValue();
     		var fdocNoM=at.find('name','fdocNoM')[0].getValue();
     		a[a.length]={key:'fdocNo',value:fdocNo,op:fdocNoM?LI:EQ};
     	}
     	else if(at.getId()=='T_CONS_LOOK_6'){
     		var dotyId=at.find('name','dotyId')[0].getValue();
     		if(dotyId) a[a.length]={key:'dotyId',value:dotyId,op:EQ};
     		var fdocStatus=at.find('name','fdocStatus')[0].getValue();
     		if(fdocStatus) a[a.length]={key:'fdocStatus',value:fdocStatus,op:EQ};
     		var recvDate=at.find('name','recvDate')[0].getValue();
     		var recvDate2=at.find('name','recvDate2')[0].getValue();
     		if(recvDate && recvDate2){
     			a[a.length]={key:'recvDate',value:recvDate.format('Y-m-d H:i:s'),op:GE};
     			a[a.length]={key:'recvDate',value:recvDate2.format('Y-m-d H:i:s'),op:LE};
     		}
     		else if(recvDate) a[a.length]={key:'recvDate',value:recvDate,op:EQ};
     		var sendDate=at.find('name','sendDate')[0].getValue();
     		var sendDate2=at.find('name','sendDate2')[0].getValue();
     		if(sendDate && sendDate2){
     			a[a.length]={key:'sendDate',value:sendDate.format('Y-m-d H:i:s'),op:GE};
     			a[a.length]={key:'sendDate',value:sendDate2.format('Y-m-d H:i:s'),op:LE};
     		}
     		else if(sendDate) a[a.length]={key:'sendDate',value:sendDate,op:EQ};
     		var returnDate=at.find('name','returnDate')[0].getValue();
     		var returnDate2=at.find('name','returnDate2')[0].getValue();
     		if(returnDate && returnDate2){
     			a[a.length]={key:'returnDate',value:returnDate.format('Y-m-d H:i:s'),op:GE};
     			a[a.length]={key:'returnDate',value:returnDate2.format('Y-m-d H:i:s'),op:LE};
     		}
     		else if(returnDate) a[a.length]={key:'returnDate',value:returnDate,op:EQ};
     		var backDate=at.find('name','backDate')[0].getValue();
     		var backDate2=at.find('name','backDate2')[0].getValue();
     		if(backDate && backDate2){
     			a[a.length]={key:'backDate',value:backDate.format('Y-m-d H:i:s'),op:LE};
     			a[a.length]={key:'backDate',value:backDate2.format('Y-m-d H:i:s'),op:LE};
     		}
     		else if(backDate) a[a.length]={key:'backDate',value:backDate,op:EQ};
     	}
     	store.baseParams={_mt:'json',xml:HTUtil.QATJ(a)};
     	store.reload({params:{start:0,limit:25},callback:function(r){if(r.length==0) XMG.alert(SYS,M_NOT_FOUND);}});this.close();
	};
	var t = new Ext.TabPanel({id:'T_DOC_LOOK',xtype:'tabpanel',plain:true,activeTab:0,height:340,
		defaults:{bodyStyle:'padding:10px'},items:[t1,t5,t6,t2,t3,t4]});
    Fos.FDocLookupWin.superclass.constructor.call(this, {title:C_DOC_QUERY,iconCls:'search',modal:true,width:600,height:340,minWidth:300,
        minHeight:200,plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:t,
		buttons:[{text:C_OK,scope:this,handler:this.reload},{text:C_CANCEL,scope:this,handler:this.close}]
	}); 
};
Ext.extend(Fos.FDocLookupWin, Ext.Window);