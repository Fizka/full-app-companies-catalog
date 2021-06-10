package com.ab.pk.service;

import com.ab.pk.model.CatalogPage;
import com.ab.pk.repository.CatalogPageRepository;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class DashboardService {

    public final CatalogPageRepository repository;

    @Autowired
    public DashboardService(CatalogPageRepository repository) {
        this.repository = repository;
    }

    public List<CatalogPage> getPages() {
        return Lists.newArrayList(repository.findAll());
    }

    public Optional<CatalogPage> getPageById(Long idBook) {
        return repository.findById(idBook);
    }

    public CatalogPage savePage(CatalogPage catalogPage) {
        return repository.save(catalogPage);
    }

    public void deletePage(Long idBook) {
        repository.deleteById(idBook);
    }

    public CatalogPage putCatalogPage(Long id, CatalogPage catalogPage) {
        try {
            Optional<CatalogPage> catalogPage_ = repository.findById(id);
            catalogPage_.get().setDescription(catalogPage.getDescription());
            catalogPage_.get().setStatus(catalogPage.getStatus());
            catalogPage_.get().setTitle(catalogPage.getTitle());
            catalogPage_.get().setOwner(catalogPage.getOwner());
            return repository.save(catalogPage_.get());
        } catch (Exception e) {
            log.error(e.getMessage());
            throw e;
        }
    }
}
