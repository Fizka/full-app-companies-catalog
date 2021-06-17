package com.ab.pk.service;

import com.ab.pk.enums.Role;
import com.ab.pk.enums.UserStatus;
import com.ab.pk.exception.AppUserNotFoundException;
import com.ab.pk.helpers.UserHelper;
import com.ab.pk.model.AppUser;
import com.ab.pk.model.ContextUser;
import com.ab.pk.model.Credentials;
import com.ab.pk.repository.AppUserRepository;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Credentials getAppUserById(Long id) {
        return mapAppUserToCredentials(repository.findById(id).get());
    }

    public Credentials getCredentialsByLogin(String login) {
        System.out.println("looking for user");
        return mapAppUserToCredentials(repository.findAppUserByLogin(login));
    }

    public AppUser getAppUserByLogin(String login) {
        return repository.findAppUserByLogin(login);
    }

    public List<Credentials> getAllUsers() {
        return Lists.newArrayList(repository.findAll()).stream()
                .map(this::mapAppUserToCredentials)
                .collect(Collectors.toList());
    }

    public Credentials saveUser(Credentials appUser) {
        AppUser appUser_ = repository.save(mapCredentialsToAppUser(appUser));
        return mapAppUserToCredentials(appUser_);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public Credentials putUser(Long id, Credentials appUser) {
        Optional<AppUser> _appUser = Optional.ofNullable(repository.findById(id)
                .orElseThrow(() -> new AppUserNotFoundException(id)));
        if (_appUser.isPresent()) {
            System.out.println(appUser);
            _appUser.get().setFirstname(appUser.getFirstname());
            _appUser.get().setUsername(appUser.getUsername() != null ? appUser.getUsername() : _appUser.get().getUsername());
            _appUser.get().setLastname(appUser.getLastname());
            _appUser.get().setLogin(appUser.getLogin());
            log.info(appUser.getRole());
            _appUser.get().setRole(!appUser.getRole().isBlank() ? appUser.getRole() : _appUser.get().getRole());
            _appUser.get().setPassword(appUser.getPassword());
            _appUser.get().setStatus(appUser.getStatus());
            if (appUser.getFavorite() != null) {
                if (appUser.getFavorite().size() != 0) {
                    _appUser.get().setFavorite(appUser.getFavorite()
                            .stream().map(String::valueOf)
                            .collect(Collectors.joining(",")));
                }
            } else {
                _appUser.get().setFavorite(null);
            }
            AppUser appUser_ = repository.save(_appUser.get());
            return mapAppUserToCredentials(appUser_);
        }
        return null;
    }

    public Credentials toggleFavourite(Long userId, String id) {
        Integer pageId = Integer.parseInt(id);
        Credentials credentials = getAppUserById(userId);
        int index = credentials.getFavorite().indexOf(pageId);
        System.out.println(credentials.getFavorite());
        System.out.println(index);
        if (index == -1) {
            credentials.getFavorite().add(pageId);
        } else {
            credentials.getFavorite().remove(pageId);
        }
        System.out.println(credentials.getFavorite());
        return putUser(userId, credentials);
    }

    public Credentials changeStatus(Long userId) {
        System.out.println(userId);
        Credentials credentials = getAppUserById(userId);
        System.out.println(credentials);
        if (credentials.getStatus().equals(UserStatus.ACTIVE)) {
            credentials.setStatus(UserStatus.BLOCKED);
        } else {
            credentials.setStatus(UserStatus.ACTIVE);
        }
        return putUser(userId, credentials);
    }

    public Credentials mapAppUserToCredentials(AppUser appUser) {
        Credentials credentials = new Credentials();
        if (appUser.getFavorite() != null) {
            credentials.setFavorite(stringToIntegerList(appUser.getFavorite()));
        } else {
            credentials.setFavorite(new ArrayList<>());
        }
        credentials.setIdAppUser(appUser.getIdAppUser());
        credentials.setFirstname(appUser.getFirstname());
        credentials.setRole(appUser.getRole());
        credentials.setLogin(appUser.getLogin());
        credentials.setLastname(appUser.getLastname());
        credentials.setUsername(appUser.getUsername());
        credentials.setStatus(appUser.getStatus());
        credentials.setPassword(appUser.getPassword());
        return credentials;
    }

    public AppUser mapCredentialsToAppUser(Credentials appUser) {
        AppUser credentials = new AppUser();
        credentials.setIdAppUser(appUser.getIdAppUser());
        credentials.setFirstname(appUser.getFirstname());
        credentials.setLogin(appUser.getLogin());
        credentials.setRole(appUser.getRole());
        credentials.setLastname(appUser.getLastname());
        credentials.setUsername(appUser.getUsername());
        credentials.setStatus(appUser.getStatus());
        credentials.setPassword(appUser.getPassword());
        return credentials;
    }

    public List<Integer> stringToIntegerList(String numbers) {
        return Arrays.stream(numbers.split(",")).map(user -> {
            log.info(user.toString());
            return Integer.parseInt(user);
        }).collect(Collectors.toList());
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
