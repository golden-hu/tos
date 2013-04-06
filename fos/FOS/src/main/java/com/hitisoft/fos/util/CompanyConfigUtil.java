package com.hitisoft.fos.util;

import com.hitisoft.fos.sys.service.PCompanyConfigService;
import com.hitisoft.fw.spring.SpringContextHolder;

public class CompanyConfigUtil {
	public static String getCompanyConfig(String code) {
		PCompanyConfigService configService = SpringContextHolder.getBean("PCompanyConfigService");
		return configService.queryByCode(code);
	}
}
