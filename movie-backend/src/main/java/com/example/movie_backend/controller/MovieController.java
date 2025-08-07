package com.example.movie_backend.controller;

import com.example.movie_backend.model.Movie;
import com.example.movie_backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") // allows frontend connection
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movieDetails) {
        Movie movie = movieRepository.findById(id).orElseThrow();
        movie.setTitle(movieDetails.getTitle());
        movie.setReleaseYear(movieDetails.getReleaseYear());
        movie.setDirector(movieDetails.getDirector());
        return movieRepository.save(movie);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieRepository.deleteById(id);
    }
}
