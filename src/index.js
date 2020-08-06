import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class QuizReact extends Component{
 state = {
 	questionBank: [],
 	res: 0,
 	score: 0
 	
 };
  getQuestions = () =>{
  quizService().then(question=> {
   this.setState({
   questionBank: question
   });
  });
  };
  computeAnswer = (answer,correctAnswer) =>{
  if(answer === correctAnswer)
  {
  this.setState({
    score: this.state.score + 1
    });
  }
  if(this.state.res < 5)
  {
  this.setState({
  res: this.state.res + 1 
  });
  }
  };

  playAgain = () => {
  this.getQuestions();
  this.setState({
  res:0,
  score:0
  });
  };
  componentDidMount(){
   this.getQuestions();
  }
	render(){
	return (
	<div className="container">
	<div className="title">Fun Quiz by React</div>
	{this.state.questionBank.length > 0 &&
	this.state.res < 5 &&
	 this.state.questionBank.map(
	 ({question,answers,correct,questionId})=>(
	 <QuestionBox question = {question} options = {answers}
	 key = {questionId}
	 selected={answer=>this.computeAnswer(answer,correct)}
	 />)
	)}
	{ this.state.res === 5 ?( <Result score = {this.state.score} playAgain={this.playAgain}/> ):null}
	</div>
	);
	}
}

ReactDOM.render(<QuizReact/>, document.getElementById("root"));
