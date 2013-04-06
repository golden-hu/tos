/**
 * 
 */
package com.hitisoft.fw.web;

import java.util.ArrayList;
import java.util.List;

/**
 * @author guo
 * 
 */
public class HtResponse {
	private String code;
	private String msg;
	private Boolean success;
	private String rowCount;
	private List<Object> data = new ArrayList<Object>();

	public List<Object> getData() {
		return data;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getRowCount() {
		return rowCount;
	}

	public void setRowCount(String rowCount) {
		this.rowCount = rowCount;
	}
}
