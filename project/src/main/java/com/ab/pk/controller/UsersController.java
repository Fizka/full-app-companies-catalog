package com.ab.pk.controller;

import com.ab.pk.model.AppUser;
import com.ab.pk.model.Credentials;
import com.ab.pk.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

import java.util.List;

@RequestMapping("")
@RestController
@Slf4j
public class UsersController {

    UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/rola/{login}")
    public ResponseEntity getRole(@PathVariable String login) {
        try {
            log.info("Request GET role check, Params: " + login);
            AppUser appUser = userService.getAppUserByLogin(login);
            return ResponseEntity.ok(appUser.getRole());
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/login")
    public ResponseEntity login() {
        try {
            log.info("Request GET - login");
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/users")
    public ResponseEntity<List<Credentials>> getAllUsers() {
        try {
            log.info("Request GET users");
            return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/user")
    public ResponseEntity<Credentials> createUser(@RequestBody Credentials appUser) {
        try {
            log.info("Request POST user, with params: " + appUser);
            return new ResponseEntity<>(userService.saveUser(appUser), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "user/{id}")
    public ResponseEntity<Credentials> getUserById(@PathVariable Long id) {
        try {
            log.info("Request GET user, with params: " + id);
            return new ResponseEntity<>(userService.getAppUserById(id), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "user/login/{login}")
    public ResponseEntity<Credentials> getUserById(@PathVariable String login) {
        try {
            log.info("Request GET user, with params: " + login);
            return new ResponseEntity<>(userService.getCredentialsByLogin(login), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/user/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        try {
            log.info("Request DELETED user, with params: " + id);
            userService.deleteUser(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "user/{id}")
    public ResponseEntity putUser(@PathVariable Long id, @RequestBody Credentials appUser) {
        try {
            log.info("Request UPDATE user, with params: " + id);
            return new ResponseEntity(userService.putUser(id, appUser), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
