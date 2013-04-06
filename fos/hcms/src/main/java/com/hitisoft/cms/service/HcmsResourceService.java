package com.hitisoft.cms.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hitisoft.cms.dao.HcmsResourceDao;
import com.hitisoft.cms.entity.HcmsResource;
import com.hitisoft.cms.util.ConfigUtil;
import com.hitisoft.cms.util.Constants;
import com.hitisoft.cms.util.ImageUtil;
import com.hitisoft.fw.exception.BusinessException;
import com.hitisoft.fw.exception.ExceptionEnum;
import com.hitisoft.fw.orm.util.RowAction;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.FileUtil;
import com.hitisoft.fw.util.StringUtil;
import com.hitisoft.fw.util.TimeUtil;
import com.hitisoft.fw.web.HtRequest;

@Service
public class HcmsResourceService {
	@Autowired
	private HcmsResourceDao dao;
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private HtRequest htRequest;
	@Autowired
	private ConfigUtil configUtil;
	
	public Map<Long, String> channelMap = new HashMap<Long, String>();
	private int smallImageSize = 160;
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Transactional
	public List<HcmsResource> save(List<HcmsResource> entityList) {
		List<HcmsResource> retList = new ArrayList<HcmsResource>();
		for (HcmsResource entity : entityList) {
			switch (entity.getRowAction()) {
			case N:
				entity.setNo(null);
				dao.add(entity);
				if (Constants.CMS_TYPE_ARTICLE.equals(entity.getType())) {
					entity.setUrl(getCmsHtmlDir() + entity.getPno() + ConstUtil.DIR_SEP + entity.getNo() + ".html");
					entity.setPurl(getCmsHtmlDir() + entity.getPno() + ConstUtil.DIR_SEP + "index.html");
					entity = dao.update(entity);
				} else if (Constants.CMS_TYPE_CATEGORY.equals(entity.getType())) {
					entity.setUrl(getCmsHtmlDir() + entity.getNo() + ConstUtil.DIR_SEP + "index.html");
					entity.setPurl(getCmsHtmlDir() + entity.getPno() + ConstUtil.DIR_SEP + "index.html");
					entity.setLurl(getCmsHtmlDir() + entity.getNo() + ConstUtil.DIR_SEP + "list_1.html");
					entity = dao.update(entity);
				}
				retList.add(entity);
				break;
			case M:
				retList.add(dao.update(entity));
				break;
			case R:
				HcmsResource delEntity = dao.findById(entity.getNo().longValue());
				delEntity.setRowAction(RowAction.R);
				if (Constants.CMS_TYPE_CATEGORY.equals(delEntity.getType())
						|| Constants.CMS_TYPE_DIRECTORY.equals(delEntity.getType())) {
					// 删除分类或者目录, 要把下面的子类也一起删除
					List<HcmsResource> childList = dao.complexQueryByPid(entity.getNo().longValue());
					for (HcmsResource item : childList) {
						item.setRowAction(RowAction.R);
						dao.update(item);
					}
				}
				dao.update(delEntity);
				break;
			default:
				throw new BusinessException(ExceptionEnum.FW_ROWACTION_NULL);
			}
		}
		return retList;
	}

	@Transactional(readOnly = true)
	public List<HcmsResource> query() {
		return dao.findByProperties();
	}

