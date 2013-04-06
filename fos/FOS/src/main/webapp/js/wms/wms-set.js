//费用-海运空运-仓储-陆运-快件 共用
Fos.WMSExpenseTab = function(p,parent){
	PCny = new Ext.form.TextField({width:80,disabled:true});
	PUsd = new Ext.form.TextField({width:80,disabled:true});
	PLoc = new Ext.form.TextField({width:80,disabled:true});
	PRc  = new Ext.form.TextField({width:80,disabled:true});
	
	this.parent = parent;
	
	var pR=new Fos.ExGrid(p,'R',this);
	var pP=new Fos.ExGrid(p,'P',this);
	
	this.reCalculate = function(){
		PCny.setValue(HTUtil.round2(pR.sumCny-pP.sumCny));
		PUsd.setValue(HTUtil.round2(pR.sumUsd-pP.sumUsd));
		PLoc.setValue(HTUtil.round2(pR.sumLoc-pP.sumLoc));
		PRc.setValue(HTUtil.round2(pR.sumRc-pP.sumRc));
	};
		
	this.updateStatus=function(s){
		var action = "CONS_U";
		if(p.get('consBizType')==BT_T) action = "TCON_C_U";
		if(p.get('consBizType')==BT_W) action = "WCON_C_U";
		if(p.get('consBizType')==BT_E) action = "ECON_C_U";
		
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:action,id:p.get('id'),consStatusExp:s},
			success: function(r){
				p.beginEdit();
				p.set('consStatusExp',s);
				p.endEdit();
				this.updateToolBar();
				Ext.Msg.alert(SYS,M_S);
			},
			failure: function(r){Ext.Msg.alert(SYS,M_F+r.responseText);}});
	};
	
	var m=getRM(p.get('consBizClass'),p.get('consBizType'),p.get('consShipType'));
	if(parent=='SET') 
		m=M1_SET+S_EXPE+'04';
	else 
		m=m+M3_EXPE+'04'; 
	
	
	//业务确认 1
	this.check=function(){this.updateStatus('1');};
	//取消确认 0
	this.unCheck=function(){this.updateStatus('0');};
			
	var btnCheck = new Ext.Button({text:C_EXPE_AUDIT,
			disabled:NR(m)||p.get('consStatusExp')==1||p.get('consBizType')==BT_W,
			iconCls:'check',scope:this,handler:this.check});
	var btnUnCheck = new Ext.Button({text:C_EXPE_UNCHECK,
			disabled:NR(m)||p.get('consStatusExp')==0||p.get('consBizType')==BT_W,
			iconCls:'renew',scope:this,handler:this.unCheck});
		
	this.updateToolBar=function(){
		btnCheck.setDisabled(NR(m)||p.get('consStatusExp')==1);
		btnUnCheck.setDisabled(NR(m)||p.get('consStatusExp')==0);
    	pR.updateToolBar();
    	pP.updateToolBar();
	};
	
	var pBiz;
	if(p.get('consBizType')==BT_M||p.get('consBizType')==BT_A){
		pBiz = new Fos.ExpenseBizPanel(p);
	}
	else if(p.get('consBizType')==BT_T){
		pBiz = new Fos.TmsExpenseBizPanel(p);
	}
	else if(p.get('consBizType')==BT_E){
		pBiz = new Fos.ExpressExpenseBizPanel(p);
	}
	
	
	Fos.WMSExpenseTab.superclass.constructor.call(this, {autoScroll:true,layout:'border',
		items: [pR,pP],
		tbar:[btnCheck,'-',btnUnCheck,'-',
		      {xtype:'tbtext',text:C_PROFIT_CNY},PCny,'-',
		      {xtype:'tbtext',text:C_PROFIT_USD},PUsd,'-',
		      {xtype:'tbtext',text:C_PROFIT_LOC},PLoc,'-',
		      {xtype:'tbtext',text:C_PROFIT_RC},PRc]
		}
	);
};
Ext.extend(Fos.WMSExpenseTab, Ext.Panel);