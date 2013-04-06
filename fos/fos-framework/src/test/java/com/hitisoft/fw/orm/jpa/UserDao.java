package com.hitisoft.fw.orm.jpa;

import org.springframework.stereotype.Repository;

import com.hitisoft.fw.orm.TempUser;

@Repository
public class UserDao extends JpaDao<TempUser, Integer> {

	public UserDao() {
		super(TempUser.class);
	}

}
