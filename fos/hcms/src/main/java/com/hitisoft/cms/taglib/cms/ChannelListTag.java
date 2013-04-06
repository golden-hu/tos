package com.hitisoft.cms.taglib.cms;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.springframework.beans.factory.annotation.Autowired;

import com.hitisoft.cms.dao.HcmsResourceDao;
import com.hitisoft.cms.entity.HcmsResource;
import com.hitisoft.cms.util.Constants;
import com.hitisoft.fw.session.ContextKey;
import com.hitisoft.fw.session.RequestContext;
import com.hitisoft.fw.util.StringUtil;

public class ChannelListTag extends BodyTagSupport {
	private static final long serialVersionUID = -1216760986480661403L;
	@Autowired
	private RequestContext requestContext;
	@Autowired
	private HcmsResourceDao dao;
	protected Iterator<HcmsResource> iterator = null;
	protected int lengthCount = 0;
	protected int lengthValue = 0;
	protected boolean started = false;
	
	protected String id = null;
	protected String indexid = null;
	protected String length = null;
	protected String orderby;
	
	private Integer no;
	private Integer version;
	private String code;
	private String name;
	private String type;
	private String channeltype;
	private String url;
	private String lurl;
	private String purl;
	private String icon;
	private Integer pno;
	private String pcode;
	private String pname;
	private String pnos;
	private String title;
	private String summary;
	private String body;
	private String author;
	private Date addtime;
	private String source;
	private String publisher;
	private Date publishtime;
	private Short audit;
	private Integer words;
	private String keywords;
	private Integer pv;
	private Integer rate;
	private Integer ratenum;
	private Integer comments;
	private String auditor;
	private Date audittime;
	private Integer tempc;
	private Integer templ;
	private Integer tempa;
	private Integer rank;
	private String ext;
	private Short filetype;
	private Integer width;
	private Integer height;
	private Integer size;
	private String path;
	private Short imgflag;
	private Short movieflag;
	private Short active;

