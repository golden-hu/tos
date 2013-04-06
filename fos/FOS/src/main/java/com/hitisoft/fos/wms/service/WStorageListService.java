package com.hitisoft.fos.wms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hitisoft.fos.wms.dao.WCargoDao;
import com.hitisoft.fos.wms.dao.WStorageNoteCargoDao;
import com.hitisoft.fos.wms.entity.WCargo;
import com.hitisoft.fos.wms.entity.WStorageNoteCargo;
import com.hitisoft.fw.orm.util.HtQuery;

@Service
public class WStorageListService {
	@Autowired
	private WStorageNoteCargoDao dao;
	
	/**Action : WSTORAGE_NOTE_CARGO_S<p>
	 * 出（入）库单商品保存
	 * @param entityList
	 * @return
	 */
	@Transactional
	public List<WStorageNoteCargo> save(List<WStorageNoteCargo> entityList) {
		return dao.saveByRowAction(entityList);
	}

	/**Action : WSTORAGE_NOTE_CARGO_Q<p>
	 * 出（入）库单商品查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<WStorageNoteCargo> query() {
		return dao.findByProperties();
	}
	/**
	 * 出（入）库单商品复杂查询
	 * @param conditions
	 * @return
	 */
	public List<WStorageNoteCargo> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}
}
