package io.ATTTT.classGPT.controllers;

import io.ATTTT.classGPT.models.Account;
import io.ATTTT.classGPT.models.Post;
import io.ATTTT.classGPT.services.AccountService;
import io.ATTTT.classGPT.services.PostService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);

    private final PostService postService;
    private final AccountService accountService;


    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id){
        return postService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Post> createPost(@RequestBody Post incoming,
                                           Principal principal) {
        String email = principal.getName();
        Account account = accountService.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        Post post = new Post();
        post.setTitle(incoming.getTitle());
        post.setBody(incoming.getBody());
        post.setAccount(account);

        Post saved = postService.save(post);
        return ResponseEntity.ok(saved);
    }


    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Post> updatePost(@PathVariable Long id,
                                           @RequestBody Post incoming) {

        return postService.getById(id)
                .map(existing -> {
                    existing.setTitle(incoming.getTitle());
                    existing.setBody(incoming.getBody());
                    Post saved = postService.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> deletePost(@PathVariable Long id) {
        return postService.getById(id)
                .map(post -> {
                    postService.delete(post);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
