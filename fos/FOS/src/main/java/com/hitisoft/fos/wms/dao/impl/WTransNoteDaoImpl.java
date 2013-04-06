package com.hitisoft.fos.wms.dao.impl;

import org.springframework.stereotype.Repository;

import com.hitisoft.fos.wms.dao.WTransNoteDao;
import com.hitisoft.fos.wms.entity.WTransNote;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class WTransNoteDaoImpl extends JpaDao<WTransNote, Long> implements WTransNoteDao {
	public WTransNoteDaoImpl() {
		super(WTransNote.class);
	}
}
