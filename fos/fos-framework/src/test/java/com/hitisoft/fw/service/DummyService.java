package com.hitisoft.fw.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hitisoft.fw.session.RequestContext;

@Service
public class DummyService {
	
	@Autowired
	RequestContext context;
	
	public String hello(){
		System.out.println("say hello from hello");
		System.out.println(context.get("msg"));
		return "hello world!测试成功!";
	}
}
