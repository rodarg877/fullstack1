package com.codeoftheweb.salvo;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.*;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private String userName;

    @OneToMany(mappedBy = "player", fetch = FetchType.EAGER)
    Set<GamePlayer> gamePlayers;
    @OneToMany(mappedBy = "player", fetch = FetchType.EAGER)
    Set<Score> score;

    public Player() { }

    public Player(String userName) {
        this.userName = userName;

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

}