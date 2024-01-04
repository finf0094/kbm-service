package kz.qbm.app.service;

import jakarta.transaction.Transactional;
import kz.qbm.app.entity.Policy;
import kz.qbm.app.exception.BadRequestException;
import kz.qbm.app.exception.NotFoundException;
import kz.qbm.app.repository.PolicyRepository;
import kz.qbm.app.service.storage.FileSystemStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PolicyService {

    // REPOSITORIES
    private final PolicyRepository policyRepository;

    // SERVICE
    private final FileSystemStorageService storageService;

    public Policy addPolicy(MultipartFile file) {
        // Check the file is a pdf
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("application/pdf")) {
            throw new BadRequestException("Uploaded file is not a pdf");
        }

        String filename = storageService.store(file);
        String policyUrl = "storage/" + filename;
        Policy policy = new Policy();
        policy.setPolicyUrl(policyUrl);
        return policyRepository.save(policy);
    }

    @Transactional
    public void deletePolicy(Long id) {
        Policy policy = policyRepository.findById(id).orElseThrow(
                () -> new NotFoundException(String.format("Policy with id: %s not found", id))
        );

        String policyUrl = policy.getPolicyUrl();
        if (policyUrl.startsWith("storage/")) {
            String filename = policyUrl.substring("storage/".length());
            storageService.delete(filename);
        }

        policyRepository.delete(policy);
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }
}