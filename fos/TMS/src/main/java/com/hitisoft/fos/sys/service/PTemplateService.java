package com.hitisoft.fos.sys.service;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hitisoft.fos.sys.dao.PCompanyConfigDao;
import com.hitisoft.fos.sys.dao.PTemplateDao;
import com.hitisoft.fos.sys.dao.PTemplateMapDao;
import com.hitisoft.fos.sys.dao.PTemplateTypeDao;
import com.hitisoft.fos.sys.entity.PCompanyConfig;
import com.hitisoft.fos.sys.entity.PTemplate;
import com.hitisoft.fos.sys.entity.PTemplateMap;
import com.hitisoft.fos.sys.entity.PTemplateType;
import com.hitisoft.fos.util.ConfigUtil;
import com.hitisoft.fos.util.Constants;
import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fos.util.MappingConverterUtil;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.HtQuery;
import com.hitisoft.fw.orm.util.JpaEntityMapper;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.oxm.xstream.XstreamMarshaller;
import com.hitisoft.fw.reflect.MethodUtil;
import com.hitisoft.fw.service.Action;
import com.hitisoft.fw.service.ActionManager;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.spring.SpringContextHolder;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.FileUtil;
import com.hitisoft.fw.util.NumberUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;
import com.hitisoft.fw.web.HtRequest;

@Service
public class PTemplateService {
	private Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private PTemplateDao dao;
	@Autowired
	private PTemplateTypeDao typeDao;
	@Autowired
	private PTemplateMapDao mapDao;
	@Autowired
	private PCompanyConfigDao companyConfigDao;
	@Autowired
	private ConfigUtil configUtil;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private HtRequest htRequest;
	@Autowired
	private MappingConverterUtil mappingConverterUtil;
	@Autowired
	private ActionManager actionManager;
	@Autowired
	@Qualifier(value = "xmlMarshaller")
	private XstreamMarshaller xmlMarshaller;
	@Autowired
	@Qualifier(value = "jsonMarshaller")
	private XstreamMarshaller jsonMarshaller;
	@Autowired
	private JpaEntityMapper entityMapper;

