package com.hitisoft.cms.util;

import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 图片工具类，完成图片的截取
 * 
 * @author inc062977
 * 
 */
public class ImageUtil {
	private static Logger logger = LoggerFactory.getLogger(ImageUtil.class);

	/**
	 * 实现图像的等比缩放
	 * 
	 * @param source
	 * @param targetW
	 * @param targetH
	 * @return
	 */
	private static BufferedImage resize(BufferedImage source, int targetW, int targetH, boolean proportion) {
		// targetW，targetH分别表示目标长和宽
		int type = source.getType();
		BufferedImage target = null;
		double sx = (double) targetW / source.getWidth();
		double sy = (double) targetH / source.getHeight();
		// 这里想实现在targetW，targetH范围内实现等比缩放。如果不需要等比缩放
		// 则将下面的if else语句注释即可
		if (proportion) {
			if (sx < sy) {
				sy = sx;
				targetH = (int) (sy * source.getHeight());
			} else {
				sx = sy;
				targetW = (int) (sx * source.getWidth());
			}
		}
		if (type == BufferedImage.TYPE_CUSTOM) { // handmade
			ColorModel cm = source.getColorModel();
			WritableRaster raster = cm.createCompatibleWritableRaster(targetW, targetH);
			boolean alphaPremultiplied = cm.isAlphaPremultiplied();
			target = new BufferedImage(cm, raster, alphaPremultiplied, null);
		} else
			target = new BufferedImage(targetW, targetH, type);
		Graphics2D g = target.createGraphics();
		// smoother than exlax:
		g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
		g.drawRenderedImage(source, AffineTransform.getScaleInstance(sx, sy));
		g.dispose();
		return target;
	}

	/**
	 * 实现图像的等比缩放
	 * 
	 * @param inFilePath
	 *            要截取文件的路径
	 * @param outFilePath
	 *            截取后输出的路径
	 * @param width
	 *            要截取宽度
	 * @param hight
	 *            要截取的高度
	 * @param proportion
	 * @throws Exception
	 */

	public static void saveImageAsJpg(String inFilePath, String outFilePath, int width, int hight, boolean proportion) {
		File file = new File(inFilePath);
		InputStream in = null;
		try {
			in = new FileInputStream(file);
			File saveFile = new File(outFilePath);

			BufferedImage srcImage = ImageIO.read(in);
			if (width > 0 || hight > 0) {
				// 原图的大小
				int sw = srcImage.getWidth();
				int sh = srcImage.getHeight();
				// 如果原图像的大小小于要缩放的图像大小，直接用原图像
				if (sw > width && sh > hight) {
					srcImage = resize(srcImage, width, hight, proportion);
				}
				String fileName = saveFile.getName();
				String formatName = fileName.substring(fileName.lastIndexOf('.') + 1);
				ImageIO.write(srcImage, formatName, saveFile);
			}
			in.close();
		} catch (Exception e) {
			if (in != null)
				try {
					in.close();
				} catch (IOException e1) {
					logger.error("image resize error", e1);
				}
		}
	}

	/**
	 * 实现缩放后的截图
	 * 
	 */
	public static void saveSubImage(String src, String dest, int x, int y, int width, int height) {
		File file = new File(src);
		InputStream in = null;
		try {
			in = new FileInputStream(file);
			BufferedImage image = ImageIO.read(in);
			if (x < 0 || y < 0 || width - x > image.getWidth() || height - y > image.getHeight()) {
				logger.error("Bad subimage bounds");
				return;
			}
			BufferedImage subImage = image.getSubimage(x, y, width, height);
			String formatName = dest.substring(dest.lastIndexOf('.') + 1);
			File subImageFile = new File(dest);
			ImageIO.write(subImage, formatName, subImageFile);
		} catch (IOException e) {
			logger.error("subimage write error");
		} finally {
			if (in != null)
				try {
					in.close();
				} catch (IOException e1) {
					logger.error("image cut error", e1);
				}
		}
	}

	public static void main(String[] args) {
		String in = "/mnt/memory/1.jpg";
		String out = "/mnt/memory/2.jpg";
		saveSubImage(in, out, 0, 0, 50, 50);
		// saveImageAsJpg(in, out, 160, 160, true);
		// File dir = new File(".");
		// String[] fs = dir.list();
		// for (int i = 0; i < fs.length; i++) {
		// String f = fs[i];
		// File file = new File(f);
		// if (file.isFile())
		// saveImageAsJpg(f, "t_" + f, 160, 160, true);
		// }
	}
}
