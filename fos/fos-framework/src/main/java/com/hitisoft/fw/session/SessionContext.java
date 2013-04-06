package com.hitisoft.fw.session;

import java.io.Serializable;

public class SessionContext implements Serializable {
	private static final long serialVersionUID = 1483061965332043568L;
	private String hostname;
	private Long userid;
	private String username;
	private String compCode;

	public String getHostname() {
		return hostname;
	}

	public void setHostname(String hostname) {
		this.hostname = hostname;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCompCode() {
		return compCode;
	}

	public void setCompCode(String compCode) {
		this.compCode = compCode;
	}

}
