package com.ab.pk.repository;

import com.ab.pk.model.AppUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends CrudRepository<AppUser, Long> {
    AppUser findAppUserByLogin(String login);
}
