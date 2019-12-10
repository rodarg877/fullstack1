package com.codeoftheweb.salvo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import com.codeoftheweb.salvo.GameState;
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
    public Map<String, Object> getHits() {
        Map<String, Object> hits = new LinkedHashMap<String, Object>();
        if (this.getGame().getGamePlayers().size()>1) {
            hits.put("opponent", calcHits(this.getOpponent()));
        }else{
            hits.put("opponent", new ArrayList<>());
        }

        hits.put("self", calcHits(this));
        return hits;
    }
    private List<Map> calcHits(GamePlayer gamePlayer) {
        List<Map> hits  = new ArrayList<>();

        int carrierDamage = 0;
        int battleshipDamage = 0;
        int submarineDamage = 0;
        int destroyerDamage = 0;
        int patrolboatDamage = 0;

        Set <String> carrierLocation = getLocatiosShip("carrier",gamePlayer);
        Set <String> battleshipLocation = getLocatiosShip("battleship",gamePlayer);
        Set <String> submarineLocation = getLocatiosShip("submarine",gamePlayer);
        Set <String> destroyerLocation = getLocatiosShip("destroyer",gamePlayer);
        Set <String> patrolboatLocation = getLocatiosShip("patrolboat",gamePlayer);
        if (gamePlayer.getGame().getGamePlayers().size()>1) {
            for (Salvo salvo : gamePlayer.getOpponent().getSalvoes()) {

                long carrierHitsInTurn = 0;
                long battleshipHitsInTurn = 0;
                long submarineHitsInTurn = 0;
                long destroyerHitsInTurn = 0;
                long patrolboatHitsInTurn = 0;
                long missedShots = 0;

                Map<String, Object> hitsMapPerTurn = new LinkedHashMap<>();
                Map<String, Object> damagesPerTurn = new LinkedHashMap<>();

                List<String> missedLocations = new ArrayList<>();
                List<String> hitCellsList = new ArrayList<String>();

                for (String salvoShot : salvo.getSalvoLocation()) {
                    if (carrierLocation.contains(salvoShot)) {
                        carrierDamage++;
                        carrierHitsInTurn++;
                        hitCellsList.add(salvoShot);
                    }
                    else if (battleshipLocation.contains(salvoShot)) {
                        battleshipDamage++;
                        battleshipHitsInTurn++;
                        hitCellsList.add(salvoShot);
                    }
                    else if (submarineLocation.contains(salvoShot)) {
                        submarineDamage++;
                        submarineHitsInTurn++;
                        hitCellsList.add(salvoShot);
                    }
                     else if (destroyerLocation.contains(salvoShot)) {
                        destroyerDamage++;
                        destroyerHitsInTurn++;
                        hitCellsList.add(salvoShot);
                    }
                    else if (patrolboatLocation.contains(salvoShot)) {
                        patrolboatDamage++;
                        patrolboatHitsInTurn++;
                        hitCellsList.add(salvoShot);
                    }
                    else{
                      missedLocations.add(salvoShot);
                      missedShots++;
                    }
                }
                damagesPerTurn.put("carrierHits", carrierHitsInTurn);
                damagesPerTurn.put("battleshipHits", battleshipHitsInTurn);
                damagesPerTurn.put("submarineHits", submarineHitsInTurn);
                damagesPerTurn.put("destroyerHits", destroyerHitsInTurn);
                damagesPerTurn.put("patrolboatHits", patrolboatHitsInTurn);
                damagesPerTurn.put("carrier", carrierDamage);
                damagesPerTurn.put("battleship", battleshipDamage);
                damagesPerTurn.put("submarine", submarineDamage);
                damagesPerTurn.put("destroyer", destroyerDamage);
                damagesPerTurn.put("patrolboat", patrolboatDamage);

                hitsMapPerTurn.put("turn", salvo.getTurn());
                hitsMapPerTurn.put("locations", hitCellsList);
                hitsMapPerTurn.put("missedLocations", missedLocations);
                hitsMapPerTurn.put("damages", damagesPerTurn);
                hitsMapPerTurn.put("missed", missedShots);
                hits.add(hitsMapPerTurn);
            }
        }
        return hits;
    }
    public GamePlayer getOpponent() {
        return this.getGame().getGamePlayers()
                .stream()
                .filter(gp -> gp.getId() != this.getId())
                .findFirst()
                .orElse(new GamePlayer());
    }

    private Set<String>  getLocatiosShip(String ship, GamePlayer gamePlayer){
        return  gamePlayer.getShips().size()  ==  0 ? new HashSet<>() : gamePlayer.getShips().stream().filter(ships -> ships.getShip().equals(ship)).findFirst().get().getShipLocation();
    }
    public GameState getGameState() {
        int shipsQuantity = this.getShips().size();
        int gamePlayersQuantity = this.getGame().getGamePlayers().size();

        if (shipsQuantity == 0) {
            return GameState.PLACESHIPS;
        }
        if (gamePlayersQuantity == 1) {
            return GameState.WAITINGFOROPP;
        }
        if (gamePlayersQuantity == 2) {

            GamePlayer opponentGp = this.getOpponent();
            int opponentSalvosQuantity = opponentGp.getSalvoes().size();
            int salvosQuantity = this.getSalvoes().size();

            if ((salvosQuantity == opponentSalvosQuantity) && (getIfAllSunk(opponentGp, this)) && (!getIfAllSunk(this, opponentGp))) {
                return GameState.WON;
            }
            if ((salvosQuantity == opponentSalvosQuantity) && (getIfAllSunk(opponentGp, this)) && (getIfAllSunk(this, opponentGp))) {
                return GameState.TIE;
            }
            if ((salvosQuantity == opponentSalvosQuantity) && (!getIfAllSunk(opponentGp, this)) && (getIfAllSunk(this, opponentGp))) {
                return GameState.LOST;
            }

            if ((salvosQuantity == opponentSalvosQuantity) && (this.getId() < opponentGp.getId())) {
                return GameState.PLAY;
            }
            if (salvosQuantity < opponentSalvosQuantity) {
                return GameState.PLAY;
            }
            if ((salvosQuantity == opponentSalvosQuantity) && (this.getId() > opponentGp.getId())) {
                return GameState.WAIT;
            }
            if (salvosQuantity > opponentSalvosQuantity) {
                return GameState.WAIT;
            }

        }

        return GameState.UNDEFINED;
    }

    private Boolean getIfAllSunk(GamePlayer self, GamePlayer opponent) {

        if (!opponent.getShips().isEmpty() && !self.getSalvoes().isEmpty()) {
            return opponent.getSalvoes()
                    .stream().flatMap(salvo -> salvo.getSalvoLocation().stream())
                    .collect(Collectors.toList())
                    .containsAll(self.getShips().stream().flatMap(ship -> ship.getShipLocation().stream())
                            .collect(Collectors.toList()));
        }
        return false;
    }

}

