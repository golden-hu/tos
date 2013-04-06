package com.hitisoft.fw.util;

import java.io.FileInputStream;
import java.util.Properties;

import org.junit.Before;
import org.junit.Test;

import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.CryptoUtil;

public class TestLicense {

	@Before
	public void setUp() throws Exception {
	}

	public long generateExpire() {
		long d = 365L;
		long now = System.currentTimeMillis();
		long expire = now + d * 24 * 60 * 60 * 1000;
		return expire;
	}

	@Test
	public void generateTest() throws Exception {
		Properties licenseProps = new Properties();
		licenseProps.load(new FileInputStream("D:/license"));
		String licenseCompany = licenseProps.getProperty("Company");
		String licenseIp = licenseProps.getProperty("IP");
		String licenseMac = licenseProps.getProperty("MAC");
		String licenseUsers = licenseProps.getProperty("Users");
		String key = licenseCompany + ConstUtil.COMMA + licenseIp + ConstUtil.COMMA + licenseMac
				+ ConstUtil.COMMA + licenseUsers + ConstUtil.COMMA + generateExpire() + ConstUtil.COMMA
				+ Long.MAX_VALUE;
		System.out.println(key);
		key = CryptoUtil.MD5Encode(key);
		System.out.println(key);
	}
}
