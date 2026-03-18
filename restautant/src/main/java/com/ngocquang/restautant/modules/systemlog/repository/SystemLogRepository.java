package com.ngocquang.restautant.modules.systemlog.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngocquang.restautant.modules.systemlog.entity.SystemLog;


@Repository
public interface SystemLogRepository extends JpaRepository<SystemLog,Integer> {
}
