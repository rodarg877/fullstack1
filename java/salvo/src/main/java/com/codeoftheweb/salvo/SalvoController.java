package com.codeoftheweb.salvo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitterReturnValueHandler;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class SalvoController {
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private PlayerRepository repo;
    @RequestMapping("/games")
    public Map<String, Object> getLogUser(Authentication authentication) {
        Map<String,Object> ss =new LinkedHashMap<>();
        if(isGuest(authentication)) {
            ss.put("player", "guest");
        }else{
            ss.put("player",repo.findByUserName(authentication.getName()).makePlayerDTO());
        }
        ss.put("games",getGames());
        return ss;
    }
    public List<Map<String, Object>> getGames() {
        return gameRepository.findAll().stream().map(Game->Game.makeGameDTO()).collect(Collectors.toList());
    }
    @Autowired
    private GamePlayerRepository gamePlayerRepository;
    @RequestMapping("/game_view/{id}")
    public Map< String, Object> gameViewDto(@PathVariable Long id){
        GamePlayer partida = gamePlayerRepository.getOne(id);
        Map <String, Object>  dto = new LinkedHashMap<String, Object>();
         dto.put("id",partida.getId());
         dto.put("creationDate", partida.getGame().getCreationDate());
         dto.put("gamePlayers", partida.getGame().getAllGamePlayers(partida.getGame().getGamePlayers()));
         dto.put("ships", partida.getShipList(partida.getShips()));
         dto.put("salvos",partida.getAllSalvos(partida.getGame().getGamePlayers()) );

         return dto;
    }

@Autowired
    PlayerRepository playerRepository;
    @RequestMapping("/leaderboard")
public List<Map<String,Object>> leaderBoard(){
        return playerRepository.findAll()
                                .stream()
                                .map(player -> player.makeScorePlayerDTO())
                                .collect(Collectors.toList());
    }
    private boolean isGuest(Authentication authentication) {
        return authentication == null || authentication instanceof AnonymousAuthenticationToken;
    }

    @Autowired PasswordEncoder passwordEncoder;
    @RequestMapping (path = "/player", method = RequestMethod.POST)

    public ResponseEntity<Object> register(
        @RequestParam String email, @RequestParam String password){
        if (email.isEmpty()||password.isEmpty()) {
            return new ResponseEntity<>("Missing data", HttpStatus.FORBIDDEN);
        }
        if (playerRepository.findByUserName(email)!= null) {
        return new ResponseEntity<>("Name alredy in use",HttpStatus.FORBIDDEN);
        }
        playerRepository.save(new Player(email, passwordEncoder.encode(password)));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}