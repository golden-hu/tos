

//构造商品类别的panel的相关代码
Fos.CategoryPanel = function() {	
	store = new Ext.data.Store({url:SERVICE_URL+'?_A=CATEGORY_Q',baseParams:{_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'WCargoCategory',id:'id'},WCargoCategory),
		remoteSort:true,sortInfo:{field:'id', direction:'ASC'}});
	
	var root=new Ext.tree.TreeNode({id:'0',text:'',leaf:false,expanded:true});		
	store.load({scope:this,callback:function(a,o,s){
		if(s&&a.length>0){
			for(var i=0;i<a.length;i++){
				var id=a[i].get('id');
				var name=a[i].get('categoryName')+"("+a[i].get('categoryCode')+")";
				var pid=a[i].get('parentId');
				var n = new Ext.tree.TreeNode({iconCls:'res_type_D',text:name,id:id,leaf:false,expanded:true});		
				if(!pid||pid==0) root.appendChild(n);
				else{
					var pn=this.getNodeById(pid);
					if(pn) pn.appendChild(n);
				}
			}
		}		
	}});
	
	var addCategory=function(){
		var pId = 0;
		var pCode= '';
		var pName='';
    	var n = this.getSelectionModel().getSelectedNode();
    	if(n){
    		var pId = n.id;
    		var cat = store.getById(pId);
    		var pCode= cat.get('categoryCode');
    		var pName= cat.get('categoryName');
    	}
    	var p = new WCargoCategory({uuid:HTUtil.UUID(32),
			parentId:pId,
			parentCode:pCode,
			parentName:pName,    			
			rowAction:'N'});
    	
        var win = new Fos.CategoryWin(p,store,this);
        win.show();
    };
    
    
    var eidtCategory=function(){
    	var n = this.getSelectionModel().getSelectedNode();
    	if(n){
    		var id = n.id;
    		var p = store.getById(id);    		
            var win = new Fos.CategoryWin(p,store,this);
            win.show();
    	}
    };
    
    
    var deleteCategory=function(){
    	var n = this.getSelectionModel().getSelectedNode();
    	if(n){    		
			Ext.Msg.confirm(SYS,M_R_C,function(btn){
	        	if(btn == 'yes') {	        		
	        		var p = store.getById(n.id);
	        		var xml = HTUtil.RTX4R(p,'WCargoCategory');	        		
	        		HTUtil.REQUEST('CATEGORY_S', xml, function(){
	        			store.remove(p);
	        			//store.reload();
	        			n.remove();
	        		});
	        	}
			},this);
    	}
		else Ext.Msg.alert(SYS,M_R_P);
    };
    
    var addFirstCategory=function()
    {
    	var pId = 0;
		var pCode= '';
		var pName='';
    	
    	var p = new WCargoCategory({uuid:HTUtil.UUID(32),
			parentId:pId,
			parentCode:pCode,
			parentName:pName,    			
			rowAction:'N'});
    	
        var win = new Fos.CategoryWin(p,store,this);
        win.show();
        
    };
	
	Fos.CategoryPanel.superclass.constructor.call(this,{id:'G_CATEGORY',iconCls:'gen',title:C_CARGO_CATEGORY,
		animate:true,enableDD:false,autoScroll:true,containerScroll:true,root:root,rootVisible:false,closable:true,
		tbar:[
			{text:C_ADD_FIRSTLEVEL,iconCls:'add',disabled:false,scope:this,hidden:NR(M1_WMS+WM_BASE+M2_CATEGORY+WF_ADD),handler:addFirstCategory}, '-',
		    {text:C_ADD,iconCls:'add',disabled:false,scope:this,hidden:NR(M1_WMS+WM_BASE+M2_CATEGORY+WF_ADD),handler:addCategory}, '-',
		    {text:C_EDIT,iconCls:'option',disabled:false,scope:this,hidden:NR(M1_WMS+WM_BASE+M2_CATEGORY+WF_EDIT),handler:eidtCategory},'-',
		    {text:C_REMOVE,iconCls:'remove',disabled:false,scope:this,hidden:NR(M1_WMS+WM_BASE+M2_CATEGORY+WF_DEL),handler:deleteCategory},'-']
	});
};
Ext.extend(Fos.CategoryPanel, Ext.tree.TreePanel);
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//构造商品目录新增修改弹出框的相关代码
Fos.CategoryWin = function(p,store,tree) {
	this.save = function(){
		p.beginEdit();
		frm.getForm().updateRecord(p);
		if(Ext.isEmpty(p.get('categoryCode'))){
			Ext.Msg.alert(SYS,C_CATEGORY_CODE_REQUIRED,function(){frm.categoryCode.focus();},this);
			return;
		};
		if(Ext.isEmpty(p.get('categoryName'))){
			Ext.Msg.alert(SYS,C_CATEGORY_NAME_REQUIRED,function(){frm.categoryName.focus();},this);
			return;
		};
				
		var xml = HTUtil.RTX(p,'WCargoCategory',WCargoCategory);		
	 	Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:'CATEGORY_S'},
		success: function(r){
			var c = HTUtil.XTR(r.responseXML,'WCargoCategory',WCargoCategory);
			var ra=p.get('rowAction');
			var f = WCargoCategory.prototype.fields;
			p.beginEdit();
			for (var i = 0; i < f.keys.length; i++) {var fn = ''+f.keys[i];p.set(fn,c.get(fn));}; 
			p.set('rowAction','M');
			p.endEdit();
			
			if(ra=='N'){
				var n = new Ext.tree.TreeNode({iconCls:'res_type_D',
					text:p.get('categoryName')+"("+p.get('categoryCode')+")",id:p.get('id'),leaf:false,expanded:true});		
				var pid = p.get('parentId');
				if(pid==0) 
					tree.getRootNode().appendChild(n);
				else{
					var pn=tree.getNodeById(pid);
					if(pn) pn.appendChild(n);
				}
				//alert(p.get("id"));
				store.reload();
			}
			else{
				var n=tree.getNodeById(p.get("id"));
				n.setText(p.get("categoryName")+"("+p.get('categoryCode')+")");
			}			
			this.close();
			Ext.Msg.alert(SYS,M_S);
		},
		failure:function(r){Ext.Msg.alert(SYS,M_F+r.responseText);},
		xmlData:HTUtil.HTX(xml)});
	};
	
	var frm = new Ext.form.FormPanel({labelWidth:80,frame:true,
		items:[
	    		{fieldLabel:C_CATEGORY_CODE,name:'categoryCode',value:p.get('categoryCode'),tabIndex:1,
	    			ref:'../categoryCode',itemCls:'required',xtype:'textfield',anchor:'95%'},	    		
	    		{fieldLabel:C_CATEGORY_NAME,name:'categoryName',value:p.get('categoryName'),tabIndex:2,
	    			ref:'../categoryName',itemCls:'required',xtype:'textfield',anchor:'95%'}
	    	]});
	                                                                                		                                                                
	Fos.CategoryWin.superclass.constructor.call(this,{buttonAlign:'right',
		title:p.get('rowAction')=='N'?C_ADD_CATEGORY:C_EDIT_CATEGORY,
		width:300,height:140,modal:true,
	  	items:[frm],
	  	buttons:[{text:C_SAVE,iconCls:'ok',scope:this,handler:this.save},
		  	       {text:C_CANCEL,iconCls:'cancel',scope:this,handler:this.close}]
	});
};
Ext.extend(Fos.CategoryWin, Ext.Window);
///////////////////////////////////////////////////////////////////////////////////////////





