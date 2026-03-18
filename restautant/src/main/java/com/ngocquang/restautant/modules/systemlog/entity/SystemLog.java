package com.ngocquang.restautant.modules.systemlog.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.ngocquang.restautant.modules.user.entity.User;

@Entity
@Table(name="systemLog")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SystemLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String action;

    @Column(columnDefinition = "TEXT",nullable = false)
    @Lob
    private String detail;

    @Column(nullable = false, updatable = false)
    private LocalDateTime loggedAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
