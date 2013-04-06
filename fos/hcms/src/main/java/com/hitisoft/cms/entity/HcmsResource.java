package com.hitisoft.cms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.hitisoft.fw.orm.jpa.BaseDomain;

@Entity
@Table(name = "HCMS_RESOURCE")
public class HcmsResource extends BaseDomain implements Serializable {
	private static final long serialVersionUID = -1411327840695002800L;
	private Integer no;
	private Byte active;
	private Date addtime;
	private Byte audit;
	private String auditor;
	private Date audittime;
	private String author;
	private String body;
	private String channeltype;
	private String code;
	private Integer comments;
	private String compCode;
	private Integer createBy;
	private String createByName;
	private String ext;
	private Byte filetype;
	private Integer grouId;
	private String grouName;
	private Integer height;
	private String icon;
	private Byte imgflag;
	private String keywords;
	private String lurl;
	private Integer modifyBy;
	private String modifyByName;
	private Byte movieflag;
	private String name;
	private String path;
	private String pcode;
	private String pname;
	private Integer pno;
	private String pnos;
	private String publisher;
	private Date publishtime;
	private String purl;
	private Integer pv;
	private Integer rank;
	private Integer rate;
	private Integer ratenum;
	private Integer size;
	private String source;
	private String summary;
	private Integer tempa;
	private Integer tempc;
	private Integer templ;
	private String title;
	private String type;
	private String url;
	private Integer userId;
	private String userName;
	private Integer width;
	private Integer words;

