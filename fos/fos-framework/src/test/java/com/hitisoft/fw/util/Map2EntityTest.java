package com.hitisoft.fw.util;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import com.hitisoft.fw.orm.TempUser;

public class Map2EntityTest {
	Map<String, String> map;
	TempUser user;

	@Before
	public void setUp() throws Exception {
		map = new HashMap<String, String>();
		map.put("name", "guo");
		map.put("no", "1");
		user = new TempUser();
	}

	@Test
	public void testToEntity() {
		user = Map2Entity.toEntity(map, user);
		assertEquals("guo", user.getName());
		assertEquals(Integer.valueOf(1), user.getNo());
	}

}
