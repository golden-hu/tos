package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TOilCardDao;
import com.hitisoft.fos.tran.entity.TOilCard;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TOilCardDaoImpl extends JpaDao<TOilCard, Long> implements TOilCardDao {
	public TOilCardDaoImpl() {
		super(TOilCard.class);
	}
}
