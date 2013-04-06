package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PMessageTopicDao;
import com.hitisoft.fos.sys.entity.PMessageTopic;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PMessageTopicDaoImpl extends JpaDao<PMessageTopic, Long> implements PMessageTopicDao {
	public PMessageTopicDaoImpl() {
		super(PMessageTopic.class);
	}
}
