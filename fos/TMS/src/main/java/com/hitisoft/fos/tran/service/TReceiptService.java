package com.hitisoft.fos.tran.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TCargoDao;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.dao.TReceiptDao;
import com.hitisoft.fos.tran.dao.TTransTaskDao;
import com.hitisoft.fos.tran.entity.TCargo;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TReceipt;
import com.hitisoft.fos.tran.entity.TTransTask;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.StringUtil;

@Service
public class TReceiptService {
	@Autowired
	private TReceiptDao dao;
	@Autowired
	private TConsignDao consDao;
	@Autowired
	private TCargoDao cargoDao;
	@Autowired
	private TTransTaskDao taskDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	
	@Transactional
	public List<TReceipt> save(List<TReceipt> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TReceipt> query() {
		return dao.findByProperties();
	}
	
	/**
	 * 回单管理查询
	 * @return
	 */
	@Transactional(readOnly = true)
	public List<TReceipt> receiptSearch(final List<HtQuery> conditions) {
		return dao.receiptSearch(conditions);
	}
	
	/**
	 * 运输单中生成回单
	 * @param entityList
	 * @returns
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
    @Transactional
	public List <TCargo>transTaskReceipt(List<?> entityList){
		Set consIdSet=new HashSet();
		Integer transTaskId=Integer.valueOf(requestContext.get("transTaskId"));
		String transTaskNo=requestContext.get("transTaskNo");
		Map<String,String> map = new HashMap<String,String>();
		map.put("compCode", sessionContext.getCompCode());
		map.put("removed",0+"");
		map.put("transTaskId",transTaskId+"");
		List <TCargo>cList=cargoDao.findByProperties(map);
		if(cList!=null&&cList.size()>0){
			for (TCargo cargo : cList){
				consIdSet.add(cargo.getConsId());
			}
		}
		for(Iterator consIdIte=consIdSet.iterator();consIdIte.hasNext();){
			Long consId=Long.valueOf(consIdIte.next()+"");
			TConsign cons=consDao.findById(consId);
			String consNo=cons.getConsNo();
			String consNoHandler=cons.getConsNoHandler();
			map.put("consId", consId+"");
			List <TCargo>cargoList=cargoDao.findByProperties(map);
			Integer packages=0,packagesArri=0,packagesLack=0;
			String cargoName="";
			for(int i=0;i<cargoList.size();i++){
				  TCargo c=cargoList.get(i);
				if(c.getPackages()!=null){
					packages+=c.getPackages();
				}
				if(c.getPackageArrival()!=null){
					packagesArri+=c.getPackageArrival();
				}
				if(c.getPackageArrival()!=null){
					packagesLack+=c.getPackagesLack();
				}
				if(i==cargoList.size()-1){
					if(StringUtil.isNotBlank(c.getCargoName())){
						cargoName+=c.getCargoName();
					}
				}else{
					if(StringUtil.isNotBlank(c.getCargoName())){
						cargoName+=c.getCargoName()+",";
					}
				}
			}
			TReceipt re=new TReceipt();
			re.setTransTaskId(transTaskId);
			re.setTransTaskNo(transTaskNo);
			re.setConsId(consId.intValue());
			re.setConsNo(consNo);
			re.setConsNoHandler(consNoHandler);
			re.setCargoName(cargoName);
			re.setPackages(packages);
			re.setPackagesArrival(packagesArri);
			re.setPackagesLack(packagesLack);
			dao.add(re);
			TTransTask task=taskDao.findById(transTaskId.longValue());
			task.setReceiptStatus(1);					//已经生成回单
			taskDao.update(task);
		}
		return null;
	}
	
}
