package com.codeoftheweb.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

@Entity
public class Salvo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private int turn;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn (name = "gamePlayer_id")
    private GamePlayer gamePlayer;

    @ElementCollection
    @Column(name = "salvoLocation")
    private Set<String> salvoLocation;


    public Salvo() { }

    public Salvo(int turn, GamePlayer gamePlayer, Set<String> salvoLocation) {
        this.turn = turn;
        this.gamePlayer= gamePlayer;
        this.salvoLocation = salvoLocation;

    }

    public long getId() {
        return id;
    }

    public int getTurn() {
        return turn;
    }

    public Set<String> getSalvoLocation() {
        return salvoLocation;
    }

    public void setTurn(int turn) {
        this.turn = turn;
    }

    public void setSalvoLocation(Set<String> salvoLocation) {
        this.salvoLocation = salvoLocation;
    }

    @JsonIgnore
    public GamePlayer getGamePlayer() {
        return gamePlayer;
    }

    public Map<String, Object> makeSalvoDTO() {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("turn",this.getTurn() );
        dto.put("locations", this.getSalvoLocation());
        return dto;
    }
}
