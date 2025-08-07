package com.example.movie_backend.model;

import jakarta.persistence.*;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private int releaseYear;
    private String director;

    public Movie() {}

    public Movie(String title, int releaseYear, String director) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.director = director;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getReleaseYear() { return releaseYear; }
    public void setReleaseYear(int releaseYear) { this.releaseYear = releaseYear; }

    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }
}
