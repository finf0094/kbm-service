package kz.qbm.app;

import kz.qbm.app.config.StorageProperties;
import kz.qbm.app.service.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;


@Slf4j
@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
			storageService.init();
		};
	}

	@Value("${cors.allowed_origins}")
	private String ALLOWED_ORIGINS;

	@Bean
	CommandLineRunner check() {
		return (args) -> {
			log.info("ALLOWED_ORIGINS: " + ALLOWED_ORIGINS);
		};
	}
}
