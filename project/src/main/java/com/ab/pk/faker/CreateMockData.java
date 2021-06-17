package com.ab.pk.faker;

import com.ab.pk.enums.UserStatus;
import com.ab.pk.model.AppUser;
import com.ab.pk.model.CatalogPage;
import com.ab.pk.repository.AppUserRepository;
import com.ab.pk.repository.CatalogPageRepository;
import com.github.javafaker.Faker;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Slf4j
public class CreateMockData {

    Faker faker;
    List<AppUser> catalogPages;
    AppUserRepository appUserRepository;
    CatalogPageRepository catalogPageRepository;

    @Autowired
    public CreateMockData(AppUserRepository appUserRepository, CatalogPageRepository catalogPageRepository) {
        this.faker = new Faker(new Locale("eng"));
        this.catalogPages = new ArrayList<>();
        this.appUserRepository = appUserRepository;
        this.catalogPageRepository = catalogPageRepository;
        //createData();
    }

    void createData() {
        for (int i = 0; i < 3; i++) {
            AppUser appUser = new AppUser("login" + i, "haslo" + i,
                    "USER", faker.funnyName().name(), faker.funnyName().name(),
                    faker.funnyName().name(), UserStatus.ACTIVE);
            catalogPages.add(appUser);
            appUserRepository.save(appUser);
        }
        for (int i = 0; i < 10; i++) {
            catalogPageRepository.save(new CatalogPage(faker.company().catchPhrase(),
                    faker.company().name(), catalogPages.get(faker.number().numberBetween(0, 1))
                    , faker.company().profession()
            ));
        }
    }

}
