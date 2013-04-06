package com.hitisoft.fw.oxm.xstream;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.oxm.XmlMappingException;
import org.springframework.oxm.xstream.XStreamMarshaller;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hitisoft.fw.orm.TempUser;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.json.JettisonMappedXmlDriver;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class XstreamConverterTest {
	@Autowired
	XStreamMarshaller marshaller;
	TempUser user = null;
	String xml;
	String json;
	@Test
	public void testXstreamInt() {
		XStream xstream = new XStream();
		xstream.alias("user", TempUser.class);
		Object obj = xstream.fromXML("<user><id>14</id></user>");
		TempUser user = (TempUser) obj;
		Assert.assertEquals(user.getId(), Long.valueOf(14));
		Assert.assertEquals(user.getName(), null);
		Assert.assertEquals(user.getNo(), null);
	}
	@Test
	public void testXstreamBean() {
		XStream xstream = new XStream();
		xstream.alias("user", TempUser.class);
		xstream.registerConverter(new HtBeanConverter(xstream.getMapper()),-10);
		TempUser user = new TempUser();
		user.setId(1L);
		user.setName("aa");
		List<TempUser> list = new ArrayList<TempUser>();
		list.add(user);
		System.out.println(xstream.toXML(list));
	}

	@SuppressWarnings({ "rawtypes" })
	@Before
	public void setup() throws ClassNotFoundException{
		marshaller = new XStreamMarshaller();
		Map<String, Class> map = new HashMap<String, Class>();
		map.put("user", TempUser.class);
		marshaller.setAliases(map);	
		
		user = new TempUser();
		user.setId(1L);
		user.setName("guo");
		user.setNo(2);
		
		xml = "<user><id>1</id><name>guo</name><no>2</no></user>";
		json = "{\"user\":{\"id\":1,\"name\":\"guo\",\"no\":2}}";
	}
	
	@Test
	public void testXmlMarshaller() throws ClassNotFoundException,
			XmlMappingException, IOException {
		StringWriter sw = new StringWriter();
		marshaller.marshal(user, new StreamResult(sw));
//		System.out.println(sw.toString());
		Assert.assertEquals(xml, sw.toString());
	}

	@Test
	public void testXmlUnmarshaller() throws ClassNotFoundException,
			XmlMappingException, IOException {
		Source source = new StreamSource(new StringReader(xml));
		Object obj = marshaller.unmarshal(source);
		TempUser user = (TempUser) obj;
		
		Assert.assertEquals(this.user, user);
	}

	@Test
	public void testJsonMarshaller() throws ClassNotFoundException,
			XmlMappingException, IOException {
		StringWriter sw = new StringWriter();
		marshaller.setStreamDriver(new JettisonMappedXmlDriver());
		marshaller.marshal(user, new StreamResult(sw));
//		System.out.println(sw.toString());
		Assert.assertEquals(json, sw.toString());
	}

	@Test
	public void testJsonUnmarshaller() throws ClassNotFoundException,
			XmlMappingException, IOException {
		marshaller.setStreamDriver(new JettisonMappedXmlDriver());

		Source source = new StreamSource(new StringReader(json));
		Object obj = marshaller.unmarshal(source);
		TempUser user = (TempUser) obj;
		
		Assert.assertEquals(this.user, user);
	}

}
