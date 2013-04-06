//附件上传
Fos.AttachWin = function(consBizType,consId,consNo) {
	this.store = new Ext.data.Store({url:SERVICE_URL,baseParams:{_A:'ATTACH_Q',_mt:'json'},
		reader:new Ext.data.JsonReader({totalProperty:'rowCount',root:'CAttach',id:'id'},CAttach),
		remoteSort:true,sortInfo:{field:'id', direction:'desc'}});
	
    this.store.load({params:{consBizType:consBizType,consId:consId,consNo:consNo}});
    
    this.upload = function(){
		var win = new Fos.FileUploadWin(C_ATTACH_UPLOAD,C_ATTACH_FILE_P);
		win.addButton({text:C_UPLOAD,scope:this,handler:function(){
			var f = Fos.FileUploadWin.superclass.findById.call(win,'F_UP');
			if(f.getForm().isValid()){
            	f.getForm().submit({
                	url: SERVICE_URL+'?_mt=json&_A=ATTACH_U&_uf=1&consId='+consId+'&consNo='+consNo+'&consBizType='+consBizType,
                	waitMsg:'Uploading...',
                	scope:this,
                	success: function(f, o){
                		Ext.Msg.alert(SYS,C_UPLOAD_SUCCESS);
                		win.close();
                		this.store.load({params:{consBizType:bizType,consId:consId,consNo:consNo}});
                	}
            	});
        }}});
        win.addButton({text:C_CANCEL,handler:function(){win.close();}},this);
		win.show();
    };
    this.download=function(){
    	var b =sm.getSelected();
    	if(b){
	    	var url = SERVICE_URL+'?_A='+'ATTACH_D&attachId='+b.get('id');
	    	window.open(url,'download', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
    	}
    	else 
    		Ext.Msg.alert(SYS,M_NO_DATA_SELECTED);
    };
    this.removeAttach=function(){
    	var a =sm.getSelections();
    	if(a.length>0){
       		XMG.confirm(SYS,M_R_C,function(btn){
           	if(btn=='yes'){
           		var xml = HTUtil.SMTX4R(sm,'CAttach','id');	    		
	    		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
	    			params:{_A:'ATTACH_R',attachId:p.get('attachId')},
	    		success: function(r){
	    			Ext.Msg.alert(SYS,M_S);
	    			this.store.load({params:{consId:consId}});
	    		},
	    		failure: function(r){
	    			Ext.Msg.alert(SYS,M_F+r.responseText);
	    		},
	    		xmlData:HTUtil.HTX(xml)});
            }},this);
		}
    };
    
    var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    var cm=new Ext.grid.ColumnModel({columns:[sm,
	{header:C_FILE_NAME,dataIndex:'attachFileName',width:200},
	{header:C_MODIFY_TIME,width:100,align:'right',renderer:formatDateTime,dataIndex:"modifyTime"}
	],defaults:{sortable:false,width:100}});
       
	var panel = new Ext.grid.GridPanel({title:C_ATTACH,header:false,
		closable:false,store:this.store,sm:sm,cm:cm,
		tbar:[
		      {itemId:'TB_U',text:C_ATTACH_UPLOAD,iconCls:'up',scope:this,handler:this.upload},'-',
		    {itemId:'TB_D',text:C_ATTACH_DOWNLOAD,iconCls:'down',scope:this,handler:this.download},'-',
	        {itemId:'TB_R',text:C_REMOVE,iconCls:'remove',scope:this,handler:this.removeAttach}
	        ]
	    });
	Fos.AttachWin.superclass.constructor.call(this, {title:consNo+C_ATTACH,modal:true,width:900,
        height:565,layout:'fit',plain:false,bodyStyle:'padding:0px;',buttonAlign:'right',items:panel});
};
Ext.extend(Fos.AttachWin,Ext.Window);