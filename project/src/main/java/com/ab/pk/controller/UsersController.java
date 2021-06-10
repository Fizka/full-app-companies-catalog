package com.ab.pk.controller;

import com.ab.pk.model.AppUser;
import com.ab.pk.service.UserService;
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
public class UsersController {

    UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/rola/{login}")
    public ResponseEntity getRole(@PathVariable String login) {
        AppUser appUser = userService.getAppUserByLogin(login);
        return ResponseEntity.ok(appUser.getRole());
    }

    @GetMapping(value = "/login")
    public ResponseEntity login() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/users")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping(value = "/user")
    public ResponseEntity <AppUser> createUser(@RequestBody AppUser appUser){
        return new ResponseEntity<AppUser>(userService.saveUser(appUser), HttpStatus.CREATED);
    }

    @GetMapping(value = "user/{id}")
    public ResponseEntity <AppUser> getUserById(@PathVariable Long id){
        return  new ResponseEntity<>(userService.getAppUserById(id), HttpStatus.OK);
    }

    @DeleteMapping(value = "/user/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id){
        try{
            userService.deleteUser(id);
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "user/{id}")
    public ResponseEntity putUser(@PathVariable Long id, @RequestBody AppUser appUser){
       return new ResponseEntity(userService.putUser(id, appUser), HttpStatus.OK);
    }
}
