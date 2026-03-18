package com.ngocquang.restautant.modules.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngocquang.restautant.modules.user.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
}
