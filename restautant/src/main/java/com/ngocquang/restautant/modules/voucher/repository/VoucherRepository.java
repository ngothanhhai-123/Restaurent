package com.ngocquang.restautant.modules.voucher.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngocquang.restautant.modules.voucher.entity.Voucher;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher,Integer> {
}
