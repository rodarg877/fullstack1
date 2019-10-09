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
    public static boolean isGuest(Authentication authentication) {
        return authentication == null || authentication instanceof AnonymousAuthenticationToken;
    }
    private  Map<String, Object>makeMap(String key, Object value){
        Map<String, Object>map=new HashMap<>();
        map.put(key,value);
        return map;
    }
}
