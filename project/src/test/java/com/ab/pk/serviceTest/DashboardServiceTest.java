package com.ab.pk.serviceTest;

import com.ab.pk.exception.ImcompatibleParametersException;
import com.ab.pk.model.CatalogPage;
import com.ab.pk.repository.CatalogPageRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DashboardServiceTest {

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
    public void expect_Exceptions_null_pointer() {
        CatalogPage catalogPage = new CatalogPage();
        when(pageRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage catalogPage_ = pageRepository.save(catalogPage);
        assertThrows(NullPointerException.class, () -> {
            catalogPage_.getDescription().toString();
        });
    }

    @Test
    public void test_update_catalog_page_by_repository() {
        when(pageRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage catalogPage = pageRepository.save(cat);
        catalogPage.setDescription("NEW DESCRIPTION");
        catalogPage.setTitle("NEW TITLE");
        CatalogPage newCatalog = pageRepository.save(catalogPage);
        assertEquals(newCatalog.getDescription(), "NEW DESCRIPTION");
        assertEquals(newCatalog.getTitle(), "NEW TITLE");
    }

    @Test
    public void test_update_catalog_page_by_repository_Exception() {
        when(pageRepository.save(any(CatalogPage.class))).then(returnsFirstArg());
        CatalogPage catalogPage = pageRepository.save(cat);
        catalogPage.setDescription("NEW DESCRIPTION");
        catalogPage.setTitle("NEW TITLE");
        CatalogPage newCatalog = pageRepository.save(catalogPage);
        assertThrows(Exception.class, () -> {
            if(!newCatalog.getDescription().equals("TEST TEST TEST TEST TEST")){
                throw new ImcompatibleParametersException();
            };
        });
    }

}
