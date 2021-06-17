package com.ab.pk.serviceTest;

import com.ab.pk.exception.ImcompatibleParametersException;
import com.ab.pk.model.AppUser;
import com.ab.pk.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

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
    public void expect_Exceptions_null_pointer() {
        AppUser _appUser = new AppUser();
        when(customerRepository.save(any(AppUser.class))).then(returnsFirstArg());
        AppUser appUser_ = customerRepository.save(_appUser);
        assertThrows(NullPointerException.class, () -> {
            appUser_.getLogin().toString();
        });
    }

    @Test
    public void test_update_user_by_repository() {
        when(customerRepository.save(any(AppUser.class))).then(returnsFirstArg());
        AppUser savedCustomerTest = customerRepository.save(appUser);
        savedCustomerTest.setLogin("NEW LOGIN");
        savedCustomerTest.setPassword("NEW PASSWORD");
        AppUser newSavedCustomerTest = customerRepository.save(appUser);
        assertEquals(newSavedCustomerTest.getLogin(), "NEW LOGIN");
        assertEquals(newSavedCustomerTest.getPassword(), "NEW PASSWORD");
    }

    @Test
    public void test_update_user_by_repository_Exception() {
        when(customerRepository.save(any(AppUser.class))).then(returnsFirstArg());
        AppUser savedCustomerTest = customerRepository.save(appUser);
        savedCustomerTest.setLogin("NEW LOGIN");
        savedCustomerTest.setPassword("NEW PASSWORD");
        AppUser newSavedCustomerTest = customerRepository.save(appUser);
        assertEquals(newSavedCustomerTest.getLogin(), "NEW LOGIN");
        assertEquals(newSavedCustomerTest.getPassword(), "NEW PASSWORD");
        assertThrows(Exception.class, () -> {
            if (!newSavedCustomerTest.getLogin().equals("LOGIN")) {
                throw new ImcompatibleParametersException();
            }
            ;
        });
    }

}
