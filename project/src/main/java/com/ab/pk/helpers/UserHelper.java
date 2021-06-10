package com.ab.pk.helpers;

import com.ab.pk.model.AppUser;
import com.ab.pk.model.ContextUser;
import org.springframework.stereotype.Component;

@Component
public class UserHelper {

    public ContextUser mapAppUserToContextUser(AppUser appUser) {
        return new ContextUser(appUser.getLogin(), appUser.getPassword(), appUser.getRole());
    }

}
