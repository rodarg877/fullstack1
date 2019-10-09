package com.codeoftheweb.salvo;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

@Entity
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private Double score;
    private Date finishDate = new Date();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "player_id")
    private Player player;

    public Score() {
    }

    public Score(Double score, Game game, Player player) {
        this.score = score;
        this.game = game;
        this.player = player;
    }

    public long getId() {
        return id;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Map<String, Object> makeScoreDTO() {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("Player", this.getPlayer().getId());
        dto.put("finishdate", this.getFinishDate().getTime());
        dto.put("Score", this.getScore());
        return dto;
    }
}
