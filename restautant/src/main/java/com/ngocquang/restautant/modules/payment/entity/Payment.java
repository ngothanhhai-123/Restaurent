package com.ngocquang.restautant.modules.payment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name="payment")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public enum Method{Cash,Bank_Transfer};
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Method method=Method.Cash;

    @Column(nullable = false,precision = 12,scale = 2)
    private BigDecimal amount;

    @Column(nullable = false,updatable = false)
    private LocalDateTime paidAt=LocalDateTime.now();

    @OneToOne
    @JoinColumn(name="invoice_id",unique = true)
    private Invoice invoice;
}