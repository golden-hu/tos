package com.hitisoft.fos.sys.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.sys.dao.CContractDao;
import com.hitisoft.fos.sys.dao.CCustomerContactDao;
import com.hitisoft.fos.sys.dao.CCustomerDao;
import com.hitisoft.fos.sys.entity.CContract;
import com.hitisoft.fos.sys.entity.CCustomer;
import com.hitisoft.fos.sys.entity.CCustomerContact;
import com.hitisoft.fos.wms.entity.WStorageNote;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class CContractService {
	@Autowired
	private CContractDao dao;
	
	@Autowired
	private RequestContext requestContext;

	/**Action : CCONTRACT_Q<p>
	 * 出（入）库单查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<CContract> query() {
		return dao.findByProperties();
	}
	
}
