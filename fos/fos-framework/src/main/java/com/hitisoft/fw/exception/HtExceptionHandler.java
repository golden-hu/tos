package com.hitisoft.fw.exception;

import java.sql.SQLException;

import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.NestedRuntimeException;
import org.springframework.orm.jpa.JpaOptimisticLockingFailureException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Component;

import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.web.HtResponse;
import com.mysql.jdbc.MysqlDataTruncation;

@Component
public class HtExceptionHandler {
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	MessageMapper messageMapper;

	public HtResponse doHandler(Exception e) {
		HtResponse htResponse = new HtResponse();
		Messageable code = null;
		String msg = "";
		Throwable t = e;
		if (contains(BusinessException.class, e)) { 
			BusinessException ex = getTypeException(BusinessException.class, e);
			code = ex.getCode();
			msg = ex.getBusinessMessage();
			t = ex;
		} else if (contains(JpaOptimisticLockingFailureException.class, e)) {
			JpaOptimisticLockingFailureException ex = getTypeException(
					JpaOptimisticLockingFailureException.class, e);
			code = ExceptionEnum.DB_OPTIMISTIC_LOCK;
			t = ex;
		} else if (contains(MysqlDataTruncation.class, e)) {
			MysqlDataTruncation ex = getTypeException(MysqlDataTruncation.class, e);
			code = ExceptionEnum.DB_DATA_TRUNCATION;
			msg = ex.getMessage();
			t = ex;
		} else if (contains(ConstraintViolationException.class, e)) {
			SQLException ex = getTypeException(SQLException.class, e);
			code = ExceptionEnum.DB_CONSTRAINT_VIOLATION;
			msg = ex.getMessage();
			t = ex;
		} else if (contains(SQLException.class, e)) {
			SQLException ex = getTypeException(SQLException.class, e);
			code = ExceptionEnum.DB_UNKNOWN_ERROR;
			msg = ex.getMessage();
			t = ex;
		} else if (contains(JpaSystemException.class, e)) {
			JpaSystemException ex = getTypeException(JpaSystemException.class, e);
			code = ExceptionEnum.DB_UNKNOWN_ERROR;
			t = ex;
		} else {
			code = ExceptionEnum.FW_UNKNOWN_ERROR;
		}
		logger.error(msg, t);
		htResponse.setCode(code.get());
		if (!(t instanceof BusinessException)) {
			if (StringUtil.isNotBlank(msg))
				msg = messageMapper.getMessage(code) + ": " + msg;
			else
				msg = messageMapper.getMessage(code);
		}
		htResponse.setMsg(msg);
		return htResponse;
	}

	public boolean contains(Class<? extends Throwable> exType, Throwable ex) {
		if (exType == null) {
			return false;
		}
		if (exType.isInstance(ex)) {
			return true;
		}
		Throwable cause = ex.getCause();
		if (cause == ex) {
			return false;
		}
		if (cause instanceof NestedRuntimeException) {
			return ((NestedRuntimeException) cause).contains(exType);
		} else {
			while (cause != null) {
				if (exType.isInstance(cause)) {
					return true;
				}
				if (cause.getCause() == cause) {
					break;
				}
				cause = cause.getCause();
			}
			return false;
		}
	}

	@SuppressWarnings("unchecked")
	public <T> T getTypeException(Class<? extends Throwable> exType, Throwable ex) {
		if (exType == null || exType.isInstance(ex)) {
			return (T) ex;
		}
		Throwable cause = ex.getCause();
		if (cause == ex) {
			return (T) ex;
		}
		while (cause != null) {
			if (exType.isInstance(cause)) {
				return (T) cause;
			}
			if (cause.getCause() == cause) {
				break;
			}
			cause = cause.getCause();
		}
		return (T) cause;
	}
}