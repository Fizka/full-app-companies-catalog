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
public class DashboardRepositoryTest {

    @Mock
    private static CatalogPageRepository pageRepository;

    @InjectMocks
    private static CatalogPage cat;

    @BeforeAll
    public static void create_catalog_page_mock() {
        cat = new CatalogPage();
        cat.setTitle("TITLE");
        cat.setDescription("TEST TEST TEST TEST TEST");
    }

    @Test
    public void save_new_catalog_page() {
        when(pageRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage catalogPage = pageRepository.save(cat);
        assertNotNull(catalogPage);
    }

    @Test
    public void save_catalog_page_with_and_check_deafult_value() {
        when(pageRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage savedcustomertest = pageRepository.save(cat);
        assertEquals(savedcustomertest.getStatus(), CatalogPageStatus.ACTIVE);
    }

    @Test
    public void save_catalog_page_with_new_value_and_check() {
        when(pageRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage catalogPage = pageRepository.save(cat);
        assertEquals(catalogPage.getTitle(), "TITLE");
        assertEquals(catalogPage.getDescription(), "TEST TEST TEST TEST TEST");
    }

    @Test
    public void save_catalog_page_and_check_values() {
        CatalogPage page = new CatalogPage();
        when(pageRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage catalogPage = pageRepository.save(page);
        assertNull(catalogPage.getDescription());
        assertNull(catalogPage.getTitle());
    }

}