	public String getId() {
		return (this.id);
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getIndex() {
		if (started)
			return (lengthCount - 1);
		else
			return (0);
	}

	public String getIndexid() {
		return this.indexid;
	}

	public void setIndexid(String indexid) {
		this.indexid = indexid;
	}

	public String getLength() {
		return (this.length);
	}

	public void setLength(String length) {
		this.length = length;
	}

	public String getOrderby() {
		return this.orderby;
	}

	public void setOrderby(String orderby) {
		this.orderby = orderby;
	}

	public int doStartTag() throws JspException {
//		SessionManager.regSession(pageContext.getSession());
//		Map<String, Object> propertyMap = new HashMap<String, Object>();
		// 根据参数拼SQL: where, order by, limit
		buildQuery(requestContext);
		if (getOrderby() != null) {
			requestContext.put(ContextKey.orderby.get(), getOrderby());
		} else {
			requestContext.put(ContextKey.orderby.get(), "no desc");
		}
		Collection<HcmsResource> col = dao.findByProperties(requestContext);
		if (col != null)
			iterator = col.iterator();

		// Calculate the rendering length
		if (length == null) {
			lengthValue = 0;
		} else {
			try {
				lengthValue = Integer.parseInt(length);
			} catch (NumberFormatException e) {
				lengthValue = 0;
			}
		}
		if (lengthValue < 0) {
			lengthValue = 0;
		}
		lengthCount = 0;

		// Store the first value and evaluate, or skip the body if none
		if (iterator == null)
			return (SKIP_BODY);
		if (iterator.hasNext()) {
			Object element = iterator.next();
			if (element == null) {
				pageContext.removeAttribute(id);
			} else {
				pageContext.setAttribute(id, element);
			}
			lengthCount++;
			started = true;
			if (indexid != null) {
				pageContext.setAttribute(indexid, new Integer(getIndex()));
			}
			return (EVAL_BODY_AGAIN);
		} else {
			return (SKIP_BODY);
		}
	}

	public int doAfterBody() throws JspException {
		// Render the output from this iteration to the output stream
		if (bodyContent != null) {
			writePrevious(pageContext, bodyContent.getString());
			bodyContent.clearBody();
		}

		// Decide whether to iterate or quit
		if ((lengthValue > 0) && (lengthCount >= lengthValue)) {
			return (SKIP_BODY);
		}

		if (iterator == null)
			return (SKIP_BODY);

		if (iterator.hasNext()) {
			Object element = iterator.next();
			if (element == null) {
				pageContext.removeAttribute(id);
			} else {
				pageContext.setAttribute(id, element);
			}
			lengthCount++;
			if (indexid != null) {
				pageContext.setAttribute(indexid, new Integer(getIndex()));
			}
			return (EVAL_BODY_AGAIN);
		} else {
			return (SKIP_BODY);
		}
	}

	public int doEndTag() throws JspException {
		started = false;
		iterator = null;
		// Continue processing this page
		return (EVAL_PAGE);
	}

	public void release() {
		super.release();

		iterator = null;
		lengthCount = 0;
		lengthValue = 0;
		id = null;
		length = null;
		orderby = null;
		started = false;
		
		no = null;
		version = null;
		code = null;
		name = null;
		type = null;
		channeltype = null;
		url = null;
		lurl = null;
		purl = null;
		icon = null;
		pno = null;
		pcode = null;
		pname = null;
		pnos = null;
		title = null;
		summary = null;
		body = null;
		author = null;
		addtime = null;
		source = null;
		publisher = null;
		publishtime = null;
		audit = null;
		words = null;
		keywords = null;
		pv = null;
		rate = null;
		ratenum = null;
		comments = null;
		auditor = null;
		audittime = null;
		tempc = null;
		templ = null;
		tempa = null;
		rank = null;
		ext = null;
		filetype = null;
		width = null;
		height = null;
		size = null;
		path = null;
		imgflag = null;
		movieflag = null;
		active = null;
	}

	public static void writePrevious(PageContext pageContext, String text)
			throws JspException {
		JspWriter writer = pageContext.getOut();
		if (writer instanceof BodyContent)
			writer = ((BodyContent) writer).getEnclosingWriter();
		try {
			writer.print(text);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void buildQuery(Map<String, String> propertyMap) {
		Method[] arrayMethod = ChannelListTag.class.getDeclaredMethods();
		for (Method method : arrayMethod) {
			String name = method.getName();
			if (name.startsWith("get")) {
				Object obj = null;
				try {
					obj = method.invoke(this);
				} catch (Exception e) {
					e.printStackTrace();
				}
				if (obj != null) {
					propertyMap.put(StringUtil.uncapitalize(name.substring(3)),
							String.valueOf(obj));
				}
			}
		}
		propertyMap.put("type", Constants.CMS_TYPE_CATEGORY);
	}

	public Integer getNo() {
		return no;
	}

	public void setNo(Integer no) {
		this.no = no;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getChanneltype() {
		return channeltype;
	}

	public void setChanneltype(String channeltype) {
		this.channeltype = channeltype;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getLurl() {
		return lurl;
	}

	public void setLurl(String lurl) {
		this.lurl = lurl;
	}

	public String getPurl() {
		return purl;
	}

	public void setPurl(String purl) {
		this.purl = purl;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Integer getPno() {
		return pno;
	}

	public void setPno(Integer pno) {
		this.pno = pno;
	}

	public String getPcode() {
		return pcode;
	}

	public void setPcode(String pcode) {
		this.pcode = pcode;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getPnos() {
		return pnos;
	}

	public void setPnos(String pnos) {
		this.pnos = pnos;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Date getAddtime() {
		return addtime;
	}

	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public Date getPublishtime() {
		return publishtime;
	}

	public void setPublishtime(Date publishtime) {
		this.publishtime = publishtime;
	}

	public Short getAudit() {
		return audit;
	}

	public void setAudit(Short audit) {
		this.audit = audit;
	}

	public Integer getWords() {
		return words;
	}

	public void setWords(Integer words) {
		this.words = words;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public Integer getPv() {
		return pv;
	}

	public void setPv(Integer pv) {
		this.pv = pv;
	}

	public Integer getRate() {
		return rate;
	}

	public void setRate(Integer rate) {
		this.rate = rate;
	}

	public Integer getRatenum() {
		return ratenum;
	}

	public void setRatenum(Integer ratenum) {
		this.ratenum = ratenum;
	}

	public Integer getComments() {
		return comments;
	}

	public void setComments(Integer comments) {
		this.comments = comments;
	}

	public String getAuditor() {
		return auditor;
	}

	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}

	public Date getAudittime() {
		return audittime;
	}

	public void setAudittime(Date audittime) {
		this.audittime = audittime;
	}

	public Integer getTempc() {
		return tempc;
	}

	public void setTempc(Integer tempc) {
		this.tempc = tempc;
	}

	public Integer getTempl() {
		return templ;
	}

	public void setTempl(Integer templ) {
		this.templ = templ;
	}

	public Integer getTempa() {
		return tempa;
	}

	public void setTempa(Integer tempa) {
		this.tempa = tempa;
	}

	public Integer getRank() {
		return rank;
	}

	public void setRank(Integer rank) {
		this.rank = rank;
	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

	public Short getFiletype() {
		return filetype;
	}

	public void setFiletype(Short filetype) {
		this.filetype = filetype;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Short getImgflag() {
		return imgflag;
	}

	public void setImgflag(Short imgflag) {
		this.imgflag = imgflag;
	}

	public Short getMovieflag() {
		return movieflag;
	}

	public void setMovieflag(Short movieflag) {
		this.movieflag = movieflag;
	}

	public Short getActive() {
		return active;
	}

	public void setActive(Short active) {
		this.active = active;
	}

}
