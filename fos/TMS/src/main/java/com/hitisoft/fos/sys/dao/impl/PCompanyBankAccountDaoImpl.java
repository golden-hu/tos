package com.hitisoft.fos.sys.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.PCompanyBankAccountDao;
import com.hitisoft.fos.sys.entity.PCompanyBankAccount;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class PCompanyBankAccountDaoImpl extends JpaDao<PCompanyBankAccount, Long> implements PCompanyBankAccountDao {
	public PCompanyBankAccountDaoImpl() {
		super(PCompanyBankAccount.class);
	}
}
