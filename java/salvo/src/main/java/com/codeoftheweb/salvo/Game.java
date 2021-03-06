package com.codeoftheweb.salvo;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.*;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.stream.Collectors;

@Entity
public class   Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private Date creationDate = new Date();

    @OneToMany(mappedBy = "game", fetch = FetchType.EAGER)
    Set<GamePlayer> gamePlayers;
    @OneToMany(mappedBy = "game", fetch = FetchType.EAGER)
    Set<Score> score;

    public Game() {}


    public long getId() {
        return id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }
    public Set<Score> getScore() {
        return score;
    }
    public void setGamePlayers(Set<GamePlayer> gamePlayers) {
        this.gamePlayers = gamePlayers;
    }
    public void setScore(Set<Score> score) {
        this.score = score;
    }
    public Map<String, Object> makeGameDTO() {
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", this.getId());
        dto.put("created", this.getCreationDate().getTime());
        dto.put("gamePlayers",this.getAllGamePlayers(this.getGamePlayers()) );
        dto.put("score", this.getScore().stream().map(score -> score.makeScoreDTO() ).collect(Collectors.toList()));
        return dto;
    }
    public List<Map<String, Object>>  getAllGamePlayers(Set<GamePlayer> gamePlayers){
      return  gamePlayers.stream().map(gamePlayer -> gamePlayer.makeGamePlayerDTO()).collect(Collectors.toList());
    }
    public GamePlayer getOppo(long id){
        return this.gamePlayers.stream().filter(gp-> gp.getId()!=id).findFirst().get();
    }
}
