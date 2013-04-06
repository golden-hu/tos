package com.hitisoft.fos.sys.dao;

import java.util.List;

import com.hitisoft.fos.sys.entity.PMessage;
import com.hitisoft.fw.orm.jpa.BaseDao;

public interface PMessageDao extends BaseDao<PMessage, Long> {

	PMessage updateSendFlag(PMessage entity);

	List<PMessage> queryOwn();
}
