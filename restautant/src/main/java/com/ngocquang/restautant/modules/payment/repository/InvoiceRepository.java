package com.ngocquang.restautant.modules.payment.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngocquang.restautant.modules.payment.entity.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {
}
