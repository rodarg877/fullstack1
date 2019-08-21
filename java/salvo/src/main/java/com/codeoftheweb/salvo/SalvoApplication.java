package com.codeoftheweb.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}
	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository, GameRepository gameRepository, GamePlayerRepository gamePlayerRepository) {
		return (args) -> {
			Player p1 = new Player("j.bauer@ctu.gov");
			Player p2 = new Player("c.obrian@ctu.gov");
			Player p3 = new Player("kim_bauer@gmail.com");
			Player p4 = new Player("t.almeida@ctu.gov");
			Player p5 = new Player("rodarg@gmail.com");
			playerRepository.save(p1);
			playerRepository.save(p2);
			playerRepository.save(p3);
			playerRepository.save(p4);
			playerRepository.save(p5);
			Date date =new Date();
			Date date2 = Date.from(date.toInstant().plusSeconds(3600));
			Date date3 = Date.from(date2.toInstant().plusSeconds(3600));
			Game g1 = new Game(date);
			Game g2 = new Game(date2);
			Game g3 = new Game(date3);
			Game g4 = new Game(date);
			Game g5 = new Game(date);
			Game g6 = new Game(date);
			Game g7 = new Game(date);
			Game g8 = new Game(date);
			gameRepository.save(g1);
			gameRepository.save(g2);
			gameRepository.save(g3);
			gameRepository.save(g4);
			gameRepository.save(g5);
			gameRepository.save(g6);
			gameRepository.save(g7);
			gameRepository.save(g8);
			GamePlayer gp1 = new GamePlayer(date, p1, g1);
			GamePlayer gp2 = new GamePlayer(date, p2, g1);
			GamePlayer gp3 = new GamePlayer(date, p1, g2);
			GamePlayer gp4 = new GamePlayer(date, p2, g2);
			GamePlayer gp5 = new GamePlayer(date, p2, g3);
			GamePlayer gp6 = new GamePlayer(date, p4, g3);
			GamePlayer gp7 = new GamePlayer(date, p2, g4);
			GamePlayer gp8 = new GamePlayer(date, p1, g4);
			GamePlayer gp9 = new GamePlayer(date, p4, g5);
			GamePlayer gp10 = new GamePlayer(date, p1, g5);
			GamePlayer gp11 = new GamePlayer(date, p3, g6);
			GamePlayer gp12 = new GamePlayer(date, p4, g7);
			GamePlayer gp13 = new GamePlayer(date, p3, g8);
			GamePlayer gp14 = new GamePlayer(date, p4, g8);
			gamePlayerRepository.save(gp1);
			gamePlayerRepository.save(gp2);
			gamePlayerRepository.save(gp3);
			gamePlayerRepository.save(gp4);
			gamePlayerRepository.save(gp5);
			gamePlayerRepository.save(gp6);
			gamePlayerRepository.save(gp7);
			gamePlayerRepository.save(gp8);
			gamePlayerRepository.save(gp9);
			gamePlayerRepository.save(gp10);
			gamePlayerRepository.save(gp11);
			gamePlayerRepository.save(gp12);
			gamePlayerRepository.save(gp13);
			gamePlayerRepository.save(gp14);
		};
	}

}
