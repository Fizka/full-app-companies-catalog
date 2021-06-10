package com.ab.pk.configuration;

import com.ab.pk.exception.RestAccessDeniedHandler;
import com.ab.pk.exception.RestAuthenticationEntryPoint;
import com.ab.pk.service.UserDetailsServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity
@Slf4j
public class WebSecurityConfigurerAdapterImpl extends WebSecurityConfigurerAdapter {

    public final UserDetailsServiceImpl userDetailsServiceImpl;
    public final RestAccessDeniedHandler restAccessDeniedHandler;
    public final RestAuthenticationEntryPoint restAuthenticationEntryPoint;


    @Autowired
    public WebSecurityConfigurerAdapterImpl(UserDetailsServiceImpl userDetailsServiceImpl,
                                            RestAccessDeniedHandler restAccessDeniedHandler,
                                            RestAuthenticationEntryPoint restAuthenticationEntryPoint) {
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.restAccessDeniedHandler = restAccessDeniedHandler;
        this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;

    }

    @SuppressWarnings("deprecation")
    @Autowired
    void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceImpl);
    }

    protected void configure(HttpSecurity http) throws Exception {

        http
                .authorizeRequests()
                .antMatchers("/login", "/loginError").hasAnyRole("USER", "ADMIN")
                .antMatchers( "/dashboard/rola/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET,"/login").permitAll()
                .antMatchers("/dashboard/**", "/dashboard").access("hasRole('ADMIN')")
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(restAccessDeniedHandler)
                .authenticationEntryPoint(restAuthenticationEntryPoint);

        http.cors().and().csrf().disable();
    }

    private LogoutSuccessHandler logoutSuccessHandler() {
        return new LogoutSuccessHandler() {
            @Override
            public void onLogoutSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {
                log.info("Wylogowany!");
            }
        };
    }

    private AuthenticationFailureHandler authenticationFailureHandler() {
        return new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest httpServletRequest,
                                                HttpServletResponse httpServletResponse,
                                                AuthenticationException e) throws IOException, ServletException {
                log.info("Nie zalogowany!");
            }
        };
    }

    @SuppressWarnings("deprecation")
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
