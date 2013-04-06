package com.hitisoft.fw.oxm.xstream;

import org.junit.Test;

import com.hitisoft.fw.web.HtStatus;
import com.thoughtworks.xstream.XStream;

public class HtStatusTest {
	@Test
	public void testMap() throws InstantiationException, IllegalAccessException {
		XStream xstream = new XStream();
		xstream.alias("htStatus", HtStatus.class);
		xstream.registerConverter(new HtStatusConverter());
		HtStatus status = new HtStatus();
		status.put("code", "success");
		status.put("msg", "信息");
		String xml = xstream.toXML(status);
		System.out.println(xml);
	}

}
