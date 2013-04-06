package com.hitisoft.fw.util;

import java.util.Locale;

public class ConstUtil {
	public static final String FalseStr = "0";
	public static final String TrueStr = "1";
	public static final Byte FalseByte = new Byte(FalseStr);
	public static final Byte TrueByte = new Byte(TrueStr);
	public static final Short FalseShort = new Short(FalseStr);
	public static final Short TrueShort = new Short(TrueStr);
	public static final Integer FalseInt = new Integer(FalseStr);
	public static final Integer TrueInt = new Integer(TrueStr);
	
	public static final String COMMA = ",";
	public static final String DIR_SEP = "/";
	public static final String Removed = "removed";
	public static final String CompCode = "compCode";
	public static final String XML = "xml";
	public static final String JSON = "json";
	
	public static final String ENCODING_UTF8 = "UTF-8";
	public static final Locale LOCALE_DEFAULT = Locale.CHINA;
	public static final String LINE_SEPARATOR = System.getProperty("line.separator");
	
	public static final String STRING_SHARP = "#";
	public static final String STRING_DOT = ".";
	public static final String STRING_PERCENT = "%";
	public static final String STRING_UNDERLINE = "_";
	public static final String STRING_DASH = "-";
	public static final String STRING_COLON = ":";
	public static final String STRING_LEFT_BRACE = "{";
	public static final String STRING_RIGHT_BRACE = "}";
	public static final String STRING_RETURN_WIN = "\r\n";
	public static final String STRING_RETURN_UNIX = "\n";
	
	public static String getUUID(){
		//Random r = new Random();
		String[] chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		String uuids = ""; 
		String  uuid="";
		for (int i=0;i<32;i++){
			uuids=chars[(int) (Math.random()*chars.length)];
			uuid+=uuids;
		}
		return uuid;
	}
	
}
