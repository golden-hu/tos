package com.hitisoft.cms.util;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.hitisoft.cms.dao.HcmsResourceDao;
import com.hitisoft.cms.entity.HcmsResource;
import com.hitisoft.fw.session.SessionContext;
import com.hitisoft.fw.spring.SpringContextHolder;
import com.hitisoft.fw.util.ConstUtil;
import com.hitisoft.fw.util.StringUtil;

public class PreviewServlet extends HttpServlet {

	private static final long serialVersionUID = 340922543344781565L;
	private static final Logger logger = LoggerFactory.getLogger(PreviewServlet.class);
	@Autowired
	private SessionContext sessionContext;
	@Autowired
	private ConfigUtil configUtil;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Long no = null;
		no = Long.valueOf(req.getParameter("no"));
		String compCode = req.getParameter("compCode");
		String mode = req.getParameter("mode");
		if (StringUtil.isNotBlank(compCode))
			sessionContext.setCompCode(compCode);

		HcmsResourceDao dao = SpringContextHolder.getBean("hcmsResourceDAO");
		HcmsResource resource = dao.findById(no);
		String uri = null;
		Integer tempId = null;
		// 判断是文章还是频道?
		if (Constants.CMS_TYPE_ARTICLE.equals(resource.getType())) {
			tempId = resource.getTempa();
			Integer pno = resource.getPno();
			HcmsResource channel = dao.findById(pno.longValue());
			if (tempId == null) {
				tempId = channel.getTempa();
			}
			req.setAttribute("article", resource);
			req.setAttribute("channel", channel);
		} else {
			tempId = resource.getTempc();
			// 列表页
			if ("list".equals(mode)) {
				tempId = resource.getTempl();
			}
			req.setAttribute("channel", resource);
		}
		if (tempId == null) {
			resp.getWriter().print("template not found!");
			resp.flushBuffer();
			return;
		}
		uri = ConstUtil.DIR_SEP + configUtil.getTemplateDir() + ConstUtil.DIR_SEP + tempId + ConstUtil.STRING_DOT
				+ "jsp";

		RequestDispatcher rd = getServletContext().getRequestDispatcher(uri);
		if (rd == null) {
			logger.error("rd RequestDispatcher is null");
			resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, uri);
			return;
		}
		rd.forward(req, resp);
	}
}
