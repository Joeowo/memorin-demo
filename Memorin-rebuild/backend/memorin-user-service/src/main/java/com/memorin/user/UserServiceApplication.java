package com.memorin.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Memorin用户服务主启动类
 * 
 * @author Memorin Team
 * @version 1.0.0
 * @since 2025-01-08
 */
@SpringBootApplication
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
        System.out.println("=================================");
        System.out.println("Memorin用户服务启动成功！");
        System.out.println("端口: 8081");
        System.out.println("健康检查: http://localhost:8081/actuator/health");
        System.out.println("API文档: http://localhost:8081/swagger-ui.html");
        System.out.println("=================================");
    }
} 