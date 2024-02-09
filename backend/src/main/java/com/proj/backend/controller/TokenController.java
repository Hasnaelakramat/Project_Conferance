package com.proj.backend.controller;

import com.proj.backend.Security.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/token")
public class TokenController {
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @GetMapping("/role")
    public List<String> getRolesFromToken(@RequestHeader("Authorization") String token) {
        // Extract roles from the token
        Claims claims = extractClaims(token);
        return (List<String>) claims.get("roles");
    }

    @GetMapping("/email")
    public String getEmailFromToken(@RequestHeader("Authorization") String token) {
        // Extract email from the token
        Claims claims = extractClaims(token);
        return (String) claims.get("email");
    }

    @GetMapping("/id")
    public Long getIdFromToken(@RequestHeader("Authorization") String token) {
        // Extract ID from the token
        Claims claims = extractClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    private Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
    }


}
