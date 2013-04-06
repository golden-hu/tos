package com.hitisoft.fos.sys.dao.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.jpa.JpaCallback;
import org.springframework.stereotype.Repository;

import com.hitisoft.fos.sys.dao.CContractDao;
import com.hitisoft.fos.sys.dao.CCustomerDao;
import com.hitisoft.fos.sys.entity.CContract;
import com.hitisoft.fos.sys.entity.CCustomer;
import com.hitisoft.fw.orm.jpa.JpaDao;

@Repository
public class CContractDaoImpl extends JpaDao<CContract, Long> implements CContractDao {
	private Logger logger = LoggerFactory.getLogger(CContractDaoImpl.class);

	public CContractDaoImpl() {
		super(CContract.class);
	}

/*	@Override
	public void mergeCust(Long fromId, Long toId) {
		if (fromId == null || toId == null) {
			return;
		}
		CCustomer fromCust = findById(fromId);
		CCustomer toCust = findById(toId);
		if (fromCust == null || toCust == null) {
			return;
		}
		String toCustName = toCust.getCustNameCn();
		String toCustSname = toCust.getCustCode();
		// 1
		String sql = "update CCustomerContact t set t.custId = " + toId + " where t.custId = " + fromId;
		doUpdate(sql);
		// 2.1
		sql = "update CPriceSheet t set t.prshVendorId = " + toId + ", t.prshVendorName = '" + toCustName
				+ "' where t.prshVendorId = " + fromId;
		doUpdate(sql);
		// 2.2
		sql = "update CPriceSheet t set t.prshCarrier = " + toId + ", t.prshCarrierName = '" + toCustName
				+ "' where t.prshCarrier = " + fromId;
		doUpdate(sql);
		// 3.1
		sql = "update FBl t set t.custId = " + toId + ", t.custName = '" + toCustName + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 3.2
		sql = "update FBl t set t.blCarrier = " + toId + ", t.blCarrierName = '" + toCustName
				+ "' where t.blCarrier = " + fromId;
		doUpdate(sql);
		// 4.1
		sql = "update FConsign t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 4.2
		sql = "update FConsign t set t.consOverseaAgency = " + toId + ", t.consOverseaAgencyName = '" + toCustName
				+ "' where t.consOverseaAgency = " + fromId;
		doUpdate(sql);
		// 4.3
		sql = "update FConsign t set t.consCargoOwner = " + toId + ", t.consCargoOwnerName = '" + toCustName
				+ "' where t.consCargoOwner = " + fromId;
		doUpdate(sql);
		// 4.4
		sql = "update FConsign t set t.consCfs = " + toId + ", t.consCfsName = '" + toCustName + "' where t.consCfs = "
				+ fromId;
		doUpdate(sql);
		// 4.5
		sql = "update FConsign t set t.consWarehouse = " + toId + ", t.consWarehouseName = '" + toCustName
				+ "' where t.consWarehouse = " + fromId;
		doUpdate(sql);
		// 4.6
		sql = "update FConsign t set t.consContainerCompany = " + toId + ", t.consContainerCompanyName = '"
				+ toCustName + "' where t.consContainerCompany = " + fromId;
		doUpdate(sql);
		// 4.7
		sql = "update FConsign t set t.consCustomsVendor = " + toId + ", t.consCustomsVendorName = '" + toCustName
				+ "' where t.consCustomsVendor = " + fromId;
		doUpdate(sql);
		// 4.8
		sql = "update FConsign t set t.consTrackVendor = " + toId + ", t.consTrackVendorName = '" + toCustName
				+ "' where t.consTrackVendor = " + fromId;
		doUpdate(sql);
		// 4.9
		sql = "update FConsign t set t.consDoAgency = " + toId + ", t.consDoAgencyName = '" + toCustName
				+ "' where t.consDoAgency = " + fromId;
		doUpdate(sql);
		// 4.10
		sql = "update FConsign t set t.consBookingAgency = " + toId + ", t.consBookingAgencyName = '" + toCustName
				+ "' where t.consBookingAgency = " + fromId;
		doUpdate(sql);
		// 4.11
		sql = "update FConsign t set t.consCarrier = " + toId + ", t.consCarrierName = '" + toCustName
				+ "' where t.consCarrier = " + fromId;
		doUpdate(sql);
		// 5.1
		sql = "update FContract t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 5.2
		sql = "update FContract t set t.charterId = " + toId + ", t.charterName = '" + toCustName
				+ "', t.charterSname = '" + toCustSname + "' where t.charterId = " + fromId;
		doUpdate(sql);
		// 6.1
		sql = "update FCustomsDeclaration t set t.custId = " + toId + ", t.custName = '" + toCustName
				+ "' where t.custId = " + fromId;
		doUpdate(sql);
		// 6.2
		sql = "update FCustomsDeclaration t set t.cudeVendorId = " + toId + ", t.cudeVendorName = '" + toCustName
				+ "' where t.cudeVendorId = " + fromId;
		doUpdate(sql);
		// 7
		sql = "update FDo t set t.doWarehouseId = " + toId + ", t.doWarehouseName = '" + toCustName
				+ "' where t.doWarehouseId = " + fromId;
		doUpdate(sql);
		// 8
		sql = "update FDoc t set t.fdocSendTo = " + toId + " where t.fdocSendTo = " + fromId;
		doUpdate(sql);
		// 9
		sql = "update FInspection t set t.inspVendorId = " + toId + ", t.inspVendorName = '" + toCustName
				+ "' where t.inspVendorId = " + fromId;
		doUpdate(sql);
		// 10
		sql = "update FLoadingList t set t.carrierId = " + toId + ", t.carrierName = '" + toCustName
				+ "' where t.carrierId = " + fromId;
		doUpdate(sql);
		// 11
		sql = "update FRailwayBl t set t.custId = " + toId + ", t.custName = '" + toCustName + "' where t.custId = "
				+ fromId;
		doUpdate(sql);
		// 12.1
		sql = "update FTrans t set t.tranVendorId = " + toId + ", t.tranVendorName = '" + toCustName
				+ "' where t.tranVendorId = " + fromId;
		doUpdate(sql);
		// 12.2
		sql = "update FTrans t set t.tranCustomsBroker = " + toId + ", t.tranCustomsBrokerName = '" + toCustName
				+ "' where t.tranCustomsBroker = " + fromId;
		doUpdate(sql);
		// 12.3
		sql = "update FTrans t set t.tranContainerCompany = " + toId + ", t.tranContainerCompanyName = '" + toCustName
				+ "' where t.tranContainerCompany = " + fromId;
		doUpdate(sql);
		// 13.1
		sql = "update FWarehouse t set t.wareVendorId = " + toId + ", t.wareVendorName = '" + toCustName
				+ "' where t.wareVendorId = " + fromId;
		doUpdate(sql);
		// 13.2
		sql = "update FWarehouse t set t.wareTransVendor = " + toId + ", t.wareTransVendorName = '" + toCustName
				+ "' where t.wareTransVendor = " + fromId;
		doUpdate(sql);
		// 14
		sql = "update SBill t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 15
		sql = "update SBulkExpense t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 16.1
		sql = "update SExpense t set t.consCustId = " + toId + ", t.consCustName = '" + toCustName
				+ "' where t.consCustId = " + fromId;
		doUpdate(sql);
		// 16.2
		sql = "update SExpense t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 17.1
		sql = "update SExpenseB t set t.consCustId = " + toId + ", t.consCustName = '" + toCustName
				+ "' where t.consCustId = " + fromId;
		doUpdate(sql);
		// 17.2
		sql = "update SExpenseB t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 18
		sql = "update SInvoice t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 19
		sql = "update SPr t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 20
		sql = "update SVoucher t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
		// 21
		sql = "update SBalance t set t.custId = " + toId + ", t.custName = '" + toCustName + "', t.custSname = '"
				+ toCustSname + "' where t.custId = " + fromId;
		doUpdate(sql);
	}*/

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void doUpdate(final String sql) {
		Integer num = (Integer) getJpaTemplate().execute(new JpaCallback() {
			public Object doInJpa(EntityManager em) throws PersistenceException {
				Query query = em.createQuery(sql);
				return Integer.valueOf(query.executeUpdate());
			}
		});
		logger.info(sql);
		logger.info("update {} rows!", num);
	}
}
