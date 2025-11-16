package io.ATTTT.classGPT.services;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    private final Path root = Paths.get("./uploads");

    public FileService() {
        init();
    }

    private void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException ex) {
            throw new RuntimeException("Could not initialize root folder", ex);
        }
    }

    public void save(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return; // nothing to save
        }

        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        } catch (IOException ex) {
            throw new RuntimeException("Error saving file", ex);
        }
    }

    public Resource load(String filename) {
        if (filename == null) return null;
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException mex) {
            throw new RuntimeException("Error: " + mex.getMessage(), mex);
        }
    }
}
