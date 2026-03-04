import QRCode from "qrcode";
import type { QRCodeOptions } from "./types";

export async function generateQRCode(
	url: string,
	options: QRCodeOptions = {},
): Promise<Buffer> {
	const {
		width = 180,
		margin = 0,
		errorCorrectionLevel = "M",
		darkColor = "#000000",
		lightColor = "#FFFFFF",
	} = options;

	return QRCode.toBuffer(url, {
		errorCorrectionLevel,
		type: "png",
		width,
		margin,
		color: {
			dark: darkColor,
			light: lightColor,
		},
	});
}
