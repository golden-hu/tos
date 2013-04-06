package com.hitisoft.fw.exception;

import java.io.IOException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class ExceptionTest {
	Logger logger = LoggerFactory.getLogger(this.getClass());
	@Test
	public void testMessage(){
		try{
			throwException();
		}catch (BusinessException e) {
			logger.debug(e.getBusinessMessage(), e);
		}
	}
	
	public void throwException(){
		try {
			ioException();
		} catch (IOException e) {
			throw new BusinessException(AnotherExceptionMessage.FW_ERROR, e, "abc", "参数2");
		}
	}
	
	public void ioException() throws IOException{
		throw new IOException(" this is from ioexception");
	}
}
