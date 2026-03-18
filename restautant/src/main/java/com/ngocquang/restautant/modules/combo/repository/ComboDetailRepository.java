package com.ngocquang.restautant.modules.combo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngocquang.restautant.modules.combo.entity.ComboDetail;

@Repository
public interface ComboDetailRepository extends JpaRepository<ComboDetail,Integer> {
}