	@Transactional
	public List<PTemplate> save(List<PTemplate> entityList) {
		List<PTemplate> retList = new ArrayList<PTemplate>();
		for (PTemplate entity : entityList) {
			switch (entity.getRowAction()) {
			case N:
				entity.setId(null);
				dao.add(entity);
				retList.add(entity);
				break;
			case M:
				// 如果模板的名字改了, 模板文件的名字也要改
				PTemplate dbEntity = dao.findById(entity.getId());
				if (dbEntity != null && !entity.getTempName().equals(dbEntity.getTempName())) {
					String oldName = configUtil.getRealTemplateDir() + ConstUtil.DIR_SEP + dbEntity.getTempName()
							+ ConstUtil.STRING_DOT + Constants.TEMP_SUFFIX_EXCEL;
					String newName = configUtil.getRealTemplateDir() + ConstUtil.DIR_SEP + entity.getTempName()
							+ ConstUtil.STRING_DOT + Constants.TEMP_SUFFIX_EXCEL;
					File oldFile = new File(oldName);
					File newFile = new File(newName);
					if (oldFile.exists()) {
						oldFile.renameTo(newFile);
					}
				}
				retList.add(dao.update(entity));
				break;
			case R:
				PTemplate delEntity = dao.findById(entity.getId());
				delEntity.setRowAction(RowAction.R);
				dao.update(delEntity);
				break;
			default:
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
		}
		return retList;
	}

	public void uploadTemplate() {
		String uploadDir = configUtil.getRealTemplateDir();
		File f = new File(uploadDir);
		if (!f.exists()) {
			f.mkdirs();
		}

		Collection<MultipartFile> items = htRequest.getFileItems();
		if (items == null) {
			throw new BusinessException(FosExceptionEnum.SYS_TEMPLATE_NO_FILE_UPLOAD, requestContext);
		}
		for (MultipartFile item : items) {
			String strId = requestContext.get(Constants.TEMP_PARAM_ID);
			if (StringUtil.isBlank(strId)) {
				throw new BusinessException(FosExceptionEnum.SYS_TEMPLATE_MISSED_PARAM_ID);
			}
			Long id = Long.valueOf(strId);
			PTemplate pt = dao.findById(id);
			if (pt == null) {
				throw new BusinessException(FosExceptionEnum.SYS_TEMPLATE_NOT_FOUND_BY_ID, id);
			}
			String filename = pt.getTempName() + ConstUtil.STRING_DOT + pt.getTempType();
			try {
				item.transferTo(new File(uploadDir + ConstUtil.DIR_SEP + filename));
			} catch (Exception e) {
				throw new BusinessException(FosExceptionEnum.SYS_TEMPLATE_SAVE_FAILED, uploadDir + ConstUtil.DIR_SEP
						+ filename);
			}
		}
	}

	public void downTemplate() {
		PTemplate pt = getTemplate();
		String filename = pt.getTempName() + ConstUtil.STRING_DOT + pt.getTempType();
		File f = new File(configUtil.getRealTemplateDir() + ConstUtil.DIR_SEP + filename);
		if (!f.exists()) {
			throw new BusinessException(FosExceptionEnum.SYS_TEMPLATE_FILE_NOT_EXIST);
		}
		filename =configUtil.getTemplateDir() + ConstUtil.DIR_SEP + StringUtil.utf82ascii(filename);
		requestContext.put(ContextKey.redirectUrl.get(), filename);
	}

	/**
	 * 导入数据
	 * 
	 * @param request
	 * @param paramMap
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Transactional
	public void importTemplate() {
		Collection<MultipartFile> fileItems = null;
		InputStream is = null;
		POIFSFileSystem fs = null;
		try {
			fileItems = htRequest.getFileItems();
			Map<String, String> queryMap = new HashMap<String, String>();
			queryMap.put(Constants.TEMP_PARAM_CODE, requestContext.get(Constants.TEMP_PARAM_CODE));
			PTemplateType ptt = typeDao.findByProperties(queryMap).get(0);
			queryMap.put("tetyId", "" + ptt.getId());
			Map<String, PTemplateMap> fieldMapping = getTemplateMap(queryMap);
			// 获取该对象的类
			Class entityClass = entityMapper.getClass(ptt.getTetyChild());
			for (MultipartFile item : fileItems) {
				is = item.getInputStream();
				fs = new POIFSFileSystem(is);
				Workbook wb = new HSSFWorkbook(fs);
				// 循环excel第一行, 找到所有的变量位置
				Sheet sheet = wb.getSheetAt(0);
				Row firstRow = sheet.getRow(0);
				List<String> fieldList = getVarLocation(fieldMapping, firstRow);
				// 读取内容
				if (fieldList.size() > 0) {
					List<Map<String, String>> recordList = parseExcel2Map(sheet, fieldList);
					// 循环构建对象,插入数据库
					List entityList = new ArrayList();
					requestContext.put("rowAction", "" + RowAction.N);
					for (Map<String, String> valueMap : recordList) {
						Object entity = entityClass.newInstance();
						// 先把前台传过来的一些父表的数据, Set到子表中
						fillEntity(entity, requestContext);
						fillEntity(entity, valueMap);
						entityList.add(entity);
					}
					executeAction(ptt, entityList);
				}
				is.close();
			}
		} catch (Exception e) {
			throw new BusinessException(ExceptionEnum.FW_UNKNOWN_ERROR, e);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 功能: 打印模板, 数据填充及导出成excel文件 1.根据tempId, 获取该打印模板的信息 2.找到该打印模板文件
	 * 3.循环excel,找到所有的变量位置 4.根据action和查询条件, 获取到对象列表
	 * 5.根据templateMap中的字段映射信息,循环调用对象的对应get方法, 替换excel中的变量
	 * 6.把变量替换后的excel文件保存到临时目录 7.返回临时文件名
	 * 
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public String exportTemplate(List<HtQuery> conditions) {
		String tempFileName = null;
		logger.info("export template with param: " + requestContext);
		if (conditions == null) {
			conditions = new ArrayList<HtQuery>();
		}
		conditions.addAll(parseXml4Report(requestContext,
				ConstUtil.JSON.equalsIgnoreCase(requestContext.get(ContextKey.messageType.get()))));
		PTemplate pt = getTemplate();
		PTemplateType ptt = typeDao.findById(pt.getTetyId().longValue());		
		
		String parent = ptt.getTetyParent();
		String child = ptt.getTetyChild();
		
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("tetyId", "" + pt.getTetyId());
		Map<String, PTemplateMap> fieldMap = getTemplateMap(queryMap);
		
		// 根据action和查询条件, 获取到对象列表, 并拆成主表和子表
		//requestContext.put(Constants.PARAM_EAGER, ConstUtil.TrueStr);
		List entityList = executeAction(ptt, conditions, requestContext);
		Object parentEntity = null;
		List<Object> childList = new ArrayList<Object>();
		for (Object item : entityList) {
			if (item.getClass().getSimpleName().equalsIgnoreCase(parent)) {
				parentEntity = item;
			} else if (item.getClass().getSimpleName().equalsIgnoreCase(child)) {
				childList.add(item);
			}
		}
		if (!Constants.TEMP_SUFFIX_EXCEL.equalsIgnoreCase(pt.getTempType())) {
			tempFileName = handleDoc(pt, fieldMap, parentEntity);
		} else {
			String realName = configUtil.getRealTemplateDir() + ConstUtil.DIR_SEP + pt.getTempName()
					+ ConstUtil.STRING_DOT + pt.getTempType();
			try {
				POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(realName));
				Workbook wb = new HSSFWorkbook(fs);
				Sheet sheet = wb.getSheetAt(0);
				Map<String, List<List<Integer>>> varMap = getVarLocation(sheet);
				// 系统变量位置 #VAR#
				fillSysVar(queryMap, sheet);
				if (StringUtil.isNotBlank(parent)) {
					handleParent(fieldMap, parentEntity, sheet, varMap);
				}
				if (StringUtil.isNotBlank(child) && childList.size() > 0) {
					handleChild(ptt, fieldMap, childList, sheet, varMap);
				}
				FormulaEvaluator evaluator = wb.getCreationHelper().createFormulaEvaluator();
				reCalcFormula(sheet, evaluator);
				tempFileName = pt.getTempName() + ConstUtil.STRING_UNDERLINE + System.currentTimeMillis()
						+ ConstUtil.STRING_DOT + Constants.TEMP_SUFFIX_EXCEL;
				FileUtil.createDirs(configUtil.getRealTempDir());
				FileOutputStream fileOut = new FileOutputStream(configUtil.getRealTempDir() + ConstUtil.DIR_SEP
						+ tempFileName);
				wb.write(fileOut);
				fileOut.close();
				tempFileName = StringUtil.utf82ascii(tempFileName);
			} catch (Exception e) {
				logger.error("export error", e);
			}
		}
		// 文件名encoding
		if (StringUtil.isNotBlank(tempFileName)) {
			String f = configUtil.getTempDir() + ConstUtil.DIR_SEP + tempFileName;
			requestContext.put(ContextKey.redirectUrl.get(), f);
		}
		return tempFileName;
	}

	/*public String exportTemplate(List<HtQuery> conditions, Map<String, String> paramMap) {
		String tempFileName = null;
		logger.info("export template with param: " + paramMap);
		if (conditions == null) {
			conditions = new ArrayList<HtQuery>();
		}
		conditions.addAll(parseXml4Report(requestContext,
				ConstUtil.JSON.equalsIgnoreCase(requestContext.get(ContextKey.messageType.get()))));
		PTemplate pt = getTemplate();
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put("id", "" + pt.getTetyId());
		PTemplateType ptt = typeDao.findByProperties(queryMap).get(0);
		String parent = ptt.getTetyParent();
		String child = ptt.getTetyChild();
		queryMap.clear();
		queryMap.put("tetyId", "" + pt.getTetyId());
		Map<String, PTemplateMap> fieldMap = getTemplateMap(queryMap);
		// 根据action和查询条件, 获取到对象列表, 并拆成主表和子表
		requestContext.put(Constants.PARAM_EAGER, ConstUtil.TrueStr);
		
		List entityList = executeAction(ptt, conditions, paramMap);
		Object parentEntity = null;
		List<Object> childList = new ArrayList<Object>();
		for (Object item : entityList) {
			if (item.getClass().getSimpleName().equalsIgnoreCase(parent)) {
				parentEntity = item;
			} else if (item.getClass().getSimpleName().equalsIgnoreCase(child)) {
				childList.add(item);
			}
		}
		if (!Constants.TEMP_SUFFIX_EXCEL.equalsIgnoreCase(pt.getTempType())) {
			tempFileName = handleDoc(pt, fieldMap, parentEntity);
		} else {
			String realName = configUtil.getRealTemplateDir() + ConstUtil.DIR_SEP + pt.getTempName()
					+ ConstUtil.STRING_DOT + pt.getTempType();
			try {
				POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(realName));
				Workbook wb = new HSSFWorkbook(fs);
				Sheet sheet = wb.getSheetAt(0);
				Map<String, List<List<Integer>>> varMap = getVarLocation(sheet);
				// 系统变量位置 #VAR#
				fillSysVar(queryMap, sheet);
				if (StringUtil.isNotBlank(parent)) {
					handleParent(fieldMap, parentEntity, sheet, varMap);
				}
				if (StringUtil.isNotBlank(child) && childList.size() > 0) {
					handleChild(ptt, fieldMap, childList, sheet, varMap);
				}
				FormulaEvaluator evaluator = wb.getCreationHelper().createFormulaEvaluator();
				reCalcFormula(sheet, evaluator);
				tempFileName = pt.getTempName() + ConstUtil.STRING_UNDERLINE + System.currentTimeMillis()
				+ ConstUtil.STRING_DOT + Constants.TEMP_SUFFIX_EXCEL;
				FileUtil.createDirs(configUtil.getRealTempDir());
				FileOutputStream fileOut = new FileOutputStream(configUtil.getRealTempDir() + ConstUtil.DIR_SEP
						+ tempFileName);
				wb.write(fileOut);
				fileOut.close();
				tempFileName = StringUtil.utf82ascii(tempFileName);
			} catch (Exception e) {
				logger.error("export error", e);
			}
		}
		// 文件名encoding
		if (StringUtil.isNotBlank(tempFileName)) {
			String f = configUtil.getTempDir() + ConstUtil.DIR_SEP + tempFileName;
			requestContext.put(ContextKey.redirectUrl.get(), f);
		}
		return tempFileName;
	}*/
	
	private List<String> getVarLocation(Map<String, PTemplateMap> fieldMapping, Row firstRow) {
		List<String> fieldList = new ArrayList<String>();
		for (Cell cell : firstRow) {
			String value = cell.getStringCellValue();
			int prefix = value.indexOf(ConstUtil.STRING_LEFT_BRACE);
			int suffix = value.indexOf(ConstUtil.STRING_RIGHT_BRACE);
			if (prefix > -1) {
				String key = value.substring(prefix + 1, suffix);
				// 中文名->属性名
				fieldList.add(fieldMapping.get(key).getTemaField());
			}
		}
		return fieldList;
	}

	private List<Map<String, String>> parseExcel2Map(Sheet sheet, List<String> fieldList) {
		boolean isFirstRow = true;
		boolean isRowBlank = true;
		List<Map<String, String>> recordList = new ArrayList<Map<String, String>>();
		for (Row row : sheet) {
			if (isFirstRow) {
				isFirstRow = false;
				continue;
			}
			isRowBlank = true;
			Map<String, String> fieldMap = new HashMap<String, String>();
			int i = 0;
			for (String key : fieldList) {
				Cell cell = row.getCell(i);
				String value = null;
				if (cell != null) {
					switch (cell.getCellType()) {
					case Cell.CELL_TYPE_NUMERIC:
						if (DateUtil.isCellDateFormatted(cell)) {
							value = StringUtil.date2String(cell.getDateCellValue());
						} else {
							value = NumberUtil.removeDot(cell.getNumericCellValue());
						}
						break;
					case Cell.CELL_TYPE_STRING:
						value = cell.getRichStringCellValue().getString();
						break;
					case Cell.CELL_TYPE_FORMULA:
						value = cell.getCellFormula();
						break;
					default:
						value = cell.toString();
						break;
					}
					if (StringUtil.isNotBlank(value)) {
						isRowBlank = false;
					}
				}
				fieldMap.put(key, value);
				i++;
			}
			if (isRowBlank) {
				break;
			} else {
				recordList.add(fieldMap);
			}
		}
		return recordList;
	}

	@SuppressWarnings({ "rawtypes" })
	private void fillEntity(Object entity, Map<String, String> paramMap) {
		Map<String, Method> setMethodMap = MethodUtil.getSetMethods(entity);
		for (String key : paramMap.keySet()) {
			if (setMethodMap.containsKey(key) && StringUtil.isNotBlank(paramMap.get(key))) {
				Method thisMethod = setMethodMap.get(key);
				Class[] paramClass = thisMethod.getParameterTypes();
				Object objValue = StringUtil.parseValue(paramClass[0], paramMap.get(key));
				try {
					thisMethod.invoke(entity, objValue);
				} catch (Exception e) {
					logger.error("fill Entity error", e);
				}
			}
		}
	}

	/**
	 * 导出EXCEL报表, 需要传递查询参数, 这些查询参数是放在xml这个参数中, 需要解析成FosQuery列表 根据需要解析成XML或者JSON
	 * 
	 * @param paramMap
	 * @param isJSON
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private List<HtQuery> parseXml4Report(Map<String, String> paramMap, boolean isJSON) {
		List<HtQuery> conditions = null;
		String xml = paramMap.get(ConstUtil.XML);
		paramMap.remove(ConstUtil.XML);
		if (StringUtil.isNotBlank(xml) && !xml.equals("null")) {
			logger.debug(xml);
			HtRequest htRequest = null;
			if (isJSON) {
				xml = xml.replaceAll("\\\\", "");
				if (xml.startsWith("\"")) {
					xml = xml.substring(1, xml.length() - 1);
				}
				htRequest = (HtRequest) jsonMarshaller.getXStream().fromXML(xml);
			} else {
				htRequest = (HtRequest) xmlMarshaller.getXStream().fromXML(xml);
			}
			conditions = htRequest.getData();
		} else {
			conditions = new ArrayList<HtQuery>();
		}
		return conditions;
	}

	private PTemplate getTemplate() {
		PTemplate pt;
		if (requestContext.get(Constants.TEMP_PARAM_TYPE) != null
				&& requestContext.get(Constants.TEMP_PARAM_TYPE).equalsIgnoreCase(Constants.TEMP_PARAM_TYPE_CODE)) {
			String code = requestContext.get(Constants.TEMP_PARAM_ID);
			Map<String, Object> queryMap = new HashMap<String, Object>();
			queryMap.put(Constants.TEMP_PARAM_CODE, code);
			List<PTemplate> ptList = dao.findByProperties();
			pt = ptList.get(0);
		} else {
			Long id = Long.valueOf(requestContext.get(Constants.TEMP_PARAM_ID));
			pt = dao.findById(id);
		}
		return pt;
	}

	private Map<String, PTemplateMap> getTemplateMap(Map<String, String> queryMap) {
		Integer tetyId = Integer.valueOf(queryMap.get("tetyId"));
		Map<String, PTemplateMap> fieldMap = new HashMap<String, PTemplateMap>();		
		List<PTemplateMap> mapList = mapDao.getTemplateMap(queryMap.get("tetyId"));
		for (PTemplateMap ptm : mapList) {
			if (tetyId.equals(ptm.getTetyId())) {
				fieldMap.put(ptm.getTemaName(), ptm);
			}
		}
		return fieldMap;
	}

	private void handleChild(PTemplateType ptt, Map<String, PTemplateMap> fieldMap, List<Object> entityList,
			Sheet sheet, Map<String, List<List<Integer>>> varMap) {
		String child = ptt.getTetyChild();
		// 先找到子表变量所在行
		List<List<Integer>> childFirstVarList = varMap.get(getChildFirstVar(child, varMap, fieldMap));
		int startRowIndex = childFirstVarList.get(0).get(0);
		CellStyle childStyle = sheet.getRow(startRowIndex).getCell(childFirstVarList.get(0).get(1)).getCellStyle();
		childStyle.setWrapText(true);
		// 如果子表有合并行, 判定几行并成一行
		int rowSpan = getChildRowSpan(childFirstVarList, sheet, startRowIndex);
		// 判断是否套打, 默认是
		shiftRowsDown(ptt, entityList, sheet, childFirstVarList);
		// 把变量所在行的cell的数据, 复制到子表下面的行, 有n对象, 就复制n-1行
		if (entityList.size() > 1) {
			copyChildVar(entityList, sheet, startRowIndex, rowSpan);
		}
		int i = startRowIndex;
		for (Object entity : entityList) {
			Row row = sheet.getRow(i);
			if (row == null) {
				row = sheet.createRow(i);
			}
			for (String varName : varMap.keySet()) {
				PTemplateMap ptm = fieldMap.get(varName);
				if (ptm == null) {
					logger.info(varName + " can't find mapping record!");
				} else if (entity.getClass().getSimpleName().equalsIgnoreCase(ptm.getTemaTable())) {
					Object obj = MethodUtil.doGetMethod(entity, ptm.getTemaField());
					String newValue = executeConverter(ptm, toString(obj));
					List<List<Integer>> posList = varMap.get(varName);
					for (List<Integer> pos : posList) {
						Cell cell = row.getCell(pos.get(1));
						if (cell == null) {
							cell = row.createCell(pos.get(1));
							cell.setCellStyle(childStyle);
						}
						String value = cell.getStringCellValue();
						value = replace(value, varName, newValue);
						formatCellTypeByComment(cell, value);
					}
				}
			}
			i += rowSpan;
		}
	}

	private void copyChildVar(List<Object> entityList, Sheet sheet, int startRowIndex, int rowSpan) {
		Row firstRow = sheet.getRow(startRowIndex);
		for (int i = rowSpan; i < entityList.size() * rowSpan; i += rowSpan) {
			Row currentRow = sheet.getRow(startRowIndex + i);
			if (currentRow == null) {
				currentRow = sheet.createRow(startRowIndex + i);
			}
			for (Cell cell : firstRow) {
				Cell currentCell = currentRow.getCell(cell.getColumnIndex());
				if (currentCell == null) {
					currentCell = currentRow.createCell(cell.getColumnIndex());
				}
				currentCell.setCellType(Cell.CELL_TYPE_STRING);
				currentCell.setCellValue(cell.getStringCellValue());
				currentCell.setCellComment(cell.getCellComment());
			}
		}
	}

	private void handleParent(Map<String, PTemplateMap> fieldMap, Object entity, Sheet sheet,
			Map<String, List<List<Integer>>> varMap) {
		for (String varName : varMap.keySet()) {
			PTemplateMap ptm = fieldMap.get(varName);
			if (ptm == null) {
				logger.info(varName + " can't find mapping record!");
			} else if (entity.getClass().getSimpleName().equalsIgnoreCase(ptm.getTemaTable())) {
				Object obj = MethodUtil.doGetMethod(entity, ptm.getTemaField());
				String newValue = executeConverter(ptm, toString(obj));
				List<List<Integer>> posList = varMap.get(varName);
				for (List<Integer> pos : posList) {
					Row row = sheet.getRow(pos.get(0));
					Cell cell = row.getCell(pos.get(1));
					String value = cell.getStringCellValue();
					value = replace(value, varName, newValue);
					cell.setCellValue(value);
					formatCellTypeByComment(cell, value);
				}
			}
		}
	}

	private Map<String, List<List<Integer>>> getVarLocation(Sheet sheet) {
		Map<String, List<List<Integer>>> cellMap = new HashMap<String, List<List<Integer>>>();
		for (Row row : sheet) {
			for (Cell cell : row) {
				if (cell.getCellType() == Cell.CELL_TYPE_STRING
						&& StringUtil.contains(cell.getStringCellValue(), ConstUtil.STRING_LEFT_BRACE)) {
					String value = cell.getStringCellValue();
					int prefix = 0;
					int suffix = 0;
					do {
						prefix = value.indexOf(ConstUtil.STRING_LEFT_BRACE);
						suffix = value.indexOf(ConstUtil.STRING_RIGHT_BRACE);
						String key = value.substring(prefix + 1, suffix);
						List<List<Integer>> pos = cellMap.get(key);
						if (pos == null) {
							pos = new ArrayList<List<Integer>>();
							cellMap.put(key, pos);
						}
						List<Integer> newPos = new ArrayList<Integer>();
						newPos.add(cell.getRowIndex());
						newPos.add(cell.getColumnIndex());
						pos.add(newPos);
						value = value.substring(suffix + 1);
					} while (StringUtil.contains(value, ConstUtil.STRING_LEFT_BRACE));
				}
			}
		}
		return cellMap;
	}

	private String handleDoc(PTemplate pt, Map<String, PTemplateMap> fieldMap, Object entity) {
		String tempDir = configUtil.getRealTempDir();
		FileUtil.createDirs(tempDir);
		String filename = pt.getTempName() + ConstUtil.STRING_DOT + pt.getTempType();
		String realName = configUtil.getRealTemplateDir() + ConstUtil.DIR_SEP + filename;
		StringBuffer sb = new StringBuffer();
		InputStream is = null;
		try {
			is = new FileInputStream(realName);
			readToBuffer(sb, is);
			is.close();
			String content = sb.toString();
			// 循环变量, 替换string buffer中的变量
			// 对于主表, 只有一个对象
			if (entity != null) {
				for (String varName : fieldMap.keySet()) {
					PTemplateMap ptm = fieldMap.get(varName);
					if (ptm == null) {
						logger.info(varName + " can't find mapping record!");
					} else if (entity.getClass().getSimpleName().equalsIgnoreCase(ptm.getTemaTable())
							&& StringUtil.contains(content, ConstUtil.STRING_LEFT_BRACE + varName
									+ ConstUtil.STRING_RIGHT_BRACE)) {
						Object obj = MethodUtil.doGetMethod(entity, ptm.getTemaField());
						String newValue = executeConverter(ptm, toString(obj));
						content = replace(content, varName, newValue);
					}
				}
			}
			// 临时文件名加时间后缀, 防止同时导出时的重复, 和恶意下载(找到URL直接下载)
			String tempFileName = writeDocTempFile(pt, tempDir, content);
			// 文件名encoding
			tempFileName = StringUtil.utf82ascii(tempFileName);
			return tempFileName;
		} catch (Exception e) {
			throw new BusinessException(ExceptionEnum.FW_UNKNOWN_ERROR, e);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	private String executeConverter(PTemplateMap ptm, String newValue) {
		if (StringUtil.isNotBlank(ptm.getTemaConverter())) {
			logger.info("before converter " + ptm.getTemaConverter() + ":" + newValue);
			Method convertMethod;
			try {
				convertMethod = mappingConverterUtil.getClass().getMethod(ptm.getTemaConverter(), String.class);
				newValue = (String) convertMethod.invoke(mappingConverterUtil, newValue);
			} catch (Exception e) {
				logger.error("execute converter error", e);
			}
			logger.info("after converter " + ptm.getTemaConverter() + ":" + newValue);
		}
		if (newValue == null) {
			newValue = "";
		}
		return newValue;
	}

	private String writeDocTempFile(PTemplate pt, String tempDir, String content) {
		String tempFileName = pt.getTempName() + ConstUtil.STRING_UNDERLINE + System.currentTimeMillis()
				+ ConstUtil.STRING_DOT + Constants.TEMP_SUFFIX_WORD;
		FileOutputStream fileOut = null;
		try {
			fileOut = new FileOutputStream(tempDir + ConstUtil.DIR_SEP + tempFileName);
			writeFromBuffer(content, fileOut);
			fileOut.close();
		} catch (Exception e) {
			throw new BusinessException(ExceptionEnum.FW_UNKNOWN_ERROR, e);
		} finally {
			if (fileOut != null) {
				try {
					fileOut.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return tempFileName;
	}

	private void fillSysVar(Map<String, String> queryMap, Sheet sheet) {
		Map<String, List<Integer>> sysMap = new HashMap<String, List<Integer>>();
		for (Row row : sheet) {
			for (Cell cell : row) {
				if (cell.getCellType() == Cell.CELL_TYPE_STRING
						&& StringUtil.contains(cell.getStringCellValue(), ConstUtil.STRING_SHARP)) {
					String value = cell.getStringCellValue();
					int prefix = value.indexOf(ConstUtil.STRING_SHARP);
					int suffix = value.indexOf(ConstUtil.STRING_SHARP, prefix + 1);
					while (prefix > -1) {
						String key = value.substring(prefix + 1, suffix);
						List<Integer> pos = sysMap.get(key);
						if (pos == null) {
							pos = new ArrayList<Integer>();
							sysMap.put(key, pos);
						}
						pos.add(cell.getRowIndex());
						pos.add(cell.getColumnIndex());
						prefix = value.indexOf(ConstUtil.STRING_SHARP, suffix + 1);
						suffix = value.indexOf(ConstUtil.STRING_SHARP, prefix + 1);
					}
				}
			}
		}

		Map<String, String> sysConfigMap = getSysConfig(queryMap);
		for (String key : sysMap.keySet()) {
			List<Integer> pos = sysMap.get(key);
			Cell cell = sheet.getRow(pos.get(0)).getCell(pos.get(1));
			String value = cell.getStringCellValue();
			String newValue = sysConfigMap.get(key);
			value = replaceSharp(value, key, newValue);
			cell.setCellValue(value);
		}
	}

	/**
	 * @param queryMap
	 * @return
	 */
	private Map<String, String> getSysConfig(Map<String, String> queryMap) {
		Map<String, String> sysConfigMap = new HashMap<String, String>();
		queryMap.put("compCode", sessionContext.getCompCode());
		queryMap.put(ConstUtil.Removed, ConstUtil.FalseStr);
		List<PCompanyConfig> configList = companyConfigDao.findByProperties(queryMap);
		for (PCompanyConfig companyConfig : configList) {
			sysConfigMap.put(companyConfig.getCocoCode(), companyConfig.getCocoValue());
		}
		sysConfigMap.put("YY", TimeUtil.getYear());
		sysConfigMap.put("MM", TimeUtil.getMonth());
		sysConfigMap.put("DD", TimeUtil.getDay());
		return sysConfigMap;
	}

	private String getChildFirstVar(String child, Map<String, List<List<Integer>>> cellMap,
			Map<String, PTemplateMap> fieldMap) {
		String oneChildVar = null;
		for (String varName : cellMap.keySet()) {
			PTemplateMap ptm = fieldMap.get(varName);
			if (ptm == null) {
				logger.info(varName + " can't find mapping record!");
			}
			if (child != null && child.equalsIgnoreCase(ptm.getTemaTable())) {
				oneChildVar = varName;
				break;
			}
		}
		return oneChildVar;
	}

	private int getChildRowSpan(List<List<Integer>> varList, Sheet sheet, int startRow) {
		int rowSpan = 1;
		for (int i = 0; i < sheet.getNumMergedRegions(); i++) {
			CellRangeAddress region = ((HSSFSheet) sheet).getMergedRegion(i);
			int thisColumn = varList.get(0).get(1);
			if (startRow >= region.getFirstRow() && startRow <= region.getLastRow()
					&& thisColumn >= region.getFirstColumn() && thisColumn <= region.getLastColumn()) {
				rowSpan = region.getLastRow() - region.getFirstRow() + 1;
				break;
			}
		}
		return rowSpan;
	}

	private void shiftRowsDown(PTemplateType ptt, List<Object> entityList, Sheet sheet, List<List<Integer>> varList) {
		int startRow = varList.get(0).get(0);
		if (ConstUtil.FalseByte.equals(ptt.getTetyFormFlag())) {
			if (entityList.size() > 1) {
				sheet.shiftRows(startRow + 1, sheet.getLastRowNum(), entityList.size() - 1, true, true);
				// 复制行
				Row first = sheet.getRow(startRow);
				int end = first.getLastCellNum();
				for (int i = startRow + 1; i < startRow + entityList.size(); i++) {
					Row row = sheet.getRow(i);
					if (row != null) {
						for (int j = 0; j <= end; j++) {
							Cell cell = row.getCell(j);
							if (cell == null)
								cell = row.createCell(j);
							Cell template = first.getCell(j);
							int k = j;
							while (template == null && k > 0) {
								template = first.getCell(--k);
							}
							if (template != null) {
								CellStyle style = template.getCellStyle();
								cell.setCellStyle(style);
							}
						}
					}
				}
				// 合并单元格
				for (int i = 0; i < sheet.getNumMergedRegions(); i++) {
					CellRangeAddress region = ((HSSFSheet) sheet).getMergedRegion(i);
					if (startRow >= region.getFirstRow() && startRow <= region.getLastRow()) {
						for (int j = 1; j < entityList.size(); j++) {
							CellRangeAddress newRegion = region.copy();
							int left = region.getFirstColumn();
							int right = region.getLastColumn();
							newRegion.setFirstColumn(left);
							newRegion.setLastColumn(right);
							newRegion.setFirstRow(startRow + j);
							newRegion.setLastRow(startRow + j);
							sheet.addMergedRegion(newRegion);
						}
					}
				}
			}
		}
	}

	@SuppressWarnings({ "rawtypes" })
	private List executeAction(PTemplateType ptt, Object... param) {
		String queryActionName = ptt.getTetyAction();
		requestContext.put(ContextKey.actionName.get(), queryActionName);
		Action action = actionManager.getAction(queryActionName);
		Object service = SpringContextHolder.getBean(action.getServiceName());
		Method[] methods = service.getClass().getMethods();
		List entityList = null;
		for (Method method : methods) {
			if (method.getName().equalsIgnoreCase(action.getMethod())) {
				try {
					if (method.getParameterTypes().length == 1 && param.length == 2) {
						entityList = (List) method.invoke(service, param[0]);
					} else if (method.getParameterTypes().length == 0) {
						entityList = (List) method.invoke(service);
					} else {
						entityList = (List) method.invoke(service, param);
					}
				} catch (Exception e) {
					logger.error("execute error", e);
				}
				break;
			}
		}
		return entityList;
	}

	private void formatCellTypeByComment(Cell cell, String value) {
		int cellType = getCellTypeByComment(cell);
		if (StringUtil.isNotBlank(value)) {
			switch (cellType) {
			case Cell.CELL_TYPE_NUMERIC:
				cell.setCellValue(Double.parseDouble(value));
				break;
			case Cell.CELL_TYPE_BOOLEAN:
				cell.setCellValue(Boolean.parseBoolean(value));
				break;
			case Cell.CELL_TYPE_BLANK:
				break;
			case Cell.CELL_TYPE_ERROR:
				break;
			default:
				cell.setCellValue(value);
				break;
			}
			cell.setCellType(cellType);
		} else {
			cell.setCellValue(value);
		}
	}

	private int getCellTypeByComment(Cell cell) {
		int type = Cell.CELL_TYPE_STRING;
		if (cell.getCellComment() != null) {
			String comment = cell.getCellComment().getString().getString();
			if (StringUtil.contains(comment, Constants.CELL_TYPE_NUMBER)) {
				type = Cell.CELL_TYPE_NUMERIC;
			} else if (StringUtil.contains(comment, Constants.CELL_TYPE_BOOL)) {
				type = Cell.CELL_TYPE_BOOLEAN;
			} else if (StringUtil.contains(comment, Constants.CELL_TYPE_BLANK)) {
				type = Cell.CELL_TYPE_BLANK;
			} else if (StringUtil.contains(comment, Constants.CELL_TYPE_ERROR)) {
				type = Cell.CELL_TYPE_ERROR;
			}
		}
		return type;
	}

	private void reCalcFormula(Sheet sheet, FormulaEvaluator evaluator) {
		for (Row r : sheet) {
			for (Cell c : r) {
				if (c.getCellType() == Cell.CELL_TYPE_FORMULA) {
					evaluator.evaluateFormulaCell(c);
				}
			}
		}
	}

	private void readToBuffer(StringBuffer buffer, InputStream is) throws IOException {
		InputStream bis = new BufferedInputStream(is);
		byte[] bf = new byte[bis.available()];
		bis.read(bf);
		bis.close();
		buffer.append(new String(bf));
		bf = null;
	}

	private void writeFromBuffer(String str, OutputStream os) {
		PrintStream ps = new PrintStream(os);
		ps.print(str);
	}

	private String toString(Object obj) {
		if (obj == null) {
			return "";
		}
		String s = null;
		if (obj instanceof String) {
			s = (String) obj;
		} else if (obj instanceof Double || obj instanceof Float || obj instanceof BigDecimal) {
			s = NumberUtil.numberFormat2(((Number) obj).doubleValue());
		} else if (obj instanceof Integer || obj instanceof Long || obj instanceof BigInteger || obj instanceof Short) {
			s = String.valueOf(((Number) obj).longValue());
		} else if (obj instanceof Date) {
			s = ((Date) obj).toString();
		}
		return s;
	}

	/**
	 * 把字符串s中的变量v替换成r, 如果s为空, 直接返回r
	 * 
	 * @param s
	 * @param v
	 * @param r
	 * @return
	 */
	private String replace(String s, String v, String r) {
		if (StringUtil.isBlank(s)) {
			return r;
		}
		s = s.replaceAll("\\" + ConstUtil.STRING_LEFT_BRACE + v + "\\" + ConstUtil.STRING_RIGHT_BRACE,
				Matcher.quoteReplacement(r));
		return s;
	}

	/**
	 * 把字符串s中的变量#v#替换成r, 如果s为空, 直接返回r
	 * 
	 * @param s
	 * @param v
	 * @param r
	 * @return
	 */
	private String replaceSharp(String s, String v, String r) {
		if (r == null)
			r = "";
		if (StringUtil.isBlank(s))
			return r;
		s = s.replaceAll("\\" + ConstUtil.STRING_SHARP + v + "\\" + ConstUtil.STRING_SHARP, r);
		return s;
	}

	@Transactional(readOnly = true)
	public List<PTemplate> query() {
		return dao.findByProperties();
	}
}
