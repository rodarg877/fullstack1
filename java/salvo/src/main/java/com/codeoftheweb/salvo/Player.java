package com.codeoftheweb.salvo;


import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.persistence.*;
import java.util.*;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private String userName;
    private String password;
    @OneToMany(mappedBy = "player", fetch = FetchType.EAGER)
    Set<GamePlayer> gamePlayers;
    @OneToMany(mappedBy = "player", fetch = FetchType.EAGER)
    Set<Score> score;

    public Player() { }

    public Player(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String username) {
        this.userName = userName;
    }

    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }

    public Set<Score> getScore() {
        return score;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setScore(Set<Score> score) {
        this.score = score;
    }

    public void setGamePlayers(Set<GamePlayer> gamePlayers) {
        this.gamePlayers = gamePlayers;
    }
    public Map<String, Object> makePlayerDTO() {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", getId());
        dto.put("email", getUserName());
        return dto;
    }
    private double getWin(){
        return this.getScore().stream().filter(score->score.getScore()==1.0).count();
    }
    private double getLost(){
        return this.getScore().stream().filter(score->score.getScore()==0.0).count();
    }
    private double getTie(){
        return this.getScore().stream().filter(score->score.getScore()==0.5).count();
    }
    private double getTotalScore(){
        return this.getWin()*1 +  this.getTie() * 0.5;

    }
    public Map<String, Object> makeScorePlayerDTO() {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", getId());
        dto.put("email", getUserName());
        dto.put("TotalScore",getTotalScore());
        dto.put("win",getWin());
        dto.put("Lost",getLost());
        dto.put("tie",getTie());
        return dto;
    }
    private boolean isGuest(Authentication authentication) {
        return authentication == null || authentication instanceof AnonymousAuthenticationToken;
    }
    @Autowired
    private PlayerRepository repo;
    public Map<String, Object> getLogUser(Authentication authentication) {

        if(isGuest(authentication)) {
            Map<String,Object> ss =new LinkedHashMap<>();
            ss.put("id","nn");
            ss.put("name","nn");
            return ss;
        }else{
            return repo.findByUserName(authentication.getName()).makePlayerDTO();
        }
    }

}