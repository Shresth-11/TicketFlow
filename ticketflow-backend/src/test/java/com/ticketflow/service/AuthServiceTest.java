package com.ticketflow.service;

import com.ticketflow.dto.AuthRequest;
import com.ticketflow.dto.AuthResponse;
import com.ticketflow.dto.RegisterRequest;
import com.ticketflow.entity.Role;
import com.ticketflow.entity.User;
import com.ticketflow.exception.BadRequestException;
import com.ticketflow.repository.UserRepository;
import com.ticketflow.security.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AuthService authService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("user@test.com")
                .password("encoded_pass")
                .fullName("Test User")
                .role(Role.EMPLOYEE)
                .build();
    }

    @Test
    void register_Success() {
        RegisterRequest request = RegisterRequest.builder()
                .email("user@test.com")
                .password("raw_pass")
                .fullName("Test User")
                .role(Role.EMPLOYEE)
                .build();

        when(userRepository.existsByEmail("user@test.com")).thenReturn(false);
        when(passwordEncoder.encode("raw_pass")).thenReturn("encoded_pass");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(jwtUtils.generateToken("user@test.com", "EMPLOYEE")).thenReturn("mocked.jwt.token");

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("mocked.jwt.token", response.getToken());
        assertEquals("user@test.com", response.getEmail());
        assertEquals(Role.EMPLOYEE, response.getRole());
    }

    @Test
    void register_DuplicateEmail_ThrowsBadRequestException() {
        RegisterRequest request = RegisterRequest.builder()
                .email("user@test.com")
                .password("raw_pass")
                .fullName("Test User")
                .build();

        when(userRepository.existsByEmail("user@test.com")).thenReturn(true);

        assertThrows(BadRequestException.class, () -> authService.register(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void login_Success() {
        AuthRequest request = AuthRequest.builder()
                .email("user@test.com")
                .password("raw_pass")
                .build();

        when(userRepository.findByEmail("user@test.com")).thenReturn(Optional.of(testUser));
        when(jwtUtils.generateToken("user@test.com", "EMPLOYEE")).thenReturn("mocked.jwt.token");

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("mocked.jwt.token", response.getToken());
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }
}
