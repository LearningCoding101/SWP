package click.badcourt.be.service;

import click.badcourt.be.entity.EmailDetail;
import click.badcourt.be.entity.RemindDetail;
import click.badcourt.be.model.request.QRCodeData;
import com.google.zxing.common.BitMatrix;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.security.SecureRandom;

@Service
public class EmailService {

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private JavaMailSender javaMailSender;
    private QRCodeService qrCodeService;
    private static final String CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static final SecureRandom random = new SecureRandom();

    public static String generateOTP(int length) {
        StringBuilder otp = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            otp.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
        }
        return otp.toString();
    }

    public void sendMailTemplate(EmailDetail emailDetail){
        try{
            Context context = new Context();

            context.setVariable("link",emailDetail.getLink());
            context.setVariable("button",emailDetail.getButtonValue());
            context.setVariable("name", emailDetail.getFullName());

            String text = templateEngine.process("emailresetpasswordtemplate", context);

            // Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            // Setting up necessary details
            mimeMessageHelper.setFrom("admin@gmail.com");
            mimeMessageHelper.setTo(emailDetail.getRecipient());
            mimeMessageHelper.setText(text, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());
            javaMailSender.send(mimeMessage);
        }catch (MessagingException messagingException){
            messagingException.printStackTrace();
        }
    }
    public void setPasswordMailTemplate(EmailDetail emailDetail){
        try{
            Context context = new Context();

            context.setVariable("link",emailDetail.getLink());
            context.setVariable("button",emailDetail.getButtonValue());
            context.setVariable("name", emailDetail.getFullName());

            String text = templateEngine.process("emailsetpasswordtemplate", context);

            // Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            // Setting up necessary details
            mimeMessageHelper.setFrom("admin@gmail.com");
            mimeMessageHelper.setTo(emailDetail.getRecipient());
            mimeMessageHelper.setText(text, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());
            javaMailSender.send(mimeMessage);
        }catch (MessagingException messagingException){
            messagingException.printStackTrace();
        }
    }

    public void setOTPMailTemplate(EmailDetail emailDetail,String otp){
        try{
            Context context = new Context();

            context.setVariable("otp",otp);

            String text = templateEngine.process("emailSendOTPTemplate", context);

            // Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            // Setting up necessary details
            mimeMessageHelper.setFrom("admin@gmail.com");
            mimeMessageHelper.setTo(emailDetail.getRecipient());
            mimeMessageHelper.setText(text, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());
            javaMailSender.send(mimeMessage);
        }catch (MessagingException messagingException){
            messagingException.printStackTrace();
        }
    }

    public void sendEmailWithAttachment(EmailDetail emailDetail, QRCodeData data) {
        try {
            Context context = new Context();
            context.setVariable("link", emailDetail.getLink());
            context.setVariable("button", emailDetail.getButtonValue());
            context.setVariable("name", emailDetail.getFullName());

            String text = templateEngine.process("emailtemplate", context);

            // Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true); // Enable multipart mode

            // Setting up necessary details
            mimeMessageHelper.setFrom("admin@gmail.com");
            mimeMessageHelper.setTo(emailDetail.getRecipient());
            mimeMessageHelper.setText(text, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());

            BitMatrix bitMatrix = qrCodeService.generateQRCode(data);
            if (bitMatrix != null) {
                BufferedImage qrImage = QRCodeService.toBufferedImage(bitMatrix);
                byte[] qrBytes = QRCodeService.toByteArray(qrImage);

                mimeMessageHelper.addAttachment("qrCode.png", new ByteArrayDataSource(qrBytes, "image/png"));
            } else {
                System.out.println("QR code generation failed.");
            }

            javaMailSender.send(mimeMessage);
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }
    }
    public void sendEmailRemind(RemindDetail emailDetail, QRCodeData data) {
        try {
            Context context = new Context();
            context.setVariable("link", emailDetail.getLink());
            context.setVariable("button", emailDetail.getButtonValue());
            context.setVariable("name", emailDetail.getFullName());

            String text = templateEngine.process("emailtemplate", context);

            // Creating a simple mail message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true); // Enable multipart mode

            // Setting up necessary details
            mimeMessageHelper.setFrom("admin@gmail.com");
            mimeMessageHelper.setTo(emailDetail.getRecipient());
            mimeMessageHelper.setText(text, true);
            mimeMessageHelper.setSubject(emailDetail.getSubject());

            BitMatrix bitMatrix = qrCodeService.generateQRCode(data);
            if (bitMatrix != null) {
                BufferedImage qrImage = QRCodeService.toBufferedImage(bitMatrix);
                byte[] qrBytes = QRCodeService.toByteArray(qrImage);

                mimeMessageHelper.addAttachment("qrCode.png", new ByteArrayDataSource(qrBytes, "image/png"));
            } else {
                System.out.println("QR code generation failed.");
            }

            javaMailSender.send(mimeMessage);
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }
    }
}
