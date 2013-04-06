package com.hitisoft.fw.exception;


public enum AnotherExceptionMessage implements Messageable{
	FW_ERROR("fw.error"),
	
	;
	private String key;

	AnotherExceptionMessage(String s) {
		this.key = s;
	}

	public String get() {
		return key;
	}

}
