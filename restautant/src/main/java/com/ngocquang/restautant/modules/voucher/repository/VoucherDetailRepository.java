package com.ngocquang.restautant.modules.voucher.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngocquang.restautant.modules.voucher.entity.VoucherDetail;

@Repository
public interface VoucherDetailRepository extends JpaRepository<VoucherDetail,Integer> {
}
