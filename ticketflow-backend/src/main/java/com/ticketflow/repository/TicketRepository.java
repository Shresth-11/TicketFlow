package com.ticketflow.repository;

import com.ticketflow.entity.Priority;
import com.ticketflow.entity.Status;
import com.ticketflow.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long>, JpaSpecificationExecutor<Ticket> {

    @Query("SELECT t FROM Ticket t " +
           "LEFT JOIN t.assignedTo a " +
           "LEFT JOIN t.category c " +
           "WHERE (:createdById IS NULL OR t.createdBy.id = :createdById) AND " +
           "(:status IS NULL OR t.status = :status) AND " +
           "(:priority IS NULL OR t.priority = :priority) AND " +
           "(:assignedToId IS NULL OR a.id = :assignedToId) AND " +
           "(:categoryId IS NULL OR c.id = :categoryId) " +
           "ORDER BY t.createdAt DESC")
    List<Ticket> findWithFilters(
            @Param("createdById") Long createdById,
            @Param("status") Status status,
            @Param("priority") Priority priority,
            @Param("assignedToId") Long assignedToId,
            @Param("categoryId") Long categoryId
    );

}
