package com.hitisoft.fos.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hitisoft.fos.general.dao.GPaymentTermDao;
import com.hitisoft.fos.general.dao.GTransTermDao;
import com.hitisoft.fos.general.entity.GPaymentTerm;
import com.hitisoft.fos.general.entity.GTransTerm;
import com.hitisoft.fos.sys.dao.PUserDao;
import com.hitisoft.fos.sys.entity.PUser;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;

@Component
public class MappingConverterUtil {
	private Logger logger = LoggerFactory.getLogger(MappingConverterUtil.class);
	@Autowired
	private GTransTermDao transTermDao;
	@Autowired
	private GPaymentTermDao paymentTermDao;
	@Autowired
	private PUserDao userDao;

	public String Bool(String str) {
		if ("1".equals(str)) {
			return "YES";
		}
		return "NO";
	}

	public String ChineseBool(String str) {
		if ("1".equals(str)) {
			return "是";
		}
		return "否";
	}
	
	public String subString8(String s) {
		if (StringUtil.isBlank(s)) {
			return s;
		}
		if (s.length() <= 8) {
			return s;
		}
		return s.substring(0, 8);
	}

	public String getFirstLine(String str) {
		if (StringUtil.contains(str, ConstUtil.STRING_RETURN_WIN)) {
			str = str.substring(0, str.indexOf(ConstUtil.STRING_RETURN_WIN));
		} else if (StringUtil.contains(str, ConstUtil.STRING_RETURN_UNIX)) {
			str = str.substring(0, str.indexOf(ConstUtil.STRING_RETURN_UNIX));
		}
		return str;
	}

	public String toLocalDate(String strDate) {
		String from = "yyyy-MM-dd";
		String to = "yyyy年MM月dd日";
		SimpleDateFormat fromFormat = new SimpleDateFormat(from);
		SimpleDateFormat toFormat = new SimpleDateFormat(to);
		String targetDate = null;
		try {
			Date date = fromFormat.parse(strDate);
			targetDate = toFormat.format(date);
		} catch (ParseException e) {
			logger.error("convert date ({}) from {} to {} failed!", new Object[] { strDate, from, to });
		}
		return targetDate;
	}

	public static void main(String[] args) {
		MappingConverterUtil util = new MappingConverterUtil();
		String d = util.toLocalDate("2008-10-27");
		System.out.println(d);
		System.out.print("aaa\nbbb\nccc");
		String s = util.getFirstLine("aaa\nbbb\nccc");
		System.out.print(s);
		System.out.println("end");
	}

	public String getTranCode(String strId) {
		if (StringUtil.isBlank(strId)) {
			return "";
		}
		Long id = Long.valueOf(strId);
		GTransTerm entity = transTermDao.findById(id);
		return entity.getTranCode();
	}

	public String getPateName(String strId) {
		if (StringUtil.isBlank(strId)) {
			return "";
		}
		Long id = Long.valueOf(strId);
		GPaymentTerm entity = paymentTermDao.findById(id);
		return entity.getPateName();
	}

	public String getUserName(String strId) {
		if (StringUtil.isBlank(strId)) {
			return "";
		}
		Long id = Long.valueOf(strId);
		PUser entity = userDao.findById(id);
		return entity.getUserName();
	}

	public String getCleanBL(String flag) {
		if (ConstUtil.TrueStr.equals(flag)) {
			return "clean on board";
		}
		return "";
	}

	public String invoStatus(String code) {
		String status = "";
		if ("0".equals(code)) {
			status = "未审核";
		} else if ("1".equals(code)) {
			status = "已审核";
		} else if ("2".equals(code)) {
			status = "已作废";
		}
		return status;
	}
	
	public String writeoffStatus(String code) {
		String status = "";
		if ("0".equals(code)) {
			status = "未核销";
		} else if ("1".equals(code)) {
			status = "部分核销";
		} else if ("2".equals(code)) {
			status = "已核销";
		}
		return status;
	}
	
	public String freightType(String code) {
		String status = "";
		if ("0".equals(code)) {
			status = "预付";
		} else if ("1".equals(code)) {
			status = "到付";
		} 
		return status;
	}
	
	public String cargoType(String code) {
		String status = "";
		if ("0".equals(code)) {
			status = "文件";
		} else if ("1".equals(code)) {
			status = "包裹";
		} 
		return status;
	}
	
	public String signStatus(String code) {
		String status = "";
		if ("0".equals(code)) {
			status = "未开始";
		} else if ("1".equals(code)) {
			status = "已开始";
		} else if("2".equals(code)) {
			status = "已完成";
		}
		return status;
	}
	
	public String deliveryStatus(String code){
		String status = "";
		if ("0".equals(code)) {
			status = "未提货";
		} else if ("1".equals(code)) {
			status = "已提货";
		} else if("2".equals(code)) {
			status = "已到门";
		}
		return status;
	}
	
	public String getExpeType(String code){
		String status = "";
		if ("R".equals(code)) {
			status = "应收";
		} else if ("P".equals(code)) {
			status = "应付";
		}
		return status;
	}
	
	public String getBizType(String code){
		String status = "";
		if ("A".equals(code)) {
			status = "空运";
		} else if ("E".equals(code)) {
			status = "快件";
		}else if ("G".equals(code)) {
			status = "报关";
		}else if ("I".equals(code)) {
			status = "报检";
		}else if ("M".equals(code)) {
			status = "海运";
		}else if ("T".equals(code)) {
			status = "陆运";
		}else if ("W".equals(code)) {
			status = "仓储";
		}
		return status;
	}
}
