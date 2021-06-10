package com.ab.pk.repository;

import com.ab.pk.model.CatalogPage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogPageRepository extends CrudRepository<CatalogPage, Long> {
}
