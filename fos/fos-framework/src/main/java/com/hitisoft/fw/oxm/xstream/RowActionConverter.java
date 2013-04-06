package com.hitisoft.fw.oxm.xstream;

import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.util.StringUtil;
import com.thoughtworks.xstream.converters.basic.AbstractSingleValueConverter;

public class RowActionConverter extends AbstractSingleValueConverter {

	@SuppressWarnings({ "rawtypes" })
	@Override
	public boolean canConvert(Class type) {
		return type == RowAction.class;
	}

	@Override
	public Object fromString(String str) {
		if (StringUtil.isBlank(str))
			return RowAction.O;
		return RowAction.valueOf(str);
	}

	@Override
	public String toString(Object o) {
		if (o instanceof RowAction) {
			RowAction row = (RowAction) o;
			if (row != RowAction.O)
				return row.name();
		}
		return "";
	}

}
