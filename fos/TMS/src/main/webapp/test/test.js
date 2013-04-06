//测试数据
var getFosPanel = function(){
	var frm1 = new Ext.FormPanel({
	    title: 'Simple Form with FieldSets',
	    labelWidth: 75, // label settings here cascade unless overridden
	    url: 'save-form.php',
	    frame:true,
	    bodyStyle:'padding:5px 5px 0px 0px',
	    width: 700,
	    renderTo: document.body,
	    layout:'column', // arrange items in columns
	    defaults: {      // defaults applied to items
	        layout: 'form',
	        border: false,
	        bodyStyle: 'padding:4px'
	    },
	    items: [{
	        // Fieldset in Column 1
	        xtype:'fieldset',
	        columnWidth: 0.5,
	        title: 'Fieldset 1',
	        collapsible: true,
	        autoHeight:true,
	        defaults: {
	            anchor: '-20' // leave room for error icon
	        },
	        defaultType: 'textfield',
	        items :[{
	                fieldLabel: 'Field 1'
	            }, {
	                fieldLabel: 'Field 2'
	            }, {
	                fieldLabel: 'Field 3'
	            }
	        ]
	    },{
	        // Fieldset in Column 2 - Panel inside
	        xtype:'fieldset',
	        title: 'Show Panel', // title, header, or checkboxToggle creates fieldset header
	        autoHeight:true,
	        columnWidth: 0.5,
	        checkboxToggle: true,
	        collapsed: true, // fieldset initially collapsed
	        layout:'anchor',
	        checked:true,
	        items :[{
	            xtype: 'panel',
	            anchor: '100%',
	            title: 'Panel inside a fieldset',
	            frame: true,
	            height: 43,
	            collapsible:true
	        }]
	    }]
	});
	var fs1 = new Ext.form.FieldSet({
        id: "Panel1_GroupPanel1",
        bodyStyle: "",
        border: true,
        animCollapse: true,
        collapsible: true,
        collapsed: false,
        title: "分组面板一",
        items: [{
          xtype:'textfield',
          fieldLabel:"工作时",
          name:"NICK"
        },
        {
    		xtype:"fieldset",
    		checkboxToggle:true,//关键参数，其他和以前的一样
    		checkboxName:"dfdf",
    		title:"选填信息",
    		defaultType:'textfield',
    		width:330,
    		autoHeight:true,//使自适应展开排版
    		items:[{
    		    fieldLabel:"UserName",
    		    name:"user",
    		    anchor:"95%"//330px-labelWidth剩下的宽度的95%，留下5%作为后面提到的验证错误提示
    		  },
    		  {
    		    fieldLabel:"PassWord",
    		    inputType:"password",//密码文本
    		    name:"pass",
    		    anchor:"95%"
    		  }]
    	}
       ]
    });
	
	var fs2=new Ext.form.FieldSet({
		xtype:"fieldset",
		checkboxToggle:false,//关键参数，其他和以前的一样
		checkboxName:"dfdf",
		title:"选填信息",
		defaultType:'textfield',
		width:330,
		autoHeight:true,//使自适应展开排版
		items:[{
		    fieldLabel:"UserName",
		    name:"user",
		    anchor:"95%"//330px-labelWidth剩下的宽度的95%，留下5%作为后面提到的验证错误提示
		  },
		  {
		    fieldLabel:"PassWord",
		    inputType:"password",//密码文本
		    name:"pass",
		    anchor:"95%"
		  }]
	});

	var win=new Ext.Window({title:'窗口',width:800,height:600,closable:true,layout:'',items:[frm1]});
	win.show();
	

};
