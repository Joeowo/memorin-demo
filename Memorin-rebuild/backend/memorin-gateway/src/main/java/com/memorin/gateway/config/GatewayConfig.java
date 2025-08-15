package com.memorin.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 网关配置类
 * 使用代码方式配置路由，确保路径剥离正确工作
 * 
 * @author Memorin Team
 * @version 1.0.0
 * @since 2025-01-08
 */
@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // 测试服务路由
                .route("test-service", r -> r
                        .path("/api/test/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("http://localhost:8081"))
                
                // 认证服务路由
                .route("auth-service", r -> r
                        .path("/api/auth/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("http://localhost:8081"))
                
                // 用户服务路由
                .route("user-service", r -> r
                        .path("/api/user/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("http://localhost:8081"))
                
                // 知识库服务路由 (预留)
                .route("knowledge-service", r -> r
                        .path("/api/knowledge/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("http://localhost:8082"))
                
                // 复习服务路由 (预留)
                .route("review-service", r -> r
                        .path("/api/review/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("http://localhost:8083"))
                
                // 统计服务路由 (预留)
                .route("statistics-service", r -> r
                        .path("/api/statistics/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("http://localhost:8084"))
                
                .build();
    }
} 