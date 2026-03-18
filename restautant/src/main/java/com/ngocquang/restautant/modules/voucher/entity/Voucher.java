package com.ngocquang.restautant.modules.voucher.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.ngocquang.restautant.modules.payment.entity.Invoice;

@Entity
@Table(name="voucher")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Voucher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal discountValue;

    @Column(nullable = false,updatable = false)
    private LocalDateTime startDate = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime endDate;

    @Column(nullable = false)
    private Integer quantity;

    public enum DiscountType { percent, fixed }

    @Enumerated(EnumType.STRING)
    @Column( nullable = false)
    private DiscountType discountType = DiscountType.fixed;

    @OneToMany(mappedBy = "voucher")
    private List<VoucherDetail> voucherDetails;

    @OneToMany(mappedBy = "voucher")
    private List<Invoice> invoices;
}
