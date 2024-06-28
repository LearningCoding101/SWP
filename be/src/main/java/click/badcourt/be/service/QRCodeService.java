package click.badcourt.be.service;

import click.badcourt.be.model.request.QRCodeData;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;


@Service
public class QRCodeService {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static BitMatrix generateQRCode(QRCodeData data) {
        int width = 300;
        int height = 300;

        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);

        try {
            // Convert data to JSON string
            String jsonData = new ObjectMapper().writeValueAsString(data);

            // Generate QR code
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(jsonData, BarcodeFormat.QR_CODE, width, height, hints);
            System.out.println("QR code generated successfully!");
            return bitMatrix;

        } catch (WriterException | IOException e) {
            System.out.println("Error generating QR code: " + e.getMessage());
            return null;
        }
    }

    public static BufferedImage toBufferedImage(BitMatrix matrix) {
        int width = matrix.getWidth();
        int height = matrix.getHeight();
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                image.setRGB(x, y, matrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
            }
        }

        return image;
    }

    public static byte[] toByteArray(BufferedImage image) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        return baos.toByteArray();
    }


    public QRCodeData decodeQr(byte[] data) throws IOException, NotFoundException{
        Result result = new MultiFormatReader()
                .decode(new BinaryBitmap(new HybridBinarizer(new BufferedImageLuminanceSource(
                        ImageIO.read(new ByteArrayInputStream(data))))));
        return result != null ? objectMapper.readValue(result.getText(), QRCodeData.class) : null;
    }

}
