package com.sistemi.informativi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;


import java.io.Serializable;
import java.util.List;

@Entity
public class Tutorial implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column(length = 50, nullable = false)
    @Size(max = 50, message ="size title need to be max 50 chars")
    private String title;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private Boolean published;

    // deve essere una collection interface
    @OneToMany(fetch = FetchType.EAGER, mappedBy="tutorial", cascade=CascadeType.ALL)
    private List<Argument> arguments;

    public Tutorial() {

    }

    public List<Argument> getArguments() {
        return arguments;
    }

    public void setArguments(List<Argument> arguments) {
        this.arguments = arguments;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Tutorial(String title, String description, Boolean published) {
        this.title = title;
        this.description = description;
        this.published = published;
    }

    public Tutorial(int id, String title, String description, Boolean published) {
        Id = id;
        this.title = title;
        this.description = description;
        this.published = published;
    }

    @Override
    public String toString() {
        return "Tutorial{" +
                "Id=" + Id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", published=" + published +
                ", arguments=" + arguments +
                '}';
    }
}
