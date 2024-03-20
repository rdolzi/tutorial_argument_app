package com.sistemi.informativi.repository;

import com.sistemi.informativi.entity.Argument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ArgumentRepository extends JpaRepository<Argument, Integer> {


    public List<Argument> findAllByTutorialId(Integer tutorialId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Argument a WHERE a.id = :id")
    void deleteArgumentsById(@Param("id") int id);

}
