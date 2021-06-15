package com.ab.pk.exception;

import com.ab.pk.model.Response;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                         AuthenticationException e) throws  IOException {
        Gson gson = new Gson();
        log.error(httpServletRequest.getAuthType());
        log.error(String.valueOf(httpServletRequest.getHeaderNames()));
        log.error("Error - Unauthorised user {}", e);
        log.error(e.getMessage());
        gson.toJson(new Response(401, "Unauthorised"), httpServletResponse.getWriter());
    }
}
