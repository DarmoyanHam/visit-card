package com.visitcard.repository;
import com.visitcard.entity.Admin;
import com.visitcard.entity.MainPage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MainRepository extends JpaRepository<MainPage, Long> {
    Optional<MainPage> findByLogin(String login);
    Optional<MainPage> findByAdmin(Admin admin);
}

