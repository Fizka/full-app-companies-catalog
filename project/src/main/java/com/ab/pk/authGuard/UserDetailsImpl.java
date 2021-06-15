package com.ab.pk.authGuard;

import com.ab.pk.model.AppUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
@Slf4j
public class UserDetailsImpl implements UserDetails {

    private String login;
    private String password;
    private List<SimpleGrantedAuthority> authorities;

    public UserDetailsImpl(AppUser contextUser) {
        this.login = contextUser.getLogin();
        this.password = contextUser.getPassword();
        this.authorities = Arrays.stream(contextUser.getRole().split(","))
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        log.info(String.valueOf(this.authorities));
    }

    private String getCollectRole(String role){
        return role.equals("ADMIN") ? RoleConstant.adminRole : RoleConstant.userRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
