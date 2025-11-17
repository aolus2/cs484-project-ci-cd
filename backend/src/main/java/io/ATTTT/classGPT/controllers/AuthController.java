package io.ATTTT.classGPT.controllers;

import io.ATTTT.classGPT.models.Account;
import io.ATTTT.classGPT.models.Authority;
import io.ATTTT.classGPT.services.AccountService;
import io.ATTTT.classGPT.repositories.AuthorityRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;

    @PostMapping("/register")
    public ResponseEntity<Account> register(@RequestBody RegisterRequest req) {
        Account account = new Account();

        account.setEmail(req.getEmail());
        account.setPassword(req.getPassword());

        String roleName = "ROLE_USER";
        if ("instructor".equalsIgnoreCase(req.getRole())) {
            roleName = "ROLE_ADMIN";
        }

        Set<Authority> authorities = new HashSet<>();
        authorityRepository.findById(roleName).ifPresent(authorities::add);
        account.setAuthorities(authorities);

        String fullName = req.getFullName() != null ? req.getFullName().trim() : "";
        String firstName = fullName;
        String lastName = "";
        int space = fullName.indexOf(' ');
        if (space > 0) {
            firstName = fullName.substring(0, space);
            lastName = fullName.substring(space + 1);
        }

        account.setFirstName(firstName);
        account.setLastName(lastName);

        Account saved = accountService.save(account);


        return ResponseEntity.ok(saved);
    }

    @Data
    public static class RegisterRequest {
        private String fullName;
        private String email;
        private String password;
        private String role;
        private List<String> classCodes;
    }

    @Data
    public static class AccountRequest {
        private Long id;
        private String fullName;
        private String email;
        private String password;
        private String role;
    }
}