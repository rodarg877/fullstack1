package com.codeoftheweb.salvo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitterReturnValueHandler;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")

public class GameController {
        @Autowired
        private PlayerRepository playerRepository;
        @Autowired
        private GameRepository gameRepository;
        @Autowired
        private GamePlayerRepository gamePlayerRepository;
        @Autowired
        ShipRepository shipRepository;
        @RequestMapping(path= "/games", method = RequestMethod.POST)
        public  ResponseEntity<Object> createGame(Authentication authentication){
            if(isGuest(authentication)){
                return new ResponseEntity<>("No esta autorizado", HttpStatus.UNAUTHORIZED);
            }
            Player player = playerRepository.findByUserName(authentication.getName()).orElse(null);
            if (player==null){
                return new ResponseEntity<>("no esta autorizado", HttpStatus.UNAUTHORIZED);
            }
            Game game = gameRepository.save(new Game());
            GamePlayer gamePlayer= gamePlayerRepository.save(new GamePlayer(player,game));
    return new ResponseEntity<>(makeMap("gpid",gamePlayer.getId()),HttpStatus.CREATED);
        }
    @RequestMapping(value = "/games/players/{id}/ships", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> addShip(@PathVariable Long id,Authentication authentication, @RequestBody Set<Ship> ships) {
        if (GameController.isGuest(authentication)) {
            return new ResponseEntity<>(makeMap("error","usuario no logueado"), HttpStatus.UNAUTHORIZED);
        }
        GamePlayer gamePlayer = gamePlayerRepository.findById(id).orElse(null);
        Player player = playerRepository.findByUserName(authentication.getName()).orElse(null);
        if (gamePlayer.getPlayer().getId() != player.getId()) {
            return new ResponseEntity<>(makeMap("error","usuario incorrecto"), HttpStatus.UNAUTHORIZED);
        }
        if(!gamePlayer.getShips().isEmpty()){
            return new ResponseEntity<>(makeMap("error","barcos ya cargados"), HttpStatus.FORBIDDEN);
        }
        ships.stream().map(ship -> {
            ship.setGamePlayer(gamePlayer);
            return shipRepository.save(ship);
        }).collect(Collectors.toSet());
        return new ResponseEntity<>(makeMap("Creado","Creado"), HttpStatus.CREATED);
    }
    @Autowired
    SalvoRepository salvoRepository;

    @RequestMapping(value = "/games/players/{id}/salvoes", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> addShip(@PathVariable Long id,Authentication authentication, @RequestBody Salvo salvos) {
        if (GameController.isGuest(authentication)) {
            return new ResponseEntity<>(makeMap("error","usuario no logueado"), HttpStatus.UNAUTHORIZED);
        }
        GamePlayer gamePlayer = gamePlayerRepository.findById(id).orElse(null);
        Player player = playerRepository.findByUserName(authentication.getName()).orElse(null);
        if (gamePlayer.getPlayer().getId() != player.getId()) {
            return new ResponseEntity<>(makeMap("error","usuario incorrecto"), HttpStatus.UNAUTHORIZED);
        }
        if (gamePlayer.getSalvoes().isEmpty()){
            salvos.setTurn(1);
        }
        if (gamePlayer.getSalvoes().size() <= gamePlayer.getGame().getOppo(id).getSalvoes().size()){
            salvos.setTurn(gamePlayer.getSalvoes().size()+1);
        } else {
            return new ResponseEntity<>(makeMap("Espere a que finalice el turno", ""), HttpStatus.UNAUTHORIZED);
        }
        salvos.setGamePlayer(gamePlayer);
        salvoRepository.save(salvos);
        return new ResponseEntity<>(makeMap("Salvos guardados",""), HttpStatus.CREATED);
    }
        public static boolean isGuest(Authentication authentication) {
            return authentication == null || authentication instanceof AnonymousAuthenticationToken;
        }
        public static  Map<String, Object>makeMap(String key, Object value){
            Map<String, Object>map=new HashMap<>();
            map.put(key,value);
            return map;
        }
    }
