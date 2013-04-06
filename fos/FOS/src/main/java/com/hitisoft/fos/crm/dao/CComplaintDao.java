package com.hitisoft.fos.crm.dao;

import java.util.List;

import com.hitisoft.fos.crm.entity.CComplaint;
import com.hitisoft.fw.orm.jpa.BaseDao;
import com.hitisoft.fw.orm.util.HtQuery;

public interface CComplaintDao extends BaseDao<CComplaint, Long>{
	List<CComplaint> complexQuery(List<HtQuery> conditions);
}
