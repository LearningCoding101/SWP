package com.badminton.greetingdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(scanBasePackages = "com.badminton.greetingdemo")
public class GreetingdemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreetingdemoApplication.class, args);
    }

}