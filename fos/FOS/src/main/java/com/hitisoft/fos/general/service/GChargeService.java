package com.hitisoft.fos.general.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.service.SExpenseService;
import com.hitisoft.fos.general.dao.GChargeDao;
import com.hitisoft.fos.general.entity.GCharge;
import com.hitisoft.fos.sys.entity.PUserExpePermission;
import com.hitisoft.fos.sys.service.PCompanyConfigService;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;

@Service
public class GChargeService {
	@Autowired
	private GChargeDao dao;
	@Autowired
	private PCompanyConfigService companyConfigService;
	@Autowired
	private SExpenseService expenseService;
	@Autowired
	private RequestContext requestContext;

	@Transactional
	public List<GCharge> save(List<GCharge> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<GCharge> query() {
		return dao.findByProperties();
	}

	public List<GCharge> complexQuery(List<HtQuery> conditions) {
		return dao.query(conditions);
	}

	@Transactional(readOnly = true)
	public List<GCharge> queryChargeCommission() {
		List<GCharge> retList = new ArrayList<GCharge>();
		String commissionCNY = companyConfigService.queryByCode("COMMISSION_CHAR_CNY");
		String commissionUSD = companyConfigService.queryByCode("COMMISSION_CHAR_USD");
		if (StringUtil.isNotBlank(commissionUSD)) {
			GCharge usd = dao.findById(Long.parseLong(commissionUSD));
			if (usd != null) {
				retList.add(usd);
			}
		}
		if (StringUtil.isNotBlank(commissionCNY)) {
			GCharge cny = dao.findById(Long.parseLong(commissionCNY));
			if (cny != null) {
				retList.add(cny);
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<GCharge> queryChargeFilted() {
		String expeType = requestContext.get("expeType");
		List<GCharge> retList = new ArrayList<GCharge>();
		List<GCharge> oriList = (List<GCharge>) query();
		Map<String, PUserExpePermission> permMap = expenseService.getExpePermissionMap();
		String key = expeType + Constants.USEP_CHCL_ALL;
		if (permMap.containsKey(key) && isEdit(permMap.get(key))) {
			retList.addAll(oriList);
		} else {
			for (GCharge charge : oriList) {
				key = expeType + charge.getChclId();
				if (permMap.containsKey(key) && isEdit(permMap.get(key))) {
					retList.add(charge);
				}
			}
		}
		return retList;
	}

	private boolean isEdit(PUserExpePermission perm) {
		return ConstUtil.TrueByte.equals(perm.getUsepEditable()) || ConstUtil.TrueByte.equals(perm.getUsepEditAll());
	}
}
