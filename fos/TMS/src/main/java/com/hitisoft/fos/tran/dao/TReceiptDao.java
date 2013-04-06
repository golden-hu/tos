package com.hitisoft.fos.tran.dao;

import java.util.List;

import com.hitisoft.fos.tran.entity.TReceipt;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface TReceiptDao extends BaseDao<TReceipt, Long> {
    public List <TReceipt> receiptSearch(final List<HtQuery> conditions);
}
