package com.hitisoft.fos.tran.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.tran.dao.TOilCardTransactionDao;
import com.hitisoft.fos.tran.entity.TOilCardTransaction;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class TOilCardTransactionDaoImpl extends JpaDao<TOilCardTransaction, Long> implements TOilCardTransactionDao {
	public TOilCardTransactionDaoImpl() {
		super(TOilCardTransaction.class);
	}
}
