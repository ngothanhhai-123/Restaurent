package com.ngocquang.restautant.modules.table.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngocquang.restautant.modules.table.entity.resTable;

@Repository
public interface resTableRepository extends JpaRepository<resTable,Integer> {
}
