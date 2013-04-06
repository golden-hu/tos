package com.hitisoft.fos.tran.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TOilCardDao;
import com.hitisoft.fos.tran.dao.TOilCardTransactionDao;
import com.hitisoft.fos.tran.entity.TOilCard;
import com.hitisoft.fos.tran.entity.TOilCardTransaction;
import com.hitisoft.fw.orm.util.RowAction;

@Service
public class TOilCardTransactionService {
	@Autowired
	private TOilCardTransactionDao dao;

	@Autowired
	private TOilCardDao cdao;
	
	@Transactional
	public List<TOilCardTransaction> save(List<TOilCardTransaction> entityList) {
		for(TOilCardTransaction t : entityList){
			if(t.getRowAction().equals(RowAction.N)){
				Integer type = t.getTransactionType();				
				if(type == 1){
					Long cardId = t.getCardId();
					TOilCard c = cdao.findById(cardId);
					Double amount = t.getAmount();
					Double balance = c.getBalance();
					if(balance == null)
						balance = 0.00;				
					c.setBalance(balance-amount);
					c.setRowAction(RowAction.M);
					cdao.saveByRowActionSolo(c);
				}				
			}
		}
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TOilCardTransaction> query() {
		return dao.findByProperties();
	}
}
