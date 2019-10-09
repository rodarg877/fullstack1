package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository, GameRepository gameRepository, GamePlayerRepository gamePlayerRepository, ShipRepository shipRepository, SalvoRepository salvoRepository, ScoreRepository scoreRepository) {
		return (args) -> {
			Player p1 = new Player("j.bauer@ctu.gov",passwordEncoder().encode("1234"));
			Player p2 = new Player("c.obrian@ctu.gov",passwordEncoder().encode("1234"));
			Player p3 = new Player("kim_bauer@gmail.com",passwordEncoder().encode("1234"));
			Player p4 = new Player("t.almeida@ctu.gov",passwordEncoder().encode("1234"));
			Player p5 = new Player("rodarg@gmail.com",passwordEncoder().encode("1234"));
			playerRepository.save(p1);
			playerRepository.save(p2);
			playerRepository.save(p3);
			playerRepository.save(p4);
			playerRepository.save(p5);
			Game g1 = new Game();
			Game g2 = new Game();
			Game g3 = new Game();
			Game g4 = new Game();
			Game g5 = new Game();
			Game g6 = new Game();
			Game g7 = new Game();
			Game g8 = new Game();
			gameRepository.save(g1);
			gameRepository.save(g2);
			gameRepository.save(g3);
			gameRepository.save(g4);
			gameRepository.save(g5);
			gameRepository.save(g6);
			gameRepository.save(g7);
			gameRepository.save(g8);
			GamePlayer gp1 = new GamePlayer( p1, g1);
			GamePlayer gp2 = new GamePlayer( p2, g1);
			GamePlayer gp3 = new GamePlayer( p1, g2);
			GamePlayer gp4 = new GamePlayer( p2, g2);
			GamePlayer gp5 = new GamePlayer( p2, g3);
			GamePlayer gp6 = new GamePlayer( p4, g3);
			GamePlayer gp7 = new GamePlayer( p2, g4);
			GamePlayer gp8 = new GamePlayer( p1, g4);
			GamePlayer gp9 = new GamePlayer( p4, g5);
			GamePlayer gp10 = new GamePlayer( p1, g5);
			GamePlayer gp11 = new GamePlayer( p3, g6);
			GamePlayer gp12 = new GamePlayer( p4, g7);
			GamePlayer gp13 = new GamePlayer( p3, g8);
			GamePlayer gp14 = new GamePlayer( p4, g8);
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
			Set <String> location1 = new HashSet<String>();
			location1.add("H2");
			location1.add("H3");
			location1.add("H4");
			Ship s1 = new Ship("Destroyer",gp1,location1 );
			Set <String> location2 = new HashSet<String>();
			location2.add("E1");
			location2.add("F1");
			location2.add("G1");
			Ship s2 = new Ship("Submarine",gp1,location2 );
			Set <String> location3 = new HashSet<String>();
			location3.add("B4");
			location3.add("B5");
			Ship s3 = new Ship("Destroyer",gp1,location3 );
			Set <String> location4 = new HashSet<String>();
			location4.add("B5");
			location4.add("C5");
			location4.add("D5");
			Ship s4 = new Ship("Destroyer",gp1,location4 );
			Set <String> location5 = new HashSet<String>();
			location5.add("F1");
			location5.add("F2");
			Ship s5 = new Ship("Patrol Boat",gp1,location5 );
			Set <String> location6 = new HashSet<String>();
			location6.add("B5");
			location6.add("C5");
			location6.add("D5");
			Ship s6 = new Ship("Destroyer",gp2,location6 );
			Set <String> location7 = new HashSet<String>();
			location7.add("C6");
			location7.add("C7");
			Ship s7 = new Ship("Patrol Boat",gp2,location7 );
			Set <String> location8 = new HashSet<String>();
			location8.add("A2");
			location8.add("A3");
			location8.add("A4");
			Ship s8 = new Ship("Submarine",gp2,location8 );
			Set <String> location9 = new HashSet<String>();
			location9.add("G6");
			location9.add("H6");
			Ship s9 = new Ship("Patrol Boat",gp2,location9);
			Set <String> location10 = new HashSet<String>();
			location10.add("B5");
			location10.add("C5");
			location10.add("D5");
			Ship s10 = new Ship("Destroyer",gp3,location10 );
			Set <String> location11 = new HashSet<String>();
			location11.add("C6");
			location11.add("C7");
			Ship s11 = new Ship("Patrol Boat",gp3,location11 );
			Set <String> location12 = new HashSet<String>();
			location12.add("A2");
			location12.add("A3");
			location12.add("A4");
			Ship s12 = new Ship("Submarine",gp3,location12 );
			Set <String> location13 = new HashSet<String>();
			location13.add("G6");
			location13.add("H6");
			Ship s13 = new Ship("Patrol Boat",gp3,location13 );
			Set <String> location14 = new HashSet<String>();
			location14.add("B5");
			location14.add("C5");
			location14.add("D5");
			Ship s14 = new Ship("Destroyer",gp4,location14 );
			Set <String> location15= new HashSet<String>();
			location15.add("C6");
			location15.add("C7");
			Ship s15 = new Ship("Patrol Boat",gp4,location15 );
			Set <String> location16= new HashSet<String>();
			location16.add("A2");
			location16.add("A3");
			location16.add("A4");
			Ship s16 = new Ship("Submarine",gp4,location16 );
			Set <String> location17 = new HashSet<String>();
			location17.add("G6");
			location17.add("H6");
			Ship s17 = new Ship("Patrol Boat",gp4,location17 );
			Set <String> location18 = new HashSet<String>();
			location18.add("B5");
			location18.add("C5");
			location18.add("D5");
			Ship s18 = new Ship("Destroyer",gp5,location18 );
			Set <String> location19= new HashSet<String>();
			location19.add("C6");
			location19.add("C7");
			Ship s19 = new Ship("Patrol Boat",gp5,location19 );
			Set <String> location20= new HashSet<String>();
			location20.add("A2");
			location20.add("A3");
			location20.add("A4");
			Ship s20 = new Ship("Submarine",gp5,location20);
			Set <String> location21 = new HashSet<String>();
			location21.add("G6");
			location21.add("H6");
			Ship s21 = new Ship("Patrol Boat",gp5,location21 );
			Set <String> location22 = new HashSet<String>();
			location22.add("B5");
			location22.add("C5");
			location22.add("D5");
			Ship s22 = new Ship("Destroyer",gp6,location22 );
			Set <String> location23= new HashSet<String>();
			location23.add("C6");
			location23.add("C7");
			Ship s23 = new Ship("Patrol Boat",gp6,location23 );
			Set <String> location24= new HashSet<String>();
			location24.add("B5");
			location24.add("C5");
			location24.add("D5");
			Ship s24 = new Ship("Destroyer",gp8,location24 );
			Set <String> location25 = new HashSet<String>();
			location25.add("C6");
			location25.add("C7");
			Ship s25 = new Ship("Patrol Boat",gp8,location25 );
			Set <String> location26= new HashSet<String>();
			location26.add("A2");
			location26.add("A3");
			location26.add("A4");
			Ship s26 = new Ship("Submarine",gp8,location26 );
			Set <String> location27 = new HashSet<String>();
			location27.add("G6");
			location27.add("H6");
			Ship s27 = new Ship("Patrol Boat",gp8,location27 );
			shipRepository.save(s1);
			shipRepository.save(s2);
			shipRepository.save(s3);
			shipRepository.save(s4);
			shipRepository.save(s5);
			shipRepository.save(s6);
			shipRepository.save(s7);
			shipRepository.save(s8);
			shipRepository.save(s9);
			shipRepository.save(s10);
			shipRepository.save(s11);
			shipRepository.save(s12);
			shipRepository.save(s13);
			shipRepository.save(s14);
			shipRepository.save(s15);
			shipRepository.save(s16);
			shipRepository.save(s17);
			shipRepository.save(s18);
			shipRepository.save(s20);
			shipRepository.save(s21);
			shipRepository.save(s22);
			shipRepository.save(s23);
			shipRepository.save(s24);
			shipRepository.save(s25);
			shipRepository.save(s26);
			shipRepository.save(s27);

			Set <String> locationS1 = new HashSet<String>();
			locationS1.add("B5");
			locationS1.add("C5");
			locationS1.add("F1");
			Salvo salvo1 = new Salvo(1,gp1,locationS1 );
			Set <String> locationS2 = new HashSet<String>();
			locationS2.add("B4");
			locationS2.add("B5");
			locationS2.add("B6");
			Salvo salvo2 = new Salvo(1,gp1,locationS2 );
			Set <String> locationS3 = new HashSet<String>();
			locationS3.add("F2");
			locationS3.add("D5");
			Salvo salvo3 = new Salvo(2,gp1,locationS3 );
			Set <String> locationS4 = new HashSet<String>();
			locationS4.add("E1");
			locationS4.add("H3");
			locationS4.add("A2");
			Salvo salvo4 = new Salvo(2,gp1,locationS4 );
			Set <String> locationS5 = new HashSet<String>();
			locationS5.add("A2");
			locationS5.add("A4");
			locationS5.add("G6");
			Salvo salvo5 = new Salvo(1,gp2,locationS5 );
			Set <String> locationS6 = new HashSet<String>();
			locationS6.add("B5");
			locationS6.add("D5");
			locationS6.add("C7");
			Salvo salvo6 = new Salvo(1,gp2,locationS6 );
			Set <String> locationS7 = new HashSet<String>();
			locationS7.add("A3");
			locationS7.add("H6");
			Salvo salvo7 = new Salvo(2,gp2,locationS7 );
			Set <String> locationS8 = new HashSet<String>();
			locationS8.add("C5");
			locationS8.add("C6");
			Salvo salvo8 = new Salvo(2,gp2,locationS8 );
			Set <String> locationS9 = new HashSet<String>();
			locationS9.add("G6");
			locationS9.add("H6");
			locationS9.add("A4");
			Salvo salvo9 = new Salvo(1,gp3,locationS9);
			Set <String> locationS10 = new HashSet<String>();
			locationS10.add("H1");
			locationS10.add("H2");
			locationS10.add("H3");
			Salvo salvo10 = new Salvo(1,gp3,locationS10 );
			Set <String> locationS11 = new HashSet<String>();
			locationS11.add("A2");
			locationS11.add("A3");
			locationS11.add("D8");
			Salvo salvo11 = new Salvo(2,gp3,locationS11 );
			Set <String> locationS12 = new HashSet<String>();
			locationS12.add("E1");
			locationS12.add("F2");
			locationS12.add("G3");
			Salvo salvo12 = new Salvo(2,gp3,locationS12 );
			Set <String> locationS13 = new HashSet<String>();
			locationS13.add("A3");
			locationS13.add("A4");
			locationS13.add("F7");
			Salvo salvo13 = new Salvo(1,gp4,locationS13 );
			Set <String> locationS14 = new HashSet<String>();
			locationS14.add("B5");
			locationS14.add("C6");
			locationS14.add("H1");
			Salvo salvo14 = new Salvo(1,gp4,locationS14 );
			Set <String> locationS15= new HashSet<String>();
			locationS15.add("A2");
			locationS15.add("G6");
			locationS15.add("H6");
			Salvo salvo15 = new Salvo(2,gp4,locationS15 );
			Set <String> locationS16= new HashSet<String>();
			locationS16.add("C5");
			locationS16.add("C7");
			locationS16.add("D5");
			Salvo salvo16 = new Salvo(2,gp4,locationS16 );
			Set <String> locationS17 = new HashSet<String>();
			locationS17.add("A1");
			locationS17.add("A2");
			locationS17.add("A3");
			Salvo salvo17 = new Salvo(1,gp5,locationS17 );
			Set <String> locationS18 = new HashSet<String>();
			locationS18.add("B5");
			locationS18.add("B6");
			locationS18.add("C7");
			Salvo salvo18 = new Salvo(1,gp5,locationS18 );
			Set <String> locationS19= new HashSet<String>();
			location19.add("G6");
			location19.add("G7");
			location19.add("G8");
			Salvo salvo19 = new Salvo(2,gp5,locationS19 );
			Set <String> locationS20= new HashSet<String>();
			locationS20.add("C6");
			locationS20.add("D6");
			locationS20.add("E6");
			Salvo salvo20 = new Salvo(2,gp5,locationS20);
			Set <String> locationS21 = new HashSet<String>();
			locationS21.add("H1");
			locationS21.add("H8");
			Salvo salvo21 = new Salvo(3,gp5,locationS21 );
			salvoRepository.save(salvo1);
			salvoRepository.save(salvo2);
			salvoRepository.save(salvo3);
			salvoRepository.save(salvo4);
			salvoRepository.save(salvo5);
			salvoRepository.save(salvo6);
			salvoRepository.save(salvo7);
			salvoRepository.save(salvo8);
			salvoRepository.save(salvo9);
			salvoRepository.save(salvo10);
			salvoRepository.save(salvo11);
			salvoRepository.save(salvo12);
			salvoRepository.save(salvo13);
			salvoRepository.save(salvo14);
			salvoRepository.save(salvo15);
			salvoRepository.save(salvo16);
			salvoRepository.save(salvo17);
			salvoRepository.save(salvo18);
			salvoRepository.save(salvo19);
			salvoRepository.save(salvo20);
			salvoRepository.save(salvo21);
			Score score = new Score( 1.0,g1,p1);
			scoreRepository.save(score);
			Score score2 = new Score( 0.0,g1,p2);
			scoreRepository.save(score2);
			Score score3 = new Score( 0.5,g2,p1);
			scoreRepository.save(score3);
			Score score4 = new Score( 0.5,g2,p2);
			scoreRepository.save(score4);
			Score score5 = new Score( 1.0,g3,p2);
			scoreRepository.save(score5);
			Score score6 = new Score( 0.0,g3,p4);
			scoreRepository.save(score6);
			Score score7 = new Score( 0.5,g4,p2);
			scoreRepository.save(score7);
			Score score8 = new Score( 0.5,g4,p1);
			scoreRepository.save(score8);
		};
	}

}
@Configuration
class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

	@Autowired
	PlayerRepository playerRepository;

	@Override
	public void init(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(inputEmail-> {
			Optional<Player> player =  playerRepository.findByUserName(inputEmail);
			if (player.get() != null) {
				return new User(player.get().getUserName(), player.get().getPassword(),
						AuthorityUtils.createAuthorityList("USER"));
			} else {
				throw new UsernameNotFoundException("Unknown user: " + inputEmail);
			}
		});
	}
}
@Configuration
@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/web/games").permitAll()
				.antMatchers("/web/**").permitAll()
				.antMatchers("/api/games").permitAll()
				.antMatchers("/api/players").permitAll()
				.antMatchers("/api/game_view/*").hasAuthority("USER")
				.antMatchers("/rest").denyAll()
		.anyRequest().permitAll();

		http.formLogin()
				 .usernameParameter("username")
				.passwordParameter("password")
				.loginPage("/api/login");

		http.logout().logoutUrl("/api/logout");

		// turn off checking for CSRF tokens
		http.csrf().disable();

		// if user is not authenticated, just send an authentication failure response
		http.exceptionHandling().authenticationEntryPoint((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

		// if login is successful, just clear the flags asking for authentication
		http.formLogin().successHandler((req, res, auth) -> clearAuthenticationAttributes(req));

		// if login fails, just send an authentication failure response
		http.formLogin().failureHandler((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

		// if logout is successful, just send a success response
		http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());
	}

	private void clearAuthenticationAttributes(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
		}
	}
}
