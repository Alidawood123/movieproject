package com.example.movie_backend.config;

import com.example.movie_backend.model.Movie;
import com.example.movie_backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only add sample data if the database is empty
        if (movieRepository.count() == 0) {
            System.out.println("🎬 Adding sample movies to database...");
            
            movieRepository.save(new Movie("The Matrix", 1999, "Wachowski Sisters"));
            movieRepository.save(new Movie("Inception", 2010, "Christopher Nolan"));
            movieRepository.save(new Movie("Pulp Fiction", 1994, "Quentin Tarantino"));
            movieRepository.save(new Movie("The Shawshank Redemption", 1994, "Frank Darabont"));
            movieRepository.save(new Movie("The Dark Knight", 2008, "Christopher Nolan"));
            movieRepository.save(new Movie("Fight Club", 1999, "David Fincher"));
            
            System.out.println("✅ Sample movies added successfully!");
        } else {
            System.out.println("📚 Database already contains " + movieRepository.count() + " movies");
        }
    }
} 