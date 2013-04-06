package com.hitisoft.fw.aop;

import java.util.List;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.jpa.BaseDomain;
import com.hitisoft.fw.orm.jpa.IdDomain;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.TimeUtil;

@Aspect
public class DaoAspect {
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext context;

	@Before("execution(* com.hitisoft.fw.orm.jpa.JpaDao.add(..)) " + "&& args(entity)")
	public void beforeAdd(IdDomain entity) throws Throwable {
		setNewField(entity);
	}

	@Before("execution(* com.hitisoft.fw.orm.jpa.JpaDao.saveByRowActionSolo(..))" + "&& args(entity)")
	public void beforeSaveByRowActionSolo(IdDomain entity) throws Throwable {
		saveByRowAction(entity);
	}

	@Before("execution(* com.hitisoft.fw.orm.jpa.JpaDao.saveByRowAction(java.util.List)) " + "&& args(entityList)")
	public void beforeSaveByRowAction(List<? extends IdDomain> entityList) throws Throwable {
		for (IdDomain entity : entityList) {
			saveByRowAction(entity);
		}
	}

	private void saveByRowAction(IdDomain entity) {
		if (entity.getRowAction() == null)
			throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
		switch (entity.getRowAction()) {
		case N:
			setNewField(entity);
			break;
		case M:
		case R:
			setModifyField(entity);
		}
	}

	private void setNewField(IdDomain idEntity) {
		if (!(idEntity instanceof BaseDomain))
			return;
		BaseDomain entity = (BaseDomain) idEntity;
		entity.setCreateBy(sessionContext.getUsername());
		entity.setCreateTime(TimeUtil.getNow());
		entity.setModifyBy(sessionContext.getUsername());
		entity.setModifyTime(TimeUtil.getNow());
		entity.setVersion(ConstUtil.FalseInt);
		entity.setRemoved(ConstUtil.FalseByte);
		entity.setCompCode(sessionContext.getCompCode());
	}

	private void setModifyField(IdDomain idEntity) {
		if (!(idEntity instanceof BaseDomain))
			return;
		BaseDomain entity = (BaseDomain) idEntity;
		entity.setModifyBy(sessionContext.getUsername());
		entity.setModifyTime(TimeUtil.getNow());
		// 如果没有设置row action, 默认是修改
		if (entity.getRowAction() == null) {
			entity.setRemoved(ConstUtil.FalseByte);
		} else {
			switch (entity.getRowAction()) {
			case R:
				entity.setRemoved(ConstUtil.TrueByte);
				break;
			default:
				entity.setRemoved(ConstUtil.FalseByte);
			}
		}
	}

	@Before("execution(* com.hitisoft.fw.orm.jpa.JpaDao.update(com.hitisoft.fw.orm.jpa.IdDomain+)) "
			+ "&& args(entity)")
	public void beforeUpdate(IdDomain entity) throws Throwable {
		setModifyField(entity);
	}

	@SuppressWarnings("unused")
	@Pointcut("execution(* com.hitisoft.fw.orm.jpa.JpaDao.find*(..)) "
			+ "|| execution(* com.hitisoft.fw.orm.jpa.JpaDao.query*(..))")
	private void entityQuery() {
	}

	@Before("entityQuery()")
	public void beforeQuery() {
		if (!context.containsKey(ConstUtil.Removed)) {
			context.put(ConstUtil.Removed, ConstUtil.FalseStr);
		}
		if(!context.containsKey(ConstUtil.CompCode)){
			context.put(ConstUtil.CompCode, sessionContext.getCompCode());
		}
		logger.debug("\n{}", context);
	}

}
