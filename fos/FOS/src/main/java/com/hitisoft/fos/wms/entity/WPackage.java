package com.hitisoft.fos.wms.entity;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;


/**
 * The persistent class for the W_CARGO_PACKAGE database table.
 */
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true)
@Table(name="W_CARGO_PACKAGE")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WPackage extends com.hitisoft.fw.orm.jpa.BaseDomain implements Serializable {
	private static final long serialVersionUID = 1L;
	private String packageName; 			//包装
	private String packageCh;  				//中文名称
	private String packageEn; 				//英文名称
	
	private Integer mainQuantity;  			//主单位数量
	private Integer innerQuantity; 			//内包装数量
	private Integer boxQuantity;    		//箱包装数量
	private Integer palletQuantity;  		//托包装数量
	private Integer otherQuantity;   		//其他包装数量
	
	private String discriptionMainType; 	//主单位描述
	private String discriptionInnerType;	//内包装描述
	private String discriptionBoxType;		//箱包装描述
	private String discriptionPalletType;	//托包装描述
	private String discriptionOtherType;	//其他包装描述
	
	private Byte replenishMain;			//主单位补货
	private Byte replenishInner;			//内包装补货
	private Byte replenishBox;			//箱包装补货
	private Byte replenishPallet;			//托包装补货
	private Byte replenishOther;			//其他包装补货

	private Byte containerMain;			//主单装箱
	private Byte containerInner;			//内包装装箱
	private Byte containerBox;			//箱装箱
	private Byte containerPallet;			//托装箱
	private Byte containerOther;			//其他装箱

	private Byte inLabelMain;				//主单收货标签单元
	private Byte inLabelInner;			//内包装收货标签单元
	private Byte inLabelBox;				//箱收货标签单元
	private Byte inLabelPallet;			//托收货标签单元
	private Byte inLabelOther;			//其他收货标签单元

	private Byte outLabelMain;			//主单出库标签单元
	private Byte outLabelInner;			//内包出库货标签单元
	private Byte outLabelBox;				//箱出库标签单元
	private Byte outLabelPallet;			//托出库标签单元
	private Byte outLabelOther;			//其他出库标签单元

	private Double lengthMain;				//主单位长
	private Double lengthInner;				//内包装长
	private Double lengthBox;				//箱包装长
	private Double lengthPallet;			//托盘长
	private Double lengthOther;				//其他长

	private Double widthMain;				//主单位宽
	private Double widthInner;				//内包装宽
	private Double widthBox;				//箱宽
	private Double widthPallet;				//托宽
	private Double widthOther;				//其他宽

	private Double heightMain;				//主单位高
	private Double heightInner;				//内包装高
	private Double heightBox;				//箱高
	private Double heightPallet;			//托高
	private Double heightOther;				//其他高

	private Double volumeMain;				//主单位体积
	private Double volumeInner;				//内包装体积
	private Double volumeBox;				//箱体积
	private Double volumePallet;			//托盘体积
	private Double volumeOther;				//其他体积
	
	private Double weightMain;				//主单位重量
	private Double weightInner;				//内包装重量
	private Double weightBox;				//箱重量
	private Double weightPallet;			//托盘重量
	private Double weightOther;				//其他重量

	private Double palletCargoLength;		//托盘上货物长
	private Double palletCargoWeight;		//托盘上货物宽
	private Double palletCargoHeight;		//托盘上货物高
	
	private Integer ti;						//
	private Integer hi;						//
	
	@Column(name="PACKAGE_NAME")
	public String getPackageName() {
		return packageName;
	}
	
	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}
	
	@Column(name="PACKAGE_CH")
	public String getPackageCh() {
		return packageCh;
	}
	
	public void setPackageCh(String packageCh) {
		this.packageCh = packageCh;
	}
	
	@Column(name="PACKAGE_EN")
	public String getPackageEn() {
		return packageEn;
	}
	
	public void setPackageEn(String packageEn) {
		this.packageEn = packageEn;
	}
	
	@Column(name="MAIN_QUANTITY")
	public Integer getMainQuantity() {
		return mainQuantity;
	}
	
	public void setMainQuantity(Integer mainQuantity) {
		this.mainQuantity = mainQuantity;
	}
	
	@Column(name="INNER_QUANTITY")
	public Integer getInnerQuantity() {
		return innerQuantity;
	}
	
	public void setInnerQuantity(Integer innerQuantity) {
		this.innerQuantity = innerQuantity;
	}
	
	@Column(name="BOX_QUANTITY")
	public Integer getBoxQuantity() {
		return boxQuantity;
	}
	
	public void setBoxQuantity(Integer boxQuantity) {
		this.boxQuantity = boxQuantity;
	}
	
	@Column(name="PALLET_QUANTITY")
	public Integer getPalletQuantity() {
		return palletQuantity;
	}
	
	public void setPalletQuantity(Integer palletQuantity) {
		this.palletQuantity = palletQuantity;
	}
	
	@Column(name="OTHER_QUANTITY")
	public Integer getOtherQuantity() {
		return otherQuantity;
	}
	
	public void setOtherQuantity(Integer otherQuantity) {
		this.otherQuantity = otherQuantity;
	}
	
	@Column(name="DISCRIPTION_MAIN_TYPE")
	public String getDiscriptionMainType() {
		return discriptionMainType;
	}
	
	public void setDiscriptionMainType(String discriptionMainType) {
		this.discriptionMainType = discriptionMainType;
	}
	
	@Column(name="DISCRIPTION_INNER_TYPE")
	public String getDiscriptionInnerType() {
		return discriptionInnerType;
	}
	
	public void setDiscriptionInnerType(String discriptionInnerType) {
		this.discriptionInnerType = discriptionInnerType;
	}
	
	@Column(name="DISCRIPTION_BOX_TYPE")
	public String getDiscriptionBoxType() {
		return discriptionBoxType;
	}
	
	public void setDiscriptionBoxType(String discriptionBoxType) {
		this.discriptionBoxType = discriptionBoxType;
	}
	
	@Column(name="DISCRIPTION_PALLET_TYPE")
	public String getDiscriptionPalletType() {
		return discriptionPalletType;
	}
	
	public void setDiscriptionPalletType(String discriptionPalletType) {
		this.discriptionPalletType = discriptionPalletType;
	}
	
	@Column(name="DISCRIPTION_OTHER_TYPE")
	public String getDiscriptionOtherType() {
		return discriptionOtherType;
	}
	
	public void setDiscriptionOtherType(String discriptionOtherType) {
		this.discriptionOtherType = discriptionOtherType;
	}
	
	@Column(name="REPLENISH_MAIN")
	public Byte getReplenishMain() {
		return replenishMain;
	}
	
	public void setReplenishMain(Byte replenishMain) {
		this.replenishMain = replenishMain;
	}
	
	@Column(name="REPLENISH_INNER")
	public Byte getReplenishInner() {
		return replenishInner;
	}
	
	public void setReplenishInner(Byte replenishInner) {
		this.replenishInner = replenishInner;
	}
	
	@Column(name="REPLENISH_BOX")
	public Byte getReplenishBox() {
		return replenishBox;
	}
	
	public void setReplenishBox(Byte replenishBox) {
		this.replenishBox = replenishBox;
	}
	
	@Column(name="REPLENISH_PALLET")
	public Byte getReplenishPallet() {
		return replenishPallet;
	}
	
	public void setReplenishPallet(Byte replenishPallet) {
		this.replenishPallet = replenishPallet;
	}
	
	@Column(name="REPLENISH_OTHER")
	public Byte getReplenishOther() {
		return replenishOther;
	}
	
	public void setReplenishOther(Byte replenishOther) {
		this.replenishOther = replenishOther;
	}
	
	@Column(name="CONTAINER_MAIN")
	public Byte getContainerMain() {
		return containerMain;
	}
	
	public void setContainerMain(Byte containerMain) {
		this.containerMain = containerMain;
	}
	
	@Column(name="CONTAINER_INNER")
	public Byte getContainerInner() {
		return containerInner;
	}
	
	public void setContainerInner(Byte containerInner) {
		this.containerInner = containerInner;
	}
	
	@Column(name="CONTAINER_BOX")
	public Byte getContainerBox() {
		return containerBox;
	}
	
	public void setContainerBox(Byte containerBox) {
		this.containerBox = containerBox;
	}
	
	@Column(name="CONTAINER_PALLET")
	public Byte getContainerPallet() {
		return containerPallet;
	}
	
	public void setContainerPallet(Byte containerPallet) {
		this.containerPallet = containerPallet;
	}
	
	@Column(name="CONTAINER_OTHER")
	public Byte getContainerOther() {
		return containerOther;
	}
	
	public void setContainerOther(Byte containerOther) {
		this.containerOther = containerOther;
	}
	
	@Column(name="IN_LABEL_MAIN")
	public Byte getInLabelMain() {
		return inLabelMain;
	}
	
	public void setInLabelMain(Byte inLabelMain) {
		this.inLabelMain = inLabelMain;
	}
	
	@Column(name="IN_LABEL_INNER")
	public Byte getInLabelInner() {
		return inLabelInner;
	}
	
	public void setInLabelInner(Byte inLabelInner) {
		this.inLabelInner = inLabelInner;
	}
	
	@Column(name="IN_LABEL_BOX")
	public Byte getInLabelBox() {
		return inLabelBox;
	}
	
	public void setInLabelBox(Byte inLabelBox) {
		this.inLabelBox = inLabelBox;
	}
	
	@Column(name="IN_LABEL_PALLET")
	public Byte getInLabelPallet() {
		return inLabelPallet;
	}
	
	public void setInLabelPallet(Byte inLabelPallet) {
		this.inLabelPallet = inLabelPallet;
	}
	
	@Column(name="IN_LABEL_OTHER")
	public Byte getInLabelOther() {
		return inLabelOther;
	}
	
	public void setInLabelOther(Byte inLabelOther) {
		this.inLabelOther = inLabelOther;
	}
	
	@Column(name="OUT_LABEL_MAIN")
	public Byte getOutLabelMain() {
		return outLabelMain;
	}
	
	public void setOutLabelMain(Byte outLabelMain) {
		this.outLabelMain = outLabelMain;
	}
	
	@Column(name="OUT_LABEL_INNER")
	public Byte getOutLabelInner() {
		return outLabelInner;
	}
	
	public void setOutLabelInner(Byte outLabelInner) {
		this.outLabelInner = outLabelInner;
	}
	
	@Column(name="OUT_LABEL_BOX")
	public Byte getOutLabelBox() {
		return outLabelBox;
	}
	
	public void setOutLabelBox(Byte outLabelBox) {
		this.outLabelBox = outLabelBox;
	}
	
	@Column(name="OUT_LABEL_PALLET")
	public Byte getOutLabelPallet() {
		return outLabelPallet;
	}
	
	public void setOutLabelPallet(Byte outLabelPallet) {
		this.outLabelPallet = outLabelPallet;
	}
	
	@Column(name="OUT_LABEL_OTHER")
	public Byte getOutLabelOther() {
		return outLabelOther;
	}
	
	public void setOutLabelOther(Byte outLabelOther) {
		this.outLabelOther = outLabelOther;
	}
	
	@Column(name="LENGTH_MAIN")
	public Double getLengthMain() {
		return lengthMain;
	}
	
	public void setLengthMain(Double lengthMain) {
		this.lengthMain = lengthMain;
	}
	
	@Column(name="LENGTH_INNER")
	public Double getLengthInner() {
		return lengthInner;
	}
	
	public void setLengthInner(Double lengthInner) {
		this.lengthInner = lengthInner;
	}
	
	@Column(name="LENGTH_BOX")
	public Double getLengthBox() {
		return lengthBox;
	}
	
	public void setLengthBox(Double lengthBox) {
		this.lengthBox = lengthBox;
	}
	
	@Column(name="LENGTH_PALLET")
	public Double getLengthPallet() {
		return lengthPallet;
	}
	
	public void setLengthPallet(Double lengthPallet) {
		this.lengthPallet = lengthPallet;
	}
	
	@Column(name="LENGTH_OTHER")
	public Double getLengthOther() {
		return lengthOther;
	}
	
	public void setLengthOther(Double lengthOther) {
		this.lengthOther = lengthOther;
	}
	
	@Column(name="WIDTH_MAIN")
	public Double getWidthMain() {
		return widthMain;
	}
	
	public void setWidthMain(Double widthMain) {
		this.widthMain = widthMain;
	}
	
	@Column(name="WIDTH_INNER")
	public Double getWidthInner() {
		return widthInner;
	}
	
	public void setWidthInner(Double widthInner) {
		this.widthInner = widthInner;
	}
	
	@Column(name="WIDTH_BOX")
	public Double getWidthBox() {
		return widthBox;
	}
	
	public void setWidthBox(Double widthBox) {
		this.widthBox = widthBox;
	}
	
	@Column(name="WIDTH_PALLET")
	public Double getWidthPallet() {
		return widthPallet;
	}
	
	public void setWidthPallet(Double widthPallet) {
		this.widthPallet = widthPallet;
	}
	
	@Column(name="WIDTH_OTHER")
	public Double getWidthOther() {
		return widthOther;
	}
	
	public void setWidthOther(Double widthOther) {
		this.widthOther = widthOther;
	}
	
	@Column(name="HEIGHT_MAIN")
	public Double getHeightMain() {
		return heightMain;
	}
	
	public void setHeightMain(Double heightMain) {
		this.heightMain = heightMain;
	}
	
	@Column(name="HEIGHT_INNER")
	public Double getHeightInner() {
		return heightInner;
	}
	
	public void setHeightInner(Double heightInner) {
		this.heightInner = heightInner;
	}
	
	@Column(name="HEIGHT_BOX")
	public Double getHeightBox() {
		return heightBox;
	}
	
	public void setHeightBox(Double heightBox) {
		this.heightBox = heightBox;
	}
	
	@Column(name="HEIGHT_PALLET")
	public Double getHeightPallet() {
		return heightPallet;
	}
	
	public void setHeightPallet(Double heightPallet) {
		this.heightPallet = heightPallet;
	}
	
	@Column(name="HEIGHT_OTHER")
	public Double getHeightOther() {
		return heightOther;
	}
	
	public void setHeightOther(Double heightOther) {
		this.heightOther = heightOther;
	}
	
	@Column(name="VOLUME_MAIN")
	public Double getVolumeMain() {
		return volumeMain;
	}
	
	public void setVolumeMain(Double volumeMain) {
		this.volumeMain = volumeMain;
	}
	
	@Column(name="VOLUME_INNER")
	public Double getVolumeInner() {
		return volumeInner;
	}
	
	public void setVolumeInner(Double volumeInner) {
		this.volumeInner = volumeInner;
	}
	
	@Column(name="VOLUME_BOX")
	public Double getVolumeBox() {
		return volumeBox;
	}
	
	public void setVolumeBox(Double volumeBox) {
		this.volumeBox = volumeBox;
	}
	
	@Column(name="VOLUME_PALLET")
	public Double getVolumePallet() {
		return volumePallet;
	}
	
	public void setVolumePallet(Double volumePallet) {
		this.volumePallet = volumePallet;
	}
	
	@Column(name="VOLUME_OTHER")
	public Double getVolumeOther() {
		return volumeOther;
	}
	
	public void setVolumeOther(Double volumeOther) {
		this.volumeOther = volumeOther;
	}
	
	@Column(name="TI")
	public Integer getTi() {
		return ti;
	}
	
	public void setTi(Integer ti) {
		this.ti = ti;
	}
	
	@Column(name="HI")
	public Integer getHi() {
		return hi;
	}
	
	public void setHi(Integer hi) {
		this.hi = hi;
	}

	@Column(name="WEIGHT_MAIN")
	public Double getWeightMain() {
		return weightMain;
	}

	public void setWeightMain(Double weightMain) {
		this.weightMain = weightMain;
	}

	@Column(name="WEIGHT_INNER")
	public Double getWeightInner() {
		return weightInner;
	}

	public void setWeightInner(Double weightInner) {
		this.weightInner = weightInner;
	}

	@Column(name="WEIGHT_BOX")
	public Double getWeightBox() {
		return weightBox;
	}

	public void setWeightBox(Double weightBox) {
		this.weightBox = weightBox;
	}

	@Column(name="WEIGHT_PALLET")
	public Double getWeightPallet() {
		return weightPallet;
	}

	public void setWeightPallet(Double weightPallet) {
		this.weightPallet = weightPallet;
	}

	@Column(name="WEIGHT_OTHER")
	public Double getWeightOther() {
		return weightOther;
	}

	public void setWeightOther(Double weightOther) {
		this.weightOther = weightOther;
	}

	@Column(name="PALLET_CARGO_LENGTH")
	public Double getPalletCargoLength() {
		return palletCargoLength;
	}

	public void setPalletCargoLength(Double palletCargoLength) {
		this.palletCargoLength = palletCargoLength;
	}

	@Column(name="PALLET_CARGO_WEIGHT")
	public Double getPalletCargoWeight() {
		return palletCargoWeight;
	}

	public void setPalletCargoWeight(Double palletCargoWeight) {
		this.palletCargoWeight = palletCargoWeight;
	}

	@Column(name="PALLET_CARGO_HEIGHT")
	public Double getPalletCargoHeight() {
		return palletCargoHeight;
	}

	public void setPalletCargoHeight(Double palletCargoHeight) {
		this.palletCargoHeight = palletCargoHeight;
	}
	
}