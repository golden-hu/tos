package com.hitisoft.fw.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class DummyServiceLoader implements ActionLoader {

	@Override
	public List<Action> getAll() {
		List<Action> list = new ArrayList<Action>();
		Action act = new Action();
		act.setId(1L);
		act.setCode("test");
		act.setServiceName("dummyService");
		act.setMethod("hello");
		list.add(act);
		return list;
	}

}
