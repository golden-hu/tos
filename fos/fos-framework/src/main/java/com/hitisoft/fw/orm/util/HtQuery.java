package com.hitisoft.fw.orm.util;

import org.apache.commons.lang.builder.HashCodeBuilder;

public class HtQuery {

	public HtQuery() {
		super();
	}

	public HtQuery(String key, SqlOp op, String value) {
		super();
		this.key = key;
		this.value = value;
		this.op = op;
	}

	@Override
	public String toString() {
		return super.toString() + "[" + key + " " + op + " " + value + "]";
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof HtQuery) {
			HtQuery q = (HtQuery) obj;
			if (key.equals(q.getKey()) && op == q.getOp() && value.equals(q.getValue())) {
				return true;
			}
		}
		return super.equals(obj);
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder(17, 37).append(key).append(op).append(value).toHashCode();
	}

	private String key;
	private String value;
	private SqlOp op;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public SqlOp getOp() {
		return op;
	}

	public void setOp(SqlOp op) {
		this.op = op;
	}
}
