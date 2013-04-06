package com.hitisoft.fos.sys.service;

import java.io.File;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hitisoft.fos.sys.dao.CAttachDao;
import com.hitisoft.fos.sys.entity.CAttach;
import com.hitisoft.fos.util.ConfigUtil;
import com.hitisoft.fos.util.FosExceptionEnum;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.web.HtRequest;

@Service
public class CAttachService {
	@Autowired
	private CAttachDao dao;
	@Autowired
	private ConfigUtil configUtil;
	
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private HtRequest htRequest;
	
	@Transactional
	public List<CAttach> save(List<CAttach> entityList) {
		return dao.saveByRowAction(entityList);
	}

	@Transactional(readOnly = true)
	public List<CAttach> query() {
		return dao.findByProperties();
	}
	
	@Transactional
	public void removeAttach(List<CAttach> entityList) {
		for (CAttach entity : entityList) {
			CAttach delEntity = dao.findById(entity.getId());
			delEntity.setRowAction(RowAction.R);
			dao.update(delEntity);
		}
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public void uploadAttach(Map<String, String> paramMap) {
		String attachDir = configUtil.getRealAttachDir();
		String consId = paramMap.get("consId");
		String consNo = paramMap.get("consNo");
		String consBizType = paramMap.get("consBizType");
		
		File f = new File(attachDir);
		if (!f.exists()) {
			f.mkdirs();
		}

		Collection<MultipartFile> items = htRequest.getFileItems();
		for (MultipartFile item : items) {
			
			String oriFileName = item.getName();
			int beginIdex = oriFileName.lastIndexOf(".");			
			String extName = oriFileName.substring(beginIdex);			
			CAttach fa = new CAttach();
			fa.setRowAction(RowAction.N);
			fa.setAttachFileName(oriFileName);
			fa.setConsId(Integer.parseInt(consId));
			fa.setConsNo(consNo);
			fa.setConsBizType(consBizType);
			fa = dao.saveByRowActionSolo(fa);
			
			String filename = fa.getId() + ConstUtil.STRING_DOT + extName;
			try {
				item.transferTo(new File(attachDir + ConstUtil.DIR_SEP + filename));
			} catch (Exception e) {
				throw new BusinessException(FosExceptionEnum.SYS_TEMPLATE_SAVE_FAILED, attachDir + ConstUtil.DIR_SEP
						+ filename);
			}
		}
	}

	public void downAttach() {
		String attachId = requestContext.get("attachId");
		
		if (StringUtil.isNotBlank(attachId)) {
			Long id = Long.parseLong(attachId);
			CAttach fa = dao.findById(id);
			
			String attachDir = configUtil.getRealAttachDir();
			String extName = fa.getAttachExtName();
			
			File f = new File(attachDir + ConstUtil.DIR_SEP + attachId +  ConstUtil.STRING_DOT + extName);
			if (!f.exists()) {
				throw new BusinessException(FosExceptionEnum.SYS_FILE_NOT_EXIST);
			}
			
			String filename =configUtil.getAttachDir() + attachId +  ConstUtil.STRING_DOT + extName;
			requestContext.put(ContextKey.redirectUrl.get(), filename);
		}
	}
}

