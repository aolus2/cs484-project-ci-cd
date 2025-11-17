package io.ATTTT.classGPT.controllers;

import io.ATTTT.classGPT.models.Account;
import io.ATTTT.classGPT.models.Post;
import io.ATTTT.classGPT.models.Replies;
import io.ATTTT.classGPT.repositories.RepliesRepository;
import io.ATTTT.classGPT.services.AccountService;
import io.ATTTT.classGPT.services.GeminiService;
import io.ATTTT.classGPT.services.PostService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);

    private final PostService postService;
    private final GeminiService geminiService;
    private final AccountService accountService;
    private final RepliesRepository repliesRepository;


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
//    @PreAuthorize("isAuthenticated()")
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
//    @PreAuthorize("isAuthenticated()")
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
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> deletePost(@PathVariable Long id) {
        return postService.getById(id)
                .map(post -> {
                    postService.delete(post);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping("/{id}/replies")
//    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> addReply(@PathVariable Long id,
                                           @RequestBody CreateFollowupRequest req,
                                           Principal principal) {
        Post post = postService.getById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Replies reply = new Replies();
        reply.setBody(req.getBody());
        reply.setPost(post);

        if (principal != null) {
            String email = principal.getName();
            Account account = accountService.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("Account not found"));
            reply.setAuthor(account);
            reply.setFromInstructor(account.hasRole("ROLE_ADMIN"));
        } else {
            reply.setAuthor(null);
            reply.setFromInstructor(false);
        } //We're gonna have to change this once the log in page is figured out

        reply.setLLMGenerated(false);
        Replies saved = repliesRepository.save(reply);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/{id}/LLMReply")
//    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> addLLMReply(@PathVariable Long id,
                                           Principal principal) {
        Post post = postService.getById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));


        Replies reply = new Replies();
        reply.setBody(geminiService.generateReply(post));
        reply.setPost(post);

        if (principal != null) {
            String email = principal.getName();
            Account account = accountService.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("Account not found"));
            reply.setAuthor(account);
            reply.setFromInstructor(account.hasRole("ROLE_ADMIN"));
        } else {
            reply.setAuthor(null);
            reply.setFromInstructor(false);
        } //We're gonna have to change this once the log in page is figured out

        reply.setLLMGenerated(true);
        Replies saved = repliesRepository.save(reply);
        return ResponseEntity.ok(saved);
    }

    @Data
    public static class CreateFollowupRequest {
        private String body;
    }

}
