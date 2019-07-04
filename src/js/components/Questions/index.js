import React, { Component } from "react";

import css from "../../../css/question.module.css";
import questions from "../../../assets/questions.json";


// const questions = [
//     {
//         "question" : "How is the state of Brussels cycling infrastructur ?",
//         "answer" : "Very bad",
//         "choices" : [
//             "Bad",
//             "Very good",
//             "Coub be better"
//         ]
//     }
// ];

class Question extends Component {
    render() {

        return (
            <div className={css.splitScreen}>
                <div className={css.image} />

                <article
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        marginLeft: "10rem",
                        marginRight: "10rem"
                    }}
                >
                    <h2 className={css.title}>
                        {questions[0].question}
                    </h2>
                    <div className={css.choices}>
                        {
                        questions[0].choices.map((value, index) => {
                            return <button key={index}>{value}</button>
                        })
                        }
                    </div>
                </article>
                <div className={css['next-button']}>
                    <button>Next</button>
                </div> 
            </div>
        );
    }
}

export default Question;