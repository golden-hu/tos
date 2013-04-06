package com.hitisoft.fos.sys.service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hitisoft.fos.sys.dao.PTableInfoDao;
import com.hitisoft.fos.sys.entity.PTableInfo;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fw.util.ConstUtil;

@Service
public class PTableInfoService {
	@Autowired
	private PTableInfoDao dao;
	private Map<String, String> tableInfoMap = new ConcurrentHashMap<String, String>();
	private Set<String> tableSet = new HashSet<String>();

	public String getId(String tableName) {
		return getFieldName(tableName, Constants.TABLE_FIELD_TYPE_ID);
	}

	public String getNo(String tableName) {
		return getFieldName(tableName, Constants.TABLE_FIELD_TYPE_NO);
	}

	public String getFieldName(String tableName, String fieldType) {
		if (tableInfoMap.size() == 0) {
			init();
		}
		return tableInfoMap.get(tableName + ConstUtil.STRING_SHARP + fieldType);
	}

	public boolean constains(String tableName) {
		if (tableSet.size() == 0) {
			init();
		}
		return tableSet.contains(tableName);
	}

	private synchronized void init() {
		List<PTableInfo> list = dao.findAll();
		for (PTableInfo tableInfo : list) {
			tableSet.add(tableInfo.getTainTableName());
			tableInfoMap.put(tableInfo.getTainTableName() + ConstUtil.STRING_SHARP + tableInfo.getTainFieldType(),
					tableInfo.getTainFieldName());
		}
	}
}
