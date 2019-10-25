package com.codeoftheweb.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.*;

@Entity
public class Ship {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
        @GenericGenerator(name = "native", strategy = "native")
        private long id;
        private String ship;

        @ManyToOne (fetch = FetchType.EAGER)
        @JoinColumn (name = "gamePlayer_id")
        private GamePlayer gamePlayer;

        @ElementCollection
        @Column(name = "shipLocation")
        private Set<String> shipLocation;


    public Ship() { }

        public Ship(String ship, GamePlayer gamePlayer, Set<String> shipLocation) {
            this.ship = ship;
            this.gamePlayer= gamePlayer;
            this.shipLocation = shipLocation;

        }

        public long getId() {
            return id;
        }

        public String getShip() {
            return ship;
        }

    public void setShip(String ship) {
        this.ship = ship;
    }
    public Set<String> getShipLocation() {
        return shipLocation;
    }

    public void setShipLocation(Set<String> shipLocation) {
        this.shipLocation = shipLocation;
    }
    @JsonIgnore
    public GamePlayer getGamePlayer() {
        return gamePlayer;
    }



    public Map<String,Object> makeshipDTO(){
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("Ship", this.getShip());
        dto.put("shipLocation", this.getShipLocation());
        return dto;
    }

    public void setGamePlayer(GamePlayer gamePlayer) {
        this.gamePlayer = gamePlayer;
    }
}
