import React, { Component } from "react";

import css from "../../../css/question.module.css";
import questions from "../../../assets/questions.json";


const QuestionItem = ({ question }) => (
    <div>
        <h2 className={css.title}>
            {question.title}
        </h2>
        <ul className={css.choices}>
            {
                question.choices.map((value, index) => {
                    return (
                        <li>
                            <button key={index}>{value}</button>
                        </li>
                    )
                })
            }
        </ul>
    </div>
)

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
                    {
                        questions.map((item, index) => {
                            return <QuestionItem question={item} />
                        })
                    }
                    
                </article>
                <div className={css['next-button']}>
                    <button>Next</button>
                </div>
            </div>
        );
    }
}

export default Question;