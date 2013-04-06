package com.hitisoft.fw.session;

/**
 * requestContext中框架的变量.
 * <p>
 * _A 服务名<br>
 * _mt 消息格式(xml/json/html,默认html)<br>
 * _uf 上传文件(upload file)<br>
 * rowCount 本次查询返回的记录数<br>
 * start 本次查询从第几条记录开始查<br>
 * limit 本次查询最多返回记录数<br>
 * orderby 排序字段<br>
 * dir 排序方式(asc/desc)<br>
 * htRequest 请求内容<br>
 * htStatus 返回的业务状态
 * 
 * @author guo
 * 
 */
public enum ContextKey {
	actionName("_A"), messageType("_mt"), uploadFile("_uf"), rowCount("rowCount"), start("start"), limit(
			"limit"), orderby("sort"), orderdir("dir"), htRequest("htRequest"), htStatus("htStatus"),redirectUrl(
			"reurl"), complexQuery("xml") ;

	private String key;

	ContextKey(String s) {
		this.key = s;
	}

	public String get() {
		return key;
	}
}
