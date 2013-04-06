var HTUtil= {
	createRecord : function(o){
		var f = Ext.extend(Ext.data.Record, {});
		var p = f.prototype;
		p.fields = new Ext.util.MixedCollection(false, function(field){
		    return field.name;
		});
		for(var i = 0, len = o.length; i < len; i++){
		    p.fields.add(new Ext.data.Field(o[i]));
		}
		p.fields.add(new Ext.data.Field('id'));
		p.fields.add(new Ext.data.Field('createBy'));
		p.fields.add(new Ext.data.Field('modifyBy'));
		p.fields.add(new Ext.data.Field('compCode'));
		p.fields.add(new Ext.data.Field('version'));
		p.fields.add(new Ext.data.Field('rowAction'));
		p.fields.add(new Ext.data.Field('uuid'));
		p.fields.add(new Ext.data.Field('removed'));
		p.fields.add(new Ext.data.Field({name:'createTime',type:'date',dateFormat:'Y-m-d H:i:s'}));
		p.fields.add(new Ext.data.Field({name:'modifyTime',type:'date',dateFormat:'Y-m-d H:i:s'}));
		f.getField = function(name){
		    return p.fields.get(name);
		};
		return f;
	},
	
	//将一个容器内的字段的值更新到一条record对象中
	saveToRecord: function(container,record){
		record.beginEdit();
		var fs = record.fields;
        fs.each(function(f){
        	var fa = container.find('name',f.name); 
            if(fa.length>0){
                var field = fa[0];
                record.set(f.name, field.getValue());
            }
        }, this);
        record.endEdit();
	},
	
	/*
	 * add by golden @20120911
	 */
	//将一条Record对象中的字段，更新至一个容器的控件上去
	recordToContainer: function(container,record){
		
		var fs = record.fields;
        fs.each(function(f){
        	var fa = container.find('name',f.name); 
            if(fa.length>0){
                var field = fa[0];
                //record.set(f.name, field.getValue());
                field.setValue(record.get(f.name));
            }
        }, this);
        
	},
	
	//检查控件的值不能为空
	checkFieldNotNull : function(fieldName,cotroller){
		if(Ext.isEmpty(cotroller.getValue())){
			Ext.Msg.alert(SYS,fieldName+M_REQUIRED,function(){cotroller.focus();});
			return false;
		}
		return true;
	},
	
	//添加控件回车键支持
	setNextFocus : function(cotroller,cotrollerNext){
		cotroller.addListener('keydown',function(f,e){
			if(e.getKey()==e.ENTER){
				this.focus();
			} 
		},cotrollerNext);
	},
	
	formatDate : function(v){
		return v ? v.dateFormat('Y-m-d') : '';
	},
	
	formateDateTime : function(v){
		return v ? v.dateFormat('Y-m-d H:i') : '';
	},
	
	formatDateTimeChinese : function(v){
		return v ? v.dateFormat('Y年m月d日 H:i') : '';
	},
	
	getTomorrow : function(v){
		return v ? v.add(Date.DAY,1).dateFormat('Y-m-d') : '';
	},
	
	round2 : function(v){
		if(Ext.isEmpty(v)){
			return 0.00;
		}
		v = parseFloat(v);
		if(v=='NaN') return 0.00;
		else return Math.round(v*100)/100;
	},
	
	nulltoZero:function(v){
		if (v==null) return 0.00;
		else return v;
		
	},
	
	round4:function(v){return (Math.round(v*10000)/10000);},
	
	numRenderColor : function(v,m,r){
		v = parseFloat(v);
		if(v=='NaN') return '0.00';
		m.css=(v>0?'green-b':'red-b');
		return v.toFixed(2);
	},
	
	numRender :  function(v){v=parseFloat(v);v=v.toFixed(2);if(v=='NaN') v='0.00';return v;},
	rateRender : function(v){v=parseFloat(v);v=v.toFixed(4);if(v=='NaN') v='0.0000';return v;},
	boolRender : function(v, p, record){
		p.css += ' x-grid3-check-col-td';
		return '<div class="x-grid3-check-col'+(v==1?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
	},
	
	getElapsed : function(d){
		if(!d) return -1;
		return Math.abs((new Date()).getTime()-d.getTime());
	},
	
	showProgress : function(v){
		return function(){
			var i = v/11;Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
		};
	},
	
	UUID : function(len, radix){
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [];
		radix = radix || chars.length;

		if (len) {
			for (var i = 0; i < len; i++) 
				uuid[i] = chars[0 | Math.random()*radix];
		} 
		else {
			var r;
		    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		    uuid[14] = '4';
		    for (var i = 0; i < 36; i++) {
		    	if (!uuid[i]) {
		    		r = 0 | Math.random()*16;
		    		uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		    	}
			}
		}
		return uuid.join('');
	},
	
	getDirty : function(store){
		var cc=[];
		var a =store.getRange();
		for(var i=0;i<a.length;i++){if(a[i].dirty) cc[cc.length]=a[i];}
		return cc;
	},
	
	/*
	 * 将选中的记录从Ext.data.Store删除，并将记录的rowAction设R或D,如果记录是数据库中查询出来的记录就设为R,如果是前台新增还没有插入数据库的就来就设为D.
	 * sm:Ext.grid.SelectionModel对象
	 * store：Ext.data.Store对象
	 */
	REMOVE_SM : function(sm,store){
		var r = sm.getSelections();
		if(r.length){
			for(var i=0;i<r.length;i++){
				r[i].set('rowAction',r[i].get('rowAction')=='N'?'D':'R');
				store.remove(r[i]);
			}
		}
		else Ext.MessageBox.alert(SYS,M_R_P);
	},
	
	/*
	 * 将ＸＭＬ文档转换成一条Ext.data.Record记录，
	 * doc:ＸＭＬ文档，
	 * r:记录类型对应的xml标签，
	 * rt:记录的数据类型
	 */
	XTR : function(doc,r,rt){
		var fields = rt.prototype.fields;
		var root = doc.documentElement || doc;	
		var q = Ext.DomQuery;
		var ns = q.select(r, root);
		if(ns.length>0)
		{
			var n=ns[0];
			var values = {};	
			for(var j = 0, jlen = fields.length; j < jlen; j++){
				var f = fields.items[j];
				var v = q.selectValue(f.name,n,f.defaultValue);
				v = f.convert(v, n);
				values[f.name] = v;
			}
			var record = new rt(values);
			record.node = n;
			return record;
		}
	},
	
	/*
	 * 将ＸＭＬ文档转换成一条Ext.data.Record记录的数组，
	 * doc:ＸＭＬ文档，
	 * r:记录类型对应的xml标签，
	 * rt:记录的数据类型
	 */
	XTRA : function(doc,r,rt){
		var fields = rt.prototype.fields;
		var root = doc.documentElement || doc;	
		var q = Ext.DomQuery;	
		var ns = q.select(r, root);
		var records = [];
		for(var i = 0, len = ns.length; i < len; i++) {
			var n=ns[i];
			var values = {};	
			for(var j = 0, jlen = fields.length; j < jlen; j++){
				var f = fields.items[j];
				var v = q.selectValue(f.name,n,f.defaultValue);
				v = f.convert(v, n);
				values[f.name] = v;
			}
			var record = new rt(values);
			record.node = n;
			records[records.length] = record;
		}		
		return records;
	},
	
	
	
	/*将一条Ext.data.Record记录转换成ＸＭＬ文档，
	 * 
	 r:Ext.data.Record数据对象，
	 t:记录类型对应的xml标签，
	 rt:记录的数据类型
	 */
	RTX : function(r,t,rt){
		f=rt.prototype.fields;
		var x='<'+t+'>\n';
		if(r.get('rowAction') == ''||r.get('rowAction') == undefined) r.set('rowAction','M');
		for(var i=0;i<f.length;i++){
			var item = f.items[i];
			var n = item.name;
			var ty = item.type;
			if(n!=undefined && r.get(n)!=undefined && r.get(n)!==''){
				x+='<'+n+'>';
				if(ty==Ext.data.Types.DATE){				
					x+=r.get(n)?r.get(n).format(item.dateFormat):'';
				}
				else if(ty==Ext.data.Types.BOOLEAN){
					x+=r.get(n)?'1':'0';
				}
				else{
					x+=Ext.util.Format.htmlEncode(r.get(n));
				}
				
				x+='</'+n+'>\n';
			}
		}	
		return x+'</'+t+'>\n';
	},
	
	/*将一个Ext.data.Record记录数组转换成ＸＭＬ文档，
	a:Ext.data.Record数据对象数组，
	t:记录类型对应的xml标签，
	rt:记录的数据类型　
	*/
	ATX : function(a,t,rt){
		var x='';
		f=rt.prototype.fields;
		for(var j=0;j<a.length;j++)
		{
			var r=a[j];
			if(r.get('rowAction') == ''||r.get('rowAction') == undefined) r.set('rowAction','M');
			if(r.get('rowAction')!='D'){
				x=x+"<"+t+">\n";
				for(var i=0;i<f.length;i++){
					var item = f.items[i];
					var n = item.name;
					var ty = item.type;				
					if(n!=undefined && r.get(n)!=undefined && r.get(n)!==''){
						x+='<'+n+'>';
						if(ty==Ext.data.Types.DATE) 
							x+=r.get(n)?r.get(n).format(item.dateFormat):'';
						else if(ty==Ext.data.Types.BOOLEAN)
							x+=r.get(n)?'1':'0';
						else
							x+=Ext.util.Format.htmlEncode(r.get(n));						
						x+='</'+n+'>\n';
					}
				}
				x=x+"</"+t+">\n";
			}
		}
		return x;
	},
	
	/*
	 * 在xml文档外面封装HtRequest标签
	 * x:XML文档
	 */
	HTX : function(x){return "<HtRequest>\n"+x+"</HtRequest>";},

	/*将json对象转换成Ext.data.Record记录对象，
		json:json对象，
		rt:记录的数据类型　
	*/
	JTR : function(json,rt){
		var fields = rt.prototype.fields;	
		var values = {};
		for(var j = 0, jlen = fields.length; j < jlen; j++){
			var f = fields.items[j];
			var fn=f.name;
			v = json[fn];		
			values[fn] = f.convert(v);
		}
		var record = new rt(values);
		return record;
	},
	
	/*将json对象转换成Ext.data.Record记录对象数组，
	o:json对象，
	t:记录的数据类型　
	 */
	JTRA : function(o,t,rt){
		if(o[t].length) 
			return o; 
		else{
			var d={};
			d[t]=[o[t]];
			return d;
		}
	},
	
	/*
	 * 将Ext.data.Record记录对象转换成json对象，
		r:Ext.data.Record数据对象，
		
		rt:记录的数据类型
	*/
	RTJ : function(r,rt){
		f=rt.prototype.fields;	
		if(r.get('rowAction') == ''||r.get('rowAction') == undefined) r.set('rowAction','M');
		v={};
		for(var i=0;i<f.length;i++){
			var item = f.items[i];
			var n = item.name;
			var ty = item.type;		
			if(n!=undefined && r.get(n)!=undefined && r.get(n)!==''){			
				if(ty==Ext.data.Types.DATE){
					v[n]=r.get(n)?r.get(n).format('Y-m-d H:i:s'):'';
				}
				else if(ty==Ext.data.Types.BOOLEAN){
					v[n]=r.get(n)?'1':'0';
				}
				else{
					v[n]=Ext.util.Format.htmlEncode(r.get(n));
				}
			}
		}
		return v;
	},

	/*将Ext.data.Record记录对象数组转换成json对象，
		a:Ext.data.Record数据对象数组，
		rt:记录的数据类型
	*/
	ATJ : function(a,rt){
		f=rt.prototype.fields;var ra=[];
		for(var j=0;j<a.length;j++){
			if(a[j].get('rowAction')!='D'){
				var rj=this.RTJ(a[j],rt);ra[ra.length]=rj;
			}
		}
		return ra;
	},

	/*
	 * 在json对象外面封装HtRequest标签
	 * x:json对象
	 */
	HTJ : function(json){return {HtRequest:json};},
	
	QTJ : function(a){return {HtQuery:a};},

	QTX : function(a){
		var x='';
		for(var i=0;i<a.length;i++)
		{
			x+='<HtQuery><key>'+a[i].get('key')+'</key>'+'<op>'+a[i].get('op')+'</op>'+'<value>'+a[i].get('value')+'</value></HtQuery>\n';
		}
		return x;
	},
	
	QATX : function(a){
		var x='<HtRequest>\n';
		for(var i=0;i<a.length;i++)
		{
			x+='<HtQuery><key>'+a[i].get('key')+'</key>'+'<op>'+a[i].get('op')+'</op>'+'<value>'+a[i].get('value')+'</value></HtQuery>\n';
		}
		x+='</HtRequest>\n';
		return x;
	},
	
	QATJ : function(a){
		return Ext.util.JSON.encode(this.HTJ(this.QTJ(a)));
	},
	
	/*
	 * 将服务器端返回的对象更新到前台
	 * e:服务器端返回的对象
	 * r:Ext.data.Record数据对象，
	 * rt:记录的数据类型 
	 */
	RU : function(e,r,rt){
		
		r.beginEdit();
		var fields = rt.prototype.fields;
		for(var k = 0;k < fields.length;k++){
			var f = fields.items[k];
			var fn=f.name;			
			r.set(fn,e.get(fn));
		}
		r.endEdit();
		
	},

	/*
	 * 将服务器端返回的对象数组更新到前台
	 * store:前台Ext.data.Store
	 * a:服务器端返回的对象数组，
	 * rt:记录的数据类型 
	 */
	RUA : function(store,a,rt){
		var sa=store.getRange();		
		//store.suspendEvents();	//暂停触发所有事件
		
		for(var j=0;j<a.length;j++){	
			for(var i=0;i<sa.length;i++){
				if(sa[i].get('id') == a[j].get('id')||sa[i].get('uuid')==a[j].get('uuid')){
					HTUtil.RU(a[j],sa[i],rt);
					break;
				}
			}
		}		
		store.commitChanges();
		//store.resumeEvents();
	},

	/*
	 * 将服务器端返回的json对象更新到前台
	 * e:服务器端返回的json对象
	 * r:Ext.data.Record数据对象，
	 * rt:记录的数据类型 
	 */
	JRU : function(e,r,rt){
		var fields = rt.prototype.fields;
		for(var k = 0;k < fields.length;k++){
			var f = fields.items[k];
			var fn=f.name;
			r.set(fn,f.convert(e[fn]));			
		}
	},

	/*
	 * 将服务器端返回的json对象数组更新到前台
	 * store:前台Ext.data.Store
	 * a:服务器端返回的json对象数组，
	 * rt:记录的数据类型 
	 */
	JU : function(store,a,rt){
		var fields = rt.prototype.fields;
		var sa=store.getModifiedRecords();
		for(var i=0;i<sa.length;i++){
			for(var j=0;j<a.length;j++){	
				if(sa[i].get('uuid')==a[j].uuid){
					for(var k = 0;k < fields.length;k++){
						var f = fields.items[k];
						var fn=f.name;
						sa[i].set(fn,a[j].fn);
					}
					break;
				}
			}
		}
		store.suspendEvents();
		store.commitChanges();
		store.resumeEvents();
	},

	RTX4R : function(r,t){
		var xml =''; 
		xml=xml+'<'+t+'>\n<id>'+r.get('id')+'</id>\n';
		xml += "<rowAction>R</rowAction>\n";
		xml =xml+'</'+t+'>\n';
		return xml;
	},
	
	ATX4R : function(a,t){
		var xml ='';
		for(var i=0;i<a.length;i++){
			xml=xml+HTUtil.RTX4R(a[i],t);
		}
		return xml;
	},
	
	SMTX4R : function(sm,t){
		var xml ='';
		sm.each(function(r){xml=xml+HTUtil.RTX4R(r,t);});
		return xml;
	},
	
	STX4R : function(store,t){
		var xml ='';
		var a =store.getRange();
		if(a.length>0){
			for(var i=0;i<a.length;i++){
				if(a[i].get('rowAction')!='D' && a[i].get('rowAction')!='N') 
					xml=xml+HTUtil.RTX4R(a[i],t);
			}
		}
		return xml;
	},

	//解析后台返回的数据行数
	XRC : function(doc){
		var root = doc.documentElement || doc;	
		var q = Ext.DomQuery;	
		var c = q.selectValue('rowCount',root);	
		return parseInt(c);
	},
	
	//解析后台返回的记录数
	XTC : function(doc){
		var root = doc.documentElement || doc;	
		var q = Ext.DomQuery;	
		var c = q.selectValue('code',root);	
		return c;
	},
	
	//解析后台返回的提示信息
	XTM : function(doc){
		var root = doc.documentElement || doc;	
		var q = Ext.DomQuery;	
		var c = q.selectValue('msg',root);	
		return c;
	},
	
	//解析后台返回的XML中的HtStatus中的值
	XTS : function(doc,key){
		var root = doc.documentElement || doc;	
		var q = Ext.DomQuery;	
		//var s = q.selectValue('htStatus',root);	
		var v = q.selectValue(key,root);
		return v;
	},
	
	REQUEST : function(action,xml,fn,scope){
		Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:action},
			success: function(r){
				if(scope) 
					fn(r,scope);
				else 
					fn(r);
				Ext.MessageBox.alert(SYS,M_S);
			},
			failure: function(r,o){
				Ext.MessageBox.alert(SYS,HTUtil.XTM(r.responseXML));
			},
			xmlData:HTUtil.HTX(xml)});
	},
	
	POST : function(store,t,rt,action){
		var a =store.getModifiedRecords();
		if(a.length>0){
			var x = this.ATX(a,t,rt);
			if(x!='')
			{
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:action},
					success: function(r){
						var b = this.XTRA(r.responseXML,t,rt);
						HTUtil.RUA(store,b,rt);
						Ext.MessageBox.alert(SYS,M_S);
					},
					failure: function(r){
						Ext.MessageBox.alert(SYS,HTUtil.XTM(r.responseXML));
					},
					xmlData:this.HTX(x)
				});
			}
			else Ext.MessageBox.alert(SYS,M_NC);
		}
		else Ext.MessageBox.alert(SYS,M_NC);
	},
	
	POST_CALLBACK : function(store,t,rt,action,fn){
		var a =store.getModifiedRecords();
		if(a.length){
			var x = this.ATX(a,t,rt);
			if(x!='')
			{
				Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',params:{_A:action},
					success: function(r){
							var b = this.XTRA(r.responseXML,t,rt);
							this.RUA(store,b,rt);
							fn(store);
							Ext.MessageBox.alert(SYS,M_S);
					},
					failure: function(r){
						Ext.MessageBox.alert(SYS,this.XTM(r.responseXML));
					},
					xmlData:this.HTX(x)
				});
			}
			else Ext.MessageBox.alert(SYS,M_NC);
		}
		else Ext.MessageBox.alert(SYS,M_NC);
	},
	
	POST_SMS :function(action,u,n,pwd,k,m,c,consId,consNo,bizType){
		Ext.Ajax.request({scope:this,url:SERVICE_URL,method:'POST',
			params:{_A:action,smsUrl:u,smsUser:n,smsPassword:pwd,smsKey:k,
			mobile:m,content:c,consId:consId,consNo:consNo,bizType:bizType},
			success: function(r){
					Ext.MessageBox.alert(SYS,M_S_S);
					this.close();
			},
			failure: function(r){
				Ext.MessageBox.alert(SYS,'POST ERROR!');
			}
		});
	},
	
	loadCargo : function(f,e){
		if(e.getKey()!=e.ENTER){	
			var q=f.getRawValue();
			if(q.length>1 && !f.isExpanded()){
				var a=[];var op=EQ;			
				a[0]=new QParam({key:'cargoCode',value:q+'%',op:LI});
				var xml = HTUtil.QTX(a);
				Ext.Ajax.request({url:SERVICE_URL,method:'POST',params:{_A:'WCARGO_X'},
					success: function(r,o){
		   				f.store.loadData(r.responseXML,false);
		   				f.expand();
		   			},
					xmlData:HTUtil.HTX(xml)
				});
			}
			else if(q.length==0 && f.isExpanded()){f.store.removeAll();}
		}
	},
	
	OW : function(url){
		window.open(url,'',
			'height=0,width=0,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
		},
				
	OWF : function(url){
		window.open(url,'',
			'height=800,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
		},
					
	OWW : function(url){
		window.open(url,'',
			'height=800,width=600,top=0,left=0,toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes,location=no,status=no');
		},

	clone : function(o) {
	    if(!o || 'object' !== typeof o) {return o;}
	    var c = '[object Array]' === Object.prototype.toString.call(o) ? [] : {};
	    var p, v;
	    for(p in o) {
	        if(o.hasOwnProperty(p)) {
	            v = o[p];
	            if(v && 'object' === typeof v) {c[p] = this.clone(v);}
	            else {c[p] = v;}
	        }
	    }
	    return c;
	},
	
	checkContainerNo : function(n){
		if(n.length!=11) return false;
		exp=/^[A-Za-z]...{4}d...{7}$/g;
		if (!exp.test(n)) return false;
		var a = new Array(11);
		var CONT_NO_MAP = {A:10,B:12,C:13,D:14,E:15,F:16,G:17,H:18,I:19,J:20,K:21,L:23,M:24,N:25,O:26,P:27,Q:28,R:29,S:30,T:31,U:32,V:34,W:35,X:36,Y:37,Z:38};
		a[0]=CONT_NO_MAP.get(n.substr(0,1));
	    a[1]=CONT_NO_MAP.get(n.substr(1,1));
	    a[2]=CONT_NO_MAP.get(n.substr(2,1));
	    a[3]=CONT_NO_MAP.get(n.substr(3,1));
	    a[4]=n.substr(4,1);
	    a[5]=n.substr(5,1);
	    a[6]=n.substr(6,1);
	    a[7]=n.substr(7,1);
	    a[8]=n.substr(8,1);
	    a[9]=n.substr(9,1);
	    a[10]=n.substr(10,1);
	    s=a[0]+a[1]*2+a[2]*4+a[3]*8+a[4]*16+a[5]*32+a[6]*64+a[7]*128+a[8]*256+a[9]*512;
	    r=s%11;
	    if(r!=a[10]) return false;
	    return true;
	},
	
	N2W : function(dValue,maxDec){
	    dValue = dValue.toString().replace(/,/g, "");  
	    dValue = dValue.replace(/^0+/, "");
	    if (dValue == "") { return "零元整"; }
	    else if (isNaN(dValue)) { return '';}   
	    var minus = "";
	    var CN_SYMBOL = "";
	    if (dValue.length > 1){
	        if (dValue.indexOf('-') == 0) { dValue = dValue.replace("-", ""); minus = "负"; }
	        if (dValue.indexOf('+') == 0) { dValue = dValue.replace("+", ""); }
	    }
	    var vInt = ""; var vDec = "";
	    var resAIW;
	    var parts;
	    var digits, radices, bigRadices, decimals;
	    var zeroCount;
	    var i, p, d;
	    var quotient, modulus;
	    var NoneDecLen = (typeof(maxDec) == "undefined" || maxDec == null || Number(maxDec) < 0 || Number(maxDec) > 5);
	    parts = dValue.split('.');
	    if (parts.length > 1)
	    {
	        vInt = parts[0]; vDec = parts[1];
	        if(NoneDecLen) { maxDec = vDec.length > 5 ? 5 : vDec.length; }
	        var rDec = Number("0." + vDec);    
	        rDec *= Math.pow(10, maxDec); rDec = Math.round(Math.abs(rDec)); rDec /= Math.pow(10, maxDec);
	        var aIntDec = rDec.toString().split('.');
	        if(Number(aIntDec[0]) == 1) { vInt = (Number(vInt) + 1).toString(); }
	        if(aIntDec.length > 1) { vDec = aIntDec[1]; } else { vDec = ""; }
	    }
	    else { vInt = dValue; vDec = ""; if(NoneDecLen) { maxDec = 0; } };
	    if(vInt.length > 44) { return "ERROR"; };
	    digits = new Array(ZERO,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE);
	    radices = new Array("",TEN,HUNDRED,THOUSAND);
	    bigRadices = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰" ,"沟", "涧", "正");
	    decimals = new Array("角", "分", "厘", "毫", "丝");
	    resAIW = "";
	    if (Number(vInt) > 0)
	    {
	        zeroCount = 0;
	        for (i = 0; i < vInt.length; i++)
	        {
	            p = vInt.length - i - 1; d = vInt.substr(i, 1); quotient = p / 4; modulus = p % 4;
	            if (d == "0") { zeroCount++; }
	            else
	            {
	                if (zeroCount > 0) { resAIW += digits[0]; }
	                zeroCount = 0; resAIW += digits[Number(d)] + radices[modulus];
	            }
	            if (modulus == 0 && zeroCount < 4) { resAIW += bigRadices[quotient]; }
	        }
	        resAIW += "元";
	    }
	    for (i = 0; i < vDec.length; i++) { d = vDec.substr(i, 1); if (d != "0") { resAIW += digits[Number(d)] + decimals[i]; } }
	    if (resAIW == "") { resAIW = "零" + "元"; }
	    if (vDec == "") { resAIW += "整"; }
	    resAIW = CN_SYMBOL + minus + resAIW;
	    return resAIW;
	},
	
	N2D : function(input){
		input=parseFloat(input).toString();
		var a=input.split('.');
		var d=a[0];
		var c=a[1];
		var s='ZERO DOLLARS';
		if(d) s=HTUtil.N2EW(d)+' DOLLARS';
		if(c) s+=' '+HTUtil.N2EW(c)+' CENTS';
		return s;
	},
	
	N2EW : function(input){
		if(!input) return '';
		input=parseInt(input).toString();
		var inputlength = input.length;	
		var d1=['','ONE ','TWO ','THREE ','FOUR ','FIVE ','SIX ','SEVEN ','EIGHT ','NINE '];
		var d2=['','','TWENTY ','THIRTY ','FORTY ','FIFTY ','SIXTY ','SEVENTY ','EIGHTY ','NINETY '];
		var d3=['TEN ','ELEVEN ','TWELVE ','THIRTEEN ','FOURTEEN ','FIFTEEN ','SIXTEEN','SEVENTEEN ','EIGHTEEN ','NINETEEN '];
		var x = 0;
		var teen1 = "";teen2 = "";teen3 = "";numName = "";invalidNum = "";
		var a1 = "";a2 = "";a3 = "";a4 = "";a5 = "";
		digit = new Array(inputlength);
		for (var i = 0; i < inputlength; i++){digit[inputlength - i] = input.charAt(i);};
		store = new Array(9);
		for (var i = 0; i < inputlength; i++) {
			x= inputlength - i;
			switch (x) {
				case x=9: store[x] = d1[digit[x]]; break;
				case x=8: if(digit[x] == "1"){teen3 = "yes";} else {teen3 = "";}; store[x]=d2[digit[x]]; break;
				case x=7: if (teen3 == "yes"){teen3 = "";store[x] = d3[digit[x]];} else {store[x] =d1[digit[x]];};break;
				case x=6: store[x] = d1[digit[x]]; break;
				case x=5: if (digit[x] == "1") {teen2 = "yes";} else {teen2 = "";}; store[x] = d2[digit[x]]; break;
				case x=4: if (teen2 == "yes") {teen2 = ""; store[x] =d3[digit[x]];}  else {store[x] =d1[digit[x]];}; break;
				case x=3: store[x] = d1[digit[x]]; break;
				case x=2: if (digit[x] == "1") {teen1 = "yes";} else {teen1 = "";};store[x] = d2[digit[x]]; break;
				case x=1: if (teen1 == "yes") {teen1 = "";store[x] =d3[digit[x]];} else {store[x] =d1[digit[x]];}; break;
			}
			switch (inputlength){
				case 1:   store[2] = ""; 
				case 2:   store[3] = ""; 
				case 3:   store[4] = ""; 
				case 4:   store[5] = "";
				case 5:   store[6] = "";
				case 6:   store[7] = "";
				case 7:   store[8] = "";
				case 8:   store[9] = "";
			}
			if (store[9] != "") { a1 ="HUNDRED ";} else {a1 = "";};
			if ((store[9] != "")||(store[8] != "")||(store[7] != "")) { a2 ="MILLION ";} else {a2 = "";};
			if (store[6] != "") { a3 ="HUNDRED ";} else {a3 = "";};
			if ((store[6] != "")||(store[5] != "")||(store[4] != "")) { a4 ="THOUSAND ";} else {a4 = "";};
			if (store[3] != ""){
				if(store[2] != "" || store[1] != "") a5 = "HUNDRED AND ";
				else a5 ="HUNDRED ";			
			} 
			else {a5 = "";};
		}	
		numName =  store[9] + a1 + store[8] + store[7] + a2 + store[6] + a3 + store[5] + store[4] + a4 + store[3] + a5 + store[2] + store[1];
		store[1] = ""; store[2] = ""; store[3] = ""; 
		store[4] = ""; store[5] = ""; store[6] = "";
		store[7] = ""; store[8] = ""; store[9] = "";
		return numName;
	},
	
	banBackSpace:function(e){     
	    var ev = e || window.event;//获取event对象     
	    var obj = ev.target || ev.srcElement;//获取事件源     
	      
	    var t = obj.type || obj.getAttribute('type');//获取事件源类型    
	      
	    //获取作为判断条件的事件类型  
	    var vReadOnly = obj.getAttribute('readonly');  
	    var vEnabled = obj.getAttribute('enabled');  
	    //处理null值情况  
	    vReadOnly = (vReadOnly == null) ? false : vReadOnly;  
	    vEnabled = (vEnabled == null) ? true : vEnabled;  
	      
	    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，  
	    //并且readonly属性为true或enabled属性为false的，则退格键失效  
	    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")   
	                && (vReadOnly==true || vEnabled!=true))?true:false;  
	     
	    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效  
	    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")  
	                ?true:false;          
	      
	    //判断  
	    if(flag2){  
	        return false;  
	    }  
	    if(flag1){     
	        return false;     
	    }     
	}  
};





