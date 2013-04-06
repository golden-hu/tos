package com.hitisoft.fos.tran.service;

import java.math.BigDecimal;
import java.util.ArrayList;
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
import com.hitisoft.fos.tran.dao.TConsignCargoDao;
import com.hitisoft.fos.tran.dao.TConsignDao;
import com.hitisoft.fos.tran.dao.TReceiptDao;
import com.hitisoft.fos.tran.entity.TCargo;
import com.hitisoft.fos.tran.entity.TConsign;
import com.hitisoft.fos.tran.entity.TConsignCargo;
import com.hitisoft.fos.tran.entity.TReceipt;
import com.hitisoft.fw.session.SessionContext;

@Service
public class TCargoService {
	@Autowired
	private TCargoDao dao;
	@Autowired
	private TConsignDao consDao;
	@Autowired
	private TConsignCargoDao consCargoDao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private TReceiptDao receDao;
	
	@Transactional
	public List<TCargo> save(List<TCargo> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TCargo> query() {
		return dao.findByProperties();
	}
	
	/**
	 * 派车货物客户签收
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
    @Transactional
	public List <TCargo>custSignIn(List<?> entityList){
		List retList = new ArrayList();
		List<TReceipt> receList = new ArrayList<TReceipt>();
		TConsignCargo consCargo=null;
		Set consIdSet=new HashSet();
		Integer packageArrivalSum=0,packagesLackSum=0;
		for (Object obj : entityList){
			if(obj instanceof TReceipt){
				TReceipt rece=(TReceipt)obj;
				packageArrivalSum=rece.getPackagesArrival();
				packagesLackSum=rece.getPackagesLack();
				receList.add(rece);
			}else if (obj instanceof TCargo){
				TCargo cargo=(TCargo)obj;
				consIdSet.add(cargo.getConsId());
				Map <String,Integer>map=this.setCustSignIn(cargo,consCargo);
				packageArrivalSum+=map.get("packageArrival");
				packagesLackSum+=map.get("packagesLack");
				retList.add(dao.findById(cargo.getId()));
			}
		}
		for(TReceipt rece:receList){
			rece.setPackagesArrival(packageArrivalSum);
			rece.setPackagesLack(packagesLackSum);
			rece=receDao.saveByRowActionSolo(rece);
			retList.add(rece);
		}
		this.updateConsArriStatus(consIdSet);
		return retList;
	}
	
	//设置客户签收货物
	public Map<String,Integer> setCustSignIn(TCargo cargo,TConsignCargo consCargo){
		Integer signInStatus=0,packages=0,packageArrival=0,packagesLack=0;
		if(cargo.getSignInStatus()!=null){
			signInStatus=cargo.getSignInStatus();
		}
		if(signInStatus==0){//客户还没签收过
			Long consCargoId=cargo.getConsCargoId().longValue();
			consCargo=consCargoDao.findById(consCargoId);
			if(cargo.getPackages()!=null){
				packages=cargo.getPackages();
			}
			if(cargo.getPackageArrival()!=null){
				packageArrival=cargo.getPackageArrival();
			}
			if(cargo.getPackagesLack()!=null){
				packagesLack=cargo.getPackagesLack();
			}
			double grossWeight=0.00,measurement=0.00,
					grossWeightArrival=0.00,measurementArrival=0.00,
					grossWeightLack=0.00,measurementLack=0.00;
			if(cargo.getGrossWeight()!=null){
				grossWeight=cargo.getGrossWeight().doubleValue();
			}
			if(cargo.getMeasurement()!=null){
				measurement=cargo.getMeasurement().doubleValue();
			}
			if(cargo.getGrossWeightArrival()!=null){
				grossWeightArrival=cargo.getGrossWeightArrival().doubleValue();
			}
			if(cargo.getMeasurementArrival()!=null){
				measurementArrival=cargo.getMeasurementArrival().doubleValue();
			}
			if(cargo.getGrossWeightLack()!=null){
				grossWeightLack=cargo.getGrossWeightLack().doubleValue();
			}
			if(cargo.getMeasurementLack()!=null){
				measurementLack=cargo.getMeasurementLack().doubleValue();
			}
			if(packageArrival<=0){
				packageArrival=packages;
			}
			cargo.setPackageArrival(packageArrival);
			consCargo.setPackageArrival(consCargo.getPackageArrival()+packageArrival);
			consCargo.setPackagesLack(consCargo.getPackagesLack()+packagesLack);
			
			if(grossWeightArrival<=0){
				grossWeightArrival=grossWeight;
			}
			cargo.setGrossWeightArrival(
					new BigDecimal(grossWeightArrival)
			);
			consCargo.setGrossWeightArrival(
					new BigDecimal(consCargo.getGrossWeightArrival().doubleValue()+grossWeightArrival)
			);
			consCargo.setGrossWeightLack(
					new BigDecimal(consCargo.getGrossWeightLack().doubleValue()+grossWeightLack)
			);
			
			if(measurementArrival<=0){
				measurementArrival=measurement;
			}
			cargo.setMeasurementArrival(
					new BigDecimal(measurementArrival)
			);
			consCargo.setMeasurementArrival(
					new BigDecimal(consCargo.getMeasurementArrival().doubleValue()+measurementArrival)
			);
			consCargo.setMeasurementLack(
					new BigDecimal(consCargo.getMeasurementLack().doubleValue()+measurementLack)
			);
			
			if(packageArrival==0){
				consCargo.setCargoArrivalStatus(0);											//托运单货物未到货
			}else if(packageArrival>0&&packagesLack>0){
				consCargo.setCargoArrivalStatus(1);											//托运单货物部分到货
			}else if(packageArrival>0&&packagesLack==0){
				consCargo.setCargoArrivalStatus(2);											//托运单货物全部到货
			}
			
			cargo.setSignInStatus(1);																//客户签收过货物
			cargo=dao.update(cargo);
			if(cargo!=null){
				consCargoDao.update(consCargo);
			}
		}
		Map <String,Integer> map = new HashMap<String,Integer>();
		map.put("packageArrival",packageArrival);
		map.put("packagesLack", packagesLack);
		return map;
	}
	@SuppressWarnings("rawtypes")
    public void updateConsArriStatus(Set consIdSet){
		//更新托运单‘未到货’‘部分到货’‘全部到货’状态
		for(Iterator consIdIte=consIdSet.iterator();consIdIte.hasNext();){
			Long consId=Long.valueOf(consIdIte.next()+"");
			TConsign cons=consDao.findById(consId);
			Map <String,String> map=new HashMap<String,String>();
			map.put("compCode", sessionContext.getCompCode());
			map.put("removed", 0+"");
			map.put("consId", cons.getId()+"");
			List<TConsignCargo> consCargoList=consCargoDao.findByProperties(map);
			if(consCargoList!=null&&consCargoList.size()>0){
				Integer packagesSum=0,packagesReSum=0,packagesArSum=0;//托运单货物
				for(TConsignCargo consCar:consCargoList){
					if(consCar.getPackages()!=null){
						packagesSum+=consCar.getPackages();
					}
					if(consCar.getPackagesRemainder()!=null){
						packagesReSum+=consCar.getPackagesRemainder();
					}
					if(consCar.getPackageArrival()!=null){
						packagesArSum+=consCar.getPackageArrival();
					}
				}
				if(packagesArSum>0&&packagesArSum.equals(packagesSum)){
					cons.setCargoArrivalStatus(2);														//托运单全部到货
					cons.setStatus(3);																			//托运单已到达
				}else if(packagesArSum>0&&packagesArSum<packagesSum){
					cons.setCargoArrivalStatus(1);														//托运单部分到货
					cons.setStatus(2);																	        //托运单已发运
				}else if(packagesArSum==0){
					cons.setCargoArrivalStatus(0);														//托运单未到货
					cons.setStatus(2);																			//托运单已发运
				}
				consDao.update(cons);
			}
		}
	}
}
