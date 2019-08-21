package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class SalvoController {
    @Autowired
    GameRepository gameRepository;

    @RequestMapping("/games")
    public Set<Game> getGame(Set<Game> games) {
        return games.stream().collect(Collectors.toSet());
    }
}
