package com.ticketflow.controller;

import com.ticketflow.dto.UserResponse;
import com.ticketflow.entity.Role;
import com.ticketflow.entity.User;
import com.ticketflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/agents")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public ResponseEntity<List<UserResponse>> getAgents() {
        List<User> agents = userRepository.findByRole(Role.AGENT);
        List<User> admins = userRepository.findByRole(Role.ADMIN);

        List<User> staff = new ArrayList<>();
        staff.addAll(agents);
        staff.addAll(admins);

        List<UserResponse> response = staff.stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .role(user.getRole())
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
