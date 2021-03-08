import React from 'react';

export default class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            article: this.fetchArticle(this.parseURL())
        }
    }

    fetchArticle = (articleName) => {
        //temp article
        let tempArticleJSON = {
            "articleTitle":articleName,
            "introduction":"introduction",
            "contents":[
                {"title1":"content1"},
                {"title2":"content2"}
            ],
            "editedBy":"asd qwerty",
            "lastEdited":new Date().toString()
        }
        return tempArticleJSON;
    }

    //gets the desired article name from page URL
    parseURL = () => {
        let URL = window.location.pathname;
        let pos = URL.lastIndexOf("/") + 1;
        return URL.slice(pos);
    }

    render(){
        return(
            <div className="article">
                <h1 className="articleTitle">{this.state.article.articleTitle}</h1><br/>
                <p className="articleIntroduction">{this.state.article.introduction}</p><br/>
                <div className="tableOfContents">
                    <ol>
                    {
                        this.state.article.contents.map((item,key) => {
                            let title = Object.keys(item);
                            return(
                                <li key={key}>{title}</li>
                            )
                        })
                        
                    }
                    </ol>
                </div>
                {
                    
                    this.state.article.contents.map((item,key) => {
                        let title = Object.keys(item);
                        return (
                            <div className="sectionContainer" key={key}>
                                <h2 className="sectionTitle">{title}</h2><br/>
                                <p className="sectionContent">{item[title]}</p><br/>
                            </div>
                        );
                    })
                }
                <p className="editedBy">{this.state.article.editedBy}</p><br/>
                <p className="editedBy">{this.state.article.lastEdited}</p>
            </div>
        )
    }
}