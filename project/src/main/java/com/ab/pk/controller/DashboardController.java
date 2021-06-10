package com.ab.pk.controller;

import com.ab.pk.model.CatalogPage;
import com.ab.pk.model.Response;
import com.ab.pk.service.DashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RequestMapping("")
@RestController
@Slf4j
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping(value = "/page/{id}", produces = "application/json")
    public ResponseEntity<Object> getCatalogPageById(@PathVariable("idCatalogPage") Long idCatalogPage) {
        log.info("Book id: " + idCatalogPage);
        try {
            Optional<CatalogPage> catalogPage = dashboardService.getPageById(idCatalogPage);
            log.info((catalogPage.get().toString()));
            return new ResponseEntity<>(catalogPage.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Response(404, "There is no book with id: " + idCatalogPage),
                    new HttpHeaders(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/page", produces = "application/json")
    public ResponseEntity<List<Object>> getAllCatalogPages() {
        log.info("GET!");
        try {
            List<CatalogPage> catalogPages = dashboardService.getPages();
            return new ResponseEntity<>(Collections.singletonList(catalogPages), HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping(value = "/page", produces = "application/json")
    public ResponseEntity<Object> postCatalogPage(@RequestBody CatalogPage catalogPage) {
        log.info(catalogPage.toString());
        try {
            if (catalogPage.getTitle() == null) {
                throw new NullPointerException();
            }
            CatalogPage catalogPage_ = dashboardService.savePage(catalogPage);
            return new ResponseEntity<>(catalogPage_, HttpStatus.CREATED);
        } catch (Exception exception) {
            return new ResponseEntity<>(new Response(400, "This book cannot be added"),
                    new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/page/{id}")
    public ResponseEntity<Object> deleteCatalogPage(@PathVariable("idCatalogPage") Long idCatalogPage) {
        log.info("Catalog Page id: " + idCatalogPage);
        try {
            dashboardService.deletePage(idCatalogPage);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/page/{id}")
    public ResponseEntity <CatalogPage> putCatalogPage(@PathVariable Long id, @RequestBody CatalogPage catalogPage ){
        try{
            return new ResponseEntity<>(dashboardService.putCatalogPage(id, catalogPage), HttpStatus.OK);
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
