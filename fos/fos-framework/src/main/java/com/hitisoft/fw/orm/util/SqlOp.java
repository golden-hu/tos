package com.hitisoft.fw.orm.util;

public enum SqlOp {
	equal(1, "="), less(2, "<"), lessEqual(3, "<="), more(4, ">"), moreEqual(5, ">="), notEqual(6,
			"!="), like(7, "like"), in(8, "in"), notLike(9, "not like"), notIn(10, "not in");
	private int key;
	private String value;

	SqlOp(int key, String value) {
		this.key = key;
		this.value = value;
	}

	public int getKey() {
		return key;
	}

	public String getValue() {
		return value;
	}

	public static SqlOp parseOp(String s) {
		return parseOp(Integer.parseInt(s));
	}

	public static SqlOp parseOp(int key) {
		for (SqlOp op : SqlOp.values()) {
			if (key == op.getKey())
				return op;
		}
		return null;
	}
}
