package com.hitisoft.fw.oxm.xstream;

import java.util.Map;

import com.hitisoft.fw.web.HtStatus;
import com.thoughtworks.xstream.converters.Converter;
import com.thoughtworks.xstream.converters.MarshallingContext;
import com.thoughtworks.xstream.converters.UnmarshallingContext;
import com.thoughtworks.xstream.io.HierarchicalStreamReader;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;

public class HtStatusConverter implements Converter {

	@SuppressWarnings({ "rawtypes" })
	@Override
	public boolean canConvert(Class type) {
		return type.equals(HtStatus.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public void marshal(Object source, HierarchicalStreamWriter writer, MarshallingContext context) {
		Map<String, Object> map = (Map<String, Object>) source;
		for (Map.Entry<String, Object> entry : map.entrySet()) {
			writer.startNode(entry.getKey());
			writer.setValue(entry.getValue().toString());
			writer.endNode();
		}
	}

	@Override
	public Object unmarshal(HierarchicalStreamReader reader, UnmarshallingContext context) {
		return null;
	}

}
