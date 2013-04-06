package com.hitisoft.fw.util;

public class ObjectUtil {
	public static boolean isEqual(Object a, Object b) {
		return a == null ? b == null : a.equals(b);
	}

	public static boolean isNotEqual(Object a, Object b) {
		return !isEqual(a, b);
	}
	
	public static String null2EmptyString(Object obj){
		if(obj == null) return "";
		return "" + obj;
	}
}