	@Transactional
	public List<HcmsResource> upload() {
		List<HcmsResource> retList = new ArrayList<HcmsResource>();
		String strNo = requestContext.get("no");
		String strPno = requestContext.get("pno");
		String pnos = requestContext.get("pnos");
		String pname = requestContext.get("pname");
		String type = requestContext.get("type");
		String rowAction = requestContext.get("rowAction");
		Collection<MultipartFile> items = htRequest.getFileItems();
		if (items != null) {
			for (MultipartFile item : items) {
				boolean isImage = item.getContentType().toLowerCase().contains("image");

				String dir = configUtil.getRealResourceDir();
				File fdir = new File(dir);
				if (!fdir.exists())
					fdir.mkdirs();

				String fileName = item.getName();
				if (StringUtil.contains(fileName, "/")) {
					fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
				} else {
					fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
				}
				String extName = fileName.substring(fileName.lastIndexOf(".") + 1);
				fileName = fileName.substring(0, fileName.lastIndexOf("."));

				File f = new File(dir + ConstUtil.DIR_SEP + TimeUtil.getMillis());
				int width = 0;
				int height = 0;
				try {
					item.transferTo(f);
					if (isImage) {
						BufferedImage Bi = ImageIO.read(f);
						width = Bi.getWidth();
						height = Bi.getHeight();
					}
				} catch (Exception e) {
					throw new BusinessException(ExceptionEnum.FW_UPLOAD_FILE_ERROR, e);
				}
				HcmsResource file = null;
				// 新增
				if (RowAction.N.name().equalsIgnoreCase(rowAction)) {
					file = new HcmsResource();
					file.setName(fileName);
					file.setType(type);
					file.setPno(Integer.parseInt(strPno));
					file.setPnos(pnos);
					file.setPname(pname);
					file.setPath(configUtil.getResourceDir());
					file.setFiletype(isImage ? ConstUtil.TrueByte : ConstUtil.FalseByte);
					file.setExt(extName);
					file.setSize(new Double(Math.ceil(1.0 * item.getSize() / 1024)).intValue());
					file.setWidth(width);
					file.setHeight(height);
					file.setActive(ConstUtil.TrueByte);
					dao.add(file);
				} else if (RowAction.M.name().equalsIgnoreCase(rowAction)) {
					// 修改
					file = dao.findById(Long.valueOf(strNo));
					file.setFiletype(isImage ? ConstUtil.TrueByte : ConstUtil.FalseByte);
					file.setExt(extName);
					file.setSize(new Double(Math.ceil(1.0 * item.getSize() / 1024)).intValue());
					file.setWidth(width);
					file.setHeight(height);
					file.setActive(ConstUtil.TrueByte);
					dao.update(file);
				}
				retList.add(file);
				saveImageAndIcon(f, file);
			}
		}
		return retList;
	}

	private void saveImageAndIcon(File f, HcmsResource file) {
		String dir = configUtil.getRealResourceDir();
		String bigF = dir + ConstUtil.DIR_SEP + file.getNo() + "." + file.getExt();
		String smallF = dir + ConstUtil.DIR_SEP + "t_" + file.getNo() + "." + file.getExt();
		File target = new File(bigF);
		if (target.exists())
			target.delete();
		f.renameTo(target);
		// 生成小图
		ImageUtil.saveImageAsJpg(bigF, smallF, smallImageSize, smallImageSize, true);
	}

	@Transactional
	public List<HcmsResource> cutImage() {
		List<HcmsResource> retList = new ArrayList<HcmsResource>();
		Long no = Long.valueOf(requestContext.get("no"));
		int x = Integer.parseInt(requestContext.get("x"));
		int y = Integer.parseInt(requestContext.get("y"));
		int width = Integer.parseInt(requestContext.get("width"));
		int height = Integer.parseInt(requestContext.get("height"));
		byte replace = Byte.valueOf(requestContext.get("replace"));
		logger.info("{}", requestContext);
		String dir = configUtil.getRealResourceDir();

		HcmsResource src = dao.findById(no);
		String srcPath = dir + ConstUtil.DIR_SEP + src.getNo() + "." + src.getExt();
		// GIF文件的剪切有bug, 所以都用PNG
		String destPath = dir + ConstUtil.DIR_SEP + TimeUtil.getMillis() + ".png";
		ImageUtil.saveSubImage(srcPath, destPath, x, y, width, height);
		File destFile = new File(destPath);
		// 新增
		if (replace == ConstUtil.FalseByte) {
			HcmsResource dest = new HcmsResource();
			BeanUtils.copyProperties(src, dest);
			dest.setNo(null);
			dest.setName(dest.getName() + "-1");
			dest.setRowAction(RowAction.N);
			src = dest;
		}
		src.setSize(new Double(Math.ceil(1.0 * destFile.length() / 1024)).intValue());
		src.setWidth(width);
		src.setHeight(height);
		src.setActive(ConstUtil.TrueByte);
		if (replace == ConstUtil.FalseByte) {
			dao.add(src);
			src.setId(src.getNo().longValue());
		} else {
			src = dao.update(src);
		}
		// 生成小图片
		saveImageAndIcon(destFile, src);
		retList.add(src);
		return retList;
	}

