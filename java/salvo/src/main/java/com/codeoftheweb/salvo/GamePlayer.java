package com.codeoftheweb.salvo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.*;
import java.util.stream.Collectors;

@Entity
public class GamePlayer{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;

    private Date joinDate= new Date();
    @OneToMany    (mappedBy = "gamePlayer", fetch = FetchType.EAGER)
    Set<Ship> ships;

    @OneToMany    (mappedBy = "gamePlayer", fetch = FetchType.EAGER)
    Set<Salvo> salvoes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;

    public GamePlayer(){}

    public GamePlayer(Player player, Game game) {
        this.player = player;
        this.game = game;
    }

    public long getId() {
        return id;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    @JsonIgnore
    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }


    @JsonIgnore
    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }


    public Map<String, Object> makeGamePlayerDTO() {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", this.getId());
        dto.put("player", this.getPlayer().makePlayerDTO());
        return dto;
    }
    @JsonIgnore
    public Set<Ship> getShips() {
        return ships;
    }

    public void setShips(Set<Ship> ships) {
        this.ships = ships;
    }

    @JsonIgnore
    public Set<Salvo> getSalvoes() {
        return salvoes;
    }

    public void setSalvoes(Set<Salvo> salvoes) {
        this.salvoes = salvoes;
    }

    public List<Map<String,Object>> getShipList(Set<Ship>ships){
        return ships.stream().map(ship->ship.makeshipDTO()).collect(Collectors.toList());
    }


    public List<Map<String, Object>> getAllSalvos(Set<GamePlayer> gamePlayers){
        return  gamePlayers
                .stream()
                .flatMap(gp -> gp.getSalvoes()
                                 .stream()
                                 .map(sal->sal.makeSalvoDTO())).collect(Collectors.toList());
    }
    public Map<String, Object> getHits(Set<GamePlayer> gamePlayers, Player player) {
        Map<String, Object> hits = new LinkedHashMap<String, Object>();
        List<Map<String, Object>> self =new ArrayList<>();
        List<Map<String, Object>> oppo =new ArrayList<>();

        List<Map<String, Object>> inu = gamePlayers.stream().flatMap(GP -> GP.getSalvoes().stream()
                .map(Sal -> {
                            if (Sal.getGamePlayer().getPlayer().getUserName() == player.getUserName()){
                                oppo.add(Sal.makeSalvoDTO());
                                return Sal.makeSalvoDTO();
                            }else{
                                self.add(Sal.makeSalvoDTO());
                                return Sal.makeSalvoDTO();
                            }
                        }
                )).collect(Collectors.toList());
        hits.put("opponent", oppo );
        hits.put("self", self);
        return hits;
    }
}
