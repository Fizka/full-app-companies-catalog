package com.ab.pk;

import com.ab.pk.faker.CreateMockData;
import com.ab.pk.repository.AppUserRepository;
import com.ab.pk.repository.CatalogPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WccApplication implements CommandLineRunner {

    @Autowired
    public WccApplication(AppUserRepository appUserRepository, CatalogPageRepository catalogPageRepository) {
        this.appUserRepository = appUserRepository;
        this.catalogPageRepository = catalogPageRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(WccApplication.class, args);
    }

    public final AppUserRepository appUserRepository;
    public final CatalogPageRepository catalogPageRepository;

    @Override
    public void run(String... args) throws Exception {
        CreateMockData createMockData = new CreateMockData(appUserRepository, catalogPageRepository);
    }
}
