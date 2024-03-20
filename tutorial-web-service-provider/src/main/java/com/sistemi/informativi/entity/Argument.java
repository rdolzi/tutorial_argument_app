package com.sistemi.informativi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.Columns;

import java.io.Serializable;

@Entity
public class Argument implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String technology;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "tutorial_id")
    private Tutorial tutorial;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTechnology() {
        return technology;
    }

    public void setTechnology(String technology) {
        this.technology = technology;
    }

    public Tutorial getTutorial() {
        return tutorial;
    }

    public void setTutorial(Tutorial tutorial) {
        this.tutorial = tutorial;
    }

    public Argument() {
    }

    public Argument(String technology, Tutorial tutorial) {
        this.technology = technology;
        this.tutorial = tutorial;
    }

    public Argument(int id, String technology, Tutorial tutorial) {
        this.id = id;
        this.technology = technology;
        this.tutorial = tutorial;
    }
}
