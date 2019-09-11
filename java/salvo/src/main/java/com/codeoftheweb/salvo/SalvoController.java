package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @RequestMapping("/games")
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


}