package com.hitisoft.fos.tran.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hitisoft.fos.tran.dao.TOilCardDao;
import com.hitisoft.fos.tran.entity.TOilCard;
import com.hitisoft.fos.tran.dao.TOilCardTransactionDao;
import com.hitisoft.fos.tran.entity.TOilCardTransaction;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;

@Service
public class TOilCardService {
	@Autowired
	private TOilCardDao dao;

	@Autowired
	private TOilCardTransactionDao tdao;
	
	@Autowired
	private RequestContext requestContext;
	
	@Transactional
	public List<TOilCard> save(List<TOilCard> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<TOilCard> query() {
		return dao.findByProperties();
	}
	
	@Transactional
	public TOilCard addMoney() {
		String cardId = requestContext.get("cardId");
		String amount = requestContext.get("amount");
		
		Long lCardId = Long.parseLong(cardId);
		Double dAmount = Double.parseDouble(amount);
		
		TOilCard c = dao.findById(lCardId);
		
		TOilCardTransaction t = new TOilCardTransaction();
		t.setCardId(lCardId);
		t.setCardNumber(c.getCardNumber());
		t.setTransactionType(0);
		t.setTransactionDate(new Date());
		t.setAmount(dAmount);
		t.setRowAction(RowAction.N);
		tdao.saveByRowActionSolo(t);
		
		Double balance = c.getBalance();
		if(balance==null)
			balance = 0.00;
		c.setBalance(balance+dAmount);
		c.setRowAction(RowAction.M);
		return dao.saveByRowActionSolo(c);
	}
}
