package com.hitisoft.fw.oxm.xstream;

import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.JpaEntityMapper;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.MessageType;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.web.HtRequest;
import com.hitisoft.fw.web.HtResponse;
import com.hitisoft.fw.web.HtStatus;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.converters.basic.BooleanConverter;
import com.thoughtworks.xstream.io.json.JettisonMappedXmlDriver;
import com.thoughtworks.xstream.io.xml.XppDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.oxm.xstream.XStreamMarshaller;

import java.util.Map;

public class XstreamMarshaller extends XStreamMarshaller {
	@Autowired
	private RequestContext context;
	@Autowired
	private JpaEntityMapper jpaEntityMapper;
	private String messageType;

	/**
	 * 根据配置中支持的message type, 决定是处理格式xml还是json 默认是xml
	 */
	@Override
	protected void customizeXStream(XStream xstream) {
		if (MessageType.xml.name().equals(messageType)) {
            setStreamDriver(new XppDriver());
        } else {
            setStreamDriver(new JettisonMappedXmlDriver());
		}
		alias(xstream);
	}

	/**
	 * 根据RequestParamMap中, 前台传过来的Message Type和自己支持的message type比较, 决定是否处理
	 */
	@SuppressWarnings({ "rawtypes" })
	@Override
	public boolean supports(Class clazz) {
		return messageType.equals(context.get(ContextKey.messageType.get()));
	}

	private void alias(XStream xstream) {
		Map<String, Class<?>> classMap = jpaEntityMapper.getMapper();
		for (Map.Entry<String, Class<?>> entry : classMap.entrySet()) {
			xstream.alias(entry.getKey(), entry.getValue());
		}
		xstream.setMode(XStream.NO_REFERENCES);
		xstream.alias("HtRequest", HtRequest.class);
		xstream.alias("HtResponse", HtResponse.class);
		xstream.alias("htStatus", HtStatus.class);
		xstream.alias("HtQuery", HtQuery.class);
		xstream.alias("date", java.sql.Date.class);
		xstream.alias("date", java.sql.Time.class);
		xstream.alias("date", java.sql.Timestamp.class);
		xstream.registerConverter(new HtDateConverter());
		xstream.registerConverter(new HtTimeConverter());
		xstream.registerConverter(new HtDoubleConverter());
		xstream.registerConverter(new BooleanConverter());
		xstream.registerConverter(new RowActionConverter());
		xstream.registerConverter(new SqlOpConverter());
		xstream.registerConverter(new HtStatusConverter());
//		xstream.registerConverter(new HtBeanConverter(xstream.getMapper()), -10);
		xstream.addImplicitCollection(HtRequest.class, "data");
		if (MessageType.xml.name().equals(messageType)) {
			xstream.addImplicitCollection(HtResponse.class, "data");
		}else{
			xstream.registerConverter(new HtResponseJsonConverter());
		}
	}

	public String getMessageType() {
		return messageType;
	}

	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}

}