	public HcmsResource() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "NO")
	public Integer getNo() {
		return this.no;
	}

	public void setNo(Integer no) {
		this.no = no;
	}

	@Column(name = "ACTIVE")
	public Byte getActive() {
		return this.active;
	}

	public void setActive(Byte active) {
		this.active = active;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ADDTIME")
	public Date getAddtime() {
		return this.addtime;
	}

	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	@Column(name = "AUDIT")
	public Byte getAudit() {
		return this.audit;
	}

	public void setAudit(Byte audit) {
		this.audit = audit;
	}

	@Column(name = "AUDITOR")
	public String getAuditor() {
		return this.auditor;
	}

	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "AUDITTIME")
	public Date getAudittime() {
		return this.audittime;
	}

	public void setAudittime(Date audittime) {
		this.audittime = audittime;
	}

	@Column(name = "AUTHOR")
	public String getAuthor() {
		return this.author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	@Lob()
	@Column(name = "BODY")
	public String getBody() {
		return this.body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	@Column(name = "CHANNELTYPE")
	public String getChanneltype() {
		return this.channeltype;
	}

	public void setChanneltype(String channeltype) {
		this.channeltype = channeltype;
	}

	@Column(name = "CODE")
	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "COMMENTS")
	public Integer getComments() {
		return this.comments;
	}

	public void setComments(Integer comments) {
		this.comments = comments;
	}

	@Column(name = "COMP_CODE")
	public String getCompCode() {
		return this.compCode;
	}

	public void setCompCode(String compCode) {
		this.compCode = compCode;
	}

	@Column(name = "CREATE_BY")
	@Override
	public String getCreateBy() {
		return "" + this.createBy;
	}

	public void setCreateBy(Integer createBy) {
		this.createBy = createBy;
	}

	@Column(name = "CREATE_BY_NAME")
	public String getCreateByName() {
		return this.createByName;
	}

	public void setCreateByName(String createByName) {
		this.createByName = createByName;
	}

	@Column(name = "EXT")
	public String getExt() {
		return this.ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

	@Column(name = "FILETYPE")
	public Byte getFiletype() {
		return this.filetype;
	}

	public void setFiletype(Byte filetype) {
		this.filetype = filetype;
	}

	@Column(name = "GROU_ID")
	public Integer getGrouId() {
		return this.grouId;
	}

	public void setGrouId(Integer grouId) {
		this.grouId = grouId;
	}

	@Column(name = "GROU_NAME")
	public String getGrouName() {
		return this.grouName;
	}

	public void setGrouName(String grouName) {
		this.grouName = grouName;
	}

	@Column(name = "HEIGHT")
	public Integer getHeight() {
		return this.height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	@Column(name = "ICON")
	public String getIcon() {
		return this.icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	@Column(name = "IMGFLAG")
	public Byte getImgflag() {
		return this.imgflag;
	}

	public void setImgflag(Byte imgflag) {
		this.imgflag = imgflag;
	}

	@Column(name = "KEYWORDS")
	public String getKeywords() {
		return this.keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	@Column(name = "LURL")
	public String getLurl() {
		return this.lurl;
	}

	public void setLurl(String lurl) {
		this.lurl = lurl;
	}

	@Column(name = "MODIFY_BY")
	public String getModifyBy() {
		return "" + this.modifyBy;
	}

	public void setModifyBy(Integer modifyBy) {
		this.modifyBy = modifyBy;
	}

	@Column(name = "MODIFY_BY_NAME")
	public String getModifyByName() {
		return this.modifyByName;
	}

	public void setModifyByName(String modifyByName) {
		this.modifyByName = modifyByName;
	}

	@Column(name = "MOVIEFLAG")
	public Byte getMovieflag() {
		return this.movieflag;
	}

	public void setMovieflag(Byte movieflag) {
		this.movieflag = movieflag;
	}

	@Column(name = "NAME")
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "PATH")
	public String getPath() {
		return this.path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	@Column(name = "PCODE")
	public String getPcode() {
		return this.pcode;
	}

	public void setPcode(String pcode) {
		this.pcode = pcode;
	}

	@Column(name = "PNAME")
	public String getPname() {
		return this.pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	@Column(name = "PNO")
	public Integer getPno() {
		return this.pno;
	}

	public void setPno(Integer pno) {
		this.pno = pno;
	}

	@Column(name = "PNOS")
	public String getPnos() {
		return this.pnos;
	}

	public void setPnos(String pnos) {
		this.pnos = pnos;
	}

	@Column(name = "PUBLISHER")
	public String getPublisher() {
		return this.publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "PUBLISHTIME")
	public Date getPublishtime() {
		return this.publishtime;
	}

	public void setPublishtime(Date publishtime) {
		this.publishtime = publishtime;
	}

	@Column(name = "PURL")
	public String getPurl() {
		return this.purl;
	}

	public void setPurl(String purl) {
		this.purl = purl;
	}

	@Column(name = "PV")
	public Integer getPv() {
		return this.pv;
	}

	public void setPv(Integer pv) {
		this.pv = pv;
	}

	@Column(name = "RANK")
	public Integer getRank() {
		return this.rank;
	}

	public void setRank(Integer rank) {
		this.rank = rank;
	}

	@Column(name = "RATE")
	public Integer getRate() {
		return this.rate;
	}

	public void setRate(Integer rate) {
		this.rate = rate;
	}

	@Column(name = "RATENUM")
	public Integer getRatenum() {
		return this.ratenum;
	}

	public void setRatenum(Integer ratenum) {
		this.ratenum = ratenum;
	}

	@Column(name = "SIZE")
	public Integer getSize() {
		return this.size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	@Column(name = "SOURCE")
	public String getSource() {
		return this.source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	@Column(name = "SUMMARY")
	public String getSummary() {
		return this.summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	@Column(name = "TEMPA")
	public Integer getTempa() {
		return this.tempa;
	}

	public void setTempa(Integer tempa) {
		this.tempa = tempa;
	}

	@Column(name = "TEMPC")
	public Integer getTempc() {
		return this.tempc;
	}

	public void setTempc(Integer tempc) {
		this.tempc = tempc;
	}

	@Column(name = "TEMPL")
	public Integer getTempl() {
		return this.templ;
	}

	public void setTempl(Integer templ) {
		this.templ = templ;
	}

	@Column(name = "TITLE")
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "TYPE")
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "URL")
	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "USER_ID")
	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Column(name = "USER_NAME")
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "WIDTH")
	public Integer getWidth() {
		return this.width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	@Column(name = "WORDS")
	public Integer getWords() {
		return this.words;
	}

	public void setWords(Integer words) {
		this.words = words;
	}

}