package com.ngocquang.restautant.modules.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ngocquang.restautant.modules.booking.entity.Booking;
import com.ngocquang.restautant.modules.user.entity.User;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer> {
    
    List<Booking> findByUserAndStatusOrderByBookingTimeDesc(User user, Booking.Status status);
}
