package kz.qbm.app.service;

import jakarta.transaction.Transactional;
import kz.qbm.app.entity.Policy;
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
        String filename = storageService.store(file);
        Policy policy = new Policy();
        policy.setName(filename);
        return policyRepository.save(policy);
    }

    @Transactional
    public void deletePolicy(Long id) {
        Policy policy = policyRepository.findById(id).orElseThrow(() -> new NotFoundException("Policy not found"));
        storageService.delete(policy.getName());
        policyRepository.delete(policy);
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }
}
