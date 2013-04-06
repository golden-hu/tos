package com.hitisoft.fos.tran.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TOilCardDao;
import com.hitisoft.fos.tran.dao.TOilCardTransactionDao;
import com.hitisoft.fos.tran.dao.TOilLogDao;
import com.hitisoft.fos.tran.entity.TOilCard;
import com.hitisoft.fos.tran.entity.TOilCardTransaction;
import com.hitisoft.fos.tran.entity.TOilLog;
import com.hitisoft.fw.orm.util.RowAction;

@Service
public class TOilLogService {
	@Autowired
	private TOilLogDao dao;

	@Autowired
	private TOilCardDao cdao;
	
	@Autowired
	private TOilCardTransactionDao tdao;
	
	@Transactional
	public List<TOilLog> save(List<TOilLog> entityList) {
		List<TOilLog> retList = new ArrayList<TOilLog>();
		for(TOilLog l : entityList){
			if(l.getCardId()!=null && l.getCardPaid()>0){
				Long cardId = l.getCardId();
				Double amount = l.getCardPaid();
				
				TOilCard c = cdao.findById(cardId);
				Double balance = c.getBalance();
				if(balance == null)
					balance = 0.00;
				
				if(l.getRowAction().equals(RowAction.N)){	
					l = dao.saveByRowActionSolo(l);
					retList.add(l);
					
					TOilCardTransaction t = new TOilCardTransaction();
					t.setCardId(cardId);
					t.setCardNumber(c.getCardNumber());
					t.setTransactionType(1);
					t.setTransactionDate(l.getRefuelDate());
					t.setAmount(amount);
					t.setDriverId(l.getDriverId());
					t.setDriverName(l.getDriverName());
					t.setVehicleId(l.getVehicleId());
					t.setVehicleNo(l.getVehicleNo());
					t.setOilLogId(l.getId());
					t.setRowAction(RowAction.N);
					tdao.saveByRowActionSolo(t);
					
					c.setBalance(balance-amount);
					c.setRowAction(RowAction.M);
					cdao.saveByRowActionSolo(c);
				}
				else if(l.getRowAction().equals(RowAction.M)){
					l = dao.saveByRowActionSolo(l);
					retList.add(l);
					
					Map<String,String> map = new HashMap<String,String>();
					map.put("oilLogId", ""+l.getId());
					List<TOilCardTransaction> tList = tdao.findByProperties(map);
					if(tList.size()>0){
						TOilCardTransaction t = tList.get(0);
						Double oldAmount = t.getAmount();
						
						t.setAmount(amount);
						t.setTransactionDate(l.getRefuelDate());
						t.setDriverId(l.getDriverId());
						t.setDriverName(l.getDriverName());
						t.setVehicleId(l.getVehicleId());
						t.setVehicleNo(l.getVehicleNo());
						t.setRowAction(RowAction.M);
						tdao.saveByRowActionSolo(t);
						
						c.setBalance(balance-amount+oldAmount);
						c.setRowAction(RowAction.M);
						cdao.saveByRowActionSolo(c);
					}
				}
				else if(l.getRowAction().equals(RowAction.R)){					
					Map<String,String> map = new HashMap<String,String>();
					map.put("oilLogId", ""+l.getId());
					List<TOilCardTransaction> tList = tdao.findByProperties(map);
					if(tList.size()>0){
						TOilCardTransaction t = tList.get(0);
						Double oldAmount = t.getAmount();
						tdao.delete(t.getId());
						
						c.setBalance(balance-oldAmount);
						c.setRowAction(RowAction.M);
						cdao.saveByRowActionSolo(c);
					}
					
					dao.delete(l.getId());
				}
			}
			else{
				retList.add(dao.saveByRowActionSolo(l));
			}
		}
		
		return retList;
	}

	@Transactional(readOnly = true)
	public List<TOilLog> query() {
		return dao.findByProperties();
	}
}
