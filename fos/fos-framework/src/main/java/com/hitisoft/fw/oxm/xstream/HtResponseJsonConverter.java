package com.hitisoft.fw.oxm.xstream;

import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.web.HtResponse;
import com.hitisoft.fw.web.HtStatus;
import com.thoughtworks.xstream.converters.Converter;
import com.thoughtworks.xstream.converters.MarshallingContext;
import com.thoughtworks.xstream.converters.UnmarshallingContext;
import com.thoughtworks.xstream.io.HierarchicalStreamReader;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;

public class HtResponseJsonConverter implements Converter {

	@SuppressWarnings({ "rawtypes" })
	@Override
	public boolean canConvert(Class type) {
		return type == HtResponse.class;
	}

	@Override
	public void marshal(Object source, HierarchicalStreamWriter writer, MarshallingContext context) {
		HtResponse response = (HtResponse) source;
		writer.startNode("code");
		writer.setValue(response.getCode());
		writer.endNode();
		writer.startNode("msg");
		writer.setValue(response.getMsg());
		writer.endNode();
		if (StringUtil.isNotBlank(response.getRowCount())) {
			writer.startNode("rowCount");
			writer.setValue(response.getRowCount());
			writer.endNode();
		}
		if (response.getSuccess() != null) {
			writer.startNode("success");
			writer.setValue(response.getSuccess().booleanValue() ? "true" : "false");
			writer.endNode();
		}
		// 把htStatus[]改为htStatus
		if (response.getData() != null && response.getData().size() > 0) {
			for (Object obj : response.getData()) {
				if (obj instanceof HtStatus) {
					writer.startNode("htStatus");
					context.convertAnother(obj, new HtStatusConverter());
					writer.endNode();
					response.getData().remove(obj);
					break;
				}
			}
		}
		if (response.getData() != null && response.getData().size() > 0) {
			context.convertAnother(response.getData());
		}
	}

	@Override
	public Object unmarshal(HierarchicalStreamReader reader, UnmarshallingContext context) {
		return null;
	}

}
