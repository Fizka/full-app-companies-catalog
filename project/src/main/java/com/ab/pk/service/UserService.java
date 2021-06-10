package com.ab.pk.service;

import com.ab.pk.enums.Role;
import com.ab.pk.helpers.UserHelper;
import com.ab.pk.model.AppUser;
import com.ab.pk.model.ContextUser;
import com.ab.pk.repository.AppUserRepository;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    private AppUserRepository repository;
    private List<ContextUser> contextUsers;
    private UserHelper userHelper;


    @Autowired
    public UserService(AppUserRepository repository, UserHelper userHelper) {
        contextUsers = new ArrayList<>();
        this.repository = repository;
        this.userHelper = userHelper;
        getAllContextUsers();
    }

    public void getAllContextUsers() {
        this.repository.findAll().forEach(appUser -> {
            contextUsers.add(new ContextUser(appUser.getLogin(), appUser.getPassword(), appUser.getRole()));
        });
    }

    //TODO check
    public AppUser getAppUserById(Long id) {
        return repository.findById(id).get();
    }

    public AppUser getAppUserByLogin(String login) {
        return repository.findAppUserByLogin(login);
    }

    public List<AppUser> getAllUsers() {
        return Lists.newArrayList(repository.findAll());
    }

    public AppUser saveUser(AppUser appUser) {
        return repository.save(appUser);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public AppUser putUser(Long id, AppUser appUser) {
        Optional<AppUser> _appUser = repository.findById(id);
        if (_appUser.isPresent()) {
            _appUser.get().setFirstname(appUser.getFirstname());
            _appUser.get().setUsername(appUser.getUsername());
            _appUser.get().setLastname(appUser.getLastname());
            _appUser.get().setLogin(appUser.getLogin());
            _appUser.get().setRole(appUser.getRole());
            _appUser.get().setPassword(appUser.getPassword());
            _appUser.get().setStatus(appUser.getStatus());
            AppUser appUser_ = repository.save(_appUser.get());
            return appUser_;
        }
        return null;
    }

    public UserDetails getUser(String login) {
        return getByRoles(userHelper.mapAppUserToContextUser(repository.findAppUserByLogin(login)));
    }

    private static UserDetails mapToUserDetails(ContextUser contextUser) {
        return User.withUsername(contextUser.getLogin()).password(contextUser.getPass()).roles(contextUser.getRole().toString()).build();
    }

    private static UserDetails mapToUserDetailsAdminRole(ContextUser contextUser) {
        return User.withUsername(contextUser.getLogin()).password(contextUser.getPass()).roles(contextUser.getRole().toString(), "USER").build();
    }

    private static UserDetails getByRoles(ContextUser contextUser) {
        return contextUser.getRole().equals(Role.ADMIN.toString()) ? mapToUserDetailsAdminRole(contextUser) : mapToUserDetails(contextUser);
    }

}
