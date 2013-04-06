package com.hitisoft.fw.oxm.xstream;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.SqlOp;
import com.hitisoft.fw.util.ConstUtil;
import com.thoughtworks.xstream.XStream;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration

public class SqlOpTest {
	@Test
	public void testSqlOp(){
		XStream xstream = new XStream();
		xstream.registerConverter(new SqlOpConverter());
		xstream.alias("HtQuery", HtQuery.class);
		String xml = "<HtQuery><key>id</key><op>1</op><value>a</value></HtQuery>";
		Object o = xstream.fromXML(xml);
		Assert.assertEquals(((HtQuery)o).getOp(), SqlOp.equal);
		
		System.out.println(xstream.toXML(o));
	}
	@Test
	public void testQuery(){
		HtQuery removed = new HtQuery(ConstUtil.Removed, SqlOp.equal, ConstUtil.FalseStr);
		HtQuery removed2 = new HtQuery(ConstUtil.Removed, SqlOp.equal, ConstUtil.FalseStr);
		
		Assert.assertEquals(removed, removed2);
	}

}