	@Transactional
	public HcmsResource publish() {
		HcmsResource resource = dao.findById(Long.valueOf(requestContext.get("no")));
		// 判断是文章还是频道?
		if (Constants.CMS_TYPE_ARTICLE.equals(resource.getType())) {
			resource = buildArticle(resource);
		} else {
			resource = buildChannel(resource);
		}
		return resource;
	}

	@Transactional
	private HcmsResource buildChannel(HcmsResource resource) {
		// 首页
		resource = buildChannelTop(resource);
		// 列表页
		String total = channelMap.get(resource.getNo());
		int iTotal = 0;
		try {
			iTotal = Integer.parseInt(total);
		} catch (NumberFormatException e) {
			iTotal = 0;
		}
		if (iTotal > 1) {
			for (int i = 1; i <= iTotal; i++) {
				resource = buildChannelList(resource, i);
			}
		}
		// 文章页
		Map<String, String> map = new HashMap<String, String>();
		map.put("pno", "" + resource.getNo());
		map.put("type", Constants.CMS_TYPE_ARTICLE);
		List<HcmsResource> articles = dao.findByProperties(map);
		for (HcmsResource article : articles) {
			buildArticle(article);
		}
		// 循环子频道
		map.clear();
		map.put("pno", "" + resource.getNo());
		map.put("type", Constants.CMS_TYPE_CATEGORY);
		List<HcmsResource> channels = dao.findByProperties(map);
		for (HcmsResource channel : channels) {
			buildChannel(channel);
		}
		return resource;
	}

	@Transactional
	private HcmsResource buildChannelTop(HcmsResource resource) {
		String targetFileName = getDocRoot() + resource.getNo() + ConstUtil.DIR_SEP;
		String strUrl = getPreviewUrl() + "&no=" + resource.getNo();
		targetFileName += "index.html";
		writeFile(targetFileName, strUrl);
		resource.setPublisher(sessionContext.getUsername());
		resource.setPublishtime(TimeUtil.getNow());
		resource = dao.update(resource);
		return resource;
	}

	@Transactional
	private HcmsResource buildChannelList(HcmsResource resource, int i) {
		String targetFileName = getDocRoot() + resource.getNo() + ConstUtil.DIR_SEP;
		String strUrl = getPreviewUrl() + "&mode=list&no=" + resource.getNo();
		targetFileName += "list_" + i + ".html";
		strUrl += "&page=" + i;
		writeFile(targetFileName, strUrl);
		resource.setPublisher(sessionContext.getUsername());
		resource.setPublishtime(TimeUtil.getNow());
		resource = dao.update(resource);
		return resource;
	}

	@Transactional
	private HcmsResource buildArticle(HcmsResource resource) {
		String targetFileName = getDocRoot() + resource.getPno() + ConstUtil.DIR_SEP + resource.getNo() + ".html";
		logger.debug(targetFileName);
		String strUrl = getPreviewUrl() + "&no=" + resource.getNo();
		writeFile(targetFileName, strUrl);
		resource.setPublisher(sessionContext.getUsername());
		resource.setPublishtime(TimeUtil.getNow());
		resource = dao.update(resource);
		return resource;
	}

	private void writeFile(String targetFileName, String strUrl) {
		URL url = null;
		URLConnection urlConn = null;
		File f = new File(targetFileName);
		FileUtil.createDirs(f.getParent());
		try {
			url = new URL(strUrl);
			urlConn = url.openConnection();
			urlConn.setDoInput(true);
			urlConn.setDoOutput(true);
			urlConn.setUseCaches(false);
			InputStream stream = urlConn.getInputStream();
			OutputStream bos = new FileOutputStream(targetFileName);
			int bytesRead = 0;
			byte[] buffer = new byte[8192];
			while ((bytesRead = stream.read(buffer, 0, 8192)) != -1) {
				bos.write(buffer, 0, bytesRead);
			}
			bos.close();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private String getPreviewUrl() {
		String previewUrl = "http://localhost:8080/hcms/preview?compCode=" + sessionContext.getCompCode();
		return previewUrl;
	}

	private String getDocRoot() {
		// 站点的信息
		String docRoot = "html";
		if (!docRoot.endsWith("/")) {
			docRoot += "/";
		}
		return docRoot;
	}

	public String getCmsHtmlDir() {
		return configUtil.getDataDir() + ConstUtil.DIR_SEP + sessionContext.getCompCode()
				+ ConstUtil.DIR_SEP;
	}

}
