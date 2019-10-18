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
    @RequestMapping(value = "/games")
    public Map<String, Object> getLogUser(Authentication authentication) {
        Map<String,Object> ss =new LinkedHashMap<>();
        if(GameController.isGuest(authentication)) {
            ss.put("player", "guest");
        }else{
            ss.put("player",repo.findByUserName(authentication.getName()).get().makePlayerDTO());
        }
        ss.put("games",getGames());
        return ss;
    }
    public List<Map<String, Object>> getGames() {
        return gameRepository.findAll().stream().map(Game->Game.makeGameDTO()).collect(Collectors.toList());
    }
    @Autowired
    private GamePlayerRepository gamePlayerRepository;
    @RequestMapping("/game_view/{nn}")
    public ResponseEntity<Map< String, Object>> getGameViewByGamePlayerID(@PathVariable Long nn, Authentication autentication){
        if (GameController.isGuest(autentication)){
            return new ResponseEntity<>(GameController.makeMap("error","usuario no logueado"),HttpStatus.UNAUTHORIZED);
        }
        Player player = playerRepository.findByUserName(autentication.getName()).orElse(null);
        GamePlayer partida = gamePlayerRepository.findById(nn).orElse(null);
        if (player == null){
            return new ResponseEntity<>(GameController.makeMap("error","usuario no logueado"),HttpStatus.UNAUTHORIZED);
        }
        if (partida == null){
            return new ResponseEntity<>(GameController.makeMap("error","usuario no logueado"),HttpStatus.UNAUTHORIZED);
        }
        if (partida.getPlayer().getId() != player.getId()){
            return new ResponseEntity<>(GameController.makeMap("error","usuario no logueado"),HttpStatus.CONFLICT);
        }


        Map <String, Object>  dto = new LinkedHashMap<String, Object>();
         dto.put("id",partida.getId());
         dto.put("creationDate", partida.getGame().getCreationDate());
         dto.put("gamePlayers", partida.getGame().getAllGamePlayers(partida.getGame().getGamePlayers()));
         dto.put("ships", partida.getShipList(partida.getShips()));
         dto.put("salvos",partida.getAllSalvos(partida.getGame().getGamePlayers()) );

         return new ResponseEntity<>(dto,HttpStatus.OK);
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

    @Autowired PasswordEncoder passwordEncoder;
    @RequestMapping (path = "/player", method = RequestMethod.POST)

    public ResponseEntity<Object> register(
        @RequestParam String email, @RequestParam String password){
        if (email.isEmpty()||password.isEmpty()) {
            return new ResponseEntity<>("Missing data", HttpStatus.FORBIDDEN);
        }
        if (playerRepository.findByUserName(email).orElse(null)!= null) {
        return new ResponseEntity<>("Name alredy in use",HttpStatus.FORBIDDEN);
        }
        playerRepository.save(new  Player(email, passwordEncoder.encode(password)));
        return new ResponseEntity<>(HttpStatus.CREATED);
    };
    @RequestMapping(value = "/game/{nn}/players",method = RequestMethod.POST)
    public ResponseEntity<Map< String, Object>> joinGame(@PathVariable Long nn, Authentication autentication){
        if (GameController.isGuest(autentication)){
            return new ResponseEntity<>(GameController.makeMap("error","usuario no logueado"),HttpStatus.UNAUTHORIZED);
        }
        Player player = playerRepository.findByUserName(autentication.getName()).orElse(null);
        Game partida = gameRepository.getOne(nn);
        if (partida == null){
            return new ResponseEntity<>(GameController.makeMap("error","no such game"),HttpStatus.FORBIDDEN);
        }
        if (player == null){
            return new ResponseEntity<>(GameController.makeMap("error","no such game"),HttpStatus.FORBIDDEN);
        }
        int gamePlayerCount= partida.getGamePlayers().size();

        if (gamePlayerCount == 1){
            GamePlayer gamePlayer= gamePlayerRepository.save(new GamePlayer(player,partida));
            return new ResponseEntity<>(GameController.makeMap("gpid",gamePlayer.getId()),HttpStatus.CREATED);
        }else{
            return new  ResponseEntity<>(GameController.makeMap("error","Game is Full"),HttpStatus.OK);
        }
    }

}