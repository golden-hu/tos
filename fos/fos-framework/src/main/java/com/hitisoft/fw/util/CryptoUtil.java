package com.hitisoft.fw.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;

public class CryptoUtil {

	private final static String[] hexDigits = { "0", "1", "2", "3", "4", "5",
			"6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };

	private static String byteArrayToHexString(byte[] b) {
		StringBuffer resultSb = new StringBuffer();
		for (int i = 0; i < b.length; i++) {
			resultSb.append(byteToHexString(b[i]));
		}
		return resultSb.toString();
	}

	private static String byteToHexString(byte b) {
		int n = b;
		if (n < 0)
			n = 256 + n;
		int d1 = n / 16;
		int d2 = n % 16;
		return hexDigits[d1] + hexDigits[d2];
	}

	public static String MD5Encode(String origin) {
		String resultString = null;
		try {
			resultString = MD5Encode(origin.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			throw new BusinessException(ExceptionEnum.FW_ENCODING_NOT_SUPPORT, e);
		}
		return resultString;
	}

	public static String MD5Encode(byte[] origin) {
		String resultString = null;
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			resultString = byteArrayToHexString(md.digest(origin));
		} catch (NoSuchAlgorithmException e) {
			throw new BusinessException(ExceptionEnum.FW_MD5_ALGORITHM_NOT_FOUND, e);
		}
		return resultString;
	}

	public static void main(String[] args) {
		String strTest = "abcd";
		String strTest4 = MD5Encode(strTest);
		System.out.println(strTest4);
	}

}
