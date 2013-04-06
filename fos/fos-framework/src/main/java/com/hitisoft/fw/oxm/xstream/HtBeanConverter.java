package com.hitisoft.fw.oxm.xstream;

import com.hitisoft.fw.orm.jpa.BaseDomain;
import com.thoughtworks.xstream.converters.javabean.JavaBeanConverter;
import com.thoughtworks.xstream.mapper.Mapper;

public class HtBeanConverter extends JavaBeanConverter{

	public HtBeanConverter(Mapper mapper) {
		super(mapper);
	}
	
	@SuppressWarnings({ "rawtypes" })
	@Override
	public boolean canConvert(Class type) {
		return type.getSuperclass().equals(BaseDomain.class);
	}
	
}
