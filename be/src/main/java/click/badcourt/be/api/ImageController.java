//package click.badcourt.be.api;
//
//
//import click.badcourt.be.service.ImageService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/app")
////@SecurityRequirement(name = "api")
//public class ImageController {
//
//
//        private final ImageService imageService;
//
//        @PostMapping()
//        public String upload(@RequestParam("file") MultipartFile multipartFile) {
//            return imageService.upload(multipartFile);
//        }
//
//
//
//}
