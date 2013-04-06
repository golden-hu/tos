package com.hitisoft.fos.tran.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.ffse.dao.SExpenseDao;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.dao.TTransTaskDao;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;

@Service
public class TCommonService {
	@Autowired
	private TConsignDao dao;
	@Autowired
	private TTransTaskDao taskDao;
	@Autowired
	private SExpenseDao expenseDao;
	@Autowired
	private RequestContext requestContext;

	@SuppressWarnings("rawtypes")
	private void checkMergeStatistics(List<TConsign> retList, List objList) {
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				TConsign consign = (TConsign) objArray[0];
				// TRansportVirtual tr=new TRansportVirtual();
				// tr.setId(consign.getId());

				BigDecimal r = (BigDecimal) objArray[1];
				BigDecimal p = (BigDecimal) objArray[2];
				if (r == null)
					r = new BigDecimal(0);
				if (p == null)
					p = new BigDecimal(0);
				consign.setSumR(r.doubleValue());
				consign.setSumP(p.doubleValue());
				BigDecimal grossProfit = r.subtract(p);
				consign.setGrossProfit(grossProfit.doubleValue());

				BigDecimal sumRUsd = (BigDecimal) objArray[3];
				if (sumRUsd == null)
					sumRUsd = new BigDecimal(0);
				consign.setSumRUsd(sumRUsd.doubleValue());

				BigDecimal sumRCny = (BigDecimal) objArray[4];
				if (sumRCny == null)
					sumRCny = new BigDecimal(0);
				consign.setSumRCny(sumRCny.doubleValue());

				BigDecimal sumPUsd = (BigDecimal) objArray[5];
				if (sumPUsd == null)
					sumPUsd = new BigDecimal(0);
				consign.setSumPUsd(sumPUsd.doubleValue());

				BigDecimal sumPCny = (BigDecimal) objArray[6];
				if (sumPCny == null)
					sumPCny = new BigDecimal(0);
				consign.setSumPCny(sumPCny.doubleValue());

				BigDecimal sumRUsdInvoice = (BigDecimal) objArray[7];
				if (sumRUsdInvoice == null)
					sumRUsdInvoice = new BigDecimal(0);
				consign.setSumRUsdInvoice(sumRUsdInvoice.doubleValue());

				BigDecimal sumRCnyInvoice = (BigDecimal) objArray[8];
				if (sumRCnyInvoice == null)
					sumRCnyInvoice = new BigDecimal(0);
				consign.setSumRCnyInvoice(sumRCnyInvoice.doubleValue());

				BigDecimal sumPUsdInvoice = (BigDecimal) objArray[9];
				if (sumPUsdInvoice == null)
					sumPUsdInvoice = new BigDecimal(0);
				consign.setSumPUsdInvoice(sumPUsdInvoice.doubleValue());

				BigDecimal sumPCnyInvoice = (BigDecimal) objArray[10];
				if (sumPCnyInvoice == null)
					sumPCnyInvoice = new BigDecimal(0);
				consign.setSumPCnyInvoice(sumPCnyInvoice.doubleValue());

				BigDecimal sumRUsdWriteOff = (BigDecimal) objArray[11];
				if (sumRUsdWriteOff == null)
					sumRUsdWriteOff = new BigDecimal(0);
				consign.setSumRUsdWriteOff(sumRUsdWriteOff.doubleValue());

				BigDecimal sumRCnyWriteOff = (BigDecimal) objArray[12];
				if (sumRCnyWriteOff == null)
					sumRCnyWriteOff = new BigDecimal(0);
				consign.setSumRCnyWriteOff(sumRCnyWriteOff.doubleValue());

				BigDecimal sumPUsdWriteOff = (BigDecimal) objArray[13];
				if (sumPUsdWriteOff == null)
					sumPUsdWriteOff = new BigDecimal(0);
				consign.setSumPUsdWriteOff(sumPUsdWriteOff.doubleValue());

				BigDecimal sumPCnyWriteOff = (BigDecimal) objArray[14];
				if (sumPCnyWriteOff == null)
					sumPCnyWriteOff = new BigDecimal(0);
				consign.setSumPCnyWriteOff(sumPCnyWriteOff.doubleValue());

				BigDecimal sumPOther = (BigDecimal) objArray[15];
				if (sumPOther == null)
					sumPOther = new BigDecimal(0);
				consign.setSumPOther(sumPOther.doubleValue());

				BigDecimal sumROther = (BigDecimal) objArray[15];
				if (sumROther == null)
					sumROther = new BigDecimal(0);
				consign.setSumROther(sumROther.doubleValue());

				if (!r.equals(new BigDecimal(0))) {
					Double grossProfitRate = grossProfit.doubleValue() * 100
							/ r.doubleValue();
					consign.setGrossProfitRate(String.valueOf(grossProfitRate));
				} else {
					consign.setGrossProfitRate("0");
				}
				retList.add(consign);
			}
		}
	}

	@SuppressWarnings("rawtypes")
	private void checkMergeTTransTask(List<TTransTask> retList, List objList) {
		for (Object obj : objList) {
			if (obj instanceof Object[]) {
				Object[] objArray = (Object[]) obj;
				TTransTask task = (TTransTask) objArray[0];
				// TRansportVirtual tr=new TRansportVirtual();
				// tr.setId(task.getId());

				BigDecimal r = (BigDecimal) objArray[1];
				BigDecimal p = (BigDecimal) objArray[2];
				if (r == null)
					r = new BigDecimal(0);
				if (p == null)
					p = new BigDecimal(0);
				task.setSumR(r.doubleValue());
				task.setSumP(p.doubleValue());
				BigDecimal grossProfit = r.subtract(p);
				task.setGrossProfit(grossProfit.doubleValue());

				BigDecimal sumRUsd = (BigDecimal) objArray[3];
				if (sumRUsd == null)
					sumRUsd = new BigDecimal(0);
				task.setSumRUsd(sumRUsd.doubleValue());

				BigDecimal sumRCny = (BigDecimal) objArray[4];
				if (sumRCny == null)
					sumRCny = new BigDecimal(0);
				task.setSumRCny(sumRCny.doubleValue());

				BigDecimal sumPUsd = (BigDecimal) objArray[5];
				if (sumPUsd == null)
					sumPUsd = new BigDecimal(0);
				task.setSumPUsd(sumPUsd.doubleValue());

				BigDecimal sumPCny = (BigDecimal) objArray[6];
				if (sumPCny == null)
					sumPCny = new BigDecimal(0);
				task.setSumPCny(sumPCny.doubleValue());

				BigDecimal sumRUsdInvoice = (BigDecimal) objArray[7];
				if (sumRUsdInvoice == null)
					sumRUsdInvoice = new BigDecimal(0);
				task.setSumRUsdInvoice(sumRUsdInvoice.doubleValue());

				BigDecimal sumRCnyInvoice = (BigDecimal) objArray[8];
				if (sumRCnyInvoice == null)
					sumRCnyInvoice = new BigDecimal(0);
				task.setSumRCnyInvoice(sumRCnyInvoice.doubleValue());

				BigDecimal sumPUsdInvoice = (BigDecimal) objArray[9];
				if (sumPUsdInvoice == null)
					sumPUsdInvoice = new BigDecimal(0);
				task.setSumPUsdInvoice(sumPUsdInvoice.doubleValue());

				BigDecimal sumPCnyInvoice = (BigDecimal) objArray[10];
				if (sumPCnyInvoice == null)
					sumPCnyInvoice = new BigDecimal(0);
				task.setSumPCnyInvoice(sumPCnyInvoice.doubleValue());

				BigDecimal sumRUsdWriteOff = (BigDecimal) objArray[11];
				if (sumRUsdWriteOff == null)
					sumRUsdWriteOff = new BigDecimal(0);
				task.setSumRUsdWriteOff(sumRUsdWriteOff.doubleValue());

				BigDecimal sumRCnyWriteOff = (BigDecimal) objArray[12];
				if (sumRCnyWriteOff == null)
					sumRCnyWriteOff = new BigDecimal(0);
				task.setSumRCnyWriteOff(sumRCnyWriteOff.doubleValue());

				BigDecimal sumPUsdWriteOff = (BigDecimal) objArray[13];
				if (sumPUsdWriteOff == null)
					sumPUsdWriteOff = new BigDecimal(0);
				task.setSumPUsdWriteOff(sumPUsdWriteOff.doubleValue());

				BigDecimal sumPCnyWriteOff = (BigDecimal) objArray[14];
				if (sumPCnyWriteOff == null)
					sumPCnyWriteOff = new BigDecimal(0);
				task.setSumPCnyWriteOff(sumPCnyWriteOff.doubleValue());

				BigDecimal sumPOther = (BigDecimal) objArray[15];
				if (sumPOther == null)
					sumPOther = new BigDecimal(0);
				task.setSumPOther(sumPOther.doubleValue());

				BigDecimal sumROther = (BigDecimal) objArray[15];
				if (sumROther == null)
					sumROther = new BigDecimal(0);
				task.setSumROther(sumROther.doubleValue());

				if (!r.equals(new BigDecimal(0))) {
					Double grossProfitRate = grossProfit.doubleValue() * 100
							/ r.doubleValue();
					task.setGrossProfitRate(String.valueOf(grossProfitRate));
				} else {
					task.setGrossProfitRate("0");
				}
				retList.add(task);
			}
		}
	}

	// 陆运单票审核查询
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(readOnly = true)
	public List consPortVirtual(List<HtQuery> conditions) {
		List retList = new ArrayList();
		List objList = dao.complexQueryCheck(conditions);
		checkMergeStatistics(retList, objList);
		if (requestContext.containsKey(Constants.PARAM_EAGER)) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("consId", requestContext.get("id"));
			retList.addAll(expenseDao.findByProperties(map));
		}
		return retList;
	}

	// 派车单票审核查询
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional(readOnly = true)
	public List ttransPortVirtual(List<HtQuery> conditions) {
		List retList = new ArrayList();
		List objList = taskDao.complexQueryCheck(conditions);
		checkMergeTTransTask(retList, objList);
		if (requestContext.containsKey(Constants.PARAM_EAGER)) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("consId", requestContext.get("id"));
			retList.addAll(expenseDao.findByProperties(map));
		}
		return retList;
	}

	// 审核-财务-经理
	@Transactional
	public void updateStatusAud() {
		Long id = Long.valueOf(requestContext.get("id"));
		Byte status = Byte.valueOf(requestContext.get("consStatusAud"));
		String consBizClass = requestContext.get("consBizClass");
		System.out.println(consBizClass);
		if (consBizClass.equals("O")) {
			TConsign cons = dao.findById(id);
			if (cons != null) {
				cons.setConsStatusAud(status);
				if (status == 1 || status == 2) {
					cons.setConsStatusExp(1);
				} else
					cons.setConsStatusExp(0);
				dao.update(cons);
			}
		} else if (consBizClass.equals("S")) {
			TTransTask ttr = taskDao.findById(id);
			if (ttr != null) {
				ttr.setConsStatusAud(status);
				if (status == 1 || status == 2) {
					ttr.setConsStatusExp(1);
				} else
					ttr.setConsStatusExp(0);
				taskDao.update(ttr);
			}
		}
	}

}