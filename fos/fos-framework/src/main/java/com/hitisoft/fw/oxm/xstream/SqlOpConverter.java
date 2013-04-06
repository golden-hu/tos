package com.hitisoft.fw.oxm.xstream;

import com.hitisoft.fw.orm.util.SqlOp;
import com.thoughtworks.xstream.converters.basic.AbstractSingleValueConverter;

public class SqlOpConverter extends AbstractSingleValueConverter {

	@SuppressWarnings({ "rawtypes" })
	@Override
	public boolean canConvert(Class type) {
		return type == SqlOp.class;
	}

	@Override
	public Object fromString(String str) {
		return SqlOp.parseOp(str);
	}

	@Override
	public String toString(Object obj) {
		if (obj instanceof SqlOp) {
			SqlOp op = (SqlOp) obj;
			return "" + op.getKey();
		}
		return super.toString(obj);
	}
}
