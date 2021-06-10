package com.ab.pk.repositoryTest;

import com.ab.pk.enums.CatalogPageStatus;
import com.ab.pk.model.CatalogPage;
import com.ab.pk.repository.CatalogPageRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DashboardServiceTest {

    @Mock
    private static CatalogPageRepository customerRepository;

    @InjectMocks
    private static CatalogPage appUser;

    @BeforeAll
    public static void saveCustomer() {
        appUser = new CatalogPage();
        appUser.setTitle("TITLE");
        appUser.setDescription("TEST TEST TEST TEST TEST");
    }

    @Test
    public void saveAppUser() {
        when(customerRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage savedCustomerTest = customerRepository.save(appUser);
        assertNotNull(savedCustomerTest);
    }

    @Test
    public void savedUserHaveDefaultValues() {
        when(customerRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage savedCustomerTest = customerRepository.save(appUser);
        assertEquals(savedCustomerTest.getStatus(), CatalogPageStatus.ACTIVE);
    }

    @Test
    public void savedUserHaveNewValues() {
        when(customerRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage savedCustomerTest = customerRepository.save(appUser);
        assertEquals(savedCustomerTest.getTitle(), "TITLE");
        assertEquals(savedCustomerTest.getDescription(), "TEST TEST TEST TEST TEST");
    }

    @Test
    public void savedUserHaveNullValues() {
        CatalogPage appUser_ = new CatalogPage();
        when(customerRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage savedCustomerTest = customerRepository.save(appUser_);
        assertNull(savedCustomerTest.getDescription());
        assertNull(savedCustomerTest.getTitle());
    }

}
