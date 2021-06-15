package com.ab.pk.service;

import com.ab.pk.authGuard.UserDetailsImpl;
import com.ab.pk.helpers.UserHelper;
import com.ab.pk.model.AppUser;
import com.ab.pk.repository.AppUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    AppUserRepository userService;

    @Autowired
    UserHelper userHelper;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        if("".equals(login))
            throw new NullPointerException("Username is null!");
        Optional<AppUser> user = Optional.of(userService.findAppUserByLogin(login));

        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + login));
        log.info("New User logged: " + user.get());
        return user.map(UserDetailsImpl::new).get();
    }
}
