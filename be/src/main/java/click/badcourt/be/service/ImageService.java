package click.badcourt.be.service;

//import com.google.auth.Credentials;
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.cloud.storage.BlobId;
//import com.google.cloud.storage.BlobInfo;
//import com.google.cloud.storage.Storage;
//import com.google.cloud.storage.StorageOptions;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//import java.nio.file.Files;
//import java.util.UUID;
//
//@Service
//public class ImageService {
//
//    private String uploadFile(File file, String fileName) throws IOException {
//        BlobId blobId = BlobId.of("fir-test-36b05.appspot.com", fileName); // Replace with your bucker name
//        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
//        InputStream inputStream = ImageService.class.getClassLoader().getResourceAsStream("fir-test-36b05-firebase-adminsdk-4v9ob-1b211814e0.json"); // change the file name with your one
//        Credentials credentials = GoogleCredentials.fromStream(inputStream);
//        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
//        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
//
//        String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/fir-test-36b05.appspot.com/o/%s?alt=media";
//        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
//    }
//
//    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
//        File tempFile = new File(fileName);
//        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
//            fos.write(multipartFile.getBytes());
//            fos.close();
//        }
//        return tempFile;
//    }
//
//    private String getExtension(String fileName) {
//        return fileName.substring(fileName.lastIndexOf("."));
//    }z
//
//
//    public String upload(MultipartFile multipartFile) {
//        try {
//            String fileName = multipartFile.getOriginalFilename();                        // to get original file name
//            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));  // to generated random string values for file name.
//
//            File file = this.convertToFile(multipartFile, fileName);                      // to convert multipartFile to File
//            String URL = this.uploadFile(file, fileName);                                   // to get uploaded file link
//            file.delete();
//            return URL;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Image couldn't upload, Something went wrong";
//        }
//    }
//}


import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {

    private static final String IMG_BB_API_URL = "https://api.imgbb.com/1/upload";
    private static final String API_KEY = "a130a3de739d27ec783b7d980a273067"; // replace with your API key

    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    public String upload(MultipartFile multipartFile) {
        try {
            String fileName = multipartFile.getOriginalFilename();
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));

            File file = this.convertToFile(multipartFile, fileName);
            String URL = this.uploadFile(file, fileName);
            file.delete();
            return URL;
        } catch (Exception e) {
            e.printStackTrace();
            return "Image couldn't upload, Something went wrong";
        }
    }

    private String uploadFile(File file, String fileName) throws IOException {
        HttpClient httpclient = HttpClients.createDefault();
        HttpPost httppost = new HttpPost(IMG_BB_API_URL);

        FileBody fileBody = new FileBody(file);
        HttpEntity reqEntity = MultipartEntityBuilder.create()
                .addPart("image", fileBody)
                .addTextBody("key", API_KEY)
                .build();

        httppost.setEntity(reqEntity);

        HttpResponse response = httpclient.execute(httppost);
        HttpEntity resEntity = response.getEntity();

        if (resEntity != null) {
            String responseString = EntityUtils.toString(resEntity);
            // parse the JSON response to get the URL of the uploaded image
            JSONObject jsonObject = new JSONObject(responseString);
            String url = jsonObject.getJSONObject("data").getString("url");
            return url;
        } else {
            throw new IOException("Failed to upload image");
        }
    }
}