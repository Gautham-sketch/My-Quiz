class Quiz {
  constructor(){
    
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();

    background("Yellow");
    
    textT = createElement('h1');
    textT.html("RESULTS OF THE QUIZ!")
    textT.position(350,0);
    
    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      fill("Blue");
      textSize(20);
      text("NOTE : Contestants who answered correct are highlited in Green color",130,230);  
    }
    
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer){
        fill("Green");
        text(allContestants[plr].name,400,300);
      }
      else{
        fill("Red");
        text(allContestants[plr].name,400,350);
      }  
    }
  }

}
