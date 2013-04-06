package com.hitisoft.fw.orm.jpa;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fw.orm.TempUser;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@TransactionConfiguration(defaultRollback = false)
@Transactional
public class DbDefaultValueTest {
	@Autowired
	UserDao dao;

	@Before
	public void prepareTable() {
		dao.getJpaTemplate().execute(new JpaCallback<TempUser>() {
			@Override
			public TempUser doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createNativeQuery("create table if not exists user ("
						+ "id integer AUTO_INCREMENT primary key, "
						+ "name varchar(32) not null default 'a', "
						+ "no integer not null default '1', "
						+ "create_by varchar(32) not null default 'a', "
						+ "create_time timestamp not null default now(), "
						+ "modify_by varchar(32) not null default 'a', "
						+ "modify_time timestamp not null default now(), "
						+ "uuid integer not null default '0', "
						+ "removed integer not null default '0', "
						+ "version integer not null default '1') ");
				query.executeUpdate();
				return null;
			}
		});
	}

	@After
	public void clearTable(){
		dao.getJpaTemplate().execute(new JpaCallback<TempUser>() {
			@Override
			public TempUser doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createNativeQuery("truncate table user");
				query.executeUpdate();
				return null;
			}
		});
		
	}
	
	@Test
	public void testDefaultValue() {
		TempUser user = new TempUser();
		dao.add(user);
		Assert.assertNotNull(user.getId());
		Assert.assertEquals(Integer.valueOf(1), user.getNo());
		Assert.assertEquals("a", user.getName());
	}

}
