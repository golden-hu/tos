/*
 * Copyright (C) 2003, 2004 Joe Walnes.
 * Copyright (C) 2006, 2007 XStream Committers.
 * All rights reserved.
 *
 * The software in this package is published under the terms of the BSD
 * style license a copy of which has been included with this distribution in
 * the LICENSE.txt file.
 * 
 * Created on 26. September 2003 by Joe Walnes
 */
package com.hitisoft.fw.oxm.xstream;


import com.hitisoft.fw.util.NumberUtil;
import com.thoughtworks.xstream.converters.basic.AbstractSingleValueConverter;

/**
 * Converts a double primitive or java.lang.Double wrapper to
 * a String.
 *
 * @author Joe Walnes
 */
public class HtDoubleConverter extends AbstractSingleValueConverter {

	@SuppressWarnings({ "rawtypes" })
	public boolean canConvert(Class type) {
        return type.equals(double.class) || type.equals(Double.class);
    }

    public Object fromString(String str) {
        return Double.valueOf(str);
    }

	@Override
	public String toString(Object obj) {
		if (obj instanceof Double) {
			Double num = (Double) obj;
			return NumberUtil.numberFormat4(num);			
		}
		return super.toString();
	}

}
