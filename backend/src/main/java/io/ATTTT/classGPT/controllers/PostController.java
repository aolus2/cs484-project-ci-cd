package io.ATTTT.classGPT.controllers;

import io.ATTTT.classGPT.models.Account;
import io.ATTTT.classGPT.models.Post;
import io.ATTTT.classGPT.services.AccountService;
import io.ATTTT.classGPT.services.FileService;
import io.ATTTT.classGPT.services.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Optional;

@Controller
public class PostController {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private FileService fileService;

    @GetMapping("/posts/{id}")
    public String getPost(@PathVariable Long id, Model model){
        Optional<Post> optionalPost = postService.getById(id);

        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            model.addAttribute("post", post);
            return "post";
        } else {
            return "404";
        }
    }

    @PostMapping("/posts/{id}")
    @PreAuthorize("isAuthenticated()")
    public String updatePost(@PathVariable Long id,
                             @ModelAttribute Post post,
                             @RequestParam(value = "file", required = false) MultipartFile file) {

        Optional<Post> optionalPost = postService.getById(id);
        if (optionalPost.isPresent()) {
            Post existingPost = optionalPost.get();

            existingPost.setTitle(post.getTitle());
            existingPost.setBody(post.getBody());

            if (file != null && !file.isEmpty()) {
                try {
                    fileService.save(file);
                    existingPost.setImageFilePath(file.getOriginalFilename());
                } catch (Exception e) {
                    log.error("Error processing file: {}", file.getOriginalFilename(), e);
                }
            }

            postService.save(existingPost);
        }

        return "redirect:/posts/" + id;
    }

    @GetMapping("/posts/new")
    @PreAuthorize("isAuthenticated()")
    public String createNewPost(Model model) {
        Post post = new Post();
        model.addAttribute("post", post);
        return "post_new";
    }

    @PostMapping("/posts/new")
    @PreAuthorize("isAuthenticated()")
    public String createNewPost(@ModelAttribute Post post,
                                @RequestParam(value = "file", required = false) MultipartFile file,
                                Principal principal) {

        String authUsername = principal.getName();

        Account account = accountService.findByEmail(authUsername)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        if (file != null && !file.isEmpty()) {
            try {
                fileService.save(file);
                post.setImageFilePath(file.getOriginalFilename());
            } catch (Exception e) {
                log.error("Error processing file: {}", file.getOriginalFilename(), e);
            }
        }

        post.setAccount(account);
        postService.save(post);
        return "redirect:/";
    }

    @GetMapping("/posts/{id}/edit")
    @PreAuthorize("isAuthenticated()")
    public String getPostForEdit(@PathVariable Long id, Model model) {

        Optional<Post> optionalPost = postService.getById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            model.addAttribute("post", post);
            return "post_edit";
        } else {
            return "404";
        }
    }

    @GetMapping("/posts/{id}/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public String deletePost(@PathVariable Long id) {

        Optional<Post> optionalPost = postService.getById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            postService.delete(post);
            return "redirect:/";
        } else {
            return "404";
        }
    }
}
