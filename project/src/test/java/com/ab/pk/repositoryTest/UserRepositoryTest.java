package com.ab.pk.repositoryTest;

import com.ab.pk.enums.UserStatus;
import com.ab.pk.model.AppUser;
import com.ab.pk.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserRepositoryTest {

    @Mock
    private static AppUserRepository customerRepository;

    @InjectMocks
    private static AppUser appUser;

    @BeforeAll
    public static void saveCustomer() {
        appUser = new AppUser();
        appUser.setLogin("LOGIN");
        appUser.setFirstname("TEST");
        appUser.setLastname("TEST");
        appUser.setPassword("PASSWORD");
    }

    @Test
    public void save_AppUser_test() {
        when(customerRepository.save(any(AppUser.class))).then(returnsFirstArg());
        AppUser savedCustomerTest = customerRepository.save(appUser);
        assertNotNull(savedCustomerTest);
    }

    @Test
    public void check_saved_user_default_values() {
        when(customerRepository.save(any(AppUser.class))).then(returnsFirstArg());
        AppUser savedCustomerTest = customerRepository.save(appUser);
        assertEquals(savedCustomerTest.getRole(), "USER");
        assertEquals(savedCustomerTest.getStatus(), UserStatus.ACTIVE);
    }

    @Test
    public void new_values_for_user_test() {
        when(customerRepository.save(any(AppUser.class))).then(returnsFirstArg());
        AppUser savedCustomerTest = customerRepository.save(appUser);
        assertEquals(savedCustomerTest.getLogin(), "LOGIN");
        assertEquals(savedCustomerTest.getPassword(), "PASSWORD");
        assertEquals(savedCustomerTest.getFirstname(), "TEST");
        assertEquals(savedCustomerTest.getLastname(), "TEST");
    }

    @Test
    public void check_if_user_not_null() {
        AppUser appUser_ = new AppUser();
        when(customerRepository.save(any(AppUser.class))).then(returnsFirstArg());
        AppUser savedCustomerTest = customerRepository.save(appUser_);
        assertNull(savedCustomerTest.getLogin());
        assertNull(savedCustomerTest.getPassword());
        assertNull(savedCustomerTest.getFirstname());
        assertNull(savedCustomerTest.getLastname());
    }
}
