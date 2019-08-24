package com.codeoftheweb.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;
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

        public Ship() { }

        public Ship(String ship, GamePlayer gamePlayer) {
            this.ship = ship;
            this.gamePlayer= gamePlayer;

        }

        public long getId() {
            return id;
        }

        public String getShip() {
            return ship;
        }
    @JsonIgnore
    public GamePlayer getGamePlayer() {
        return gamePlayer;
    }

}
