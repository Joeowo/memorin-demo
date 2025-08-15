package com.memorin.knowledge.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 测试控制器
 * 提供服务健康检查和基本信息接口
 * 
 * @author Memorin Team
 * @version 1.0.0
 * @since 2025-01-18
 */
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Value("${spring.application.name}")
    private String applicationName;

    @Value("${server.port}")
    private String serverPort;

    /**
     * 服务信息接口
     * GET /api/test/info
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getServiceInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("service", applicationName);
        info.put("version", "1.0.0");
        info.put("port", serverPort);
        info.put("status", "running");
        info.put("timestamp", LocalDateTime.now());
        info.put("description", "Memorin知识管理服务");
        
        return ResponseEntity.ok(info);
    }

    /**
     * 简单健康检查接口
     * GET /api/test/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", applicationName);
        health.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(health);
    }

    /**
     * 服务就绪检查接口
     * GET /api/test/ready
     */
    @GetMapping("/ready")
    public ResponseEntity<Map<String, Object>> readinessCheck() {
        Map<String, Object> ready = new HashMap<>();
        ready.put("ready", true);
        ready.put("service", applicationName);
        
        // 创建组件状态Map (Java 8兼容方式)
        Map<String, String> components = new HashMap<>();
        components.put("database", "UP");
        components.put("redis", "UP");
        components.put("application", "UP");
        ready.put("components", components);
        
        ready.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(ready);
    }
} 